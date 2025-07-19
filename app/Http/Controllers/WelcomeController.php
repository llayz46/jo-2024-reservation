<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('welcome', [
            'tickets' => fn () => Ticket::all()
        ]);
    }
}
