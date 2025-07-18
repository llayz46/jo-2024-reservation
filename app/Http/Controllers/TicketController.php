<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Inertia\Inertia;

class TicketController extends Controller
{
    public function show(Ticket $ticket)
    {
        return Inertia::render('ticket/show', [
            'ticket' => fn () => $ticket,
            'tickets' => fn () => Ticket::where('id', '!=', $ticket->id)->get()
        ]);
    }
}
