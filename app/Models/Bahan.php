<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Bahan extends Model
{
    use HasFactory;

    protected $fillable = [
        'uraian_bahan',
        'satuan',
        'harga_bahan',
        'sumber',
    ];

    public function details()
    {
        return $this->morphMany(\App\Models\AhspDetail::class, 'itemable');
    }
}
