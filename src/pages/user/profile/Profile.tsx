import PageHeader from "../../../component/common/PageHeader";
import PersonalDetails from "../../../component/user/profile/PersonalDetails";
import { FormProvider, useForm } from "react-hook-form";
import {
  UserProfileCreateFormFields,
  userProfileCreateSchema,
} from "../../../utilities/zod/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Footer from "../../../layout/user_page/Footer";

const Profile = () => {
  const methods = useForm<UserProfileCreateFormFields>({
    resolver: zodResolver(userProfileCreateSchema),
  });

  const onSubmit = async (data: UserProfileCreateFormFields) => {
    console.log(data);
  };

  //console errors
  console.log(methods.formState.errors.UserProfilePersonalDetails);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <PageHeader title="Profile" />
          <PersonalDetails />
        </div>
        <Footer />
      </form>
    </FormProvider>
  );
};

export default Profile;
