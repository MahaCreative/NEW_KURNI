import React from "react";
import CetakLayout from "@/Layouts/CetakLayout";
import { usePage } from "@inertiajs/react";
export default function CetakSuket(props) {
    const { desa } = usePage().props;
    const penduduk = props.penduduk;
    const ayah = props.ayah;
    const ibu = props.ibu;
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
                    menerangkan berdasarkan keterangan dari
                </p>
            </div>
            {/* ayah */}
            <div className="mb-3 capitalize w-full">
                <h3 className="text-xl font-bold">Ayah Kandung</h3>
                <div className="flex w-full">
                    <p className="w-[200px]">Nama</p>
                    <p className="w-[15px]">:</p>
                    <p className="">{penduduk.ayah.nama}</p>
                </div>
                <div className="flex w-full">
                    <p className="w-[200px]">Tempat Lahir / Tgl Lahir</p>
                    <p className="w-[15px]">:</p>
                    <p className="w-[400px]">
                        {penduduk.ayah.tempat_lahir +
                            "," +
                            penduduk.ayah.tanggal_lahir}
                    </p>
                </div>
                <div className="flex w-full">
                    <p className="w-[200px]">Agama</p>
                    <p className="w-[15px]">:</p>
                    <p className="">{penduduk.ayah.agama.nama}</p>
                </div>
                <div className="flex w-full">
                    <p className="w-[200px]">Pekerjaan</p>
                    <p className="w-[15px]">:</p>
                    <p className="">{penduduk.ayah.pekerjaan.nama}</p>
                </div>
                <div className="flex w-full">
                    <p className="w-[200px]">nik</p>
                    <p className="w-[15px]">:</p>
                    <p className="">{penduduk.ayah.nik}</p>
                </div>
                <div className="flex w-full">
                    <p className="w-[200px]">Alamat</p>
                    <p className="w-[15px]">:</p>
                    <p className="w-[400px]">{penduduk.ayah.alamat}</p>
                </div>
            </div>
            {/* ibu */}
            <div className="mt-3 capitalize w-full">
                <h3 className="text-xl font-bold">Ibu Kandung</h3>
                <div className="flex w-full">
                    <p className="w-[200px]">Nama</p>
                    <p className="w-[15px]">:</p>
                    <p className="">{penduduk.ibu.nama}</p>
                </div>
                <div className="flex w-full">
                    <p className="w-[200px]">Tempat Lahir / Tgl Lahir</p>
                    <p className="w-[15px]">:</p>
                    <p className="w-[400px]">
                        {penduduk.ibu.tempat_lahir +
                            "," +
                            penduduk.ibu.tanggal_lahir}
                    </p>
                </div>
                <div className="flex w-full">
                    <p className="w-[200px]">Agama</p>
                    <p className="w-[15px]">:</p>
                    <p className="">{penduduk.ibu.agama.nama}</p>
                </div>
                <div className="flex w-full">
                    <p className="w-[200px]">Pekerjaan</p>
                    <p className="w-[15px]">:</p>
                    <p className="">{penduduk.ibu.pekerjaan.nama}</p>
                </div>
                <div className="flex w-full">
                    <p className="w-[200px]">nik</p>
                    <p className="w-[15px]">:</p>
                    <p className="">{penduduk.ibu.nik}</p>
                </div>
                <div className="flex w-full">
                    <p className="w-[200px]">Alamat</p>
                    <p className="w-[15px]">:</p>
                    <p className="w-[400px]">{penduduk.ibu.alamat}</p>
                </div>
            </div>
            <div className="mt-3 capitalize w-full">
                <h3 className="text-xl font-bold">Telah lahir seorang anak</h3>
                <div className="flex w-full">
                    <p className="w-[200px]">Nama</p>
                    <p className="w-[15px]">:</p>
                    <p className="">{penduduk.nama}</p>
                </div>
                <div className="flex w-full">
                    <p className="w-[200px]">Tempat Lahir / Tgl Lahir</p>
                    <p className="w-[15px]">:</p>
                    <p className="w-[400px]">
                        {penduduk.tempat_lahir + "," + penduduk.tanggal_lahir}
                    </p>
                </div>
                <div className="flex w-full">
                    <p className="w-[200px]">Agama</p>
                    <p className="w-[15px]">:</p>
                    <p className="">{penduduk.agama.nama}</p>
                </div>
                <div className="flex w-full">
                    <p className="w-[200px]">Lahir di </p>
                    <p className="w-[15px]">:</p>
                    <p className="">{penduduk.tempat_dilahirkan}</p>
                </div>

                <div className="flex w-full">
                    <p className="w-[200px]">Alamat</p>
                    <p className="w-[15px]">:</p>
                    <p className="w-[400px]">{penduduk.ayah.alamat}</p>
                </div>
            </div>
            <div className="my-3">
                <p className="text-justify">
                    Pihak-pihak yang diterapkan diatas benar-benar adalah
                    penduduk Desa{" "}
                    <span className="capitalize">{desa.nama_desa}</span>{" "}
                    Kecamatan{" "}
                    <span className="capitalize">{desa.nama_kecamatan}</span>{" "}
                    Kabupaten{" "}
                    <span className="capitalize">{desa.nama_kabupaten}</span>{" "}
                    yang belum memiliki Akta Kelahiran.
                </p>
                <p className="text-justify">
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
    <CetakLayout children={page} title="Surat Keterangan Kelahiran" />
);
