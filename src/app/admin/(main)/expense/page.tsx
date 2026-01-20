import Link from "next/link";
import { PageWrapper } from "@/components/navbar/admin-sidenav/page-wrapper";
import { CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExpenseRow, fetchExpenseRows } from "@/lib/google-sheets";

const ExpensePage = async () => {
  let expenses: ExpenseRow[] = [];
  let errorMessage = "";

  try {
    expenses = await fetchExpenseRows();
  } catch (error) {
    errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to load Google Sheets data.";
  }

  const total = expenses.reduce((sum, row) => sum + row.amount, 0);

  return (
    <PageWrapper
      links={[
        { href: "/admin", title: "Dashboard" },
        { href: "#", title: "Expense" },
      ]}
      title="Expense | Google Sheets"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <CardTitle>Expense from Google Sheets</CardTitle>
          <div className="rounded-full bg-muted px-4 py-1 text-sm font-medium">
            Total: {total.toLocaleString()}
          </div>
        </div>
        <Button asChild>
          <Link href="/admin/expense/new">Add Expense</Link>
        </Button>
      </div>

      {errorMessage ? (
        <div className="mt-6 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {errorMessage}
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-lg border">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-muted text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3 text-right">Amount</th>
                  <th className="px-4 py-3">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {expenses.map((row, index) => (
                  <tr key={`${row.date}-${row.name}-${index}`}>
                    <td className="px-4 py-3 whitespace-nowrap">{row.date}</td>
                    <td className="px-4 py-3">{row.name}</td>
                    <td className="px-4 py-3">{row.category}</td>
                    <td className="px-4 py-3">{row.type}</td>
                    <td className="px-4 py-3 text-right">
                      {row.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">{row.description}</td>
                  </tr>
                ))}
                {expenses.length === 0 ? (
                  <tr>
                    <td
                      className="px-4 py-6 text-center text-muted-foreground"
                      colSpan={6}
                    >
                      No expenses found.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </PageWrapper>
  );
};

export default ExpensePage;

export const metadata = {
  title: "Expense | Admin",
  description: "Expense data from Google Sheets",
};

export const revalidate = 60;
