<?php

use App\Models\Ticket;
use Inertia\Testing\AssertableInertia as Assert;

uses(\Illuminate\Foundation\Testing\LazilyRefreshDatabase::class);

test('can access the welcome page with tickets', function () {
    Ticket::factory()->count(3)->create();

    $this->get('/')
        ->assertInertia(fn (Assert $page) => $page
            ->component('welcome')
            ->has('tickets', 3)
        );
});

test('can access the welcome page with no tickets', function () {
    $this->get('/')
        ->assertInertia(fn (Assert $page) => $page
            ->component('welcome')
            ->has('tickets', 0)
        );
});
