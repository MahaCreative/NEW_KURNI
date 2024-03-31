import PenggunaLayout from "@/Layouts/PenggunaLayout";
import React from "react";
import Grafik from "./Grafik";

export default function Index() {
    return (
        <div className="bg-orange-500">
            <h1 className="text-white font-bold text-3xl px-2 md:px-4 lg:px-8 py-6 font-fira tracking-tighter">
                Informasi Statistik Penduduk
            </h1>
            <Grafik />
        </div>
    );
}

Index.layout = (page) => <PenggunaLayout children={page} title="Beranda" />;
