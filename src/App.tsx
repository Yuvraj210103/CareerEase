import { PageRoutes } from "./@types/enum";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Layout from "./layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path={PageRoutes.HOME} Component={Home} />
      </Routes>
    </Layout>
  );
}

export default App;
