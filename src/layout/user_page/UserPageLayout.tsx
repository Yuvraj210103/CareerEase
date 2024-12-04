import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

interface UserPageLayoutProps {
  children: React.ReactNode;
}

const UserPageLayout = ({ children }: UserPageLayoutProps) => {
  const [opened, { toggle }] = useDisclosure();
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
        <div className="flex items-center gap-4 px-2 py-2 h-full bg-[#000000]">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="md" />
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
      </AppShell.Header>

      <AppShell.Navbar p="0">
        <div className="flex flex-col bg-sidebarBg h-full">Hwello</div>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default UserPageLayout;
