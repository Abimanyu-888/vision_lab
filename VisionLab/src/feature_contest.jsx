import {createContext,useContext,useState} from "react";

const FeatureContext=createContext()

export function useFeature(){
    return useContext(FeatureContext)
}

export function FeatureProvider({children}){
    const [currentFeature,setFeature]=useState(2)

    return (
        <FeatureContext.Provider value={{currentFeature,setFeature}}>
            {children}
        </FeatureContext.Provider>
    )
}