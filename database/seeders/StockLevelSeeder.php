<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\StockLevel;

class StockLevelSeeder extends Seeder
{
    public function run()
    {
        StockLevel::create([
            'itemID_morning' => 1,
            'ingredientName' => 'Mixed Vegetables',
            'ingredientInformation' => 'Includes carrots, broccoli, bell peppers, etc.',
            'quantity' => 100,
            'reorderLevel' => 20,
        ]);

        StockLevel::create([
            'itemID_evening' => 1,
            'ingredientName' => 'Whole Chicken',
            'ingredientInformation' => 'Fresh whole chicken, locally sourced',
            'quantity' => 50,
            'reorderLevel' => 10,
        ]);

        StockLevel::create([
            'itemID_kids' => 1,
            'ingredientName' => 'Vanilla Ice Cream',
            'ingredientInformation' => 'Creamy vanilla ice cream made with real vanilla extract',
            'quantity' => 30,
            'reorderLevel' => 5,
        ]);
    }
}
