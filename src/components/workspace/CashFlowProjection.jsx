import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Filter, Download, X, Search } from 'lucide-react';

// Sample data for cash flow projection
const generateProjectionData = (scenarioType) => {
  const weeks = 26;
  const baseWeeklyData = [
    { inflow: 120000, outflow: -85000 },
    { inflow: 95000, outflow: -110000 },
    { inflow: 130000, outflow: -90000 },
    { inflow: 85000, outflow: -70000 },
    { inflow: 110000, outflow: -95000 },
    { inflow: 75000, outflow: -85000 },
    { inflow: 120000, outflow: -100000 },
    { inflow: 95000, outflow: -90000 },
    { inflow: 110000, outflow: -115000 },
    { inflow: 140000, outflow: -110000 },
    { inflow: 90000, outflow: -80000 },
    { inflow: 105000, outflow: -95000 },
    { inflow: 115000, outflow: -100000 },
  ];

  // Create multipliers based on scenario
  let inflowMultiplier = 1;
  let outflowMultiplier = 1;

  switch (scenarioType) {
    case 'bestCase':
      inflowMultiplier = 1.15;
      outflowMultiplier = 0.95;
      break;
    case 'stress':
      inflowMultiplier = 0.8;
      outflowMultiplier = 1.1;
      break;
    case 'cashflow':
      // Add some randomness to cashflows
      inflowMultiplier = 0.97;
      outflowMultiplier = 1.02;
      break;
    default: // basePlan
      break;
  }

  // Generate full data set
  const result = [];
  const startDate = new Date(2025, 4, 7); // May 7, 2025

  for (let i = 0; i < weeks; i++) {
    const weekDate = new Date(startDate);
    weekDate.setDate(startDate.getDate() + i * 7);
    
    const weekStr = `Week ${i + 1}`;
    const dateStr = weekDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    // Cycle through the base data patterns with some variation
    const baseIndex = i % baseWeeklyData.length;
    const baseData = baseWeeklyData[baseIndex];
    
    // Apply scenario multipliers and some randomness
    const randomFactor = 0.9 + Math.random() * 0.2; // Between 0.9 and 1.1
    const inflow = Math.round(baseData.inflow * inflowMultiplier * randomFactor);
    const outflow = Math.round(baseData.outflow * outflowMultiplier * randomFactor);
    const net = inflow + outflow;
    
    result.push({
      week: weekStr,
      date: dateStr, 
      fullDate: weekDate.toISOString(),
      inflow,
      outflow,
      net,
      cumulative: i > 0 ? result[i-1].cumulative + net : net
    });
  }
  
  return result;
};

// Generate data for different scenarios
const cashflowData = generateProjectionData('cashflow');
const basePlanData = generateProjectionData('basePlan');
const bestCaseData = generateProjectionData('bestCase');
const stressData = generateProjectionData('stress');

// Sample transaction data for the drill-through modal
const sampleTransactions = [
  { id: 'INV-2025-421', type: 'Inflow', entity: 'TechNova Solutions', account: 'Operating Account', amount: 25000, date: 'May 10, 2025', probability: '100%' },
  { id: 'INV-2025-389', type: 'Inflow', entity: 'Globex Corporation', account: 'Operating Account', amount: 18500, date: 'May 12, 2025', probability: '100%' },
  { id: 'PO-2025-187', type: 'Outflow', entity: 'Office Supplies Inc.', account: 'Operating Account', amount: -3200, date: 'May 9, 2025', probability: '100%' },
  { id: 'PO-2025-192', type: 'Outflow', entity: 'Cloud Services Ltd.', account: 'Operating Account', amount: -15000, date: 'May 11, 2025', probability: '100%' },
  { id: 'INV-2025-405', type: 'Inflow', entity: 'Initech Industries', account: 'Savings Account', amount: 12750, date: 'May 14, 2025', probability: '95%' },
  { id: 'PO-2025-195', type: 'Outflow', entity: 'Marketing Partners', account: 'Operating Account', amount: -8750, date: 'May 13, 2025', probability: '100%' },
  { id: 'INV-2025-412', type: 'Inflow', entity: 'Massive Dynamic', account: 'Operating Account', amount: 9800, date: 'May 15, 2025', probability: '90%' },
  { id: 'PO-2025-198', type: 'Outflow', entity: 'IT Infrastructure Co.', account: 'Operating Account', amount: -22000, date: 'May 12, 2025', probability: '100%' },
];

// Filter options
const filterOptions = {
  entities: ['All Entities', 'Parent Company', 'Subsidiary A', 'Subsidiary B', 'Subsidiary C'],
  accounts: ['All Accounts', 'Operating Account', 'Payroll Account', 'Tax Account', 'Savings Account'],
  customers: ['All Customers', 'TechNova Solutions', 'Globex Corporation', 'Initech Industries', 'Massive Dynamic', 'Stark Enterprises'],
  vendors: ['All Vendors', 'Office Supplies Inc.', 'Cloud Services Ltd.', 'Marketing Partners', 'IT Infrastructure Co.', 'Business Insurance']
};

