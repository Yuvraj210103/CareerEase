import { IUserProfileCustomSections } from "../../../@types/database";
import { isCustomDetailsInValid } from "../../../utilities/profileCreateHelper";
import { showSnackbar } from "../../../utilities/TsxUtils";
import Button from "../../common/button/Button";
import InputWithTopHeader from "../../common/inputs/InputWithTopHeader";
import TextareaWithTopHeader from "../../common/inputs/TextareaWithTopHeader";

interface CustomDetailsProps {
  customDetails: IUserProfileCustomSections[];
  setCustomDetails: React.Dispatch<
    React.SetStateAction<IUserProfileCustomSections[]>
  >;
}

const CustomDetails = ({
  customDetails,
  setCustomDetails,
}: CustomDetailsProps) => {
  const handleAddCustomDetails = () => {
    if (isCustomDetailsInValid(customDetails)) {
      showSnackbar({
        message: "Please fill the required custom details to add more",
        type: "error",
      });
      return;
    }
    setCustomDetails([
      ...customDetails,
      {
        UserProfileCustomSectionContent: "",
        UserProfileCustomSectionTitle: "",
      },
    ]);
  };

  const handleRemoveCustomDetails = (index: number) => {
    if (customDetails.length === 1) return;
    setCustomDetails(customDetails.filter((_, i) => i !== index));
  };

  const handleChange = (
    index: number,
    key: keyof IUserProfileCustomSections,
    value: string
  ) => {
    const updatedCheckpoints = [...customDetails];
    updatedCheckpoints[index][key] = value;

    setCustomDetails(updatedCheckpoints);
  };

  return (
    <div className="flex flex-col gap-4 bg-surface p-4 shadow rounded">
      <div className="font-semibold flex items-center gap-2 text-lg">
        Custom Details
      </div>
      {customDetails.map((res, index) => {
        return (
          <div className="grid grid-cols-3 gap-4 bg-gray-50 border-[1.5px] border-inputBorder p-4 rounded items-end">
            <InputWithTopHeader
              className={`mx-0`}
              label="Title"
              value={res.UserProfileCustomSectionTitle}
              onChange={(e) =>
                handleChange(
                  index,
                  "UserProfileCustomSectionTitle",
                  e.target.value
                )
              }
            />
            <div className="col-span-2">&nbsp;</div>
            <TextareaWithTopHeader
              className={`mx-0 col-span-3`}
              label="Content"
              value={res.UserProfileCustomSectionContent}
              onChange={(e) =>
                handleChange(
                  index,
                  "UserProfileCustomSectionContent",
                  e.target.value
                )
              }
            />

            {customDetails.length > 1 && (
              <Button
                label="Delete"
                type="red"
                className="h-fit w-fit px-6 py-[10px]"
                onClick={() => handleRemoveCustomDetails(index)}
              />
            )}
          </div>
        );
      })}
      <Button
        label="Add New"
        onClick={handleAddCustomDetails}
        type="black"
        className="w-fit px-6"
      />
    </div>
  );
};

export default CustomDetails;
