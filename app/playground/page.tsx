"use client"
import {Separator} from "@/components/ui/separator";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {Button} from "@/components/ui/button";
import {ColorModeToggle} from "@/app/playground/components/color-mode-toggle";
import {Tabs} from "@radix-ui/react-tabs";
import LayoutTabs from "@/app/playground/components/layout-tabs";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {Badge} from "@/components/ui/badge";
import RunButton from "@/app/playground/components/run-button";
import prettyMilliseconds from "pretty-ms";
import Editor from "@/app/playground/components/editor";
import {toast} from "sonner";
import {workerResponse} from "@/app/playground/worker_response";
import {timeout} from "@/app/playground/utils";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import {saveAs} from "file-saver";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {PresetSelector} from "@/app/playground/components/preset-selector";
import InputDialog, {DialogHandle} from "@/app/playground/components/input-prompt";
import SettingsModal from "@/app/playground/components/settings";
import {Menu, X} from "lucide-react";

type TabValue = "only-left" | "both" | "only-right";

function toastError(message: string) {
    toast.error(`${message}. Try refreshing first then clearing cache.`, {
        duration: 10000,
        richColors: true
    });
}

export default function Playground() {
    const [leftHidden, setLeftHidden] = useState(false);
    const [handleHidden, setHandleHidden] = useState(false);
    const [rightHidden, setRightHidden] = useState(false);
    const [vimMode, setVimMode] = useState<boolean>(false);
    const [fontSize, setFontSize] = useState<number>(14);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const [tabValue, setTabValue] = useState<TabValue>("both");
    const [sourceCode, setSourceCode] = useState<string>("");
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [runtime, setRuntime] = useState<number>(0.0);

    const workerRef = useRef<Worker | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const inputDialogRef = useRef<DialogHandle>(null);

    useEffect(() => {
        const storedFontSize = localStorage.getItem("fontSize");
        if (storedFontSize) {
            const size = parseInt(storedFontSize, 10);
            if (!isNaN(size)) {
                setFontSize(size);
            }
        }
    }, []);

    const onTabChange = (tab: string) => {
        setTabValue(tab as TabValue);
    }

    const handleRun = useCallback(async () => {
        // clear the console
        Array.from(document.getElementsByClassName("consoleText")).forEach(con => {
            (con as HTMLElement).innerText = "";
        });

        workerRef.current?.postMessage({type: "run", code: sourceCode})

        try {
            // wait for the start res
            const res = await timeout(workerResponse, [workerRef.current!], 1000);

            console.log("run started: ", res);

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            if (res.type !== "started") {
                throw "not started???";
            }
        } catch(e) {
            toastError("Could not start run job");

            console.error(e);
            return;
        }

        setIsRunning(true);
    }, [sourceCode]);

    const handleKeyDown = useCallback(
        async (event: KeyboardEvent) => {
            if (event.altKey && event.key === 'r') {
                event.preventDefault();
                await handleRun();
            }
        },
        [handleRun] // Dependencies
    );

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]); // Only re-run if handleKeyDown changes

    const handleImport = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const text = event.target?.result;
                if (typeof text === 'string') {
                    console.log(text)
                    setSourceCode(text);
                }
            };
            reader.readAsText(file);
        }
    };

    const handleExport = () => {
        const blob = new Blob([sourceCode], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "export.ap");
    }

    // Move state updates into useEffect
    useEffect(() => {
        switch (tabValue) {
            case "only-left":
                setLeftHidden(false);
                setHandleHidden(true);
                setRightHidden(true);
                break;
            case "both":
                setLeftHidden(false);
                setHandleHidden(false);
                setRightHidden(false);
                break;
            case "only-right":
                setLeftHidden(true);
                setHandleHidden(true);
                setRightHidden(false);
                break;
        }
    }, [tabValue]);

    const workerInitializedRef = useRef(false)

    useEffect(() => {
        if (workerInitializedRef.current) {
            // worker is already init
            return
        }
        workerInitializedRef.current = true;

        (async () => {
            const timer = setTimeout(() => {
                console.error("timeout: could not initialize worker")
                // toast.error("timeout: failed to initialize worker worker");
                toastError("Timeout: Failed to initialize web worker");
            }, 3000);


            try {
                workerRef.current = new Worker("/playground/worker.js", {type: "module"});
            } catch (e) {
                console.error("worker creation:\n" + e);
                toastError("Worker could not be initialized");
                return;
            }

            console.log("trying to init worker");
            workerRef.current.postMessage({type: "init"});
            const res = await workerResponse(workerRef.current);
            clearTimeout(timer);
            console.dir("worker successfully initiated: ", res);

            workerRef.current.addEventListener("message", async (event) => {
                console.log("event: ", event.data);

                switch (event.data.type) {
                    case "log":
                        // update console output
                        Array.from(document.getElementsByClassName("consoleText")).forEach(con => {
                            (con as HTMLElement).innerText = (con as HTMLElement).innerText + event.data.message;
                        });
                        break;
                    case "input":
                        const maxStringLength: number = event.data.maxStringLength!;
                        const sharedBuffer: SharedArrayBuffer = event.data.sharedBuffer!;
                        // see worker thread for buffer scheme

                        const sharedArray = new Int32Array(sharedBuffer);

                        // todo: fix this
                        // const userInput = "main thread";
                        const userInput = await inputDialogRef.current?.open(event.data.prompt) ?? "";

                        const encoder = new TextEncoder();
                        const byteArray = encoder.encode(userInput);

                        console.log("byte array:", byteArray);
                        const length = byteArray.length;

                        if(maxStringLength < length) {
                            console.error("buffer overflow!");
                        }


                        // write the string into the buffer
                        new Uint8Array(sharedBuffer, 4, length + 4).set(byteArray);
                        console.log("Shared Buffer: ", sharedArray);

                        const decode = new Uint8Array(sharedBuffer, 4, length + 4);
                        console.log("Decode Buffer: ", decode);


                        // write the length into the buffer LAST
                        new Int32Array(sharedBuffer, 0, 1)[0] = length;

                        // release the lock on the worker
                        Atomics.notify(sharedArray, 0);

                        break;
                    case "complete":
                        // todo this might need to be in the the instance of number
                        setIsRunning(false);

                        const delta = event.data.time;

                        if (!isNaN(delta) && (typeof delta === "number")) {
                            setRuntime(delta);
                        }

                        // setRuntime(delta);
                        break;
                    case "error":
                        toastError("Internal error. This is likely a bug. If it persists make an issue on GitHub.");
                        break;
                    default:
                        console.dir(event.data);
                }
            });
        })();
    }, []);

    if (isNaN(runtime)) {
        console.error("what the fuck???");
    }

    return (
        <div className="flex flex-col min-h-screen w-full" id="playground">
            {/* Header with responsive navigation */}
            <div className="w-full box-border flex flex-row justify-between items-center px-4 md:px-8 h-16">
                <div className="flex gap-2 md:gap-4">
                    <Link
                        href="/"
                        className="flex justify-start items-center hover:opacity-85 transition-opacity duration-300 mr-1"
                    >
                        <span className="font-bold text-lg mt-[-0.075rem]">Aplang</span>
                        <span className="sr-only">Aplang</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <NavigationMenu className="hidden md:flex">
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link href="/book" passHref legacyBehavior>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        <span className="font-regular text-base">Docs</span>
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/playground" passHref legacyBehavior>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        <span className="font-regular text-base">Playground</span>
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/install" passHref legacyBehavior>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        <span className="font-regular text-base">Install</span>
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="https://github.com/snowfoxsh/aplang" passHref legacyBehavior>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        <span className="font-regular text-base">GitHub</span>
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    {/* Mobile menu button */}
                    <Button variant="ghost" className="p-1 md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </Button>
                </div>

                <div className="flex gap-2 md:gap-4">
                    <input
                        type="file"
                        accept=".ap"
                        ref={fileInputRef}
                        style={{display: 'none'}}
                        onChange={handleFileChange}
                    />
                    <div className="hidden md:flex gap-2 md:gap-4">
                        <PresetSelector setSourceCode={setSourceCode} />
                        <Button variant="secondary" onClick={handleImport}>Import</Button>
                        <Button variant="outline" onClick={handleExport}>Export</Button>
                        <SettingsModal fontSize={fontSize} setFontSize={setFontSize} vimMode={vimMode} setVimMode={setVimMode} />
                    </div>
                    <ColorModeToggle/>
                </div>
            </div>

            {/* Mobile navigation menu */}
            {mobileMenuOpen && (
                <div className="flex flex-col p-4 bg-background border-b md:hidden">
                    <Link href="/book" className="py-2 px-1">Docs</Link>
                    <Link href="/playground" className="py-2 px-1">Playground</Link>
                    <Link href="/install" className="py-2 px-1">Install</Link>
                    <Link href="https://github.com/snowfoxsh/aplang" className="py-2 px-1">GitHub</Link>
                    <div className="flex flex-wrap gap-2 mt-4">
                        <PresetSelector setSourceCode={setSourceCode} />
                        <Button variant="secondary" onClick={handleImport}>Import</Button>
                        <Button variant="outline" onClick={handleExport}>Export</Button>
                        <SettingsModal fontSize={fontSize} setFontSize={setFontSize} vimMode={vimMode} setVimMode={setVimMode} />
                    </div>
                </div>
            )}

            <Separator/>

            <Tabs className="flex flex-grow flex-col md:flex-row-reverse" defaultValue="both" value={tabValue}
                  onValueChange={onTabChange}>
                {/* Desktop Controls Panel */}
                <div className="hidden md:flex md:flex-col w-64 justify-between flex-shrink-0 py-8 pr-8 space-y-2">
                    <div className="flex flex-col space-y-4">
                        <div className="flex flex-col space-y-2">
                            <HoverCard openDelay={500}>
                                <HoverCardTrigger asChild>
                                    <span className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Mode
                                    </span>
                                </HoverCardTrigger>
                                <HoverCardContent className="max-w-lg text-sm">
                                    Choose the interface that best suits your task
                                </HoverCardContent>
                            </HoverCard>
                            <LayoutTabs/>
                        </div>
                        <Separator/>
                        <div className="flex flex-col space-y-2">
                            <span className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Clear
                            </span>
                            <div className="flex flex-row justify-between space-x-2">
                                <Button variant="secondary" className="flex-grow" onClick={() => {
                                    Array.from(document.getElementsByClassName("consoleText")).forEach(con => {
                                        (con as HTMLElement).innerText = "";
                                    });
                                }}>Console</Button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="destructive">Editor</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Clear the Editor?</AlertDialogTitle>
                                            <AlertDialogDescription>This action cannot be undone!</AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => setSourceCode("")}>Clear</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    </div>
                    <RunButton isLoading={isRunning} onClick={handleRun}/>
                </div>

                {/* Main content area - adapts to mobile and desktop */}
                <div className="flex flex-grow min-w-0 p-4 md:p-8 items-center justify-center max-h-[calc(100vh-65px)] md:max-h-[calc(100vh-65px)]">
                    {/* Desktop view: horizontal panels */}
                    <div className="hidden md:flex w-full h-full">
                        <ResizablePanelGroup direction="horizontal" className="border flex-grow h-full rounded-md">
                            <ResizablePanel defaultSize={66} hidden={leftHidden}>
                                <Editor fontSize={fontSize} sourceCode={sourceCode} setSourceCode={setSourceCode} useMemory vimMode={vimMode}/>
                            </ResizablePanel>
                            <ResizableHandle withHandle={!handleHidden} disabled={handleHidden}/>
                            <ResizablePanel className="bg-muted relative" defaultSize={34} minSize={15} maxSize={70}
                                            hidden={rightHidden}>
                                <div className="h-full p-2 overflow-scroll">
                                    <pre className="consoleText font-firacode whitespace-pre-wrap" />
                                </div>
                                <Badge variant="default" className="absolute bottom-3 right-3">
                                    {prettyMilliseconds(Math.round(runtime))}
                                </Badge>
                            </ResizablePanel>
                        </ResizablePanelGroup>
                    </div>
                    {/* Mobile view: vertical layout */}
                    <div className="flex flex-col w-full h-[calc(100vh-165px)] md:hidden">
                        {/* Mobile Editor */}
                        {!leftHidden && (
                            <div className="border rounded-md mb-2 flex-grow flex-shrink basis-1/2 overflow-hidden">
                                <Editor
                                    fontSize={fontSize}
                                    sourceCode={sourceCode}
                                    setSourceCode={setSourceCode}
                                    useMemory
                                    vimMode={vimMode}
                                />
                            </div>
                        )}

                        {/* Mobile Console */}
                        {!rightHidden && (
                            <div className="border rounded-md bg-muted relative flex-grow flex-shrink basis-1/2 overflow-hidden">
                                <div className="h-full p-2 overflow-scroll">
                                    <pre className="consoleText font-firacode whitespace-pre-wrap" />
                                </div>
                                <Badge variant="default" className="absolute bottom-2 right-2">
                                    {prettyMilliseconds(Math.round(runtime))}
                                </Badge>
                            </div>
                        )}

                        {/* Mobile Run Button */}
                        <div className="mt-2">
                            <RunButton isLoading={isRunning} onClick={handleRun} />
                        </div>
                    </div>
                </div>
            </Tabs>
            <InputDialog ref={inputDialogRef} />
        </div>
    );
}
