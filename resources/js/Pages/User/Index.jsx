import Modal from "@/Components/Modal";
import AppLayouts from "@/Layouts/AppLayouts";
import { Link } from "@inertiajs/react";
import { Add, Cancel, Check, Delete, Edit } from "@mui/icons-material";
import React, { useState } from "react";
import Form from "./Form";
import DataTable from "react-data-table-component";
import { Tooltip } from "@mui/material";

export default function Index(props) {
    const user = props.user;
    const [modalTambah, setModalTambah] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [model, setModel] = useState(null);
    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: "60px",
        },
        {
            name: "Nama Lengkap",
            selector: (row) => row.name,
        },
        {
            name: "Email",
            selector: (row) => row.email,
        },
        {
            name: "Nomor Telp",
            selector: (row) => row.telp,
        },
        {
            name: "Alamat",
            selector: (row) => row.alamat,
        },
        {
            name: "jabatan",
            selector: (row) => row.jabatan,
        },
        {
            name: "Menjabat Dusun",
            selector: (row) => row.dusun,
        },
        {
            name: "Image",
            selector: (row) => (
                <a target="_blank" href={"/storage/" + row.foto}>
                    <img
                        src={"/storage/" + row.foto}
                        className="w-[60px] h-[60px] object-cover"
                    />
                </a>
            ),
        },
        {
            name: "aksi",
            selector: (row) => (
                <div className="flex gap-1 items-center">
                    <Tooltip title="Edit User">
                        <button
                            onClick={() => editHandler(row)}
                            className="btn-second"
                        >
                            <Edit color="inherit" fontSize="small" />
                        </button>
                    </Tooltip>
                    <Tooltip title="Delete User">
                        <button
                            onClick={() => deleteHandler(row)}
                            className="btn-danger"
                        >
                            <Delete color="inherit" fontSize="small" />
                        </button>
                    </Tooltip>
                </div>
            ),
        },
    ];
    const deleteHandler = (row) => {
        setModel(row);
        setModalDelete(true);
    };
    const editHandler = (row) => {
        setModalTambah(true);
        setModel(row);
    };
    return (
        <div className="py-16 px-4 md:px-8 lg:px-16">
            <div>
                <Modal
                    open={modalTambah}
                    setModel={setModel}
                    setOpen={setModalTambah}
                    title={"Tambah Data User"}
                >
                    <Form
                        model={model}
                        setModel={setModel}
                        setOpen={setModalTambah}
                    />
                </Modal>
                <Modal
                    open={modalDelete}
                    setOpen={setModalDelete}
                    setModel={setModel}
                    title={"Warning Delete Data"}
                >
                    <div className="w-[50vw]">
                        <p>
                            Yakin ingin menghapus data ini? menghapus data ini
                            akan menghapus data yang terkait lainnya
                        </p>
                        <div className="flex gap-3 py-4">
                            <Link
                                as="button"
                                method="delete"
                                href={route("delete-user", {
                                    id: model?.id,
                                })}
                                onSuccess={() => {
                                    setModel(null);
                                    setModalDelete(false);
                                }}
                                className="btn-primary"
                            >
                                <div className="text-white text-xl">
                                    <Check color="inherit" fontSize="inherit" />
                                </div>
                                <p>Yakin</p>
                            </Link>
                            <button
                                onClick={() => {
                                    setModel(null);
                                    setModalDelete(false);
                                }}
                                className="btn-danger"
                            >
                                <div className="text-white text-xl">
                                    <Cancel
                                        color="inherit"
                                        fontSize="inherit"
                                    />
                                </div>
                                <p>Cancell</p>
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
            <div className="bg-white py-2 px-4 rounded-md flex justify-between items-center my-3">
                <h1 className="font-bold text-2xl text-orange-500 ">
                    Data Pindahan Penduduk
                </h1>
                <div className="flex gap-4">
                    <button
                        onClick={() => setModalTambah(true)}
                        className="btn-primary"
                    >
                        <div className="text-white text-xl font-extrabold">
                            <Add color="inherit" fontSize="inherit" />
                        </div>
                        <p>Tambah</p>
                    </button>
                </div>
            </div>
            <div className="my-3 rounded-md">
                <DataTable data={user} columns={columns} />
            </div>
        </div>
    );
}

Index.layout = (page) => <AppLayouts children={page} title={"Kelola User"} />;
