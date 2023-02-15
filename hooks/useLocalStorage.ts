import { useEffect, useState } from 'react';


export const useLocalStorage = <T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
    
    const [storedValue, setStoredValue] = useState<T>(initialValue);

    useEffect(() => {
        const item = window.localStorage.getItem(key);
        if (item) setStoredValue(JSON.parse(item));
    }, [])

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(storedValue))
    }, [storedValue])

    return [storedValue, setStoredValue]
};