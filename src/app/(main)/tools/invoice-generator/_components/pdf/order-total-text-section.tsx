import { InvoiceFormSchema } from "../form/invoice-schema";
import { Text, View } from "@react-pdf/renderer";
import { bahttext } from "bahttext";
import { tw } from "./tailwind-config";

export const OrderTotalTextSection = ({
  invoice,
}: {
  invoice: InvoiceFormSchema;
}) => {
  return (
    <View style={tw("text-base flex flex-row")}>
      <Text>(ตัวอีกษร)&nbsp;</Text>
      <Text style={tw("font-semibold")}>
        {bahttext(invoice.orderSummary.total)}&nbsp;
      </Text>
    </View>
  );
};
