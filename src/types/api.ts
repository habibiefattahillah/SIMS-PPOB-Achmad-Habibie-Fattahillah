export interface ProfileResponse {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
}

// --- Information ---
export interface Banner {
  banner_name: string;
  banner_image: string;
  description: string;
}

export interface Service {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
}

// --- Common ---
export interface BalanceResponse {
  balance: number;
}

// --- Top Up ---
export interface TopUpRequest {
  top_up_amount: number;
}
export interface TopUpResponse {
  balance: number;
}

// --- Transaction ---
export interface TransactionRequest {
  service_code: string;
}
export interface TransactionResponse {
  invoice_number: string;
  service_code: string;
  service_name: string;
  transaction_type: string;
  total_amount: number;
  created_on: string;
}

// --- History ---
export interface HistoryRecord {
  invoice_number: string;
  transaction_type: string;
  description: string;
  total_amount: number;
  created_on: string;
}
export interface TransactionHistoryResponse {
  offset: string;
  limit: string;
  records: HistoryRecord[];
}
