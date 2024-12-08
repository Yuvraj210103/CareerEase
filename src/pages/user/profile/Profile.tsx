import { useEffect } from "react";
import { useUIState } from "../../../store";

const Profile = () => {
  const { setShowFooter } = useUIState();

  useEffect(() => {
    setShowFooter(true);

    return () => {
      setShowFooter(false);
    };
  }, []);

  return <div>Profile</div>;
};

export default Profile;
