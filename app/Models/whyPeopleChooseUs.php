<?php
//made by lj330
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WhyPeopleChooseUs extends Model
{
    use HasFactory;

    // The table associated with the model.
    protected $table = 'why_people_choose_us';

    // The attributes that are mass assignable.
    protected $fillable = [
        'italian_image',
        'mexican_image',
        'asian_image',
    ];

    // Timestamp columns are automatically managed by Eloquent
    public $timestamps = false;
}