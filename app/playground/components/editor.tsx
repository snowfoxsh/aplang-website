import {Dispatch, SetStateAction, useCallback, useEffect, useReducer, useState} from "react";
import ReactCodeMirror from "@uiw/react-codemirror";
import {useTheme} from "next-themes";
import {generateTheme} from "@/app/themes";
import {Loader2} from "lucide-react";
import {
    HighlightStyle,
    StreamLanguage,
    syntaxHighlighting,
} from '@codemirror/language';
import {tags} from "@lezer/highlight"

interface EditorProps {
    sourceCode: string;
    setSourceCode: Dispatch<SetStateAction<string>>;
    readonly?: boolean;
    useMemory?: boolean;
}

function defineAPLang() {
    return StreamLanguage.define({
        name: "aplang",

        // Token handling
        token(stream, state:  {inComment: boolean, inString: boolean, stringChar: null}) {
            // Handle comments
            if (stream.match('//')) {
                stream.skipToEnd();
                return 'comment';
            }

            if (stream.match('/*')) {
                state.inComment = true;
                return 'comment';
            }

            if (state.inComment) {
                if (stream.match('*/')) {
                    state.inComment = false;
                } else {
                    stream.next();
                }
                return 'comment';
            }

            // Handle strings - this is the fixed part
            if (state.inString) {
                // Look for the closing quote without consuming it yet
                if (stream.peek() === state.stringChar) {
                    stream.next(); // Consume the closing quote
                    state.inString = false;
                    state.stringChar = null;
                    return 'string';
                }

                // Handle escaped characters inside strings
                if (stream.peek() === '\\') {
                    stream.next(); // Skip the backslash
                    stream.next(); // Skip the escaped character
                    return 'string';
                }

                stream.next(); // Consume any other character in the string
                return 'string';
            }

            // Start of a string
            if (stream.peek() === '"' || stream.peek() === "'") {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                state.stringChar = stream.next(); // Store the quote character
                state.inString = true;
                return 'string';
            }

            // Skip whitespace
            if (stream.eatSpace()) return null;

            // Handle keywords
            const keywords = ['mod', 'if', 'else', 'repeat', 'times', 'until', 'for', 'each',
                'continue', 'break', 'in', 'procedure', 'return',
                'import', 'from', 'export'];

            const upperKeywords = keywords.map(k => k.toUpperCase());
            const allKeywords = [...keywords, ...upperKeywords];

            if (stream.match(/[a-zA-Z_][a-zA-Z0-9_]*/)) {
                const word = stream.current();
                if (allKeywords.includes(word)) return 'keyword';

                // Handle literals
                if (['true', 'false', 'null', 'TRUE', 'FALSE', 'NULL'].includes(word)) {
                    return 'atom';
                }

                // Handle operators
                if (['and', 'or', 'not', 'AND', 'OR', 'NOT', 'MOD'].includes(word)) {
                    return 'operator';
                }

                return 'variable';
            }

            // Handle numbers
            if (stream.match(/\d+(\.\d+)?/)) {
                return 'number';
            }

            // Handle operators
            if (stream.match(/<-/) ||
                stream.match(/[+\-*\/]/) ||
                stream.match(/==|!=|<=|>=|<|>/) ||
                stream.match(/;/)) {
                return 'operator';
            }

            // Handle brackets and parentheses
            if (stream.match(/[\[\](){},]/)) {
                return 'bracket';
            }

            // Default: advance one character
            stream.next();
            return null;
        },

        // State management
        startState() {
            return {
                inComment: false,
                inString: false,
                stringChar: null
            };
        }
    });
}


// Light mode theme (GitHub-inspired)
const lightTheme = HighlightStyle.define([
    { tag: tags.keyword, color: '#D73A49' },
    { tag: tags.atom, color: '#005CC5' },
    { tag: tags.comment, color: '#6A737D' },
    { tag: tags.string, color: '#032F62' },
    { tag: tags.number, color: '#005CC5' },
    { tag: tags.operator, color: '#D73A49' },
    { tag: tags.bracket, color: '#24292E' },
    { tag: tags.variableName, color: '#E36209' },
]);

// Dark mode theme (Dracula-inspired)
const darkTheme = HighlightStyle.define([
    { tag: tags.keyword, color: '#FF79C6' },
    { tag: tags.atom, color: '#BD93F9' },
    { tag: tags.comment, color: '#6272A4' },
    { tag: tags.string, color: '#F1FA8C' },
    { tag: tags.number, color: '#BD93F9' },
    { tag: tags.operator, color: '#FF79C6' },
    { tag: tags.bracket, color: '#F8F8F2' },
    { tag: tags.variableName, color: '#8BE9FD' },
]);

export default function Editor(props: EditorProps) {
    const {sourceCode, setSourceCode} = props;

    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const {theme, resolvedTheme} = useTheme();

    const [mounted, setMounted] = useState<boolean>(false);
    const [themeLoaded, setThemeLoaded] = useState(false);

    const onEditorChange = useCallback((source: string) => {
        if (props.useMemory) {
            localStorage.setItem("sourceCode", source);
        }
        setSourceCode(source);
    }, [setSourceCode, props.useMemory]);

    // detect mount
    useEffect(() => {
        setMounted(true);
    }, []);

    // detect initial theme load
    useEffect(() => {
        if (resolvedTheme) {
            setThemeLoaded(true);
        }
    }, [resolvedTheme]);

    // when the component is mounted set the source from storage
    useEffect(() => {
        if (props.useMemory) {
            setSourceCode(localStorage.getItem("sourceCode") || "");
        }
    }, [setSourceCode, props.useMemory]);

    // if the theme is changed update
    useEffect(() => {
        forceUpdate();
    }, [theme]);

    // wait for theme for mount and theme load
    if (!mounted || !themeLoaded) {
        return (
            <div className={"w-full h-full flex items-center justify-center"}>
                <Loader2 className={"mr-2 h-10 w-10 animate-spin"}/>
            </div>
        )
    }

    // Determine which syntax highlighting theme to use based on the current theme
    const syntaxTheme = resolvedTheme === 'dark' ? darkTheme : lightTheme;

    const aplang = defineAPLang();
    return <ReactCodeMirror
        extensions={[aplang, syntaxHighlighting(syntaxTheme)]}
        editable={!props.readonly}
        readOnly={props.readonly}
        onChange={onEditorChange}
        value={sourceCode}
        className={"flex-1 h-full w-full"}
        height={"100%"}
        theme={generateTheme()}
        id={"editor"}
    />
}