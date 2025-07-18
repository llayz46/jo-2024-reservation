<?php

namespace App\Http\Resources;

use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin CartItem */
class CartItemResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'quantity' => $this->quantity,
            'ticket' => [
                'id' => $this->ticket->id,
                'title' => $this->ticket->title,
                'description' => $this->ticket->description,
                'price' => $this->ticket->price,
            ],
        ];
    }
}
