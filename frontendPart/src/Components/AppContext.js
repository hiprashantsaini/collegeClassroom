import { createContext, useState } from "react";

export const AppContext=createContext();

const ContextProvider=(props)=>{
    const [userData,setUserData]=useState({});
    const [isAuthenticated,setIsAuthenticated]=useState(null);
    return(
        <AppContext.Provider value={{userData,setUserData,isAuthenticated,setIsAuthenticated}}>
             {props.children}
        </AppContext.Provider>
    )
}

export default ContextProvider;