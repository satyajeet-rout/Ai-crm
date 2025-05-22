import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import { PieChart, Pie, Sector } from 'recharts';

const Partner = () => {
  // Partner data
  const partners = [
    { name: 'Redwood Ranch', color: '#d13b40' },
    { name: 'Happy Harvesters', color: '#4169e1' },
    { name: 'Peat, Fruits and Leaves', color: '#6a0dad' },
    { name: 'Sprout Society', color: '#ff8c69' },
    { name: 'Roots & Shoots', color: '#90ee90' },
    { name: 'Trowels R Us', color: '#e6ffe6' },
    { name: 'Plant Paradise', color: '#ff6347' },
    { name: 'Potted Paradise', color: '#cd5c5c' },
    { name: 'Garden of Sweden', color: '#ffd700' }
  ];

  // Orders by partner data
  const ordersByPartner = [
    { name: 'Redwood Ranch', value: 26103, color: '#d13b40' },
    { name: 'Happy Harvesters', value: 22800, color: '#4169e1' },
    { name: 'Peat, Fruits and Leaves', value: 16219, color: '#6a0dad' },
    { name: 'Sprout Society', value: 13165, color: '#ff8c69' },
    { name: 'Roots & Shoots', value: 9854, color: '#90ee90' },
    { name: 'Trowels R Us', value: 9706, color: '#e6ffe6' },
    { name: 'Plant Paradise', value: 7498, color: '#ff6347' }
  ];

  // Revenue by partner data
  const revenueByPartner = [
    { name: 'Redwood Ranch', value: 3218670, color: '#d13b40' },
    { name: 'Happy Harvesters', value: 2767703, color: '#4169e1' },
    { name: 'Peat, Fruits and Leaves', value: 2004515, color: '#6a0dad' },
    { name: 'Sprout Society', value: 1213178, color: '#ff8c69' },
    { name: 'Roots & Shoots', value: 875429, color: '#90ee90' },
    { name: 'Trowels R Us', value: 683542, color: '#e6ffe6' }
  ];

  // Weekly revenue data
  const generateWeeklyData = () => {
    const weeks = [];
    const startDate = new Date('2024-04-01');
    const endDate = new Date('2025-04-01');
    let currentDate = new Date(startDate);
    
    while (currentDate < endDate) {
      const weekData = {
        week: currentDate.toISOString().split('T')[0],
        'Redwood Ranch': Math.random() * 70000 + 50000,
        'Happy Harvesters': Math.random() * 60000 + 30000,
        'Peat, Fruits and Leaves': Math.random() * 80000 + 40000,
        'Sprout Society': Math.random() * 50000 + 20000,
        'Roots & Shoots': Math.random() * 40000 + 10000,
        'Trowels R Us': Math.random() * 30000 + 20000,
        'Plant Paradise': Math.random() * 25000 + 10000,
        'Potted Paradise': Math.random() * 20000 + 5000,
        'Garden of Sweden': Math.random() * 15000 + 5000
      };
      
      weeks.push(weekData);
      
      // Add 2 weeks
      currentDate.setDate(currentDate.getDate() + 14);
    }
    
    return weeks;
  };

  const weeklyRevenueData = generateWeeklyData();

  // Custom chart tooltips
  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border shadow-sm text-xs">
          <p className="font-semibold">{payload[0].name}</p>
          <p className="text-gray-700">{payload[0].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  const CustomRevenuePieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border shadow-sm text-xs">
          <p className="font-semibold">{payload[0].name}</p>
          <p className="text-gray-700">US${payload[0].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  const CustomBarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border shadow-sm text-xs">
          <p className="font-semibold">Week: {label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: US${entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (value / getTotal(ordersByPartner) < 0.05) return null;

    // Special handling for specific values
    const textColor = (value === 9854 || value === 9706) ? '#000000' : '#ffffff';

    return (
      <text 
        x={x} 
        y={y} 
        fill={textColor} 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-xs"
      >
        {value.toLocaleString()}
      </text>
    );
  };

  const getTotal = (data) => {
    return data.reduce((sum, item) => sum + item.value, 0);
  };

  return (
    <div className="flex flex-col p-4 bg-gray-50">
      {/* Top row with two charts */}
      <div className="flex flex-row mb-4 gap-4">
        {/* Left Panel - Orders by Partner */}
        <div className="w-1/2 bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">How many Orders from each Partner?</h2>
          </div>
          
          <div className="flex">
            {/* Legend */}
            <div className="w-1/3">
              {ordersByPartner.map((entry, index) => (
                <div key={index} className="flex items-center mb-2">
                  <div className="w-4 h-4 mr-2" style={{ backgroundColor: entry.color }}></div>
                  <span className="text-xs">{entry.name}</span>
                </div>
              ))}
            </div>
            
            {/* Pie chart */}
            <div className="w-2/3 h-64 mx-20 mt-[-30px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ordersByPartner}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {ordersByPartner.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          
        </div>

        {/* Right Panel - Weekly Revenue per Partner */}
        <div className="w-1/2 bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">What is the weekly revenue per partner?</h2>
          </div>
          
          <div className="flex mb-2">
            {partners.slice(0, 4).map((partner, index) => (
              <div key={index} className="flex items-center mr-3">
                <div className="w-3 h-3 mr-1" style={{ backgroundColor: partner.color }}></div>
                <span className="text-xs">{partner.name}</span>
              </div>
            ))}
          </div>
          <div className="flex mb-4">
            {partners.slice(4, 8).map((partner, index) => (
              <div key={index} className="flex items-center mr-3">
                <div className="w-3 h-3 mr-1" style={{ backgroundColor: partner.color }}></div>
                <span className="text-xs">{partner.name}</span>
              </div>
            ))}
            <div className="flex items-center justify-between ml-auto">
              <span className="text-xs text-gray-500 mr-2">1/2</span>
              <div className="flex">
                <div className="text-gray-400 mr-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </div>
                <div className="text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={weeklyRevenueData}
                margin={{ top: 5, right: 5, bottom: 20, left: 5 }}
                barSize={12}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="week" 
                  tick={{ fontSize: 10 }}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toISOString().split('T')[0];
                  }}
                  label={{ value: 'Week', position: 'insideBottom', offset: -10, fontSize: 10 }}
                />
                <YAxis 
                  tickFormatter={(value) => `US$${(value/1000).toFixed(0)},000.00`}
                  tick={{ fontSize: 10 }}
                  label={{ 
                    value: 'Weekly revenue per partner', 
                    angle: -90, 
                    position: 'insideLeft', 
                    offset: 0,
                    fontSize: 10,
                    dx: -20
                  }}
                />
                <Tooltip content={<CustomBarTooltip />} />
                {partners.map((partner) => (
                  <Bar 
                    key={partner.name} 
                    dataKey={partner.name} 
                    stackId="a" 
                    fill={partner.color} 
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom row with Revenue by Partner chart */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">How much Revenue per Partner?</h2>
        </div>
        
        <div className="flex">
          {/* Legend */}
          <div className="w-1/3">
            {revenueByPartner.map((entry, index) => (
              <div key={index} className="flex items-center mb-2">
                <div className="w-4 h-4 mr-2" style={{ backgroundColor: entry.color }}></div>
                <span className="text-xs">{entry.name}</span>
              </div>
            ))}
          </div>
          
          {/* Pie chart */}
          <div className="w-2/3 h-64 mr-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueByPartner}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {revenueByPartner.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomRevenuePieTooltip />} />
                {/* Remove the text in the center */}
                {/* Position all values around the pie chart */}
                {revenueByPartner.map((entry, index) => {
                  // Calculate position for the labels around the pie
                  const RADIAN = Math.PI / 180;
                  const cx = 260;
                  const cy = 130;
                  const midAngle = (index * 60 + 30) * RADIAN;
                  const radius = 110;
                  const x = cx + radius * Math.cos(midAngle);
                  const y = cy + radius * Math.sin(midAngle);
                  
                  return (
                    <text
                      key={`label-${index}`}
                      x={x}
                      y={y}
                      textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central"
                      className="text-xs"
                      fill="#000"
                    >
                      {`US${(entry.value).toLocaleString()}`}
                    </text>
                  );
                })}
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="flex justify-center mt-2">
          <div className="flex items-center">
            <div className="text-gray-400 mr-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </div>
            <span className="text-xs text-gray-500">1/2</span>
            <div className="text-gray-700 ml-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partner;