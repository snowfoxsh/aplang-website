import React from "react";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";

interface RunButtonProps {
    isLoading: boolean;
    onClick: () => Promise<void>;
}

export default function RunButton(props: RunButtonProps) {
    const { isLoading, onClick } = props;

    return (
        <Button onClick={onClick} disabled={isLoading}>
            {isLoading ? <Loader2 className={"mr-2 h-4 w-4 animate-spin"}/>: <></>}
            {!isLoading ? "Run" : "Running..."}
        </Button>
    )
}

// // Use forwardRef to pass refs into the component
// const RunButton = forwardRef<HTMLButtonElement, IRunButtonProps>(({ isLoading, setIsLoading }, ref) => {
//     const handleClick = () => {
//         // Update the isLoading ref value on click
//         if (setIsLoading.current !== null) {
//             setIsLoading.current = true;
//         }
//     };
//
//     return (
//         <button ref={ref} onClick={handleClick}>
//             {isLoading ? "Loading..." : "Run"}
//         </button>
//     );
// });

// export default function App() {
//     const isLoadingRef = useRef<boolean>(false);
//     const [isLoading, setIsLoadingState] = useState(isLoadingRef.current);
//
//     useEffect(() => {
//         setIsLoadingState(isLoadingRef.current);
//     }, [isLoadingRef.current]);
//
//     return (
//         <div>
//             <RunButton isLoading={isLoading} setIsLoading={isLoadingRef} ref={null} />
//         </div>
//     );
// }