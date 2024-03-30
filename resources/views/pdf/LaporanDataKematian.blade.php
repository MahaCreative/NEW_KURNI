<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <style>
        .flex-container {
            width: 100%;
            padding: 10px auto;
        }

        .kop {
            margin-top: 10px;
            text-align: center;
            line-height: 5px;

        }

        .kop h1 {
            font-size: 16pt;
            font-weight: 900;

        }

        .kop p {

            font-weight: 200;
            font-size: 10pt;
            font-style: italic;
        }

        .logo {

            width: 80px;
            height: 80px;
        }

        .item {
            float: left;
            margin-right: 40px;
        }

        .line {
            height: 1px;
            border-bottom: 2px black solid;
            clear: both;
        }

        th {
            text-align: center;
            font-size: 8pt;
        }

        td {
            font-size: 8pt;
            color: black;
            text-align: left;
        }

        td,
        th {
            border: 1px solid #979797;

            padding: 8px;

        }

        tr:nth-child(even) {
            background-color: #c6d1ff;
            color: white;
        }
    </style>

</head>

<body>

    <div class="">
        <div style="padding-left: 20%; ">
            <div class="flex-container">
                <img src="Image/favicon.png" class="logo item" />
                <div class="kop item">
                    <h1 class="">PEMERINTAH KABUPATEN MAMUJU</h1>
                    <h1 class="">Kantor Desa {{ $desa->nama_desa }}</h1>
                    <h1 class="">{{ $desa->nama_kecamatan }}</h1>
                    <p class="">{{ $desa->alamat }}</p>
                </div>
                <img src="Image/favicon.png" class="logo item" />
            </div>
        </div>
        <div class="line"></div>
        <div style="margin-top: 6px;">
            <table style="border-collapse: collapse; width:100%;">
                <thead style="width: 100%">
                    <tr>
                        <th>No</th>
                        <th>KK</th>
                        <th>NIK</th>
                        <th>Nama Lengkap</th>
                        <th>TTL</th>
                        <th>Jenis Kelamin</th>
                        <th>Dusun</th>
                        <th>Alamat</th>
                        <th>Agama</th>
                        <th>Pekerjaan</th>
                        <th>Shdk</th>
                        <th>Status Kawin</th>
                        <th>Tanggal Kematian</th>
                        <th>Sebab Kematian</th>
                    </tr>


                </thead>
                <tbody>

                    @if (count($kematian) > 0)
                        @foreach ($kematian as $key => $item)
                            <tr>
                                <td>{{ $key + 1 }}</td>
                                <td>{{ $item->kk }}</td>
                                <td>{{ $item->nik }}</td>
                                <td>{{ $item->nama }}</td>
                                <td>{{ $item->tempat_lahir }} {{ $item->tanggal_lahir }}</td>
                                <td>
                                    @if ($item->jenis_kelamin == '1')
                                        Laki-Laki
                                    @else
                                        Perempuan
                                    @endif
                                </td>
                                <td>{{ $item->detail_dusun->dusun->nama }}</td>
                                <td>{{ $item->alamat }}</td>
                                <td>{{ $item->agama->nama }}</td>
                                <td>{{ $item->pekerjaan->nama }}</td>
                                <td>{{ $item->statusHubunganDalamKeluarga->nama }}</td>
                                <td>{{ $item->statusPerkawinan->nama }}</td>
                                <td>{{ $item->hari_kematian }}, {{ $item->tgl_kematian }}</td>
                                <td>{{ $item->sebab_kematian }}</td>
                            </tr>
                        @endforeach
                    @else
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>

                        </tr>
                    @endif
                </tbody>
            </table>
        </div>
        <div style="width: 100%; text-align: right; padding: 0 16px 3px;">
            <div>
                <p>{{ $desa->nama_kabupaten . ' , ....................' }}</p>
                <p style="line-height:5px; text-transform: uppercase;">Kepala Desa {{ $desa->nama_desa }}</p>
                <p style="line-height:5px; text-transform: uppercase; margin-top: 70px; font-weight: bold;">
                    {{ $desa->nama_kepala_desa }}
                </p>
            </div>
        </div>


</body>

</html>
