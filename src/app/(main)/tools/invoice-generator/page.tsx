import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Metadata } from "next";
import { InvoiceForm } from "./_components/form/invoice-form";
import { config } from "@/lib/config";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const InvoiceGeneratorPage = () => {
  return (
    <div className="mx-auto max-w-screen-xl space-y-8">
      <Card>
        <CardHeader>
          <h1>{title}</h1>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <InvoiceForm />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <p>
            หากพบข้อผิดพลาด หรือต้องการให้เราเพิ่มฟีเจอร์เสริม
            สามารถติดต่อเราได้ที่
            <Button asChild variant="link">
              <Link href="/contact" target="_blank">
                ลิงค์นี้
              </Link>
            </Button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
const title = "สร้างใบแจ้งหนี้ ฟรี รวดเร็ว ออนไลน์";
const description =
  "สร้างใบแจ้งหนี้ ฟรี รวดเร็ว ออนไลน์ ไม่ต้องสมัครสมาชิก ไม่มีค่าใช้จ่าย ใช้งานสะดวก ไม่จำกัดจำนวนการใช้งาน";
const imgUrl = "https://img2.pic.in.th/pic/invoice-generator.webp";

export default InvoiceGeneratorPage;

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  keywords: ["สร้างใบแจ้งหนี้ ฟรี", "สร้างใบแจ้งหนี้", "ใบแจ้งหนี้"],
  openGraph: {
    title: { absolute: title },
    description,
    url: config.baseUrl + "/tools/invoice-generator",
    siteName: "KangTLee",
    locale: "th_TH",
    type: "website",
    images: [
      {
        url: imgUrl,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    title: { absolute: title },
    description,
    images: [
      {
        url: imgUrl,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    card: "summary_large_image",
    creator: "@KangTLee1",
  },
};
