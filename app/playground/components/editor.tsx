import {Dispatch, SetStateAction, useCallback, useEffect, useReducer, useState} from "react";
import ReactCodeMirror from "@uiw/react-codemirror";
import {useTheme} from "next-themes";
import {generateTheme} from "@/app/themes";
import {Loader2} from "lucide-react";

interface EditorProps {
    sourceCode: string;
    setSourceCode: Dispatch<SetStateAction<string>>;
    readonly?: boolean;
    useMemory?: boolean;
}


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
    }, [setSourceCode]);

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
    }, [setSourceCode]);

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

    return <ReactCodeMirror
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