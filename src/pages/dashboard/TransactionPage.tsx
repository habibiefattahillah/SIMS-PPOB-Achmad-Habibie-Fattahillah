import { useEffect, useState } from "react";
import { getTransactionHistory } from "@/lib/api/transaction";
import TransactionCard from "@/components/dashboard/TransactionCard";
import { Skeleton } from "@/components/ui/skeleton";
import UserHeader from "@/components/dashboard/UserHeader";
import { Button } from "@/components/ui/button";
import type { HistoryRecord } from "@/types/api";

const LIMIT = 4;

export default function TransactionPage() {
  const [transactionsByPage, setTransactionsByPage] = useState<
    Record<number, HistoryRecord[]>
  >({});
  const [currentTransactions, setCurrentTransactions] = useState<
    HistoryRecord[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      // If we already have the data for this page, use it
      if (transactionsByPage[page]) {
        setCurrentTransactions(transactionsByPage[page]);
        setHasNextPage(transactionsByPage[page].length === LIMIT);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const offset = page * LIMIT;
        const res = await getTransactionHistory(offset, LIMIT);

        setTransactionsByPage((prev) => ({
          ...prev,
          [page]: res.records,
        }));

        setCurrentTransactions(res.records);
        setHasNextPage(res.records.length === LIMIT);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [page, transactionsByPage]);

  return (
    <div className="p-4 space-y-6">
      <UserHeader />
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
              {currentTransactions.map((tx) => (
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
