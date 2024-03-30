import React from "react";
import FormPindahKeluar from "./FormPindahKeluar";
import AppLayouts from "@/Layouts/AppLayouts";
import { ArrowBack } from "@mui/icons-material";

export default function FormulirPindahKeluar(props) {
    const penduduk = props.penduduk;
    return (
        <div className="py-16 px-4 md:px-8 lg:px-16">
            <div className="bg-white py-2 px-4 rounded-md flex justify-between items-center my-3">
                <h1 className="font-bold text-2xl text-orange-500 ">
                    Tambah Data Penduduk Keluar
                </h1>
                <button
                    onClick={() => setModalPilihan(true)}
                    className="btn-primary"
                >
                    <div className="text-white text-xl font-extrabold">
                        <ArrowBack color="inherit" fontSize="inherit" />
                    </div>
                    <p>Kembali</p>
                </button>
            </div>
            <FormPindahKeluar model={penduduk} />
        </div>
    );
}
FormulirPindahKeluar.layout = (page) => (
    <AppLayouts children={page} title={"Tambah Penduduk Pindah Keluar"} />
);
