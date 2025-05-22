// // FXConversionStep.jsx
// import React from 'react';
// import { Plus, Check } from 'lucide-react';

// const FXConversionStep = ({ onBack, onNext }) => {
//   return (
//     <div className="px-6 py-6">
     
      
//       <div className="flex justify-between items-center mb-4">
//         <div className="text-gray-700">
//           <span className="font-medium">Mapping Files 1/1</span>
//           <span className="mx-2 text-gray-400">|</span>
//           <span className="text-gray-500">Task completion date: 09/05/2025</span>
//         </div>
//         <button className="flex items-center space-x-1 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm text-gray-600">
//           <Plus className="h-4 w-4" />
//           <span>Add configuration task</span>
//         </button>
//       </div>
      
//       {/* Table */}
//       <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead>
//             <tr className="bg-gray-50">
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tag</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 <div className="flex items-center">
//                   Assignee
//                   <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </div>
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Update</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lock</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {/* Single Row */}
//             <tr>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="flex items-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//                   </svg>
//                   <span className="text-sm font-medium text-gray-900">FX Rates</span>
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap"></td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
//                   <span className="text-white font-medium">S</span>
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">09/11/2023</td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="flex items-center">
//                   <div className="flex-shrink-0 h-2 w-2 rounded-full bg-green-500 mr-2"></div>
//                   <div className="text-sm text-gray-500 bg-green-50 px-2 py-0.5 rounded">Data Updated</div>
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap"></td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <span className="px-2.5 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium flex items-center w-fit">
//                   <Check className="h-3.5 w-3.5 mr-1" />
//                   Completed
//                 </span>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap"></td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
      
//       {/* Navigation buttons */}
//       <div className="flex justify-between mt-6">
//         <button 
//           className="px-5 py-2 bg-white border border-gray-300 text-gray-700 rounded-md font-medium flex items-center"
//           onClick={onBack}
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//           </svg>
//           Back
//         </button>
//         <button 
//           className="px-5 py-2 bg-indigo-600 text-white rounded-md font-medium"
//           onClick={onNext}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FXConversionStep;



// import React, { useState, useEffect } from 'react';
// import { Plus, Check, X, ChevronDown, ChevronUp } from 'lucide-react';

// const FXConversionStep = ({ onBack, onNext }) => {
//   const [isConfigOpen, setIsConfigOpen] = useState(false);
//   const [isFetchingRates, setIsFetchingRates] = useState(false);
//   const [ratesFetched, setRatesFetched] = useState(false);
//   const [isConverting, setIsConverting] = useState(false);
//   const [conversionCompleted, setConversionCompleted] = useState(false);
//   const [fxConverted, setFxConverted] = useState(false);
//   const [isFxDropdownOpen, setIsFxDropdownOpen] = useState(false);

//   // Get today's date in the format YYYY-MM-DD
//   const today = new Date().toISOString().split('T')[0];

//   // Currency rates - in a real app these would be fetched from an API
//   const [currencyRates, setCurrencyRates] = useState([
//     { currency: "USD", date: today, rateToINR: 83 },
//     { currency: "EUR", date: today, rateToINR: 90 },
//     { currency: "INR", date: today, rateToINR: 1 }
//   ]);

//   // Transaction data
//   const transactionData = [
//     { transactionId: 1, date: "2025-04-30", accountCode: "4001", description: "Sales", debit: 0, credit: 50000, currency: "USD", entity: "US01", canonicalAccount: "REVENUE_SALES", accountName: "Sales Revenue" },
//     { transactionId: 2, date: "2025-04-30", accountCode: "5005", description: "COGS", debit: 20000, credit: 0, currency: "USD", entity: "US01", canonicalAccount: "COGS", accountName: "Cost of Goods Sold" },
//     { transactionId: 3, date: "2025-04-30", accountCode: "6200", description: "Rent", debit: 3000, credit: 0, currency: "EUR", entity: "EU01", canonicalAccount: "OPEX_RENT", accountName: "Office Rent" },
//     { transactionId: 4, date: "2025-04-30", accountCode: "4001", description: "Sales (India)", debit: 0, credit: 300000, currency: "INR", entity: "IN01", canonicalAccount: "REVENUE_SALES", accountName: "Sales Revenue" },
//     { transactionId: 5, date: "2025-04-30", accountCode: "9001", description: "Inter‑co Revenue", debit: 0, credit: 10000, currency: "USD", entity: "US01", canonicalAccount: "IC_REVENUE", accountName: "Inter‑company Revenue" },
//     { transactionId: 6, date: "2025-04-30", accountCode: "9101", description: "Inter‑co Expense", debit: 10000, credit: 0, currency: "USD", entity: "IN01", canonicalAccount: "IC_EXPENSE", accountName: "Inter‑company Expense" }
//   ];

//   // Calculate converted transactions
//   const getConvertedTransactions = () => {
//     return transactionData.map(transaction => {
//       const rate = currencyRates.find(rate => rate.currency === transaction.currency)?.rateToINR || 1;
      
//       return {
//         ...transaction,
//         date: today, // Update to today's date
//         rateToINR: rate,
//         debitINR: transaction.debit * rate,
//         creditINR: transaction.credit * rate
//       };
//     });
//   };

//   const [convertedTransactions, setConvertedTransactions] = useState([]);

//   const openConfig = () => {
//     setIsConfigOpen(true);
//   };

//   const closeConfig = () => {
//     setIsConfigOpen(false);
//   };

//   const fetchRates = () => {
//     setIsFetchingRates(true);
    
//     // Simulate API fetch with a timeout - in a real app this would be an actual API call
//     setTimeout(() => {
//       // Set slightly different rates to simulate real-time data
//       setCurrencyRates([
//         { currency: "USD", date: today, rateToINR: 83.25 },
//         { currency: "EUR", date: today, rateToINR: 90.78 },
//         { currency: "INR", date: today, rateToINR: 1 }
//       ]);
      
//       setIsFetchingRates(false);
//       setRatesFetched(true);
//     }, 1500);
//   };

