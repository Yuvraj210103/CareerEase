import {
  IUserProfileCustomSections,
  IUserProfileSkillsChildCollection,
} from "../@types/database";
import { UserProfileCertificationsDetails } from "../component/user/profile/Certifications";
import { UserProfileEducationDetailsChildCollection } from "../component/user/profile/EducationDetails";
import { UserProfileProjectsDetails } from "../component/user/profile/ProjectDetails";
import { UserProfileWorkExperienceChildCollection } from "../component/user/profile/WorkExperience";
import CustomError from "./CustomError";

interface ProfileFormArgs {
  educationDetails: UserProfileEducationDetailsChildCollection[];
  workExpDetails: UserProfileWorkExperienceChildCollection[];
  skillsDetails: IUserProfileSkillsChildCollection[];
  projectDetails: UserProfileProjectsDetails[];
  certificationDetails: UserProfileCertificationsDetails[];
  customDetails: IUserProfileCustomSections[];
}

export const isEducationDetailsInValid = (
  educationDetails: UserProfileEducationDetailsChildCollection[]
) => {
  return educationDetails.some(
    (d) =>
      !d.UserEducationDegree ||
      !d.UserEducationInstitution ||
      !d.UserEducationStartDate ||
      !d.UserEducationEndDate
  );
};

export const isWorkExpInValid = (
  educationDetails: UserProfileWorkExperienceChildCollection[]
) => {
  return educationDetails.some(
    (d) =>
      !d.UserWorkExpJobTitle ||
      !d.UserWorkExpCompanyName ||
      !d.UserWorkExpStartDate
  );
};

export const isSkillDetailsInValid = (
  educationDetails: IUserProfileSkillsChildCollection[]
) => {
  return educationDetails.some(
    (d) => !d.UserSkillName || !d.UserSkillProficiency
  );
};

export const isProjectDetailsInValid = (
  educationDetails: UserProfileProjectsDetails[]
) => {
  return educationDetails.some(
    (d) =>
      !d.UserProjectTitle ||
      !d.UserProjectDescription ||
      !d.UserProjectTechnologies
  );
};

export const isCertificationDetailsInValid = (
  educationDetails: UserProfileCertificationsDetails[]
) => {
  return educationDetails.some(
    (d) =>
      !d.UserCertificateName ||
      !d.UserCertificateIssuedBy ||
      !d.UserCertificateIssueDate
  );
};

export const isCustomDetailsInValid = (
  educationDetails: IUserProfileCustomSections[]
) => {
  return educationDetails.some(
    (d) =>
      !d.UserProfileCustomSectionContent || !d.UserProfileCustomSectionTitle
  );
};

export const isUserProfileFormInvalid = ({
  certificationDetails,
  customDetails,
  educationDetails,
  projectDetails,
  skillsDetails,
  workExpDetails,
}: ProfileFormArgs) => {
  if (isProjectDetailsInValid(projectDetails)) {
    throw new CustomError("Please fill the required project details");
  }
  if (isSkillDetailsInValid(skillsDetails)) {
    throw new CustomError("Please fill the required skills details");
  }
  if (isWorkExpInValid(workExpDetails)) {
    throw new CustomError("Please fill the required work experience details");
  }
  if (isEducationDetailsInValid(educationDetails)) {
    throw new CustomError("Please fill the required education details");
  }
  if (isCustomDetailsInValid(customDetails)) {
    throw new CustomError("Please fill the required custom details");
  }

  if (isCertificationDetailsInValid(certificationDetails)) {
    throw new CustomError("Please fill the required certifications details");
  }
};
