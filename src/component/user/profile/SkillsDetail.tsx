import { IUserProfileSkillsChildCollection } from "../../../@types/database";
import Button from "../../common/button/Button";
import InputWithTopHeader from "../../common/inputs/InputWithTopHeader";

interface SkillsDetailProps {
  skillsDetails: IUserProfileSkillsChildCollection[];
  setSkillsDetails: React.Dispatch<
    React.SetStateAction<IUserProfileSkillsChildCollection[]>
  >;
}

const SkillsDetail = ({
  setSkillsDetails,
  skillsDetails,
}: SkillsDetailProps) => {
  const handleAddSkill = () => {
    setSkillsDetails([
      ...skillsDetails,
      {
        UserSkillName: "",
        UserSkillProficiency: "" as unknown as number,
      },
    ]);
  };

  const handleRemoveSkill = (index: number) => {
    if (skillsDetails.length === 1) return;
    setSkillsDetails(skillsDetails.filter((_, i) => i !== index));
  };

  const handleChange = (
    index: number,
    key: keyof IUserProfileSkillsChildCollection,
    value: string | number
  ) => {
    const updatedCheckpoints = [...skillsDetails];
    if (key === "UserSkillName") {
      updatedCheckpoints[index][key] = value as string;
    } else {
      updatedCheckpoints[index][key] = value as number;
    }

    setSkillsDetails(updatedCheckpoints);
  };

  console.log(skillsDetails, "here");
  return (
    <div className="flex flex-col gap-4 bg-surface p-4 shadow rounded">
      <div className="font-semibold flex items-center gap-2 text-lg">
        Skills Detail
      </div>
      {skillsDetails.map((res, index) => {
        return (
          <div className="grid grid-cols-3 gap-4 bg-gray-50 border-[1.5px] border-inputBorder p-4 rounded items-end">
            <InputWithTopHeader
              className={`mx-0`}
              label="Skill"
              value={res.UserSkillName}
              onChange={(e) =>
                handleChange(index, "UserSkillName", e.target.value)
              }
            />
            <InputWithTopHeader
              className={`mx-0`}
              label="Proficiency (Between 1 to 5)"
              value={res.UserSkillProficiency}
              decimalCount={0}
              onChange={(e) =>
                handleChange(
                  index,
                  "UserSkillProficiency",
                  Number(e.target.value) > 0 && Number(e.target.value) <= 5
                    ? e.target.value
                    : ""
                )
              }
            />

            {skillsDetails.length > 1 && (
              <Button
                label="Delete"
                type="red"
                className="h-fit w-fit px-6 py-[10px]"
                onClick={() => handleRemoveSkill(index)}
              />
            )}
          </div>
        );
      })}
      <Button
        label="Add New"
        onClick={handleAddSkill}
        type="black"
        className="w-fit px-6"
      />
    </div>
  );
};

export default SkillsDetail;
