import InputText from "@/Components/InputText";
import { Head, usePage } from "@inertiajs/react";

import React from "react";
import Navbar from "./Navbar";

export default function AppLayouts({ children, title, deskription }) {
    return (
        <div className="relative font-fira tracking-tighter leading-tight ">
            <Head title={title} />
            <Navbar />
            <div>{children}</div>
            <p className="relative text-primary">Lorem</p>
        </div>
    );
}
