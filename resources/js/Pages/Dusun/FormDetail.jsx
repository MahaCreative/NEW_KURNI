import InputText from "@/Components/InputText";
import { router, useForm } from "@inertiajs/react";
import { Cancel, Check } from "@mui/icons-material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function FormDetail({ model, setModel, id }) {
    const [data, setData] = useState({ dusun_id: id, rt: "", rw: "" });

    useEffect(() => {
        setData({
            ...data,
            dusun_id: id,
            id: model ? model.id : "",
            rw: model ? model.rw : "",
            rt: model ? model.rt : "",
        });
    }, [model]);
    const submitHandler = (e) => {
        e.preventDefault();
        router.post(route("post.detail-dusun"), data, {
            onSuccess: () => {
                setModel(false);
            },
        });
    };
    const updateHandler = (e) => {
        e.preventDefault();
        router.post(route("update.detail-dusun"), data, {
            onSuccess: () => {
                setModel(false);
            },
        });
    };

    return (
        <div className="py-2">
            <form onSubmit={model ? updateHandler : submitHandler}>
                <div className="w-full flex gap-3 justify-between items-start">
                    <InputText
                        label={"RW"}
                        name="rw"
                        value={data.rw}
                        onChange={(e) =>
                            setData({ ...data, rw: e.target.value })
                        }
                    />
                    <InputText
                        label={"RT"}
                        name="rt"
                        value={data.rt}
                        onChange={(e) =>
                            setData({ ...data, rt: e.target.value })
                        }
                    />
                </div>
                <button className="btn-primary w-full text-center flex justify-center my-3 py-3">
                    {model ? "Update" : "Simpan"}
                </button>
            </form>
        </div>
    );
}
