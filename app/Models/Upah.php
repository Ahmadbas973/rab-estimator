<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Upah extends Model
{
    use HasFactory;

    protected $fillable = [
        'uraian_tenaga',
        'satuan',
        'harga',
        'sumber',
    ];

    protected $casts = [
        'harga' => 'float',
    ];
}
