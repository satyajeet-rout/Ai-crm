
// // WorkflowContainer.jsx
// import React, { useState } from 'react';
// import InputStep from './InputStep';
// import ChartOfAccountsStep from './ChartOfAccountsStep';
// import FXConversionStep from './FXConversionStep';
// import AllocationEliminationStep from './AllocationEliminationStep';
// import OutputStep from './OutputStep';
// import { Settings } from 'lucide-react';

// const WorkflowContainer = () => {
//   const [currentStep, setCurrentStep] = useState(1);

//   // Steps data
//   const steps = [
//     { id: 1, name: 'Input', progress: '3/4' },
//     { id: 2, name: 'Chart of Accounts', progress: '1/2' },
//     { id: 3, name: 'FX Conversion', progress: '1/1' },
//     { id: 4, name: 'Allocation & Elimination', progress: '1/2' },
//     { id: 5, name: 'Output', progress: '10/10' },
//   ];

//   // Progress percentage
//   const progressPercentage = 84;
  
//   // Handle next step navigation
//   const handleNextStep = () => {
//     if (currentStep < 5) {
//       setCurrentStep(currentStep + 1);
//     }
//   };
  
//   // Handle back step navigation
//   const handleBackStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//     }
//   };
  
//   // Handle click on progress indicator
//   const handleStepClick = (stepId) => {
//     setCurrentStep(stepId);
//   };

//   // Render content based on current step
//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 1:
//         return <InputStep onNext={handleNextStep} />;
//       case 2:
//         return <ChartOfAccountsStep onBack={handleBackStep} onNext={handleNextStep} />;
//       case 3:
//         return <FXConversionStep onBack={handleBackStep} onNext={handleNextStep} />;
//       case 4:
//         return <AllocationEliminationStep onBack={handleBackStep} onNext={handleNextStep} />;
//       case 5:
//         return <OutputStep onBack={handleBackStep} />;
//       default:
//         return <InputStep onNext={handleNextStep} />;
//     }
//   };

//   return (
//     <div className="flex-1 h-screen overflow-y-auto bg-gray-50">
//       {/* Fixed Header Area - Always stays at top with higher z-index */}
//       <div className="sticky top-0 z-30 bg-gray-50 mt-2.5">
//         {/* Breadcrumb */}
//         {/* <div className="px-6 py-3 flex items-center text-sm text-gray-500">
//           <span className="mr-2">My Workflows</span>
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//           </svg>
//           <span>Financials Month End Close, May 2025</span>
//         </div> */}
        
//         {/* Title Section */}
//         <div className="px-6 py-4 flex justify-between items-center">
//           <div className="flex items-center">
//             <h1 className="text-xl font-bold text-gray-800">Financials Month end close</h1>
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//             </svg>
//             <span className="text-gray-500">May 2025</span>
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//             </svg>
//           </div>
          
//           <div className="flex items-center space-x-3">
//             <button className="flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-gray-600 bg-white">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
//               </svg>
//               <span>Clone</span>
//             </button>
//             <button className="p-1.5 text-gray-600">
//               <Settings className="h-5 w-5" />
//             </button>
//           </div>
//         </div>
        
//         {/* Progress Tracker - part of the fixed header */}
//         <div className="mx-6 p-6 bg-white rounded-lg shadow-sm mb-6">
//           <div className="relative mb-10">
//             {/* Progress Bar */}
//             <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200"></div>
//             <div 
//               className="absolute top-4 left-0 h-1 bg-indigo-500" 
//               style={{ width: `${(currentStep === 5 ? 100 : (currentStep - 1) * 25)}%` }}
//             ></div>
            
//             {/* Steps */}
//             <div className="flex justify-between">
//               {steps.map((step) => (
//                 <div 
//                   key={step.id} 
//                   className="flex flex-col items-center cursor-pointer"
//                   onClick={() => handleStepClick(step.id)}
//                 >
//                   <div 
//                     className={`w-9 h-9 rounded-full flex items-center justify-center z-10 ${
//                       currentStep === step.id 
//                         ? 'bg-indigo-600 text-white' // Current step is purple
//                         : step.id === 5
//                           ? 'bg-blue-600 text-white' // Output step is always blue with checkmark
//                           : currentStep > step.id
//                             ? 'bg-blue-600 text-white' // Completed steps are blue
//                             : 'bg-gray-200 text-gray-700' // Future steps are gray
//                     }`}
//                   >
//                     {step.id === 5 ? (
//                       // Output step always shows a checkmark
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                       </svg>
//                     ) : (
//                       // All other steps show their number
//                       <span className="font-medium">{step.id}</span>
//                     )}
//                   </div>
//                   <div className="mt-2 text-center">
//                     <div className="text-sm font-medium">{step.name}</div>
//                     <div className="text-xs text-gray-500">{step.progress}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
          
