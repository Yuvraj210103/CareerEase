import { PageRoutes } from "./@types/enum";
import { Route, Routes } from "react-router-dom";

import About from "./pages/about/About";
import Login from "./pages/login_signup/Login";
import Signup from "./pages/login_signup/Signup";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import LoaderModal from "./component/common/modals/LoaderModal";
import { ContextConfirmModal } from "./component/common/modals/ContextConfirmModal";
import { ToastContainer } from "react-toastify";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "react-toastify/dist/ReactToastify.min.css";
import useOnAuthStateChanged from "./hooks/useOnAuthStateChanged";
import Layout from "./layout/landing_page";
import { useAuthState, useUIState } from "./store";
import SplashScreen from "./component/splash_screen/SplashScreen";
import UserPageLayout from "./layout/user_page";
import UserHome from "./pages/user/home/Home";
import Home from "./pages/home/Home";
import Profile from "./pages/user/profile/Profile";
import { useShowLoader } from "./hooks/useShowLoader";
import ResumeTemplates from "./pages/user/resume_templates/ResumeTemplates";
import Preferences from "./pages/user/preferences/Preferences";
import JobList from "./pages/user/jobs/JobList";

function App() {
  const { authUser, loading } = useAuthState();

  const { loading: loader } = useUIState();

  useShowLoader(loader);

  useOnAuthStateChanged();

  if (loading) {
    return <SplashScreen />;
  }

  if (authUser) {
    return (
      <MantineProvider withGlobalClasses withCssVariables withStaticClasses>
        <ModalsProvider
          modals={{ loader: LoaderModal, confirmModal: ContextConfirmModal }}
        >
          <UserPageLayout>
            <ToastContainer />
            <Routes>
              <Route path={PageRoutes.USER_HOME} Component={UserHome} />
              <Route
                path={PageRoutes.USER_PREFERENCES}
                Component={Preferences}
              />
              <Route path={PageRoutes.USER_PROFILE} Component={Profile} />
              <Route
                path={PageRoutes.USER_RESUME_TEMPLATES}
                Component={ResumeTemplates}
              />

              <Route path={PageRoutes.USER_JOBS} Component={JobList} />
            </Routes>
          </UserPageLayout>
        </ModalsProvider>
      </MantineProvider>
    );
  }

  return (
    <MantineProvider withGlobalClasses withCssVariables withStaticClasses>
      <ModalsProvider
        modals={{ loader: LoaderModal, confirmModal: ContextConfirmModal }}
      >
        <Layout>
          <ToastContainer />
          <Routes>
            <Route path={PageRoutes.HOME} Component={Home} />

            <Route path={PageRoutes.ABOUT} Component={About} />
            <Route path={PageRoutes.LOGIN} Component={Login} />
            <Route path={PageRoutes.SIGNUP} Component={Signup} />
          </Routes>
        </Layout>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
