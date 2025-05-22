// // ChartOfAccountsStep.jsx
// import React from 'react';
// import { Plus, Check } from 'lucide-react';

// const ChartOfAccountsStep = ({ onBack, onNext }) => {
//   return (
//     <div className="px-6 py-6">
      
//       <div className="flex justify-between items-center mb-4">
//         <div className="text-gray-700">
//           <span className="font-medium">Mapping Files 1/2</span>
//           <span className="mx-2 text-gray-400">|</span>
//           <span className="text-gray-500">Task completion date: 09/05/2025</span>
//         </div>
//         <button className="flex items-center space-x-1 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm text-gray-600">
//           <Plus className="h-4 w-4" />
//           <span>CoA Mapper</span>
//         </button>
//       </div>
      
//       {/* Table */}
//       <div className="bg-white rounded-lg shadow-sm overflow-hidden overflow-x-auto">
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
//             {/* Row 1 */}
//             <tr>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="flex items-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//                   </svg>
//                   <span className="text-sm font-medium text-gray-900">DR CoA</span>
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap"></td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
//                   <span className="text-white font-medium">S</span>
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">03/28/2024</td>
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
            
//             {/* Row 2 */}
//             <tr>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="flex items-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//                   </svg>
//                   <span className="text-sm font-medium text-gray-900">Customer CoA</span>
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap"></td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
//                   <span className="text-white font-medium">S</span>
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">08/07/2024</td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="flex items-center">
//                   <div className="flex-shrink-0 h-2 w-2 rounded-full bg-yellow-500 mr-2"></div>
//                   <div className="text-sm text-yellow-700 bg-yellow-50 px-2 py-0.5 rounded">1 Unmapped Items</div>
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-medium">Update Unmapped Items</button>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <button className="px-3 py-1 bg-white border border-gray-300 text-gray-600 rounded text-xs font-medium">Mark Complete</button>
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

// export default ChartOfAccountsStep;



// import React, { useState, useEffect } from 'react';
// import { Plus, Check, X, ChevronDown, ChevronUp } from 'lucide-react';

// const ChartOfAccountsStep = ({ onBack, onNext }) => {
//   const [isMapperOpen, setIsMapperOpen] = useState(false);
//   const [isGeneratingMappings, setIsGeneratingMappings] = useState(false);
//   const [mappingsGenerated, setMappingsGenerated] = useState(false);
//   const [isMappingData, setIsMappingData] = useState(false);
//   const [mappingCompleted, setMappingCompleted] = useState(false);
//   const [mappedDataAdded, setMappedDataAdded] = useState(false);
//   const [isMappedDataOpen, setIsMappedDataOpen] = useState(false);

//   const mappingData = [
//     { sourceAccountCode: "4001", canonicalAccount: "REVENUE_SALES", accountName: "Sales Revenue" },
//     { sourceAccountCode: "5005", canonicalAccount: "COGS", accountName: "Cost of Goods Sold" },
//     { sourceAccountCode: "6200", canonicalAccount: "OPEX_RENT", accountName: "Office Rent" },
//     { sourceAccountCode: "9001", canonicalAccount: "IC_REVENUE", accountName: "Inter‑company Revenue" },
//     { sourceAccountCode: "9101", canonicalAccount: "IC_EXPENSE", accountName: "Inter‑company Expense" }
//   ];
  
//   const glMappedData = [
//     { transactionId: 1, date: "2025-04-30", accountCode: "4001", description: "Sales", debit: 0, credit: 50000, currency: "USD", entity: "US01", canonicalAccount: "REVENUE_SALES", accountName: "Sales Revenue" },
//     { transactionId: 2, date: "2025-04-30", accountCode: "5005", description: "COGS", debit: 20000, credit: 0, currency: "USD", entity: "US01", canonicalAccount: "COGS", accountName: "Cost of Goods Sold" },
//     { transactionId: 3, date: "2025-04-30", accountCode: "6200", description: "Rent", debit: 3000, credit: 0, currency: "EUR", entity: "EU01", canonicalAccount: "OPEX_RENT", accountName: "Office Rent" },
//     { transactionId: 4, date: "2025-04-30", accountCode: "4001", description: "Sales (India)", debit: 0, credit: 300000, currency: "INR", entity: "IN01", canonicalAccount: "REVENUE_SALES", accountName: "Sales Revenue" },
//     { transactionId: 5, date: "2025-04-30", accountCode: "9001", description: "Inter‑co Revenue", debit: 0, credit: 10000, currency: "USD", entity: "US01", canonicalAccount: "IC_REVENUE", accountName: "Inter‑company Revenue" },
//     { transactionId: 6, date: "2025-04-30", accountCode: "9101", description: "Inter‑co Expense", debit: 10000, credit: 0, currency: "USD", entity: "IN01", canonicalAccount: "IC_EXPENSE", accountName: "Inter‑company Expense" }
//   ];

