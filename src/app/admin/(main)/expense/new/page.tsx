import { PageWrapper } from "@/components/navbar/admin-sidenav/page-wrapper";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
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
    >
      <Card className="w-full max-w-4xl">
        <CardContent className="flex flex-col space-y-6 p-6">
          <CardTitle>Add New Expense</CardTitle>
          <ExpenseForm />
        </CardContent>
      </Card>
    </PageWrapper>
  );
};

export default AddNewExpensePage;

export const metadata = {
  title: "New Expense | Admin",
  description: "Add new expense to Google Sheets",
};
