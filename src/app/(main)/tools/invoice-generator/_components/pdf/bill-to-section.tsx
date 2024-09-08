import { View, Text } from "@react-pdf/renderer";
import { tw } from "./tailwind-config";
import { InvoiceFormSchema } from "../form/invoice-schema";

export const BillToSection = ({ invoice }: { invoice: InvoiceFormSchema }) => {
  return (
    <View style={tw("text-base flex flex-row gap-2")}>
      <Text>ถึง&nbsp;</Text>
      <View>
        <Text>{invoice.billTo.name}&nbsp;</Text>
        <Text>{invoice.billTo.addressLine1}&nbsp;</Text>
        <Text>{invoice.billTo.addressLine2}&nbsp;</Text>
        <Text>เลขประจำตัวผู้เสียภาษีอากร {invoice.billTo.taxId}&nbsp;</Text>
      </View>
    </View>
  );
};
