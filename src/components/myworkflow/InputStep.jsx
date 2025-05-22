// // InputStep.jsx
// import React from 'react';
// import { Plus, Check } from 'lucide-react';

// const InputStep = ({ onNext }) => {
//   return (
//     <div className="px-6 py-6">
//       <div className="flex justify-between items-center mb-4">
//         <div className="text-gray-700">
//           <span className="font-medium">Input Files 3/4</span>
//           <span className="mx-2 text-gray-400">|</span>
//           <span className="text-gray-500">Task completion date: 09/05/2025</span>
//         </div>
//         <button className="flex items-center space-x-1 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm text-gray-600">
//           <Plus className="h-4 w-4" />
//           <span>Add Input</span>
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
//                   <span className="text-sm font-medium text-gray-900">Headcount Input</span>
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap"></td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
//                   <span className="text-white font-medium">C</span>
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">08/05/2024</td>
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
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                   </svg>
//                   <span className="text-sm font-medium text-gray-900">GL NetSuite - Monthly</span>
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
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">08/15/2024</td>
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
            
//             {/* Row 3 */}
//             <tr>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="flex items-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                   </svg>
//                   <span className="text-sm font-medium text-gray-900">GL SAP - Monthly</span>
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
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">08/06/2024</td>
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
            
//             {/* Row 4 */}
//             <tr>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="flex items-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                   </svg>
//                   <span className="text-sm font-medium text-gray-900">Budget HC Input</span>
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
      
//       {/* Next Button */}
//       <div className="flex justify-end mt-6">
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

// export default InputStep;



import React, { useState } from 'react';
import { Plus, Check, ChevronDown, ChevronUp } from 'lucide-react';

const InputStep = ({ onNext }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const transactionData = [
    { id: 1, date: '2025-04-30', accountCode: '4001', description: 'Sales', debit: 0, credit: 50000, currency: 'USD', entity: 'US01' },
    { id: 2, date: '2025-04-30', accountCode: '5005', description: 'COGS', debit: 20000, credit: 0, currency: 'USD', entity: 'US01' },
    { id: 3, date: '2025-04-30', accountCode: '6200', description: 'Rent', debit: 3000, credit: 0, currency: 'EUR', entity: 'EU01' },
    { id: 4, date: '2025-04-30', accountCode: '4001', description: 'Sales (India)', debit: 0, credit: 300000, currency: 'INR', entity: 'IN01' },
    { id: 5, date: '2025-04-30', accountCode: '9001', description: 'Inter‑co Revenue', debit: 0, credit: 10000, currency: 'USD', entity: 'US01' },
    { id: 6, date: '2025-04-30', accountCode: '9101', description: 'Inter‑co Expense', debit: 10000, credit: 0, currency: 'USD', entity: 'IN01' },
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="px-6 py-6">
      <div className="flex justify-between items-center mb-4">
        <div className="text-gray-700">
          <span className="font-medium">Input Files 3/4</span>
          <span className="mx-2 text-gray-400">|</span>
          <span className="text-gray-500">Task completion date: 09/05/2025</span>
        </div>
        <button className="flex items-center space-x-1 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm text-gray-600">
          <Plus className="h-4 w-4" />
          <span>Add Input</span>
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
            {/* Row 1 */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900">Headcount Input</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap"></td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white font-medium">C</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">08/05/2024</td>
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
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900">GL NetSuite - Monthly</span>
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
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">08/15/2024</td>
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
            
            {/* Row 3 */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900">GL SAP - Monthly</span>
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
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">08/06/2024</td>
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
            
            {/* Row 4 */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900">Budget HC Input</span>
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

            {/* New Row 5 - Source GL */}
            <tr 
              className="cursor-pointer hover:bg-gray-50" 
              onClick={toggleDropdown}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900">Source GL</span>
                  {isDropdownOpen ? (
                    <ChevronUp className="ml-2 h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">04/2025</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-600 font-medium">A</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">05/01/2025</td>
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

            {/* Dropdown content */}
            {isDropdownOpen && (
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
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {transactionData.map((transaction) => (
                          <tr key={transaction.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.id}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.date}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.accountCode}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.description}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                              {transaction.debit.toLocaleString()}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                              {transaction.credit.toLocaleString()}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.currency}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.entity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Next Button */}
      <div className="flex justify-end mt-6">
        <button 
          className="px-5 py-2 bg-indigo-600 text-white rounded-md font-medium"
          onClick={onNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InputStep;