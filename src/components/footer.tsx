import { cn } from "@/lib/utils";
import { MaxWidthWrapper } from "./max-width-wrapper";
import Link from "next/link";
import { Logo } from "./icons";
import { LINKS } from "./navbar/links";
import { Button } from "./ui/button";

export const Footer = ({ className }: { className?: string }) => {
  return (
    <footer className={cn(className, "border-t bg-gray-100 dark:bg-gray-900")}>
      <MaxWidthWrapper className="pt-2">
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between space-x-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full bg-black px-4"
          >
            <Logo width={40} height={40} />
          </Link>
          {/* Links */}
          <ul className="flex flex-col space-y-2">
            {LINKS.map((link, index) => (
              <li key={index}>
                <Link
                  className="underline-offset-4 hover:text-primary hover:underline"
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export const AdminFooter = ({ className }: { className?: string }) => {
  return (
    <footer className={cn(className, "border-t")}>
      <MaxWidthWrapper className="pt-2">
        <p>Powered by Papai Platform</p>
      </MaxWidthWrapper>
    </footer>
  );
};