const CashFlowProjection = () => {
  const [visibleWeeks, setVisibleWeeks] = useState(13);
  const [startWeek, setStartWeek] = useState(0);
  const [selectedScenario, setSelectedScenario] = useState('basePlan');
  const [comparingScenario, setComparingScenario] = useState(null);
  const [cashBuffer, setCashBuffer] = useState(200000);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [selectedWeekTransactions, setSelectedWeekTransactions] = useState(null);
  const [filters, setFilters] = useState({
    entity: 'All Entities',
    account: 'All Accounts',
    customer: 'All Customers',
    vendor: 'All Vendors'
  });

  // Function to get the appropriate data based on selected scenario
  const getScenarioData = (scenario) => {
    switch(scenario) {
      case 'cashflow':
        return cashflowData;
      case 'bestCase':
        return bestCaseData;
      case 'stress':
        return stressData;
      default:
        return basePlanData;
    }
  };

  // Current data to display
  const currentData = getScenarioData(selectedScenario);
  
  // Comparison data if any
  const comparisonData = comparingScenario ? getScenarioData(comparingScenario) : null;
  
  // Visible data slice based on range settings
  const visibleData = currentData.slice(startWeek, startWeek + visibleWeeks);

  // Handle bar click for drill-through
  const handleBarClick = (data) => {
    setSelectedWeekTransactions(data);
    setShowTransactionModal(true);
  };

  // Format currency
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
          <p className="font-semibold">{data.week} ({data.date})</p>
          <p className="text-green-600">{`Inflow: ${formatCurrency(data.inflow)}`}</p>
          <p className="text-red-600">{`Outflow: ${formatCurrency(Math.abs(data.outflow))}`}</p>
          <p className={`font-semibold ${data.net >= 0 ? 'text-green-700' : 'text-red-700'}`}>
            {`Net: ${formatCurrency(data.net)}`}
          </p>
          <p className="mt-2 text-blue-700 font-medium">{`Cumulative: ${formatCurrency(data.cumulative)}`}</p>
          <p className="text-sm text-gray-500 mt-2">Click for transaction details</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col h-screen w-full">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h2 className="text-2xl font-semibold  ">Cash-Flow Projection</h2>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 p-6 overflow-hidden flex flex-col relative">
        {/* Controls Row */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-gray-800 mr-2">Scenario:</h3>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium ${selectedScenario === 'cashflow' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setSelectedScenario('cashflow')}
            >
              cashflow
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium ${selectedScenario === 'basePlan' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setSelectedScenario('basePlan')}
            >
              Base Plan
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium ${selectedScenario === 'bestCase' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setSelectedScenario('bestCase')}
            >
              Best Case
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium ${selectedScenario === 'stress' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setSelectedScenario('stress')}
            >
              Stress
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <h3 className="font-semibold text-gray-800">Compare To:</h3>
            <select 
              className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
              value={comparingScenario || ''}
              onChange={(e) => setComparingScenario(e.target.value || null)}
            >
              <option value="">None</option>
              {selectedScenario !== 'cashflow' && <option value="cashflow">cashflow</option>}
              {selectedScenario !== 'basePlan' && <option value="basePlan">Base Plan</option>}
              {selectedScenario !== 'bestCase' && <option value="bestCase">Best Case</option>}
              {selectedScenario !== 'stress' && <option value="stress">Stress</option>}
            </select>

            <button
              className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              onClick={() => setShowFilterDrawer(true)}
            >
              <Filter size={16} className="mr-2" />
              Filters
            </button>
          </div>
        </div>

        {/* Date Range Selector */}
        <div className="flex justify-between items-center mb-4 bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <label className="text-sm font-medium text-gray-700 mr-3">Range:</label>
            <select
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              value={visibleWeeks}
              onChange={(e) => setVisibleWeeks(parseInt(e.target.value))}
            >
              <option value="4">4 Weeks</option>
              <option value="8">8 Weeks</option>
              <option value="13">13 Weeks</option>
              <option value="26">26 Weeks</option>
            </select>
          </div>
          
          <div className="w-1/2">
            <input 
              type="range" 
              min="0" 
              max={26 - visibleWeeks} 
              value={startWeek}
              onChange={(e) => setStartWeek(parseInt(e.target.value))}
              className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>May 7, 2025</span>
              <span>Nov 5, 2025</span>
            </div>
          </div>
          
          <div className="flex items-center">
            <label className="text-sm font-medium text-gray-700 mr-3">Cash Buffer (₹):</label>
            <input
              type="text"
              value={formatCurrency(cashBuffer).replace('₹', '')}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                setCashBuffer(value ? parseInt(value) : 0);
              }}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm w-32"
            />
          </div>
        </div>

        {/* Main Chart */}
        <div className="flex-1 bg-white rounded-lg border border-gray-200 shadow-sm p-6 overflow-hidden">
          <div className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={visibleData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }} // Increased bottom margin to make room for legend
                onClick={handleBarClick}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  angle={0} 
                  tickMargin={20}
                  label={{ value: 'Week Starting', position: 'insideBottom', offset: -35 }}
                />
                <YAxis 
                  tickFormatter={(value) => 
                    new Intl.NumberFormat('en-IN', {
                      style: 'currency',
                      currency: 'INR',
                      notation: 'compact',
                      maximumFractionDigits: 1
                    }).format(value)
                  } 
                  label={{ value: 'Amount (₹)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip content={<CustomTooltip />} />
                {/* Updated Legend with proper spacing */}
                <Legend 
                  verticalAlign="bottom" 
                  align="center"
                  wrapperStyle={{ 
                    paddingTop: 40,
                    marginTop: 10,
                    marginLeft:30
                  }}
                />
                <Bar dataKey="inflow" name="Inflow" fill="#10B981" cursor="pointer" />
                <Bar dataKey="outflow" name="Outflow" fill="#EF4444" cursor="pointer" />
                <Bar dataKey="net" name="Net" fill="#3B82F6" cursor="pointer" />
                
                {/* Cash buffer reference line */}
                <ReferenceLine y={cashBuffer} stroke="#FCD34D" strokeWidth={2} strokeDasharray="5 5" />
                
                {/* Comparison series if selected */}
                {comparisonData && (
                  <Bar 
                    dataKey="net" 
                    data={comparisonData.slice(startWeek, startWeek + visibleWeeks)} 
                    name={`${comparingScenario.charAt(0).toUpperCase() + comparingScenario.slice(1)} Net`} 
                    fill="#9CA3AF" 
                    fillOpacity={0.4} 
                  />
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Filter Drawer (Slide-in panel) */}
        <div className={`fixed inset-y-0 right-0 w-80 bg-white shadow-lg transform ${showFilterDrawer ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50 overflow-y-auto`}>
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">Filters</h3>
            <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowFilterDrawer(false)}>
              <X size={20} />
            </button>
          </div>
          
          <div className="p-4">
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Entity</h4>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={filters.entity}
                onChange={(e) => setFilters({...filters, entity: e.target.value})}
              >
                {filterOptions.entities.map(entity => (
                  <option key={entity} value={entity}>{entity}</option>
                ))}
              </select>
            </div>
            
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Bank Account</h4>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={filters.account}
                onChange={(e) => setFilters({...filters, account: e.target.value})}
              >
                {filterOptions.accounts.map(account => (
                  <option key={account} value={account}>{account}</option>
                ))}
              </select>
            </div>
            
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Customer</h4>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={filters.customer}
                onChange={(e) => setFilters({...filters, customer: e.target.value})}
              >
                {filterOptions.customers.map(customer => (
                  <option key={customer} value={customer}>{customer}</option>
                ))}
              </select>
            </div>
            
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Vendor</h4>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={filters.vendor}
                onChange={(e) => setFilters({...filters, vendor: e.target.value})}
              >
                {filterOptions.vendors.map(vendor => (
                  <option key={vendor} value={vendor}>{vendor}</option>
                ))}
              </select>
            </div>
            
            <div className="flex space-x-3 mt-8">
              <button 
                className="flex-1 px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200"
                onClick={() => setFilters({
                  entity: 'All Entities',
                  account: 'All Accounts',
                  customer: 'All Customers',
                  vendor: 'All Vendors'
                })}
              >
                Reset
              </button>
              <button 
                className="flex-1 px-4 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700"
                onClick={() => setShowFilterDrawer(false)}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
        
        {/* Transaction Modal */}
        {showTransactionModal && selectedWeekTransactions && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-4/5 max-h-4/5 flex flex-col overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">
                  Transactions for {selectedWeekTransactions.week} ({selectedWeekTransactions.date})
                </h3>
                <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowTransactionModal(false)}>
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-4 flex justify-between items-center border-b border-gray-200 bg-gray-50">
                <div>
                  <span className="text-sm text-gray-500 mr-4">Total Inflow: <span className="text-green-600 font-medium">{formatCurrency(selectedWeekTransactions.inflow)}</span></span>
                  <span className="text-sm text-gray-500 mr-4">Total Outflow: <span className="text-red-600 font-medium">{formatCurrency(Math.abs(selectedWeekTransactions.outflow))}</span></span>
                  <span className="text-sm text-gray-500">Net: <span className={`font-medium ${selectedWeekTransactions.net >= 0 ? 'text-green-600' : 'text-red-600'}`}>{formatCurrency(selectedWeekTransactions.net)}</span></span>
                </div>
                
                <div className="flex items-center">
                  <div className="relative mr-4">
                    <input 
                      type="text" 
                      placeholder="Search transactions..." 
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                  </div>
                  <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                    <Download size={16} className="mr-2" />
                    Export CSV
                  </button>
                </div>
              </div>
              
              <div className="overflow-auto flex-1 p-4">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Entity
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Account
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Probability
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sampleTransactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                          {transaction.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${transaction.type === 'Inflow' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {transaction.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.entity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.account}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <span className={transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}>
                            {formatCurrency(Math.abs(transaction.amount))}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.probability}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="p-4 border-t border-gray-200 flex justify-end">
                <button 
                  className="px-4 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700"
                  onClick={() => setShowTransactionModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CashFlowProjection;