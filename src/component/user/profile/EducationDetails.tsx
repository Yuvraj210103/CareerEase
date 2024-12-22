import { IUserProfileEducationDetailsChildCollection } from "../../../@types/database";
import InputWithTopHeader from "../../common/inputs/InputWithTopHeader";
import InputDate from "../../common/inputs/InputDate";
import { toDate } from "../../../utilities/misc";
import TextareaWithTopHeader from "../../common/inputs/TextareaWithTopHeader";
import Button from "../../common/button/Button";

export interface UserProfileEducationDetailsChildCollection
  extends Omit<
    IUserProfileEducationDetailsChildCollection,
    "UserEducationStartDate" | "UserEducationEndDate"
  > {
  UserEducationStartDate: Date;
  UserEducationEndDate: Date;
}

const EducationDetails = ({
  educationDetails,
  setEducationDetails,
}: {
  educationDetails: UserProfileEducationDetailsChildCollection[];
  setEducationDetails: React.Dispatch<
    React.SetStateAction<UserProfileEducationDetailsChildCollection[]>
  >;
}) => {
  const handleAddEducation = () => {
    setEducationDetails([
      ...educationDetails,
      {
        UserEducationDegree: "",
        UserEducationInstitution: "",
        UserEducationStartDate: null as unknown as Date,
        UserEducationEndDate: null as unknown as Date,
        UserEducationDescription: "",
        UserEducationGrade: "",
      },
    ]);
  };

  const handleRemoveEducation = (index: number) => {
    if (educationDetails.length === 1) return;
    setEducationDetails(educationDetails.filter((_, i) => i !== index));
  };

  const handleChange = (
    index: number,
    key: keyof UserProfileEducationDetailsChildCollection,
    value: string | null | Date
  ) => {
    const updatedCheckpoints = [...educationDetails];
    if (key === "UserEducationEndDate" || key === "UserEducationStartDate") {
      updatedCheckpoints[index][key] = value as Date;
    } else {
      updatedCheckpoints[index][key] = value as string;
    }

    setEducationDetails(updatedCheckpoints);
  };

  console.log(educationDetails, "here");
  return (
    <div className="flex flex-col gap-4 bg-surface p-4 shadow rounded">
      <div className="font-semibold flex items-center gap-2 text-lg">
        Education Details
      </div>
      {educationDetails.map((res, index) => {
        return (
          <div className="grid grid-cols-3 gap-4 bg-gray-50 border-[1.5px] border-inputBorder p-4 rounded">
            <InputWithTopHeader
              className={`mx-0 col-span-2`}
              label="Degree"
              value={res.UserEducationDegree}
              onChange={(e) =>
                handleChange(index, "UserEducationDegree", e.target.value)
              }
            />
            <InputWithTopHeader
              className={`mx-0`}
              label="Institution"
              value={res.UserEducationInstitution}
              onChange={(e) =>
                handleChange(index, "UserEducationInstitution", e.target.value)
              }
            />
            <InputWithTopHeader
              className={`mx-0`}
              label="Grade/Percentage"
              value={res.UserEducationGrade || ""}
              onChange={(e) =>
                handleChange(index, "UserEducationGrade", e.target.value)
              }
            />
            <InputDate
              label="Start Date"
              value={
                res.UserEducationStartDate
                  ? toDate(res.UserEducationStartDate)
                  : null
              }
              setValue={(e) =>
                handleChange(index, "UserEducationStartDate", e as Date)
              }
            />
            <InputDate
              label="End Date"
              value={
                res.UserEducationEndDate
                  ? toDate(res.UserEducationEndDate)
                  : null
              }
              setValue={(e) =>
                handleChange(index, "UserEducationEndDate", e as Date)
              }
            />

            <TextareaWithTopHeader
              className={`mx-0`}
              label="Description"
              value={res.UserEducationDescription || ""}
              onChange={(e) =>
                handleChange(index, "UserEducationDescription", e.target.value)
              }
            />
            {educationDetails.length > 1 && (
              <Button
                label="Delete"
                type="red"
                className="col-span-3 w-fit px-6"
                onClick={() => handleRemoveEducation(index)}
              />
            )}
          </div>
        );
      })}
      <Button
        label="Add New"
        onClick={handleAddEducation}
        type="black"
        className="w-fit px-6"
      />
    </div>
  );
};

export default EducationDetails;
