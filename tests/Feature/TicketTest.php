<?php

use App\Models\Ticket;

uses(\Illuminate\Foundation\Testing\LazilyRefreshDatabase::class);

test('can access the tickets show page', function () {
    Ticket::factory()->create(['slug' => 'duo']);

    $response = $this->get('/tickets/duo');

    $response->assertStatus(200);
});

test('can access the tickets show page with a different slug', function () {
    Ticket::factory()->create(['slug' => 'trio', 'title' => 'Offre Trio']);

    $response = $this->get('/tickets/trio');

    $response->assertStatus(200)
        ->assertSee('Offre Trio');
});

test('cannot access a non-existing ticket', function () {
    $response = $this->get('/tickets/non-existing');

    $response->assertStatus(404);
});
