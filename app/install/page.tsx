"use client";

import React, { useEffect, useState } from "react";
import Header from "@/app/header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import WindowsInstall from "@/app/install/windows";
import MacOSInstall from "@/app/install/macos";
import CargoInstall from "@/app/install/cargo";
import SourceBuild from "@/app/install/source";
import Link from "next/link";
import CodeLine from "@/components/custom/code-line";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

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
            <div className="max-w-6xl mx-auto p-6">
                <h1 className="text-6xl font-bold mb-6">Install ApLang</h1>
                {/* Install Platform/Method Section */}
                <section className="mb-10">
                    {/* Divider */}
                    <div className="my-12">
                        <hr className="border-t border-gray-300"/>
                    </div>
                    <h2 className="text-4xl font-bold mb-4">Platform/Method</h2>
                    <Accordion
                        type="single"
                        collapsible={true}
                        value={platform}
                        onValueChange={setPlatform}
                        className="space-y-4"
                    >
                        <AccordionItem value="windows"
                                       className="text-2xl rounded-md shadow-sm transition-all duration-200">
                            <AccordionTrigger>Windows</AccordionTrigger>
                            <AccordionContent>
                                <WindowsInstall/>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="macos"
                                       className="text-2xl rounded-md shadow-sm transition-all duration-200">
                            <AccordionTrigger>macOS</AccordionTrigger>
                            <AccordionContent>
                                <MacOSInstall/>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="cargo"
                                       className="text-2xl rounded-md shadow-sm transition-all duration-200">
                            <AccordionTrigger>Cargo</AccordionTrigger>
                            <AccordionContent>
                                <CargoInstall/>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="source-build"
                                       className="text-2xl rounded-md shadow-sm transition-all duration-200">
                            <AccordionTrigger>Build from source</AccordionTrigger>
                            <AccordionContent>
                                <SourceBuild/>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </section>

                {/* Divider */}
                <div className="my-12">
                    <hr className="border-t border-gray-300"/>
                </div>

                {/* Project Setup Section */}
                <section>
                    <h2 className="text-4xl font-bold mb-4">Project Setup (Recommended)</h2>
                    <ol className="space-y-6">
                        <li className="flex items-center">
                            <span className="flex-shrink-0 text-2xl font-bold text-gray-500 mr-4">1.</span>
                            <div className="flex-1">
                                <p className="text-base">
                                    Download and install{" "}
                                    <Link
                                        href="https://code.visualstudio.com/Download"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-blue-600 underline"
                                    >
                                        VS Code
                                    </Link>.
                                </p>
                            </div>
                        </li>
                        <li className="flex items-center">
                            <span className="flex-shrink-0 text-2xl font-bold text-gray-500 mr-4">2.</span>
                            <div className="flex-1">
                                <p className="text-base">
                                    Install the{" "}
                                    <Link
                                        href="https://marketplace.visualstudio.com/items?itemName=aplang.aplang"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-blue-600 underline"
                                    >
                                        ApLang Extension
                                    </Link>{" "}
                                    for VS Code.
                                </p>
                            </div>
                        </li>
                        <li className="flex items-center">
                            <span className="flex-shrink-0 text-2xl font-bold text-gray-500 mr-4">3.</span>
                            <div className="flex-1">
                                <p className="text-base">
                                    Download and install{" "}
                                    <Link
                                        href="https://desktop.github.com/download/"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-blue-600 underline"
                                    >
                                        GitHub Desktop
                                    </Link>
                                    . Launch it and sign in (optional).
                                </p>
                            </div>
                        </li>
                        <li className="flex items-center">
                            <span className="flex-shrink-0 text-2xl font-bold text-gray-500 mr-4">4.</span>
                            <div className="flex-1">
                                <p className="text-base">
                                    Create a new repository by selecting <CodeLine>File</CodeLine> &gt;{" "}
                                    <CodeLine>New Repository</CodeLine>. Name your repository and click{" "}
                                    <CodeLine>Create Repository</CodeLine>.
                                </p>
                            </div>
                        </li>
                        <li className="flex items-center">
                            <span className="flex-shrink-0 text-2xl font-bold text-gray-500 mr-4">5.</span>
                            <div className="flex-1">
                                <p className="text-base">
                                    Open the project in VS Code via <CodeLine>Repository</CodeLine> &gt;{" "}
                                    <CodeLine>Open in Visual Studio Code</CodeLine>. If you don’t see the option, open
                                    the folder manually.
                                </p>
                            </div>
                        </li>
                        <li className="flex items-center">
                            <span className="flex-shrink-0 text-2xl font-bold text-gray-500 mr-4">6.</span>
                            <div className="flex-1">
                                <p className="text-base">
                                    Create a new file named <CodeLine>first.ap</CodeLine> and add:{" "}
                                    <CodeLine>DISPLAY(&quot;Hello World&quot;)</CodeLine>
                                </p>
                            </div>
                        </li>
                        <li className="flex items-center">
                            <span className="flex-shrink-0 text-2xl font-bold text-gray-500 mr-4">7.</span>
                            <div className="flex-1">
                                <p className="text-base">
                                    Open the terminal in VS Code (Terminal &gt; New Terminal) and run:
                                </p>
                                <Alert className="mt-2">
                                    <Terminal className="h-4 w-4"/>
                                    <AlertTitle>
                                        <code>aplang first.ap</code>
                                    </AlertTitle>
                                </Alert>
                                <p className="text-base mt-2">
                                    You should see <CodeLine>Hello World</CodeLine> in the output.
                                </p>
                            </div>
                        </li>
                    </ol>
                </section>
            </div>
        </>
    );
}
