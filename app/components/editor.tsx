import {Dispatch, SetStateAction, useCallback, useEffect, useState} from "react";
import ReactCodeMirror from "@uiw/react-codemirror";
import {useTheme} from "next-themes";
import {generateTheme} from "@/app/themes";
import {Loader2} from "lucide-react";

interface EditorProps {
    sourceCode: string;
    setSourceCode: Dispatch<SetStateAction<string>>;
    // className: string;
    // height: string;
}


export default function Editor(props: EditorProps) {
    const {sourceCode, setSourceCode} = props;

    const {resolvedTheme} = useTheme();

    const [mounted, setMounted] = useState<boolean>(false);
    const [themeLoaded, setThemeLoaded] = useState(false);

    const onEditorChange = useCallback((source: string) => {
        localStorage.setItem("sourceCode", source);
        setSourceCode(source);
    }, [setSourceCode]);

    useEffect(() => {
        setMounted(true);
    }, []);

    // when the component is mounted set the source from storage
    useEffect(() => {
        setSourceCode(localStorage.getItem("sourceCode") || "");
    }, [setSourceCode]);

    useEffect(() => {
        if (resolvedTheme) {
            setThemeLoaded(true);
        }
    }, [resolvedTheme]);

    if (!mounted || !themeLoaded) {
        return (
            <div className={"w-full h-full flex items-center justify-center"}>
                <Loader2 className={"mr-2 h-10 w-10 animate-spin"}/>
            </div>
        )
    }

    return <ReactCodeMirror
        onChange={onEditorChange}
        value={sourceCode}
        className={"flex-1 h-full w-full"}
        height={"100%"}
        theme={generateTheme()}
        id={"editor"}
    />
}