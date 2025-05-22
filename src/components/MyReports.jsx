// import React, { useState } from 'react';
// import { Download } from 'lucide-react';

// const MyReports = () => {
//   // Only the 3 requested reports
//   const reports = [
//     { id: 1, name: 'GL Final', type: 'csv' },
//     { id: 2, name: 'Consolidated P&L (INR)', type: 'csv' },
//     { id: 5, name: 'Board Packet', type: 'dashboard', assetFileName: 'board_packet_demo.pptx' }
//   ];

//   // State to track which card is being hovered
//   const [hoveredCard, setHoveredCard] = useState(null);

//   // Handle download function
//   const handleDownload = (reportId, type) => {
//     // Get the report object
//     const report = reports.find(r => r.id === reportId);
    
//     if (type === 'csv') {
//       // Create a blob based on file type
//       let content = '';
//       let fileName = '';
      
//       // Different content based on which CSV is being downloaded
//       if (reportId === 1) {
//         // GL Final data
//         content = 'TransactionID,Date,AccountCode,Description,Debit,Credit,Currency,Entity,CanonicalAccount,AccountName,RateToINR,DebitINR,CreditINR\n1,2025-04-30,4001,Sales,0.0,50000,USD,US01,REVENUE_SALES,Sales Revenue,83,0.0,4150000\n2,2025-04-30,5005,COGS,20000.0,0,USD,US01,COGS,Cost of Goods Sold,83,1660000.0,0\n4,2025-04-30,4001,Sales (India),0.0,300000,INR,IN01,REVENUE_SALES,Sales Revenue,1,0.0,300000\n5,2025-04-30,9001,Inter‑co Revenue,0.0,10000,USD,US01,IC_REVENUE,Inter‑company Revenue,83,0.0,0\n6,2025-04-30,9101,Inter‑co Expense,10000.0,0,USD,IN01,IC_EXPENSE,Inter‑company Expense,83,0.0,0\nA3US01,2025-04-30,6200,Allocated Rent to US01,135000.0,0,INR,US01,OPEX_RENT,,1,135000.0,0\nA3IN01,2025-04-30,6200,Allocated Rent to IN01,135000.0,0,INR,IN01,OPEX_RENT,,1,135000.0,0\nE56,2025-04-30,9999,Inter‑company Elimination,830000.0,830000,INR,ELIM,IC_ELIM,,1,830000.0,830000';
//         fileName = 'GL Final.csv';
//       } else if (reportId === 2) {
//         // Consolidated PL data
//         content = 'CanonicalAccount,AmountINR\nREVENUE_SALES,4450000.0\nIC_ELIM,0.0\nIC_EXPENSE,0.0\nIC_REVENUE,0.0\nOPEX_RENT,-270000.0\nCOGS,-1660000.0';
//         fileName = 'Consolidated PL.csv';
//       }
      
//       // Create a blob and initiate download for CSV
//       const blob = new Blob([content], { type: 'text/csv' });
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = fileName;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       URL.revokeObjectURL(url);
      
//     } else {
//       // For dashboard/PPT files, first try to download from assets folder
//       downloadPptFromAssets(report);
//     }
//   };
  
//   // Function to download PPT files from assets folder
//   const downloadPptFromAssets = (report) => {
//     try {
//       // Get the PowerPoint filename from the report object
//       const fileName = report.assetFileName || `${report.name.replace(/\s+/g, '_')}.pptx`;
      
//       // Path to your PPT in the public folder
//       const filePath = `/assets/presentations/${fileName}`;
      
//       console.log(`Attempting to download from: ${filePath}`);
      
//       // Create download link
//       const a = document.createElement('a');
//       a.href = filePath;
//       a.download = fileName;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
      
//     } catch (error) {
//       console.error("Error downloading PowerPoint:", error);
//       alert("Error downloading PowerPoint. Falling back to generated version.");
//       // Fall back to the dynamic generation approach
//       fallbackToPptxGeneration(report.id);
//     }
//   };
  
//   // Fallback function if PPT file isn't in assets or can't be accessed
//   const fallbackToPptxGeneration = (reportId) => {
//     try {
//       // Check if pptxgenjs is available (would be loaded in your real app)
//       if (typeof window !== 'undefined' && window.PptxGenJS) {
//         const pptxgen = window.PptxGenJS;
        
//         // Create new instance
//         const pres = new pptxgen();
        
//         // Set presentation properties
//         pres.layout = 'LAYOUT_16x9';
        
//         // Common dashboard data
//         const dashboardName = reports.find(report => report.id === reportId)?.name || 'Dashboard';
//         const fileName = `${dashboardName.replace(/\s+/g, '_')}.pptx`;
        
//         if (reportId === 5) { // Board Packet
//           // P&L data
//           const plData = [
//             { account: 'REVENUE_SALES', amount: 4450000 },
//             { account: 'IC_ELIM', amount: 0 },
//             { account: 'IC_EXPENSE', amount: 0 },
//             { account: 'IC_REVENUE', amount: 0 },
//             { account: 'OPEX_RENT', amount: -270000 },
//             { account: 'COGS', amount: -1660000 }
//           ];
          
