<?php

namespace App\Http\Controllers;

use App\Factories\CartFactory;
use App\Http\Resources\CartResource;
use App\Models\Cart;
use App\Models\Ticket;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * Display the cart.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return response()->json([
            'cart' => CartResource::make(CartFactory::make()->load('items.ticket')),
        ]);
    }

    /**
     * Add item to the cart.
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function addItem(Request $request)
    {
        $request->validate([
            'ticket_id' => 'required|exists:tickets,id',
            'quantity' => 'integer|min:1',
        ]);

        try {
            $ticket = Ticket::findOrFail($request->ticket_id);

            ($request->user()?->cart ?: CartFactory::make())->items()->firstOrCreate([
                'ticket_id' => $ticket->id,
            ], [
                'quantity' => 0,
            ])->increment('quantity', $request->quantity ?? 1);
        } catch (\Exception $e) {
            return redirect()->back()->withErrors([
                'ticket_id' => $e->getMessage()
            ]);
        }

        return redirect()->back();
    }

    /**
     * Remove an item from the cart.
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function removeItem(Request $request)
    {
        $request->validate([
            'ticket_id' => 'required|exists:tickets,id',
        ]);

        $ticketId = $request->ticket_id;

        $cart = $request->user()?->cart ?: CartFactory::make();

        $item = $cart->items->first(function ($cartItem) use ($ticketId) {
            return $cartItem->ticket_id === $ticketId;
        });

        $item->delete();

        return redirect()->back();
    }

    /**
     * Clear the cart.
     *
     * @param Cart $cart
     * @param HandleProductCart $handleProductCart
     * @return \Illuminate\Http\RedirectResponse
     */
    public function clear(Request $request)
    {
        ($request->user()?->cart ?: CartFactory::make())->items()->delete();

        return redirect()->back();
    }

    /**
     * Handle item quantity increase or decrease.
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function handleItemQuantity(Request $request)
    {
        $request->validate([
            'ticket_id' => 'required|exists:tickets,id',
            'action' => 'required|in:increase,decrease',
        ]);

        $cart = $request->user()?->cart;

        $ticketId = $request->ticket_id;

        if ($request->action === 'increase') {
            $item = ($cart ?: CartFactory::make())->items->first(function ($cartItem) use ($ticketId) {
                return $cartItem->ticket_id === $ticketId;
            });

            $item?->increment('quantity');
        } elseif ($request->action === 'decrease') {
            $item = ($cart ?: CartFactory::make())->items->first(function ($cartItem) use ($ticketId) {
                return $cartItem->ticket_id === $ticketId;
            });

            if ($item && $item->quantity > 1) {
                $item->decrement('quantity');
            } else {
                $item?->delete();
            }
        }

        return redirect()->back();
    }
}
