

import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  ExternalLink, 
  Edit3, 
  MoreHorizontal,
  ArrowLeft,
  Maximize2,
  Copy
} from 'lucide-react';

const OrdersPerWeekChart = ({ onBack }) => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [chartOpen, setChartOpen] = useState(true);
  const [resultsOpen, setResultsOpen] = useState(true);
  const [sqlOpen, setSqlOpen] = useState(false);

  const toggleFilters = () => setFiltersOpen(!filtersOpen);
  const toggleChart = () => setChartOpen(!chartOpen);
  const toggleResults = () => setResultsOpen(!resultsOpen);
  const toggleSql = () => setSqlOpen(!sqlOpen);
  
  // Sample data for the line chart
  const chartData = [
    { week: '2023-05-07', value: 1.00 },
    { week: '2023-05-14', value: 1.08 },
    { week: '2023-05-21', value: 1.00 },
    { week: '2023-05-28', value: 1.06 },
    { week: '2023-06-04', value: 1.00 },
    { week: '2023-06-11', value: 1.01 },
    { week: '2023-06-18', value: 1.01 },
    { week: '2023-06-25', value: 1.00 },
    { week: '2023-07-02', value: 1.00 },
    { week: '2023-07-09', value: 1.01 },
    { week: '2023-07-16', value: 1.01 },
    { week: '2023-07-23', value: 1.01 },
    { week: '2023-07-30', value: 1.02 },
    { week: '2023-08-06', value: 1.02 },
    { week: '2023-08-13', value: 1.02 },
    { week: '2023-08-20', value: 1.03 },
    { week: '2023-08-27', value: 1.02 },
    { week: '2023-09-03', value: 1.02 },
    { week: '2023-09-10', value: 1.03 },
    { week: '2023-09-17', value: 1.02 },
    { week: '2023-09-24', value: 1.02 },
    { week: '2023-10-01', value: 1.03 },
    { week: '2023-10-08', value: 1.02 },
    { week: '2023-10-15', value: 1.03 },
    { week: '2023-10-22', value: 1.02 },
    { week: '2023-10-29', value: 1.03 },
    { week: '2023-11-05', value: 1.03 },
    { week: '2023-11-12', value: 1.02 },
    { week: '2023-11-19', value: 1.03 },
    // ... more data points
    { week: '2025-05-11', value: 1.01 }
  ];
  
  // Table data for results section
  const tableData = [
    { id: 1, week: '2025-05-11', users: 1417, count: 1436, ratio: 1.01 },
    { id: 2, week: '2025-05-04', users: 1770, count: 1813, ratio: 1.02 },
    { id: 3, week: '2025-04-27', users: 2057, count: 2106, ratio: 1.02 },
    { id: 4, week: '2025-04-20', users: 1674, count: 1703, ratio: 1.02 },
    { id: 5, week: '2025-04-13', users: 1838, count: 1868, ratio: 1.02 },
    { id: 6, week: '2025-04-06', users: 1836, count: 1877, ratio: 1.02 },
    { id: 7, week: '2025-03-30', users: 963, count: 972, ratio: 1.01 },
    { id: 8, week: '2025-03-23', users: 1292, count: 1308, ratio: 1.01 },
    { id: 9, week: '2025-03-16', users: 2176, count: 2230, ratio: 1.02 },
    { id: 10, week: '2025-03-09', users: 1832, count: 1883, ratio: 1.03 }
  ];

  // SQL query text
  const sqlQuery = `WITH metrics AS (
  SELECT
    TIMESTAMP_TRUNC(timestamp_add(
      \`dbt_orders\`.\`order_date\`,
      interval timestamp_diff(current_timestamp(), timestamp '2025-02-13 00:00:00', second) second
    ), WEEK) AS \`dbt_orders_order_date_week\`,
    COUNT(DISTINCT \`dbt_orders\`.\`user_id\`) AS \`dbt_orders_count_distinct_user_id\`,
    COUNT(DISTINCT \`dbt_orders\`.\`order_id\`) AS \`dbt_orders_count_distinct_order_id\`
  FROM \`lightdash-healthcare-demo\`.\`lightdash_gardening_demo\`.\`dbt_orders\` AS \`dbt_orders\`
  
  GROUP BY 1
)
SELECT
  *,
  (1.0*\`dbt_orders_count_distinct_order_id\`)
  /
  (1.0*\`dbt_orders_count_distinct_user_id\`) AS \`orders_per_user_1\`
FROM metrics

ORDER BY \`dbt_orders_order_date_week\` DESC
LIMIT 1000`;

  return (
    <div className="flex flex-col h-screen bg-white text-gray-800 w-full overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-3 px-4">
        <div className="flex items-center mb-2 my-3.5">
          <button 
            onClick={onBack} 
            className="text-blue-600 hover:text-blue-800 cursor-pointer mr-2"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center">
            <a href="#" onClick={(e) => { e.preventDefault(); onBack(); }} className="text-gray-500 hover:text-gray-700">
              <span className="text-amber-600">Sales</span>
            </a>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-700 font-medium">How many orders per week per user?</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">
            Last edited 2 months ago by Jake Peterson
          </div>
          <div className="flex space-x-2">
            <button className="bg-blue-500 text-white text-xs px-3 py-1.5 rounded-md flex items-center">
              <ExternalLink className="w-3.5 h-3.5 mr-1.5" /> Explore from here
            </button>
            <button className="border border-gray-300 text-gray-700 text-xs px-3 py-1.5 rounded-md flex items-center">
              <Edit3 className="w-3.5 h-3.5 mr-1.5" /> Edit chart
            </button>
            <button className="border border-gray-300 p-1.5 rounded-md">
              <MoreHorizontal className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Filters */}
        <div className="border-b border-gray-200">
          <div 
            className="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-50" 
            onClick={toggleFilters}
          >
            <div className="mr-2 text-gray-500">
              {filtersOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </div>
            <div className="font-medium text-sm">Filters</div>
          </div>
          
          {filtersOpen && (
            <div className="px-4 py-3 border-t border-gray-100">
              <div className="text-sm">Filter options would be displayed here</div>
            </div>
          )}
        </div>

        {/* Chart */}
        <div className="border-b border-gray-200">
          <div 
            className="px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-50" 
            onClick={toggleChart}
          >
            <div className="flex items-center">
              <div className="mr-2 text-gray-500">
                {chartOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </div>
              <div className="font-medium text-sm">Chart</div>
            </div>
            <button className="text-gray-500 hover:bg-gray-100 p-1 rounded">
              <Maximize2 size={16} />
            </button>
          </div>
          
          {chartOpen && (
            <div className="px-4 py-3 border-t border-gray-100">
              <div className="h-72 relative bg-white p-4">
                {/* Chart container with all elements */}
                <div className="relative h-full">
                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-0 bottom-8 w-14 flex flex-col justify-between text-right pr-2">
                    <div className="text-xs text-gray-500">1.08</div>
                    <div className="text-xs text-gray-500">1.06</div>
                    <div className="text-xs text-gray-500">1.04</div>
                    <div className="text-xs text-gray-500">1.02</div>
                    <div className="text-xs text-gray-500">1.00</div>
                  </div>
                  
                  {/* Y-axis title */}
                  <div className="absolute left-[-30px] top-1/2 transform -rotate-90 text-xs text-gray-500 whitespace-nowrap">
                    Average orders per user
                  </div>
                  
                  {/* Chart area */}
                  <div className="ml-14 h-[calc(100%-32px)] relative">
                    {/* Horizontal grid lines */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <div key={i} className="border-t border-gray-200 w-full h-0"></div>
                      ))}
                    </div>
                    
                    {/* Line chart SVG */}
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      {/* The exact line path matching your screenshot */}
                      <path
                        d="M0,90 L1,50 L2,85 L3,92 L4,100 L5,98 L6,82 L7,72 L8,92 L9,95 L10,90 L11,85 L12,90 L13,95 L14,88 L15,82 L16,85 L17,82 L18,78 L19,75 L20,78 L21,82 L22,85 L23,78 L24,75 L25,78 L26,82 L27,75 L28,72 L29,75 L30,78 L31,72 L32,75 L33,78 L34,72 L35,75 L36,78 L37,72 L38,70 L39,75 L40,78 L41,82 L42,78 L43,75 L44,78 L45,82 L46,78 L47,75 L48,78 L49,82 L50,78 L51,75 L52,78 L53,82 L54,78 L55,75 L56,72 L57,75 L58,78 L59,72 L60,75 L61,68 L62,72 L63,78 L64,82 L65,78 L66,75 L67,82 L68,85 L69,82 L70,78 L71,82 L72,85 L73,80 L74,75 L75,78 L76,82 L77,78 L78,75 L79,78 L80,82 L81,90 L82,82 L83,78 L84,82 L85,78 L86,75 L87,78 L88,82 L89,85 L90,80 L91,75 L92,80 L93,85 L94,82 L95,78 L96,82 L97,85 L98,80 L99,85 L100,82"
                        fill="none"
                        stroke="#4f46e5"
                        strokeWidth="1.5"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </div>
                  
                  {/* X-axis labels */}
                  <div className="absolute left-14 right-0 bottom-0 flex justify-between text-xs text-gray-500">
                    <span>2023-05-07</span>
                    <span>2023-06-25</span>
                    <span>2023-08-13</span>
                    <span>2023-10-01</span>
                    <span>2023-11-19</span>
                    <span>2024-01-07</span>
                    <span>2024-02-25</span>
                    <span>2024-04-14</span>
                    <span>2024-06-02</span>
                    <span>2024-07-21</span>
                    <span>2024-09-08</span>
                    <span>2024-10-27</span>
                    <span>2024-12-15</span>
                    <span>2025-02-02</span>
                    <span>2025-03-23</span>
                    <span>2025-05-11</span>
                  </div>
                  
                  {/* X-axis title */}
                  <div className="absolute bottom-[-24px] left-0 right-0 text-center text-xs text-gray-500">
                    Week
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="border-b border-gray-200">
          <div 
            className="px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-50" 
            onClick={toggleResults}
          >
            <div className="flex items-center">
              <div className="mr-2 text-gray-500">
                {resultsOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </div>
              <div className="font-medium text-sm">Results</div>
              <div className="ml-2 text-xs text-blue-500 flex items-center">
                <span className="text-xs text-blue-400">↓</span>&nbsp;Sorted by Order date week
              </div>
            </div>
            <button className="text-gray-500 hover:bg-gray-100 p-1 rounded">
              <Maximize2 size={16} />
            </button>
          </div>
          
          {resultsOpen && (
            <div className="px-4 py-3 overflow-x-auto border-t border-gray-100">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left text-xs text-gray-500">
                    <th className="py-2 pl-4 pr-8 font-medium">#</th>
                    <th className="py-2 px-4 font-medium">Order date week</th>
                    <th className="py-2 px-4 font-medium">Total unique users</th>
                    <th className="py-2 px-4 font-medium">Order count</th>
                    <th className="py-2 px-4 font-medium">Orders per user</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row) => (
                    <tr key={row.id} className="border-t border-gray-200 hover:bg-gray-50">
                      <td className="py-2 pl-4 pr-8">{row.id}</td>
                      <td className="py-2 px-4">{row.week}</td>
                      <td className="py-2 px-4 text-right">{row.users.toLocaleString()}</td>
                      <td className="py-2 px-4 text-right">{row.count.toLocaleString()}</td>
                      <td className="py-2 px-4 text-right">{row.ratio.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-gray-200 font-medium">
                    <td className="py-2 pl-4" colSpan="2">Total</td>
                    <td className="py-2 px-4 text-right">38,701</td>
                    <td className="py-2 px-4 text-right">110,712</td>
                    <td className="py-2 px-4"></td>
                  </tr>
                </tfoot>
              </table>
              
              <div className="flex justify-between items-center mt-4">
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-gray-100 text-sm rounded-md">Pages</button>
                  <button className="px-3 py-1 border border-gray-200 text-sm rounded-md">Scroll</button>
                </div>
                <div className="text-xs text-gray-500">
                  Page 1 of 11
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SQL */}
        <div className="border-b border-gray-200">
          <div 
            className="px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-50" 
            onClick={toggleSql}
          >
            <div className="flex items-center">
              <div className="mr-2 text-gray-500">
                {sqlOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </div>
              <div className="font-medium text-sm">SQL</div>
            </div>
            <button className="text-xs border border-gray-200 px-2 py-1 rounded flex items-center">
              <span>Open in SQL Runner</span>
            </button>
          </div>
          
          {sqlOpen && (
            <div className="p-4 bg-gray-50 border-t border-gray-100 overflow-x-auto">
              <div className="relative">
                <button className="absolute right-2 top-2 text-gray-500 hover:bg-gray-200 p-1 rounded">
                  <Copy size={14} />
                </button>
                <pre className="text-xs font-mono p-4 bg-white border border-gray-200 rounded shadow-sm overflow-x-auto text-gray-600 whitespace-pre">
{sqlQuery}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPerWeekChart;