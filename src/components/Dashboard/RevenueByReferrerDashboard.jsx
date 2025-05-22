

import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  Search, 
  Settings, 
  Bell, 
  HelpCircle, 
  Maximize, 
  ExternalLink, 
  Edit, 
  MoreHorizontal,
  ArrowLeft
} from 'lucide-react';

const RevenueByReferrerDashboard = ({ onBack }) => {
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const [chartExpanded, setChartExpanded] = useState(true);
  const [resultsExpanded, setResultsExpanded] = useState(false);
  const [sqlExpanded, setSqlExpanded] = useState(false);
  
  // Sample data for the chart (simplified version of what's in the image)
  const monthlyData = [
    "2023-07", "2023-10", "2024-01", "2024-04", "2024-07", "2024-10", "2025-01", "2025-04"
  ];
  
  // Sample data for the results table
  const resultsData = [
    { id: 1, referrer: 'facebook', month: '2025-05', total: 104074.00 },
    { id: 2, referrer: 'direct', month: '2025-05', total: 37289.00 },
    { id: 3, referrer: 'ppc', month: '2025-05', total: 135929.00 },
    { id: 4, referrer: 'organic', month: '2025-05', total: 66471.00 },
    { id: 5, referrer: 'twitter', month: '2025-05', total: 28251.00 },
    { id: 6, referrer: 'instagram', month: '2025-05', total: 170090.00 },
    { id: 7, referrer: 'ppc', month: '2025-04', total: 204862.00 },
    { id: 8, referrer: 'facebook', month: '2025-04', total: 173859.00 },
    { id: 9, referrer: 'organic', month: '2025-04', total: 104204.00 },
    { id: 10, referrer: 'direct', month: '2025-04', total: 74627.00 },
  ];

  // SQL query code
  const sqlCode = `SELECT
  \`dbt_orders\`.\`referrer\` AS \`dbt_orders_referrer\`,
  TIMESTAMP_TRUNC(\`timestamp_add\`
  \`dbt_orders\`.\`order_date\`,
  interval timestamp_diff(current_timestamp(), timestamp '2025-02-13 00:00:00', second) second
  ), MONTH) AS \`dbt_orders_order_date_month\`,
  SUM(\`dbt_orders\`.\`basket_total\`) AS \`dbt_orders_sum_of_basket_total\`
FROM \`lightdash-healthcare-demo\`.\`lightdash_gardening_demo\`.\`dbt_orders\` AS \`dbt_orders\`

GROUP BY 1,2
ORDER BY \`dbt_orders_order_date_month\` DESC
LIMIT 500`;

  // Referrer colors for the legend
  const referrerColors = {
    direct: '#5DADE2',
    facebook: '#E74C3C',
    instagram: '#F1C40F',
    organic: '#2ECC71',
    ppc: '#9B59B6',
    twitter: '#3498DB'
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 w-full">
      {/* Header */}
      
      {/* Breadcrumb & Title */}
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center text-sm">
          <button 
            onClick={onBack}
            className="text-white p-1 rounded hover:bg-gray-200 mr-2"
          >
            <ArrowLeft size={18} className="text-black" />
          </button>
          <span className="text-amber-600 mr-1">📁</span>
          <span className="text-gray-500">Marketing</span>
          <span className="text-gray-500 mx-1">/</span>
          <span className="font-medium">What is the revenue by referrer per month?</span>
          <div className="ml-1 text-gray-400">
            <HelpCircle size={14} />
          </div>
        </div>
        <div className="flex items-center justify-between mt-1">
          <div className="text-xs text-gray-500">
            Last edited 3 years ago by Ian Ahuja
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-1 bg-blue-500 text-white px-3 py-1 rounded text-sm">
              <ExternalLink size={14} />
              <span>Explore from here</span>
            </button>
            <button className="flex items-center space-x-1 border border-gray-300 px-3 py-1 rounded text-sm">
              <Edit size={14} />
              <span>Edit chart</span>
            </button>
            <button className="border border-gray-300 p-1.5 rounded">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto p-4">
        <div className="grid grid-cols-1 gap-4">
          {/* Filters Card */}
          <div className="bg-white rounded-lg shadow">
            <div 
              className="px-4 py-3 flex items-center cursor-pointer"
              onClick={() => setFiltersExpanded(!filtersExpanded)}
            >
              {filtersExpanded ? 
                <ChevronDown size={16} className="mr-2" /> : 
                <ChevronRight size={16} className="mr-2" />
              }
              <span className="font-medium">Filters</span>
            </div>
            {filtersExpanded && (
              <div className="px-4 py-3 border-t">
                {/* Filter content would go here */}
                <p className="text-gray-600 text-sm">No filters applied</p>
              </div>
            )}
          </div>

          {/* Chart Card */}
          <div className="bg-white rounded-lg shadow">
            <div 
              className="px-4 py-3 flex items-center justify-between cursor-pointer"
              onClick={() => setChartExpanded(!chartExpanded)}
            >
              <div className="flex items-center">
                {chartExpanded ? 
                  <ChevronDown size={16} className="mr-2" /> : 
                  <ChevronRight size={16} className="mr-2" />
                }
                <span className="font-medium">Chart</span>
              </div>
              <button className="text-gray-500">
                <Maximize size={16} />
              </button>
            </div>
            
            {chartExpanded && (
              <div className="px-4 py-2 ">
                {/* Chart Legend */}
                <div className="flex items-center justify-center gap-4 my-3 flex-wrap">
                  {Object.entries(referrerColors).map(([name, color]) => (
                    <div key={name} className="flex items-center">
                      <div className="w-3 h-3 rounded mr-1" style={{ backgroundColor: color }}></div>
                      <span className="text-sm">{name}</span>
                    </div>
                  ))}
                </div>
                
                {/* Stacked Bar Chart (simplified representation) */}
                <div className="h-64 w-full  flex items-end justify-between px-2 relative">
                  {/* Y-axis labels */}
                  <div className="absolute left-2 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500">
                    <span>US$1,200,000.00</span>
                    <span>US$1,000,000.00</span>
                    <span>US$800,000.00</span>
                    <span>US$600,000.00</span>
                    <span>US$400,000.00</span>
                    <span>US$200,000.00</span>
                    <span>US$0.00</span>
                  </div>
                  
                  {/* Bars */}
                  <div className="flex-1 flex items-end justify-around h-full pt-6 pl-20">
                    {monthlyData.map((month, index) => {
                      // Calculate height as percentage of max height, increasing as we go
                      const heightPercentage = 10 + (index * 10);
                      return (
                        <div key={month} className="flex flex-col items-center">
                          {/* Stacked bar */}
                          <div className="w-12 flex flex-col-reverse">
                            <div className="w-full h-6 bg-blue-400"></div> {/* direct */}
                            <div className="w-full h-8 bg-red-500"></div> {/* facebook */}
                            <div className="w-full h-10 bg-yellow-400"></div> {/* instagram */}
                            <div className="w-full h-7 bg-green-500"></div> {/* organic */}
                            <div className="w-full h-5 bg-purple-500"></div> {/* ppc */}
                            <div className="w-full h-4 bg-blue-600"></div> {/* twitter */}
                          </div>
                          {/* X-axis label */}
                          <span className="text-xs mt-2">{month}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="text-center text-xs mt-2 text-gray-600">Monthly orders</div>
              </div>
            )}
          </div>

          {/* Results Card */}
          <div className="bg-white rounded-lg shadow">
            <div 
              className="px-4 py-3 flex items-center justify-between cursor-pointer"
              onClick={() => setResultsExpanded(!resultsExpanded)}
            >
              <div className="flex items-center">
                {resultsExpanded ? 
                  <ChevronDown size={16} className="mr-2" /> : 
                  <ChevronRight size={16} className="mr-2" />
                }
                <span className="font-medium">Results</span>
              </div>
              <div className="flex items-center">
                <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs text-gray-600">
                  <span className="text-gray-400">Sorted by </span>
                  Order date month
                </span>
              </div>
            </div>
            
            {resultsExpanded && (
              <div className="px-4 py-3 border-t">
                {/* Results Table */}
                <div className="overflow-x-auto rounded-lg shadow">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-blue-50">
                        <th className="p-3 text-left font-semibold text-blue-800 border-b border-blue-100">#</th>
                        <th className="p-3 text-left font-semibold text-blue-800 border-b border-blue-100">Referrer</th>
                        <th className="p-3 text-left font-semibold text-blue-800 border-b border-blue-100">Order date month</th>
                        <th className="p-3 text-left font-semibold text-blue-800 border-b border-blue-100">Sum of basket total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultsData.map((row, index) => {
                        // Apply different background colors to alternate rows
                        const bgColor = index % 2 === 0 ? "bg-white" : "bg-gray-50";
                        
                        // Determine color based on referrer
                        let referrerColor;
                        switch(row.referrer) {
                          case 'facebook': referrerColor = "text-red-600"; break;
                          case 'instagram': referrerColor = "text-yellow-600"; break;
                          case 'twitter': referrerColor = "text-blue-600"; break;
                          case 'organic': referrerColor = "text-green-600"; break;
                          case 'ppc': referrerColor = "text-purple-600"; break;
                          case 'direct': referrerColor = "text-blue-400"; break;
                          default: referrerColor = ""; break;
                        }
                        
                        return (
                          <tr key={row.id} className={`${bgColor} hover:bg-blue-50 transition-colors duration-150`}>
                            <td className="p-3 border-b border-gray-100">{row.id}</td>
                            <td className={`p-3 border-b border-gray-100 font-medium ${referrerColor}`}>
                              <div className="flex items-center">
                                <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: referrerColors[row.referrer] }}></div>
                                {row.referrer}
                              </div>
                            </td>
                            <td className="p-3 border-b border-gray-100">{row.month}</td>
                            <td className="p-3 border-b border-gray-100 text-right font-medium">
                              ${row.total.toLocaleString()}
                            </td>
                          </tr>
                        );
                      })}
                      <tr className="bg-blue-50">
                        <td className="p-3 font-bold text-blue-900" colSpan="3">Total</td>
                        <td className="p-3 text-right font-bold text-blue-900">US$13,579,025.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-between items-center mt-4 text-sm">
                  <div className="flex items-center">
                    <span className="mr-4 text-gray-600">Pages</span>
                    <button className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors duration-150">
                      Scroll
                    </button>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 text-gray-600">Page 1 of 15</span>
                    <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-150">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-150">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SQL Card */}
          <div className="bg-white rounded-lg shadow">
            <div 
              className="px-4 py-3 flex items-center justify-between cursor-pointer"
              onClick={() => setSqlExpanded(!sqlExpanded)}
            >
              <div className="flex items-center">
                {sqlExpanded ? 
                  <ChevronDown size={16} className="mr-2" /> : 
                  <ChevronRight size={16} className="mr-2" />
                }
                <span className="font-medium">SQL</span>
              </div>
              <button className="px-2 py-1 text-xs border border-gray-300 rounded flex items-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                  <path d="M10 6H6C4.89543 6 4 6.89543 4 8V18C4 19.1046 4.89543 20 6 20H16C17.1046 20 18 19.1046 18 18V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 4H20V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 4L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Open in SQL Runner
              </button>
            </div>
            
            {sqlExpanded && (
              <div className="px-4 py-3 border-t">
                <pre className="bg-gray-50 p-3 text-xs overflow-x-auto font-mono text-gray-700">
                  {sqlCode}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueByReferrerDashboard;