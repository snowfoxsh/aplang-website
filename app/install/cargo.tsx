import Link from "next/link";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Terminal, TriangleAlert } from "lucide-react";
import CodeLine from "@/components/custom/code-line";

export default function CargoInstall() {
    return (
        <div>
            <p>
                To install ApLang using Cargo, you need to have Rust installed on your system. If you dont have Rust installed,
                you can install it using <Link href="https://rustup.rs" target="_blank" rel="noreferrer">rustup</Link>.
            </p>

            <ol className="list-decimal pl-6 mt-2 space-y-2">
                <li>
                    Open a command prompt.
                </li>

                <li>
                    Run the following command to install ApLang:
                    <Alert>
                        <Terminal className="h-4 w-4" />
                        <AlertTitle><code>cargo install aplang</code></AlertTitle>
                    </Alert>
                </li>

                <li>
                    Validate the ApLang installation by running:
                    <Alert>
                        <Terminal className="h-4 w-4" />
                        <AlertTitle><code>aplang --version</code></AlertTitle>
                    </Alert>
                    You should see output similar to:
                    {/*<code className="bg-gray-200 text-black px-1 py-0.5 rounded">aplang 0.0.0</code>*/}
                    <CodeLine>aplang 0.0.0</CodeLine>
                </li>
            </ol>

            {/* Warning Section - Yellow Alert */}
            <Alert className=" border-l-4 border-yellow-500 mt-4">
                <div className="flex items-start">
                    <TriangleAlert className="h-4 w-4 text-yellow-400 mt-1" />
                    <div className="ml-2">
                        <AlertTitle className={"text-yellow-500"}>Compilation Issues</AlertTitle>
                        <p>
                            If ApLang fails to compile, you may be missing a C compiler, such as <code className="bg-gray-200 text-black px-1 py-0.5 rounded">cc</code>.
                            To fix this, install a compiler:
                        </p>
                        <ul className="list-disc pl-6 mt-2">
                            {/*<li>On macOS, run <code className="bg-gray-200 text-black px-1 py-0.5 rounded">xcode-select --install</code>.</li>*/}
                            <li>On macOS, run <CodeLine>xcode-select --install</CodeLine></li>
                            {/*<li>On Linux, install <code className="bg-gray-200 text-black px-1 py-0.5 rounded">gcc</code> via your package manager (e.g., <code className="bg-gray-200 text-black px-1 py-0.5 rounded">sudo apt install build-essential</code> on Debian/Ubuntu).</li>*/}
                            <li>On Linux, install <CodeLine>gcc</CodeLine> via your package manager</li>
                        </ul>
                        <p className="mt-2">
                            Alternatively, you can install the portable version of ApLang using:
                        </p>
                        <Alert variant={"default"}>
                            <Terminal className="h-4 w-4" />
                            <AlertTitle><code>cargo install aplang --no-default-features --features portable</code></AlertTitle>
                        </Alert>
                        <p className="mt-2">
                            Note that the portable version is more susceptible to stack overflow errors with deeply recursive code.
                        </p>
                    </div>
                </div>
            </Alert>
        </div>
    );
}
