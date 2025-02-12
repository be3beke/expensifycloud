
import { motion } from "framer-motion";
import { ArrowUp, ArrowDown, DollarSign, FileText } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const Index = () => {
  const metrics = [
    {
      title: "Total Revenue",
      value: "$24,560",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Outstanding Invoices",
      value: "$8,120",
      change: "-2.3%",
      trend: "down",
      icon: FileText,
    },
    {
      title: "Monthly Expenses",
      value: "$6,230",
      change: "+5.2%",
      trend: "up",
      icon: ArrowUp,
    },
    {
      title: "Profit Margin",
      value: "32%",
      change: "+1.2%",
      trend: "up",
      icon: ArrowDown,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Welcome back! Here's an overview of your business.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="metric-card"
            >
              <div className="flex items-center justify-between">
                <metric.icon className="h-5 w-5 text-emerald-500" />
                <div
                  className={cn(
                    "text-sm font-medium",
                    metric.trend === "up"
                      ? "text-emerald-600"
                      : "text-rose-600"
                  )}
                >
                  {metric.change}
                </div>
              </div>
              <div className="mt-2">
                <h3 className="text-sm font-medium text-gray-500">
                  {metric.title}
                </h3>
                <p className="text-2xl font-semibold text-gray-900">
                  {metric.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="p-6 rounded-xl glass-card"
          >
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Invoices
            </h2>
            <div className="mt-4 space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-lg bg-white/50 subtle-border hover-transform cursor-pointer"
                >
                  <div>
                    <p className="font-medium text-gray-900">Invoice #{i + 1001}</p>
                    <p className="text-sm text-gray-500">Due in 5 days</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">$1,200.00</p>
                    <p className="text-sm text-emerald-600">Pending</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="p-6 rounded-xl glass-card"
          >
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Expenses
            </h2>
            <div className="mt-4 space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-lg bg-white/50 subtle-border hover-transform cursor-pointer"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      Office Supplies
                    </p>
                    <p className="text-sm text-gray-500">Yesterday</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">-$250.00</p>
                    <p className="text-sm text-gray-500">Category</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
