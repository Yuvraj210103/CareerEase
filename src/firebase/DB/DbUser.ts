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
  where,
} from "firebase/firestore";
import { CollectionName } from "../../@types/enum";
import { db } from "../config";
import CustomError from "../../utilities/CustomError";
import { IAuthUsersCollection } from "../../@types/database";

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
}

export default DbUser;
