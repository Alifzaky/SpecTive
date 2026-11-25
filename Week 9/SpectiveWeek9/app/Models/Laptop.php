<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Laptop extends Model
{
    use HasFactory;

    // Field yang diizinkan untuk diisi secara massal
    protected $fillable = [
        'title',
        'brand',
        'price',
        'thumbnail',
        'description',
        'specs',
        'status'
    ];

    // Accessor khusus untuk menggantikan getFormattedPrice() dari PHP Native Anda
    public function getFormattedPriceAttribute()
    {
        return "$" . number_format($this->price, 2, '.', ',');
    }
}
