import {Alert, AlertTitle} from "@/components/ui/alert";
import {AlertCircle, Terminal} from "lucide-react";
import CodeLine from "@/components/custom/code-line";

export default function WindowsInstall() {
    return (
        <div>
            <p>
                ApLang is available as a package on <CodeLine>WinGet</CodeLine>,
                a command-line tool that comes installed on Windows 10 and 11 since May 2020.
            </p>

            <h2 className="font-semibold mt-4">Installation Steps</h2>

            <ol className="list-decimal pl-6 mt-2 space-y-2">
                {/*<li>*/}
                {/*    Open a command prompt. You can use <code className="bg-gray-200 text-black px-1 py-0.5 rounded">Terminal</code>*/}
                {/*    (on Windows 11) or <code className="bg-gray-200 text-black px-1 py-0.5 rounded">PowerShell</code> on Windows 10.*/}
                {/*</li>*/}
                <li>
                    Open a command prompt. You can use <CodeLine>Terminal</CodeLine> on Windows 11 or <CodeLine>PowerShell</CodeLine> on Windows 10.
                </li>

                <li>
                    {/*<pre className="bg-gray-100 p-2 rounded mt-1"><code>winget install aplang</code></pre>*/}
                    Run the following command to install ApLang:

                    <Alert>
                        <Terminal className={"h-4 w-4"} />
                        <AlertTitle><code>winget install aplang</code></AlertTitle>
                    </Alert>

                    If you receive an error such as:
                    {/*<pre className="bg-gray-100 p-2 rounded mt-1"><code>&#39;WinGet&#39; is not recognized as an internal or external command, operable program, or batch file.</code></pre>*/}

                    <Alert variant={"destructive"}>
                        <AlertCircle className={"h-4 w-4"} />
                        <AlertTitle><code>&#39;WinGet&#39; is not recognized as an internal or external command,
                            operable program, or batch file.</code></AlertTitle>
                    </Alert>
                    You may need to install WinGet from the
                    <a href="https://apps.microsoft.com/detail/9nblggh4nns1?hl=en-US&gl=US" className="text-blue-500 underline"> Microsoft Store</a>.
                    After installing, rerun the command.
                </li>

                <li>
                    Validate the ApLang installation by running:
                    {/*<pre className="bg-gray-100 p-2 rounded mt-1"><code>aplang --version</code></pre>*/}

                    <Alert>
                        <Terminal className={"h-4 w-4"}/>
                        <AlertTitle><code>winget install aplang</code></AlertTitle>
                    </Alert>

                    You should see output similar to: <CodeLine>aplang 0.0.0</CodeLine>
                </li>
            </ol>
        </div>
    );
}
