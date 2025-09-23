<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Location;

class Item extends Model
{
    protected $fillable = [
        'name',
        'quantity',
        'price',
        'location_id',
    ];
    
}
