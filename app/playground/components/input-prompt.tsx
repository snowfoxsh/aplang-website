"use client";

import React, { useState, forwardRef, useImperativeHandle } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Define the DialogHandle interface
export interface DialogHandle {
    open: (prompt: string | null) => Promise<string>;
}

// export interface InputDialogProps {
//     prompt?: string | null;
// }

// Dialog Component using forwardRef
const InputDialog = forwardRef<DialogHandle, object>((_, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [resolvePromise, setResolvePromise] = useState<((value: string) => void) | null>(null);
    const [prompt, setPrompt] = useState<string | null>(null);


    // Expose `open` method via ref
    useImperativeHandle(ref, () => ({
        open: (prompt) =>
            new Promise<string>((resolve) => {
                setResolvePromise(() => resolve); // Store the resolve function
                setPrompt(prompt); // Set the prompt
                setIsOpen(true); // Show the dialog
            }),
    }));

    let dialogDescription = (<></>);
    if (prompt !== null) {
        if (prompt?.trim() !== "") {
            dialogDescription = (
                <DialogDescription>
                    <p>{prompt}</p>
                </DialogDescription>
            );
        }
    }

    // Handle submission
    const handleSubmit = () => {
        if (resolvePromise) resolvePromise(inputValue); // Resolve with input value
        setIsOpen(false);
        setInputValue(""); // Reset input
        setPrompt(null);
    };

    // Handle key press
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={() => {}}>
            <DialogContent className={"[&>button]:hidden"}>
                <DialogHeader>
                    <DialogTitle>Enter a Value</DialogTitle>
                    {dialogDescription}
                </DialogHeader>
                <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder=""
                />
                <DialogFooter>
                    <Button onClick={handleSubmit}>Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
});

InputDialog.displayName = "InputDialog";

export default InputDialog;
