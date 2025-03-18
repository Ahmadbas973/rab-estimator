<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Upah extends Model
{
    use HasFactory;

    protected $fillable = [
        'uraian_tenaga',
        'satuan',
        'harga',
        'sumber'
    ];

    public function details()
    {
        return $this->morphMany(\App\Models\AhspDetail::class, 'itemable');
    }
}
