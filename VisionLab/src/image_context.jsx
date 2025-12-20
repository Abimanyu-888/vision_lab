import React,{createContext,useContext,useState} from "react";

const ImageContext=createContext()

export function useImage(){
    return useContext(ImageContext)
}

export function ImageProvider({children}){
    const [uploadImg,setUploadImg]=useState(null)

    return (
        <ImageContext.Provider value={{uploadImg,setUploadImg}}>
            {children}
        </ImageContext.Provider>
    )
}