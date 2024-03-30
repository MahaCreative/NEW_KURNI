import InputText from "@/Components/InputText";
import { router, useForm, usePage } from "@inertiajs/react";
import { Check } from "@mui/icons-material";
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
import DataTable from "react-data-table-component";
import ReactSelect from "react-select";

export default function FormPindahKeluar({ model }) {
    const { desa } = usePage().props;
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
            desa_asal: desa.nama_desa,
            dusun_asal: model ? model.detail_dusun.dusun.nama : "",
            rt_asal: model ? model.detail_dusun.rt : "",
            rw_asal: model ? model.detail_dusun.rw : "",
            alamat_asal: model ? model.alamat : "",
            desa_tujuan: "",
            dusun_tujuan: "",
            rt_tujuan: "",
            rw_tujuan: "",
            alamat_tujuan: "",
            tgl_pindah: "",
            alasan_pindah: "",
            kategori_pindah: "keluar",
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
    const [params, setParams] = useState({ q: model.kk });
    const [dataModel, setDataModel] = useState([]);
    const submitHandler = (e) => {
        e.preventDefault();
        router.post(
            route("post.pindah-keluar"),
            { ...data, pengikut: selectedRows },
            {
                onSuccess: () => {
                    setModel(null);
                    setOpen(false);
                },
            }
        );
    };

    useEffect(() => {
        fetchData();
    }, [params]);

    const fetchData = async () => {
        try {
            const response = await fetch(`/api-get-penduduk?q=${params.q}`);
            const result = await response.json();
            setDataModel(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const columns = [
        {
            name: "Nama Lengkap",
            selector: (row) => row.nama,
            width: "160px",
            wrap: true,
        },
        {
            name: "Warga Dusun",
            selector: (row) => row.detail_dusun.dusun.nama,
            width: "150px",
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
            wrap: true,
        },
    ];
    const [selectedRows, setSelectedRows] = useState([]);
    const checkedRows = (state) => {
        setSelectedRows(state.selectedRows);
    };
    return (
        <div className=" bg-white px-4 py-3 rounded-md max-h-[70vh] overflow-y-auto">
            <div className="flex flex-col lg:flex-row gap-3">
                <form onSubmit={submitHandler}>
                    <h3 className="text-orange-500 font-bold text-xl">
                        Data Penduduk
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-gray-200 py-5 px-4 rounded-md">
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
                <div className="py-6">
                    <p>
                        Silahkan memilih anggota keluarga yang juga akan pindah,
                        jika tidak ada anggota keluarga yang ikut pindah
                        silahkan kosongkan pilihan pada table dibawah
                    </p>
                    <DataTable
                        selectableRows
                        data={dataModel}
                        columns={columns}
                        pagination
                        onSelectedRowsChange={checkedRows}
                    />
                </div>
            </div>
        </div>
    );
}
