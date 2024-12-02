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