//   const convertCurrencies = () => {
//     setIsConverting(true);
    
//     // Simulate processing with a timeout
//     setTimeout(() => {
//       setConvertedTransactions(getConvertedTransactions());
//       setIsConverting(false);
//       setConversionCompleted(true);
      
//       // Close the modal and add the converted data after a short delay
//       setTimeout(() => {
//         setIsConfigOpen(false);
//         setFxConverted(true);
//       }, 1000);
//     }, 2000);
//   };

//   const toggleFxDropdown = () => {
//     setIsFxDropdownOpen(!isFxDropdownOpen);
//   };

//   return (
//     <div className="px-6 py-6 relative">
//       <div className="flex justify-between items-center mb-4">
//         <div className="text-gray-700">
//           <span className="font-medium">Mapping Files 1/1</span>
//           <span className="mx-2 text-gray-400">|</span>
//           <span className="text-gray-500">Task completion date: 09/05/2025</span>
//         </div>
//         <button 
//           className="flex items-center space-x-1 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm text-gray-600"
//           onClick={openConfig}
//         >
//           <Plus className="h-4 w-4" />
//           <span>Add configuration task</span>
//         </button>
//       </div>
      
//       {/* Table */}
//       <div className="bg-white rounded-lg shadow-sm overflow-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead>
//             <tr className="bg-gray-50">
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tag</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 <div className="flex items-center">
//                   Assignee
//                   <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </div>
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Update</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lock</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {/* GL FX Converted Row - Only shown after conversion is completed */}
//             {fxConverted && (
//               <>
//                 <tr 
//                   className="cursor-pointer hover:bg-gray-50" 
//                   onClick={toggleFxDropdown}
//                 >
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//                       </svg>
//                       <span className="text-sm font-medium text-gray-900">GL FX Converted</span>
//                       {isFxDropdownOpen ? (
//                         <ChevronUp className="ml-2 h-4 w-4 text-gray-500" />
//                       ) : (
//                         <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
//                       )}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap"></td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
//                       <span className="text-white font-medium">S</span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{today.replace(/-/g, '/')}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className="flex-shrink-0 h-2 w-2 rounded-full bg-green-500 mr-2"></div>
//                       <div className="text-sm text-gray-500 bg-green-50 px-2 py-0.5 rounded">Data Updated</div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap"></td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className="px-2.5 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium flex items-center w-fit">
//                       <Check className="h-3.5 w-3.5 mr-1" />
//                       Completed
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap"></td>
//                 </tr>

//                 {/* Dropdown content for GL FX Converted */}
//                 {isFxDropdownOpen && (
//                   <tr>
//                     <td colSpan="8" className="px-6 py-4">
//                       <div className="bg-gray-50 rounded-md p-4 overflow-x-auto">
//                         <table className="min-w-full divide-y divide-gray-200">
//                           <thead>
//                             <tr>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Account Code</th>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Debit</th>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Credit</th>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Currency</th>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Entity</th>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Canonical Account</th>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Account Name</th>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Rate To INR</th>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Debit INR</th>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Credit INR</th>
//                             </tr>
//                           </thead>
//                           <tbody className="bg-white divide-y divide-gray-200">
//                             {convertedTransactions.map((transaction, index) => (
//                               <tr key={index} className="hover:bg-gray-50">
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.transactionId}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.date}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.accountCode}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.description}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.debit.toLocaleString()}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.credit.toLocaleString()}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.currency}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.entity}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.canonicalAccount}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.accountName}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.rateToINR.toFixed(2)}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.debitINR.toLocaleString()}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.creditINR.toLocaleString()}</td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </>
//             )}
            
//             {/* Original FX Rates Row */}
//             <tr>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="flex items-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//                   </svg>
//                   <span className="text-sm font-medium text-gray-900">FX Rates</span>
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap"></td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
//                   <span className="text-white font-medium">S</span>
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">09/11/2023</td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="flex items-center">
//                   <div className="flex-shrink-0 h-2 w-2 rounded-full bg-green-500 mr-2"></div>
//                   <div className="text-sm text-gray-500 bg-green-50 px-2 py-0.5 rounded">Data Updated</div>
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap"></td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <span className="px-2.5 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium flex items-center w-fit">
//                   <Check className="h-3.5 w-3.5 mr-1" />
//                   Completed
//                 </span>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap"></td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
      
//       {/* Navigation buttons */}
//       <div className="flex justify-between mt-6">
//         <button 
//           className="px-5 py-2 bg-white border border-gray-300 text-gray-700 rounded-md font-medium flex items-center"
//           onClick={onBack}
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//           </svg>
//           Back
//         </button>
//         <button 
//           className="px-5 py-2 bg-indigo-600 text-white rounded-md font-medium"
//           onClick={onNext}
//         >
//           Next
//         </button>
//       </div>
      
//       {/* Configuration Task Modal */}
//       {isConfigOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-xl w-3/4 max-w-4xl max-h-[90vh] overflow-y-auto">
//             {/* Modal Header */}
//             <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//               <h3 className="text-lg font-medium text-gray-900">FX Rate Configuration</h3>
//               <button 
//                 className="text-gray-400 hover:text-gray-500"
//                 onClick={closeConfig}
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </div>
            
//             {/* Modal Content */}
//             <div className="px-6 py-4">
//               {!ratesFetched ? (
//                 <div className="text-center py-10">
//                   <button 
//                     className={`px-4 py-2 rounded-md text-white font-medium ${
//                       isFetchingRates ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
//                     }`}
//                     onClick={fetchRates}
//                     disabled={isFetchingRates}
//                   >
//                     {isFetchingRates ? (
//                       <span className="flex items-center">
//                         <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                         </svg>
//                         Fetching Rates...
//                       </span>
//                     ) : (
//                       'Fetch Rates'
//                     )}
//                   </button>
//                 </div>
//               ) : (
//                 <div>
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200">
//                       <thead>
//                         <tr>
//                           <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Currency</th>
//                           <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                           <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate To INR</th>
//                         </tr>
//                       </thead>
//                       <tbody className="bg-white divide-y divide-gray-200">
//                         {currencyRates.map((rate, index) => (
//                           <tr key={index}>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rate.currency}</td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rate.date}</td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rate.rateToINR.toFixed(2)}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
                  
