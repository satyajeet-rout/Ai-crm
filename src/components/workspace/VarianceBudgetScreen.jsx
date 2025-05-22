import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, Settings, MessageSquare, Download, RefreshCw, X, Save, Filter, Search } from 'lucide-react';

export default function VarianceBudgetScreen() {
  // State for the tree data structure
  const [treeData, setTreeData] = useState([]);
  
  // State for expanded rows
  const [expandedRows, setExpandedRows] = useState({});
  
  // State for selected cell (for commentary)
  const [selectedCell, setSelectedCell] = useState(null);
  
  // State for commentary text
  const [commentText, setCommentText] = useState('');
  
  // State for budget version
  const [budgetVersion, setBudgetVersion] = useState('Budget V1');
  
  // State for variance threshold settings
  const [varianceThreshold, setVarianceThreshold] = useState(5);
  
  // State for settings panel
  const [showSettings, setShowSettings] = useState(false);
  
  // State for loading
  const [loading, setLoading] = useState(false);
  
  // State for search term
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample budget versions
  const budgetVersions = [
    { id: 'budget-v1', name: 'Budget V1' },
    { id: 'reforecast-q1', name: 'Re-forecast Q1' },
    { id: 'reforecast-q2', name: 'Re-forecast Q2' },
    { id: 'reforecast-q3', name: 'Re-forecast Q3' },
    { id: 'working-v2', name: 'Working Budget V2' },
  ];
  
  // Sample data structure
  const fetchData = (version) => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      const data = [
        {
          id: 'revenue',
          name: 'Revenue',
          level: 0,
          actual: 5840000,
          budget: 5500000,
          variance: 340000,
          variancePct: 6.18,
          hasComment: version === 'Re-forecast Q2',
          comment: version === 'Re-forecast Q2' ? 'Higher than expected sales in APAC region due to new enterprise deals.' : '',
          children: [
            {
              id: 'revenue-product-a',
              name: 'Product Line A',
              level: 1,
              actual: 3250000,
              budget: 3000000,
              variance: 250000,
              variancePct: 8.33,
              hasComment: false,
              comment: '',
              children: [
                {
                  id: 'revenue-product-a-sku1',
                  name: 'SKU A-1',
                  level: 2,
                  actual: 1850000,
                  budget: 1700000,
                  variance: 150000,
                  variancePct: 8.82,
                  hasComment: false,
                  comment: '',
                  children: []
                },
                {
                  id: 'revenue-product-a-sku2',
                  name: 'SKU A-2',
                  level: 2,
                  actual: 1400000,
                  budget: 1300000,
                  variance: 100000,
                  variancePct: 7.69,
                  hasComment: false,
                  comment: '',
                  children: []
                }
              ]
            },
            {
              id: 'revenue-product-b',
              name: 'Product Line B',
              level: 1,
              actual: 2590000,
              budget: 2500000,
              variance: 90000,
              variancePct: 3.60,
              hasComment: false,
              comment: '',
              children: [
                {
                  id: 'revenue-product-b-sku1',
                  name: 'SKU B-1',
                  level: 2,
                  actual: 1340000,
                  budget: 1400000,
                  variance: -60000,
                  variancePct: -4.29,
                  hasComment: version === 'Budget V1',
                  comment: version === 'Budget V1' ? 'Supply chain issues delayed Q2 shipments to major distributors.' : '',
                  children: []
                },
                {
                  id: 'revenue-product-b-sku2',
                  name: 'SKU B-2',
                  level: 2,
                  actual: 1250000,
                  budget: 1100000,
                  variance: 150000,
                  variancePct: 13.64,
                  hasComment: false,
                  comment: '',
                  children: []
                }
              ]
            }
          ]
        },
        {
          id: 'cogs',
          name: 'Cost of Goods Sold',
          level: 0,
          actual: 2320000,
          budget: 2200000,
          variance: -120000,
          variancePct: -5.45,
          hasComment: false,
          comment: '',
          children: [
            {
              id: 'cogs-materials',
              name: 'Materials',
              level: 1,
              actual: 1250000,
              budget: 1150000,
              variance: -100000,
              variancePct: -8.70,
              hasComment: version === 'Re-forecast Q1',
              comment: version === 'Re-forecast Q1' ? 'Raw material costs increased due to global supply chain disruptions.' : '',
              children: []
            },
            {
              id: 'cogs-labor',
              name: 'Direct Labor',
              level: 1,
              actual: 730000,
              budget: 750000,
              variance: 20000,
              variancePct: 2.67,
              hasComment: false,
              comment: '',
              children: []
            },
            {
              id: 'cogs-overhead',
              name: 'Manufacturing Overhead',
              level: 1,
              actual: 340000,
              budget: 300000,
              variance: -40000,
              variancePct: -13.33,
              hasComment: false,
              comment: '',
              children: []
            }
          ]
        },
        {
          id: 'opex',
          name: 'Operating Expenses',
          level: 0,
          actual: 2150000,
          budget: 2000000,
          variance: -150000,
          variancePct: -7.50,
          hasComment: version === 'Budget V1',
          comment: version === 'Budget V1' ? 'Increased spending on marketing campaigns and new employee benefits.' : '',
          children: [
            {
              id: 'opex-sm',
              name: 'Sales & Marketing',
              level: 1,
              actual: 1250000,
              budget: 1100000,
              variance: -150000,
              variancePct: -13.64,
              hasComment: false,
              comment: '',
              children: [
                {
                  id: 'opex-sm-ads',
                  name: 'Advertising',
                  level: 2,
                  actual: 580000,
                  budget: 500000,
                  variance: -80000,
                  variancePct: -16.00,
                  hasComment: true,
                  comment: 'Increased spending on digital campaigns and added TV spots for Q2 product launch.',
                  children: []
                },
                {
                  id: 'opex-sm-travel',
                  name: 'Travel & Entertainment',
                  level: 2,
                  actual: 320000,
                  budget: 300000,
                  variance: -20000,
                  variancePct: -6.67,
                  hasComment: false,
                  comment: '',
                  children: []
                },
                {
                  id: 'opex-sm-salaries',
                  name: 'Salaries',
                  level: 2,
                  actual: 350000,
                  budget: 300000,
                  variance: -50000,
                  variancePct: -16.67,
                  hasComment: false,
                  comment: '',
                  children: []
                }
              ]
            },
            {
              id: 'opex-rnd',
              name: 'Research & Development',
              level: 1,
              actual: 550000,
              budget: 580000,
              variance: 30000,
              variancePct: 5.17,
              hasComment: false,
              comment: '',
              children: []
            },
            {
              id: 'opex-ga',
              name: 'General & Administrative',
              level: 1,
              actual: 350000,
              budget: 320000,
              variance: -30000,
              variancePct: -9.38,
              hasComment: false,
              comment: '',
              children: []
            }
          ]
        }
      ];
      
      // Set initial expanded state
      const expanded = {};
      data.forEach(item => {
        expanded[item.id] = true; // First level expanded by default
      });
      
      setExpandedRows(expanded);
      setTreeData(data);
      setLoading(false);
    }, 800);
  };
  
  // Fetch data on mount and when budget version changes
  useEffect(() => {
    fetchData(budgetVersion);
  }, [budgetVersion]);
  
  // Toggle row expansion
  const toggleRowExpand = (id) => {
    setExpandedRows({
      ...expandedRows,
      [id]: !expandedRows[id]
    });
  };
  
  // Handle selecting a variance cell for commenting
  const selectVarianceCell = (item) => {
    setSelectedCell(item);
    setCommentText(item.comment || '');
  };
  
  // Save comment
  const saveComment = () => {
    // In a real app, this would save to the database
    // For this demo, we'll update the state directly
    const updateItemComment = (items) => {
      return items.map(item => {
        if (item.id === selectedCell.id) {
          return {
            ...item,
            comment: commentText,
            hasComment: commentText.trim() !== ''
          };
        } else if (item.children && item.children.length > 0) {
          return {
            ...item,
            children: updateItemComment(item.children)
          };
        }
        return item;
      });
    };
    
    setTreeData(updateItemComment(treeData));
    setSelectedCell(null);
  };
  
  // Cancel comment editing
  const cancelComment = () => {
    setSelectedCell(null);
    setCommentText('');
  };
  
  // Update variance threshold
  const updateVarianceThreshold = (value) => {
    setVarianceThreshold(parseFloat(value));
  };
  
  // Get color class based on variance percentage and threshold
  const getVarianceColorClass = (variancePct) => {
    if (variancePct > varianceThreshold) {
      return 'bg-green-50 text-green-700';
    } else if (variancePct < -varianceThreshold) {
      return 'bg-red-50 text-red-700';
    }
    return '';
  };
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Format percentage
  const formatPercentage = (percentage) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(percentage / 100);
  };
  
  // Handle export to PowerPoint
  const exportToPowerPoint = () => {
    // In a real app, this would call an API endpoint
    alert('Generating PowerPoint with top 10 variances...');
  };
  
  // Render tree rows recursively
  const renderTreeRows = (items, parentId = null) => {
    return items.map(item => {
      const hasChildren = item.children && item.children.length > 0;
      const isExpanded = expandedRows[item.id] || false;
      const filteredBySearch = searchTerm === '' || item.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Skip if filtered out by search, unless any child matches
      let anyChildMatches = false;
      if (hasChildren && !filteredBySearch) {
        anyChildMatches = item.children.some(child => 
          child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          hasChildMatch(child)
        );
      }
      
      if (!filteredBySearch && !anyChildMatches) {
        return null;
      }
      
      return (
        <React.Fragment key={item.id}>
          <tr className={`${item.level > 0 ? 'border-t border-gray-100' : 'border-t border-gray-200'} ${filteredBySearch ? '' : 'opacity-50'}`}>
            <td className="px-4 py-3 whitespace-nowrap">
              <div className="flex items-center" style={{ paddingLeft: `${item.level * 20}px` }}>
                {hasChildren ? (
                  <button 
                    className="mr-1 focus:outline-none text-gray-500 hover:text-gray-700"
                    onClick={() => toggleRowExpand(item.id)}
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                ) : (
                  <div className="w-5"></div>
                )}
                <span className={`text-sm ${item.level === 0 ? 'font-medium' : ''}`}>{item.name}</span>
              </div>
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
              {formatCurrency(item.actual)}
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
              {formatCurrency(item.budget)}
            </td>
            <td 
              className={`px-4 py-3 whitespace-nowrap text-sm text-right ${getVarianceColorClass(item.variancePct)} relative cursor-pointer`}
              onClick={() => selectVarianceCell(item)}
            >
              {formatCurrency(item.variance)}
              {item.hasComment && (
                <div className="absolute w-3 h-3 top-0 right-0 bg-blue-500"></div>
              )}
            </td>
            <td 
              className={`px-4 py-3 whitespace-nowrap text-sm text-right ${getVarianceColorClass(item.variancePct)} relative`}
            >
              {formatPercentage(item.variancePct)}
            </td>
          </tr>
          {hasChildren && isExpanded && renderTreeRows(item.children, item.id)}
        </React.Fragment>
      );
    }).filter(Boolean); // Filter out null rows (filtered by search)
  };
  
  // Check if any child matches search
  const hasChildMatch = (item) => {
    if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return true;
    }
    
    if (item.children && item.children.length > 0) {
      return item.children.some(child => hasChildMatch(child));
    }
    
    return false;
  };
  
  // Expand all rows
  const expandAll = () => {
    const expanded = {};
    
    const processItems = (items) => {
      items.forEach(item => {
        expanded[item.id] = true;
        if (item.children && item.children.length > 0) {
          processItems(item.children);
        }
      });
    };
    
    processItems(treeData);
    setExpandedRows(expanded);
  };
  
  // Collapse all rows
  const collapseAll = () => {
    const expanded = {};
    
    // Keep top-level expanded
    treeData.forEach(item => {
      expanded[item.id] = true;
    });
    
    setExpandedRows(expanded);
  };
  
  // Get all variances for export
  const getAllVariances = () => {
    const variances = [];
    
    const processItems = (items) => {
      items.forEach(item => {
        variances.push({
          name: item.name,
          variance: item.variance,
          variancePct: item.variancePct
        });
        
        if (item.children && item.children.length > 0) {
          processItems(item.children);
        }
      });
    };
    
    processItems(treeData);
    
    // Sort by absolute variance percentage
    return variances.sort((a, b) => Math.abs(b.variancePct) - Math.abs(a.variancePct)).slice(0, 10);
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 w-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-800">Variance vs Budget</h1>
        <p className="text-gray-500 text-sm">Compare actual performance against planned budget</p>
      </div>
      
      {/* Controls */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <label htmlFor="budget-version" className="block text-xs font-medium text-gray-700">Budget Version</label>
              <select
                id="budget-version"
                className="mt-1 block w-48 pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                value={budgetVersion}
                onChange={(e) => setBudgetVersion(e.target.value)}
              >
                {budgetVersions.map(version => (
                  <option key={version.id} value={version.name}>{version.name}</option>
                ))}
              </select>
            </div>
            
            <div className="relative w-72">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search accounts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button 
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={() => setSearchTerm('')}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
            
            <div className="flex space-x-2">
              <button 
                className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={expandAll}
              >
                Expand All
              </button>
              <button 
                className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={collapseAll}
              >
                Collapse All
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </button>
            
            <button 
              className="inline-flex items-center px-3 py-2 border border-blue-100 text-sm font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={exportToPowerPoint}
            >
              <Download className="h-4 w-4 mr-2" />
              Send to PowerPoint
            </button>
          </div>
        </div>
      </div>
      
      {/* Settings Panel (conditionally rendered) */}
      {showSettings && (
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium text-gray-700">Display Settings</h3>
            <button 
              className="text-gray-400 hover:text-gray-500"
              onClick={() => setShowSettings(false)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="variance-threshold" className="block text-xs font-medium text-gray-700">
                Variance Threshold (%)
              </label>
              <div className="mt-1 flex items-center">
                <input
                  type="number"
                  id="variance-threshold"
                  className="block w-24 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={varianceThreshold}
                  onChange={(e) => updateVarianceThreshold(e.target.value)}
                  min="0"
                  max="100"
                  step="0.1"
                />
                <div className="ml-2 flex items-center">
                  <div className="w-4 h-4 bg-red-50 border border-red-100 mr-1"></div>
                  <span className="text-xs text-gray-500">Negative</span>
                  <div className="w-4 h-4 bg-green-50 border border-green-100 ml-3 mr-1"></div>
                  <span className="text-xs text-gray-500">Positive</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Tree Grid */}
        <div className="flex-1 overflow-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-3/12">
                  Account
                </th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">
                  Actual
                </th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">
                  Budget
                </th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">
                  Variance (₹)
                </th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">
                  Variance (%)
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-4 py-4 text-center text-sm text-gray-500">
                    <div className="flex justify-center items-center">
                      <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                      Loading data...
                    </div>
                  </td>
                </tr>
              ) : (
                renderTreeRows(treeData)
              )}
            </tbody>
          </table>
        </div>
        
        {/* Commentary Side Panel */}
        {selectedCell && (
          <div className="w-80 border-l border-gray-200 bg-white overflow-auto transition-all">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-gray-900">Add Commentary</h3>
                <button 
                  className="text-gray-400 hover:text-gray-500"
                  onClick={cancelComment}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="mb-4">
                <div className="text-xs text-gray-500 mb-1">Account</div>
                <div className="text-sm font-medium">{selectedCell.name}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Actual</div>
                  <div className="text-sm font-medium">{formatCurrency(selectedCell.actual)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Budget</div>
                  <div className="text-sm font-medium">{formatCurrency(selectedCell.budget)}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Variance (₹)</div>
                  <div className={`text-sm font-medium ${getVarianceColorClass(selectedCell.variancePct)}`}>
                    {formatCurrency(selectedCell.variance)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Variance (%)</div>
                  <div className={`text-sm font-medium ${getVarianceColorClass(selectedCell.variancePct)}`}>
                    {formatPercentage(selectedCell.variancePct)}
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="comment" className="block text-xs font-medium text-gray-700 mb-1">
                  Comment
                </label>
                <textarea
                  id="comment"
                  rows="6"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Explain the variance..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={cancelComment}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={saveComment}
                >
                  <Save className="h-4 w-4 mr-1" />
                  Save Comment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}