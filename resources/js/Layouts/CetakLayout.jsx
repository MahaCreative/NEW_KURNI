import { Head, usePage } from "@inertiajs/react";
import React from "react";

export default function CetakLayout({ props, children, title }) {
    const { desa } = usePage().props;
    return (
        <div className="leading-tight ">
            <Head title={title} />
            <div className="w-full flex justify-center  ">
                <div className="flex gap-3 border-b-2 justify-center border-black py-3 items-center w-full">
                    <img
                        src={"/storage/" + desa.logo}
                        alt=""
                        className="w-[100px] h-[100px] mr-16"
                    />
                    <div className=" text-center">
                        <h1 className="font-bold text-xl leading-none uppercase">
                            PEMERINTAH KABUPATEN MAMUJU
                        </h1>
                        <h2 className="text-xl font-bold leading-none uppercase">
                            KECAMATAN {desa.nama_kecamatan}
                        </h2>
                        <h2 className="text-lg font-semibold leading-none uppercase">
                            Kantor Desa {desa.nama_desa}
                        </h2>
                        <p className="text-sm font-light italic capitalize">
                            {desa.alamat}
                        </p>
                    </div>
                    <img
                        src={"/storage/" + desa.logo}
                        alt=""
                        className="w-[100px] h-[100px] ml-16"
                    />
                </div>
            </div>
            <div className="px-16">
                <p className="font-bold text-xl uppercase text-center my-3">
                    {title}
                </p>
                {children}
            </div>

            <div className="w-full flex justify-end px-16 py-3">
                <div>
                    <p>{desa.nama_kabupaten + " , ...................."}</p>
                    <p className="uppercase">Kepala Desa {desa.nama_desa}</p>
                    <p className="uppercase mt-16 font-bold">
                        {desa.nama_kepala_desa}
                    </p>
                </div>
            </div>
        </div>
    );
}
