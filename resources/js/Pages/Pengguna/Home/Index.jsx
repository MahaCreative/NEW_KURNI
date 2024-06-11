import FormKelahiran from "./FormKelahiran";
import FormKematian from "./FormKematian";
import FormPindahKeluar from "./FormPindahKeluar";
import FormPindahMasuk from "./FormPindahMasuk";
import { Head, Link, usePage } from "@inertiajs/react";
import Menu from "@mui/icons-material/Menu";
import { MenuItem, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import Grafik from "./Grafik";
import Modal from "@/Components/Modal";
import Login from "@/Pages/Login";

export default function PenggunaLayout({ children, title }) {
    const { desa } = usePage().props;
    const { auth } = usePage().props;
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuSuket, setMenuSuket] = useState({ status: false, menu: "" });
    const [login, setLogin] = useState(false);
    const [loading, setLoading] = useState(false);
    const pilihMenu = (menu) => {
        if (menuSuket.status == true) {
            setMenuSuket({ ...menuSuket, status: false, menu: "" });
        } else {
            setMenuSuket({ ...menuSuket, status: true, menu: menu });
        }
    };
    const getLoading = (value) => {
        setTimeout(() => {
            setLoading(value);
        }, 350);
    };
    const [kategoriPindah, setKategoriPindah] = useState("masuk");
    const [formPindah, setFormPindah] = useState(false);
    const kategoriHandler = (e) => {
        if (e.target.value == "") {
            setFormPindah(false);
        } else {
            setFormPindah(true);
            setKategoriPindah(e.target.value);
        }
    };
    const pelayananRef = useRef(null);
    const grafikRef = useRef(null);
    const homeRef = useRef(null);
    const scrollPage = (page) => {
        if (page == "home") {
            homeRef.current.scrollIntoView({ behavior: "smooth" });
        }
        if (page == "layanan") {
            pelayananRef.current.scrollIntoView({ behavior: "smooth" });
        }
        if (page == "statistik") {
            grafikRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };
    return (
        <div className="w-full h-screen bg-orange-500 relative">
            <Head title={title} />
            <Modal open={login} setOpen={setLogin} title={"Login Admin"}>
                <Login />
            </Modal>
            <div
                className={`${
                    loading ? "" : "hidden"
                } top-0 left-0 w-full h-screen fixed bg-slate-950/30 flex flex-col items-center justify-center z-[9999]`}
            >
                <img src="Image/loading.gif" alt="" />
                <p className="text-xl text-white font-light animate-pulse font-fira">
                    Loading
                </p>
            </div>
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
                <div className="hidden md:flex gap-4 items-center justify-around px-8 ">
                    <button
                        onClick={() => scrollPage("home")}
                        className={` text-[12pt] font-light  border-b border-orange-500 py-1 text-orange-500`}
                    >
                        Home
                    </button>
                    <button
                        onClick={() => scrollPage("layanan")}
                        className={` text-[12pt] font-light text-white`}
                    >
                        Layanan Suket
                    </button>
                    <button
                        onClick={() => scrollPage("statistik")}
                        className={` text-[12pt] font-light text-white`}
                    >
                        Informasi Penduduk
                    </button>
                    {auth.user ? (
                        <>
                            <Link
                                as="button"
                                href={route("dashboard")}
                                onClick={() => setLogin(true)}
                                className={` text-[12pt] font-light text-white bg-orange-500  px-4 rounded-md shadow-sm`}
                            >
                                Dashboard
                            </Link>
                            <Link
                                href={route("logout")}
                                className="text-base hover:cursor-pointer text-white hover:bg-orange-600 block px-2 py-2 rounded-md"
                            >
                                Logout
                            </Link>
                        </>
                    ) : (
                        <button
                            onClick={() => setLogin(true)}
                            className={` text-[12pt] font-light text-white bg-orange-500  px-4 rounded-md shadow-sm`}
                        >
                            Login
                        </button>
                    )}
                </div>
                <div
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="block md:hidden text-white hover:cursor-pointer px-4 hover:text-orange-500"
                >
                    <Menu color="inherit" fontSize="medium" />
                </div>
            </div>
            {/* Mobile Nafbar */}
            <div
                className={`${
                    menuOpen ? "flex" : "hidden"
                } w-full gap-4 items-center justify-around px-8 bg-none z-[5] absolute left-0 top-16 bg-white/50 backdrop-blur-sm`}
            >
                <button
                    onClick={() => scrollPage("home")}
                    className={` text-[12pt] font-light  border-b border-orange-500 py-1 text-orange-500`}
                >
                    Home
                </button>
                <button
                    onClick={() => scrollPage("layanan")}
                    className={` text-[12pt] font-light text-white`}
                >
                    Layanan Suket
                </button>
                <button
                    onClick={() => scrollPage("statistik")}
                    className={` text-[12pt] font-light text-white`}
                >
                    Informasi Penduduk
                </button>
                <button
                    onClick={() => setLogin(true)}
                    className={` text-[12pt] font-light text-white bg-orange-500  px-4 rounded-md shadow-sm`}
                >
                    Login
                </button>
            </div>

            <div
                ref={homeRef}
                className="left-0 top-0 w-full h-[100vh] lg:h-screen bg-[url('Image/bg.png')] bg-no-repeat bg-cover md:bg-contain bg-orange-500 bg-right-top"
            >
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
            {/* Pelayanan yah */}
            <div
                ref={pelayananRef}
                className="relative bg-orange-500 px-4 md:px-8 lg:px-16"
            >
                <div className="w-full flex flex-col justify-center items-center py-16">
                    <h1 className="text-white font-fira text-4xl tracking-tighter font-bold">
                        Pelayanan Surat Keterangan
                    </h1>
                    <p className="text-sm text-white">
                        Silahkan memilih menu dibawah ini untuk melakukan
                        pelayanan surat keterangan yang diinginkan. dan silahkan
                        mengisi formulir yang ada dengan benar.
                    </p>
                    <div className="flex flex-col gap-8 md:flex-row justify-around w-full py-9">
                        <div className="bg-white py-3 px-4 rounded-tl-3xl rounded-br-3xl hover:cursor-pointer ">
                            <p className="text-xl text-orange-500 tracking-tighter font-semibold mb-7">
                                Pengajuan Surat Keterangan Lahir
                            </p>
                            <div className="flex items-center justify-center">
                                <img
                                    src="Image/gambat1.png"
                                    alt=""
                                    className="w-[100px]"
                                />
                            </div>
                            <div
                                onClick={() =>
                                    pilihMenu("menu surat kelahiran")
                                }
                                className="text-white bg-gradient-to-br from-orange-600 via-orange-600 to-orange-400 rounded-md flex items-center justify-center mt-6 hover:cursor-pointer"
                            >
                                {menuSuket.menu == "menu surat kelahiran"
                                    ? "Cancell"
                                    : "Klick Disini"}
                            </div>
                        </div>
                        <div className="bg-white py-3 px-4 rounded-tl-3xl rounded-br-3xl hover:cursor-pointer ">
                            <p className="text-xl text-orange-500 tracking-tighter font-semibold mb-7">
                                Pengajuan Surat Keterangan Kematian
                            </p>
                            <div className="flex items-center justify-center">
                                <img
                                    src="Image/gambat1.png"
                                    alt=""
                                    className="w-[100px]"
                                />
                            </div>
                            <div
                                onClick={() => pilihMenu("menu surat kematian")}
                                className="text-white bg-gradient-to-br from-orange-600 via-orange-600 to-orange-400 rounded-md flex items-center justify-center mt-6 hover:cursor-pointer"
                            >
                                {menuSuket.menu == "menu surat kematian"
                                    ? "Cancell"
                                    : "Klick Disini"}
                            </div>
                        </div>
                        <div className="bg-white py-3 px-4 rounded-tl-3xl rounded-br-3xl hover:cursor-pointer ">
                            <p className="text-xl text-orange-500 tracking-tighter font-semibold mb-7">
                                Pengajuan Surat Keterangan Pindah Domisili
                            </p>
                            <div className="flex items-center justify-center">
                                <img
                                    src="Image/gambat1.png"
                                    alt=""
                                    className="w-[100px]"
                                />
                            </div>
                            <div
                                onClick={() =>
                                    pilihMenu("menu surat pindah domisili")
                                }
                                className="text-white bg-gradient-to-br from-orange-600 via-orange-600 to-orange-400 rounded-md flex items-center justify-center mt-6 hover:cursor-pointer"
                            >
                                {menuSuket.menu == "menu surat pindah domisili"
                                    ? "Cancell"
                                    : "Klick Disini"}
                            </div>
                        </div>
                    </div>
                    <div
                        className={`${
                            menuSuket.status == false ? "hidden" : ""
                        } bg-white px-4 md:px-8 lg:px-16 w-full rounded-lg`}
                    >
                        {menuSuket.menu == "menu surat kelahiran" && (
                            <div
                                className={` py-6 flex flex-col md:flex-row gap-3`}
                            >
                                <FormKelahiran getLoading={getLoading} />

                                <div className="w-full md:w-1/2 bg-gray-200 py-2 px-3 rounded-md inline">
                                    <h1 className="text-orange-500 font-medium">
                                        Persyaratan Untuk Mengajukan Surat
                                        Keterangan Lahir
                                    </h1>
                                    <p className="text-sm text-orange-800 my-3">
                                        Hy selamat atas kelahiran anak anda,
                                        Kami turut senang dengan kelahiran anak
                                        anda 😊😊😊.
                                    </p>
                                    <p className="text-xs text-orange-800 my-2">
                                        Untuk dapat membuat surat keterangan
                                        lahir, anda perlu mengisi formulir serta
                                        melampirkan persyaratan berkas. Setelah
                                        formulir dan berkas telah diisi, maka
                                        petugas desa akan mengkonfirmasi
                                        permintaan anda. Jika permintaan anda
                                        telah diterima maka anda akan
                                        mendapatkan email, berisi Link surat
                                        keterangan lahir anak anda
                                    </p>
                                    <p className="text-md text-orange-500 my-2">
                                        Daftar Berkas Yang Perlu Anda Siapkan
                                    </p>
                                    <ul className="list-disc mx-4">
                                        <li className="text-xs">
                                            Foto Surat Pernyataan Lahir Dari
                                            Rumah Sakit Jika Ada
                                        </li>
                                        <li className="text-xs">
                                            Foto Kartu Keluarga yang
                                            Bersangkutan Sakit{" "}
                                        </li>
                                        <li className="text-xs">
                                            Foto KTP Orang Tua
                                        </li>
                                        <li className="text-xs">
                                            Mengisi Formulir Data Kelahiran
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}
                        {menuSuket.menu == "menu surat kematian" && (
                            <div
                                className={` py-6 flex flex-col md:flex-row gap-3 bg-white`}
                            >
                                <FormKematian getLoading={getLoading} />

                                <div className="w-full md:w-1/2 bg-gray-200 py-2 px-3 rounded-md inline">
                                    <h1 className="text-orange-500 font-medium">
                                        Persyaratan Untuk Mengajukan Surat
                                        Keterangan Kematian
                                    </h1>
                                    <p className="text-sm text-orange-800 my-3">
                                        Kami Turut Berduka Cita atas Kepergian
                                        Keluarga Anda 😭😭😢.
                                    </p>
                                    <p className="text-xs text-orange-800 my-2">
                                        Untuk dapat membuat surat keterangan
                                        kematian, anda perlu mengisi formulir
                                        serta melampirkan persyaratan berkas.
                                        Setelah formulir dan berkas telah diisi,
                                        maka petugas desa akan mengkonfirmasi
                                        permintaan anda. Jika permintaan anda
                                        telah diterima maka anda akan
                                        mendapatkan email, berisi Link surat
                                        keterangan Kematian
                                    </p>
                                    <p className="text-md text-orange-500 my-2">
                                        Daftar Berkas Yang Perlu Anda Siapkan
                                    </p>
                                    <ul className="list-disc mx-4">
                                        <li className="text-xs">
                                            Foto Kartu Keluarga yang
                                            Bersangkutan
                                        </li>
                                        <li className="text-xs">
                                            Foto KTP (Jika Ada)
                                        </li>
                                        <li className="text-xs">
                                            Mengisi Formulir Data Kelahiran
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}
                        {menuSuket.menu == "menu surat pindah domisili" && (
                            <div
                                className={` py-6 flex flex-col md:flex-row gap-3 bg-white`}
                            >
                                <div>
                                    <TextField
                                        className="w-full"
                                        id="outlined-select-currency"
                                        select
                                        label="Kategori Pindah"
                                        name="kategoriPindah"
                                        value={kategoriPindah}
                                        onChange={(e) => kategoriHandler(e)}
                                    >
                                        <MenuItem value="">
                                            Pilih Perpindahan Penduduk
                                        </MenuItem>
                                        <MenuItem value="keluar">
                                            Pindah Keluar
                                        </MenuItem>
                                        <MenuItem value="masuk">
                                            Pindah Masuk
                                        </MenuItem>
                                    </TextField>
                                    {formPindah && kategoriPindah == "masuk" ? (
                                        <FormPindahMasuk
                                            getLoading={getLoading}
                                        />
                                    ) : (
                                        <FormPindahKeluar
                                            getLoading={getLoading}
                                        />
                                    )}
                                </div>

                                <div className="w-full md:w-1/2 bg-gray-200 py-2 px-3 rounded-md inline">
                                    <h1 className="text-orange-500 font-medium">
                                        Persyaratan Untuk Mengajukan Surat
                                        Keterangan Pindah Domisili
                                    </h1>

                                    <p className="text-xs text-orange-800 my-2">
                                        Untuk dapat membuat surat keterangan
                                        pindah domisili, anda perlu mengisi
                                        formulir serta melampirkan persyaratan
                                        berkas. Setelah formulir dan berkas
                                        telah diisi, maka petugas desa akan
                                        mengkonfirmasi permintaan anda. Jika
                                        permintaan anda telah diterima maka anda
                                        akan mendapatkan email, berisi Link
                                        surat keterangan Pindah Domisili
                                    </p>
                                    <p className="text-md text-orange-500 my-2">
                                        Daftar Berkas Yang Perlu Anda Siapkan
                                    </p>
                                    <ul className="list-disc mx-4">
                                        <li className="text-xs">
                                            Foto Kartu Keluarga yang
                                            Bersangkutan
                                        </li>
                                        <li className="text-xs">
                                            Foto KTP (Jika Ada)
                                        </li>
                                        <li className="text-xs">
                                            Mengisi Formulir Pindah Domisili
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div ref={grafikRef} className="bg-orange-500">
                <div className="w-full flex justify-center items-center text-center py-16">
                    <h1 className="capitalize text-xl lg:text-4xl font-extrabold text-white font-fira leading-none">
                        Informasi Statistik Penduduk Desa {desa.nama_desa}
                    </h1>
                </div>
                <Grafik />
            </div>
            {/* Footer */}
            <div className="  w-full bg-cover bg-no-repeat bg-left-top bg-orange-500 px-4 md:px-8 lg:px-16">
                <div className="w-full h-full  flex justify-around items-start">
                    <div className="">
                        <div className="text-white">
                            <h1 className="text-white text-xl font-bold border-b-2 border-white my-5">
                                Profile Desa{" "}
                            </h1>
                            <div className="flex flex-col gap-3">
                                <h1 className="text-md font-light">
                                    {desa.nama_desa}
                                </h1>
                                <p>
                                    Nama Kepala Desa : {desa.nama_kepala_desa}
                                </p>

                                <p>Kabupaten : {desa.nama_kabupaten}</p>
                                <p>Kecamatan : {desa.nama_kecamatan}</p>
                                <p>Alamat : {desa.alamat}</p>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <h1 className="text-white text-xl font-bold border-b-2 border-white my-5">
                            Profile Desa{" "}
                        </h1>
                        <div className="felx flex-col gap-3">
                            <button
                                onClick={() => scrollPage("home")}
                                className={`block text-[12pt] font-light  border-b border-orange-500 py-1 text-white`}
                            >
                                Home
                            </button>
                            <button
                                onClick={() => scrollPage("layanan")}
                                className={`block text-[12pt] font-light text-white`}
                            >
                                Layanan Suket
                            </button>
                            <button
                                onClick={() => scrollPage("statistik")}
                                className={`block text-[12pt] font-light text-white`}
                            >
                                Informasi Penduduk
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
