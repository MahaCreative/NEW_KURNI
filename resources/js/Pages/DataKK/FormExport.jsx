import { useForm, usePage } from "@inertiajs/react";
import { FormControl } from "@mui/base";
import { MenuItem, TextField } from "@mui/material";
import React from "react";

export default function FormExport() {
    const { data, setData, post, reset, errors } = useForm({
        dusun_id: "",
        tanggal_awal: "",
        sampai_tanggal: "",
    });
    const { dusun } = usePage().props;
    return (
        <div className="w-[90vw] md:w-[50vw] flex-col flex">
            <FormControl className="w-full" fullWidth>
                <TextField
                    className="w-full"
                    id="outlined-select-currency"
                    select
                    label="Dusun"
                    name="dusun_id"
                    error={errors.dusun_id ? true : false}
                    helperText={errors.dusun_id}
                    value={data.dusun_id}
                    defaultValue={data.dusun_id}
                    onChange={(e) =>
                        setData({
                            ...data,
                            [e.target.name]: e.target.value,
                        })
                    }
                >
                    <MenuItem value="">Pilih Dusun</MenuItem>
                    {dusun.map((item, key) => (
                        <MenuItem key={key} value={item.id}>
                            {item.nama}
                        </MenuItem>
                    ))}
                </TextField>
            </FormControl>
            <FormControl fullWidth>
                <label htmlFor="">Dari Tanggal</label>
                <TextField
                    className="w-full"
                    type="date"
                    name="tanggal_awal"
                    error={errors.tanggal_awal ? true : false}
                    value={data.tanggal_awal}
                    defaultValue={data.tanggal_awal}
                    helperText={errors.tanggal_awal}
                    onChange={(e) =>
                        setData({
                            ...data,
                            [e.target.name]: e.target.value,
                        })
                    }
                />
            </FormControl>
            <FormControl fullWidth>
                <label htmlFor="">Sampai Tanggal</label>
                <TextField
                    className="w-full"
                    type="date"
                    name="sampai_tanggal"
                    error={errors.sampai_tanggal ? true : false}
                    value={data.sampai_tanggal}
                    defaultValue={data.sampai_tanggal}
                    helperText={errors.sampai_tanggal}
                    onChange={(e) =>
                        setData({
                            ...data,
                            [e.target.name]: e.target.value,
                        })
                    }
                />
            </FormControl>
        </div>
    );
}
