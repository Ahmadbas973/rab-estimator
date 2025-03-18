<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAhsrabTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ahsrab', function (Blueprint $table) {
            $table->id();
            $table->string('kode');
            $table->string('judul');
            $table->string('satuan')->nullable();
            $table->decimal('overhead', 5, 2)->default(10.00);
            $table->decimal('grand_total', 14, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ahsrab');
    }
}
