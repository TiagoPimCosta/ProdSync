"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout, userStatusResponse } from "@/lib/auth";
import { cn, getFirstLettersOfName } from "@/lib/utils";
import { Gauge, Menu, Users } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

type Navlink = {
  name?: string;
  route: string;
  icon: React.ReactNode;
};
export interface NavbarProps {
  user: userStatusResponse | null;
}

const Navbar = (props: NavbarProps) => {
  const { user } = props;
  const pathname = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const links: Navlink[] = [
    {
      name: "Dashboard",
      route: "",
      icon: <Gauge className="h-6 w-6" />,
    },
    {
      name: "Funcionários",
      route: "/users",
      icon: <Users className="h-6 w-6" />,
    },
    {
      name: "Máquinas",
      route: "/machines",
      icon: <Gauge className="h-6 w-6" />,
    },
  ];

  const handleLogOut = async (e: React.FormEvent) => {
    e.preventDefault();

    await logout();
    router.push("/");
  };

  const toogleSideBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed w-full z-40 bg-white">
      <div className="flex h-16 items-center px-4 border-b">
        <Button
          variant="outline"
          size="icon"
          className={cn("flex sm:hidden")}
          onClick={toogleSideBar}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <nav className={cn("sm:flex items-center space-x-4 lg:space-x-6 mx-6", "hidden")}>
          {links.map((link) => {
            const route = "/dashboard" + link.route;
            const selected = pathname === route;
            return (
              <Link
                key={link.name}
                href={route}
                className={cn(
                  "flex flex-row gap-2 ",
                  "text-sm font-medium hover:text-primary align-middle",
                  selected ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{getFirstLettersOfName(user?.name || "")}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              {/* <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Billing
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>New Team</DropdownMenuItem>
              </DropdownMenuGroup> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogOut}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {isOpen && (
        <div
          className={cn(
            "sm:hidden flex top-0 left-0 w-full h-full",
            "p-10 bg-white text-black border-b shadow-sm",
            `z-40 sliding-div ease-in duration-2000 ${
              isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
            }`
          )}
        >
          <nav className={cn("flex flex-col space-x-4 w-full lg:space-x-6 gap-4")}>
            {links.map((link) => {
              const route = "/dashboard" + link.route;
              console.log(route);
              const selected = pathname === route;
              return (
                <Link
                  key={link.name}
                  href={route}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-2 text-xl font-medium !ml-0",
                    selected ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {link.icon}
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
};
export default Navbar;
