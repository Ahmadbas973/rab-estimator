<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bahan extends Model
{
    use HasFactory;

    protected $fillable = [
        'uraian_bahan',
        'satuan',
        'harga_bahan',
        'sumber',
    ];

    protected $casts = [
        'harga_bahan' => 'float',
    ];
}