//           // Create the table data array for slide 2
//           const tableData = [
//             ['Account', 'Amount (INR)']
//           ];
          
//           plData.forEach(item => {
//             tableData.push([item.account, item.amount.toString()]);
//           });
          
//           // Slide 1: Title slide
//           let slide1 = pres.addSlide();
//           slide1.addText("InfraHive Consolidated P&L", {
//             x: 1, 
//             y: 1.5, 
//             w: '80%', 
//             h: 1.5, 
//             fontSize: 36,
//             align: 'center',
//             bold: true
//           });
//           slide1.addText("As of 13 May 2025", {
//             x: 1, 
//             y: 3, 
//             w: '80%', 
//             h: 0.5, 
//             fontSize: 20,
//             align: 'center',
//             color: '808080'
//           });
          
//           // Slide 2: P&L Summary Table
//           let slide2 = pres.addSlide();
//           slide2.addText("P&L Summary (INR)", {
//             x: 1, 
//             y: 0.5, 
//             w: '80%', 
//             h: 0.5, 
//             fontSize: 28,
//             align: 'center',
//             bold: true
//           });
          
//           slide2.addTable(tableData, {
//             x: 1,
//             y: 1.5,
//             w: 8,
//             h: 3,
//             colW: [4, 4],
//             border: { pt: 1, color: 'CFCFCF' },
//             fontSize: 14,
//             color: '363636',
//             bold: false,
//             rowH: 0.5,
//             align: 'left',
//             headerRow: true,
//             tableColorsOdd: 'F7F7F7',
//             tableColorsEven: 'FFFFFF',
//             tableHeaderColor: '4472C4',
//             tableHeaderFontColor: 'FFFFFF',
//             tableHeaderFontFace: 'Arial',
//             tableHeaderFontSize: 14
//           });
          
//           // Slide 3: P&L Breakdown Chart
//           let slide3 = pres.addSlide();
//           slide3.addText("P&L Breakdown", {
//             x: 1, 
//             y: 0.5, 
//             w: '80%', 
//             h: 0.5, 
//             fontSize: 28,
//             align: 'center',
//             bold: true
//           });
          
//           // Add chart data if chart library available
//           if (pres.ChartType) {
//             // Extract chart data
//             const chartLabels = plData.map(item => item.account);
//             const chartValues = plData.map(item => item.amount);
            
//             // Add a bar chart
//             slide3.addChart(pres.ChartType.bar, [
//               {
//                 name: 'P&L Components',
//                 labels: chartLabels,
//                 values: chartValues
//               }
//             ], {
//               x: 1,
//               y: 1.5,
//               w: 8,
//               h: 4,
//               barDir: 'col',
//               chartColors: ['FFA500'],
//               showValue: true,
//               showLegend: false,
//               valueBarColors: true,
//               dataLabelFormatCode: '#,##0',
//               chartColorsOpacity: 100,
//               catAxisTitle: 'Account',
//               valAxisTitle: 'Amount (INR)',
//               valAxisMaxVal: 5000000,
//               valAxisMinVal: -2000000
//             });
//           }
//         }
        
//         // Save the presentation
//         pres.writeFile({ fileName: fileName });
        
//       } else {
//         // If pptxgenjs is not available, fall back to the HTML approach
//         console.warn("PptxGenJS not available. Falling back to HTML export.");
//         fallbackToPptxHtmlExport(reportId);
//       }
//     } catch (error) {
//       console.error("Error creating PowerPoint:", error);
//       // Fall back to HTML export
//       fallbackToPptxHtmlExport(reportId);
//     }
//   };
  
//   // Fallback function if pptxgenjs is not available
//   const fallbackToPptxHtmlExport = (reportId) => {
//     const dashboardName = reports.find(report => report.id === reportId)?.name || 'Dashboard';
//     const fileName = `${dashboardName.replace(/\s+/g, '_')}.pptx`;
    
//     // Create HTML representation of the PowerPoint
//     let pptxHtml = '';
    
