<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAhsTable extends Migration
{
    public function up()
    {
        Schema::create('ahs', function (Blueprint $table) {
            $table->id();
            $table->string('kode');
            $table->string('judul');
            $table->string('satuan')->nullable();
            $table->decimal('overhead', 5, 2)->default(10.00);
            $table->string('sumber')->nullable();
            $table->decimal('grand_total', 14, 2);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('ahs');
    }
}
