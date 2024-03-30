import { router, useForm, usePage } from "@inertiajs/react";
import { FormControl } from "@mui/base";
import { Cancel, PictureAsPdfOutlined, Print } from "@mui/icons-material";
import { MenuItem, TextField } from "@mui/material";
import axios from "axios";
import React from "react";

export default function FormExport() {
    const { data, setData, post, reset, errors } = useForm({
        dusun_asal: "",
        tanggal_awal: "",
        sampai_tanggal: "",
        kategori: "",
    });
    const { dusun } = usePage().props;
    const exportHandler = () => {
        axios
            .get(route("export.laporan-pindah"), {
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
                link.setAttribute("download", "Laporan-data-pindah.pdf");
                document.body.appendChild(link);
                link.click();
            })
            .catch((error) => console.error("error downloading PDF:", error));
    };
    const cetakHandler = () => {
        window.open(route("cetak.laporan-pindah", data));
    };
    console.log(data.dusun_asal);
    return (
        <div className="w-[90vw] md:w-[50vw] flex-col flex gap-4">
            <FormControl className="w-full" fullWidth>
                <TextField
                    className="w-full"
                    id="outlined-select-currency"
                    select
                    label="Kategori Pindah"
                    name="kategori"
                    error={errors.kategori ? true : false}
                    helperText={errors.kategori}
                    value={data.kategori}
                    onChange={(e) =>
                        setData({
                            ...data,
                            [e.target.name]: e.target.value,
                        })
                    }
                >
                    <MenuItem value="">Pilih Kategori Pindahan</MenuItem>
                    <MenuItem value={"masuk"}>Pindah Masuk</MenuItem>
                    <MenuItem value={"keluar"}>Pindah Keluar</MenuItem>
                </TextField>
            </FormControl>

            <FormControl className="w-full" fullWidth>
                <TextField
                    className="w-full"
                    id="outlined-select-currency"
                    select
                    label="Dusun Asal"
                    name="dusun_asal"
                    error={errors.dusun_asal ? true : false}
                    helperText={errors.dusun_asal}
                    value={data.dusun_asal}
                    onChange={(e) =>
                        setData({
                            ...data,
                            [e.target.name]: e.target.value,
                        })
                    }
                >
                    <MenuItem value="">Pilih Dusun</MenuItem>
                    {dusun.map((item, key) => (
                        <MenuItem key={key} value={item.nama}>
                            {item.nama}
                        </MenuItem>
                    ))}
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
