<?php

namespace App\Http\Controllers;

use App\Factories\CartFactory;
use App\Http\Resources\CartResource;
use App\Models\Cart;
use App\Models\Order;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;

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

    public function checkout(Request $request)
    {
        $cart = $request->user()?->cart ?: CartFactory::make();

        $order = auth()->user()->orders()->create([
            'amount_total' => $cart->items->sum(function ($item) {
                return $item->ticket->price * $item->quantity;
            }),
        ]);

        foreach ($cart->items as $item) {
            $order->items()->create([
                'ticket_id' => $item->ticket_id,
                'title' => $item->ticket->title,
                'description' => $item->ticket->description,
                'quantity' => $item->quantity,
                'price' => $item->ticket->price,
                'amount_total' => $item->ticket->price * $item->quantity,
            ]);
        }

        if ($cart) {
            $cart->items()->delete();
            $cart->delete();
        }

        return redirect(route('cart.success', [
            'order' => $order->id,
        ]));
    }

    /**
     * Handle successful checkout.
     *
     * @param Request $request
     * @return \Inertia\Response|\Illuminate\Http\RedirectResponse
     */
    public function success(Request $request)
    {
        $orderId = $request->get('order');

        if (!$orderId) {
            return redirect()->route('home')->withErrors(['order' => 'L\'id de l\'order est introuvable.']);
        }

        if(auth()->user()->orders()->where('id', $orderId)->doesntExist()) {
            return redirect()->route('home')->withErrors(['order' => 'L\'order n\'existe pas ou vous n\'êtes pas autorisé à le voir.']);
        }

        return Inertia::render('checkout/success', [
            'order' => auth()->user()->orders()->where('id', $orderId)->with('items')->firstOrFail(),
        ]);
    }
}
