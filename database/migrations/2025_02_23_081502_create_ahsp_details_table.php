<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAhspDetailsTable extends Migration
{
    public function up()
    {
        Schema::create('ahsp_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('ahs_id');
            $table->string('kategori'); // 'bahan', 'upah', 'alat'
            $table->unsignedBigInteger('item_id');
            $table->string('kode')->nullable(); // Kode item
            $table->string('judul')->nullable(); // Judul item
            $table->string('item_text')->nullable(); // Uraian item
            $table->string('satuan')->nullable();    // Satuan
            $table->decimal('harga_dasar', 14, 2)->nullable(); // Harga dasar
            $table->decimal('koefisien', 12, 2);
            $table->decimal('harga_satuan', 14, 2);
            $table->timestamps();

            $table->foreign('ahs_id')->references('id')->on('ahs')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('ahsp_details');
    }
}
