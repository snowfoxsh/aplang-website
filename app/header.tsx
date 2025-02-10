import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList, navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import {GitHubLogoIcon} from "@radix-ui/react-icons";
import {ColorModeToggle} from "@/app/playground/components/color-mode-toggle";
import React from "react";

export default function Header() {
    return (<header
        className="z-[50] sticky top-0 w-full bg-background/95 border-b backdrop-blur-sm dark:bg-black/[0.6] border-border/40">
        <div className="container h-14 flex items-center">
            <Link href="/"
                  className="flex justify-start items-center hover:opacity-85 transition-opacity duration-300 mr-4">
                <span className="font-bold text-lg mt-[-0.075rem]">ApLang</span>
                <span className="sr-only">ApLang</span>
            </Link>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link href="/book" passHref legacyBehavior>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                <span className="font-regular text-base">Book</span>
                                <span className="sr-only">Book</span>
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/playground" passHref legacyBehavior>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                <span className="font-regular text-base">Playground</span>
                                <span className="sr-only">Playground</span>
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <NavigationMenu className="ml-auto flex items-center gap-2">
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link href="https://github.com/snowfoxsh/aplang" passHref legacyBehavior>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                <GitHubLogoIcon className="h-[1.2rem] w-[1.2rem]"/>
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <ColorModeToggle/>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    </header>)
}