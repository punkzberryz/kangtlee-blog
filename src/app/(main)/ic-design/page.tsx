import { Button } from "@/components/ui/button";
import { config } from "@/lib/config";
import { Metadata } from "next";
import Link from "next/link";
import { LinksSection } from "./_components/links-section";

const ICDesignPage = () => {
  return (
    <div className="mx-auto max-w-screen-2xl space-y-10">
      <div className="space-y-4">
        <h1>{title}</h1>
        <p className="text-gray-700 dark:text-gray-300">{description}</p>
        <p>
          หากท่านใดในสนพูดคุย หรือติดต่อสอบถาม สามารถเข้าร่วมกลุ่มในเฟสบุคได้ที่
          <Button asChild variant="link">
            <Link
              href="https://www.facebook.com/groups/552520994001442"
              target="_blank"
              rel="noopener noreferrer"
            >
              กลุ่ม Analog and Mixed-signal IC Design
            </Link>
          </Button>
        </p>
      </div>
      <LinksSection />
    </div>
  );
};
const title = "ออกแบบวงจร IC Design";
const description =
  "รวบรวมความรู้และเทคนิคการออกแบบวงจรรวม (IC design) ทั้งแบบอนาล็อค (Analog IC design) และดิจิตอล (Diginal IC design) ในเนื้อหาจะรวมถึงวิธีออกแบบวงจร ทฤษฎีเบื้องต้น เทคนิคที่ใช้ในทางปฏิบัติ การออกแบบ Layout ของวงจร การ Simulate วงจร การทดสอบวงจรทั้งแบบ Validate และ Test วงจร";
const keywords = [
  "ออกแบบวงจร IC Design, IC design",
  "วงจรอนาลอก",
  "วงจรดิจิตอล",
  "Analog IC design",
  "Diginal IC design",
  "วิธีออกแบบวงจร",
  "การออกแบบ Layout",
  "การ Simulate วงจร",
  "การทดสอบวงจร",
  "การ Validate วงจร",
  "การ Test วงจร",
  "semiconductor",
];
const imgUrl = "https://img2.pic.in.th/pic/ic-design.webp";

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  keywords,
  openGraph: {
    title: {
      absolute: title,
    },
    description,
    url: config.baseUrl + "/ic-design",
    siteName: "KangTLee Blog",
    locale: "th_TH",
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
    title: {
      absolute: title,
    },
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
export default ICDesignPage;
