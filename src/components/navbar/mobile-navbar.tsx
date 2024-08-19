"use client";
import { MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button, buttonVariants } from "../ui/button";
import { LINKS } from "./links";
import { Logo } from "../icons";
import Link from "next/link";
import { ThemeToggleButton } from "../providers/theme-toggle-button";
import { Separator } from "../ui/separator";
import { useState } from "react";

export const MobileNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col space-y-4">
        <SheetTitle>
          <Link href="/">
            <Logo />
          </Link>
        </SheetTitle>
        <Separator />
        <ul className="flex flex-col items-center space-y-2">
          {LINKS.map((l, index) => (
            <li key={index} className="w-full">
              <Link
                href={l.href}
                className={buttonVariants({
                  className: "w-full",
                  variant: "ghost",
                })}
                onClick={() => setMobileMenuOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Separator />
        <div className="mx-auto">
          <ThemeToggleButton hideToolTip />
        </div>
        <SheetClose />
      </SheetContent>
    </Sheet>
  );
};
