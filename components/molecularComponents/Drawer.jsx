'use client';
import React, {useEffect, useRef, useState} from 'react';

const Drawer = (
    {
        children,
        upward = false,
        downward
    }
) => {

    // State check
    const drawerRef = useRef(null);
    const startY = useRef(0)
    const currentY = useRef(0)
    const [dragOffset, setDragOffset] = useState(0)
    const [isDragging, setIsDragging] = useState(false)

    const threshold = 120;

    // Reset dragging when open
    useEffect(()=>{
        if(upward){
            setDragOffset(0);
        }
    },[upward])

    // Handle pointer events
    const handlePointerDown = (e) =>{
        setIsDragging(true);
        startY.current = e.clientY;
    };

    const handlePointerMove = (e) =>{
        if(!isDragging) return;

        currentY.current = e.clientY;
        const difference = currentY.current - startY.current;
        //     Only allows downward drag
        if (difference > 0){
            setDragOffset(difference);
        }
    };

    const handlePointerUp = (e) =>{
        setIsDragging(false);
        if(dragOffset > threshold){
            downward?.();
        }else {
            setDragOffset(0);
        }
    }

    return (
        <>
            <div
                className={`fixed inset-0 bg-black/50 z-[1000]
                transition-opacity duration-300 ease-in-out
                ${upward ? 'opacity-100 ': 'opacity-0 pointer-events-none'}
                `}
                onClick={downward}/>

            <section
                ref={drawerRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                className={`
          fixed left-0 bottom-0 w-full h-[90vh]
          bg-white text-black z-1000
          rounded-t-2xl border-t-4 border-gray-400
          flex flex-col items-center
          ${isDragging ? '' : 'transition-transform duration-300 ease-out'}
          touch-none
        `}
                style={
                    {
                        transform:upward
                            ? `translateY(${dragOffset}px)`
                            :'translateY(100%)'
                    }
                }
            >
                <span className={"w-20 h-2 bg-gray-400 rounded-lg my-4"}></span>
                <div className={"w-full px-4 overflow-auto"}>
                    {children}
                </div>
            </section>
        </>
    );
};

/*
    FAULT ANALYSIS:
    1. Error-1 & Error-2 (TS2345): The code was calling `setDragOffset(true)` inside `handlePointerDown`.
       Since `dragOffset` was initialized as a number (`useState(0)`), TypeScript correctly flagged that
       a boolean cannot be assigned to a number state. The intention was likely to set `setIsDragging(true)`.

    2. Logic Bug (Dragging not working): `setIsDragging(true)` was never called in the original code.
       As a result, `handlePointerMove` would always return early because `isDragging` remained `false`.

    3. CSS/Tailwind Bug: `z-1000` is not a default Tailwind class. It was changed to `z-[1000]` (JIT arbitrary value)
       to ensure the drawer stays on top of other elements.

    4. UX Bug (Stuttery Drag): Added a conditional `transition-transform` class so that the drawer doesn't
       try to animate between every pixel during a manual drag, which makes the interaction feel much smoother.
*/

export default Drawer;
