"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
    Tooltip,
    TooltipContent, TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {Badge} from "@/components/ui/badge"; // Import Tooltip components from Shadcn UI

interface RunButtonProps {
    isLoading: boolean;
    onClick: () => Promise<void>;
}

export default function RunButton(props: RunButtonProps) {
    const { isLoading, onClick } = props;

    return (
        <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                <Button onClick={onClick} disabled={isLoading}>
                    {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    {!isLoading ? "Run" : "Running..."}
                </Button>
            </TooltipTrigger>
            <TooltipContent className={"bg-muted text-foreground p-2 rounded-md"}>
                <Badge>ALT</Badge> + <Badge>R</Badge>
            </TooltipContent>
        </Tooltip>
        </TooltipProvider>
    );
}
