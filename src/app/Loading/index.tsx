"use client"
import React, { useEffect } from "react";
import { SquareLoader } from 'react-spinners';

const Loading: React.FC = () => {
    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, []);

    return (
        <div className="bg-gray-100 flex justify-center items-center absolute top-0 left-0 right-0 bottom-0 h-screen z-20">
            <div className="animate-pulse">
                <SquareLoader color="rgba(0,0,0)" />
            </div>
            <div className="text-3xl font-bold font-heading text-black ml-4">
                MODISTE
            </div>
        </div>
    );
};

export default Loading;
