import { Transition } from "@headlessui/react";
import { Link, usePage } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Form from "@/Pages/User/Form";
import Modal from "@/Components/Modal";
import Profile from "@/Pages/Profile";
export default function Navbar({ open, setOpen }) {
    const { desa } = usePage().props;
    const [profile, setProfile] = useState(false);
    const profileRef = useRef();
    const { auth } = usePage().props;
    useEffect(() => {
        const profileHandler = (e) => {
            if (!profileRef.current.contains(e.target)) {
                setProfile(false);
            }
        };

        document.addEventListener("mousedown", profileHandler);
        return () => [
            document.removeEventListener("mousedown", profileHandler),
        ];
    });
    const [model, setModel] = useState(false);
    const [modalTambah, setModalTambah] = useState(false);
    const editProfile = () => {
        setModel({
            ...model,
            id: auth.user.id,
            name: auth.user.name,
            email: auth.user.email,

            alamat: auth.user.alamat,
            telp: auth.user.telp,
            jabatan: auth.user.jabatan,
            dusun: auth.user.dusun,
            foto: auth.user.foto,
        });
        setModalTambah(true);
    };

    return (
        <div>
            <Modal
                open={modalTambah}
                setModel={setModel}
                setOpen={setModalTambah}
                title={"Tambah Data User"}
            >
                <Profile
                    model={model}
                    setModel={setModel}
                    setOpen={setModalTambah}
                />
            </Modal>
            <div className={`  w-full `}>
                <div className=" flex justify-between items-center text-white transisi px-2 md:px-4 lg:px-8 border-b border-white/50">
                    {/* logo */}
                    <div className="flex gap-3 items-center font-semibold ">
                        <img
                            src={"/storage/" + desa.logo}
                            alt=""
                            className="w-[30px] h-[30px] object-cover object-center"
                        />
                        <h1>{desa.nama_desa}</h1>
                    </div>
                    {/* menu and logo user */}
                    <div className="flex gap-7 items-center  font-light text-xl">
                        <div className={` py-3 transisi`}>
                            <div
                                onClick={() => setProfile(!profile)}
                                className=" hover:cursor-pointer text-slate-950 px-4 flex gap-4 items-center"
                            >
                                <img
                                    src={"/storage/" + auth.user.foto}
                                    alt=""
                                    className="h-[40px] w-[40px] object-cover object-center rounded-full"
                                />
                                <p className="text-white font-normal">
                                    {" "}
                                    {auth.user?.name}
                                </p>
                            </div>
                            <div
                                ref={profileRef}
                                className="py-2 px-4 relative -bottom-22 left-0 z-[999]"
                            >
                                <Transition
                                    show={profile}
                                    enter="duration-300 ease-out"
                                    enterFrom="translate-y-5 opacity-50"
                                    enterTo="translate-y-2 opacity-100"
                                    leave="duration-300 ease-in-out"
                                    leaveFrom="translate-y-0 opacity-100"
                                    leaveTo="translate-y-5 opacity-0"
                                >
                                    <div className="bg-white text-slate-950 px-3 py-2 rounded-md absolute z-[999999]">
                                        <button
                                            onClick={() => editProfile()}
                                            className="text-base hover:cursor-pointer hover:text-white hover:bg-orange-600 block px-2 py-2 rounded-md"
                                            as="div"
                                        >
                                            Setting profile
                                        </button>
                                        <Link
                                            href={route("logout")}
                                            className="text-base hover:cursor-pointer hover:text-white hover:bg-orange-600 block px-2 py-2 rounded-md"
                                        >
                                            Logout
                                        </Link>
                                    </div>
                                </Transition>
                            </div>
                        </div>

                        <div
                            onClick={() => setOpen(!open)}
                            className="hover:cursor-pointer"
                        >
                            <MenuIcon color="inherit" fontSize="inherit" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
