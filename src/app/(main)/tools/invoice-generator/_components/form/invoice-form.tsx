"use client";

import { useForm } from "react-hook-form";
import { invoiceFormSchema, InvoiceFormSchema } from "./invoice-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatDateToString } from "@/lib/format/format-date";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Form } from "@/components/ui/form";
import { CompanyLogoField } from "./companty-logo-field";
import { CompanyField } from "./company-field";
import { DateAndRefField } from "./date-and-ref-field";
import { BillToField } from "./bill-to-field";
import { OrderField } from "./order-field";
import { PaymentMethod } from "./table/payment-method";
import { OrderSummaryField } from "./order-summary-field";
import { AuthorizedByField } from "./authorized-by-field";
import { Button } from "@/components/ui/button";
import { pdf } from "@react-pdf/renderer";
import { InvoicePdfBuilder } from "../pdf/invoice-pdf-builder";

export const InvoiceForm = () => {
  const { form, onSubmit, invoice } = useInvoiceForm();

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (e) => {
            console.error(e);
            toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
          })}
          className="space-y-8"
        >
          <div className="flex flex-col md:flex-row-reverse">
            <Button type="submit">Download</Button>
          </div>
          <div className="space-y-8 px-10 py-10">
            <h1 className="text-3xl font-semibold tracking-tighter">
              ใบเสร็จรับเงิน
            </h1>
            {/* Header section */}
            <div className="flex justify-between space-x-8">
              {/* Company section */}
              <div className="flex items-center space-x-6">
                <CompanyLogoField form={form} />
                <CompanyField form={form} />
              </div>
              {/* Date, and reference number */}
              <DateAndRefField form={form} />
            </div>
            {/* Bill to */}
            <BillToField form={form} />
            {/* Order Table */}
            <OrderField form={form} />
            <div className="flex justify-between">
              <PaymentMethod form={form} />
              <OrderSummaryField form={form} />
            </div>
            <AuthorizedByField form={form} />
          </div>
        </form>
      </Form>
    </div>
  );
};
const useInvoiceForm = () => {
  const today = new Date();
  const [invoice, setInvoice] = useState<InvoiceFormSchema | null>(null);

  const form = useForm<InvoiceFormSchema>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      companyLogoUrl: "/logo.png",
      companyName: "บริษัท พาไป แพลตฟอร์ม จำกัด",
      addressLine1: "7/19 หมู่ 8 ซอยเทพกุญชร 1 ถ.คลองหลวงคลองหนึ่ง",
      addressLine2: "คลองหลวง, ปทุมธานี, 12120",
      taxId: "0135566028895",
      refId: `INV${today.getFullYear()}${
        today.getMonth() < 9 ? `0${today.getMonth() + 1}` : today.getMonth() + 1
      }${today.getDate() < 10 ? `0${today.getDate()}` : today.getDate()}-0002`,
      date: formatDateToString(today),
      quoteId: `Q${today.getFullYear()}${
        today.getMonth() + 1
      }${today.getDate()}-0001`,
      billTo: {
        name: "บริษัท พาไป แพลตฟอร์ม จำกัด",
        addressLine1: "7/19 หมู่ 8 ซอยเทพกุญชร 1 ถ.คลองหลวงคลองหนึ่ง",
        addressLine2: "คลองหลวง, ปทุมธานี, 12120",
        taxId: "0135566028895",
      },
      orderItems: [
        {
          id: 1,
          name: "สินค้า 1",
          description: "",
          price: 100,
          quantity: 1,
          total: 100,
        },
      ],
      orderSummary: {
        subTotal: 0,
        tax: 0,
        discount: 0,
        total: 0,
      },
      authorizedBy: {
        name: "ชื่อ นามสกุล",
      },
      paymentMethod: "cash",
    },
  });

  const onSubmit = (data: InvoiceFormSchema) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    toast.success("บันทึกข้อมูลสำเร็จ");

    const blob = pdf(<InvoicePdfBuilder invoice={data} />).toBlob();
    blob.then((blob) => {
      const url = URL.createObjectURL(blob);
      var link = document.createElement("a");
      link.href = url;
      link.download = `invoice-${data.refId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  };
  useEffect(() => {
    if (form) {
      //   useInvoiceStore.setState({ invoice: form.getValues() });
    }
  }, [form]);
  return { form, onSubmit, invoice };
};
