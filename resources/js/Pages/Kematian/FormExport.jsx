import { router, useForm, usePage } from "@inertiajs/react";
import { FormControl } from "@mui/base";
import { Cancel, PictureAsPdfOutlined, Print } from "@mui/icons-material";
import { MenuItem, TextField } from "@mui/material";
import axios from "axios";
import React from "react";

export default function FormExport() {
    const { data, setData, post, reset, errors } = useForm({
        dusun_id: "",
        tanggal_awal: "",
        sampai_tanggal: "",
        sebab_kematian: "",
    });
    const { dusun } = usePage().props;
    const exportHandler = () => {
        axios
            .get(route("export.laporan-kematian"), {
                responseType: "arraybuffer", // Tentukan tipe respons sebagai arraybuffer
                params: data,
            })
            .then((response) => {
                const blob = new Blob([response.data], {
                    type: "application/pdf",
                }); // Buat objek blob dari arraybuffer
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "Laporan-data-kematian.pdf");
                document.body.appendChild(link);
                link.click();
            })
            .catch((error) => console.error("error downloading PDF:", error));
    };
    const cetakHandler = () => {
        window.open(route("cetak.laporan-kematian", data));
    };

    return (
        <div className="w-[90vw] md:w-[50vw] flex-col flex gap-4">
            <FormControl className="w-full" fullWidth>
                <TextField
                    className="w-full"
                    id="outlined-select-currency"
                    select
                    label="Dusun"
                    name="dusun_id"
                    error={errors.dusun_id ? true : false}
                    helperText={errors.dusun_id}
                    value={data.dusun_id}
                    defaultValue={data.dusun_id}
                    onChange={(e) =>
                        setData({
                            ...data,
                            [e.target.name]: e.target.value,
                        })
                    }
                >
                    <MenuItem value="">Pilih Dusun</MenuItem>
                    {dusun.map((item, key) => (
                        <MenuItem key={key} value={item.id}>
                            {item.nama}
                        </MenuItem>
                    ))}
                </TextField>
            </FormControl>
            <FormControl className="w-full" fullWidth>
                <TextField
                    className="w-full"
                    id="outlined-select-currency"
                    select
                    label="Sebab Kematian"
                    name="sebab_kematian"
                    error={errors.sebab_kematian ? true : false}
                    helperText={errors.sebab_kematian}
                    value={data.sebab_kematian}
                    defaultValue={data.sebab_kematian}
                    onChange={(e) =>
                        setData({
                            ...data,
                            [e.target.name]: e.target.value,
                        })
                    }
                >
                    <MenuItem value="">Pilih Sebab Kematian</MenuItem>
                    <MenuItem value={"sakit biasa / tua"}>
                        Sakit Biasa / Tua
                    </MenuItem>
                    <MenuItem value={"wabah penyakit"}>Wabah Penyakit</MenuItem>
                    <MenuItem value={"kecelakaan"}>Kecelakaan</MenuItem>
                    <MenuItem value={"kriminalitas"}>Kriminalitas</MenuItem>
                    <MenuItem value={"bunuh diri"}>Bunuh Diri</MenuItem>
                    <MenuItem value={"lainnya"}>Lainnya</MenuItem>
                </TextField>
            </FormControl>
            <FormControl fullWidth>
                <label htmlFor="">Dari Tanggal</label>
                <TextField
                    className="w-full"
                    type="date"
                    name="tanggal_awal"
                    error={errors.tanggal_awal ? true : false}
                    value={data.tanggal_awal}
                    defaultValue={data.tanggal_awal}
                    helperText={errors.tanggal_awal}
                    onChange={(e) =>
                        setData({
                            ...data,
                            [e.target.name]: e.target.value,
                        })
                    }
                />
            </FormControl>
            <FormControl fullWidth>
                <label htmlFor="">Sampai Tanggal</label>
                <TextField
                    className="w-full"
                    type="date"
                    name="sampai_tanggal"
                    error={errors.sampai_tanggal ? true : false}
                    value={data.sampai_tanggal}
                    defaultValue={data.sampai_tanggal}
                    helperText={errors.sampai_tanggal}
                    onChange={(e) =>
                        setData({
                            ...data,
                            [e.target.name]: e.target.value,
                        })
                    }
                />
            </FormControl>
            <div className="w-full justify-end flex my-4">
                <div className="flex gap-4 items-start">
                    <button
                        onClick={exportHandler}
                        className="btn-primary flex gap-3"
                    >
                        <PictureAsPdfOutlined
                            color="inherit"
                            fontSize="large"
                        />
                        Export PDF
                    </button>
                    <button
                        onClick={cetakHandler}
                        className="btn-success flex gap-3"
                    >
                        <Print color="inherit" fontSize="large" />
                        Cetak
                    </button>
                    <button
                        onClick={() => reset()}
                        className="btn-danger flex gap-3"
                    >
                        <Cancel color="inherit" fontSize="large" />
                        Cancell
                    </button>
                </div>
            </div>
        </div>
    );
}
