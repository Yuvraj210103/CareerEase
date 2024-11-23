import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col w-full h-full">
      <Nav />
      <div className="min-h-[calc(100vh-4rem)] w-full bg-background">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
