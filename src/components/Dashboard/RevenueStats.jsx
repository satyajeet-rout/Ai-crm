import React, { useState } from 'react';
import { Search, ChevronDown, ChevronRight, Settings, Bell, HelpCircle, ExternalLink, Maximize2, Edit3, MoreHorizontal, ChevronsLeft, ChevronsRight } from 'lucide-react';

const RevenueStats = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [chartOpen, setChartOpen] = useState(true);
  const [resultsOpen, setResultsOpen] = useState(false);
  const [sqlOpen, setSqlOpen] = useState(false);

  const toggleFilters = () => setFiltersOpen(!filtersOpen);
  const toggleChart = () => setChartOpen(!chartOpen);
  const toggleResults = () => setResultsOpen(!resultsOpen);
  const toggleSql = () => setSqlOpen(!sqlOpen);
  
  const weeklyRevenue = [
    { week: '2023-07-01', revenue: 10000 },
    { week: '2023-07-08', revenue: 12000 },
    { week: '2023-07-15', revenue: 13000 },
    { week: '2023-07-22', revenue: 14000 },
    { week: '2023-07-29', revenue: 15000 },
    { week: '2023-08-05', revenue: 16000 },
    { week: '2023-08-12', revenue: 18000 },
    { week: '2023-08-19', revenue: 20000 },
    { week: '2023-08-26', revenue: 22000 },
    { week: '2023-09-02', revenue: 24000 },
    { week: '2023-09-09', revenue: 26000 },
    { week: '2023-09-16', revenue: 28000 },
    { week: '2023-09-23', revenue: 30000 },
    { week: '2023-09-30', revenue: 28000 },
    { week: '2023-10-07', revenue: 32000 },
    { week: '2023-10-14', revenue: 35000 },
    { week: '2023-10-21', revenue: 38000 },
    { week: '2023-10-28', revenue: 40000 },
    { week: '2023-11-04', revenue: 45000 },
    { week: '2023-11-11', revenue: 50000 },
    { week: '2023-11-18', revenue: 55000 },
    { week: '2023-11-25', revenue: 60000 },
    { week: '2023-12-02', revenue: 65000 },
    { week: '2023-12-09', revenue: 70000 },
    { week: '2023-12-16', revenue: 75000 },
    { week: '2023-12-23', revenue: 80000 },
    { week: '2023-12-30', revenue: 85000 },
    { week: '2024-01-06', revenue: 90000 },
    { week: '2024-01-13', revenue: 95000 },
    { week: '2024-01-20', revenue: 100000 },
    { week: '2024-01-27', revenue: 105000 },
    { week: '2024-02-03', revenue: 110000 },
    { week: '2024-02-10', revenue: 115000 },
    { week: '2024-02-17', revenue: 120000 },
    { week: '2024-02-24', revenue: 115000 },
    { week: '2024-03-02', revenue: 125000 },
    { week: '2024-03-09', revenue: 130000 },
    { week: '2024-03-16', revenue: 135000 },
    { week: '2024-03-23', revenue: 140000 },
    { week: '2024-03-30', revenue: 145000 },
    { week: '2024-04-06', revenue: 150000 },
    { week: '2024-04-13', revenue: 155000 },
    { week: '2024-04-20', revenue: 160000 },
    { week: '2024-04-27', revenue: 165000 },
    { week: '2024-05-04', revenue: 170000 },
    { week: '2024-05-11', revenue: 175000 },
    { week: '2024-05-18', revenue: 180000 },
    { week: '2024-05-25', revenue: 185000 },
    { week: '2024-06-01', revenue: 190000 },
    { week: '2024-06-08', revenue: 180000 },
    { week: '2024-06-15', revenue: 185000 },
    { week: '2024-06-22', revenue: 190000 },
    { week: '2024-06-29', revenue: 185000 },
    { week: '2024-07-06', revenue: 195000 },
    { week: '2024-07-13', revenue: 200000 },
    { week: '2024-07-20', revenue: 190000 },
    { week: '2024-07-27', revenue: 195000 },
    { week: '2024-08-03', revenue: 205000 },
    { week: '2024-08-10', revenue: 210000 },
    { week: '2024-08-17', revenue: 215000 },
    { week: '2024-08-24', revenue: 220000 },
    { week: '2024-08-31', revenue: 225000 },
    { week: '2024-09-07', revenue: 220000 },
    { week: '2024-09-14', revenue: 230000 },
    { week: '2024-09-21', revenue: 235000 },
    { week: '2024-09-28', revenue: 240000 },
    { week: '2024-10-05', revenue: 245000 },
    { week: '2024-10-12', revenue: 250000 },
    { week: '2024-10-19', revenue: 245000 },
    { week: '2024-10-26', revenue: 255000 },
    { week: '2024-11-02', revenue: 260000 },
    { week: '2024-11-09', revenue: 255000 },
    { week: '2024-11-16', revenue: 250000 },
    { week: '2024-11-23', revenue: 260000 },
    { week: '2024-11-30', revenue: 265000 },
    { week: '2024-12-07', revenue: 260000 },
    { week: '2024-12-14', revenue: 270000 },
    { week: '2024-12-21', revenue: 275000 },
    { week: '2024-12-28', revenue: 270000 },
    { week: '2025-01-04', revenue: 265000 },
    { week: '2025-01-11', revenue: 280000 },
    { week: '2025-01-18', revenue: 285000 },
    { week: '2025-01-25', revenue: 280000 },
    { week: '2025-02-01', revenue: 275000 },
    { week: '2025-02-08', revenue: 270000 },
    { week: '2025-02-15', revenue: 280000 },
    { week: '2025-02-22', revenue: 285000 },
    { week: '2025-03-01', revenue: 275000 },
    { week: '2025-03-08', revenue: 265000 },
    { week: '2025-03-15', revenue: 260000 },
    { week: '2025-03-22', revenue: 255000 },
    { week: '2025-03-29', revenue: 250000 },
    { week: '2025-04-05', revenue: 265000 },
    { week: '2025-04-12', revenue: 270000 },
    { week: '2025-04-19', revenue: 275000 },
    { week: '2025-04-26', revenue: 280000 },
    { week: '2025-05-03', revenue: 285000 },
    { week: '2025-05-10', revenue: 290000 }
  ];
  
  // Recent weeks for the results table
  const recentWeeks = [
    { week: '2025-05-11', revenue: 177400 },
    { week: '2025-05-04', revenue: 227400 },
    { week: '2025-04-27', revenue: 253700 },
    { week: '2025-04-20', revenue: 207300 },
    { week: '2025-04-13', revenue: 229300 },
    { week: '2025-04-06', revenue: 228400 },
    { week: '2025-03-30', revenue: 112700 },
    { week: '2025-03-23', revenue: 158000 },
    { week: '2025-03-16', revenue: 265000 },
    { week: '2025-03-09', revenue: 230700 }
  ];

  // Total of all revenues in the table
  const totalRevenue = recentWeeks.reduce((sum, week) => sum + week.revenue, 0);
  
  // Format number as currency
  const formatCurrency = (value) => {
    return `$${value.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}`;
  };

  // Max value for the chart
  const maxRevenue = Math.max(...weeklyRevenue.map(week => week.revenue));
  
  // Target line value (from the yellow line in the chart)
  const targetRevenue = 150000;

  return (
    <div className="flex flex-col h-screen bg-white text-gray-800 overflow-hidden w-full">
      {/* Header */}
      

      {/* Content */}
      <main className="flex-1 overflow-auto">
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="flex items-center">
            <div className="text-sm text-gray-500">
              <span className="text-gray-500">🏢 Company-wide</span> / What are the weekly revenue stats?
            </div>
          </div>
          <div className="flex justify-between items-center mt-1">
            <div className="text-xs text-gray-400">
              Last edited a month ago by Oliver Ramsey
            </div>
            <div className="flex space-x-2">
              <button className="bg-blue-500 text-white text-sm px-3 py-1 rounded flex items-center">
                <ExternalLink className="w-3 h-3 mr-1" /> Explore from here
              </button>
              <button className="border border-gray-300 text-sm px-3 py-1 rounded flex items-center">
                <Edit3 className="w-3 h-3 mr-1" /> Edit chart
              </button>
              <button className="border border-gray-300 text-sm px-2 py-1 rounded">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="border-b border-gray-200">
          <div 
            className="px-4 py-2 flex items-center cursor-pointer" 
            onClick={toggleFilters}
          >
            <div className="mr-2">
              {filtersOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </div>
            <div className="font-medium text-sm">Filters</div>
          </div>
          
          {filtersOpen && (
            <div className="px-4 py-3">
              <div className="text-sm">Filter content would go here</div>
            </div>
          )}
        </div>

        {/* Chart */}
        <div className="border-b border-gray-200">
          <div 
            className="px-4 py-2 flex items-center justify-between cursor-pointer" 
            onClick={toggleChart}
          >
            <div className="flex items-center">
              <div className="mr-2">
                {chartOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </div>
              <div className="font-medium text-sm">Chart</div>
            </div>
            <button className="text-gray-500">
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
          
          {chartOpen && (
            <div className="px-4 py-3">              
              <div className="relative h-64 mt-6">
                {/* Y-axis labels */}
                <div className="absolute left-0 h-64 flex flex-col justify-between text-xs text-gray-500 pb-6">
                  <div>US$300.0K</div>
                  <div>US$250.0K</div>
                  <div>US$200.0K</div>
                  <div>US$150.0K</div>
                  <div>US$100.0K</div>
                  <div>US$50.0K</div>
                  <div>US$0.0K</div>
                </div>
                
                {/* Target line */}
                <div 
                  className="absolute left-16 right-0 border-t border-yellow-400"
                  style={{ 
                    top: `${64 - (targetRevenue / maxRevenue) * 58}%`,
                    zIndex: 1
                  }}
                >
                  <div className="absolute right-0 -top-3 bg-white text-xs px-1">Target</div>
                </div>
                
                {/* Chart container */}
                <div className="absolute left-16 right-0 h-full flex items-end">
                  <div className="w-full h-full flex space-x-0.5 items-end pb-6">
                    {weeklyRevenue.map((item, index) => (
                      <div 
                        key={index}
                        className="flex-1 bg-blue-500"
                        style={{ 
                          height: `${(item.revenue / maxRevenue) * 58}%`,
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
                
                {/* X-axis labels */}
                <div className="absolute left-16 right-0 bottom-0 flex justify-between text-xs text-gray-500">
                  <div>2023-07-01</div>
                  <div>2023-10-01</div>
                  <div>2024-01-01</div>
                  <div>2024-04-01</div>
                  <div>2024-07-01</div>
                  <div>2024-10-01</div>
                  <div>2025-01-01</div>
                  <div>2025-04-01</div>
                </div>
              </div>
              
              <div className="text-center text-xs mt-2">Week</div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="border-b border-gray-200">
          <div 
            className="px-4 py-2 flex items-center justify-between cursor-pointer" 
            onClick={toggleResults}
          >
            <div className="flex items-center">
              <div className="mr-2">
                {resultsOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </div>
              <div className="font-medium text-sm">Results</div>
              <div className="ml-2 text-xs text-blue-500 flex items-center">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                Sorted by Order date week
              </div>
            </div>
            <button className="text-gray-500">
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
          
          {resultsOpen && (
            <div className="px-4 py-3 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left bg-gray-50">
                    <th className="py-2 px-2 w-10">#</th>
                    <th className="py-2 px-4">Order date week</th>
                    <th className="py-2 px-4 text-right">Sum of basket total</th>
                  </tr>
                </thead>
                <tbody>
                  {recentWeeks.map((week, index) => (
                    <tr key={index + 1} className="border-t border-gray-100">
                      <td className="py-2 px-2">{index + 1}</td>
                      <td className="py-2 px-4">{week.week}</td>
                      <td className="py-2 px-4 text-right">${(week.revenue / 1000).toFixed(1)}K</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-gray-200 font-medium">
                    <td colSpan="2" className="py-2 px-4">Total</td>
                    <td className="py-2 px-4 text-right">US${(totalRevenue / 1000).toFixed(1)}K</td>
                  </tr>
                </tfoot>
              </table>
              
              <div className="flex justify-between items-center mt-4 text-sm">
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-gray-100 rounded">Pages</button>
                  <button className="px-3 py-1 border border-gray-200 rounded">Scroll</button>
                </div>
                <div className="flex items-center text-xs">
                  <span className="mr-2">Page 1 of 11</span>
                  <button className="p-1 border border-gray-200 rounded mr-1"><ChevronsLeft className="w-3 h-3" /></button>
                  <button className="p-1 border border-gray-200 rounded"><ChevronsRight className="w-3 h-3" /></button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SQL */}
        <div className="border-b border-gray-200">
          <div 
            className="px-4 py-2 flex items-center justify-between cursor-pointer" 
            onClick={toggleSql}
          >
            <div className="flex items-center">
              <div className="mr-2">
                {sqlOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </div>
              <div className="font-medium text-sm">SQL</div>
            </div>
            <button className="border border-gray-200 text-xs px-2 py-1 rounded flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Open in SQL Runner
            </button>
          </div>
          
          {sqlOpen && (
            <div className="px-4 py-3 overflow-x-auto bg-gray-50">
              <pre className="text-xs text-gray-700 font-mono">
{`SELECT
  TIMESTAMP_TRUNC(timestamp_add(
    \`dbt_orders\`.\`order_date\`,
    interval timestamp_diff(current_timestamp(), timestamp '2025-02-13 00:00:00', second) second
  ), WEEK) AS \`dbt_orders_order_date_week\`,
  SUM(\`dbt_orders\`.\`basket_total\`) AS \`dbt_orders_sum_of_basket_total\`
FROM \`lightdash-healthcare-demo\`.\`lightdash_gardening_demo\`.\`dbt_orders\` AS \`dbt_orders\`

WHERE ((
  (TIMESTAMP_TRUNC(timestamp_add(
    \`dbt_orders\`.\`order_date\`,
    interval timestamp_diff(current_timestamp(), timestamp '2025-02-13 00:00:00', second) second
  ), WEEK)) >= ('2024-05-01') AND (TIMESTAMP_TRUNC(timestamp_add(
    \`dbt_orders\`.\`order_date\`,
    interval timestamp_diff(current_timestamp(), timestamp '2025-02-13 00:00:00', second) second
  ), WEEK)) < ('2025-05-01')
))

GROUP BY 1
ORDER BY \`dbt_orders_order_date_week\` DESC
LIMIT 500`}
              </pre>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default RevenueStats;