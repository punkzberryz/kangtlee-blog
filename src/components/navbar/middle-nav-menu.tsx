"use client";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import Link from "next/link";
import { ADMIN_LINKS, LinkProps, LINKS } from "./links";
import { usePathname } from "next/navigation";
import { NonUndefined } from "react-hook-form";

export const MiddleNavMenu = () => {
  const pathname = usePathname();
  return (
    <NavigationMenu className="list-none space-x-4">
      {LINKS.map((link, index) => (
        <NavLink
          key={index}
          href={link.href}
          label={link.label}
          active={
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href)
          }
        />
      ))}
    </NavigationMenu>
  );
};

const NavLinkWithSubLinks = ({
  href,
  label,
  sublinks,
  active,
}: LinkProps & { active: boolean } & {
  sublinks: NonUndefined<LinkProps["sublinks"]>;
}) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className={navigationMenuTriggerStyle({
          className: cn(
            "bg-primary text-background underline-offset-4 hover:bg-primary hover:text-secondary focus:bg-primary focus:text-secondary data-[state=open]:bg-primary",
            active && "underline underline-offset-4",
          ),
        })}
      >
        {label}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
          {sublinks.map((link, index) => (
            <NavigationMenuItem key={`${label}-${index}`}>
              <NavigationMenuLink asChild className="flex flex-col gap-2">
                <Link href={href}>
                  <div className="text-sm font-medium leading-none">
                    {link.label}
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {link.description}
                  </p>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
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