//           {/* Days left counter */}
//           <div className="flex justify-end items-center ">
//             <div className='border border-gray-300 rounded-md p-2 bg-gray-100 shadow-sm'>
//               <div className="flex items-center ">
//                 <span className="text-2xl font-bold text-gray-800">00</span>
//                 <span className="ml-2 text-sm text-gray-500">Days left</span>
//               </div>
//               <div className="text-right text-sm text-gray-500">{progressPercentage}% completed</div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Step Content - Scrollable content below fixed header */}
//       <div className="px-6">
//         {renderStepContent()}
//       </div>
//     </div>
//   );
// };

// export default WorkflowContainer;


// // WorkflowContainer.jsx
// import React, { useState } from 'react';
// import InputStep from './InputStep';
// import ChartOfAccountsStep from './ChartOfAccountsStep';
// import FXConversionStep from './FXConversionStep';
// import AllocationEliminationStep from './AllocationEliminationStep';
// import OutputStep from './OutputStep';
// import { Settings, Copy, ChevronLeft, ChevronRight, Calendar, CheckCircle, CheckCircle2 } from 'lucide-react';

// const WorkflowContainer = () => {
//   const [currentStep, setCurrentStep] = useState(1);

//   // Steps data
//   const steps = [
//     { id: 1, name: 'Input', progress: '3/4' },
//     { id: 2, name: 'Chart of Accounts', progress: '1/2' },
//     { id: 3, name: 'FX Conversion', progress: '1/1' },
//     { id: 4, name: 'Allocation & Elimination', progress: '1/2' },
//     { id: 5, name: 'Output', progress: '10/10' },
//   ];

//   // Progress percentage
//   const progressPercentage = 84;
  
//   // Handle next step navigation
//   const handleNextStep = () => {
//     if (currentStep < 5) {
//       setCurrentStep(currentStep + 1);
//     }
//   };
  
//   // Handle back step navigation
//   const handleBackStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//     }
//   };
  
//   // Handle click on progress indicator
//   const handleStepClick = (stepId) => {
//     setCurrentStep(stepId);
//   };

//   // Render content based on current step
//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 1:
//         return <InputStep onNext={handleNextStep} />;
//       case 2:
//         return <ChartOfAccountsStep onBack={handleBackStep} onNext={handleNextStep} />;
//       case 3:
//         return <FXConversionStep onBack={handleBackStep} onNext={handleNextStep} />;
//       case 4:
//         return <AllocationEliminationStep onBack={handleBackStep} onNext={handleNextStep} />;
//       case 5:
//         return <OutputStep onBack={handleBackStep} />;
//       default:
//         return <InputStep onNext={handleNextStep} />;
//     }
//   };

//   return (
//     <div className="flex-1 h-screen overflow-y-auto bg-gray-50">
//       {/* Fixed Header Area - Always stays at top with higher z-index */}
//       <div className="sticky top-0 z-30 bg-gradient-to-b from-gray-50 to-gray-50">
//         {/* Title Section with enhanced styling */}
//         <div className="px-8 pt-6 pb-4 flex justify-between items-center">
//           <div className="flex items-center">
//             <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Financials Month End Close</h1>
//             <div className="flex items-center ml-3 bg-gray-100 rounded-full px-3 py-1">
//               <Calendar className="h-4 w-4 text-indigo-600 mr-1.5" />
//               <span className="text-gray-700 font-medium">May 2025</span>
//             </div>
//           </div>
          
//           <div className="flex items-center space-x-3">
//             <button className="flex items-center px-4 py-2 border border-gray-200 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm">
//               <Copy className="h-4 w-4 mr-2 text-indigo-500" />
//               <span className="font-medium">Clone</span>
//             </button>
//             <button className="p-2 text-gray-600 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm">
//               <Settings className="h-5 w-5 text-gray-600" />
//             </button>
//           </div>
//         </div>
        
