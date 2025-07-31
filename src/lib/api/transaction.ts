import api from "@/lib/axios";
import type {
  BalanceResponse,
  TopUpRequest,
  TopUpResponse,
  TransactionRequest,
  TransactionResponse,
  TransactionHistoryResponse,
} from "@/types/api";

export const getBalance = async (): Promise<number> => {
  const res = await api.get<{ data: BalanceResponse }>("/balance");
  return res.data.data.balance;
};

export const postTopUp = async (
  payload: TopUpRequest
): Promise<TopUpResponse> => {
  const res = await api.post<{ data: TopUpResponse }>("/topup", payload);
  return res.data.data;
};

export const postTransaction = async (
  payload: TransactionRequest
): Promise<TransactionResponse> => {
  const res = await api.post<{ data: TransactionResponse }>(
    "/transaction",
    payload
  );
  return res.data.data;
};

export const getTransactionHistory = async (
  offset: number,
  limit: number
): Promise<TransactionHistoryResponse> => {
  const res = await api.get<{ data: TransactionHistoryResponse }>(
    `/transaction/history?offset=${offset}&limit=${limit}`
  );
  return res.data.data;
};
