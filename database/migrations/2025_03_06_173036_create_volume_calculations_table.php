<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVolumeCalculationsTable extends Migration
{
    public function up()
    {
        Schema::create('volume_calculations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('item_pekerjaan_id')->nullable();
            $table->string('satuan');
            $table->string('keterangan')->nullable();
            $table->decimal('jumlah', 8, 2)->nullable();
            $table->decimal('panjang', 8, 2)->nullable();
            $table->decimal('lebar', 8, 2)->nullable();
            $table->decimal('tinggi', 8, 2)->nullable();
            $table->decimal('luas', 8, 2)->nullable();
            $table->decimal('volume', 8, 2)->nullable();
            $table->decimal('berat_jenis', 8, 2)->nullable();
            $table->decimal('liter', 8, 2)->nullable();
            $table->decimal('hasil', 15, 2)->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('volume_calculations');
    }
}
