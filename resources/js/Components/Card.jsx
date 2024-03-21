import React from "react";

export default function Card({ title, count, icon }) {
    return (
        <div className="py-2 px-3 rounded-lg w-full h-[120px] flex items-center justify-center bg-gradient-to-br from-white via-slate-100 to-gray-300 shadow-md shadow-gray-700/50    ">
            <div className="flex justify-between w-full items-center px-3">
                <div>
                    <p className="text-orange-500 font-bold text-base md:text-xl lg:text-3xl transisi">
                        {count}
                    </p>
                    <p className="font-extralight text-orange-500 text-xs md:text-base  lg:text-md transisi">
                        {title}
                    </p>
                </div>
                <div className="text-white text-xl md:text-3xl lg:text-5xl transisi p-2 bg-orange-500 rounded-full ">
                    {icon}
                </div>
            </div>
        </div>
    );
}
