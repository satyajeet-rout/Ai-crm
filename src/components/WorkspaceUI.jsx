
import React, { useState } from 'react';
import { 
  Info, 
  Folder, 
  Users, 
  MoreHorizontal, 
  GripVertical, 
  LayoutDashboard,
  LineChart,
  BarChart,
  Eye
} from 'lucide-react';
import SalesSpace from './Dashboard/SalesSpace';
import Sales from './Dashboard/Sales';
import CompanyKPIDashboard from './Dashboard/CompanyKPIDashboard';
import MarketingDashboard from './Dashboard/MarketingDashboard';
import OrdersPerWeekChart from './Dashboard/OrdersPerWeekChart';

import Marketing from './Dashboard/Marketing';
import RevenueStats2 from './Dashboard/RevenueStats2';
import PopularBrowsersDashboard from './Dashboard/PopularBrowsersDashboard';

const WorkspaceUI = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  
  const handleComponentClick = (component) => {
    setActiveComponent(component);
  };
  
  const handleBackToWorkspace = () => {
    setActiveComponent(null);
  };
  
  // Render the active component based on selection
  if (activeComponent === 'sales') {
    return <SalesSpace onBack={handleBackToWorkspace} />;
  }
  
  if (activeComponent === 'company-kpis') {
    return <CompanyKPIDashboard onBack={handleBackToWorkspace} />;
  }
  
  if (activeComponent === 'marketing') {
    return <Marketing onBack={handleBackToWorkspace} />;
  }
  if (activeComponent === 'marketing-dashboard') {
    return <MarketingDashboard onBack={handleBackToWorkspace} />;
  }
  
  if (activeComponent === 'orders-per-week') {
    return <OrdersPerWeekChart onBack={handleBackToWorkspace} />;
  }
  
  if (activeComponent === 'revenue-stats') {
    return <RevenueStats2 onBack={handleBackToWorkspace} />;
  }
  
  if (activeComponent === 'dashboard-sales') {
    return <Sales onBack={handleBackToWorkspace} />;
  }
  if (activeComponent === 'popular-browsers') {
    return <PopularBrowsersDashboard onBack={handleBackToWorkspace} />;
  }
  
  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 px-6 mt-6">
      {/* Pinned Items Header */}
      <div className="p-4">
        <div className="flex items-center gap-2">
          <h5 className="text-lg font-medium">Pinned items</h5>
          <Info size={18} className="text-gray-500" />
        </div>
      </div>
      
      <div className="h-px w-full bg-gray-200"></div>
      
      {/* Spaces Section */}
      <div className="p-4 px-6 space-y-4">
        <div className="text-sm font-medium text-gray-600">Spaces</div>
        <div className="grid grid-cols-3 gap-4">
          {/* Space Item 1 */}
          <div 
            className="flex flex-col border border-gray-200 rounded-lg overflow-hidden hover:shadow-sm transition-shadow h-auto cursor-pointer"
            onClick={() => handleComponentClick('sales')}
          >
            <div className="flex items-center p-3 gap-3">
              <div className="flex-shrink-0 opacity-0">
                <GripVertical size={12} className="text-gray-500" />
              </div>
              
              <div className="flex items-center justify-center w-8 h-8 rounded bg-indigo-50">
                <Folder size={20} className="text-indigo-500" />
              </div>
              
              <div className="flex flex-col flex-grow min-w-0">
                <div className="text-sm font-medium truncate">💸 Sales</div>
                <div className="flex items-center gap-1 mt-1">
                  <div className="flex items-center gap-1">
                    <Users size={12} className="text-gray-500" />
                    <div className="text-xs text-gray-500 capitalize">public</div>
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <button 
                  className="p-1 rounded hover:bg-gray-100" 
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal size={16} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Space Item 2 - Company-wide KPIs */}
          <div 
            className="flex flex-col border border-gray-200 rounded-lg overflow-hidden hover:shadow-sm transition-shadow h-auto cursor-pointer"
            onClick={() => handleComponentClick('company-kpis')}
          >
            <div className="flex items-center p-3 gap-3">
              <div className="flex-shrink-0 opacity-0">
                <GripVertical size={12} className="text-gray-500" />
              </div>
              
              <div className="flex items-center justify-center w-8 h-8 rounded bg-indigo-50">
                <Folder size={20} className="text-indigo-500" />
              </div>
              
              <div className="flex flex-col flex-grow min-w-0">
                <div className="text-sm font-medium truncate">📈 Company-wide KPIs</div>
                <div className="flex items-center gap-1 mt-1">
                  <div className="flex items-center gap-1">
                    <Users size={12} className="text-gray-500" />
                    <div className="text-xs text-gray-500 capitalize">public</div>
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <button 
                  className="p-1 rounded hover:bg-gray-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal size={16} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Space Item 3 */}
          <div 
            className="flex flex-col border border-gray-200 rounded-lg overflow-hidden hover:shadow-sm transition-shadow h-auto cursor-pointer"
            onClick={() => handleComponentClick('marketing')}
          >
            <div className="flex items-center p-3 gap-3">
              <div className="flex-shrink-0 opacity-0">
                <GripVertical size={12} className="text-gray-500" />
              </div>
              
              <div className="flex items-center justify-center w-8 h-8 rounded bg-indigo-50">
                <Folder size={20} className="text-indigo-500" />
              </div>
              
              <div className="flex flex-col flex-grow min-w-0">
                <div className="text-sm font-medium truncate">📣 Marketing</div>
                <div className="flex items-center gap-1 mt-1">
                  <div className="flex items-center gap-1">
                    <Users size={12} className="text-gray-500" />
                    <div className="text-xs text-gray-500 capitalize">public</div>
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <button 
                  className="p-1 rounded hover:bg-gray-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal size={16} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dashboards & Charts Section */}
      <div className="p-4 px-6 space-y-4">
        <div className="text-sm font-medium text-gray-600">Dashboards & Charts</div>
        <div className="grid grid-cols-3 gap-4">
          {/* Dashboard Item 1 */}
          <div 
            className="flex flex-col border border-gray-200 rounded-lg overflow-hidden hover:shadow-sm transition-shadow h-auto cursor-pointer"
            onClick={() => handleComponentClick('dashboard-sales')}
          >
            <div className="flex items-center p-3">
              <div className="flex-shrink-0">
                <div className="w-3 opacity-0">
                  <GripVertical size={12} className="text-gray-500" />
                </div>
              </div>
              
              <div className="flex items-center justify-center w-8 h-8 ml-2 rounded bg-green-50">
                <LayoutDashboard size={20} className="text-green-500" />
              </div>
              
              <div className="ml-3 text-sm font-medium">💸 Sales</div>
            </div>
            
            <div className="flex items-center px-3 pb-3 pt-0">
              <div className="ml-12 flex items-center gap-1">
                <Eye size={14} className="text-gray-500" />
                <div className="text-xs text-gray-500">34,826 views</div>
              </div>
            </div>
          </div>
          
          {/* Dashboard Item 2 */}
          <div 
            className="flex flex-col border border-gray-200 rounded-lg overflow-hidden hover:shadow-sm transition-shadow h-auto cursor-pointer"
            onClick={() => handleComponentClick('marketing-dashboard')}
          >
            <div className="flex items-center p-3">
              <div className="flex-shrink-0">
                <div className="w-3 opacity-0">
                  <GripVertical size={12} className="text-gray-500" />
                </div>
              </div>
              
              <div className="flex items-center justify-center w-8 h-8 ml-2 rounded bg-green-50">
                <LayoutDashboard size={20} className="text-green-500" />
              </div>
              
              <div className="ml-3 text-sm font-medium">📣 Marketing</div>
            </div>
            
            <div className="flex items-center px-3 pb-3 pt-0">
              <div className="ml-12 flex items-center gap-1">
                <Eye size={14} className="text-gray-500" />
                <div className="text-xs text-gray-500">13,423 views</div>
              </div>
            </div>
          </div>
          
          {/* Dashboard Item 3 */}
          {/* <div className="flex flex-col border border-gray-200 rounded-lg overflow-hidden hover:shadow-sm transition-shadow h-auto">
            <div className="flex items-center p-3">
              <div className="flex-shrink-0">
                <div className="w-3 opacity-0">
                  <GripVertical size={12} className="text-gray-500" />
                </div>
              </div>
              
              <div className="flex items-center justify-center w-8 h-8 ml-2 rounded bg-green-50">
                <LayoutDashboard size={20} className="text-green-500" />
              </div>
              
              <div className="ml-3 text-sm font-medium">🤗 Customer Support + Ops</div>
            </div>
            
            <div className="flex items-center px-3 pb-3 pt-0">
              <div className="ml-12 flex items-center gap-1">
                <Eye size={14} className="text-gray-500" />
                <div className="text-xs text-gray-500">6,753 views</div>
              </div>
            </div>
          </div> */}
          
          {/* Chart Item 1 */}
          <div 
            className="flex flex-col border border-gray-200 rounded-lg overflow-hidden hover:shadow-sm transition-shadow h-auto cursor-pointer"
            onClick={() => handleComponentClick('orders-per-week')}
          >
            <div className="flex items-center p-3">
              <div className="flex-shrink-0">
                <GripVertical size={12} className="text-gray-500" />
              </div>
              
              <div className="flex items-center justify-center w-8 h-8 ml-2 rounded bg-blue-50">
                <LineChart size={20} className="text-blue-500" />
              </div>
              
              <div className="ml-3 text-sm font-medium">How many orders per week per user?</div>
            </div>
            
            <div className="flex items-center px-3 pb-3 pt-0">
              <div className="ml-12 flex items-center gap-1">
                <Eye size={14} className="text-gray-500" />
                <div className="text-xs text-gray-500">19,385 views</div>
              </div>
            </div>
          </div>
          
          {/* Chart Item 2 */}
          <div 
            className="flex flex-col border border-gray-200 rounded-lg overflow-hidden hover:shadow-sm transition-shadow h-auto cursor-pointer"
            onClick={() => handleComponentClick('revenue-stats')}
          >
            <div className="flex items-center p-3">
              <div className="flex-shrink-0">
                <div className="w-3 opacity-0">
                  <GripVertical size={12} className="text-gray-500" />
                </div>
              </div>
              
              <div className="flex items-center justify-center w-8 h-8 ml-2 rounded bg-blue-50">
                <BarChart size={20} className="text-blue-500" />
              </div>
              
              <div className="ml-3 text-sm font-medium">What are the weekly revenue stats?</div>
            </div>
            
            <div className="flex items-center px-3 pb-3 pt-0">
              <div className="ml-12 flex items-center gap-1">
                <Eye size={14} className="text-gray-500" />
                <div className="text-xs text-gray-500">45,363 views</div>
              </div>
            </div>
          </div>
          
          {/* Chart Item 3 */}
          <div 
            className="flex flex-col border border-gray-200 rounded-lg overflow-hidden hover:shadow-sm transition-shadow h-auto cursor-pointer"
            onClick={() => handleComponentClick('popular-browsers')}
          >
            <div className="flex items-center p-3">
              <div className="flex-shrink-0">
                <div className="w-3 opacity-0">
                  <GripVertical size={12} className="text-gray-500" />
                </div>
              </div>
              
              <div className="flex items-center justify-center w-8 h-8 ml-2 rounded bg-blue-50">
                <BarChart size={20} className="text-blue-500" />
              </div>
              
              <div className="ml-3 text-sm font-medium">What are the most popular browsers?</div>
            </div>
            
            <div className="flex items-center px-3 pb-3 pt-0">
              <div className="ml-12 flex items-center gap-1">
                <Eye size={14} className="text-gray-500" />
                <div className="text-xs text-gray-500">22,021 views</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceUI;