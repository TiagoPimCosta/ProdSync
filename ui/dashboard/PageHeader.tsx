import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb";
import { SidebarTrigger } from "@/src/components/ui/sidebar";
import React, { useMemo } from "react";

interface PageBreadcrumbItem {
  label: string;
  href?: string;
}

type PageBreadcrumbItems = PageBreadcrumbItem[];

interface PageHeaderProps {
  breadcrumbItems: PageBreadcrumbItems;
}

export default function PageHeader(props: PageHeaderProps) {
  const { breadcrumbItems } = props;

  const breadcrumbItemsMemo = useMemo(() => {
    return breadcrumbItems.map((item, index) => {
      return (
        <React.Fragment key={`page-breadcrumb-${item.label.toLowerCase()}`}>
          <BreadcrumbItem>
            <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
          </BreadcrumbItem>
          {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
        </React.Fragment>
      );
    });
  }, [breadcrumbItems]);

  return (
    <div className="flex items-center gap-4">
      <SidebarTrigger />
      <Breadcrumb>
        <BreadcrumbList>{breadcrumbItemsMemo}</BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
