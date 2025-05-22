
import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Search, Settings, Bell, HelpCircle, Maximize, BarChart2, Filter, ChevronDown, MoreHorizontal, Play, RefreshCcw, Maximize2, Edit, Link, ArrowLeft } from 'lucide-react';

// Sample data for charts
const weeklyOrdersData = Array(50).fill().map((_, i) => ({
  week: `2023-${(i % 12) + 1}-${(i % 28) + 1}`,
  orders: 1 + Math.random() * 0.08,
}));

const weeklySignupsData = Array(50).fill().map((_, i) => ({
  week: `2023-${(i % 12) + 1}-${(i % 28) + 1}`,
  users: 100 + Math.random() * 400,
}));

const revenueData = Array(50).fill().map((_, i) => ({
  week: `2023-${(i % 12) + 1}-${(i % 28) + 1}`,
  direct: Math.random() * 50000,
  instagram: Math.random() * 70000,
  ppc: Math.random() * 60000,
  twitter: Math.random() * 55000,
  facebook: Math.random() * 65000,
  organic: Math.random() * 80000,
}));

const browserData = [
  { browser: 'chrome', users: 25251 },
  { browser: 'safari', users: 13375 },
  { browser: 'edge', users: 8354 },
  { browser: 'firefox', users: 1688 },
  { browser: 'internet_explorer', users: 801 },
  { browser: 'netscape', users: 333 },
  { browser: 'lynx', users: 165 },
];

const referrerData = [
  { referrer: 'twitter', average: 125.17 },
  { referrer: 'ppc', average: 123.22 },
  { referrer: 'instagram', average: 122.66 },
  { referrer: 'facebook', average: 122.59 },
  { referrer: 'organic', average: 121.99 },
  { referrer: 'direct', average: 120.80 },
];

const customerData = [
  { id: 1, email: 'enoch_quae@yahoo.com', count: 15 },
  { id: 2, email: 'leonor_rerum@gmail.com', count: 15 },
  { id: 3, email: 'colby_et@yahoo.com', count: 14 },
  { id: 4, email: 'colin_et@gmail.com', count: 14 },
  { id: 5, email: 'hortense_harum@yahoo.com', count: 14 },
  { id: 6, email: 'lavern_quidem@gmail.com', count: 14 },
  { id: 7, email: 'cale_et@gmail.com', count: 14 },
  { id: 8, email: 'neal_eos@gmail.com', count: 13 },
  { id: 9, email: 'abigayle_vel@gmail.com', count: 13 },
  { id: 10, email: 'isabell_ut@hotmail.com', count: 13 },
];

