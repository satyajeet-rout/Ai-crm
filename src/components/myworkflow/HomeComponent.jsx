// // HomeComponent.jsx
// import React from 'react';
// import { Plus, Search, Calendar, ArrowRight, BarChart2, FileText, Users } from 'lucide-react';

// const HomeComponent = ({ onNavigate }) => {
//   // Sample data for recent workflows
//   const recentWorkflows = [
//     { id: 1, name: 'Financials Month End Close, May 2025', type: 'Monthly', status: 'In Progress', completion: 84, daysLeft: 0 },
//     { id: 2, name: 'Financials Month End Close, June 2024', type: 'Monthly', status: 'Completed', completion: 100, daysLeft: 0 },
//     { id: 3, name: 'Financials Month End Close, May 2024', type: 'Monthly', status: 'Completed', completion: 100, daysLeft: 0 },
//   ];

//   // Sample data for pinned reports
//   const pinnedReports = [
//     { id: 1, name: 'Monthly Financial Review', icon: 'chart' },
//     { id: 2, name: 'Headcount Analysis', icon: 'users' },
//     { id: 3, name: 'Cash Flow Forecast', icon: 'document' },
//     { id: 4, name: 'Revenue Dashboard', icon: 'chart' },
//   ];

//   return (
//     <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header & Quick Actions */}
//         <div className="mb-8">
//           <h1 className="text-2xl font-bold text-gray-800 mb-6">Welcome to Genius Finance</h1>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             {/* Create New Workflow */}
//             <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col justify-between h-32 border border-gray-200">
//               <div className="text-sm font-medium text-gray-700">Create New</div>
//               <div className="flex justify-between items-center">
//                 <div className="bg-indigo-100 p-2 rounded-lg">
//                   <Plus className="h-5 w-5 text-indigo-600" />
//                 </div>
//                 <button 
//                   className="text-indigo-600 flex items-center text-sm font-medium"
//                   onClick={() => onNavigate('myWorkflows')}
//                 >
//                   Create <ArrowRight className="h-4 w-4 ml-1" />
//                 </button>
//               </div>
//             </div>
            
//             {/* Browse Templates */}
//             <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col justify-between h-32 border border-gray-200">
//               <div className="text-sm font-medium text-gray-700">Browse Templates</div>
//               <div className="flex justify-between items-center">
//                 <div className="bg-indigo-100 p-2 rounded-lg">
//                   <Search className="h-5 w-5 text-indigo-600" />
//                 </div>
//                 <button className="text-indigo-600 flex items-center text-sm font-medium">
//                   Browse <ArrowRight className="h-4 w-4 ml-1" />
//                 </button>
//               </div>
//             </div>
            
//             {/* Upcoming Tasks */}
//             <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col justify-between h-32 border border-gray-200">
//               <div className="text-sm font-medium text-gray-700">Upcoming Tasks</div>
//               <div className="flex justify-between items-center">
//                 <div className="bg-indigo-100 p-2 rounded-lg">
//                   <Calendar className="h-5 w-5 text-indigo-600" />
//                 </div>
//                 <span className="text-sm text-indigo-600 font-medium">3 tasks due today</span>
//               </div>
//             </div>
            
