"use client"

import React, { useEffect, useState } from "react";
import Header from "@/app/header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import WindowsInstall from "@/app/install/windows";
import MacOSInstall from "@/app/install/macos";
import CargoInstall from "@/app/install/cargo";
import SourceBuild from "@/app/install/source";
import Link from "next/link";
import CodeLine from "@/components/custom/code-line";
import {Alert, AlertTitle} from "@/components/ui/alert";
import {Terminal} from "lucide-react";

export default function InstallPage() {
    const [platform, setPlatform] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const userAgent = navigator.userAgent.toLowerCase();
            if (userAgent.includes("windows")) {
                setPlatform("windows");
            } else if (userAgent.includes("mac os") || userAgent.includes("macintosh")) {
                setPlatform("macos");
            } else {
                setPlatform("cargo"); // Default to Cargo for Linux/unknown
            }
        }
    }, []);

    return (
        <>
            <Header />
            <h1 className="text-6xl font-bold">Install ApLang</h1>
            <div>
                <h2 className="text-4xl font-bold">Platform/Method</h2>

                {/*todo: maybe this should be text-base*/}
                    <Accordion type="single" collapsible={true} value={platform} onValueChange={setPlatform}>
                        <AccordionItem value="windows" className="text-2xl">
                            <AccordionTrigger>Windows</AccordionTrigger>
                            <AccordionContent>
                                <WindowsInstall />
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="macos" className="text-2xl">
                            <AccordionTrigger>macOS</AccordionTrigger>
                            <AccordionContent>
                                <MacOSInstall />
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="cargo" className="text-2xl">
                            <AccordionTrigger>Cargo</AccordionTrigger>
                            <AccordionContent>
                                <CargoInstall />
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="source-build" className="text-2xl">
                            <AccordionTrigger>Build from source</AccordionTrigger>
                            <AccordionContent>
                                <SourceBuild />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
            </div>

            <h1 className="text-4xl font-bold">Project Setup (Recommended)</h1>

            {/*todo: maybe this should be text-base*/}
            <ol className={"list-decimal pl-6 mt-2 space-y-2 text-sm"}>
                <li>
                    Download and Install <Link href={"https://code.visualstudio.com/Download"} target={"_blank"}
                                               rel="noreferrer"><CodeLine variant={"link"}>vscode</CodeLine></Link>
                </li>

                <li>
                    Install the <Link href={"https://marketplace.visualstudio.com/items?itemName=aplang.aplang"}
                                      target={"_blank"} rel="noreferrer"><CodeLine variant={"link"}>ApLang
                    Extension</CodeLine></Link> for vscode.
                </li>

                <li>
                    Download and Install <Link href={"https://desktop.github.com/download/"} target={"_blank"}
                                               rel="noreferrer"><CodeLine variant={"link"}>GitHub
                    Desktop</CodeLine></Link>

                    Launch GitHub Desktop and optionally sign in with your GitHub account.
                </li>

                <li>
                    Create a new repository by selecting <CodeLine>File</CodeLine> {">"} <CodeLine>New
                    Repository</CodeLine>. Name your repository, this will be the name of your project.
                    Click the <CodeLine> Create Repository</CodeLine> Button.
                </li>

                <li>
                    Open the project in vscode by selecting <CodeLine>Repository</CodeLine> {">"} <CodeLine>Open in
                    Visual Studio Code</CodeLine>

                    <br/>
                    If you dont see this option, you can open the project folder in vscode manually.
                </li>

                <li>
                    With the document tab open, create a new file and save it as <CodeLine>first.ap</CodeLine>.

                    Write the following code in the file: <CodeLine>DISPLAY(&#34;Hello World&#34;)</CodeLine>
                </li>

                <li>
                    To run the file, open the terminal in vscode by selecting <CodeLine>Terminal</CodeLine> {">"} <CodeLine>New Terminal</CodeLine>.
                    Run the following command:
                    <Alert>
                        <Terminal className="h-4 w-4" />
                        <AlertTitle><code>aplang first.ap</code></AlertTitle>
                    </Alert>

                    You should see the output of the file in the terminal <CodeLine>Hello World</CodeLine>
                </li>


            </ol>
        </>
    );
}


