<?php

namespace App\Http\Controllers\Deposit;

use App\Http\Controllers\Controller;
use App\Models\AccountBalance;
use App\Models\DepositPackageTransac;
use App\Models\Package;
use App\Models\ReceivingBank;
use App\Models\ReferralBonus;
use App\Models\ReferralList;
use App\Services\AccountBalanceService;
use App\Services\PackageService;
use App\Services\TotalInterestService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DepositController extends Controller
{
    protected $totalInterestService;
    protected $packageService;
    protected $accountBalService;

    public function __construct(TotalInterestService $totalInterestService, PackageService $packageService, AccountBalanceService $accountBalService)
    {
        $this->totalInterestService = $totalInterestService;
        $this->packageService = $packageService;
        $this->accountBalService = $accountBalService;
    }

    public function index()
    {
        $user = Auth::user();
        $balance = AccountBalance::where('user_id', $user->id)->first();
        Log::info('current balance', ['accountBalanceUpdate' => $balance]);

        return Inertia::render('client/package', [
            'receiving_bank' => ReceivingBank::all(),
            'all_package' => Package::orderBy('id', 'asc')->get(),
            'account_balance' => $balance && isset($balance->balance) ? $balance->balance : 0,
            'error' => \session('error'),
        ]);
    }

    public function postDeposit(Request $request)
    {
        $time = \Illuminate\Support\Carbon::now()->format('H:i:s');
        $user = $request->user();

        if ($request->bank_id == 0 && $request->payment_method == 1) {
            $accountBalance = AccountBalance::where('user_id', $user->id)->first();

            if (!$accountBalance) {
                return \redirect()->back()->with('error', ['message' => 'Account balance not found.', $time]);
            }

            if ($accountBalance->balance < $request->amount) {
                return \redirect()->back()->with('error', ['message' => 'Insufficient balance.', $time]);
            }

            $accountBalance->balance -= $request->amount;
            $accountBalance->save();
        }

        $depositTrans = DepositPackageTransac::create([
    'package_id' => $request->package_id,
    'user_id' => $user->id,
    'bank_id' => $request->bank_id,
    'payment_method' => $request->payment_method, // ✅ add this line
    'amount' => $request->amount,
    'status' => $request->bank_id === null ? 'approved' : 'pending',
]);


        if ($request->bank_id == 0 && $request->payment_method == 1) {
            $accountBalService = new AccountBalanceService();
            $package = Package::where('id', $request->package_id)->first();

            $dataForTotalInterest = [
                'user_id' => $user->id,
                'deposit_trans_id' => $depositTrans->id,
                'total_interest_amount' => 0,
                'initial_amount' => $depositTrans->amount,
                'daily_rate' => $package->daily_shares_rate,
                'days_remaining' => $package->effective_days,
                'status' => 'active',
            ];

            $this->totalInterestService->createTotalInterest($dataForTotalInterest);
            $this->packageService->deductSlot($package->id);

            $bonusRate = 0;
            $referralList = ReferralList::where('user_id', $user->id)->first();
            if ($package && $referralList && isset($package->referal_bonus_rate) && isset($referralList->ref_user_id)) {
                $bonusRate = $package->referal_bonus_rate * $request->amount;
                $refUserId = $referralList->ref_user_id;
                $accountBalService->addAccountBalance($refUserId, $bonusRate);

                ReferralBonus::create([
                    'deposit_trans_id' => $depositTrans->id,
                    'bonus_amount'  => $bonusRate,
                ]);
            }

            return \redirect()->back()->with('success', ['message' => 'Transaction request created successfully!', $time]);
        }

        return \redirect()->back()->with('success', ['message' => 'Transaction request created successfully!', $time]);
    }
}
