import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { BuddhistYearToCurrentYearConverter } from "./_components/buddhist-year-converter";
import { BYearInfo, CYearInfo } from "./_components/year-infos";
import { Metadata } from "next";
import { config } from "@/lib/config";

const BuddhistYearToCurrentYearCalculator = () => {
  return (
    <div className="space-y-8">
      <Card className="border border-primary">
        <CardContent className="space-y-4 pt-6">
          <h1 className="text-2xl font-semibold text-primary md:text-4xl">
            แปลงปี ค.ศ. เป็น พ.ศ. และ พ.ศ. เป็น ค.ศ.
          </h1>
          <CardDescription>
            ใส่ตัวเลขลงในช่องปี พ.ศ. หรือปี ค.ศ. เพื่อแปลงตัวเลขปี
          </CardDescription>
          <BuddhistYearToCurrentYearConverter />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="space-y-4 pt-6">
          <h2 className="text-primary/80">สูตรการแปลงปี ค.ศ. เป็น พ.ศ.</h2>
          <div className="space-y-2">
            <p>พ.ศ. = ค.ศ. + 543</p>
            <p>หรือ</p>
            <p>ค.ศ. = พ.ศ. - 543</p>
          </div>
        </CardContent>
      </Card>

      <BYearInfo />
      <CYearInfo />
    </div>
  );
};

export default BuddhistYearToCurrentYearCalculator;
const title = "แปลงปี พ.ศ. เป็น ค.ศ. และ ค.ศ. เป็น พ.ศ.";
const description =
  "เครื่องมือแปลงปี พ.ศ. เป็น ค.ศ. และ ค.ศ. เป็น พ.ศ. ด้วยการป้อนตัวเลข";
const imgUrl =
  "https://img2.pic.in.th/pic/Open-Graph-Image4b0a41e5b37ea1cc.webp";
export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "แปลงปี พ.ศ. เป็น ค.ศ.",
    "แปลงปี ค.ศ. เป็น พ.ศ.",
    "ปี พ.ศ.",
    "ปี ค.ศ.",
    "พ.ศ.",
    "ค.ศ.",
  ],
  openGraph: {
    title: { absolute: title },
    description,
    url: config.baseUrl + "/tools/buddhist-year-to-current-year",
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
