// // AllocationEliminationStep.jsx
// import React from 'react';
// import { Plus, Check } from 'lucide-react';

// const AllocationEliminationStep = ({ onBack, onNext }) => {
//   return (
//     <div className="px-6 py-6">
//       <div className="flex justify-between items-center mb-4">
//         <div className="text-gray-700">
//           <span className="font-medium">Input Files 1/2</span>
//           <span className="mx-2 text-gray-400">|</span>
//           <span className="text-gray-500">Task completion date: 09/05/2025</span>
//         </div>
//         <button className="flex items-center space-x-1 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm text-gray-600">
//           <Plus className="h-4 w-4" />
//           <span>Add input</span>
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
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                   </svg>
//                   <span className="text-sm font-medium text-gray-900">Allocations Model</span>
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap"></td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
//                   <span className="text-white font-medium">S</span>
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">02/26/2024</td>
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
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                   </svg>
//                   <span className="text-sm font-medium text-gray-900">Eliminations</span>
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">07/2024</span>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
//                   <span className="text-gray-600 font-medium">A</span>
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="flex items-center">
//                   <div className="flex-shrink-0 h-2 w-2 rounded-full bg-yellow-500 mr-2"></div>
//                   <div className="text-sm text-yellow-700 bg-yellow-50 px-2 py-0.5 rounded">Not Updated</div>
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-medium">Upload New Version</button>
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

// export default AllocationEliminationStep;




// import React, { useState } from 'react';
// import { Plus, Check, X, ChevronDown, ChevronUp } from 'lucide-react';

// const AllocationEliminationStep = ({ onBack, onNext }) => {
//   const [isConfigOpen, setIsConfigOpen] = useState(false);
//   const [isGeneratingRules, setIsGeneratingRules] = useState(false);
//   const [rulesGenerated, setRulesGenerated] = useState(false);
//   const [isApplyingRules, setIsApplyingRules] = useState(false);
//   const [rulesApplied, setRulesApplied] = useState(false);
//   const [isGlAllocatedAdded, setIsGlAllocatedAdded] = useState(false);
//   const [isGlAllocatedOpen, setIsGlAllocatedOpen] = useState(false);

//   // Rules data
//   const rulesData = [
//     { ruleId: 1, sourceAccount: "OPEX_RENT", targetEntity: "US01", percent: 0.5 },
//     { ruleId: 1, sourceAccount: "OPEX_RENT", targetEntity: "IN01", percent: 0.5 }
//   ];

//   // Allocated GL data
//   const allocatedGlData = [
//     { transactionId: 1, date: "2025-04-30", accountCode: "4001", description: "Sales", debit: 0.0, credit: 50000, currency: "USD", entity: "US01", canonicalAccount: "REVENUE_SALES", accountName: "Sales Revenue", rateToINR: 83, debitINR: 0.0, creditINR: 4150000 },
//     { transactionId: 2, date: "2025-04-30", accountCode: "5005", description: "COGS", debit: 20000.0, credit: 0, currency: "USD", entity: "US01", canonicalAccount: "COGS", accountName: "Cost of Goods Sold", rateToINR: 83, debitINR: 1660000.0, creditINR: 0 },
//     { transactionId: 4, date: "2025-04-30", accountCode: "4001", description: "Sales (India)", debit: 0.0, credit: 300000, currency: "INR", entity: "IN01", canonicalAccount: "REVENUE_SALES", accountName: "Sales Revenue", rateToINR: 1, debitINR: 0.0, creditINR: 300000 },
//     { transactionId: 5, date: "2025-04-30", accountCode: "9001", description: "Inter‑co Revenue", debit: 0.0, credit: 10000, currency: "USD", entity: "US01", canonicalAccount: "IC_REVENUE", accountName: "Inter‑company Revenue", rateToINR: 83, debitINR: 0.0, creditINR: 0 },
//     { transactionId: 6, date: "2025-04-30", accountCode: "9101", description: "Inter‑co Expense", debit: 10000.0, credit: 0, currency: "USD", entity: "IN01", canonicalAccount: "IC_EXPENSE", accountName: "Inter‑company Expense", rateToINR: 83, debitINR: 0.0, creditINR: 0 },
//     { transactionId: "A3US01", date: "2025-04-30", accountCode: "6200", description: "Allocated Rent to US01", debit: 135000.0, credit: 0, currency: "INR", entity: "US01", canonicalAccount: "OPEX_RENT", accountName: "", rateToINR: 1, debitINR: 135000.0, creditINR: 0 },
//     { transactionId: "A3IN01", date: "2025-04-30", accountCode: "6200", description: "Allocated Rent to IN01", debit: 135000.0, credit: 0, currency: "INR", entity: "IN01", canonicalAccount: "OPEX_RENT", accountName: "", rateToINR: 1, debitINR: 135000.0, creditINR: 0 }
//   ];

