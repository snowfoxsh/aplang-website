import CodeLine from "@/components/custom/code-line";
import Link from "next/link";
import {Download, InfoIcon} from "lucide-react";
import {Alert} from "@/components/ui/alert";
import {Button} from "@/components/ui/button";

export default function MacOSInstall() {
    return (
        <div>
            <p>
                ApLang is available on MacOS with the <CodeLine>.pkg</CodeLine> installer.
            </p>
            <ol className={"list-decimal pl-6 mt-2 space-y-2"}>
                <li>
                    <Link href={"https://github.com/snowfoxsh/aplang/releases/latest/download/aplang.pkg"}>
                        <Button className={""}>
                            <Download className={"h-4 w-4"}/>
                            Download Latest
                        </Button>
                    </Link>
                    Download the latest version from the <Link href="https://github.com/snowfoxsh/aplang/releases/latest" target="_blank" rel="noreferrer"><CodeLine variant={"link"}>Releases</CodeLine></Link> page on the GitHub repository.
                    You will find the <CodeLine>.pkg</CodeLine> file under <CodeLine>Assets</CodeLine>.
                </li>
                <li>
                    Run the installer and follow the instructions to complete the installation. Leave the default installation path as is.
                </li>
            </ol>
            <Alert className={"border-l-4 border-green-500 mt-4"}>
                <div className="flex items-start">
                    <InfoIcon className="h-4 w-4 text-green-500 mt-1"/>
                    <div className="ml-2">
                        Remember to update ApLang regularly to get the latest features and bug fixes.
                    </div>
                </div>
            </Alert>
        </div>
    )
}