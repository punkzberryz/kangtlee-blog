"use client";

import { Menu } from "lucide-react";
import { useToggleSideNav } from "./use-toggle-sidenav";
import { Button } from "@/components/ui/button";

export const SideNavbarToggleButton = () => {
  const { setIsExpanded, isExpanded } = useToggleSideNav();
  return (
    <Button
      size="icon"
      className="hidden h-7 w-7 md:flex"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <Menu className="h-5 w-5" />
    </Button>
  );
};
