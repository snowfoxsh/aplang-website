import Header from "@/app/header";
import BodyWrapper from "@/app/body-wrapper";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {AccordionHeader} from "@radix-ui/react-accordion";
import Link from "next/link";
import WindowsInstall from "@/app/install/windows";
import MacOSInstall from "@/app/install/macos";
import CargoInstall from "@/app/install/cargo";
import SourceBuild from "@/app/install/source";
import CodeLine from "@/components/custom/code-line";

export default function InstallPage() {
    return (
        <>
            <Header/>
            <h1 className={"text-6xl font-bold"}>Install ApLang</h1>
            <div>
                <h2 className={"text-4xl font-bold"}>Platform/Method</h2>
                <CodeLine>Hello</CodeLine>
                <Accordion type={"single"} collapsible={true}>
                    <AccordionItem value={"windows"} className={"text-2xl"}>
                        <AccordionTrigger>Windows</AccordionTrigger>
                        <AccordionContent>
                            <WindowsInstall />
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value={"macos"} className={"text-2xl"}>
                        <AccordionTrigger>macOS</AccordionTrigger>
                        <AccordionContent>
                            <MacOSInstall />
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value={"cargo"} className={"text-2xl"}>
                        <AccordionTrigger>Cargo</AccordionTrigger>
                        <AccordionContent>
                            <CargoInstall />
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value={"source-build"} className={"text-2xl"}>
                        <AccordionTrigger>Build from source</AccordionTrigger>
                        <AccordionContent>
                            <SourceBuild />
                        </AccordionContent>
                    </AccordionItem>


                </Accordion>
            </div>
        </>
    );
}