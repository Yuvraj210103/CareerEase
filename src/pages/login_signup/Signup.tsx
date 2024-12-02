import { FirebaseError } from "firebase/app";
import Button from "../../component/common/button/Button";
import InputWithTopHeader from "../../component/common/inputs/InputWithTopHeader";
import {
  closeModalLoader,
  showModalLoader,
  showSnackbar,
} from "../../utilities/TsxUtils";
import * as storage from "../../utilities/Storage";
import { useState } from "react";
import CustomError, { errorHandler } from "../../utilities/CustomError";
import { useNavigate } from "react-router-dom";
import {
  CollectionName,
  LocalStorageKey,
  LocalStorageLoggedInUserData,
  PageRoutes,
} from "../../@types/enum";
import { getAuth, createUserWithEmailAndPassword, User } from "firebase/auth";
import DbUser from "../../firebase/DB/DbUser";
import {
  ILoggedInUsersCollection,
  IAuthUsersCollection,
} from "../../@types/database";
import { getNewDocId } from "../../firebase/DB/utils";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAuthState } from "../../store";

const SignUp = () => {
  const { setUser } = useAuthState();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const auth = getAuth();

  const signInSuccess = async (dbUser: User) => {
    try {
      const uId = dbUser.uid;

      //* Fetch auth user and store in zustand

      await DbUser.createAuthUser(uId, email);

      const newUser: IAuthUsersCollection = {
        AuthUserId: uId,
        AuthUserEmail: email,
        AuthUserCreatedAt: serverTimestamp(),
        AuthUserModifiedAt: serverTimestamp(),
      };

      setUser(newUser);

      //* Create a new loggedInUser doc
      const loggedInId = getNewDocId(CollectionName.loggedInUsers);

      const newLoggedInDoc: ILoggedInUsersCollection = {
        LoggedInId: loggedInId,
        LoggedInUserId: uId,
        IsLoggedIn: true,
        LoggedInCreatedAt: serverTimestamp(),
        LoggedInUserType: "user",
      };
      const loggedInDocRef = doc(db, CollectionName.loggedInUsers, loggedInId);

      await setDoc(loggedInDocRef, newLoggedInDoc);

      const lsLoggedInUser: LocalStorageLoggedInUserData = {
        LoggedInId: loggedInId,
        LoggedInUserId: uId,
        LoggedInAuthUserType: "user",
      };

      storage.setJson(LocalStorageKey.LOGGEDIN_USER, lsLoggedInUser);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const onSignUp = async () => {
    const emailRegex = new RegExp(
      /^(^[\w%+.-]+@[\d.A-Za-z-]+\.[A-Za-z]{2,}$)?$/
    );

    try {
      if (!emailRegex.test(email)) {
        throw new CustomError("Please enter valid email");
      }
      if (password.length < 6) {
        throw new CustomError("Password should be at least six characters");
      }
      if (confirmPassword !== password) {
        throw new CustomError("Password and confirm password must be matching");
      }
      showModalLoader({});

      const dbUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await signInSuccess(dbUser.user);

      window.location.reload();
    } catch (error) {
      closeModalLoader();
      console.log(error);
      if (error instanceof FirebaseError) {
        showSnackbar({ message: error.message, type: "error" });
        return;
      }
      errorHandler(error);
    }
  };

  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <div className="bg-surface rounded shadow flex flex-col md:max-w-lg w-full p-4">
        <div className="font-semibold text-lg">Sign up</div>
        <InputWithTopHeader
          className="mx-0 mt-6"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputWithTopHeader
          className="mx-0 mt-6"
          label="Password"
          inputType="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <InputWithTopHeader
          className="mx-0 mt-6"
          label="Confirm Password"
          inputType="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button
          label="Sign up"
          onClick={onSignUp}
          disabled={!email || !password || !confirmPassword}
          type="blue"
          className="py-2 mt-6"
          buttonType="submit"
        />

        <div
          onClick={() => navigate(PageRoutes.LOGIN)}
          className="text text-textPrimaryBlue mt-2 cursor-pointer font-medium"
        >
          Already have an account? Login here!
        </div>
      </div>
    </div>
  );
};

export default SignUp;
