<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('rabs', function (Blueprint $table) {
            $table->id();
            $table->string('uraian_pekerjaan');
            $table->decimal('volume', 8, 2);
            $table->string('satuan');
            $table->decimal('harga_satuan', 15, 2);
            // Kolom harga_total bisa dihitung sebagai volume * harga_satuan, tapi jika ingin menyimpannya:
            $table->decimal('harga_total', 15, 2);
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rabs');
    }
};
