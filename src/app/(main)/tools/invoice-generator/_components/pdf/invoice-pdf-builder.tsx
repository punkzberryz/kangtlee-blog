import { Document, Page, Text, View } from "@react-pdf/renderer";
import { tw } from "./tailwind-config";
import { InvoiceFormSchema } from "../form/invoice-schema";
import { CompanySection } from "./company-section";
import { DateAndRefSection } from "./date-and-ref-section";
import { BillToSection } from "./bill-to-section";
import { OrderTableSection } from "./order-table-section";
import { OrderSummarySection } from "./order-summary-section";
import { PaymentMethodSection } from "./payment-method-section";
import { OrderTotalTextSection } from "./order-total-text-section";
import { AuthorizedBySection } from "./authorized-by-section";

export const InvoicePdfBuilder = ({
  invoice,
}: {
  invoice: InvoiceFormSchema | null;
}) => {
  if (!invoice) return <Document></Document>;
  return (
    <Document
      title={`ใบเสร็จรับเงิน ${invoice.refId} ${invoice.billTo.name}`}
      author={invoice.companyName}
      subject="ใบเสร็จรับเงิน"
      keywords="ใบเสร็จรับเงิน, ใบแจ้งหนี้, ใบกำกับภาษี"
      creator="Invoice Generator"
      language="th"
    >
      <Page size="A4" style={tw("px-12 py-10 font-sans gap-8")}>
        <View style={tw("pb-4 border-b border-gray-300 relative")} fixed>
          <View>
            <Text style={tw("text-3xl font-semibold tracking-tighter")}>
              ใบเสร็จรับเงิน&nbsp;
            </Text>
          </View>
          <View style={tw("flex flex-row justify-between gap-x-8")}>
            <CompanySection invoice={invoice} />
            <DateAndRefSection invoice={invoice} />
          </View>
          <View
            style={tw(
              "absolute top-0 right-0 text-sm font-light text-gray-500",
            )}
          >
            <Text
              render={({ pageNumber, totalPages }) => {
                if (totalPages === 1) return;
                return `(${pageNumber} / ${totalPages})`;
              }}
            />
          </View>
        </View>
        <BillToSection invoice={invoice} />
        <OrderTableSection items={invoice.orderItems} />
        <View style={tw("flex flex-row justify-between")} wrap={false}>
          <View style={tw("flex flex-col justify-between")}>
            <PaymentMethodSection invoice={invoice} />
            <OrderTotalTextSection invoice={invoice} />
          </View>
          <OrderSummarySection invoice={invoice} />
        </View>
        <AuthorizedBySection invoice={invoice} />
      </Page>
    </Document>
  );
};
