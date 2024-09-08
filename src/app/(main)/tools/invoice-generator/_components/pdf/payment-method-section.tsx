import { InvoiceFormSchema, paymentMethodLabels } from "../form/invoice-schema";
import { View, Text } from "@react-pdf/renderer";
import { tw } from "./tailwind-config";
export const PaymentMethodSection = ({
  invoice,
}: {
  invoice: InvoiceFormSchema;
}) => {
  return (
    <View style={tw("flex flex-row gap-2 text-base")}>
      <Text>ชำระเงินโดย&nbsp;</Text>
      <Text>{paymentMethodLabels.get(invoice.paymentMethod)}&nbsp;</Text>
    </View>
  );
};

PaymentMethodSection;
