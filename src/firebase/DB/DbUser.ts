import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { CollectionName } from "../../@types/enum";
import { db } from "../config";
import CustomError from "../../utilities/CustomError";
import {
  IAuthUsersCollection,
  ISettingsCollection,
  IUserPreferencesCollection,
  IUserProfileCertificationsDetails,
  IUserProfileCustomSections,
  IUserProfileEducationDetailsChildCollection,
  IUserProfilePersonalDetails,
  IUserProfileProjectsDetails,
  IUserProfilesCollection,
  IUserProfileSkillsChildCollection,
  IUserProfileWorkExperienceChildCollection,
} from "../../@types/database";
import { getNewDocId } from "./utils";
import {
  UserPreferenceCreateFormFields,
  UserProfileCreateFormFields,
} from "../../utilities/zod/schema";
import { UserProfileEducationDetailsChildCollection } from "../../component/user/profile/EducationDetails";
import { UserProfileWorkExperienceChildCollection } from "../../component/user/profile/WorkExperience";
import { UserProfileProjectsDetails } from "../../component/user/profile/ProjectDetails";
import { UserProfileCertificationsDetails } from "../../component/user/profile/Certifications";

class DbUser {
  static getAuthUser = (uId: string) => {
    const userRef = doc(db, CollectionName.authUsers, uId);
    return getDoc(userRef);
  };

