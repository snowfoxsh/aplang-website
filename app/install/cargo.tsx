import Link from "next/link";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Code, Terminal, TriangleAlert } from "lucide-react";
import CodeLine from "@/components/custom/code-line";

export default function SourceBuild() {
    return (
        <div className="p-4 space-y-6">
            <p className="text-base">
                To build ApLang from source, you need to have Rust and Cargo installed on your system. If you don't have Rust installed, you can install it using{" "}
                <Link href="https://rustup.rs" target="_blank" rel="noreferrer">
                    <CodeLine variant="link">rustup</CodeLine>
                </Link>.
            </p>

            <ol className="list-decimal pl-6 mt-2 space-y-4 text-base">
                <li>Open a command prompt.</li>

                <li>
                    Clone the ApLang repository:
                    <Alert className="p-4 m-2">
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>
                            <code>git clone https://github.com/snowfoxsh/aplang.git</code>
                        </AlertTitle>
                    </Alert>
                </li>

                <li>
                    Navigate to the project directory:
                    <Alert className="p-4 m-2">
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>
                            <code>cd aplang</code>
                        </AlertTitle>
                    </Alert>
                </li>

                <li>
                    Build ApLang using Cargo:
                    <Alert className="p-4 m-2">
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>
                            <code>cargo build --release</code>
                        </AlertTitle>
                    </Alert>
                    This will compile ApLang in release mode, producing an optimized binary.
                </li>

                <li>
                    Run ApLang:
                    <Alert className="p-4 m-2">
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>
                            <code>cargo run --release -- --version</code>
                        </AlertTitle>
                    </Alert>
                    You should see output similar to: <CodeLine>aplang 0.0.0</CodeLine>
                </li>
            </ol>

            <Alert className="border-l-4 border-yellow-500 p-4 mt-4">
                <div className="flex items-start">
                    <TriangleAlert className="h-4 w-4 text-yellow-400 mt-1" />
                    <div className="ml-2">
                        <AlertTitle className="text-yellow-500">Compilation Issues</AlertTitle>
                        <p>
                            If ApLang fails to compile, you may be missing a C compiler, <CodeLine>cc</CodeLine>. To fix this, install a compiler:
                        </p>
                        <ul className="list-disc pl-6 mt-2">
                            <li>On macOS, run <CodeLine>xcode-select --install</CodeLine></li>
                            <li>On Linux, install <CodeLine>gcc</CodeLine> via your package manager</li>
                        </ul>
                        <p className="mt-2">
                            Alternatively, install the portable version of ApLang using:
                        </p>
                        <Alert variant="default" className="p-4 mt-2">
                            <Terminal className="h-4 w-4" />
                            <AlertTitle>
                                <code>cargo install aplang --no-default-features --features portable</code>
                            </AlertTitle>
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
