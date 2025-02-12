
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";

const Invoices = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Invoices</h1>
            <p className="mt-2 text-gray-600">
              Manage and track all your invoices in one place.
            </p>
          </div>
          <Button onClick={() => navigate("/invoices/new")}>
            <Plus className="h-4 w-4 mr-2" />
            New Invoice
          </Button>
        </div>

        <div className="rounded-xl glass-card">
          <div className="space-y-4">
            {[1, 2, 3].map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center justify-between p-6 rounded-lg bg-white/50 subtle-border hover-transform cursor-pointer"
              >
                <div>
                  <h3 className="font-medium text-gray-900">
                    Invoice #{1000 + index}
                  </h3>
                  <p className="text-sm text-gray-500">Due in 5 days</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">$1,200.00</p>
                  <p className="text-sm text-emerald-600">Pending</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Invoices;