//     if (reportId === 5) { // Board Packet
//       pptxHtml = `
//         <html>
//         <head>
//           <style>
//             body { font-family: Arial; margin: 0; padding: 0; }
//             .slide { width: 800px; height: 600px; background: white; position: relative; page-break-after: always; }
//             .title { font-size: 36px; text-align: center; padding-top: 50px; }
//             .subtitle { font-size: 24px; text-align: center; color: gray; }
//             .table { width: 80%; margin: 40px auto; border-collapse: collapse; }
//             .table th, .table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
//             .table th { background-color: #4472C4; color: white; }
//             .chart { width: 80%; height: 300px; margin: 20px auto; background-color: #f9f9f9; border: 1px solid #ddd; }
//           </style>
//         </head>
//         <body>
//           <div class="slide">
//             <div class="title">InfraHive Consolidated P&L</div>
//             <div class="subtitle">As of 13 May 2025</div>
//           </div>
//           <div class="slide">
//             <div class="title">P&L Summary (INR)</div>
//             <table class="table">
//               <tr><th>Account</th><th>Amount (INR)</th></tr>
//               <tr><td>COGS</td><td>-1660000</td></tr>
//               <tr><td>IC_ELIM</td><td>0</td></tr>
//               <tr><td>IC_EXPENSE</td><td>0</td></tr>
//               <tr><td>IC_REVENUE</td><td>0</td></tr>
//               <tr><td>OPEX_RENT</td><td>-270000</td></tr>
//               <tr><td>REVENUE_SALES</td><td>4450000</td></tr>
//             </table>
//           </div>
//           <div class="slide">
//             <div class="title">P&L Breakdown</div>
//             <div class="chart">
//               <!-- Chart representation would go here -->
//             </div>
//           </div>
//         </body>
//         </html>
//       `;
//     } else {
//       // Default dashboard template
//       pptxHtml = `
//         <html>
//         <head>
//           <style>
//             body { font-family: Arial; margin: 0; padding: 0; }
//             .slide { width: 800px; height: 600px; background: white; position: relative; page-break-after: always; }
//             .title { font-size: 36px; text-align: center; padding-top: 50px; }
//             .content { font-size: 24px; text-align: center; padding: 50px; }
//           </style>
//         </head>
//         <body>
//           <div class="slide">
//             <div class="title">${dashboardName}</div>
//             <div class="content">Dashboard Content</div>
//           </div>
//         </body>
//         </html>
//       `;
//     }
    
//     // Simulate the download with an HTML file that visually represents the PPTX
//     const blob = new Blob([pptxHtml], { type: 'text/html' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = fileName.replace('.pptx', '.html'); // Using HTML for fallback
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="p-8 max-w-6xl">
//       {/* Header with gradient underline */}
//       <div className="mb-8 pb-2 border-b border-gray-100">
//         <h1 className="text-3xl font-bold text-gray-800 tracking-tight">My Reports</h1>
//         <p className="text-gray-500 mt-2">Access and download your financial reports and analytics.</p>
//       </div>
      
//       {/* Quick Access Filters */}
//       <div className="flex mb-6 space-x-2">
//         <button className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium transition-all hover:bg-indigo-100">
//           All Reports
//         </button>
//         <button className="px-4 py-2 bg-gray-50 text-gray-600 rounded-full text-sm font-medium transition-all hover:bg-gray-100">
//           CSV Files
//         </button>
//         <button className="px-4 py-2 bg-gray-50 text-gray-600 rounded-full text-sm font-medium transition-all hover:bg-gray-100">
//           Presentations
//         </button>
//       </div>
      
//       {/* Reports Grid with enhanced card design */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {reports.map((report) => (
//           <div 
//             key={report.id} 
//             className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col relative shadow-sm transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]"
//             onMouseEnter={() => setHoveredCard(report.id)}
//             onMouseLeave={() => setHoveredCard(null)}
//           >
//             {/* Report type label */}
//             <div className="absolute top-4 right-4">
//               <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
//                 report.type === 'csv' 
//                   ? 'bg-blue-50 text-blue-600' 
//                   : 'bg-purple-50 text-purple-600'
//               }`}>
//                 {report.type === 'csv' ? 'CSV' : 'PPTX'}
//               </span>
//             </div>
            
//             <div className="text-lg font-semibold text-gray-800 mb-3 pr-24">{report.name}</div>
            
//             {/* File preview with hover effect */}
//             <div className="flex-grow mb-6 relative group">
//               <div className="h-48 flex flex-col justify-center items-center p-2 transition-all duration-300 group-hover:opacity-90">
//                 {report.type === 'csv' ? (
//                   /* CSV File Preview */
//                   <div className="flex flex-col items-center">
//                     <div className="w-28 h-28 mb-3 p-2 bg-blue-50 rounded-2xl flex items-center justify-center">
//                       <img
//                         src="https://cdn-icons-png.flaticon.com/512/8242/8242984.png"
//                         alt="CSV Icon"
//                         className="w-20 h-20 object-contain drop-shadow-sm"
//                       />
//                     </div>
//                     <div className="text-sm text-gray-600 font-medium">{report.name}</div>
//                     <div className="text-xs text-gray-400 mt-1">Last updated: May 13, 2025</div>
//                   </div>
//                 ) : (
//                   /* PowerPoint Preview */
//                   <div className="flex flex-col items-center">
//                     <div className="w-28 h-28 mb-3 p-2 bg-purple-50 rounded-2xl flex items-center justify-center">
//                       <img
//                         src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Microsoft_PowerPoint_2013-2019_logo.svg/1220px-Microsoft_PowerPoint_2013-2019_logo.svg.png"
//                         alt="PowerPoint Icon"
//                         className="w-20 h-20 object-contain drop-shadow-sm"
//                       />
//                     </div>
//                     <div className="text-sm text-gray-600 font-medium">Board Packet</div>
//                     <div className="text-xs text-gray-400 mt-1">Last updated: May 13, 2025</div>
//                   </div>
//                 )}
//               </div>
              
