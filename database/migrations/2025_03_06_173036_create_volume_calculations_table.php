<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVolumeCalculationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('volume_calculations', function (Blueprint $table) {
            $table->id();
            // Kolom untuk mengacu ke item utama
            $table->unsignedBigInteger('item_pekerjaan_id');
            // Kolom untuk kategori perhitungan (plus untuk penambahan, minus untuk pengurangan)
            $table->enum('calculation_type', ['plus', 'minus'])->default('plus');
            // Kolom-kolom untuk menyimpan data perhitungan volume
            $table->string('keterangan');
            $table->decimal('jumlah', 15, 2)->default(0);
            $table->decimal('panjang', 15, 2)->nullable();
            $table->decimal('lebar', 15, 2)->nullable();
            $table->decimal('tinggi', 15, 2)->nullable();
            $table->decimal('luas', 15, 2)->nullable();
            $table->decimal('berat_jenis', 15, 2)->nullable();
            $table->decimal('liter', 15, 2)->nullable();
            $table->decimal('volume', 15, 2)->nullable();
            $table->decimal('hasil', 15, 2)->default(0);
            $table->string('satuan');
            $table->timestamps();

            // Foreign key dengan cascade delete
            $table->foreign('item_pekerjaan_id')
                ->references('id')->on('item_pekerjaans')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('volume_calculations');
    }
}
