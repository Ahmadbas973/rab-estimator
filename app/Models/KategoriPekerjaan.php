<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KategoriPekerjaan extends Model
{
    use HasFactory;
    protected $table = 'kategori_pekerjaans'; // Pastikan nama tabelnya tepat
    protected $fillable = ['nama_kategori'];

    public function items()
    {
        return $this->hasMany(ItemPekerjaan::class);
    }
}
