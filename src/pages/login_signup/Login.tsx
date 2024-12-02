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
import { errorHandler } from "../../utilities/CustomError";
import { useNavigate } from "react-router-dom";
import {
  CollectionName,
  LocalStorageKey,
  LocalStorageLoggedInUserData,
  PageRoutes,
} from "../../@types/enum";
import { useAuthState } from "../../store";
import { getAuth, signInWithEmailAndPassword, User } from "firebase/auth";
import DbUser from "../../firebase/DB/DbUser";
import {
  ILoggedInUsersCollection,
  IAuthUsersCollection,
} from "../../@types/database";
import { getNewDocId } from "../../firebase/DB/utils";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useAuthState();

  const auth = getAuth();

  const signInSuccess = async (dbUser: User) => {
    try {
      const uId = dbUser.uid;

      //* Fetch auth user and store in zustand

      const userSnapshot = await DbUser.getAuthUser(uId);
      const user = userSnapshot.data() as IAuthUsersCollection;
      setUser(user);

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
  const onLogin = async () => {
    const emailRegex = new RegExp(
      /^(^[\w%+.-]+@[\d.A-Za-z-]+\.[A-Za-z]{2,}$)?$/
    );
    if (!emailRegex.test(email)) {
      showSnackbar({ message: "Please enter valid email", type: "error" });
      return;
    }

    try {
      showModalLoader({});

      const dbUser = await signInWithEmailAndPassword(auth, email, password);

      await signInSuccess(dbUser.user);

      window.location.reload();
    } catch (error) {
      closeModalLoader();
      console.log(error);
      if (error instanceof FirebaseError) {
        showSnackbar({ message: "Invalid credential", type: "error" });
        return;
      }
      errorHandler(error);
    }
  };

  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);

  console.log(forgotPasswordModal);

  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="bg-surface rounded shadow flex flex-col md:max-w-lg w-full p-4">
        <div className="font-semibold text-lg">Login</div>
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

        <Button
          label="Login"
          onClick={onLogin}
          disabled={!email || !password}
          type="blue"
          className="py-2 mt-6"
          buttonType="submit"
        />

        <div
          onClick={() => setForgotPasswordModal(true)}
          className="text-sm text-textPrimaryBlue mt-1 cursor-pointer font-medium"
        >
          Forgot password?
        </div>

        <div
          onClick={() => navigate(PageRoutes.SIGNUP)}
          className="text text-textPrimaryBlue mt-2 cursor-pointer font-medium"
        >
          Don't have an account? Signup here
        </div>
      </div>
    </div>
  );
};

export default Login;
