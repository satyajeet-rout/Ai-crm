import React, { useState, useEffect } from 'react';
import { ChevronDown, Filter, Download, Mail, Check, Settings, ChevronUp, X, MoreHorizontal } from 'lucide-react';

export default function ARAPAgingScreen() {
  // Tab state management
  const [activeTab, setActiveTab] = useState('ar');
  
  // Selected rows state
  const [selectedRows, setSelectedRows] = useState([]);
  
  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useState({
    company: true,
    contact: true,
    total: true,
    '0-30': true,
    '31-60': true,
    '61-90': true,
    '90+': true,
    lastPayment: true,
    nextAction: true
  });
  
  // Sample data for AR and AP
  const [data, setData] = useState({
    ar: [
      { id: 1, company: 'Acme Corp', contact: 'John Smith', total: 24500, '0-30': 12000, '31-60': 8500, '61-90': 3000, '90+': 1000, lastPayment: '2025-04-10', nextAction: 'Follow-up call' },
      { id: 2, company: 'Globex Inc', contact: 'Jane Doe', total: 18700, '0-30': 5000, '31-60': 2700, '61-90': 0, '90+': 11000, lastPayment: '2025-03-22', nextAction: 'Email reminder' },
      { id: 3, company: 'Initech LLC', contact: 'Michael Bolton', total: 9300, '0-30': 9300, '31-60': 0, '61-90': 0, '90+': 0, lastPayment: '2025-04-28', nextAction: 'None' },
      { id: 4, company: 'Massive Dynamic', contact: 'Walter Bishop', total: 42800, '0-30': 15000, '31-60': 15800, '61-90': 12000, '90+': 0, lastPayment: '2025-03-15', nextAction: 'Call finance team' },
      { id: 5, company: 'Stark Industries', contact: 'Tony Stark', total: 67500, '0-30': 0, '31-60': 0, '61-90': 22500, '90+': 45000, lastPayment: '2025-01-05', nextAction: 'Escalate to legal' }
    ],
    ap: [
      { id: 1, company: 'Wayne Enterprises', contact: 'Bruce Wayne', total: 18500, '0-30': 18500, '31-60': 0, '61-90': 0, '90+': 0, lastPayment: '2025-04-25', nextAction: 'Scheduled payment' },
      { id: 2, company: 'LexCorp', contact: 'Lex Luthor', total: 33400, '0-30': 12400, '31-60': 21000, '61-90': 0, '90+': 0, lastPayment: '2025-03-18', nextAction: 'Review invoice' },
      { id: 3, company: 'Umbrella Corp', contact: 'Albert Wesker', total: 15700, '0-30': 5700, '31-60': 0, '61-90': 0, '90+': 10000, lastPayment: '2025-01-10', nextAction: 'Dispute charge' },
      { id: 4, company: 'Aperture Science', contact: 'Cave Johnson', total: 8900, '0-30': 8900, '31-60': 0, '61-90': 0, '90+': 0, lastPayment: '2025-04-22', nextAction: 'None' },
      { id: 5, company: 'Oscorp', contact: 'Norman Osborn', total: 27600, '0-30': 7600, '31-60': 10000, '61-90': 10000, '90+': 0, lastPayment: '2025-02-28', nextAction: 'Request discount' }
    ]
  });
  
  // Sample metrics
  const metrics = {
    ar: { current: 42, previous: 47, delta: -5 },
    ap: { current: 35, previous: 30, delta: 5 }
  };
  
  // Selected cell for filtering
  const [selectedCell, setSelectedCell] = useState(null);
  
  // Filter data based on selected cell
  const filteredData = selectedCell 
    ? data[activeTab].filter(row => row[selectedCell.column] > 0) 
    : data[activeTab];
  
  // Toggle row selection
  const toggleRowSelection = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };
  
  // Toggle select all rows
  const toggleSelectAll = () => {
    if (selectedRows.length === filteredData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredData.map(row => row.id));
    }
  };
  
  // Toggle column visibility
  const toggleColumn = (column) => {
    setVisibleColumns({
      ...visibleColumns,
      [column]: !visibleColumns[column]
    });
  };
  
  // Save column configuration
  const saveColumnConfig = () => {
    // In a real app, this would save to local storage or backend
    alert('Column configuration saved!');
  };
  
  // Reset column configuration to default
  const resetColumnConfig = () => {
    setVisibleColumns({
      company: true,
      contact: true,
      total: true,
      '0-30': true,
      '31-60': true,
      '61-90': true,
      '90+': true,
      lastPayment: true,
      nextAction: true
    });
  };
  
  // Get color for heatmap cell
  const getCellColor = (value, column) => {
    if (!value || value === 0 || !['0-30', '31-60', '61-90', '90+'].includes(column)) return 'bg-white';
    
    // Different color intensities based on age
    if (column === '0-30') {
      if (value < 5000) return 'bg-blue-50';
      if (value < 10000) return 'bg-blue-100';
      return 'bg-blue-200';
    }
    else if (column === '31-60') {
      if (value < 5000) return 'bg-yellow-50';
      if (value < 10000) return 'bg-yellow-100';
      return 'bg-yellow-200';
    }
    else if (column === '61-90') {
      if (value < 5000) return 'bg-orange-50';
      if (value < 10000) return 'bg-orange-100';
      return 'bg-orange-200';
    }
    else if (column === '90+') {
      if (value < 5000) return 'bg-red-50';
      if (value < 10000) return 'bg-red-100';
      return 'bg-red-200';
    }
    
    return 'bg-white';
  };
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };
  
  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Column headers
  const columns = [
    { id: 'company', label: 'Company Name' },
    { id: 'contact', label: 'Contact' },
    { id: 'total', label: 'Total Outstanding' },
    { id: '0-30', label: '0-30 Days' },
    { id: '31-60', label: '31-60 Days' },
    { id: '61-90', label: '61-90 Days' },
    { id: '90+', label: '90+ Days' },
    { id: 'lastPayment', label: 'Last Payment' },
    { id: 'nextAction', label: 'Next Action' }
  ];
  
  // Toggle cell selection for filtering
  const toggleCellSelection = (row, column) => {
    if (selectedCell && selectedCell.rowId === row.id && selectedCell.column === column) {
      setSelectedCell(null);
    } else {
      setSelectedCell({ rowId: row.id, column });
    }
  };
  
  // Clear filter
  const clearFilter = () => {
    setSelectedCell(null);
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-800">Aging Analysis</h1>
        <p className="text-gray-500 text-sm">Track and manage your receivables and payables</p>
      </div>
      
      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex px-6">
          <button
            className={`py-4 px-6 text-sm font-medium relative ${
              activeTab === 'ar' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('ar')}
          >
            Accounts Receivable (AR)
            {activeTab === 'ar' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
            )}
          </button>
          <button
            className={`py-4 px-6 text-sm font-medium relative ${
              activeTab === 'ap' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('ap')}
          >
            Accounts Payable (AP)
            {activeTab === 'ap' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
            )}
          </button>
        </div>
      </div>
      
      {/* Summary Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <div className="bg-gray-100 rounded-lg p-3">
              <span className="text-sm font-medium text-gray-500">
                {activeTab === 'ar' ? 'DSO' : 'DPO'}
              </span>
              <div className="text-2xl font-bold text-gray-800">
                {metrics[activeTab].current}
                <span className="text-sm ml-1">days</span>
              </div>
            </div>
            <div className="ml-2">
              <div className={`flex items-center text-sm ${
                (activeTab === 'ar' && metrics[activeTab].delta < 0) || 
                (activeTab === 'ap' && metrics[activeTab].delta > 0) 
                  ? 'text-green-600' 
                  : 'text-red-600'
              }`}>
                {(activeTab === 'ar' && metrics[activeTab].delta < 0) || 
                 (activeTab === 'ap' && metrics[activeTab].delta > 0) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronUp className="h-4 w-4" />
                )}
                <span>{Math.abs(metrics[activeTab].delta)} days</span>
              </div>
              <div className="text-xs text-gray-500">vs. last month</div>
            </div>
          </div>
          
          <div className="h-10 border-l border-gray-200"></div>
          
          <div className="flex items-center">
            <div className="text-sm font-medium text-gray-800">
              {activeTab === 'ar' ? 'Total Receivables:' : 'Total Payables:'} 
              <span className="ml-2 font-bold">
                {formatCurrency(data[activeTab].reduce((sum, row) => sum + row.total, 0))}
              </span>
            </div>
          </div>
          
          {selectedCell && (
            <>
              <div className="h-10 border-l border-gray-200"></div>
              <div className="flex items-center">
                <div className="bg-blue-50 text-blue-800 rounded-md px-3 py-1 text-sm flex items-center">
                  <Filter className="h-3 w-3 mr-1" />
                  <span>
                    Filtered by {selectedCell.column} days
                  </span>
                  <button 
                    className="ml-2 text-blue-500 hover:text-blue-700"
                    onClick={clearFilter}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Table Controls */}
      <div className="bg-white border-b border-gray-200 px-6 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <div className="flex items-center mr-4">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              checked={selectedRows.length === filteredData.length && filteredData.length > 0}
              onChange={toggleSelectAll}
            />
            <span className="ml-2 text-sm text-gray-700">
              {selectedRows.length} selected
            </span>
          </div>
          
          <div className="relative">
            <button 
              className="flex items-center space-x-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md px-3 py-1.5 hover:bg-gray-50"
            >
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>
          
          <div className="ml-2 relative">
            <button 
              className="flex items-center space-x-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md px-3 py-1.5 hover:bg-gray-50"
              onClick={() => document.getElementById('columnCustomizer').classList.toggle('hidden')}
            >
              <Settings className="h-4 w-4" />
              <span>Columns</span>
            </button>
            
            {/* Column Customizer Dropdown */}
            <div id="columnCustomizer" className="hidden absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <div className="p-3 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-700">Customize Columns</h3>
                  <button onClick={() => document.getElementById('columnCustomizer').classList.add('hidden')}>
                    <X className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </div>
              <div className="p-3 max-h-60 overflow-y-auto">
                {columns.map(column => (
                  <div key={column.id} className="flex items-center py-1">
                    <input
                      type="checkbox"
                      id={`col-${column.id}`}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      checked={visibleColumns[column.id]}
                      onChange={() => toggleColumn(column.id)}
                    />
                    <label htmlFor={`col-${column.id}`} className="ml-2 text-sm text-gray-700">
                      {column.label}
                    </label>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-gray-200 flex justify-between">
                <button 
                  className="text-sm text-gray-700 hover:text-gray-900"
                  onClick={resetColumnConfig}
                >
                  Reset to Default
                </button>
                <button 
                  className="text-sm bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                  onClick={saveColumnConfig}
                >
                  Save View
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <button className="text-sm text-gray-700 bg-white border border-gray-300 rounded-md px-3 py-1.5 hover:bg-gray-50">
            Export CSV
          </button>
        </div>
      </div>
      
      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  checked={selectedRows.length === filteredData.length && filteredData.length > 0}
                  onChange={toggleSelectAll}
                />
              </th>
              {columns.map(column => (
                visibleColumns[column.id] && (
                  <th 
                    key={column.id}
                    scope="col" 
                    className={`px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                      ['0-30', '31-60', '61-90', '90+', 'total'].includes(column.id) ? 'text-right' : ''
                    }`}
                  >
                    {column.label}
                  </th>
                )
              ))}
              <th scope="col" className="relative px-3 py-3 w-10">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map(row => (
              <tr 
                key={row.id} 
                className={selectedRows.includes(row.id) ? 'bg-blue-50' : 'hover:bg-gray-50'}
              >
                <td className="px-3 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => toggleRowSelection(row.id)}
                  />
                </td>
                {visibleColumns.company && (
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{row.company}</div>
                  </td>
                )}
                {visibleColumns.contact && (
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    {row.contact}
                  </td>
                )}
                {visibleColumns.total && (
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                    {formatCurrency(row.total)}
                  </td>
                )}
                {visibleColumns['0-30'] && (
                  <td 
                    className={`px-3 py-4 whitespace-nowrap text-sm text-right cursor-pointer ${getCellColor(row['0-30'], '0-30')} ${
                      selectedCell && selectedCell.rowId === row.id && selectedCell.column === '0-30' 
                        ? 'ring-2 ring-blue-500' 
                        : ''
                    }`}
                    onClick={() => toggleCellSelection(row, '0-30')}
                  >
                    {row['0-30'] > 0 ? formatCurrency(row['0-30']) : '-'}
                  </td>
                )}
                {visibleColumns['31-60'] && (
                  <td 
                    className={`px-3 py-4 whitespace-nowrap text-sm text-right cursor-pointer ${getCellColor(row['31-60'], '31-60')} ${
                      selectedCell && selectedCell.rowId === row.id && selectedCell.column === '31-60' 
                        ? 'ring-2 ring-blue-500' 
                        : ''
                    }`}
                    onClick={() => toggleCellSelection(row, '31-60')}
                  >
                    {row['31-60'] > 0 ? formatCurrency(row['31-60']) : '-'}
                  </td>
                )}
                {visibleColumns['61-90'] && (
                  <td 
                    className={`px-3 py-4 whitespace-nowrap text-sm text-right cursor-pointer ${getCellColor(row['61-90'], '61-90')} ${
                      selectedCell && selectedCell.rowId === row.id && selectedCell.column === '61-90' 
                        ? 'ring-2 ring-blue-500' 
                        : ''
                    }`}
                    onClick={() => toggleCellSelection(row, '61-90')}
                  >
                    {row['61-90'] > 0 ? formatCurrency(row['61-90']) : '-'}
                  </td>
                )}
                {visibleColumns['90+'] && (
                  <td 
                    className={`px-3 py-4 whitespace-nowrap text-sm text-right cursor-pointer ${getCellColor(row['90+'], '90+')} ${
                      selectedCell && selectedCell.rowId === row.id && selectedCell.column === '90+' 
                        ? 'ring-2 ring-blue-500' 
                        : ''
                    }`}
                    onClick={() => toggleCellSelection(row, '90+')}
                  >
                    {row['90+'] > 0 ? formatCurrency(row['90+']) : '-'}
                  </td>
                )}
                {visibleColumns.lastPayment && (
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(row.lastPayment)}
                  </td>
                )}
                {visibleColumns.nextAction && (
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    {row.nextAction}
                  </td>
                )}
                <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-gray-400 hover:text-gray-700">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Bulk Action Footer */}
      {selectedRows.length > 0 && (
        <div className="bg-blue-50 border-t border-blue-200 px-6 py-3 flex items-center justify-between">
          <div className="text-sm text-blue-800 font-medium">
            {selectedRows.length} {activeTab === 'ar' ? 'customers' : 'vendors'} selected
          </div>
          <div className="flex space-x-3">
            <button className="inline-flex items-center text-sm text-blue-700 bg-white border border-blue-300 rounded-md px-3 py-1.5 hover:bg-blue-50">
              <Mail className="h-4 w-4 mr-1" />
              <span>Email Reminder</span>
            </button>
            <button className="inline-flex items-center text-sm text-blue-700 bg-white border border-blue-300 rounded-md px-3 py-1.5 hover:bg-blue-50">
              <Download className="h-4 w-4 mr-1" />
              <span>Download SOA</span>
            </button>
            <button className="inline-flex items-center text-sm text-white bg-blue-600 border border-blue-600 rounded-md px-3 py-1.5 hover:bg-blue-700">
              <Check className="h-4 w-4 mr-1" />
              <span>Mark Paid</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}