import { useEffect } from "react";
import { useUIState } from "../../../store";
import InputWithTopHeader from "../../../component/common/inputs/InputWithTopHeader";
import TextareaWithTopHeader from "../../../component/common/inputs/TextareaWithTopHeader";
import PageHeader from "../../../component/common/PageHeader";

const Profile = () => {
  const { setShowFooter } = useUIState();

  useEffect(() => {
    setShowFooter(true);

    return () => {
      setShowFooter(false);
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Profile" />
      <div className="flex flex-col gap-4 bg-surface p-4 shadow-md rounded">
        <div className="font-semibold flex items-center gap-2 text-lg">
          Personal Details
        </div>
        <div className="grid grid-cols-3 gap-4 mt-2">
          <InputWithTopHeader className="mx-0" label="Full Name" />
          <InputWithTopHeader className="mx-0" label="Email" />
          <InputWithTopHeader className="mx-0" label="Phone" />

          <InputWithTopHeader className="mx-0" label="LinkedIn" />
          <InputWithTopHeader className="mx-0" label="GitHub" />
          <InputWithTopHeader className="mx-0" label="Website" />
          <TextareaWithTopHeader className="mx-0" label="Address" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
