import React from "react";
import Form from "./Form";
import AppLayouts from "@/Layouts/AppLayouts";
import { ArrowBack } from "@mui/icons-material";
import { Link } from "@inertiajs/react";

export default function Index(props) {
    return (
        <div className="px-4 md:px-8 lg:px-16 transisi py-16">
            <div className="bg-white py-2 px-4 rounded-md flex justify-between items-center">
                <h1 className="font-bold text-2xl text-orange-500 ">
                    Profile Desa
                </h1>
                <Link href={route("dashboard")} className="btn-primary">
                    <div className="text-white text-xl font-extrabold">
                        <ArrowBack color="inherit" fontSize="inherit" />
                    </div>
                    <p>Kembali</p>
                </Link>
            </div>
            <div className="py-">
                <Form />
            </div>
        </div>
    );
}

Index.layout = (page) => <AppLayouts children={page} title={"Profil Desa"} />;
