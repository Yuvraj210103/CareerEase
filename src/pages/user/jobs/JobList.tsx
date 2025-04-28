import { useEffect, useState } from "react";
import { scrapInternshalaJobs, scrapNaukriJobs } from "../../../API/ScrapJobs";
import PageHeader from "../../../component/common/PageHeader";
import { IJobs } from "../../../@types/api.response";
import InternShalaLogo from "../../../../public/assets/job_platforms/internshala.jpeg";
import NaukriLogo from "../../../../public/assets/job_platforms/naukri.svg";

import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { MdOutlineCalendarToday, MdOutlineLocationOn } from "react-icons/md";
import { BsCash } from "react-icons/bs";
import { Chip } from "@mantine/core";
import { errorHandler } from "../../../utilities/CustomError";
import { useAuthState } from "../../../store";

const JobList = () => {
  const [loading, setLoading] = useState(false);

  const [jobs, setJobs] = useState<IJobs[]>([]);

  const [platforms, setPlatforms] = useState<string[]>(["naukri"]);

  const { userPreferences } = useAuthState();

  const fetchJobs = async () => {
    try {
      setJobs([]);
      setLoading(true);

      if (platforms.includes("naukri")) {
        let filter = "jobs-in-india";
        const params = [];

        if (userPreferences?.PreferenceLocations?.length) {
          filter = `jobs-in-${userPreferences?.PreferenceLocations[0]}`;
        }

        if (userPreferences?.PreferenceWorkplaceType == "On-site") {
          params.push("wfhType=0");
        } else if (userPreferences?.PreferenceWorkplaceType == "Remote") {
          params.push("wfhType=2");
        } else if (userPreferences?.PreferenceWorkplaceType == "Hybrid") {
          params.push("wfhType=3");
        }

        if (userPreferences?.PreferenceJobTitles?.length) {
          params.push(`k=${userPreferences?.PreferenceJobTitles[0]}`);
        }

        let finalFilter = filter;
        if (params.length) {
          finalFilter = `${filter}?${params.join("&")}`;
        }
        console.log(encodeURIComponent(finalFilter), "naukri filter");
        const { data: res } = await scrapNaukriJobs(
          encodeURIComponent(finalFilter)
        );
        setJobs((prev) => [...prev, ...res.data]);
      }

      if (platforms.includes("internshala")) {
        let filter = ""; // Default filter

        // On-site internships
        if (userPreferences?.PreferenceWorkplaceType === "Remote") {
          if (userPreferences?.PreferenceJobTitles?.length) {
            filter += `/work-from-home-${userPreferences?.PreferenceJobTitles[0]}-internships`;
          } else {
            filter += `/work-from-home-internships/`;
          }
        }

        // Title - Web Development

        console.log(filter, "internshala filter");
        const { data: res } = await scrapInternshalaJobs(
          encodeURIComponent(filter)
        );
        setJobs((prev) => [...prev, ...res.data]);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      errorHandler(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (platforms.length === 0) {
      setJobs([]);
    } else {
      fetchJobs();
    }
  }, [platforms]);

  return (
    <div className="flex flex-col gap-4 pb-20">
      <PageHeader title="My Jobs" />

      <div className="flex gap-4 bg-surface shadow p-4 rounded">
        <Chip
          onClick={() =>
            setPlatforms((prev) =>
              prev.includes("internshala")
                ? prev.filter((p) => p != "internshala")
                : [...prev, "internshala"]
            )
          }
          checked={platforms.includes("internshala")}
        >
          Internshala
        </Chip>
        <Chip
          onClick={() =>
            setPlatforms((prev) =>
              prev.includes("naukri")
                ? prev.filter((p) => p != "naukri")
                : [...prev, "naukri"]
            )
          }
          checked={platforms.includes("naukri")}
        >
          Naukri
        </Chip>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {loading
          ? Array.from({ length: 20 }).map(() => {
              return (
                <div className="bg-shimmerColor shadow rounded p-4 flex gap-4 cursor-pointer hover:scale-[1.01] duration-500 animate-pulse h-32">
                  &nbsp;
                </div>
              );
            })
          : jobs.map((res) => {
              return (
                <a
                  href={res.JobUrl}
                  target="_blank"
                  className="bg-surface shadow rounded p-4 flex gap-4 cursor-pointer hover:scale-[1.01] duration-500"
                >
                  {res.JobPlatform === "Internshala" && (
                    <img src={InternShalaLogo} className="size-32" />
                  )}

                  {res.JobPlatform === "Naukri" && (
                    <img src={NaukriLogo} className="size-32" />
                  )}
                  <div className="flex flex-col">
                    <div className="font-semibold text-lg text-textSecondary line-clamp-1">
                      {res.JobTitle}
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      {res.JobCompany && (
                        <div className="text-textTertiary flex items-center gap-2">
                          <HiOutlineBuildingOffice2 />
                          <span className="line-clamp-1">{res.JobCompany}</span>
                        </div>
                      )}
                      {res.JobLocation && (
                        <div className="text-textTertiary flex items-center gap-2">
                          <MdOutlineLocationOn />
                          <span className="line-clamp-1">
                            {res.JobLocation}
                          </span>
                        </div>
                      )}
                    </div>

                    {res.JobDuration && (
                      <div className="text-textTertiary flex items-center gap-2">
                        <MdOutlineCalendarToday />
                        <span className="line-clamp-1">{res.JobDuration}</span>
                      </div>
                    )}
                    {res.JobSalary && (
                      <div className="text-textTertiary flex items-center gap-2">
                        <BsCash />
                        <span className="line-clamp-1">{res.JobSalary}</span>
                      </div>
                    )}
                  </div>
                </a>
              );
            })}
      </div>
    </div>
  );
};

export default JobList;