//   const openMapper = () => {
//     setIsMapperOpen(true);
//   };

//   const closeMapper = () => {
//     setIsMapperOpen(false);
//   };

//   const generateMappings = () => {
//     setIsGeneratingMappings(true);
    
//     // Simulate AI generation process with a timeout
//     setTimeout(() => {
//       setIsGeneratingMappings(false);
//       setMappingsGenerated(true);
//     }, 2000);
//   };

//   const startMappingData = () => {
//     setIsMappingData(true);
    
//     // Simulate mapping process with a timeout
//     setTimeout(() => {
//       setIsMappingData(false);
//       setMappingCompleted(true);
      
//       // Close the modal and add the mapped data row after a short delay
//       setTimeout(() => {
//         setIsMapperOpen(false);
//         setMappedDataAdded(true);
//       }, 1000);
//     }, 2000);
//   };

//   const toggleMappedData = () => {
//     setIsMappedDataOpen(!isMappedDataOpen);
//   };

//   return (
//     <div className="px-6 py-6 relative">
      
//       <div className="flex justify-between items-center mb-4">
//         <div className="text-gray-700">
//           <span className="font-medium">Mapping Files 1/2</span>
//           <span className="mx-2 text-gray-400">|</span>
//           <span className="text-gray-500">Task completion date: 09/05/2025</span>
//         </div>
//         <button 
//           className="flex items-center space-x-1 px-3 py-1.5 bg-purple-300 border border-purple-400 shadow-2xs rounded-md text-sm text-black cursor-pointer hover:bg-purple-400 hover:text-white transition duration-200 ease-in-out"
//           onClick={openMapper}
//         >
//           <Plus className="h-4 w-4" />
//           <span>CoA Mapper</span>
//         </button>
//       </div>
      
//       {/* Table */}
//       <div className="bg-white rounded-lg shadow-sm overflow-hidden overflow-x-auto">
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
//             {/* New Mapped Data Row - Only shown after mapping is completed */}
//             {mappedDataAdded && (
//               <>
//                 <tr 
//                   className="cursor-pointer hover:bg-gray-50" 
//                   onClick={toggleMappedData}
//                 >
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//                       </svg>
//                       <span className="text-sm font-medium text-gray-900">GL Mapped</span>
//                       {isMappedDataOpen ? (
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
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '/')}</td>
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

//                 {/* Dropdown content for Mapped Data */}
//                 {isMappedDataOpen && (
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
//                             </tr>
//                           </thead>
//                           <tbody className="bg-white divide-y divide-gray-200">
//                             {glMappedData.map((item, index) => (
//                               <tr key={index} className="hover:bg-gray-50">
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.transactionId}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.date}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.accountCode}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.description}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.debit.toLocaleString()}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.credit.toLocaleString()}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.currency}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.entity}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.canonicalAccount}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.accountName}</td>
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
            
//             {/* Row 1 */}
//             <tr>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="flex items-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//                   </svg>
//                   <span className="text-sm font-medium text-gray-900">DR CoA</span>
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap"></td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
//                   <span className="text-white font-medium">S</span>
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">03/28/2024</td>
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
            
//             {/* Row 2 */}
//             <tr>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="flex items-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//                   </svg>
//                   <span className="text-sm font-medium text-gray-900">Customer CoA</span>
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap"></td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
//                   <span className="text-white font-medium">S</span>
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">08/07/2024</td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="flex items-center">
//                   <div className="flex-shrink-0 h-2 w-2 rounded-full bg-yellow-500 mr-2"></div>
//                   <div className="text-sm text-yellow-700 bg-yellow-50 px-2 py-0.5 rounded">1 Unmapped Items</div>
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-medium">Update Unmapped Items</button>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <button className="px-3 py-1 bg-white border border-gray-300 text-gray-600 rounded text-xs font-medium">Mark Complete</button>
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
      
//       {/* CoA Mapper Modal */}
//       {isMapperOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-xl w-3/4 max-w-4xl max-h-[90vh] overflow-y-auto">
//             {/* Modal Header */}
//             <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//               <h3 className="text-lg font-medium text-gray-900">Chart of Accounts Mapper</h3>
//               <button 
//                 className="text-gray-400 hover:text-gray-500"
//                 onClick={closeMapper}
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </div>
            
