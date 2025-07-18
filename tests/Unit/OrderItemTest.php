<?php

use App\Models\Order;
use App\Models\OrderItem;

uses(\Illuminate\Foundation\Testing\LazilyRefreshDatabase::class);

it('can be instantiated', function () {
    $orderItem = OrderItem::factory()->create();

    expect($orderItem)->toBeInstanceOf(OrderItem::class);
});

it('belongs to an order', function () {
    $order = Order::factory()->create();

    $orderItem = OrderItem::factory()->create([
        'order_id' => $order->id,
    ]);

    expect($orderItem->order)->toBeInstanceOf(Order::class)
        ->and($orderItem->order->id)->toBe($order->id);
});

it('belongs to a ticket', function () {
    $orderItem = OrderItem::factory()->create();

    expect($orderItem->ticket)->toBeInstanceOf(App\Models\Ticket::class)
        ->and($orderItem->ticket->id)->toBe($orderItem->ticket_id);
});
