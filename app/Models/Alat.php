<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Alat extends Model
{
    use HasFactory;

    protected $fillable = [
        'uraian_alat',
        'satuan',
        'harga_alat',
        'sumber',
    ];

    protected $casts = [
        'harga_alat' => 'float',
    ];
}
