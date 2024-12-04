import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import MenuItem from "./MenuItem";
import { MdOutlineLogout, MdOutlinePersonOutline } from "react-icons/md";
import { TiDocumentText } from "react-icons/ti";
import { GiConversation } from "react-icons/gi";
import { VscGitStashApply } from "react-icons/vsc";
import { PageRoutes } from "../../@types/enum";
import { openContextModal } from "@mantine/modals";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "../../store";

interface UserPageLayoutProps {
  children: React.ReactNode;
}

const UserPageLayout = ({ children }: UserPageLayoutProps) => {
  const [opened, { toggle }] = useDisclosure();

  const navigate = useNavigate();

  const { userSignOut } = useAuthState();
  return (
    <AppShell
      header={{ height: 85 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header style={{ border: "none" }}>
        <div className="flex items-center gap-4 px-4 py-2 h-full bg-layoutHeaderBg text-surface justify-between">
          <div className="flex gap-4 items-center">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="md"
              color="#ffffff"
            />
            <div
              onClick={() => window.location.reload()}
              className="flex items-center cursor-pointer text-surface"
            >
              <img
                src="/logo.png"
                alt=""
                className="md:h-[50px] md:w-[65px] h-[40px] w-[50px]"
              />
              <div className="font-bold text-xl">CareerEase</div>
            </div>
          </div>
          <div
            onClick={() => {
              openContextModal({
                modal: "confirmModal",
                withCloseButton: false,
                centered: true,
                closeOnClickOutside: true,
                innerProps: {
                  title: "Confirm",
                  body: "Are you sure to sign out?",
                  onConfirm: () => {
                    navigate(PageRoutes.HOME);
                    userSignOut();
                  },
                },
                size: "30%",
                styles: {
                  body: { padding: "0px" },
                },
              });
            }}
            className="flex items-center justify-center text-3xl cursor-pointer"
          >
            <MdOutlineLogout />
          </div>
        </div>
      </AppShell.Header>

      <AppShell.Navbar p="0">
        <div className="flex flex-col bg-sidebarBg h-full w-full py-4 gap-4">
          <MenuItem
            name="Profile"
            icon={<MdOutlinePersonOutline className="h-6 w-6 " />}
            path={PageRoutes.USER_HOME}
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

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default UserPageLayout;
