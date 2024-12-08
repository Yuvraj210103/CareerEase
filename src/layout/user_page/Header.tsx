import { AppShell, Burger } from "@mantine/core";
import { openContextModal } from "@mantine/modals";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "../../store";
import { PageRoutes } from "../../@types/enum";
import { MdOutlineLogout } from "react-icons/md";

interface HeaderProps {
  opened: boolean;
  toggle: () => void;
}

const Header = ({ opened, toggle }: HeaderProps) => {
  const navigate = useNavigate();

  const { userSignOut } = useAuthState();
  return (
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
              className="md:h-[40px] md:w-[50px] h-[40px] w-[50px]"
            />
            <div className="font-bold text-lg">CareerEase</div>
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
  );
};

export default Header;
