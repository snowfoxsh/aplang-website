import Link from "next/link";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Terminal, TriangleAlert } from "lucide-react";
import CodeLine from "@/components/custom/code-line";

export default function CargoInstall() {
    return (
        <div className="p-4 space-y-6">
            <p className="text-base">
                To install ApLang using Cargo, you need to have Rust installed on your system. If you don’t have Rust installed,
                you can install it using{" "}
                <Link href="https://rustup.rs" target="_blank" rel="noreferrer">
                    <CodeLine variant={"link"}>rustup</CodeLine>
                </Link>
                .
            </p>

            <h2 className="font-semibold mt-4">Installation Steps</h2>

            <ol className="list-decimal pl-6 mt-2 space-y-4 text-base">
                <li>
                    Open a command prompt.
                </li>

                <li>
                    Run the following command to install ApLang:
                    <Alert className="p-4 m-2">
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>
                            <code>cargo install aplang</code>
                        </AlertTitle>
                    </Alert>
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

            <Alert className="p-4 m-2 border-l-4 border-yellow-500">
                <div className="flex items-start space-x-2">
                    <TriangleAlert className="h-4 w-4 text-yellow-400 mt-1" />
                    <div>
                        <AlertTitle className="text-yellow-500">Compilation Issues</AlertTitle>
                        <p className="mt-2 text-base">
                            If ApLang fails to compile, you may be missing a C compiler, such as <CodeLine>cc</CodeLine>. To fix this,
                            install a compiler:
                        </p>

                        <ul className="list-disc pl-6 mt-2 space-y-2 text-base">
                            <li>
                                On macOS, run <CodeLine>xcode-select --install</CodeLine>
                            </li>
                            <li>
                                On Linux, install <CodeLine>gcc</CodeLine> via your package manager
                            </li>
                        </ul>

                        <p className="mt-4 text-base">
                            Alternatively, you can install the portable version of ApLang using:
                        </p>
                        <Alert variant="default" className="p-4 m-2">
                            <Terminal className="h-4 w-4" />
                            <AlertTitle>
                                <code>cargo install aplang --no-default-features --features portable</code>
                            </AlertTitle>
                        </Alert>
                        <p className="mt-2 text-base">
                            Note that the portable version is more susceptible to stack overflow errors with deeply recursive code.
                        </p>
                    </div>
                </div>
            </Alert>
        </div>
    );
}
