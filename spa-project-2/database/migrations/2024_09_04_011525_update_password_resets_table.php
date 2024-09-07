<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdatePasswordResetsTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('password_resets', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id')->nullable()->after('email');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('password_resets', function (Blueprint $table) {
            $table->dropColumn('user_id');
        });
    }
};
