<?php

// app/Models/ItemPekerjaan.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ItemPekerjaan extends Model
{
    protected $fillable = [
        'kategori_pekerjaan_id',
        'uraian_item',
        'satuan',
        'harga_satuan',
        'volume',
        'harga_total'
    ];

    // Jika ada relasi balik, misalnya:
    public function kategoriPekerjaan()
    {
        return $this->belongsTo(KategoriPekerjaan::class);
    }
    // Di App\Models\ItemPekerjaan.php
    public function volumeCalculations()
    {
        return $this->hasMany(VolumeCalculation::class, 'item_pekerjaan_id');
    }
}
