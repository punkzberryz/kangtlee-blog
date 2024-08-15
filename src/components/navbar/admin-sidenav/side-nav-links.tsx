"use client";

import { LayoutDashboard, LucideIcon, NewspaperIcon } from "lucide-react";
import { useToggleSideNav } from "./use-toggle-sidenav";
import { SignOutButton } from "../signout-button";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

type LinkProps = {
  href: string;
  label: string;
  icon: LucideIcon;
  sublinks?: SubLinks[];
};
type SubLinks = {
  label: string;
  href: string;
};

const ADMIN_LINKS: LinkProps[] = [
  {
    href: "/admin",
    label: "หน้าหลัก Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/blog",
    label: "จัดการบทความ",
    icon: NewspaperIcon,
    sublinks: [
      {
        label: "เขียนบทความ",
        href: "/admin/blog/new",
      },
      { label: "จัดการบทความทั่งหมด", href: "/admin/blog" },
      {
        label: "จัดการหมวดหมู่",
        href: "/admin/blog/category",
      },
      {
        label: "จัดการ Tags",
        href: "/admin/blog/tag",
      },
    ],
  },
];

export const SideNavLinks = () => {
  const { isExpanded } = useToggleSideNav();
  return (
    <div className="flex flex-col space-y-4">
      {ADMIN_LINKS.map((l, index) => (
        <NavLink
          href={l.href}
          icon={l.icon}
          isExpanded={isExpanded}
          label={l.label}
          key={index}
          sublinks={l.sublinks}
        />
      ))}
      <SignOutButton isExpanded={isExpanded} />
    </div>
  );
};

export const SideNavLinksForSheet = () => {
  return (
    <div className="flex flex-col space-y-4">
      {ADMIN_LINKS.map((link) => (
        <NavLink key={link.href} {...link} isExpanded />
      ))}
      <SignOutButton isExpanded />
    </div>
  );
};

const NavLink = ({
  href,
  label,
  icon: Icon,
  isExpanded,
  sublinks,
}: LinkProps & { isExpanded: boolean }) => {
  const [openPopover, setOpenPopover] = useState(false);
  const handleOnClick = () => {
    if (isExpanded) return;
    console.log("click");
    setOpenPopover(true);
  };
  if (sublinks)
    return (
      <>
        <Accordion type="single" collapsible hidden={!isExpanded}>
          <AccordionItem value={label}>
            <AccordionTrigger className="pr-2" onClick={handleOnClick}>
              <ItemUi icon={Icon} isExpanded={isExpanded} label={label} />
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 pl-10">
              {sublinks.map((sublink, index) => (
                <Link key={index} href={sublink.href}>
                  {sublink.label}
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Popover open={openPopover} onOpenChange={setOpenPopover}>
          <PopoverTrigger hidden={isExpanded}>
            <ItemUi icon={Icon} isExpanded={isExpanded} label={label} />
          </PopoverTrigger>
          <PopoverContent className="flex w-80 flex-col gap-4 pl-10">
            {sublinks.map((sublink, index) => (
              <Link key={index} href={sublink.href}>
                {sublink.label}
              </Link>
            ))}
          </PopoverContent>
        </Popover>
      </>
    );

  return (
    <Link href={href}>
      <ItemUi icon={Icon} isExpanded={isExpanded} label={label} />
    </Link>
  );
};

const ItemUi = ({
  icon: Icon,
  isExpanded,
  label,
}: {
  icon: LucideIcon;
  isExpanded: boolean;
  label: string;
}) => {
  return (
    <div className="mx-4 flex w-full items-center">
      <Icon className="mr-3 h-6 w-6" />
      <span hidden={!isExpanded}>{label}</span>
    </div>
  );
};
