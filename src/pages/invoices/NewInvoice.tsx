
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import DashboardLayout from "@/components/DashboardLayout";

interface LineItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

type LineItemField = {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
};

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
    field: keyof LineItemField,
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
    // Here you would typically save the invoice to your backend
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
          <Card>
            <CardHeader>
              <CardTitle>Client Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Client Name"
                  value={clientDetails.name}
                  onChange={(e) =>
                    setClientDetails({ ...clientDetails, name: e.target.value })
                  }
                />
                <Input
                  type="email"
                  placeholder="Client Email"
                  value={clientDetails.email}
                  onChange={(e) =>
                    setClientDetails({ ...clientDetails, email: e.target.value })
                  }
                />
              </div>
              <Input
                placeholder="Client Address"
                value={clientDetails.address}
                onChange={(e) =>
                  setClientDetails({ ...clientDetails, address: e.target.value })
                }
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Line Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {lineItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center"
                >
                  <div className="md:col-span-2">
                    <Input
                      placeholder="Description"
                      value={item.description}
                      onChange={(e) =>
                        updateLineItem(index, "description", e.target.value)
                      }
                    />
                  </div>
                  <Input
                    type="number"
                    placeholder="Quantity"
                    value={item.quantity}
                    onChange={(e) =>
                      updateLineItem(index, "quantity", e.target.value)
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Rate"
                    value={item.rate}
                    onChange={(e) => updateLineItem(index, "rate", e.target.value)}
                  />
                  <div className="flex items-center justify-between">
                    <span className="font-medium">${item.amount.toFixed(2)}</span>
                    {lineItems.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeLineItem(index)}
                      >
                        <Trash2 className="h-4 w-4 text-gray-500" />
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={addLineItem}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Line Item
              </Button>

              <div className="flex justify-end mt-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    ${calculateTotal().toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

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
