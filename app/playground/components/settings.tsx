// Fixed app/playground/components/settings.tsx
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { AlertCircle, Check, Settings, X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface SettingsModalProps {
    vimMode: boolean;
    setVimMode: (enabled: boolean) => void;
}

export default function SettingsModal({ vimMode, setVimMode }: SettingsModalProps) {
    const [settingsOpen, setSettingsOpen] = useState(false)
    const [showSkillCheck, setShowSkillCheck] = useState(false)
    const [vimCommand, setVimCommand] = useState("")
    const [commandError, setCommandError] = useState(false)

    // Initialize vimMode from localStorage on first mount only
    useEffect(() => {
        const storedVimSetting = localStorage.getItem("vimEnabled");
        if (storedVimSetting !== null) {
            const isVimEnabled = storedVimSetting === "true";
            // Only set if different to avoid infinite loop
            if (isVimEnabled !== vimMode) {
                setVimMode(isVimEnabled);
            }
        }
        // Only run this effect once on mount
    });

    // Update localStorage whenever vimMode changes
    useEffect(() => {
        localStorage.setItem("vimEnabled", vimMode.toString());
    }, [vimMode]);

    const handleVimToggle = (checked: boolean) => {
        if (checked && !vimMode) {
            // Only show skill check when enabling Vim
            setShowSkillCheck(true)
        } else {
            // When disabling, just update the state through props
            setVimMode(false)
        }
    }

    const validateVimCommand = () => {
        // Check for common Vim commands
        const validCommands = [":q!"]

        if (validCommands.includes(vimCommand.trim())){
            setVimMode(true) // Update the parent component's state
            setShowSkillCheck(false)
            setCommandError(false)
            setVimCommand("")
        } else {
            setCommandError(true)
        }
    }

    return (
        <>
            {/* Settings Button and Modal */}
            <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Settings className="h-[1.2rem] w-[1.2rem]" />
                        <span className="sr-only">Settings</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Settings</DialogTitle>
                        <DialogDescription>Configure your editor preferences</DialogDescription>
                    </DialogHeader>

                    <div className="py-4">
                        <Card className="border-none shadow-none">
                            <CardContent className="p-0 space-y-6">
                                <div className="flex items-center justify-between space-x-2">
                                    <Label htmlFor="vim-mode" className="flex flex-col space-y-1">
                                        <span>Vim Mode</span>
                                        <span className="font-normal text-sm text-muted-foreground">
                                            Enable Vim keybindings for text editing
                                        </span>
                                    </Label>
                                    <Switch id="vim-mode" checked={vimMode} onCheckedChange={handleVimToggle} />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <DialogFooter>
                        <Button onClick={() => setSettingsOpen(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Vim Skill Check Dialog */}
            <Dialog
                open={showSkillCheck}
                onOpenChange={(open) => {
                    setShowSkillCheck(open)
                    if (!open) {
                        setCommandError(false)
                        setVimCommand("")
                    }
                }}
            >
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Vim Knowledge Check</DialogTitle>
                        <DialogDescription>
                            To enable Vim mode, please enter the command to quit without saving to demonstrate your familiarity with Vim.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4 space-y-4">
                        {commandError && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Invalid command</AlertTitle>
                                <AlertDescription>
                                    Please help me, I have been trapped in vim since 2003. I am running out of food and water.
                                </AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="vim-command">Enter a Vim command:</Label>
                            <Input
                                id="vim-command"
                                value={vimCommand}
                                onChange={(e) => setVimCommand(e.target.value)}
                                className="font-mono"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowSkillCheck(false)}>
                            <X className="mr-2 h-4 w-4" />
                            Cancel
                        </Button>
                        <Button onClick={validateVimCommand}>
                            <Check className="mr-2 h-4 w-4" />
                            Verify
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}