export enum CollectionName {
  authUsers = "AuthUsers",
  loggedInUsers = "LoggedInUsers",
}

export const PageRoutes = {
  HOME: "/",
  ABOUT: "/about",
  LOGIN: "/login",
  SIGNUP: "/signup",
  USER_HOME: "/user/home",
};

export const LocalStorageKey = {
  LOGGEDIN_USER: "loggedInUser",
};

export interface LocalStorageLoggedInUserData {
  LoggedInId: string;
  LoggedInUserId: string;
  LoggedInAuthUserType: "user" | "admin";
}
