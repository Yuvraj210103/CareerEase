import { z } from "zod";

const userProfilePersonalDetails = z.object({
  UserFullName: z.string().min(3),
  UserEmail: z.string().min(6),
  UserPhone: z.string().min(10),
  UserAddress: z.string().nullable(),
  UserLinkedIn: z.string().nullable(),
  UserGitHub: z.string().nullable(),
  UserWebsite: z.string().nullable(),
  UserDateOfBirth: z.date().nullable(),
});

const userProfileEducationalDetails = z.object({
  UserEducationDegree: z.string(),
  UserEducationInstitution: z.string(),
  UserEducationStartDate: z.date(),
  UserEducationEndDate: z.date().nullable(),
  UserEducationGrade: z.string().nullable(),
  UserEducationDescription: z.string(),
});

const userProfileWorkExperienceDetails = z.object({
  UserWorkExpJobTitle: z.string(),
  UserWorkExpCompanyName: z.string(),
  UserWorkExpStartDate: z.date(),
  UserWorkExpEndDate: z.date().nullable(),
  UserWorkExpResponsibilities: z.array(z.string()).nullable(),
  UserWorkExpAchievements: z.array(z.string()).nullable(),
});

const userProfileProjectDetails = z.object({
  UserProjectTitle: z.string(),
  UserProjectDescription: z.string(),
  UserProjectTechnologies: z.array(z.string()),
  UserProjectStartDate: z.date().nullable(),
  UserProjectEndDate: z.date().nullable(),
  UserProjectLink: z.string().nullable(),
});

const userProfileCertificationDetails = z.object({
  UserCertificateName: z.string(),
  UserCertificateIssuedBy: z.string(),
  UserCertificateIssueDate: z.date(),
  UserCertificateExpiryDate: z.date().nullable(),
});

const userProfileCustomDetails = z.object({
  UserProfileCustomSectionTitle: z.string(),
  UserProfileCustomSectionContent: z.string(),
});

export const userProfileCreateSchema = z.object({
  UserProfilePersonalDetails: userProfilePersonalDetails,
  UserProfileEducationDetails: z.array(userProfileEducationalDetails),
  UserProfileWorkExperience: z.array(userProfileWorkExperienceDetails),
  UserProfileSkills: z.array(z.string()),
  UserProfileProjects: z.array(userProfileProjectDetails),
  UserProfileCertifications: z.array(userProfileCertificationDetails),
  UserProfileLanguages: z.array(z.string()),
  UserProfileHobbies: z.array(z.string()),
  UserProfileCustomSections: z.array(userProfileCustomDetails),
});

export type UserProfileCreateFormFields = z.infer<
  typeof userProfileCreateSchema
>;