//                   <div className="mt-6 flex justify-end">
//                     <button 
//                       className={`px-4 py-2 rounded-md text-white font-medium ${
//                         isConverting ? 'bg-indigo-400' : conversionCompleted ? 'bg-green-600' : 'bg-indigo-600 hover:bg-indigo-700'
//                       }`}
//                       onClick={convertCurrencies}
//                       disabled={isConverting || conversionCompleted}
//                     >
//                       {isConverting ? (
//                         <span className="flex items-center">
//                           <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                           </svg>
//                           Converting Currencies...
//                         </span>
//                       ) : conversionCompleted ? (
//                         <span className="flex items-center">
//                           <Check className="h-4 w-4 mr-1" />
//                           Completed
//                         </span>
//                       ) : (
//                         'Convert Currencies'
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FXConversionStep;



// import React, { useState, useEffect } from 'react';
// import { Plus, Check, X, ChevronDown, ChevronUp } from 'lucide-react';

// const FXConversionStep = ({ onBack, onNext }) => {
//   const [isConfigOpen, setIsConfigOpen] = useState(false);
//   const [isFetchingRates, setIsFetchingRates] = useState(false);
//   const [ratesFetched, setRatesFetched] = useState(false);
//   const [isConverting, setIsConverting] = useState(false);
//   const [conversionCompleted, setConversionCompleted] = useState(false);
//   const [fxConverted, setFxConverted] = useState(false);
//   const [isFxDropdownOpen, setIsFxDropdownOpen] = useState(false);

//   // Get today's date in the format YYYY-MM-DD
//   const today = new Date().toISOString().split('T')[0];

//   // Currency rates - in a real app these would be fetched from an API
//   const [currencyRates, setCurrencyRates] = useState([
//     { currency: "USD", date: today, rateToINR: 83 },
//     { currency: "EUR", date: today, rateToINR: 90 },
//     { currency: "INR", date: today, rateToINR: 1 }
//   ]);

//   // Transaction data
//   const transactionData = [
//     { transactionId: 1, date: "2025-04-30", accountCode: "4001", description: "Sales", debit: 0, credit: 50000, currency: "USD", entity: "US01", canonicalAccount: "REVENUE_SALES", accountName: "Sales Revenue" },
//     { transactionId: 2, date: "2025-04-30", accountCode: "5005", description: "COGS", debit: 20000, credit: 0, currency: "USD", entity: "US01", canonicalAccount: "COGS", accountName: "Cost of Goods Sold" },
//     { transactionId: 3, date: "2025-04-30", accountCode: "6200", description: "Rent", debit: 3000, credit: 0, currency: "EUR", entity: "EU01", canonicalAccount: "OPEX_RENT", accountName: "Office Rent" },
//     { transactionId: 4, date: "2025-04-30", accountCode: "4001", description: "Sales (India)", debit: 0, credit: 300000, currency: "INR", entity: "IN01", canonicalAccount: "REVENUE_SALES", accountName: "Sales Revenue" },
//     { transactionId: 5, date: "2025-04-30", accountCode: "9001", description: "Inter‑co Revenue", debit: 0, credit: 10000, currency: "USD", entity: "US01", canonicalAccount: "IC_REVENUE", accountName: "Inter‑company Revenue" },
//     { transactionId: 6, date: "2025-04-30", accountCode: "9101", description: "Inter‑co Expense", debit: 10000, credit: 0, currency: "USD", entity: "IN01", canonicalAccount: "IC_EXPENSE", accountName: "Inter‑company Expense" }
//   ];

//   // Calculate converted transactions
//   const getConvertedTransactions = () => {
//     return transactionData.map(transaction => {
//       const rate = currencyRates.find(rate => rate.currency === transaction.currency)?.rateToINR || 1;
      
//       return {
//         ...transaction,
//         date: today, // Update to today's date
//         rateToINR: rate,
//         debitINR: transaction.debit * rate,
//         creditINR: transaction.credit * rate
//       };
//     });
//   };

//   const [convertedTransactions, setConvertedTransactions] = useState([]);

//   const openConfig = () => {
//     setIsConfigOpen(true);
//   };

//   const closeConfig = () => {
//     setIsConfigOpen(false);
//   };

//   const fetchRates = () => {
//     setIsFetchingRates(true);
    
//     // Fetch real-time rates from a public API
//     fetch('https://open.er-api.com/v6/latest/INR')
//       .then(response => response.json())
//       .then(data => {
//         // Calculate rates to INR (inverse of rates from INR)
//         const usdToInr = 1 / data.rates.USD;
//         const eurToInr = 1 / data.rates.EUR;
        
//         setCurrencyRates([
//           { currency: "USD", date: today, rateToINR: usdToInr },
//           { currency: "EUR", date: today, rateToINR: eurToInr },
//           { currency: "INR", date: today, rateToINR: 1 }
//         ]);
        
//         setIsFetchingRates(false);
//         setRatesFetched(true);
//       })
//       .catch(error => {
//         console.error('Error fetching rates:', error);
//         // Fallback to default rates if API fails
//         setCurrencyRates([
//           { currency: "USD", date: today, rateToINR: 83.25 },
//           { currency: "EUR", date: today, rateToINR: 90.78 },
//           { currency: "INR", date: today, rateToINR: 1 }
//         ]);
//         setIsFetchingRates(false);
//         setRatesFetched(true);
//       });
//   };

//   const convertCurrencies = () => {
//     setIsConverting(true);
    
//     // Simulate processing with a timeout
//     setTimeout(() => {
//       setConvertedTransactions(getConvertedTransactions());
//       setIsConverting(false);
//       setConversionCompleted(true);
      
