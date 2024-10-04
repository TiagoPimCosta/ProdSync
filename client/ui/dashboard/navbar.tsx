"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { Gauge } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

type Navlink = {
  name: string;
  route: string;
};

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const links: Navlink[] = [
    { name: "Funcionários", route: "/dashboard/users" },
    { name: "Máquinas", route: "/dashboard/machines" },
  ];

  const handleLogOut = async (e: React.FormEvent) => {
    e.preventDefault();

    await logout();
    router.push("/");
  };

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <nav className={cn("flex items-center space-x-4 lg:space-x-6 mx-6")}>
          <Link
            href="/dashboard"
            className="flex items-center gap-4 text-lg font-semibold md:text-base"
          >
            <Gauge className="h-6 w-6" />
          </Link>
          {links.map((link) => {
            const selected = pathname === link.route;
            console.log(link.name, selected);
            return (
              <Link
                key={link.name}
                href={link.route}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
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
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">shadcn</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    m@example.com
                  </p>
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
              <DropdownMenuItem onClick={handleLogOut}>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
