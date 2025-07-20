<?php

use App\Models\Order;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Support\Str;
use Inertia\Testing\AssertableInertia as Assert;

uses(\Illuminate\Foundation\Testing\LazilyRefreshDatabase::class);

test('can\'t access the scan page without signature', function () {
    $response = $this->get('/scan');

    $response->assertStatus(400);
});

test('can access the scan page with signature', function () {
    $user = User::factory()->create();

    $order = Order::factory()->create([
        'user_id' => $user->id
    ]);

    $ticket_key = Str::uuid();

    $order->items()->create([
        'ticket_id'    => 1,
        'title'        => 'title',
        'description'  => 'description',
        'price'        => 45,
        'ticket_key'   => $ticket_key,
        'qr_signature' => hash('sha256', $user->private_key . $ticket_key),
    ]);

    $item = $order->items->first();

    $this->get('/scan?signature=' . $item->qr_signature)
        ->assertInertia(fn (Assert $page) => $page
            ->component('scan-result')
        );
});

test('can\'t access the scan page with invalid signature', function () {
    $response = $this->get('/scan?signature=invalid_signature');

    $response->assertStatus(404);
});
