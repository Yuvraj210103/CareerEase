import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import {
  UserPreferenceCreateFormFields,
  userPreferenceCreateSchema,
} from "../../../utilities/zod/schema";
import { useAuthState, useUIState } from "../../../store";
import { errorHandler } from "../../../utilities/CustomError";
import PageHeader from "../../../component/common/PageHeader";
import InputTags from "../../../component/common/inputs/InputTags";
import InputSelect from "../../../component/common/inputs/InputSelect";
import {
  IEmploymentType,
  IExpLevel,
  IUserPreferencesCollection,
  IWorkPlaceType,
} from "../../../@types/database";
import InputWithTopHeader from "../../../component/common/inputs/InputWithTopHeader";
import DbUser from "../../../firebase/DB/DbUser";
import Footer from "../../../layout/user_page/Footer";
import { showSnackbar } from "../../../utilities/TsxUtils";

const Preferences = () => {
  const { setLoading } = useUIState();

  const { authUser, userPreferences, setUserPreferences } = useAuthState();

  const isEdit = !!userPreferences;

  const methods = useForm<UserPreferenceCreateFormFields>({
    resolver: zodResolver(userPreferenceCreateSchema),
    defaultValues: isEdit
      ? {
          PreferenceEmploymentType: userPreferences.PreferenceEmploymentType,
          PreferenceExpLevel: userPreferences.PreferenceExpLevel,
          PreferenceJobTitles: userPreferences.PreferenceJobTitles,
          PreferenceLocations: userPreferences.PreferenceLocations,
          PreferenceSalaryRange: userPreferences.PreferenceSalaryRange,
          PreferenceWorkplaceType: userPreferences.PreferenceWorkplaceType,
        }
      : undefined,
  });

  const onSubmit = async (data: UserPreferenceCreateFormFields) => {
    if (!authUser) return;
    try {
      setLoading(true);

      console.log(data);

      if (isEdit) {
        await DbUser.updateUserPreferences(userPreferences.PreferenceId, data);

        showSnackbar({
          message: "Preferences updated successfully",
          type: "success",
        });
      } else {
        await DbUser.createUserPreferences(authUser.AuthUserId, data);
        showSnackbar({
          message: "Preferences created successfully",
          type: "success",
        });
      }

      const preferencesSnapshot = await DbUser.getUserPreferences(
        authUser.AuthUserId
      );
      const preferences =
        preferencesSnapshot.docs[0]?.data() as IUserPreferencesCollection;
      setUserPreferences(preferences);

      setLoading(false);
    } catch (error) {
      errorHandler(error);
      console.log(error);
      setLoading(false);
    }
  };

  console.log(methods.formState.errors);
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 pb-20">
          <PageHeader title="Preference" />
          <div className="grid grid-cols-3 bg-surface p-4 rounded shadow gap-4">
            <div className="col-span-3 font-semibold text-lg mb-1">
              Create Preferences
            </div>
            <InputTags
              label="Preferred Job Titles"
              value={methods.watch("PreferenceJobTitles")}
              setValue={(e) =>
                methods.setValue("PreferenceJobTitles", e as string[])
              }
            />
            <InputTags
              label="Preferred Job Locations"
              value={methods.watch("PreferenceLocations")}
              setValue={(e) =>
                methods.setValue("PreferenceLocations", e as string[])
              }
            />
            <InputSelect
              label="Employment Type"
              value={methods.watch("PreferenceEmploymentType")}
              data={[
                {
                  label: IEmploymentType.fullTime,
                  value: IEmploymentType.fullTime,
                },
                {
                  label: IEmploymentType.partTime,
                  value: IEmploymentType.partTime,
                },
                {
                  label: IEmploymentType.internship,
                  value: IEmploymentType.internship,
                },
                {
                  label: IEmploymentType.contract,
                  value: IEmploymentType.contract,
                },
              ]}
              onChange={(e) =>
                methods.setValue(
                  "PreferenceEmploymentType",
                  e as IEmploymentType
                )
              }
            />
            <InputSelect
              label="Experience Level"
              value={methods.watch("PreferenceExpLevel")}
              data={[
                {
                  label: IExpLevel.entryLevel,
                  value: IExpLevel.entryLevel,
                },
                {
                  label: IExpLevel.midLevel,
                  value: IExpLevel.midLevel,
                },
                {
                  label: IExpLevel.seniorLevel,
                  value: IExpLevel.seniorLevel,
                },
              ]}
              onChange={(e) =>
                methods.setValue("PreferenceExpLevel", e as IExpLevel)
              }
            />
            <InputSelect
              label="Workplace Type"
              value={methods.watch("PreferenceWorkplaceType")}
              data={[
                {
                  label: IWorkPlaceType.remote,
                  value: IWorkPlaceType.remote,
                },
                {
                  label: IWorkPlaceType.onSite,
                  value: IWorkPlaceType.onSite,
                },
                {
                  label: IWorkPlaceType.hybrid,
                  value: IWorkPlaceType.hybrid,
                },
              ]}
              onChange={(e) =>
                methods.setValue("PreferenceWorkplaceType", e as IWorkPlaceType)
              }
            />

            <div className="col-span-2 flex flex-col gap-4">
              <div className="font-semibold text-lg">Salary Ranges</div>
              <div className="flex items-center gap-4 w-full">
                <InputWithTopHeader
                  className="mx-0"
                  decimalCount={2}
                  label="Min"
                  register={methods.register}
                  name="PreferenceSalaryRange.Min"
                  error={
                    methods.formState.errors.PreferenceSalaryRange?.Min?.message
                  }
                />
                <InputWithTopHeader
                  className="mx-0"
                  decimalCount={2}
                  label="Max"
                  register={methods.register}
                  name="PreferenceSalaryRange.Max"
                  error={
                    methods.formState.errors.PreferenceSalaryRange?.Max?.message
                  }
                />
              </div>
            </div>
          </div>
          <Footer buttonTitle={isEdit ? "Update" : "Save"} />
        </div>
      </form>
    </FormProvider>
  );
};

export default Preferences;
