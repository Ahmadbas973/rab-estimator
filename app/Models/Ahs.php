<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ahs extends Model
{
    use HasFactory;

    protected $fillable = [
        'kode',
        'judul',
        'satuan',
        'overhead',
        'grand_total',
        'sumber',
    ];

    protected $casts = [
        'grand_total' => 'float',
    ];

    public function details()
    {
        return $this->hasMany(AhspDetail::class, 'ahs_id');
        // return $this->hasMany(\App\Models\AhspDetail::class, 'ahs_id');
    }
    public function recalcGrandTotal()
    {
        $subtotal = $this->details()->sum('harga_satuan');
        $overhead = $subtotal * ($this->overhead / 100);
        $this->grand_total = $subtotal + $overhead;
        $this->save();
    }
}
