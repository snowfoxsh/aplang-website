import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ColorModeToggle } from "@/app/playground/components/color-mode-toggle";
import React from "react";

export default function Header() {
    return (
        <header className="z-50 sticky top-0 w-full bg-background/95 border-b backdrop-blur-sm dark:bg-black/60 border-border/40">
            <div className="max-w-7xl mx-auto p-3 px-6 flex items-center">
                <Link
                    href="/"
                    className="flex items-center transition-opacity duration-300 hover:opacity-85 mr-4"
                >
                    <span className="font-bold text-lg">ApLang</span>
                    <span className="sr-only">ApLang</span>
                </Link>
                <NavigationMenu>
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
                <div className="ml-auto flex items-center gap-4">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link href="https://github.com/snowfoxsh/aplang" passHref legacyBehavior>
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
    );
}
