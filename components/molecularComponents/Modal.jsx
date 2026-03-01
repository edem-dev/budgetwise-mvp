'use client'

import React from 'react';




const Modal= (
    {
        children,
        open,
        onClose
    }
) => {

    // State
    if (!open) return null;
    return (
        <>
            {/*Overlay*/}
            <div
                className={"modal-overlay fixed inset-0 bg-black/50 z-1000"}
            />
            {/*Overlay*/}
            <section
                className={`modal-content text-white py-2 px-6 
            border border-gray-400 rounded-md
            fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
            bg-white z-1000
            `}
            >
                <div
                >
                    {children}
                </div>
                {/*    Close button*/}
                <div className="flex gap-3 mt-4 justify-end">
                </div>
            </section>
        </>

    );
};

export default Modal;