//       // Close the modal and add the converted data after a short delay
//       setTimeout(() => {
//         setIsConfigOpen(false);
//         setFxConverted(true);
//       }, 1000);
//     }, 2000);
//   };

//   const toggleFxDropdown = () => {
//     setIsFxDropdownOpen(!isFxDropdownOpen);
//   };

//   return (
//     <div className="px-6 py-6 relative">
//       <div className="flex justify-between items-center mb-4">
//         <div className="text-gray-700">
//           <span className="font-medium">Mapping Files 1/1</span>
//           <span className="mx-2 text-gray-400">|</span>
//           <span className="text-gray-500">Task completion date: 09/05/2025</span>
//         </div>
//         <button 
//           className="flex items-center space-x-1 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm text-gray-600"
//           onClick={openConfig}
//         >
//           <Plus className="h-4 w-4" />
//           <span>Add configuration task</span>
//         </button>
//       </div>
      
//       {/* Table */}
//       <div className="bg-white rounded-lg shadow-sm overflow-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead>
//             <tr className="bg-gray-50">
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tag</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 <div className="flex items-center">
//                   Assignee
//                   <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </div>
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Update</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lock</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {/* GL FX Converted Row - Only shown after conversion is completed */}
//             {fxConverted && (
//               <>
//                 <tr 
//                   className="cursor-pointer hover:bg-gray-50" 
//                   onClick={toggleFxDropdown}
//                 >
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//                       </svg>
//                       <span className="text-sm font-medium text-gray-900">GL FX Converted</span>
//                       {isFxDropdownOpen ? (
//                         <ChevronUp className="ml-2 h-4 w-4 text-gray-500" />
//                       ) : (
//                         <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
//                       )}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap"></td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
//                       <span className="text-white font-medium">S</span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{today.replace(/-/g, '/')}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className="flex-shrink-0 h-2 w-2 rounded-full bg-green-500 mr-2"></div>
//                       <div className="text-sm text-gray-500 bg-green-50 px-2 py-0.5 rounded">Data Updated</div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap"></td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className="px-2.5 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium flex items-center w-fit">
//                       <Check className="h-3.5 w-3.5 mr-1" />
//                       Completed
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap"></td>
//                 </tr>

//                 {/* Dropdown content for GL FX Converted */}
//                 {isFxDropdownOpen && (
//                   <tr>
//                     <td colSpan="8" className="px-6 py-4">
//                       <div className="bg-gray-50 rounded-md p-4 overflow-x-auto">
//                         <table className="min-w-full divide-y divide-gray-200">
//                           <thead>
//                             <tr>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Account Code</th>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Debit</th>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Credit</th>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Currency</th>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Entity</th>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Canonical Account</th>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Account Name</th>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Rate To INR</th>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Debit INR</th>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Credit INR</th>
//                             </tr>
//                           </thead>
//                           <tbody className="bg-white divide-y divide-gray-200">
//                             {convertedTransactions.map((transaction, index) => (
//                               <tr key={index} className="hover:bg-gray-50">
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.transactionId}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.date}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.accountCode}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.description}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.debit.toLocaleString()}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.credit.toLocaleString()}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.currency}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.entity}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.canonicalAccount}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.accountName}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.rateToINR.toFixed(2)}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.debitINR.toLocaleString()}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.creditINR.toLocaleString()}</td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </>
//             )}
            
//             {/* Original FX Rates Row */}
//             <tr>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="flex items-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//                   </svg>
//                   <span className="text-sm font-medium text-gray-900">FX Rates</span>
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap"></td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
//                   <span className="text-white font-medium">S</span>
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">09/11/2023</td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="flex items-center">
//                   <div className="flex-shrink-0 h-2 w-2 rounded-full bg-green-500 mr-2"></div>
//                   <div className="text-sm text-gray-500 bg-green-50 px-2 py-0.5 rounded">Data Updated</div>
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap"></td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <span className="px-2.5 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium flex items-center w-fit">
//                   <Check className="h-3.5 w-3.5 mr-1" />
//                   Completed
//                 </span>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap"></td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
      
//       {/* Navigation buttons */}
//       <div className="flex justify-between mt-6">
//         <button 
//           className="px-5 py-2 bg-white border border-gray-300 text-gray-700 rounded-md font-medium flex items-center"
//           onClick={onBack}
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//           </svg>
//           Back
//         </button>
//         <button 
//           className="px-5 py-2 bg-indigo-600 text-white rounded-md font-medium"
//           onClick={onNext}
//         >
//           Next
//         </button>
//       </div>
      
//       {/* Configuration Task Modal */}
//       {isConfigOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-xl w-3/4 max-w-4xl max-h-[90vh] overflow-y-auto">
//             {/* Modal Header */}
//             <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//               <h3 className="text-lg font-medium text-gray-900">FX Rate Configuration</h3>
//               <button 
//                 className="text-gray-400 hover:text-gray-500"
//                 onClick={closeConfig}
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </div>
            
//             {/* Modal Content */}
//             <div className="px-6 py-4">
//               {!ratesFetched ? (
//                 <div className="text-center py-10">
//                   <button 
//                     className={`px-4 py-2 rounded-md text-white font-medium ${
//                       isFetchingRates ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
//                     }`}
//                     onClick={fetchRates}
//                     disabled={isFetchingRates}
//                   >
//                     {isFetchingRates ? (
//                       <span className="flex items-center">
//                         <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                         </svg>
//                         Fetching Rates...
//                       </span>
//                     ) : (
//                       'Fetch Rates'
//                     )}
//                   </button>
//                 </div>
//               ) : (
//                 <div>
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200">
//                       <thead>
//                         <tr>
//                           <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Currency</th>
//                           <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                           <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate To INR</th>
//                         </tr>
//                       </thead>
//                       <tbody className="bg-white divide-y divide-gray-200">
//                         {currencyRates.map((rate, index) => (
//                           <tr key={index}>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rate.currency}</td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rate.date}</td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rate.rateToINR.toFixed(2)}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
                  
