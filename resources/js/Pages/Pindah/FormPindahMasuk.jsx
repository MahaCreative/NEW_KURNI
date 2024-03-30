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
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import ReactSelect from "react-select";

export default function FormPindahMasuk({ model }) {
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
        desa_tujuan: desa.nama_desa,
        dusun_tujuan: "",
        detail_dusun_id: "",
        alamat_tujuan: "",
        tgl_pindah: "",
        alasan_pindah: "",
        pengikut: [],
        nik_pengikut: "",
        nama_pengikut: "",
        shdk_pengikut: "",
        nama_shdk_pengikut: "",
    });
    const [params, setParams] = useState({ dusun_tujuan: "" });
    const [modalTambah, setModalTambah] = useState(false);
    const { pendidikan } = usePage().props;
    const { agama } = usePage().props;
    const { darah } = usePage().props;
    const { dusun } = usePage().props;
    const { pekerjaan } = usePage().props;
    const { status_hubungan_dalam_keluarga } = usePage().props;
    const { status_perkawinan } = usePage().props;
    const [dataDetailDusun, setDataDetailDusun] = useState();
    const [showDetail, setShowDetail] = useState(false);
    useEffect(() => {
        fetchData();
    }, [params]);

    const fetchData = async () => {
        try {
            const response = await fetch(
                `/api/get-detail-dusun?nama=${params.dusun_tujuan}`
            );
            const result = await response.json();
            setDataDetailDusun(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const pilihDusun = (e) => {
        setData({ ...data, dusun_tujuan: e.target.value });
        if (e.target.value == "") {
            setShowDetail(false);
        } else {
            setShowDetail(true);
            setParams({ ...params, dusun_tujuan: e.target.value });
        }
    };
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("post.pindah-masuk"));
    };
    const addHandler = () => {
        if (
            data.nik_pengikut == "" ||
            data.nama_pengikut == "" ||
            data.shdk_pengikut == ""
        ) {
            errors.nik_pengikut = "Nik pengikut tidak boleh kosong";
            errors.nama_pengikut = "nama pengikut tidak boleh kosong";
            errors.shdk_pengikut = "shdk pengikut tidak boleh kosong";
        } else {
            const newPengikut = {
                nik: data.nik_pengikut,
                nama: data.nama_pengikut,
                shdk: data.shdk_pengikut,
                nama_shdk_pengikut: data.nama_shdk_pengikut,
            };
            setData({
                ...data,
                pengikut: [...data.pengikut, newPengikut],
                nik_pengikut: "", // Mengosongkan in_put setelah _pengikut ditambahkan
                nama_pengikut: "",
                shdk_pengikut: "",
            });
        }
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
    const columns = [
        {
            name: "#",
            selector: (row) => (
                <Tooltip title={`Hapus ${row.nama}`}>
                    <button
                        onClick={() => removeHandler(row.nik)}
                        className="btn-danger"
                    >
                        <Delete color="inherit" fontSize="inherit" />
                    </button>
                </Tooltip>
            ),
            width: "60px",
        },
        {
            name: "NIK",
            selector: (row) => row.nik,
        },
        {
            name: "Nama",
            selector: (row) => row.nama,
        },
        {
            name: "SHDK",
            selector: (row) => row.nama_shdk_pengikut,
        },
    ];
    console.log(dataDetailDusun);

    return (
        <div className="overflow-y-auto bg-white px-4 py-3 rounded-md">
            <Modal
                open={modalTambah}
                setOpen={setModalTambah}
                title={"Tambah Anggota Keluarga Yang Ikut Pindah"}
            >
                <div className="w-[90vw] lg:w-[50vw] max-h-[80vh] overflow-y-auto flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 rounded-md max-h-full overflow-y-auto">
                        <h3 className="text-orange-500 font-bold text-xl">
                            Data Anggota Keluarga yang ikut
                        </h3>

                        <div className="flex flex-col gap-3 my-3 odd:bg-gray-200 px-2 py-1 ">
                            <FormControl fullWidth>
                                <p>Nama Anggota Keluarga</p>
                                <InputText
                                    name="nama_pengikut"
                                    error={errors.nama_pengikut ? true : false}
                                    value={data.nama_pengikut}
                                    helperText={errors.nama_pengikut}
                                    onChange={(e) => multipleChange(e)}
                                />
                            </FormControl>
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
                                <TextField
                                    id="outlined-select-currency"
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
                            onClick={addHandler}
                            className="btn-primary w-full my-3 text-center flex justify-center"
                        >
                            Tambah
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
                <form onSubmit={submitHandler}>
                    <div className="gap-3 ">
                        <div>
                            <h3 className="text-orange-500 font-bold text-xl">
                                Data Penduduk
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3  px-4 rounded-md">
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
                                <FormControl fullWidth>
                                    <TextField
                                        id="outlined-select-currency"
                                        select
                                        label="Jenis Kelamin"
                                        name="jenis_kelamin"
                                        error={
                                            errors.jenis_kelamin ? true : false
                                        }
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
                                        error={
                                            errors.tempat_lahir ? true : false
                                        }
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
                                        name="tanggal_lahir"
                                        type="date"
                                        value={data.tanggal_lahir}
                                        error={
                                            errors.tanggal_lahir ? true : false
                                        }
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
                                        error={
                                            errors.golongan_darah ? true : false
                                        }
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
                                        <MenuItem value="">
                                            Pilih Agama
                                        </MenuItem>
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
                                                <MenuItem
                                                    key={key}
                                                    value={item.id}
                                                >
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
                                <div>
                                    <InputLabel>Pekerjaan</InputLabel>
                                    <ReactSelect
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                pekerjaan_id: e.value,
                                            })
                                        }
                                        className="z-[2]"
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
                                    {model ? (
                                        <p className="text-xs  text-gray-400">
                                            Biar kan kosong jika tidak ingin
                                            merubah data pekerjaan
                                        </p>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                            <h3 className="text-orange-500 font-bold text-xl">
                                Alamat Asal
                            </h3>
                            <div className="bg-gray-200 grid grid-cols-2 md:grid-cols-4 gap-4  py-5 px-4 rounded-md">
                                <FormControl fullWidth>
                                    <p>Desa Asal</p>
                                    <InputText
                                        name="desa_asal"
                                        error={errors.desa_asal ? true : false}
                                        value={data.desa_asal}
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
                                        name="dusun_asal"
                                        error={errors.dusun_asal ? true : false}
                                        value={data.dusun_asal}
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
                                        name="rw_asal"
                                        error={errors.rw_asal ? true : false}
                                        value={data.rw_asal}
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
                                        name="rt_asal"
                                        error={errors.rt_asal ? true : false}
                                        value={data.rt_asal}
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
                                        name="alamat_asal"
                                        error={
                                            errors.alamat_asal ? true : false
                                        }
                                        value={data.alamat_asal}
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
                                        disabled
                                        label="Desa Tujuan"
                                        name="desa_tujuan"
                                        error={
                                            errors.desa_tujuan ? true : false
                                        }
                                        value={data.desa_tujuan}
                                        helperText={errors.desa_tujuan}
                                    />
                                </FormControl>
                                <FormControl fullWidth>
                                    <TextField
                                        id="outlined-select-currency"
                                        select
                                        label="Dusun Tujuan"
                                        name="dusun_tujuan"
                                        value={data.dusun_tujuan}
                                        onChange={pilihDusun}
                                    >
                                        <MenuItem value="">
                                            Pilih Dusun
                                        </MenuItem>
                                        {dusun !== null &&
                                            dusun.map((item, key) => (
                                                <MenuItem
                                                    key={key}
                                                    value={item.nama}
                                                >
                                                    {item.nama}
                                                </MenuItem>
                                            ))}
                                    </TextField>
                                </FormControl>
                                {showDetail == true && (
                                    <FormControl fullWidth>
                                        <TextField
                                            id="outlined-select-currency"
                                            select
                                            label="Detail dusun"
                                            name="detail_dusun_id"
                                            value={data.detail_dusun_id}
                                            defaultValue={data.detail_dusun_id}
                                            error={
                                                errors.detail_dusun_id
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors.detail_dusun_id
                                                    ? model.detail_dusun_id
                                                    : model
                                                    ? "biarkan kosong jika tidak ingin merubah dusun dan detail dusun"
                                                    : ""
                                            }
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    [e.target.name]:
                                                        e.target.value,
                                                })
                                            }
                                        >
                                            {dataDetailDusun?.map(
                                                (item, key) => (
                                                    <MenuItem
                                                        key={key}
                                                        value={item.id}
                                                    >
                                                        {"RW/RT " +
                                                            item.rw +
                                                            "/" +
                                                            item.rt}
                                                    </MenuItem>
                                                )
                                            )}
                                        </TextField>
                                    </FormControl>
                                )}
                                <FormControl className="col-span-2 ">
                                    <InputText
                                        label="Alamat Tujuan"
                                        name="alamat_tujuan"
                                        error={
                                            errors.alamat_tujuan ? true : false
                                        }
                                        value={data.alamat_tujuan}
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
                                        error={
                                            errors.alasan_pindah ? true : false
                                        }
                                        value={data.alasan_pindah}
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
                        </div>
                    </div>
                    <button className="btn-primary w-full text-center flex justify-center my-3 py-3">
                        Simpan
                    </button>
                </form>
            </div>
        </div>
    );
}
