import PageHeader from "../../../component/common/PageHeader";
import PersonalDetails from "../../../component/user/profile/PersonalDetails";
import { FormProvider, useForm } from "react-hook-form";
import {
  UserProfileCreateFormFields,
  userProfileCreateSchema,
} from "../../../utilities/zod/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Footer from "../../../layout/user_page/Footer";
import EducationDetails, {
  UserProfileEducationDetailsChildCollection,
} from "../../../component/user/profile/EducationDetails";
import WorkExperience from "../../../component/user/profile/WorkExperience";
import ProjectDetails from "../../../component/user/profile/ProjectDetails";
import Certifications from "../../../component/user/profile/Certifications";
import CustomDetails from "../../../component/user/profile/CustomDetails";
import { useState } from "react";

const Profile = () => {
  const methods = useForm<UserProfileCreateFormFields>({
    resolver: zodResolver(userProfileCreateSchema),
  });

  //Education Details
  const [educationDetails, setEducationDetails] = useState<
    UserProfileEducationDetailsChildCollection[]
  >([
    {
      UserEducationDegree: "",
      UserEducationInstitution: "",
      UserEducationStartDate: null as unknown as Date,
      UserEducationEndDate: null as unknown as Date,
      UserEducationDescription: "",
      UserEducationGrade: "",
    },
  ]);

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
          <EducationDetails
            educationDetails={educationDetails}
            setEducationDetails={setEducationDetails}
          />
          <WorkExperience />
          <ProjectDetails />
          <Certifications />
          <CustomDetails />
        </div>
        <Footer />
      </form>
    </FormProvider>
  );
};

export default Profile;
