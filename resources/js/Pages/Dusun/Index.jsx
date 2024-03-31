import Modal from "@/Components/Modal";
import AppLayouts from "@/Layouts/AppLayouts";
import {
    Add,
    Cancel,
    Check,
    Checklist,
    Delete,
    Edit,
} from "@mui/icons-material";
import { data } from "autoprefixer";
import React from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import Form from "./Form";
import { Link } from "@inertiajs/react";

export default function Index(props) {
    const dusun = props.dusun;
    const [modalTambah, setModalTambah] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [model, setModel] = useState();
    const columns = [
        {
            name: "#",
            selector: (rown, index) => index + 1,
            width: "60px",
        },
        {
            name: "Nama Dusun",
            selector: (row) => row.nama,
            sortable: true,
        },
        {
            name: "Aksi",
            selector: (row) => (
                <div className="flex gap-4 items-center">
                    <button
                        onClick={() => editHandler(row)}
                        className="btn-second"
                    >
                        <span className="text-white text-m">
                            <Edit color="inherit" fontSize="inherit" />
                        </span>
                        <p>Edit</p>
                    </button>
                    <button
                        onClick={() => deleteHandler(row)}
                        className="btn-danger"
                    >
                        <span className="text-white text-m">
                            <Delete color="inherit" fontSize="inherit" />
                        </span>
                        <p>Delete</p>
                    </button>
                </div>
            ),
        },
    ];

    const editHandler = (value) => {
        setModalTambah(true);
        setModel(value);
    };
    const deleteHandler = (value) => {
        setModel(value);
        setModalDelete(true);
    };

    return (
        <div className="px-4 md:px-8 lg:px-16 transisi py-8">
            {/* Modal */}
            <div>
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
                                href={route("delete.dusun", { id: model?.id })}
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
                <Modal
                    open={modalTambah}
                    setOpen={setModalTambah}
                    setModel={setModel}
                    title={model ? "Update Dusun" : "Tambah Dusun"}
                >
                    <Form
                        model={model}
                        setModel={setModel}
                        setOpen={setModalTambah}
                    />
                </Modal>
            </div>
            <div className="bg-white py-2 px-4 rounded-md flex justify-between items-center">
                <h1 className="font-bold text-2xl text-orange-500 ">Dusun</h1>
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
            <div className="bg-white py-2 px-4 rounded-md  my-6">
                <DataTable data={dusun} columns={columns} striped dense />
            </div>
        </div>
    );
}

Index.layout = (page) => <AppLayouts children={page} title={"Kelola Dusun"} />;
