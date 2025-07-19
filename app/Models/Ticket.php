<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'price',
        'popular',
        'features',
    ];

    protected function casts(): array
    {
        return [
            'features' => 'array',
            'popular' => 'boolean',
        ];
    }
}
