import { useForm, usePage } from "@inertiajs/react";
import { Camera } from "@mui/icons-material";
import { FormControl, MenuItem, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

export default function Form({ model, setModel, setOpen }) {
    const { data, setData, post, reset, errors } = useForm({
        name: "",
        email: "",
        alamat: "",
        telp: "",
        jabatan: "",
        dusun: "",
        foto: "",
    });

    useEffect(() => {
        setData({
            ...data,
            id: model ? model.id : "",
            name: model ? model.name : "",
            email: model ? model.email : "",

            alamat: model ? model.alamat : "",
            telp: model ? model.telp : "",
            jabatan: model ? model.jabatan : "",
            dusun: model ? model.dusun : "",
            foto: model ? model.foto : "",
        });
    }, [model]);
    const { dusun } = usePage().props;
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
            setData({ ...data, foto: selectedFile });
        }
    };

    const updateHandler = (e) => {
        e.preventDefault();
        post(route("update-user"), {
            onError: (errors) => {
                console.log(errors);
            },
            onSuccess: () => {
                reset();
                setImage(null);
            },
        });
    };
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("create-user"), {
            onError: (errors) => {
                console.log(errors);
            },
            onSuccess: () => {
                reset();
                setImage(null);
            },
        });
    };
    return (
        <div className="w-[80vw] md:w-[50vw] max-h-[80vh] overflow-y-auto">
            <form
                action=""
                className=""
                onSubmit={model ? updateHandler : submitHandler}
            >
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col gap-4 w-full">
                        <FormControl fullWidth>
                            <TextField
                                id="outlined-select-currency"
                                select
                                label="Jabatan pengguna"
                                name="jabatan"
                                error={errors.jabatan ? true : false}
                                helperText={errors.jabatan}
                                value={data.jabatan}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            >
                                <MenuItem value="">Pilih Jabatan</MenuItem>
                                {/* <MenuItem value="sekretaris desa">
                                    Sekretaris Desa
                                </MenuItem> */}
                                <MenuItem value="kepala dusun">
                                    Kepala Dusun
                                </MenuItem>
                            </TextField>
                        </FormControl>
                        {data.jabatan == "kepala dusun" && (
                            <FormControl fullWidth>
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Menjabat Dusun"
                                    name="dusun"
                                    error={errors.dusun ? true : false}
                                    helperText={errors.dusun}
                                    value={data.dusun}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                >
                                    <MenuItem value="">
                                        Pilih Dusun Menjabat
                                    </MenuItem>
                                    {dusun.map((item, key) => (
                                        <MenuItem key={key} value={item.nama}>
                                            {item.nama}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </FormControl>
                        )}
                        <FormControl fullWidth>
                            <TextField
                                label="Nama Lengkap"
                                name="name"
                                error={errors.name ? true : false}
                                value={data.name}
                                helperText={errors.name}
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
                                label="Email"
                                name="email"
                                error={errors.email ? true : false}
                                value={data.email}
                                helperText={errors.email}
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
                                label="Telephone"
                                name="telp"
                                error={errors.telp ? true : false}
                                value={data.telp}
                                helperText={errors.telp}
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
                                label="Alamat"
                                name="alamat"
                                error={errors.alamat ? true : false}
                                value={data.alamat}
                                helperText={errors.alamat}
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
                                type="password"
                                label="password"
                                name="password"
                                error={errors.password ? true : false}
                                value={data.password}
                                helperText={errors.password}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </FormControl>
                    </div>
                    <div className="w-full  md:w-1/2 h-full  rounded-md overflow-hidden bg-slate relative">
                        <div className="w-full h-full relative">
                            <div className="flex justify-center py-6">
                                <img
                                    src={`${
                                        image
                                            ? image
                                            : data.foto
                                            ? "/storage/" + data.foto
                                            : "/storage/Image/default.png"
                                    }`}
                                    alt=""
                                    className="object-cover w-[250px] h-full"
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
                        </div>
                    </div>
                </div>
                <button className=" my-5 w-full flex justify-center items-center btn-primary">
                    {model ? "Update User" : "Tambah User Baru"}
                </button>
            </form>
        </div>
    );
}
