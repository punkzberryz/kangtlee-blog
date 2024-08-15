"use client";

import { Logo } from "@/components/icons";
import { useToggleSideNav } from "./use-toggle-sidenav";

export const SideNavbarLogo = () => {
  const { isExpanded } = useToggleSideNav();
  return (
    <div className="flex flex-col items-center space-y-1 py-1">
      <Logo priority width={50} height={50} />
      <span className="font-semibold" hidden={!isExpanded}>
        KangTLee`&apos;s blog
      </span>
    </div>
  );
};
