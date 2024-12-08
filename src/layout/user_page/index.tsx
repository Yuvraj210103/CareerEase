import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useUIState } from "../../store";

interface UserPageLayoutProps {
  children: React.ReactNode;
}

const UserPageLayout = ({ children }: UserPageLayoutProps) => {
  const [opened, { toggle }] = useDisclosure();

  const { showFooter } = useUIState();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
    >
      <Header opened={opened} toggle={toggle} />

      <Sidebar />

      <AppShell.Main bg={"#f7f7f7"}>{children}</AppShell.Main>

      {showFooter && <Footer />}
    </AppShell>
  );
};

export default UserPageLayout;
