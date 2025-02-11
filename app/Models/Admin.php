<?php
// made by sw734
// model for  Admin Login Page

namespace App\Models;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Admin extends Authenticatable
{
    protected $table = 'app_admins';
    protected $primaryKey = 'adminID';  
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'username',
        'password',
        'email',
    ];
}