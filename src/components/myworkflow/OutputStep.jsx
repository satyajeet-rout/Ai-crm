

import React, { useState } from 'react';
import { Plus, Mail, Lock, Download, ChevronDown } from 'lucide-react';

const OutputStep = ({ onBack }) => {
  // Array of output items - updated to use your actual PowerPoint file and remove "Balance Sheet"
  const outputs = [
    { id: 1, name: 'GL Final', type: 'csv' },
    { id: 2, name: 'Consolidated P&L (INR)', type: 'csv' },
    { id: 3, name: 'Financial Statements', type: 'csv' },
    
    { id: 5, name: 'Board Packet', type: 'dashboard', assetFileName: 'board_packet_demo.pptx' },
    { id: 6, name: 'Executive Monthly', type: 'dashboard', assetFileName: 'board_packet_demo.pptx' },
    { id: 7, name: 'Entity View', type: 'dashboard', assetFileName: 'board_packet_demo.pptx' },
  ];

  // State to track which card is being hovered
  const [hoveredCard, setHoveredCard] = useState(null);

  // Handle download function
  const handleDownload = (outputId, type) => {
    // Get the output object
    const output = outputs.find(o => o.id === outputId);
    
    if (type === 'csv') {
      // Create a blob based on file type
      let content = '';
      let fileName = '';
      let mimeType = 'text/csv';
      
      // Different content based on which CSV is being downloaded
      if (outputId === 1) {
        // GL Final data
        content = 'TransactionID,Date,AccountCode,Description,Debit,Credit,Currency,Entity,CanonicalAccount,AccountName,RateToINR,DebitINR,CreditINR\n1,2025-04-30,4001,Sales,0.0,50000,USD,US01,REVENUE_SALES,Sales Revenue,83,0.0,4150000\n2,2025-04-30,5005,COGS,20000.0,0,USD,US01,COGS,Cost of Goods Sold,83,1660000.0,0\n4,2025-04-30,4001,Sales (India),0.0,300000,INR,IN01,REVENUE_SALES,Sales Revenue,1,0.0,300000\n5,2025-04-30,9001,Inter‑co Revenue,0.0,10000,USD,US01,IC_REVENUE,Inter‑company Revenue,83,0.0,0\n6,2025-04-30,9101,Inter‑co Expense,10000.0,0,USD,IN01,IC_EXPENSE,Inter‑company Expense,83,0.0,0\nA3US01,2025-04-30,6200,Allocated Rent to US01,135000.0,0,INR,US01,OPEX_RENT,,1,135000.0,0\nA3IN01,2025-04-30,6200,Allocated Rent to IN01,135000.0,0,INR,IN01,OPEX_RENT,,1,135000.0,0\nE56,2025-04-30,9999,Inter‑company Elimination,830000.0,830000,INR,ELIM,IC_ELIM,,1,830000.0,830000';
        fileName = 'GL Final.csv';
      } else if (outputId === 2) {
        // Consolidated PL data
        content = 'CanonicalAccount,AmountINR\nREVENUE_SALES,4450000.0\nIC_ELIM,0.0\nIC_EXPENSE,0.0\nIC_REVENUE,0.0\nOPEX_RENT,-270000.0\nCOGS,-1660000.0';
        fileName = 'Consolidated PL.csv';
      } else {
        // Sample CSV content for other CSV downloads
        content = 'Date,Revenue,Expenses,Profit\n2024-01-01,10000,6000,4000\n2024-02-01,12000,7000,5000\n2024-03-01,15000,8000,7000';
        fileName = `financial_data_${outputId}.csv`;
      }
      
      // Create a blob and initiate download for CSV
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
    } else {
      // For dashboard/PPT files, download from assets folder
      downloadPptFromAssets(output);
    }
  };
  
  // Function to download PPT files from assets folder
  const downloadPptFromAssets = (output) => {
    try {
      // Get the PowerPoint filename from the output object
      const fileName = output.assetFileName || `${output.name.replace(/\s+/g, '_')}.pptx`;
      
      // Path to your PPT in the public folder - matches your actual file structure
      const filePath = `/assets/presentations/${fileName}`;
      
      console.log(`Attempting to download from: ${filePath}`);
      
      // Create download link
      const a = document.createElement('a');
      a.href = filePath;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
    } catch (error) {
      console.error("Error downloading PowerPoint:", error);
      alert("Error downloading PowerPoint. Falling back to generated version.");
      // Fall back to the dynamic generation approach
      fallbackToPptxGeneration(output.id);
    }
  };
  
  // Fallback function if PPT file isn't in assets or can't be accessed
  const fallbackToPptxGeneration = (outputId) => {
    try {
      // Import pptxgenjs (in a real application you would import at the top of your file)
      // For this demo we'll assume it's being loaded from a CDN and is available globally
      // In a real application, you would use: import pptxgen from 'pptxgenjs';
      
      // Check if pptxgenjs is available (would be loaded in your real app)
      if (typeof window !== 'undefined' && window.PptxGenJS) {
        const pptxgen = window.PptxGenJS;
        
        // Create new instance
        const pres = new pptxgen();
        
        // Set presentation properties
        pres.layout = 'LAYOUT_16x9';
        
        // Common dashboard data
        const dashboardName = outputs.find(output => output.id === outputId)?.name || 'Dashboard';
        const fileName = `${dashboardName.replace(/\s+/g, '_')}.pptx`;
        
        if (outputId === 5) { // Revenue Dashboard
          // P&L data from screenshot
          const plData = [
            { account: 'REVENUE_SALES', amount: 4450000 },
            { account: 'IC_ELIM', amount: 0 },
            { account: 'IC_EXPENSE', amount: 0 },
            { account: 'IC_REVENUE', amount: 0 },
            { account: 'OPEX_RENT', amount: -270000 },
            { account: 'COGS', amount: -1660000 }
          ];
          
          // Create the table data array for slide 2
          const tableData = [
            ['Account', 'Amount (INR)']
          ];
          
          plData.forEach(item => {
            tableData.push([item.account, item.amount.toString()]);
          });
          
          // Slide 1: Title slide
          let slide1 = pres.addSlide();
          slide1.addText("InfraHive Consolidated P&L", {
            x: 1, 
            y: 1.5, 
            w: '80%', 
            h: 1.5, 
            fontSize: 36,
            align: 'center',
            bold: true
          });
          slide1.addText("As of 13 May 2025", {
            x: 1, 
            y: 3, 
            w: '80%', 
            h: 0.5, 
            fontSize: 20,
            align: 'center',
            color: '808080'
          });
          
          // Slide 2: P&L Summary Table
          let slide2 = pres.addSlide();
          slide2.addText("P&L Summary (INR)", {
            x: 1, 
            y: 0.5, 
            w: '80%', 
            h: 0.5, 
            fontSize: 28,
            align: 'center',
            bold: true
          });
          
          slide2.addTable(tableData, {
            x: 1,
            y: 1.5,
            w: 8,
            h: 3,
            colW: [4, 4],
            border: { pt: 1, color: 'CFCFCF' },
            fontSize: 14,
            color: '363636',
            bold: false,
            rowH: 0.5,
            align: 'left',
            headerRow: true,
            tableColorsOdd: 'F7F7F7',
            tableColorsEven: 'FFFFFF',
            tableHeaderColor: '4472C4',
            tableHeaderFontColor: 'FFFFFF',
            tableHeaderFontFace: 'Arial',
            tableHeaderFontSize: 14
          });
          
          // Slide 3: P&L Breakdown Chart
          let slide3 = pres.addSlide();
          slide3.addText("P&L Breakdown", {
            x: 1, 
            y: 0.5, 
            w: '80%', 
            h: 0.5, 
            fontSize: 28,
            align: 'center',
            bold: true
          });
          
          // Extract chart data
          const chartLabels = plData.map(item => item.account);
          const chartValues = plData.map(item => item.amount);
          
          // Add a bar chart
          slide3.addChart(pres.ChartType.bar, [
            {
              name: 'P&L Components',
              labels: chartLabels,
              values: chartValues
            }
          ], {
            x: 1,
            y: 1.5,
            w: 8,
            h: 4,
            barDir: 'col',
            chartColors: ['FFA500'],
            showValue: true,
            showLegend: false,
            valueBarColors: true,
            dataLabelFormatCode: '#,##0',
            chartColorsOpacity: 100,
            catAxisTitle: 'Account',
            valAxisTitle: 'Amount (INR)',
            valAxisMaxVal: 5000000,
            valAxisMinVal: -2000000
          });
          
        } else {
          // Default dashboard template (for other dashboard types)
          let slide = pres.addSlide();
          slide.addText(dashboardName, {
            x: 1, 
            y: 1.5, 
            w: '80%', 
            h: 1.5, 
            fontSize: 36,
            align: 'center',
            bold: true
          });
          slide.addText("Dashboard Content", {
            x: 1, 
            y: 3, 
            w: '80%', 
            h: 0.5, 
            fontSize: 20,
            align: 'center',
            color: '808080'
          });
        }
        
        // Save the presentation
        pres.writeFile({ fileName: fileName });
        
      } else {
        // If pptxgenjs is not available, fall back to the HTML approach
        console.warn("PptxGenJS not available. Falling back to HTML export.");
        fallbackToPptxHtmlExport(outputId);
      }
    } catch (error) {
      console.error("Error creating PowerPoint:", error);
      // Fall back to HTML export
      fallbackToPptxHtmlExport(outputId);
    }
  };
  
  // Fallback function if pptxgenjs is not available
  const fallbackToPptxHtmlExport = (outputId) => {
    const dashboardName = outputs.find(output => output.id === outputId)?.name || 'Dashboard';
    const fileName = `${dashboardName.replace(/\s+/g, '_')}.pptx`;
    
    // Create HTML representation of the PowerPoint
    let pptxHtml = '';
    
    if (outputId === 5) { // Revenue Dashboard
      pptxHtml = `
        <html>
        <head>
          <style>
            body { font-family: Arial; margin: 0; padding: 0; }
            .slide { width: 800px; height: 600px; background: white; position: relative; page-break-after: always; }
            .title { font-size: 36px; text-align: center; padding-top: 50px; }
            .subtitle { font-size: 24px; text-align: center; color: gray; }
            .table { width: 80%; margin: 40px auto; border-collapse: collapse; }
            .table th, .table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            .table th { background-color: #4472C4; color: white; }
            .chart { width: 80%; height: 300px; margin: 20px auto; background-color: #f9f9f9; border: 1px solid #ddd; }
          </style>
        </head>
        <body>
          <div class="slide">
            <div class="title">InfraHive Consolidated P&L</div>
            <div class="subtitle">As of 13 May 2025</div>
          </div>
          <div class="slide">
            <div class="title">P&L Summary (INR)</div>
            <table class="table">
              <tr><th>Account</th><th>Amount (INR)</th></tr>
              <tr><td>COGS</td><td>-1660000</td></tr>
              <tr><td>IC_ELIM</td><td>0</td></tr>
              <tr><td>IC_EXPENSE</td><td>0</td></tr>
              <tr><td>IC_REVENUE</td><td>0</td></tr>
              <tr><td>OPEX_RENT</td><td>-270000</td></tr>
              <tr><td>REVENUE_SALES</td><td>4450000</td></tr>
            </table>
          </div>
          <div class="slide">
            <div class="title">P&L Breakdown</div>
            <div class="chart">
              <!-- Chart representation would go here -->
            </div>
          </div>
        </body>
        </html>
      `;
    } else {
      // Default dashboard template
      pptxHtml = `
        <html>
        <head>
          <style>
            body { font-family: Arial; margin: 0; padding: 0; }
            .slide { width: 800px; height: 600px; background: white; position: relative; page-break-after: always; }
            .title { font-size: 36px; text-align: center; padding-top: 50px; }
            .content { font-size: 24px; text-align: center; padding: 50px; }
          </style>
        </head>
        <body>
          <div class="slide">
            <div class="title">${dashboardName}</div>
            <div class="content">Dashboard Content</div>
          </div>
        </body>
        </html>
      `;
    }
    
    // Simulate the download with an HTML file that visually represents the PPTX
    const blob = new Blob([pptxHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName.replace('.pptx', '.html'); // Using HTML for fallback
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="px-6 py-6">
      <div className="flex justify-between items-center mb-4">
        <div className="text-gray-700">
          <span className="font-medium">Outputs 10/10</span>
          <span className="ml-2 text-gray-500">Preview and download your outputs here. When you're ready, tag each output as 'final' to lock it for editing and publish it to your report space.</span>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 bg-white border border-gray-300 rounded-full text-gray-600">
            <Plus className="h-4 w-4" />
          </button>
          <button className="p-2 bg-white border border-gray-300 rounded-full text-gray-600">
            <Lock className="h-4 w-4" />
          </button>
          <button className="p-2 bg-white border border-gray-300 rounded-full text-gray-600">
            <Mail className="h-4 w-4" />
          </button>
          <button className="p-2 bg-white border border-gray-300 rounded-full text-gray-600">
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {/* Mark all checkbox */}
      <div className="mb-6">
        <label className="inline-flex items-center text-sm text-gray-600">
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4 text-blue-600 rounded"
          />
          <span className="ml-2">Mark all outputs as final</span>
        </label>
      </div>
      
      {/* Output Grid - Using 6 columns for wider cards */}
      <div className="grid grid-cols-6 gap-6">
        {outputs.map((output) => (
          <div 
            key={output.id} 
            className="bg-white border border-gray-200 rounded-xl py-4 px-2 flex flex-col relative shadow-sm w-full"
            onMouseEnter={() => setHoveredCard(output.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="text-sm font-medium text-gray-800 mb-3 h-7">{output.name}</div>
            
            {/* Placeholder for CSV or Dashboard preview */}
            <div className="flex-grow mb-4 relative">
              {output.type === 'csv' ? (
                <div className="h-32 flex flex-col justify-center items-center">
                  {/* CSV Icon using direct image URL */}
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/8242/8242984.png" 
                    alt="CSV file" 
                    className="w-20 h-20 object-contain"
                  />
                </div>
              ) : (
                <div className="h-32 flex flex-col justify-center items-center">
                  {/* PowerPoint Icon using direct image URL */}
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Microsoft_PowerPoint_2013-2019_logo.svg/1220px-Microsoft_PowerPoint_2013-2019_logo.svg.png" 
                    alt="PowerPoint file" 
                    className="w-20 h-20 object-contain"
                  />
                </div>
              )}
              
              {/* Download Button on Hover */}
              {hoveredCard === output.id && (
                <button
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded transition-opacity"
                  onClick={() => handleDownload(output.id, output.type)}
                >
                  <div className="bg-white rounded-full p-2 shadow-lg">
                    <Download className="h-5 w-5 text-indigo-600" />
                  </div>
                </button>
              )}
            </div>
            
            {/* Final Status Button */}
            <button className="flex items-center justify-between bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-700 w-full">
              <div className="flex items-center">
                <Lock className="h-4 w-4 mr-2 text-green-600" />
                <span>Final</span>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>
          </div>
        ))}
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-between mt-10">
        <button 
          className="px-5 py-2 bg-white border border-gray-300 text-gray-700 rounded-md font-medium flex items-center"
          onClick={onBack}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>
        <button className="px-5 py-2 bg-indigo-600 text-white rounded-md font-medium">
          Go to Report Space
        </button>
      </div>
    </div>
  );
};

export default OutputStep;