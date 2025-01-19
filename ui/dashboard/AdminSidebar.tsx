"use client";

import { BellElectric, ChevronUp, Gauge, User2, Users } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/src/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import Link from "next/link";
import { logout, userStatusResponse } from "@/src/lib/auth";
import { useRouter } from "next/navigation";
import { getFirstAndLastName } from "@/src/utils/user";

const links = [
  {
    title: "Dashboard",
    url: "",
    icon: Gauge,
  },
  {
    title: "Utilizadores",
    url: "/users",
    icon: Users,
  },
  {
    title: "Máquinas",
    url: "/machines",
    icon: BellElectric,
  },
];

interface AdminSidebarProps {
  user: userStatusResponse | null;
}

export function AdminSidebar(props: AdminSidebarProps) {
  const { user } = props;

  const router = useRouter();

  const handleLogOut = async (e: React.FormEvent) => {
    e.preventDefault();

    await logout();
    router.push("/");
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={"/dashboard/" + item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {getFirstAndLastName(user?.name || "Utilizador")}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                align="end"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuLabel>{user?.name || "Utilizador"}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogOut}>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
