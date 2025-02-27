"use client";

import React, {useState} from "react";
import Link from "next/link";
import {Card, CardHeader, CardContent, CardFooter} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {ArrowRightIcon, ClipboardCopyIcon} from "@radix-ui/react-icons";
import Editor from "@/app/playground/components/editor";
import Header from "@/app/header";
import HeartIcon from "@/assets/icons/Heart";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import AdvancedInstallerLogo from "@/assets/logos/AdvancedInstallerLogo";
import Image from "next/image";
import SalisBurySchoolLogo from "@/assets/logos/SalisburySchoolLogo.png";

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
  i <- i + 1
}`;

export default function HomePage() {
    const [sourceCode, setSourceCode] = useState<string>(FizzBuzz);

    return (
        <div className="flex flex-col min-h-screen">
            <div className={"overflow-x-hidden"}>
                <Image
                    src="/gradients/blue-purple-1.svg"
                    alt="background gradient"
                    fill
                    style={{objectPosition: "calc(50% + 25rem) calc(15%)"}}
                    className="absolute shadow-black/5 inset-0 z-[-1] rotate-180 object-cover pointer-events-none"
                />
            </div>
            <Header/>
            <main className="">
                <div className="max-w-7xl px-6 mx-auto gap-20 pt-20">
                    <section className="flex flex-col md:flex-row justify-between gap-8">
                        {/* Left column (title, text, CTA) */}
                        <div className="max-w-md space-y-4">
                            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Aplang</h1>
                            <p className="text-lg">
                                A programming language made to aid students taking AP Computer Science Principles.
                            </p>
                            <div className="flex items-center space-x-4 pt-4">
                                <Button variant="default" asChild>
                                    <Link href="playground">
                                        Try ApLang
                                        <ArrowRightIcon className="ml-2"/>
                                    </Link>
                                </Button>
                                <Button variant="outline" className="border-tertiary" asChild>
                                    <Link href="install">Install ApLang</Link>
                                </Button>
                            </div>
                            <div className="max-w-lg flex flex-col items-start pt-20">
                                <div className="text-3xl md:text-4xl flex items-start">
                                    Free &amp; open source
                                    <HeartIcon className="w-12 h-12 ml-2"/>
                                </div>
                                <div className="pt-2">Aplang is and always will be Free and Open Sourced.</div>
                                <div className="pt-1">
                                    This is made possible by our contributors and our supporters
                                </div>
                            </div>
                        </div>

                        {/* Right column (code editor in a card) */}
                        <div className="flex w-full md:w-1/2 items-center">
                            <Card className="relative w-full">
                                <CardHeader className="flex justify-center p-4 border-b">
                                    Your Classic FizzBuzz
                                </CardHeader>
                                <CardContent className="p-0 pl-2 pt-1">
                                    <Editor sourceCode={sourceCode} readonly={true} setSourceCode={setSourceCode}/>
                                </CardContent>
                                <CardFooter className="justify-end">
                                    <Button
                                        className="absolute bottom-7 right-7"
                                        variant="secondary"
                                        onClick={() => navigator.clipboard.writeText(sourceCode)}
                                    >
                                        <ClipboardCopyIcon className="mr-2 h-4 w-4"/> Copy to clipboard
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </section>
                    <section className="flex flex-col md:flex-row max-w-md justify-center -translate-x-8 gap-8 pt-10">
                        <div className="max-w-sm flex flex-col items-center">
                            <div className="pt-8 w-full text-center text-2xl mb-4">Supporters</div>
                            <Carousel>
                                <CarouselContent>
                                    <CarouselItem className="basis-1/2">
                                        <div className="p-1">
                                            <Card>
                                                <CardContent
                                                    className="flex aspect-square items-center justify-center p-4">
                                                    <span className="text-2xl font-semibold">
                                                        <AdvancedInstallerLogo className="w-12 h-12"/>
                                                    </span>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                    <CarouselItem className="basis-1/2">
                                        <div className="p-1">
                                            <Card>
                                                <CardContent
                                                    className="flex aspect-square items-center justify-center p-4">
          <span className="text-2xl font-semibold">
            <Image
                src={SalisBurySchoolLogo}
                alt="Salisbury School Logo"
                width={43.5}
                height={48}
            />
          </span>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                </CarouselContent>

                                <CarouselPrevious className="border-dashed"/>
                                <CarouselNext className="border-dashed"/>
                            </Carousel>
                        </div>
                    </section>

                </div>
            </main>
        </div>
    );
}
