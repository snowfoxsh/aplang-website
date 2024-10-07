import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import {ColorModeToggle} from "@/app/playground/components/color-mode-toggle";
import { ArrowRightIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import React from "react";

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="z-[50] sticky top-0 w-full bg-background/95 border-b backdrop-blur-sm dark:bg-black/[0.6] border-border/40">
                <div className="container h-14 flex items-center">
                    <Link href="/" className="flex justify-start items-center hover:opacity-85 transition-opacity duration-300 mr-4">
                        <span className="font-bold text-lg mt-[-0.075rem]">Aplang</span>
                        <span className="sr-only">Aplang</span>
                    </Link>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link href="/" passHref legacyBehavior>
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
            </header>
            <main className="min=h-[calc(100vh-57px)] flex-1">
                <div className="container relative pb-10">
                    <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-21 lb:pb-6">
                        <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
                            Aplang
                        </h1>
                        <span className="max-w-[800px] text-center text-lg font-light text-foreground">
                            A programming language made to aid students who are taking AP Computer Science Principals
                        </span>
                        <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-6">
                            <Button variant="default" asChild>
                                <Link href="/playground">
                                    Playground
                                    <ArrowRightIcon className="ml-2" />
                                </Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="/" target="_blank" rel="noopener noreferrer">Learn Aplang</Link>
                            </Button>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}