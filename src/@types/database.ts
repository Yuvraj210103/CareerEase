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
  LoggedInNotifyFcmToken?: string;
}

//*User profile data

export interface IUserProfileEducationDetailsChildCollection {
  UserEducationDegree: string;
  UserEducationInstitution: string;
  UserEducationStartDate: Timestamp | FieldValue;
  UserEducationEndDate?: Timestamp | FieldValue;
  UserEducationGrade?: string;
  UserEducationDescription?: string;
}

export interface IUserProfileWorkExperienceChildCollection {
  UserWorkExpJobTitle: string;
  UserWorkExpCompanyName: string;
  UserWorkExpStartDate: Timestamp | FieldValue;
  UserWorkExpEndDate?: Timestamp | FieldValue;
  UserWorkExpResponsibilities?: string[];
  UserWorkExpAchievements?: string[];
}

export interface IUserProfileProjectsDetails {
  UserProjectTitle: string;
  UserProjectDescription: string;
  UserProjectTechnologies: string[];
  UserProjectStartDate?: Timestamp | FieldValue;
  UserProjectEndDate?: Timestamp | FieldValue;
  UserProjectLink?: string;
}

export interface IUserProfileCertificationsDetails {
  UserCertificateName: string;
  UserCertificateIssuedBy: string;
  UserCertificateIssueDate: Timestamp | FieldValue;
  UserCertificateExpiryDate?: Timestamp | FieldValue;
}

export interface IUserProfileCustomSections {
  UserProfileCustomSectionTitle: string;
  UserProfileCustomSectionContent: string;
}

//*Main interface
export interface IUserProfilesCollection {
  UserProfileId: string;
  UserProfileUserId: string;
  UserProfilePersonalDetails: {
    UserFullName: string;
    UserEmail: string;
    UserPhone: string;
    UserAddress?: string;
    UserLinkedIn?: string;
    UserGitHub?: string;
    UserWebsite?: string;
    UserDateOfBirth?: Timestamp | FieldValue;
  };
  UserProfileEducationDetails: IUserProfileEducationDetailsChildCollection[];
  UserProfileWorkExperience: IUserProfileWorkExperienceChildCollection[];
  UserProfileSkills: string[];
  UserProfileProjects: IUserProfileProjectsDetails[];
  UserProfileCertifications: IUserProfileCertificationsDetails[];
  UserProfileLanguages: string[];
  UserProfileHobbies?: string[];
  UserProfileCustomSections?: IUserProfileCustomSections[];
  UserProfileCreatedAt: Timestamp | FieldValue;
  UserProfileModifiedAt?: Timestamp | FieldValue;
}
