export enum CollectionName {
  authUsers = "AuthUsers",
  loggedInUsers = "LoggedInUsers",
  userProfiles = "UserProfiles",
}

export const PageRoutes = {
  HOME: "/",
  ABOUT: "/about",
  LOGIN: "/login",
  SIGNUP: "/signup",
  USER_HOME: "/user/home",
  USER_PROFILE: "/user/profile",
  USER_RESUME_TEMPLATES: "/user/resume_template",
  USER_INTERVIEW_PREPARATION: "/user/interview_preparation",
  USER_JOB_APPLICATION: "/user/job_application",
};

export const LocalStorageKey = {
  LOGGEDIN_USER: "loggedInUser",
};

export interface LocalStorageLoggedInUserData {
  LoggedInId: string;
  LoggedInUserId: string;
  LoggedInAuthUserType: "user" | "admin";
}
