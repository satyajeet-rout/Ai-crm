

import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  Search, 
  Settings, 
  Bell, 
  HelpCircle, 
  ExternalLink, 
  Edit, 
  MoreHorizontal,
  ArrowLeft
} from 'lucide-react';

const PopularBrowsersDashboard = ({ onBack }) => {
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const [chartExpanded, setChartExpanded] = useState(true);
  const [resultsExpanded, setResultsExpanded] = useState(true);
  const [sqlExpanded, setSqlExpanded] = useState(false);
  
  // Browser data
  const browserData = [
    { id: 1, browser: 'chrome', users: 25251 },
    { id: 2, browser: 'safari', users: 13375 },
    { id: 3, browser: 'edge', users: 8354 },
    { id: 4, browser: 'firefox', users: 1688 },
    { id: 5, browser: 'internet_explorer', users: 801 },
    { id: 6, browser: 'netscape', users: 333 },
    { id: 7, browser: 'lynx', users: 165 }
  ];

  // SQL query code
  const sqlCode = `SELECT
  \`dbt_users\`.\`browser\` AS \`dbt_users_browser\`,
  COUNT(DISTINCT \`dbt_users\`.\`user_id\`) AS \`dbt_users_count_distinct_of_user_id\`
FROM \`lightdash-healthcare-demo\`.\`lightdash_gardening_demo\`.\`dbt_users\` AS \`dbt_users\`

GROUP BY 1
ORDER BY \`dbt_users_count_distinct_of_user_id\` DESC
LIMIT 500`;

  return (
    <div className="flex flex-col h-screen bg-gray-50 w-full p-4">
      
      {/* Breadcrumb & Title */}
      <div className=" border-b border-gray-200 p-4 mb-4">
        <div className="flex items-center text-sm">
          <button 
            onClick={onBack}
            className="text-gray-600 p-1 rounded hover:bg-gray-200 mr-2"
          >
            <ArrowLeft size={18} />
          </button>
          <span className="text-amber-600 mr-1">📁</span>
          <span className="text-gray-500">Marketing</span>
          <span className="text-gray-500 mx-1">/</span>
          <span className="font-medium">What are the most popular browsers?</span>
          <div className="ml-1 text-gray-400">
            <HelpCircle size={14} />
          </div>
        </div>
        <div className="flex items-center justify-between mt-1">
          <div className="text-xs text-gray-500">
            Last edited 2 years ago by Rosie Greenfingers
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
      <div className="flex-1 overflow-auto space-y-4">
        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-sm">
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
            <div className="px-4 py-3 border-t border-gray-100">
              {/* Filter content would go here */}
              <p className="text-gray-600 text-sm">No filters applied</p>
            </div>
          )}
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-lg shadow-sm">
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
            <button className="text-gray-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
              </svg>
            </button>
          </div>
          
          {chartExpanded && (
            <div className="px-4 py-3 border-t border-gray-100">
              {/* Table format chart */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="py-2 text-left font-medium text-gray-500 w-10">#</th>
                      <th className="py-2 text-left font-medium text-gray-500">Users Browser</th>
                      <th className="py-2 text-right font-medium text-gray-500">Users Total users</th>
                    </tr>
                  </thead>
                  <tbody>
                    {browserData.slice(0, 6).map((browser) => (
                      <tr key={browser.id} className="border-b border-gray-100">
                        <td className="py-2">{browser.id}</td>
                        <td className="py-2">{browser.browser}</td>
                        <td className="py-2 text-right">{browser.users.toLocaleString()}</td>
                      </tr>
                    ))}
                    <tr>
                      <td className="py-2">-</td>
                      <td className="py-2">.</td>
                      <td className="py-2 text-right">...</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-lg shadow-sm">
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
              <span className="flex items-center text-xs text-blue-500 font-medium">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <path d="M17 8.5l-7.2 7.2-3.8-3.8"></path>
                  <circle cx="12" cy="12" r="10"></circle>
                </svg>
                Sorted by Total users
              </span>
            </div>
          </div>
          
          {resultsExpanded && (
            <div className="px-4 py-3 border-t border-gray-100">
              {/* Results Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="py-2 px-2 text-left border border-gray-200 text-gray-500 w-10">#</th>
                      <th className="py-2 px-2 text-left border border-gray-200 text-gray-500 bg-blue-50">Users Browser</th>
                      <th className="py-2 px-2 text-left border border-gray-200 text-gray-500 bg-amber-50">Users Total users</th>
                    </tr>
                  </thead>
                  <tbody>
                    {browserData.map((browser) => (
                      <tr key={browser.id} className="hover:bg-gray-50">
                        <td className="py-2 px-2 border border-gray-200">{browser.id}</td>
                        <td className="py-2 px-2 border border-gray-200">{browser.browser}</td>
                        <td className="py-2 px-2 border border-gray-200 text-right">{browser.users.toLocaleString()}</td>
                      </tr>
                    ))}
                    <tr className="font-medium bg-gray-50">
                      <td className="py-2 px-2 border border-gray-200" colSpan="2">Total</td>
                      <td className="py-2 px-2 border border-gray-200 text-right">49,967</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="text-sm text-gray-500 text-right mt-2">
                7 results
              </div>
            </div>
          )}
        </div>

        {/* SQL Section */}
        <div className="bg-white rounded-lg shadow-sm">
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
            <button className="bg-white border border-gray-200 rounded px-2 py-1 text-xs flex items-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <path d="M10 3H6a2 2 0 00-2 2v14c0 1.1.9 2 2 2h12a2 2 0 002-2v-8M14 3v4a1 1 0 001 1h4M9 14l3-3 3 3M12 11v6"></path>
              </svg>
              Open in SQL Runner
            </button>
          </div>
          
          {sqlExpanded && (
            <div className="px-4 py-3 border-t border-gray-100">
              <div className="relative">
                <pre className="bg-gray-50 p-4 text-xs overflow-x-auto font-mono text-gray-700 rounded">
                  <div className="absolute right-2 top-2 text-gray-400">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 12h4v4h-4z"></path>
                      <path d="M9 4v4a1 1 0 01-1 1H4M4 4v16h16V4z"></path>
                    </svg>
                  </div>
                  <div className="flex">
                    <div className="text-gray-400 pr-4 select-none">
                      {Array.from({ length: 9 }, (_, i) => (
                        <div key={i}>{i + 1}</div>
                      ))}
                    </div>
                    <div>
                      <div className="text-blue-600">SELECT</div>
                      <div className="pl-2">
                        <span className="text-purple-600">`dbt_users`</span>.
                        <span className="text-green-600">`browser`</span> AS <span className="text-purple-600">`dbt_users_browser`</span>,
                      </div>
                      <div className="pl-2">
                        <span className="text-blue-600">COUNT</span>(
                        <span className="text-blue-600">DISTINCT</span> <span className="text-purple-600">`dbt_users`</span>.
                        <span className="text-green-600">`user_id`</span>) AS <span className="text-purple-600">`dbt_users_count_distinct_of_user_id`</span>
                      </div>
                      <div className="text-blue-600">FROM</div>
                      <div className="pl-2">
                        <span className="text-purple-600">`lightdash-healthcare-demo`</span>.
                        <span className="text-purple-600">`lightdash_gardening_demo`</span>.
                        <span className="text-purple-600">`dbt_users`</span> AS <span className="text-purple-600">`dbt_users`</span>
                      </div>
                      <div></div>
                      <div className="text-blue-600">GROUP BY</div>
                      <div className="pl-2">1</div>
                      <div className="text-blue-600">ORDER BY</div>
                      <div className="pl-2">
                        <span className="text-purple-600">`dbt_users_count_distinct_of_user_id`</span> <span className="text-blue-600">DESC</span>
                      </div>
                      <div className="text-blue-600">LIMIT</div>
                      <div className="pl-2"><span className="text-orange-500">500</span></div>
                    </div>
                  </div>
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopularBrowsersDashboard;