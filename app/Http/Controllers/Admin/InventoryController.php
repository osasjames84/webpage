<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\StockLevel;

class InventoryController extends Controller
{
    public function inventoryPage(Request $request)
    {
        $search = $request->input('search');

        $query = StockLevel::with(['morningMenu', 'eveningMenu', 'kidsMenu']);

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('ingredientName', 'like', "%{$search}%")
                  ->orWhere('ingredientInformation', 'like', "%{$search}%")
                  ->orWhereHas('morningMenu', fn($q) => $q->where('itemName', 'like', "%{$search}%"))
                  ->orWhereHas('eveningMenu', fn($q) => $q->where('itemName', 'like', "%{$search}%"))
                  ->orWhereHas('kidsMenu', fn($q) => $q->where('itemName', 'like', "%{$search}%"));
            });
        }

        $inventoryItems = $query->paginate(10);

        return Inertia::render('Admin/Inventory', [
            'inventoryItems' => $inventoryItems
        ]);
    }

    public function deleteItem($id)
    {
        StockLevel::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'Item deleted successfully.');
    }
}
