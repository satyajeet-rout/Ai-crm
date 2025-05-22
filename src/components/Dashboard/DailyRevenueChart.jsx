

import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DailyRevenueChart = () => {
  // Define partners with consistent colors
  const partners = [
    { id: 'redwood', name: 'Redwood Ranch', color: '#C70039' },
    { id: 'peat', name: 'Peat, Fruits and Leaves', color: '#581845' },
    { id: 'trowels', name: 'Trowels R Us', color: '#DAF7A6' },
    { id: 'happy', name: 'Happy Harvesters', color: '#5B9A8B' },
    { id: 'sprout', name: 'Sprout Society', color: '#F8A488' },
    { id: 'roots', name: 'Roots & Shoots', color: '#B5D99C' }
  ];

  // Generate data
  const generateDailyData = () => {
    const data = [];
    // Start date January 2024
    const startDate = new Date(2024, 0, 1);
    const endDate = new Date(2025, 4, 15); // May 15, 2025
    
    // Loop through each day
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      // Generate data points for each partner for this day
      partners.forEach(partner => {
        // Skip some days randomly to create a more natural pattern
        if (Math.random() > 0.4) {
          // Base revenue with some randomization
          let baseRevenue = 0;
          
          // Set different base revenues for different partners
          switch(partner.id) {
            case 'redwood':
              baseRevenue = 9000;
              break;
            case 'happy':
              baseRevenue = 8500;
              break;
            case 'peat':
              baseRevenue = 7500;
              break;
            case 'sprout':
              baseRevenue = 7000;
              break;
            case 'roots':
              baseRevenue = 6500;
              break;
            case 'trowels':
              baseRevenue = 6000;
              break;
            default:
              baseRevenue = 6000;
          }
          
          // Add seasonal variation
          const month = currentDate.getMonth();
          let seasonalFactor = 1.0;
          
          // Higher revenues in Q4 and Q1
          if (month >= 9 || month <= 1) {
            seasonalFactor = 1.3;
          }
          // Lower in summer
          else if (month >= 5 && month <= 7) {
            seasonalFactor = 0.9;
          }
          
          // Add time progression factor - general upward trend
          const daysSinceStart = (currentDate - startDate) / (1000 * 60 * 60 * 24);
          const progressionFactor = 1 + (daysSinceStart / 500); // Gentle upward slope
          
          // Random variation
          const randomFactor = 0.75 + (Math.random() * 0.5);
          
          // Calculate final revenue with all factors
          const revenue = baseRevenue * seasonalFactor * progressionFactor * randomFactor;
          
          // Add point to dataset
          data.push({
            partner: partner.id,
            name: partner.name,
            color: partner.color,
            date: new Date(currentDate).toISOString().split('T')[0],
            timestamp: currentDate.getTime(),
            revenue: Math.round(revenue)
          });
        }
      });
      
      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return data;
  };

  const [data] = useState(generateDailyData());

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="bg-white p-2 border shadow-sm rounded-md">
          <p className="text-sm font-medium">{new Date(dataPoint.date).toLocaleDateString()}</p>
          <p className="text-sm" style={{ color: dataPoint.color }}>
            <span className="font-medium">{dataPoint.name}:</span> US${dataPoint.revenue.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  // Format date for X-axis ticks
  const formatXAxis = (timestamp) => {
    const date = new Date(timestamp);
    if (date.getDate() === 1 || date.getDate() === 15) {
      if (date.getDate() === 1) {
        const month = date.toLocaleString('default', { month: 'short' });
        return month;
      }
    }
    return '';
  };

  // Format currency for Y-axis
  const formatYAxis = (value) => {
    return `US$${value.toLocaleString()}`;
  };

  return (
    <div className="grid grid-cols-2 gap-4 px-3.5">
      {/* Left side text card */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-amber-500 font-medium mb-2">👆 Pie Charts and a Scatter Plot 👉</h3>
        <p className="text-gray-600 mb-2 text-sm">
          You can hover on a partner name in the legends to highlight in the charts. By clicking a partner name you can also show/hide it in the chart.
        </p>
        <p className="text-gray-600 text-sm">
          Also, try clicking on a specific dot in the scatter plot or a piece of pie 🥧 and you can view the underlying data that makes up that specific metric.
        </p>
      </div>
      
      {/* Right side chart */}
      <div className="bg-white rounded-lg shadow p-6 w-full">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">What was daily revenue per Partner?</h2>
        
        {/* Legend */}
        <div className="flex flex-wrap justify-center mb-4 gap-x-6">
          {partners.map((partner) => (
            <div key={partner.id} className="flex items-center mb-2">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: partner.color }}
              ></div>
              <span className="text-sm text-gray-700">{partner.name}</span>
            </div>
          ))}
        </div>
        
        {/* Chart */}
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 20, right: 30, bottom: 20, left: 80 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="timestamp" 
                type="number"
                domain={['dataMin', 'dataMax']}
                name="Date"
                tickFormatter={formatXAxis}
                scale="time"
                tick={{ fontSize: 12 }}
                stroke="#9CA3AF"
              />
              <YAxis 
                dataKey="revenue" 
                name="Revenue" 
                domain={[0, 18000]}
                ticks={[0, 3000, 6000, 9000, 12000, 15000, 18000]}
                tick={{ fontSize: 12 }}
                tickFormatter={formatYAxis}
                stroke="#9CA3AF"
              />
              <Tooltip content={<CustomTooltip />} />
              
              {partners.map((partner) => (
                <Scatter 
                  key={partner.id}
                  name={partner.name}
                  data={data.filter(item => item.partner === partner.id)}
                  fill={partner.color}
                  line={false}
                  shape="circle"
                  legendType="circle"
                />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DailyRevenueChart;