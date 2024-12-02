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
import { IAuthUsersCollection } from "../@types/database";

const useOnAuthStateChanged = () => {
  const { setUser, setLoading } = useAuthState();

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

        const snapshot = await DbUser.getAuthUser(
          loggedInUserData.LoggedInUserId
        );
        const user = snapshot.data() as IAuthUsersCollection;
        setUser(user);
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