//         {/* Progress Tracker with enhanced styling */}
//         <div className="mx-8 p-8 bg-white rounded-xl shadow-sm mb-8 border border-gray-100">
//           <div className="relative mb-12">
//             {/* Enhanced Progress Bar */}
//             <div className="absolute top-5 left-0 right-0 h-1.5 bg-gray-100 rounded-full"></div>
//             <div 
//               className="absolute top-5 left-0 h-1.5 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-500 ease-in-out" 
//               style={{ width: `${(currentStep === 5 ? 100 : (currentStep - 1) * 25)}%` }}
//             ></div>
            
//             {/* Enhanced Steps */}
//             <div className="flex justify-between">
//               {steps.map((step) => (
//                 <div 
//                   key={step.id} 
//                   className="flex flex-col items-center cursor-pointer group"
//                   onClick={() => handleStepClick(step.id)}
//                 >
//                   <div 
//                     className={`w-11 h-11 rounded-full flex items-center justify-center z-10 shadow-md transition-all duration-300 ${
//                       currentStep === step.id 
//                         ? 'bg-indigo-600 ring-4 ring-indigo-100 scale-110' // Current step with ring and scale
//                         : step.id < currentStep
//                           ? 'bg-indigo-500 text-white' // Completed steps
//                           : 'bg-white text-gray-400 border-2 border-gray-200 group-hover:border-gray-300' // Future steps
//                     }`}
//                   >
//                     {step.id < currentStep ? (
//                       // Completed steps show checkmark
//                       <CheckCircle2 className="h-6 w-6 text-white" />
//                     ) : (
//                       // Current and future steps show number
//                       <span className={`font-semibold text-lg ${currentStep === step.id ? 'text-white' : 'text-gray-500'}`}>{step.id}</span>
//                     )}
//                   </div>
//                   <div className={`mt-3 text-center transition-all duration-300 ${currentStep === step.id ? 'transform scale-105' : ''}`}>
//                     <div className={`text-sm font-medium ${currentStep === step.id ? 'text-indigo-700' : 'text-gray-700'}`}>{step.name}</div>
//                     <div className={`text-xs mt-1 px-2 py-0.5 rounded-full inline-block ${
//                       currentStep === step.id 
//                         ? 'bg-indigo-100 text-indigo-700' 
//                         : step.id < currentStep
//                           ? 'bg-green-100 text-green-700'
//                           : 'bg-gray-100 text-gray-500'
//                     }`}>{step.progress}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
          
//           {/* Enhanced Days left counter */}
//           <div className="flex justify-between items-center">
//             <div className="flex items-center">
//               <div className={`h-2 w-2 rounded-full ${progressPercentage > 80 ? 'bg-green-500' : 'bg-yellow-500'} mr-2`}></div>
//               <div className="text-sm font-medium text-gray-700">
//                 Progress: <span className="text-indigo-700 font-semibold">{progressPercentage}%</span> completed
//               </div>
//             </div>
            
//             <div className="flex items-center bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-3 shadow-sm border border-indigo-100">
//               <div className="mr-3 bg-white rounded-lg p-2 shadow-sm">
//                 <span className="text-2xl font-bold text-indigo-700">00</span>
//               </div>
//               <div>
//                 <div className="text-sm font-medium text-indigo-800">Days Remaining</div>
//                 <div className="text-xs text-indigo-600">Due on April 30, 2025</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Step Content - Enhanced with animation */}
//       <div className="px-8 pb-12 transition-all duration-500 animate-fadeIn">
//         {renderStepContent()}
//       </div>
      
//       {/* Add this at the end of your CSS or in a style tag */}
//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.5s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default WorkflowContainer;


import React, { useState } from 'react';
import InputStep from './InputStep';
import ChartOfAccountsStep from './ChartOfAccountsStep';
import FXConversionStep from './FXConversionStep';
import AllocationEliminationStep from './AllocationEliminationStep';
import OutputStep from './OutputStep';
import { Settings, Copy, Calendar, CheckCircle2 } from 'lucide-react';

