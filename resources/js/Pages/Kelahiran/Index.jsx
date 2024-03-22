import Card from "@/Components/Card";
import AppLayouts from "@/Layouts/AppLayouts";
import { Add, Delete, Edit, Group, RemoveRedEye } from "@mui/icons-material";
import React, { useState } from "react";
import DataTable from "react-data-table-component";

export default function Index(props) {
    const [modalTambah, setModalTambah] = useState(false);
    const { data: kelahiran } = props.kelahiran;
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
        <div className="py-16 px-4 md:px-8 lg:px-16">
            <div className="bg-white py-2 px-4 rounded-md flex justify-between items-center my-3">
                <h1 className="font-bold text-2xl text-orange-500 ">
                    Penduduk
                </h1>
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
