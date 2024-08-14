"use client";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import Link from "next/link";
import { LinkProps, LINKS } from "./links";
import { usePathname } from "next/navigation";

export const MiddleNavMenu = () => {
  const pathname = usePathname();
  return (
    <NavigationMenu className="list-none space-x-4">
      {LINKS.map((link, index) => (
        <NavLink
          key={index}
          href={link.href}
          label={link.label}
          active={pathname.startsWith(link.href)}
        />
      ))}
    </NavigationMenu>
  );
};

const NavLink = ({ href, label, active }: LinkProps & { active: boolean }) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        asChild
        className={navigationMenuTriggerStyle({
          className: cn(
            "bg-primary text-background underline-offset-4 hover:bg-primary hover:text-secondary focus:bg-primary focus:text-secondary",
            active && "underline underline-offset-4",
          ),
        })}
      >
        <Link href={href}>{label}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};
