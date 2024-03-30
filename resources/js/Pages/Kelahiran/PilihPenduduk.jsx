import InputText from "@/Components/InputText";
import { Check } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

export default function PilihPenduduk({ ...props }) {
    const [data, setData] = useState();
    const [params, setParams] = useState({ q: "" });
    const [pilih, setPilih] = useState({ ayah: false, ibu: false });
    useEffect(() => {
        fetchData();
    }, [params]);

    const fetchData = async () => {
        try {
            const response = await fetch(`/api-penduduk?q=${params.q}`);
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const columns = [
        {
            name: "#",
            selector: (row) => (
                <div className="flex gap-1 items-center">
                    <Tooltip title={`Pilih ayah ${row.nama}`}>
                        <button
                            onClick={() => pilihAyah(row)}
                            className="btn-primary"
                        >
                            <Check color="inherit" fontSize="small" />
                        </button>
                    </Tooltip>
                </div>
            ),
            width: "70px",
            wrap: true,
        },
        {
            name: "Nama Ayah",
            selector: (row) => row.nama,
            width: "160px",
            wrap: true,
        },
    ];
    const columnsIbu = [
        {
            name: "#",
            selector: (row) => (
                <div className="flex gap-1 items-center">
                    <Tooltip title={`Pilih Ibu ${row.nama}`}>
                        <button
                            onClick={() => pilihIbu(row)}
                            className="btn-primary"
                        >
                            <Check color="inherit" fontSize="small" />
                        </button>
                    </Tooltip>
                </div>
            ),
            width: "70px",
            wrap: true,
        },
        {
            name: "Nama Ibu",
            selector: (row) => row.nama,
            width: "160px",
            wrap: true,
        },
    ];
    const pilihAyah = (row) => {
        props.getAyah(row);
        setPilih({ ...pilih, ayah: true });
    };
    const pilihIbu = (row) => {
        props.getIbu(row);
        setPilih({ ...pilih, ibu: true });
    };
    return (
        <div className="max-w-[90vw]">
            <p className="my-6">
                Masukkan Data KK Penduduk Untuk Melanjutkan Penambahan Data
                Kelahiran
            </p>
            <InputText
                value={params.q}
                label={"KK Penduduk"}
                onChange={(e) => setParams({ ...params, q: e.target.value })}
            />
            {params.q ? (
                <div className="my-6 flex gap-3">
                    {pilih.ayah === false && (
                        <DataTable data={data?.ayah} columns={columns} />
                    )}
                    {pilih.ibu === false && (
                        <DataTable data={data?.ibu} columns={columnsIbu} />
                    )}
                </div>
            ) : (
                <p>
                    Silahkan melakukan pencarian data, dengan memasukkan KK
                    penduduk
                </p>
            )}
            <div className="my-6 flex gap-4">
                <button
                    onClick={() => {
                        setPilih({ ...pilih, ayah: false, ibu: false });
                    }}
                    className="btn-danger"
                >
                    Cancell
                </button>
                <button
                    onClick={() => props.lanjutPilih()}
                    className="btn-primary"
                >
                    Lanjutkan pengimputan data kelahiran
                </button>
            </div>
        </div>
    );
}
