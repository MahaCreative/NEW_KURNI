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

export default function Form({ model, setModel, setOpen }) {
    const { data, setData, post, errors, reset } = useForm({
        nik: "",
        kk: "",
        nama: "",
        jenis_kelamin: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        agama_id: "",
        darah_id: "",
        nik_ayah: "",
        nik_ibu: "",
        nama_ayah: "",
        nama_ibu: "",
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
            darah_id: model ? model.darah_id : "",
            nik_ayah: model ? model.nik_ayah : "",
            nik_ibu: model ? model.nik_ibu : "",
            nama_ayah: model ? model.nama_ayah : "",
            nama_ibu: model ? model.nama_ibu : "",
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
        post(route("post.penduduk"), {
            onSuccess: () => {
                setModel(null);
                setOpen(false);
            },
        });
    };
    const updateHandler = (e) => {
        e.preventDefault();
        post(route("update.penduduk"), {
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
            <form onSubmit={model ? updateHandler : submitHandler}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                        <InputText
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
                </div>
                <div className="grid grid-cols 1 md:grid-cols-2 gap-3 my-3">
                    <FormControl fullWidth>
                        <InputText
                            label="NIK Ayah"
                            name="nik_ayah"
                            error={errors.nik_ayah ? true : false}
                            helperText={errors.nik_ayah}
                            value={data.nik_ayah}
                            defaultValue={data.nik_ayah}
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
                            label="Nama Ayah"
                            name="nama_ayah"
                            error={errors.nama_ayah ? true : false}
                            helperText={errors.nama_ayah}
                            value={data.nama_ayah}
                            defaultValue={data.nama_ayah}
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
                            label="Nik Ibu"
                            name="nik_ibu"
                            error={errors.nik_ibu ? true : false}
                            helperText={errors.nik_ibu}
                            value={data.nik_ibu}
                            defaultValue={data.nik_ibu}
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
                            label="Nama Ibu"
                            name="nama_ibu"
                            error={errors.nama_ibu ? true : false}
                            helperText={errors.nama_ibu}
                            value={data.nama_ibu}
                            defaultValue={data.nama_ibu}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                    </FormControl>
                </div>

                <button className="btn-primary w-full text-center flex justify-center my-3 py-3">
                    {model ? "Update" : "Simpan"}
                </button>
            </form>
        </div>
    );
}
