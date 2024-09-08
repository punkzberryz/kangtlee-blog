import { InvoiceFormSchema } from "../form/invoice-schema";
import { View, Text } from "@react-pdf/renderer";
import { tw } from "./tailwind-config";
import { formatPrice } from "@/lib/format/format-price";

export const OrderSummarySection = ({
  invoice,
}: {
  invoice: InvoiceFormSchema;
}) => {
  return (
    <View style={tw("text-base mr-2")}>
      <View style={tw("flex flex-row")}>
        <Text style={tw("w-[90px]")}>รวมจำนวนเงิน&nbsp;</Text>
        <Text>{formatPrice(invoice.orderSummary.subTotal)} บาท&nbsp;</Text>
      </View>
      <View style={tw("flex flex-row")}>
        <Text style={tw("w-[90px]")}>ส่วนลด&nbsp;</Text>
        <Text>{formatPrice(invoice.orderSummary.discount)} บาท&nbsp;</Text>
      </View>
      <View style={tw("flex flex-row")}>
        <Text style={tw("w-[90px]")}>ภาษีหัก ณ ที่จ่าย&nbsp;</Text>
        <Text>{formatPrice(invoice.orderSummary.tax)} บาท&nbsp;</Text>
      </View>
      <View style={tw("flex flex-row")}>
        <Text style={tw("w-[90px]")}>ยอดรวมทั้งสิ้น&nbsp;</Text>
        <Text>{formatPrice(invoice.orderSummary.total)} บาท&nbsp;</Text>
      </View>
    </View>
  );
};
