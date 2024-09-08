import { Text, View } from "@react-pdf/renderer";
import { tw } from "./tailwind-config";
import { InvoiceFormSchema } from "../form/invoice-schema";

interface OrderTableSectionProps {
  items: InvoiceFormSchema["orderItems"];
}
export const OrderTableSection = ({ items }: OrderTableSectionProps) => {
  return (
    <View style={tw("flex flex-row flex-wrap")}>
      {/* Header */}
      <View
        style={tw(
          "text-sm font-semibold text-gray-500 flex flex-row items-center border border-gray-200 rounded-t-lg",
        )}
      >
        <Text style={tw("w-[5%] p-4")}>#&nbsp;</Text>
        <Text style={tw("w-[20%] p-4")}>สินค้า&nbsp;</Text>
        <Text style={tw("w-[30%] p-4")}>รายละเอียด&nbsp;</Text>
        <Text style={tw("w-[15%] p-4")}>ราคา&nbsp;</Text>
        <Text style={tw("w-[15%] p-4")}>จำนวน&nbsp;</Text>
        <Text style={tw("w-[15%] p-4")}>รวม&nbsp;</Text>
      </View>
      {/* Rows */}
      {items.map((item, index) => (
        <View
          key={index}
          style={tw(
            `text-base flex flex-row items-center border-l border-r border-b border-gray-200 ${
              index === items.length - 1 ? "rounded-b-lg" : ""
            }`,
          )}
        >
          <Text style={tw("w-[5%] p-4")}>{item.id}&nbsp;</Text>
          <Text style={tw("w-[20%] p-4")}>{item.name}&nbsp;</Text>
          <Text style={tw("w-[30%] p-4")}>{item.description}&nbsp; </Text>
          <Text style={tw("w-[15%] p-4")}>{item.price}&nbsp;</Text>
          <Text style={tw("w-[15%] p-4")}>{item.quantity}&nbsp;</Text>
          <Text style={tw("w-[15%] p-4")}>{item.total}&nbsp;</Text>
        </View>
      ))}
    </View>
  );
};
