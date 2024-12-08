import { AppShell } from "@mantine/core";
import MenuItem from "./MenuItem";
import { MdOutlinePersonOutline } from "react-icons/md";
import { TiDocumentText } from "react-icons/ti";
import { VscGitStashApply } from "react-icons/vsc";
import { GiConversation } from "react-icons/gi";
import { PageRoutes } from "../../@types/enum";

const Sidebar = () => {
  return (
    <AppShell.Navbar p="0">
      <div className="flex flex-col bg-sidebarBg h-full w-full py-4 gap-4">
        <MenuItem
          name="Profile"
          icon={<MdOutlinePersonOutline className="h-6 w-6 " />}
          path={PageRoutes.USER_PROFILE}
        />
        <MenuItem
          name="Resume Templates"
          icon={<TiDocumentText className="h-6 w-6 " />}
          path={PageRoutes.USER_RESUME_TEMPLATES}
        />
        <MenuItem
          name="Interview Preparation"
          icon={<GiConversation className="h-6 w-6 " />}
          path={PageRoutes.USER_INTERVIEW_PREPARATION}
        />
        <MenuItem
          name="Job Applications"
          icon={<VscGitStashApply className="h-6 w-6 " />}
          path={PageRoutes.USER_JOB_APPLICATION}
        />
      </div>
    </AppShell.Navbar>
  );
};

export default Sidebar;
