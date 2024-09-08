import { View, Text } from "@react-pdf/renderer";
import { tw } from "./tailwind-config";
import { InvoiceFormSchema } from "../form/invoice-schema";

export const DateAndRefSection = ({
  invoice,
}: {
  invoice: InvoiceFormSchema;
}) => {
  return (
    <View style={tw("text-sm")}>
      <View style={tw("flex flex-row gap-4")}>
        <Text style={tw("w-[25px]")}>เลขที่&nbsp;</Text>
        <Text>{invoice.refId}&nbsp;</Text>
      </View>
      <View style={tw("flex flex-row gap-4")}>
        <Text style={tw("w-[25px]")}>วันที่&nbsp;</Text>
        <Text>{invoice.date}&nbsp;</Text>
      </View>
      <View style={tw("flex flex-row gap-4")}>
        <Text style={tw("w-[25px]")}>อ้างอิง&nbsp;</Text>
        <Text>{invoice.quoteId}&nbsp;</Text>
      </View>
    </View>
  );
};
