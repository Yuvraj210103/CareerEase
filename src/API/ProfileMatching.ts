import axios from "axios";
import { IUserProfilesCollection } from "../@types/database";
import { IJobs } from "../@types/api.response";
import { toDate } from "../utilities/misc";

const baseUrl = "http://localhost:8000";

export const formatMatchRequestPayload = (
  user: IUserProfilesCollection,
  job: IJobs
) => {
  const toISOStringOrNull = (value: unknown) => toDate(value).toISOString();

  // User Personal Details
  const personal = {
    UserFullName: user.UserProfilePersonalDetails.UserFullName,
    UserEmail: user.UserProfilePersonalDetails.UserEmail,
    UserPhone: user.UserProfilePersonalDetails.UserPhone,
    UserSummary: user.UserProfilePersonalDetails.UserSummary || "",
    UserAddress: user.UserProfilePersonalDetails.UserAddress || null,
    UserLinkedIn: user.UserProfilePersonalDetails.UserLinkedIn || null,
    UserGitHub: user.UserProfilePersonalDetails.UserGitHub || null,
    UserWebsite: user.UserProfilePersonalDetails.UserWebsite || null,
    UserDateOfBirth: toISOStringOrNull(
      user.UserProfilePersonalDetails.UserDateOfBirth
    ),
  };

  // Education
  const education = user.UserProfileEducationDetails.map((edu) => ({
    UserEducationDegree: edu.UserEducationDegree,
    UserEducationInstitution: edu.UserEducationInstitution,
    UserEducationStartDate: toISOStringOrNull(edu.UserEducationStartDate),
    UserEducationEndDate: toISOStringOrNull(edu.UserEducationEndDate),
    UserEducationGrade: edu.UserEducationGrade || null,
    UserEducationDescription: edu.UserEducationDescription || null,
  }));

  // Work Experience
  const workExperience = user.UserProfileWorkExperience.map((exp) => ({
    UserWorkExpJobTitle: exp.UserWorkExpJobTitle,
    UserWorkExpCompanyName: exp.UserWorkExpCompanyName,
    UserWorkExpStartDate: toISOStringOrNull(exp.UserWorkExpStartDate),
    UserWorkExpEndDate: toISOStringOrNull(exp.UserWorkExpEndDate),
    UserWorkExpDescription: exp.UserWorkExpDescription || "",
    UserWorkExpLocation: exp.UserWorkExpLocation || "",
  }));

  // Skills
  const skills = user.UserProfileSkills.map((skill) => ({
    UserSkillName: skill.UserSkillName,
    UserSkillProficiency: skill.UserSkillProficiency,
  }));

  // Projects, Certifications, Custom Sections
  const projects = user.UserProfileProjects || [];
  const certifications = user.UserProfileCertifications || [];
  const customSections = user.UserProfileCustomSections || [];

  // Final User Payload
  const userPayload = {
    UserProfileId: user.UserProfileId,
    UserProfileUserId: user.UserProfileUserId,
    UserProfilePersonalDetails: personal,
    UserProfileEducationDetails: education,
    UserProfileWorkExperience: workExperience,
    UserProfileSkills: skills,
    UserProfileProjects: projects,
    UserProfileCertifications: certifications,
    UserProfileLanguages: user.UserProfileLanguages || [],
    UserProfileHobbies: user.UserProfileHobbies || [],
    UserProfileCustomSections: customSections,
    UserProfileCreatedAt: toISOStringOrNull(user.UserProfileCreatedAt),
    UserProfileModifiedAt: toISOStringOrNull(user.UserProfileModifiedAt),
  };

  // Job Payload
  const jobPayload = {
    JobTitle: job.JobTitle,
    JobDescription: job.JobDescription || "",
    JobCompany: job.JobCompany,
    JobLocation: job.JobLocation,
    JobDuration: job.JobDuration,
    JobSalary: job.JobSalary,
    JobStatus: job.JobStatus,
    JobUrl: job.JobUrl,
    JobPlatform: job.JobPlatform,
    JobPostedAt: job.JobPostedAt,
    JobScrapedAt: toISOStringOrNull(job.JobScrapedAt),
  };

  return { user: userPayload, job: jobPayload };
};

export const profileMatching = ({
  user,
  job,
}: {
  user: IUserProfilesCollection;
  job: IJobs;
}) => {
  const payload = formatMatchRequestPayload(user, job);

  return axios.post(`${baseUrl}/match`, payload);
};
