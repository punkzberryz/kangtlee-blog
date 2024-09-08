import { View, Image as PdfImage, Text } from "@react-pdf/renderer";
import React from "react";
import { tw } from "./tailwind-config";
import { InvoiceFormSchema } from "../form/invoice-schema";

export const CompanySection = ({ invoice }: { invoice: InvoiceFormSchema }) => {
  return (
    <View style={tw("flex flex-row items-start gap-6")}>
      <PdfImage
        src={invoice.companyLogoUrl}
        style={tw("w-[85px] h-[85px] rounded-3xl object-contain")}
      />
      <View>
        <Text style={tw("text-xl font-semibold border-b")}>
          {/* Last text is missing if it's in Thai lang, so we add space (&nbsp;) to fix the bug */}
          {invoice.companyName}&nbsp;
        </Text>
        <Text style={tw("text-base")}>{invoice.addressLine1}&nbsp;</Text>
        <Text style={tw("text-base")}>{invoice.addressLine2}&nbsp;</Text>
        <Text style={tw("text-base border-b")}>
          เลขประจำตัวผู้เสียภาษีอากร {invoice.taxId}&nbsp;
        </Text>
      </View>
    </View>
  );
};
