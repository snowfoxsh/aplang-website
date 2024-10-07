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
        label: "Hello World",
        value: `DISPLAY("Hello World!")
`,
    },
    {
        label: "Fibonacci Sequence",
        value: `PROCEDURE fib(n) {
  IF (n == 1) {
    RETURN 1
  } ELSE IF (n == 2) {
    RETURN 1
  } ELSE {
    RETURN fib(n-1) + fib(n-2)
  }
}

i <- 1
REPEAT UNTIL (i > 30) {
  DISPLAY(fib(i))
  i <- i + 1
}
`,
    },
    {
        label: "Yap",
        value: `REPEAT 10 TIMES {
  DISPLAY("yap")
}
`,
    },
    // Add more presets as needed
];

// Define the props for PresetSelector
interface PresetSelectorProps {
    setSourceCode: (code: string) => void; // Setter function to update source code
    // currentSourceCode?: string; // (Optional) Current source code to display selected preset
}

export function PresetSelector({
                                   setSourceCode,
                                   // currentSourceCode = "",
                               }: PresetSelectorProps) {
    const [open, setOpen] = React.useState(false);
    const [selectedPreset, setSelectedPreset] = React.useState<Preset | null>(null);

    // Handler when a preset is selected
    const handleSelect = (preset: Preset) => {
        if (selectedPreset?.label === preset.label) {
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
                                    key={preset.label}
                                    value={preset.label} // Changed to preset.label for searching by label
                                    onSelect={() => handleSelect(preset)}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selectedPreset?.label === preset.label
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
