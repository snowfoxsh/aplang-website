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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SettingsModalProps {
    vimMode: boolean;
    setVimMode: (enabled: boolean) => void;
    fontSize: number;
    setFontSize: (size: number) => void;
}

export default function SettingsModal({ vimMode, setVimMode, fontSize, setFontSize }: SettingsModalProps) {
    const [settingsOpen, setSettingsOpen] = useState(false)
    const [showSkillCheck, setShowSkillCheck] = useState(false)
    const [vimCommand, setVimCommand] = useState("")
    const [commandError, setCommandError] = useState(false)

    // Initialize settings from localStorage on first mount only
    useEffect(() => {
        const storedVimSetting = localStorage.getItem("vimEnabled");
        if (storedVimSetting !== null) {
            const isVimEnabled = storedVimSetting === "true";
            if (isVimEnabled !== vimMode) {
                setVimMode(isVimEnabled);
            }
        }

        const storedFontSize = localStorage.getItem("fontSize");
        if (storedFontSize !== null) {
            const size = parseInt(storedFontSize, 10);
            if (!isNaN(size) && size !== fontSize) {
                setFontSize(size);
            }
        }
    }, []);

    // Update localStorage whenever settings change
    useEffect(() => {
        localStorage.setItem("vimEnabled", vimMode.toString());
    }, [vimMode]);

    useEffect(() => {
        localStorage.setItem("fontSize", fontSize.toString());
    }, [fontSize]);

    const handleVimToggle = (checked: boolean) => {
        if (checked && !vimMode) {
            setShowSkillCheck(true)
        } else {
            setVimMode(false)
        }
    }

    const validateVimCommand = () => {
        const validCommands = [":q!"]

        if (validCommands.includes(vimCommand.trim())){
            setVimMode(true)
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
                                {/* Font Size Setting */}
                                <div className="flex items-center justify-between space-x-2">
                                    <Label htmlFor="font-size" className="flex flex-col space-y-1">
                                        <span>Font Size</span>
                                        <span className="font-normal text-sm text-muted-foreground">
                                            Adjust the editor text size
                                        </span>
                                    </Label>
                                    <Select
                                        value={fontSize.toString()}
                                        onValueChange={(value) => setFontSize(parseInt(value, 10))}
                                    >
                                        <SelectTrigger className="w-24">
                                            <SelectValue placeholder={fontSize.toString()} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="10">10px</SelectItem>
                                            <SelectItem value="12">12px</SelectItem>
                                            <SelectItem value="14">14px</SelectItem>
                                            <SelectItem value="16">16px</SelectItem>
                                            <SelectItem value="18">18px</SelectItem>
                                            <SelectItem value="20">20px</SelectItem>
                                            <SelectItem value="24">24px</SelectItem>
                                            <SelectItem value="32">32px</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                {/* Vim Mode Setting */}
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