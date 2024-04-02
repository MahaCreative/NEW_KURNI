import InputText from "@/Components/InputText";
import { router, useForm, usePage } from "@inertiajs/react";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ReactSelect from "react-select";
import Swal from "sweetalert2";

export default function FormKematian({
    model,
    setModel,
    setOpen,
    isUpdate = false,
    ...props
}) {
    const { data, setData, post, errors, reset } = useForm({
        nik: "",
        email: "",
        kk: "",
        nama: "",
        dusun: "",
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
        foto_kk: "",
        foto_ktp: "",
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
    const { flash } = usePage().props;
    useEffect(() => {
        // Cek apakah ada pesan flash dan tipe flash tidak sama dengan null
        if (flash && flash.type !== null) {
            setTimeout(() => {
                Swal.fire({
                    icon: flash.type,
                    title: flash.type === "error" ? "Error" : "Good Job",
                    text: flash.message,
                    background: true,
                    allowEscapeKey: true,
                });
            }, 300);
            // Set pesan flash menjadi null setelah menampilkan SweetAlert2
        }
    }, [flash]);

    const submitHandler = (e) => {
        e.preventDefault();
        post(route("post-permintaan-kematian"), {
            onSuccess: () => {},
            onError: (error) => {
                console.log(error);
                props.getLoading(false);
                setTimeout(() => {
                    Swal.fire({
                        title: "Warning!",
                        text: error.message,
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                }, 1000);
            },
            preserveScroll: true,
        });
    };
    const cekDataHandler = async (e) => {
        e.preventDefault();
        props.getLoading(true);
        axios
            .post(route("cek_penduduk"), data)
            .then((response) => {
                // Callback onSuccess
                setTimeout(() => {
                    props.getLoading(false);
                    setData({
                        ...data,
                        nama: response.data.nama,
                        jenis_kelamin: response.data.jenis_kelamin,
                        tempat_lahir: response.data.tempat_lahir,
                        tanggal_lahir: response.data.tanggal_lahir,
                        agama_id: response.data.agama_id,
                        pendidikan_id: response.data.pendidikan_id,
                        pekerjaan_id: response.data.pekerjaan_id,
                        darah_id: response.data.darah_id,
                        status_perkawinan_id:
                            response.data.status_perkawinan_id,
                        status_hubungan_dalam_keluarga_id:
                            response.data.status_hubungan_dalam_keluarga_id,
                    });
                }, 1000);
            })
            .catch((error) => {
                // Callback onError
                props.getLoading(false);
                setTimeout(() => {
                    Swal.fire({
                        title: "Warning!",
                        text: error.response.data.error,
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                }, 1000);
            });
    };
    return (
        <div className="w-[90vw] bg-white">
            <form onSubmit={submitHandler}>
                <div className="my-4">
                    <InputText
                        label="Email"
                        type="email"
                        value={data.email}
                        name="email"
                        error={errors.email ? true : false}
                        helperText={errors.email}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                        <InputText
                            label="NIK"
                            value={data.nik}
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
                    <div
                        type="button"
                        onClick={cekDataHandler}
                        className="btn-primary col-span-3 flex items-center justify-center hover:cursor-pointer"
                    >
                        Cek Data
                    </div>
                    <FormControl fullWidth>
                        <TextField
                            id="outlined-select-currency"
                            select
                            disabled
                            label="Jenis Kelamin"
                            name="jenis_kelamin"
                            error={errors.jenis_kelamin ? true : false}
                            helperText={errors.jenis_kelamin}
                            value={data.jenis_kelamin}
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
                            disabled
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
                            disabled
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
                            disabled
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
                            id="outlined-select-currency"
                            select
                            disabled
                            label="Status Hubungan Dalam Keluarga"
                            name="status_hubungan_dalam_keluarga_id"
                            value={data.status_hubungan_dalam_keluarga_id}
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
                            id="outlined-select-currency"
                            select
                            disabled
                            label="Status Perkawinan"
                            name="status_perkawinan_id"
                            value={data.status_perkawinan_id}
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
                        <p>Hari kematian</p>
                        <InputText
                            label="Hari Kematian"
                            name="hari_kematian"
                            error={errors.hari_kematian ? true : false}
                            helperText={errors.hari_kematian}
                            value={data.hari_kematian}
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
                        <p>Tempat kematian</p>
                        <InputText
                            label="Tempat Kematian"
                            name="tempat_kematian"
                            error={errors.tempat_kematian ? true : false}
                            helperText={errors.tempat_kematian}
                            value={data.tempat_kematian}
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
                <FormControl fullWidth>
                    <label>Foto Kartu Keluarga</label>
                    <InputText
                        name="foto_kk"
                        type="file"
                        error={errors.foto_kk ? true : false}
                        helperText={errors.foto_kk}
                        onChange={(e) =>
                            setData({
                                ...data,
                                foto_kk: e.target.files[0],
                            })
                        }
                    />
                </FormControl>
                <FormControl fullWidth>
                    <label>Foto KTP</label>
                    <InputText
                        name="foto_ktp"
                        type="file"
                        error={errors.foto_ktp ? true : false}
                        helperText={errors.foto_ktp}
                        onChange={(e) =>
                            setData({
                                ...data,
                                foto_ktp: e.target.files[0],
                            })
                        }
                    />
                </FormControl>
                <button className="btn-primary w-full text-center flex justify-center my-3 py-3">
                    Simpan
                </button>
            </form>
        </div>
    );
}
