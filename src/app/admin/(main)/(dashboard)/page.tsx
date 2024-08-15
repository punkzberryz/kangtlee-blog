import { PageWrapper } from "@/components/navbar/admin-sidenav/page-wrapper";

const AdminMainPage = () => {
  return (
    <PageWrapper
      links={[{ href: "#", title: "Dashboard" }]}
      title="หน้าหลัก | Dashboard"
    >
      <div>Dashboard page...</div>
    </PageWrapper>
  );
};

export default AdminMainPage;
