<?php

uses(\Illuminate\Foundation\Testing\LazilyRefreshDatabase::class);

use App\Models\Ticket;

it('can create a ticket', function () {
    $ticket = Ticket::factory()->create();

    expect($ticket)->toBeInstanceOf(Ticket::class);
});

it('can retrieve a ticket by ID', function () {
    $ticket = Ticket::factory()->create();

    $retrievedTicket = Ticket::find($ticket->id);

    expect($retrievedTicket)->toBeInstanceOf(Ticket::class)
        ->and($retrievedTicket->id)->toBe($ticket->id);
});

it('can update a ticket', function () {
    $ticket = Ticket::factory()->create();

    $ticket->update([
        'title' => 'Updated Title',
        'description' => 'Updated Description',
        'price' => 2000,
        'features' => ['feature1', 'feature2'],
    ]);

    expect($ticket->title)->toBe('Updated Title')
        ->and($ticket->description)->toBe('Updated Description')
        ->and($ticket->price)->toBe(2000)
        ->and($ticket->features)->toBe(['feature1', 'feature2']);
});

it('can delete a ticket', function () {
    $ticket = Ticket::factory()->create();

    $ticket->delete();

    $deletedTicket = Ticket::find($ticket->id);

    expect($deletedTicket)->toBeNull();
});
