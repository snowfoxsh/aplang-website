"use client"

import {Separator} from "@/components/ui/separator";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {Button} from "@/components/ui/button";
import {ColorModeToggle} from "@/app/components/color-mode-toggle";
import {Tabs} from "@radix-ui/react-tabs";
import LayoutTabs from "@/app/components/layout-tabs";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import React, {useEffect, useRef, useState} from "react";
import {Badge} from "@/components/ui/badge";
import RunButton from "@/app/components/run-button";
import prettyMilliseconds from "pretty-ms";
import ReactCodeMirror from "@uiw/react-codemirror";
import {light, dark} from "codemirror-themes-for-shadcn";


type TabValue = "only-left" | "both" | "only-right";

export default function Playground() {
    const [leftHidden, setLeftHidden] = useState(false);
    const [handleHidden, setHandleHidden] = useState(false);
    const [rightHidden, setRightHidden] = useState(false);

    const [tabValue, setTabValue] = useState<TabValue>("both")

    const [sourceCode, setSourceCode] = useState<string>("");

    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [runtime, setRuntime] = useState<number>(0.0);

    const workerRef = useRef<Worker | null>(null);

    const onTabChange = (tab: string) => {
        setTabValue(tab as TabValue);
    }

    const handleRun = async () => {
        document.getElementById("consoleText")!.innerText = ""; // clear the console
        workerRef.current?.postMessage({type: "run", code: sourceCode})
        setIsRunning(true);
        // await start
        // await workerResponse(workerRef.current!);
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

    useEffect(() => {
        workerRef.current = new Worker("/worker.js", {type: "module"});

        workerRef.current.postMessage({type: "init"});

        // await ready
        // const _data: object = await workerResponse(workerRef.current!);
        // console.log(_data);

        workerRef.current.onmessage = (event) => {
            console.log(event.data);

            switch (event.data.type) {
                case "log":
                    // i would love to use hooks here but cant figure out how to
                    const c = document.getElementById("consoleText")!;
                    c.innerText = c.innerText + event.data.message;
                    break;
                case "complete":
                    setIsRunning(false);
                    setRuntime(event.data.time);
                    break;
                case "error":
                    break;
            }
        }

        return () => {
            workerRef.current?.terminate();
        }
    }, []);


    return (
        <div className={"flex flex-col min-h-screen w-full"}>
            <div className="w-full box-border flex flex-row justify-between items-center px-8 h-16">
                <HoverCard>
                    <HoverCardTrigger>
                        <h2 className="text-lg font-bold">Playground</h2>
                    </HoverCardTrigger>
                    <HoverCardContent
                        align="start"
                        className="flex flex-col content-center items-center space-y-2 [&>*]:w-full"
                    >
                        <Button variant="secondary">Home</Button>
                        <Button variant="secondary">Docs</Button>
                        <Button variant="secondary">Repo</Button>
                    </HoverCardContent>
                </HoverCard>

                <div className="flex space-x-4">
                    <Button variant="outline">Import</Button>
                    <Button variant="outline">Export</Button>
                    <ColorModeToggle />
                </div>
            </div>

            <Separator />

            <Tabs className="flex flex-grow flex-row-reverse" defaultValue={"both"} value={tabValue} onValueChange={onTabChange}>
                {/* Right side */}
                <div className="flex flex-col w-64 justify-between flex-shrink-0 py-8 pr-8 space-y-2">
                    <div className={"flex flex-col space-y-2"}>
                        <HoverCard openDelay={500}>
                            <HoverCardTrigger asChild>
                            <span className={"text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>
                                Mode
                            </span>
                            </HoverCardTrigger>
                            <HoverCardContent className={"max-w-lg text-sm"}>
                                Choose the interface that best suits your task
                            </HoverCardContent>
                        </HoverCard>
                        <LayoutTabs/>
                    </div>
                    <RunButton isLoading={isRunning} onClick={handleRun} />
                </div>
                {/* Left side */}
                <div className="flex flex-grow min-w-0 p-8 items-center justify-center">
                    <ResizablePanelGroup direction="horizontal" className={"border flex-grow h-full rounded-md"}>
                        <ResizablePanel
                            defaultSize={66}
                            hidden={leftHidden}
                            className="flex flex-col h-full w-full"
                        >
                            {/*<Textarea*/}
                            {/*    value={sourceCode}*/}
                            {/*    onChange={(event) => { setSourceCode(event.target.value)}}*/}
                            {/*    className={"flex h-full items-center rounded-none justify-center resize-none border-none font-mono"}*/}
                            {/*>*/}
                            {/*</Textarea>*/}

                            <ReactCodeMirror className={"flex-1 h-full w-full"} theme={"dark"} height={"100%"} onChange={setSourceCode}></ReactCodeMirror>
                        </ResizablePanel>
                        <ResizableHandle withHandle={true} disabled={handleHidden}/>
                        <ResizablePanel className={"bg-muted"} defaultSize={34} minSize={15} maxSize={70} hidden={rightHidden}>
                            <div className={"relative flex h-full p-2"}>
                                <div id={"consoleText"} className={"font-mono"}>

                                </div>
                                <Badge variant={"default"} className={"absolute bottom-3 right-3"}>{prettyMilliseconds(Math.round(runtime))}</Badge>
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </div>
            </Tabs>
        </div>
    );
}
