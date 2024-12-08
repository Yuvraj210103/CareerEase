import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface UserPageLayoutProps {
  children: React.ReactNode;
}

const UserPageLayout = ({ children }: UserPageLayoutProps) => {
  const [opened, { toggle }] = useDisclosure();

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

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default UserPageLayout;
