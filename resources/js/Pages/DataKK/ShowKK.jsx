import Card from "@/Components/Card";
import AppLayouts from "@/Layouts/AppLayouts";
import { Link } from "@inertiajs/react";
import { ArrowBack, Group } from "@mui/icons-material";
import React from "react";
import DataTable from "react-data-table-component";

export default function ShowKK(props) {
    const penduduk = props.penduduk;
    const kepalaKeluarga = props.kepalaKeluarga;
    const jumlahBelumKawin = props.jumlahBelumKawin;
    const jumlahAnak = props.jumlahAnak;
    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: "60px",
        },
        {
            name: "NIK",
            selector: (row) => row.nik,
            width: "150px",
            wrap: true,
        },
        {
            name: "Nama",
            selector: (row) => row.nama,
        },
        {
            name: "TTL",
            selector: (row) => row.tempat_lahir + ", " + row.tanggal_lahir,
        },
        {
            name: "Jenis Kelamin",
            selector: (row) =>
                row.jenis_kelamin == 1 ? "Laki-Laki" : "Perempuan",
        },
        {
            name: "Pendidikan",
            selector: (row) => row.pendidikan.nama,
        },
        {
            name: "Pekerjaan",
            selector: (row) => row.pekerjaan.nama,
        },
        {
            name: "Status Kawin",
            selector: (row) => row.status_perkawinan.nama,
        },
        {
            name: "Hubungan Dalam Keluarga",
            selector: (row) => row.status_hubungan_dalam_keluarga.nama,
        },
    ];
    return (
        <div className="py-16 px-4 md:px-8 lg:px-16">
            <div className="bg-white py-2 px-4 rounded-md flex justify-between items-center my-3">
                <h1 className="font-bold text-2xl text-orange-500 ">
                    Data Kartu Keluarga
                </h1>
                <Link
                    href={route("data-kartu-keluarga")}
                    className="btn-primary"
                >
                    <div className="text-white text-xl font-extrabold">
                        <ArrowBack color="inherit" fontSize="inherit" />
                    </div>
                    <p>Kembali</p>
                </Link>
            </div>

            <div className="my-3 rounded-md overflow-hidden px-2 py-3 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <h3 className="text-2xl font-semibold text-orange-500">
                            Daftar Anggota Keluarga
                        </h3>
                        <div className="bg-gray-400 py-1 px-3 rounded-md">
                            <h3 className="text-lg font-medium text-white">
                                Nomor Kartu Keluarga : {kepalaKeluarga.kk}
                            </h3>
                            <h3 className="text-lg font-medium text-white">
                                Nama Kepala keluarga : {kepalaKeluarga.nama}
                            </h3>
                            <h3 className="text-lg font-medium text-white">
                                DUSUN RW/RT:{" "}
                                {"Dusun " +
                                    kepalaKeluarga.detail_dusun.dusun.nama +
                                    " " +
                                    kepalaKeluarga.detail_dusun.rw +
                                    " / " +
                                    kepalaKeluarga.detail_dusun.rt}
                            </h3>
                        </div>
                    </div>
                    <div className="flex gap-3 py-2 px-3">
                        <Card
                            bg="from-orange-500 via-orange-700 to-orange-800"
                            textPrimary="text-white"
                            textSecondary="text-white"
                            count={jumlahBelumKawin}
                            title={"Jumlah Belum Kawin"}
                            icon={<Group color="inherit" fontSize="inherit" />}
                        />
                        <Card
                            bg="from-orange-500 via-orange-700 to-orange-800"
                            textPrimary="text-white"
                            textSecondary="text-white"
                            count={jumlahAnak}
                            title={"Jumlah Anak"}
                            icon={<Group color="inherit" fontSize="inherit" />}
                        />
                    </div>
                </div>
            </div>
            <div className="my 3 rounded-md overflow-hidden">
                <DataTable data={penduduk} columns={columns} />
            </div>
        </div>
    );
}
ShowKK.layout = (page) => (
    <AppLayouts children={page} title={"Data Penduduk Per KK"} />
);
