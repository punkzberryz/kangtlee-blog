import { Card, CardContent } from "@/components/ui/card";

import { ReactNode } from "react";

export const BYearInfo = () => {
  return (
    <CardWrapper title="เกร็ดความรู้เกี่ยวกับปี พ.ศ.">
      <p>
        ปี พ.ศ. (พุทธศักราช) เป็นระบบการนับปีที่ใช้ในประเทศไทยและประเทศอื่นๆ
        ที่มีอิทธิพลจากพระพุทธศาสนา โดยมีความสำคัญและลักษณะเฉพาะที่น่าสนใจดังนี้
      </p>
      <ul className="space-y-1">
        {BYEAR_INFO.map((info, index) => (
          <li key={index} className="space-x-2">
            <span className="font-semibold">{info.title}</span>
            <span className="whitespace-pre-wrap">{info.description}</span>
          </li>
        ))}
      </ul>
      <p>
        การเข้าใจระบบการนับปีนี้ช่วยให้สามารถศึกษาประวัติศาสตร์และวัฒนธรรมของประเทศไทยได้อย่างถูกต้องและมีประสิทธิภาพ
      </p>
    </CardWrapper>
  );
};

export const CYearInfo = () => {
  return (
    <CardWrapper title="เกร็ดความรู้เกี่ยวกับปี ค.ศ.">
      <p>
        ปี ค.ศ. (คริสต์ศักราช)
        เป็นระบบการนับปีที่ใช้กันอย่างแพร่หลายในวัฒนธรรมตะวันตก
        โดยมีเกร็ดน่ารู้เกี่ยวกับการนับปีในระบบนี้ดังนี้
      </p>
      <ul className="space-y-1">
        {CYEAR_INFO.map((info, index) => (
          <li key={index} className="space-x-2">
            <span className="font-semibold">{info.title}</span>
            <span className="whitespace-pre-wrap">{info.description}</span>
          </li>
        ))}
      </ul>
      <p>
        ระบบการนับปี ค.ศ. นี้ได้รับการยอมรับและใช้งานอย่างแพร่หลายในปัจจุบัน
        ทำให้เกิดความเข้าใจร่วมกันในการอ้างอิงเหตุการณ์ทางประวัติศาสตร์ในวัฒนธรรมตะวันตก
      </p>
    </CardWrapper>
  );
};

const BYEAR_INFO: { title: string; description: string }[] = [
  {
    title: "การเริ่มต้นนับปี",
    description:
      "ปี พ.ศ. เริ่มนับตั้งแต่วันปรินิพพานของพระพุทธเจ้า ซึ่งเชื่อกันว่าเกิดขึ้นในปีที่ 543 ก่อน ค.ศ. ดังนั้นการแปลงปี พ.ศ. เป็น ค.ศ. สามารถทำได้โดยการลบ 543 ปี เช่น พ.ศ. 2567 เท่ากับ ค.ศ. 2024 (2567 - 543 = 2024)",
  },
  {
    title: "การใช้งาน",
    description:
      "ปี พ.ศ. ถูกนำมาใช้ในเอกสารราชการและการศึกษาในประเทศไทยอย่างเป็นทางการ โดยมีการประกาศให้ใช้ในปี พ.ศ. 2460 ในสมัยรัชกาลที่ 6 เพื่อให้มีมาตรฐานในการนับปีที่ชัดเจน",
  },
  {
    title: "การใช้ในชีวิตประจำวัน",
    description:
      "ปี พ.ศ. เป็นที่รู้จักและใช้กันอย่างแพร่หลายในการอ้างอิงถึงเหตุการณ์สำคัญในประวัติศาสตร์ไทย เช่น การก่อตั้งกรุงรัตนโกสินทร์ในปี พ.ศ. 2325",
  },

  {
    title: "การเปรียบเทียบกับ ค.ศ.",
    description:
      "การแปลงปีจาก ค.ศ. เป็น พ.ศ. สามารถทำได้โดยการบวก 543 ปี เช่น ค.ศ. 2024 เท่ากับ พ.ศ. 2567 (2024 + 543 = 2567)",
  },
];
const CYEAR_INFO: { title: string; description: string }[] = [
  {
    title: "การเริ่มต้นนับปี",
    description:
      "ปี ค.ศ. เริ่มนับตั้งแต่ปีที่เชื่อว่าพระเยซูคริสต์เกิดขึ้น ซึ่งมีการกำหนดให้ปี ค.ศ. 1 เป็นปีแรก โดยไม่มีปี 0 ในระบบนี้",
  },
  {
    title: "การใช้งาน",
    description:
      "ปี ค.ศ. เป็นระบบที่ใช้กันอย่างแพร่หลายในประเทศตะวันตก และในเอกสารทางประวัติศาสตร์ที่เกี่ยวข้องกับเหตุการณ์สำคัญในประวัติศาสตร์โลก \nในปี ค.ศ. 1290 เริ่มมีการใช้คำว่า 'lunatic' ในภาษาอังกฤษ ซึ่งมีความหมายว่า คนเพี้ยน คนไม่สมประกอบ โดยมีรากศัพท์เกี่ยวกับดวงจันทร์ เนื่องจากความเชื่อในยุคนั้นว่าดวงจันทร์มีอิทธิพลต่อพฤติกรรมประหลาดของมนุษย์",
  },
];

const CardWrapper = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <h2 className="text-primary/80">{title}</h2>
        {children}
      </CardContent>
    </Card>
  );
};
