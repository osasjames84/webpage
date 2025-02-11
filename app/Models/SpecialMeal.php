<?php
//made by lj330
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SpecialMeal extends Model
{
    use HasFactory;

    // The table associated with the model.
    protected $table = 'special_meals';

    // The attributes that are mass assignable.
    protected $fillable = [
        'image_url',
        'food_name',
        'food_description',
        'price',
    ];

    // Timestamp columns are automatically managed by Eloquent
    public $timestamps = false;
}
