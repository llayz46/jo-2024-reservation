<?php

namespace App\Actions\Cart;

use App\Models\Cart;
use Illuminate\Support\Facades\DB;

class MigrateSessionCart
{
    public function migrate(Cart $sessionCart, Cart $userCart)
    {
        DB::transaction(function() use ($sessionCart, $userCart) {
            $sessionItems = $sessionCart->items()->with('ticket')->get();

            foreach ($sessionItems as $item) {
                $existingItem = $userCart->items()->where('ticket_id', $item->ticket_id)->first();

                if ($existingItem) {
                    $existingItem->increment('quantity', $item->quantity);
                } else {
                    $userCart->items()->create([
                        'ticket_id' => $item->ticket_id,
                        'quantity' => $item->quantity
                    ]);
                }
            }

            $sessionCart->items()->delete();
            $sessionCart->delete();
        });
    }
}
