import Card from "@/Components/Card";
import Modal from "@/Components/Modal";
import AppLayouts from "@/Layouts/AppLayouts";
import { Link, router } from "@inertiajs/react";

import {
    Add,
    Cancel,
    Check,
    Delete,
    Edit,
    Group,
    Print,
} from "@mui/icons-material";
import { MenuItem, Select, Tooltip } from "@mui/material";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import PilihPenduduk from "./PilihPenduduk";
import Form from "./Form";
import FormExport from "./FormExport";

export default function Index(props) {
    const kematian = props.kematian;
    const [modalTambah, setModalTambah] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalExport, setModalExport] = useState(false);
    const [model, setModel] = useState(null);
    const [modalPilihPenduduk, setModalPilihPenduduk] = useState(false);
    const [modelPenduduk, setModelPenduduk] = useState(null);
    const columns = [
        {
            name: "#",
            selector: (row) => (
                <div className="flex gap-1 items-center">
                    <Tooltip title={`Edit Data ${row.nama}`}>
                        <button
                            onClick={() => editHandler(row)}
                            className="btn-second"
                        >
                            <Edit color="inherit" fontSize="small" />
                        </button>
                    </Tooltip>
                    <Tooltip title={`Delete Data ${row.nama}`}>
                        <button
                            onClick={() => deleteHandler(row)}
                            className="btn-danger"
                        >
                            <Delete color="inherit" fontSize="small" />
                        </button>
                    </Tooltip>

                    {row.status_konfirmasi == "di terima" && (
                        <Tooltip title={`Cetak Data ${row.nama}`}>
                            <Link
                                as="button"
                                href={route("cetak.suket-kematian", row.id)}
                                className="btn-success"
                            >
                                <Print color="inherit" fontSize="small" />
                            </Link>
                        </Tooltip>
                    )}
                </div>
            ),
            width: "160px",
            wrap: true,
        },
        {
            name: "Kode Permintaan",
            selector: (row) => <div>{row.kd_kematian}</div>,
            width: "130px",
            wrap: true,
        },
        {
            name: "KK/NIK",
            selector: (row) => (
                <div>
                    <p>KK : {row.kk}</p>
                    <p>NIK : {row.nik}</p>
                </div>
            ),
            width: "180px",
        },
        {
            name: "Nama",
            selector: (row) => row.nama,
            width: "160px",
            wrap: true,
        },
        {
            name: "Jenis Kelamin",
            selector: (row) =>
                row.jenis_kelamin == 1 ? "Laki-Laki" : "Perempuan",
            width: "130px",
            wrap: true,
        },
        {
            name: "Alamat",
            selector: (row) => (
                <div>
                    <p>DUSUN : {row.detail_dusun.dusun.nama}</p>
                    <p>
                        RW/RT :{" "}
                        {row.detail_dusun.rw + " / " + row.detail_dusun.rt}
                    </p>
                </div>
            ),
            width: "160px",
            wrap: true,
        },
        {
            name: "Waktu Kematian",
            selector: (row) => (
                <div>
                    <p>Hari : {row.hari_kematian}</p>
                    <p>
                        Tanggal dan Waktu :
                        {row.tgl_kematian + " - " + row.waktu_kematian}
                    </p>
                </div>
            ),
            width: "180px",
            wrap: true,
        },
        {
            name: "Sebab Kematian",
            selector: (row) => row.sebab_kematian,
            width: "130px",
            wrap: true,
        },
        {
            name: "Konfirmasi Permintaan",
            selector: (row) => (
                <select
                    onChange={(e) => konfirmasiHandler(e.target.value, row.id)}
                    className={`text-xs w-full text-white rounded-md ${
                        row.status_konfirmasi == "di terima"
                            ? "bg-green-500"
                            : row.status_konfirmasi == "di tolak"
                            ? "bg-red-500"
                            : "bg-orange-500"
                    }`}
                    defaultValue={row.status_konfirmasi}
                >
                    <option value="">Pilih Status Konfirmasi</option>
                    <option value="di terima">Di terima</option>
                    <option value="di tolak">Di Tolak</option>
                </select>
            ),
            width: "250px",
            wrap: true,
        },
    ];
    const editHandler = (row) => {
        setModel(row);
        setModalEdit(true);
    };
    const deleteHandler = (row) => {
        setModel(row);
        setModalDelete(true);
    };

    const lanjutHandler = () => {
        if (modelPenduduk == null) {
            alert("pilih penduduk terlebih dahulu");
        } else {
            setModalPilihPenduduk(false);
            setTimeout(() => {
                setModalTambah(true);
            }, 350);
        }
    };
    const getPenduduk = (row) => {
        setModelPenduduk(row);
    };
    const cancellHandler = () => {
        setModalPilihPenduduk(false);
    };
    const konfirmasiHandler = (value, id) => {
        router.post(route("konfirmasi.kematian"), {
            id: id,
            konfirmasi: value,
        });
    };
    return (
        <div className="py-8 px-4 md:px-8 lg:px-16">
            <Modal
                open={modalExport}
                setOpen={setModalExport}
                title={"Export / Cetak Laporan"}
            >
                <FormExport />
            </Modal>
            <Modal
                open={modalDelete}
                setOpen={setModalDelete}
                setModel={setModel}
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
                            href={route("delete.kematian", {
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
                                <Cancel color="inherit" fontSize="inherit" />
                            </div>
                            <p>Cancell</p>
                        </button>
                    </div>
                </div>
            </Modal>
            <Modal
                title={"Pilih penduduk"}
                open={modalPilihPenduduk}
                setOpen={setModalPilihPenduduk}
                setModel={setModel}
            >
                <PilihPenduduk
                    lanjut={lanjutHandler}
                    getPenduduk={getPenduduk}
                    cancell={cancellHandler}
                />
            </Modal>
            <Modal
                title={"Tambah data Kematian Penduduk"}
                open={modalTambah}
                setOpen={setModalTambah}
                setModel={setModel}
            >
                <Form
                    model={modelPenduduk}
                    setModel={setModel}
                    setOpen={setModalTambah}
                />
            </Modal>
            <Modal
                title={"Update Kematian Penduduk"}
                open={modalEdit}
                setOpen={setModalEdit}
                setModel={setModel}
            >
                <Form
                    isUpdate={true}
                    model={model}
                    setModel={setModel}
                    setOpen={setModalEdit}
                />
            </Modal>
            <div className="bg-white py-2 px-4 rounded-md flex justify-between items-center my-3">
                <h1 className="font-bold text-2xl text-orange-500 ">
                    Data Kematian
                </h1>
                <div className="flex gap-4">
                    <button
                        onClick={() => setModalPilihPenduduk(true)}
                        className="btn-primary"
                    >
                        <div className="text-white text-xl font-extrabold">
                            <Add color="inherit" fontSize="inherit" />
                        </div>
                        <p>Tambah</p>
                    </button>
                    <button
                        onClick={() => setModalExport(true)}
                        className="btn-success"
                    >
                        <div className="text-white text-xl font-extrabold">
                            <Print color="inherit" fontSize="inherit" />
                        </div>
                        <p>Export / Cetak Laporan</p>
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 my-3">
                <Card
                    count={10}
                    title={"Jumlah Kepala Keluarga"}
                    icon={<Group color="inherit" fontSize="inherit" />}
                />
            </div>
            <div className="rounded-lg">
                <DataTable data={kematian} pagination columns={columns} />
            </div>
        </div>
    );
}

Index.layout = (page) => <AppLayouts children={page} title={"data kematian"} />;
