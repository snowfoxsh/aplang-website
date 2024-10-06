"use client"
import {Separator} from "@/components/ui/separator";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {Button} from "@/components/ui/button";
import {ColorModeToggle} from "@/app/playground/components/color-mode-toggle";
import {Tabs} from "@radix-ui/react-tabs";
import LayoutTabs from "@/app/playground/components/layout-tabs";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import React, {useEffect, useRef, useState} from "react";
import {Badge} from "@/components/ui/badge";
import RunButton from "@/app/playground/components/run-button";
import prettyMilliseconds from "pretty-ms";
import Editor from "@/app/playground/components/editor";
import {toast} from "sonner";
import { workerResponse} from "@/app/playground/worker_response";
import {timeout} from "@/app/playground/utils";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import {saveAs} from "file-saver";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";

type TabValue = "only-left" | "both" | "only-right";

function toastError(message: string) {
    toast.error(message);
}

export default function Playground() {
    const [leftHidden, setLeftHidden] = useState(false);
    const [handleHidden, setHandleHidden] = useState(false);
    const [rightHidden, setRightHidden] = useState(false);

    const [tabValue, setTabValue] = useState<TabValue>("both")

    const [sourceCode, setSourceCode] = useState<string>("");

    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [runtime, setRuntime] = useState<number>(0.0);

    const workerRef = useRef<Worker | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const onTabChange = (tab: string) => {
        setTabValue(tab as TabValue);
    }

    const handleRun = async () => {
        document.getElementById("consoleText")!.innerText = ""; // clear the console
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
    }

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
    // const [workerAlive, setWorkerAlive] = useState<boolean>(false);

    useEffect(() => {
        if (workerInitializedRef.current) {
            // worker is already init
            return
        }
        workerInitializedRef.current = true;

        (async () => {
            const timer = setTimeout(() => {
                console.error("timeout: could not initialize worker")
                toast.error("timeout: failed to initialize worker worker");
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
                        // Update console output
                        const c = document.getElementById("consoleText")!;
                        c.innerText = c.innerText + event.data.message;
                        break;
                    case "complete":
                        setIsRunning(false);
                        setRuntime(event.data.time);
                        break;
                    case "error":
                        toastError("Internal error");
                        break;
                }
            });
        })();
    }, []);


    return (
        <div className="flex flex-col min-h-screen w-full" id="playground">
            <div className="w-full box-border flex flex-row justify-between items-center px-8 h-16">
                <div className="flex gap-4">
                    <Link
                        href="/"
                        className="flex justify-start items-center hover:opacity-85 transition-opacity duration-300 mr-1"
                    >
                        <span className="font-bold text-lg mt-[-0.075rem]">Aplang</span>
                        <span className="sr-only">Aplang</span>
                    </Link>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link href="/" passHref legacyBehavior>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        <span className="font-regular text-base">Book</span>
                                        <span className="sr-only">Book</span>
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/playground" passHref legacyBehavior>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        <span className="font-regular text-base">Playground</span>
                                        <span className="sr-only">Playground</span>
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="https://github.com/snowfoxsh/aplang" passHref legacyBehavior>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        <span className="font-regular text-base">Repo</span>
                                        <span className="sr-only">Repo</span>
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="flex gap-4">
                    <input
                        type="file"
                        accept=".ap"
                        ref={fileInputRef}
                        style={{display: 'none'}}
                        onChange={handleFileChange}
                    />
                    <Button variant="secondary" onClick={handleImport}>Import</Button>
                    <Button variant="outline" onClick={handleExport}>Export</Button>
                    <ColorModeToggle/>
                </div>
            </div>

            <Separator/>

            <Tabs className="flex flex-grow flex-row-reverse" defaultValue={"both"} value={tabValue}
                  onValueChange={onTabChange}>
                {/* Right side */}
                <div className="flex flex-col w-64 justify-between flex-shrink-0 py-8 pr-8 space-y-2">
                    <div className={"flex flex-col space-y-4"}>
                    {/*mode*/}
                        <div className={"flex flex-col space-y-2"}>
                            <HoverCard openDelay={500}>
                                <HoverCardTrigger asChild>
                            <span
                                className={"text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>
                                Mode
                            </span>
                                </HoverCardTrigger>
                                <HoverCardContent className={"max-w-lg text-sm"}>
                                    Choose the interface that best suits your task
                                </HoverCardContent>
                            </HoverCard>
                            <LayoutTabs/>
                        </div>
                        <Separator/>
                        {/*clear*/}
                        <div className={"flex flex-col space-y-2"}>
                        <span
                            className={"text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>
                            Clear
                        </span>
                            <div className={"flex flex-row justify-between space-x-2"}>
                                <Button variant={"secondary"} className={"flex-grow"} onClick={() => {
                                    document.getElementById("consoleText")!.innerText = ""
                                }}>Console</Button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="destructive">Editor</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Clear the Editor?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone!
                                            </AlertDialogDescription>
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
                {/* Left side */}
                <div className="flex flex-grow min-w-0 p-8 items-center justify-center">
                    <ResizablePanelGroup direction="horizontal" className={"border flex-grow h-full rounded-md"}>
                        <ResizablePanel defaultSize={66} hidden={leftHidden} className="flex flex-col h-full w-full">
                            <Editor sourceCode={sourceCode} setSourceCode={setSourceCode}/>
                        </ResizablePanel>
                        <ResizableHandle withHandle={!handleHidden} disabled={handleHidden}/>
                        <ResizablePanel className={"bg-muted"} defaultSize={34} minSize={15} maxSize={70}
                                        hidden={rightHidden}>
                            <div className={"relative flex h-full p-2"}>

                                {/* console */}
                                <div id={"consoleText"} className={"font-mono"}></div>
                                <Badge variant={"default"}
                                       className={"absolute bottom-3 right-3"}>{prettyMilliseconds(Math.round(runtime))}</Badge>
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </div>
            </Tabs>
        </div>
    );
}