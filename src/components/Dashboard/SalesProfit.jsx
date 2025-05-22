import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { MessageCircle } from 'lucide-react';

const SalesProfit = () => {
  // Weekly revenue data with proper date formatting
  const weeklyRevenueData = [
    // 2023-07 to 2023-12 - starting small and gradually increasing
    ...Array(24).fill().map((_, i) => {
      const date = new Date(2023, 6 + Math.floor(i/4), 1 + (i%4)*7);
      return {
        week: date.toISOString().split('T')[0],
        revenue: 5000 + (i * 1500) + (Math.random() * 3000)
      };
    }),
    // 2024-01 to 2024-12 - higher with more variation
    ...Array(52).fill().map((_, i) => {
      const date = new Date(2024, Math.floor(i/4), 1 + (i%4)*7);
      
      // Add some periodic spikes to match the pattern in the image
      const baseValue = 70000 + (Math.random() * 30000);
      const spike = i % 6 === 0 ? 80000 + (Math.random() * 40000) : 0;
      
      return {
        week: date.toISOString().split('T')[0],
        revenue: baseValue + spike
      };
    }),
    // 2025-01 to 2025-05
    ...Array(20).fill().map((_, i) => {
      const date = new Date(2025, Math.floor(i/4), 1 + (i%4)*7);
      
      // Even higher values with more variation to match the image
      const baseValue = 150000 + (Math.random() * 50000);
      const spike = i % 4 === 0 ? 60000 + (Math.random() * 40000) : 0;
      
      return {
        week: date.toISOString().split('T')[0],
        revenue: baseValue + spike
      };
    }),
  ];

  // Sample data for monthly profit per partner
  const monthlyProfitData = Array(22).fill().map((_, i) => {
    const month = i < 6 ? `2023-${i + 7}` :
                 i < 18 ? `2024-${i - 5 < 10 ? '0' + (i - 5) : (i - 5)}` :
                 `2025-${i - 17 < 10 ? '0' + (i - 17) : (i - 17)}`;
    const multiplier = 1 + (i / 10);
    
    return {
      month,
      'Garden of Sweden': Math.random() * 8000 * multiplier + 3000,
      'Peat, Fruits and Leaves': Math.random() * 7000 * multiplier + 5000,
      'Plant Paradise': Math.random() * 6000 * multiplier + 4000,
      'Redwood Ranch': Math.random() * 15000 * multiplier + 10000,
      'Trowels R Us': Math.random() * 5000 * multiplier + 2000,
      'Sproutify': Math.random() * 7000 * multiplier + 4000,
    };
  });

  return (
    <div className="flex flex-col p-4 bg-gray-50">
      <div className="grid grid-cols-5 gap-4">
        {/* Left Column - 2/5 width */}
        <div className="col-span-2 bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">💰 Sales dashboard notice 💰</h2>
            <div className="bg-gray-200 rounded-full p-1">
              <span className="text-xs text-gray-600">2</span>
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-700 mb-2">
              Hey team, hope you're finding this new slick dashboard useful. Our Analytics 
              Engineer found this great new tool called Lightdash and I'm loving it!
            </p>
            
            <p className="text-gray-700 mb-2">
              Any questions/suggestions/exclamations? ✉️ Email me (Ash - Head of Sales) 
              ash@thymetoshine.com
            </p>
            
            <p className="text-gray-700">
              PS, check out the weekly revenue stats below👇, let's keep focusing on growing like 
              we have for the past year!
            </p>
          </div>
          
          <div className="mt-8 border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">What are the weekly revenue stats?</h3>
              <div className="bg-gray-200 rounded-full p-1">
                <span className="text-xs text-gray-600">2</span>
              </div>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={weeklyRevenueData}
                  margin={{ top: 5, right: 10, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="week" 
                    tick={{ fontSize: 10 }}
                    tickFormatter={(value) => {
                      const parts = value.split('-');
                      return `${parts[0]}-${parts[1]}-01`;
                    }}
                  />
                  <YAxis 
                    tickFormatter={(value) => `US${value/1000}k`}
                    domain={[0, 300000]}
                    ticks={[0, 50000, 100000, 150000, 200000, 250000, 300000]}
                  />
                  <Tooltip formatter={(value) => [`US${value.toFixed(2)}`, 'Revenue']} />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3B82F6" 
                    strokeWidth={1.5}
                    dot={{ fill: '#3B82F6', r: 1 }}
                    activeDot={{ r: 6 }}
                  />
                  {/* Target line */}
                  <Line 
                    type="monotone" 
                    dataKey={() => 120000} 
                    stroke="#F59E0B" 
                    strokeWidth={2} 
                    dot={false}
                    strokeDasharray="3 3"
                    name="Target"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Right Column - 3/5 width */}
        <div className="col-span-3 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">How much profit do we receive per month per partner?</h2>
          
          <div className="flex gap-2 text-xs mb-4 flex-wrap">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-400 mr-1 rounded"></div>
              <span>Garden of Sweden</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-900 mr-1 rounded"></div>
              <span>Peat, Fruits and Leaves</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-400 mr-1 rounded"></div>
              <span>Plant Paradise</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-700 mr-1 rounded"></div>
              <span>Redwood Ranch</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-200 mr-1 rounded"></div>
              <span>Trowels R Us</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-orange-400 mr-1 rounded"></div>
              <span>Sproutify</span>
            </div>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyProfitData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 10 }}
                  label={{ value: 'Monthly orders', position: 'insideBottom', offset: 0 }}
                />
                <YAxis 
                  tickFormatter={(value) => `US${value/1000}k`}
                  label={{ value: 'Profit', angle: -90, position: 'insideLeft', offset: -5 }}
                />
                <Tooltip formatter={(value) => [`US$${value.toFixed(2)}`, 'Profit']} />
                <Bar dataKey="Garden of Sweden" stackId="a" fill="#F6E05E" />
                <Bar dataKey="Peat, Fruits and Leaves" stackId="a" fill="#553C9A" />
                <Bar dataKey="Plant Paradise" stackId="a" fill="#F98080" />
                <Bar dataKey="Redwood Ranch" stackId="a" fill="#9B2C2C" />
                <Bar dataKey="Trowels R Us" stackId="a" fill="#C6F6D5" />
                <Bar dataKey="Sproutify" stackId="a" fill="#ED8936" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">👆 This is a stacked bar chart!</h3>
              <p className="text-gray-600">
                Try hovering over one of the partner names to see their
                contributions to the totals highlighted.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">💰 Big numbers!</h3>
              <p className="text-gray-600">
                Sometimes all you need are some big numbers
                - to highlight the most important KPIs.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      
    </div>
  );
};

export default SalesProfit;