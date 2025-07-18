<?php

namespace App\Http\Controllers;

use App\Models\OrderItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScanController extends Controller
{
    public function __invoke(Request $request)
    {
        $signature = $request->query('signature');

        if (!$signature) {
            return response()->json([
                'status' => 'error',
                'message' => 'Aucune signature fournie.'
            ], 400);
        }

        $item = OrderItem::with('order.user', 'ticket')
            ->where('qr_signature', $signature)
            ->first();

        if (!$item) {
            return response()->json([
                'status' => 'invalid',
                'message' => 'QR code invalide ou billet non reconnu.'
            ], 404);
        }

        $data = [
            'status' => 'valid',
            'user' => [
                'name' => $item->order->user->name,
                'email' => $item->order->user->email,
            ],
            'ticket' => [
                'offer' => $item->ticket->title ?? 'Offre inconnue',
                'description' => $item->ticket->description ?? 'Aucune description disponible',
                'price' => $item->ticket->price ?? 0,
                'ticket_key' => $item->ticket_key,
            ],
            'scanned_at' => now()->toDateTimeString(),
        ];

        return Inertia::render('scan-result', [
            'data' => fn () => $data,
        ]);
    }
}