const MarketingDashboard = ({ onBack }) => {
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4">
          {/* Marketing header */}
          <div className="flex items-center justify-between mb-4">
            
            <div className="flex items-center">
            {onBack && (
            <button 
              onClick={onBack}
              className="mr-2 p-1 rounded-full cursor-pointer "
            >
              <ArrowLeft size={18} className="text-black" />
            </button>
          )}
              <span className="bg-yellow-100 text-yellow-800 p-1 mr-2">📁</span>
              <h1 className="text-xl font-semibold">Marketing</h1>
              <button className="ml-2"><HelpCircle size={16} /></button>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-1 rounded hover:bg-gray-200"><RefreshCcw size={16} /></button>
              <button className="p-1 rounded hover:bg-gray-200"><Maximize2 size={16} /></button>
              <button className="p-1 rounded hover:bg-gray-200"><Edit size={16} /></button>
              <button className="p-1 rounded hover:bg-gray-200"><Link size={16} /></button>
              <button className="p-1 rounded hover:bg-gray-200"><MoreHorizontal size={16} /></button>
            </div>
          </div>

          {/* Filter row */}
          <div className="flex justify-between mb-4">
            <button className="flex items-center px-3 py-2 bg-white border rounded shadow-sm">
              <Filter size={16} className="mr-2" />
              <span>Add filter</span>
            </button>
            <button className="flex items-center px-3 py-2 bg-white border rounded shadow-sm">
              <span>Date Zoom</span>
              <ChevronDown size={16} className="ml-2" />
            </button>
          </div>

          {/* Dashboard grid */}
          <div className="grid grid-cols-3 gap-4">
            {/* Weekly Orders Card */}
            <div className="bg-white p-4 rounded shadow">
              <div className="flex justify-between mb-2">
                <h2 className="font-medium">How many orders per week per user?</h2>
                <button className="text-gray-400"><Link size={16} /></button>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyOrdersData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" hide />
                    <YAxis domain={[1, 1.08]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="orders" stroke="#3182ce" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Weekly Signups Card */}
            <div className="bg-white p-4 rounded shadow">
              <div className="flex justify-between mb-2">
                <h2 className="font-medium">How many signups per week?</h2>
                <button className="text-gray-400"><Link size={16} /></button>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklySignupsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" hide />
                    <YAxis domain={[0, 600]} />
                    <Tooltip />
                    <Bar dataKey="users" fill="#3182ce" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Tips Card */}
            <div className="bg-white p-4 rounded shadow">
              <div className="flex justify-between mb-2">
                <h2 className="font-medium">Tips for this lightdash thing</h2>
                <button className="text-gray-400"><Link size={16} /></button>
              </div>
              <div className="text-sm mb-2">
                <p>Hey team, check this Loom video on the right which shows you how to make a stacked bar chart when you can't be bothered to read the docs like me 📊 Cool.</p>
                <p className="mt-2">(Yes, I know I could have slacked this to you but I wanted to show off this new markdown✍️ tile)</p>
                <p className="mt-2">PS., does anybody know what <span className="font-mono">lynx</span> and <span className="font-mono">netscape</span> are?! We have a bunch of users who browse using them...</p>
              </div>
              <div className="relative rounded overflow-hidden h-40 mt-4">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  {videoPlaying ? (
                    <div className="bg-gray-800 w-full h-full"></div>
                  ) : (
                    <button 
                      onClick={() => setVideoPlaying(true)}
                      className="bg-purple-500 text-white rounded-full p-3"
                    >
                      <Play size={24} fill="white" />
                    </button>
                  )}
                </div>
                {videoPlaying && (
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs p-1 rounded flex items-center">
                    <span>1.2x</span>
                    <span className="mx-2">•</span>
                    <span>7 sec</span>
                  </div>
                )}
              </div>
            </div>

            {/* Popular Browsers Card */}
            <div className="bg-white p-4 rounded shadow col-span-1 row-span-2">
              <div className="flex justify-between mb-2">
                <h2 className="font-medium">What are the most popular browsers?</h2>
                <button className="text-gray-400"><Link size={16} /></button>
              </div>
              <div className="overflow-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                      <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Users <ChevronDown size={12} className="inline" />
                        <div className="text-xs font-normal normal-case">Browser</div>
                      </th>
                      <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Users Total <ChevronDown size={12} className="inline" />
                        <div className="text-xs font-normal normal-case">users</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {browserData.map((item, index) => (
                      <tr key={item.browser}>
                        <td className="px-2 py-1 whitespace-nowrap text-sm">{index + 1}</td>
                        <td className="px-2 py-1 whitespace-nowrap text-sm">{item.browser}</td>
                        <td className="px-2 py-1 whitespace-nowrap text-sm text-right">{item.users.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6">
                <h2 className="font-medium mb-2">What is the Average Order Value per referrer?</h2>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-2 py-1 text-left text-xs font-medium text-gray-500">#</th>
                      <th className="px-2 py-1 text-left text-xs font-medium text-gray-500">Referrer</th>
                      <th className="px-2 py-1 text-left text-xs font-medium text-gray-500">
                        Average of basket total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {referrerData.map((item, index) => (
                      <tr key={item.referrer}>
                        <td className="px-2 py-1 whitespace-nowrap text-sm">{index + 1}</td>
                        <td className="px-2 py-1 whitespace-nowrap text-sm">{item.referrer}</td>
                        <td className="px-2 py-1 whitespace-nowrap text-sm text-right">${item.average}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Revenue by Referrer */}
            <div className="bg-white p-4 rounded shadow col-span-2">
              <div className="flex justify-between mb-2">
                <h2 className="font-medium">How much revenue does each referrer bring us in per week?</h2>
                <button className="text-gray-400"><Link size={16} /></button>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" hide />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="direct" stackId="1" fill="#64B5F6" stroke="#64B5F6" />
                    <Area type="monotone" dataKey="instagram" stackId="1" fill="#FFB74D" stroke="#FFB74D" />
                    <Area type="monotone" dataKey="ppc" stackId="1" fill="#FF8A65" stroke="#FF8A65" />
                    <Area type="monotone" dataKey="twitter" stackId="1" fill="#4FC3F7" stroke="#4FC3F7" />
                    <Area type="monotone" dataKey="facebook" stackId="1" fill="#EF5350" stroke="#EF5350" />
                    <Area type="monotone" dataKey="organic" stackId="1" fill="#81C784" stroke="#81C784" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Customers */}
            <div className="bg-white p-4 rounded shadow">
              <div className="flex justify-between mb-2">
                <h2 className="font-medium">Whom are our top customers in terms of orders?</h2>
                <button className="text-gray-400"><Link size={16} /></button>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-2 py-1 text-left text-xs font-medium text-gray-500">#</th>
                    <th className="px-2 py-1 text-left text-xs font-medium text-gray-500">
                      Orders <ChevronDown size={12} className="inline" />
                      <div className="text-xs font-normal normal-case">Email</div>
                    </th>
                    <th className="px-2 py-1 text-left text-xs font-medium text-gray-500">
                      Orders <ChevronDown size={12} className="inline" />
                      <div className="text-xs font-normal normal-case">Order count</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customerData.map((customer) => (
                    <tr key={customer.id}>
                      <td className="px-2 py-1 whitespace-nowrap text-sm">{customer.id}</td>
                      <td className="px-2 py-1 whitespace-nowrap text-sm">{customer.email}</td>
                      <td className="px-2 py-1 whitespace-nowrap text-sm text-right">{customer.count}</td>
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

export default MarketingDashboard;