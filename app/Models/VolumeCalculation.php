<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VolumeCalculation extends Model
{
    protected $fillable = [
        'item_pekerjaan_id',
        'satuan',
        'keterangan',
        'jumlah',
        'panjang',
        'lebar',
        'tinggi',
        'luas',
        'volume',
        'berat_jenis',
        'liter',
        'hasil',
        'rab_id',
        'item_pekerjaan_id',
        'uraian_volume',
        'satuan_volume',
        'nilai_volume',
        'calculation_type',
    ];
}
