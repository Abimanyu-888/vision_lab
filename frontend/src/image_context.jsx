import React, { createContext, useContext, useState } from "react";
import defaultImageImport from '/src/assets/_.jpeg';

const ImageContext = createContext();

export function useImage() {
    return useContext(ImageContext);
}

export function ImageProvider({ children }) {
    const [history, setHistory] = useState([defaultImageImport]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const uploadedImg = history[currentIndex];

    const setUploadImg = (newImgOrFn) => {
        setHistory((prevHistory) => {
            const currentImg = prevHistory[currentIndex];
            const newImg = typeof newImgOrFn === 'function' ? newImgOrFn(currentImg) : newImgOrFn;
            const nextHistory = prevHistory.slice(0, currentIndex + 1);
            return [...nextHistory, newImg];
        });
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };

    const undo = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }
    };

    const redo = () => {
        if (currentIndex < history.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };

    const canUndo = currentIndex > 0;
    const canRedo = currentIndex < history.length - 1;

    return (
        <ImageContext.Provider value={{
            uploadedImg,
            setUploadImg,
            undo,
            redo,
            canUndo,
            canRedo
        }}>
            {children}
        </ImageContext.Provider>
    );
}