//             {/* Modal Content */}
//             <div className="px-6 py-4">
//               {!mappingsGenerated ? (
//                 <div className="text-center py-10">
//                   <button 
//                     className={`px-4 py-2 rounded-md text-white font-medium ${
//                       isGeneratingMappings ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
//                     }`}
//                     onClick={generateMappings}
//                     disabled={isGeneratingMappings}
//                   >
//                     {isGeneratingMappings ? (
//                       <span className="flex items-center">
//                         <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                         </svg>
//                         Generating Mappings...
//                       </span>
//                     ) : (
//                       'Generate Mappings with AI'
//                     )}
//                   </button>
//                 </div>
//               ) : (
//                 <div>
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200">
//                       <thead>
//                         <tr>
//                           <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source Account Code</th>
//                           <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Canonical Account</th>
//                           <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Name</th>
//                         </tr>
//                       </thead>
//                       <tbody className="bg-white divide-y divide-gray-200">
//                         {mappingData.map((item, index) => (
//                           <tr key={index}>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.sourceAccountCode}</td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.canonicalAccount}</td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.accountName}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
                  
//                   <div className="mt-6 flex justify-end">
//                     <button 
//                       className={`px-4 py-2 rounded-md text-white font-medium ${
//                         isMappingData ? 'bg-indigo-400' : mappingCompleted ? 'bg-green-600' : 'bg-indigo-600 hover:bg-indigo-700'
//                       }`}
//                       onClick={startMappingData}
//                       disabled={isMappingData || mappingCompleted}
//                     >
//                       {isMappingData ? (
//                         <span className="flex items-center">
//                           <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                           </svg>
//                           Mapping Data...
//                         </span>
//                       ) : mappingCompleted ? (
//                         <span className="flex items-center">
//                           <Check className="h-4 w-4 mr-1" />
//                           Completed
//                         </span>
//                       ) : (
//                         'Start Mapping Data'
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

// export default ChartOfAccountsStep;


import React, { useState, useEffect } from 'react';
import { Plus, Check, X, ChevronDown, ChevronUp } from 'lucide-react';