//                   <div className="mt-6 flex justify-end">
//                     <button 
//                       className={`px-4 py-2 rounded-md text-white font-medium ${
//                         isConverting ? 'bg-indigo-400' : conversionCompleted ? 'bg-green-600' : 'bg-indigo-600 hover:bg-indigo-700'
//                       }`}
//                       onClick={convertCurrencies}
//                       disabled={isConverting || conversionCompleted}
//                     >
//                       {isConverting ? (
//                         <span className="flex items-center">
//                           <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                           </svg>
//                           Converting Currencies...
//                         </span>
//                       ) : conversionCompleted ? (
//                         <span className="flex items-center">
//                           <Check className="h-4 w-4 mr-1" />
//                           Completed
//                         </span>
//                       ) : (
//                         'Convert Currencies'
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FXConversionStep;



// import React, { useState, useEffect } from 'react';
// import { Plus, Check, X, ChevronDown, ChevronUp } from 'lucide-react';

// const FXConversionStep = ({ onBack, onNext }) => {
//   const [isConfigOpen, setIsConfigOpen] = useState(false);
//   const [isFetchingRates, setIsFetchingRates] = useState(false);
//   const [ratesFetched, setRatesFetched] = useState(false);
//   const [isConverting, setIsConverting] = useState(false);
//   const [conversionCompleted, setConversionCompleted] = useState(false);
//   const [fxConverted, setFxConverted] = useState(false);
//   const [isFxDropdownOpen, setIsFxDropdownOpen] = useState(false);
//   const [isFxRatesDropdownOpen, setIsFxRatesDropdownOpen] = useState(false);

//   // Get today's date in the format YYYY-MM-DD
//   const today = new Date().toISOString().split('T')[0];

//   // Currency rates - in a real app these would be fetched from an API
//   const [currencyRates, setCurrencyRates] = useState([
//     { currency: "USD", date: today, rateToINR: 83 },
//     { currency: "EUR", date: today, rateToINR: 90 },
//     { currency: "INR", date: today, rateToINR: 1 }
//   ]);

//   // Transaction data
//   const transactionData = [
//     { transactionId: 1, date: "2025-04-30", accountCode: "4001", description: "Sales", debit: 0, credit: 50000, currency: "USD", entity: "US01", canonicalAccount: "REVENUE_SALES", accountName: "Sales Revenue" },
//     { transactionId: 2, date: "2025-04-30", accountCode: "5005", description: "COGS", debit: 20000, credit: 0, currency: "USD", entity: "US01", canonicalAccount: "COGS", accountName: "Cost of Goods Sold" },
//     { transactionId: 3, date: "2025-04-30", accountCode: "6200", description: "Rent", debit: 3000, credit: 0, currency: "EUR", entity: "EU01", canonicalAccount: "OPEX_RENT", accountName: "Office Rent" },
//     { transactionId: 4, date: "2025-04-30", accountCode: "4001", description: "Sales (India)", debit: 0, credit: 300000, currency: "INR", entity: "IN01", canonicalAccount: "REVENUE_SALES", accountName: "Sales Revenue" },
//     { transactionId: 5, date: "2025-04-30", accountCode: "9001", description: "Inter‑co Revenue", debit: 0, credit: 10000, currency: "USD", entity: "US01", canonicalAccount: "IC_REVENUE", accountName: "Inter‑company Revenue" },
//     { transactionId: 6, date: "2025-04-30", accountCode: "9101", description: "Inter‑co Expense", debit: 10000, credit: 0, currency: "USD", entity: "IN01", canonicalAccount: "IC_EXPENSE", accountName: "Inter‑company Expense" }
//   ];

//   // Calculate converted transactions
//   const getConvertedTransactions = () => {
//     return transactionData.map(transaction => {
//       const rate = currencyRates.find(rate => rate.currency === transaction.currency)?.rateToINR || 1;
      
//       return {
//         ...transaction,
//         date: today, // Update to today's date
//         rateToINR: rate,
//         debitINR: transaction.debit * rate,
//         creditINR: transaction.credit * rate
//       };
//     });
//   };

//   const [convertedTransactions, setConvertedTransactions] = useState([]);

//   const openConfig = () => {
//     setIsConfigOpen(true);
//   };

//   const closeConfig = () => {
//     setIsConfigOpen(false);
//   };

//   const fetchRates = () => {
//     setIsFetchingRates(true);
    
//     // Fetch real-time rates from a public API
//     fetch('https://open.er-api.com/v6/latest/INR')
//       .then(response => response.json())
//       .then(data => {
//         // Calculate rates to INR (inverse of rates from INR)
//         const usdToInr = 1 / data.rates.USD;
//         const eurToInr = 1 / data.rates.EUR;
        
//         setCurrencyRates([
//           { currency: "USD", date: today, rateToINR: usdToInr },
//           { currency: "EUR", date: today, rateToINR: eurToInr },
//           { currency: "INR", date: today, rateToINR: 1 }
//         ]);
        
//         setIsFetchingRates(false);
//         setRatesFetched(true);
//       })
//       .catch(error => {
//         console.error('Error fetching rates:', error);
//         // Fallback to default rates if API fails
//         setCurrencyRates([
//           { currency: "USD", date: today, rateToINR: 83.25 },
//           { currency: "EUR", date: today, rateToINR: 90.78 },
//           { currency: "INR", date: today, rateToINR: 1 }
//         ]);
//         setIsFetchingRates(false);
//         setRatesFetched(true);
//       });
//   };

//   const convertCurrencies = () => {
//     setIsConverting(true);
    
//     // Simulate processing with a timeout
//     setTimeout(() => {
//       setConvertedTransactions(getConvertedTransactions());
//       setIsConverting(false);
//       setConversionCompleted(true);
      
//       // Close the modal and add the converted data after a short delay
//       setTimeout(() => {
//         setIsConfigOpen(false);
//         setFxConverted(true);
//       }, 1000);
//     }, 2000);
//   };

//   const toggleFxDropdown = () => {
//     setIsFxDropdownOpen(!isFxDropdownOpen);
//   };

