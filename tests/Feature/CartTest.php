<?php

use App\Factories\CartFactory;
use App\Models\Cart;
use App\Models\Ticket;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('users can view their cart', function () {
    $user = User::factory()->create();
    $ticket = Ticket::factory()->create();

    $cart = $user->cart()->create();
    $cart->items()->create([
        'ticket_id' => $ticket->id,
        'quantity' => 2,
    ]);

    $this->actingAs($user)
        ->get('/')
            ->assertInertia(fn (Assert $page) => $page
                ->component('welcome')
                ->has('cart.items', 1)
                ->where('cart.items.0.ticket.id', $ticket->id)
            );
});

test('users can add tickets to cart', function () {
    $user = User::factory()->create();
    $user->cart()->create();

    $ticket = Ticket::factory()->create();

    $this->actingAs($user)->post(route('cart.add'), [
        'ticket_id' => $ticket->id,
        'quantity' => 3,
    ]);

    $this->assertDatabaseHas('cart_items', [
        'cart_id' => $user->cart->id,
        'ticket_id' => $ticket->id,
        'quantity' => 3,
    ]);
});

test('guest can add tickets to cart', function () {
    $ticket = Ticket::factory()->create();

    $this->post(route('cart.add'), [
        'ticket_id' => $ticket->id,
        'quantity' => 2,
    ]);

    $cart = Cart::firstOrCreate(['session_id' => session()->getId()]);

    $this->assertDatabaseHas('carts', [
        'session_id' => $cart->session_id,
    ]);

    $this->assertDatabaseHas('cart_items', [
        'cart_id' => $cart->id,
        'ticket_id' => $ticket->id,
        'quantity' => 2,
    ]);
});

test('users can remove items from cart', function () {
    $user = User::factory()->create();
    $cart = $user->cart()->create();

    $ticket = Ticket::factory()->create();
    $cart->items()->create(['ticket_id' => $ticket->id, 'quantity' => 2]);

    $this->actingAs($user)->post(route('cart.remove'), [
        'ticket_id' => $ticket->id,
    ]);

    $this->assertDatabaseMissing('cart_items', [
        'cart_id' => $cart->id,
        'ticket_id' => $ticket->id,
    ]);
});

test('guest can remove items from cart', function () {
    $this->startSession();

    $cart = CartFactory::make();
    $ticket = Ticket::factory()->create();
    $cart->items()->create(['ticket_id' => $ticket->id, 'quantity' => 2]);

    $this->post(route('cart.remove'), [
        'ticket_id' => $ticket->id,
    ]);

    $updatedCart = Cart::where('session_id', session()->getId())->first();

    $this->assertDatabaseMissing('cart_items', [
        'cart_id' => $updatedCart->id,
        'ticket_id' => $ticket->id,
    ]);
});

test('guest cart items is migrated to user cart on login', function () {
    $this->startSession();

    $sessionCart = CartFactory::make();
    $ticket1 = Ticket::factory()->create();
    $ticket2 = Ticket::factory()->create();

    $sessionCart->items()->createMany([
        ['ticket_id' => $ticket1->id, 'quantity' => 1],
        ['ticket_id' => $ticket2->id, 'quantity' => 2],
    ]);

    $this->assertDatabaseHas('cart_items', [
        'cart_id' => $sessionCart->id,
        'ticket_id' => $ticket1->id,
        'quantity' => 1,
    ]);

    $this->assertDatabaseHas('cart_items', [
        'cart_id' => $sessionCart->id,
        'ticket_id' => $ticket2->id,
        'quantity' => 2,
    ]);

    $user = User::factory()->create();
    $user->cart()->create();

    $this->actingAs($user);

    (new \App\Actions\Cart\MigrateSessionCart)->migrate($sessionCart, $user->cart);

    $this->assertDatabaseHas('cart_items', [
        'cart_id' => $user->cart->id,
        'ticket_id' => $ticket1->id,
        'quantity' => 1,
    ]);

    $this->assertDatabaseHas('cart_items', [
        'cart_id' => $user->cart->id,
        'ticket_id' => $ticket2->id,
        'quantity' => 2,
    ]);

    $this->assertDatabaseMissing('cart_items', [
        'cart_id' => $sessionCart->id,
        'ticket_id' => $ticket1->id,
    ]);

    $this->assertDatabaseMissing('cart_items', [
        'cart_id' => $sessionCart->id,
        'ticket_id' => $ticket2->id,
    ]);
});

test('users can checkout cart', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $cart = $user->cart()->create();
    $ticket = Ticket::factory()->create();

    $cart->items()->create([
        'ticket_id' => $ticket->id,
        'quantity' => 2,
    ]);

    $this->post(route('cart.checkout'));

    $this->assertDatabaseHas('orders', [
        'user_id' => $user->id,
    ]);

    $order = $user->orders()->first();
    $this->assertEquals($ticket->id, $order->items[0]->ticket_id);
});
