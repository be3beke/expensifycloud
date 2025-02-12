
import { useState } from "react";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import DashboardLayout from "@/components/DashboardLayout";
import ClientDetailsCard from "@/components/invoices/ClientDetailsCard";
import LineItemsCard from "@/components/invoices/LineItemsCard";

interface LineItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

const NewInvoice = () => {
  const { toast } = useToast();
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { description: "", quantity: 1, rate: 0, amount: 0 },
  ]);

  const [clientDetails, setClientDetails] = useState({
    name: "",
    email: "",
    address: "",
  });

  const calculateAmount = (quantity: number, rate: number) => {
    return quantity * rate;
  };

  const addLineItem = () => {
    setLineItems([
      ...lineItems,
      { description: "", quantity: 1, rate: 0, amount: 0 },
    ]);
  };

  const removeLineItem = (index: number) => {
    setLineItems(lineItems.filter((_, i) => i !== index));
  };

  const updateLineItem = (
    index: number,
    field: keyof LineItem,
    value: string | number
  ) => {
    const newLineItems = [...lineItems];
    const item = { ...newLineItems[index] };

    if (field === "quantity" || field === "rate") {
      const numValue = parseFloat(value as string) || 0;
      item[field] = numValue;
      item.amount = calculateAmount(
        field === "quantity" ? numValue : item.quantity,
        field === "rate" ? numValue : item.rate
      );
    } else if (field === "description") {
      item[field] = value as string;
    }

    newLineItems[index] = item;
    setLineItems(newLineItems);
  };

  const calculateTotal = () => {
    return lineItems.reduce((sum, item) => sum + item.amount, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Invoice Created",
      description: "Your invoice has been generated successfully.",
    });
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Create New Invoice
          </h1>
          <p className="mt-2 text-gray-600">
            Generate a professional invoice for your client.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <ClientDetailsCard
            clientDetails={clientDetails}
            setClientDetails={setClientDetails}
          />

          <LineItemsCard
            lineItems={lineItems}
            onAddItem={addLineItem}
            onUpdateItem={updateLineItem}
            onRemoveItem={removeLineItem}
            total={calculateTotal()}
          />

          <div className="flex justify-end">
            <Button type="submit" className="w-full md:w-auto">
              <Save className="h-4 w-4 mr-2" />
              Generate Invoice
            </Button>
          </div>
        </form>
      </motion.div>
    </DashboardLayout>
  );
};

export default NewInvoice;
