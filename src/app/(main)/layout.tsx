import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Navbar } from "@/components/navbar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="mx-auto min-h-[calc(100vh-56px)] max-w-screen-2xl">
        <MaxWidthWrapper className="py-10">{children}</MaxWidthWrapper>
      </main>
    </>
  );
};

export default MainLayout;
