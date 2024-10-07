"use client"

import { createTheme, CreateThemeOptions } from '@uiw/codemirror-themes';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import tinycolor from "tinycolor2";

// Function to convert HSL CSS variable to Hex in TypeScript
export function css(cssVarName: string): string {
    const rootStyles = window.getComputedStyle(document.body)

    // Get the HSL value from the CSS variable
    const hslValue = rootStyles.getPropertyValue(cssVarName).trim();

    // Extract HSL components (hue, saturation, lightness) using regex
    const [h, s, l] = hslValue.match(/\d+(\.\d+)?/g)?.map(Number) || [0, 0, 100];

    // Convert HSL to Hex using tinycolor2
    return tinycolor({ h, s, l }).toHexString();
}

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
