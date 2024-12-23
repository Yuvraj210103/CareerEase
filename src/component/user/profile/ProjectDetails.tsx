import { IUserProfileProjectsDetails } from "../../../@types/database";
import { toDate } from "../../../utilities/misc";
import { isProjectDetailsInValid } from "../../../utilities/profileCreateHelper";
import { showSnackbar } from "../../../utilities/TsxUtils";
import Button from "../../common/button/Button";
import InputDate from "../../common/inputs/InputDate";
import InputTags from "../../common/inputs/InputTags";
import InputWithTopHeader from "../../common/inputs/InputWithTopHeader";
import TextareaWithTopHeader from "../../common/inputs/TextareaWithTopHeader";

export interface UserProfileProjectsDetails
  extends Omit<
    IUserProfileProjectsDetails,
    "UserProjectStartDate" | "UserProjectEndDate"
  > {
  UserProjectStartDate: Date | null;
  UserProjectEndDate: Date | null;
}

interface ProjectDetailsProps {
  projectDetails: UserProfileProjectsDetails[];
  setProjectDetails: React.Dispatch<
    React.SetStateAction<UserProfileProjectsDetails[]>
  >;
}

const ProjectDetails = ({
  projectDetails,
  setProjectDetails,
}: ProjectDetailsProps) => {
  const handleAddEducation = () => {
    if (isProjectDetailsInValid(projectDetails)) {
      showSnackbar({
        message: "Please fill the required project details to add more",
        type: "error",
      });
      return;
    }
    setProjectDetails([
      ...projectDetails,
      {
        UserProjectDescription: "",
        UserProjectTitle: "",
        UserProjectTechnologies: [],
        UserProjectStartDate: null,
        UserProjectEndDate: null,
      },
    ]);
  };

  const handleRemoveEducation = (index: number) => {
    if (projectDetails.length === 1) return;
    setProjectDetails(projectDetails.filter((_, i) => i !== index));
  };

  const handleChange = (
    index: number,
    key: keyof UserProfileProjectsDetails,
    value: string | string[] | null | Date
  ) => {
    const updatedCheckpoints = [...projectDetails];
    if (key === "UserProjectStartDate" || key === "UserProjectEndDate") {
      updatedCheckpoints[index][key] = value as Date;
    } else if (key === "UserProjectTechnologies") {
      updatedCheckpoints[index][key] = value as string[];
    } else {
      updatedCheckpoints[index][key] = value as string;
    }

    setProjectDetails(updatedCheckpoints);
  };

  return (
    <div className="flex flex-col gap-4 bg-surface p-4 shadow rounded">
      <div className="font-semibold flex items-center gap-2 text-lg">
        Project Details
      </div>
      {projectDetails.map((res, index) => {
        return (
          <div className="grid grid-cols-3 gap-4 bg-gray-50 border-[1.5px] border-inputBorder p-4 rounded">
            <InputWithTopHeader
              className={`mx-0`}
              label="Title"
              value={res.UserProjectTitle}
              onChange={(e) =>
                handleChange(index, "UserProjectTitle", e.target.value)
              }
            />
            <InputTags
              label="Technologies"
              value={res.UserProjectTechnologies}
              setValue={(e) =>
                handleChange(index, "UserProjectTechnologies", e as string[])
              }
            />
            <InputWithTopHeader
              className={`mx-0`}
              label="Link"
              value={res.UserProjectLink || ""}
              onChange={(e) =>
                handleChange(index, "UserProjectLink", e.target.value)
              }
            />

            <InputDate
              label="Start Date"
              value={
                res.UserProjectStartDate
                  ? toDate(res.UserProjectStartDate)
                  : null
              }
              setValue={(e) =>
                handleChange(index, "UserProjectStartDate", e as Date)
              }
            />
            <InputDate
              label="End Date"
              value={
                res.UserProjectEndDate ? toDate(res.UserProjectEndDate) : null
              }
              setValue={(e) =>
                handleChange(index, "UserProjectEndDate", e as Date)
              }
            />

            <TextareaWithTopHeader
              className={`mx-0`}
              label="Description"
              value={res.UserProjectDescription}
              onChange={(e) =>
                handleChange(index, "UserProjectDescription", e.target.value)
              }
            />
            {projectDetails.length > 1 && (
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

export default ProjectDetails;
