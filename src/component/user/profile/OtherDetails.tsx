import { useFormContext } from "react-hook-form";
import { UserProfileCreateFormFields } from "../../../utilities/zod/schema";
import InputTags from "../../common/inputs/InputTags";

const OtherDetails = () => {
  const { setValue, watch } = useFormContext<UserProfileCreateFormFields>();
  return (
    <div className="flex flex-col gap-4 bg-surface p-4 shadow rounded">
      <div className="font-semibold flex items-center gap-2 text-lg">
        Other Details
      </div>
      <div className="grid grid-cols-1 gap-4 mt-2 bg-gray-50 border-[1.5px] border-inputBorder p-4 rounded">
        <InputTags
          label="Languages"
          value={watch("UserProfileLanguages")}
          setValue={(e) => setValue("UserProfileLanguages", e as string[])}
        />
        <InputTags
          label="Hobbies"
          value={watch("UserProfileHobbies")}
          setValue={(e) => setValue("UserProfileHobbies", e as string[])}
        />
      </div>
    </div>
  );
};

export default OtherDetails;
