"use client"

import { createTheme, CreateThemeOptions } from '@uiw/codemirror-themes';
import tinycolor from "tinycolor2";

//
// function isDarkMode(): boolean {
//     return window.matchMedia('(prefers-color-scheme: dark)').matches;
// }
//

// Function to convert HSL CSS variable to Hex in TypeScript
export function css(cssVarName: string): string {
    const rootStyles = window.getComputedStyle(document.body)

    // Get the HSL value from the CSS variable
    const hslValue = rootStyles.getPropertyValue(cssVarName).trim();

    // Extract HSL components (hue, saturation, lightness) using regex
    const [h, s, l] = hslValue.match(/\d+(\.\d+)?/g)?.map(Number) || [0, 0, 100];

    // Convert HSL to Hex using tinycolor2
    let a =  tinycolor({ h, s, l }).toHexString();
    console.log(a);
    return a
}

//
// export const defaultSettingsConsoleDark: CreateThemeOptions['settings'] = {
//     background: css("--background"),
//     foreground: css("--background"),
//     caret: css("--background"),
//     selection: css("--primary"),
//     selectionMatch: css("--primary"),
//     gutterBackground: css("--background"),
//     gutterForeground: css("--foreground"),
//     gutterActiveForeground: css("--background"),
//     lineHighlight: css("--background"),
// };
//

export const generateTheme = (options?: Partial<CreateThemeOptions>) => {

    const defaultSettingsConsoleDark: CreateThemeOptions['settings'] = {
        background: css("--background"),
        foreground: css("--foreground"),
        caret: css("--foreground"),
        selection: css("--accent"),
        selectionMatch: css("--accent"),
        gutterBackground: css("--background"),
        gutterForeground: css("--foreground"),
        gutterActiveForeground: css("--foreground"),
        lineHighlight: css("--accent"),
    };
    console.dir(defaultSettingsConsoleDark);

    const { theme = 'dark', settings = {}, styles = [] } = options || {};

    return createTheme({

        theme: theme,

        settings: {

            ...defaultSettingsConsoleDark,

            ...settings,

        },

        styles: [...styles],

    });

};
