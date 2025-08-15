import { Children, createContext, useState } from "react";


export const counter = createContext(0);
export default function CounterContextProvider({ children }) {
    const [counterMe, setCounterMe] = useState(0);

    function increase() {
        setCounterMe(counterMe + 1);
    }
    return <counter.Provider value={{ counterMe, increase }}>
        {children}
        </counter.Provider>
}
