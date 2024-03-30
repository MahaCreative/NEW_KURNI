import CetakLayout from "@/Layouts/CetakLayout";
import { usePage } from "@inertiajs/react";
import React from "react";

export default function CetakSuket(props) {
    const { desa } = usePage().props;
    const kematian = props.kematian;
    console.log(kematian);
    return (
        <div className="text-justify ">
            <div>
                <p>
                    Yang bertanda tangan dibawah ini, kepala desa{" "}
                    <span className="capitalize">{desa.nama_desa}</span>{" "}
                    Kecamatan{" "}
                    <span className="capitalize">{desa.nama_kecamatan}</span>{" "}
                    Kab{" "}
                    <span className="capitalize">{desa.nama_kabupaten}</span>{" "}
                    menerangkan dengan sebenar-benarnya, bahwa:
                </p>
            </div>
            <div className=" mx-3 mt-3 mb-3 capitalize w-full">
                <div className="flex w-full">
                    <p className="w-[200px]">Nama</p>
                    <p className="w-[15px]">:</p>
                    <p className="">{kematian.nama}</p>
                </div>
                <div className="flex w-full">
                    <p className="w-[200px]">Bin / Binti</p>
                    <p className="w-[15px]">:</p>
                    <p className="">{kematian.nama_ayah}</p>
                </div>
                <div className="flex w-full">
                    <p className="w-[200px]">Tempat Lahir / Tgl Lahir</p>
                    <p className="w-[15px]">:</p>
                    <p className="w-[400px]">
                        {kematian.tempat_lahir + ", " + kematian.tgl_lahir}
                    </p>
                </div>
                <div className="flex w-full">
                    <p className="w-[200px]">Status Pernikahan</p>
                    <p className="w-[15px]">:</p>
                    <p className="w-[400px]">
                        {kematian.status_perkawinan.nama}
                    </p>
                </div>
                <div className="flex w-full">
                    <p className="w-[200px]">Agama</p>
                    <p className="w-[15px]">:</p>
                    <p className="">{kematian.agama.nama}</p>
                </div>
                <div className="flex w-full">
                    <p className="w-[200px]">Pekerjaan</p>
                    <p className="w-[15px]">:</p>
                    <p className="">{kematian.pekerjaan.nama}</p>
                </div>
                <div className="flex w-full">
                    <p className="w-[200px]">Alamat</p>
                    <p className="w-[15px]">:</p>
                    <p className="w-[400px]">{kematian.alamat}</p>
                </div>
            </div>
            <div>
                <p>Telah meninggal dunia pada:</p>
            </div>
            <div className=" mx-3 mt-3 mb-3 capitalize w-full">
                <div className="flex w-full">
                    <p className="w-[200px]">Hari Tanggal</p>
                    <p className="w-[15px]">:</p>
                    <p className="">
                        {kematian.hari_kematian + ", " + kematian.tgl_kematian}
                    </p>
                </div>
                <div className="flex w-full">
                    <p className="w-[200px]">Jam</p>
                    <p className="w-[15px]">:</p>
                    <p className="">{kematian.waktu_kematian}</p>
                </div>
                <div className="flex w-full">
                    <p className="w-[200px]">Tempat Meninggal</p>
                    <p className="w-[15px]">:</p>
                    <p className="">{kematian.tempat_kematian}</p>
                </div>
                <div className="flex w-full">
                    <p className="w-[200px]">Sebab Meninggal</p>
                    <p className="w-[15px]">:</p>
                    <p className="">{kematian.sebab_kematian}</p>
                </div>
            </div>
            <div className="my-3">
                <p className="text-justify">
                    Adalah benar penduduk Desa{" "}
                    <span className="capitalize">{desa.nama_desa}</span>{" "}
                    Kecamatan{" "}
                    <span className="capitalize">{desa.nama_kecamatan}</span>{" "}
                    Kabupaten{" "}
                    <span className="capitalize">{desa.nama_kabupaten}</span>{" "}
                    dan yang bersangkutan Telah Meninggal Dunia pada Hari{" "}
                    <span className="font-bold capitalize">
                        {kematian.hari_kematian + ", " + kematian.tgl_kematian}
                    </span>
                    Jam{" "}
                    <span className="font-bold capitalize">
                        {kematian.waktu_kematian}
                    </span>
                    . dan telah di makamkan di Makamkan di pemakaman umum (TPU).
                </p>
                <p className="text-justify mt-3">
                    Demikian Surat Keterangan Kelahiran ini dibuat dengan benar
                    dan diberikan kepada yang bersangkutan untuk Proses lebih
                    lanjut dalam pembuatan dan penerbitan akta kelahiran yang
                    bersangkutan.
                </p>
            </div>
        </div>
    );
}
CetakSuket.layout = (page) => (
    <CetakLayout children={page} title={"Cetak Kematian"} />
);
