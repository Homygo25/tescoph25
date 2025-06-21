<?php

namespace App\Http\Controllers\Promotion;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class PromotionController extends Controller
{
    public function index()
    {
        return Inertia::render('client/promotion');
    }
}
