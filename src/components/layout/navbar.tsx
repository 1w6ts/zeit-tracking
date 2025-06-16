"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import Logo from "../brand/logo";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    title: "Product",
    items: [
      { title: "Features", href: "#features" },
      { title: "Compliance & Security", href: "#compliance" },
    ],
  },
  {
    title: "Solutions",
    items: [
      { title: "For HR Teams", href: "#" },
      { title: "For Remote Teams", href: "#" },
      { title: "For Managers", href: "#" },
    ],
  },
  {
    title: "Company",
    items: [
      { title: "About", href: "/about" },
      { title: "Privacy Policy", href: "/privacy" },
      { title: "Imprint", href: "/imprint" },
      { title: "Terms of Service", href: "/terms" },
    ],
  },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Logo className="h-6 w-6" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex" viewport={true}>
            <NavigationMenuList>
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    {item.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[240px] gap-1 p-4">
                      {item.items.map((subItem) => (
                        <li key={subItem.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={subItem.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">
                                {subItem.title}
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign up</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t bg-background">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <div key={item.title} className="py-2">
                  <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    {item.title}
                  </h3>
                  <div className="space-y-1">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.href}
                        className="block px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              {/* Mobile Auth Buttons */}
              <div className="pt-4 mt-4 border-t space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  asChild
                >
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Log in
                  </Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link
                    href="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign up
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
