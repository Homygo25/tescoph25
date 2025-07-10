<?php

namespace App\Http\Controllers\Transferfund;

use App\Http\Controllers\Controller;
use App\Models\AccountBalance;
use App\Models\Transferfund;
use App\Services\AccountBalanceService;
use App\Services\TransferfundService;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TransferfundController extends Controller
{
    protected $currentUser;
    protected $balance;

    public function __construct()
    {
        $this->currentUser = Auth::user();
        if ($this->currentUser) {
            $accountBalance = AccountBalance::where('user_id', $this->currentUser->id)->first();
            $this->balance = $accountBalance ? $accountBalance->balance : 0;
        } else {
            $this->balance = 0;
        }
    }

    public function index()
    {
        if (!$this->currentUser || !isset($this->currentUser->id)) {
            return redirect()->route('login');
        }

        $sent_transactions = DB::table('transferfund as tf')
            ->leftJoin('users as u', 'u.id', '=', 'tf.receiver_user_id')
            ->select('u.name', 'tf.transfer_amount', 'tf.updated_at')
            ->where('tf.user_id', $this->currentUser->id)
            ->orderBy('tf.updated_at')
            ->get();

        $received_transactions = DB::table('transferfund as tf')
            ->leftJoin('users as u', 'u.id', '=', 'tf.user_id')
            ->select('u.name', 'tf.transfer_amount', 'tf.updated_at')
            ->where('tf.receiver_user_id', $this->currentUser->id)
            ->orderBy('tf.updated_at')
            ->get();

        return Inertia::render('client/transfer-fund', [
            'account_balance' => $this->balance,
            'sent_transactions' => $sent_transactions,
            'received_transactions' => $received_transactions,
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }

    public function postTransferfund(Request $request)
    {
        $time = now()->format('H:i:s');
        if (!$this->currentUser || !isset($this->currentUser->id)) {
            return redirect()->route('login');
        }
        $userRole = $request->user()->role;

        $userSearch = new UserService();
        $userSearchResult = $userSearch->searchName($request->name);

        if ($this->currentUser->name == $request->name || $this->currentUser->username == $request->name) {
            return redirect()->back()->with('error', ['message' => "Sorry, you can't send money to your own name.", 'time' => $time]);
        }

        if (!$request->name || $this->currentUser->name == $request->name || $this->currentUser->username == $request->name) {
            return redirect()->back()->with('error', ['message' => "Invalid receiver's name.", 'time' => $time]);
        }
        if (!$userSearchResult || !isset($userSearchResult->id)) {
            return redirect()->back()->with('error', ['message' => "Receiver's name not found.", 'time' => $time]);
        }
        if ($userRole !== 'admin') {
            if ($request->transfer_amount > $this->balance) {
                return redirect()->back()->with('error', ['message' => 'Insufficient Balance.', 'time' => $time]);
            } elseif ($request->transfer_amount < 1 || !$request->transfer_amount) {
                return redirect()->back()->with('error', ['message' => 'Requested amount is less than 1$.', 'time' => $time]);
            }
        }

        $transferfundData = [
            "user_id" => $this->currentUser->id,
            "transfer_amount" => $request->transfer_amount,
            "receiver_user_id" => $userSearchResult->id,
        ];

        $transferfundService = new TransferfundService();
        $transferfundService->createTransferfund($transferfundData);

        $accountBalService = new AccountBalanceService();
        $accountBalService->deductAccountBalance($this->currentUser->id, $request->transfer_amount);

        $accountBalServiceTransfer = new AccountBalanceService();
        $accountBalServiceTransfer->addAccountBalance($userSearchResult->id, $request->transfer_amount);

        return redirect()->back()->with('success', ['message' => 'Fund sent successfully', 'time' => $time]);
    }
}
