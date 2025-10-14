export interface IJobs {
  JobTitle: string;
  JobDescription?: string;
  JobCompany: string;
  JobLocation: string;
  JobDuration: string;
  JobSalary: string;
  JobStatus: "Open" | "Closed";
  JobUrl: string;
  JobPlatform: "Internshala" | "Naukri" | "Shine";
  JobPostedAt?: string;
  JobScrapedAt: Date;
}

export interface IMatchResultDetails {
  semanticSimilarity: number; // Range: 0 to 1
  skillOverlap: number; // Range: 0 to 1
  userExperienceYears: number;
  requiredYears: number;
  userDegree: string | null;
  requiredDegree: string | null;
}

export interface IMatchResult {
  matchScore: number; // Final match percentage (0–100)
  matchedSkills: string[];
  missingSkills: string[];
  experienceMatch: "Excellent" | "Good" | "Moderate" | "Poor";
  educationMatch: "Excellent" | "Good" | "Moderate" | "Poor";
  details: IMatchResultDetails;
  suggestions: string[];
}
