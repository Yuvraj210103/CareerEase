import {
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
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
}

export default DbUser;
