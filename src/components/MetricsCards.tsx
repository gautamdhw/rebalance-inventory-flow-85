
import { TrendingUp, TrendingDown, Package, Truck, AlertTriangle, CheckCircle } from "lucide-react";

const metrics = [
  {
    title: "Total Inventory Units",
    value: "24,580",
    change: "+12.5%",
    trend: "up",
    icon: Package,
    color: "blue"
  },
  {
    title: "Transfers Suggested Today",
    value: "47",
    change: "+3",
    trend: "up",
    icon: Truck,
    color: "green"
  },
  {
    title: "SKUs in Shortage",
    value: "23",
    change: "-5",
    trend: "down",
    icon: AlertTriangle,
    color: "red"
  },
  {
    title: "Optimal Stock Level",
    value: "89%",
    change: "+2%",
    trend: "up",
    icon: CheckCircle,
    color: "green"
  }
];

export function MetricsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${
              metric.color === 'blue' ? 'bg-blue-50' :
              metric.color === 'green' ? 'bg-green-50' :
              'bg-red-50'
            }`}>
              <metric.icon className={`w-6 h-6 ${
                metric.color === 'blue' ? 'text-blue-600' :
                metric.color === 'green' ? 'text-green-600' :
                'text-red-600'
              }`} />
            </div>
            <div className="flex items-center space-x-1">
              {metric.trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span className={`text-sm font-medium ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.change}
              </span>
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {metric.value}
            </div>
            <div className="text-sm text-gray-600">
              {metric.title}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
