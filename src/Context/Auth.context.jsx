import { createContext, useEffect, useState } from "react";
import { getAllData } from "../API/UserData.api";

export const auth=createContext(null);
export default function AuthContextProvider({children}){
    const [isLogin,setLogin]=useState(null);
    const [allData,setData]=useState('');
    async function getData(){
      const res=await getAllData();
      setData(res.user);
    }
    useEffect(()=>{
      if(localStorage.getItem('token')){
        setLogin(localStorage.getItem('token'));
        getData();
      }
    },[])
    return <auth.Provider value={{isLogin,setLogin,allData}}>
        {children}
    </auth.Provider>
}