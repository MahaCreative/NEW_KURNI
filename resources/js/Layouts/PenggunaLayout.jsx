import { Head, Link, usePage } from "@inertiajs/react";
import React from "react";

export default function PenggunaLayout({ children, title }) {
    const { desa } = usePage().props;
    return (
        <div className="w-full h-screen bg-orange-500 relative">
            <Head title={title} />
            {/* Navbar Web*/}
            <div className="w-full flex justify-between items-center border-b border-white/50 absolute z-[5]">
                {/* Logo */}
                <div className="px-4 flex gap-5 items-center py-2">
                    <img
                        src={"/storage/" + desa.logo}
                        className="w-[40px] h-[40px] object-cover"
                    />
                    <h1 className=" font-fira capitalize tracking-tight leading-tight text-white">
                        {"Sistem Informasi " + desa.nama_desa}
                    </h1>
                </div>
                <div className="flex gap-4 items-center justify-around px-8">
                    <Link className="text-[12pt] font-light text-white">
                        Home
                    </Link>
                    <Link className="text-[12pt] font-light text-white">
                        Layanan Suket
                    </Link>
                    <Link className="text-[12pt] font-light text-white">
                        Informasi Penduduk
                    </Link>
                </div>
            </div>
            <div></div>
            <div className="left-0 top-0 w-full h-[100vh] lg:h-screen bg-[url('Image/bg.png')] bg-no-repeat bg-cover md:bg-contain bg-orange-500 bg-right-top">
                <div className="w-full h-[inherit] flex flex-col-reverse justify-center md:flex-row items-center bg-slate-950/10">
                    <div className="px-4 md:px-8 lg:px-16  lg:w-[100%]">
                        <h1 className="capitalize text-4xl lg:text-6xl font-extrabold text-white font-fira leading-none">
                            Aplikasi & Pendataan Warga Desa {desa.nama_desa}
                        </h1>

                        <p className="text-white lg:text-xl font-thin font-fira my-4 2">
                            Selamat datang di sistem informasi pendataan sensus
                            penduduk Desa {desa.nama_desa}. Sistem ini digunakan
                            keperluan sensus penduduk, dan juga pengajuan surat
                            keterangan yang bisa diajukan pada sistem informasi
                            ini.
                        </p>
                    </div>
                    <div className="">
                        <img
                            src="Image/gambat1.png"
                            alt=""
                            className="hidden md:block translate-x-[50%] md:w-[100%] lg:w-[80%] md:translate-x-[-20%] lg:translate-x-[10%]"
                        />
                    </div>
                </div>
            </div>
            {children}
            <div className="relative">
                Selamat datang di sistem informasi pendataan sensus penduduk
            </div>
            {/* Footer */}
            <div className="  w-full h-[500px] bg-cover bg-no-repeat bg-left-top bg-orange-500">
                <div className="w-full h-full  items-center flex pt-80">
                    <div className="w-full h-full">FOOTER</div>
                </div>
            </div>
        </div>
    );
}
