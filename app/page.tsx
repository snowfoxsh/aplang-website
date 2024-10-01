"use client"

import {Separator} from "@/components/ui/separator";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {Button} from "@/components/ui/button";
import {ColorModeToggle} from "@/app/components/color-mode-toggle";
import {Tabs} from "@radix-ui/react-tabs";
import LayoutTabs from "@/app/components/layout-tabs";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import React, {useEffect, useState} from "react";

type TabValue = "only-left" | "both" | "only-right";

export default function Playground() {
    const [leftHidden, setLeftHidden] = useState(false);
    const [handleHidden, setHandleHidden] = useState(false);
    const [rightHidden, setRightHidden] = useState(false);

    const [tabValue, setTabValue] = useState<TabValue>("both")

    const onTabChange = (tab: string) => {
        setTabValue(tab as TabValue);

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
                <div className="flex flex-col w-64 flex-shrink-0 py-8 pr-8 space-y-2">
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
                {/* Left side */}
                <div className="flex flex-grow min-w-0 p-8 items-center justify-center">
                    <ResizablePanelGroup direction="horizontal" className={"border flex-grow h-full rounded-md"}>
                        <ResizablePanel defaultSize={70} hidden={leftHidden}>
                            <div className={"flex h-full items-center justify-center"}>
                                Sidebar
                            </div>
                        </ResizablePanel>
                        <ResizableHandle withHandle={true} disabled={handleHidden}/>
                        <ResizablePanel className={"bg-muted"} defaultSize={30} minSize={15} maxSize={70} hidden={rightHidden}>
                            <div className={"flex h-full items-center justify-center"}>
                                Sidebar
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </div>
            </Tabs>
        </div>
    );
}
