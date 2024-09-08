import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Metadata } from "next";
import { InvoiceForm } from "./_components/form/invoice-form";

const InvoiceGeneratorPage = () => {
  return (
    <div className="mx-auto max-w-screen-xl">
      <Card>
        <CardHeader>
          <h1>{title}</h1>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <InvoiceForm />
        </CardContent>
      </Card>
    </div>
  );
};
const title = "สร้างใบแจ้งหนี้ ฟรี รวดเร็ว ออนไลน์";
const description =
  "สร้างใบแจ้งหนี้ ฟรี รวดเร็ว ออนไลน์ ไม่ต้องสมัครสมาชิก ไม่มีค่าใช้จ่าย ใช้งานสะดวก ไม่จำกัดจำนวนการใช้งาน";

export default InvoiceGeneratorPage;
export const metadata: Metadata = {
  title: {
    absolute: "สร้างใบแจ้งหนี้ ฟรี รวดเร็ว ออนไลน์",
  },
};