const WorkflowContainer = () => {
  const [currentStep, setCurrentStep] = useState(1);

  // Steps data
  const steps = [
    { id: 1, name: 'Input', progress: '3/4' },
    { id: 2, name: 'Chart of Accounts', progress: '1/2' },
    { id: 3, name: 'FX Conversion', progress: '1/1' },
    { id: 4, name: 'Allocation & Elimination', progress: '1/2' },
    { id: 5, name: 'Output', progress: '10/10' },
  ];

  // Progress percentage
  const progressPercentage = 84;
  
  // Handle next step navigation
  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  // Handle back step navigation
  const handleBackStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Handle click on progress indicator
  const handleStepClick = (stepId) => {
    setCurrentStep(stepId);
  };

  // Render content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <InputStep onNext={handleNextStep} />;
      case 2:
        return <ChartOfAccountsStep onBack={handleBackStep} onNext={handleNextStep} />;
      case 3:
        return <FXConversionStep onBack={handleBackStep} onNext={handleNextStep} />;
      case 4:
        return <AllocationEliminationStep onBack={handleBackStep} onNext={handleNextStep} />;
      case 5:
        return <OutputStep onBack={handleBackStep} />;
      default:
        return <InputStep onNext={handleNextStep} />;
    }
  };

  return (
    <div className="flex-1 h-screen overflow-y-auto bg-gray-50">
      {/* Fixed Header Area - Always stays at top with higher z-index */}
      <div className="sticky top-0 z-30 bg-gradient-to-b from-gray-50 to-gray-50">
        {/* Title Section with enhanced styling */}
        <div className="px-8 pt-4 pb-3 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Financials Month End Close</h1>
            <div className="flex items-center ml-3 bg-gray-100 rounded-full px-3 py-1">
              <Calendar className="h-4 w-4 text-indigo-600 mr-1.5" />
              <span className="text-gray-700 font-medium">May 2025</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-4 py-2 border border-gray-200 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm">
              <Copy className="h-4 w-4 mr-2 text-indigo-500" />
              <span className="font-medium">Clone</span>
            </button>
            <button className="p-2 text-gray-600 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm">
              <Settings className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
        
        {/* More Compact Progress Tracker */}
        <div className="mx-8 px-6 py-4 bg-white rounded-xl shadow-sm mb-6 border border-gray-100">
          <div className="relative mb-5">
            {/* Enhanced Progress Bar */}
            <div className="absolute top-4 left-0 right-0 h-1 bg-gray-100 rounded-full"></div>
            <div 
              className="absolute top-4 left-0 h-1 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-500 ease-in-out" 
              style={{ width: `${(currentStep === 5 ? 100 : (currentStep - 1) * 25)}%` }}
            ></div>
            
            {/* Compact Steps */}
            <div className="flex justify-between">
              {steps.map((step) => (
                <div 
                  key={step.id} 
                  className="flex flex-col items-center cursor-pointer group"
                  onClick={() => handleStepClick(step.id)}
                >
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center z-10 shadow-sm transition-all duration-300 ${
                      currentStep === step.id 
                        ? 'bg-indigo-600 ring-2 ring-indigo-100' 
                        : step.id < currentStep
                          ? 'bg-indigo-500 text-white' 
                          : 'bg-white text-gray-400 border border-gray-200 group-hover:border-gray-300' 
                    }`}
                  >
                    {step.id < currentStep ? (
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    ) : (
                      <span className={`font-medium ${currentStep === step.id ? 'text-white' : 'text-gray-500'}`}>{step.id}</span>
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <div className={`text-xs font-medium ${currentStep === step.id ? 'text-indigo-700' : 'text-gray-700'}`}>{step.name}</div>
                    <div className={`text-xs px-1.5 rounded-full inline-block ${
                      currentStep === step.id 
                        ? 'bg-indigo-100 text-indigo-700' 
                        : step.id < currentStep
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                    }`}>{step.progress}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Compact Progress & Days left counter */}
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center">
              <div className={`h-2 w-2 rounded-full ${progressPercentage > 80 ? 'bg-green-500' : 'bg-yellow-500'} mr-2`}></div>
              <div className="font-medium text-gray-700">
                Progress: <span className="text-indigo-700 font-semibold">{progressPercentage}%</span> completed
              </div>
            </div>
            
            <div className="flex items-center bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg py-1.5 px-3 shadow-sm border border-indigo-100">
              <div className="mr-2 bg-white rounded px-2 py-1 shadow-sm">
                <span className="text-lg font-bold text-indigo-700">00</span>
              </div>
              <div>
                <div className="font-medium text-indigo-800">Days Remaining</div>
                <div className="text-xs text-indigo-600">Due on April 30, 2025</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Step Content - Enhanced with animation */}
      <div className="px-8 pb-12 transition-all duration-500 animate-fadeIn">
        {renderStepContent()}
      </div>
      
      {/* Add this at the end of your CSS or in a style tag */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default WorkflowContainer;