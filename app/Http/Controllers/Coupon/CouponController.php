<?php

namespace App\Http\Controllers\Coupon;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class CouponController extends Controller
{
    public function index()
    {
        return Inertia::render('client/claim-coupon', [
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }
}
