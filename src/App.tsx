import { PageRoutes } from "./@types/enum";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Layout from "./layout";
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

function App() {
  useOnAuthStateChanged();

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
