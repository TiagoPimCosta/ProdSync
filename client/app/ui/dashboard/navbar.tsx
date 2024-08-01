"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { logout } from "@/lib/auth";
import clsx from "clsx";
import { LogOut, Menu, Gauge, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const links = [{ name: "Utilizadores", href: "/dashboard/users" }];

  const handleLogOut = async (e: React.FormEvent) => {
    e.preventDefault();

    await logout();
    router.push("/");
  };

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/dashboard"
          className="flex items-center gap-4 text-lg font-semibold md:text-base"
        >
          <Gauge className="h-6 w-6" />
        </Link>
        {links.map((link) => {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx("transition-colors hover:text-foreground", {
                "text-muted-foreground": pathname !== link.href,
                "text-foreground": pathname === link.href,
              })}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Gauge className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            {links.map((link) => {
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={clsx({
                    "text-muted-foreground hover:text-foreground":
                      pathname !== link.href,
                    "hover:text-foreground": pathname === link.href,
                  })}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial"></div>
        <div>
          <LogOut
            onClick={handleLogOut}
            className="text-muted-foreground transition-colors hover:text-foreground"
          ></LogOut>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
