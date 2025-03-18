<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAlatsTable extends Migration
{
    public function up()
    {
        Schema::create('alats', function (Blueprint $table) {
            $table->id();
            $table->string('uraian_alat');
            $table->string('satuan');
            $table->decimal('harga_alat', 12, 2);
            $table->string('sumber')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('alats');
    }
}
