
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LineItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface LineItemRowProps {
  item: LineItem;
  index: number;
  showDelete: boolean;
  onUpdate: (index: number, field: keyof LineItem, value: string | number) => void;
  onDelete: (index: number) => void;
}

const LineItemRow = ({ item, index, showDelete, onUpdate, onDelete }: LineItemRowProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center"
    >
      <div className="md:col-span-2">
        <Input
          placeholder="Description"
          value={item.description}
          onChange={(e) => onUpdate(index, "description", e.target.value)}
        />
      </div>
      <Input
        type="number"
        placeholder="Quantity"
        value={item.quantity}
        onChange={(e) => onUpdate(index, "quantity", e.target.value)}
      />
      <Input
        type="number"
        placeholder="Rate"
        value={item.rate}
        onChange={(e) => onUpdate(index, "rate", e.target.value)}
      />
      <div className="flex items-center justify-between">
        <span className="font-medium">${item.amount.toFixed(2)}</span>
        {showDelete && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onDelete(index)}
          >
            <Trash2 className="h-4 w-4 text-gray-500" />
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default LineItemRow;
