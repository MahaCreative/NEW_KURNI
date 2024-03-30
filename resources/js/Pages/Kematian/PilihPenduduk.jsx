import InputText from "@/Components/InputText";
import { Check } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

export default function PilihPenduduk({ ...props }) {
    const [data, setData] = useState();
    const [params, setParams] = useState({ q: "" });
    const [pilih, setPilih] = useState({ id: "", status: false });
    useEffect(() => {
        fetchData();
    }, [params]);

    const fetchData = async () => {
        try {
            const response = await fetch(`/api-get-penduduk?q=${params.q}`);
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const pilihHandler = (row) => {
        setPilih({ ...pilih, id: row.id, status: true });
        props.getPenduduk(row);
    };
    const columns = [
        {
            name: "#",
            selector: (row) => (
                <div className="flex gap-1 items-center">
                    {pilih.id == row.id && pilih.status == true ? (
                        "Cancell"
                    ) : (
                        <Tooltip title={`Pilih ${row.nama}`}>
                            <button
                                onClick={() => pilihHandler(row)}
                                className="btn-primary"
                            >
                                <Check color="inherit" fontSize="small" />
                            </button>
                        </Tooltip>
                    )}
                </div>
            ),
            width: "70px",
            wrap: true,
        },
        {
            name: "Nama Lengkap",
            selector: (row) => row.nama,
            width: "160px",
            wrap: true,
        },
        {
            name: "Warga Dusun",
            selector: (row) => row.detail_dusun.dusun.nama,
            width: "160px",
            wrap: true,
        },
        {
            name: "NIK",
            selector: (row) => row.nik,
            width: "160px",
            wrap: true,
        },
        {
            name: "Status Hubungan Dalam Keluarga",
            selector: (row) => row.status_hubungan_dalam_keluarga.nama,
            width: "160px",
            wrap: true,
        },
    ];
    const lanjutHandler = () => {
        props.lanjut();
    };
    return (
        <div className="max-w-[90vw]">
            <p className="my-6">
                Silahkan melakukan pencarian data penduduk, menggunakan salah
                satu data berikut{" "}
                <span className="font-bold">Nama Penduduk</span>
                <span className="font-bold">,Nomor KK Penduduk</span>
                <span className="font-bold">Nik Penduduk</span>
            </p>
            <InputText
                value={params.q}
                label={"Search Penduduk"}
                onChange={(e) => setParams({ ...params, q: e.target.value })}
            />

            <div className="my-6 flex gap-3">
                <DataTable data={data} columns={columns} />
            </div>

            <div className="my-6 flex gap-4">
                <button
                    onClick={() => {
                        setPilih({ ...pilih, id: "", status: false });
                        props.cancell();
                    }}
                    className="btn-danger"
                >
                    Cancell
                </button>
                <button onClick={() => lanjutHandler()} className="btn-primary">
                    Lanjutkan pengimputan data
                </button>
            </div>
        </div>
    );
}
