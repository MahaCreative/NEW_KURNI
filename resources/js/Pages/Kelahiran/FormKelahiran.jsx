import InputText from "@/Components/InputText";
import { useForm, usePage } from "@inertiajs/react";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Tooltip,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ReactSelect from "react-select";
import Swal from "sweetalert2";

export default function FormKelahiran({ model, setModel, setOpen }) {
    const { data, setData, post, errors, reset } = useForm({
        nik: "",
        email: "",
        KK: "",
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
        tempat_dilahirkan: "",
        lanjut: false,
        foto_kk: "",
        foto_ktp_ibu: "",
        foto_ktp_ayah: "",
        surat_keterangan_lahir: "",
    });

    const { agama } = usePage().props;
    const { darah } = usePage().props;
    const [statusCek, setStatusCek] = useState(false);
    const cekOrangTua = (e) => {
        e.preventDefault();
        post(route("permintaan-kelahiran-cek-data-orang-tua"), {
            onSuccess: (success) => {},
            onError: (error) => {
                setData({ ...data, lanjut: error.lanjut });
                Swal.fire({
                    title: "Warning!",
                    text: error.message,
                    icon: error.type,
                    confirmButtonText: "OK",
                });
            },
            preserveScroll: true,
        });
    };
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
        post(route("post.kelahiran"), {
            preserveScroll: true,
            onError: (error) => {
                Swal.fire({
                    title: "Warning!",
                    text: error.message,
                    icon: error.type,
                    confirmButtonText: "OK",
                });
            },
            onSuccess: () => {
                resetFormulirOrangTua();
                reset();
                setStatusCek(false);
                setOpen(false);
                setModel(null);
            },
        });
    };
    const updateHandler = (e) => {
        e.preventDefault();
        post(route("update.kelahiran"), {
            preserveScroll: true,
            onError: (error) => {
                Swal.fire({
                    title: "Warning!",
                    text: error.message,
                    icon: error.type,
                    confirmButtonText: "OK",
                });
            },
            onSuccess: () => {
                resetFormulirOrangTua();
                reset();
                setStatusCek(false);
                setOpen(false);
                setModel(null);
            },
        });
    };
    const resetFormulirOrangTua = () => {
        reset();
        setData({
            ...data,
            nik_ayah: "",
            nik_ibu: "",
            KK: "",
            nama_ayah: "",
            nama_ibu: "",
            lanjut: false,
        });
    };

    useEffect(() => {
        setData({
            ...data,
            id: model ? model.id : "",
            nik: model ? model.nik : "",
            email: model ? model.email : "",
            KK: model ? model.KK : "",
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
            tempat_dilahirkan: model ? model.tempat_dilahirkan : "",
            lanjut: model ? true : false,
            foto_kk: model ? model.foto_kk : "",
            foto_ktp_ibu: model ? model.foto_ktp_ibu : "",
            foto_ktp_ayah: model ? model.foto_ktp_ayah : "",
            surat_keterangan_lahir: model ? model.surat_keterangan_lahir : "",
        });
    }, [model]);

    return (
        <div className="w-[80vw] md:w-[70vw] max-h-[80vh] overflow-y-auto">
            <form onSubmit={cekOrangTua}>
                {/* Datra Orang Tua */}
                <h1 className="text-orange-500 font-medium">
                    Masukkan Data KK dan Data Orang Tua Terlebih Dahulu
                </h1>
                <div className="grid grid-cols 1 md:grid-cols-2 gap-3 my-3">
                    <div className="col-span-2">
                        <InputText
                            label="KK"
                            name="KK"
                            error={errors.KK ? true : false}
                            helperText={errors.KK}
                            value={data.KK}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                    </div>
                    <FormControl fullWidth>
                        <InputText
                            label="NIK Ayah"
                            name="nik_ayah"
                            error={errors.nik_ayah ? true : false}
                            helperText={errors.nik_ayah}
                            value={data.nik_ayah}
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
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                    </FormControl>
                </div>
                {model && (
                    <div className="flex gap-4">
                        <button className="btn-primary ">
                            Cek Data Orang Tua
                        </button>
                        <button
                            type="button"
                            onClick={resetFormulirOrangTua}
                            className="btn-danger"
                        >
                            Reset Formulir Orang Tua
                        </button>
                    </div>
                )}
                {data.lanjut == false && (
                    <div className="flex gap-4">
                        <button className="btn-primary ">
                            Cek Data Orang Tua
                        </button>
                        <button
                            type="button"
                            onClick={resetFormulirOrangTua}
                            className="btn-danger"
                        >
                            Reset Formulir Orang Tua
                        </button>
                    </div>
                )}
            </form>
            <form onSubmit={model ? updateHandler : submitHandler}>
                <h1 className="text-orange-500 font-medium my-4">
                    Silahkan mengisi formulir data anak yang akan dibuatkan
                    surat keterangan lahir
                </h1>
                {data.lanjut && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="flex gap-2 items-center">
                                <InputText
                                    label="Email"
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
                                <Tooltip title="Anda akan menerima informasi persetujuan dari admin melalui email anda">
                                    <div className="bg-slate-900 hover:cursor-pointer w-7 h-7 text-center flex items-center justify-center leading-none tracking-tighter rounded-full text-white">
                                        <p>?</p>
                                    </div>
                                </Tooltip>
                            </div>
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
                            <FormControl fullWidth>
                                <TextField
                                    id="outlined-select-currency"
                                    select
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
                                    <MenuItem value="">
                                        Pilih Jenis Kelamin
                                    </MenuItem>
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
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Tempat Dilahirkan"
                                    name="tempat_dilahirkan"
                                    error={
                                        errors.tempat_dilahirkan ? true : false
                                    }
                                    helperText={errors.tempat_dilahirkan}
                                    value={data.tempat_dilahirkan}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                >
                                    <MenuItem value="">
                                        Pilih Tempat Lahiran
                                    </MenuItem>
                                    <MenuItem value="rumah sakit">
                                        Rumah Sakit
                                    </MenuItem>
                                    <MenuItem value="puskesmas">
                                        Puskesmas
                                    </MenuItem>
                                    <MenuItem value="poliklinik">
                                        Poliklinik
                                    </MenuItem>
                                    <MenuItem value="rumah">Rumah</MenuItem>
                                    <MenuItem value="lainnya">Lainnya</MenuItem>
                                </TextField>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputText
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
                        </div>
                        <div>
                            <FormControl fullWidth>
                                <label>Foto Surat Keterangan Lahir</label>
                                <InputText
                                    label=""
                                    name="surat_keterangan_lahir"
                                    type="file"
                                    error={
                                        errors.surat_keterangan_lahir
                                            ? true
                                            : false
                                    }
                                    helperText={errors.surat_keterangan_lahir}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            surat_keterangan_lahir:
                                                e.target.files[0],
                                        })
                                    }
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <label>
                                    Foto Surat Kartu Keluarga yang Bersangkutan
                                </label>
                                <InputText
                                    label=""
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
                                <label>Foto KTP Ayah</label>
                                <InputText
                                    name="foto_ktp_ayah"
                                    type="file"
                                    error={errors.foto_ktp_ayah ? true : false}
                                    helperText={errors.foto_ktp_ayah}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            foto_ktp_ayah: e.target.files[0],
                                        })
                                    }
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <label>Foto KTP Ibu</label>
                                <InputText
                                    name="foto_ktp_ibu"
                                    type="file"
                                    error={errors.foto_ktp_ibu ? true : false}
                                    helperText={errors.foto_ktp_ibu}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            foto_ktp_ibu: e.target.files[0],
                                        })
                                    }
                                />
                            </FormControl>
                        </div>
                    </>
                )}
                <button className="btn-primary w-full text-center flex justify-center my-3 py-3">
                    {model ? "Update Data Kelahiran" : "Simpan Data Kelahiran"}
                </button>
            </form>
        </div>
    );
}
