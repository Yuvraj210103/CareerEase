import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageRoutes } from "../../../@types/enum";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(PageRoutes.USER_PROFILE);
  }, [navigate]);

  return <div>Home</div>;
};

export default Home;
