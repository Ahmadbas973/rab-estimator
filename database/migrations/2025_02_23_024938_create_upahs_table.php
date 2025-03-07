<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUpahsTable extends Migration
{
    public function up()
    {
        Schema::create('upahs', function (Blueprint $table) {
            $table->id();
            $table->string('uraian_tenaga');
            $table->string('satuan');
            $table->decimal('harga', 12, 2);
            $table->string('sumber')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('upahs');
    }
}
