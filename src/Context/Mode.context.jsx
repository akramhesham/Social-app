import { createContext, useEffect, useState } from "react";
import { useContext } from "react";

 
export const mode=createContext(null);
export default function ModeContextProvider({children}){
    const [theme,setTheme]=useState('light');
    function toggleTheme(){
        if(theme==='light'){
            setTheme('dark');
            localStorage.setItem('Theme','dark');
        }else{
            setTheme('light');
            localStorage.setItem('Theme','light');
        }
    }
    useEffect(()=>{
        if(localStorage.getItem('Theme')==='dark'){
            setTheme('dark');
        }
    },[])
    return <mode.Provider value={{theme,toggleTheme}}>
        {children}
    </mode.Provider>
}