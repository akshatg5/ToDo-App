import React from "react";

interface HeadingProps {
    headingText : string
}

export const Heading : React.FC<HeadingProps> =({headingText}) => {
    return (
        <div className="bg-slate-200 rounded-2xl mt-2 mb-8">
            <h1 className="px-20 py-4 text-center font-bold text-2xl">{headingText}</h1>
        </div>
    )
}