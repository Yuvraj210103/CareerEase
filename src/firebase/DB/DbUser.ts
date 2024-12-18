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
  IUserProfileEducationDetailsChildCollection,
  IUserProfilePersonalDetails,
  IUserProfileProjectsDetails,
  IUserProfilesCollection,
  IUserProfileWorkExperienceChildCollection,
} from "../../@types/database";
import { getNewDocId } from "./utils";
import { UserProfileCreateFormFields } from "../../utilities/zod/schema";

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

  static createUserProfile = (
    data: UserProfileCreateFormFields,
    userId: string
  ) => {
    const userProfileId = getNewDocId(CollectionName.userProfiles);
    const docRef = doc(db, CollectionName.userProfiles, userProfileId);

    const {
      UserProfileCertifications,
      UserProfileCustomSections,
      UserProfileEducationDetails,
      UserProfileHobbies,
      UserProfileLanguages,
      UserProfilePersonalDetails,
      UserProfileProjects,
      UserProfileSkills,
      UserProfileWorkExperience,
    } = data;

    const profileDetails: IUserProfilePersonalDetails = {
      ...UserProfilePersonalDetails,
      UserDateOfBirth: UserProfilePersonalDetails.UserDateOfBirth
        ? (UserProfilePersonalDetails.UserDateOfBirth as unknown as Timestamp)
        : null,
    };

    const educationalDetails: IUserProfileEducationDetailsChildCollection[] =
      UserProfileEducationDetails.map((res) => {
        return {
          ...res,
          UserEducationEndDate: res?.UserEducationEndDate
            ? (res.UserEducationEndDate as unknown as Timestamp)
            : null,
          UserEducationStartDate:
            res.UserEducationStartDate as unknown as Timestamp,
        };
      });

    const workExperience: IUserProfileWorkExperienceChildCollection[] =
      UserProfileWorkExperience.map((res) => {
        return {
          ...res,
          UserWorkExpStartDate:
            res.UserWorkExpStartDate as unknown as Timestamp,
          UserWorkExpEndDate: res?.UserWorkExpEndDate
            ? (res.UserWorkExpEndDate as unknown as Timestamp)
            : null,
          UserWorkExpResponsibilities: res.UserWorkExpResponsibilities || [],
          UserWorkExpAchievements: res.UserWorkExpAchievements || [],
        };
      });

    const projects: IUserProfileProjectsDetails[] = UserProfileProjects.map(
      (res) => {
        return {
          ...res,
          UserProjectStartDate: res.UserProjectStartDate
            ? (res.UserProjectStartDate as unknown as Timestamp)
            : null,
          UserProjectEndDate: res.UserProjectEndDate
            ? (res.UserProjectEndDate as unknown as Timestamp)
            : null,
        };
      }
    );

    const certification = UserProfileCertifications.map((res) => {
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
      UserProfileSkills: UserProfileSkills || [],
      UserProfileProjects: projects,
      UserProfileCertifications: certification,
      UserProfileLanguages: UserProfileLanguages || [],
      UserProfileHobbies: UserProfileHobbies || [],
      UserProfileCustomSections: UserProfileCustomSections || [],
      UserProfileCreatedAt: serverTimestamp(),
      UserProfileModifiedAt: serverTimestamp(),
    };

    return setDoc(docRef, newUserProfile);
  };

  static updateUserProfile = (
    data: UserProfileCreateFormFields,
    userProfileId: string
  ) => {
    const docRef = doc(db, CollectionName.userProfiles, userProfileId);

    const {
      UserProfileCertifications,
      UserProfileCustomSections,
      UserProfileEducationDetails,
      UserProfileHobbies,
      UserProfileLanguages,
      UserProfilePersonalDetails,
      UserProfileProjects,
      UserProfileSkills,
      UserProfileWorkExperience,
    } = data;

    const profileDetails: IUserProfilePersonalDetails = {
      ...UserProfilePersonalDetails,
      UserDateOfBirth: UserProfilePersonalDetails.UserDateOfBirth
        ? (UserProfilePersonalDetails.UserDateOfBirth as unknown as Timestamp)
        : null,
    };

    const educationalDetails: IUserProfileEducationDetailsChildCollection[] =
      UserProfileEducationDetails.map((res) => {
        return {
          ...res,
          UserEducationEndDate: res?.UserEducationEndDate
            ? (res.UserEducationEndDate as unknown as Timestamp)
            : null,
          UserEducationStartDate:
            res.UserEducationStartDate as unknown as Timestamp,
        };
      });

    const workExperience: IUserProfileWorkExperienceChildCollection[] =
      UserProfileWorkExperience.map((res) => {
        return {
          ...res,
          UserWorkExpStartDate:
            res.UserWorkExpStartDate as unknown as Timestamp,
          UserWorkExpEndDate: res?.UserWorkExpEndDate
            ? (res.UserWorkExpEndDate as unknown as Timestamp)
            : null,
          UserWorkExpResponsibilities: res.UserWorkExpResponsibilities || [],
          UserWorkExpAchievements: res.UserWorkExpAchievements || [],
        };
      });

    const projects: IUserProfileProjectsDetails[] = UserProfileProjects.map(
      (res) => {
        return {
          ...res,
          UserProjectStartDate: res.UserProjectStartDate
            ? (res.UserProjectStartDate as unknown as Timestamp)
            : null,
          UserProjectEndDate: res.UserProjectEndDate
            ? (res.UserProjectEndDate as unknown as Timestamp)
            : null,
        };
      }
    );

    const certification = UserProfileCertifications.map((res) => {
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
      UserProfilePersonalDetails: profileDetails,
      UserProfileEducationDetails: educationalDetails,
      UserProfileWorkExperience: workExperience,
      UserProfileSkills: UserProfileSkills || [],
      UserProfileProjects: projects,
      UserProfileCertifications: certification,
      UserProfileLanguages: UserProfileLanguages || [],
      UserProfileHobbies: UserProfileHobbies || [],
      UserProfileCustomSections: UserProfileCustomSections || [],
      UserProfileModifiedAt: serverTimestamp(),
    };

    return updateDoc(docRef, newUserProfile);
  };
}

export default DbUser;
