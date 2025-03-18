<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAhspDetailsrabTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ahsp_detailsrab', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('ahs_id');
            $table->string('kategori'); // 'bahan', 'upah', 'alat'
            $table->unsignedBigInteger('item_id');
            $table->string('kode')->nullable(); // Kode item
            // Kolom "judul" diganti dengan "uraian_pekerjaan"
            $table->string('uraian_pekerjaan')->nullable();
            $table->string('item_text')->nullable(); // Uraian item
            $table->string('satuan')->nullable();    // Satuan
            $table->decimal('harga_dasar', 14, 2)->nullable(); // Harga dasar
            $table->decimal('koefisien', 12, 2);
            $table->decimal('harga_satuan', 14, 2);
            $table->timestamps();

            // Atur foreign key untuk kolom ahs_id dengan opsi cascade delete
            $table->foreign('ahs_id')->references('id')->on('ahs')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ahsp_detailsrab');
    }
}
