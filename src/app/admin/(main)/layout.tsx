import { ClientSideNavWrapper } from "@/components/navbar/admin-sidenav/client-sidenav-wrapper";
import { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return <ClientSideNavWrapper>{children}</ClientSideNavWrapper>;
};

export default AdminLayout;
