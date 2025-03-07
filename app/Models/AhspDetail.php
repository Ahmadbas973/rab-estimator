<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AhspDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'ahs_id',
        'kategori',
        'item_id',
        'kode',
        'judul',
        'item_text',
        'satuan',
        'harga_dasar',
        'koefisien',
        'harga_satuan',
    ];

    protected $casts = [
        'koefisien'    => 'float',
        'harga_satuan' => 'float',
        'harga_dasar'  => 'float',
    ];

    public function ahs()
    {
        return $this->belongsTo(Ahs::class, 'ahs_id');
    }
}
