export interface IJobs {
  JobTitle: string;
  JobCompany: string;
  JobLocation: string;
  JobDuration: string;
  JobSalary: string;
  JobStatus: "Open" | "Closed";
  JobUrl: string;
  JobPlatform: "Internshala" | "Naukri";
  JobScrapedAt: Date;
}
