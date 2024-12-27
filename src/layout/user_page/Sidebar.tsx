import { AppShell } from "@mantine/core";
import MenuItem from "./MenuItem";
import { MdOutlinePersonOutline, MdRoomPreferences } from "react-icons/md";
import { TiDocumentText } from "react-icons/ti";
import { VscGitStashApply } from "react-icons/vsc";
import { GiConversation } from "react-icons/gi";
import { PageRoutes } from "../../@types/enum";
import { useAuthState } from "../../store";

const Sidebar = () => {
  const { authUser, userProfile } = useAuthState();
  return (
    <AppShell.Navbar p="0">
      <div className="flex flex-col bg-sidebarBg h-full w-full py-4 gap-4">
        <div className="flex w-full items-center justify-center gap-2 border-b border-[#505153] pb-4">
          <div className="bg-surface text-textPrimary font-bold text-4xl rounded-full p-2 size-[80px] flex items-center justify-center">
            {userProfile?.UserProfilePersonalDetails?.UserFullName?.slice(
              0,
              1
            )?.toUpperCase() || "U"}
          </div>
          <div className="flex flex-col text-surface  leading-5">
            <div className="font-semibold">
              {userProfile?.UserProfilePersonalDetails?.UserFullName || "User"}
            </div>
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
          name="Preferences"
          icon={<MdRoomPreferences className="h-6 w-6 " />}
          path={PageRoutes.USER_PREFERENCES}
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
