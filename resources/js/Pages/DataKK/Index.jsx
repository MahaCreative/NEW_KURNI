import Card from "@/Components/Card";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsAccessibility from "highcharts/modules/accessibility";
import Highcharts from "highcharts";
import AppLayouts from "@/Layouts/AppLayouts";
import { Link } from "@inertiajs/react";
import { Group, Print, RemoveRedEye } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import HighchartsReact from "highcharts-react-official";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import Modal from "@/Components/Modal";
import FormExport from "./FormExport";
import Search from "@/Components/Search";
HighchartsExporting(Highcharts);
// Aktifkan modul aksesibilitas jika diperlukan
HighchartsAccessibility(Highcharts);
export default function Index(props) {
    const kk = props.kk;
    const dusun = props.dusun;
    const [modalFormExport, setModalForm] = useState(false);
    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: "60px",
        },
        {
            name: "Nama Kepala Keluarga",
            selector: (row) => row.nama,
        },
        {
            name: "Jumlah anggota keluarga",
            selector: (row) => row.jumlah_keluarga + " Keluarga",
        },
        {
            name: "Dusun ",
            selector: (row) => row.detail_dusun.dusun.nama,
        },
        {
            name: "RW/RT ",
            selector: (row) => row.detail_dusun.rw + "/" + row.detail_dusun.rt,
        },
        {
            name: "Alamat ",
            selector: (row) => row.alamat,
        },
        {
            name: "Aksi ",
            selector: (row) => (
                <Tooltip title={`Lihat data ${row.kk}`}>
                    <Link
                        href={route("kk.data-kartu-keluarga", row.kk)}
                        className="btn-primary"
                    >
                        <RemoveRedEye color="inherit" fontSize="inherit" />
                    </Link>
                </Tooltip>
            ),
        },
    ];
    const jumlahPenduduk = {
        chart: {
            type: "pie",
        },
        title: {
            text: "Grafik Jumlah Penduduk",
        },
        subtitle: {
            text: "Total jumlah Penduduk Perdusun",
        },

        legend: {
            // Konfigurasi legend
            align: "center",
            verticalAlign: "bottom",
            layout: "horizontal",
        },
        exporting: {
            buttons: {
                contextButton: {
                    menuItems: [
                        "printChart",
                        "separator",
                        "downloadPNG",
                        "downloadJPEG",
                        "downloadPDF",
                        "downloadSVG",
                    ],
                    align: "right",
                },
            },
        },

        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: "{point.name}: {point.y:f}",
                },
            },
            pie: {
                allowPointSelect: true,
                cursor: "pointer",
                showInLegend: true,
            },
        },

        tooltip: {
            headerFormat:
                '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat:
                '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:f}</b><br/>',
        },
        series: [
            {
                name: "Total Penduduk",
                colorByPoint: true,
                shadow: 1,
                border: 1,
                data: dusun
                    ? dusun.map((item) => ({
                          name: item.nama,
                          y: item.total_penduduk,
                      }))
                    : [], // Pastikan untuk menangani jika data.agama masih kosong
            },
        ],
    };
    const jumlahPendudukBar = {
        chart: {
            type: "column",
        },
        title: {
            text: "Grafik Jumlah Penduduk",
        },
        subtitle: {
            text: "Total jumlah Penduduk Perdusun",
        },

        legend: {
            // Konfigurasi legend
            align: "center",
            verticalAlign: "bottom",
            layout: "horizontal",
        },
        exporting: {
            buttons: {
                contextButton: {
                    menuItems: [
                        "printChart",
                        "separator",
                        "downloadPNG",
                        "downloadJPEG",
                        "downloadPDF",
                        "downloadSVG",
                    ],
                    align: "right",
                },
            },
        },

        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: "{point.name}: {point.y:f}",
                },
            },
            column: {
                allowPointSelect: true,
                cursor: "pointer",
                showInLegend: true,
            },
        },

        tooltip: {
            headerFormat:
                '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat:
                '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:f}</b><br/>',
        },
        series: [
            {
                name: "Total",
                colorByPoint: true,
                shadow: 1,
                border: 1,
                data: dusun
                    ? dusun.map((item) => ({
                          name: item.nama,
                          y: item.total_penduduk,
                      }))
                    : [], // Pastikan untuk menangani jika data.agama masih kosong
            },
        ],
    };
    return (
        <div className="py-8 px-4 md:px-8 lg:px-16">
            <Modal
                open={modalFormExport}
                setOpen={setModalForm}
                title={"Filter Export dan Cetak"}
            >
                <FormExport />
            </Modal>
            <div className="flex flex-col md:flex-row bg-white py-2 px-4 rounded-md justify-between gap-5 items-center">
                <div className="w-full bg-white py-2 px-4 rounded-md flex justify-between items-center my-3">
                    <h1 className="font-bold text-2xl text-orange-500 ">
                        Data Kartu Keluarga
                    </h1>
                    <button
                        onClick={() => setModalForm(true)}
                        className="btn-primary"
                    >
                        <div className="text-white text-xs md:text-xl font-extrabold">
                            <Print color="inherit" fontSize="inherit" />
                        </div>
                        <p>Export / Cetak</p>
                    </button>
                </div>
                <Search link={route("data-kartu-keluarga")} />
            </div>
            <div
                className={`grid grid-cols-1 md:grid-cols-2 ${
                    dusun.length >= 5
                        ? "lg:grid-cols-5"
                        : `lg:grid-cols-${dusun.length}`
                } gap-3 my-3`}
            >
                {dusun.map((item, key) => (
                    <div>
                        <Card
                            key={key}
                            count={item.total_penduduk}
                            title={
                                <div>
                                    <p>Jumlah Penduduk </p>
                                    <p className="font-bold text-xl">
                                        Dusun {item.nama}
                                    </p>
                                </div>
                            }
                            icon={<Group color="inherit" fontSize="inherit" />}
                        />
                    </div>
                ))}
            </div>

            <DataTable
                data={kk}
                columns={columns}
                pagination
                striped
                dense
                highlightOnHover
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-md overflow-hidden my-3">
                <div className="rounded-md overflow-hidden shadow-sm shadow-gray-400/50">
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={jumlahPenduduk}
                    />
                </div>
                <div className="rounded-md overflow-hidden shadow-sm shadow-gray-400/50">
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={jumlahPendudukBar}
                    />
                </div>
            </div>
        </div>
    );
}

Index.layout = (page) => (
    <AppLayouts children={page} title={"Data Kartu Keluarga"} />
);
