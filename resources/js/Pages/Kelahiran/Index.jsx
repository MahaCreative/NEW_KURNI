import Card from "@/Components/Card";
import Modal from "@/Components/Modal";
import AppLayouts from "@/Layouts/AppLayouts";
import {
    Add,
    Cancel,
    Check,
    Delete,
    Edit,
    Group,
    Print,
    RemoveRedEye,
} from "@mui/icons-material";
import React, { useState } from "react";
import DataTable from "react-data-table-component";

import Form from "./Form";
import { MenuItem, Select, Tooltip } from "@mui/material";
import { Link, router } from "@inertiajs/react";
import PilihPenduduk from "./PilihPenduduk";
import FormExport from "./FormExport";

export default function Index(props) {
    const [modalTambah, setModalTambah] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalPilihPenduduk, setModalPilihPenduduk] = useState(false);
    const [modalPertanyaan, setModalPertanyaan] = useState(false);
    const [modalExport, setModalExport] = useState(false);
    const [model, setModel] = useState(null);
    const kelahiran = props.kelahiran;
    const [dataAyah, setDataAyah] = useState([]);
    const [dataIbu, setDataIbu] = useState([]);
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

                    {row.status_permintaan == "di terima" && (
                        <Tooltip title={`Cetak Data ${row.nama}`}>
                            <Link
                                as="button"
                                href={route("cetak.suket-lahir", row.id)}
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
            selector: (row) => <div>{row.kd_kelahiran}</div>,
            width: "130px",
            wrap: true,
        },
        {
            name: "KK/NIK",
            selector: (row) => (
                <div>
                    <p>KK : {row.KK}</p>
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
            name: "Nama Ayah / Nama Ibu",
            selector: (row) => (
                <div>
                    <p>Nama Ayah: {row.nama_ayah}</p>
                    <p>Nama Ibu: {row.nama_ibu}</p>
                </div>
            ),
            width: "200px",
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
            name: "TTL",
            selector: (row) => row.tempat_lahir + "," + row.tanggal_lahir,
            width: "160px",
            wrap: true,
        },
        {
            name: "Darah",
            selector: (row) =>
                row.darah_id ? row.golongan_darah?.golongan : "-",
            width: "90px",
            wrap: true,
        },
        {
            name: "Agama",
            selector: (row) => row.agama.nama,
            width: "110px",
            wrap: true,
        },
        {
            name: "Warga Dusun",
            selector: (row) => row.detail_dusun.dusun.nama,
            width: "110px",
            wrap: true,
        },
        {
            name: "Konfirmasi Permintaan",
            selector: (row) => (
                <Select
                    onChange={(e) => konfirmasiHandler(e.target.value, row.id)}
                    className={`text-xs w-full text-white ${
                        row.status_permintaan == "di terima"
                            ? "bg-green-500"
                            : row.status_permintaan == "di tolak"
                            ? "bg-red-500"
                            : "bg-orange-500"
                    }`}
                    defaultValue={row.status_permintaan}
                >
                    <MenuItem value="">Pilih Status Konfirmasi</MenuItem>
                    <MenuItem value="di terima">Di terima</MenuItem>
                    <MenuItem value="di tolak">Di Tolak</MenuItem>
                    <MenuItem value="menunggu konfirmasi">
                        Menunggu Konfirmasi
                    </MenuItem>
                </Select>
            ),
            width: "250px",
            wrap: true,
        },
    ];
    const editHandler = (row) => {
        setModel(row);
        setModalPertanyaan(true);
    };
    const deleteHandler = (row) => {
        setModel(row);
        setModalDelete(true);
    };

    const konfirmasiHandler = (value, id) => {
        router.post(route("konfirmasi.kelahiran"), {
            id: id,
            konfirmasi: value,
        });
    };
    const getAyah = (row) => {
        setDataAyah(row);
        console.log(row);
    };
    const getIbu = (row) => {
        setDataIbu(row);
        console.log(row);
    };
    const lanjutPilih = () => {
        setModalPilihPenduduk(false);
        setTimeout(() => {
            setModalTambah(true);
        }, 150);
    };
    const ubahDataHandler = () => {
        setModalPilihPenduduk(true);
        setTimeout(() => {
            setModalPertanyaan(false);
        }, 150);
    };
    const tidakHandler = () => {
        setModalPertanyaan(false);
        setTimeout(() => {
            setModalPilihPenduduk(true);
        }, 150);
    };
    console.log(kelahiran);
    return (
        <div className="py-8 px-4 md:px-8 lg:px-16">
            {/* Modal Export */}
            <Modal
                open={modalExport}
                setOpen={setModalExport}
                title={"Export / Cetak Laporan"}
            >
                <FormExport />
            </Modal>
            {/* modal delete */}
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
                            href={route("delete.kelahiran", {
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
            {/* modal tambah */}
            <Modal
                open={modalTambah}
                setOpen={setModalTambah}
                setModel={setModel}
                title={
                    model
                        ? `Edit Data Kelahiran ${model?.nama} `
                        : "Tambah data kelahiran"
                }
            >
                <Form
                    model={model}
                    setModel={setModel}
                    setOpen={setModalTambah}
                    dataAyah={dataAyah}
                    dataIbu={dataIbu}
                />
            </Modal>
            <Modal
                open={modalPilihPenduduk}
                setOpen={setModalPilihPenduduk}
                setModel={setModel}
                title={"Pilih data Ayah dan Ibu terlebih dahulu"}
            >
                <PilihPenduduk
                    lanjutPilih={lanjutPilih}
                    getAyah={getAyah}
                    getIbu={getIbu}
                />
            </Modal>
            {/* modal tanyah */}
            <Modal
                open={modalPertanyaan}
                setOpen={setModalPertanyaan}
                setModel={setModel}
                title={"Konfirmasi Dahulu"}
            >
                <div className="w-[50vw]">
                    <p>
                        Yakin ingin menghapus data ini? menghapus data ini akan
                        menghapus data yang terkait lainnya
                    </p>
                    <div className="flex gap-3 py-4">
                        <button
                            onClick={ubahDataHandler}
                            className="btn-primary"
                        >
                            <div className="text-white text-xl">
                                <Check color="inherit" fontSize="inherit" />
                            </div>
                            <p>Ubah Data</p>
                        </button>
                        <button onClick={tidakHandler} className="btn-danger">
                            <div className="text-white text-xl">
                                <Cancel color="inherit" fontSize="inherit" />
                            </div>
                            <p>Tidak Mengubah Data</p>
                        </button>
                    </div>
                </div>
            </Modal>
            <div className="bg-white py-2 px-4 rounded-md flex justify-between items-center my-3">
                <h1 className="font-bold text-2xl text-orange-500 ">
                    Data Kelahiran
                </h1>
                <div className="flex gap-3">
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
                <DataTable data={kelahiran} pagination columns={columns} />
            </div>
        </div>
    );
}

Index.layout = (page) => (
    <AppLayouts children={page} title={"Data Kelahiran"} />
);
