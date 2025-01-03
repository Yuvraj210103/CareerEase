import { StateCreator } from "zustand";
import {
  ILoggedInUsersCollection,
  IAuthUsersCollection,
  IUserProfilesCollection,
  ISettingsCollection,
  IUserPreferencesCollection,
} from "../../@types/database";
import * as storage from "../../utilities/Storage";
import { LocalStorageKey } from "../../@types/enum";
import DbUser from "../../firebase/DB/DbUser";

interface AuthState {
  authUser: IAuthUsersCollection | null;
  setAuthUser: (authUser: IAuthUsersCollection | null) => void;

  userProfile: IUserProfilesCollection | null;
  setUserProfile: (userProfile: IUserProfilesCollection | null) => void;

  userPreferences: IUserPreferencesCollection | null;
  setUserPreferences: (
    userPreferences: IUserPreferencesCollection | null
  ) => void;

  settings: ISettingsCollection | null;
  setSettings: (settings: ISettingsCollection | null) => void;

  loading: boolean;
  setLoading: (loading: boolean) => void;
  userSignOut: () => void;
}

export const createAuthSlice: StateCreator<AuthState> = (set) => ({
  authUser: null,
  setAuthUser: (authUser) => set((state) => ({ ...state, authUser })),
  //User Profile
  userProfile: null,
  setUserProfile: (userProfile) => set((state) => ({ ...state, userProfile })),

  //User Preferences
  userPreferences: null,
  setUserPreferences: (userPreferences) =>
    set((state) => ({ ...state, userPreferences })),

  //Settings
  settings: null,
  setSettings: (settings) => set((state) => ({ ...state, settings })),
  loading: true,
  setLoading: (loading) => set((state) => ({ ...state, loading })),
  // For logging out user
  userSignOut: () => {
    const loggedInUser: ILoggedInUsersCollection | null = storage.getJson(
      LocalStorageKey.LOGGEDIN_USER
    );

    if (loggedInUser) {
      set((state) => ({
        ...state,
        authUser: null,
        company: null,
        client: null,
        superuser: null,
      }));
      DbUser.deleteUserLoggedInDoc(loggedInUser.LoggedInId)
        .then(() => {
          storage.clear(LocalStorageKey.LOGGEDIN_USER);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
});
