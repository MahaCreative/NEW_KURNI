import InputText from "@/Components/InputText";
import { Link, useForm } from "@inertiajs/react";
import {
    Add,
    ArrowBack,
    Cancel,
    Check,
    Delete,
    Edit,
} from "@mui/icons-material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import DataTable from "react-data-table-component";
import FormDetail from "./FormDetail";
import Modal from "@/Components/Modal";

export default function Form({ model, setModel, setOpen }) {
    const { data, setData, post, reset, errors } = useForm({ nama: "" });
    const [formDetail, setFormDetail] = useState(false);
    const [modelDetail, setModelDetail] = useState(null);
    const [modalDelete, setModalDelete] = useState(false);
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("post.dusun"), {
            onSuccess: () => {
                setModel(null);
                setOpen(false);
                reset("nama");
            },
        });
    };
    const updateHandler = (e) => {
        e.preventDefault();
        post(route("update.dusun"), {
            onSuccess: () => {
                setModel(null);
                setOpen(false);
                reset("nama");
            },
        });
    };
    const columns = [
        {
            name: "#",
            selector: (rown, index) => index + 1,
            width: "60px",
        },
        {
            name: "rw",
            selector: (row) => row.rw,
            sortable: true,
        },
        {
            name: "rt",
            selector: (row) => row.rt,
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

    useEffect(() => {
        setData({
            ...data,
            nama: model ? model.nama : "",
            id: model ? model.id : "",
        });
    }, [model]);

    const editHandler = (value) => {
        setModelDetail(value);
        setFormDetail(true);
    };
    const deleteHandler = (value) => {
        setModelDetail(value);
        setModalDelete(true);
    };

    return (
        <div className="w-[90vw]">
            <Modal
                open={modalDelete}
                setOpen={setModalDelete}
                setModel={setModelDetail}
                title={"Warning Delete Data"}
            >
                <div className="w-[50vw]">
                    <p>
                        Yakin ingin menghapus data ini? menghapus data ini akan
                        menghapus data yang terkait lainnya
                    </p>
                    <div className="flex gap-3 py-4">
                        <Link
                            as="button"
                            method="delete"
                            href={route("delete.detail-dusun", {
                                id: modelDetail?.id,
                            })}
                            onSuccess={() => {
                                setModelDetail(null);
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
                                setModelDetail(null);
                                setModalDelete(false);
                            }}
                            className="btn-danger"
                        >
                            <div className="text-white text-xl">
                                <Cancel color="inherit" fontSize="inherit" />
                            </div>
                            <p>Cancell23</p>
                        </button>
                    </div>
                </div>
            </Modal>
            <div className="bg-orange-500 py-2 px-4 rounded-md flex justify-between items-center">
                <div>
                    <h1 className="font-bold text-2xl text-white ">Dusun</h1>
                    <p className="text-md font-extralight text-white">
                        {model ? "Edit" : "Tambah"}
                    </p>
                </div>
                <button
                    onClick={() => {
                        setOpen(false);
                        setModel(null);
                    }}
                    className="btn-primary"
                >
                    <div className="text-white text-xl font-extrabold">
                        <ArrowBack color="inherit" fontSize="inherit" />
                    </div>
                    <p>Kembali</p>
                </button>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start gap-3 py-2 w-full">
                <form
                    onSubmit={model ? updateHandler : submitHandler}
                    className="py-2 px-3 rounded-md bg-gray-100/50 shadow-sm shadow-gray-400/50 w-full"
                >
                    <InputText
                        className="border-none outline-none"
                        label={"Nama Dusun"}
                        value={data.nama}
                        name="nama"
                        onChange={(e) =>
                            setData({ ...data, nama: e.target.value })
                        }
                    />
                    <button className="btn-primary w-full text-center flex justify-center my-3 py-3">
                        Simpan
                    </button>
                </form>
                {model && (
                    <div className="w-full bg-gray-100 px-2 rounded-md">
                        <div className="w-full flex items-center justify-between">
                            <div className=" py-2 px-4 rounded-md flex justify-between items-center w-full">
                                <h1 className="font-bold text-2xl text-orange-500 ">
                                    Detail Dusun
                                </h1>
                                <button
                                    onClick={() => setFormDetail(true)}
                                    className="btn-primary"
                                >
                                    <div className="text-white text-xl font-extrabold">
                                        <Add
                                            color="inherit"
                                            fontSize="inherit"
                                        />
                                    </div>
                                    <p>Tambah</p>
                                </button>
                            </div>
                        </div>
                        {formDetail && (
                            <FormDetail
                                id={model?.id}
                                model={modelDetail}
                                setModel={setModelDetail}
                            />
                        )}
                        <DataTable
                            data={model.detail_dusun}
                            columns={columns}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
