import { Footer } from "@/components/footer";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Navbar } from "@/components/navbar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="mx-auto min-h-[calc(100vh-170px)] max-w-screen-2xl">
        <MaxWidthWrapper className="py-10">{children}</MaxWidthWrapper>
      </main>
      <Footer className="py-2" />
    </>
  );
};

export default MainLayout;
