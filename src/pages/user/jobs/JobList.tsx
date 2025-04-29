import { useEffect, useState } from "react";
import {
  scrapInternshalaJobs,
  scrapNaukriJobs,
  scrapShineJobs,
} from "../../../API/ScrapJobs";
import PageHeader from "../../../component/common/PageHeader";
import { IJobs } from "../../../@types/api.response";

import InternShalaLogo from "../../../../public/assets/job_platforms/internshala.jpeg";
import NaukriLogo from "../../../../public/assets/job_platforms/naukri.svg";
import ShineLogo from "../../../../public/assets/job_platforms/shine.svg";

import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { MdOutlineCalendarToday, MdOutlineLocationOn } from "react-icons/md";
import { BsCash } from "react-icons/bs";
import { Chip } from "@mantine/core";
import { errorHandler } from "../../../utilities/CustomError";
import { useAuthState } from "../../../store";
import {
  getInternshalaFilters,
  getNaukriFilters,
  getShineFilters,
} from "../../../utilities/misc";

const JobList = () => {
  const [loading, setLoading] = useState(false);

  const [jobs, setJobs] = useState<IJobs[]>([]);

  const [platforms, setPlatforms] = useState<string[]>(["naukri"]);

  const { userPreferences } = useAuthState();

  const fetchNaukriJobs = async () => {
    if (
      !platforms.includes("naukri") ||
      jobs.some((job) => job.JobPlatform === "Naukri")
    ) {
      return;
    }
    try {
      const { data: res } = await scrapNaukriJobs(
        getNaukriFilters(userPreferences)
      );
      setJobs((prev) => [...prev, ...res.data]);
    } catch (error) {
      console.log(error);
      errorHandler(error);
    }
  };

  const fetchShineJobs = async () => {
    if (
      !platforms.includes("shine") ||
      jobs.some((job) => job.JobPlatform === "Shine")
    ) {
      return;
    }
    try {
      const { data: res } = await scrapShineJobs(
        getShineFilters(userPreferences)
      );
      setJobs((prev) => [...prev, ...res.data]);
    } catch (error) {
      console.log(error);
      errorHandler(error);
    }
  };

  const fetchInternshalaJobs = async () => {
    if (
      !platforms.includes("internshala") ||
      jobs.some((job) => job.JobPlatform === "Internshala")
    ) {
      return;
    }
    try {
      const { data: res } = await scrapInternshalaJobs(
        getInternshalaFilters(userPreferences)
      );
      setJobs((prev) => [...prev, ...res.data]);
    } catch (error) {
      console.log(error);
      errorHandler(error);
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);

      const naukriTask = fetchNaukriJobs();
      const shineTask = fetchShineJobs();
      const internshalaTask = fetchInternshalaJobs();

      await Promise.all([naukriTask, shineTask, internshalaTask]);

      setLoading(false);
    };
    fetchJobs();
  }, [platforms]);

  return (
    <div className="flex flex-col gap-4 pb-20">
      <PageHeader title="My Jobs" />

      <div className="flex gap-4 bg-surface shadow p-4 rounded">
        <Chip
          disabled={loading}
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
        <Chip
          disabled={loading}
          onClick={() =>
            setPlatforms((prev) =>
              prev.includes("shine")
                ? prev.filter((p) => p != "shine")
                : [...prev, "shine"]
            )
          }
          checked={platforms.includes("shine")}
        >
          Shine
        </Chip>
        <Chip
          disabled={loading}
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
                  className="bg-surface shadow rounded p-4 flex gap-4 cursor-pointer hover:scale-[1.01] duration-500 justify-start items-start"
                >
                  {res.JobPlatform === "Internshala" && (
                    <img src={InternShalaLogo} className="size-32" />
                  )}

                  {res.JobPlatform === "Naukri" && (
                    <img src={NaukriLogo} className="size-32" />
                  )}

                  {res.JobPlatform === "Shine" && (
                    <img src={ShineLogo} className="size-32" />
                  )}
                  <div className="flex flex-col">
                    <div className="font-semibold text-lg text-textSecondary line-clamp-1">
                      {res.JobTitle}
                    </div>
                    {res.JobDescription && (
                      <div className="text-textTertiary flex items-center gap-2 line-clamp-2">
                        {res.JobDescription}
                      </div>
                    )}
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
