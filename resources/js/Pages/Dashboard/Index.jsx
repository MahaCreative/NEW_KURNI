import React from "react";
import AppLayouts from "@/Layouts/AppLayouts";
import Card from "@/Components/Card";
import { Group } from "@mui/icons-material";
import Grafik from "./Grafik";
export default function Index() {
    return (
        <div className="relative z-0 h-[50vh]">
            <Grafik />
        </div>
    );
}

Index.layout = (page) => <AppLayouts children={page} />;
