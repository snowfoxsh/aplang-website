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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
        label: "Quiz",
        value:
`IMPORT ["INPUT_PROMPT", "FORMAT"] FROM MOD "IO"
IMPORT "TRIM" FROM MOD "STRING"

name <- INPUT_PROMPT("What is your name?")
IF (TRIM(name) == "") {
  DISPLAY("Hello")
} ELSE {
  DISPLAY(FORMAT("Hello, {}!", [name]))
}

age <- INPUT_PROMPT("How old are you?")
DISPLAY(FORMAT("You are {} years old.", [age]))
`
    },
    {
        label: "Yap",
        value: `REPEAT 10 TIMES {
  DISPLAY("yap")
}
`},
    {
        label: "Average",
        value:
`numbers <- [10, 20, 30, 40, 50]
sum <- 0
count <- LENGTH(numbers)

FOR EACH number IN numbers {
  sum <- sum + number
}

IF (count > 0) {
  average <- sum / count
  DISPLAY("values: " + numbers)
  DISPLAY("average: " + average)
} ELSE {
  DISPLAY("no numbers to calculate average")
}
`
    },
    {
        label: "Insertion Sort",
        value:
`// DONT SUBMIT THIS FUNCTION AS HOMEWORK, your teacher will know :)
PROCEDURE insertionSort(list) {
  // start from the second element (index 2) since the first element is trivially sorted
  i <- 2
  REPEAT UNTIL (i > LENGTH(list)) {
    key <- list[i]
    j <- i - 1
        
    // move elements of list[1..i-1], that are greater than key, to one position ahead
    REPEAT UNTIL (j < 1 OR list[j] <= key) {
      list[j + 1] <- list[j]
      j <- j - 1
    }
        
    // insert the key at the correct position
    list[j + 1] <- key
    i <- i + 1
  }
  RETURN list
}

numbers <- [12, 11, 13, 5, 6]
DISPLAY("original list: " + numbers)

sortedNumbers <- insertionSort(numbers)
DISPLAY("sorted list: " + sortedNumbers)
`
    },
    {
        label: "FizzBuzz",
        value:
`i <- 1
REPEAT 100 TIMES {
  s <- ""
  IF (i MOD 3 == 0) {
    s <- s + "Fizz"
  }
  IF (i MOD 5 == 0) {
    s <- s + "Buzz"
  }
  IF (LENGTH(s) == 0) {
    s <- i
  }
  DISPLAY(s)
  i <- i + 1
}
`
    },
    {
        label: "Reverse String",
        value:
`
IMPORT ["FORMAT"] FROM MOD "IO"

PROCEDURE reverse_string(s) {
  reversed <- ""
  i <- LENGTH(s)
  REPEAT UNTIL (i < 1) {
    reversed <- reversed + s[i]
    i <- i - 1
  }
  RETURN reversed
}

text <- "hello"
DISPLAY(FORMAT("Original: {}", [text]))
DISPLAY(FORMAT("Reversed: {}", [reverse_string(text)]))
`
    }
];

// Define the props for PresetSelector
interface PresetSelectorProps {
    setSourceCode: (code: string) => void; // Setter function to update source code
    // currentSourceCode?: string; // (Optional) Current source code to display selected preset
}

export function PresetSelector({
                                   setSourceCode,
                               }: PresetSelectorProps) {
    const [open, setOpen] = React.useState(false);
    const [selectedPreset, setSelectedPreset] = React.useState<Preset | null>(null);
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [pendingPreset, setPendingPreset] = React.useState<Preset | null>(null);

    // Handler when a preset is selected from the list
    const handleSelect = (preset: Preset) => {
        setPendingPreset(preset);
        setAlertOpen(true);
        setOpen(false);
    };

    // Function to apply the preset
    const applyPreset = (preset: Preset) => {
        if (selectedPreset?.label === preset.label) {
            // If the same preset is selected again, deselect it
            setSelectedPreset(null);
            setSourceCode(""); // Clear the source code
        } else {
            // Select the new preset
            setSelectedPreset(preset);
            setSourceCode(preset.value);
        }
    };

    // Handler for confirming the overwrite
    const handleConfirm = () => {
        if (pendingPreset) {
            applyPreset(pendingPreset);
            setPendingPreset(null);
        }
        setAlertOpen(false);
    };

    // Handler for cancelling the overwrite
    const handleCancel = () => {
        setPendingPreset(null);
        setAlertOpen(false);
    };

    return (
        <>
            {/* Popover for Preset Selection */}
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

            {/* Alert Dialog for Confirmation */}
            <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Overwrite</AlertDialogTitle>
                        <AlertDialogDescription>
                            Selecting this preset will overwrite your current editor code. Are you sure you want to proceed?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleCancel}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirm}>
                            Confirm
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
