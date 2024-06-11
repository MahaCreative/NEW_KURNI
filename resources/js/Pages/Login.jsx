import InputText from "@/Components/InputText";
import { useForm, usePage } from "@inertiajs/react";
import { FormControl } from "@mui/material";
import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
    const { data, setData, post, reset, errors } = useForm({
        email: "",
        password: "",
        password_confirmation: "",
    });
    const { desa } = usePage().props;
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("login"));
    };
    const { flash } = usePage().props;
    useEffect(() => {
        flash.type && toast[flash.type](flash.message);
    }, [flash]);
    return (
        <div className="w-[50vw] flex justify-center items-center">
            <div className="flex gap-5 justify-between w-full">
                <form
                    onSubmit={submitHandler}
                    action=""
                    className="py-3 px-5 rounded-md  flex flex-col justify-center items-center gap-6 w-full"
                >
                    <img
                        src={"/storage/" + desa.logo}
                        alt=""
                        className="w-[100px] "
                    />
                    <FormControl className="my-6" fullWidth>
                        <InputText
                            name="email"
                            label="Email"
                            error={errors.email ? true : false}
                            helperText={errors.email}
                            value={data.email}
                            defaultValue={data.email}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                    </FormControl>
                    <FormControl className="my-6" fullWidth>
                        <InputText
                            name="password"
                            label="password"
                            type="password"
                            error={errors.password ? true : false}
                            helperText={errors.password}
                            value={data.password}
                            defaultValue={data.password}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                    </FormControl>
                    <FormControl className="my-6" fullWidth>
                        <InputText
                            name="password_confirmation"
                            label="Konfirmasi Password"
                            type="password"
                            error={errors.password_confirmation ? true : false}
                            helperText={errors.password_confirmation}
                            value={data.password_confirmation}
                            defaultValue={data.password_confirmation}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                    </FormControl>
                    <button className="btn-primary w-full flex items-center justify-center">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
