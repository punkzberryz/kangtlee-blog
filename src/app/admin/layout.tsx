import { Navbar } from "@/components/navbar";
import { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[calc(100vh-56px)] flex-col items-center pt-2">
        {children}
      </main>
    </>
  );
};

export default AdminLayout;
