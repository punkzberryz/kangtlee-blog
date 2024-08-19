import { ReactNode } from "react";
import { ThemeToggleButton } from "../providers/theme-toggle-button";
import { MiddleNavMenu } from "./middle-nav-menu";
import Link from "next/link";
import { Logo } from "../icons";
import { AuthNavClient } from "./auth-nav-client";
import { MaxWidthWrapper } from "../max-width-wrapper";
import { MobileNavbar } from "./mobile-navbar";

export const Navbar = () => {
  return (
    <NavHeader>
      <div className="hidden items-center space-x-8 md:flex">
        <MiddleNavMenu />
        {/* Link to Admin */}
        <div className="items-center space-x-2">
          <ThemeToggleButton />
          <AuthNavClient />
        </div>
      </div>
      <div className="md:hidden">
        <MobileNavbar />
      </div>
    </NavHeader>
  );
};

const NavHeader = ({ children }: { children: ReactNode }) => {
  return (
    <MaxWidthWrapper className="bg-primary px-4 py-2 text-primary-foreground">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between space-x-4">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full bg-black px-4"
        >
          <Logo width={40} height={40} />
          <span className="font-semibold">KangTLee&apos;s blog</span>
        </Link>
        {children}
      </div>
    </MaxWidthWrapper>
  );
};
