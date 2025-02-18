<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateStockLevelTable extends Migration
{
    public function up()
    {
        Schema::create('stock_level', function (Blueprint $table) {
            $table->id('inventoryID');

            $table->unsignedBigInteger('itemID_morning')->nullable();
            $table->unsignedBigInteger('itemID_evening')->nullable();
            $table->unsignedBigInteger('itemID_kids')->nullable();

            $table->string('ingredientName', 50);
            $table->text('ingredientInformation')->nullable();
            $table->integer('quantity');
            $table->integer('reorderLevel');

            $table->timestamp('createdAt')->useCurrent();
            $table->timestamp('updatedAt')->useCurrent()->useCurrentOnUpdate();


            $table->foreign('itemID_morning')
                ->references('itemID')->on('morning_menu')
                ->onDelete('cascade');
            $table->foreign('itemID_evening')
                ->references('itemID')->on('evening_menu')
                ->onDelete('cascade');
            $table->foreign('itemID_kids')
                ->references('itemID')->on('kids_menu')
                ->onDelete('cascade');
        });

        DB::statement("ALTER TABLE stock_level ADD CONSTRAINT chk_stock_item CHECK ((itemID_morning IS NOT NULL) OR (itemID_evening IS NOT NULL) OR (itemID_kids IS NOT NULL))");
    }

    public function down()
    {
        Schema::dropIfExists('stock_level');
    }
}
