<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .kop {
            width: 100%;
            background-color: orange;
            display: flex;
            align-items: center;
        }

        .name {
            color: white;
            font-size: 24pt;
        }

        .body-pesan {
            padding: 50px 50px;
        }

        .link-container {
            display: flex;
            width: 100%;
            justify-content: center;
            margin: 10px 50px;
        }

        .link {
            color: white;
            background: orange;
            font-size: 24pt;
            padding: 10px 20px;
            border-radius: 10% 10%;
        }
    </style>
</head>

<body>
    <div class="kop">

        <img src="{{ asset('storage/' . $data['desa']->logo) }}" width="100">
        <p style="margin-left:24px; font-size:24pt; color:white;">{{ $data['desa']->nama_desa }}</p>
    </div>
    @if ($data['status_permintaan'] == 'di terima')
        <div class='body-pesan'>
            <p>Kepada Yth: </p>
            <p style="font-weight:800; margin-top:10px">{{ $data['nama_penerima'] }}</p>
            <p style="font-weight:200; margin-top:10px">
                Permintaan {{ $data['subjek'] }} anda telah di <span>{{ $data['status_permintaan'] }}</span> oleh
                petugas
                desa. untuk mendapatkan
                {{ $data['subjek'] }} anda silahkan mengklick tautan dibawah ini, dan anda akan diarahkan ke halaman
                {{ $data['subjek'] }} yang anda anjukan.
            </p>
        </div>
        <div class="link-container">
            <a class='link' href={{ $data['link'] }}>KLIK DISINI</a>
        </div>
        <div class='body-pesan'>
            <p style="font-weight:200; margin-top:10px">
                Jika ada terdapat kesalahan pada {{ $data['subjek'] }} yang anda ajukan, silahkan melakukan permintaan
                kembali, <a href={{ $data['link_permintaan'] }}>melalui link berikut ini</a>. Dan kami akan mengirimkan
                email kembali untuk konfirmasi permintaan anda.
            </p>
            <p style="font-weight:800; margin-top:10px">Terima Kasih</p>
        </div>
    @else
        <div class='body-pesan'>
            <p>Kepada Yth: </p>
            <p style="font-weight:800; margin-top:10px">{{ $data['nama_penerima'] }}</p>
            <p style="font-weight:200; margin-top:10px">
                Sayang sekali, permintaan {{ $data['subjek'] }} yang anda telah ajukan, dengan berat hati kami tidak
                menyetujuinya. hal ini dikarenakan formulir permintaan yang anda kirimkan mungkin tidak lengkap atau
                tidak benar. silahkan melakukan permintaan {{ $data['subjek'] }} kembali di link berikut ini.
            </p>
        </div>
        <div class="link-container">
            <a class='link' href={{ $data['link_permintaan'] }}>KLIK DISINI</a>
        </div>
        <div class='body-pesan'>
            <p style="font-weight:800; margin-top:10px">Terima Kasih</p>
        </div>
    @endif
</body>

</html>
