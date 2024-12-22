import { useFormContext } from "react-hook-form";
import InputWithTopHeader from "../../common/inputs/InputWithTopHeader";
import { UserProfileCreateFormFields } from "../../../utilities/zod/schema";
import InputDate from "../../common/inputs/InputDate";
import { useEffect, useState } from "react";

const PersonalDetails = () => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<UserProfileCreateFormFields>();

  const [dob, setDob] = useState<Date | null>(null);

  useEffect(() => {
    setValue("UserProfilePersonalDetails.UserDateOfBirth", dob);
  }, [dob]);

  return (
    <div className="flex flex-col gap-4 bg-surface p-4 shadow rounded">
      <div className="font-semibold flex items-center gap-2 text-lg">
        Personal Details
      </div>
      <div className="grid grid-cols-3 gap-4 mt-2 bg-gray-50 border-[1.5px] border-inputBorder p-4 rounded">
        <InputWithTopHeader
          className="mx-0"
          label="Full Name"
          register={register}
          name="UserProfilePersonalDetails.UserFullName"
          error={errors.UserProfilePersonalDetails?.UserFullName?.message}
        />
        <InputWithTopHeader
          className="mx-0"
          label="Email"
          register={register}
          name="UserProfilePersonalDetails.UserEmail"
          error={errors.UserProfilePersonalDetails?.UserEmail?.message}
        />
        <InputWithTopHeader
          className="mx-0"
          label="Phone"
          register={register}
          name="UserProfilePersonalDetails.UserPhone"
          error={errors.UserProfilePersonalDetails?.UserPhone?.message}
        />
        <InputDate label="D.O.B" value={dob} setValue={setDob} />
        <InputWithTopHeader
          className="mx-0"
          label="LinkedIn"
          register={register}
          name="UserProfilePersonalDetails.UserLinkedIn"
          error={errors.UserProfilePersonalDetails?.UserLinkedIn?.message}
        />
        <InputWithTopHeader
          className="mx-0"
          label="GitHub"
          register={register}
          name="UserProfilePersonalDetails.UserGitHub"
          error={errors.UserProfilePersonalDetails?.UserGitHub?.message}
        />
        <InputWithTopHeader
          className="mx-0"
          label="Website"
          register={register}
          name="UserProfilePersonalDetails.UserWebsite"
          error={errors.UserProfilePersonalDetails?.UserWebsite?.message}
        />
        <InputWithTopHeader
          className="mx-0 col-span-2"
          label="Address"
          register={register}
          name="UserProfilePersonalDetails.UserAddress"
          error={errors.UserProfilePersonalDetails?.UserAddress?.message}
        />
      </div>
    </div>
  );
};

export default PersonalDetails;
