import { TagsInput } from "@mantine/core";
import InputHeader from "./InputHeader";

interface InputTagsProps {
  label?: string;
  value: string[];
  setValue: React.Dispatch<React.SetStateAction<string[]>>;
  fontClassName?: string;
}

const InputTags = ({
  setValue,
  value,
  label,
  fontClassName,
}: InputTagsProps) => {
  return (
    <div className={`gap-1 flex flex-col `}>
      {label ? (
        <InputHeader title={label} fontClassName={fontClassName} />
      ) : null}
      <TagsInput
        value={value}
        onChange={setValue}
        styles={{
          input: {
            border: `1px solid #0000001A`,
            fontWeight: "normal",
            fontSize: "18px",
            borderRadius: "4px",
            background: "#FFFFFF",
            color: "#000000",
            padding: "8px 8px",
          },
        }}
      />
    </div>
  );
};

export default InputTags;
