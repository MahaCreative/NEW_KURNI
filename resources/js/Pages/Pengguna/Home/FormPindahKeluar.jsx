import InputText from "@/Components/InputText";
import Modal from "@/Components/Modal";
import { router, useForm, usePage } from "@inertiajs/react";
import { Check, Delete } from "@mui/icons-material";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Tooltip,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import DataTable from "react-data-table-component";
import ReactSelect from "react-select";
import Swal from "sweetalert2";

export default function FormPindahKeluar({ model, ...props }) {
    const { desa } = usePage().props;
    const { data, setData, post, errors, reset } = useForm({
        email: "",
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
        desa_asal: "",
        dusun_asal: "",
        rt_asal: "",
        rw_asal: "",
        alamat_asal: "",
        desa_tujuan: "",
        dusun_tujuan: "",
        rt_tujuan: "",
        rw_tujuan: "",
        alamat_tujuan: "",
        tgl_pindah: "",
        alasan_pindah: "",
        kategori_pindah: "keluar",
        pengikut: [],
        nik_pengikut: "",
        nama_pengikut: "",
        shdk_pengikut: "",
        nama_shdk_pengikut: "",
    });
    const { flash } = usePage().props;

    const { pendidikan } = usePage().props;
    const { agama } = usePage().props;
    const { darah } = usePage().props;

    const { status_hubungan_dalam_keluarga } = usePage().props;
    const { status_perkawinan } = usePage().props;
    const submitHandler = (e) => {
        e.preventDefault();
        router.post(
            route("permintaan-pindah-keluar"),
            { ...data },
            {
                preserveScroll: true,
                onError: (error) => {
                    Swal.fire({
                        title: "Warning!",
                        text: error.message,
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                },
                onSuccess: () => {
                    reset();
                    setTimeout(() => {
                        Swal.fire({
                            icon: flash.type,
                            title:
                                flash.type === "error" ? "Error" : "Good Job",
                            text: "Berhasil mengajukan permintaan surat keterangan pindah domisili. silahkan menunggu petugas desa melakukan pengecekan data, setelah petugas melakukan pengecekan data maka anda akan mendapat pesan email yang berisi LINK Surat Keterangan Pindah Domisili Anda",
                            background: true,
                            allowEscapeKey: true,
                        });
                    }, 300);
                },
            }
        );
    };

    const columns = [
        {
            name: "Nama Lengkap",
            selector: (row) => row.nama,
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
            selector: (row) => row.nama_shdk_pengikut,
            wrap: true,
        },
        {
            name: "Aksi",
            selector: (row) => (
                <Tooltip title="Hapus Pengikut">
                    <button
                        onClick={() => removeHandler(row.nik)}
                        className="btn-danger"
                    >
                        <Delete color="inherit" fontSize="inherit" />
                    </button>
                </Tooltip>
            ),
            wrap: true,
        },
    ];
    const [selectedRows, setSelectedRows] = useState([]);
    const cekDataHandler = () => {
        // props.getLoading(true);

        axios
            .post(route("cek_penduduk"), data)
            .then((response) => {
                // Callback onSuccess
                setTimeout(() => {
                    props.getLoading(false);
                    setData({
                        ...data,
                        desa_asal: desa.nama_desa,
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
                        dusun_asal: response.data.detail_dusun.dusun.nama,
                        rt_asal: response.data.detail_dusun.rt,
                        rw_asal: response.data.detail_dusun.rw,
                        alamat_asal: response.data.alamat,
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
    const cekPengikut = () => {
        axios
            .post(route("cek_penduduk"), {
                nik: data.nik_pengikut,
                kk: data.kk,
            })
            .then((response) => {
                // Callback onSuccess
                setTimeout(() => {
                    props.getLoading(false);
                    console.log(response.data);
                    setData({
                        ...data,
                        nama_pengikut: response.data.nama,
                        shdk_pengikut:
                            response.data.status_hubungan_dalam_keluarga_id,
                        nama_shdk_pengikut:
                            response.data.status_hubungan_dalam_keluarga.nama,
                    });
                }, 1000);
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: "btn btn-success",
                        cancelButton: "btn btn-danger",
                    },
                    buttonsStyling: false,
                });
                swalWithBootstrapButtons
                    .fire({
                        title: "Anda yakin?",
                        text: `Apakah anda akan menambahkan anggota keluarga ${response.data.nama}?`,
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Ya, Saya Yakin",
                        cancelButtonText:
                            "Tidak, Batalkan Penambahan Pengikut!",
                        reverseButtons: true,
                    })
                    .then((result) => {
                        if (result.isConfirmed) {
                            setTimeout(() => {
                                swalWithBootstrapButtons.fire({
                                    title: "Sukses Menambahkan pengikut!",
                                    text: `${response.data.nama} Telah ditambahkan sebagai pengikut`,
                                    icon: "success",
                                });
                            }, 500);
                            addHandler(response.data);
                        } else if (
                            /* Read more about handling dismissals below */
                            result.dismiss === Swal.DismissReason.cancel
                        ) {
                            swalWithBootstrapButtons.fire({
                                title: "Cancelled",
                                text: "Silahkan Mencari anggota keluarga lainnya",
                                icon: "error",
                            });

                            setTimeout(() => {
                                setData({
                                    ...data,
                                    nik_pengikut: "", // Mengosongkan in_put setelah _pengikut ditambahkan
                                    nama_pengikut: "",
                                    shdk_pengikut: "",
                                });
                            }, 1000);
                        }
                    });
            })
            .catch((error) => {
                // Callback onError
                props.getLoading(false);
                setTimeout(() => {
                    Swal.fire({
                        title: "Warning!",
                        text:
                            error.response.data.error +
                            ". \n Masukkan NIK keluarga yang benar",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                }, 1000);
            });
    };
    const addHandler = (response) => {
        const newPengikut = {
            nik: data.nik_pengikut,
            nama: response.nama,
            shdk: response.status_hubungan_dalam_keluarga_id,
            nama_shdk_pengikut: response.status_hubungan_dalam_keluarga.nama,
        };
        setData({
            ...data,
            pengikut: [...data.pengikut, newPengikut],
            nik_pengikut: "", // Mengosongkan in_put setelah _pengikut ditambahkan
            nama_pengikut: "",
            shdk_pengikut: "",
        });
    };
    const multipleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const pilihShdk = (e) => {
        const getNama = status_hubungan_dalam_keluarga.find(
            (item) => item.id === e.target.value
        );
        if (getNama) {
            setData({
                ...data,
                shdk_pengikut: e.target.value,
                nama_shdk_pengikut: getNama.nama,
            });
        }
    };
    const removeHandler = (nik) => {
        setData((prevFormData) => ({
            ...prevFormData,
            pengikut: prevFormData.pengikut.filter(
                (pengikut) => pengikut.nik !== nik
            ),
        }));
    };
    const [modalTambah, setModalTambah] = useState(false);
    return (
        <div className=" bg-white px-4 py-3 rounded-md max-h-[70vh] overflow-y-auto">
            <Modal
                open={modalTambah}
                setOpen={setModalTambah}
                title={"Tambah Anggota Keluarga Yang Ikut Pindah"}
            >
                <div className="w-[90vw] md:w-[80vw] max-h-[80vh] overflow-y-auto flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 rounded-md max-h-full overflow-y-auto">
                        <h3 className="text-orange-500 font-bold text-xl">
                            Data Anggota Keluarga yang ikut
                        </h3>

                        <div className="flex flex-col gap-3 my-3 odd:bg-gray-200 px-2 py-1 ">
                            <FormControl fullWidth>
                                <p>NIK Anggota Keluarga</p>
                                <InputText
                                    name="nik_pengikut"
                                    value={data.nik_pengikut}
                                    error={errors.nik_pengikut ? true : false}
                                    helperText={errors.nik_pengikut}
                                    onChange={(e) => multipleChange(e)}
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <p>Nama Anggota Keluarga</p>
                                <InputText
                                    name="nama_pengikut"
                                    disabled
                                    error={errors.nama_pengikut ? true : false}
                                    value={data.nama_pengikut}
                                    helperText={errors.nama_pengikut}
                                    onChange={(e) => multipleChange(e)}
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <TextField
                                    id="outlined-select-currency"
                                    disabled
                                    select
                                    className="z-[99999]"
                                    label="Status Hubungan Dalam Keluarga"
                                    name="shdk_pengikut"
                                    value={data.shdk_pengikut}
                                    error={errors.shdk_pengikut ? true : false}
                                    helperText={errors.shdk_pengikut}
                                    onChange={(e) => pilihShdk(e)}
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
                        </div>

                        <button
                            onClick={cekPengikut}
                            className="btn-primary w-full my-3 text-center flex justify-center"
                        >
                            Cari Anggota Keluarga
                        </button>
                    </div>
                    <div className="w-full md:w-1/2">
                        <div>
                            <DataTable data={data.pengikut} columns={columns} />
                        </div>
                    </div>
                </div>
            </Modal>
            <div className="">
                <div className="flex justify-end">
                    <button
                        onClick={() => setModalTambah(true)}
                        className="btn-primary"
                    >
                        {data.pengikut.length} Anggota Ikut
                    </button>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-3">
                <form onSubmit={submitHandler}>
                    <h3 className="text-orange-500 font-bold text-xl">
                        Data Penduduk
                    </h3>
                    <div className="w-full">
                        <InputText
                            label="Email"
                            value={data.email}
                            defaultValue={data.email}
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
                    <div className="flex flex-row gap-4 my-4">
                        <div className="w-full">
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
                        <div className="w-full">
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
                    </div>
                    <div
                        onClick={cekDataHandler}
                        className="btn-primary w-full flex justify-center items-center mb-5 hover:cursor-pointer"
                    >
                        Cek Data
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-gray-200 py-5 px-4 rounded-md">
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
                                <MenuItem value="">
                                    Pilih Jenis Kelamin
                                </MenuItem>
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
                                disabled
                                id="outlined-select-currency"
                                select
                                label="Status Perkawinan"
                                name="status_perkawinan_id"
                                value={data.status_perkawinan_id}
                                defaultValue={data.status_perkawinan_id}
                                error={
                                    errors.status_perkawinan_id ? true : false
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
                    </div>
                    <h3 className="text-orange-500 font-bold text-xl">
                        Alamat Asal
                    </h3>
                    <div className="bg-gray-200 grid grid-cols-2 md:grid-cols-4 gap-4  py-5 px-4 rounded-md">
                        <FormControl fullWidth>
                            <p>Desa Asal</p>
                            <InputText
                                disabled
                                name="desa_asal"
                                error={errors.desa_asal ? true : false}
                                value={data.desa_asal}
                                defaultValue={data.desa_asal}
                                helperText={errors.desa_asal}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <p>Dusun Asal</p>
                            <InputText
                                disabled
                                name="dusun_asal"
                                error={errors.dusun_asal ? true : false}
                                value={data.dusun_asal}
                                defaultValue={data.dusun_asal}
                                helperText={errors.dusun_asal}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <p>RW Asal</p>
                            <InputText
                                disabled
                                name="rw_asal"
                                error={errors.rw_asal ? true : false}
                                value={data.rw_asal}
                                defaultValue={data.rw_asal}
                                helperText={errors.rw_asal}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <p>RT Asal</p>
                            <InputText
                                disabled
                                name="rt_asal"
                                error={errors.rt_asal ? true : false}
                                value={data.rt_asal}
                                defaultValue={data.rt_asal}
                                helperText={errors.rt_asal}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </FormControl>
                        <FormControl
                            className="col-span-2 md:col-span-4"
                            fullWidth
                        >
                            <p>Alamat Asal</p>
                            <InputText
                                disabled
                                name="alamat_asal"
                                error={errors.alamat_asal ? true : false}
                                value={data.alamat_asal}
                                defaultValue={data.alamat_asal}
                                helperText={errors.alamat_asal}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </FormControl>
                    </div>
                    <h3 className="text-orange-500 font-bold text-xl">
                        Alamat Tujuan
                    </h3>
                    <div className="grid grid-cols-2 gap-4   py-5 px-4 rounded-md">
                        <FormControl className="w-full">
                            <InputText
                                label="Desa Tujuan"
                                name="desa_tujuan"
                                error={errors.desa_tujuan ? true : false}
                                value={data.desa_tujuan}
                                defaultValue={data.desa_tujuan}
                                helperText={errors.desa_tujuan}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </FormControl>
                        <FormControl className="w-full">
                            <InputText
                                label="Dusun Tujuan"
                                name="dusun_tujuan"
                                error={errors.dusun_tujuan ? true : false}
                                value={data.dusun_tujuan}
                                defaultValue={data.dusun_tujuan}
                                helperText={errors.dusun_tujuan}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </FormControl>
                        <FormControl className="w-full">
                            <InputText
                                label="RW Tujuan"
                                name="rw_tujuan"
                                error={errors.rw_tujuan ? true : false}
                                value={data.rw_tujuan}
                                defaultValue={data.rw_tujuan}
                                helperText={errors.rw_tujuan}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </FormControl>
                        <FormControl className="w-full">
                            <InputText
                                label="RT Tujuan"
                                name="rt_tujuan"
                                error={errors.rt_tujuan ? true : false}
                                value={data.rt_tujuan}
                                defaultValue={data.rt_tujuan}
                                helperText={errors.rt_tujuan}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </FormControl>
                        <FormControl className="col-span-2 ">
                            <InputText
                                label="Alamat Tujuan"
                                name="alamat_tujuan"
                                error={errors.alamat_tujuan ? true : false}
                                value={data.alamat_tujuan}
                                defaultValue={data.alamat_tujuan}
                                helperText={errors.alamat_tujuan}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </FormControl>
                        <FormControl className="col-span-2 ">
                            <InputText
                                label="Alasan Pindah"
                                name="alasan_pindah"
                                error={errors.alasan_pindah ? true : false}
                                value={data.alasan_pindah}
                                defaultValue={data.alasan_pindah}
                                helperText={errors.alasan_pindah}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </FormControl>
                        <FormControl className="col-span-2 ">
                            <p>Tanggal Pindah</p>
                            <InputText
                                type="date"
                                name="tgl_pindah"
                                error={errors.tgl_pindah ? true : false}
                                value={data.tgl_pindah}
                                defaultValue={data.tgl_pindah}
                                helperText={errors.tgl_pindah}
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
                        Simpan
                    </button>
                </form>
            </div>
        </div>
    );
}
