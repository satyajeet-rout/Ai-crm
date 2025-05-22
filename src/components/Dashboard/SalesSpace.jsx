
import React, { useState } from 'react';
import { 
  Search, 
  Info, 
  MoreHorizontal, 
  ChevronDown, 
  Eye, 
  Users,
  LayoutDashboard,
  LineChart,
  BarChart
} from 'lucide-react';
import SalesDashboard from './SalesDashboard';
import Sales from './Sales';
import EmailSplitChart from './EmailSplitChart';
import OrdersPerWeekChart from './OrdersPerWeekChart'; // Import the OrdersPerWeekChart component

const SalesSpace = ({ onBack }) => {
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDashboard, setShowDashboard] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const dashboardItems = [
    {
      id: 1,
      title: 'Sales Example',
      type: 'dashboard',
      views: 689,
      lastModified: 'a month ago',
      modifiedBy: 'Oliver Ramsay'
    },
    {
      id: 2,
      title: '💸 Sales',
      type: 'dashboard',
      views: 34829,
      lastModified: 'a month ago',
      modifiedBy: 'Oliver Ramsay'
    },
    {
      id: 3,
      title: 'What is the split of orders that come from gmail users per month?',
      type: 'bar-chart',
      views: 1499,
      lastModified: '2 months ago',
      modifiedBy: 'Jake Peterson'
    },
    {
      id: 4,
      title: 'How many orders per week per user?',
      type: 'line-chart',
      views: 19385,
      lastModified: '2 months ago',
      modifiedBy: 'Jake Peterson'
    },
    // {
    //   id: 5,
    //   title: 'What are the weekly revenue stats?',
    //   type: 'bar-chart',
    //   views: 45363,
    //   lastModified: '2 years ago',
    //   modifiedBy: null
    // }
  ];

  // Filter items based on the selected filter type and search query
  const filteredItems = dashboardItems.filter(item => {
    // Filter by type
    const typeMatch = 
      filterType === 'all' || 
      (filterType === 'dashboard' && item.type === 'dashboard') ||
      (filterType === 'chart' && (item.type === 'bar-chart' || item.type === 'line-chart'));
    
    // Filter by search query (case insensitive)
    const searchMatch = 
      searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Item must match both filters
    return typeMatch && searchMatch;
  });

  // Handle item click
  const handleItemClick = (itemId) => {
    setSelectedItemId(itemId);
    setShowDashboard(true);
  };

  // Handle back from dashboard
  const handleBackFromDashboard = () => {
    setShowDashboard(false);
    setSelectedItemId(null);
  };

  // If dashboard is shown, render the appropriate dashboard component
  if (showDashboard) {
    if (selectedItemId === 1) {
      return <SalesDashboard onBack={handleBackFromDashboard} />;
    } else if (selectedItemId === 2) {
      return <Sales onBack={handleBackFromDashboard} />;
    } else if (selectedItemId === 3) {
      // Show EmailSplitChart for item with ID 3
      return <EmailSplitChart onBack={handleBackFromDashboard} />;
    } else if (selectedItemId === 4) {
      // Show OrdersPerWeekChart for item with ID 4
      return <OrdersPerWeekChart onBack={handleBackFromDashboard} />;
    } else {
      // For other items, show the SalesDashboard as a fallback
      return <SalesDashboard onBack={handleBackFromDashboard} />;
    }
  }

  return (
    <div className="flex-1 flex flex-col overflow-y-auto bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={onBack}
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              ←
            </button>
            <h1 className="text-l text-gray-600 font-semibold">Space > Sales</h1>
            <div className="text-gray-500">
              <Info size={18} />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center space-x-2">
              <span>Share</span>
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full">
              <MoreHorizontal size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Filter Controls */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Search Box */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by name"
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Divider */}
                <div className="h-6 border-l border-gray-300"></div>

                {/* Filter Buttons */}
                <div className="flex border border-gray-300 rounded-md">
                  <button 
                    className={`px-4 py-2 text-sm ${filterType === 'all' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600'}`}
                    onClick={() => setFilterType('all')}
                  >
                    All
                  </button>
                  <button 
                    className={`px-4 py-2 text-sm ${filterType === 'dashboard' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600'}`}
                    onClick={() => setFilterType('dashboard')}
                  >
                    Dashboards
                  </button>
                  <button 
                    className={`px-4 py-2 text-sm ${filterType === 'chart' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600'}`}
                    onClick={() => setFilterType('chart')}
                  >
                    Charts
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="w-10 px-6 py-3 text-left">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Modified
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.map((item) => (
                  <tr 
                    key={item.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleItemClick(item.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-md flex items-center justify-center">
                          {item.type === 'dashboard' ? (
                            <div className="bg-green-50 p-2 rounded">
                              <LayoutDashboard size={20} className="text-green-500" />
                            </div>
                          ) : item.type === 'line-chart' ? (
                            <div className="bg-blue-50 p-2 rounded">
                              <LineChart size={20} className="text-blue-500" />
                            </div>
                          ) : (
                            <div className="bg-blue-50 p-2 rounded">
                              <BarChart size={20} className="text-blue-500" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 hover:text-blue-600">
                            {item.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.type === 'dashboard' ? 'Dashboard' : item.type === 'line-chart' ? 'Line chart' : 'Bar chart'} • {item.views.toLocaleString()} views
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">{item.lastModified}</div>
                        {item.modifiedBy && (
                          <div className="text-sm text-gray-500">by {item.modifiedBy}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" onClick={(e) => e.stopPropagation()}>
                      <button className="text-gray-400 hover:text-gray-500">
                        <MoreHorizontal size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesSpace;