import { MainLayout as MainLayoutWrapper } from "@/components/navbar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return <MainLayoutWrapper>{children}</MainLayoutWrapper>;
};

export default MainLayout;
