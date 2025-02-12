
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LineItemRow from "./LineItemRow";

interface LineItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface LineItemsCardProps {
  lineItems: LineItem[];
  onAddItem: () => void;
  onUpdateItem: (index: number, field: keyof LineItem, value: string | number) => void;
  onRemoveItem: (index: number) => void;
  total: number;
}

const LineItemsCard = ({
  lineItems,
  onAddItem,
  onUpdateItem,
  onRemoveItem,
  total,
}: LineItemsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Items</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {lineItems.map((item, index) => (
          <LineItemRow
            key={index}
            item={item}
            index={index}
            showDelete={lineItems.length > 1}
            onUpdate={onUpdateItem}
            onDelete={onRemoveItem}
          />
        ))}

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={onAddItem}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Line Item
        </Button>

        <div className="flex justify-end mt-4">
          <div className="text-right">
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="text-2xl font-semibold text-gray-900">
              ${total.toFixed(2)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LineItemsCard;
