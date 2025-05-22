
import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Settings, 
  Bell, 
  HelpCircle, 
  ExternalLink, 
  Maximize2, 
  Edit3, 
  MoreHorizontal,
  ArrowLeft
} from 'lucide-react';

const EmailSplitChart = ({ onBack }) => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [chartOpen, setChartOpen] = useState(true);
  const [resultsOpen, setResultsOpen] = useState(false);
  const [sqlOpen, setSqlOpen] = useState(false);

  const toggleFilters = () => setFiltersOpen(!filtersOpen);
  const toggleChart = () => setChartOpen(!chartOpen);
  const toggleResults = () => setResultsOpen(!resultsOpen);
  const toggleSql = () => setSqlOpen(!sqlOpen);
  
  // Dummy data for the chart and table
  const months = ['2024-05', '2024-06', '2024-07', '2024-08', '2024-09', '2024-10', 
                  '2024-11', '2024-12', '2025-01', '2025-02', '2025-03', '2025-04'];
  
  const nonGmailData = [3.5, 3.3, 3.8, 3.8, 4.1, 5.1, 4.3, 5.6, 5.1, 4.8, 5.1, 4.6];
  const gmailData = [1.7, 1.7, 1.9, 1.9, 2.1, 2.5, 2.2, 2.6, 2.6, 2.5, 2.6, 2.5];
  
  // Table data
  const tableData = [];
  let id = 1;
  
  months.forEach((month, index) => {
    tableData.push({
      id: id++,
      month,
      isGmail: false,
      count: nonGmailData[index]
    });
    
    tableData.push({
      id: id++,
      month,
      isGmail: true,
      count: gmailData[index]
    });
  });

  // Calculate max height for chart bars
  const maxValue = Math.max(...nonGmailData, ...gmailData);
  const getHeight = (value) => {
    return (value / maxValue) * 100;
  };

  return (
    <div className="flex flex-col h-screen bg-white text-gray-800 overflow-auto w-full">
      

      {/* Content */}
      <main className="flex-1 overflow-auto">
        <div className="px-4 py-3 border-b border-gray-200 mt-7">
          <div className="flex items-center mb-4">
            <button 
              onClick={onBack} 
              className="text-blue-600 hover:text-blue-800 cursor-pointer mr-2"
              aria-label="Go back"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="text-md text-gray-500">
              <span className="text-amber-600">Sales</span> / What is the split of orders that come from gmail users per month?
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
              {filtersOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </div>
            <div className="font-medium text-sm">Filters</div>
            <div className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded">1 active filter</div>
          </div>
          
          {/* {filtersOpen && (
            <div className="px-4 py-3">
              <div className="text-sm">Filter content would go here</div>
            </div>
          )} */}
        </div>

        {/* Chart */}
        <div className="border-b border-gray-200">
          <div 
            className="px-4 py-2 flex items-center justify-between cursor-pointer" 
            onClick={toggleChart}
          >
            <div className="flex items-center">
              <div className="mr-2">
                {chartOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
              </div>
              <div className="font-medium text-sm">Chart</div>
            </div>
            <button className="text-gray-500">
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
          
          {chartOpen && (
            <div className="px-4 py-3">
              <div className="flex justify-center items-center mb-4">
                <div className="flex items-center mr-4">
                  <div className="w-3 h-3 bg-green-500 mr-2"></div>
                  <span className="text-xs">Is Other Email</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-orange-400 mr-2"></div>
                  <span className="text-xs">Is Gmail Email</span>
                </div>
              </div>
              
              <div className="pl-20 mt-8 relative">
                {/* Y-axis */}
                <div className="absolute left-10 h-48 flex flex-col justify-between text-xs text-gray-500">
                  <div>6.0K</div>
                  <div>5.0K</div>
                  <div>4.0K</div>
                  <div>3.0K</div>
                  <div>2.0K</div>
                  <div>1.0K</div>
                  <div>0.0K</div>
                </div>
                
                {/* Y-axis label */}
                <div className="absolute left-0 h-48 flex items-center">
                  <div className="transform -rotate-90 text-xs text-gray-500 whitespace-nowrap">Order count</div>
                </div>
                
                {/* Chart bars */}
                <div className="flex h-48 space-x-1 items-end flex-1">
                  {months.map((month, index) => (
                    <div key={month} className="flex flex-col items-center flex-1">
                      <div className="w-full flex flex-col items-center">
                        <div 
                          className="w-full bg-green-500" 
                          style={{ height: `${getHeight(nonGmailData[index])}px`, maxHeight: '100px' }}
                        ></div>
                        <div 
                          className="w-full bg-orange-400 mt-0.5" 
                          style={{ height: `${getHeight(gmailData[index])}px`, maxHeight: '100px' }}
                        ></div>
                      </div>
                      <div className="text-xs mt-1 whitespace-nowrap overflow-hidden">{month}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="text-center text-xs mt-2">Order date</div>
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
                {resultsOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
              </div>
              <div className="font-medium text-sm">Results</div>
              <div className="ml-2 text-xs text-blue-500">Sorted by 2 fields</div>
            </div>
            <button className="text-gray-500">
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
          
          {resultsOpen && (
            <div className="px-4 py-3 overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left">
                    <th className="py-2 pr-4">#</th>
                    <th className="py-2 pr-4">Order date month</th>
                    <th className="py-2 pr-4">is_email_gmail</th>
                    <th className="py-2 pr-4">Order count</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row) => (
                    <tr key={row.id} className="border-t border-gray-100">
                      <td className="py-2 pr-4">{row.id}</td>
                      <td className="py-2 pr-4">{row.month}</td>
                      <td className="py-2 pr-4">{row.isGmail ? 'True' : 'False'}</td>
                      <td className="py-2 pr-4">{row.count}K</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-gray-200">
                    <td colSpan="3" className="py-2 font-medium">Total</td>
                    <td className="py-2">79.9K</td>
                  </tr>
                </tfoot>
              </table>
              
              <div className="flex justify-between items-center mt-4 text-sm">
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-gray-100 rounded">Pages</button>
                  <button className="px-3 py-1 border border-gray-200 rounded">Scroll</button>
                </div>
                <div className="text-xs text-gray-500">24 results</div>
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
                {sqlOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
              </div>
              <div className="font-medium text-sm">SQL</div>
            </div>
            <button className="border border-gray-200 text-xs px-2 py-1 rounded flex items-center">
              Open in SQL Runner
            </button>
          </div>
          
          {sqlOpen && (
            <div className="px-4 py-3 overflow-x-auto bg-gray-200">
              <pre className="text-xs text-gray-700 whitespace-pre overflow-x-auto">
{`SELECT
  TIMESTAMP_TRUNC(timestamp_add(
    \`dbt_orders\`.\`order_date\`,
    interval timestamp_diff(current_timestamp(), timestamp '2025-02-13 00:00:00', second) second
  ), MONTH) AS \`dbt_orders_order_date_month\`,
  (case when email like "gmail%" then true else false end) AS \`is_email_gmail\`,
  COUNT(DISTINCT \`dbt_orders\`.\`order_id\`) AS \`dbt_orders_count_distinct_order_id\`
FROM \`lightdash-healthcare-demo\`.\`lightdash_gardening_demo\`.\`dbt_orders\` AS \`dbt_orders\`

WHERE ((
  (TIMESTAMP_TRUNC(timestamp_add(
    \`dbt_orders\`.\`order_date\`,
    interval timestamp_diff(current_timestamp(), timestamp '2025-02-13 00:00:00', second) second
  ), MONTH)) >= ('2024-05-01') AND (TIMESTAMP_TRUNC(timestamp_add(
    \`dbt_orders\`.\`order_date\`,
    interval timestamp_diff(current_timestamp(), timestamp '2025-02-13 00:00:00', second) second
  ), MONTH)) < ('2025-05-01')
))

GROUP BY 1,2
ORDER BY \`dbt_orders_order_date_month\`, \`dbt_orders_count_distinct_order_id\` DESC
LIMIT 500`}
              </pre>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default EmailSplitChart;