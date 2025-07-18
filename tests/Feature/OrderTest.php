<?php

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Ticket;
use App\Models\User;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('users can place an order', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $cart = auth()->user()->cart()->create();

    $cart->items()->createMany([
        ['ticket_id' => Ticket::factory()->create()->id, 'quantity' => 2],
        ['ticket_id' => Ticket::factory()->create()->id],
    ]);

    $this->post(route('cart.checkout'));

    $order = Order::where('user_id', $user->id)->first();

    $this->assertDatabaseHas('orders', [
        'id' => $order->id,
        'user_id' => $user->id,
    ]);

    $this->assertEquals(
        2,
        DB::table('order_items')
            ->where('order_id', $order->id)
            ->where('ticket_id', 1)
            ->count()
    );

    $this->assertDatabaseHas('order_items', [
        'order_id' => $order->id,
        'ticket_id' => 2,
    ]);
});

test('users can view their orders', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $order1 = Order::factory()->create(['user_id' => $user->id]);
    $order2 = Order::factory()->create(['user_id' => $user->id]);

    $this->get(route('dashboard'))
        ->assertSee($order1->order_number)
        ->assertSee($order2->order_number);
});

test('users can view order details', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $order = Order::factory()->create(['user_id' => $user->id]);

    $orderItem = OrderItem::factory()->create(['order_id' => $order->id]);

    $this->get(route('order', [$order]))
        ->assertSee($order->order_number)
        ->assertSee($orderItem->ticket->name)
        ->assertSee($orderItem->quantity);
});
