import { config } from "@/lib/config";
import { Client } from "./client";
import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

const ImageBackgroundRemovePage = () => {
  return (
    <div className="mx-auto max-w-screen-xl space-y-8">
      <Card>
        <CardHeader>
          <h1>{title}</h1>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Client />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <h2>วิธีใช้</h2>
          <CardDescription>วิธีลบพื้นหลังรูป</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-inside list-decimal space-y-2">
            {STEPS.map((s, idx) => (
              <li key={idx}>{s}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

const STEPS = [
  "เพียงลากรูป หรือกดในช่องวางรูปและเลือกรูปที่ต้องการ",
  "กดปุ่ม ลบพื้นหลัง (ติ๊กปุ่ม ใช้ GPU หากมี เพื่อเพิ่มความเร็วในการลบรูป)",
  "จะมีกด Download ปรากฎขึ้น เราเพียงกดปุ่ม รูปก็จะถูกเซฟลงคอมหรือมือถือของคุณ",
];
export default ImageBackgroundRemovePage;

const title = "ลบพื้นหลังรูปถ่าย ฟรี";
const description =
  "ลบพื้นหลังรูปถ่าย ฟรี ไม่ต้องสมัครสมาชิก ไม่มีค่าใช้จ่าย ใช้งานสะดวก ไม่จำกัดจำนวนการใช้งาน";
const imgUrl = "https://img2.pic.in.th/pic/background-remove.webp";

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  keywords: ["ลบพื้นหลังรูปถ่าย ฟรี", "ลบพื้นหลังรูปถ่าย", "ลบพื้นหลัง"],
  openGraph: {
    title: { absolute: title },
    description,
    url: config.baseUrl + "/tools/image-background-remove",
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
