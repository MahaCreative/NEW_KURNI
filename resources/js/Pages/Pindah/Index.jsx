import Modal from "@/Components/Modal";
import AppLayouts from "@/Layouts/AppLayouts";
import { Link, router, usePage } from "@inertiajs/react";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsAccessibility from "highcharts/modules/accessibility";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
HighchartsExporting(Highcharts);
// Aktifkan modul aksesibilitas jika diperlukan
HighchartsAccessibility(Highcharts);
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
import React, { useEffect, useState } from "react";
import PilihPenduduk from "./PilihPenduduk";
import Form from "./FormPindahKeluar";
import Card from "@/Components/Card";
import DataTable from "react-data-table-component";
import { Tooltip } from "@mui/material";
import FormExport from "./FormExport";
import Search from "@/Components/Search";

export default function Index(props) {
    const [modalPilihan, setModalPilihan] = useState(false);
    const [modalPilihPenduduk, setModalPilihPenduduk] = useState(false);
    const [modelPenduduk, setModelPenduduk] = useState(null);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalExport, setModalExport] = useState(false);
    const pindah = props.pindah;
    const pindahMasuk = props.pindahMasuk;
    const pindahKeluar = props.pindahKeluar;
    const jumlahPermintaan = props.jumlahPermintaan;
    const jumlahPendudukMasuk = props.jumlahPendudukMasuk;
    const jumlahPendudukKeluar = props.jumlahPendudukKeluar;
    const [dataGraMasuk, setDataGrafMasuk] = useState([]);
    const [dataGraKeluar, setDataGrafKeluar] = useState([]);
    useEffect(() => {
        const listMasuk = [];
        const listKeluar = [];
        {
            jumlahPendudukMasuk.map((item) => {
                listMasuk.push(item.total);
            });
            jumlahPendudukKeluar.map((item) => {
                listKeluar.push(item.total);
            });
        }

        setDataGrafMasuk(listMasuk);
        setDataGrafKeluar(listKeluar);
    }, []);

    const { desa } = usePage().props;
    const [model, setModel] = useState(null);
    const pindahKeluarHandler = () => {
        setModalPilihan(false);
        setTimeout(() => {
            setModalPilihPenduduk(true);
        }, 500);
    };
    const cancellHandler = () => {
        setModalPilihPenduduk(false);
    };
    const lanjutHandler = () => {
        if (modelPenduduk == null) {
            alert("pilih penduduk terlebih dahulu");
        } else {
            setModalPilihPenduduk(false);
            setTimeout(() => {
                router.get(route("formulir.pindah-keluar", modelPenduduk.id));
            }, 500);
        }
    };
    const getPenduduk = (row) => {
        setModelPenduduk(row);
    };

    const deleteHandler = (row) => {
        setModel(row);
        setModalDelete(true);
    };
    const columns = [
        {
            name: "#",
            selector: (row) => (
                <div className="flex gap-1 items-center">
                    <Tooltip title={"Delete Data Pindah"}>
                        <button
                            onClick={() => deleteHandler(row)}
                            className="btn-danger"
                        >
                            <Delete color="inherit" fontSize="small" />
                        </button>
                    </Tooltip>
                    <Tooltip title={"Cetak Suket"}>
                        <Link
                            href={route("cetak.suket-pindah", row.id)}
                            className="btn-success text-center flex justify-center"
                        >
                            <Print color="inherit" fontSize="small" />
                        </Link>
                    </Tooltip>
                </div>
            ),
            width: "110px",
            wrap: true,
        },
        {
            name: "NIK / KK",
            selector: (row) => (
                <div className="w-full">
                    <Tooltip title={"NIK"}>
                        <p className="py-1 px-1 text-xs bg-green-500 my-2 rounded-md text-white w-full">
                            {row.nik}
                        </p>
                    </Tooltip>
                    <Tooltip title={"KK"}>
                        <p className="py-1 px-1 text-xs bg-green-500 my-2 rounded-md text-white w-full">
                            {row.kk}
                        </p>
                    </Tooltip>
                </div>
            ),
        },

        {
            name: "Nama",
            selector: (row) => row.nama,
            width: "160px",
            wrap: true,
        },
        {
            name: "Alamat Asal",
            selector: (row) => (
                <div className="text-xs">
                    <p>Desa : {row.desa_asal}</p>
                    <p>Dusun : {row.dusun_asal}</p>
                    <p>RW/RT : {row.rw_asal + "/" + row.rt_asal}</p>
                    <p>Alamat : {row.alamat_asal}</p>
                </div>
            ),
            wrap: true,
        },
        {
            name: "Alamat Tujuan",
            selector: (row) => (
                <div className="text-xs">
                    <p>Desa : {row.desa_tujuan}</p>
                    <p>Dusun : {row.dusun_tujuan}</p>
                    <p>RW/RT : {row.rw_tujuan + "/" + row.rt_tujuan}</p>
                    <p>Alamat : {row.alamat_tujuan}</p>
                </div>
            ),
            wrap: true,
        },

        {
            name: <p className="text-center">Jumlah Keluarga Ikut </p>,
            selector: (row) => (
                <div className="text-center w-full text-xs">
                    {row.pengikut
                        ? row.pengikut.length + " Keluarga"
                        : "0 Pengikut"}
                </div>
            ),
            widt: "40px",
            wrap: true,
        },
        {
            name: "Kategori Pindah",
            selector: (row) => (
                <div className="text-[8pt]">
                    <p
                        className={`${
                            row.kategori_pindah == "keluar"
                                ? "bg-red-500 "
                                : "bg-green-500"
                        } text-white py-2 px-1 rounded-md`}
                    >
                        {row.kategori_pindah == "keluar"
                            ? `Keluar Dari Desa`
                            : `Masuk Ke Desa`}
                    </p>
                </div>
            ),
            wrap: true,
        },
        {
            name: "Konfirmasi Permintaan",
            selector: (row) => (
                <select
                    onChange={(e) => konfirmasiHandler(e.target.value, row.id)}
                    className={`text-xs w-full text-white rounded-md ${
                        row.menunggu_konfirmasi == "di terima"
                            ? "bg-green-500"
                            : row.menunggu_konfirmasi == "di tolak"
                            ? "bg-red-500"
                            : "bg-orange-500"
                    }`}
                    defaultValue={row.menunggu_konfirmasi}
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
    const pindahMasukHandler = () => {
        router.get(route("formulir.pindah-masuk"));
    };
    const grafikTotal = {
        chart: {
            type: "spline",
        },
        title: {
            text: "Grafik Perpindahan Penduduk",
            align: "left",
        },

        subtitle: {
            text: "Total Perpindahan Penduduk Selama 1 Tahun Sebelumnya",
            align: "left",
        },

        yAxis: {
            title: {
                text: "Jumlah Penduduk Pindah",
            },
        },

        xAxis: {
            accessibility: {
                rangeDescription: "Range: ",
            },
            categories: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ],
        },

        legend: {
            layout: "vertical",
            align: "right",
            verticalAlign: "middle",
        },

        series: [
            {
                name: "Penduduk Masuk",
                data: dataGraMasuk,
            },
            {
                name: "Penduduk Keluar",
                data: dataGraKeluar,
            },
        ],

        responsive: {
            rules: [
                {
                    condition: {
                        maxWidth: 500,
                    },
                    chartOptions: {
                        legend: {
                            layout: "horizontal",
                            align: "center",
                            verticalAlign: "bottom",
                        },
                    },
                },
            ],
        },
    };
    const konfirmasiHandler = (value, id) => {
        router.post(route("konfirmasi.permintaan-pindah"), {
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
            {/* Modal Pilihan */}
            <Modal
                open={modalPilihan}
                setOpen={setModalPilihan}
                title={"Pilih"}
            >
                <div className="w-[50vw] md:w-[40vw] lg:w-[30vw] ">
                    <p>
                        Silahkan memilih terlebih dahulu data yang ingin
                        ditambahkan akan{" "}
                        <span className="font-bold">Pindah Masuk</span> atau{" "}
                        <span className="font-bold">Pindah Keluar</span>
                    </p>
                    <div className="flex justify-between gap-8 px-8 pt-8">
                        <button
                            onClick={pindahMasukHandler}
                            className="py-4 text-center px-8 bg-green-500 text-white rounded-md hover:bg-green-600 capitalize"
                        >
                            Pindah Masuk ke {desa.nama_desa}
                        </button>
                        <button
                            onClick={pindahKeluarHandler}
                            className="py-4 text-center px-8 bg-red-500 text-white rounded-md hover:bg-red-600 capitalize"
                        >
                            Pindah Keluar dari {desa.nama_desa}
                        </button>
                    </div>
                </div>
            </Modal>
            {/* Modal Pilih Penduduk */}
            <Modal
                open={modalPilihPenduduk}
                setOpen={setModalPilihPenduduk}
                title={"Pilih penduduk"}
            >
                <PilihPenduduk
                    getPenduduk={getPenduduk}
                    lanjut={lanjutHandler}
                    cancell={cancellHandler}
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
                        Yakin ingin menghapus data ini? menghapus data ini akan
                        menghapus data yang terkait lainnya
                    </p>
                    <div className="flex gap-3 py-4">
                        <Link
                            as="button"
                            method="delete"
                            href={route("delete.pindah", {
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
            <div className="flex flex-col md:flex-row bg-white py-2 px-4 rounded-md justify-between gap-2 items-center">
                <div className="w-full gap-3 bg-white py-2 px-4 rounded-md flex justify-between items-center my-3">
                    <h1 className="font-bold text-sm md:text-2xl text-orange-500 ">
                        Data Pindahan Penduduk
                    </h1>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setModalPilihan(true)}
                            className="btn-primary"
                        >
                            <div className="text-white text-xs md:text-xl font-extrabold">
                                <Add color="inherit" fontSize="inherit" />
                            </div>
                            <p>Tambah</p>
                        </button>
                        <button
                            onClick={() => setModalExport(true)}
                            className="btn-success"
                        >
                            <div className="text-white text-xs md:text-xl font-extrabold">
                                <Add color="inherit" fontSize="inherit" />
                            </div>
                            <p>Export / Cetak Laporan</p>
                        </button>
                    </div>
                </div>
                <Search link={route("pindah")} />
            </div>
            {/* Card  */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-3">
                <Card
                    count={pindahMasuk}
                    title={"Jumlah Penduduk Masuk"}
                    icon={<Group color="inherit" fontSize="inherit" />}
                />
                <Card
                    count={pindahKeluar}
                    title={"Jumlah Penduduk Keluar"}
                    icon={<Group color="inherit" fontSize="inherit" />}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-3">
                {jumlahPermintaan.map((item, key) => (
                    <Card
                        key={key}
                        count={item.jumlah}
                        title={
                            <div>
                                <p>Jumlah Permintaan Dengan Status</p>
                                <p>Dengan {item.nama} </p>
                            </div>
                        }
                        icon={<Group color="inherit" fontSize="inherit" />}
                    />
                ))}
            </div>
            {/* Data Table */}
            <div className="rounded-lg">
                <DataTable pagination data={pindah} columns={columns} />
            </div>

            {/* Grafik */}
            <div className="my-3 rounded-md overflow-hidden">
                <HighchartsReact
                    highcharts={Highcharts}
                    options={grafikTotal}
                />
            </div>
        </div>
    );
}

Index.layout = (page) => <AppLayouts children={page} title={"Data Pindah"} />;