//               {/* Hover overlay with download button */}
//               {hoveredCard === report.id && (
//                 <div className="absolute inset-0 bg-black bg-opacity-10 rounded-xl flex items-center justify-center transition-opacity">
//                   <button
//                     className="bg-white text-indigo-600 font-medium px-4 py-2 rounded-lg shadow-md hover:bg-indigo-50 transition-all flex items-center space-x-2"
//                     onClick={() => handleDownload(report.id, report.type)}
//                   >
//                     <Download className="h-5 w-5" />
//                     <span>Download</span>
//                   </button>
//                 </div>
//               )}
//             </div>
            
//             {/* File metadata and action button */}
//             <div className="flex justify-between items-center pt-2 border-t border-gray-100">
//               <div className="text-xs text-gray-500">
//                 {report.type === 'csv' ? 'Financial Data' : 'Presentation'}
//               </div>
              
//               {/* Always visible download button */}
//               <button
//                 className="flex items-center justify-center text-indigo-600 hover:text-indigo-800 transition-colors focus:outline-none"
//                 onClick={() => handleDownload(report.id, report.type)}
//               >
//                 <Download className="h-5 w-5" />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
      
//       {/* Additional options section */}
//       <div className="mt-12 flex flex-col items-center p-6 bg-gray-50 rounded-xl">
//         <h3 className="text-lg font-semibold text-gray-700 mb-3">Need a custom report?</h3>
//         <p className="text-gray-600 text-center mb-4">Request specific financial reports tailored to your needs.</p>
//         <button className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-medium shadow-sm hover:bg-indigo-700 transition-colors">
//           Request Report
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MyReports;


import React, { useState } from 'react';
import { Download } from 'lucide-react';

