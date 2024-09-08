import { Text, View, Image as PdfImage } from "@react-pdf/renderer";
import { tw } from "./tailwind-config";
import { InvoiceFormSchema } from "../form/invoice-schema";

export const AuthorizedBySection = ({
  invoice,
}: {
  invoice: InvoiceFormSchema;
}) => {
  return (
    <View
      style={tw("text-base ml-auto flex flex-col items-center")}
      wrap={false}
    >
      <Text>ขอแสดงความนับถือ &nbsp;</Text>
      {invoice.authorizedBy.signatureUrl ? (
        <PdfImage
          src={invoice.authorizedBy.signatureUrl}
          style={tw("w-[175px] h-[100px] rounded-3xl object-contain")}
        />
      ) : (
        <View style={tw("w-[175px] h-[100px]")}></View>
      )}
      <Text>({invoice.authorizedBy.name}) &nbsp;</Text>
      <Text>เจ้าหน้าที่ผู้มีอำนาจลงนาม &nbsp;</Text>
    </View>
  );
};
