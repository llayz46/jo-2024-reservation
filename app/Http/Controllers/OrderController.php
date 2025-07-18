<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function __invoke(Order $order)
    {
        return Inertia::render('order', [
            'order' => fn () => $order->load('items')
        ]);
    }
}
