import { useEffect, useState } from "react";
import { scrapInternshalaJobs } from "../../../API/ScrapJobs";
import { useUIState } from "../../../store";
import PageHeader from "../../../component/common/PageHeader";
import { IJobs } from "../../../@types/api.response";
import InternShalaLogo from "../../../../public/assets/job_platforms/internshala.jpeg";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { MdOutlineCalendarToday, MdOutlineLocationOn } from "react-icons/md";
import { BsCash } from "react-icons/bs";

const JobList = () => {
  const { setLoading } = useUIState();

  const [jobs, setJobs] = useState<IJobs[]>([]);

  useEffect(() => {
    setLoading(true);
    scrapInternshalaJobs()
      .then((res) => {
        console.log(res.data.data);
        setLoading(false);
        setJobs(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col gap-4 pb-20">
      <PageHeader title="My Jobs" />

      <div className="grid grid-cols-2 gap-4">
        {jobs.map((res) => {
          return (
            <a
              href={res.JobUrl}
              target="_blank"
              className="bg-surface shadow rounded p-4 flex gap-4 cursor-pointer hover:scale-[1.01] duration-500"
            >
              {res.JobPlatform === "Internshala" && (
                <img src={InternShalaLogo} className="size-32" />
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
                      <span className="line-clamp-1">{res.JobLocation}</span>
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
