
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, Target, AlertTriangle } from "lucide-react";

const forecastData = [
  { date: '2024-01-15', actual: 120, forecast: 115, stock: 150 },
  { date: '2024-01-16', actual: 135, forecast: 130, stock: 145 },
  { date: '2024-01-17', actual: 150, forecast: 145, stock: 140 },
  { date: '2024-01-18', actual: 160, forecast: 155, stock: 135 },
  { date: '2024-01-19', actual: 145, forecast: 150, stock: 130 },
  { date: '2024-01-20', actual: null, forecast: 165, stock: 125 },
  { date: '2024-01-21', actual: null, forecast: 170, stock: 120 },
  { date: '2024-01-22', actual: null, forecast: 175, stock: 115 },
  { date: '2024-01-23', actual: null, forecast: 180, stock: 110 },
  { date: '2024-01-24', actual: null, forecast: 185, stock: 105 }
];

const shortfallPredictions = [
  { sku: "A123", productName: "Blue Cotton Shirt", predictedShortfall: 45, currentStock: 30, daysUntilShortfall: 5, store: "NYC-05" },
  { sku: "D012", productName: "Summer Dress", predictedShortfall: 35, currentStock: 15, daysUntilShortfall: 3, store: "Miami-Beach" },
  { sku: "G901", productName: "Polo Shirt", predictedShortfall: 28, currentStock: 25, daysUntilShortfall: 7, store: "Austin-Central" },
  { sku: "J567", productName: "Casual Pants", predictedShortfall: 22, currentStock: 40, daysUntilShortfall: 12, store: "Portland-SW" },
  { sku: "K890", productName: "Running Shoes", predictedShortfall: 18, currentStock: 35, daysUntilShortfall: 8, store: "Denver-Mall" }
];

const accuracyData = [
  { period: "Week 1", accuracy: 92 },
  { period: "Week 2", accuracy: 89 },
  { period: "Week 3", accuracy: 94 },
  { period: "Week 4", accuracy: 87 }
];

export function Forecasts() {
  const [selectedStore, setSelectedStore] = useState("NYC-05");
  const [selectedSku, setSelectedSku] = useState("A123");
  const [timeRange, setTimeRange] = useState("7");

  return (
    <div className="p-6 space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Demand Forecasting</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Store</label>
              <Select value={selectedStore} onValueChange={setSelectedStore}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NYC-05">NYC-05 (5th Avenue)</SelectItem>
                  <SelectItem value="LA-West">LA-West (Beverly Hills)</SelectItem>
                  <SelectItem value="Chicago-Loop">Chicago-Loop</SelectItem>
                  <SelectItem value="Miami-Beach">Miami-Beach</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">SKU</label>
              <Select value={selectedSku} onValueChange={setSelectedSku}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A123">A123 - Blue Cotton Shirt</SelectItem>
                  <SelectItem value="B456">B456 - Denim Jeans</SelectItem>
                  <SelectItem value="C789">C789 - White Sneakers</SelectItem>
                  <SelectItem value="D012">D012 - Summer Dress</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Range</label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 Days</SelectItem>
                  <SelectItem value="14">14 Days</SelectItem>
                  <SelectItem value="30">30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Forecast Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Demand Forecast vs Current Stock</CardTitle>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">Actual Demand</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Forecast</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-600">Current Stock</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    connectNulls={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="forecast" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    strokeDasharray="5 5"
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="stock" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    dot={{ fill: '#f59e0b', strokeWidth: 2, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Forecast Accuracy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Forecast Accuracy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">91.2%</div>
                <div className="text-sm text-gray-600">Last 30 Days Average</div>
              </div>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={accuracyData}>
                    <XAxis dataKey="period" tick={{ fontSize: 10 }} />
                    <YAxis domain={[80, 100]} tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Bar dataKey="accuracy" fill="#10b981" radius={4} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="text-xs text-gray-500 text-center">
                Model: Prophet + XGBoost Ensemble
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Predicted Shortfalls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Predicted Shortfalls - Next 14 Days
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">SKU</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Product</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Store</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Current Stock</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Predicted Shortfall</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Days Until Shortfall</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Priority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {shortfallPredictions.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono text-sm">{item.sku}</td>
                    <td className="py-3 px-4 font-medium">{item.productName}</td>
                    <td className="py-3 px-4 text-gray-600">{item.store}</td>
                    <td className="py-3 px-4 font-semibold">{item.currentStock}</td>
                    <td className="py-3 px-4">
                      <span className="text-red-600 font-semibold">-{item.predictedShortfall}</span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={item.daysUntilShortfall <= 5 ? "destructive" : "secondary"}>
                        {item.daysUntilShortfall} days
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={item.daysUntilShortfall <= 5 ? "destructive" : item.daysUntilShortfall <= 10 ? "secondary" : "outline"}>
                        {item.daysUntilShortfall <= 5 ? "High" : item.daysUntilShortfall <= 10 ? "Medium" : "Low"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
