import { StateCreator } from "zustand";
import {
  ILoggedInUsersCollection,
  IAuthUsersCollection,
} from "../../@types/database";
import * as storage from "../../utilities/Storage";
import { LocalStorageKey } from "../../@types/enum";
import DbUser from "../../firebase/DB/DbUser";

interface AuthState {
  user: IAuthUsersCollection | null;
  setUser: (admin: IAuthUsersCollection | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  userSignOut: () => void;
}

export const createAuthSlice: StateCreator<AuthState> = (set) => ({
  user: null,
  setUser: (admin) => set((state) => ({ ...state, admin })),
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
        admin: null,
        company: null,
        client: null,
        superAdmin: null,
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
