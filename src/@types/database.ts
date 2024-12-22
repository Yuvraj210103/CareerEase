import { FieldValue, Timestamp } from "firebase/firestore";

export interface IAuthUsersCollection {
  AuthUserId: string; //*Doc id
  AuthUserEmail: string; //* This will be used for login
  AuthUserCreatedAt: Timestamp | FieldValue;
  AuthUserModifiedAt: Timestamp | FieldValue;
}

//* To keep track of logged in users
export interface ILoggedInUsersCollection {
  LoggedInId: string;
  LoggedInUserId: string;
  IsLoggedIn: boolean;
  LoggedInUserType: "user" | "admin";
  LoggedInCreatedAt: Timestamp | FieldValue;
  LoggedInNotifyFcmToken?: string | null;
}

//*User profile data

export interface IUserProfilePersonalDetails {
  UserFullName: string;
  UserEmail: string;
  UserPhone: string;
  UserAddress?: string | null;
  UserLinkedIn?: string | null;
  UserGitHub?: string | null;
  UserWebsite?: string | null;
  UserDateOfBirth?: Timestamp | FieldValue | null;
}

export interface IUserProfileEducationDetailsChildCollection {
  UserEducationDegree: string;
  UserEducationInstitution: string;
  UserEducationStartDate: Timestamp | FieldValue;
  UserEducationEndDate: Timestamp | FieldValue;
  UserEducationGrade: string | null;
  UserEducationDescription: string | null;
}

export interface IUserProfileWorkExperienceChildCollection {
  UserWorkExpJobTitle: string;
  UserWorkExpCompanyName: string;
  UserWorkExpStartDate: Timestamp | FieldValue;
  UserWorkExpEndDate?: Timestamp | FieldValue | null;
  UserWorkExpResponsibilities: string[];
  UserWorkExpAchievements: string[];
}

export interface IUserProfileSkillsChildCollection {
  UserSkillName: string;
  UserSkillProficiency: number; //* 1 to 5
}

export interface IUserProfileProjectsDetails {
  UserProjectTitle: string;
  UserProjectDescription: string;
  UserProjectTechnologies: string[];
  UserProjectStartDate?: Timestamp | FieldValue | null;
  UserProjectEndDate?: Timestamp | FieldValue | null;
  UserProjectLink?: string | null;
}

export interface IUserProfileCertificationsDetails {
  UserCertificateName: string;
  UserCertificateIssuedBy: string;
  UserCertificateIssueDate: Timestamp | FieldValue;
  UserCertificateExpiryDate?: Timestamp | FieldValue | null;
}

export interface IUserProfileCustomSections {
  UserProfileCustomSectionTitle: string;
  UserProfileCustomSectionContent: string;
}

//*Main interface
export interface IUserProfilesCollection {
  UserProfileId: string;
  UserProfileUserId: string;
  UserProfilePersonalDetails: IUserProfilePersonalDetails;
  UserProfileEducationDetails: IUserProfileEducationDetailsChildCollection[];
  UserProfileWorkExperience: IUserProfileWorkExperienceChildCollection[];
  UserProfileSkills: IUserProfileSkillsChildCollection[];
  UserProfileProjects: IUserProfileProjectsDetails[];
  UserProfileCertifications: IUserProfileCertificationsDetails[];
  UserProfileLanguages: string[];
  UserProfileHobbies: string[];
  UserProfileCustomSections: IUserProfileCustomSections[];
  UserProfileCreatedAt: Timestamp | FieldValue;
  UserProfileModifiedAt: Timestamp | FieldValue;
}
