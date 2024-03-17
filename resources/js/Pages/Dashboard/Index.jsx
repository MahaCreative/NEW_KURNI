import React from "react";
import AppLayouts from "@/Layouts/AppLayouts";
export default function Index() {
    return (
        <div className="bg-gradient-to-br from-yellow-700 via-yellow-600 to-yellow-500 h-[50vh]">
            Dashboard
        </div>
    );
}

Index.layout = (page) => <AppLayouts children={page} />;
