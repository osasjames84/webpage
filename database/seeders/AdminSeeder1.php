<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminSeeder1 extends Seeder
{
    /** //
     * Run the database seeds.
     *
     * @return void
     */

    public function run()
    {
        // dummy entry to be changed at later date
        DB::table('app_admins')->insert([
            'username' => 'admin',
            'password' => Hash::make('123'), // bycrypt password
            'email' => 'admin@admin.co.uk',
            'phoneNumber' => '11111111111',
        ]);

        $this->command->info('Admin user seeded successfully!');
    }
}
