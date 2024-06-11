import React from "react";

export default function Card({
    title,
    count,
    icon,
    bg = "from-white via-slate-100 to-gray-300",
    textPrimary = "text-orange-500",
    textSecondary = "text-white",
}) {
    return (
        <div
            className={`
            ${bg ? bg : ""}
            py-2 px-3 rounded-lg w-full h-[120px] flex items-center justify-center bg-gradient-to-br  shadow-md shadow-gray-700/50    `}
        >
            <div className="flex justify-between w-full items-center px-3">
                <div>
                    <p
                        className={`${textPrimary} font-bold text-xs md:text-base  transisi`}
                    >
                        {count}
                    </p>
                    <div
                        className={`font-extralight ${textPrimary} text-xs  lg:text-sm transisi`}
                    >
                        {title}
                    </div>
                </div>
                <div
                    className={`${textSecondary} text-md md:text-xl lg:text-xl transisi p-2 bg-orange-500 rounded-full `}
                >
                    {icon}
                </div>
            </div>
        </div>
    );
}
