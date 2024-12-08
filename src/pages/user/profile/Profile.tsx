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

  return (
    <div className="flex flex-col gap-4 p-4 bg-surface shadow-md">
      <div className="font-semibold text-lg">Profile</div>
    </div>
  );
};

export default Profile;
