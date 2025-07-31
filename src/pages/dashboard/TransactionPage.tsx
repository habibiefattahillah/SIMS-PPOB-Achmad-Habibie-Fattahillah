import { useEffect, useState } from "react";
import { getTransactionHistory, getBalance } from "@/lib/api/transaction";
import type { HistoryRecord } from "@/types/api";
import TransactionCard from "@/components/dashboard/TransactionCard";
import { Skeleton } from "@/components/ui/skeleton";
import UserHeader from "@/components/dashboard/UserHeader";
import { Button } from "@/components/ui/button";

const LIMIT = 4;

export default function TransactionPage() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<HistoryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    getBalance().then(setBalance);
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const offset = page * LIMIT;
        const res = await getTransactionHistory(offset, LIMIT);
        setTransactions(res.records);
        setHasNextPage(res.records.length === LIMIT);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, [page]);

  return (
    <div className="p-4 space-y-6">
      <UserHeader balance={balance} />
      <div className="space-y-4">
        <div className="text-xl font-bold">Semua Transaksi</div>

        {loading ? (
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-xl" />
            ))}
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {transactions.map((tx) => (
                <TransactionCard
                  key={tx.invoice_number}
                  type={tx.transaction_type}
                  description={tx.description}
                  amount={tx.total_amount}
                  createdOn={tx.created_on}
                />
              ))}
            </div>
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.max(p - 1, 0))}
                disabled={page === 0}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={() => setPage((p) => p + 1)}
                disabled={!hasNextPage}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
