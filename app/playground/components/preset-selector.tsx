import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

// Define the shape of a preset
interface Preset {
    label: string;
    value: string;
}

// Presets array
const presets: Preset[] = [
    {
        label: "fib.ap",
        value: `DISPLAY("fib.ap")`,
    },
    {
        label: "two.ap",
        value: `DISPLAY("two.ap")`,
    },
];

// Define the props for PresetSelector
interface PresetSelectorProps {
    setSourceCode: (code: string) => void; // Setter function to update source code
    currentSourceCode?: string; // (Optional) Current source code to display selected preset
}

export function PresetSelector({
                                   setSourceCode,
                                   currentSourceCode = "",
                               }: PresetSelectorProps) {
    const [open, setOpen] = React.useState(false);
    const [selectedPreset, setSelectedPreset] = React.useState<Preset | null>(
        () =>
            presets.find((preset) => preset.value === currentSourceCode) ||
            null
    );

    // Handler when a preset is selected
    const handleSelect = (preset: Preset) => {
        if (selectedPreset?.value === preset.value) {
            // If the same preset is selected again, deselect it
            setSelectedPreset(null);
            setSourceCode(""); // Clear the source code
        } else {
            // Select the new preset
            setSelectedPreset(preset);
            setSourceCode(preset.value);
        }
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {selectedPreset ? selectedPreset.label : "Select preset..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search presets..." />
                    <CommandList>
                        <CommandEmpty>No presets found.</CommandEmpty>
                        <CommandGroup>
                            {presets.map((preset) => (
                                <CommandItem
                                    key={preset.value}
                                    value={preset.value}
                                    onSelect={() => handleSelect(preset)}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selectedPreset?.value === preset.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {preset.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
