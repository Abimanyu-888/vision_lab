import React, { createContext, useContext, useState } from "react";
import defaultImageImport from '/src/assets/_.jpeg';

const ImageContext = createContext();

export function useImage() {
    return useContext(ImageContext);
}

export function ImageProvider({ children }) {
    const [uploadedImg, setUploadedImg] = useState(defaultImageImport);
    const [previousImg, setPreviousImg] = useState(null);
    const [redoImg, setRedoImg] = useState(null);
    const [reloadKey, setReloadKey] = useState(0);


    const setUploadImg = (newImgOrFn) => {
        const newImg =
            typeof newImgOrFn === "function"
                ? newImgOrFn(uploadedImg)
                : newImgOrFn;

        setPreviousImg(uploadedImg);
        setUploadedImg(newImg);
        setRedoImg(null); 
    };


    const undo = () => {
        if (!previousImg) return;

        setRedoImg(uploadedImg);
        setUploadedImg(previousImg);
        setPreviousImg(null);
    };

    const redo = () => {
        if (!redoImg) return;

        setPreviousImg(uploadedImg);
        setUploadedImg(redoImg);
        setRedoImg(null);
    };

    return (
        <ImageContext.Provider value={{
            uploadedImg,
            reloadKey,
            setUploadImg,
            setReloadKey,
            undo,
            redo,
            canUndo: previousImg !== null,
            canRedo: redoImg !== null
        }}>
            {children}
        </ImageContext.Provider>
    );
}