//   const toggleFxRatesDropdown = () => {
//     setIsFxRatesDropdownOpen(!isFxRatesDropdownOpen);
//   };

//   return (
//     <div className="px-6 py-6 relative">
//       <div className="flex justify-between items-center mb-4">
//         <div className="text-gray-700">
//           <span className="font-medium">Mapping Files 1/1</span>
//           <span className="mx-2 text-gray-400">|</span>
//           <span className="text-gray-500">Task completion date: 09/05/2025</span>
//         </div>
//         <button 
//           className="flex items-center space-x-1 px-3 py-1.5 bg-purple-300 border border-purple-400 shadow-2xs rounded-md text-sm text-black cursor-pointer hover:bg-purple-400 hover:text-white transition duration-200 ease-in-out"
//           onClick={openConfig}
//         >
//           <Plus className="h-4 w-4" />
//           <span>FX Rates</span>
//         </button>
//       </div>
      
//       {/* Table */}
//       <div className="bg-white rounded-lg shadow-sm overflow-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead>
//             <tr className="bg-gray-50">
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tag</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 <div className="flex items-center">
//                   Assignee
//                   <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </div>
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Update</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lock</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {/* GL FX Converted Row - Only shown after conversion is completed */}
//             {fxConverted && (
//               <>
//                 <tr 
//                   className="cursor-pointer hover:bg-gray-50" 
//                   onClick={toggleFxDropdown}
//                 >
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//                       </svg>
//                       <span className="text-sm font-medium text-gray-900">GL FX Converted</span>
//                       {isFxDropdownOpen ? (
//                         <ChevronUp className="ml-2 h-4 w-4 text-gray-500" />
//                       ) : (
//                         <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
//                       )}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap"></td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
//                       <span className="text-white font-medium">S</span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{today.replace(/-/g, '/')}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className="flex-shrink-0 h-2 w-2 rounded-full bg-green-500 mr-2"></div>
//                       <div className="text-sm text-gray-500 bg-green-50 px-2 py-0.5 rounded">Data Updated</div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap"></td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className="px-2.5 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium flex items-center w-fit">
//                       <Check className="h-3.5 w-3.5 mr-1" />
//                       Completed
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap"></td>
//                 </tr>

//                 {/* Dropdown content for GL FX Converted */}
//                 {isFxDropdownOpen && (
//                   <tr>
//                     <td colSpan="8" className="px-6 py-4">
//                       <div className="bg-gray-50 rounded-md p-4 overflow-x-auto">
//                         <table className="min-w-full divide-y divide-gray-200">
//                           <thead>
//                             <tr>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Account Code</th>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Debit</th>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Credit</th>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Currency</th>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Entity</th>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Canonical Account</th>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Account Name</th>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Rate To INR</th>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Debit INR</th>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Credit INR</th>
//                             </tr>
//                           </thead>
//                           <tbody className="bg-white divide-y divide-gray-200">
//                             {convertedTransactions.map((transaction, index) => (
//                               <tr key={index} className="hover:bg-gray-50">
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.transactionId}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.date}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.accountCode}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.description}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.debit.toLocaleString()}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.credit.toLocaleString()}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.currency}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.entity}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.canonicalAccount}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.accountName}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.rateToINR.toFixed(2)}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.debitINR.toLocaleString()}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.creditINR.toLocaleString()}</td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </>
//             )}
            
//             {/* FX Rates Row */}
//             <tr 
//               className="cursor-pointer hover:bg-gray-50"
//               onClick={toggleFxRatesDropdown}
//             >
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="flex items-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//                   </svg>
//                   <span className="text-sm font-medium text-gray-900">FX Rates</span>
//                   {isFxRatesDropdownOpen ? (
//                     <ChevronUp className="ml-2 h-4 w-4 text-gray-500" />
//                   ) : (
//                     <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
//                   )}
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap"></td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
//                   <span className="text-white font-medium">S</span>
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                 {ratesFetched ? today.replace(/-/g, '/') : '09/11/2023'}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="flex items-center">
//                   <div className="flex-shrink-0 h-2 w-2 rounded-full bg-green-500 mr-2"></div>
//                   <div className="text-sm text-gray-500 bg-green-50 px-2 py-0.5 rounded">
//                     {ratesFetched ? 'Real-time Data' : 'Data Updated'}
//                   </div>
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap"></td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <span className="px-2.5 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium flex items-center w-fit">
//                   <Check className="h-3.5 w-3.5 mr-1" />
//                   Completed
//                 </span>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap"></td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
      
//       {/* FX Rates Dropdown (separate from main table for better toggle control) */}
//       {isFxRatesDropdownOpen && (
//         <div className="mt-1 bg-gray-50 rounded-md p-4 overflow-x-auto mb-4">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead>
//               <tr>
//                 <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Currency</th>
//                 <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
//                 <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Rate To INR</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {currencyRates.map((rate, index) => (
//                 <tr key={index} className="hover:bg-gray-50">
//                   <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{rate.currency}</td>
//                   <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{rate.date}</td>
//                   <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{rate.rateToINR.toFixed(2)}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
      
//       {/* Navigation buttons */}
//       <div className="flex justify-between mt-6">
//         <button 
//           className="px-5 py-2 bg-white border border-gray-300 text-gray-700 rounded-md font-medium flex items-center"
//           onClick={onBack}
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//           </svg>
//           Back
//         </button>
//         <button 
//           className="px-5 py-2 bg-indigo-600 text-white rounded-md font-medium"
//           onClick={onNext}
//         >
//           Next
//         </button>
//       </div>
      
//       {/* Configuration Task Modal */}
//       {isConfigOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-xl w-3/4 max-w-4xl max-h-[90vh] overflow-y-auto">
//             {/* Modal Header */}
//             <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//               <h3 className="text-lg font-medium text-gray-900">FX Rate Configuration</h3>
//               <button 
//                 className="text-gray-400 hover:text-gray-500"
//                 onClick={closeConfig}
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </div>
            
