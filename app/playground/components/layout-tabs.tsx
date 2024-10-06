import {TabsList, TabsTrigger} from "@/components/ui/tabs";
import {PanelRight, PanelRightClose, PanelRightOpen} from "lucide-react";
import React from "react"


export default function LayoutTabs() {
    return (
        <TabsList className="h-auto grid grid-cols-3">
            <TabsTrigger value="only-left">
                <span className="sr-only">Complete</span>
                <PanelRightClose />
            </TabsTrigger>
            <TabsTrigger value="both">
                <span className="sr-only">Insert</span>
                <PanelRight />
            </TabsTrigger>
            <TabsTrigger value="only-right">
                <span className="sr-only">Edit</span>
                <PanelRightOpen />
            </TabsTrigger>
        </TabsList>
    )
}