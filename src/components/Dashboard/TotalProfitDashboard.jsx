

import React, { useState } from 'react';
import { Search, ChevronDown, ChevronRight, Settings, Bell, HelpCircle, ExternalLink, Maximize2, Edit3, MoreHorizontal, ArrowLeft } from 'lucide-react';

const TotalProfitDashboard = ({ handleBackToList }) => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [chartOpen, setChartOpen] = useState(true);
  const [resultsOpen, setResultsOpen] = useState(true);
  const [sqlOpen, setSqlOpen] = useState(false);

  const toggleFilters = () => setFiltersOpen(!filtersOpen);
  const toggleChart = () => setChartOpen(!chartOpen);
  const toggleResults = () => setResultsOpen(!resultsOpen);
  const toggleSql = () => setSqlOpen(!sqlOpen);
  
  // Total profit value
  const totalProfit = 1515265.39;

  return (
    <div className="flex flex-col h-screen bg-white text-gray-800 overflow-hidden">
      
      {/* Content */}
      <main className="flex-1 overflow-auto">
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="flex items-center">
            {/* Back button that calls handleBackToList */}
            <button 
              onClick={handleBackToList}
              className="mr-2 text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="text-sm text-gray-500">
              <span className="text-gray-500">🏢 Company-wide</span> / What is our total profit?
            </div>
          </div>
          <div className="flex justify-between items-center mt-1">
            <div className="text-xs text-gray-400">
              Last edited 3 years ago by Ian Ahuja
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
              <ChevronRight className="w-4 h-4" />
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
            <div className="px-4 py-3 h-64 flex items-center justify-center">
              <div className="text-4xl font-medium text-gray-800">
                US${totalProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
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
                Sorted by Sum of profit
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
                    <th className="py-2 px-4">Sum of profit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-100">
                    <td className="py-2 px-2">1</td>
                    <td className="py-2 px-4 text-right">${totalProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="border-t border-gray-200 font-medium">
                    <td className="py-2 px-2">Total</td>
                    <td className="py-2 px-4 text-right">US${totalProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  </tr>
                </tfoot>
              </table>
              
              <div className="flex justify-end items-center mt-4 text-xs text-gray-500">
                1 result
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
  SUM(\`dbt_orders\`.\`profit\`) AS \`dbt_orders_sum_of_profit\`
FROM \`lightdash-healthcare-demo\`.\`lightdash_gardening_demo\`.\`dbt_orders\` AS \`dbt_orders\`



ORDER BY \`dbt_orders_sum_of_profit\` DESC
LIMIT 500`}
              </pre>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TotalProfitDashboard;