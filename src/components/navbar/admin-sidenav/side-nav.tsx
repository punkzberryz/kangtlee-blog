import { cn } from "@/lib/utils";
import Link from "next/link";
import { Separator } from "../../ui/separator";
import { SideNavbarLogo } from "./side-nav-logo";
import { SideNavLinks } from "./side-nav-links";

export const SideNavbar = ({ className }: { className?: string }) => {
  return (
    <nav
      className={cn(
        "flex h-screen flex-col space-y-2 bg-primary text-background",
        className,
      )}
    >
      <Link href="/admin">
        <SideNavbarLogo />
      </Link>
      <Separator />
      <SideNavLinks />
    </nav>
  );
};
