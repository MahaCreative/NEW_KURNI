import InputText from "@/Components/InputText";
import { Head, Link, usePage } from "@inertiajs/react";

import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import { Transition } from "@headlessui/react";
import {
    ChildCareSharp,
    Close,
    Dashboard,
    DeviceThermostatSharp,
    Group,
    GroupAdd,
    Home,
    LocationCity,
    MapsHomeWork,
    MoveUp,
    PictureAsPdf,
} from "@mui/icons-material";
import MenuLink from "@/Components/MenuLink";
import toast, { Toaster } from "react-hot-toast";

export default function AppLayouts({ children, title, deskription }) {
    const [open, setOpen] = useState(false);
    const [audioSrc, setAudioSrc] = useState("");
    const { flash } = usePage().props;
    const { desa } = usePage().props;
    const { auth } = usePage().props;
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
    const audioRef = useRef();
    useEffect(() => {
        flash.type && toast[flash.type](flash.message);
        setTimeout(() => {
            if (flash.type == "success") {
                setAudioSrc("Audio/success.mp3");
                if (audioSrc && audioRef.current) {
                    audioRef.current.play(); // Memulai pemutaran audio
                }
            } else {
                setAudioSrc("Audio/errors.mp3");
                if (audioSrc && audioRef.current) {
                    audioRef.current.play(); // Memulai pemutaran audio
                }
            }
        }, 350);
        return () => {
            if (audioRef.current) {
                audioRef.current.pause(); // Menghentikan pemutaran audio
                audioRef.current.currentTime = 0; // Mengatur ulang waktu audio ke awal
            }
        };
    }, [flash]);
    console.log(flash);
    return (
        <div className="font-fira tracking-tighter leading-tight min-h-screen overflow-x-hidden bg-orange-500 relative text-xs">
            <Toaster />
            {flash.type !== null && (
                <audio preload="auto" ref={audioRef} src={audioSrc} />
            )}

            <Head title={title} />

            <div className="">
                <Transition
                    show={open}
                    enter="duration-300 ease-in  "
                    enterFrom="translate-x-10 opacity-50"
                    enterTo="translate-x-0 opacity-100 fixed w-full z-[888]"
                    leave="duration-300 ease-in"
                    leaveFrom="translate-x-0 opacity-100 z-[888]"
                    leaveTo="translate-x-10 opacity-0 z-[888]"
                >
                    <div
                        ref={sidebarRef}
                        className="bg-gradient-to-br from-orange-500/70 via-orange-600/50 to-orange-700/50 backdrop-blur-sm py-3 px-4 right-0 top-0 w-[90%] md:w-[50%] lg:w-[30%] transisi border-l border-white/50 shadow-sm shadow-gray-500/50 h-screen fixed z-[99]"
                    >
                        <div
                            onClick={() => setOpen(false)}
                            className="py-1 px-3 text-white text-xl hover:cursor-pointer hover:bg-white hover:text-orange-500 transisi inline-block rounded-md"
                        >
                            <Close color="inherit" fontSize="inherit" />
                        </div>
                        <div>
                            <div className="w-full flex items-center justify-center my-2">
                                <div className="">
                                    <img
                                        src={"/storage/" + desa.logo}
                                        alt=""
                                        className="w-[60px] h-[60px] object-cover"
                                    />
                                    <div className="text-center mt-2 font-semibold text-xl text-white">
                                        {desa.nama_desa}
                                    </div>
                                </div>
                            </div>

                            <MenuLink
                                href={route("dashboard")}
                                icon={
                                    <Dashboard
                                        color="inherit"
                                        fontSize="inherit"
                                    />
                                }
                                title={"Dashboard"}
                            />
                            <MenuLink
                                href={route("home")}
                                icon={
                                    <Home color="inherit" fontSize="inherit" />
                                }
                                title={"Beranda"}
                            />
                            <div className="p-1 w-full border-b border-white/50"></div>
                            <div className="px-3 ">
                                <h1 className="text-lg font-medium text-orange-950">
                                    Menu Kelola Data
                                </h1>
                            </div>
                            {auth.roles == "kepala desa" && (
                                <>
                                    <MenuLink
                                        active={route().current("user")}
                                        href={route("user")}
                                        icon={
                                            <LocationCity
                                                color="inherit"
                                                fontSize="inherit"
                                            />
                                        }
                                        title={"Kelola User"}
                                    />
                                    <MenuLink
                                        active={route().current("desa")}
                                        href={route("desa")}
                                        icon={
                                            <LocationCity
                                                color="inherit"
                                                fontSize="inherit"
                                            />
                                        }
                                        title={"Profil Desa"}
                                    />
                                    <MenuLink
                                        active={route().current("dusun")}
                                        href={route("dusun")}
                                        icon={
                                            <MapsHomeWork
                                                color="inherit"
                                                fontSize="inherit"
                                            />
                                        }
                                        title={"Kelola Dusun"}
                                    />
                                </>
                            )}
                            {auth.roles == "sekretaris desa" && (
                                <>
                                    <MenuLink
                                        active={route().current("user")}
                                        href={route("user")}
                                        icon={
                                            <LocationCity
                                                color="inherit"
                                                fontSize="inherit"
                                            />
                                        }
                                        title={"Kelola User"}
                                    />
                                    <MenuLink
                                        active={route().current("desa")}
                                        href={route("desa")}
                                        icon={
                                            <LocationCity
                                                color="inherit"
                                                fontSize="inherit"
                                            />
                                        }
                                        title={"Profil Desa"}
                                    />
                                    <MenuLink
                                        active={route().current("dusun")}
                                        href={route("dusun")}
                                        icon={
                                            <MapsHomeWork
                                                color="inherit"
                                                fontSize="inherit"
                                            />
                                        }
                                        title={"Kelola Dusun"}
                                    />
                                </>
                            )}

                            <MenuLink
                                active={route().current("penduduk")}
                                href={route("penduduk")}
                                icon={
                                    <Group color="inherit" fontSize="inherit" />
                                }
                                title={"Kelola Penduduk"}
                            />
                            <MenuLink
                                active={route().current("data-kartu-keluarga")}
                                href={route("data-kartu-keluarga")}
                                icon={
                                    <GroupAdd
                                        color="inherit"
                                        fontSize="inherit"
                                    />
                                }
                                title={"Data Kartu Keluarga"}
                            />
                            <MenuLink
                                active={route().current("kelahiran")}
                                href={route("kelahiran")}
                                icon={
                                    <ChildCareSharp
                                        color="inherit"
                                        fontSize="inherit"
                                    />
                                }
                                title={"Kelola Kelahiran"}
                            />
                            <MenuLink
                                active={route().current("kematian")}
                                href={route("kematian")}
                                icon={
                                    <DeviceThermostatSharp
                                        color="inherit"
                                        fontSize="inherit"
                                    />
                                }
                                title={"Kelola Kematian"}
                            />
                            <MenuLink
                                active={route().current("pindah")}
                                href={route("pindah")}
                                icon={
                                    <MoveUp
                                        color="inherit"
                                        fontSize="inherit"
                                    />
                                }
                                title={"Kelola Data Pindah"}
                            />
                            <div className="p-1 w-full border-b border-white/50"></div>
                        </div>
                    </div>
                </Transition>
            </div>
            <Navbar open={open} setOpen={setOpen} />
            <div>{children}</div>
        </div>
    );
}
