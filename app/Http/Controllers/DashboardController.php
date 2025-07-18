<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('dashboard', [
            'orders' => fn () => auth()->user()?->orders()->with(['items.ticket:id,slug'])->get(),
        ]);
    }
}
