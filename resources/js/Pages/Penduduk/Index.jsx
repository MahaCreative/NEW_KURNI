import Card from "@/Components/Card";
import Modal from "@/Components/Modal";
import AppLayouts from "@/Layouts/AppLayouts";
import { Link } from "@inertiajs/react";
import {
    Add,
    Cancel,
    Check,
    Delete,
    Edit,
    Group,
    RemoveRedEye,
} from "@mui/icons-material";
import React from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import Form from "./Form";
import LaporanPenduduk from "./LaporanPenduduk";
import Search from "@/Components/Search";

export default function Index(props) {
    const penduduk = props.penduduk;
    const jumlahPenduduk = props.jumlahPenduduk;
    const jumlahKepalaKeluarga = props.jumlahKepalaKeluarga;
    const jumlahLakiLaki = props.jumlahLakiLaki;
    const jumlahPerempuan = props.jumlahPerempuan;
    const [model, setModel] = useState(null);
    const [modalLihat, setModalLihat] = useState(false);
    const [modalExport, setModalExport] = useState(false);
    const [modalTambah, setModalTambah] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const columns = [
        {
            name: "#",
            selector: (row) => (
                <div className="flex gap-1 items-center">
                    <button
                        onClick={() => editHandler(row)}
                        className="btn-second"
                    >
                        <Edit color="inherit" fontSize="small" />
                    </button>
                    <button
                        onClick={() => deleteHandler(row)}
                        className="btn-danger"
                    >
                        <Delete color="inherit" fontSize="small" />
                    </button>
                    <button
                        onClick={() => lihatHandler(row)}
                        className="btn-primary"
                    >
                        <RemoveRedEye color="inherit" fontSize="small" />
                    </button>
                </div>
            ),
            width: "160px",
            wrap: true,
        },
        {
            name: "NIK",
            selector: (row) => row.nik,
            width: "160px",
        },
        {
            name: "KK",
            selector: (row) => row.kk,
            width: "160px",
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
            name: "Dusun",
            selector: (row) => (
                <div>
                    <p>Dusun : {row.detail_dusun.dusun.nama}</p>
                    <p>
                        RT/RW :{" "}
                        {row.detail_dusun.rt + "/" + row.detail_dusun.rw}
                    </p>
                </div>
            ),
            width: "160px",
            wrap: true,
        },
        {
            name: "Agama",
            selector: (row) => row.agama.nama,
            width: "110px",
            wrap: true,
        },
        {
            name: "Status Hubungan Dalam Keluarga",
            selector: (row) => row.status_hubungan_dalam_keluarga.nama,
            width: "160px",
            wrap: true,
        },
    ];
    const editHandler = (row) => {
        setModel(row);
        setModalTambah(true);
    };
    const deleteHandler = (row) => {
        setModel(row);
        setModalDelete(true);
    };
    const lihatHandler = (row) => {
        setModel(row);
        setModalLihat(true);
    };

    return (
        <div className="py-6 px-4 md:px-8 lg:px-16">
            {/* Modal */}
            <div>
                {/* Modal Export */}
                <Modal
                    open={modalExport}
                    setOpen={setModalExport}
                    title={"Export / Cetak Laporan Penduduk"}
                >
                    <LaporanPenduduk />
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
                            Yakin ingin menghapus data ini? menghapus data ini
                            akan menghapus data yang terkait lainnya
                        </p>
                        <div className="flex gap-3 py-4">
                            <Link
                                as="button"
                                method="delete"
                                href={route("delete.penduduk", {
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
                <Modal
                    title={`Lihat Data ${model?.nama}`}
                    open={modalLihat}
                    setOpen={setModalLihat}
                    setModel={setModel}
                >
                    <div className="w-[50vw] max-h-[80vh] overflow-y-auto py-3 px-2">
                        <div className="py-2 px-3 rounded-md shadow-md shadow-gray-400/50">
                            <h1 className="text-lg text-orange-500 font-semibold">
                                Profile
                            </h1>
                            <p className="border-b border-gray-400/50 py-2">
                                Nama Lengkap: {model?.nama}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <p className="border-b border-gray-400/50 py-2">
                                    NIK: {model?.nik}
                                </p>
                                <p className="border-b border-gray-400/50 py-2">
                                    KK: {model?.kk}
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <p className="border-b border-gray-400/50 py-2">
                                    Jenis Kelamin:{" "}
                                    {model?.jenis_kelamin == 1
                                        ? "Laki-Laki"
                                        : "Perempuan"}
                                </p>
                                <p className="border-b border-gray-400/50 py-2">
                                    Tempat Tanggal Lahir:{" "}
                                    {model?.tempat_lahir +
                                        "," +
                                        model?.tanggal_lahir}
                                </p>
                            </div>
                        </div>

                        <div className="py-2 px-3 rounded-md shadow-md shadow-gray-400/50">
                            <h1 className="text-lg text-orange-500 font-semibold">
                                Status dan Hubungan Keluarga
                            </h1>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <p className="border-b border-gray-400/50 py-2">
                                    Status Perkawinan:{" "}
                                    {model?.status_perkawinan.nama}
                                </p>
                                <p className="border-b border-gray-400/50 py-2">
                                    Status Hubungan Dalam keluarga:{" "}
                                    {model?.status_hubungan_dalam_keluarga.nama}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <p className="border-b border-gray-400/50 py-2">
                                    Nik Ayah: {model?.nik_ayah}
                                </p>
                                <p className="border-b border-gray-400/50 py-2">
                                    Nama Ayah: {model?.nama_ayah}
                                </p>
                                <p className="border-b border-gray-400/50 py-2">
                                    NIK Ibu: {model?.nik_ibu}
                                </p>
                                <p className="border-b border-gray-400/50 py-2">
                                    Nama Ibu: {model?.nik_ibu}
                                </p>
                            </div>
                        </div>
                        <div className="py-2 px-3 rounded-md shadow-md shadow-gray-400/50">
                            <h1 className="text-lg text-orange-500 font-semibold">
                                Status fan Hubungan Keluarga
                            </h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <p className="border-b border-gray-400/50 py-2">
                                    Dusun: {model?.detail_dusun.dusun.nama}
                                </p>
                                <p className="border-b border-gray-400/50 py-2">
                                    RT/RW:{" "}
                                    {model?.detail_dusun.rt +
                                        "/" +
                                        model?.detail_dusun.rw}
                                </p>
                            </div>
                            <p className="border-b border-gray-400/50 py-2">
                                Alamat: {model?.alamat}
                            </p>
                        </div>
                        <div className="py-2 px-3 rounded-md shadow-md shadow-gray-400/50">
                            <h1 className="text-lg text-orange-500 font-semibold">
                                Data Lainnya
                            </h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <p className="border-b border-gray-400/50 py-2">
                                    Nama Agama: {model?.agama.nama}
                                </p>
                                <p className="border-b border-gray-400/50 py-2">
                                    Pendidikan: {model?.pendidikan.nama}
                                </p>
                                <p className="border-b border-gray-400/50 py-2">
                                    Pekerjaan: {model?.pekerjaan.nama}
                                </p>
                                <p className="border-b border-gray-400/50 py-2">
                                    Darah:{" "}
                                    {model?.darah_id
                                        ? model.golongan_darah.golongan
                                        : "-"}
                                </p>
                            </div>
                        </div>
                    </div>
                </Modal>
                <Modal
                    open={modalTambah}
                    setOpen={setModalTambah}
                    setModel={setModel}
                    title={
                        model
                            ? `Update data ${model?.nama}`
                            : "Tambah Data Penduduk"
                    }
                >
                    <Form
                        model={model}
                        setModel={setModel}
                        setOpen={setModalTambah}
                    />
                </Modal>
            </div>
            <div className="flex flex-col md:flex-row bg-white py-2 px-4 rounded-md justify-between gap-5">
                <div className="w-full flex justify-between items-center my-3">
                    <h1 className="font-bold text-2xl text-orange-500 ">
                        Penduduk
                    </h1>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setModalTambah(true)}
                            className="btn-primary"
                        >
                            <div className="text-white text-xs md:text-xl font-extrabold">
                                <Add color="inherit" fontSize="inherit" />
                            </div>
                            <p>Tambah</p>
                        </button>
                        <button
                            onClick={() => setModalExport(true)}
                            className="btn-primary"
                        >
                            <div className="text-white text-xs md:text-xl font-extrabold">
                                <Add color="inherit" fontSize="inherit" />
                            </div>
                            <p>Export / Cetak Laporan</p>
                        </button>
                    </div>
                </div>
                <Search link={route("penduduk")} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 my-3 transition-all duration-300">
                <Card
                    count={jumlahPenduduk}
                    title={"Jumlah Penduduk"}
                    icon={<Group color="inherit" fontSize="inherit" />}
                />
                <Card
                    count={jumlahKepalaKeluarga.penduduk_count}
                    title={"Jumlah Kepala Keluarga"}
                    icon={<Group color="inherit" fontSize="inherit" />}
                />

                <Card
                    count={jumlahLakiLaki}
                    title={"Jumlah Laki-Laki"}
                    icon={<Group color="inherit" fontSize="inherit" />}
                />
                <Card
                    count={jumlahPerempuan}
                    title={"Jumlah Perempuan"}
                    icon={<Group color="inherit" fontSize="inherit" />}
                />
            </div>
            <div className="rounded-lg">
                <DataTable pagination data={penduduk} columns={columns} />
            </div>
        </div>
    );
}

Index.layout = (page) => <AppLayouts children={page} title={"Penduduk"} />;
