<?php

use App\Models\Ticket;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

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

test('can access admin tickets index page with list of tickets', function () {
    Ticket::factory()->count(3)->create();

    $adminUser = User::factory()->create([
        'is_admin' => true,
    ]);

    $this->actingAs($adminUser)
        ->get('admin/tickets')
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/tickets')
            ->has('tickets', 3)
        );
});

test('can\'t access admin tickets index page without admin privileges', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get('admin/tickets')
        ->assertRedirect('/');
});

test('can create a new ticket as admin', function () {
    $adminUser = User::factory()->create([
        'is_admin' => true,
    ]);

    $ticketData = [
        'title' => 'New Ticket',
        'slug' => 'new-ticket',
        'description' => 'Ticket description',
        'price' => 100,
        'popular' => true,
        'features' => [
            'Feature 1',
            'Feature 2',
        ],
    ];

    $this->actingAs($adminUser)
        ->post('admin/tickets', $ticketData)
        ->assertRedirect('admin/tickets');

    $this->assertDatabaseHas('tickets', [
        'title' => 'New Ticket',
        'slug' => 'new-ticket',
    ]);
});

test('can\'t create a new ticket without admin privileges', function () {
    $user = User::factory()->create();

    $ticketData = [
        'title' => 'Unauthorized Ticket',
        'slug' => 'unauthorized-ticket',
        'description' => 'Unauthorized ticket description',
        'price' => 50,
    ];

    $this->actingAs($user)
        ->post('admin/tickets', $ticketData)
        ->assertRedirect('/');

    $this->assertDatabaseMissing('tickets', [
        'title' => 'Unauthorized Ticket',
    ]);
});

test('can update an existing ticket as admin', function () {
    $adminUser = User::factory()->create([
        'is_admin' => true,
    ]);

    $ticket = Ticket::factory()->create();

    $updatedData = [
        'title' => 'Updated Ticket',
        'slug' => 'updated-ticket',
        'description' => 'Updated description',
        'price' => 150,
        'popular' => false,
        'features' => [
            'Updated Feature 1',
            'Updated Feature 2',
        ],
    ];

    $this->actingAs($adminUser)
        ->put("admin/tickets/{$ticket->id}", $updatedData)
        ->assertRedirect('admin/tickets');

    $this->assertDatabaseHas('tickets', [
        'id' => $ticket->id,
        'title' => 'Updated Ticket',
    ]);
});

test('can\'t update a ticket without admin privileges', function () {
    $user = User::factory()->create();
    $ticket = Ticket::factory()->create();

    $updatedData = [
        'title' => 'Unauthorized Update',
        'slug' => 'unauthorized-update',
        'description' => 'Unauthorized description',
        'price' => 75,
    ];

    $this->actingAs($user)
        ->put("admin/tickets/{$ticket->id}", $updatedData)
        ->assertRedirect('/');

    $this->assertDatabaseMissing('tickets', [
        'id' => $ticket->id,
        'title' => 'Unauthorized Update',
    ]);
});

test('can delete a ticket as admin', function () {
    $adminUser = User::factory()->create([
        'is_admin' => true,
    ]);

    $ticket = Ticket::factory()->create();

    $this->actingAs($adminUser)
        ->delete("admin/tickets/{$ticket->id}")
        ->assertRedirect('admin/tickets');

    $this->assertDatabaseMissing('tickets', [
        'id' => $ticket->id,
    ]);
});

test('can\'t delete a ticket without admin privileges', function () {
    $user = User::factory()->create();
    $ticket = Ticket::factory()->create();

    $this->actingAs($user)
        ->delete("admin/tickets/{$ticket->id}")
        ->assertRedirect('/');

    $this->assertDatabaseHas('tickets', [
        'id' => $ticket->id,
    ]);
});
