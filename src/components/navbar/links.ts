export const LINKS: LinkProps[] = [
  { href: "/", label: "บทความ" },
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
        label: "Youtube Transcript Extractor",
        href: "/tools/youtube-transcript",
        description:
          "Extract transcript from youtube video by providing video URL",
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