const ChartOfAccountsStep = ({ onBack, onNext }) => {
  const [isMapperOpen, setIsMapperOpen] = useState(false);
  const [isGeneratingMappings, setIsGeneratingMappings] = useState(false);
  const [mappingsGenerated, setMappingsGenerated] = useState(false);
  const [isMappingData, setIsMappingData] = useState(false);
  const [mappingCompleted, setMappingCompleted] = useState(false);
  const [mappedDataAdded, setMappedDataAdded] = useState(false);
  const [isMappedDataOpen, setIsMappedDataOpen] = useState(false);

  const mappingData = [
    { sourceAccountCode: "4001", canonicalAccount: "REVENUE_SALES", accountName: "Sales Revenue" },
    { sourceAccountCode: "5005", canonicalAccount: "COGS", accountName: "Cost of Goods Sold" },
    { sourceAccountCode: "6200", canonicalAccount: "OPEX_RENT", accountName: "Office Rent" },
    { sourceAccountCode: "9001", canonicalAccount: "IC_REVENUE", accountName: "Inter‑company Revenue" },
    { sourceAccountCode: "9101", canonicalAccount: "IC_EXPENSE", accountName: "Inter‑company Expense" }
  ];
  
  const glMappedData = [
    { transactionId: 1, date: "2025-04-30", accountCode: "4001", description: "Sales", debit: 0, credit: 50000, currency: "USD", entity: "US01", canonicalAccount: "REVENUE_SALES", accountName: "Sales Revenue" },
    { transactionId: 2, date: "2025-04-30", accountCode: "5005", description: "COGS", debit: 20000, credit: 0, currency: "USD", entity: "US01", canonicalAccount: "COGS", accountName: "Cost of Goods Sold" },
    { transactionId: 3, date: "2025-04-30", accountCode: "6200", description: "Rent", debit: 3000, credit: 0, currency: "EUR", entity: "EU01", canonicalAccount: "OPEX_RENT", accountName: "Office Rent" },
    { transactionId: 4, date: "2025-04-30", accountCode: "4001", description: "Sales (India)", debit: 0, credit: 300000, currency: "INR", entity: "IN01", canonicalAccount: "REVENUE_SALES", accountName: "Sales Revenue" },
    { transactionId: 5, date: "2025-04-30", accountCode: "9001", description: "Inter‑co Revenue", debit: 0, credit: 10000, currency: "USD", entity: "US01", canonicalAccount: "IC_REVENUE", accountName: "Inter‑company Revenue" },
    { transactionId: 6, date: "2025-04-30", accountCode: "9101", description: "Inter‑co Expense", debit: 10000, credit: 0, currency: "USD", entity: "IN01", canonicalAccount: "IC_EXPENSE", accountName: "Inter‑company Expense" }
  ];

  const openMapper = () => {
    setIsMapperOpen(true);
  };

  const closeMapper = () => {
    setIsMapperOpen(false);
  };

  const generateMappings = () => {
    setIsGeneratingMappings(true);
    
    // Simulate AI generation process with a timeout
    setTimeout(() => {
      setIsGeneratingMappings(false);
      setMappingsGenerated(true);
    }, 2000);
  };

  const startMappingData = () => {
    setIsMappingData(true);
    
    // Simulate mapping process with a timeout
    setTimeout(() => {
      setIsMappingData(false);
      setMappingCompleted(true);
      
      // Close the modal and add the mapped data row after a short delay
      setTimeout(() => {
        setIsMapperOpen(false);
        setMappedDataAdded(true);
      }, 1000);
    }, 2000);
  };

  const toggleMappedData = () => {
    setIsMappedDataOpen(!isMappedDataOpen);
  };

  return (
    <div className="px-6 py-6 relative">
      
      {/* Added COA Mapping explanation text */}
      <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
        <p className="text-sm text-gray-700 leading-relaxed">
          COA Mapping translates the heterogeneous account codes coming from each source system into one standard chart of accounts that your reports understand. During ingestion the platform cross-references every GL line with a master lookup table, replaces the source code with the canonical code, and flags any unmapped items for review. The result is a single, consistent language for revenue, COGS, cash, and every other account, so consolidation and analytics run cleanly across entities and ERPs.
        </p>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="text-gray-700">
          <span className="font-medium">Mapping Files 1/2</span>
          <span className="mx-2 text-gray-400">|</span>
          <span className="text-gray-500">Task completion date: 09/05/2025</span>
        </div>
        <button 
          className="flex items-center space-x-1 px-3 py-1.5 bg-purple-300 border border-purple-400 shadow-2xs rounded-md text-sm text-black cursor-pointer hover:bg-purple-400 hover:text-white transition duration-200 ease-in-out"
          onClick={openMapper}
        >
          <Plus className="h-4 w-4" />
          <span>CoA Mapper</span>
        </button>
      </div>
      
      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden overflow-x-auto">
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
            {/* New Mapped Data Row - Only shown after mapping is completed */}
            {mappedDataAdded && (
              <>
                <tr 
                  className="cursor-pointer hover:bg-gray-50" 
                  onClick={toggleMappedData}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-900">GL Mapped</span>
                      {isMappedDataOpen ? (
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '/')}</td>
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

                {/* Dropdown content for Mapped Data */}
                {isMappedDataOpen && (
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
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {glMappedData.map((item, index) => (
                              <tr key={index} className="hover:bg-gray-50">
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.transactionId}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.date}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.accountCode}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.description}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.debit.toLocaleString()}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.credit.toLocaleString()}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.currency}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.entity}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.canonicalAccount}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.accountName}</td>
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
            
            {/* Row 1 */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900">DR CoA</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap"></td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white font-medium">S</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">03/28/2024</td>
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
            
            {/* Row 2 */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900">Customer CoA</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap"></td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white font-medium">S</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">08/07/2024</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-2 w-2 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="text-sm text-yellow-700 bg-yellow-50 px-2 py-0.5 rounded">1 Unmapped Items</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-medium">Update Unmapped Items</button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="px-3 py-1 bg-white border border-gray-300 text-gray-600 rounded text-xs font-medium">Mark Complete</button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap"></td>
            </tr>
          </tbody>
        </table>
      </div>
      
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
      
      {/* CoA Mapper Modal */}
      {isMapperOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-3/4 max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Chart of Accounts Mapper</h3>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={closeMapper}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="px-6 py-4">
              {!mappingsGenerated ? (
                <div className="text-center py-10">
                  <button 
                    className={`px-4 py-2 rounded-md text-white font-medium ${
                      isGeneratingMappings ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                    onClick={generateMappings}
                    disabled={isGeneratingMappings}
                  >
                    {isGeneratingMappings ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating Mappings...
                      </span>
                    ) : (
                      'Generate Mappings with AI'
                    )}
                  </button>
                </div>
              ) : (
                <div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source Account Code</th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Canonical Account</th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Name</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {mappingData.map((item, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.sourceAccountCode}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.canonicalAccount}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.accountName}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <button 
                      className={`px-4 py-2 rounded-md text-white font-medium ${
                        isMappingData ? 'bg-indigo-400' : mappingCompleted ? 'bg-green-600' : 'bg-indigo-600 hover:bg-indigo-700'
                      }`}
                      onClick={startMappingData}
                      disabled={isMappingData || mappingCompleted}
                    >
                      {isMappingData ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Mapping Data...
                        </span>
                      ) : mappingCompleted ? (
                        <span className="flex items-center">
                          <Check className="h-4 w-4 mr-1" />
                          Completed
                        </span>
                      ) : (
                        'Start Mapping Data'
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

export default ChartOfAccountsStep;