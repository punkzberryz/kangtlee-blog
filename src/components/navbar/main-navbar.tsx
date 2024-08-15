import { ReactNode } from "react";
import { ThemeToggleButton } from "../providers/theme-toggle-button";
import { AuthNav } from "./admin-sidenav/auth-nav";
import { AdminMiddleNavMenu, MiddleNavMenu } from "./middle-nav-menu";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Logo } from "../icons";
import { AuthNavClient } from "./auth-nav-client";

export const Navbar = () => {
  return (
    <NavHeader>
      <MiddleNavMenu />
      {/* Link to Admin */}
      <div className="flex items-center space-x-2">
        <ThemeToggleButton />
        <AuthNavClient />
      </div>
    </NavHeader>
  );
};

export const AdminNavbar = () => {
  return (
    <NavHeader>
      <AdminMiddleNavMenu />
      <div className="flex items-center space-x-2">
        <ThemeToggleButton />
        <AuthNav />
      </div>
    </NavHeader>
  );
};

const NavHeader = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-primary px-4 py-2 text-primary-foreground">
      <div className="mx-auto flex max-w-4xl items-center justify-between space-x-4">
        <Link
          href="/blog"
          className="flex items-center gap-2 rounded-full bg-black px-4"
        >
          <Logo width={40} height={40} />
          <span className="font-semibold">KangTLee&apos;s blog</span>
        </Link>
        {children}
      </div>
    </div>
  );
};
