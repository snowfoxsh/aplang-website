"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {ArrowRightIcon, ClipboardCopyIcon} from "@radix-ui/react-icons";

import Editor from "@/app/playground/components/editor";
import Header from "@/app/header";
import Image from "next/image";
import HeartIcon from "@/assets/icons/Heart";
// import Editor from "@/app/components/editor";
// or wherever your Editor component lives
// import Header from "@/components/header";
// optional header if you want a top nav

const FizzBuzz = `i <- 1
REPEAT 100 TIMES {
  s <- ""
  IF (i MOD 3 == 0) {
    s <- s + "Fizz"
  }
  IF (i MOD 5 == 0) {
    s <- s + "Buzz"
  }
  IF (LENGTH(s) == 0) {
    s <- i
  }
  DISPLAY(s)
}`


export default function HomePage() {
    const [sourceCode, setSourceCode] = useState<string>(FizzBuzz);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="h-[calc(100vh-57px-57px)] flex justify-center flex-col">
                <div className="container mx-auto py-10 px-4 gap-20">
                    <section className="flex flex-col md:flex-row justify-between gap-8">

                        {/* Left column (title, text, CTA) */}
                        <div className="max-w-md space-y-4">
                            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                                Aplang
                            </h1>
                            <p className="text-lg">
                                A programming language made to aid students who are taking AP Computer Science Principals
                            </p>
                            <div className="flex items-center space-x-4 pt-4">
                                <Button variant="default" asChild>
                                    <Link href="playground">
                                        Try ApLang
                                        <ArrowRightIcon className="ml-2" />
                                    </Link>
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href="install">
                                        Install ApLang
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* Right column (code editor in a card) */}
                        <div className="w-full md:w-1/2">
                            <Card className="relative">
                                <CardHeader className="flex flex-row justify-center p-4 border-b">
                                    Your Classic FizzBuzz
                                </CardHeader>
                                <CardContent className="p-0 pl-2 pt-1">
                                    <Editor sourceCode={sourceCode} readonly={true} setSourceCode={setSourceCode} />
                                </CardContent>
                                <CardFooter className="justify-end">
                                    <Button className="absolute bottom-7 right-7" variant="secondary" onClick={() => navigator.clipboard.writeText(sourceCode)}>
                                        <ClipboardCopyIcon className="mr-2 h-4 w-4"/> Copy to clipboard
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </section>
                    <section className="flex flex-col md:flex-row justify-center gap-8 pt-24">
                        <div className="max-w-lg flex flex-col items-center">
                            <div className="text-3xl md:text-4xl flex items-center">
                                Free & open source
                                {/*<Image src="https://vite.dev/heart.svg" alt="Heart" width={60} height={60} />*/}
                                <HeartIcon className="w-12 h-12 ml-2"/>
                            </div>
                            <div className="pt-2">Aplang is and always will be Free and Open Sourced.</div>
                            <div className="pt-1">This is made possible by our contributors and these companies:</div>
                            <div className="pt-8">Supported by:</div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
