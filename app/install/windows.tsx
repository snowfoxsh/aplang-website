import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Terminal } from "lucide-react";
import CodeLine from "@/components/custom/code-line";
import Link from "next/link";

export default function WindowsInstall() {
    return (
        <div className="p-4 space-y-6">
            <p className="text-base">
                ApLang is available as a package on <CodeLine>WinGet</CodeLine>, a command-line tool that comes installed on Windows 10 and 11 since May 2020.
            </p>

            <h2 className="font-semibold mt-4">Installation Steps</h2>

            <ol className="list-decimal pl-6 mt-2 space-y-4 text-base">
                <li>
                    Open a command prompt. You can use <CodeLine>Terminal</CodeLine> on Windows 11 or <CodeLine>PowerShell</CodeLine> on Windows 10.
                </li>

                <li>
                    Run the following command to install ApLang:
                    <Alert className="p-4 m-2">
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>
                            <code>winget install aplang</code>
                        </AlertTitle>
                    </Alert>

                    If you receive an error such as:
                    <Alert variant="destructive" className="p-4 m-2">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>
                            <code>
                                WinGet is not recognized as an internal or external command, operable program, or batch file.
                            </code>
                        </AlertTitle>
                    </Alert>
                    You may need to install WinGet from the{" "}
                    <Link href="https://apps.microsoft.com/detail/9nblggh4nns1?hl=en-US&gl=US" className="text-blue-500 underline">
                        Microsoft Store
                    </Link>
                    . After installing, rerun the command.
                </li>

                <li>
                    Restart your command prompt to ensure the <CodeLine>PATH</CodeLine> environment variable is updated.
                </li>

                <li>
                    Validate the ApLang installation by running:
                    <Alert className="p-4 m-2">
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>
                            <code>aplang --version</code>
                        </AlertTitle>
                    </Alert>
                    You should see output similar to: <CodeLine>aplang 0.0.0</CodeLine>
                </li>
            </ol>
        </div>
    );
}
