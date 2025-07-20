<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\TicketRequest;
use App\Models\Ticket;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TicketController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/tickets', [
            'tickets' => fn () => Ticket::all()
        ]);
    }

    public function store(TicketRequest $request)
    {
        if (!Auth::user()->is_admin) abort(403, 'Unauthorized action.');

        Ticket::create($request->validated());

        return redirect()->route('admin.tickets.index')
            ->with('success', 'Ticket created successfully.');
    }

    public function update(TicketRequest $request, Ticket $ticket)
    {
        if (!Auth::user()->is_admin) abort(403, 'Unauthorized action.');

        $ticket->update($request->validated());

        return redirect()->route('admin.tickets.index')
            ->with('success', 'Ticket updated successfully.');
    }

    public function destroy(Ticket $ticket)
    {
        if (!Auth::user()->is_admin) abort(403, 'Unauthorized action.');

        $ticket->delete();

        return redirect()->route('admin.tickets.index')
            ->with('success', 'Ticket deleted successfully.');
    }
}
