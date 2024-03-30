import CetakLayout from "@/Layouts/CetakLayout";
import { usePage } from "@inertiajs/react";
import React from "react";

export default function CetakSuket(props) {
    const { desa } = usePage().props;
    const pindah = props.pindah;
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
                    <p className="">{pindah.nama}</p>
                </div>
                <div className="flex w-full">
                    <p className="w-[200px]">NIK</p>
                    <p className="w-[15px]">:</p>
                    <p className="">{pindah.nik}</p>
                </div>
                <div className="flex w-full">
                    <p className="w-[200px]">Tempat Lahir / Tgl Lahir</p>
                    <p className="w-[15px]">:</p>
                    <p className="w-[400px]">
                        {pindah.tempat_lahir + ", " + pindah.tanggal_lahir}
                    </p>
                </div>
                <div className="flex w-full">
                    <p className="w-[200px]">Status Pernikahan</p>
                    <p className="w-[15px]">:</p>
                    <p className="w-[400px]">{pindah.status_perkawinan.nama}</p>
                </div>
                <div className="flex w-full">
                    <p className="w-[200px]">Agama</p>
                    <p className="w-[15px]">:</p>
                    <p className="">{pindah.agama.nama}</p>
                </div>
                <div className="flex w-full">
                    <p className="w-[200px]">Pekerjaan</p>
                    <p className="w-[15px]">:</p>
                    <p className="">{pindah.pekerjaan.nama}</p>
                </div>
                <div className="flex w-full">
                    <p className="w-[200px]">Alamat Asal</p>
                    <p className="w-[15px]">:</p>
                    <p className="w-[400px]">
                        {pindah.alamat_asal +
                            " Desa " +
                            pindah.desa_asal +
                            " Dusun " +
                            pindah.dusun_asal +
                            " RT/RW " +
                            pindah.rt_asal +
                            "/" +
                            pindah.rw_asal}
                    </p>
                </div>
                <div className="flex w-full">
                    <p className="w-[200px]">Nomor Kartu Keluarga</p>
                    <p className="w-[15px]">:</p>
                    <p className="w-[400px]">{pindah.kk}</p>
                </div>
                <div className="flex w-full">
                    <p className="w-[200px]">Alamat Tujuan Pindah</p>
                    <p className="w-[15px]">:</p>
                    <p className="w-[400px]">
                        {pindah.alamat_tujuan +
                            " Desa " +
                            pindah.desa_tujuan +
                            " Dusun " +
                            pindah.dusun_tujuan +
                            " RT/RW " +
                            pindah.rt_tujuan +
                            "/" +
                            pindah.rw_tujuan}
                    </p>
                </div>
                <div className="flex w-full">
                    <p className="w-[200px]">Alasan Pindah</p>
                    <p className="w-[15px]">:</p>
                    <p className="w-[400px]">{pindah.alasan_pindah}</p>
                </div>
                <div className="flex w-full">
                    <p className="w-[200px]">Tanggal Pindah</p>
                    <p className="w-[15px]">:</p>
                    <p className="w-[400px]">{pindah.tgl_pindah}</p>
                </div>
                <div className="flex w-full">
                    <p className="w-[200px]">Pengikut yang Pindah</p>
                    <p className="w-[15px]">:</p>
                    <p className="w-[400px]">
                        {pindah.pengikut.length + " Orang"}
                    </p>
                </div>
                <div>
                    <table className="w-full border py-2 px-3 rounded-md my-3">
                        <thead className="w-full">
                            <tr>
                                <th className="text-center border border-gray-500 w-[60px]">
                                    No
                                </th>
                                <th className="text-center border border-gray-500">
                                    NIK
                                </th>
                                <th className="text-center border border-gray-500">
                                    Nama
                                </th>
                                <th className="text-center border border-gray-500">
                                    SHDK
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {pindah.pengikut.length > 0 ? (
                                pindah.pengikut.map((item, index) => (
                                    <tr key={index}>
                                        <td className="text-center border border-gray-500 w-[60px]">
                                            {index + 1}
                                        </td>
                                        <td className="text-center border border-gray-500">
                                            {item.nik}
                                        </td>
                                        <td className="text-center border border-gray-500">
                                            {item.nama}
                                        </td>
                                        <td className="text-center border border-gray-500">
                                            {
                                                item
                                                    .status_hubungan_dalam_keluarga
                                                    .nama
                                            }
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="text-center border border-gray-500 w-[60px]">
                                        -
                                    </td>
                                    <td className="text-center border border-gray-500">
                                        -
                                    </td>
                                    <td className="text-center border border-gray-500">
                                        -
                                    </td>
                                    <td className="text-center border border-gray-500">
                                        -
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="my-3">
                <p className="text-justify mt-3">
                    Demikian Surat Pengantar Pindah ini dibuat dengan benar dan
                    diberikan kepada yang bersangkutan untuk dipergunakan
                    sebagaimana mestinya
                </p>
            </div>
        </div>
    );
}

CetakSuket.layout = (page) => (
    <CetakLayout children={page} title={"Surat Keterangan Pindah Penduduk"} />
);
