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
import { useEffect, useState } from "react";
import {
  IUserProfileCustomSections,
  IUserProfilesCollection,
  IUserProfileSkillsChildCollection,
} from "../../../@types/database";
import SkillsDetail from "../../../component/user/profile/SkillsDetail";
import OtherDetails from "../../../component/user/profile/OtherDetails";
import { errorHandler } from "../../../utilities/CustomError";
import { useAuthState, useUIState } from "../../../store";
import DbUser from "../../../firebase/DB/DbUser";
import { toDate } from "../../../utilities/misc";
import { showSnackbar } from "../../../utilities/TsxUtils";

const Profile = () => {
  const { setLoading } = useUIState();

  const { authUser, userProfile, setUserProfile } = useAuthState();

  const isEdit = !!userProfile;

  const methods = useForm<UserProfileCreateFormFields>({
    resolver: zodResolver(userProfileCreateSchema),
    defaultValues: isEdit
      ? {
          UserProfilePersonalDetails: {
            UserAddress:
              userProfile.UserProfilePersonalDetails.UserAddress || "",
            UserSummary:
              userProfile.UserProfilePersonalDetails.UserSummary || "",
            UserDateOfBirth: userProfile.UserProfilePersonalDetails
              .UserDateOfBirth
              ? toDate(userProfile.UserProfilePersonalDetails.UserDateOfBirth)
              : null,
            UserEmail: userProfile.UserProfilePersonalDetails.UserEmail || "",
            UserFullName:
              userProfile.UserProfilePersonalDetails.UserFullName || "",
            UserGitHub: userProfile.UserProfilePersonalDetails.UserGitHub || "",
            UserLinkedIn: userProfile.UserProfilePersonalDetails.UserLinkedIn,
            UserPhone: userProfile.UserProfilePersonalDetails.UserPhone || "",
            UserWebsite:
              userProfile.UserProfilePersonalDetails.UserWebsite || "",
          },
          UserProfileHobbies: userProfile.UserProfileHobbies || [],
          UserProfileLanguages: userProfile.UserProfileLanguages || [],
        }
      : undefined,
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
      UserWorkExpDescription: "",
      UserWorkExpLocation: "",
      UserWorkExpCompanyName: "",
      UserWorkExpStartDate: null as unknown as Date,
      UserWorkExpEndDate: null as unknown as Date,
      UserWorkExpJobTitle: "",
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
      if (isEdit) {
        await DbUser.updateUserProfile({
          data,
          userProfileId: userProfile.UserProfileId,
          certificationDetails: certificationsDetail,
          customDetails,
          educationDetails,
          projectDetails,
          skillsDetails,
          workExpDetails,
        });
        showSnackbar({
          message: "Profile updated successfully",
          type: "success",
        });
      } else {
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
        showSnackbar({
          message: "Profile created successfully",
          type: "success",
        });
      }

      const userProfileSnapshot = await DbUser.getUserProfile(
        authUser.AuthUserId
      );
      const userProfileData =
        userProfileSnapshot.docs[0]?.data() as IUserProfilesCollection;
      setUserProfile(userProfileData);

      setLoading(false);
    } catch (error) {
      errorHandler(error);
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isEdit) {
      setCertificationsDetail(
        userProfile.UserProfileCertifications.map((res) => {
          return {
            ...res,
            UserCertificateExpiryDate: res.UserCertificateExpiryDate
              ? toDate(res.UserCertificateExpiryDate)
              : null,
            UserCertificateIssueDate: toDate(res.UserCertificateIssueDate),
          };
        })
      );
      setCustomDetails(userProfile.UserProfileCustomSections);
      setEducationDetails(
        userProfile.UserProfileEducationDetails?.map((res) => {
          return {
            ...res,
            UserEducationStartDate: toDate(res.UserEducationStartDate),
            UserEducationEndDate: toDate(res.UserEducationEndDate),
          };
        })
      );
      setProjectDetails(
        userProfile.UserProfileProjects.map((res) => {
          return {
            ...res,
            UserProjectEndDate: res.UserProjectEndDate
              ? toDate(res.UserProjectEndDate)
              : null,
            UserProjectStartDate: res.UserProjectStartDate
              ? toDate(res.UserProjectStartDate)
              : null,
          };
        })
      );
      setSkillsDetails(userProfile.UserProfileSkills);
      setWorkExpDetails(
        userProfile.UserProfileWorkExperience.map((res) => {
          return {
            ...res,
            UserWorkExpEndDate: res.UserWorkExpEndDate
              ? toDate(res.UserWorkExpEndDate)
              : null,
            UserWorkExpStartDate: toDate(res.UserWorkExpStartDate),
          };
        })
      );
    }
  }, [isEdit]);

  console.log(methods.formState.errors);

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
        <Footer buttonTitle={isEdit ? "Update" : "Save"} />
      </form>
    </FormProvider>
  );
};

export default Profile;
