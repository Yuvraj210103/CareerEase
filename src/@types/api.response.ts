export interface IJobs {
  JobTitle: string;
  JobDescription?: string;
  JobCompany: string;
  JobLocation: string;
  JobDuration: string;
  JobSalary: string;
  JobStatus: "Open" | "Closed";
  JobUrl: string;
  JobPlatform: "Internshala" | "Naukri";
  JobPostedAt?: string;
  JobScrapedAt: Date;
}
