

// CompanyKPIDashboard.js
import { useState } from 'react';
import { ChevronDown, MoreHorizontal, Info, Search, Users, Share, ArrowLeft, BarChart } from 'lucide-react';

import TotalProfitDashboard from './TotalProfitDashboard';
import RevenueStats from './RevenueStats';
import TotalUnitsSold from './TotalUnitsSold';

const CompanyKPIDashboard = ({ onBack }) => {
  const [selectedTab, setSelectedTab] = useState('All');
  const [selectedChart, setSelectedChart] = useState(null);
  
  const kpiData = [
    {
      id: 1,
      name: "What are the weekly revenue stats?",
      type: "Bar chart",
      views: 45643,
      modified: "a month ago",
      by: "Oliver Ramsay"
    },
    {
      id: 2,
      name: "What is our total profit?",
      type: "Bar chart",
      views: 37614,
      modified: "2 years ago",
      by: ""
    },
    {
      id: 3,
      name: "Total units sold",
      type: "Bar chart",
      views: 34767,
      modified: "2 years ago",
      by: ""
    },
    // {
    //   id: 4,
    //   name: "How many unique users do we have?",
    //   type: "Bar chart",
    //   views: 1806,
    //   modified: "2 years ago",
    //   by: ""
    // },
    // {
    //   id: 5,
    //   name: "How many signups per week?",
    //   type: "Bar chart",
    //   views: 15786,
    //   modified: "2 years ago",
    //   by: ""
    // }
  ];

  const tabs = ["All", "Dashboards", "Charts"];

  // Function to handle chart selection
  const handleChartClick = (chartId) => {
    setSelectedChart(chartId);
  };

  // Function to go back to dashboard
  const handleBackToList = () => {
    setSelectedChart(null);
  };

  // If a chart is selected, show that chart
  if (selectedChart === 1) {
    return (
      <div className="bg-gray-50 min-h-screen font-sans w-full">
        <div className="max-w-6xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <button 
                onClick={handleBackToList}
                className="mr-2 p-1 rounded-full hover:bg-gray-100"
              >
                <ArrowLeft size={18} className="text-gray-500" />
              </button>
              <span className="text-gray-500">Spaces</span>
              <span className="text-gray-500">/</span>
              <div className="flex items-center">
                <span className="text-red-500 mr-1">📈</span>
                <span className="font-medium">Company-wide KPIs</span>
              </div>
              <span className="text-gray-500">/</span>
              <span className="font-medium">What are the weekly revenue stats?</span>
            </div>
          </div>

          {/* Chart Content */}
          <RevenueStats/>
        </div>
      </div>
    );
  }
  
  // If "What is our total profit?" is selected, show the TotalProfitDashboard
  if (selectedChart === 2) {
    return (
      <div className="bg-gray-50 min-h-screen font-sans w-full">
        <div className="flex flex-col">
          {/* Pass the handleBackToList function to TotalProfitDashboard */}
          <TotalProfitDashboard handleBackToList={handleBackToList} />
        </div>
      </div>
    );
  }
  // If "Total units sold" is selected, show the TotalUnitsSold
  if (selectedChart === 3) {
    return (
      <div className="bg-gray-50 min-h-screen font-sans w-full">
        <div className="flex flex-col">
          {/* Pass the handleBackToList function to TotalProfitDashboard */}
          <TotalUnitsSold handleBackToList={handleBackToList} />
        </div>
      </div>
    );
  }
  // Otherwise show the dashboard
  return (
    <div className="bg-gray-50 min-h-screen font-sans w-full">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <button 
              onClick={onBack}
              className="mr-2 p-1 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft size={18} className="text-gray-500" />
            </button>
            <span className="text-gray-500">Spaces</span>
            <span className="text-gray-500">/</span>
            <div className="flex items-center">
              <span className="text-red-500 mr-1">📈</span>
              <span className="font-medium">Company-wide KPIs</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center bg-white border border-gray-200 rounded-md px-3 py-1.5 text-sm font-medium">
              <Share size={16} className="mr-2" />
              Share
            </button>
            <button className="bg-white border border-gray-200 rounded-md px-1 py-1.5">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>

        {/* Main Container */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          {/* Search and Tabs */}
          <div className="p-4 flex items-center gap-4">
            <div className="relative flex-grow max-w-md">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex border border-gray-200 rounded-md">
              {tabs.map(tab => (
                <button
                  key={tab}
                  className={`px-4 py-2 text-sm ${selectedTab === tab ? 'bg-gray-100 font-medium' : 'bg-white text-gray-600'}`}
                  onClick={() => setSelectedTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Table Header */}
          <div className="border-t border-gray-200 grid grid-cols-12 px-4 py-3 text-sm text-gray-600">
            <div className="col-span-1">
              <input type="checkbox" className="rounded" />
            </div>
            <div className="col-span-7 flex items-center">
              <span>Name</span>
              <ChevronDown size={14} className="ml-1" />
            </div>
            <div className="col-span-3 flex items-center">
              <span>Last Modified</span>
              <ChevronDown size={14} className="ml-1" />
            </div>
            <div className="col-span-1"></div>
          </div>

          {/* Table Rows */}
          {kpiData
            .filter(item => {
              if (selectedTab === 'All') return true;
              if (selectedTab === 'Dashboards') return item.type === 'Dashboard';
              if (selectedTab === 'Charts') return item.type.includes('chart') || item.type.includes('Chart');
              return true;
            })
            .map((item) => (
            <div 
              key={item.id} 
              className="border-t border-gray-200 grid grid-cols-12 px-4 py-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => handleChartClick(item.id)}
            >
              <div className="col-span-1 flex items-center" onClick={(e) => e.stopPropagation()}>
                <input type="checkbox" className="rounded" />
              </div>
              <div className="col-span-7 flex items-center">
                <div className="text-blue-500 mr-3">
                  {item.type === 'Dashboard' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <line x1="3" y1="9" x2="21" y2="9" />
                      <line x1="9" y1="21" x2="9" y2="9" />
                    </svg>
                  ) : (
                    <BarChart size={20} />
                  )}
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="font-medium">{item.name}</span>
                    <Info size={14} className="ml-2 text-gray-400" />
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.type} • {item.views.toLocaleString()} views
                  </div>
                </div>
              </div>
              <div className="col-span-3 flex flex-col justify-center">
                <div className="text-sm text-gray-600">{item.modified}</div>
                {item.by && <div className="text-xs text-gray-500">by {item.by}</div>}
              </div>
              <div className="col-span-1 flex items-center justify-end" onClick={(e) => e.stopPropagation()}>
                <button className="text-gray-500 hover:text-gray-700">
                  <MoreHorizontal size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyKPIDashboard;