import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface TransactionCardProps {
  type: string;
  description: string;
  amount: number;
  createdOn: string;
}

export default function TransactionCard({
  type,
  description,
  amount,
  createdOn,
}: TransactionCardProps) {
  const isPositive = type === "TOPUP";
  const formattedDate = format(new Date(createdOn), "dd MMM yyyy HH:mm");

  return (
    <div className="flex justify-between border rounded-xl p-4 shadow-sm">
      <div>
        <div
          className={cn(
            "font-semibold text-lg",
            isPositive ? "text-green-600" : "text-red-600"
          )}
        >
          {`${isPositive ? "+" : "-"}Rp${amount.toLocaleString("id-ID")}`}
        </div>
        <div className="text-sm text-muted-foreground">{formattedDate}</div>
      </div>
      <div className="text-right text-sm text-black">{description}</div>
    </div>
  );
}