const MyReports = () => {
  // Only the 3 requested reports
  const reports = [
    { id: 1, name: 'GL Final', type: 'csv' },
    { id: 2, name: 'Consolidated P&L (INR)', type: 'csv' },
    { id: 5, name: 'Board Packet', type: 'dashboard', assetFileName: 'board_packet_demo.pptx' }
  ];

  // State to track which card is being hovered
  const [hoveredCard, setHoveredCard] = useState(null);
  
  // State to track active filter
  const [activeFilter, setActiveFilter] = useState('all');

  // Filter reports based on activeFilter
  const filteredReports = reports.filter(report => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'csv') return report.type === 'csv';
    if (activeFilter === 'presentations') return report.type === 'dashboard';
    return true;
  });

  // Handle download function
  const handleDownload = (reportId, type) => {
    // Get the report object
    const report = reports.find(r => r.id === reportId);
    
    if (type === 'csv') {
      // Create a blob based on file type
      let content = '';
      let fileName = '';
      
      // Different content based on which CSV is being downloaded
      if (reportId === 1) {
        // GL Final data
        content = 'TransactionID,Date,AccountCode,Description,Debit,Credit,Currency,Entity,CanonicalAccount,AccountName,RateToINR,DebitINR,CreditINR\n1,2025-04-30,4001,Sales,0.0,50000,USD,US01,REVENUE_SALES,Sales Revenue,83,0.0,4150000\n2,2025-04-30,5005,COGS,20000.0,0,USD,US01,COGS,Cost of Goods Sold,83,1660000.0,0\n4,2025-04-30,4001,Sales (India),0.0,300000,INR,IN01,REVENUE_SALES,Sales Revenue,1,0.0,300000\n5,2025-04-30,9001,Inter‑co Revenue,0.0,10000,USD,US01,IC_REVENUE,Inter‑company Revenue,83,0.0,0\n6,2025-04-30,9101,Inter‑co Expense,10000.0,0,USD,IN01,IC_EXPENSE,Inter‑company Expense,83,0.0,0\nA3US01,2025-04-30,6200,Allocated Rent to US01,135000.0,0,INR,US01,OPEX_RENT,,1,135000.0,0\nA3IN01,2025-04-30,6200,Allocated Rent to IN01,135000.0,0,INR,IN01,OPEX_RENT,,1,135000.0,0\nE56,2025-04-30,9999,Inter‑company Elimination,830000.0,830000,INR,ELIM,IC_ELIM,,1,830000.0,830000';
        fileName = 'GL Final.csv';
      } else if (reportId === 2) {
        // Consolidated PL data
        content = 'CanonicalAccount,AmountINR\nREVENUE_SALES,4450000.0\nIC_ELIM,0.0\nIC_EXPENSE,0.0\nIC_REVENUE,0.0\nOPEX_RENT,-270000.0\nCOGS,-1660000.0';
        fileName = 'Consolidated PL.csv';
      }
      
      // Create a blob and initiate download for CSV
      const blob = new Blob([content], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
    } else {
      // For dashboard/PPT files, first try to download from assets folder
      downloadPptFromAssets(report);
    }
  };
  
  // Function to download PPT files from assets folder
  const downloadPptFromAssets = (report) => {
    try {
      // Get the PowerPoint filename from the report object
      const fileName = report.assetFileName || `${report.name.replace(/\s+/g, '_')}.pptx`;
      
      // Path to your PPT in the public folder
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
      fallbackToPptxGeneration(report.id);
    }
  };
  
  // Fallback function if PPT file isn't in assets or can't be accessed
  const fallbackToPptxGeneration = (reportId) => {
    try {
      // Check if pptxgenjs is available (would be loaded in your real app)
      if (typeof window !== 'undefined' && window.PptxGenJS) {
        const pptxgen = window.PptxGenJS;
        
        // Create new instance
        const pres = new pptxgen();
        
        // Set presentation properties
        pres.layout = 'LAYOUT_16x9';
        
        // Common dashboard data
        const dashboardName = reports.find(report => report.id === reportId)?.name || 'Dashboard';
        const fileName = `${dashboardName.replace(/\s+/g, '_')}.pptx`;
        
        if (reportId === 5) { // Board Packet
          // P&L data
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
          
          // Add chart data if chart library available
          if (pres.ChartType) {
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
          }
        }
        
        // Save the presentation
        pres.writeFile({ fileName: fileName });
        
      } else {
        // If pptxgenjs is not available, fall back to the HTML approach
        console.warn("PptxGenJS not available. Falling back to HTML export.");
        fallbackToPptxHtmlExport(reportId);
      }
    } catch (error) {
      console.error("Error creating PowerPoint:", error);
      // Fall back to HTML export
      fallbackToPptxHtmlExport(reportId);
    }
  };
  
  // Fallback function if pptxgenjs is not available
  const fallbackToPptxHtmlExport = (reportId) => {
    const dashboardName = reports.find(report => report.id === reportId)?.name || 'Dashboard';
    const fileName = `${dashboardName.replace(/\s+/g, '_')}.pptx`;
    
    // Create HTML representation of the PowerPoint
    let pptxHtml = '';
    
    if (reportId === 5) { // Board Packet
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
    <div className="p-8 max-w-6xl overflow-auto">
      {/* Header with gradient underline */}
      <div className="mb-8 pb-2 border-b border-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">My Reports</h1>
        <p className="text-gray-500 mt-2">Access and download your financial reports and analytics.</p>
      </div>
      
      {/* Quick Access Filters - Now Functional */}
      <div className="flex mb-6 space-x-2">
        <button 
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeFilter === 'all' 
              ? 'bg-indigo-50 text-indigo-700' 
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
          onClick={() => setActiveFilter('all')}
        >
          All Reports
        </button>
        <button 
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeFilter === 'csv' 
              ? 'bg-indigo-50 text-indigo-700' 
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
          onClick={() => setActiveFilter('csv')}
        >
          CSV Files
        </button>
        <button 
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeFilter === 'presentations' 
              ? 'bg-indigo-50 text-indigo-700' 
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
          onClick={() => setActiveFilter('presentations')}
        >
          Presentations
        </button>
      </div>
      
      {/* Reports Grid with filtered reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredReports.length > 0 ? (
          filteredReports.map((report) => (
            <div 
              key={report.id} 
              className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col relative shadow-sm transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]"
              onMouseEnter={() => setHoveredCard(report.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Report type label */}
              <div className="absolute top-4 right-4">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  report.type === 'csv' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'bg-purple-50 text-purple-600'
                }`}>
                  {report.type === 'csv' ? 'CSV' : 'PPTX'}
                </span>
              </div>
              
              <div className="text-lg font-semibold text-gray-800 mb-3 pr-24">{report.name}</div>
              
              {/* File preview with hover effect */}
              <div className="flex-grow mb-6 relative group">
                <div className="h-48 flex flex-col justify-center items-center p-2 transition-all duration-300 group-hover:opacity-90">
                  {report.type === 'csv' ? (
                    /* CSV File Preview */
                    <div className="flex flex-col items-center">
                      <div className="w-28 h-28 mb-3 p-2 bg-blue-50 rounded-2xl flex items-center justify-center">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/8242/8242984.png"
                          alt="CSV Icon"
                          className="w-20 h-20 object-contain drop-shadow-sm"
                        />
                      </div>
                      <div className="text-sm text-gray-600 font-medium">{report.name}</div>
                      <div className="text-xs text-gray-400 mt-1">Last updated: May 13, 2025</div>
                    </div>
                  ) : (
                    /* PowerPoint Preview */
                    <div className="flex flex-col items-center">
                      <div className="w-28 h-28 mb-3 p-2 bg-purple-50 rounded-2xl flex items-center justify-center">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Microsoft_PowerPoint_2013-2019_logo.svg/1220px-Microsoft_PowerPoint_2013-2019_logo.svg.png"
                          alt="PowerPoint Icon"
                          className="w-20 h-20 object-contain drop-shadow-sm"
                        />
                      </div>
                      <div className="text-sm text-gray-600 font-medium">Board Packet</div>
                      <div className="text-xs text-gray-400 mt-1">Last updated: May 13, 2025</div>
                    </div>
                  )}
                </div>
                
                {/* Hover overlay with download button */}
                {hoveredCard === report.id && (
                  <div className="absolute inset-0 bg-black bg-opacity-10 rounded-xl flex items-center justify-center transition-opacity">
                    <button
                      className="bg-white text-indigo-600 font-medium px-4 py-2 rounded-lg shadow-md hover:bg-indigo-50 transition-all flex items-center space-x-2"
                      onClick={() => handleDownload(report.id, report.type)}
                    >
                      <Download className="h-5 w-5" />
                      <span>Download</span>
                    </button>
                  </div>
                )}
              </div>
              
              {/* File metadata and action button */}
              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <div className="text-xs text-gray-500">
                  {report.type === 'csv' ? 'Financial Data' : 'Presentation'}
                </div>
                
                {/* Always visible download button */}
                <button
                  className="flex items-center justify-center text-indigo-600 hover:text-indigo-800 transition-colors focus:outline-none"
                  onClick={() => handleDownload(report.id, report.type)}
                >
                  <Download className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          // Empty state when no reports match the filter
          <div className="col-span-3 py-12 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 mb-4 text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
            <p className="text-gray-500 max-w-md">There are no reports matching your selected filter. Try changing your filter or check back later.</p>
            <button 
              onClick={() => setActiveFilter('all')} 
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              View All Reports
            </button>
          </div>
        )}
      </div>
      
      {/* Additional options section */}
      <div className="mt-12 flex flex-col items-center p-6 bg-gray-50 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Need a custom report?</h3>
        <p className="text-gray-600 text-center mb-4">Request specific financial reports tailored to your needs.</p>
        <button className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-medium shadow-sm hover:bg-indigo-700 transition-colors">
          Request Report
        </button>
      </div>
    </div>
  );
};

export default MyReports;

// import React, { useState } from 'react';
// import { Download } from 'lucide-react';

// const MyReports = () => {
//   // Only the 3 requested reports
//   const reports = [
//     { id: 1, name: 'GL Final', type: 'csv' },
//     { id: 2, name: 'Consolidated P&L (INR)', type: 'csv' },
//     { id: 5, name: 'Board Packet', type: 'dashboard', assetFileName: 'board_packet_demo.pptx' }
//   ];

//   // State to track which card is being hovered
//   const [hoveredCard, setHoveredCard] = useState(null);

//   // Handle download function
//   const handleDownload = (reportId, type) => {
//     // Get the report object
//     const report = reports.find(r => r.id === reportId);
    
//     if (type === 'csv') {
//       // Create a blob based on file type
//       let content = '';
//       let fileName = '';
      
//       // Different content based on which CSV is being downloaded
//       if (reportId === 1) {
//         // GL Final data
//         content = 'TransactionID,Date,AccountCode,Description,Debit,Credit,Currency,Entity,CanonicalAccount,AccountName,RateToINR,DebitINR,CreditINR\n1,2025-04-30,4001,Sales,0.0,50000,USD,US01,REVENUE_SALES,Sales Revenue,83,0.0,4150000\n2,2025-04-30,5005,COGS,20000.0,0,USD,US01,COGS,Cost of Goods Sold,83,1660000.0,0\n4,2025-04-30,4001,Sales (India),0.0,300000,INR,IN01,REVENUE_SALES,Sales Revenue,1,0.0,300000\n5,2025-04-30,9001,Inter‑co Revenue,0.0,10000,USD,US01,IC_REVENUE,Inter‑company Revenue,83,0.0,0\n6,2025-04-30,9101,Inter‑co Expense,10000.0,0,USD,IN01,IC_EXPENSE,Inter‑company Expense,83,0.0,0\nA3US01,2025-04-30,6200,Allocated Rent to US01,135000.0,0,INR,US01,OPEX_RENT,,1,135000.0,0\nA3IN01,2025-04-30,6200,Allocated Rent to IN01,135000.0,0,INR,IN01,OPEX_RENT,,1,135000.0,0\nE56,2025-04-30,9999,Inter‑company Elimination,830000.0,830000,INR,ELIM,IC_ELIM,,1,830000.0,830000';
//         fileName = 'GL Final.csv';
//       } else if (reportId === 2) {
//         // Consolidated PL data
//         content = 'CanonicalAccount,AmountINR\nREVENUE_SALES,4450000.0\nIC_ELIM,0.0\nIC_EXPENSE,0.0\nIC_REVENUE,0.0\nOPEX_RENT,-270000.0\nCOGS,-1660000.0';
//         fileName = 'Consolidated PL.csv';
//       }
      
//       // Create a blob and initiate download for CSV
//       const blob = new Blob([content], { type: 'text/csv' });
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = fileName;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       URL.revokeObjectURL(url);
      
//     } else {
//       // For dashboard/PPT files, first try to download from assets folder
//       downloadPptFromAssets(report);
//     }
//   };
  
//   // Function to download PPT files from assets folder
//   const downloadPptFromAssets = (report) => {
//     try {
//       // Get the PowerPoint filename from the report object
//       const fileName = report.assetFileName || `${report.name.replace(/\s+/g, '_')}.pptx`;
      
//       // Path to your PPT in the public folder
//       const filePath = `/assets/presentations/${fileName}`;
      
//       console.log(`Attempting to download from: ${filePath}`);
      
//       // Create download link
//       const a = document.createElement('a');
//       a.href = filePath;
//       a.download = fileName;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
      
//     } catch (error) {
//       console.error("Error downloading PowerPoint:", error);
//       alert("Error downloading PowerPoint. Falling back to generated version.");
//       // Fall back to the dynamic generation approach
//       fallbackToPptxGeneration(report.id);
//     }
//   };
  
//   // Fallback function if PPT file isn't in assets or can't be accessed
//   const fallbackToPptxGeneration = (reportId) => {
//     try {
//       // Check if pptxgenjs is available (would be loaded in your real app)
//       if (typeof window !== 'undefined' && window.PptxGenJS) {
//         const pptxgen = window.PptxGenJS;
        
//         // Create new instance
//         const pres = new pptxgen();
        
//         // Set presentation properties
//         pres.layout = 'LAYOUT_16x9';
        
//         // Common dashboard data
//         const dashboardName = reports.find(report => report.id === reportId)?.name || 'Dashboard';
//         const fileName = `${dashboardName.replace(/\s+/g, '_')}.pptx`;
        
//         if (reportId === 5) { // Board Packet
//           // P&L data
//           const plData = [
//             { account: 'REVENUE_SALES', amount: 4450000 },
//             { account: 'IC_ELIM', amount: 0 },
//             { account: 'IC_EXPENSE', amount: 0 },
//             { account: 'IC_REVENUE', amount: 0 },
//             { account: 'OPEX_RENT', amount: -270000 },
//             { account: 'COGS', amount: -1660000 }
//           ];
          
//           // Create the table data array for slide 2
//           const tableData = [
//             ['Account', 'Amount (INR)']
//           ];
          
//           plData.forEach(item => {
//             tableData.push([item.account, item.amount.toString()]);
//           });
          
//           // Slide 1: Title slide
//           let slide1 = pres.addSlide();
//           slide1.addText("InfraHive Consolidated P&L", {
//             x: 1, 
//             y: 1.5, 
//             w: '80%', 
//             h: 1.5, 
//             fontSize: 36,
//             align: 'center',
//             bold: true
//           });
//           slide1.addText("As of 13 May 2025", {
//             x: 1, 
//             y: 3, 
//             w: '80%', 
//             h: 0.5, 
//             fontSize: 20,
//             align: 'center',
//             color: '808080'
//           });
          
//           // Slide 2: P&L Summary Table
//           let slide2 = pres.addSlide();
//           slide2.addText("P&L Summary (INR)", {
//             x: 1, 
//             y: 0.5, 
//             w: '80%', 
//             h: 0.5, 
//             fontSize: 28,
//             align: 'center',
//             bold: true
//           });
          
//           slide2.addTable(tableData, {
//             x: 1,
//             y: 1.5,
//             w: 8,
//             h: 3,
//             colW: [4, 4],
//             border: { pt: 1, color: 'CFCFCF' },
//             fontSize: 14,
//             color: '363636',
//             bold: false,
//             rowH: 0.5,
//             align: 'left',
//             headerRow: true,
//             tableColorsOdd: 'F7F7F7',
//             tableColorsEven: 'FFFFFF',
//             tableHeaderColor: '4472C4',
//             tableHeaderFontColor: 'FFFFFF',
//             tableHeaderFontFace: 'Arial',
//             tableHeaderFontSize: 14
//           });
          
//           // Slide 3: P&L Breakdown Chart
//           let slide3 = pres.addSlide();
//           slide3.addText("P&L Breakdown", {
//             x: 1, 
//             y: 0.5, 
//             w: '80%', 
//             h: 0.5, 
//             fontSize: 28,
//             align: 'center',
//             bold: true
//           });
          
//           // Add chart data if chart library available
//           if (pres.ChartType) {
//             // Extract chart data
//             const chartLabels = plData.map(item => item.account);
//             const chartValues = plData.map(item => item.amount);
            
//             // Add a bar chart
//             slide3.addChart(pres.ChartType.bar, [
//               {
//                 name: 'P&L Components',
//                 labels: chartLabels,
//                 values: chartValues
//               }
//             ], {
//               x: 1,
//               y: 1.5,
//               w: 8,
//               h: 4,
//               barDir: 'col',
//               chartColors: ['FFA500'],
//               showValue: true,
//               showLegend: false,
//               valueBarColors: true,
//               dataLabelFormatCode: '#,##0',
//               chartColorsOpacity: 100,
//               catAxisTitle: 'Account',
//               valAxisTitle: 'Amount (INR)',
//               valAxisMaxVal: 5000000,
//               valAxisMinVal: -2000000
//             });
//           }
//         }
        
//         // Save the presentation
//         pres.writeFile({ fileName: fileName });
        
//       } else {
//         // If pptxgenjs is not available, fall back to the HTML approach
//         console.warn("PptxGenJS not available. Falling back to HTML export.");
//         fallbackToPptxHtmlExport(reportId);
//       }
//     } catch (error) {
//       console.error("Error creating PowerPoint:", error);
//       // Fall back to HTML export
//       fallbackToPptxHtmlExport(reportId);
//     }
//   };
  
//   // Fallback function if pptxgenjs is not available
//   const fallbackToPptxHtmlExport = (reportId) => {
//     const dashboardName = reports.find(report => report.id === reportId)?.name || 'Dashboard';
//     const fileName = `${dashboardName.replace(/\s+/g, '_')}.pptx`;
    
//     // Create HTML representation of the PowerPoint
//     let pptxHtml = '';
    
//     if (reportId === 5) { // Board Packet
//       pptxHtml = `
//         <html>
//         <head>
//           <style>
//             body { font-family: Arial; margin: 0; padding: 0; }
//             .slide { width: 800px; height: 600px; background: white; position: relative; page-break-after: always; }
//             .title { font-size: 36px; text-align: center; padding-top: 50px; }
//             .subtitle { font-size: 24px; text-align: center; color: gray; }
//             .table { width: 80%; margin: 40px auto; border-collapse: collapse; }
//             .table th, .table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
//             .table th { background-color: #4472C4; color: white; }
//             .chart { width: 80%; height: 300px; margin: 20px auto; background-color: #f9f9f9; border: 1px solid #ddd; }
//           </style>
//         </head>
//         <body>
//           <div class="slide">
//             <div class="title">InfraHive Consolidated P&L</div>
//             <div class="subtitle">As of 13 May 2025</div>
//           </div>
//           <div class="slide">
//             <div class="title">P&L Summary (INR)</div>
//             <table class="table">
//               <tr><th>Account</th><th>Amount (INR)</th></tr>
//               <tr><td>COGS</td><td>-1660000</td></tr>
//               <tr><td>IC_ELIM</td><td>0</td></tr>
//               <tr><td>IC_EXPENSE</td><td>0</td></tr>
//               <tr><td>IC_REVENUE</td><td>0</td></tr>
//               <tr><td>OPEX_RENT</td><td>-270000</td></tr>
//               <tr><td>REVENUE_SALES</td><td>4450000</td></tr>
//             </table>
//           </div>
//           <div class="slide">
//             <div class="title">P&L Breakdown</div>
//             <div class="chart">
//               <!-- Chart representation would go here -->
//             </div>
//           </div>
//         </body>
//         </html>
//       `;
//     } else {
//       // Default dashboard template
//       pptxHtml = `
//         <html>
//         <head>
//           <style>
//             body { font-family: Arial; margin: 0; padding: 0; }
//             .slide { width: 800px; height: 600px; background: white; position: relative; page-break-after: always; }
//             .title { font-size: 36px; text-align: center; padding-top: 50px; }
//             .content { font-size: 24px; text-align: center; padding: 50px; }
//           </style>
//         </head>
//         <body>
//           <div class="slide">
//             <div class="title">${dashboardName}</div>
//             <div class="content">Dashboard Content</div>
//           </div>
//         </body>
//         </html>
//       `;
//     }
    
//     // Simulate the download with an HTML file that visually represents the PPTX
//     const blob = new Blob([pptxHtml], { type: 'text/html' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = fileName.replace('.pptx', '.html'); // Using HTML for fallback
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="p-6 max-w-4xl">
//       {/* Header */}
//       <h1 className="text-2xl font-bold text-gray-800 mb-6">My Reports</h1>
      
//       {/* Reports Grid */}
//       <div className="grid grid-cols-3 gap-6">
//         {reports.map((report) => (
//           <div 
//             key={report.id} 
//             className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col relative shadow-sm transition-all hover:shadow-md"
//             onMouseEnter={() => setHoveredCard(report.id)}
//             onMouseLeave={() => setHoveredCard(null)}
//           >
//             <div className="text-lg font-medium text-gray-800 mb-3">{report.name}</div>
            
//             {/* Placeholder for CSV or Dashboard preview */}
//             <div className="flex-grow mb-4 relative">
//               <div className="h-40 flex flex-col justify-center items-center p-2">
//                 {report.type === 'csv' ? (
//                   /* CSV File Preview */
//                   <div className="flex flex-col items-center">
//                     <div className="w-24 h-24 mb-2">
//                       <img
//                         src="https://cdn-icons-png.flaticon.com/512/8242/8242984.png"
//                         alt="CSV Icon"
//                         className="w-full h-full object-contain"
//                       />
//                     </div>
//                     <div className="text-xs text-gray-600 font-medium">{report.name}</div>
//                   </div>
//                 ) : (
//                   /* PowerPoint Preview */
//                   <div className="flex flex-col items-center">
//                     <div className="w-24 h-24 mb-2">
//                       <img
//                         src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Microsoft_PowerPoint_2013-2019_logo.svg/1220px-Microsoft_PowerPoint_2013-2019_logo.svg.png"
//                         alt="PowerPoint Icon"
//                         className="w-full h-full object-contain"
//                       />
//                     </div>
//                     <div className="text-xs text-gray-600 font-medium">Board Packet</div>
//                   </div>
//                 )}
//               </div>
              
//               {/* Download Button (always visible) */}
//               <button
//                 className="absolute bottom-0 right-0 flex items-center justify-center bg-indigo-600 rounded-full p-2 shadow-lg text-white"
//                 onClick={() => handleDownload(report.id, report.type)}
//               >
//                 <Download className="h-5 w-5" />
//               </button>
//             </div>
            
//             {/* File type indicator */}
//             <div className="text-xs text-gray-500 uppercase tracking-wide">
//               {report.type === 'csv' ? 'CSV File' : 'Presentation'}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyReports;