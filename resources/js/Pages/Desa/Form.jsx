import InputText from "@/Components/InputText";
import AppLayouts from "@/Layouts/AppLayouts";
import { router, useForm, usePage } from "@inertiajs/react";
import { Camera } from "@mui/icons-material";
import { FormControl, InputLabel } from "@mui/material";
import React, { useRef, useState } from "react";

export default function Form() {
    const { desa } = usePage().props;
    const { data, setData, post, reset, errors } = useForm({
        nama_desa: desa.nama_desa,
        nama_kecamatan: desa.nama_kecamatan,
        nama_kabupaten: desa.nama_kabupaten,
        alamat: desa.alamat,
        nama_kepala_desa: desa.nama_kepala_desa,
        alamat_kepala_desa: desa.alamat_kepala_desa,
        logo: desa.logo,
    });
    const fileInputRef = useRef(null);
    const [image, setImage] = useState(null);
    const handleOpenFileInput = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
            setData({ ...data, logo: selectedFile });
        }
        // Handle the selected file as needed, e.g., upload it, display it, etc.
        router.post(route("update-foto.desa"), {
            logo: selectedFile,
        });
    };
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("update.desa"));
    };
    return (
        <div>
            <form
                onSubmit={submitHandler}
                className="flex flex-col-reverse md:flex-row gap-4 my-4 transisi "
            >
                <div className="w-full bg-white rounded-md py-3 px-4">
                    <h1 className="text-orange-500 leading-tight font-semibold text-xl">
                        Profile Desa
                    </h1>
                    <div className="my-16">
                        <p className="my-3 text-xl font-semibold text-orange-500">
                            Nama Desa
                        </p>
                        <FormControl className="my-6" fullWidth>
                            <InputText
                                name="nama_desa"
                                error={errors.nama_desa ? true : false}
                                helperText={errors.nama_desa}
                                value={data.nama_desa}
                                defaultValue={data.nama_desa}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </FormControl>
                        <p className="my-3 text-xl font-semibold text-orange-500">
                            Nama Kecamatan
                        </p>
                        <FormControl className="my-6" fullWidth>
                            <InputText
                                name="nama_kecamatan"
                                error={errors.nama_kecamatan ? true : false}
                                helperText={errors.nama_kecamatan}
                                value={data.nama_kecamatan}
                                defaultValue={data.nama_kecamatan}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </FormControl>
                        <p className="my-3 text-xl font-semibold text-orange-500">
                            Nama Kabupaten
                        </p>
                        <FormControl className="my-6" fullWidth>
                            <InputText
                                name="nama_kabupaten"
                                error={errors.nama_kabupaten ? true : false}
                                helperText={errors.nama_kabupaten}
                                value={data.nama_kabupaten}
                                defaultValue={data.nama_kabupaten}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </FormControl>
                        <p className="my-3 text-xl font-semibold text-orange-500">
                            Alamat
                        </p>
                        <FormControl className="my-6" fullWidth>
                            <InputText
                                name="alamat"
                                error={errors.alamat ? true : false}
                                helperText={errors.alamat}
                                value={data.alamat}
                                defaultValue={data.alamat}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </FormControl>
                        <p className="my-3 text-xl font-semibold text-orange-500">
                            Nama Kepala Desa
                        </p>
                        <FormControl className="my-6" fullWidth>
                            <InputText
                                name="nama_kepala_desa"
                                error={errors.nama_kepala_desa ? true : false}
                                helperText={errors.nama_kepala_desa}
                                value={data.nama_kepala_desa}
                                defaultValue={data.nama_kepala_desa}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </FormControl>
                        <p className="my-3 text-xl font-semibold text-orange-500">
                            Alamat Kepala Desa
                        </p>
                        <FormControl className="my-6" fullWidth>
                            <InputText
                                name="alamat_kepala_desa"
                                error={errors.alamat_kepala_desa ? true : false}
                                helperText={errors.alamat_kepala_desa}
                                value={data.alamat_kepala_desa}
                                defaultValue={data.alamat_kepala_desa}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </FormControl>
                        <button className="btn-primary mt-6 flex justify-center py-6 w-full">
                            Simpan
                        </button>
                    </div>
                </div>
                <div className="w-full md:w-1/2 h-1/2 rounded-md overflow-hidden bg-white relative">
                    <div className="w-full h-full relative">
                        <div className="flex justify-center py-6">
                            <img
                                src={`${
                                    image ? image : "/storage/" + desa.logo
                                }`}
                                alt=""
                                className="object-cover w-[250px]"
                            />
                        </div>
                        <div
                            onClick={handleOpenFileInput}
                            className="absolute bottom-2 w-full flex items-center justify-center"
                        >
                            <div className="flex gap-3 bg-blue-600/80 backdrop-blur-sm py-1 px-4 rounded-md font-medium hover:bg-blue-600/80 active:bg-blue-600/80 text-white cursor-pointer">
                                <p>
                                    <Camera
                                        color="inherit"
                                        fontSize="inherit"
                                    />
                                </p>
                                <p>Ganti Foto</p>
                            </div>
                        </div>
                        {/* Hidden file input */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />
                        <div className="py-8 px-4">
                            <p className="font-semibold capitalize text-center text-3xl text-orange-500">
                                Nama Desa
                            </p>
                            <p className="font-light capitalize text-center my-3">
                                {desa.nama_desa}
                            </p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
