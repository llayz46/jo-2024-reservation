<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_number',
        'amount_total',
        'user_id',
    ];

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function total(): float
    {
        return $this->items->sum('amount_total');
    }

    protected static function booted()
    {
        static::creating(function ($order) {
            $order->order_number = 'JO-2024' . '-' . Str::upper(Str::random(8));
        });
    }

}
