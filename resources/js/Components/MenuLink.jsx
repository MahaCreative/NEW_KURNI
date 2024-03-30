import { Link } from "@inertiajs/react";
import React from "react";

export default function MenuLink({ icon, title, active, ...props }) {
    return (
        <Link
            {...props}
            as="div"
            className={`w-full flex gap-4 items-center hover:cursor-pointer hover:bg-orange-900 ${
                active ? "bg-orange-900" : ""
            } py-1.5 px-4 rounded-md transisi`}
        >
            <div className="text-white text-xl">{icon}</div>
            <p className="text-md text-white font-light">{title}</p>
        </Link>
    );
}
