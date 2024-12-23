import React from "react";
import Footer from "./Footer";
import Nav from "./Nav";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col w-full h-full">
      <Nav />
      <div className="min-h-[calc(100vh-4rem)] w-full bg-background mt-16">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
