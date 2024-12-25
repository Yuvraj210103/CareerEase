import { useEffect } from "react";
import * as storage from "../utilities/Storage";
import {
  LocalStorageKey,
  LocalStorageLoggedInUserData,
  PageRoutes,
} from "../@types/enum";

import { useAuthState } from "../store";

import { useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import DbUser from "../firebase/DB/DbUser";
import {
  IAuthUsersCollection,
  ISettingsCollection,
  IUserProfilesCollection,
} from "../@types/database";

const useOnAuthStateChanged = () => {
  const { setAuthUser, setUserProfile, setLoading, setSettings } =
    useAuthState();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userAuth) => {
      try {
        setLoading(true);
        const loggedInUser = storage.getJson<LocalStorageLoggedInUserData>(
          LocalStorageKey.LOGGEDIN_USER
        );
        if (!userAuth) {
          console.log("userAuth not found -> signing out");
          if (loggedInUser && loggedInUser?.LoggedInId) {
            console.log("Deleting loggedIn user doc");
            await DbUser.deleteUserLoggedInDoc(loggedInUser?.LoggedInId);
            storage.clear(LocalStorageKey.LOGGEDIN_USER);
          }
          setLoading(false);
          return;
        }

        if (!loggedInUser) {
          setLoading(false);
          return;
        }

        const { LoggedInId, LoggedInUserId } = loggedInUser;

        if (!LoggedInId) {
          console.log("LoggedInId not found -> signing out");
          setLoading(false);
          return;
        }

        // query loggedin user
        const loggedInUserDoc = await DbUser.getUserLoggedInData(
          LoggedInUserId,
          LoggedInId,
          true
        );

        if (!loggedInUserDoc || loggedInUserDoc.docs.length === 0) {
          console.log("loggedInUserDoc not found -> signing out");
          setLoading(false);
          return;
        }

        const loggedInUserData = loggedInUserDoc.docs[0].data();

        //*Fetch auth user
        const snapshot = await DbUser.getAuthUser(
          loggedInUserData.LoggedInUserId
        );
        const user = snapshot.data() as IAuthUsersCollection;
        setAuthUser(user);

        //*fetch user profile
        const userProfileSnapshot = await DbUser.getUserProfile(
          loggedInUserData.LoggedInUserId
        );
        const userProfile =
          userProfileSnapshot.docs[0]?.data() as IUserProfilesCollection;
        setUserProfile(userProfile);

        //*fetch user settings
        const settingsSnapshot = await DbUser.getSettings(
          loggedInUserData.LoggedInUserId
        );
        if (settingsSnapshot.empty) {
          await DbUser.createSettings(loggedInUserData.LoggedInUserId);
          window.location.reload();
        } else {
          const settings =
            settingsSnapshot.docs[0]?.data() as ISettingsCollection;
          setSettings(settings);
        }

        //Navigate to authenticated pages
        if (!location.pathname.includes("/user")) {
          navigate(PageRoutes.USER_HOME);
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
};

export default useOnAuthStateChanged;
