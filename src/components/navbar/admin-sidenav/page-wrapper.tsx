import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment, Suspense } from "react";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { ThemeToggleButton } from "@/components/providers/theme-toggle-button";
import { AuthNav } from "./auth-nav";
import { SideNavbarToggleButton } from "./side-navbar-toggle-button";
import { SideNavbarMobileView } from "./sidebar-with-mobile-view";

export const PageWrapper = ({
  title,
  links,
  children,
  options: { hasMaxWidth } = { hasMaxWidth: false },
}: {
  title: string;
  links: BreadcrumbLinkProps[];
  children?: React.ReactNode;
  options?: {
    hasMaxWidth?: boolean;
  };
}) => {
  return (
    <>
      <PageHeader title={title} links={links} />
      <div className="px-2.5 md:px-4">
        <Card className={hasMaxWidth ? "mx-auto max-w-4xl" : undefined}>
          {/* <Card className="mx-auto max-w-4xl"> */}
          <CardContent className="flex flex-col space-y-8 p-6">
            {children}
          </CardContent>
        </Card>
      </div>
      <AdminProtection />
    </>
  );
};

const AdminProtection = () => {
  return (
    <Suspense fallback={<Skeleton className="h-8 w-8 rounded-full border" />}>
      <FetchAdmin />
    </Suspense>
  );
};

const FetchAdmin = async () => {
  const { user } = await validateRequest();
  if (!user) {
    {
      /* TODO: create admin unauth page */
    }
    redirect("/admin/unauthorized");
  }
  return null;
};

const PageHeader = ({
  title,
  links,
}: {
  title: string;
  links: BreadcrumbLinkProps[];
}) => {
  return (
    <header className="flex flex-col space-y-4 pb-4 pt-2">
      <MaxWidthWrapper className="flex items-center space-x-4 border-b pb-4 shadow-md md:mx-0">
        <>
          <SideNavbarToggleButton />
          <SideNavbarMobileView />
        </>
        <h1 className="hidden font-semibold md:block md:text-3xl">{title}</h1>
        {/* User Button */}
        <div className="flex-1">
          <div className="ml-auto mr-4 flex w-fit items-center space-x-2">
            <ThemeToggleButton />
            <AuthNav />
          </div>
        </div>
      </MaxWidthWrapper>
      {/* Breadcrumbs */}

      <MaxWidthWrapper className="pb-4 md:mx-0 md:px-4">
        <Breadcrumb>
          <BreadcrumbList>
            {links.map((link, index) => (
              <Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink href={link.href}>{link.title}</BreadcrumbLink>
                </BreadcrumbItem>
                {index + 1 !== links.length && <BreadcrumbSeparator />}
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </MaxWidthWrapper>
    </header>
  );
};
export interface BreadcrumbLinkProps {
  href: string;
  title: string;
}