  static createAuthUser = async (uId: string, email: string) => {
    try {
      const userSnapshot = await this.getAuthUser(uId);
      if (userSnapshot.exists()) {
        throw new CustomError("User already exist");
      }
      const userRef = doc(db, CollectionName.authUsers, uId);
      const newUser: IAuthUsersCollection = {
        AuthUserId: uId,
        AuthUserEmail: email,
        AuthUserCreatedAt: serverTimestamp(),
        AuthUserModifiedAt: serverTimestamp(),
      };

      return setDoc(userRef, newUser);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  static createSettings = async (uId: string) => {
    try {
      const settingsId = getNewDocId(CollectionName.settings);
      const settingsRef = doc(db, CollectionName.settings, settingsId);
      const newSettings: ISettingsCollection = {
        SettingId: settingsId,
        SettingUserId: uId,
        SettingSelectedResumeTemplate: 1,
        SettingCreatedAt: serverTimestamp(),
        SettingModifiedAt: serverTimestamp(),
      };

      return setDoc(settingsRef, newSettings);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  static getSettings = (uId: string) => {
    const settingsRef = collection(db, CollectionName.settings);

    const settingsQuery = query(settingsRef, where("SettingUserId", "==", uId));

    return getDocs(settingsQuery);
  };

  static updateSetting = (
    settingId: string,
    data: Partial<ISettingsCollection>
  ) => {
    const settingsRef = doc(db, CollectionName.settings, settingId);
    return updateDoc(settingsRef, data);
  };

  static deleteUserLoggedInDoc = async (loggedInId: string) => {
    const loggedInRef = doc(db, CollectionName.loggedInUsers, loggedInId);
    return deleteDoc(loggedInRef);
  };

  static getUserLoggedInData = async (
    uId: string,
    loggedInId: string,
    isLoggedIn: boolean
  ) => {
    const loggedInRef = collection(db, CollectionName.loggedInUsers);

    const loggedInQuery = query(
      loggedInRef,
      where("LoggedInId", "==", loggedInId),
      where("LoggedInUserId", "==", uId),
      where("IsLoggedIn", "==", isLoggedIn),
      limit(1)
    );

    return getDocs(loggedInQuery);
  };

  static createUserProfile = ({
    data,
    userId,
    certificationDetails,
    customDetails,
    educationDetails,
    projectDetails,
    skillsDetails,
    workExpDetails,
  }: {
    data: UserProfileCreateFormFields;
    userId: string;
    educationDetails: UserProfileEducationDetailsChildCollection[];
    workExpDetails: UserProfileWorkExperienceChildCollection[];
    skillsDetails: IUserProfileSkillsChildCollection[];
    projectDetails: UserProfileProjectsDetails[];
    certificationDetails: UserProfileCertificationsDetails[];
    customDetails: IUserProfileCustomSections[];
  }) => {
    const userProfileId = getNewDocId(CollectionName.userProfiles);
    const docRef = doc(db, CollectionName.userProfiles, userProfileId);

    const {
      UserProfilePersonalDetails,
      UserProfileLanguages,
      UserProfileHobbies,
    } = data;

    const profileDetails: IUserProfilePersonalDetails = {
      ...UserProfilePersonalDetails,
      UserDateOfBirth: UserProfilePersonalDetails.UserDateOfBirth
        ? (UserProfilePersonalDetails.UserDateOfBirth as unknown as Timestamp)
        : null,
    };

    const educationalDetails: IUserProfileEducationDetailsChildCollection[] =
      educationDetails
        .filter(
          (res) =>
            res.UserEducationDegree &&
            res.UserEducationEndDate &&
            res.UserEducationInstitution &&
            res.UserEducationStartDate
        )
        .map((res) => {
          return {
            ...res,
            UserEducationEndDate:
              res.UserEducationEndDate as unknown as Timestamp,
            UserEducationStartDate:
              res.UserEducationStartDate as unknown as Timestamp,
          };
        });

    const workExperience: IUserProfileWorkExperienceChildCollection[] =
      workExpDetails
        .filter(
          (res) =>
            res.UserWorkExpJobTitle &&
            res.UserWorkExpCompanyName &&
            res.UserWorkExpStartDate
        )
        .map((res) => {
          return {
            ...res,
            UserWorkExpStartDate:
              res.UserWorkExpStartDate as unknown as Timestamp,
            UserWorkExpEndDate: res?.UserWorkExpEndDate
              ? (res.UserWorkExpEndDate as unknown as Timestamp)
              : null,
          };
        });

    const projects: IUserProfileProjectsDetails[] = projectDetails
      .filter((res) => res.UserProjectTitle && res.UserProjectDescription)
      .map((res) => {
        return {
          ...res,
          UserProjectStartDate: res.UserProjectStartDate
            ? (res.UserProjectStartDate as unknown as Timestamp)
            : null,
          UserProjectEndDate: res.UserProjectEndDate
            ? (res.UserProjectEndDate as unknown as Timestamp)
            : null,
        };
      });

    const certification: IUserProfileCertificationsDetails[] =
      certificationDetails
        .filter(
          (res) =>
            res.UserCertificateName &&
            res.UserCertificateIssuedBy &&
            res.UserCertificateIssueDate
        )
        .map((res) => {
          return {
            ...res,
            UserCertificateIssueDate:
              res.UserCertificateIssueDate as unknown as Timestamp,
            UserCertificateExpiryDate: res.UserCertificateExpiryDate
              ? (res.UserCertificateExpiryDate as unknown as Timestamp)
              : null,
          };
        });

    const newUserProfile: IUserProfilesCollection = {
      UserProfileId: userProfileId,
      UserProfileUserId: userId,
      UserProfilePersonalDetails: profileDetails,
      UserProfileEducationDetails: educationalDetails,
      UserProfileWorkExperience: workExperience,
      UserProfileSkills: skillsDetails.filter(
        (s) => s.UserSkillName && s.UserSkillProficiency
      ),
      UserProfileProjects: projects,
      UserProfileCertifications: certification,
      UserProfileLanguages: UserProfileLanguages.filter((s) => s),
      UserProfileHobbies: UserProfileHobbies.filter((s) => s),
      UserProfileCustomSections: customDetails.filter(
        (s) =>
          s.UserProfileCustomSectionContent && s.UserProfileCustomSectionTitle
      ),
      UserProfileCreatedAt: serverTimestamp(),
      UserProfileModifiedAt: serverTimestamp(),
    };

    return setDoc(docRef, newUserProfile);
  };

  static updateUserProfile = ({
    data,
    userProfileId,
    certificationDetails,
    customDetails,
    educationDetails,
    projectDetails,
    skillsDetails,
    workExpDetails,
  }: {
    data: UserProfileCreateFormFields;
    userProfileId: string;
    educationDetails: UserProfileEducationDetailsChildCollection[];
    workExpDetails: UserProfileWorkExperienceChildCollection[];
    skillsDetails: IUserProfileSkillsChildCollection[];
    projectDetails: UserProfileProjectsDetails[];
    certificationDetails: UserProfileCertificationsDetails[];
    customDetails: IUserProfileCustomSections[];
  }) => {
    const docRef = doc(db, CollectionName.userProfiles, userProfileId);

    const {
      UserProfilePersonalDetails,
      UserProfileLanguages,
      UserProfileHobbies,
    } = data;

    const profileDetails: IUserProfilePersonalDetails = {
      ...UserProfilePersonalDetails,
      UserDateOfBirth: UserProfilePersonalDetails.UserDateOfBirth
        ? (UserProfilePersonalDetails.UserDateOfBirth as unknown as Timestamp)
        : null,
    };

    const educationalDetails: IUserProfileEducationDetailsChildCollection[] =
      educationDetails
        .filter(
          (res) =>
            res.UserEducationDegree &&
            res.UserEducationEndDate &&
            res.UserEducationInstitution &&
            res.UserEducationStartDate
        )
        .map((res) => {
          return {
            ...res,
            UserEducationEndDate:
              res.UserEducationEndDate as unknown as Timestamp,
            UserEducationStartDate:
              res.UserEducationStartDate as unknown as Timestamp,
          };
        });

    const workExperience: IUserProfileWorkExperienceChildCollection[] =
      workExpDetails
        .filter(
          (res) =>
            res.UserWorkExpJobTitle &&
            res.UserWorkExpCompanyName &&
            res.UserWorkExpStartDate
        )
        .map((res) => {
          return {
            ...res,
            UserWorkExpStartDate:
              res.UserWorkExpStartDate as unknown as Timestamp,
            UserWorkExpEndDate: res?.UserWorkExpEndDate
              ? (res.UserWorkExpEndDate as unknown as Timestamp)
              : null,
          };
        });

    const projects: IUserProfileProjectsDetails[] = projectDetails
      .filter((res) => res.UserProjectTitle && res.UserProjectDescription)
      .map((res) => {
        return {
          ...res,
          UserProjectStartDate: res.UserProjectStartDate
            ? (res.UserProjectStartDate as unknown as Timestamp)
            : null,
          UserProjectEndDate: res.UserProjectEndDate
            ? (res.UserProjectEndDate as unknown as Timestamp)
            : null,
        };
      });

    const certification: IUserProfileCertificationsDetails[] =
      certificationDetails
        .filter(
          (res) =>
            res.UserCertificateName &&
            res.UserCertificateIssuedBy &&
            res.UserCertificateIssueDate
        )
        .map((res) => {
          return {
            ...res,
            UserCertificateIssueDate:
              res.UserCertificateIssueDate as unknown as Timestamp,
            UserCertificateExpiryDate: res.UserCertificateExpiryDate
              ? (res.UserCertificateExpiryDate as unknown as Timestamp)
              : null,
          };
        });

    const newUserProfile: Partial<IUserProfilesCollection> = {
      UserProfileId: userProfileId,
      UserProfilePersonalDetails: profileDetails,
      UserProfileEducationDetails: educationalDetails,
      UserProfileWorkExperience: workExperience,
      UserProfileSkills: skillsDetails.filter(
        (s) => s.UserSkillName && s.UserSkillProficiency
      ),
      UserProfileProjects: projects,
      UserProfileCertifications: certification,
      UserProfileLanguages: UserProfileLanguages.filter((s) => s),
      UserProfileHobbies: UserProfileHobbies.filter((s) => s),
      UserProfileCustomSections: customDetails.filter(
        (s) =>
          s.UserProfileCustomSectionContent && s.UserProfileCustomSectionTitle
      ),
      UserProfileModifiedAt: serverTimestamp(),
    };

    return updateDoc(docRef, newUserProfile);
  };

  static getUserProfile = (authUserId: string) => {
    const docRef = collection(db, CollectionName.userProfiles);
    const docQuery = query(
      docRef,
      where("UserProfileUserId", "==", authUserId),
      limit(1)
    );

    return getDocs(docQuery);
  };

  static createUserPreferences = (
    userId: string,
    data: UserPreferenceCreateFormFields
  ) => {
    const preferenceId = getNewDocId(CollectionName.userPreferences);
    const preferencesRef = doc(
      db,
      CollectionName.userPreferences,
      preferenceId
    );

    const {
      PreferenceEmploymentType,
      PreferenceExpLevel,
      PreferenceJobTitles,
      PreferenceLocations,
      PreferenceSalaryRange,
      PreferenceWorkplaceType,
    } = data;

    const newPreferences: IUserPreferencesCollection = {
      PreferenceId: preferenceId,
      PreferenceUserId: userId,
      PreferenceJobTitles,
      PreferenceLocations,
      PreferenceEmploymentType,
      PreferenceSalaryRange: {
        Min: PreferenceSalaryRange.Min || null,
        Max: PreferenceSalaryRange.Max || null,
      },
      PreferenceExpLevel,
      PreferenceWorkplaceType,
      PreferenceCreatedAt: serverTimestamp(),
      PreferenceUpdatedAt: serverTimestamp(),
    };

    return setDoc(preferencesRef, newPreferences);
  };

  static updateUserPreferences = (
    preferenceId: string,
    data: UserPreferenceCreateFormFields
  ) => {
    const preferencesRef = doc(
      db,
      CollectionName.userPreferences,
      preferenceId
    );

    const {
      PreferenceEmploymentType,
      PreferenceExpLevel,
      PreferenceJobTitles,
      PreferenceLocations,
      PreferenceSalaryRange,
      PreferenceWorkplaceType,
    } = data;

    const newPreferences: Partial<IUserPreferencesCollection> = {
      PreferenceId: preferenceId,
      PreferenceJobTitles,
      PreferenceLocations,
      PreferenceEmploymentType,
      PreferenceSalaryRange: {
        Min: PreferenceSalaryRange.Min || null,
        Max: PreferenceSalaryRange.Max || null,
      },
      PreferenceExpLevel,
      PreferenceWorkplaceType,
      PreferenceUpdatedAt: serverTimestamp(),
    };

    return updateDoc(preferencesRef, newPreferences);
  };

  static getUserPreferences = (userId: string) => {
    const userPreferencesRef = collection(db, CollectionName.userPreferences);
    const userPreferencesQuery = query(
      userPreferencesRef,
      where("PreferenceUserId", "==", userId),
      limit(1)
    );

    return getDocs(userPreferencesQuery);
  };
}

export default DbUser;