//             {/* Modal Content */}
//             <div className="px-6 py-4">
//               {!ratesFetched ? (
//                 <div className="text-center py-10">
//                   <button 
//                     className={`px-4 py-2 rounded-md text-white font-medium ${
//                       isFetchingRates ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
//                     }`}
//                     onClick={fetchRates}
//                     disabled={isFetchingRates}
//                   >
//                     {isFetchingRates ? (
//                       <span className="flex items-center">
//                         <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                         </svg>
//                         Fetching Rates...
//                       </span>
//                     ) : (
//                       'Fetch Rates'
//                     )}
//                   </button>
//                 </div>
//               ) : (
//                 <div>
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200">
//                       <thead>
//                         <tr>
//                           <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Currency</th>
//                           <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                           <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate To INR</th>
//                         </tr>
//                       </thead>
//                       <tbody className="bg-white divide-y divide-gray-200">
//                         {currencyRates.map((rate, index) => (
//                           <tr key={index}>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rate.currency}</td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rate.date}</td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rate.rateToINR.toFixed(2)}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
                  
//                   <div className="mt-6 flex justify-end">
//                     <button 
//                       className={`px-4 py-2 rounded-md text-white font-medium ${
//                         isConverting ? 'bg-indigo-400' : conversionCompleted ? 'bg-green-600' : 'bg-indigo-600 hover:bg-indigo-700'
//                       }`}
//                       onClick={convertCurrencies}
//                       disabled={isConverting || conversionCompleted}
//                     >
//                       {isConverting ? (
//                         <span className="flex items-center">
//                           <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                           </svg>
//                           Converting Currencies...
//                         </span>
//                       ) : conversionCompleted ? (
//                         <span className="flex items-center">
//                           <Check className="h-4 w-4 mr-1" />
//                           Completed
//                         </span>
//                       ) : (
//                         'Convert Currencies'
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FXConversionStep;


import React, { useState, useEffect } from 'react';
import { Plus, Check, X, ChevronDown, ChevronUp } from 'lucide-react';

