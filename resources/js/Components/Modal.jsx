import { Transition } from "@headlessui/react";
import { Close } from "@mui/icons-material";
import React from "react";
import { useRef } from "react";

export default function Modal({
    open,
    title,
    setOpen,
    children,
    setModel,
    width = "",
}) {
    const modalRef = useRef();
    return (
        <div
            className={`${
                open ? "z-[99] opacity-100" : "opacity-0 -z-[99]"
            } transition-all duration-150 fixed  left-0 top-0 w-screen h-screen overflow-hidden bg-gray-950/50 backdrop-blur-sm flex items-center justify-center`}
        >
            <Transition
                show={open}
                enter="transition-all duration-300 "
                enterFrom="translate-y-full"
                enterTo="translate-y-0"
                leave="transition-all duration-150"
                leaveFrom="translate-y-0"
                leaveTo="translate-y-full"
            >
                <div
                    className={` ${width} bg-white rounded-md py-1 px-3 overflow-hidden`}
                >
                    <div className=" flex justify-between items-center border-b border-gray-400/50 py-2">
                        <h1>{title}</h1>
                        <div
                            onClick={() => {
                                setOpen(false);
                                setModel(null);
                            }}
                            className="hover:text-orange-500 relative z-50 text-gray-400 hover:cursor-pointer"
                        >
                            <Close color="inherit" fontSize="inherit" />
                        </div>
                    </div>
                    <div className="py-6">{children}</div>
                    <button
                        onClick={() => setOpen(false)}
                        className="my-3 bg-red-500 py-2 px-3 text-white "
                    >
                        Close
                    </button>
                </div>
            </Transition>
        </div>
    );
}