//   const openConfig = () => {
//     setIsConfigOpen(true);
//   };

//   const closeConfig = () => {
//     setIsConfigOpen(false);
//   };

//   const generateRules = () => {
//     setIsGeneratingRules(true);

//     // Simulate AI processing with a timeout
//     setTimeout(() => {
//       setIsGeneratingRules(false);
//       setRulesGenerated(true);
//     }, 1500);
//   };

//   const applyRules = () => {
//     setIsApplyingRules(true);

//     // Simulate rule application with a timeout
//     setTimeout(() => {
//       setIsApplyingRules(false);
//       setRulesApplied(true);

//       // Close the modal and add the GL allocated row after a short delay
//       setTimeout(() => {
//         setIsConfigOpen(false);
//         setIsGlAllocatedAdded(true);
//       }, 1000);
//     }, 1500);
//   };

//   const toggleGlAllocatedDropdown = () => {
//     setIsGlAllocatedOpen(!isGlAllocatedOpen);
//   };

//   return (
//     <div className="px-6 py-6">
//       <div className="flex justify-between items-center mb-4">
//         <div className="text-gray-700">
//           <span className="font-medium">Input Files 1/2</span>
//           <span className="mx-2 text-gray-400">|</span>
//           <span className="text-gray-500">Task completion date: 09/05/2025</span>
//         </div>
//         <button 
//           className="flex items-center space-x-1 px-3 py-1.5 bg-purple-300 border border-purple-400 shadow-2xs rounded-md text-sm text-black cursor-pointer hover:bg-purple-400 hover:text-white transition duration-200 ease-in-out"
//           onClick={openConfig}
//         >
//           <Plus className="h-4 w-4" />
//           <span>Add Rules</span>
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
//             {/* GL Allocated Row - Only shown after rules are applied */}
//             {isGlAllocatedAdded && (
//               <>
//                 <tr 
//                   className="cursor-pointer hover:bg-gray-50"
//                   onClick={toggleGlAllocatedDropdown}
//                 >
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                       </svg>
//                       <span className="text-sm font-medium text-gray-900">GL Allocated</span>
//                       {isGlAllocatedOpen ? (
//                         <ChevronUp className="ml-2 h-4 w-4 text-gray-500" />
//                       ) : (
//                         <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
//                       )}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">{new Date().toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' }).replace('/', '/')}</span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
//                       <span className="text-white font-medium">S</span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '/')}
//                   </td>
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
                
//                 {/* Dropdown content for GL Allocated */}
//                 {isGlAllocatedOpen && (
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
//                             {allocatedGlData.map((item, index) => (
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
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.rateToINR}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.debitINR.toLocaleString()}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.creditINR.toLocaleString()}</td>
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
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                   </svg>
//                   <span className="text-sm font-medium text-gray-900">Allocations Model</span>
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap"></td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
//                   <span className="text-white font-medium">S</span>
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">02/26/2024</td>
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
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                   </svg>
//                   <span className="text-sm font-medium text-gray-900">Eliminations</span>
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">07/2024</span>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
//                   <span className="text-gray-600 font-medium">A</span>
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="flex items-center">
//                   <div className="flex-shrink-0 h-2 w-2 rounded-full bg-yellow-500 mr-2"></div>
//                   <div className="text-sm text-yellow-700 bg-yellow-50 px-2 py-0.5 rounded">Not Updated</div>
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-medium">Upload New Version</button>
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

//       {/* Configuration Task Modal */}
//       {isConfigOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-xl w-3/4 max-w-4xl max-h-[90vh] overflow-y-auto">
//             {/* Modal Header */}
//             <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//               <h3 className="text-lg font-medium text-gray-900">Allocation Rules Configuration</h3>
//               <button 
//                 className="text-gray-400 hover:text-gray-500"
//                 onClick={closeConfig}
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </div>
            
//             {/* Modal Content */}
//             <div className="px-6 py-4">
//               {!rulesGenerated ? (
//                 <div className="text-center py-10">
//                   <button 
//                     className={`px-4 py-2 rounded-md text-white font-medium ${
//                       isGeneratingRules ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
//                     }`}
//                     onClick={generateRules}
//                     disabled={isGeneratingRules}
//                   >
//                     {isGeneratingRules ? (
//                       <span className="flex items-center">
//                         <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                         </svg>
//                         Generating Rules...
//                       </span>
//                     ) : (
//                       'Generate Rules with AI'
//                     )}
//                   </button>
//                 </div>
//               ) : (
//                 <div>
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200">
//                       <thead>
//                         <tr>
//                           <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rule ID</th>
//                           <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source Account</th>
//                           <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target Entity</th>
//                           <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percent</th>
//                         </tr>
//                       </thead>
//                       <tbody className="bg-white divide-y divide-gray-200">
//                         {rulesData.map((rule, index) => (
//                           <tr key={index}>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rule.ruleId}</td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rule.sourceAccount}</td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rule.targetEntity}</td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rule.percent}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
                  
