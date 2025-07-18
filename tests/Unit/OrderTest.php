<?php

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\User;

uses(\Illuminate\Foundation\Testing\LazilyRefreshDatabase::class);

it('can be instantiated', function () {
    $order = Order::factory()->create();

    expect($order)->toBeInstanceOf(Order::class);
});

it('has a user associated', function () {
    $order = Order::factory()->create();

    expect($order->user)->toBeInstanceOf(User::class)
        ->and($order->user->id)->toBe($order->user_id);
});

it('has items associated', function () {
    $order = Order::factory()->create();

    OrderItem::factory()->create([
        'order_id' => $order->id,
    ]);

    OrderItem::factory()->create([
        'order_id' => $order->id,
    ]);

    expect($order->items)->toHaveCount(2)
        ->and($order->items->first())->toBeInstanceOf(OrderItem::class)
        ->and($order->items->last())->toBeInstanceOf(OrderItem::class);
});
