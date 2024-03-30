import AppLayouts from "@/Layouts/AppLayouts";
import { Link, useForm, usePage } from "@inertiajs/react";
import {
    ArrowBack,
    Cancel,
    PictureAsPdfOutlined,
    Print,
} from "@mui/icons-material";
import { FormControl, InputLabel, MenuItem, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import ReactSelect from "react-select";

export default function LaporanPenduduk() {
    const { pendidikan } = usePage().props;
    const { agama } = usePage().props;
    const { darah } = usePage().props;
    const { dusun } = usePage().props;
    const { pekerjaan } = usePage().props;
    const { status_hubungan_dalam_keluarga } = usePage().props;
    const { status_perkawinan } = usePage().props;
    const { data, setData, post, errors, reset } = useForm({
        dusun_id: "",
        darah_id: "",
        agama_id: "",
        pendidikan_id: "",
        pekerjaan_id: "",
        status_hubungan_dalam_keluarga_id: "",
        status_perkawinan_id: "",
        sampai_tanggal: "",
        tanggal_awal: "",
    });
    const exportHandler = () => {
        axios
            .get(route("export.laporan-penduduk"), {
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
                link.setAttribute("download", "Laporan-data-penduduk.pdf");
                document.body.appendChild(link);
                link.click();
            })
            .catch((error) => console.error("error downloading PDF:", error));
    };
    const cetakHandler = () => {
        window.open(route("cetak.laporan-penduduk", data));
    };
    console.log(data.dusun_id);
    return (
        <div className="w-[90vw] md:w-[50vw]">
            <div className="w-full h-full flex justify-center">
                <div className="bg-white rounded-md px-4 w-full">
                    <div className="">
                        <p className="my-7 text-xl text-orange-400">
                            Filter Pencarian Data Penduduk
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormControl fullWidth>
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Dusun"
                                    name="dusun_id"
                                    error={errors.dusun_id ? true : false}
                                    helperText={errors.dusun_id}
                                    value={data.dusun_id}
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
                            <FormControl fullWidth>
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Golongan Darah"
                                    name="darah_id"
                                    value={data.darah_id}
                                    error={errors.golongan_darah ? true : false}
                                    helperText={errors.golongan_darah}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                >
                                    <MenuItem value="">
                                        Pilih Golongan Darah
                                    </MenuItem>
                                    {darah.map((item, key) => (
                                        <MenuItem key={key} value={item.id}>
                                            {item.golongan}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </FormControl>
                            <FormControl fullWidth>
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Agama"
                                    name="agama_id"
                                    value={data.agama_id}
                                    error={errors.agama ? true : false}
                                    helperText={errors.agama}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                >
                                    <MenuItem value="">Pilih Agama</MenuItem>
                                    {agama.map((item, key) => (
                                        <MenuItem key={key} value={item.id}>
                                            {item.nama}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </FormControl>
                            <FormControl fullWidth>
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Pendidikan"
                                    name="pendidikan_id"
                                    value={data.pendidikan_id}
                                    error={errors.pendidikan ? true : false}
                                    helperText={errors.pendidikan}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                >
                                    <MenuItem value="">
                                        Pilih Pendidikan
                                    </MenuItem>
                                    {pendidikan.map((item, key) => (
                                        <MenuItem key={key} value={item.id}>
                                            {item.nama}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </FormControl>
                            <div>
                                <InputLabel>Pekerjaan</InputLabel>
                                <ReactSelect
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            pekerjaan_id: e.value,
                                        })
                                    }
                                    className=""
                                    value={data.pekerjaan_id}
                                    options={pekerjaan.map((item, key) => ({
                                        value: item.id,
                                        label: item.nama,
                                    }))}
                                />
                                {errors.pekerjaan_id && (
                                    <p className="text-xs text-red-500">
                                        {errors.pekerjaan_id}
                                    </p>
                                )}
                            </div>
                            <FormControl fullWidth>
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Status Hubungan Dalam Keluarga"
                                    name="status_hubungan_dalam_keluarga_id"
                                    value={
                                        data.status_hubungan_dalam_keluarga_id
                                    }
                                    error={
                                        errors.status_hubungan_dalam_keluarga_id
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors.status_hubungan_dalam_keluarga_id
                                    }
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                >
                                    <MenuItem value="">
                                        Pilih Status Hubungan
                                    </MenuItem>
                                    {status_hubungan_dalam_keluarga.map(
                                        (item, key) => (
                                            <MenuItem key={key} value={item.id}>
                                                {item.nama}
                                            </MenuItem>
                                        )
                                    )}
                                </TextField>
                            </FormControl>
                            <FormControl fullWidth>
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Status Perkawinan"
                                    name="status_perkawinan_id"
                                    value={data.status_perkawinan_id}
                                    error={
                                        errors.status_perkawinan_id
                                            ? true
                                            : false
                                    }
                                    helperText={errors.status_perkawinan_id}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                >
                                    <MenuItem value="">
                                        Pilih Status Perkawinan
                                    </MenuItem>
                                    {status_perkawinan.map((item, key) => (
                                        <MenuItem key={key} value={item.id}>
                                            {item.nama}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </FormControl>
                            <FormControl fullWidth>
                                <label htmlFor="">Dari Tanggal</label>
                                <TextField
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
                        </div>
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
                </div>
            </div>
        </div>
    );
}
