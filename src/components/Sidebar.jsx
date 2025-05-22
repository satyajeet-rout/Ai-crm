

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Home, LogOut } from 'lucide-react';

const Sidebar = ({ activeView, onNavigate, onLogout }) => {
  const [workspaceExpanded, setWorkspaceExpanded] = useState(true);

  const toggleWorkspace = () => {
    setWorkspaceExpanded(!workspaceExpanded);
  };

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 h-screen overflow-y-auto shadow-sm flex flex-col pt-6">
      {/* Home Item */}
      <div 
        className={`mx-3 px-4 py-3 flex items-center cursor-pointer rounded-lg transition-all duration-200 ${
          activeView === 'home' 
            ? 'bg-indigo-50 text-indigo-700 shadow-sm border-l-4 border-indigo-500' 
            : 'text-gray-600 hover:bg-gray-100'
        }`}
        onClick={() => onNavigate && onNavigate('home')}
      >
        <div className="w-6 flex items-center justify-center mr-3">
          <Home size={18} />
        </div>
        <span className="font-medium">Home</span>
      </div>
      
      {/* My Workflows Item */}
      <div 
        className={`mx-3 mt-2 px-4 py-3 flex items-center cursor-pointer rounded-lg transition-all duration-200 ${
          activeView === 'myWorkflows' 
            ? 'bg-indigo-50 text-indigo-700 shadow-sm border-l-4 border-indigo-500' 
            : 'text-gray-600 hover:bg-gray-100'
        }`}
        onClick={() => onNavigate && onNavigate('myWorkflows')}
      >
        <div className="w-6 flex items-center justify-center mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <span className="font-medium">My Workflows</span>
      </div>
      
      {/* Workspace Item with submenu */}
      <div className="mt-2 mx-3">
        {/* Clickable workspace header */}
        <div 
          className={`px-4 py-3 flex items-center justify-between cursor-pointer rounded-lg transition-all duration-200 ${
            ['main', 'actuals', 'cash', 'headcount', 'reports'].includes(activeView) 
              ? 'bg-indigo-50 text-indigo-700 shadow-sm border-l-4 border-indigo-500' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          onClick={toggleWorkspace}
        >
          <div className="flex items-center">
            <div className="w-6 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </div>
            <span className="font-medium">Workspace</span>
          </div>
          {workspaceExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        
        {/* Submenu items with smooth animation */}
        <div className={`mt-1 overflow-hidden transition-all duration-300 ${workspaceExpanded ? 'max-h-96' : 'max-h-0'}`}>
          <div className="ml-4 mr-2 mb-2 bg-gray-100 rounded-lg p-2 border-l-2 border-indigo-200">
            <div 
              className={`pl-4 pr-3 py-2 flex items-center cursor-pointer rounded-lg transition-all duration-200 whitespace-nowrap ${
                activeView === 'actuals' 
                  ? 'bg-indigo-100 text-indigo-700 shadow-sm border-l-2 border-indigo-400' 
                  : 'text-gray-600 hover:bg-indigo-50'
              }`}
              onClick={() => onNavigate && onNavigate('actuals')}
            >
              <span className="truncate">Cash-Flow Projection</span>
            </div>
            
            <div 
              className={`mt-1 pl-4 pr-3 py-2 flex items-center cursor-pointer rounded-lg transition-all duration-200 whitespace-nowrap ${
                activeView === 'cash' 
                  ? 'bg-indigo-100 text-indigo-700 shadow-sm border-l-2 border-indigo-400' 
                  : 'text-gray-600 hover:bg-indigo-50'
              }`}
              onClick={() => onNavigate && onNavigate('cash')}
            >
              <span className="truncate">AR/AP Aging</span>
            </div>
            
            <div 
              className={`mt-1 pl-4 pr-3 py-2 flex items-center cursor-pointer rounded-lg transition-all duration-200 whitespace-nowrap ${
                activeView === 'headcount' 
                  ? 'bg-indigo-100 text-indigo-700 shadow-sm border-l-2 border-indigo-400' 
                  : 'text-gray-600 hover:bg-indigo-50'
              }`}
              onClick={() => onNavigate && onNavigate('headcount')}
            >
              <span className="truncate">Variances vs Budget</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Divider */}
      <div className="my-4 mx-6 border-t border-gray-200"></div>
      
      {/* Dashboards Item */}
      <div 
        className={`mx-3 px-4 py-3 flex items-center cursor-pointer rounded-lg transition-all duration-200 ${
          activeView === 'dashboards' 
            ? 'bg-indigo-50 text-indigo-700 shadow-sm border-l-4 border-indigo-500' 
            : 'text-gray-600 hover:bg-gray-100'
        }`}
        onClick={() => onNavigate && onNavigate('dashboards')}
      >
        <div className="w-6 flex items-center justify-center mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <span className="font-medium">Dashboards</span>
      </div>
      
      {/* My Reports Item */}
      <div 
        className={`mx-3 mt-2 px-4 py-3 flex items-center cursor-pointer rounded-lg transition-all duration-200 ${
          activeView === 'myReports' 
            ? 'bg-indigo-50 text-indigo-700 shadow-sm border-l-4 border-indigo-500' 
            : 'text-gray-600 hover:bg-gray-100'
        }`}
        onClick={() => onNavigate && onNavigate('myReports')}
      >
        <div className="w-6 flex items-center justify-center mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <span className="font-medium">My Reports</span>
      </div>
      
      {/* Configuration Item */}
      <div 
        className={`mx-3 mt-2 px-4 py-3 flex items-center cursor-pointer rounded-lg transition-all duration-200 ${
          activeView === 'configuration' 
            ? 'bg-indigo-50 text-indigo-700 shadow-sm border-l-4 border-indigo-500' 
            : 'text-gray-600 hover:bg-gray-100'
        }`}
        onClick={() => onNavigate && onNavigate('configuration')}
      >
        <div className="w-6 flex items-center justify-center mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <span className="font-medium">Configuration</span>
      </div>
      
      {/* Spacer to push logout button to bottom */}
      <div className="flex-grow"></div>
      
      {/* Logout Button */}
      <div className="mx-3 mb-6 px-4 py-3">
        <button
          className="w-full flex items-center  py-2 px-4 bg-red-200 text-red-700 hover:bg-red-400 hover:text-black rounded-lg transition-all duration-200"
          onClick={() => onLogout && onLogout()}
        >
          <LogOut size={18} className="mr-2" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;