import { AppShell } from "@mantine/core";
import MenuItem from "./MenuItem";
import { MdOutlinePersonOutline } from "react-icons/md";
import { TiDocumentText } from "react-icons/ti";
import { VscGitStashApply } from "react-icons/vsc";
import { GiConversation } from "react-icons/gi";
import { PageRoutes } from "../../@types/enum";
import { useAuthState } from "../../store";

const Sidebar = () => {
  const { authUser } = useAuthState();
  return (
    <AppShell.Navbar p="0">
      <div className="flex flex-col bg-sidebarBg h-full w-full py-4 gap-4">
        <div className="flex w-full items-center justify-center gap-2 border-b border-[#505153] pb-4">
          <div className="bg-surface text-textPrimary font-bold text-4xl rounded-full p-2 size-[80px] flex items-center justify-center">
            Y
          </div>
          <div className="flex flex-col text-surface  leading-5">
            <div className="font-semibold">Yuvraj Singh</div>
            <div className="text-sm">{authUser?.AuthUserEmail}</div>
          </div>
        </div>
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
