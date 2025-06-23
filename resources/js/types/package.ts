export interface Package {
  id: number;
  package_name: string;
  min_amount: number;
  max_amount: number;
  daily_shares_rate: number;
  effective_days: number;
}

export interface ReceivingBank {
  id: number;
  bank_name: string;
  receiving_bank: string;
  payment_channel: string;
  account_name: string;
  account_number: string;
}
