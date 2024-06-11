import Card from "@/Components/Card";
import { BarChart, Group, PieChart } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsAccessibility from "highcharts/modules/accessibility";
import Highcharts from "highcharts";
// Aktifkan modul ekspor
HighchartsExporting(Highcharts);
// Aktifkan modul aksesibilitas jika diperlukan
HighchartsAccessibility(Highcharts);
export default function Grafik() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(route("grafik"));
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error("Error Fetching data: ", error);
        }
    };
    console.log(data);
    const agamaChartPie = {
        chart: {
            type: "pie",
        },
        title: {
            text: "Agama",
        },
        subtitle: {
            text: "Total jumlah Penduduk" + data.totalPenduduk,
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
        navigation: {
            buttonOptions: {
                enabled: true, // Mengaktifkan tombol navigasi
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
                name: "Brands",
                colorByPoint: true,
                shadow: 1,
                border: 1,
                data: data.agama
                    ? data.agama.map((item) => ({
                          name: item.name,
                          y: item.y,
                      }))
                    : [], // Pastikan untuk menangani jika data.agama masih kosong
            },
        ],
    };
    const golonganChartPie = {
        chart: {
            type: "pie",
        },
        title: {
            text: "Golongan Darah",
        },
        subtitle: {
            text: "Total jumlah Penduduk" + data.totalPenduduk,
        },
        accessibility: {
            enabled: true,
        },

        legend: {
            // Konfigurasi legend
            align: "center",
            verticalAlign: "bottom",
            layout: "horizontal",
        },

        buttonOptions: {
            align: "right",
            buttonSpacing: 3,
            enabled: true,
            height: 28,
            symbolFill: "#666666",
            symbolSize: 14,
            symbolStroke: "#666666",
            symbolStrokeWidth: 3,
            symbolX: 14.5,
            symbolY: 13.5,
            text: null,
        },
        navigation: {
            buttonOptions: {
                enabled: true, // Mengaktifkan tombol navigasi
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
                name: "Brands",
                colorByPoint: true,
                shadow: 1,
                border: 1,
                data: data.darah
                    ? data.darah.map((item) => ({
                          name: item.name,
                          y: item.y,
                      }))
                    : [], // Pastikan untuk menangani jika data.agama masih kosong
            },
        ],
    };
    const pekerjaanChart = {
        chart: {
            type: "bar",
        },
        subtitle: {
            text: "Total Penduduk: " + data.totalPenduduk,
        },
        xAxis: {
            type: "category",
            title: {
                text: null,
            },
            min: 0,
            max: 4,
            scrollbar: {
                enabled: true,
            },
            tickLength: 0,
        },
        yAxis: {
            min: 0,
            title: {
                text: "Jumlah Penduduk",
                align: "high",
            },
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true,
                },
            },
        },
        legend: {
            enabled: false,
        },
        credits: {
            enabled: false,
        },
        series: [
            {
                name: "Jumlah",
                data: data.pekerjaan
                    ? data.pekerjaan.map((item) => ({
                          name: item.name,
                          y: item.y,
                      }))
                    : [],
            },
        ],
    };
    const pendidikanChart = {
        chart: {
            type: "pie",
        },
        title: {
            text: "Pendidikan",
        },
        subtitle: {
            text: "Total jumlah Penduduk" + data.totalPenduduk,
        },
        accessibility: {
            enabled: true,
        },

        legend: {
            // Konfigurasi legend
            align: "center",
            verticalAlign: "bottom",
            layout: "horizontal",
        },

        buttonOptions: {
            align: "right",
            buttonSpacing: 3,
            enabled: true,
            height: 28,
            symbolFill: "#666666",
            symbolSize: 14,
            symbolStroke: "#666666",
            symbolStrokeWidth: 3,
            symbolX: 14.5,
            symbolY: 13.5,
            text: null,
        },
        navigation: {
            buttonOptions: {
                enabled: true, // Mengaktifkan tombol navigasi
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
                name: "Brands",
                colorByPoint: true,
                shadow: 1,
                border: 1,
                data: data.pendidikan
                    ? data.pendidikan.map((item) => ({
                          name: item.name,
                          y: item.y,
                      }))
                    : [], // Pastikan untuk menangani jika data.agama masih kosong
            },
        ],
    };
    const perkawinan = {
        chart: {
            type: "pie",
        },
        title: {
            text: "Perkawinan",
        },
        subtitle: {
            text: "Total jumlah Penduduk" + data.totalPenduduk,
        },
        accessibility: {
            enabled: true,
        },

        legend: {
            // Konfigurasi legend
            align: "center",
            verticalAlign: "bottom",
            layout: "horizontal",
        },

        buttonOptions: {
            align: "right",
            buttonSpacing: 3,
            enabled: true,
            height: 28,
            symbolFill: "#666666",
            symbolSize: 14,
            symbolStroke: "#666666",
            symbolStrokeWidth: 3,
            symbolX: 14.5,
            symbolY: 13.5,
            text: null,
        },
        navigation: {
            buttonOptions: {
                enabled: true, // Mengaktifkan tombol navigasi
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
                name: "Brands",
                colorByPoint: true,
                shadow: 1,
                border: 1,
                data: data.perkawinan
                    ? data.perkawinan.map((item) => ({
                          name: item.name,
                          y: item.y,
                      }))
                    : [], // Pastikan untuk menangani jika data.agama masih kosong
            },
        ],
    };

    return (
        <div className="flex flex-col gap-4 lg:px-16px-4 md:px-8 py-3">
            <div className="  grid grid-cols-2 lg:grid-cols-4 gap-5">
                <Card
                    count={10}
                    title={"Jumlah Kepala Keluarga"}
                    icon={<Group color="inherit" fontSize="inherit" />}
                />

                <Card
                    count={data.totalPenduduk}
                    title={"Jumlah Penduduk"}
                    icon={<Group color="inherit" fontSize="inherit" />}
                />
                <Card
                    count={data.totalLaki}
                    title={"Jumlah Laki-Laki"}
                    icon={<Group color="inherit" fontSize="inherit" />}
                />
                <Card
                    count={data.totalPerempuan}
                    title={"Jumlah Perempuan"}
                    icon={<Group color="inherit" fontSize="inherit" />}
                />
            </div>
            <div className=" bg-white py-2 px-4 rounded-md">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
                    <div className=" rounded-lg overflow-hidden bg-white shadow-sm shadow-gray-500/50  relative">
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={agamaChartPie}
                        />
                    </div>
                    <div className=" rounded-lg overflow-hidden bg-white shadow-sm shadow-gray-500/50  relative">
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={golonganChartPie}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
                    <div className=" rounded-lg overflow-hidden bg-white shadow-sm shadow-gray-500/50  relative">
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={pekerjaanChart}
                        />
                    </div>
                    <div className=" rounded-lg overflow-hidden bg-white shadow-sm shadow-gray-500/50  relative">
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={pendidikanChart}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1  gap-4 ">
                    <div className=" rounded-lg overflow-hidden bg-white shadow-sm shadow-gray-500/50  relative">
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={perkawinan}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
