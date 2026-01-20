import { PageWrapper } from "@/components/navbar/admin-sidenav/page-wrapper";
import { ExpenseForm } from "./_components/expense-form";

const AddNewExpensePage = () => {
  return (
    <PageWrapper
      links={[
        { href: "/admin", title: "Dashboard" },
        { href: "/admin/expense", title: "Expense" },
        { href: "#", title: "New" },
      ]}
      title="Add New Expense"
      options={{ hasMaxWidth: true }}
    >
      <div className="ml-auto" />
      <ExpenseForm />
    </PageWrapper>
  );
};

export default AddNewExpensePage;

export const metadata = {
  title: "New Expense | Admin",
  description: "Add new expense to Google Sheets",
};
