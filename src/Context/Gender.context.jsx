import { createContext, useEffect, useState } from "react";

export const nam = createContext(null);
export default function GenderContextProvider({ children }) {
    const [name, setName] = useState(localStorage.getItem('useName'));
    useEffect(()=>{localStorage.setItem('useName',name);},[name]);
    return <nam.Provider value={{ name, setName }}>
        {children}
    </nam.Provider>
}