import {useEffect, useRef} from "react";

const useClickOutside = (handler) => {
    const domNode = useRef();

    useEffect(() => {
        const handleEvent = (event) => {
            if (domNode && !domNode.current.contains(event.target)) {
                handler();
            }
        };

        document.addEventListener("mousedown", handleEvent);

        return () => {
            document.removeEventListener("mousedown", handleEvent);
        };
    });

    return domNode;
};

export default useClickOutside;