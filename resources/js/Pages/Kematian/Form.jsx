import InputText from "@/Components/InputText";
import { useForm, usePage } from "@inertiajs/react";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ReactSelect from "react-select";

export default function Form({ model, setModel, setOpen, isUpdate = false }) {
    const { data, setData, post, errors, reset } = useForm({
        nik: "",
        kk: "",
        dusun: "",
        nama: "",
        jenis_kelamin: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        agama_id: "",
        pendidikan_id: "",
        pekerjaan_id: "",
        darah_id: "",
        status_perkawinan_id: "",
        status_hubungan_dalam_keluarga_id: "",
        hari_kematian: "",
        tgl_kematian: "",
        waktu_kematian: "",
        sebab_kematian: "",
        tempat_kematian: "",
        detail_dusun_id: "",
    });
    useEffect(() => {
        setData({
            ...data,
            id: model ? model.id : "",
            nik: model ? model.nik : "",
            kk: model ? model.kk : "",
            nama: model ? model.nama : "",
            jenis_kelamin: model ? model.jenis_kelamin : "",
            tempat_lahir: model ? model.tempat_lahir : "",
            tanggal_lahir: model ? model.tanggal_lahir : "",
            agama_id: model ? model.agama_id : "",
            pendidikan_id: model ? model.pendidikan_id : "",
            pekerjaan_id: model ? model.pekerjaan_id : "",
            darah_id: model ? model.darah_id : "",
            status_perkawinan_id: model ? model.status_perkawinan_id : "",
            status_hubungan_dalam_keluarga_id: model
                ? model.status_hubungan_dalam_keluarga_id
                : "",
            hari_kematian: model ? model.hari_kematian : "",
            tgl_kematian: model ? model.tgl_kematian : "",
            waktu_kematian: model ? model.waktu_kematian : "",
            sebab_kematian: model ? model.sebab_kematian : "",
            tempat_kematian: model ? model.tempat_kematian : "",
            detail_dusun_id: model ? model.detail_dusun_id : "",
        });
    }, [model]);
    const { pendidikan } = usePage().props;
    const { agama } = usePage().props;
    const { darah } = usePage().props;
    const { dusun } = usePage().props;
    const { pekerjaan } = usePage().props;
    const { status_hubungan_dalam_keluarga } = usePage().props;
    const { status_perkawinan } = usePage().props;
    const [modelDusun, setModelDusun] = useState(null);

    const submitHandler = (e) => {
        e.preventDefault();
        post(route("post.kematian"), {
            onSuccess: () => {
                setModel(null);
                setOpen(false);
            },
        });
    };
    const updateHandler = (e) => {
        e.preventDefault();
        post(route("update.kematian"), {
            onSuccess: () => {
                setModel(null);
                setOpen(false);
            },
        });
    };
    const pilihDusun = (e) => {
        setModelDusun(e.target.value);
        setData({ ...data, dusun: e.target.value.nama });
        console.log(e.target.value.nama);
    };

    return (
        <div className="w-[90vw] max-h-[80vh] overflow-y-auto">
            <form onSubmit={isUpdate ? updateHandler : submitHandler}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                        <InputText
                            disabled
                            label="NIK"
                            value={data.nik}
                            defaultValue={data.nik}
                            name="nik"
                            error={errors.nik ? true : false}
                            helperText={errors.nik}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div>
                        <InputText
                            disabled
                            label="KK"
                            name="kk"
                            error={errors.kk ? true : false}
                            helperText={errors.kk}
                            value={data.kk}
                            defaultValue={data.kk}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div>
                        <InputText
                            disabled
                            label="NAMA"
                            name="nama"
                            value={data.nama}
                            defaultValue={data.nama}
                            error={errors.nama ? true : false}
                            helperText={errors.nama}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                    </div>
                    <FormControl fullWidth>
                        <TextField
                            disabled
                            id="outlined-select-currency"
                            select
                            label="Jenis Kelamin"
                            name="jenis_kelamin"
                            error={errors.jenis_kelamin ? true : false}
                            helperText={errors.jenis_kelamin}
                            value={data.jenis_kelamin}
                            defaultValue={data.jenis_kelamin}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        >
                            <MenuItem value="">Pilih Jenis Kelamin</MenuItem>
                            <MenuItem value="1">Laki-Laki</MenuItem>
                            <MenuItem value="2">Perempuan</MenuItem>
                        </TextField>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputText
                            disabled
                            label="Tempat Lahir"
                            name="tempat_lahir"
                            error={errors.tempat_lahir ? true : false}
                            value={data.tempat_lahir}
                            defaultValue={data.tempat_lahir}
                            helperText={errors.tempat_lahir}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <InputText
                            disabled
                            name="tanggal_lahir"
                            type="date"
                            value={data.tanggal_lahir}
                            defaultValue={data.tanggal_lahir}
                            error={errors.tanggal_lahir ? true : false}
                            helperText={errors.tanggal_lahir}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            disabled
                            id="outlined-select-currency"
                            select
                            label="Golongan Darah"
                            name="darah_id"
                            value={data.darah_id}
                            defaultValue={data.darah_id}
                            error={errors.golongan_darah ? true : false}
                            helperText={errors.golongan_darah}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        >
                            <MenuItem value="">Pilih Golongan Darah</MenuItem>
                            {darah.map((item, key) => (
                                <MenuItem key={key} value={item.id}>
                                    {item.golongan}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            disabled
                            id="outlined-select-currency"
                            select
                            label="Agama"
                            name="agama_id"
                            value={data.agama_id}
                            defaultValue={data.agama_id}
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
                            disabled
                            id="outlined-select-currency"
                            select
                            label="Pendidikan"
                            name="pendidikan_id"
                            value={data.pendidikan_id}
                            defaultValue={data.pendidikan_id}
                            error={errors.pendidikan ? true : false}
                            helperText={errors.pendidikan}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        >
                            <MenuItem value="">Pilih Pendidikan</MenuItem>
                            {pendidikan.map((item, key) => (
                                <MenuItem key={key} value={item.id}>
                                    {item.nama}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>

                    <FormControl fullWidth>
                        <TextField
                            disabled
                            id="outlined-select-currency"
                            select
                            label="Status Hubungan Dalam Keluarga"
                            name="status_hubungan_dalam_keluarga_id"
                            value={data.status_hubungan_dalam_keluarga_id}
                            defaultValue={
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
                            <MenuItem value="">Pilih Status Hubungan</MenuItem>
                            {status_hubungan_dalam_keluarga.map((item, key) => (
                                <MenuItem key={key} value={item.id}>
                                    {item.nama}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>

                    <FormControl fullWidth>
                        <TextField
                            disabled
                            id="outlined-select-currency"
                            select
                            label="Status Perkawinan"
                            name="status_perkawinan_id"
                            value={data.status_perkawinan_id}
                            defaultValue={data.status_perkawinan_id}
                            error={errors.status_perkawinan_id ? true : false}
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
                </div>
                <div className="grid grid-cols 1 md:grid-cols-2 gap-3 my-3">
                    <FormControl fullWidth>
                        <InputText
                            label="Hari Kematian"
                            name="hari_kematian"
                            error={errors.hari_kematian ? true : false}
                            helperText={errors.hari_kematian}
                            value={data.hari_kematian}
                            defaultValue={data.hari_kematian}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <p>Tanggal kematian</p>
                        <InputText
                            name="tgl_kematian"
                            error={errors.tgl_kematian ? true : false}
                            helperText={errors.tgl_kematian}
                            value={data.tgl_kematian}
                            defaultValue={data.tgl_kematian}
                            type="date"
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <p>Waktu Kematian</p>
                        <InputText
                            label="waktu kematian"
                            name="waktu_kematian"
                            error={errors.waktu_kematian ? true : false}
                            helperText={errors.waktu_kematian}
                            value={data.waktu_kematian}
                            defaultValue={data.waktu_kematian}
                            type="time"
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <InputText
                            label="Tempat Kematian"
                            name="tempat_kematian"
                            error={errors.tempat_kematian ? true : false}
                            helperText={errors.tempat_kematian}
                            value={data.tempat_kematian}
                            defaultValue={data.tempat_kematian}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                    </FormControl>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-3">
                    <FormControl fullWidth>
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Sebab Kematian"
                            name="sebab_kematian"
                            value={data.sebab_kematian}
                            defaultValue={data.sebab_kematian}
                            error={errors.sebab_kematian ? true : false}
                            helperText={errors.sebab_kematian}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        >
                            <MenuItem value={null}>
                                Pilih Sebab Kematian
                            </MenuItem>
                            <MenuItem value={"sakit biasa / tua"}>
                                Sakit Biasa / Tua
                            </MenuItem>
                            <MenuItem value={"wabah penyakit"}>
                                Wabah Penyakit
                            </MenuItem>
                            <MenuItem value={"kecelakaan"}>Kecelakaan</MenuItem>
                            <MenuItem value={"kriminalitas"}>
                                Kriminalitas
                            </MenuItem>
                            <MenuItem value={"bunuh diri"}>Bunuh Diri</MenuItem>
                            <MenuItem value={"lainnya"}>Lainnya</MenuItem>
                        </TextField>
                    </FormControl>
                </div>
                <button className="btn-primary w-full text-center flex justify-center my-3 py-3">
                    Simpan
                </button>
            </form>
        </div>
    );
}
