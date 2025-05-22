

import React, { useState } from 'react';
import { Search, ChevronUp, MoreHorizontal, User, Share, Info, ArrowLeft } from 'lucide-react';
import MarketingDashboard from './MarketingDashboard';
import RevenueByReferrerDashboard from './RevenueByReferrerDashboard';
import PopularBrowsersDashboard from './PopularBrowsersDashboard';

const Marketing = ({ onBack }) => {
  const [selectedTab, setSelectedTab] = useState('All');
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedChart, setSelectedChart] = useState(null);

  const toggleItemSelection = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleItemClick = (id) => {
    setSelectedChart(id);
  };

  const handleBackToList = () => {
    setSelectedChart(null);
  };

  const tabs = ["All", "Dashboards", "Charts"];

  const items = [
    {
      id: 1,
      name: "Marketing",
      type: "Dashboard",
      views: 13465,
      modified: "2 months ago",
      by: "Oliver Ramsay",
      icon: "grid"
    },
    {
      id: 2,
      name: "What is the revenue by referrer per month?",
      type: "Bar chart",
      views: 487,
      modified: "3 years ago",
      by: "Ian Ahuja",
      icon: "chart"
    },
    {
      id: 3,
      name: "What are the most popular browsers?",
      type: "Bar chart",
      views: 22112,
      modified: "2 years ago",
      by: "Rosie Greenfingers",
      icon: "chart"
    },
    // {
    //   id: 4,
    //   name: "How much revenue does each referrer bring us in per week?",
    //   type: "Bar chart",
    //   views: 55550,
    //   modified: "2 years ago",
    //   by: "",
    //   icon: "chart"
    // },
    // {
    //   id: 5,
    //   name: "What is the Average Order Value per referrer?",
    //   type: "Bar chart",
    //   views: 13372,
    //   modified: "2 years ago",
    //   by: "",
    //   icon: "chart"
    // }
  ];

  // Filter items based on selected tab
  const filteredItems = items.filter(item => {
    if (selectedTab === 'All') return true;
    if (selectedTab === 'Dashboards') return item.type === 'Dashboard';
    if (selectedTab === 'Charts') return item.type === 'Bar chart';
    return true;
  });

  // If the "What is the revenue by referrer per month?" chart is selected (ID 2)
  if (selectedChart === 2) {
    return <RevenueByReferrerDashboard onBack={handleBackToList} />;
  }
  
  // If the "What are the most popular browsers?" chart is selected (ID 3)
  if (selectedChart === 3) {
    return <PopularBrowsersDashboard onBack={handleBackToList} />;
  }

  // If any other chart or dashboard is selected, show the MarketingDashboard
  if (selectedChart) {
    return <MarketingDashboard onBack={handleBackToList} />;
  }

  return (
    <div className="bg-white min-h-screen font-sans w-full">
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Back button */}
            {onBack && (
              <button 
                onClick={onBack}
                className="mr-2 p-1 rounded-full hover:bg-gray-100"
              >
                <ArrowLeft size={18} className="text-gray-500" />
              </button>
            )}
            <span className="text-gray-500">Spaces</span>
            <span className="text-gray-500">/</span>
            <div className="flex items-center">
              <span className="mr-1">📁</span>
              <span className="font-medium">Marketing</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="border border-gray-200 rounded-md px-3 py-1.5 flex items-center text-sm">
              <User size={16} className="mr-2" />
              Share
            </button>
            <button className="border border-gray-200 rounded-md px-1.5 py-1.5">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          {/* Search and Filters */}
          <div className="p-4 flex items-center gap-4">
            <div className="relative flex-grow max-w-md">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none"
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
              <ChevronUp size={14} className="ml-1" />
            </div>
            <div className="col-span-4 flex items-center">
              <span>Last Modified</span>
              <ChevronUp size={14} className="ml-1" />
            </div>
          </div>

          {/* Table Rows */}
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="border-t border-gray-200 grid grid-cols-12 px-4 py-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => handleItemClick(item.id)}
            >
              <div className="col-span-1 flex items-center" onClick={(e) => e.stopPropagation()}>
                <input 
                  type="checkbox" 
                  className="rounded"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => toggleItemSelection(item.id)}
                />
              </div>
              <div className="col-span-7 flex items-center">
                <div className="text-blue-500 mr-3">
                  {item.icon === "grid" ? (
                    <div className="w-6 h-6 bg-green-100 flex items-center justify-center text-green-600 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="7"></rect>
                        <rect x="14" y="3" width="7" height="7"></rect>
                        <rect x="14" y="14" width="7" height="7"></rect>
                        <rect x="3" y="14" width="7" height="7"></rect>
                      </svg>
                    </div>
                  ) : (
                    <div className="w-6 h-6 bg-blue-100 flex items-center justify-center text-blue-600 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect>
                        <line x1="6" y1="6" x2="6" y2="18"></line>
                        <line x1="10" y1="10" x2="10" y2="18"></line>
                        <line x1="14" y1="14" x2="14" y2="18"></line>
                        <line x1="18" y1="8" x2="18" y2="18"></line>
                      </svg>
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center">
                    {item.id === 1 && (
                      <span className="mr-2 text-yellow-600">📁</span>
                    )}
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
                <button className="text-gray-400 hover:text-gray-600">
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

export default Marketing;