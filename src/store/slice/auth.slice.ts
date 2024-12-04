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
  setUser: (user: IAuthUsersCollection | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  userSignOut: () => void;
}

export const createAuthSlice: StateCreator<AuthState> = (set) => ({
  user: null,
  setUser: (user) => set((state) => ({ ...state, user })),
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
        user: null,
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
