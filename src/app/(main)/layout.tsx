import { MainLayout as MainLayoutWrapper } from "@/components/navbar";
import React from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { config } from "@/lib/config";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MainLayoutWrapper>{children}</MainLayoutWrapper>
      <GoogleAnalytics gaId={config.googleAnalyticsId} />
    </>
  );
};

export default MainLayout;
