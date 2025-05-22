


import React, { useState } from 'react';
import {
  RefreshCw,
  ChevronDown,
  Maximize2,
  Edit,
  Link,
  MoreHorizontal,
  Info,
  Filter,
  Calendar,
  MessageCircle
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';
import SalesProfit from './SalesProfit';
import MonthlySales from './MonthlySales';
import Partner from './Partner';
import DailyRevenueChart from './DailyRevenueChart';

const Sales = ({ onBack }) => {
  // Sample data
  const monthlyProfitData = [
    { month: '2023-07', garden: 4000, peat: 8000, plant: 6000, redwood: 12000, trowels: 3000, sprout: 5000, happy: 7000 },
    { month: '2023-10', garden: 5000, peat: 10000, plant: 8000, redwood: 15000, trowels: 4000, sprout: 6000, happy: 9000 },
    { month: '2024-01', garden: 6000, peat: 12000, plant: 9000, redwood: 20000, trowels: 5000, sprout: 7000, happy: 11000 },
    { month: '2024-04', garden: 7000, peat: 14000, plant: 10000, redwood: 25000, trowels: 6000, sprout: 8000, happy: 13000 },
    { month: '2024-07', garden: 8000, peat: 16000, plant: 11000, redwood: 30000, trowels: 7000, sprout: 9000, happy: 15000 },
    { month: '2024-10', garden: 9000, peat: 18000, plant: 12000, redwood: 35000, trowels: 8000, sprout: 10000, happy: 17000 },
    { month: '2025-01', garden: 10000, peat: 20000, plant: 13000, redwood: 40000, trowels: 9000, sprout: 11000, happy: 19000 },
    { month: '2025-04', garden: 11000, peat: 19000, plant: 12000, redwood: 38000, trowels: 8500, sprout: 10500, happy: 18000 }
  ];

  const weeklyRevenueData = Array.from({ length: 104 }, (_, i) => {
    const date = new Date(2023, 6, 1);
    date.setDate(date.getDate() + i * 7);
    const revenue = 5000 + Math.min(i * 1500, 200000) * (0.8 + Math.random() * 0.4);
    return {
      week: date.toISOString().split('T')[0],
      revenue: revenue
    };
  });

  const monthlySalesData = [
    { id: 1, month: '2025-05', count: 3716, basketTotal: 456133, profit: 49730.38 },
    { id: 2, month: '2025-04', count: 7326, basketTotal: 896066, profit: 98554.39 },
    { id: 3, month: '2025-03', count: 7476, basketTotal: 906192, profit: 100807.20 },
    { id: 4, month: '2025-02', count: 7833, basketTotal: 958970, profit: 106526.03 },
    { id: 5, month: '2025-01', count: 7394, basketTotal: 900592, profit: 100571.10 },
    { id: 6, month: '2024-12', count: 8832, basketTotal: 1099604, profit: 122813.05 },
    { id: 7, month: '2024-11', count: 6083, basketTotal: 735091, profit: 81402.98 },
    { id: 8, month: '2024-10', count: 7647, basketTotal: 935487, profit: 105844.42 },
    { id: 9, month: '2024-09', count: 5867, basketTotal: 740822, profit: 81230.15 },
    { id: 10, month: '2024-08', count: 6105, basketTotal: 732871, profit: 82711.51 }
  ];

  const aovTrendData = Array.from({ length: 104 }, (_, i) => {
    const date = new Date(2023, 4, 7);
    date.setDate(date.getDate() + i * 7);
    // Generate values that hover around 120, with some spikes
    let value = 120 + Math.sin(i * 0.2) * 10;
    if (i < 5) value = 90 + i * 10; // Start lower
    if (i === 8 || i === 15) value = 160; // Add spikes
    return {
      week: date.toISOString().split('T')[0],
      value: value
    };
  });

  const profitableProductsData = [
    { id: 1, name: 'Luxury Gas-Powered BBQ', profit: 167539.50 },
    { id: 2, name: 'Funky gnome themed parasol', profit: 141160.50 },
    { id: 3, name: 'Magnolia', profit: 106623.00 },
    { id: 4, name: 'Wood-fired pizza oven', profit: 92625.00 },
    { id: 5, name: 'Fire Pit Medium', profit: 86252.80 },
    { id: 6, name: 'Azalea', profit: 84628.75 }
  ];

  const popularProductsData = [
    { id: 5, name: 'Funky gnome themed parasol', count: 9691 },
    { id: 6, name: 'Fire Pit Medium', count: 9654 },
    { id: 7, name: 'Gerbera', count: 9625 },
    { id: 8, name: 'Azalea', count: 9605 },
    { id: 9, name: 'Basil seeds', count: 9591 }
  ];

  const referrerRevenueData = Array.from({ length: 52 }, (_, i) => {
    const date = new Date(2023, 9, 8);
    date.setDate(date.getDate() + i * 7);
    const baseValue = 20000 + Math.min(i * 3000, 100000);
    return {
      week: date.toISOString().split('T')[0],
      direct: baseValue * 0.2 * (0.8 + Math.random() * 0.4),
      instagram: baseValue * 0.3 * (0.8 + Math.random() * 0.4),
      ppc: baseValue * 0.15 * (0.8 + Math.random() * 0.4),
      twitter: baseValue * 0.1 * (0.8 + Math.random() * 0.4),
      facebook: baseValue * 0.15 * (0.8 + Math.random() * 0.4),
      organic: baseValue * 0.1 * (0.8 + Math.random() * 0.4)
    };
  });

  const partnerOrdersData = [
    { name: 'Redwood Ranch', value: 26103, color: '#B93B46' },
    { name: 'Happy Harvesters', value: 22800, color: '#5270C5' },
    { name: 'Peat, Fruits and Leaves', value: 16219, color: '#7E3F67' },
    { name: 'Sprout Society', value: 13165, color: '#EA9978' },
    { name: 'Roots & Shoots', value: 9854, color: '#7CCF7F' },
    { name: 'Trowels R Us', value: 9706, color: '#C0E486' },
    { name: 'Plant Paradise', value: 6498, color: '#F27052' }
  ];

  const partnerRevenueData = [
    { name: 'Redwood Ranch', value: 3218670, color: '#B93B46' },
    { name: 'Happy Harvesters', value: 2767706, color: '#5270C5' },
    { name: 'Peat, Fruits and Leaves', value: 2004515, color: '#7E3F67' },
    { name: 'Sprout Society', value: 1635701, color: '#EA9978' },
    { name: 'Roots & Shoots', value: 1213178, color: '#7CCF7F' },
    { name: 'Trowels R Us', value: 1182382, color: '#C0E486' }
  ];

  const weeklyRevenueByPartnerData = Array.from({ length: 52 }, (_, i) => {
    const date = new Date(2024, 3, 21);
    date.setDate(date.getDate() + i * 7);
    const baseValue = 20000 + Math.min(i * 2000, 60000) * (0.8 + Math.random() * 0.4);
    return {
      week: date.toISOString().split('T')[0],
      garden: baseValue * 0.1 * (0.8 + Math.random() * 0.4),
      peat: baseValue * 0.2 * (0.8 + Math.random() * 0.4),
      redwood: baseValue * 0.25 * (0.8 + Math.random() * 0.4),
      trowels: baseValue * 0.15 * (0.8 + Math.random() * 0.4),
      plant: baseValue * 0.15 * (0.8 + Math.random() * 0.4),
      happy: baseValue * 0.15 * (0.8 + Math.random() * 0.4)
    };
  });

  const dailyRevenueData = Array.from({ length: 365 }, (_, i) => {
    const date = new Date(2024, 0, 1);
    date.setDate(date.getDate() + i);
    
    // Create different clusters for different partners
    const partners = [
      { name: 'Redwood Ranch', base: 11000, spread: 2000, color: '#C25765' },
      { name: 'Peat, Fruits and Leaves', base: 8000, spread: 1500, color: '#7E3F67' },
      { name: 'Trowels R Us', base: 6000, spread: 1000, color: '#C0E486' },
      { name: 'Happy Harvesters', base: 10000, spread: 2500, color: '#6A89CC' },
      { name: 'Sprout Society', base: 7000, spread: 800, color: '#EA9978' },
      { name: 'Roots & Shoots', base: 6500, spread: 1200, color: '#7CCF7F' }
    ];
    
    // For each partner, create a data point
    return partners.map(partner => ({
      date: date.toISOString().split('T')[0],
      partner: partner.name,
      revenue: partner.base * (0.7 + Math.random() * 0.6) + Math.min(i * 10, 3000),
      color: partner.color
    }));
  }).flat();

  return (
    <div className="bg-gray-50 min-h-screen overflow-auto">
      {/* Header */}
      <div className="bg-white border-b p-4 flex items-center justify-between">
        <div className="flex items-center">
          {/* Back button */}
          {onBack && (
            <button 
              onClick={onBack}
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center mr-4 cursor-pointer"
            >
              ←
            </button>
          )}
          <div className="flex items-center space-x-2">
            <span className="text-xl font-medium">Sales</span>
            <button className="text-gray-500">
              <Info size={16} />
            </button>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="p-1 rounded border border-gray-300">
            <RefreshCw size={16} />
          </button>
          <button className="p-1 rounded border border-gray-300">
            <ChevronDown size={16} />
          </button>
          <button className="p-1 rounded border border-gray-300">
            <Maximize2 size={16} />
          </button>
          <button className="p-1 rounded border border-gray-300">
            <Edit size={16} />
          </button>
          <button className="p-1 rounded border border-gray-300">
            <Link size={16} />
          </button>
          <button className="p-1 rounded border border-gray-300">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 flex items-center justify-between bg-white border-b">
        <div className="flex space-x-2">
          <button className="flex items-center space-x-1 px-3 py-1 bg-white border border-blue-500 text-blue-500 rounded">
            <Filter size={14} />
            <span>Add filter</span>
          </button>
          <div className="px-3 py-1 bg-white border border-gray-300 rounded text-sm">
            Order date <span className="text-gray-600">in the last 2 years</span>
          </div>
          <div className="px-3 py-1 bg-white border border-gray-300 rounded text-sm">
            Shipping country <span className="text-gray-600">is any value</span>
          </div>
          <div className="px-3 py-1 bg-white border border-gray-300 rounded text-sm">
            Product name <span className="text-gray-600">is any value</span>
          </div>
        </div>
        <button className="flex items-center space-x-1 px-3 py-1 bg-white border border-gray-300 rounded">
          <Calendar size={14} />
          <span>Date Zoom</span>
          <ChevronDown size={14} />
        </button>
      </div>

      <SalesProfit />

      {/* Weekly revenue chart */}
      {/* Rest of the component remains the same */}
      
      <div className="grid grid-cols-4 gap-4 px-3.5">
        {/* Orders Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-gray-700 font-medium">How many orders have we had?</h3>
            <div className="bg-gray-200 rounded-full p-1">
              <MessageCircle size={16} className="text-gray-500" />
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="mb-1">
              <span className="text-4xl font-bold bg-orange-300 px-2 py-1">11,043</span>
            </div>
            <div className="text-gray-600 mb-4">orders</div>
            <div className="flex items-center">
              <span className="text-red-500 mr-2">-51%</span>
              <span className="text-gray-500 text-sm">compared to last quarter</span>
            </div>
          </div>
        </div>
        
        {/* Units Sold Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-gray-700 font-medium">Total units sold</h3>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="mb-1">
              <span className="text-4xl font-bold">215,684</span>
            </div>
            <div className="text-gray-600">Units sold</div>
          </div>
        </div>
        
        {/* Revenue Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-gray-700 font-medium">What is our total revenue?</h3>
          </div>
          
          <div className="flex flex-col items-center justify-center">
            <div className="text-center">
              <span className="text-2xl font-bold break-all">US$13,579,025.00</span>
            </div>
          </div>
        </div>
        
        {/* Profit Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-gray-700 font-medium">What is our total profit?</h3>
          </div>
          
          <div className="flex flex-col items-center justify-center">
            <div className="text-center">
              <span className="text-2xl font-bold break-all">US$1,515,265.39</span>
            </div>
          </div>
        </div>
      </div>

      <MonthlySales />
      
      {/* Main content */}
      <div className="p-4">
        {/* Side by side: Sales Notice and Monthly Profit Chart */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          
        </div>

        {/* Data drilling, Profitable products, and Whole > parts */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-700 font-bold mb-2">Drilling down into the data 🔍</h3>
            <p className="text-gray-600 mb-2 text-sm">
              Looks like Sally was spot on about the Summer BBQ promotion bringing in lots of profit. But what about the least popular products - maybe we need to rethink our marketing strategy for those?
            </p>
            <p className="text-gray-600 text-sm">
              Dig deeper by selecting "Explore from here" via the three-dotted menu. Try sorting the table the other way around to find out. (Hint: it's Basil Seeds!)
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-700 font-bold mb-2">What are the most profitable products?</h3>
            <div className="overflow-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-3 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                    <th className="px-3 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Baskets Product name
                    </th>
                    <th className="px-3 py-2 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Baskets Sum of item profit
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {profitableProductsData.map((product) => (
                    <tr key={product.id} className={product.id % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{product.id}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{product.name}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900 text-right">${product.profit.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-700 font-bold mb-2">The whole is greater</h3>
            <p className="text-gray-600 text-sm">
              than the sum of its parts
            </p>
            <p className="text-gray-600 mt-2 text-sm">
              Tiles placed beside each other can tell more of a story! In the chart to the left and right of this message, it's clear that the most profitable products don't happen to be the most popular ones!
            </p>
          </div>
        </div>

        {/* Popular products, BI dimension explanation, and Referrer revenue */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-600 mb-2">What are the most popular products?</h3>
            <div className="overflow-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-3 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                    <th className="px-3 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Baskets Product name
                    </th>
                    <th className="px-3 py-2 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Baskets Sum of product name
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {popularProductsData.map((product) => (
                    <tr key={product.id} className={product.id % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{product.id}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{product.name}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900 text-right">{product.count.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-600 mb-2">Taking BI to a higher dimension</h3>
            <p className="text-gray-600 mb-2 text-sm">
              🔍 If looking at data grouped by a certain cadence (e.g. monthly) isn't granular enough for you, we can use this feature called Dimensions which make it simple to just edit a chart, and switch to, say, weekly. Slicing and dicing data is easy!
            </p>
            <p className="text-gray-600 mb-2 text-sm">
              💡 Our Analytics Engineer hasn't gotten round to defining our Dimensions and Metrics but it seems Lightdash has created a bunch of sensible defaults for us automatically meaning we could start using this on day 1!
            </p>
            <p className="text-gray-600 text-sm">
              Maybe try it yourself... select "Edit chart" from the three-dotted options menu on the chart to the right 👉 and try changing the time dimension on the left from weeks to months...
            </p>
          </div>
        </div>

        {/* Referrer revenue */}
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-600 mb-2">How much revenue does each referrer bring us in per week?</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={referrerRevenueData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  stackOffset="sign"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="week"
                    tickFormatter={(tick) => {
                      const date = new Date(tick);
                      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                    }}
                  />
                  <YAxis label={{ value: 'Revenue', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => `US${value.toLocaleString()}`} />
                  <Legend />
                  <Bar dataKey="direct" name="direct" stackId="a" fill="#74C0E0" />
                  <Bar dataKey="instagram" name="instagram" stackId="a" fill="#F9DC5C" />
                  <Bar dataKey="ppc" name="ppc" stackId="a" fill="#F3826F" />
                  <Bar dataKey="twitter" name="twitter" stackId="a" fill="#1DA1F2" />
                  <Bar dataKey="facebook" name="facebook" stackId="a" fill="#4267B2" />
                  <Bar dataKey="organic" name="organic" stackId="a" fill="#A1C181" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <Partner />

        {/* Pie chart explanation and Scatter plot */}
        
          
          <DailyRevenueChart />
          
      
      </div>
    </div>
  );
};

export default Sales;