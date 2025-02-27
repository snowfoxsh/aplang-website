import React from "react";

interface CodeLineProps {
    variant?: "fill" | "outline" | "link";
    children: React.ReactNode;
}

export default function CodeLine({
                                     children,
                                     variant = "outline", // Default value for variant
                                     ...props
                                 }: Readonly<CodeLineProps>) {
    let classNameBase: string;

    switch (variant) {
        case "fill":
            classNameBase = "bg-gray-200 text-black px-1 py-0.5 rounded";
            break;
        case "link":
            classNameBase = "border border-blue-500 px-1 pt-0 pb-0.5 rounded text-blue-500 hover:underline";
            break;
        case "outline":
        default:
            classNameBase = "border border-gray-500 px-1 pt-0 pb-0.5 rounded";
            break;
    }

    console.log(classNameBase)

    return (
        <code className={classNameBase} {...props}>
            {children}
        </code>
    );
}
