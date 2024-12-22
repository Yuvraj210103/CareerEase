import { IUserProfileWorkExperienceChildCollection } from "../../../@types/database";
import { toDate } from "../../../utilities/misc";
import Button from "../../common/button/Button";
import InputDate from "../../common/inputs/InputDate";
import InputWithTopHeader from "../../common/inputs/InputWithTopHeader";
import InputTags from "../../common/inputs/InputTags";

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
    setWorkExpDetails([
      ...workExpDetails,
      {
        UserWorkExpAchievements: [],
        UserWorkExpCompanyName: "",
        UserWorkExpStartDate: null as unknown as Date,
        UserWorkExpEndDate: null as unknown as Date,
        UserWorkExpJobTitle: "",
        UserWorkExpResponsibilities: [],
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
    } else if (
      key === "UserWorkExpResponsibilities" ||
      key === "UserWorkExpAchievements"
    ) {
      updatedCheckpoints[index][key] = value as string[];
    } else {
      updatedCheckpoints[index][key] = value as string;
    }

    setWorkExpDetails(updatedCheckpoints);
  };

  console.log(workExpDetails, "here");
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

            <InputTags
              label="Responsibilities"
              value={res.UserWorkExpResponsibilities}
              setValue={(e) =>
                handleChange(
                  index,
                  "UserWorkExpResponsibilities",
                  e as string[]
                )
              }
            />
            <InputTags
              label="Achievements"
              value={res.UserWorkExpAchievements}
              setValue={(e) =>
                handleChange(index, "UserWorkExpAchievements", e as string[])
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
