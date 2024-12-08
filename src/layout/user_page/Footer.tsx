import { AppShell } from "@mantine/core";
import Button from "../../component/common/button/Button";

const Footer = () => {
  return (
    <AppShell.Footer p="0">
      <div className="bg-surface shadow-2xl flex w-full justify-end px-4 py-4">
        <Button label="Save" onClick={() => {}} type="black" className="px-8" />
      </div>
    </AppShell.Footer>
  );
};

export default Footer;
