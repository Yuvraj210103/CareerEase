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
import WorkExperience, {
  UserProfileWorkExperienceChildCollection,
} from "../../../component/user/profile/WorkExperience";
import ProjectDetails, {
  UserProfileProjectsDetails,
} from "../../../component/user/profile/ProjectDetails";
import Certifications, {
  UserProfileCertificationsDetails,
} from "../../../component/user/profile/Certifications";
import CustomDetails from "../../../component/user/profile/CustomDetails";
import { useState } from "react";
import {
  IUserProfileCustomSections,
  IUserProfileSkillsChildCollection,
} from "../../../@types/database";
import SkillsDetail from "../../../component/user/profile/SkillsDetail";
import OtherDetails from "../../../component/user/profile/OtherDetails";
import { errorHandler } from "../../../utilities/CustomError";
import { useAuthState, useUIState } from "../../../store";
import DbUser from "../../../firebase/DB/DbUser";

const Profile = () => {
  const { setLoading } = useUIState();

  const { authUser } = useAuthState();

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

  //Work Exp Details
  const [workExpDetails, setWorkExpDetails] = useState<
    UserProfileWorkExperienceChildCollection[]
  >([
    {
      UserWorkExpAchievements: [],
      UserWorkExpCompanyName: "",
      UserWorkExpStartDate: null as unknown as Date,
      UserWorkExpEndDate: null as unknown as Date,
      UserWorkExpJobTitle: "",
      UserWorkExpResponsibilities: [],
    },
  ]);

  //Skill Details
  const [skillsDetails, setSkillsDetails] = useState<
    IUserProfileSkillsChildCollection[]
  >([
    {
      UserSkillName: "",
      UserSkillProficiency: "" as unknown as number,
    },
  ]);

  //Project Details
  const [projectDetails, setProjectDetails] = useState<
    UserProfileProjectsDetails[]
  >([
    {
      UserProjectDescription: "",
      UserProjectTitle: "",
      UserProjectTechnologies: [],
      UserProjectStartDate: null,
      UserProjectEndDate: null,
    },
  ]);

  //certifications Detail
  const [certificationsDetail, setCertificationsDetail] = useState<
    UserProfileCertificationsDetails[]
  >([
    {
      UserCertificateIssueDate: null as unknown as Date,
      UserCertificateIssuedBy: "",
      UserCertificateName: "",
    },
  ]);

  //Custom Details
  const [customDetails, setCustomDetails] = useState<
    IUserProfileCustomSections[]
  >([
    {
      UserProfileCustomSectionContent: "",
      UserProfileCustomSectionTitle: "",
    },
  ]);

  const onSubmit = async (data: UserProfileCreateFormFields) => {
    console.log(data, "data here");
    if (!authUser) return;
    try {
      setLoading(true);
      await DbUser.createUserProfile({
        data,
        userId: authUser.AuthUserId,
        certificationDetails: certificationsDetail,
        customDetails,
        educationDetails,
        projectDetails,
        skillsDetails,
        workExpDetails,
      });
      setLoading(false);
    } catch (error) {
      errorHandler(error);
      console.log(error);
      setLoading(false);
    }
  };

  //console errors
  //console.log(methods.formState.errors);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 pb-20">
          <PageHeader title="Profile" />
          <PersonalDetails />
          <EducationDetails
            educationDetails={educationDetails}
            setEducationDetails={setEducationDetails}
          />
          <WorkExperience
            setWorkExpDetails={setWorkExpDetails}
            workExpDetails={workExpDetails}
          />

          <SkillsDetail
            setSkillsDetails={setSkillsDetails}
            skillsDetails={skillsDetails}
          />
          <ProjectDetails
            projectDetails={projectDetails}
            setProjectDetails={setProjectDetails}
          />
          <Certifications
            certificationsDetail={certificationsDetail}
            setCertificationsDetail={setCertificationsDetail}
          />
          <OtherDetails />
          <CustomDetails
            customDetails={customDetails}
            setCustomDetails={setCustomDetails}
          />
        </div>
        <Footer />
      </form>
    </FormProvider>
  );
};

export default Profile;
