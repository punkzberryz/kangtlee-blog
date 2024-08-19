export const LINKS: LinkProps[] = [
  { href: "/", label: "บทความ" },
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
