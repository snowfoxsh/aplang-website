"use client";

import { useState, forwardRef, useImperativeHandle } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Define the DialogHandle interface
export interface DialogHandle {
    open: () => Promise<string | null>;
}

// Dialog Component using forwardRef
const InputDialog = forwardRef<DialogHandle, {}>((_, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [resolvePromise, setResolvePromise] = useState<((value: string | null) => void) | null>(null);

    // Expose `open` method via ref
    useImperativeHandle(ref, () => ({
        open: () =>
            new Promise<string | null>((resolve) => {
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

    // Handle cancellation
    const handleCancel = () => {
        if (resolvePromise) resolvePromise(null); // Resolve with null if canceled
        setIsOpen(false);
        setInputValue("");
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Enter a Value</DialogTitle>
                    <DialogDescription>Type something and submit.</DialogDescription>
                </DialogHeader>
                <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Enter text..." />
                <DialogFooter>
                    <Button onClick={handleSubmit}>Submit</Button>
                    <Button variant="secondary" onClick={handleCancel}>
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
});

InputDialog.displayName = "InputDialog";

export default InputDialog;
