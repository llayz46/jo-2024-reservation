<?php

namespace App\Http\Controllers;

use App\Models\OrderItem;
use Endroid\QrCode\Builder\Builder;
use Illuminate\Support\Facades\Auth;

class QrCodeController extends Controller
{
    public function __invoke(OrderItem $item)
    {
        abort_unless(Auth::check() && $item->order->user_id === Auth::id(), 403);

        $builder = new Builder;
        $result = $builder->build(
            data: route('scan') . '?signature=' . $item->qr_signature,
            size: 300,
            margin: 10,
        );

        return response($result->getString())
            ->header('Content-Type', $result->getMimeType());
    }
}
