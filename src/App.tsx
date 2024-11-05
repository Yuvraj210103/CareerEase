import { PageRoutes } from "./@types/enum";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";

function App() {
  return (
    <Routes>
      <Route path={PageRoutes.HOME} Component={Home} />
    </Routes>
  );
}

export default App;
