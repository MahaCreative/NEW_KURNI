import { FormControl, debounce } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import InputText from "./InputText";
import { router } from "@inertiajs/react";

export default function Search({ link }) {
    const [params, setParams] = useState({ cari: "" });

    const reload = useCallback(
        debounce((query) => {
            router.get(link, query, {
                preserveScroll: true,
                preserveState: true,
            });
        }, 150),
        []
    );
    useEffect(() => reload(params), [params]);
    return (
        <FormControl className="">
            <InputText
                name="cari"
                value={params.cari}
                label="Cari Data"
                onChange={(e) => setParams({ ...params, cari: e.target.value })}
            />
        </FormControl>
    );
}
