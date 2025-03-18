<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Volume extends Model
{
    use HasFactory;

    protected $fillable = [
        'rab_id',
        'uraian_volume',
        'satuan_volume',
        'nilai_volume',
    ];
}
