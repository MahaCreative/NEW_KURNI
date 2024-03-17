import { TextField } from "@mui/material";
import React from "react";

export default function InputText({ ...props }) {
    return (
        <>
            <TextField
                {...props}
                className="w-full"
                id="outlined-basic"
                variant="outlined"
            />
        </>
    );
}