//                   <div className="mt-6 flex justify-end">
//                     <button 
//                       className={`px-4 py-2 rounded-md text-white font-medium ${
//                         isApplyingRules ? 'bg-indigo-400' : rulesApplied ? 'bg-green-600' : 'bg-indigo-600 hover:bg-indigo-700'
//                       }`}
//                       onClick={applyRules}
//                       disabled={isApplyingRules || rulesApplied}
//                     >
//                       {isApplyingRules ? (
//                         <span className="flex items-center">
//                           <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                           </svg>
//                           Applying Rules...
//                         </span>
//                       ) : rulesApplied ? (
//                         <span className="flex items-center">
//                           <Check className="h-4 w-4 mr-1" />
//                           Rules Applied
//                         </span>
//                       ) : (
//                         'Apply Rules'
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

// export default AllocationEliminationStep;



import React, { useState } from 'react';
import { Plus, Check, X, ChevronDown, ChevronUp } from 'lucide-react';

const AllocationEliminationStep = ({ onBack, onNext }) => {
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isGeneratingRules, setIsGeneratingRules] = useState(false);
  const [rulesGenerated, setRulesGenerated] = useState(false);
  const [isApplyingRules, setIsApplyingRules] = useState(false);
  const [rulesApplied, setRulesApplied] = useState(false);
  const [isGlAllocatedAdded, setIsGlAllocatedAdded] = useState(false);
  const [isGlAllocatedOpen, setIsGlAllocatedOpen] = useState(false);

  // Rules data
  const rulesData = [
    { ruleId: 1, sourceAccount: "OPEX_RENT", targetEntity: "US01", percent: 0.5 },
    { ruleId: 1, sourceAccount: "OPEX_RENT", targetEntity: "IN01", percent: 0.5 }
  ];

  // Allocated GL data
  const allocatedGlData = [
    { transactionId: 1, date: "2025-04-30", accountCode: "4001", description: "Sales", debit: 0.0, credit: 50000, currency: "USD", entity: "US01", canonicalAccount: "REVENUE_SALES", accountName: "Sales Revenue", rateToINR: 83, debitINR: 0.0, creditINR: 4150000 },
    { transactionId: 2, date: "2025-04-30", accountCode: "5005", description: "COGS", debit: 20000.0, credit: 0, currency: "USD", entity: "US01", canonicalAccount: "COGS", accountName: "Cost of Goods Sold", rateToINR: 83, debitINR: 1660000.0, creditINR: 0 },
    { transactionId: 4, date: "2025-04-30", accountCode: "4001", description: "Sales (India)", debit: 0.0, credit: 300000, currency: "INR", entity: "IN01", canonicalAccount: "REVENUE_SALES", accountName: "Sales Revenue", rateToINR: 1, debitINR: 0.0, creditINR: 300000 },
    { transactionId: 5, date: "2025-04-30", accountCode: "9001", description: "Inter‑co Revenue", debit: 0.0, credit: 10000, currency: "USD", entity: "US01", canonicalAccount: "IC_REVENUE", accountName: "Inter‑company Revenue", rateToINR: 83, debitINR: 0.0, creditINR: 0 },
    { transactionId: 6, date: "2025-04-30", accountCode: "9101", description: "Inter‑co Expense", debit: 10000.0, credit: 0, currency: "USD", entity: "IN01", canonicalAccount: "IC_EXPENSE", accountName: "Inter‑company Expense", rateToINR: 83, debitINR: 0.0, creditINR: 0 },
    { transactionId: "A3US01", date: "2025-04-30", accountCode: "6200", description: "Allocated Rent to US01", debit: 135000.0, credit: 0, currency: "INR", entity: "US01", canonicalAccount: "OPEX_RENT", accountName: "", rateToINR: 1, debitINR: 135000.0, creditINR: 0 },
    { transactionId: "A3IN01", date: "2025-04-30", accountCode: "6200", description: "Allocated Rent to IN01", debit: 135000.0, credit: 0, currency: "INR", entity: "IN01", canonicalAccount: "OPEX_RENT", accountName: "", rateToINR: 1, debitINR: 135000.0, creditINR: 0 }
  ];

  const openConfig = () => {
    setIsConfigOpen(true);
  };

  const closeConfig = () => {
    setIsConfigOpen(false);
  };

  const generateRules = () => {
    setIsGeneratingRules(true);

    // Simulate AI processing with a timeout
    setTimeout(() => {
      setIsGeneratingRules(false);
      setRulesGenerated(true);
    }, 1500);
  };

  const applyRules = () => {
    setIsApplyingRules(true);

    // Simulate rule application with a timeout
    setTimeout(() => {
      setIsApplyingRules(false);
      setRulesApplied(true);

      // Close the modal and add the GL allocated row after a short delay
      setTimeout(() => {
        setIsConfigOpen(false);
        setIsGlAllocatedAdded(true);
      }, 1000);
    }, 1500);
  };

  const toggleGlAllocatedDropdown = () => {
    setIsGlAllocatedOpen(!isGlAllocatedOpen);
  };

  return (
    <div className="px-6 py-6">
      {/* Added explanation text */}
      <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
        <p className="text-sm text-gray-700 leading-relaxed">
          Allocation Rules redistribute shared costs or revenues to the business units that actually consume them. You define simple drivers—percent splits, head-count ratios, square footage, revenue share, or any custom metric—and the engine automatically creates balancing journal entries each period. This turns a lump-sum expense like corporate IT or rent into granular, entity-level numbers, producing more accurate P&Ls and margins without manual spreadsheets.
        </p>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="text-gray-700">
          <span className="font-medium">Input Files 1/2</span>
          <span className="mx-2 text-gray-400">|</span>
          <span className="text-gray-500">Task completion date: 09/05/2025</span>
        </div>
        <button 
          className="flex items-center space-x-1 px-3 py-1.5 bg-purple-300 border border-purple-400 shadow-2xs rounded-md text-sm text-black cursor-pointer hover:bg-purple-400 hover:text-white transition duration-200 ease-in-out"
          onClick={openConfig}
        >
          <Plus className="h-4 w-4" />
          <span>Add Rules</span>
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
            {/* GL Allocated Row - Only shown after rules are applied */}
            {isGlAllocatedAdded && (
              <>
                <tr 
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={toggleGlAllocatedDropdown}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-900">GL Allocated</span>
                      {isGlAllocatedOpen ? (
                        <ChevronUp className="ml-2 h-4 w-4 text-gray-500" />
                      ) : (
                        <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">{new Date().toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' }).replace('/', '/')}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                      <span className="text-white font-medium">S</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '/')}
                  </td>
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
                
                {/* Dropdown content for GL Allocated */}
                {isGlAllocatedOpen && (
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
                            {allocatedGlData.map((item, index) => (
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
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.rateToINR}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.debitINR.toLocaleString()}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.creditINR.toLocaleString()}</td>
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
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900">Allocations Model</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap"></td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white font-medium">S</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">02/26/2024</td>
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
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900">Eliminations</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">07/2024</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-600 font-medium">A</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-2 w-2 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="text-sm text-yellow-700 bg-yellow-50 px-2 py-0.5 rounded">Not Updated</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-medium">Upload New Version</button>
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

      {/* Configuration Task Modal */}
      {isConfigOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-3/4 max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Allocation Rules Configuration</h3>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={closeConfig}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="px-6 py-4">
              {!rulesGenerated ? (
                <div className="text-center py-10">
                  <button 
                    className={`px-4 py-2 rounded-md text-white font-medium ${
                      isGeneratingRules ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                    onClick={generateRules}
                    disabled={isGeneratingRules}
                  >
                    {isGeneratingRules ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating Rules...
                      </span>
                    ) : (
                      'Generate Rules with AI'
                    )}
                  </button>
                </div>
              ) : (
                <div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rule ID</th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source Account</th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target Entity</th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percent</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {rulesData.map((rule, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rule.ruleId}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rule.sourceAccount}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rule.targetEntity}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rule.percent}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <button 
                      className={`px-4 py-2 rounded-md text-white font-medium ${
                        isApplyingRules ? 'bg-indigo-400' : rulesApplied ? 'bg-green-600' : 'bg-indigo-600 hover:bg-indigo-700'
                      }`}
                      onClick={applyRules}
                      disabled={isApplyingRules || rulesApplied}
                    >
                      {isApplyingRules ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Applying Rules...
                        </span>
                      ) : rulesApplied ? (
                        <span className="flex items-center">
                          <Check className="h-4 w-4 mr-1" />
                          Rules Applied
                        </span>
                      ) : (
                        'Apply Rules'
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

export default AllocationEliminationStep;