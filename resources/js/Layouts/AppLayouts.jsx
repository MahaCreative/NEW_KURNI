import InputText from "@/Components/InputText";
import { Head, usePage } from "@inertiajs/react";

import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import { Transition } from "@headlessui/react";
import { Close } from "@mui/icons-material";

export default function AppLayouts({ children, title, deskription }) {
    const [open, setOpen] = useState(false);
    const sidebarRef = useRef();
    useEffect(() => {
        let handler = (e) => {
            // if (!sidebarRef.current.contains(e)) {
            //     setOpen(false);
            // }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    });
    return (
        <div className="font-fira tracking-tighter leading-tight min-h-screen overflow-x-hidden bg-orange-500">
            <Head title={title} />

            <div className="relative z-50">
                <Transition
                    show={open}
                    enter="duration-300 ease-in z-10"
                    enterFrom="translate-x-10 opacity-50"
                    enterTo="translate-x-0 opacity-100"
                    leave="duration-300 ease-in"
                    leaveFrom="translate-x-0 opacity-100"
                    leaveTo="translate-x-10 opacity-0"
                >
                    <div
                        ref={sidebarRef}
                        className="bg-orange-500 py-3 px-4  h-screen z-[999] absolute right-0 top-0 w-[90%] md:w-[50%] lg:w-[30%] transisi"
                    >
                        <div
                            onClick={() => setOpen(false)}
                            className="py-2 px-3 text-white text-xl hover:cursor-pointer hover:bg-white hover:text-orange-500 transisi inline-block rounded-md"
                        >
                            <Close color="inherit" fontSize="inherit" />
                        </div>
                        <div>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Rerum aliquam perferendis labore magni,
                            placeat quam aliquid. Quaerat enim ab suscipit quo
                            vel temporibus, ex amet dolorem fuga perspiciatis
                            reprehenderit illum delectus. Quam voluptatum ea at
                            maxime quis repudiandae velit deserunt, alias
                            accusamus fugiat ex error inventore ut ullam.
                            Ratione, repudiandae! Amet perferendis veritatis
                            atque ducimus ipsum cupiditate provident, omnis
                            eligendi hic quibusdam deserunt quo corrupti
                            perspiciatis quia, alias rerum aliquid. Sint unde
                            perspiciatis tempore maxime repudiandae, accusamus
                            placeat velit! Accusantium delectus dolorem iusto
                            quos eum aut corporis deserunt corrupti ipsum,
                            adipisci, mollitia cupiditate laborum esse. Quasi ex
                            sed totam repudiandae!
                        </div>
                    </div>
                </Transition>
            </div>
            <Navbar open={open} setOpen={setOpen} />
            <div>{children}</div>
        </div>
    );
}
