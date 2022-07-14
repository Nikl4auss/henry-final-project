import { useState } from 'react'

export function useLocalStorage (key, initialValue) {
    const [ storedValue, setStoredValue ] = useState(() => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            return initialValue
        }
    });

    const setValue = value => {
        try {
            setStoredValue(value)
            window.localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            console.log(error)
        }
    }
    
    return [storedValue, setValue ]
}

export function useSessionStorage (key, initialValue) {
    const [ storedValue, setStoredValue ] = useState(() => {
        try {
            const item = window.sessionStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            return initialValue
        }
    });

    const setValue = value => {
        try {
            setStoredValue(value)
            window.sessionStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            console.log(error)
        }
    }
    
    return [storedValue, setValue ]
}