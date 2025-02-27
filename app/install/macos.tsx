import CodeLine from "@/components/custom/code-line";
import Link from "next/link";
import {Download, InfoIcon} from "lucide-react";
import {Alert} from "@/components/ui/alert";
import {Button} from "@/components/ui/button";

export default function MacOSInstall() {
    return (
        <div className="p-4 space-y-6">
            <Link href="https://github.com/snowfoxsh/aplang/releases/latest/download/aplang.pkg">
                <Button className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download Latest
                </Button>
            </Link>
            <ol className="list-decimal pl-6 space-y-4 text-base">
                <li>
                    Download the latest version of the ApLang <CodeLine>pkg</CodeLine> Installer.
                    <br /><br />
                    Alternatively, you can find the <CodeLine>pkg</CodeLine> installer on the{" "}
                    <Link href="https://github.com/snowfoxsh/aplang/releases" target="_blank" rel="noreferrer">
                        <CodeLine variant="link">Releases</CodeLine>
                    </Link>{" "}
                    page.
                </li>
                <li>
                    Run the installer and follow the instructions to complete the installation. Leave the default installation path as is.
                </li>
            </ol>
            <Alert className="border-l-4 border-purple-500 p-4">
                <div className="flex items-start">
                    <InfoIcon className="h-4 w-4 text-purple-500 mt-1" />
                    <div className="ml-2">
                        Remember to update ApLang regularly to get the latest features and bug fixes.
                    </div>
                </div>
            </Alert>
        </div>
    );
}
