import { AppShell } from "@mantine/core";
import Button from "../../component/common/button/Button";

interface FooterProps {
  buttonTitle?: string;
}

const Footer = ({ buttonTitle = "Save" }: FooterProps) => {
  return (
    <AppShell.Footer p="0">
      <div className="bg-surface shadow-2xl flex w-full justify-end px-4 py-4">
        <Button
          buttonType="submit"
          label={buttonTitle}
          onClick={() => {}}
          type="black"
          className="px-8"
        />
      </div>
    </AppShell.Footer>
  );
};

export default Footer;
