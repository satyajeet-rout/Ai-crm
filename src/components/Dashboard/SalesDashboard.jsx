
import React from 'react';
import { 
  Search, 
  Settings, 
  Bell, 
  HelpCircle, 
  Sparkles, 
  RefreshCw,
  ChevronDown, 
  Maximize2, 
  Pencil, 
  Link, 
  MoreHorizontal,
  Filter,
  Calendar,
  Info
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SalesDashboard = ({ onBack }) => {
  // Sample data for the chart
  const chartData = [
    { month: '2024-05', gmail: 1800, other: 3700 },
    { month: '2024-06', gmail: 1600, other: 3300 },
    { month: '2024-07', gmail: 1800, other: 3600 },
    { month: '2024-08', gmail: 2100, other: 4100 },
    { month: '2024-09', gmail: 2000, other: 3900 },
    { month: '2024-10', gmail: 2600, other: 5100 },
    { month: '2024-11', gmail: 2000, other: 4000 },
    { month: '2024-12', gmail: 3000, other: 5900 },
    { month: '2025-01', gmail: 2500, other: 4900 },
    { month: '2025-02', gmail: 2700, other: 5200 },
    { month: '2025-03', gmail: 2500, other: 4900 },
    { month: '2025-04', gmail: 2600, other: 4800 }
  ];

  // Sample data for the table
  const partnerData = [
    { name: 'Redwood Ranch', orders: 26103, total: '$3,218,670.00', average: '$123.31' },
    { name: 'Happy Harvesters', orders: 22800, total: '$2,767,706.00', average: '$121.39' },
    { name: 'Peat, Fruits and Leaves', orders: 16219, total: '$2,004,515.00', average: '$123.59' },
    { name: 'Sprout Society', orders: 13165, total: '$1,635,701.00', average: '$124.25' },
    { name: 'Roots & Shoots', orders: 9854, total: '$1,213,178.00', average: '$123.12' },
    { name: 'Trowels R Us', orders: 9706, total: '$1,182,382.00', average: '$121.82' },
    { name: 'Plant Paradise', orders: 6498, total: '$793,804.00', average: '$122.16' },
    { name: 'Garden of Sweden', orders: 3190, total: '$376,325.00', average: '$117.97' },
    { name: 'Potted Paradise', orders: 3177, total: '$386,744.00', average: '$121.73' }
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      
      
      {/* Dashboard header */}
      <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <button 
            onClick={onBack}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center mr-4 bg-blue-50 px-3 py-1 rounded"
          >
            ← Back
          </button>
          <h4 className="text-xl font-semibold">Sales Example</h4>
          <button className="ml-2 text-gray-600">
            <Info size={16} />
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-1 border border-gray-300 rounded">
            <RefreshCw size={16} />
          </button>
          <button className="p-1 border border-gray-300 rounded">
            <ChevronDown size={16} />
          </button>
          <button className="p-1 text-gray-600">
            <Maximize2 size={16} />
          </button>
          <button className="p-1 text-gray-600">
            <Pencil size={16} />
          </button>
          <button className="p-1 text-gray-600">
            <Link size={16} />
          </button>
          <button className="p-1 text-gray-600">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-grow p-4 overflow-auto">
        {/* Filters */}
        <div className="flex justify-between mb-4">
          <div className="flex items-center space-x-3">
            <button className="px-3 py-1 bg-white border border-blue-500 text-blue-500 rounded flex items-center">
              <Filter size={16} className="mr-1" />
              Add filter
            </button>
            <div className="px-3 py-1 bg-white border border-gray-300 rounded text-sm">
              Browser is any value
            </div>
          </div>
          
          <button className="px-3 py-1 bg-white border border-gray-300 rounded flex items-center">
            <Calendar size={16} className="mr-1" />
            Date Zoom
            <ChevronDown size={16} className="ml-1" />
          </button>
        </div>
        
        {/* Welcome section */}
        <div className="bg-white p-4 rounded-lg shadow mb-4">
          <h5 className="text-lg font-semibold mb-2">Sales Dashboard</h5>
          <p className="text-gray-700">
            Welcome to the sales dashboard - to use this dashboard, check out some of the filters 
            that are available and explore from there.
          </p>
          <p className="text-gray-700">
            Note I could also add <a href="www.example.com" className="text-blue-500">links</a> here if I want, or even embed images!
          </p>
        </div>
        
        {/* Dashboard cards */}
        <div className="grid grid-cols-2 gap-4">
          {/* Chart card */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h5 className="text-blue-500 font-medium mb-4">
              What is the split of orders that come from gmail users per month?
            </h5>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis label={{ value: 'Order count', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="other" name="Is Other Email" fill="#3ba272" />
                  <Bar dataKey="gmail" name="Is Gmail Email" fill="#fc8452" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Table card */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h5 className="text-blue-500 font-medium mb-4">
              What are the sales stats per partner?
            </h5>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      #
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Partner name
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order count
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sum of basket total
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Average of basket total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {partnerData.map((partner, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {partner.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        {partner.orders.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        {partner.total}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        {partner.average}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesDashboard;