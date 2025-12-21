import React,{createContext,useContext,useState} from "react";
import defaultImageImport from '/public/download.jpeg';

const ImageContext=createContext()

export function useImage(){
    return useContext(ImageContext)
}

export function ImageProvider({children}){
    const [uploadedImg,setUploadImg]=useState(defaultImageImport)

    return (
        <ImageContext.Provider value={{uploadedImg,setUploadImg}}>
            {children}
        </ImageContext.Provider>
    )
}