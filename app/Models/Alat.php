<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Alat extends Model
{
    use HasFactory;

    protected $fillable = [
        'uraian_alat',
        'satuan',
        'harga_alat',
        'sumber',
    ];

    public function details()
    {
        return $this->morphMany(\App\Models\AhspDetail::class, 'itemable');
    }
}
