import { IUserProfileWorkExperienceChildCollection } from "../../../@types/database";
import { toDate } from "../../../utilities/misc";
import Button from "../../common/button/Button";
import InputDate from "../../common/inputs/InputDate";
import InputWithTopHeader from "../../common/inputs/InputWithTopHeader";
import { showSnackbar } from "../../../utilities/TsxUtils";
import { isWorkExpInValid } from "../../../utilities/profileCreateHelper";
import TextareaWithTopHeader from "../../common/inputs/TextareaWithTopHeader";

export interface UserProfileWorkExperienceChildCollection
  extends Omit<
    IUserProfileWorkExperienceChildCollection,
    "UserWorkExpStartDate" | "UserWorkExpEndDate"
  > {
  UserWorkExpStartDate: Date;
  UserWorkExpEndDate: Date | null;
}

interface IWorkExperienceProps {
  workExpDetails: UserProfileWorkExperienceChildCollection[];
  setWorkExpDetails: React.Dispatch<
    React.SetStateAction<UserProfileWorkExperienceChildCollection[]>
  >;
}

const WorkExperience = ({
  setWorkExpDetails,
  workExpDetails,
}: IWorkExperienceProps) => {
  const handleAddWorkExp = () => {
    if (isWorkExpInValid(workExpDetails)) {
      showSnackbar({
        message: "Please fill the required work exp details to add more",
        type: "error",
      });
      return;
    }
    setWorkExpDetails([
      ...workExpDetails,
      {
        UserWorkExpDescription: "",
        UserWorkExpLocation: "",
        UserWorkExpCompanyName: "",
        UserWorkExpStartDate: null as unknown as Date,
        UserWorkExpEndDate: null as unknown as Date,
        UserWorkExpJobTitle: "",
      },
    ]);
  };

  const handleRemoveWorkExp = (index: number) => {
    if (workExpDetails.length === 1) return;
    setWorkExpDetails(workExpDetails.filter((_, i) => i !== index));
  };

  const handleChange = (
    index: number,
    key: keyof UserProfileWorkExperienceChildCollection,
    value: string | string[] | null | Date
  ) => {
    const updatedCheckpoints = [...workExpDetails];
    if (key === "UserWorkExpStartDate" || key === "UserWorkExpEndDate") {
      updatedCheckpoints[index][key] = (value as Date) || null;
    } else {
      updatedCheckpoints[index][key] = value as string;
    }

    setWorkExpDetails(updatedCheckpoints);
  };

  return (
    <div className="flex flex-col gap-4 bg-surface p-4 shadow rounded">
      <div className="font-semibold flex items-center gap-2 text-lg">
        Work Experience
      </div>
      {workExpDetails.map((res, index) => {
        return (
          <div className="grid grid-cols-3 gap-4 bg-gray-50 border-[1.5px] border-inputBorder p-4 rounded">
            <InputWithTopHeader
              className={`mx-0`}
              label="Title"
              value={res.UserWorkExpJobTitle}
              onChange={(e) =>
                handleChange(index, "UserWorkExpJobTitle", e.target.value)
              }
            />
            <InputWithTopHeader
              className={`mx-0`}
              label="Company"
              value={res.UserWorkExpCompanyName}
              onChange={(e) =>
                handleChange(index, "UserWorkExpCompanyName", e.target.value)
              }
            />

            <InputWithTopHeader
              className={`mx-0`}
              label="Location"
              value={res.UserWorkExpLocation}
              onChange={(e) =>
                handleChange(index, "UserWorkExpLocation", e.target.value)
              }
            />

            <InputDate
              label="Start Date"
              value={
                res.UserWorkExpStartDate
                  ? toDate(res.UserWorkExpStartDate)
                  : null
              }
              setValue={(e) =>
                handleChange(index, "UserWorkExpStartDate", e as Date)
              }
            />
            <InputDate
              label="End Date (Optional)"
              value={
                res.UserWorkExpEndDate ? toDate(res.UserWorkExpEndDate) : null
              }
              setValue={(e) =>
                handleChange(index, "UserWorkExpEndDate", e as Date)
              }
            />

            <div>&nbsp;</div>

            <TextareaWithTopHeader
              className={`mx-0`}
              label="Description"
              value={res.UserWorkExpDescription}
              onChange={(e) =>
                handleChange(index, "UserWorkExpDescription", e.target.value)
              }
            />

            {workExpDetails.length > 1 && (
              <Button
                label="Delete"
                type="red"
                className="col-span-3 w-fit px-6"
                onClick={() => handleRemoveWorkExp(index)}
              />
            )}
          </div>
        );
      })}
      <Button
        label="Add New"
        onClick={handleAddWorkExp}
        type="black"
        className="w-fit px-6"
      />
    </div>
  );
};

export default WorkExperience;
