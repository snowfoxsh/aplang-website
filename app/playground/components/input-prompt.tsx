"use client";

import { useState, forwardRef, useImperativeHandle } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Define the DialogHandle interface
export interface DialogHandle {
    open: () => Promise<string>;
}

// Dialog Component using forwardRef
const InputDialog = forwardRef<DialogHandle, object>((_, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [resolvePromise, setResolvePromise] = useState<((value: string) => void) | null>(null);

    // Expose `open` method via ref
    useImperativeHandle(ref, () => ({
        open: () =>
            new Promise<string>((resolve) => {
                setResolvePromise(() => resolve); // Store the resolve function
                setIsOpen(true); // Show the dialog
            }),
    }));

    // Handle submission
    const handleSubmit = () => {
        if (resolvePromise) resolvePromise(inputValue); // Resolve with input value
        setIsOpen(false);
        setInputValue(""); // Reset input
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