//             {/* Monthly Report */}
//             <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col justify-between h-32 border border-gray-200">
//               <div className="text-sm font-medium text-gray-700">Monthly Report</div>
//               <div className="flex justify-between items-center">
//                 <div className="bg-indigo-100 p-2 rounded-lg">
//                   <BarChart2 className="h-5 w-5 text-indigo-600" />
//                 </div>
//                 <button className="text-indigo-600 flex items-center text-sm font-medium">
//                   View <ArrowRight className="h-4 w-4 ml-1" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Recent Workflows */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-lg font-semibold text-gray-800">Recent Workflows</h2>
//             <button className="text-indigo-600 flex items-center text-sm font-medium">
//               View All <ArrowRight className="h-4 w-4 ml-1" />
//             </button>
//           </div>
          
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Left</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {recentWorkflows.map((workflow) => (
//                   <tr key={workflow.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600 cursor-pointer" onClick={() => onNavigate('myWorkflows')}>
//                       {workflow.name}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{workflow.type}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`px-2 py-1 text-xs font-medium rounded-full ${
//                         workflow.status === 'Completed' 
//                           ? 'bg-green-100 text-green-800' 
//                           : 'bg-blue-100 text-blue-800'
//                       }`}>
//                         {workflow.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
//                           <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${workflow.completion}%` }}></div>
//                         </div>
//                         <span className="text-xs text-gray-500">{workflow.completion}%</span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{workflow.daysLeft}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm">
//                       <button 
//                         className="text-indigo-600 hover:text-indigo-900 font-medium"
//                         onClick={() => onNavigate('myWorkflows')}
//                       >
//                         Continue
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
        
//         {/* Pinned Reports */}
//         <div>
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-lg font-semibold text-gray-800">Pinned Reports</h2>
//             <button className="text-indigo-600 flex items-center text-sm font-medium">
//               View All <ArrowRight className="h-4 w-4 ml-1" />
//             </button>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             {pinnedReports.map((report) => (
//               <div key={report.id} className="bg-white p-4 rounded-lg shadow-sm flex flex-col justify-between h-28 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm font-medium text-gray-700">{report.name}</span>
//                   <div className="bg-indigo-100 p-1.5 rounded-md">
//                     {report.icon === 'chart' && <BarChart2 className="h-4 w-4 text-indigo-600" />}
//                     {report.icon === 'users' && <Users className="h-4 w-4 text-indigo-600" />}
//                     {report.icon === 'document' && <FileText className="h-4 w-4 text-indigo-600" />}
//                   </div>
//                 </div>
//                 <div className="flex justify-between items-center mt-4">
//                   <div className="flex items-center">
//                     <Star className="h-4 w-4 text-yellow-400 fill-current" />
//                     <span className="text-xs text-gray-500 ml-1">Pinned</span>
//                   </div>
//                   <button className="text-indigo-600 text-sm">View</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Add the Star icon since it's not exported from lucide-react by default
// const Star = (props) => {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
//     </svg>
//   );
// };

// export default HomeComponent;




// import React, { useState } from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { ArrowUp, ArrowDown, RefreshCw, Download, Clock, DollarSign, AlertCircle, Check, Bell, HelpCircle, Settings, ChevronRight, Calendar, Mail, Search } from 'lucide-react';

// // Sample data for cash flow waterfall chart
// const cashFlowData = [
//   { week: 'This Week', inflow: 120000, outflow: -85000, net: 35000 },
//   { week: 'Week 2', inflow: 95000, outflow: -110000, net: -15000 },
//   { week: 'Week 3', inflow: 130000, outflow: -90000, net: 40000 },
//   { week: 'Week 4', inflow: 85000, outflow: -70000, net: 15000 },
//   { week: 'Week 5', inflow: 110000, outflow: -95000, net: 15000 },
//   { week: 'Week 6', inflow: 75000, outflow: -85000, net: -10000 },
//   { week: 'Week 7', inflow: 120000, outflow: -100000, net: 20000 },
//   { week: 'Week 8', inflow: 95000, outflow: -90000, net: 5000 },
//   { week: 'Week 9', inflow: 110000, outflow: -115000, net: -5000 },
//   { week: 'Week 10', inflow: 140000, outflow: -110000, net: 30000 },
//   { week: 'Week 11', inflow: 90000, outflow: -80000, net: 10000 },
//   { week: 'Week 12', inflow: 105000, outflow: -95000, net: 10000 },
//   { week: 'Week 13', inflow: 115000, outflow: -100000, net: 15000 },
// ];

// // Sample data for alerts and tasks
// const overdueInvoices = [
//   { id: 'INV-2023-421', client: 'TechNova Solutions', amount: 25000, daysOverdue: 15 },
//   { id: 'INV-2023-389', client: 'Globex Corporation', amount: 18500, daysOverdue: 12 },
//   { id: 'INV-2023-405', client: 'Initech Industries', amount: 12750, daysOverdue: 9 },
//   { id: 'INV-2023-412', client: 'Massive Dynamic', amount: 9800, daysOverdue: 7 },
//   { id: 'INV-2023-418', client: 'Stark Enterprises', amount: 7500, daysOverdue: 5 },
// ];

// const upcomingPayables = [
//   { id: 'PO-2023-187', vendor: 'Office Supplies Inc.', amount: 3200, dueIn: 2 },
//   { id: 'PO-2023-192', vendor: 'Cloud Services Ltd.', amount: 15000, dueIn: 3 },
//   { id: 'PO-2023-195', vendor: 'Marketing Partners', amount: 8750, dueIn: 4 },
//   { id: 'PO-2023-198', vendor: 'IT Infrastructure Co.', amount: 22000, dueIn: 5 },
//   { id: 'PO-2023-203', vendor: 'Business Insurance', amount: 12500, dueIn: 7 },
// ];

// const HomeComponent = () => {
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const lastRefreshed = "May 7, 2025 - 09:15 AM";
  
//   const handleRefresh = () => {
//     setIsRefreshing(true);
//     // Simulate refresh delay
//     setTimeout(() => {
//       setIsRefreshing(false);
//     }, 3000);
//   };

//   const formatCurrency = (value) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       maximumFractionDigits: 0
//     }).format(value);
//   };

//   // Custom tooltip for the waterfall chart
//   const CustomTooltip = ({ active, payload }) => {
//     if (active && payload && payload.length) {
//       const data = payload[0].payload;
//       return (
//         <div className="bg-white p-4 shadow-lg border border-gray-200 rounded-md">
//           <p className="font-semibold">{data.week}</p>
//           <p className="text-green-600">{`Inflow: ${formatCurrency(data.inflow)}`}</p>
//           <p className="text-red-600">{`Outflow: ${formatCurrency(Math.abs(data.outflow))}`}</p>
//           <p className={`font-semibold ${data.net >= 0 ? 'text-green-700' : 'text-red-700'}`}>
//             {`Net: ${formatCurrency(data.net)}`}
//           </p>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       {/* Header */}
//       <header className="bg-white border-b border-gray-200 px-6 py-3">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center">
//             <h1 className="text-2xl font-bold text-blue-700">FinanceIQ</h1>
//             <span className="ml-4 text-gray-500">|</span>
//             <h2 className="ml-4 text-lg font-medium">Management Information System</h2>
//           </div>
//           <div className="flex items-center space-x-4">
//             <button className="text-gray-600 hover:text-gray-900">
//               <Bell size={20} />
//             </button>
//             <button className="text-gray-600 hover:text-gray-900">
//               <HelpCircle size={20} />
//             </button>
//             <button className="text-gray-600 hover:text-gray-900">
//               <Settings size={20} />
//             </button>
//             <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
//               FD
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <div className="flex-1 bg-gray-50 p-6 overflow-auto">
//         <div className="mb-6 flex justify-between items-center">
//           <h2 className="text-xl font-bold text-gray-800">Financial Snapshot</h2>
//           <div className="flex items-center space-x-4">
//             <div className="text-sm text-gray-500 flex items-center">
//               <Clock size={16} className="mr-1" />
//               Last updated: {lastRefreshed}
//             </div>
//             <button
//               className={`flex items-center px-4 py-2 rounded-md border border-gray-300 text-gray-700 ${isRefreshing ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:bg-gray-50'}`}
//               onClick={isRefreshing ? null : () => handleRefresh()}
//               disabled={isRefreshing}
//             >
//               <Download size={18} className="mr-2" />
//               Download Board Pack
//             </button>
//             <button
//               className={`flex items-center px-4 py-2 rounded-md ${isRefreshing ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
//               onClick={isRefreshing ? null : () => handleRefresh()}
//               disabled={isRefreshing}
//             >
//               <RefreshCw size={18} className={`mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
//               {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
//             </button>
//           </div>
//         </div>

//         {/* KPI Cards Row */}
//         <div className="grid grid-cols-4 gap-6 mb-6">
//           <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h3 className="text-sm font-medium text-blue-700">Net Cash Today</h3>
//                 <p className="text-2xl font-bold text-gray-800 mt-2">₹ 4,25,78,000</p>
//               </div>
//               <div className="p-2 bg-blue-100 rounded-full">
//                 <DollarSign size={20} className="text-blue-700" />
//               </div>
//             </div>
//             <div className="flex items-center mt-2 text-sm">
//               <ArrowUp size={16} className="text-green-600 mr-1" />
//               <span className="text-green-600 font-medium">3.2% </span>
//               <span className="text-gray-500 ml-1">vs. previous day</span>
//             </div>
//           </div>

//           <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h3 className="text-sm font-medium text-green-700">Cash Runway</h3>
//                 <p className="text-2xl font-bold text-gray-800 mt-2">37 weeks</p>
//               </div>
//               <div className="p-2 bg-green-100 rounded-full">
//                 <Calendar size={20} className="text-green-700" />
//               </div>
//             </div>
//             <div className="flex items-center mt-2 text-sm">
//               <ArrowUp size={16} className="text-green-600 mr-1" />
//               <span className="text-green-600 font-medium">2 weeks </span>
//               <span className="text-gray-500 ml-1">vs. previous month</span>
//             </div>
//           </div>

//           <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h3 className="text-sm font-medium text-amber-700">AR Overdue</h3>
//                 <p className="text-2xl font-bold text-gray-800 mt-2">₹ 73,50,000</p>
//               </div>
//               <div className="p-2 bg-amber-100 rounded-full">
//                 <AlertCircle size={20} className="text-amber-700" />
//               </div>
//             </div>
//             <div className="flex items-center mt-2 text-sm">
//               <ArrowDown size={16} className="text-green-600 mr-1" />
//               <span className="text-green-600 font-medium">8.5% </span>
//               <span className="text-gray-500 ml-1">vs. previous week</span>
//             </div>
//           </div>

//           <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h3 className="text-sm font-medium text-purple-700">AP Due 7 Days</h3>
//                 <p className="text-2xl font-bold text-gray-800 mt-2">₹ 61,45,000</p>
//               </div>
//               <div className="p-2 bg-purple-100 rounded-full">
//                 <Mail size={20} className="text-purple-700" />
//               </div>
//             </div>
//             <div className="flex items-center mt-2 text-sm">
//               <ArrowUp size={16} className="text-red-600 mr-1" />
//               <span className="text-red-600 font-medium">12.3% </span>
//               <span className="text-gray-500 ml-1">vs. previous week</span>
//             </div>
//           </div>
//         </div>

//         {/* Main Content - 3 column layout */}
//         <div className="grid grid-cols-3 gap-6">
//           {/* Left column - Upcoming Payables */}
//           <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
//             <div className="p-4 border-b border-gray-200 bg-gray-50">
//               <h3 className="font-semibold text-gray-800">Upcoming Payables (Next 7 Days)</h3>
//             </div>
            
//             <div className="p-4">
//               <div className="space-y-3">
//                 {upcomingPayables.map((payable) => (
//                   <div key={payable.id} className="bg-blue-50 border border-blue-100 rounded-md p-3">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <p className="text-sm font-medium text-gray-800">{payable.vendor}</p>
//                         <p className="text-xs text-gray-500">{payable.id} • Due in {payable.dueIn} days</p>
//                       </div>
//                       <span className="font-semibold text-blue-600">{formatCurrency(payable.amount)}</span>
//                     </div>
//                     <div className="mt-2 flex justify-end">
//                       <button className="px-3 py-1 bg-white border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-50">
//                         Schedule
//                       </button>
//                       <button className="px-3 py-1 bg-blue-600 border border-blue-600 rounded text-xs text-white hover:bg-blue-700 ml-2">
//                         Pay Now
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Middle column - Waterfall Chart */}
//           <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 overflow-hidden">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="font-semibold text-gray-800">Cash Flow Projection (13 Weeks)</h3>
//               <button className="text-blue-600 text-sm font-medium hover:text-blue-800 flex items-center">
//                 View Full Report
//                 <ChevronRight size={16} className="ml-1" />
//               </button>
//             </div>
            
//             <div className="h-72">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart
//                   data={cashFlowData}
//                   margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                   <XAxis dataKey="week" angle={-45} textAnchor="end" height={60} />
//                   <YAxis 
//                     tickFormatter={(value) => 
//                       new Intl.NumberFormat('en-IN', {
//                         style: 'currency',
//                         currency: 'INR',
//                         notation: 'compact',
//                         maximumFractionDigits: 1
//                       }).format(value)
//                     } 
//                   />
//                   <Tooltip content={<CustomTooltip />} />
//                   <Legend />
//                   <Bar dataKey="inflow" name="Inflow" fill="#10B981" />
//                   <Bar dataKey="outflow" name="Outflow" fill="#EF4444" />
//                   <Bar dataKey="net" name="Net" fill="#3B82F6" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//             <p className="text-sm text-gray-500 mt-4">Click on any bar to view detailed breakdown for that week</p>
//           </div>

//           {/* Right column - Overdue Receivables */}
//           <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
//             <div className="p-4 border-b border-gray-200 bg-gray-50">
//               <h3 className="font-semibold text-gray-800">Alerts & Tasks</h3>
//             </div>
            
//             {/* Overdue Invoices */}
//             <div className="p-4">
//               <h4 className="text-sm font-medium text-gray-700 mb-3">Overdue Receivables (Top 5)</h4>
//               <div className="space-y-3">
//                 {overdueInvoices.map((invoice) => (
//                   <div key={invoice.id} className="bg-red-50 border border-red-100 rounded-md p-3">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <p className="text-sm font-medium text-gray-800">{invoice.client}</p>
//                         <p className="text-xs text-gray-500">{invoice.id} • {invoice.daysOverdue} days overdue</p>
//                       </div>
//                       <span className="font-semibold text-red-600">{formatCurrency(invoice.amount)}</span>
//                     </div>
//                     <div className="mt-2 flex justify-end">
//                       <button className="px-3 py-1 bg-white border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-50">
//                         Mark Paid
//                       </button>
//                       <button className="px-3 py-1 bg-red-600 border border-red-600 rounded text-xs text-white hover:bg-red-700 ml-2">
//                         Send Reminder
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomeComponent;



import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowUp, ArrowDown, RefreshCw, Download, Clock, DollarSign, AlertCircle, Check, Bell, HelpCircle, Settings, ChevronRight, Calendar, Mail, Search } from 'lucide-react';

// Sample data for cash flow waterfall chart
const cashFlowData = [
  { week: 'This Week', inflow: 120000, outflow: -85000, net: 35000 },
  { week: 'Week 2', inflow: 95000, outflow: -110000, net: -15000 },
  { week: 'Week 3', inflow: 130000, outflow: -90000, net: 40000 },
  { week: 'Week 4', inflow: 85000, outflow: -70000, net: 15000 },
  { week: 'Week 5', inflow: 110000, outflow: -95000, net: 15000 },
  { week: 'Week 6', inflow: 75000, outflow: -85000, net: -10000 },
  { week: 'Week 7', inflow: 120000, outflow: -100000, net: 20000 },
  { week: 'Week 8', inflow: 95000, outflow: -90000, net: 5000 },
  { week: 'Week 9', inflow: 110000, outflow: -115000, net: -5000 },
  { week: 'Week 10', inflow: 140000, outflow: -110000, net: 30000 },
  { week: 'Week 11', inflow: 90000, outflow: -80000, net: 10000 },
  { week: 'Week 12', inflow: 105000, outflow: -95000, net: 10000 },
  { week: 'Week 13', inflow: 115000, outflow: -100000, net: 15000 },
];

// Sample data for alerts and tasks
const overdueInvoices = [
  { id: 'INV-2023-421', client: 'TechNova Solutions', amount: 25000, daysOverdue: 15 },
  { id: 'INV-2023-389', client: 'Globex Corporation', amount: 18500, daysOverdue: 12 },
  { id: 'INV-2023-405', client: 'Initech Industries', amount: 12750, daysOverdue: 9 },
  { id: 'INV-2023-412', client: 'Massive Dynamic', amount: 9800, daysOverdue: 7 },
  { id: 'INV-2023-418', client: 'Stark Enterprises', amount: 7500, daysOverdue: 5 },
];

const upcomingPayables = [
  { id: 'PO-2023-187', vendor: 'Office Supplies Inc.', amount: 3200, dueIn: 2 },
  { id: 'PO-2023-192', vendor: 'Cloud Services Ltd.', amount: 15000, dueIn: 3 },
  { id: 'PO-2023-195', vendor: 'Marketing Partners', amount: 8750, dueIn: 4 },
  { id: 'PO-2023-198', vendor: 'IT Infrastructure Co.', amount: 22000, dueIn: 5 },
  { id: 'PO-2023-203', vendor: 'Business Insurance', amount: 12500, dueIn: 7 },
];

const HomeComponent = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const lastRefreshed = "May 7, 2025 - 09:15 AM";
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false);
    }, 3000);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Custom tooltip for the waterfall chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 shadow-lg border border-gray-200 rounded-md">
          <p className="font-semibold">{data.week}</p>
          <p className="text-green-600">{`Inflow: ${formatCurrency(data.inflow)}`}</p>
          <p className="text-red-600">{`Outflow: ${formatCurrency(Math.abs(data.outflow))}`}</p>
          <p className={`font-semibold ${data.net >= 0 ? 'text-green-700' : 'text-red-700'}`}>
            {`Net: ${formatCurrency(data.net)}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col h-screen w-full">
      {/* Header */}
      {/* <header className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-700">FinanceIQ</h1>
            <span className="ml-4 text-gray-500">|</span>
            <h2 className="ml-4 text-lg font-medium">Management Information System</h2>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900">
              <Bell size={20} />
            </button>
            <button className="text-gray-600 hover:text-gray-900">
              <HelpCircle size={20} />
            </button>
            <button className="text-gray-600 hover:text-gray-900">
              <Settings size={20} />
            </button>
            <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
              FD
            </div>
          </div>
        </div>
      </header> */}

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 p-6 overflow-auto">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Financial Snapshot</h2>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-500 flex items-center">
              <Clock size={16} className="mr-1" />
              Last updated: {lastRefreshed}
            </div>
            <button
              className={`flex items-center px-4 py-2 rounded-md border border-gray-300 text-gray-700 ${isRefreshing ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:bg-gray-50'}`}
              onClick={isRefreshing ? null : () => handleRefresh()}
              disabled={isRefreshing}
            >
              <Download size={18} className="mr-2" />
              Download Board Pack
            </button>
            <button
              className={`flex items-center px-4 py-2 rounded-md ${isRefreshing ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
              onClick={isRefreshing ? null : () => handleRefresh()}
              disabled={isRefreshing}
            >
              <RefreshCw size={18} className={`mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
            </button>
          </div>
        </div>

        {/* KPI Cards Row */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-blue-700">Net Cash Today</h3>
                <p className="text-2xl font-bold text-gray-800 mt-2">₹ 4,25,78,000</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <DollarSign size={20} className="text-blue-700" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <ArrowUp size={16} className="text-green-600 mr-1" />
              <span className="text-green-600 font-medium">3.2% </span>
              <span className="text-gray-500 ml-1">vs. previous day</span>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-green-700">Cash Runway</h3>
                <p className="text-2xl font-bold text-gray-800 mt-2">37 weeks</p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <Calendar size={20} className="text-green-700" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <ArrowUp size={16} className="text-green-600 mr-1" />
              <span className="text-green-600 font-medium">2 weeks </span>
              <span className="text-gray-500 ml-1">vs. previous month</span>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-amber-700">AR Overdue</h3>
                <p className="text-2xl font-bold text-gray-800 mt-2">₹ 73,50,000</p>
              </div>
              <div className="p-2 bg-amber-100 rounded-full">
                <AlertCircle size={20} className="text-amber-700" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <ArrowDown size={16} className="text-green-600 mr-1" />
              <span className="text-green-600 font-medium">8.5% </span>
              <span className="text-gray-500 ml-1">vs. previous week</span>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-purple-700">AP Due 7 Days</h3>
                <p className="text-2xl font-bold text-gray-800 mt-2">₹ 61,45,000</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <Mail size={20} className="text-purple-700" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <ArrowUp size={16} className="text-red-600 mr-1" />
              <span className="text-red-600 font-medium">12.3% </span>
              <span className="text-gray-500 ml-1">vs. previous week</span>
            </div>
          </div>
        </div>

        {/* Main Content - 2 column layout */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left side - 2 stacked sections */}
          <div className="col-span-2 space-y-6">
            {/* Cash Flow Projection Chart */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800">Cash Flow Projection (13 Weeks)</h3>
                <button className="text-blue-600 text-sm font-medium hover:text-blue-800 flex items-center">
                  View Full Report
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
              
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={cashFlowData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="week" angle={-45} textAnchor="end" height={60} />
                    <YAxis 
                      tickFormatter={(value) => 
                        new Intl.NumberFormat('en-IN', {
                          style: 'currency',
                          currency: 'INR',
                          notation: 'compact',
                          maximumFractionDigits: 1
                        }).format(value)
                      } 
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="inflow" name="Inflow" fill="#10B981" />
                    <Bar dataKey="outflow" name="Outflow" fill="#EF4444" />
                    <Bar dataKey="net" name="Net" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-gray-500 mt-4">Click on any bar to view detailed breakdown for that week</p>
            </div>
            
            {/* Upcoming Payables Section */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-semibold text-gray-800">Upcoming Payables (Next 7 Days)</h3>
              </div>
              
              <div className="p-4">
                <div className="grid grid-cols-2 gap-3">
                  {upcomingPayables.map((payable) => (
                    <div key={payable.id} className="bg-blue-50 border border-blue-100 rounded-md p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-gray-800">{payable.vendor}</p>
                          <p className="text-xs text-gray-500">{payable.id} • Due in {payable.dueIn} days</p>
                        </div>
                        <span className="font-semibold text-blue-600">{formatCurrency(payable.amount)}</span>
                      </div>
                      <div className="mt-2 flex justify-end">
                        <button className="px-3 py-1 bg-white border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-50">
                          Schedule
                        </button>
                        <button className="px-3 py-1 bg-blue-600 border border-blue-600 rounded text-xs text-white hover:bg-blue-700 ml-2">
                          Pay Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Overdue Receivables */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="font-semibold text-gray-800">Alerts & Tasks</h3>
            </div>
            
            {/* Overdue Invoices */}
            <div className="p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Overdue Receivables (Top 5)</h4>
              <div className="space-y-3">
                {overdueInvoices.map((invoice) => (
                  <div key={invoice.id} className="bg-red-50 border border-red-100 rounded-md p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-800">{invoice.client}</p>
                        <p className="text-xs text-gray-500">{invoice.id} • {invoice.daysOverdue} days overdue</p>
                      </div>
                      <span className="font-semibold text-red-600">{formatCurrency(invoice.amount)}</span>
                    </div>
                    <div className="mt-2 flex justify-end">
                      <button className="px-3 py-1 bg-white border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-50">
                        Mark Paid
                      </button>
                      <button className="px-3 py-1 bg-red-600 border border-red-600 rounded text-xs text-white hover:bg-red-700 ml-2">
                        Send Reminder
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;