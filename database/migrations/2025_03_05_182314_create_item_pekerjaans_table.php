<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemPekerjaansTable extends Migration
{
    public function up()
    {
        Schema::create('item_pekerjaans', function (Blueprint $table) {
            $table->id();
            // Relasi ke kategori_pekerjaans
            $table->unsignedBigInteger('kategori_pekerjaan_id');
            $table->string('uraian_item');
            $table->decimal('volume', 8, 2);
            $table->string('satuan');
            $table->decimal('harga_satuan', 15, 2);
            $table->decimal('harga_total', 15, 2);
            $table->timestamps();

            $table->foreign('kategori_pekerjaan_id')
                ->references('id')->on('kategori_pekerjaans')
                ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('item_pekerjaans');
    }
}
