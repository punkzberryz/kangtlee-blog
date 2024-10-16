export const LINKS: LinkProps[] = [
  { href: "/", label: "บทความ" },
  {
    href: "/ic-design",
    label: "IC Design",
  },
  {
    href: "/tools",
    label: "เครื่องมือ",
    sublinks: [
      {
        label: "แปลงปี พ.ศ. เป็น ค.ศ.",
        href: "/tools/buddhist-year-to-current-year",
        description: "แปลงปี พ.ศ. เป็น ค.ศ. และ ค.ศ. เป็น พ.ศ.",
      },
      {
        label: "ลบพื้นหลังรูปถ่าย",
        href: "/tools/image-background-remove",
        description:
          "ลบพื้นหลังรูปถ่าย ฟรี ไม่ต้องสมัครสมาชิก ไม่มีค่าใช้จ่าย ใช้งานสะดวก ไม่จำกัดจำนวนการใช้งาน",
      },
      {
        label: "สร้างใบแจ้งหนี้ | Invoice Generator",
        href: "/tools/invoice-generator",
        description:
          "สร้างใบแจ้งหนี้ ฟรี รวดเร็ว ออนไลน์ ไม่ต้องสมัครสมาชิก ไม่มีค่าใช้จ่าย ใช้งานสะดวก ไม่จำกัดจำนวนการใช้งาน",
      },
    ],
  },
  { href: "/contact", label: "ติดต่อเรา" },
];
export const ADMIN_LINKS: LinkProps[] = [
  {
    href: "/admin/blog/new",
    label: "บทความ",
    sublinks: [
      {
        label: "เพิ่มบทความ",
        href: "/admin/blog/new",
        description: "เพิ่มบทความใหม่",
      },
      {
        label: "จัดการ Tags",
        href: "/admin/blog/tags",
        description: "จัดการ Tags ของบทความ",
      },
    ],
  },
];
export type LinkProps = {
  href: string;
  label: string;
  sublinks?: SubLinks[];
};
type SubLinks = {
  label: string;
  href: string;
  description: string;
};
