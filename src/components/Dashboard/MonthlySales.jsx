import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MonthlySales = () => {
  // Generate data for the Average Order Value chart
  const generateAovData = () => {
    const data = [];
    // Start from May 2023
    let startDate = new Date(2023, 4, 7); // May 7, 2023
    const endDate = new Date(2025, 0, 12); // Jan 12, 2025
    
    // Pattern that more closely matches the image
    const values = [
      130, 125, 120, 128, 124, 122, 145, 120, 118, 115, 122, 128, 125, 120, 
      126, 129, 130, 145, 122, 110, 112, 118, 125, 130, 120, 110, 112, 118, 
      125, 130, 123, 128, 135, 160, 130, 125, 120, 115, 112, 120, 125, 115, 
      108, 125, 130, 155, 135, 125, 130, 128, 115, 110, 120, 115, 120, 127, 
      129, 125, 120, 128, 130, 145, 125, 110, 105, 120, 125, 128, 145, 130, 
      125, 112, 110, 115, 120, 130, 125, 120, 148, 130, 122, 125, 130, 135
    ];
    
    let valueIndex = 0;
    
    while (startDate <= endDate) {
      data.push({
        date: startDate.toISOString().split('T')[0],
        value: values[valueIndex % values.length]
      });
      
      // Move to next week
      const newDate = new Date(startDate);
      newDate.setDate(startDate.getDate() + 7);
      startDate = newDate;
      valueIndex++;
    }
    
    return data;
  };
  
  const aovData = generateAovData();

  return (
    <div className="grid grid-cols-12 gap-4 py-3.5 px-3.5 mt-7">
      {/* Monthly Sales Stats Table */}
      <div className="col-span-5 bg-white p-4 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-700 font-medium">What are the monthly sales stats?</h3>
          <div className="bg-gray-200 rounded-full p-1 flex items-center">
            <span className="text-xs text-gray-600">2</span>
          </div>
        </div>
        
        <div className="overflow-auto">
          <table className="min-w-full border divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders <span className="inline-block ml-1">↓</span><br/>
                  Order date month
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders <span className="inline-block ml-1">↓</span><br/>
                  Order count
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders Sum of <span className="inline-block ml-1">↓</span><br/>
                  basket total
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders Sum <span className="inline-block ml-1">↓</span><br/>
                  of profit
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-2 whitespace-nowrap">1</td>
                <td className="px-4 py-2 whitespace-nowrap">2025-05</td>
                <td className="px-4 py-2 whitespace-nowrap text-right">3,717</td>
                <td className="px-4 py-2 whitespace-nowrap text-right">$456,583.00</td>
                <td className="px-4 py-2 whitespace-nowrap text-right">$49,743.88</td>
              </tr>
              <tr>
                <td className="px-4 py-2 whitespace-nowrap">2</td>
                <td className="px-4 py-2 whitespace-nowrap">2025-04</td>
                <td className="px-4 py-2 whitespace-nowrap text-right">7,326</td>
                <td className="px-4 py-2 whitespace-nowrap text-right">$895,861.00</td>
                <td className="px-4 py-2 whitespace-nowrap text-right">$98,558.04</td>
              </tr>
              <tr>
                <td className="px-4 py-2 whitespace-nowrap">3</td>
                <td className="px-4 py-2 whitespace-nowrap">2025-03</td>
                <td className="px-4 py-2 whitespace-nowrap text-right">7,478</td>
                <td className="px-4 py-2 whitespace-nowrap text-right">$906,466.00</td>
                <td className="px-4 py-2 whitespace-nowrap text-right">$100,827.62</td>
              </tr>
              <tr>
                <td className="px-4 py-2 whitespace-nowrap">4</td>
                <td className="px-4 py-2 whitespace-nowrap">2025-02</td>
                <td className="px-4 py-2 whitespace-nowrap text-right">7,832</td>
                <td className="px-4 py-2 whitespace-nowrap text-right">$958,671.00</td>
                <td className="px-4 py-2 whitespace-nowrap text-right">$106,504.86</td>
              </tr>
              <tr>
                <td className="px-4 py-2 whitespace-nowrap">5</td>
                <td className="px-4 py-2 whitespace-nowrap">2025-01</td>
                <td className="px-4 py-2 whitespace-nowrap text-right">7,396</td>
                <td className="px-4 py-2 whitespace-nowrap text-right">$901,255.00</td>
                <td className="px-4 py-2 whitespace-nowrap text-right">$100,636.24</td>
              </tr>
              <tr>
                <td className="px-4 py-2 whitespace-nowrap">6</td>
                <td className="px-4 py-2 whitespace-nowrap">2024-12</td>
                <td className="px-4 py-2 whitespace-nowrap text-right">8,829</td>
                <td className="px-4 py-2 whitespace-nowrap text-right">$1,098,746.00</td>
                <td className="px-4 py-2 whitespace-nowrap text-right">$122,733.01</td>
              </tr>
              <tr>
                <td className="px-4 py-2 whitespace-nowrap">7</td>
                <td className="px-4 py-2 whitespace-nowrap">2024-11</td>
                <td className="px-4 py-2 whitespace-nowrap text-right">6,083</td>
                <td className="px-4 py-2 whitespace-nowrap text-right">$735,409.00</td>
                <td className="px-4 py-2 whitespace-nowrap text-right">$81,476.94</td>
              </tr>
              <tr>
                <td className="px-4 py-2 whitespace-nowrap">8</td>
                <td className="px-4 py-2 whitespace-nowrap">2024-10</td>
                <td className="px-4 py-2 whitespace-nowrap text-right">7,646</td>
                <td className="px-4 py-2 whitespace-nowrap text-right">$935,144.00</td>
                <td className="px-4 py-2 whitespace-nowrap text-right">$105,768.96</td>
              </tr>
              <tr>
                <td className="px-4 py-2 whitespace-nowrap">9</td>
                <td className="px-4 py-2 whitespace-nowrap">2024-09</td>
                <td className="px-4 py-2 whitespace-nowrap text-right">5,867</td>
                <td className="px-4 py-2 whitespace-nowrap text-right">$740,822.00</td>
                <td className="px-4 py-2 whitespace-nowrap text-right">$81,230.15</td>
              </tr>
              <tr>
                <td className="px-4 py-2 whitespace-nowrap">10</td>
                <td className="px-4 py-2 whitespace-nowrap">2024-08</td>
                <td className="px-4 py-2 whitespace-nowrap text-right">6,105</td>
                <td className="px-4 py-2 whitespace-nowrap text-right">$732,871.00</td>
                <td className="px-4 py-2 whitespace-nowrap text-right">$82,711.51</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Chart Types Description */}
      <div className="col-span-3 bg-white p-4 rounded-lg shadow">
        <h3 className="text-gray-700 font-medium mb-4">More chart types 📈</h3>
        
        <div className="space-y-6">
          <div>
            <p className="text-gray-600">
              👉 to the left, you'll see a table, which conveniently has various sums and counts of data, grouped by month, showing a ton of useful info altogether.
            </p>
          </div>
          
          <div>
            <p className="text-gray-600">
              👉 to the right you'll see a trendline of the Average Order Value by week, calculated using a Custom Metric! Try hovering over the line to see the Average Order Value at a particular point in time.
            </p>
          </div>
        </div>
      </div>
      
      {/* Average Order Value Chart */}
      <div className="col-span-4 bg-white p-4 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-700 font-medium">How is the Average Order Value trending per week</h3>
          <div className="bg-gray-200 rounded-full p-1 flex items-center">
            <span className="text-xs text-gray-600">3</span>
          </div>
        </div>
        
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={aovData}
              margin={{ top: 5, right: 10, left: 70, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                }}
                tick={{ fontSize: 10 }}
                label={{ value: 'Week', position: 'insideBottom', offset: 0, fontSize: 12 }}
                ticks={['2023-05-07', '2023-10-08', '2024-03-10', '2024-08-11', '2025-01-12']}
              />
              <YAxis 
                label={{ 
                  value: 'Average Order Value', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle' },
                  fontSize: 12,
                  dx: -10
                }}
                domain={[0, 180]}
                ticks={[0, 30, 60, 90, 120, 150, 180]}
                tickFormatter={(value) => `US${value}.00`}
                tick={{ fontSize: 10 }}
              />
              <Tooltip 
                formatter={(value) => [`US$${value.toFixed(2)}`, 'Average Order Value']}
                labelFormatter={(value) => `Week of ${value}`}
              />
                              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#4F46E5" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MonthlySales;