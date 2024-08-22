import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import React, { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[calc(100vh-156px)] flex-col items-center pt-2">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default AdminLayout;
