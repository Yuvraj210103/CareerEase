import { PageRoutes } from "./@types/enum";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Layout from "./layout";
import LoginSignup from "./pages/login_signup/LoginSignup";
import About from "./pages/about/About";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path={PageRoutes.HOME} Component={Home} />
        <Route path={PageRoutes.ABOUT} Component={About} />
        <Route path={PageRoutes.LOGIN} Component={LoginSignup} />
      </Routes>
    </Layout>
  );
}

export default App;
