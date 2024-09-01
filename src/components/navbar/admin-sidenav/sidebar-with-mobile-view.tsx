import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/icons";
import { SideNavLinksForSheet } from "./side-nav-links";
import { Separator } from "@/components/ui/separator";

//For below md screen
export const SideNavbarMobileView = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden" asChild>
        <Button size="icon" className="h-7 w-7" variant="ghost">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex h-full w-72 flex-col px-3" side="left">
        <SheetHeader>
          <Button
            className="flex items-center justify-center pb-2 pt-1"
            variant="link"
            asChild
          >
            <Link href="/admin" className="flex items-center gap-2">
              <Logo />
              <h1 className="text-lg font-bold">RMS</h1>
            </Link>
          </Button>
        </SheetHeader>
        <Separator />
        {/* Menu */}
        <div className="mx-auto w-fit py-10">
          <SideNavLinksForSheet />
        </div>
      </SheetContent>
    </Sheet>
  );
};