const FXConversionStep = ({ onBack, onNext }) => {
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isFetchingRates, setIsFetchingRates] = useState(false);
  const [ratesFetched, setRatesFetched] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionCompleted, setConversionCompleted] = useState(false);
  const [fxConverted, setFxConverted] = useState(false);
  const [isFxDropdownOpen, setIsFxDropdownOpen] = useState(false);
  const [isFxRatesDropdownOpen, setIsFxRatesDropdownOpen] = useState(false);

  // Get today's date in the format YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  // Currency rates - in a real app these would be fetched from an API
  const [currencyRates, setCurrencyRates] = useState([
    { currency: "USD", date: today, rateToINR: 83 },
    { currency: "EUR", date: today, rateToINR: 90 },
    { currency: "INR", date: today, rateToINR: 1 }
  ]);

  // Transaction data
  const transactionData = [
    { transactionId: 1, date: "2025-04-30", accountCode: "4001", description: "Sales", debit: 0, credit: 50000, currency: "USD", entity: "US01", canonicalAccount: "REVENUE_SALES", accountName: "Sales Revenue" },
    { transactionId: 2, date: "2025-04-30", accountCode: "5005", description: "COGS", debit: 20000, credit: 0, currency: "USD", entity: "US01", canonicalAccount: "COGS", accountName: "Cost of Goods Sold" },
    { transactionId: 3, date: "2025-04-30", accountCode: "6200", description: "Rent", debit: 3000, credit: 0, currency: "EUR", entity: "EU01", canonicalAccount: "OPEX_RENT", accountName: "Office Rent" },
    { transactionId: 4, date: "2025-04-30", accountCode: "4001", description: "Sales (India)", debit: 0, credit: 300000, currency: "INR", entity: "IN01", canonicalAccount: "REVENUE_SALES", accountName: "Sales Revenue" },
    { transactionId: 5, date: "2025-04-30", accountCode: "9001", description: "Inter‑co Revenue", debit: 0, credit: 10000, currency: "USD", entity: "US01", canonicalAccount: "IC_REVENUE", accountName: "Inter‑company Revenue" },
    { transactionId: 6, date: "2025-04-30", accountCode: "9101", description: "Inter‑co Expense", debit: 10000, credit: 0, currency: "USD", entity: "IN01", canonicalAccount: "IC_EXPENSE", accountName: "Inter‑company Expense" }
  ];

  // Calculate converted transactions
  const getConvertedTransactions = () => {
    return transactionData.map(transaction => {
      const rate = currencyRates.find(rate => rate.currency === transaction.currency)?.rateToINR || 1;
      
      return {
        ...transaction,
        date: today, // Update to today's date
        rateToINR: rate,
        debitINR: transaction.debit * rate,
        creditINR: transaction.credit * rate
      };
    });
  };

  const [convertedTransactions, setConvertedTransactions] = useState([]);

  const openConfig = () => {
    setIsConfigOpen(true);
  };

  const closeConfig = () => {
    setIsConfigOpen(false);
  };

  const fetchRates = () => {
    setIsFetchingRates(true);
    
    // Fetch real-time rates from a public API
    fetch('https://open.er-api.com/v6/latest/INR')
      .then(response => response.json())
      .then(data => {
        // Calculate rates to INR (inverse of rates from INR)
        const usdToInr = 1 / data.rates.USD;
        const eurToInr = 1 / data.rates.EUR;
        
        setCurrencyRates([
          { currency: "USD", date: today, rateToINR: usdToInr },
          { currency: "EUR", date: today, rateToINR: eurToInr },
          { currency: "INR", date: today, rateToINR: 1 }
        ]);
        
        setIsFetchingRates(false);
        setRatesFetched(true);
      })
      .catch(error => {
        console.error('Error fetching rates:', error);
        // Fallback to default rates if API fails
        setCurrencyRates([
          { currency: "USD", date: today, rateToINR: 83.25 },
          { currency: "EUR", date: today, rateToINR: 90.78 },
          { currency: "INR", date: today, rateToINR: 1 }
        ]);
        setIsFetchingRates(false);
        setRatesFetched(true);
      });
  };

  const convertCurrencies = () => {
    setIsConverting(true);
    
    // Simulate processing with a timeout
    setTimeout(() => {
      setConvertedTransactions(getConvertedTransactions());
      setIsConverting(false);
      setConversionCompleted(true);
      
      // Close the modal and add the converted data after a short delay
      setTimeout(() => {
        setIsConfigOpen(false);
        setFxConverted(true);
      }, 1000);
    }, 2000);
  };

  const toggleFxDropdown = () => {
    setIsFxDropdownOpen(!isFxDropdownOpen);
  };

  const toggleFxRatesDropdown = () => {
    setIsFxRatesDropdownOpen(!isFxRatesDropdownOpen);
  };

  return (
    <div className="px-6 py-6 relative">
      <div className="flex justify-between items-center mb-4">
        <div className="text-gray-700">
          <span className="font-medium">Mapping Files 1/1</span>
          <span className="mx-2 text-gray-400">|</span>
          <span className="text-gray-500">Task completion date: 09/05/2025</span>
        </div>
        <button 
          className="flex items-center space-x-1 px-3 py-1.5 bg-purple-300 border border-purple-400 shadow-2xs rounded-md text-sm text-black cursor-pointer hover:bg-purple-400 hover:text-white transition duration-200 ease-in-out"
          onClick={openConfig}
        >
          <Plus className="h-4 w-4" />
          <span>FX Rates</span>
        </button>
      </div>
      
      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tag</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  Assignee
                  <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Update</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lock</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* GL FX Converted Row - Only shown after conversion is completed */}
            {fxConverted && (
              <>
                <tr 
                  className="cursor-pointer hover:bg-gray-50" 
                  onClick={toggleFxDropdown}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-900">GL FX Converted</span>
                      {isFxDropdownOpen ? (
                        <ChevronUp className="ml-2 h-4 w-4 text-gray-500" />
                      ) : (
                        <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap"></td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                      <span className="text-white font-medium">S</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{today.replace(/-/g, '/')}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      <div className="text-sm text-gray-500 bg-green-50 px-2 py-0.5 rounded">Data Updated</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap"></td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium flex items-center w-fit">
                      <Check className="h-3.5 w-3.5 mr-1" />
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap"></td>
                </tr>

                {/* Dropdown content for GL FX Converted */}
                {isFxDropdownOpen && (
                  <tr>
                    <td colSpan="8" className="px-6 py-4">
                      <div className="bg-gray-50 rounded-md p-4 overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Account Code</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Debit</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Credit</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Currency</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Entity</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Canonical Account</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Account Name</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Rate To INR</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Debit INR</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Credit INR</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {convertedTransactions.map((transaction, index) => (
                              <tr key={index} className="hover:bg-gray-50">
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.transactionId}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.date}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.accountCode}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.description}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.debit.toLocaleString()}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.credit.toLocaleString()}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.currency}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.entity}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.canonicalAccount}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.accountName}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.rateToINR.toFixed(2)}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.debitINR.toLocaleString()}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.creditINR.toLocaleString()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            )}
            
            {/* FX Rates Row */}
            <tr 
              className={`${ratesFetched ? 'cursor-pointer hover:bg-gray-50' : ''}`}
              onClick={ratesFetched ? toggleFxRatesDropdown : undefined}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900">FX Rates</span>
                  {ratesFetched && (
                    isFxRatesDropdownOpen ? (
                      <ChevronUp className="ml-2 h-4 w-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
                    )
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap"></td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white font-medium">S</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {ratesFetched ? today.replace(/-/g, '/') : '09/11/2023'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <div className="text-sm text-gray-500 bg-green-50 px-2 py-0.5 rounded">
                    {ratesFetched ? 'Real-time Data' : 'Data Updated'}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap"></td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2.5 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium flex items-center w-fit">
                  <Check className="h-3.5 w-3.5 mr-1" />
                  Completed
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap"></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* FX Rates Dropdown (separate from main table for better toggle control) */}
      {isFxRatesDropdownOpen && (
        <div className="mt-1 bg-gray-50 rounded-md p-4 overflow-x-auto mb-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Currency</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Rate To INR</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currencyRates.map((rate, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{rate.currency}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{rate.date}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{rate.rateToINR.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Navigation buttons */}
      <div className="flex justify-between mt-6">
        <button 
          className="px-5 py-2 bg-white border border-gray-300 text-gray-700 rounded-md font-medium flex items-center"
          onClick={onBack}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>
        <button 
          className="px-5 py-2 bg-indigo-600 text-white rounded-md font-medium"
          onClick={onNext}
        >
          Next
        </button>
      </div>
      
      {/* Configuration Task Modal */}
      {isConfigOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-3/4 max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">FX Rate Configuration</h3>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={closeConfig}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="px-6 py-4">
              {!ratesFetched ? (
                <div className="text-center py-10">
                  <button 
                    className={`px-4 py-2 rounded-md text-white font-medium ${
                      isFetchingRates ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                    onClick={fetchRates}
                    disabled={isFetchingRates}
                  >
                    {isFetchingRates ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Fetching Rates...
                      </span>
                    ) : (
                      'Fetch Rates'
                    )}
                  </button>
                </div>
              ) : (
                <div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Currency</th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate To INR</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {currencyRates.map((rate, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rate.currency}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rate.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rate.rateToINR.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <button 
                      className={`px-4 py-2 rounded-md text-white font-medium ${
                        isConverting ? 'bg-indigo-400' : conversionCompleted ? 'bg-green-600' : 'bg-indigo-600 hover:bg-indigo-700'
                      }`}
                      onClick={convertCurrencies}
                      disabled={isConverting || conversionCompleted}
                    >
                      {isConverting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Converting Currencies...
                        </span>
                      ) : conversionCompleted ? (
                        <span className="flex items-center">
                          <Check className="h-4 w-4 mr-1" />
                          Completed
                        </span>
                      ) : (
                        'Convert Currencies'
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FXConversionStep;