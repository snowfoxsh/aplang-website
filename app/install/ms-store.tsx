import CodeLine from "@/components/custom/code-line";
import Link from "next/link";
import {ExternalLink, InfoIcon} from "lucide-react";
import {Alert} from "@/components/ui/alert";
import {Button} from "@/components/ui/button";

export default function MicrosoftStoreInstall() {
    return (
        <div className="p-4 space-y-6">
            <Link href="https://apps.microsoft.com/detail/9nnwl7hkmqdm?ocid=webpdpshare">
                <Button className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Install Latest
                </Button>
            </Link>
            <ol className="list-decimal pl-6 space-y-4 text-base">
                <li>
                    Press the <CodeLine>Install Latest</CodeLine> button to open the Microsoft Store page for ApLang.
                    <br /><br />
                    Alternatively, search for <CodeLine>aplang</CodeLine> on the Microsoft Store
                </li>
                <li>
                    Press the install button on the Microsoft Store page to install ApLang.
                </li>
            </ol>
            <Alert className="border-l-4 border-green-500 p-4">
                <div className="flex items-start">
                    <InfoIcon className="h-4 w-4 text-green-500 mt-1" />
                    <div className="ml-2">
                        Aplang will be automatically kept up to date with the latest features and bug fixes.
                    </div>
                </div>
            </Alert>
        </div>
    );
}
