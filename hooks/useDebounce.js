import { useEffect, useState } from "react";

// This is function to deboung everytime when you are searching 
export function useDebounce(value, delay) {

    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebounceValue(value), delay);

        return () => clearTimeout(handler);
    }, [value, delay]);
    return debounceValue;
}
