import { z } from "zod";
import {
  IEmploymentType,
  IExpLevel,
  IWorkPlaceType,
} from "../../@types/database";

const userProfilePersonalDetails = z.object({
  UserFullName: z.string().min(3),
  UserEmail: z.string().min(6),
  UserPhone: z.string().min(10),
  UserSummary: z.string().nullable(),
  UserAddress: z.string().nullable(),
  UserLinkedIn: z.string().nullable(),
  UserGitHub: z.string().nullable(),
  UserWebsite: z.string().nullable(),
  UserDateOfBirth: z.date().nullable(),
});

/* const userProfileEducationalDetails = z.object({
  UserEducationDegree: z.string(),
  UserEducationInstitution: z.string(),
  UserEducationStartDate: z.date(),
  UserEducationEndDate: z.date(),
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
}); */

export const userProfileCreateSchema = z.object({
  UserProfilePersonalDetails: userProfilePersonalDetails,
  UserProfileLanguages: z.array(z.string()).default([]),
  UserProfileHobbies: z.array(z.string()).default([]),
  /* UserProfileEducationDetails: z.array(userProfileEducationalDetails),
  UserProfileWorkExperience: z.array(userProfileWorkExperienceDetails),
  UserProfileSkills: z.array(
    z.object({ UserSkillName: z.string(), UserSkillProficiency: z.number() })
  ),
  UserProfileProjects: z.array(userProfileProjectDetails),
  UserProfileCertifications: z.array(userProfileCertificationDetails),
  
  UserProfileCustomSections: z.array(userProfileCustomDetails), */
});

export type UserProfileCreateFormFields = z.infer<
  typeof userProfileCreateSchema
>;

export const userPreferenceCreateSchema = z.object({
  PreferenceJobTitles: z.array(z.string()),
  PreferenceLocations: z.array(z.string()),
  PreferenceEmploymentType: z.enum([
    IEmploymentType.fullTime,
    IEmploymentType.partTime,
    IEmploymentType.internship,
    IEmploymentType.contract,
  ]),
  PreferenceSalaryRange: z.object({
    Min: z.coerce.number().optional().nullable(),
    Max: z.coerce.number().optional().nullable(),
  }),
  PreferenceExpLevel: z.enum([
    IExpLevel.entryLevel,
    IExpLevel.midLevel,
    IExpLevel.seniorLevel,
  ]),
  PreferenceWorkplaceType: z.enum([
    IWorkPlaceType.onSite,
    IWorkPlaceType.remote,
    IWorkPlaceType.hybrid,
  ]),
});

export type UserPreferenceCreateFormFields = z.infer<
  typeof userPreferenceCreateSchema
>;
