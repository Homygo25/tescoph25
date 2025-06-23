<?php

namespace App\Http\Controllers\Promotion;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PromotionController extends Controller
{
    public function index(Request $request)
    {
        $images = [
            asset('images/promotions/promotion.png'), // Make sure the file exists here: public/images/promotions/promotion.png
        ];

        return Inertia::render('client/promotion', [
            'images' => $images
        ]);
    }
}
