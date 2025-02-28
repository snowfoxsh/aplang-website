"use client"

import Link from "next/link"
import * as React from "react"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { Menu } from "lucide-react" // or "@radix-ui/react-icons" => HamburgerMenuIcon
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { ColorModeToggle } from "@/app/playground/components/color-mode-toggle"

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm dark:bg-black/60">
            <div className="mx-auto flex max-w-7xl items-center p-3 px-6">
                {/* Logo */}
                <Link
                    href="/"
                    className="mr-4 flex items-center font-bold text-lg transition-opacity duration-300 hover:opacity-85"
                >
                    <span>ApLang</span>
                    <span className="sr-only">ApLang</span>
                </Link>

                {/* Desktop Nav*/}
                <NavigationMenu className="hidden sm:block">
                    <NavigationMenuList className="flex space-x-4">
                        <NavigationMenuItem>
                            <Link href="/book" passHref legacyBehavior>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    <span className="text-base font-medium">Docs</span>
                                    <span className="sr-only">Docs</span>
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <Link href="/playground" passHref legacyBehavior>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    <span className="text-base font-medium">Playground</span>
                                    <span className="sr-only">Playground</span>
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <Link href="/install" passHref legacyBehavior>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    <span className="text-base font-medium">Install</span>
                                    <span className="sr-only">Install</span>
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Mobile Nav */}
                <div className="block sm:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" aria-label="Open menu">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0">
                            <SheetHeader className="p-4">
                                <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
                            </SheetHeader>
                            <Separator />
                            <nav className="p-4">
                                <ul className="flex flex-col gap-4">
                                    <li>
                                        <SheetClose asChild>
                                            <Link
                                                href="/book"
                                                className={`${navigationMenuTriggerStyle()} block w-full text-left`}
                                            >
                                                Docs
                                            </Link>
                                        </SheetClose>
                                    </li>
                                    <li>
                                        <SheetClose asChild>
                                            <Link
                                                href="/playground"
                                                className={`${navigationMenuTriggerStyle()} block w-full text-left`}
                                            >
                                                Playground
                                            </Link>
                                        </SheetClose>
                                    </li>
                                    <li>
                                        <SheetClose asChild>
                                            <Link
                                                href="/install"
                                                className={`${navigationMenuTriggerStyle()} block w-full text-left`}
                                            >
                                                Install
                                            </Link>
                                        </SheetClose>
                                    </li>
                                </ul>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Right side icons */}
                <div className="ml-auto flex items-center gap-4">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link
                                    href="https://github.com/snowfoxsh/aplang"
                                    passHref
                                    legacyBehavior
                                >
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        <GitHubLogoIcon className="h-5 w-5" />
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    <ColorModeToggle />
                </div>
            </div>
        </header>
    )
}
