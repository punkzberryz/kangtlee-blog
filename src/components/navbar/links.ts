export const LINKS: LinkProps[] = [
  { href: "/blog", label: "บทความ" },
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
