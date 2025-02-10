"use client"

import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import React, {useState} from "react";
import Header from "@/app/header";
import Editor from "@/app/playground/components/editor";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            {/*<main className="min=h-[calc(100vh-57px)] flex-1">*/}
            {/*    <div className="container relative pb-10">*/}
            {/*        <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-21 lb:pb-6">*/}
            {/*            <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">*/}
            {/*                ApLang*/}
            {/*            </h1>*/}
            {/*            <span className="max-w-[800px] text-center text-lg font-light text-foreground">*/}
            {/*                A programming language made to aid students who are taking AP Computer Science Principals*/}
            {/*            </span>*/}
            {/*            <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-6">*/}
            {/*                <Button variant="default" asChild>*/}
            {/*                    <Link href="/playground">*/}
            {/*                        Playground*/}
            {/*                        <ArrowRightIcon className="ml-2" />*/}
            {/*                    </Link>*/}
            {/*                </Button>*/}
            {/*                <Button variant="outline" asChild>*/}
            {/*                    <Link href="/book" target="_blank" rel="noopener noreferrer">Learn ApLang</Link>*/}
            {/*                </Button>*/}
            {/*            </div>*/}
            {/*        </section>*/}
            {/*    </div>*/}
            {/*</main>*/}
            <main className="min-h-[calc(100vh-57px)] flex-1">
                <div className="container relative pb-10">
                    <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 lg:py-21 lg:pb-6">
                        <div>
                            <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
                                Aplang
                            </h1>
                            <span className="max-w-[800px] text-center text-lg font-light text-foreground">
                                A programming language made to aid students who are taking AP Computer Science Principals
                            </span>
                        </div>
                        <Card className="w-full">
                            <CardContent className="h-64 border-b p-0 pl-2">
                                <Editor sourceCode={sourceCode} setSourceCode={setSourceCode}/>
                            </CardContent>
                            <CardFooter className="p-4 flex flex-row justify-between">
                                <span>ApLang</span>
                                <Button>
                                    Continue in Playground
                                </Button>
                            </CardFooter>
                        </Card>
                    </section>
                </div>
            </main>
        </div>
    )
}