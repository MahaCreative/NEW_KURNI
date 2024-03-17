import { Transition } from "@headlessui/react";
import { Link, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

export default function Navbar() {
    const { desa } = usePage().props;
    const [fixed, setFixed] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 5) {
                setFixed(true);
            } else {
                setFixed(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });
    return (
        <div>
            <div
                className={`${
                    fixed
                        ? "fixed top-0 left-0 z-50 from-slate-950/80 via-slate-900/80 to-slate-800/80 backdrop-blur-sm"
                        : "relative from-slate-950 via-slate-900 to-slate-800 backdrop-blur-none"
                } w-full bg-gradient-to-br transisi`}
            >
                <div className=" flex justify-between items-center text-white transisi px-8 md:px-16 lg:px-24 py-3">
                    {/* logo */}
                    <div className="flex gap-3 items-center font-semibold">
                        <img
                            src={"/storage/" + desa.logo}
                            alt=""
                            className="w-[30px] h-[30px] object-cover object-center"
                        />
                        <h1>{desa.nama_desa}</h1>
                    </div>
                    <div className="flex gap-7 text-sm font-light">
                        <Link>Desa</Link>
                        <Link>Home</Link>
                        <Link>Home</Link>
                        <Link>Home</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
