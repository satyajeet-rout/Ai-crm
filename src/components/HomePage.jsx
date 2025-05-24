// import React, { useState, useEffect } from 'react';
// import { Send, Mail, AlertCircle, CheckCircle2, Loader2, Paperclip, Image, MessageCircle, ShieldAlert, RefreshCw } from 'lucide-react';

// const HomePage = ({ onGmailSetup, onLogout }) => {
//   const [query, setQuery] = useState('');
//   const [isInputFocused, setIsInputFocused] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [results, setResults] = useState(null);
//   const [error, setError] = useState('');
//   const [authenticatedEmail, setAuthenticatedEmail] = useState(null);
//   const [lastSearchQuery, setLastSearchQuery] = useState('');
  
//   useEffect(() => {
//     const getEmailFromStorage = () => {
//       const storedEmail = localStorage.getItem('authenticatedEmail');
//       setAuthenticatedEmail(storedEmail);
//       console.log('HomePage loaded email from localStorage:', storedEmail);
//     };

//     getEmailFromStorage();

//     const handleStorageChange = (e) => {
//       if (e.key === 'authenticatedEmail') {
//         setAuthenticatedEmail(e.newValue);
//         console.log('HomePage detected localStorage change:', e.newValue);
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);
//     const interval = setInterval(getEmailFromStorage, 1000);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       clearInterval(interval);
//     };
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('authenticatedEmail');
//     setAuthenticatedEmail(null);
//     if (onLogout) {
//       onLogout();
//     }
//   };

//   const recentChats = [
//     {
//       title: "Show me all contacts living in Berlin",
//       timeAgo: "6 Hours"
//     },
//     {
//       title: "My last touch points with Lukas",
//       timeAgo: "12 Hours"
//     },
//     {
//       title: "Who in my network is an SaaS expert",
//       timeAgo: "18 Hours"
//     }
//   ];

//   // Enhanced error parsing function
//   const parseError = (errorMessage) => {
//     // Check for authentication errors
//     if (errorMessage.includes('401') || errorMessage.includes('No valid credentials')) {
//       return {
//         type: 'auth',
//         title: 'Authentication Required',
//         message: 'Your email connection has expired or is invalid. Please reconnect your Gmail account to continue searching.',
//         action: 'Reconnect Gmail'
//       };
//     }
    
//     // Check for server errors
//     if (errorMessage.includes('500') || errorMessage.includes('API Error')) {
//       return {
//         type: 'server',
//         title: 'Server Error',
//         message: 'Something went wrong on our end. Please try again in a moment.',
//         action: 'Try Again'
//       };
//     }
    
//     // Check for network errors
//     if (errorMessage.includes('NetworkError') || errorMessage.includes('fetch')) {
//       return {
//         type: 'network',
//         title: 'Connection Error',
//         message: 'Unable to connect to our servers. Please check your internet connection.',
//         action: 'Retry'
//       };
//     }
    
//     // Default error
//     return {
//       type: 'general',
//       title: 'Something went wrong',
//       message: 'An unexpected error occurred. Please try again.',
//       action: 'Try Again'
//     };
//   };

//   const handleSubmit = async () => {
//     if (!query.trim()) {
//       setError('Please enter a query');
//       return;
//     }

//     if (!authenticatedEmail) {
//       setError('Please authenticate your email first');
//       return;
//     }

//     setIsLoading(true);
//     setError('');
//     setResults(null);

//     try {
//       const response = await fetch(`${import.meta.env.VITE_SEARCH_URL}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           query: query.trim(),
//           max_results: 10,
//           gmail_address: authenticatedEmail,
//           source: "gmail"
//         })
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('API Response:', data);
        
//         if (data.status === 'success' && data.results) {
//           setResults({
//             results: data.results,
//             summary: data.summary,
//             source: data.source
//           });
//         } else {
//           setResults({ results: data.results || data, summary: null, source: null });
//         }
//         setLastSearchQuery(query.trim());
//         setQuery('');
//       } else {
//         const errorData = await response.text();
//         throw new Error(`API Error: ${response.status} - ${errorData}`);
//       }
//     } catch (error) {
//       console.error('Search error:', error);
//       setError(`Failed to search: ${error.message}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit();
//     }
//   };

//   const formatDate = (timestamp) => {
//     try {
//       return new Date(parseInt(timestamp)).toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       });
//     } catch {
//       return timestamp;
//     }
//   };

//   const handleErrorAction = (errorInfo) => {
//     if (errorInfo.type === 'auth' && onGmailSetup) {
//       onGmailSetup();
//     } else {
//       // Clear error and allow retry
//       setError('');
//     }
//   };

//   // Enhanced error display component
//   const ErrorDisplay = ({ error }) => {
//     const errorInfo = parseError(error);
    
//     const getErrorIcon = (type) => {
//       switch (type) {
//         case 'auth':
//           return <ShieldAlert className="w-5 h-5" />;
//         case 'server':
//           return <AlertCircle className="w-5 h-5" />;
//         case 'network':
//           return <RefreshCw className="w-5 h-5" />;
//         default:
//           return <AlertCircle className="w-5 h-5" />;
//       }
//     };

//     const getErrorColors = (type) => {
//       switch (type) {
//         case 'auth':
//           return {
//             bg: 'bg-orange-50',
//             border: 'border-orange-200',
//             text: 'text-orange-800',
//             icon: 'text-orange-600',
//             button: 'bg-orange-600 hover:bg-orange-700'
//           };
//         case 'server':
//           return {
//             bg: 'bg-red-50',
//             border: 'border-red-200',
//             text: 'text-red-800',
//             icon: 'text-red-600',
//             button: 'bg-red-600 hover:bg-red-700'
//           };
//         case 'network':
//           return {
//             bg: 'bg-blue-50',
//             border: 'border-blue-200',
//             text: 'text-blue-800',
//             icon: 'text-blue-600',
//             button: 'bg-blue-600 hover:bg-blue-700'
//           };
//         default:
//           return {
//             bg: 'bg-gray-50',
//             border: 'border-gray-200',
//             text: 'text-gray-800',
//             icon: 'text-gray-600',
//             button: 'bg-gray-600 hover:bg-gray-700'
//           };
//       }
//     };

//     const colors = getErrorColors(errorInfo.type);

//     return (
//       <div className={`mb-4 p-4 ${colors.bg} ${colors.border} border rounded-xl`}>
//         <div className="flex items-start space-x-3">
//           <div className={`${colors.icon} flex-shrink-0 mt-0.5`}>
//             {getErrorIcon(errorInfo.type)}
//           </div>
//           <div className="flex-1 min-w-0">
//             <h4 className={`font-medium ${colors.text} mb-1`}>
//               {errorInfo.title}
//             </h4>
//             <p className={`text-sm ${colors.text} opacity-90 leading-relaxed`}>
//               {errorInfo.message}
//             </p>
//           </div>
//           <button
//             onClick={() => handleErrorAction(errorInfo)}
//             className={`flex-shrink-0 px-3 py-1.5 ${colors.button} text-white text-sm font-medium rounded-lg transition-colors`}
//           >
//             {errorInfo.action}
//           </button>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="flex-1 flex flex-col min-h-screen bg-gray-50 overflow-auto">
//       <div className="flex-1 flex flex-col items-center justify-center px-8 py-16">
        
//         <div className="text-center mb-12">
//           <h1 className="text-2xl font-medium text-gray-800 mb-2">Good Evening, Kunal</h1>
//           <p className="text-gray-500 text-base">Enter a Keyword to get anything from your mail!</p>
          
//           {authenticatedEmail ? (
//             <div className="flex items-center justify-center space-x-4 mt-2">
//               <p className="text-sm text-green-600">✅ Connected: {authenticatedEmail}</p>
//               <button
//                 onClick={handleLogout}
//                 className="text-xs text-red-600 hover:text-red-700 underline"
//               >
//                 Disconnect
//               </button>
//             </div>
//           ) : (
//             <div className="flex items-center justify-center space-x-4 mt-2">
//               <p className="text-sm text-orange-600">⚠️ Please authenticate your email first</p>
//               {onGmailSetup && (
//                 <button
//                   onClick={onGmailSetup}
//                   className="text-sm bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
//                 >
//                   Connect Email
//                 </button>
//               )}
//             </div>
//           )}
//         </div>

//         <div className="w-full max-w-3xl">
//           <div className={`bg-white rounded-2xl border shadow-sm p-6 mb-12 transition-all duration-200 ${
//             isInputFocused 
//               ? 'border-purple-300 shadow-lg ring-2 ring-purple-100' 
//               : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
//           }`}>
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center space-x-2 bg-purple-200 px-2 rounded-xl text-gray-600">
//                 {/* <Send className="w-4 h-4" /> */}
//                 <span className="text-sm font-medium">Ask whatever you want</span>
//               </div>
//               <div className="flex items-center space-x-1 text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
//                 <Mail className="w-4 h-4" />
//                 <span>Gmail</span>
//               </div>
//             </div>

//             <div className="mb-6">
//               <textarea
//                 placeholder={authenticatedEmail ? "Type your Keyword here..." : "Please authenticate your email first..."}
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 onFocus={() => setIsInputFocused(true)}
//                 onBlur={() => setIsInputFocused(false)}
//                 onKeyPress={handleKeyPress}
//                 disabled={!authenticatedEmail || isLoading}
//                 className="w-full h-10 text-base bg-transparent border-none resize-none focus:outline-none text-gray-800 placeholder-gray-400 disabled:text-gray-500"
//               />
//             </div>

//             {error && <ErrorDisplay error={error} />}

//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-4">
//                 <button 
//                   type="button"
//                   className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 text-sm transition-colors"
//                   disabled={!authenticatedEmail}
//                 >
//                   <Paperclip className="w-4 h-4" />
//                   <span>Add Attachment</span>
//                 </button>
//                 <button 
//                   type="button"
//                   className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 text-sm transition-colors"
//                   disabled={!authenticatedEmail}
//                 >
//                   <Image className="w-4 h-4" />
//                   <span>Use Image</span>
//                 </button>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <span className="text-gray-400 text-sm">{query.length}/1000</span>
//                 <button 
//                   onClick={handleSubmit}
//                   disabled={!authenticatedEmail || isLoading || !query.trim()}
//                   className={`w-8 h-8 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center transition-all disabled:bg-gray-400 disabled:cursor-not-allowed ${
//                     query.length > 0 && !isLoading ? 'scale-110 shadow-md' : ''
//                   }`}
//                 >
//                   {isLoading ? (
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                   ) : (
//                     <Send className="w-4 h-4" />
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {results && results.results && results.results.length > 0 && (
//           <div className="w-full max-w-6xl mb-8">
//             {lastSearchQuery && (
//               <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-xl">
//                 <div className="flex items-center  space-x-2">
//                   {/* <Send className="w-4 h-4 text-purple-600" /> */}
//                   <span className="text-2xl font-medium text-black-700">Search Query:</span>
//                   <span className="text-purple-800 text-2xl font-medium">"{lastSearchQuery}"</span>
//                 </div>
//               </div>
//             )}
            
//             {results.summary && (
//               <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
//                 <h3 className="text-lg font-medium text-blue-900 mb-2">Summary</h3>
//                 <p className="text-blue-800 leading-relaxed">{results.summary}</p>
//                 <div className="mt-2 text-sm text-blue-600">
//                   Source: {results.source || 'Gmail'} • {results.results.length} results found
//                 </div>
//               </div>
//             )}
            
//             <h2 className="text-xl font-medium text-gray-800 mb-6">Search Results</h2>
//             <div className="space-y-4">
//               {results.results.map((result, index) => (
//                 <div
//                   key={result.id || index}
//                   className="bg-white rounded-xl border border-gray-200 p-6 hover:border-purple-300 hover:shadow-lg transition-all duration-200"
//                 >
//                   <div className="space-y-3">
//                     <h3 className="text-lg font-semibold text-gray-900 leading-tight">
//                       {result.subject || 'No Subject'}
//                     </h3>
                    
//                     <div className="flex items-center justify-between text-sm text-gray-600">
//                       {result.from && (
//                         <span className="flex items-center">
//                           <span className="font-medium">From:</span>
//                           <span className="ml-1">{result.from}</span>
//                         </span>
//                       )}
//                       {result.date && (
//                         <span className="text-gray-500">
//                           {formatDate(result.date)}
//                         </span>
//                       )}
//                     </div>
                    
//                     {result.snippet && (
//                       <p className="text-gray-700 leading-relaxed">
//                         {result.snippet}
//                       </p>
//                     )}
                    
//                     {result.link && (
//                       <div className="pt-2">
//                         <a
//                           href={result.link}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="inline-flex items-center text-sm text-purple-600 hover:text-purple-700 hover:underline"
//                         >
//                           <Mail className="w-4 h-4 mr-1" />
//                           Open in Gmail
//                         </a>
//                       </div>
//                     )}
                    
//                     {typeof result === 'string' && (
//                       <p className="text-gray-700">{result}</p>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         <div className="w-full max-w-6xl">
//           <h2 className="text-xl font-medium text-gray-800 mb-6">Your recent chats</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {recentChats.map((chat, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-xl border border-gray-200 p-6 hover:border-purple-300 hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:-translate-y-1"
//                 onClick={() => {
//                   if (authenticatedEmail) {
//                     setQuery(chat.title);
//                   }
//                 }}
//               >
//                 <div className="flex items-start space-x-3">
//                   <MessageCircle className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
//                   <div className="flex-1">
//                     <h3 className="text-gray-800 font-medium leading-snug mb-3">{chat.title}</h3>
//                     <p className="text-gray-500 text-sm">{chat.timeAgo}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;


// import React, { useState, useEffect } from 'react';
// import { Send, Mail, AlertCircle, CheckCircle2, Loader2, Paperclip, Image, MessageCircle, ShieldAlert, RefreshCw, ChevronDown, Database, Settings } from 'lucide-react';

// const HomePage = ({ onGmailSetup, onLogout }) => {
//   const [query, setQuery] = useState('');
//   const [isInputFocused, setIsInputFocused] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [results, setResults] = useState(null);
//   const [error, setError] = useState('');
//   const [authenticatedEmail, setAuthenticatedEmail] = useState(null);
//   const [odooConnection, setOdooConnection] = useState(null);
//   const [lastSearchQuery, setLastSearchQuery] = useState('');
//   const [selectedSource, setSelectedSource] = useState('gmail');
//   const [showToolsMenu, setShowToolsMenu] = useState(false);
  
//   useEffect(() => {
//     const getConnectionsFromStorage = () => {
//       // Get Gmail connection
//       const storedEmail = localStorage.getItem('authenticatedEmail');
//       setAuthenticatedEmail(storedEmail);
      
//       // Get Odoo connection
//       const storedOdoo = localStorage.getItem('odooConnection');
//       if (storedOdoo) {
//         try {
//           const odooDetails = JSON.parse(storedOdoo);
//           setOdooConnection(odooDetails);
//         } catch (error) {
//           console.error('Error parsing Odoo connection:', error);
//           localStorage.removeItem('odooConnection');
//         }
//       } else {
//         setOdooConnection(null);
//       }
      
//       console.log('HomePage loaded connections - Gmail:', storedEmail, 'Odoo:', storedOdoo);
//     };

//     getConnectionsFromStorage();

//     const handleStorageChange = (e) => {
//       if (e.key === 'authenticatedEmail' || e.key === 'odooConnection') {
//         getConnectionsFromStorage();
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);
//     const interval = setInterval(getConnectionsFromStorage, 1000);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       clearInterval(interval);
//     };
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('authenticatedEmail');
//     localStorage.removeItem('odooConnection');
//     setAuthenticatedEmail(null);
//     setOdooConnection(null);
//     if (onLogout) {
//       onLogout();
//     }
//   };

//   const getActiveConnection = () => {
//     if (selectedSource === 'gmail') {
//       return authenticatedEmail;
//     } else if (selectedSource === 'odoo') {
//       return odooConnection?.username;
//     }
//     return null;
//   };

//   const isConnected = () => {
//     if (selectedSource === 'gmail') {
//       return !!authenticatedEmail;
//     } else if (selectedSource === 'odoo') {
//       return !!odooConnection;
//     }
//     return false;
//   };

//   const tools = [
//     {
//       id: 'gmail',
//       name: 'Gmail',
//       icon: Mail,
//       description: 'Search your Gmail emails',
//       connected: !!authenticatedEmail
//     },
//     {
//       id: 'odoo',
//       name: 'Odoo',
//       icon: Database,
//       description: 'Search your Odoo data',
//       connected: !!odooConnection
//     }
//   ];

//   const recentChats = [
//     {
//       title: "Show me all contacts living in Berlin",
//       timeAgo: "6 Hours"
//     },
//     {
//       title: "My last touch points with Lukas",
//       timeAgo: "12 Hours"
//     },
//     {
//       title: "Who in my network is an SaaS expert",
//       timeAgo: "18 Hours"
//     }
//   ];

//   // Enhanced error parsing function
//   const parseError = (errorMessage) => {
//     // Check for authentication errors
//     if (errorMessage.includes('401') || errorMessage.includes('No valid credentials')) {
//       return {
//         type: 'auth',
//         title: 'Authentication Required',
//         message: `Your ${selectedSource} connection has expired or is invalid. Please reconnect your ${selectedSource} account to continue searching.`,
//         action: `Reconnect ${selectedSource.charAt(0).toUpperCase() + selectedSource.slice(1)}`
//       };
//     }
    
//     // Check for server errors
//     if (errorMessage.includes('500') || errorMessage.includes('API Error')) {
//       return {
//         type: 'server',
//         title: 'Server Error',
//         message: 'Something went wrong on our end. Please try again in a moment.',
//         action: 'Try Again'
//       };
//     }
    
//     // Check for network errors
//     if (errorMessage.includes('NetworkError') || errorMessage.includes('fetch')) {
//       return {
//         type: 'network',
//         title: 'Connection Error',
//         message: 'Unable to connect to our servers. Please check your internet connection.',
//         action: 'Retry'
//       };
//     }
    
//     // Default error
//     return {
//       type: 'general',
//       title: 'Something went wrong',
//       message: 'An unexpected error occurred. Please try again.',
//       action: 'Try Again'
//     };
//   };

//   const handleSubmit = async () => {
//     if (!query.trim()) {
//       setError('Please enter a query');
//       return;
//     }

//     const activeConnection = getActiveConnection();
//     if (!activeConnection) {
//       setError(`Please authenticate your ${selectedSource} connection first`);
//       return;
//     }

//     setIsLoading(true);
//     setError('');
//     setResults(null);

//     try {
//       // Build payload based on selected source
//       let payload = {
//         query: query.trim(),
//         max_results: 10,
//         source: selectedSource
//       };

//       // Add appropriate authentication field
//       if (selectedSource === 'gmail') {
//         payload.gmail_address = authenticatedEmail;
//       } else if (selectedSource === 'odoo') {
//         payload.gmail_address = odooConnection?.username; // Using username as identifier
//       }

//       console.log('Search payload:', payload);

//       const response = await fetch(`${import.meta.env.VITE_SEARCH_URL}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload)
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('API Response:', data);
        
//         if (data.status === 'success' && data.results) {
//           setResults({
//             results: data.results,
//             summary: data.summary,
//             source: data.source || selectedSource
//           });
//         } else {
//           setResults({ results: data.results || data, summary: null, source: selectedSource });
//         }
//         setLastSearchQuery(query.trim());
//         setQuery('');
//       } else {
//         const errorData = await response.text();
//         throw new Error(`API Error: ${response.status} - ${errorData}`);
//       }
//     } catch (error) {
//       console.error('Search error:', error);
//       setError(`Failed to search: ${error.message}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit();
//     }
//   };

//   const formatDate = (timestamp) => {
//     try {
//       return new Date(parseInt(timestamp)).toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       });
//     } catch {
//       return timestamp;
//     }
//   };

//   const handleErrorAction = (errorInfo) => {
//     if (errorInfo.type === 'auth' && onGmailSetup) {
//       onGmailSetup();
//     } else {
//       // Clear error and allow retry
//       setError('');
//     }
//   };

//   const selectTool = (toolId) => {
//     setSelectedSource(toolId);
//     setShowToolsMenu(false);
//     setError(''); // Clear any existing errors when switching tools
//   };

//   // Enhanced error display component
//   const ErrorDisplay = ({ error }) => {
//     const errorInfo = parseError(error);
    
//     const getErrorIcon = (type) => {
//       switch (type) {
//         case 'auth':
//           return <ShieldAlert className="w-5 h-5" />;
//         case 'server':
//           return <AlertCircle className="w-5 h-5" />;
//         case 'network':
//           return <RefreshCw className="w-5 h-5" />;
//         default:
//           return <AlertCircle className="w-5 h-5" />;
//       }
//     };

//     const getErrorColors = (type) => {
//       switch (type) {
//         case 'auth':
//           return {
//             bg: 'bg-orange-50',
//             border: 'border-orange-200',
//             text: 'text-orange-800',
//             icon: 'text-orange-600',
//             button: 'bg-orange-600 hover:bg-orange-700'
//           };
//         case 'server':
//           return {
//             bg: 'bg-red-50',
//             border: 'border-red-200',
//             text: 'text-red-800',
//             icon: 'text-red-600',
//             button: 'bg-red-600 hover:bg-red-700'
//           };
//         case 'network':
//           return {
//             bg: 'bg-blue-50',
//             border: 'border-blue-200',
//             text: 'text-blue-800',
//             icon: 'text-blue-600',
//             button: 'bg-blue-600 hover:bg-blue-700'
//           };
//         default:
//           return {
//             bg: 'bg-gray-50',
//             border: 'border-gray-200',
//             text: 'text-gray-800',
//             icon: 'text-gray-600',
//             button: 'bg-gray-600 hover:bg-gray-700'
//           };
//       }
//     };

//     const colors = getErrorColors(errorInfo.type);

//     return (
//       <div className={`mb-4 p-4 ${colors.bg} ${colors.border} border rounded-xl`}>
//         <div className="flex items-start space-x-3">
//           <div className={`${colors.icon} flex-shrink-0 mt-0.5`}>
//             {getErrorIcon(errorInfo.type)}
//           </div>
//           <div className="flex-1 min-w-0">
//             <h4 className={`font-medium ${colors.text} mb-1`}>
//               {errorInfo.title}
//             </h4>
//             <p className={`text-sm ${colors.text} opacity-90 leading-relaxed`}>
//               {errorInfo.message}
//             </p>
//           </div>
//           <button
//             onClick={() => handleErrorAction(errorInfo)}
//             className={`flex-shrink-0 px-3 py-1.5 ${colors.button} text-white text-sm font-medium rounded-lg transition-colors`}
//           >
//             {errorInfo.action}
//           </button>
//         </div>
//       </div>
//     );
//   };

//   const selectedTool = tools.find(tool => tool.id === selectedSource);

//   return (
//     <div className="flex-1 flex flex-col min-h-screen bg-gray-50 overflow-auto">
//       <div className="flex-1 flex flex-col items-center justify-center px-8 py-16">
        
//         <div className="text-center mb-12">
//           <h1 className="text-2xl font-medium text-gray-800 mb-2">Good Evening, Kunal</h1>
//           <p className="text-gray-500 text-base">Enter a Keyword to get anything from your data!</p>
          
//           {/* Connection Status */}
//           <div className="mt-4 space-y-2">
//             {/* Current Source Status */}
//             {isConnected() ? (
//               <div className="flex items-center justify-center space-x-4">
//                 <p className="text-sm text-green-600">
//                   ✅ {selectedTool?.name} Connected: {getActiveConnection()}
//                 </p>
//                 <button
//                   onClick={handleLogout}
//                   className="text-xs text-red-600 hover:text-red-700 underline"
//                 >
//                   Disconnect All
//                 </button>
//               </div>
//             ) : (
//               <div className="flex items-center justify-center space-x-4">
//                 <p className="text-sm text-orange-600">
//                   ⚠️ Please authenticate your {selectedTool?.name} connection first
//                 </p>
//                 {onGmailSetup && (
//                   <button
//                     onClick={onGmailSetup}
//                     className="text-sm bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
//                   >
//                     Connect Services
//                   </button>
//                 )}
//               </div>
//             )}

//             {/* All Connections Status */}
//             <div className="flex items-center justify-center space-x-6 text-xs">
//               <span className={`flex items-center space-x-1 ${authenticatedEmail ? 'text-green-600' : 'text-gray-400'}`}>
//                 <Mail className="w-3 h-3" />
//                 <span>Gmail {authenticatedEmail ? '✓' : '✗'}</span>
//               </span>
//               <span className={`flex items-center space-x-1 ${odooConnection ? 'text-green-600' : 'text-gray-400'}`}>
//                 <Database className="w-3 h-3" />
//                 <span>Odoo {odooConnection ? '✓' : '✗'}</span>
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="w-full max-w-3xl">
//           <div className={`bg-white rounded-2xl border shadow-sm p-6 mb-12 transition-all duration-200 ${
//             isInputFocused 
//               ? 'border-purple-300 shadow-lg ring-2 ring-purple-100' 
//               : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
//           }`}>
//             <div className="flex items-center justify-between mb-6">
//               {/* Tools Menu */}
//               <div className="relative">
//                 <button
//                   onClick={() => setShowToolsMenu(!showToolsMenu)}
//                   className="flex items-center space-x-2 bg-purple-100 hover:bg-purple-200 px-3 py-2 rounded-xl text-gray-700 transition-colors"
//                 >
//                   <Settings className="w-4 h-4" />
//                   <span className="text-sm font-medium">Tools</span>
//                   <ChevronDown className={`w-4 h-4 transition-transform ${showToolsMenu ? 'rotate-180' : ''}`} />
//                 </button>

//                 {showToolsMenu && (
//                   <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
//                     <div className="p-2">
//                       {tools.map((tool) => {
//                         const Icon = tool.icon;
//                         const isActive = selectedSource === tool.id;
//                         return (
//                           <button
//                             key={tool.id}
//                             onClick={() => selectTool(tool.id)}
//                             className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors ${
//                               isActive 
//                                 ? 'bg-purple-50 border border-purple-200' 
//                                 : 'hover:bg-gray-50'
//                             }`}
//                           >
//                             <Icon className={`w-5 h-5 ${isActive ? 'text-purple-600' : 'text-gray-500'}`} />
//                             <div className="flex-1">
//                               <div className="flex items-center space-x-2">
//                                 <span className={`font-medium ${isActive ? 'text-purple-900' : 'text-gray-900'}`}>
//                                   {tool.name}
//                                 </span>
//                                 {tool.connected && (
//                                   <span className="w-2 h-2 bg-green-400 rounded-full"></span>
//                                 )}
//                               </div>
//                               <p className="text-xs text-gray-500">{tool.description}</p>
//                             </div>
//                             {isActive && (
//                               <CheckCircle2 className="w-4 h-4 text-purple-600" />
//                             )}
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Selected Source Indicator */}
//               <div className="flex items-center space-x-1 text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
//                 {selectedTool?.icon && <selectedTool.icon className="w-4 h-4" />}
//                 <span>{selectedTool?.name}</span>
//                 {isConnected() && <span className="w-2 h-2 bg-green-400 rounded-full ml-1"></span>}
//               </div>
//             </div>

//             <div className="mb-6">
//               <textarea
//                 placeholder={isConnected() ? `Search your ${selectedTool?.name} data...` : `Please authenticate ${selectedTool?.name} first...`}
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 onFocus={() => setIsInputFocused(true)}
//                 onBlur={() => setIsInputFocused(false)}
//                 onKeyPress={handleKeyPress}
//                 disabled={!isConnected() || isLoading}
//                 className="w-full h-10 text-base bg-transparent border-none resize-none focus:outline-none text-gray-800 placeholder-gray-400 disabled:text-gray-500"
//               />
//             </div>

//             {error && <ErrorDisplay error={error} />}

//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-4">
//                 <button 
//                   type="button"
//                   className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 text-sm transition-colors"
//                   disabled={!isConnected()}
//                 >
//                   <Paperclip className="w-4 h-4" />
//                   <span>Add Attachment</span>
//                 </button>
//                 <button 
//                   type="button"
//                   className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 text-sm transition-colors"
//                   disabled={!isConnected()}
//                 >
//                   <Image className="w-4 h-4" />
//                   <span>Use Image</span>
//                 </button>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <span className="text-gray-400 text-sm">{query.length}/1000</span>
//                 <button 
//                   onClick={handleSubmit}
//                   disabled={!isConnected() || isLoading || !query.trim()}
//                   className={`w-8 h-8 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center transition-all disabled:bg-gray-400 disabled:cursor-not-allowed ${
//                     query.length > 0 && !isLoading ? 'scale-110 shadow-md' : ''
//                   }`}
//                 >
//                   {isLoading ? (
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                   ) : (
//                     <Send className="w-4 h-4" />
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {results && results.results && results.results.length > 0 && (
//           <div className="w-full max-w-6xl mb-8">
//             {lastSearchQuery && (
//               <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-xl">
//                 <div className="flex items-center space-x-2">
//                   <span className="text-2xl font-medium text-black-700">Search Query:</span>
//                   <span className="text-purple-800 text-2xl font-medium">"{lastSearchQuery}"</span>
//                   <span className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
//                     {results.source || selectedSource}
//                   </span>
//                 </div>
//               </div>
//             )}
            
//             {results.summary && (
//               <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
//                 <h3 className="text-lg font-medium text-blue-900 mb-2">Summary</h3>
//                 <p className="text-blue-800 leading-relaxed">{results.summary}</p>
//                 <div className="mt-2 text-sm text-blue-600">
//                   Source: {results.source || selectedSource} • {results.results.length} results found
//                 </div>
//               </div>
//             )}
            
//             <h2 className="text-xl font-medium text-gray-800 mb-6">Search Results</h2>
//             <div className="space-y-4">
//               {results.results.map((result, index) => (
//                 <div
//                   key={result.id || index}
//                   className="bg-white rounded-xl border border-gray-200 p-6 hover:border-purple-300 hover:shadow-lg transition-all duration-200"
//                 >
//                   <div className="space-y-3">
//                     <h3 className="text-lg font-semibold text-gray-900 leading-tight">
//                       {result.subject || result.title || 'No Subject'}
//                     </h3>
                    
//                     <div className="flex items-center justify-between text-sm text-gray-600">
//                       {result.from && (
//                         <span className="flex items-center">
//                           <span className="font-medium">From:</span>
//                           <span className="ml-1">{result.from}</span>
//                         </span>
//                       )}
//                       {result.date && (
//                         <span className="text-gray-500">
//                           {formatDate(result.date)}
//                         </span>
//                       )}
//                     </div>
                    
//                     {result.snippet && (
//                       <p className="text-gray-700 leading-relaxed">
//                         {result.snippet}
//                       </p>
//                     )}
                    
//                     {result.link && (
//                       <div className="pt-2">
//                         <a
//                           href={result.link}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="inline-flex items-center text-sm text-purple-600 hover:text-purple-700 hover:underline"
//                         >
//                           {selectedSource === 'gmail' ? (
//                             <>
//                               <Mail className="w-4 h-4 mr-1" />
//                               Open in Gmail
//                             </>
//                           ) : (
//                             <>
//                               <Database className="w-4 h-4 mr-1" />
//                               Open in Odoo
//                             </>
//                           )}
//                         </a>
//                       </div>
//                     )}
                    
//                     {typeof result === 'string' && (
//                       <p className="text-gray-700">{result}</p>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         <div className="w-full max-w-6xl">
//           <h2 className="text-xl font-medium text-gray-800 mb-6">Your recent chats</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {recentChats.map((chat, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-xl border border-gray-200 p-6 hover:border-purple-300 hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:-translate-y-1"
//                 onClick={() => {
//                   if (isConnected()) {
//                     setQuery(chat.title);
//                   }
//                 }}
//               >
//                 <div className="flex items-start space-x-3">
//                   <MessageCircle className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
//                   <div className="flex-1">
//                     <h3 className="text-gray-800 font-medium leading-snug mb-3">{chat.title}</h3>
//                     <p className="text-gray-500 text-sm">{chat.timeAgo}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;



// import React, { useState, useEffect } from 'react';
// import { Send, Mail, AlertCircle, CheckCircle2, Loader2, Paperclip, Image, MessageCircle, ShieldAlert, RefreshCw, ChevronDown, Database, Settings } from 'lucide-react';

// const HomePage = ({ onGmailSetup, onLogout }) => {
//   const [query, setQuery] = useState('');
//   const [isInputFocused, setIsInputFocused] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [results, setResults] = useState(null);
//   const [error, setError] = useState('');
//   const [authenticatedEmail, setAuthenticatedEmail] = useState(null);
//   const [odooConnection, setOdooConnection] = useState(null);
//   const [lastSearchQuery, setLastSearchQuery] = useState('');
//   const [selectedSource, setSelectedSource] = useState('gmail');
//   const [showToolsMenu, setShowToolsMenu] = useState(false);
  
//   useEffect(() => {
//     const getConnectionsFromStorage = () => {
//       // Get Gmail connection
//       const storedEmail = localStorage.getItem('authenticatedEmail');
//       setAuthenticatedEmail(storedEmail);
      
//       // Get Odoo connection
//       const storedOdoo = localStorage.getItem('odooConnection');
//       if (storedOdoo) {
//         try {
//           const odooDetails = JSON.parse(storedOdoo);
//           setOdooConnection(odooDetails);
//         } catch (error) {
//           console.error('Error parsing Odoo connection:', error);
//           localStorage.removeItem('odooConnection');
//         }
//       } else {
//         setOdooConnection(null);
//       }
      
//       console.log('HomePage loaded connections - Gmail:', storedEmail, 'Odoo:', storedOdoo);
//     };

//     getConnectionsFromStorage();

//     const handleStorageChange = (e) => {
//       if (e.key === 'authenticatedEmail' || e.key === 'odooConnection') {
//         getConnectionsFromStorage();
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);
//     const interval = setInterval(getConnectionsFromStorage, 1000);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       clearInterval(interval);
//     };
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('authenticatedEmail');
//     localStorage.removeItem('odooConnection');
//     setAuthenticatedEmail(null);
//     setOdooConnection(null);
//     if (onLogout) {
//       onLogout();
//     }
//   };

//   const getActiveConnection = () => {
//     if (selectedSource === 'gmail') {
//       return authenticatedEmail;
//     } else if (selectedSource === 'odoo') {
//       return odooConnection?.username;
//     }
//     return null;
//   };

//   const isConnected = () => {
//     if (selectedSource === 'gmail') {
//       return !!authenticatedEmail;
//     } else if (selectedSource === 'odoo') {
//       return !!odooConnection;
//     }
//     return false;
//   };

//   const tools = [
//     {
//       id: 'gmail',
//       name: 'Gmail',
//       icon: Mail,
//       description: 'Search your Gmail emails',
//       connected: !!authenticatedEmail
//     },
//     {
//       id: 'odoo',
//       name: 'Odoo',
//       icon: Database,
//       description: 'Search your Odoo data',
//       connected: !!odooConnection
//     }
//   ];

//   const recentChats = [
//     {
//       title: "Show me all contacts living in Berlin",
//       timeAgo: "6 Hours"
//     },
//     {
//       title: "My last touch points with Lukas",
//       timeAgo: "12 Hours"
//     },
//     {
//       title: "Who in my network is an SaaS expert",
//       timeAgo: "18 Hours"
//     }
//   ];

//   // Enhanced error parsing function
//   const parseError = (errorMessage) => {
//     // Check for authentication errors
//     if (errorMessage.includes('401') || errorMessage.includes('No valid credentials')) {
//       return {
//         type: 'auth',
//         title: 'Authentication Required',
//         message: `Your ${selectedSource} connection has expired or is invalid. Please reconnect your ${selectedSource} account to continue searching.`,
//         action: `Reconnect ${selectedSource.charAt(0).toUpperCase() + selectedSource.slice(1)}`
//       };
//     }
    
//     // Check for server errors
//     if (errorMessage.includes('500') || errorMessage.includes('API Error')) {
//       return {
//         type: 'server',
//         title: 'Server Error',
//         message: 'Something went wrong on our end. Please try again in a moment.',
//         action: 'Try Again'
//       };
//     }
    
//     // Check for network errors
//     if (errorMessage.includes('NetworkError') || errorMessage.includes('fetch')) {
//       return {
//         type: 'network',
//         title: 'Connection Error',
//         message: 'Unable to connect to our servers. Please check your internet connection.',
//         action: 'Retry'
//       };
//     }
    
//     // Default error
//     return {
//       type: 'general',
//       title: 'Something went wrong',
//       message: 'An unexpected error occurred. Please try again.',
//       action: 'Try Again'
//     };
//   };

//   const handleSubmit = async () => {
//     if (!query.trim()) {
//       setError('Please enter a query');
//       return;
//     }

//     const activeConnection = getActiveConnection();
//     if (!activeConnection) {
//       setError(`Please authenticate your ${selectedSource} connection first`);
//       return;
//     }

//     setIsLoading(true);
//     setError('');
//     setResults(null);

//     try {
//       // Build payload based on selected source
//       let payload = {
//         query: query.trim(),
//         max_results: 10,
//         source: selectedSource
//       };

//       // Add appropriate authentication field
//       if (selectedSource === 'gmail') {
//         payload.gmail_address = authenticatedEmail;
//       } else if (selectedSource === 'odoo') {
//         payload.gmail_address = odooConnection?.username; // Using username as identifier
//       }

//       console.log('Search payload:', payload);

//       const response = await fetch(`${import.meta.env.VITE_SEARCH_URL}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload)
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('API Response:', data);
        
//         if (data.status === 'success' && data.results) {
//           setResults({
//             results: data.results,
//             summary: data.summary,
//             source: data.source || selectedSource
//           });
//         } else {
//           setResults({ results: data.results || data, summary: null, source: selectedSource });
//         }
//         setLastSearchQuery(query.trim());
//         setQuery('');
//       } else {
//         const errorData = await response.text();
//         throw new Error(`API Error: ${response.status} - ${errorData}`);
//       }
//     } catch (error) {
//       console.error('Search error:', error);
//       setError(`Failed to search: ${error.message}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit();
//     }
//   };

//   const formatDate = (timestamp) => {
//     try {
//       let date;
      
//       // Handle different date formats
//       if (typeof timestamp === 'string' && timestamp.includes('-')) {
//         // Odoo format: "2025-05-22 13:55:45"
//         date = new Date(timestamp);
//       } else if (typeof timestamp === 'string' && timestamp.length > 10) {
//         // Gmail timestamp (string number)
//         date = new Date(parseInt(timestamp));
//       } else if (typeof timestamp === 'number') {
//         // Regular timestamp
//         date = new Date(timestamp);
//       } else {
//         // Try direct parsing
//         date = new Date(timestamp);
//       }

//       if (isNaN(date.getTime())) {
//         return timestamp; // Return original if parsing fails
//       }

//       return date.toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       });
//     } catch {
//       return timestamp;
//     }
//   };

//   const handleErrorAction = (errorInfo) => {
//     if (errorInfo.type === 'auth' && onGmailSetup) {
//       onGmailSetup();
//     } else {
//       // Clear error and allow retry
//       setError('');
//     }
//   };

//   const selectTool = (toolId) => {
//     setSelectedSource(toolId);
//     setShowToolsMenu(false);
//     setError(''); // Clear any existing errors when switching tools
//   };

//   // Enhanced error display component
//   const ErrorDisplay = ({ error }) => {
//     const errorInfo = parseError(error);
    
//     const getErrorIcon = (type) => {
//       switch (type) {
//         case 'auth':
//           return <ShieldAlert className="w-5 h-5" />;
//         case 'server':
//           return <AlertCircle className="w-5 h-5" />;
//         case 'network':
//           return <RefreshCw className="w-5 h-5" />;
//         default:
//           return <AlertCircle className="w-5 h-5" />;
//       }
//     };

//     const getErrorColors = (type) => {
//       switch (type) {
//         case 'auth':
//           return {
//             bg: 'bg-orange-50',
//             border: 'border-orange-200',
//             text: 'text-orange-800',
//             icon: 'text-orange-600',
//             button: 'bg-orange-600 hover:bg-orange-700'
//           };
//         case 'server':
//           return {
//             bg: 'bg-red-50',
//             border: 'border-red-200',
//             text: 'text-red-800',
//             icon: 'text-red-600',
//             button: 'bg-red-600 hover:bg-red-700'
//           };
//         case 'network':
//           return {
//             bg: 'bg-blue-50',
//             border: 'border-blue-200',
//             text: 'text-blue-800',
//             icon: 'text-blue-600',
//             button: 'bg-blue-600 hover:bg-blue-700'
//           };
//         default:
//           return {
//             bg: 'bg-gray-50',
//             border: 'border-gray-200',
//             text: 'text-gray-800',
//             icon: 'text-gray-600',
//             button: 'bg-gray-600 hover:bg-gray-700'
//           };
//       }
//     };

//     const colors = getErrorColors(errorInfo.type);

//     return (
//       <div className={`mb-4 p-4 ${colors.bg} ${colors.border} border rounded-xl`}>
//         <div className="flex items-start space-x-3">
//           <div className={`${colors.icon} flex-shrink-0 mt-0.5`}>
//             {getErrorIcon(errorInfo.type)}
//           </div>
//           <div className="flex-1 min-w-0">
//             <h4 className={`font-medium ${colors.text} mb-1`}>
//               {errorInfo.title}
//             </h4>
//             <p className={`text-sm ${colors.text} opacity-90 leading-relaxed`}>
//               {errorInfo.message}
//             </p>
//           </div>
//           <button
//             onClick={() => handleErrorAction(errorInfo)}
//             className={`flex-shrink-0 px-3 py-1.5 ${colors.button} text-white text-sm font-medium rounded-lg transition-colors`}
//           >
//             {errorInfo.action}
//           </button>
//         </div>
//       </div>
//     );
//   };

//   const selectedTool = tools.find(tool => tool.id === selectedSource);

//   return (
//     <div className="flex-1 flex flex-col min-h-screen bg-gray-50 overflow-auto">
//       <div className="flex-1 flex flex-col items-center justify-center px-8 py-16">
        
//         <div className="text-center mb-12">
//           <h1 className="text-2xl font-medium text-gray-800 mb-2">Good Evening, Kunal</h1>
//           <p className="text-gray-500 text-base">Enter a Keyword to get anything from your data!</p>
          
//           {/* Connection Status */}
//           <div className="mt-4 space-y-2">
//             {/* Current Source Status */}
//             {isConnected() ? (
//               <div className="flex items-center justify-center space-x-4">
//                 <p className="text-sm text-green-600">
//                   ✅ {selectedTool?.name} Connected: {getActiveConnection()}
//                 </p>
//                 <button
//                   onClick={handleLogout}
//                   className="text-xs text-red-600 hover:text-red-700 underline"
//                 >
//                   Disconnect All
//                 </button>
//               </div>
//             ) : (
//               <div className="flex items-center justify-center space-x-4">
//                 <p className="text-sm text-orange-600">
//                   ⚠️ Please authenticate your {selectedTool?.name} connection first
//                 </p>
//                 {onGmailSetup && (
//                   <button
//                     onClick={onGmailSetup}
//                     className="text-sm bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
//                   >
//                     Connect Services
//                   </button>
//                 )}
//               </div>
//             )}

//             {/* All Connections Status */}
//             <div className="flex items-center justify-center space-x-6 text-xs">
//               <span className={`flex items-center space-x-1 ${authenticatedEmail ? 'text-green-600' : 'text-gray-400'}`}>
//                 <Mail className="w-3 h-3" />
//                 <span>Gmail {authenticatedEmail ? '✓' : '✗'}</span>
//               </span>
//               <span className={`flex items-center space-x-1 ${odooConnection ? 'text-green-600' : 'text-gray-400'}`}>
//                 <Database className="w-3 h-3" />
//                 <span>Odoo {odooConnection ? '✓' : '✗'}</span>
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="w-full max-w-3xl">
//           <div className={`bg-white rounded-2xl border shadow-sm p-6 mb-12 transition-all duration-200 ${
//             isInputFocused 
//               ? 'border-purple-300 shadow-lg ring-2 ring-purple-100' 
//               : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
//           }`}>
//             <div className="flex items-center justify-between mb-6">
//               {/* Tools Menu */}
//               <div className="relative">
//                 <button
//                   onClick={() => setShowToolsMenu(!showToolsMenu)}
//                   className="flex items-center space-x-2 bg-purple-100 hover:bg-purple-200 px-3 py-2 rounded-xl text-gray-700 transition-colors"
//                 >
//                   <Settings className="w-4 h-4" />
//                   <span className="text-sm font-medium">Tools</span>
//                   <ChevronDown className={`w-4 h-4 transition-transform ${showToolsMenu ? 'rotate-180' : ''}`} />
//                 </button>

//                 {showToolsMenu && (
//                   <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
//                     <div className="p-2">
//                       {tools.map((tool) => {
//                         const Icon = tool.icon;
//                         const isActive = selectedSource === tool.id;
//                         return (
//                           <button
//                             key={tool.id}
//                             onClick={() => selectTool(tool.id)}
//                             className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors ${
//                               isActive 
//                                 ? 'bg-purple-50 border border-purple-200' 
//                                 : 'hover:bg-gray-50'
//                             }`}
//                           >
//                             <Icon className={`w-5 h-5 ${isActive ? 'text-purple-600' : 'text-gray-500'}`} />
//                             <div className="flex-1">
//                               <div className="flex items-center space-x-2">
//                                 <span className={`font-medium ${isActive ? 'text-purple-900' : 'text-gray-900'}`}>
//                                   {tool.name}
//                                 </span>
//                                 {tool.connected && (
//                                   <span className="w-2 h-2 bg-green-400 rounded-full"></span>
//                                 )}
//                               </div>
//                               <p className="text-xs text-gray-500">{tool.description}</p>
//                             </div>
//                             {isActive && (
//                               <CheckCircle2 className="w-4 h-4 text-purple-600" />
//                             )}
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Selected Source Indicator */}
//               <div className="flex items-center space-x-1 text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
//                 {selectedTool?.icon && <selectedTool.icon className="w-4 h-4" />}
//                 <span>{selectedTool?.name}</span>
//                 {isConnected() && <span className="w-2 h-2 bg-green-400 rounded-full ml-1"></span>}
//               </div>
//             </div>

//             <div className="mb-6">
//               <textarea
//                 placeholder={isConnected() ? `Search your ${selectedTool?.name} data...` : `Please authenticate ${selectedTool?.name} first...`}
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 onFocus={() => setIsInputFocused(true)}
//                 onBlur={() => setIsInputFocused(false)}
//                 onKeyPress={handleKeyPress}
//                 disabled={!isConnected() || isLoading}
//                 className="w-full h-10 text-base bg-transparent border-none resize-none focus:outline-none text-gray-800 placeholder-gray-400 disabled:text-gray-500"
//               />
//             </div>

//             {error && <ErrorDisplay error={error} />}

//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-4">
//                 <button 
//                   type="button"
//                   className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 text-sm transition-colors"
//                   disabled={!isConnected()}
//                 >
//                   <Paperclip className="w-4 h-4" />
//                   <span>Add Attachment</span>
//                 </button>
//                 <button 
//                   type="button"
//                   className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 text-sm transition-colors"
//                   disabled={!isConnected()}
//                 >
//                   <Image className="w-4 h-4" />
//                   <span>Use Image</span>
//                 </button>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <span className="text-gray-400 text-sm">{query.length}/1000</span>
//                 <button 
//                   onClick={handleSubmit}
//                   disabled={!isConnected() || isLoading || !query.trim()}
//                   className={`w-8 h-8 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center transition-all disabled:bg-gray-400 disabled:cursor-not-allowed ${
//                     query.length > 0 && !isLoading ? 'scale-110 shadow-md' : ''
//                   }`}
//                 >
//                   {isLoading ? (
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                   ) : (
//                     <Send className="w-4 h-4" />
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {results && results.results && results.results.length > 0 && (
//           <div className="w-full max-w-6xl mb-8">
//             {lastSearchQuery && (
//               <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-xl">
//                 <div className="flex items-center space-x-2">
//                   <span className="text-2xl font-medium text-black-700">Search Query:</span>
//                   <span className="text-purple-800 text-2xl font-medium">"{lastSearchQuery}"</span>
//                   <span className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
//                     {results.source || selectedSource}
//                   </span>
//                 </div>
//               </div>
//             )}
            
//             {results.summary && (
//               <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
//                 <h3 className="text-lg font-medium text-blue-900 mb-2">Summary</h3>
//                 <p className="text-blue-800 leading-relaxed">{results.summary}</p>
//                 <div className="mt-2 text-sm text-blue-600">
//                   Source: {results.source || selectedSource} • {results.results.length} results found
//                 </div>
//               </div>
//             )}
            
//             <h2 className="text-xl font-medium text-gray-800 mb-6">Search Results</h2>
//             <div className="space-y-4">
//               {results.results.map((result, index) => {
//                 // Handle different result formats for Gmail vs Odoo
//                 const isOdooResult = results.source === 'odoo' || selectedSource === 'odoo';
                
//                 let title, fromField, dateField, contentField, linkField, additionalInfo;
                
//                 if (isOdooResult) {
//                   // Odoo result format
//                   title = result.display_name || result.partner_name || result.name || 'Untitled Record';
//                   fromField = result.email_from || result.email_normalized || result.partner_name;
//                   dateField = result.create_date || result.write_date || result.date_open;
//                   contentField = result.description || 
//                                (result.expected_revenue ? `Expected Revenue: ${result.expected_revenue}` : '') ||
//                                (result.stage_id ? `Stage: ${Array.isArray(result.stage_id) ? result.stage_id[1] : result.stage_id}` : '');
//                   linkField = result.website;
                  
//                   // Build additional Odoo-specific info
//                   additionalInfo = [];
//                   if (result.phone) additionalInfo.push(`Phone: ${result.phone}`);
//                   if (result.expected_revenue) additionalInfo.push(`Revenue: ${result.expected_revenue}`);
//                   if (result.probability) additionalInfo.push(`Probability: ${result.probability}%`);
//                   if (result.stage_id && Array.isArray(result.stage_id)) additionalInfo.push(`Stage: ${result.stage_id[1]}`);
//                   if (result.user_id && Array.isArray(result.user_id)) additionalInfo.push(`Assigned to: ${result.user_id[1]}`);
//                   if (result.city) additionalInfo.push(`Location: ${result.city}`);
//                 } else {
//                   // Gmail result format (existing)
//                   title = result.subject || 'No Subject';
//                   fromField = result.from;
//                   dateField = result.date;
//                   contentField = result.snippet;
//                   linkField = result.link;
//                   additionalInfo = [];
//                 }

//                 return (
//                   <div
//                     key={result.id || index}
//                     className="bg-white rounded-xl border border-gray-200 p-6 hover:border-purple-300 hover:shadow-lg transition-all duration-200"
//                   >
//                     <div className="space-y-3">
//                       <h3 className="text-lg font-semibold text-gray-900 leading-tight">
//                         {title}
//                       </h3>
                      
//                       <div className="flex items-center justify-between text-sm text-gray-600 flex-wrap gap-2">
//                         {fromField && (
//                           <span className="flex items-center">
//                             <span className="font-medium">
//                               {isOdooResult ? 'Contact:' : 'From:'}
//                             </span>
//                             <span className="ml-1">{fromField}</span>
//                           </span>
//                         )}
//                         {dateField && (
//                           <span className="text-gray-500">
//                             {formatDate(dateField)}
//                           </span>
//                         )}
//                       </div>

//                       {/* Additional Odoo Info */}
//                       {isOdooResult && additionalInfo.length > 0 && (
//                         <div className="flex flex-wrap gap-2">
//                           {additionalInfo.map((info, idx) => (
//                             <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
//                               {info}
//                             </span>
//                           ))}
//                         </div>
//                       )}
                      
//                       {contentField && (
//                         <p className="text-gray-700 leading-relaxed">
//                           {contentField}
//                         </p>
//                       )}
                      
//                       {linkField && (
//                         <div className="pt-2">
//                           <a
//                             href={linkField}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="inline-flex items-center text-sm text-purple-600 hover:text-purple-700 hover:underline"
//                           >
//                             {isOdooResult ? (
//                               <>
//                                 <Database className="w-4 h-4 mr-1" />
//                                 {linkField.includes('http') ? 'Visit Website' : 'Open in Odoo'}
//                               </>
//                             ) : (
//                               <>
//                                 <Mail className="w-4 h-4 mr-1" />
//                                 Open in Gmail
//                               </>
//                             )}
//                           </a>
//                         </div>
//                       )}
                      
//                       {typeof result === 'string' && (
//                         <p className="text-gray-700">{result}</p>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}

//         <div className="w-full max-w-6xl">
//           <h2 className="text-xl font-medium text-gray-800 mb-6">Your recent chats</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {recentChats.map((chat, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-xl border border-gray-200 p-6 hover:border-purple-300 hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:-translate-y-1"
//                 onClick={() => {
//                   if (isConnected()) {
//                     setQuery(chat.title);
//                   }
//                 }}
//               >
//                 <div className="flex items-start space-x-3">
//                   <MessageCircle className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
//                   <div className="flex-1">
//                     <h3 className="text-gray-800 font-medium leading-snug mb-3">{chat.title}</h3>
//                     <p className="text-gray-500 text-sm">{chat.timeAgo}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;



// import React, { useState, useEffect } from 'react';
// import { Send, Mail, AlertCircle, CheckCircle2, Loader2, Paperclip, Image, MessageCircle, ShieldAlert, RefreshCw, ChevronDown, Database, Settings } from 'lucide-react';

// const HomePage = ({ onGmailSetup, onLogout }) => {
//   const [query, setQuery] = useState('');
//   const [isInputFocused, setIsInputFocused] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [conversations, setConversations] = useState([]);
//   const [error, setError] = useState('');
//   const [authenticatedEmail, setAuthenticatedEmail] = useState(null);
//   const [odooConnection, setOdooConnection] = useState(null);
//   const [selectedSource, setSelectedSource] = useState('gmail');
//   const [showToolsMenu, setShowToolsMenu] = useState(false);
  
//   useEffect(() => {
//     const getConnectionsFromStorage = () => {
//       const storedEmail = localStorage.getItem('authenticatedEmail');
//       setAuthenticatedEmail(storedEmail);
      
//       const storedOdoo = localStorage.getItem('odooConnection');
//       if (storedOdoo) {
//         try {
//           const odooDetails = JSON.parse(storedOdoo);
//           setOdooConnection(odooDetails);
//         } catch (error) {
//           console.error('Error parsing Odoo connection:', error);
//           localStorage.removeItem('odooConnection');
//         }
//       } else {
//         setOdooConnection(null);
//       }
      
//       console.log('HomePage loaded connections - Gmail:', storedEmail, 'Odoo:', storedOdoo);
//     };

//     getConnectionsFromStorage();

//     const handleStorageChange = (e) => {
//       if (e.key === 'authenticatedEmail' || e.key === 'odooConnection') {
//         getConnectionsFromStorage();
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);
//     const interval = setInterval(getConnectionsFromStorage, 1000);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       clearInterval(interval);
//     };
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('authenticatedEmail');
//     localStorage.removeItem('odooConnection');
//     setAuthenticatedEmail(null);
//     setOdooConnection(null);
//     if (onLogout) {
//       onLogout();
//     }
//   };

//   const getActiveConnection = () => {
//     if (selectedSource === 'gmail') {
//       return authenticatedEmail;
//     } else if (selectedSource === 'odoo') {
//       return odooConnection?.username;
//     }
//     return null;
//   };

//   const isConnected = () => {
//     if (selectedSource === 'gmail') {
//       return !!authenticatedEmail;
//     } else if (selectedSource === 'odoo') {
//       return !!odooConnection;
//     }
//     return false;
//   };

//   const tools = [
//     {
//       id: 'gmail',
//       name: 'Gmail',
//       icon: Mail,
//       description: 'Search your Gmail emails',
//       connected: !!authenticatedEmail
//     },
//     {
//       id: 'odoo',
//       name: 'Odoo',
//       icon: Database,
//       description: 'Search your Odoo data',
//       connected: !!odooConnection
//     }
//   ];

//   const recentChats = [
//     {
//       title: "Show me all contacts living in Berlin",
//       timeAgo: "6 Hours"
//     },
//     {
//       title: "My last touch points with Lukas",
//       timeAgo: "12 Hours"
//     },
//     {
//       title: "Who in my network is an SaaS expert",
//       timeAgo: "18 Hours"
//     }
//   ];

//   const parseError = (errorMessage) => {
//     if (errorMessage.includes('401') || errorMessage.includes('No valid credentials')) {
//       return {
//         type: 'auth',
//         title: 'Authentication Required',
//         message: `Your ${selectedSource} connection has expired or is invalid. Please reconnect your ${selectedSource} account to continue searching.`,
//         action: `Reconnect ${selectedSource.charAt(0).toUpperCase() + selectedSource.slice(1)}`
//       };
//     }
    
//     if (errorMessage.includes('500') || errorMessage.includes('API Error')) {
//       return {
//         type: 'server',
//         title: 'Server Error',
//         message: 'Something went wrong on our end. Please try again in a moment.',
//         action: 'Try Again'
//       };
//     }
    
//     if (errorMessage.includes('NetworkError') || errorMessage.includes('fetch')) {
//       return {
//         type: 'network',
//         title: 'Connection Error',
//         message: 'Unable to connect to our servers. Please check your internet connection.',
//         action: 'Retry'
//       };
//     }
    
//     return {
//       type: 'general',
//       title: 'Something went wrong',
//       message: 'An unexpected error occurred. Please try again.',
//       action: 'Try Again'
//     };
//   };

//   const handleSubmit = async () => {
//     if (!query.trim()) {
//       setError('Please enter a query');
//       return;
//     }

//     const activeConnection = getActiveConnection();
//     if (!activeConnection) {
//       setError(`Please authenticate your ${selectedSource} connection first`);
//       return;
//     }

//     setIsLoading(true);
//     setError('');

//     const userMessage = {
//       id: Date.now(),
//       type: 'user',
//       content: query.trim(),
//       source: selectedSource,
//       timestamp: new Date()
//     };
    
//     const currentQuery = query.trim();
//     setQuery('');
//     setConversations(prev => [...prev, userMessage]);

//     try {
//       let payload = {
//         query: currentQuery,
//         max_results: 10,
//         source: selectedSource
//       };

//       if (selectedSource === 'gmail') {
//         payload.gmail_address = authenticatedEmail;
//       } else if (selectedSource === 'odoo') {
//         payload.gmail_address = odooConnection?.username;
//       }

//       console.log('Search payload:', payload);

//       const response = await fetch(`${import.meta.env.VITE_SEARCH_URL}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload)
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('API Response:', data);
        
//         const assistantMessage = {
//           id: Date.now() + 1,
//           type: 'assistant',
//           content: {
//             results: data.results || [],
//             summary: data.summary,
//             source: data.source || selectedSource
//           },
//           timestamp: new Date()
//         };
        
//         setConversations(prev => [...prev, assistantMessage]);
//       } else {
//         const errorData = await response.text();
//         throw new Error(`API Error: ${response.status} - ${errorData}`);
//       }
//     } catch (error) {
//       console.error('Search error:', error);
//       setError(`Failed to search: ${error.message}`);
//       setConversations(prev => prev.slice(0, -1));
//       setQuery(currentQuery);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit();
//     }
//   };

//   const formatDate = (timestamp) => {
//     try {
//       let date;
      
//       if (typeof timestamp === 'string' && timestamp.includes('-')) {
//         date = new Date(timestamp);
//       } else if (typeof timestamp === 'string' && timestamp.length > 10) {
//         date = new Date(parseInt(timestamp));
//       } else if (typeof timestamp === 'number') {
//         date = new Date(timestamp);
//       } else {
//         date = new Date(timestamp);
//       }

//       if (isNaN(date.getTime())) {
//         return timestamp;
//       }

//       return date.toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       });
//     } catch {
//       return timestamp;
//     }
//   };

//   const handleErrorAction = (errorInfo) => {
//     if (errorInfo.type === 'auth' && onGmailSetup) {
//       onGmailSetup();
//     } else {
//       setError('');
//     }
//   };

//   const selectTool = (toolId) => {
//     setSelectedSource(toolId);
//     setShowToolsMenu(false);
//     setError('');
//   };

//   const selectedTool = tools.find(tool => tool.id === selectedSource);

//   const renderResult = (result, index, source) => {
//     const isOdooResult = source === 'odoo';
    
//     let title, fromField, dateField, contentField, linkField, additionalInfo;
    
//     if (isOdooResult) {
//       title = result.display_name || result.partner_name || result.name || 'Untitled Record';
//       fromField = result.email_from || result.email_normalized || result.partner_name;
//       dateField = result.create_date || result.write_date || result.date_open;
//       contentField = result.description || 
//                    (result.expected_revenue ? `Expected Revenue: $${result.expected_revenue}` : '') ||
//                    (result.stage_id ? `Stage: ${Array.isArray(result.stage_id) ? result.stage_id[1] : result.stage_id}` : '');
//       linkField = result.website;
      
//       additionalInfo = [];
//       if (result.phone) additionalInfo.push(`Phone: ${result.phone}`);
//       if (result.expected_revenue) additionalInfo.push(`Revenue: $${result.expected_revenue}`);
//       if (result.probability) additionalInfo.push(`Probability: ${result.probability}%`);
//       if (result.stage_id && Array.isArray(result.stage_id)) additionalInfo.push(`Stage: ${result.stage_id[1]}`);
//       if (result.user_id && Array.isArray(result.user_id)) additionalInfo.push(`Assigned to: ${result.user_id[1]}`);
//       if (result.city) additionalInfo.push(`Location: ${result.city}`);
//     } else {
//       title = result.subject || 'No Subject';
//       fromField = result.from;
//       dateField = result.date;
//       contentField = result.snippet;
//       linkField = result.link;
//       additionalInfo = [];
//     }

//     return (
//       <div
//         key={result.id || index}
//         className="bg-white rounded-xl border border-gray-200 p-4 hover:border-purple-300 hover:shadow-md transition-all duration-200"
//       >
//         <div className="space-y-3">
//           <h3 className="text-base font-semibold text-gray-900 leading-tight">
//             {title}
//           </h3>
          
//           <div className="flex items-center justify-between text-sm text-gray-600 flex-wrap gap-2">
//             {fromField && (
//               <span className="flex items-center">
//                 <span className="font-medium">
//                   {isOdooResult ? 'Contact:' : 'From:'}
//                 </span>
//                 <span className="ml-1">{fromField}</span>
//               </span>
//             )}
//             {dateField && (
//               <span className="text-gray-500 text-xs">
//                 {formatDate(dateField)}
//               </span>
//             )}
//           </div>

//           {isOdooResult && additionalInfo.length > 0 && (
//             <div className="flex flex-wrap gap-1">
//               {additionalInfo.map((info, idx) => (
//                 <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
//                   {info}
//                 </span>
//               ))}
//             </div>
//           )}
          
//           {contentField && (
//             <p className="text-gray-700 leading-relaxed text-sm">
//               {contentField}
//             </p>
//           )}
          
//           {linkField && (
//             <div className="pt-2">
//               <a
//                 href={linkField}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center text-sm text-purple-600 hover:text-purple-700 hover:underline"
//               >
//                 {isOdooResult ? (
//                   <>
//                     <Database className="w-4 h-4 mr-1" />
//                     {linkField.includes('http') ? 'Visit Website' : 'Open in Odoo'}
//                   </>
//                 ) : (
//                   <>
//                     <Mail className="w-4 h-4 mr-1" />
//                     Open in Gmail
//                   </>
//                 )}
//               </a>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   const ErrorDisplay = ({ error }) => {
//     const errorInfo = parseError(error);
    
//     const getErrorIcon = (type) => {
//       switch (type) {
//         case 'auth':
//           return <ShieldAlert className="w-5 h-5" />;
//         case 'server':
//           return <AlertCircle className="w-5 h-5" />;
//         case 'network':
//           return <RefreshCw className="w-5 h-5" />;
//         default:
//           return <AlertCircle className="w-5 h-5" />;
//       }
//     };

//     const getErrorColors = (type) => {
//       switch (type) {
//         case 'auth':
//           return {
//             bg: 'bg-orange-50',
//             border: 'border-orange-200',
//             text: 'text-orange-800',
//             icon: 'text-orange-600',
//             button: 'bg-orange-600 hover:bg-orange-700'
//           };
//         case 'server':
//           return {
//             bg: 'bg-red-50',
//             border: 'border-red-200',
//             text: 'text-red-800',
//             icon: 'text-red-600',
//             button: 'bg-red-600 hover:bg-red-700'
//           };
//         case 'network':
//           return {
//             bg: 'bg-blue-50',
//             border: 'border-blue-200',
//             text: 'text-blue-800',
//             icon: 'text-blue-600',
//             button: 'bg-blue-600 hover:bg-blue-700'
//           };
//         default:
//           return {
//             bg: 'bg-gray-50',
//             border: 'border-gray-200',
//             text: 'text-gray-800',
//             icon: 'text-gray-600',
//             button: 'bg-gray-600 hover:bg-gray-700'
//           };
//       }
//     };

//     const colors = getErrorColors(errorInfo.type);

//     return (
//       <div className={`mb-4 p-4 ${colors.bg} ${colors.border} border rounded-xl`}>
//         <div className="flex items-start space-x-3">
//           <div className={`${colors.icon} flex-shrink-0 mt-0.5`}>
//             {getErrorIcon(errorInfo.type)}
//           </div>
//           <div className="flex-1 min-w-0">
//             <h4 className={`font-medium ${colors.text} mb-1`}>
//               {errorInfo.title}
//             </h4>
//             <p className={`text-sm ${colors.text} opacity-90 leading-relaxed`}>
//               {errorInfo.message}
//             </p>
//           </div>
//           <button
//             onClick={() => handleErrorAction(errorInfo)}
//             className={`flex-shrink-0 px-3 py-1.5 ${colors.button} text-white text-sm font-medium rounded-lg transition-colors`}
//           >
//             {errorInfo.action}
//           </button>
//         </div>
//       </div>
//     );
//   };

//   const hasConversations = conversations.length > 0;
//   const hasResults = conversations.some(msg => msg.type === 'assistant' && msg.content.results?.length > 0);

//   // Tools Dropdown Component for reuse
//   const ToolsDropdown = ({ isCompact = false }) => (
//     <div className="relative">
//       <button
//         onClick={() => setShowToolsMenu(!showToolsMenu)}
//         className={`flex items-center space-x-2 ${
//           isCompact 
//             ? 'bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-lg text-gray-600' 
//             : 'bg-purple-100 hover:bg-purple-200 px-3 py-2 rounded-xl text-gray-700'
//         } transition-colors`}
//       >
//         {isCompact && selectedTool?.icon && <selectedTool.icon className="w-4 h-4" />}
//         {!isCompact && <Settings className="w-4 h-4" />}
//         {!isCompact && <span className="text-sm font-medium">Tools</span>}
//         <ChevronDown className={`${isCompact ? 'w-3 h-3' : 'w-4 h-4'} transition-transform ${showToolsMenu ? 'rotate-180' : ''}`} />
//       </button>

//       {showToolsMenu && (
//         <div className={`absolute ${isCompact ? 'bottom-full mb-2' : 'top-full mt-2'} left-0 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-10`}>
//           <div className="p-2">
//             {tools.map((tool) => {
//               const Icon = tool.icon;
//               const isActive = selectedSource === tool.id;
//               return (
//                 <button
//                   key={tool.id}
//                   onClick={() => selectTool(tool.id)}
//                   className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors ${
//                     isActive 
//                       ? 'bg-purple-50 border border-purple-200' 
//                       : 'hover:bg-gray-50'
//                   }`}
//                 >
//                   <Icon className={`w-5 h-5 ${isActive ? 'text-purple-600' : 'text-gray-500'}`} />
//                   <div className="flex-1">
//                     <div className="flex items-center space-x-2">
//                       <span className={`font-medium ${isActive ? 'text-purple-900' : 'text-gray-900'}`}>
//                         {tool.name}
//                       </span>
//                       {tool.connected && (
//                         <span className="w-2 h-2 bg-green-400 rounded-full"></span>
//                       )}
//                     </div>
//                     <p className="text-xs text-gray-500">{tool.description}</p>
//                   </div>
//                   {isActive && (
//                     <CheckCircle2 className="w-4 h-4 text-purple-600" />
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <div className="flex-1 flex flex-col h-screen bg-gray-50">
//       {/* Header - Connection Status */}
//       <div className="border-b border-gray-200 bg-white px-8 py-4 flex-shrink-0">
//         <div className="max-w-4xl mx-auto">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-xl font-medium text-gray-800">Good Evening, Kunal</h1>
//               <p className="text-sm text-gray-500">Enter a keyword to get anything from your data!</p>
//             </div>
            
//             <div className="flex items-center space-x-4 text-xs">
//               <span className={`flex items-center space-x-1 ${authenticatedEmail ? 'text-green-600' : 'text-gray-400'}`}>
//                 <Mail className="w-3 h-3" />
//                 <span>Gmail {authenticatedEmail ? '✓' : '✗'}</span>
//               </span>
//               <span className={`flex items-center space-x-1 ${odooConnection ? 'text-green-600' : 'text-gray-400'}`}>
//                 <Database className="w-3 h-3" />
//                 <span>Odoo {odooConnection ? '✓' : '✗'}</span>
//               </span>
//               {(authenticatedEmail || odooConnection) && (
//                 <button
//                   onClick={handleLogout}
//                   className="text-red-600 hover:text-red-700 underline"
//                 >
//                   Disconnect All
//                 </button>
//               )}
//               {onGmailSetup && (
//                 <button
//                   onClick={onGmailSetup}
//                   className="bg-purple-500 text-white px-3 py-1 rounded-lg hover:bg-purple-600"
//                 >
//                   Connect Services
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content Container */}
//       <div className="flex-1 flex flex-col min-h-0">
//         {!hasConversations ? (
//           /* Initial State - Centered Input */
//           <div className="flex-1 flex flex-col items-center justify-center px-8 py-16">
//             <div className="w-full max-w-3xl mb-12">
//               <div className={`bg-white rounded-2xl border shadow-sm p-6 transition-all duration-200 ${
//                 isInputFocused 
//                   ? 'border-purple-300 shadow-lg ring-2 ring-purple-100' 
//                   : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
//               }`}>
//                 <div className="flex items-center justify-between mb-6">
//                   <ToolsDropdown />
//                   <div className="flex items-center space-x-1 text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
//                     {selectedTool?.icon && <selectedTool.icon className="w-4 h-4" />}
//                     <span>{selectedTool?.name}</span>
//                     {isConnected() && <span className="w-2 h-2 bg-green-400 rounded-full ml-1"></span>}
//                   </div>
//                 </div>

//                 <div className="mb-6">
//                   <textarea
//                     placeholder={isConnected() ? `Search your ${selectedTool?.name} data...` : `Please authenticate ${selectedTool?.name} first...`}
//                     value={query}
//                     onChange={(e) => setQuery(e.target.value)}
//                     onFocus={() => setIsInputFocused(true)}
//                     onBlur={() => setIsInputFocused(false)}
//                     onKeyPress={handleKeyPress}
//                     disabled={!isConnected() || isLoading}
//                     className="w-full h-10 text-base bg-transparent border-none resize-none focus:outline-none text-gray-800 placeholder-gray-400 disabled:text-gray-500"
//                   />
//                 </div>

//                 {error && <ErrorDisplay error={error} />}

//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-4">
//                     <button 
//                       type="button"
//                       className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 text-sm transition-colors"
//                       disabled={!isConnected()}
//                     >
//                       <Paperclip className="w-4 h-4" />
//                       <span>Add Attachment</span>
//                     </button>
//                     <button 
//                       type="button"
//                       className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 text-sm transition-colors"
//                       disabled={!isConnected()}
//                     >
//                       <Image className="w-4 h-4" />
//                       <span>Use Image</span>
//                     </button>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <span className="text-gray-400 text-sm">{query.length}/1000</span>
//                     <button 
//                       onClick={handleSubmit}
//                       disabled={!isConnected() || isLoading || !query.trim()}
//                       className={`w-8 h-8 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center transition-all disabled:bg-gray-400 disabled:cursor-not-allowed ${
//                         query.length > 0 && !isLoading ? 'scale-110 shadow-md' : ''
//                       }`}
//                     >
//                       {isLoading ? (
//                         <Loader2 className="w-4 h-4 animate-spin" />
//                       ) : (
//                         <Send className="w-4 h-4" />
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Recent Chats */}
//             <div className="w-full max-w-6xl">
//               <h2 className="text-xl font-medium text-gray-800 mb-6">Your recent chats</h2>
              
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 {recentChats.map((chat, index) => (
//                   <div
//                     key={index}
//                     className="bg-white rounded-xl border border-gray-200 p-6 hover:border-purple-300 hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:-translate-y-1"
//                     onClick={() => {
//                       if (isConnected()) {
//                         setQuery(chat.title);
//                       }
//                     }}
//                   >
//                     <div className="flex items-start space-x-3">
//                       <MessageCircle className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
//                       <div className="flex-1">
//                         <h3 className="text-gray-800 font-medium leading-snug mb-3">{chat.title}</h3>
//                         <p className="text-gray-500 text-sm">{chat.timeAgo}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ) : (
//           /* Conversation View - Sticky Input at Bottom */
//           <>
//             {/* Scrollable Conversation Area */}
//             <div className="flex-1 overflow-y-auto px-8 py-6">
//               <div className="max-w-4xl mx-auto space-y-6">
//                 {conversations.map((message) => (
//                   <div key={message.id} className="space-y-4">
//                     {message.type === 'user' ? (
//                       <div className="flex justify-end">
//                         <div className="bg-purple-600 text-white rounded-2xl px-4 py-3 max-w-xl">
//                           <p className="text-sm">{message.content}</p>
//                           <div className="flex items-center space-x-2 mt-2 text-xs text-purple-200">
//                             {message.source === 'gmail' ? <Mail className="w-3 h-3" /> : <Database className="w-3 h-3" />}
//                             <span>{message.source}</span>
//                           </div>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="flex justify-start">
//                         <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-4xl w-full shadow-sm">
//                           {message.content.summary && (
//                             <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
//                               <h3 className="text-lg font-medium text-blue-900 mb-2">Summary</h3>
//                               <p className="text-blue-800 leading-relaxed">{message.content.summary}</p>
//                               <div className="mt-2 text-sm text-blue-600">
//                                 Source: {message.content.source} • {message.content.results.length} results found
//                               </div>
//                             </div>
//                           )}
                          
//                           <h3 className="text-lg font-medium text-gray-900 mb-4">
//                             {message.content.results.length} Results Found
//                           </h3>
                          
//                           <div className="space-y-3">
//                             {message.content.results.map((result, index) => 
//                               renderResult(result, index, message.content.source)
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ))}
                
//                 {isLoading && (
//                   <div className="flex justify-start">
//                     <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-xl shadow-sm">
//                       <div className="flex items-center space-x-3">
//                         <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
//                         <span className="text-gray-600">Searching...</span>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Sticky Bottom Input */}
//             <div className="border-t border-gray-200 bg-white px-8 py-4 flex-shrink-0">
//               <div className="max-w-4xl mx-auto">
//                 <div className="flex items-center space-x-4">
//                   <ToolsDropdown isCompact={true} />

//                   <div className="flex-1">
//                     <input
//                       type="text"
//                       placeholder={isConnected() ? `Ask about your ${selectedTool?.name} data...` : `Please authenticate ${selectedTool?.name} first...`}
//                       value={query}
//                       onChange={(e) => setQuery(e.target.value)}
//                       onKeyPress={handleKeyPress}
//                       disabled={!isConnected() || isLoading}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:text-gray-500 disabled:bg-gray-100"
//                     />
//                   </div>

//                   <button 
//                     onClick={handleSubmit}
//                     disabled={!isConnected() || isLoading || !query.trim()}
//                     className="w-10 h-10 bg-purple-600 text-white rounded-xl hover:bg-purple-700 flex items-center justify-center transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
//                   >
//                     {isLoading ? (
//                       <Loader2 className="w-4 h-4 animate-spin" />
//                     ) : (
//                       <Send className="w-4 h-4" />
//                     )}
//                   </button>
//                 </div>

//                 {error && (
//                   <div className="mt-3">
//                     <ErrorDisplay error={error} />
//                   </div>
//                 )}
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomePage;


// import React, { useState, useEffect } from 'react';
// import { Send, Mail, AlertCircle, CheckCircle2, Loader2, Paperclip, Image, MessageCircle, ShieldAlert, RefreshCw, ChevronDown, Database, Settings } from 'lucide-react';

// const HomePage = ({ onGmailSetup, onLogout }) => {
//   const [query, setQuery] = useState('');
//   const [isInputFocused, setIsInputFocused] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [conversations, setConversations] = useState([]);
//   const [error, setError] = useState('');
//   const [authenticatedEmail, setAuthenticatedEmail] = useState(null);
//   const [odooConnection, setOdooConnection] = useState(null);
//   const [selectedSource, setSelectedSource] = useState('gmail');
//   const [showToolsMenu, setShowToolsMenu] = useState(false);
  
//   useEffect(() => {
//     const getConnectionsFromStorage = () => {
//       const storedEmail = localStorage.getItem('authenticatedEmail');
//       setAuthenticatedEmail(storedEmail);
      
//       const storedOdoo = localStorage.getItem('odooConnection');
//       if (storedOdoo) {
//         try {
//           const odooDetails = JSON.parse(storedOdoo);
//           setOdooConnection(odooDetails);
//         } catch (error) {
//           console.error('Error parsing Odoo connection:', error);
//           localStorage.removeItem('odooConnection');
//         }
//       } else {
//         setOdooConnection(null);
//       }
      
//       console.log('HomePage loaded connections - Gmail:', storedEmail, 'Odoo:', storedOdoo);
//     };

//     getConnectionsFromStorage();

//     const handleStorageChange = (e) => {
//       if (e.key === 'authenticatedEmail' || e.key === 'odooConnection') {
//         getConnectionsFromStorage();
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);
//     const interval = setInterval(getConnectionsFromStorage, 1000);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       clearInterval(interval);
//     };
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('authenticatedEmail');
//     localStorage.removeItem('odooConnection');
//     setAuthenticatedEmail(null);
//     setOdooConnection(null);
//     if (onLogout) {
//       onLogout();
//     }
//   };

//   const getActiveConnection = () => {
//     if (selectedSource === 'gmail') {
//       return authenticatedEmail;
//     } else if (selectedSource === 'odoo') {
//       return odooConnection?.username;
//     }
//     return null;
//   };

//   const isConnected = () => {
//     if (selectedSource === 'gmail') {
//       return !!authenticatedEmail;
//     } else if (selectedSource === 'odoo') {
//       return !!odooConnection;
//     }
//     return false;
//   };

//   const tools = [
//     {
//       id: 'gmail',
//       name: 'Gmail',
//       icon: Mail,
//       description: 'Search your Gmail emails',
//       connected: !!authenticatedEmail
//     },
//     {
//       id: 'odoo',
//       name: 'Odoo',
//       icon: Database,
//       description: 'Search your Odoo data',
//       connected: !!odooConnection
//     }
//   ];

//   const recentChats = [
//     {
//       title: "Show me all contacts living in Berlin",
//       timeAgo: "6 Hours"
//     },
//     {
//       title: "My last touch points with Lukas",
//       timeAgo: "12 Hours"
//     },
//     {
//       title: "Who in my network is an SaaS expert",
//       timeAgo: "18 Hours"
//     }
//   ];

//   const parseError = (errorMessage) => {
//     if (errorMessage.includes('401') || errorMessage.includes('No valid credentials')) {
//       return {
//         type: 'auth',
//         title: 'Authentication Required',
//         message: `Your ${selectedSource} connection has expired or is invalid. Please reconnect your ${selectedSource} account to continue searching.`,
//         action: `Reconnect ${selectedSource.charAt(0).toUpperCase() + selectedSource.slice(1)}`
//       };
//     }
    
//     if (errorMessage.includes('500') || errorMessage.includes('API Error')) {
//       return {
//         type: 'server',
//         title: 'Server Error',
//         message: 'Something went wrong on our end. Please try again in a moment.',
//         action: 'Try Again'
//       };
//     }
    
//     if (errorMessage.includes('NetworkError') || errorMessage.includes('fetch')) {
//       return {
//         type: 'network',
//         title: 'Connection Error',
//         message: 'Unable to connect to our servers. Please check your internet connection.',
//         action: 'Retry'
//       };
//     }
    
//     return {
//       type: 'general',
//       title: 'Something went wrong',
//       message: 'An unexpected error occurred. Please try again.',
//       action: 'Try Again'
//     };
//   };

//   const handleSubmit = async () => {
//     if (!query.trim()) {
//       setError('Please enter a query');
//       return;
//     }

//     const activeConnection = getActiveConnection();
//     if (!activeConnection) {
//       setError(`Please authenticate your ${selectedSource} connection first`);
//       return;
//     }

//     setIsLoading(true);
//     setError('');

//     const userMessage = {
//       id: Date.now(),
//       type: 'user',
//       content: query.trim(),
//       source: selectedSource,
//       timestamp: new Date()
//     };
    
//     const currentQuery = query.trim();
//     setQuery('');
//     setConversations(prev => [...prev, userMessage]);

//     try {
//       let payload = {
//         query: currentQuery,
//         max_results: 10,
//         source: selectedSource
//       };

//       if (selectedSource === 'gmail') {
//         payload.gmail_address = authenticatedEmail;
//       } else if (selectedSource === 'odoo') {
//         payload.gmail_address = odooConnection?.username;
//       }

//       console.log('Search payload:', payload);

//       const response = await fetch(`${import.meta.env.VITE_SEARCH_URL}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload)
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('API Response:', data);
        
//         const assistantMessage = {
//           id: Date.now() + 1,
//           type: 'assistant',
//           content: {
//             results: data.results || [],
//             summary: data.summary,
//             source: data.source || selectedSource
//           },
//           timestamp: new Date()
//         };
        
//         setConversations(prev => [...prev, assistantMessage]);
//       } else {
//         const errorData = await response.text();
//         throw new Error(`API Error: ${response.status} - ${errorData}`);
//       }
//     } catch (error) {
//       console.error('Search error:', error);
//       setError(`Failed to search: ${error.message}`);
//       setConversations(prev => prev.slice(0, -1));
//       setQuery(currentQuery);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit();
//     }
//   };

//   const formatDate = (timestamp) => {
//     try {
//       let date;
      
//       if (typeof timestamp === 'string' && timestamp.includes('-')) {
//         date = new Date(timestamp);
//       } else if (typeof timestamp === 'string' && timestamp.length > 10) {
//         date = new Date(parseInt(timestamp));
//       } else if (typeof timestamp === 'number') {
//         date = new Date(timestamp);
//       } else {
//         date = new Date(timestamp);
//       }

//       if (isNaN(date.getTime())) {
//         return timestamp;
//       }

//       return date.toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       });
//     } catch {
//       return timestamp;
//     }
//   };

//   const handleErrorAction = (errorInfo) => {
//     if (errorInfo.type === 'auth' && onGmailSetup) {
//       onGmailSetup();
//     } else {
//       setError('');
//     }
//   };

//   const selectTool = (toolId) => {
//     setSelectedSource(toolId);
//     setShowToolsMenu(false);
//     setError('');
//   };

//   const selectedTool = tools.find(tool => tool.id === selectedSource);

//   const renderResult = (result, index, source) => {
//     const isOdooResult = source === 'odoo';
    
//     let title, fromField, dateField, contentField, linkField, additionalInfo;
    
//     if (isOdooResult) {
//       title = result.display_name || result.partner_name || result.name || 'Untitled Record';
//       fromField = result.email_from || result.email_normalized || result.partner_name;
//       dateField = result.create_date || result.write_date || result.date_open;
//       contentField = result.description || 
//                    (result.expected_revenue ? `Expected Revenue: $${result.expected_revenue}` : '') ||
//                    (result.stage_id ? `Stage: ${Array.isArray(result.stage_id) ? result.stage_id[1] : result.stage_id}` : '');
//       linkField = result.website;
      
//       additionalInfo = [];
//       if (result.phone) additionalInfo.push(`Phone: ${result.phone}`);
//       if (result.expected_revenue) additionalInfo.push(`Revenue: $${result.expected_revenue}`);
//       if (result.probability) additionalInfo.push(`Probability: ${result.probability}%`);
//       if (result.stage_id && Array.isArray(result.stage_id)) additionalInfo.push(`Stage: ${result.stage_id[1]}`);
//       if (result.user_id && Array.isArray(result.user_id)) additionalInfo.push(`Assigned to: ${result.user_id[1]}`);
//       if (result.city) additionalInfo.push(`Location: ${result.city}`);
//     } else {
//       title = result.subject || 'No Subject';
//       fromField = result.from;
//       dateField = result.date;
//       contentField = result.snippet;
//       linkField = result.link;
//       additionalInfo = [];
//     }

//     return (
//       <div
//         key={result.id || index}
//         className="bg-white rounded-xl border border-gray-200 p-4 hover:border-purple-300 hover:shadow-md transition-all duration-200"
//       >
//         <div className="space-y-3">
//           <h3 className="text-base font-semibold text-gray-900 leading-tight">
//             {title}
//           </h3>
          
//           <div className="flex items-center justify-between text-sm text-gray-600 flex-wrap gap-2">
//             {fromField && (
//               <span className="flex items-center">
//                 <span className="font-medium">
//                   {isOdooResult ? 'Contact:' : 'From:'}
//                 </span>
//                 <span className="ml-1">{fromField}</span>
//               </span>
//             )}
//             {dateField && (
//               <span className="text-gray-500 text-xs">
//                 {formatDate(dateField)}
//               </span>
//             )}
//           </div>

//           {isOdooResult && additionalInfo.length > 0 && (
//             <div className="flex flex-wrap gap-1">
//               {additionalInfo.map((info, idx) => (
//                 <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
//                   {info}
//                 </span>
//               ))}
//             </div>
//           )}
          
//           {contentField && (
//             <p className="text-gray-700 leading-relaxed text-sm">
//               {contentField}
//             </p>
//           )}
          
//           {linkField && (
//             <div className="pt-2">
//               <a
//                 href={linkField}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center text-sm text-purple-600 hover:text-purple-700 hover:underline"
//               >
//                 {isOdooResult ? (
//                   <>
//                     <Database className="w-4 h-4 mr-1" />
//                     {linkField.includes('http') ? 'Visit Website' : 'Open in Odoo'}
//                   </>
//                 ) : (
//                   <>
//                     <Mail className="w-4 h-4 mr-1" />
//                     Open in Gmail
//                   </>
//                 )}
//               </a>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   const ErrorDisplay = ({ error }) => {
//     const errorInfo = parseError(error);
    
//     const getErrorIcon = (type) => {
//       switch (type) {
//         case 'auth':
//           return <ShieldAlert className="w-5 h-5" />;
//         case 'server':
//           return <AlertCircle className="w-5 h-5" />;
//         case 'network':
//           return <RefreshCw className="w-5 h-5" />;
//         default:
//           return <AlertCircle className="w-5 h-5" />;
//       }
//     };

//     const getErrorColors = (type) => {
//       switch (type) {
//         case 'auth':
//           return {
//             bg: 'bg-orange-50',
//             border: 'border-orange-200',
//             text: 'text-orange-800',
//             icon: 'text-orange-600',
//             button: 'bg-orange-600 hover:bg-orange-700'
//           };
//         case 'server':
//           return {
//             bg: 'bg-red-50',
//             border: 'border-red-200',
//             text: 'text-red-800',
//             icon: 'text-red-600',
//             button: 'bg-red-600 hover:bg-red-700'
//           };
//         case 'network':
//           return {
//             bg: 'bg-blue-50',
//             border: 'border-blue-200',
//             text: 'text-blue-800',
//             icon: 'text-blue-600',
//             button: 'bg-blue-600 hover:bg-blue-700'
//           };
//         default:
//           return {
//             bg: 'bg-gray-50',
//             border: 'border-gray-200',
//             text: 'text-gray-800',
//             icon: 'text-gray-600',
//             button: 'bg-gray-600 hover:bg-gray-700'
//           };
//       }
//     };

//     const colors = getErrorColors(errorInfo.type);

//     return (
//       <div className={`mb-4 p-4 ${colors.bg} ${colors.border} border rounded-xl`}>
//         <div className="flex items-start space-x-3">
//           <div className={`${colors.icon} flex-shrink-0 mt-0.5`}>
//             {getErrorIcon(errorInfo.type)}
//           </div>
//           <div className="flex-1 min-w-0">
//             <h4 className={`font-medium ${colors.text} mb-1`}>
//               {errorInfo.title}
//             </h4>
//             <p className={`text-sm ${colors.text} opacity-90 leading-relaxed`}>
//               {errorInfo.message}
//             </p>
//           </div>
//           <button
//             onClick={() => handleErrorAction(errorInfo)}
//             className={`flex-shrink-0 px-3 py-1.5 ${colors.button} text-white text-sm font-medium rounded-lg transition-colors`}
//           >
//             {errorInfo.action}
//           </button>
//         </div>
//       </div>
//     );
//   };

//   const hasConversations = conversations.length > 0;

//   // Tools Dropdown Component for reuse
//   const ToolsDropdown = ({ isCompact = false }) => (
//     <div className="relative">
//       <button
//         onClick={() => setShowToolsMenu(!showToolsMenu)}
//         className={`flex items-center space-x-2 ${
//           isCompact 
//             ? 'bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-lg text-gray-600' 
//             : 'bg-purple-100 hover:bg-purple-200 px-3 py-2 rounded-xl text-gray-700'
//         } transition-colors`}
//       >
//         {isCompact && selectedTool?.icon && <selectedTool.icon className="w-4 h-4" />}
//         {!isCompact && <Settings className="w-4 h-4" />}
//         {!isCompact && <span className="text-sm font-medium">Tools</span>}
//         <ChevronDown className={`${isCompact ? 'w-3 h-3' : 'w-4 h-4'} transition-transform ${showToolsMenu ? 'rotate-180' : ''}`} />
//       </button>

//       {showToolsMenu && (
//         <div className={`absolute ${isCompact ? 'bottom-full mb-2' : 'top-full mt-2'} left-0 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-10`}>
//           <div className="p-2">
//             {tools.map((tool) => {
//               const Icon = tool.icon;
//               const isActive = selectedSource === tool.id;
//               return (
//                 <button
//                   key={tool.id}
//                   onClick={() => selectTool(tool.id)}
//                   className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors ${
//                     isActive 
//                       ? 'bg-purple-50 border border-purple-200' 
//                       : 'hover:bg-gray-50'
//                   }`}
//                 >
//                   <Icon className={`w-5 h-5 ${isActive ? 'text-purple-600' : 'text-gray-500'}`} />
//                   <div className="flex-1">
//                     <div className="flex items-center space-x-2">
//                       <span className={`font-medium ${isActive ? 'text-purple-900' : 'text-gray-900'}`}>
//                         {tool.name}
//                       </span>
//                       {tool.connected && (
//                         <span className="w-2 h-2 bg-green-400 rounded-full"></span>
//                       )}
//                     </div>
//                     <p className="text-xs text-gray-500">{tool.description}</p>
//                   </div>
//                   {isActive && (
//                     <CheckCircle2 className="w-4 h-4 text-purple-600" />
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <div className="flex-1 flex flex-col bg-gray-50">
//       {hasConversations ? (
//         /* Conversation View - After First Query */
//         <div className="h-screen flex flex-col">
//           {/* Header - Connection Status */}
//           <div className="border-b border-gray-200 bg-white px-8 py-4 flex-shrink-0">
//             <div className="max-w-4xl mx-auto">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h1 className="text-xl font-medium text-gray-800">Good Evening, Kunal</h1>
//                   <p className="text-sm text-gray-500">Enter a keyword to get anything from your data!</p>
//                 </div>
                
//                 <div className="flex items-center space-x-4 text-xs">
//                   <span className={`flex items-center space-x-1 ${authenticatedEmail ? 'text-green-600' : 'text-gray-400'}`}>
//                     <Mail className="w-3 h-3" />
//                     <span>Gmail {authenticatedEmail ? '✓' : '✗'}</span>
//                   </span>
//                   <span className={`flex items-center space-x-1 ${odooConnection ? 'text-green-600' : 'text-gray-400'}`}>
//                     <Database className="w-3 h-3" />
//                     <span>Odoo {odooConnection ? '✓' : '✗'}</span>
//                   </span>
//                   {(authenticatedEmail || odooConnection) && (
//                     <button
//                       onClick={handleLogout}
//                       className="text-red-600 hover:text-red-700 underline"
//                     >
//                       Disconnect All
//                     </button>
//                   )}
//                   {onGmailSetup && (
//                     <button
//                       onClick={onGmailSetup}
//                       className="bg-purple-500 text-white px-3 py-1 rounded-lg hover:bg-purple-600"
//                     >
//                       Connect Services
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Scrollable Conversation Area */}
//           <div className="flex-1 overflow-y-auto px-8 py-6">
//             <div className="max-w-4xl mx-auto space-y-6">
//               {conversations.map((message) => (
//                 <div key={message.id} className="space-y-4">
//                   {message.type === 'user' ? (
//                     <div className="flex justify-end">
//                       <div className="bg-purple-600 text-white rounded-2xl px-4 py-3 max-w-xl">
//                         <p className="text-sm">{message.content}</p>
//                         <div className="flex items-center space-x-2 mt-2 text-xs text-purple-200">
//                           {message.source === 'gmail' ? <Mail className="w-3 h-3" /> : <Database className="w-3 h-3" />}
//                           <span>{message.source}</span>
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="flex justify-start">
//                       <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-4xl w-full shadow-sm">
//                         {message.content.summary && (
//                           <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
//                             <h3 className="text-lg font-medium text-blue-900 mb-2">Summary</h3>
//                             <p className="text-blue-800 leading-relaxed">{message.content.summary}</p>
//                             <div className="mt-2 text-sm text-blue-600">
//                               Source: {message.content.source} • {message.content.results.length} results found
//                             </div>
//                           </div>
//                         )}
                        
//                         <h3 className="text-lg font-medium text-gray-900 mb-4">
//                           {message.content.results.length} Results Found
//                         </h3>
                        
//                         <div className="space-y-3">
//                           {message.content.results.map((result, index) => 
//                             renderResult(result, index, message.content.source)
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
              
//               {isLoading && (
//                 <div className="flex justify-start">
//                   <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-xl shadow-sm">
//                     <div className="flex items-center space-x-3">
//                       <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
//                       <span className="text-gray-600">Searching...</span>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Sticky Bottom Input */}
//           <div className="border-t border-gray-200 bg-white px-8 py-4 flex-shrink-0">
//             <div className="max-w-4xl mx-auto">
//               <div className="flex items-center space-x-4">
//                 <ToolsDropdown isCompact={true} />

//                 <div className="flex-1">
//                   <input
//                     type="text"
//                     placeholder={isConnected() ? `Ask about your ${selectedTool?.name} data...` : `Please authenticate ${selectedTool?.name} first...`}
//                     value={query}
//                     onChange={(e) => setQuery(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                     disabled={!isConnected() || isLoading}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:text-gray-500 disabled:bg-gray-100"
//                   />
//                 </div>

//                 <button 
//                   onClick={handleSubmit}
//                   disabled={!isConnected() || isLoading || !query.trim()}
//                   className="w-10 h-10 bg-purple-600 text-white rounded-xl hover:bg-purple-700 flex items-center justify-center transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
//                 >
//                   {isLoading ? (
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                   ) : (
//                     <Send className="w-4 h-4" />
//                   )}
//                 </button>
//               </div>

//               {error && (
//                 <div className="mt-3">
//                   <ErrorDisplay error={error} />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       ) : (
//         /* Initial Landing View - Centered Layout */
//         <div className="min-h-screen flex flex-col items-center justify-center px-8 py-16 overflow-auto">
          
//           <div className="text-center mb-12">
//             <h1 className="text-2xl font-medium text-gray-800 mb-2">Good Evening, Kunal</h1>
//             <p className="text-gray-500 text-base">Enter a Keyword to get anything from your data!</p>
            
//             {/* Connection Status */}
//             <div className="mt-4 space-y-2">
//               {/* Current Source Status */}
//               {isConnected() ? (
//                 <div className="flex items-center justify-center space-x-4">
//                   <p className="text-sm text-green-600">
//                     ✅ {selectedTool?.name} Connected: {getActiveConnection()}
//                   </p>
//                   <button
//                     onClick={handleLogout}
//                     className="text-xs text-red-600 hover:text-red-700 underline"
//                   >
//                     Disconnect All
//                   </button>
//                 </div>
//               ) : (
//                 <div className="flex items-center justify-center space-x-4">
//                   <p className="text-sm text-orange-600">
//                     ⚠️ Please authenticate your {selectedTool?.name} connection first
//                   </p>
//                   {onGmailSetup && (
//                     <button
//                       onClick={onGmailSetup}
//                       className="text-sm bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
//                     >
//                       Connect Services
//                     </button>
//                   )}
//                 </div>
//               )}

//               {/* All Connections Status */}
//               <div className="flex items-center justify-center space-x-6 text-xs">
//                 <span className={`flex items-center space-x-1 ${authenticatedEmail ? 'text-green-600' : 'text-gray-400'}`}>
//                   <Mail className="w-3 h-3" />
//                   <span>Gmail {authenticatedEmail ? '✓' : '✗'}</span>
//                 </span>
//                 <span className={`flex items-center space-x-1 ${odooConnection ? 'text-green-600' : 'text-gray-400'}`}>
//                   <Database className="w-3 h-3" />
//                   <span>Odoo {odooConnection ? '✓' : '✗'}</span>
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="w-full max-w-3xl">
//             <div className={`bg-white rounded-2xl border shadow-sm p-6 mb-12 transition-all duration-200 ${
//               isInputFocused 
//                 ? 'border-purple-300 shadow-lg ring-2 ring-purple-100' 
//                 : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
//             }`}>
//               <div className="flex items-center justify-between mb-6">
//                 <ToolsDropdown />
//                 <div className="flex items-center space-x-1 text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
//                   {selectedTool?.icon && <selectedTool.icon className="w-4 h-4" />}
//                   <span>{selectedTool?.name}</span>
//                   {isConnected() && <span className="w-2 h-2 bg-green-400 rounded-full ml-1"></span>}
//                 </div>
//               </div>

//               <div className="mb-6">
//                 <textarea
//                   placeholder={isConnected() ? `Search your ${selectedTool?.name} data...` : `Please authenticate ${selectedTool?.name} first...`}
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   onFocus={() => setIsInputFocused(true)}
//                   onBlur={() => setIsInputFocused(false)}
//                   onKeyPress={handleKeyPress}
//                   disabled={!isConnected() || isLoading}
//                   className="w-full h-10 text-base bg-transparent border-none resize-none focus:outline-none text-gray-800 placeholder-gray-400 disabled:text-gray-500"
//                 />
//               </div>

//               {error && <ErrorDisplay error={error} />}

//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-4">
//                   <button 
//                     type="button"
//                     className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 text-sm transition-colors"
//                     disabled={!isConnected()}
//                   >
//                     <Paperclip className="w-4 h-4" />
//                     <span>Add Attachment</span>
//                   </button>
//                   <button 
//                     type="button"
//                     className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 text-sm transition-colors"
//                     disabled={!isConnected()}
//                   >
//                     <Image className="w-4 h-4" />
//                     <span>Use Image</span>
//                   </button>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <span className="text-gray-400 text-sm">{query.length}/1000</span>
//                   <button 
//                     onClick={handleSubmit}
//                     disabled={!isConnected() || isLoading || !query.trim()}
//                     className={`w-8 h-8 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center transition-all disabled:bg-gray-400 disabled:cursor-not-allowed ${
//                       query.length > 0 && !isLoading ? 'scale-110 shadow-md' : ''
//                     }`}
//                   >
//                     {isLoading ? (
//                       <Loader2 className="w-4 h-4 animate-spin" />
//                     ) : (
//                       <Send className="w-4 h-4" />
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="w-full max-w-6xl">
//             <h2 className="text-xl font-medium text-gray-800 mb-6">Your recent chats</h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {recentChats.map((chat, index) => (
//                 <div
//                   key={index}
//                   className="bg-white rounded-xl border border-gray-200 p-6 hover:border-purple-300 hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:-translate-y-1"
//                   onClick={() => {
//                     if (isConnected()) {
//                       setQuery(chat.title);
//                     }
//                   }}
//                 >
//                   <div className="flex items-start space-x-3">
//                     <MessageCircle className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
//                     <div className="flex-1">
//                       <h3 className="text-gray-800 font-medium leading-snug mb-3">{chat.title}</h3>
//                       <p className="text-gray-500 text-sm">{chat.timeAgo}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HomePage;




















// import React, { useState, useEffect, useRef } from 'react';
// import { Send, Mail, AlertCircle, CheckCircle2, Loader2, Paperclip, Image, MessageCircle, ShieldAlert, RefreshCw, ChevronDown, Database, Settings } from 'lucide-react';

// const HomePage = ({ onGmailSetup, onLogout }) => {
//   const [query, setQuery] = useState('');
//   const [isInputFocused, setIsInputFocused] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [conversations, setConversations] = useState([]);
//   const [error, setError] = useState('');
//   const [authenticatedEmail, setAuthenticatedEmail] = useState(null);
//   const [odooConnection, setOdooConnection] = useState(null);
//   const [selectedSource, setSelectedSource] = useState('gmail');
//   const [showToolsMenu, setShowToolsMenu] = useState(false);
//   const conversationRef = useRef(null);
  
//   useEffect(() => {
//     const getConnectionsFromStorage = () => {
//       const storedEmail = localStorage.getItem('authenticatedEmail');
//       setAuthenticatedEmail(storedEmail);
      
//       const storedOdoo = localStorage.getItem('odooConnection');
//       if (storedOdoo) {
//         try {
//           const odooDetails = JSON.parse(storedOdoo);
//           setOdooConnection(odooDetails);
//         } catch (error) {
//           console.error('Error parsing Odoo connection:', error);
//           localStorage.removeItem('odooConnection');
//         }
//       } else {
//         setOdooConnection(null);
//       }
      
//       console.log('HomePage loaded connections - Gmail:', storedEmail, 'Odoo:', storedOdoo);
//     };

//     getConnectionsFromStorage();

//     const handleStorageChange = (e) => {
//       if (e.key === 'authenticatedEmail' || e.key === 'odooConnection') {
//         getConnectionsFromStorage();
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);
//     const interval = setInterval(getConnectionsFromStorage, 1000);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       clearInterval(interval);
//     };
//   }, []);

//   // Auto-scroll to latest message
//   useEffect(() => {
//     if (conversationRef.current && conversations.length > 0) {
//       setTimeout(() => {
//         conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
//       }, 100);
//     }
//   }, [conversations]);

//   const handleLogout = () => {
//     localStorage.removeItem('authenticatedEmail');
//     localStorage.removeItem('odooConnection');
//     setAuthenticatedEmail(null);
//     setOdooConnection(null);
//     if (onLogout) {
//       onLogout();
//     }
//   };

//   const getActiveConnection = () => {
//     if (selectedSource === 'gmail') {
//       return authenticatedEmail;
//     } else if (selectedSource === 'odoo') {
//       return odooConnection?.username;
//     }
//     return null;
//   };

//   const isConnected = () => {
//     if (selectedSource === 'gmail') {
//       return !!authenticatedEmail;
//     } else if (selectedSource === 'odoo') {
//       return !!odooConnection;
//     }
//     return false;
//   };

//   const tools = [
//     {
//       id: 'gmail',
//       name: 'Gmail',
//       icon: Mail,
//       description: 'Search your Gmail emails',
//       connected: !!authenticatedEmail
//     },
//     {
//       id: 'odoo',
//       name: 'Odoo',
//       icon: Database,
//       description: 'Search your Odoo data',
//       connected: !!odooConnection
//     }
//   ];

//   const recentChats = [
//     {
//       title: "Show me all contacts living in Berlin",
//       timeAgo: "6 Hours"
//     },
//     {
//       title: "My last touch points with Lukas",
//       timeAgo: "12 Hours"
//     },
//     {
//       title: "Who in my network is an SaaS expert",
//       timeAgo: "18 Hours"
//     }
//   ];

//   const parseError = (errorMessage) => {
//     if (errorMessage.includes('401') || errorMessage.includes('No valid credentials')) {
//       return {
//         type: 'auth',
//         title: 'Authentication Required',
//         message: `Your ${selectedSource} connection has expired or is invalid. Please reconnect your ${selectedSource} account to continue searching.`,
//         action: `Reconnect ${selectedSource.charAt(0).toUpperCase() + selectedSource.slice(1)}`
//       };
//     }
    
//     if (errorMessage.includes('500') || errorMessage.includes('API Error')) {
//       return {
//         type: 'server',
//         title: 'Server Error',
//         message: 'Something went wrong on our end. Please try again in a moment.',
//         action: 'Try Again'
//       };
//     }
    
//     if (errorMessage.includes('NetworkError') || errorMessage.includes('fetch')) {
//       return {
//         type: 'network',
//         title: 'Connection Error',
//         message: 'Unable to connect to our servers. Please check your internet connection.',
//         action: 'Retry'
//       };
//     }
    
//     return {
//       type: 'general',
//       title: 'Something went wrong',
//       message: 'An unexpected error occurred. Please try again.',
//       action: 'Try Again'
//     };
//   };

//   const handleSubmit = async () => {
//     if (!query.trim()) {
//       setError('Please enter a query');
//       return;
//     }

//     const activeConnection = getActiveConnection();
//     if (!activeConnection) {
//       setError(`Please authenticate your ${selectedSource} connection first`);
//       return;
//     }

//     setIsLoading(true);
//     setError('');

//     const userMessage = {
//       id: Date.now(),
//       type: 'user',
//       content: query.trim(),
//       source: selectedSource,
//       timestamp: new Date()
//     };
    
//     const currentQuery = query.trim();
//     setQuery('');
//     setConversations(prev => [...prev, userMessage]);

//     try {
//       let payload = {
//         query: currentQuery,
//         max_results: 10,
//         source: selectedSource
//       };

//       if (selectedSource === 'gmail') {
//         payload.gmail_address = authenticatedEmail;
//       } else if (selectedSource === 'odoo') {
//         payload.gmail_address = odooConnection?.username;
//       }

//       console.log('Search payload:', payload);

//       const response = await fetch(`${import.meta.env.VITE_SEARCH_URL}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload)
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('API Response:', data);
        
//         const assistantMessage = {
//           id: Date.now() + 1,
//           type: 'assistant',
//           content: {
//             results: data.results || [],
//             summary: data.summary,
//             source: data.source || selectedSource
//           },
//           timestamp: new Date()
//         };
        
//         setConversations(prev => [...prev, assistantMessage]);
//       } else {
//         const errorData = await response.text();
//         throw new Error(`API Error: ${response.status} - ${errorData}`);
//       }
//     } catch (error) {
//       console.error('Search error:', error);
//       setError(`Failed to search: ${error.message}`);
//       setConversations(prev => prev.slice(0, -1));
//       setQuery(currentQuery);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit();
//     }
//   };

//   const formatDate = (timestamp) => {
//     try {
//       let date;
      
//       if (typeof timestamp === 'string' && timestamp.includes('-')) {
//         date = new Date(timestamp);
//       } else if (typeof timestamp === 'string' && timestamp.length > 10) {
//         date = new Date(parseInt(timestamp));
//       } else if (typeof timestamp === 'number') {
//         date = new Date(timestamp);
//       } else {
//         date = new Date(timestamp);
//       }

//       if (isNaN(date.getTime())) {
//         return timestamp;
//       }

//       return date.toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       });
//     } catch {
//       return timestamp;
//     }
//   };

//   const handleErrorAction = (errorInfo) => {
//     if (errorInfo.type === 'auth' && onGmailSetup) {
//       onGmailSetup();
//     } else {
//       setError('');
//     }
//   };

//   const selectTool = (toolId) => {
//     setSelectedSource(toolId);
//     setShowToolsMenu(false);
//     setError('');
//   };

//   const selectedTool = tools.find(tool => tool.id === selectedSource);

//   const renderResult = (result, index, source) => {
//     const isOdooResult = source === 'odoo';
    
//     let title, fromField, dateField, contentField, linkField, additionalInfo;
    
//     if (isOdooResult) {
//       title = result.display_name || result.partner_name || result.name || 'Untitled Record';
//       fromField = result.email_from || result.email_normalized || result.partner_name;
//       dateField = result.create_date || result.write_date || result.date_open;
//       contentField = result.description || 
//                    (result.expected_revenue ? `Expected Revenue: $${result.expected_revenue}` : '') ||
//                    (result.stage_id ? `Stage: ${Array.isArray(result.stage_id) ? result.stage_id[1] : result.stage_id}` : '');
//       linkField = result.website;
      
//       additionalInfo = [];
//       if (result.phone) additionalInfo.push(`Phone: ${result.phone}`);
//       if (result.expected_revenue) additionalInfo.push(`Revenue: $${result.expected_revenue}`);
//       if (result.probability) additionalInfo.push(`Probability: ${result.probability}%`);
//       if (result.stage_id && Array.isArray(result.stage_id)) additionalInfo.push(`Stage: ${result.stage_id[1]}`);
//       if (result.user_id && Array.isArray(result.user_id)) additionalInfo.push(`Assigned to: ${result.user_id[1]}`);
//       if (result.city) additionalInfo.push(`Location: ${result.city}`);
//     } else {
//       title = result.subject || 'No Subject';
//       fromField = result.from;
//       dateField = result.date;
//       contentField = result.snippet;
//       linkField = result.link;
//       additionalInfo = [];
//     }

//     return (
//       <div
//         key={result.id || index}
//         className="bg-white rounded-xl border border-gray-200 p-4 hover:border-purple-300 hover:shadow-md transition-all duration-200"
//       >
//         <div className="space-y-3">
//           <h3 className="text-base font-semibold text-gray-900 leading-tight">
//             {title}
//           </h3>
          
//           <div className="flex items-center justify-between text-sm text-gray-600 flex-wrap gap-2">
//             {fromField && (
//               <span className="flex items-center">
//                 <span className="font-medium">
//                   {isOdooResult ? 'Contact:' : 'From:'}
//                 </span>
//                 <span className="ml-1">{fromField}</span>
//               </span>
//             )}
//             {dateField && (
//               <span className="text-gray-500 text-xs">
//                 {formatDate(dateField)}
//               </span>
//             )}
//           </div>

//           {isOdooResult && additionalInfo.length > 0 && (
//             <div className="flex flex-wrap gap-1">
//               {additionalInfo.map((info, idx) => (
//                 <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
//                   {info}
//                 </span>
//               ))}
//             </div>
//           )}
          
//           {contentField && (
//             <p className="text-gray-700 leading-relaxed text-sm">
//               {contentField}
//             </p>
//           )}
          
//           {linkField && (
//             <div className="pt-2">
//               <a
//                 href={linkField}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center text-sm text-purple-600 hover:text-purple-700 hover:underline"
//               >
//                 {isOdooResult ? (
//                   <>
//                     <Database className="w-4 h-4 mr-1" />
//                     {linkField.includes('http') ? 'Visit Website' : 'Open in Odoo'}
//                   </>
//                 ) : (
//                   <>
//                     <Mail className="w-4 h-4 mr-1" />
//                     Open in Gmail
//                   </>
//                 )}
//               </a>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   const ErrorDisplay = ({ error }) => {
//     const errorInfo = parseError(error);
    
//     const getErrorIcon = (type) => {
//       switch (type) {
//         case 'auth':
//           return <ShieldAlert className="w-5 h-5" />;
//         case 'server':
//           return <AlertCircle className="w-5 h-5" />;
//         case 'network':
//           return <RefreshCw className="w-5 h-5" />;
//         default:
//           return <AlertCircle className="w-5 h-5" />;
//       }
//     };

//     const getErrorColors = (type) => {
//       switch (type) {
//         case 'auth':
//           return {
//             bg: 'bg-orange-50',
//             border: 'border-orange-200',
//             text: 'text-orange-800',
//             icon: 'text-orange-600',
//             button: 'bg-orange-600 hover:bg-orange-700'
//           };
//         case 'server':
//           return {
//             bg: 'bg-red-50',
//             border: 'border-red-200',
//             text: 'text-red-800',
//             icon: 'text-red-600',
//             button: 'bg-red-600 hover:bg-red-700'
//           };
//         case 'network':
//           return {
//             bg: 'bg-blue-50',
//             border: 'border-blue-200',
//             text: 'text-blue-800',
//             icon: 'text-blue-600',
//             button: 'bg-blue-600 hover:bg-blue-700'
//           };
//         default:
//           return {
//             bg: 'bg-gray-50',
//             border: 'border-gray-200',
//             text: 'text-gray-800',
//             icon: 'text-gray-600',
//             button: 'bg-gray-600 hover:bg-gray-700'
//           };
//       }
//     };

//     const colors = getErrorColors(errorInfo.type);

//     return (
//       <div className={`mb-4 p-4 ${colors.bg} ${colors.border} border rounded-xl`}>
//         <div className="flex items-start space-x-3">
//           <div className={`${colors.icon} flex-shrink-0 mt-0.5`}>
//             {getErrorIcon(errorInfo.type)}
//           </div>
//           <div className="flex-1 min-w-0">
//             <h4 className={`font-medium ${colors.text} mb-1`}>
//               {errorInfo.title}
//             </h4>
//             <p className={`text-sm ${colors.text} opacity-90 leading-relaxed`}>
//               {errorInfo.message}
//             </p>
//           </div>
//           <button
//             onClick={() => handleErrorAction(errorInfo)}
//             className={`flex-shrink-0 px-3 py-1.5 ${colors.button} text-white text-sm font-medium rounded-lg transition-colors`}
//           >
//             {errorInfo.action}
//           </button>
//         </div>
//       </div>
//     );
//   };

//   const hasConversations = conversations.length > 0;

//   // Tools Dropdown Component for reuse
//   const ToolsDropdown = ({ isCompact = false }) => (
//     <div className="relative">
//       <button
//         onClick={() => setShowToolsMenu(!showToolsMenu)}
//         className={`flex items-center space-x-2 ${
//           isCompact 
//             ? 'bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-lg text-gray-600' 
//             : 'bg-purple-100 hover:bg-purple-200 px-3 py-2 rounded-xl text-gray-700'
//         } transition-colors`}
//       >
//         {isCompact && selectedTool?.icon && <selectedTool.icon className="w-4 h-4" />}
//         {!isCompact && <Settings className="w-4 h-4" />}
//         {!isCompact && <span className="text-sm font-medium">Tools</span>}
//         <ChevronDown className={`${isCompact ? 'w-3 h-3' : 'w-4 h-4'} transition-transform ${showToolsMenu ? 'rotate-180' : ''}`} />
//       </button>

//       {showToolsMenu && (
//         <div className={`absolute ${isCompact ? 'bottom-full mb-2' : 'top-full mt-2'} left-0 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-10`}>
//           <div className="p-3">
//             <div className="mb-3">
//               <h4 className="text-sm font-medium text-gray-700 mb-2">Select Data Source</h4>
//             </div>
//             {tools.map((tool) => {
//               const Icon = tool.icon;
//               const isActive = selectedSource === tool.id;
//               const isConnected = tool.connected;
              
//               return (
//                 <button
//                   key={tool.id}
//                   onClick={() => selectTool(tool.id)}
//                   className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all mb-2 ${
//                     isActive 
//                       ? 'bg-purple-50 border-2 border-purple-200 shadow-sm' 
//                       : 'hover:bg-gray-50 border-2 border-transparent'
//                   }`}
//                 >
//                   <div className="relative">
//                     <Icon className={`w-6 h-6 ${isActive ? 'text-purple-600' : 'text-gray-500'}`} />
//                     {isConnected && (
//                       <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
//                     )}
//                   </div>
                  
//                   <div className="flex-1">
//                     <div className="flex items-center justify-between">
//                       <span className={`font-medium ${isActive ? 'text-purple-900' : 'text-gray-900'}`}>
//                         {tool.name}
//                       </span>
//                       <div className="flex items-center space-x-2">
//                         {isConnected ? (
//                           <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">
//                             Connected
//                           </span>
//                         ) : (
//                           <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full font-medium">
//                             Not Connected
//                           </span>
//                         )}
//                         {isActive && (
//                           <CheckCircle2 className="w-4 h-4 text-purple-600" />
//                         )}
//                       </div>
//                     </div>
//                     <p className="text-xs text-gray-500 mt-1">{tool.description}</p>
//                     {isConnected && (
//                       <p className="text-xs text-green-600 mt-1 font-medium">
//                         {tool.id === 'gmail' ? authenticatedEmail : odooConnection?.username}
//                       </p>
//                     )}
//                   </div>
//                 </button>
//               );
//             })}
            
//             {/* Connect Services Button */}
//             <div className="mt-3 pt-3 border-t border-gray-200">
//               {onGmailSetup && (
//                 <button
//                   onClick={() => {
//                     setShowToolsMenu(false);
//                     onGmailSetup();
//                   }}
//                   className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
//                 >
//                   Connect New Service
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <div className="flex-1 flex flex-col bg-gray-50">
//       {hasConversations ? (
//         /* Conversation View - After First Query */
//         <div className="h-screen flex flex-col">
//           {/* Header - Connection Status */}
//           <div className="border-b border-gray-200 bg-white px-8 py-4 flex-shrink-0">
//             <div className="max-w-4xl mx-auto">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h1 className="text-xl font-medium text-gray-800">Good Evening, Kunal</h1>
//                   <p className="text-sm text-gray-500">Enter a keyword to get anything from your data!</p>
//                 </div>
                
//                 <div className="flex items-center space-x-4 text-xs">
//                   <span className={`flex items-center space-x-1 ${authenticatedEmail ? 'text-green-600' : 'text-gray-400'}`}>
//                     <Mail className="w-3 h-3" />
//                     <span>Gmail {authenticatedEmail ? '✓' : '✗'}</span>
//                   </span>
//                   <span className={`flex items-center space-x-1 ${odooConnection ? 'text-green-600' : 'text-gray-400'}`}>
//                     <Database className="w-3 h-3" />
//                     <span>Odoo {odooConnection ? '✓' : '✗'}</span>
//                   </span>
//                   {(authenticatedEmail || odooConnection) && (
//                     <button
//                       onClick={handleLogout}
//                       className="text-red-600 hover:text-red-700 underline"
//                     >
//                       Disconnect All
//                     </button>
//                   )}
//                   {onGmailSetup && (
//                     <button
//                       onClick={onGmailSetup}
//                       className="bg-purple-500 text-white px-3 py-1 rounded-lg hover:bg-purple-600"
//                     >
//                       Connect Services
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Scrollable Conversation Area */}
//           <div ref={conversationRef} className="flex-1 overflow-y-auto px-8 py-6">
//             <div className="max-w-4xl mx-auto space-y-6">
//               {conversations.map((message) => (
//                 <div key={message.id} className="space-y-4">
//                   {message.type === 'user' ? (
//                     <div className="flex justify-end">
//                       <div className="bg-purple-600 text-white rounded-2xl px-4 py-3 max-w-xl">
//                         <p className="text-sm">{message.content}</p>
//                         <div className="flex items-center space-x-2 mt-2 text-xs text-purple-200">
//                           {message.source === 'gmail' ? <Mail className="w-3 h-3" /> : <Database className="w-3 h-3" />}
//                           <span>{message.source}</span>
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="flex justify-start">
//                       <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-4xl w-full shadow-sm">
//                         {message.content.summary && (
//                           <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
//                             <h3 className="text-lg font-medium text-blue-900 mb-2">Summary</h3>
//                             <p className="text-blue-800 leading-relaxed">{message.content.summary}</p>
//                             <div className="mt-2 text-sm text-blue-600">
//                               Source: {message.content.source} • {message.content.results.length} results found
//                             </div>
//                           </div>
//                         )}
                        
//                         <h3 className="text-lg font-medium text-gray-900 mb-4">
//                           {message.content.results.length} Results Found
//                         </h3>
                        
//                         <div className="space-y-3">
//                           {message.content.results.map((result, index) => 
//                             renderResult(result, index, message.content.source)
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
              
//               {isLoading && (
//                 <div className="flex justify-start">
//                   <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-xl shadow-sm">
//                     <div className="flex items-center space-x-3">
//                       <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
//                       <span className="text-gray-600">Searching...</span>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Sticky Bottom Input */}
//           <div className="border-t border-gray-200 bg-white px-8 py-4 flex-shrink-0">
//             <div className="max-w-4xl mx-auto">
//               <div className="flex items-center space-x-4">
//                 <ToolsDropdown isCompact={true} />

//                 <div className="flex-1">
//                   <input
//                     type="text"
//                     placeholder={isConnected() ? `Ask about your ${selectedTool?.name} data...` : `Please authenticate ${selectedTool?.name} first...`}
//                     value={query}
//                     onChange={(e) => setQuery(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                     disabled={!isConnected() || isLoading}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:text-gray-500 disabled:bg-gray-100"
//                   />
//                 </div>

//                 <button 
//                   onClick={handleSubmit}
//                   disabled={!isConnected() || isLoading || !query.trim()}
//                   className="w-10 h-10 bg-purple-600 text-white rounded-xl hover:bg-purple-700 flex items-center justify-center transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
//                 >
//                   {isLoading ? (
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                   ) : (
//                     <Send className="w-4 h-4" />
//                   )}
//                 </button>
//               </div>

//               {error && (
//                 <div className="mt-3">
//                   <ErrorDisplay error={error} />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       ) : (
//         /* Initial Landing View - Centered Layout */
//         <div className="min-h-screen flex flex-col items-center justify-center px-8 py-16 overflow-auto">
          
//           <div className="text-center mb-12">
//             <h1 className="text-2xl font-medium text-gray-800 mb-2">Good Evening, Kunal</h1>
//             <p className="text-gray-500 text-base">Enter a Keyword to get anything from your data!</p>
            
//             {/* Connection Status */}
//             <div className="mt-4 space-y-2">
//               {/* Current Source Status */}
//               {isConnected() ? (
//                 <div className="flex items-center justify-center space-x-4">
//                   <p className="text-sm text-green-600">
//                     ✅ {selectedTool?.name} Connected: {getActiveConnection()}
//                   </p>
//                   <button
//                     onClick={handleLogout}
//                     className="text-xs text-red-600 hover:text-red-700 underline"
//                   >
//                     Disconnect All
//                   </button>
//                 </div>
//               ) : (
//                 <div className="flex items-center justify-center space-x-4">
//                   <p className="text-sm text-orange-600">
//                     ⚠️ Please authenticate your {selectedTool?.name} connection first
//                   </p>
//                   {onGmailSetup && (
//                     <button
//                       onClick={onGmailSetup}
//                       className="text-sm bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
//                     >
//                       Connect Services
//                     </button>
//                   )}
//                 </div>
//               )}

//               {/* All Connections Status */}
//               <div className="flex items-center justify-center space-x-6 text-xs">
//                 <span className={`flex items-center space-x-1 ${authenticatedEmail ? 'text-green-600' : 'text-gray-400'}`}>
//                   <Mail className="w-3 h-3" />
//                   <span>Gmail {authenticatedEmail ? '✓' : '✗'}</span>
//                 </span>
//                 <span className={`flex items-center space-x-1 ${odooConnection ? 'text-green-600' : 'text-gray-400'}`}>
//                   <Database className="w-3 h-3" />
//                   <span>Odoo {odooConnection ? '✓' : '✗'}</span>
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="w-full max-w-3xl">
//             <div className={`bg-white rounded-2xl border shadow-sm p-6 mb-12 transition-all duration-200 ${
//               isInputFocused 
//                 ? 'border-purple-300 shadow-lg ring-2 ring-purple-100' 
//                 : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
//             }`}>
//               <div className="flex items-center justify-between mb-6">
//                 <ToolsDropdown />
//                 <div className="flex items-center space-x-1 text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
//                   {selectedTool?.icon && <selectedTool.icon className="w-4 h-4" />}
//                   <span>{selectedTool?.name}</span>
//                   {isConnected() && <span className="w-2 h-2 bg-green-400 rounded-full ml-1"></span>}
//                 </div>
//               </div>

//               <div className="mb-6">
//                 <textarea
//                   placeholder={isConnected() ? `Search your ${selectedTool?.name} data...` : `Please authenticate ${selectedTool?.name} first...`}
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   onFocus={() => setIsInputFocused(true)}
//                   onBlur={() => setIsInputFocused(false)}
//                   onKeyPress={handleKeyPress}
//                   disabled={!isConnected() || isLoading}
//                   className="w-full h-10 text-base bg-transparent border-none resize-none focus:outline-none text-gray-800 placeholder-gray-400 disabled:text-gray-500"
//                 />
//               </div>

//               {error && <ErrorDisplay error={error} />}

//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-4">
//                   <button 
//                     type="button"
//                     className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 text-sm transition-colors"
//                     disabled={!isConnected()}
//                   >
//                     <Paperclip className="w-4 h-4" />
//                     <span>Add Attachment</span>
//                   </button>
//                   <button 
//                     type="button"
//                     className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 text-sm transition-colors"
//                     disabled={!isConnected()}
//                   >
//                     <Image className="w-4 h-4" />
//                     <span>Use Image</span>
//                   </button>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <span className="text-gray-400 text-sm">{query.length}/1000</span>
//                   <button 
//                     onClick={handleSubmit}
//                     disabled={!isConnected() || isLoading || !query.trim()}
//                     className={`w-8 h-8 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center transition-all disabled:bg-gray-400 disabled:cursor-not-allowed ${
//                       query.length > 0 && !isLoading ? 'scale-110 shadow-md' : ''
//                     }`}
//                   >
//                     {isLoading ? (
//                       <Loader2 className="w-4 h-4 animate-spin" />
//                     ) : (
//                       <Send className="w-4 h-4" />
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="w-full max-w-6xl">
//             <h2 className="text-xl font-medium text-gray-800 mb-6">Your recent chats</h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {recentChats.map((chat, index) => (
//                 <div
//                   key={index}
//                   className="bg-white rounded-xl border border-gray-200 p-6 hover:border-purple-300 hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:-translate-y-1"
//                   onClick={() => {
//                     if (isConnected()) {
//                       setQuery(chat.title);
//                     }
//                   }}
//                 >
//                   <div className="flex items-start space-x-3">
//                     <MessageCircle className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
//                     <div className="flex-1">
//                       <h3 className="text-gray-800 font-medium leading-snug mb-3">{chat.title}</h3>
//                       <p className="text-gray-500 text-sm">{chat.timeAgo}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HomePage;













// import React, { useState, useEffect, useRef } from 'react';
// import { Send, Mail, AlertCircle, CheckCircle2, Loader2, Paperclip, Image, MessageCircle, ShieldAlert, RefreshCw, ChevronDown, Database, Settings } from 'lucide-react';

// const HomePage = ({ onGmailSetup, onLogout }) => {
//   const [query, setQuery] = useState('');
//   const [isInputFocused, setIsInputFocused] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [conversations, setConversations] = useState([]);
//   const [error, setError] = useState('');
//   const [authenticatedEmail, setAuthenticatedEmail] = useState(null);
//   const [odooConnection, setOdooConnection] = useState(null);
//   const [selectedSource, setSelectedSource] = useState('gmail');
//   const [showToolsMenu, setShowToolsMenu] = useState(false);
//   const conversationRef = useRef(null);
  
//   useEffect(() => {
//     const getConnectionsFromStorage = () => {
//       const storedEmail = localStorage.getItem('authenticatedEmail');
//       setAuthenticatedEmail(storedEmail);
      
//       const storedOdoo = localStorage.getItem('odooConnection');
//       if (storedOdoo) {
//         try {
//           const odooDetails = JSON.parse(storedOdoo);
//           setOdooConnection(odooDetails);
//         } catch (error) {
//           console.error('Error parsing Odoo connection:', error);
//           localStorage.removeItem('odooConnection');
//         }
//       } else {
//         setOdooConnection(null);
//       }
      
//       console.log('HomePage loaded connections - Gmail:', storedEmail, 'Odoo:', storedOdoo);
//     };

//     getConnectionsFromStorage();

//     const handleStorageChange = (e) => {
//       if (e.key === 'authenticatedEmail' || e.key === 'odooConnection') {
//         getConnectionsFromStorage();
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);
//     const interval = setInterval(getConnectionsFromStorage, 1000);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       clearInterval(interval);
//     };
//   }, []);

//   // Auto-scroll to latest message
//   useEffect(() => {
//     if (conversationRef.current && conversations.length > 0) {
//       setTimeout(() => {
//         conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
//       }, 100);
//     }
//   }, [conversations]);

//   const handleLogout = () => {
//     localStorage.removeItem('authenticatedEmail');
//     localStorage.removeItem('odooConnection');
//     setAuthenticatedEmail(null);
//     setOdooConnection(null);
//     if (onLogout) {
//       onLogout();
//     }
//   };

//   const getActiveConnection = () => {
//     if (selectedSource === 'gmail') {
//       return authenticatedEmail;
//     } else if (selectedSource === 'odoo') {
//       return odooConnection?.username;
//     }
//     return null;
//   };

//   const isConnected = () => {
//     if (selectedSource === 'gmail') {
//       return !!authenticatedEmail;
//     } else if (selectedSource === 'odoo') {
//       return !!odooConnection;
//     }
//     return false;
//   };

//   const tools = [
//     {
//       id: 'gmail',
//       name: 'Gmail',
//       icon: Mail,
//       description: 'Search your Gmail emails',
//       connected: !!authenticatedEmail
//     },
//     {
//       id: 'odoo',
//       name: 'Odoo',
//       icon: Database,
//       description: 'Search your Odoo data',
//       connected: !!odooConnection
//     }
//   ];

//   const recentChats = [
//     {
//       title: "Show me all contacts living in Berlin",
//       timeAgo: "6 Hours"
//     },
//     {
//       title: "My last touch points with Lukas",
//       timeAgo: "12 Hours"
//     },
//     {
//       title: "Who in my network is an SaaS expert",
//       timeAgo: "18 Hours"
//     }
//   ];

//   const parseError = (errorMessage) => {
//     if (errorMessage.includes('401') || errorMessage.includes('No valid credentials')) {
//       return {
//         type: 'auth',
//         title: 'Authentication Required',
//         message: `Your ${selectedSource} connection has expired or is invalid. Please reconnect your ${selectedSource} account to continue searching.`,
//         action: `Reconnect ${selectedSource.charAt(0).toUpperCase() + selectedSource.slice(1)}`
//       };
//     }
    
//     if (errorMessage.includes('500') || errorMessage.includes('API Error')) {
//       return {
//         type: 'server',
//         title: 'Server Error',
//         message: 'Something went wrong on our end. Please try again in a moment.',
//         action: 'Try Again'
//       };
//     }
    
//     if (errorMessage.includes('NetworkError') || errorMessage.includes('fetch')) {
//       return {
//         type: 'network',
//         title: 'Connection Error',
//         message: 'Unable to connect to our servers. Please check your internet connection.',
//         action: 'Retry'
//       };
//     }
    
//     return {
//       type: 'general',
//       title: 'Something went wrong',
//       message: 'An unexpected error occurred. Please try again.',
//       action: 'Try Again'
//     };
//   };

//   const handleSubmit = async () => {
//     if (!query.trim()) {
//       setError('Please enter a query');
//       return;
//     }

//     const activeConnection = getActiveConnection();
//     if (!activeConnection) {
//       setError(`Please authenticate your ${selectedSource} connection first`);
//       return;
//     }

//     setIsLoading(true);
//     setError('');

//     const userMessage = {
//       id: Date.now(),
//       type: 'user',
//       content: query.trim(),
//       source: selectedSource,
//       timestamp: new Date()
//     };
    
//     const currentQuery = query.trim();
//     setQuery('');
//     setConversations(prev => [...prev, userMessage]);

//     try {
//       let payload = {
//         query: currentQuery,
//         max_results: 10,
//         source: selectedSource
//       };

//       if (selectedSource === 'gmail') {
//         payload.gmail_address = authenticatedEmail;
//       } else if (selectedSource === 'odoo') {
//         payload.gmail_address = odooConnection?.username;
//       }

//       console.log('Search payload:', payload);

//       const response = await fetch(`${import.meta.env.VITE_SEARCH_URL}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload)
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('API Response:', data);
        
//         const assistantMessage = {
//           id: Date.now() + 1,
//           type: 'assistant',
//           content: {
//             results: data.results || [],
//             summary: data.summary,
//             source: data.source || selectedSource
//           },
//           timestamp: new Date()
//         };
        
//         setConversations(prev => [...prev, assistantMessage]);
//       } else {
//         const errorData = await response.text();
//         throw new Error(`API Error: ${response.status} - ${errorData}`);
//       }
//     } catch (error) {
//       console.error('Search error:', error);
//       setError(`Failed to search: ${error.message}`);
//       setConversations(prev => prev.slice(0, -1));
//       setQuery(currentQuery);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit();
//     }
//   };

//   const formatDate = (timestamp) => {
//     try {
//       let date;
      
//       if (typeof timestamp === 'string' && timestamp.includes('-')) {
//         date = new Date(timestamp);
//       } else if (typeof timestamp === 'string' && timestamp.length > 10) {
//         date = new Date(parseInt(timestamp));
//       } else if (typeof timestamp === 'number') {
//         date = new Date(timestamp);
//       } else {
//         date = new Date(timestamp);
//       }

//       if (isNaN(date.getTime())) {
//         return timestamp;
//       }

//       return date.toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       });
//     } catch {
//       return timestamp;
//     }
//   };

//   const handleErrorAction = (errorInfo) => {
//     if (errorInfo.type === 'auth' && onGmailSetup) {
//       onGmailSetup();
//     } else {
//       setError('');
//     }
//   };

//   const selectTool = (toolId) => {
//     setSelectedSource(toolId);
//     setShowToolsMenu(false);
//     setError('');
//   };

//   const selectedTool = tools.find(tool => tool.id === selectedSource);

//   const renderResult = (result, index, source) => {
//     const isOdooResult = source === 'odoo';
    
//     let title, fromField, dateField, contentField, linkField, additionalInfo;
    
//     if (isOdooResult) {
//       title = result.display_name || result.partner_name || result.name || 'Untitled Record';
//       fromField = result.email_from || result.email_normalized || result.partner_name;
//       dateField = result.create_date || result.write_date || result.date_open;
//       contentField = result.description || 
//                    (result.expected_revenue ? `Expected Revenue: $${result.expected_revenue}` : '') ||
//                    (result.stage_id ? `Stage: ${Array.isArray(result.stage_id) ? result.stage_id[1] : result.stage_id}` : '');
//       linkField = result.website;
      
//       additionalInfo = [];
//       if (result.phone) additionalInfo.push(`Phone: ${result.phone}`);
//       if (result.expected_revenue) additionalInfo.push(`Revenue: $${result.expected_revenue}`);
//       if (result.probability) additionalInfo.push(`Probability: ${result.probability}%`);
//       if (result.stage_id && Array.isArray(result.stage_id)) additionalInfo.push(`Stage: ${result.stage_id[1]}`);
//       if (result.user_id && Array.isArray(result.user_id)) additionalInfo.push(`Assigned to: ${result.user_id[1]}`);
//       if (result.city) additionalInfo.push(`Location: ${result.city}`);
//     } else {
//       title = result.subject || 'No Subject';
//       fromField = result.from;
//       dateField = result.date;
//       contentField = result.snippet;
//       linkField = result.link;
//       additionalInfo = [];
//     }

//     return (
//       <div
//         key={result.id || index}
//         className="bg-white rounded-xl border border-gray-200 p-4 hover:border-purple-300 hover:shadow-md transition-all duration-200"
//       >
//         <div className="space-y-3">
//           <h3 className="text-base font-semibold text-gray-900 leading-tight">
//             {title}
//           </h3>
          
//           <div className="flex items-center justify-between text-sm text-gray-600 flex-wrap gap-2">
//             {fromField && (
//               <span className="flex items-center">
//                 <span className="font-medium">
//                   {isOdooResult ? 'Contact:' : 'From:'}
//                 </span>
//                 <span className="ml-1">{fromField}</span>
//               </span>
//             )}
//             {dateField && (
//               <span className="text-gray-500 text-xs">
//                 {formatDate(dateField)}
//               </span>
//             )}
//           </div>

//           {isOdooResult && additionalInfo.length > 0 && (
//             <div className="flex flex-wrap gap-1">
//               {additionalInfo.map((info, idx) => (
//                 <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
//                   {info}
//                 </span>
//               ))}
//             </div>
//           )}
          
//           {contentField && (
//             <p className="text-gray-700 leading-relaxed text-sm">
//               {contentField}
//             </p>
//           )}
          
//           {linkField && (
//             <div className="pt-2">
//               <a
//                 href={linkField}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center text-sm text-purple-600 hover:text-purple-700 hover:underline"
//               >
//                 {isOdooResult ? (
//                   <>
//                     <Database className="w-4 h-4 mr-1" />
//                     {linkField.includes('http') ? 'Visit Website' : 'Open in Odoo'}
//                   </>
//                 ) : (
//                   <>
//                     <Mail className="w-4 h-4 mr-1" />
//                     Open in Gmail
//                   </>
//                 )}
//               </a>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   const ErrorDisplay = ({ error }) => {
//     const errorInfo = parseError(error);
    
//     const getErrorIcon = (type) => {
//       switch (type) {
//         case 'auth':
//           return <ShieldAlert className="w-5 h-5" />;
//         case 'server':
//           return <AlertCircle className="w-5 h-5" />;
//         case 'network':
//           return <RefreshCw className="w-5 h-5" />;
//         default:
//           return <AlertCircle className="w-5 h-5" />;
//       }
//     };

//     const getErrorColors = (type) => {
//       switch (type) {
//         case 'auth':
//           return {
//             bg: 'bg-orange-50',
//             border: 'border-orange-200',
//             text: 'text-orange-800',
//             icon: 'text-orange-600',
//             button: 'bg-orange-600 hover:bg-orange-700'
//           };
//         case 'server':
//           return {
//             bg: 'bg-red-50',
//             border: 'border-red-200',
//             text: 'text-red-800',
//             icon: 'text-red-600',
//             button: 'bg-red-600 hover:bg-red-700'
//           };
//         case 'network':
//           return {
//             bg: 'bg-blue-50',
//             border: 'border-blue-200',
//             text: 'text-blue-800',
//             icon: 'text-blue-600',
//             button: 'bg-blue-600 hover:bg-blue-700'
//           };
//         default:
//           return {
//             bg: 'bg-gray-50',
//             border: 'border-gray-200',
//             text: 'text-gray-800',
//             icon: 'text-gray-600',
//             button: 'bg-gray-600 hover:bg-gray-700'
//           };
//       }
//     };

//     const colors = getErrorColors(errorInfo.type);

//     return (
//       <div className={`mb-4 p-4 ${colors.bg} ${colors.border} border rounded-xl`}>
//         <div className="flex items-start space-x-3">
//           <div className={`${colors.icon} flex-shrink-0 mt-0.5`}>
//             {getErrorIcon(errorInfo.type)}
//           </div>
//           <div className="flex-1 min-w-0">
//             <h4 className={`font-medium ${colors.text} mb-1`}>
//               {errorInfo.title}
//             </h4>
//             <p className={`text-sm ${colors.text} opacity-90 leading-relaxed`}>
//               {errorInfo.message}
//             </p>
//           </div>
//           <button
//             onClick={() => handleErrorAction(errorInfo)}
//             className={`flex-shrink-0 px-3 py-1.5 ${colors.button} text-white text-sm font-medium rounded-lg transition-colors`}
//           >
//             {errorInfo.action}
//           </button>
//         </div>
//       </div>
//     );
//   };

//   const hasConversations = conversations.length > 0;

//   // Tools Dropdown Component for reuse
//   const ToolsDropdown = ({ isCompact = false }) => (
//     <div className="relative">
//       <button
//         onClick={() => setShowToolsMenu(!showToolsMenu)}
//         className={`flex items-center space-x-2 ${
//           isCompact 
//             ? 'bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-lg text-gray-600' 
//             : 'bg-purple-100 hover:bg-purple-200 px-3 py-2 rounded-xl text-gray-700'
//         } transition-colors`}
//       >
//         {isCompact && selectedTool?.icon && <selectedTool.icon className="w-4 h-4" />}
//         {!isCompact && <Settings className="w-4 h-4" />}
//         {!isCompact && <span className="text-sm font-medium">Tools</span>}
//         <ChevronDown className={`${isCompact ? 'w-3 h-3' : 'w-4 h-4'} transition-transform ${showToolsMenu ? 'rotate-180' : ''}`} />
//       </button>

//       {showToolsMenu && (
//         <div className={`absolute ${isCompact ? 'bottom-full mb-2' : 'top-full mt-2'} left-0 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-10`}>
//           <div className="p-3">
//             <div className="mb-3">
//               <h4 className="text-sm font-medium text-gray-700 mb-2">Select Data Source</h4>
//             </div>
//             {tools.map((tool) => {
//               const Icon = tool.icon;
//               const isActive = selectedSource === tool.id;
//               const isConnected = tool.connected;
              
//               return (
//                 <button
//                   key={tool.id}
//                   onClick={() => selectTool(tool.id)}
//                   className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all mb-2 ${
//                     isActive 
//                       ? 'bg-purple-50 border-2 border-purple-200 shadow-sm' 
//                       : 'hover:bg-gray-50 border-2 border-transparent'
//                   }`}
//                 >
//                   <div className="relative">
//                     <Icon className={`w-6 h-6 ${isActive ? 'text-purple-600' : 'text-gray-500'}`} />
//                     {isConnected && (
//                       <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
//                     )}
//                   </div>
                  
//                   <div className="flex-1">
//                     <div className="flex items-center justify-between">
//                       <span className={`font-medium ${isActive ? 'text-purple-900' : 'text-gray-900'}`}>
//                         {tool.name}
//                       </span>
//                       <div className="flex items-center space-x-2">
//                         {isConnected ? (
//                           <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">
//                             Connected
//                           </span>
//                         ) : (
//                           <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full font-medium">
//                             Not Connected
//                           </span>
//                         )}
//                         {isActive && (
//                           <CheckCircle2 className="w-4 h-4 text-purple-600" />
//                         )}
//                       </div>
//                     </div>
//                     <p className="text-xs text-gray-500 mt-1">{tool.description}</p>
//                     {isConnected && (
//                       <p className="text-xs text-green-600 mt-1 font-medium">
//                         {tool.id === 'gmail' ? authenticatedEmail : odooConnection?.username}
//                       </p>
//                     )}
//                   </div>
//                 </button>
//               );
//             })}
            
//             {/* Connect Services Button */}
//             <div className="mt-3 pt-3 border-t border-gray-200">
//               {onGmailSetup && (
//                 <button
//                   onClick={() => {
//                     setShowToolsMenu(false);
//                     onGmailSetup();
//                   }}
//                   className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
//                 >
//                   Connect New Service
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <div className="flex-1 flex flex-col bg-gray-50">
//       {hasConversations ? (
//         /* Conversation View - After First Query */
//         <div className="h-screen flex flex-col">
//           {/* Header - Connection Status */}
//           <div className="border-b border-gray-200 bg-white px-8 py-4 flex-shrink-0">
//             <div className="max-w-4xl mx-auto">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h1 className="text-xl font-medium text-gray-800">Good Evening, Kunal</h1>
//                   <p className="text-sm text-gray-500">Enter a keyword to get anything from your data!</p>
//                 </div>
                
//                 <div className="flex items-center space-x-4 text-xs">
//                   <span className={`flex items-center space-x-1 ${authenticatedEmail ? 'text-green-600' : 'text-gray-400'}`}>
//                     <Mail className="w-3 h-3" />
//                     <span>Gmail {authenticatedEmail ? '✓' : '✗'}</span>
//                   </span>
//                   <span className={`flex items-center space-x-1 ${odooConnection ? 'text-green-600' : 'text-gray-400'}`}>
//                     <Database className="w-3 h-3" />
//                     <span>Odoo {odooConnection ? '✓' : '✗'}</span>
//                   </span>
//                   {(authenticatedEmail || odooConnection) && (
//                     <button
//                       onClick={handleLogout}
//                       className="text-red-600 hover:text-red-700 underline"
//                     >
//                       Disconnect All
//                     </button>
//                   )}
//                   {onGmailSetup && (
//                     <button
//                       onClick={onGmailSetup}
//                       className="bg-purple-500 text-white px-3 py-1 rounded-lg hover:bg-purple-600"
//                     >
//                       Connect Services
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Scrollable Conversation Area */}
//           <div ref={conversationRef} className="flex-1 overflow-y-auto px-8 py-6">
//             <div className="max-w-4xl mx-auto space-y-6">
//               {conversations.map((message) => (
//                 <div key={message.id} className="space-y-4">
//                   {message.type === 'user' ? (
//                     <div className="flex justify-end">
//                       <div className="bg-purple-600 text-white rounded-2xl px-4 py-3 max-w-xl">
//                         <p className="text-sm">{message.content}</p>
//                         <div className="flex items-center space-x-2 mt-2 text-xs text-purple-200">
//                           {message.source === 'gmail' ? <Mail className="w-3 h-3" /> : <Database className="w-3 h-3" />}
//                           <span>{message.source}</span>
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="flex justify-start">
//                       <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-4xl w-full shadow-sm">
//                         {message.content.summary && (
//                           <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
//                             <h3 className="text-lg font-medium text-blue-900 mb-2">Summary</h3>
//                             <p className="text-blue-800 leading-relaxed">{message.content.summary}</p>
//                             <div className="mt-2 text-sm text-blue-600">
//                               Source: {message.content.source} • {message.content.results.length} results found
//                             </div>
//                           </div>
//                         )}
                        
//                         <h3 className="text-lg font-medium text-gray-900 mb-4">
//                           {message.content.results.length} Results Found
//                         </h3>
                        
//                         <div className="space-y-3">
//                           {message.content.results.map((result, index) => 
//                             renderResult(result, index, message.content.source)
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
              
//               {isLoading && (
//                 <div className="flex justify-start">
//                   <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-xl shadow-sm">
//                     <div className="flex items-center space-x-3">
//                       <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
//                       <span className="text-gray-600">Searching...</span>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Sticky Bottom Input */}
//           <div className="border-t border-gray-200 bg-white px-8 py-4 flex-shrink-0">
//             <div className="max-w-4xl mx-auto">
//               <div className="flex items-center space-x-4">
              
//                 <ToolsDropdown isCompact={true} />

//                 <div className="flex-1">
//                   <input
//                     type="text"
//                     placeholder={isConnected() ? `Ask about your ${selectedTool?.name} data...` : `Please authenticate ${selectedTool?.name} first...`}
//                     value={query}
//                     onChange={(e) => setQuery(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                     disabled={!isConnected() || isLoading}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:text-gray-500 disabled:bg-gray-100"
//                   />
//                 </div>

//                 <button 
//                   onClick={handleSubmit}
//                   disabled={!isConnected() || isLoading || !query.trim()}
//                   className="w-10 h-10 bg-purple-600 text-white rounded-xl hover:bg-purple-700 flex items-center justify-center transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
//                 >
//                   {isLoading ? (
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                   ) : (
//                     <Send className="w-4 h-4" />
//                   )}
//                 </button>
//               </div>

//               {error && (
//                 <div className="mt-3">
//                   <ErrorDisplay error={error} />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       ) : (
//         /* Initial Landing View - Centered Layout */
//         <div className="min-h-screen flex flex-col items-center justify-center px-8 py-16 overflow-auto">
          
//           <div className="text-center mb-12">
//             <h1 className="text-2xl font-medium text-gray-800 mb-2">Good Evening, Kunal</h1>
//             <p className="text-gray-500 text-base">Enter a Keyword to get anything from your data!</p>
            
//             {/* Connection Status */}
//             <div className="mt-4 space-y-2">
//               {/* Current Source Status */}
//               {isConnected() ? (
//                 <div className="flex items-center justify-center space-x-4">
//                   <p className="text-sm text-green-600">
//                     ✅ {selectedTool?.name} Connected: {getActiveConnection()}
//                   </p>
//                   <button
//                     onClick={handleLogout}
//                     className="text-xs text-red-600 hover:text-red-700 underline"
//                   >
//                     Disconnect All
//                   </button>
//                 </div>
//               ) : (
//                 <div className="flex items-center justify-center space-x-4">
//                   <p className="text-sm text-orange-600">
//                     ⚠️ Please authenticate your {selectedTool?.name} connection first
//                   </p>
//                   {onGmailSetup && (
//                     <button
//                       onClick={onGmailSetup}
//                       className="text-sm bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
//                     >
//                       Connect Services
//                     </button>
//                   )}
//                 </div>
//               )}

//               {/* All Connections Status */}
//               <div className="flex items-center justify-center space-x-6 text-xs">
//                 <span className={`flex items-center space-x-1 ${authenticatedEmail ? 'text-green-600' : 'text-gray-400'}`}>
//                   <Mail className="w-3 h-3" />
//                   <span>Gmail {authenticatedEmail ? '✓' : '✗'}</span>
//                 </span>
//                 <span className={`flex items-center space-x-1 ${odooConnection ? 'text-green-600' : 'text-gray-400'}`}>
//                   <Database className="w-3 h-3" />
//                   <span>Odoo {odooConnection ? '✓' : '✗'}</span>
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="w-full max-w-3xl">
//             <div className={`bg-white rounded-2xl border shadow-sm p-6 mb-12 transition-all duration-200 ${
//               isInputFocused 
//                 ? 'border-purple-300 shadow-lg ring-2 ring-purple-100' 
//                 : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
//             }`}>
//               <div className="flex items-center justify-between mb-6">
//                 <ToolsDropdown />
//                 <div className="flex items-center space-x-1 text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
//                   {selectedTool?.icon && <selectedTool.icon className="w-4 h-4" />}
//                   <span>{selectedTool?.name}</span>
//                   {isConnected() && <span className="w-2 h-2 bg-green-400 rounded-full ml-1"></span>}
//                 </div>
//               </div>

//               <div className="mb-6">
//                 <textarea
//                   placeholder={isConnected() ? `Search your ${selectedTool?.name} data...` : `Please authenticate ${selectedTool?.name} first...`}
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   onFocus={() => setIsInputFocused(true)}
//                   onBlur={() => setIsInputFocused(false)}
//                   onKeyPress={handleKeyPress}
//                   disabled={!isConnected() || isLoading}
//                   className="w-full h-10 text-base bg-transparent border-none resize-none focus:outline-none text-gray-800 placeholder-gray-400 disabled:text-gray-500"
//                 />
//               </div>

//               {error && <ErrorDisplay error={error} />}

//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-4">
//                   <button 
//                     type="button"
//                     className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 text-sm transition-colors"
//                     disabled={!isConnected()}
//                   >
//                     <Paperclip className="w-4 h-4" />
//                     <span>Add Attachment</span>
//                   </button>
//                   <button 
//                     type="button"
//                     className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 text-sm transition-colors"
//                     disabled={!isConnected()}
//                   >
//                     <Image className="w-4 h-4" />
//                     <span>Use Image</span>
//                   </button>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <span className="text-gray-400 text-sm">{query.length}/1000</span>
//                   <button 
//                     onClick={handleSubmit}
//                     disabled={!isConnected() || isLoading || !query.trim()}
//                     className={`w-8 h-8 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center transition-all disabled:bg-gray-400 disabled:cursor-not-allowed ${
//                       query.length > 0 && !isLoading ? 'scale-110 shadow-md' : ''
//                     }`}
//                   >
//                     {isLoading ? (
//                       <Loader2 className="w-4 h-4 animate-spin" />
//                     ) : (
//                       <Send className="w-4 h-4" />
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="w-full max-w-6xl">
//             <h2 className="text-xl font-medium text-gray-800 mb-6">Your recent chats</h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {recentChats.map((chat, index) => (
//                 <div
//                   key={index}
//                   className="bg-white rounded-xl border border-gray-200 p-6 hover:border-purple-300 hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:-translate-y-1"
//                   onClick={() => {
//                     if (isConnected()) {
//                       setQuery(chat.title);
//                     }
//                   }}
//                 >
//                   <div className="flex items-start space-x-3">
//                     <MessageCircle className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
//                     <div className="flex-1">
//                       <h3 className="text-gray-800 font-medium leading-snug mb-3">{chat.title}</h3>
//                       <p className="text-gray-500 text-sm">{chat.timeAgo}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HomePage;










// import React, { useState, useEffect, useRef } from 'react';
// import { Send, Mail, AlertCircle, CheckCircle2, Loader2, Paperclip, Image, MessageCircle, ShieldAlert, RefreshCw, ChevronDown, Database, Settings } from 'lucide-react';

// const HomePage = ({ onGmailSetup, onLogout }) => {
//   const [query, setQuery] = useState('');
//   const [isInputFocused, setIsInputFocused] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [conversations, setConversations] = useState([]);
//   const [error, setError] = useState('');
//   const [authenticatedEmail, setAuthenticatedEmail] = useState(null);
//   const [odooConnection, setOdooConnection] = useState(null);
//   const [selectedSource, setSelectedSource] = useState('gmail');
//   const [showToolsMenu, setShowToolsMenu] = useState(false);
//   const conversationRef = useRef(null);
  
//   useEffect(() => {
//     const getConnectionsFromStorage = () => {
//       const storedEmail = localStorage.getItem('authenticatedEmail');
//       setAuthenticatedEmail(storedEmail);
      
//       const storedOdoo = localStorage.getItem('odooConnection');
//       if (storedOdoo) {
//         try {
//           const odooDetails = JSON.parse(storedOdoo);
//           setOdooConnection(odooDetails);
//         } catch (error) {
//           console.error('Error parsing Odoo connection:', error);
//           localStorage.removeItem('odooConnection');
//         }
//       } else {
//         setOdooConnection(null);
//       }
      
//       console.log('HomePage loaded connections - Gmail:', storedEmail, 'Odoo:', storedOdoo);
//     };

//     getConnectionsFromStorage();

//     const handleStorageChange = (e) => {
//       if (e.key === 'authenticatedEmail' || e.key === 'odooConnection') {
//         getConnectionsFromStorage();
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);
//     const interval = setInterval(getConnectionsFromStorage, 1000);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       clearInterval(interval);
//     };
//   }, []);

//   // Auto-scroll to latest message
//   useEffect(() => {
//     if (conversationRef.current && conversations.length > 0) {
//       setTimeout(() => {
//         conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
//       }, 100);
//     }
//   }, [conversations]);

//   const handleLogout = () => {
//     localStorage.removeItem('authenticatedEmail');
//     localStorage.removeItem('odooConnection');
//     setAuthenticatedEmail(null);
//     setOdooConnection(null);
//     if (onLogout) {
//       onLogout();
//     }
//   };

//   const getActiveConnection = () => {
//     if (selectedSource === 'gmail') {
//       return authenticatedEmail;
//     } else if (selectedSource === 'odoo') {
//       return odooConnection?.username;
//     }
//     return null;
//   };

//   const isConnected = () => {
//     if (selectedSource === 'gmail') {
//       return !!authenticatedEmail;
//     } else if (selectedSource === 'odoo') {
//       return !!odooConnection;
//     }
//     return false;
//   };

//   const tools = [
//     {
//       id: 'gmail',
//       name: 'Gmail',
//       icon: Mail,
//       description: 'Search your Gmail emails',
//       connected: !!authenticatedEmail
//     },
//     {
//       id: 'odoo',
//       name: 'Odoo',
//       icon: Database,
//       description: 'Search your Odoo data',
//       connected: !!odooConnection
//     }
//   ];

//   const recentChats = [
//     {
//       title: "Show me all contacts living in Berlin",
//       timeAgo: "6 Hours"
//     },
//     {
//       title: "My last touch points with Lukas",
//       timeAgo: "12 Hours"
//     },
//     {
//       title: "Who in my network is an SaaS expert",
//       timeAgo: "18 Hours"
//     }
//   ];

//   const parseError = (errorMessage) => {
//     if (errorMessage.includes('401') || errorMessage.includes('No valid credentials')) {
//       return {
//         type: 'auth',
//         title: 'Authentication Required',
//         message: `Your ${selectedSource} connection has expired or is invalid. Please reconnect your ${selectedSource} account to continue searching.`,
//         action: `Reconnect ${selectedSource.charAt(0).toUpperCase() + selectedSource.slice(1)}`
//       };
//     }
    
//     if (errorMessage.includes('500') || errorMessage.includes('API Error')) {
//       return {
//         type: 'server',
//         title: 'Server Error',
//         message: 'Something went wrong on our end. Please try again in a moment.',
//         action: 'Try Again'
//       };
//     }
    
//     if (errorMessage.includes('NetworkError') || errorMessage.includes('fetch')) {
//       return {
//         type: 'network',
//         title: 'Connection Error',
//         message: 'Unable to connect to our servers. Please check your internet connection.',
//         action: 'Retry'
//       };
//     }
    
//     return {
//       type: 'general',
//       title: 'Something went wrong',
//       message: 'An unexpected error occurred. Please try again.',
//       action: 'Try Again'
//     };
//   };

//   const handleSubmit = async () => {
//     if (!query.trim()) {
//       setError('Please enter a query');
//       return;
//     }

//     const activeConnection = getActiveConnection();
//     if (!activeConnection) {
//       setError(`Please authenticate your ${selectedSource} connection first`);
//       return;
//     }

//     setIsLoading(true);
//     setError('');

//     const userMessage = {
//       id: Date.now(),
//       type: 'user',
//       content: query.trim(),
//       source: selectedSource,
//       timestamp: new Date()
//     };
    
//     const currentQuery = query.trim();
//     setQuery('');
//     setConversations(prev => [...prev, userMessage]);

//     try {
//       let payload = {
//         query: currentQuery,
//         max_results: 10,
//         source: selectedSource
//       };

//       if (selectedSource === 'gmail') {
//         payload.gmail_address = authenticatedEmail;
//       } else if (selectedSource === 'odoo') {
//         payload.gmail_address = odooConnection?.username;
//       }

//       console.log('Search payload:', payload);

//       const response = await fetch(`${import.meta.env.VITE_SEARCH_URL}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload)
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('API Response:', data);
        
//         const assistantMessage = {
//           id: Date.now() + 1,
//           type: 'assistant',
//           content: {
//             results: data.results || [],
//             summary: data.summary,
//             source: data.source || selectedSource
//           },
//           timestamp: new Date()
//         };
        
//         setConversations(prev => [...prev, assistantMessage]);
//       } else {
//         const errorData = await response.text();
//         throw new Error(`API Error: ${response.status} - ${errorData}`);
//       }
//     } catch (error) {
//       console.error('Search error:', error);
//       setError(`Failed to search: ${error.message}`);
//       setConversations(prev => prev.slice(0, -1));
//       setQuery(currentQuery);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit();
//     }
//   };

//   const formatDate = (timestamp) => {
//     try {
//       let date;
      
//       if (typeof timestamp === 'string' && timestamp.includes('-')) {
//         date = new Date(timestamp);
//       } else if (typeof timestamp === 'string' && timestamp.length > 10) {
//         date = new Date(parseInt(timestamp));
//       } else if (typeof timestamp === 'number') {
//         date = new Date(timestamp);
//       } else {
//         date = new Date(timestamp);
//       }

//       if (isNaN(date.getTime())) {
//         return timestamp;
//       }

//       return date.toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       });
//     } catch {
//       return timestamp;
//     }
//   };

//   const handleErrorAction = (errorInfo) => {
//     if (errorInfo.type === 'auth' && onGmailSetup) {
//       onGmailSetup();
//     } else {
//       setError('');
//     }
//   };

//   const selectTool = (toolId) => {
//     setSelectedSource(toolId);
//     setShowToolsMenu(false);
//     setError('');
//   };

//   const selectedTool = tools.find(tool => tool.id === selectedSource);

//   const renderResult = (result, index, source) => {
//     const isOdooResult = source === 'odoo';
    
//     let title, fromField, dateField, contentField, linkField, additionalInfo;
    
//     if (isOdooResult) {
//       title = result.display_name || result.partner_name || result.name || 'Untitled Record';
//       fromField = result.email_from || result.email_normalized || result.partner_name;
//       dateField = result.create_date || result.write_date || result.date_open;
//       contentField = result.description || 
//                    (result.expected_revenue ? `Expected Revenue: $${result.expected_revenue}` : '') ||
//                    (result.stage_id ? `Stage: ${Array.isArray(result.stage_id) ? result.stage_id[1] : result.stage_id}` : '');
//       linkField = result.website;
      
//       additionalInfo = [];
//       if (result.phone) additionalInfo.push(`Phone: ${result.phone}`);
//       if (result.expected_revenue) additionalInfo.push(`Revenue: $${result.expected_revenue}`);
//       if (result.probability) additionalInfo.push(`Probability: ${result.probability}%`);
//       if (result.stage_id && Array.isArray(result.stage_id)) additionalInfo.push(`Stage: ${result.stage_id[1]}`);
//       if (result.user_id && Array.isArray(result.user_id)) additionalInfo.push(`Assigned to: ${result.user_id[1]}`);
//       if (result.city) additionalInfo.push(`Location: ${result.city}`);
//     } else {
//       title = result.subject || 'No Subject';
//       fromField = result.from;
//       dateField = result.date;
//       contentField = result.snippet;
//       linkField = result.link;
//       additionalInfo = [];
//     }

//     return (
//       <div
//         key={result.id || index}
//         className="bg-white rounded-xl border border-gray-200 p-4 hover:border-purple-300 hover:shadow-md transition-all duration-200"
//       >
//         <div className="space-y-3">
//           <h3 className="text-base font-semibold text-gray-900 leading-tight">
//             {title}
//           </h3>
          
//           <div className="flex items-center justify-between text-sm text-gray-600 flex-wrap gap-2">
//             {fromField && (
//               <span className="flex items-center">
//                 <span className="font-medium">
//                   {isOdooResult ? 'Contact:' : 'From:'}
//                 </span>
//                 <span className="ml-1">{fromField}</span>
//               </span>
//             )}
//             {dateField && (
//               <span className="text-gray-500 text-xs">
//                 {formatDate(dateField)}
//               </span>
//             )}
//           </div>

//           {isOdooResult && additionalInfo.length > 0 && (
//             <div className="flex flex-wrap gap-1">
//               {additionalInfo.map((info, idx) => (
//                 <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
//                   {info}
//                 </span>
//               ))}
//             </div>
//           )}
          
//           {contentField && (
//             <p className="text-gray-700 leading-relaxed text-sm">
//               {contentField}
//             </p>
//           )}
          
//           {linkField && (
//             <div className="pt-2">
//               <a
//                 href={linkField}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center text-sm text-purple-600 hover:text-purple-700 hover:underline"
//               >
//                 {isOdooResult ? (
//                   <>
//                     <Database className="w-4 h-4 mr-1" />
//                     {linkField.includes('http') ? 'Visit Website' : 'Open in Odoo'}
//                   </>
//                 ) : (
//                   <>
//                     <Mail className="w-4 h-4 mr-1" />
//                     Open in Gmail
//                   </>
//                 )}
//               </a>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   const ErrorDisplay = ({ error }) => {
//     const errorInfo = parseError(error);
    
//     const getErrorIcon = (type) => {
//       switch (type) {
//         case 'auth':
//           return <ShieldAlert className="w-5 h-5" />;
//         case 'server':
//           return <AlertCircle className="w-5 h-5" />;
//         case 'network':
//           return <RefreshCw className="w-5 h-5" />;
//         default:
//           return <AlertCircle className="w-5 h-5" />;
//       }
//     };

//     const getErrorColors = (type) => {
//       switch (type) {
//         case 'auth':
//           return {
//             bg: 'bg-orange-50',
//             border: 'border-orange-200',
//             text: 'text-orange-800',
//             icon: 'text-orange-600',
//             button: 'bg-orange-600 hover:bg-orange-700'
//           };
//         case 'server':
//           return {
//             bg: 'bg-red-50',
//             border: 'border-red-200',
//             text: 'text-red-800',
//             icon: 'text-red-600',
//             button: 'bg-red-600 hover:bg-red-700'
//           };
//         case 'network':
//           return {
//             bg: 'bg-blue-50',
//             border: 'border-blue-200',
//             text: 'text-blue-800',
//             icon: 'text-blue-600',
//             button: 'bg-blue-600 hover:bg-blue-700'
//           };
//         default:
//           return {
//             bg: 'bg-gray-50',
//             border: 'border-gray-200',
//             text: 'text-gray-800',
//             icon: 'text-gray-600',
//             button: 'bg-gray-600 hover:bg-gray-700'
//           };
//       }
//     };

//     const colors = getErrorColors(errorInfo.type);

//     return (
//       <div className={`mb-4 p-4 ${colors.bg} ${colors.border} border rounded-xl`}>
//         <div className="flex items-start space-x-3">
//           <div className={`${colors.icon} flex-shrink-0 mt-0.5`}>
//             {getErrorIcon(errorInfo.type)}
//           </div>
//           <div className="flex-1 min-w-0">
//             <h4 className={`font-medium ${colors.text} mb-1`}>
//               {errorInfo.title}
//             </h4>
//             <p className={`text-sm ${colors.text} opacity-90 leading-relaxed`}>
//               {errorInfo.message}
//             </p>
//           </div>
//           <button
//             onClick={() => handleErrorAction(errorInfo)}
//             className={`flex-shrink-0 px-3 py-1.5 ${colors.button} text-white text-sm font-medium rounded-lg transition-colors`}
//           >
//             {errorInfo.action}
//           </button>
//         </div>
//       </div>
//     );
//   };

//   const hasConversations = conversations.length > 0;

//   // Tools Dropdown Component for reuse
//   const ToolsDropdown = ({ isCompact = false }) => (
//     <div className="relative">
//       <button
//         onClick={() => setShowToolsMenu(!showToolsMenu)}
//         className={`flex items-center space-x-2 ${
//           isCompact 
//             ? 'bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-gray-600' 
//             : 'bg-purple-100 hover:bg-purple-200 px-3 py-2 rounded-xl text-gray-700'
//         } transition-colors`}
//       >
//         {isCompact ? (
//           <>
//             <Settings className="w-4 h-4" />
//             <span className="text-sm font-medium">Tools</span>
//           </>
//         ) : (
//           <>
//             <Settings className="w-4 h-4" />
//             <span className="text-sm font-medium">Tools</span>
//           </>
//         )}
//         <ChevronDown className={`w-4 h-4 transition-transform ${showToolsMenu ? 'rotate-180' : ''}`} />
//       </button>

//       {showToolsMenu && (
//         <div className={`absolute ${isCompact ? 'bottom-full mb-2' : 'top-full mt-2'} left-0 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-10`}>
//           <div className="p-3">
//             <div className="mb-3">
//               <h4 className="text-sm font-medium text-gray-700 mb-2">Select Data Source</h4>
//             </div>
//             {tools.map((tool) => {
//               const Icon = tool.icon;
//               const isActive = selectedSource === tool.id;
//               const isConnected = tool.connected;
              
//               return (
//                 <button
//                   key={tool.id}
//                   onClick={() => selectTool(tool.id)}
//                   className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all mb-2 ${
//                     isActive 
//                       ? 'bg-purple-50 border-2 border-purple-200 shadow-sm' 
//                       : 'hover:bg-gray-50 border-2 border-transparent'
//                   }`}
//                 >
//                   <div className="relative">
//                     <Icon className={`w-6 h-6 ${isActive ? 'text-purple-600' : 'text-gray-500'}`} />
//                     {isConnected && (
//                       <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
//                     )}
//                   </div>
                  
//                   <div className="flex-1">
//                     <div className="flex items-center justify-between">
//                       <span className={`font-medium ${isActive ? 'text-purple-900' : 'text-gray-900'}`}>
//                         {tool.name}
//                       </span>
//                       <div className="flex items-center space-x-2">
//                         {isConnected ? (
//                           <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">
//                             Connected
//                           </span>
//                         ) : (
//                           <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full font-medium">
//                             Not Connected
//                           </span>
//                         )}
//                         {isActive && (
//                           <CheckCircle2 className="w-4 h-4 text-purple-600" />
//                         )}
//                       </div>
//                     </div>
//                     <p className="text-xs text-gray-500 mt-1">{tool.description}</p>
//                     {isConnected && (
//                       <p className="text-xs text-green-600 mt-1 font-medium">
//                         {tool.id === 'gmail' ? authenticatedEmail : odooConnection?.username}
//                       </p>
//                     )}
//                   </div>
//                 </button>
//               );
//             })}
            
//             {/* Connect Services Button */}
//             <div className="mt-3 pt-3 border-t border-gray-200">
//               {onGmailSetup && (
//                 <button
//                   onClick={() => {
//                     setShowToolsMenu(false);
//                     onGmailSetup();
//                   }}
//                   className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
//                 >
//                   Connect New Service
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <div className="flex-1 flex flex-col bg-gray-50">
//       {hasConversations ? (
//         /* Conversation View - After First Query */
//         <div className="h-screen flex flex-col">
//           {/* Header - Connection Status */}
//           <div className="border-b border-gray-200 bg-white px-8 py-4 flex-shrink-0">
//             <div className="max-w-4xl mx-auto">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h1 className="text-xl font-medium text-gray-800">Good Evening, Kunal</h1>
//                   <p className="text-sm text-gray-500">Enter a keyword to get anything from your data!</p>
//                 </div>
                
//                 <div className="flex items-center space-x-4 text-xs">
//                   <span className={`flex items-center space-x-1 ${authenticatedEmail ? 'text-green-600' : 'text-gray-400'}`}>
//                     <Mail className="w-3 h-3" />
//                     <span>Gmail {authenticatedEmail ? '✓' : '✗'}</span>
//                   </span>
//                   <span className={`flex items-center space-x-1 ${odooConnection ? 'text-green-600' : 'text-gray-400'}`}>
//                     <Database className="w-3 h-3" />
//                     <span>Odoo {odooConnection ? '✓' : '✗'}</span>
//                   </span>
//                   {(authenticatedEmail || odooConnection) && (
//                     <button
//                       onClick={handleLogout}
//                       className="text-red-600 hover:text-red-700 underline"
//                     >
//                       Disconnect All
//                     </button>
//                   )}
//                   {onGmailSetup && (
//                     <button
//                       onClick={onGmailSetup}
//                       className="bg-purple-500 text-white px-3 py-1 rounded-lg hover:bg-purple-600"
//                     >
//                       Connect Services
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Scrollable Conversation Area */}
//           <div ref={conversationRef} className="flex-1 overflow-y-auto px-8 py-6">
//             <div className="max-w-4xl mx-auto space-y-6">
//               {conversations.map((message) => (
//                 <div key={message.id} className="space-y-4">
//                   {message.type === 'user' ? (
//                     <div className="flex justify-end">
//                       <div className="bg-purple-600 text-white rounded-2xl px-4 py-3 max-w-xl">
//                         <p className="text-sm">{message.content}</p>
//                         <div className="flex items-center space-x-2 mt-2 text-xs text-purple-200">
//                           {message.source === 'gmail' ? <Mail className="w-3 h-3" /> : <Database className="w-3 h-3" />}
//                           <span>{message.source}</span>
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="flex justify-start">
//                       <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-4xl w-full shadow-sm">
//                         {message.content.summary && (
//                           <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
//                             <h3 className="text-lg font-medium text-blue-900 mb-2">Summary</h3>
//                             <p className="text-blue-800 leading-relaxed">{message.content.summary}</p>
//                             <div className="mt-2 text-sm text-blue-600">
//                               Source: {message.content.source} • {message.content.results.length} results found
//                             </div>
//                           </div>
//                         )}
                        
//                         <h3 className="text-lg font-medium text-gray-900 mb-4">
//                           {message.content.results.length} Results Found
//                         </h3>
                        
//                         <div className="space-y-3">
//                           {message.content.results.map((result, index) => 
//                             renderResult(result, index, message.content.source)
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
              
//               {isLoading && (
//                 <div className="flex justify-start">
//                   <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-xl shadow-sm">
//                     <div className="flex items-center space-x-3">
//                       <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
//                       <span className="text-gray-600">Searching...</span>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Sticky Bottom Input */}
//           <div className="border-t border-gray-200 bg-white px-8 py-4 flex-shrink-0">
//             <div className="max-w-4xl mx-auto">
//               <div className="flex items-center space-x-4">
//                 <ToolsDropdown isCompact={true} />

//                 <div className="flex-1">
//                   <input
//                     type="text"
//                     placeholder={isConnected() ? `Ask about your ${selectedTool?.name} data...` : `Please authenticate ${selectedTool?.name} first...`}
//                     value={query}
//                     onChange={(e) => setQuery(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                     disabled={!isConnected() || isLoading}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:text-gray-500 disabled:bg-gray-100"
//                   />
//                 </div>

//                 <button 
//                   onClick={handleSubmit}
//                   disabled={!isConnected() || isLoading || !query.trim()}
//                   className="w-10 h-10 bg-purple-600 text-white rounded-xl hover:bg-purple-700 flex items-center justify-center transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
//                 >
//                   {isLoading ? (
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                   ) : (
//                     <Send className="w-4 h-4" />
//                   )}
//                 </button>
//               </div>

//               {error && (
//                 <div className="mt-3">
//                   <ErrorDisplay error={error} />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       ) : (
//         /* Initial Landing View - Centered Layout */
//         <div className="min-h-screen flex flex-col items-center justify-center px-8 py-16 overflow-auto">
          
//           <div className="text-center mb-12">
//             <h1 className="text-2xl font-medium text-gray-800 mb-2">Good Evening, Kunal</h1>
//             <p className="text-gray-500 text-base">Enter a Keyword to get anything from your data!</p>
            
//             {/* Connection Status */}
//             <div className="mt-4 space-y-2">
//               {/* Current Source Status */}
//               {isConnected() ? (
//                 <div className="flex items-center justify-center space-x-4">
//                   <p className="text-sm text-green-600">
//                     ✅ {selectedTool?.name} Connected: {getActiveConnection()}
//                   </p>
//                   <button
//                     onClick={handleLogout}
//                     className="text-xs text-red-600 hover:text-red-700 underline"
//                   >
//                     Disconnect All
//                   </button>
//                 </div>
//               ) : (
//                 <div className="flex items-center justify-center space-x-4">
//                   <p className="text-sm text-orange-600">
//                     ⚠️ Please authenticate your {selectedTool?.name} connection first
//                   </p>
//                   {onGmailSetup && (
//                     <button
//                       onClick={onGmailSetup}
//                       className="text-sm bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
//                     >
//                       Connect Services
//                     </button>
//                   )}
//                 </div>
//               )}

//               {/* All Connections Status */}
//               <div className="flex items-center justify-center space-x-6 text-xs">
//                 <span className={`flex items-center space-x-1 ${authenticatedEmail ? 'text-green-600' : 'text-gray-400'}`}>
//                   <Mail className="w-3 h-3" />
//                   <span>Gmail {authenticatedEmail ? '✓' : '✗'}</span>
//                 </span>
//                 <span className={`flex items-center space-x-1 ${odooConnection ? 'text-green-600' : 'text-gray-400'}`}>
//                   <Database className="w-3 h-3" />
//                   <span>Odoo {odooConnection ? '✓' : '✗'}</span>
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="w-full max-w-3xl">
//             <div className={`bg-white rounded-2xl border shadow-sm p-6 mb-12 transition-all duration-200 ${
//               isInputFocused 
//                 ? 'border-purple-300 shadow-lg ring-2 ring-purple-100' 
//                 : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
//             }`}>
//               <div className="flex items-center justify-between mb-6">
//                 <ToolsDropdown />
//                 <div className="flex items-center space-x-1 text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
//                   {selectedTool?.icon && <selectedTool.icon className="w-4 h-4" />}
//                   <span>{selectedTool?.name}</span>
//                   {isConnected() && <span className="w-2 h-2 bg-green-400 rounded-full ml-1"></span>}
//                 </div>
//               </div>

//               <div className="mb-6">
//                 <textarea
//                   placeholder={isConnected() ? `Search your ${selectedTool?.name} data...` : `Please authenticate ${selectedTool?.name} first...`}
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   onFocus={() => setIsInputFocused(true)}
//                   onBlur={() => setIsInputFocused(false)}
//                   onKeyPress={handleKeyPress}
//                   disabled={!isConnected() || isLoading}
//                   className="w-full h-10 text-base bg-transparent border-none resize-none focus:outline-none text-gray-800 placeholder-gray-400 disabled:text-gray-500"
//                 />
//               </div>

//               {error && <ErrorDisplay error={error} />}

//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-4">
//                   <button 
//                     type="button"
//                     className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 text-sm transition-colors"
//                     disabled={!isConnected()}
//                   >
//                     <Paperclip className="w-4 h-4" />
//                     <span>Add Attachment</span>
//                   </button>
//                   <button 
//                     type="button"
//                     className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 text-sm transition-colors"
//                     disabled={!isConnected()}
//                   >
//                     <Image className="w-4 h-4" />
//                     <span>Use Image</span>
//                   </button>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <span className="text-gray-400 text-sm">{query.length}/1000</span>
//                   <button 
//                     onClick={handleSubmit}
//                     disabled={!isConnected() || isLoading || !query.trim()}
//                     className={`w-8 h-8 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center transition-all disabled:bg-gray-400 disabled:cursor-not-allowed ${
//                       query.length > 0 && !isLoading ? 'scale-110 shadow-md' : ''
//                     }`}
//                   >
//                     {isLoading ? (
//                       <Loader2 className="w-4 h-4 animate-spin" />
//                     ) : (
//                       <Send className="w-4 h-4" />
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="w-full max-w-6xl">
//             <h2 className="text-xl font-medium text-gray-800 mb-6">Your recent chats</h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {recentChats.map((chat, index) => (
//                 <div
//                   key={index}
//                   className="bg-white rounded-xl border border-gray-200 p-6 hover:border-purple-300 hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:-translate-y-1"
//                   onClick={() => {
//                     if (isConnected()) {
//                       setQuery(chat.title);
//                     }
//                   }}
//                 >
//                   <div className="flex items-start space-x-3">
//                     <MessageCircle className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
//                     <div className="flex-1">
//                       <h3 className="text-gray-800 font-medium leading-snug mb-3">{chat.title}</h3>
//                       <p className="text-gray-500 text-sm">{chat.timeAgo}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HomePage;












// import React, { useState, useEffect, useRef } from 'react';
// import { Send, Mail, AlertCircle, CheckCircle2, Loader2, Paperclip, Image, MessageCircle, ShieldAlert, RefreshCw, ChevronDown, Database, Settings } from 'lucide-react';

// const HomePage = ({ onGmailSetup, onLogout }) => {
//   const [query, setQuery] = useState('');
//   const [isInputFocused, setIsInputFocused] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [conversations, setConversations] = useState([]);
//   const [error, setError] = useState('');
//   const [authenticatedEmail, setAuthenticatedEmail] = useState(null);
//   const [odooConnection, setOdooConnection] = useState(null);
//   const [selectedSource, setSelectedSource] = useState('gmail');
//   const [showToolsMenu, setShowToolsMenu] = useState(false);
//   const conversationRef = useRef(null);
  
//   useEffect(() => {
//     const getConnectionsFromStorage = () => {
//       const storedEmail = localStorage.getItem('authenticatedEmail');
//       setAuthenticatedEmail(storedEmail);
      
//       const storedOdoo = localStorage.getItem('odooConnection');
//       if (storedOdoo) {
//         try {
//           const odooDetails = JSON.parse(storedOdoo);
//           setOdooConnection(odooDetails);
//         } catch (error) {
//           console.error('Error parsing Odoo connection:', error);
//           localStorage.removeItem('odooConnection');
//         }
//       } else {
//         setOdooConnection(null);
//       }
      
//       console.log('HomePage loaded connections - Gmail:', storedEmail, 'Odoo:', storedOdoo);
//     };

//     getConnectionsFromStorage();

//     const handleStorageChange = (e) => {
//       if (e.key === 'authenticatedEmail' || e.key === 'odooConnection') {
//         getConnectionsFromStorage();
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);
//     const interval = setInterval(getConnectionsFromStorage, 1000);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       clearInterval(interval);
//     };
//   }, []);

//   // Auto-scroll to latest message
//   useEffect(() => {
//     if (conversationRef.current && conversations.length > 0) {
//       setTimeout(() => {
//         conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
//       }, 100);
//     }
//   }, [conversations]);

//   const handleLogout = () => {
//     localStorage.removeItem('authenticatedEmail');
//     localStorage.removeItem('odooConnection');
//     setAuthenticatedEmail(null);
//     setOdooConnection(null);
//     if (onLogout) {
//       onLogout();
//     }
//   };

//   const getActiveConnection = () => {
//     if (selectedSource === 'gmail') {
//       return authenticatedEmail;
//     } else if (selectedSource === 'odoo') {
//       return odooConnection?.username;
//     }
//     return null;
//   };

//   const isConnected = () => {
//     if (selectedSource === 'gmail') {
//       return !!authenticatedEmail;
//     } else if (selectedSource === 'odoo') {
//       return !!odooConnection;
//     }
//     return false;
//   };

//   const tools = [
//     {
//       id: 'gmail',
//       name: 'Gmail',
//       icon: Mail,
//       description: 'Search your Gmail emails',
//       connected: !!authenticatedEmail
//     },
//     {
//       id: 'odoo',
//       name: 'Odoo',
//       icon: Database,
//       description: 'Search your Odoo data',
//       connected: !!odooConnection
//     }
//   ];

//   const recentChats = [
//     {
//       title: "Show me all contacts living in Berlin",
//       timeAgo: "6 Hours"
//     },
//     {
//       title: "My last touch points with Lukas",
//       timeAgo: "12 Hours"
//     },
//     {
//       title: "Who in my network is an SaaS expert",
//       timeAgo: "18 Hours"
//     }
//   ];

//   const parseError = (errorMessage) => {
//     if (errorMessage.includes('401') || errorMessage.includes('No valid credentials')) {
//       return {
//         type: 'auth',
//         title: 'Authentication Required',
//         message: `Your ${selectedSource} connection has expired or is invalid. Please reconnect your ${selectedSource} account to continue searching.`,
//         action: `Reconnect ${selectedSource.charAt(0).toUpperCase() + selectedSource.slice(1)}`
//       };
//     }
    
//     if (errorMessage.includes('500') || errorMessage.includes('API Error')) {
//       return {
//         type: 'server',
//         title: 'Server Error',
//         message: 'Something went wrong on our end. Please try again in a moment.',
//         action: 'Try Again'
//       };
//     }
    
//     if (errorMessage.includes('NetworkError') || errorMessage.includes('fetch')) {
//       return {
//         type: 'network',
//         title: 'Connection Error',
//         message: 'Unable to connect to our servers. Please check your internet connection.',
//         action: 'Retry'
//       };
//     }
    
//     return {
//       type: 'general',
//       title: 'Something went wrong',
//       message: 'An unexpected error occurred. Please try again.',
//       action: 'Try Again'
//     };
//   };

//   const handleSubmit = async () => {
//     if (!query.trim()) {
//       setError('Please enter a query');
//       return;
//     }

//     const activeConnection = getActiveConnection();
//     if (!activeConnection) {
//       setError(`Please authenticate your ${selectedSource} connection first`);
//       return;
//     }

//     setIsLoading(true);
//     setError('');

//     const userMessage = {
//       id: Date.now(),
//       type: 'user',
//       content: query.trim(),
//       source: selectedSource,
//       timestamp: new Date()
//     };
    
//     const currentQuery = query.trim();
//     setQuery('');
//     setConversations(prev => [...prev, userMessage]);

//     try {
//       let payload = {
//         query: currentQuery,
//         max_results: 10,
//         source: selectedSource
//       };

//       if (selectedSource === 'gmail') {
//         payload.gmail_address = authenticatedEmail;
//       } else if (selectedSource === 'odoo') {
//         payload.gmail_address = odooConnection?.username;
//       }

//       console.log('Search payload:', payload);

//       const response = await fetch(`${import.meta.env.VITE_SEARCH_URL}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload)
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('API Response:', data);
        
//         const assistantMessage = {
//           id: Date.now() + 1,
//           type: 'assistant',
//           content: {
//             results: data.results || [],
//             summary: data.summary,
//             source: data.source || selectedSource
//           },
//           timestamp: new Date()
//         };
        
//         setConversations(prev => [...prev, assistantMessage]);
//       } else {
//         const errorData = await response.text();
//         throw new Error(`API Error: ${response.status} - ${errorData}`);
//       }
//     } catch (error) {
//       console.error('Search error:', error);
//       setError(`Failed to search: ${error.message}`);
//       setConversations(prev => prev.slice(0, -1));
//       setQuery(currentQuery);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit();
//     }
//   };

//   const formatDate = (timestamp) => {
//     try {
//       let date;
      
//       if (typeof timestamp === 'string' && timestamp.includes('-')) {
//         date = new Date(timestamp);
//       } else if (typeof timestamp === 'string' && timestamp.length > 10) {
//         date = new Date(parseInt(timestamp));
//       } else if (typeof timestamp === 'number') {
//         date = new Date(timestamp);
//       } else {
//         date = new Date(timestamp);
//       }

//       if (isNaN(date.getTime())) {
//         return timestamp;
//       }

//       return date.toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       });
//     } catch {
//       return timestamp;
//     }
//   };

//   const handleErrorAction = (errorInfo) => {
//     if (errorInfo.type === 'auth' && onGmailSetup) {
//       onGmailSetup();
//     } else {
//       setError('');
//     }
//   };

//   const selectTool = (toolId) => {
//     setSelectedSource(toolId);
//     setShowToolsMenu(false);
//     setError('');
//   };

//   const selectedTool = tools.find(tool => tool.id === selectedSource);

//   const renderResult = (result, index, source) => {
//     const isOdooResult = source === 'odoo';
    
//     let title, fromField, dateField, contentField, linkField, additionalInfo;
    
//     if (isOdooResult) {
//       title = result.display_name || result.partner_name || result.name || 'Untitled Record';
//       fromField = result.email_from || result.email_normalized || result.partner_name;
//       dateField = result.create_date || result.write_date || result.date_open;
//       contentField = result.description || 
//                    (result.expected_revenue ? `Expected Revenue: $${result.expected_revenue}` : '') ||
//                    (result.stage_id ? `Stage: ${Array.isArray(result.stage_id) ? result.stage_id[1] : result.stage_id}` : '');
//       linkField = result.website;
      
//       additionalInfo = [];
//       if (result.phone) additionalInfo.push(`Phone: ${result.phone}`);
//       if (result.expected_revenue) additionalInfo.push(`Revenue: $${result.expected_revenue}`);
//       if (result.probability) additionalInfo.push(`Probability: ${result.probability}%`);
//       if (result.stage_id && Array.isArray(result.stage_id)) additionalInfo.push(`Stage: ${result.stage_id[1]}`);
//       if (result.user_id && Array.isArray(result.user_id)) additionalInfo.push(`Assigned to: ${result.user_id[1]}`);
//       if (result.city) additionalInfo.push(`Location: ${result.city}`);
//     } else {
//       title = result.subject || 'No Subject';
//       fromField = result.from;
//       dateField = result.date;
//       contentField = result.snippet;
//       linkField = result.link;
//       additionalInfo = [];
//     }

//     return (
//       <div
//         key={result.id || index}
//         className="bg-white rounded-xl border border-gray-200 p-4 hover:border-purple-300 hover:shadow-md transition-all duration-200"
//       >
//         <div className="space-y-3">
//           <h3 className="text-base font-semibold text-gray-900 leading-tight">
//             {title}
//           </h3>
          
//           <div className="flex items-center justify-between text-sm text-gray-600 flex-wrap gap-2">
//             {fromField && (
//               <span className="flex items-center">
//                 <span className="font-medium">
//                   {isOdooResult ? 'Contact:' : 'From:'}
//                 </span>
//                 <span className="ml-1">{fromField}</span>
//               </span>
//             )}
//             {dateField && (
//               <span className="text-gray-500 text-xs">
//                 {formatDate(dateField)}
//               </span>
//             )}
//           </div>

//           {isOdooResult && additionalInfo.length > 0 && (
//             <div className="flex flex-wrap gap-1">
//               {additionalInfo.map((info, idx) => (
//                 <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
//                   {info}
//                 </span>
//               ))}
//             </div>
//           )}
          
//           {contentField && (
//             <p className="text-gray-700 leading-relaxed text-sm">
//               {contentField}
//             </p>
//           )}
          
//           {linkField && (
//             <div className="pt-2">
//               <a
//                 href={linkField}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center text-sm text-purple-600 hover:text-purple-700 hover:underline"
//               >
//                 {isOdooResult ? (
//                   <>
//                     <Database className="w-4 h-4 mr-1" />
//                     {linkField.includes('http') ? 'Visit Website' : 'Open in Odoo'}
//                   </>
//                 ) : (
//                   <>
//                     <Mail className="w-4 h-4 mr-1" />
//                     Open in Gmail
//                   </>
//                 )}
//               </a>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   const ErrorDisplay = ({ error }) => {
//     const errorInfo = parseError(error);
    
//     const getErrorIcon = (type) => {
//       switch (type) {
//         case 'auth':
//           return <ShieldAlert className="w-5 h-5" />;
//         case 'server':
//           return <AlertCircle className="w-5 h-5" />;
//         case 'network':
//           return <RefreshCw className="w-5 h-5" />;
//         default:
//           return <AlertCircle className="w-5 h-5" />;
//       }
//     };

//     const getErrorColors = (type) => {
//       switch (type) {
//         case 'auth':
//           return {
//             bg: 'bg-orange-50',
//             border: 'border-orange-200',
//             text: 'text-orange-800',
//             icon: 'text-orange-600',
//             button: 'bg-orange-600 hover:bg-orange-700'
//           };
//         case 'server':
//           return {
//             bg: 'bg-red-50',
//             border: 'border-red-200',
//             text: 'text-red-800',
//             icon: 'text-red-600',
//             button: 'bg-red-600 hover:bg-red-700'
//           };
//         case 'network':
//           return {
//             bg: 'bg-blue-50',
//             border: 'border-blue-200',
//             text: 'text-blue-800',
//             icon: 'text-blue-600',
//             button: 'bg-blue-600 hover:bg-blue-700'
//           };
//         default:
//           return {
//             bg: 'bg-gray-50',
//             border: 'border-gray-200',
//             text: 'text-gray-800',
//             icon: 'text-gray-600',
//             button: 'bg-gray-600 hover:bg-gray-700'
//           };
//       }
//     };

//     const colors = getErrorColors(errorInfo.type);

//     return (
//       <div className={`mb-4 p-4 ${colors.bg} ${colors.border} border rounded-xl`}>
//         <div className="flex items-start space-x-3">
//           <div className={`${colors.icon} flex-shrink-0 mt-0.5`}>
//             {getErrorIcon(errorInfo.type)}
//           </div>
//           <div className="flex-1 min-w-0">
//             <h4 className={`font-medium ${colors.text} mb-1`}>
//               {errorInfo.title}
//             </h4>
//             <p className={`text-sm ${colors.text} opacity-90 leading-relaxed`}>
//               {errorInfo.message}
//             </p>
//           </div>
//           <button
//             onClick={() => handleErrorAction(errorInfo)}
//             className={`flex-shrink-0 px-3 py-1.5 ${colors.button} text-white text-sm font-medium rounded-lg transition-colors`}
//           >
//             {errorInfo.action}
//           </button>
//         </div>
//       </div>
//     );
//   };

//   const hasConversations = conversations.length > 0;

//   // Tools Dropdown Component for reuse
//   const ToolsDropdown = ({ isCompact = false }) => (
//     <div className="relative">
//       <button
//         onClick={() => setShowToolsMenu(!showToolsMenu)}
//         className={`flex items-center space-x-2 ${
//           isCompact 
//             ? 'bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-gray-600' 
//             : 'bg-purple-100 hover:bg-purple-200 px-3 py-2 rounded-xl text-gray-700'
//         } transition-colors`}
//       >
//         {isCompact ? (
//           <>
//             <div className="relative">
//               <Settings className="w-4 h-4" />
//               {selectedTool?.connected && (
//                 <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border border-white"></span>
//               )}
//             </div>
//             <span className="text-sm font-medium">Tools</span>
//             <span className="text-xs text-gray-500">({selectedTool?.name})</span>
//           </>
//         ) : (
//           <>
//             <Settings className="w-4 h-4" />
//             <span className="text-sm font-medium">Tools</span>
//           </>
//         )}
//         <ChevronDown className={`w-4 h-4 transition-transform ${showToolsMenu ? 'rotate-180' : ''}`} />
//       </button>

//       {showToolsMenu && (
//         <div className={`absolute ${isCompact ? 'bottom-full mb-2' : 'top-full mt-2'} left-0 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-10`}>
//           <div className="p-3">
//             <div className="mb-3">
//               <h4 className="text-sm font-medium text-gray-700 mb-2">Select Data Source</h4>
//             </div>
//             {tools.map((tool) => {
//               const Icon = tool.icon;
//               const isActive = selectedSource === tool.id;
//               const isConnected = tool.connected;
              
//               return (
//                 <button
//                   key={tool.id}
//                   onClick={() => selectTool(tool.id)}
//                   className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all mb-2 ${
//                     isActive 
//                       ? 'bg-purple-50 border-2 border-purple-200 shadow-sm' 
//                       : 'hover:bg-gray-50 border-2 border-transparent'
//                   }`}
//                 >
//                   <div className="relative">
//                     <Icon className={`w-6 h-6 ${isActive ? 'text-purple-600' : 'text-gray-500'}`} />
//                     {isConnected && (
//                       <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
//                     )}
//                   </div>
                  
//                   <div className="flex-1">
//                     <div className="flex items-center justify-between">
//                       <span className={`font-medium ${isActive ? 'text-purple-900' : 'text-gray-900'}`}>
//                         {tool.name}
//                       </span>
//                       <div className="flex items-center space-x-2">
//                         {isConnected ? (
//                           <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">
//                             Connected
//                           </span>
//                         ) : (
//                           <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full font-medium">
//                             Not Connected
//                           </span>
//                         )}
//                         {isActive && (
//                           <CheckCircle2 className="w-4 h-4 text-purple-600" />
//                         )}
//                       </div>
//                     </div>
//                     <p className="text-xs text-gray-500 mt-1">{tool.description}</p>
//                     {isConnected && (
//                       <p className="text-xs text-green-600 mt-1 font-medium">
//                         {tool.id === 'gmail' ? authenticatedEmail : odooConnection?.username}
//                       </p>
//                     )}
//                   </div>
//                 </button>
//               );
//             })}
            
//             {/* Connect Services Button */}
//             <div className="mt-3 pt-3 border-t border-gray-200">
//               {onGmailSetup && (
//                 <button
//                   onClick={() => {
//                     setShowToolsMenu(false);
//                     onGmailSetup();
//                   }}
//                   className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
//                 >
//                   Connect New Service
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <div className="flex-1 flex flex-col bg-gray-50">
//       {hasConversations ? (
//         /* Conversation View - After First Query */
//         <div className="h-screen flex flex-col">
//           {/* Header - Connection Status */}
//           <div className="border-b border-gray-200 bg-white px-8 py-4 flex-shrink-0">
//             <div className="max-w-4xl mx-auto">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h1 className="text-xl font-medium text-gray-800">Good Evening, Kunal</h1>
//                   <p className="text-sm text-gray-500">Enter a keyword to get anything from your data!</p>
//                 </div>
                
//                 <div className="flex items-center space-x-4 text-xs">
//                   <span className={`flex items-center space-x-1 ${authenticatedEmail ? 'text-green-600' : 'text-gray-400'}`}>
//                     <Mail className="w-3 h-3" />
//                     <span>Gmail {authenticatedEmail ? '✓' : '✗'}</span>
//                   </span>
//                   <span className={`flex items-center space-x-1 ${odooConnection ? 'text-green-600' : 'text-gray-400'}`}>
//                     <Database className="w-3 h-3" />
//                     <span>Odoo {odooConnection ? '✓' : '✗'}</span>
//                   </span>
//                   {(authenticatedEmail || odooConnection) && (
//                     <button
//                       onClick={handleLogout}
//                       className="text-red-600 hover:text-red-700 underline"
//                     >
//                       Disconnect All
//                     </button>
//                   )}
//                   {onGmailSetup && (
//                     <button
//                       onClick={onGmailSetup}
//                       className="bg-purple-500 text-white px-3 py-1 rounded-lg hover:bg-purple-600"
//                     >
//                       Connect Services
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Scrollable Conversation Area */}
//           <div ref={conversationRef} className="flex-1 overflow-y-auto px-8 py-6">
//             <div className="max-w-4xl mx-auto space-y-6">
//               {conversations.map((message) => (
//                 <div key={message.id} className="space-y-4">
//                   {message.type === 'user' ? (
//                     <div className="flex justify-end">
//                       <div className="bg-purple-600 text-white rounded-2xl px-4 py-3 max-w-xl">
//                         <p className="text-sm">{message.content}</p>
//                         <div className="flex items-center space-x-2 mt-2 text-xs text-purple-200">
//                           {message.source === 'gmail' ? <Mail className="w-3 h-3" /> : <Database className="w-3 h-3" />}
//                           <span>{message.source}</span>
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="flex justify-start">
//                       <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-4xl w-full shadow-sm">
//                         {message.content.summary && (
//                           <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
//                             <h3 className="text-lg font-medium text-blue-900 mb-2">Summary</h3>
//                             <p className="text-blue-800 leading-relaxed">{message.content.summary}</p>
//                             <div className="mt-2 text-sm text-blue-600">
//                               Source: {message.content.source} • {message.content.results.length} results found
//                             </div>
//                           </div>
//                         )}
                        
//                         <h3 className="text-lg font-medium text-gray-900 mb-4">
//                           {message.content.results.length} Results Found
//                         </h3>
                        
//                         <div className="space-y-3">
//                           {message.content.results.map((result, index) => 
//                             renderResult(result, index, message.content.source)
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
              
//               {isLoading && (
//                 <div className="flex justify-start">
//                   <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-xl shadow-sm">
//                     <div className="flex items-center space-x-3">
//                       <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
//                       <span className="text-gray-600">Searching...</span>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Sticky Bottom Input */}
//           <div className="border-t border-gray-200 bg-white px-8 py-4 flex-shrink-0">
//             <div className="max-w-4xl mx-auto">
//               <div className="flex items-center space-x-4">
//                 <ToolsDropdown isCompact={true} />

//                 <div className="flex-1">
//                   <input
//                     type="text"
//                     placeholder={isConnected() ? `Ask about your ${selectedTool?.name} data...` : `Please authenticate ${selectedTool?.name} first...`}
//                     value={query}
//                     onChange={(e) => setQuery(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                     disabled={!isConnected() || isLoading}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:text-gray-500 disabled:bg-gray-100"
//                   />
//                 </div>

//                 <button 
//                   onClick={handleSubmit}
//                   disabled={!isConnected() || isLoading || !query.trim()}
//                   className="w-10 h-10 bg-purple-600 text-white rounded-xl hover:bg-purple-700 flex items-center justify-center transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
//                 >
//                   {isLoading ? (
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                   ) : (
//                     <Send className="w-4 h-4" />
//                   )}
//                 </button>
//               </div>

//               {error && (
//                 <div className="mt-3">
//                   <ErrorDisplay error={error} />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       ) : (
//         /* Initial Landing View - Centered Layout */
//         <div className="min-h-screen flex flex-col items-center justify-center px-8 py-16 overflow-auto">
          
//           <div className="text-center mb-12">
//             <h1 className="text-2xl font-medium text-gray-800 mb-2">Good Evening, Kunal</h1>
//             <p className="text-gray-500 text-base">Enter a Keyword to get anything from your data!</p>
            
//             {/* Connection Status */}
//             <div className="mt-4 space-y-2">
//               {/* Current Source Status */}
//               {isConnected() ? (
//                 <div className="flex items-center justify-center space-x-4">
//                   <p className="text-sm text-green-600">
//                     ✅ {selectedTool?.name} Connected: {getActiveConnection()}
//                   </p>
//                   <button
//                     onClick={handleLogout}
//                     className="text-xs text-red-600 hover:text-red-700 underline"
//                   >
//                     Disconnect All
//                   </button>
//                 </div>
//               ) : (
//                 <div className="flex items-center justify-center space-x-4">
//                   <p className="text-sm text-orange-600">
//                     ⚠️ Please authenticate your {selectedTool?.name} connection first
//                   </p>
//                   {onGmailSetup && (
//                     <button
//                       onClick={onGmailSetup}
//                       className="text-sm bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
//                     >
//                       Connect Services
//                     </button>
//                   )}
//                 </div>
//               )}

//               {/* All Connections Status */}
//               <div className="flex items-center justify-center space-x-6 text-xs">
//                 <span className={`flex items-center space-x-1 ${authenticatedEmail ? 'text-green-600' : 'text-gray-400'}`}>
//                   <Mail className="w-3 h-3" />
//                   <span>Gmail {authenticatedEmail ? '✓' : '✗'}</span>
//                 </span>
//                 <span className={`flex items-center space-x-1 ${odooConnection ? 'text-green-600' : 'text-gray-400'}`}>
//                   <Database className="w-3 h-3" />
//                   <span>Odoo {odooConnection ? '✓' : '✗'}</span>
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="w-full max-w-3xl">
//             <div className={`bg-white rounded-2xl border shadow-sm p-6 mb-12 transition-all duration-200 ${
//               isInputFocused 
//                 ? 'border-purple-300 shadow-lg ring-2 ring-purple-100' 
//                 : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
//             }`}>
//               <div className="flex items-center justify-between mb-6">
//                 <ToolsDropdown />
//                 <div className="flex items-center space-x-1 text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
//                   {selectedTool?.icon && <selectedTool.icon className="w-4 h-4" />}
//                   <span>{selectedTool?.name}</span>
//                   {isConnected() && <span className="w-2 h-2 bg-green-400 rounded-full ml-1"></span>}
//                 </div>
//               </div>

//               <div className="mb-6">
//                 <textarea
//                   placeholder={isConnected() ? `Search your ${selectedTool?.name} data...` : `Please authenticate ${selectedTool?.name} first...`}
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   onFocus={() => setIsInputFocused(true)}
//                   onBlur={() => setIsInputFocused(false)}
//                   onKeyPress={handleKeyPress}
//                   disabled={!isConnected() || isLoading}
//                   className="w-full h-10 text-base bg-transparent border-none resize-none focus:outline-none text-gray-800 placeholder-gray-400 disabled:text-gray-500"
//                 />
//               </div>

//               {error && <ErrorDisplay error={error} />}

//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-4">
//                   <button 
//                     type="button"
//                     className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 text-sm transition-colors"
//                     disabled={!isConnected()}
//                   >
//                     <Paperclip className="w-4 h-4" />
//                     <span>Add Attachment</span>
//                   </button>
//                   <button 
//                     type="button"
//                     className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 text-sm transition-colors"
//                     disabled={!isConnected()}
//                   >
//                     <Image className="w-4 h-4" />
//                     <span>Use Image</span>
//                   </button>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <span className="text-gray-400 text-sm">{query.length}/1000</span>
//                   <button 
//                     onClick={handleSubmit}
//                     disabled={!isConnected() || isLoading || !query.trim()}
//                     className={`w-8 h-8 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center transition-all disabled:bg-gray-400 disabled:cursor-not-allowed ${
//                       query.length > 0 && !isLoading ? 'scale-110 shadow-md' : ''
//                     }`}
//                   >
//                     {isLoading ? (
//                       <Loader2 className="w-4 h-4 animate-spin" />
//                     ) : (
//                       <Send className="w-4 h-4" />
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="w-full max-w-6xl">
//             <h2 className="text-xl font-medium text-gray-800 mb-6">Your recent chats</h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {recentChats.map((chat, index) => (
//                 <div
//                   key={index}
//                   className="bg-white rounded-xl border border-gray-200 p-6 hover:border-purple-300 hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:-translate-y-1"
//                   onClick={() => {
//                     if (isConnected()) {
//                       setQuery(chat.title);
//                     }
//                   }}
//                 >
//                   <div className="flex items-start space-x-3">
//                     <MessageCircle className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
//                     <div className="flex-1">
//                       <h3 className="text-gray-800 font-medium leading-snug mb-3">{chat.title}</h3>
//                       <p className="text-gray-500 text-sm">{chat.timeAgo}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HomePage;






// import React, { useState, useEffect, useRef } from 'react';
// import { Send, Mail, AlertCircle, CheckCircle2, Loader2, Paperclip, Image, MessageCircle, ShieldAlert, RefreshCw, ChevronDown, Database, Settings } from 'lucide-react';

// const HomePage = ({ onGmailSetup, onLogout }) => {
//   const [query, setQuery] = useState('');
//   const [isInputFocused, setIsInputFocused] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [conversations, setConversations] = useState([]);
//   const [error, setError] = useState('');
//   const [authenticatedEmail, setAuthenticatedEmail] = useState(null);
//   const [odooConnection, setOdooConnection] = useState(null);
//   const [selectedSource, setSelectedSource] = useState('gmail');
//   const [showToolsMenu, setShowToolsMenu] = useState(false);
//   const conversationRef = useRef(null);
  
//   useEffect(() => {
//     const getConnectionsFromStorage = () => {
//       const storedEmail = localStorage.getItem('authenticatedEmail');
//       setAuthenticatedEmail(storedEmail);
      
//       const storedOdoo = localStorage.getItem('odooConnection');
//       if (storedOdoo) {
//         try {
//           const odooDetails = JSON.parse(storedOdoo);
//           setOdooConnection(odooDetails);
//         } catch (error) {
//           console.error('Error parsing Odoo connection:', error);
//           localStorage.removeItem('odooConnection');
//         }
//       } else {
//         setOdooConnection(null);
//       }
      
//       console.log('HomePage loaded connections - Gmail:', storedEmail, 'Odoo:', storedOdoo);
//     };

//     getConnectionsFromStorage();

//     const handleStorageChange = (e) => {
//       if (e.key === 'authenticatedEmail' || e.key === 'odooConnection') {
//         getConnectionsFromStorage();
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);
//     const interval = setInterval(getConnectionsFromStorage, 1000);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       clearInterval(interval);
//     };
//   }, []);

//   // Auto-scroll to latest message
//   useEffect(() => {
//     if (conversationRef.current && conversations.length > 0) {
//       setTimeout(() => {
//         conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
//       }, 100);
//     }
//   }, [conversations]);

//   const handleLogout = () => {
//     localStorage.removeItem('authenticatedEmail');
//     localStorage.removeItem('odooConnection');
//     setAuthenticatedEmail(null);
//     setOdooConnection(null);
//     if (onLogout) {
//       onLogout();
//     }
//   };

//   const getActiveConnection = () => {
//     if (selectedSource === 'gmail') {
//       return authenticatedEmail;
//     } else if (selectedSource === 'odoo') {
//       return odooConnection?.username;
//     }
//     return null;
//   };

//   const isConnected = () => {
//     if (selectedSource === 'gmail') {
//       return !!authenticatedEmail;
//     } else if (selectedSource === 'odoo') {
//       return !!odooConnection;
//     }
//     return false;
//   };

//   const tools = [
//     {
//       id: 'gmail',
//       name: 'Gmail',
//       icon: Mail,
//       description: 'Search your Gmail emails',
//       connected: !!authenticatedEmail
//     },
//     {
//       id: 'odoo',
//       name: 'Odoo',
//       icon: Database,
//       description: 'Search your Odoo data',
//       connected: !!odooConnection
//     }
//   ];

//   const recentChats = [
//     {
//       title: "Show me all contacts living in Berlin",
//       timeAgo: "6 Hours"
//     },
//     {
//       title: "My last touch points with Lukas",
//       timeAgo: "12 Hours"
//     },
//     {
//       title: "Who in my network is an SaaS expert",
//       timeAgo: "18 Hours"
//     }
//   ];

//   const parseError = (errorMessage) => {
//     if (errorMessage.includes('401') || errorMessage.includes('No valid credentials')) {
//       return {
//         type: 'auth',
//         title: 'Authentication Required',
//         message: `Your ${selectedSource} connection has expired or is invalid. Please reconnect your ${selectedSource} account to continue searching.`,
//         action: `Reconnect ${selectedSource.charAt(0).toUpperCase() + selectedSource.slice(1)}`
//       };
//     }
    
//     if (errorMessage.includes('500') || errorMessage.includes('API Error')) {
//       return {
//         type: 'server',
//         title: 'Server Error',
//         message: 'Something went wrong on our end. Please try again in a moment.',
//         action: 'Try Again'
//       };
//     }
    
//     if (errorMessage.includes('NetworkError') || errorMessage.includes('fetch')) {
//       return {
//         type: 'network',
//         title: 'Connection Error',
//         message: 'Unable to connect to our servers. Please check your internet connection.',
//         action: 'Retry'
//       };
//     }
    
//     return {
//       type: 'general',
//       title: 'Something went wrong',
//       message: 'An unexpected error occurred. Please try again.',
//       action: 'Try Again'
//     };
//   };

//   const handleSubmit = async () => {
//     if (!query.trim()) {
//       setError('Please enter a query');
//       return;
//     }

//     const activeConnection = getActiveConnection();
//     if (!activeConnection) {
//       setError(`Please authenticate your ${selectedSource} connection first`);
//       return;
//     }

//     setIsLoading(true);
//     setError('');

//     const userMessage = {
//       id: Date.now(),
//       type: 'user',
//       content: query.trim(),
//       source: selectedSource,
//       timestamp: new Date()
//     };
    
//     const currentQuery = query.trim();
//     setQuery('');
//     setConversations(prev => [...prev, userMessage]);

//     try {
//       let payload = {
//         query: currentQuery,
//         max_results: 10,
//         source: selectedSource
//       };

//       if (selectedSource === 'gmail') {
//         payload.gmail_address = authenticatedEmail;
//       } else if (selectedSource === 'odoo') {
//         payload.gmail_address = odooConnection?.username;
//       }

//       console.log('Search payload:', payload);

//       const response = await fetch(`${import.meta.env.VITE_SEARCH_URL}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload)
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('API Response:', data);
        
//         const assistantMessage = {
//           id: Date.now() + 1,
//           type: 'assistant',
//           content: {
//             results: data.results || [],
//             summary: data.summary,
//             source: data.source || selectedSource
//           },
//           timestamp: new Date()
//         };
        
//         setConversations(prev => [...prev, assistantMessage]);
//       } else {
//         const errorData = await response.text();
//         throw new Error(`API Error: ${response.status} - ${errorData}`);
//       }
//     } catch (error) {
//       console.error('Search error:', error);
//       setError(`Failed to search: ${error.message}`);
//       setConversations(prev => prev.slice(0, -1));
//       setQuery(currentQuery);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit();
//     }
//   };

//   const formatDate = (timestamp) => {
//     try {
//       let date;
      
//       if (typeof timestamp === 'string' && timestamp.includes('-')) {
//         date = new Date(timestamp);
//       } else if (typeof timestamp === 'string' && timestamp.length > 10) {
//         date = new Date(parseInt(timestamp));
//       } else if (typeof timestamp === 'number') {
//         date = new Date(timestamp);
//       } else {
//         date = new Date(timestamp);
//       }

//       if (isNaN(date.getTime())) {
//         return timestamp;
//       }

//       return date.toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       });
//     } catch {
//       return timestamp;
//     }
//   };

//   const handleErrorAction = (errorInfo) => {
//     if (errorInfo.type === 'auth' && onGmailSetup) {
//       onGmailSetup();
//     } else {
//       setError('');
//     }
//   };

//   const selectTool = (toolId) => {
//     setSelectedSource(toolId);
//     setShowToolsMenu(false);
//     setError('');
//   };

//   const selectedTool = tools.find(tool => tool.id === selectedSource);

//   const renderResult = (result, index, source) => {
//     const isOdooResult = source === 'odoo';
    
//     let title, fromField, dateField, contentField, linkField, additionalInfo;
    
//     if (isOdooResult) {
//       title = result.display_name || result.partner_name || result.name || 'Untitled Record';
//       fromField = result.email_from || result.email_normalized || result.partner_name;
//       dateField = result.create_date || result.write_date || result.date_open;
//       contentField = result.description || 
//                    (result.expected_revenue ? `Expected Revenue: $${result.expected_revenue}` : '') ||
//                    (result.stage_id ? `Stage: ${Array.isArray(result.stage_id) ? result.stage_id[1] : result.stage_id}` : '');
//       linkField = result.website;
      
//       additionalInfo = [];
//       if (result.phone) additionalInfo.push(`Phone: ${result.phone}`);
//       if (result.expected_revenue) additionalInfo.push(`Revenue: $${result.expected_revenue}`);
//       if (result.probability) additionalInfo.push(`Probability: ${result.probability}%`);
//       if (result.stage_id && Array.isArray(result.stage_id)) additionalInfo.push(`Stage: ${result.stage_id[1]}`);
//       if (result.user_id && Array.isArray(result.user_id)) additionalInfo.push(`Assigned to: ${result.user_id[1]}`);
//       if (result.city) additionalInfo.push(`Location: ${result.city}`);
//     } else {
//       title = result.subject || 'No Subject';
//       fromField = result.from;
//       dateField = result.date;
//       contentField = result.snippet;
//       linkField = result.link;
//       additionalInfo = [];
//     }

//     return (
//       <div
//         key={result.id || index}
//         className="bg-white rounded-xl border border-gray-200 p-4 hover:border-purple-300 hover:shadow-md transition-all duration-200"
//       >
//         <div className="space-y-3">
//           <h3 className="text-base font-semibold text-gray-900 leading-tight">
//             {title}
//           </h3>
          
//           <div className="flex items-center justify-between text-sm text-gray-600 flex-wrap gap-2">
//             {fromField && (
//               <span className="flex items-center">
//                 <span className="font-medium">
//                   {isOdooResult ? 'Contact:' : 'From:'}
//                 </span>
//                 <span className="ml-1">{fromField}</span>
//               </span>
//             )}
//             {dateField && (
//               <span className="text-gray-500 text-xs">
//                 {formatDate(dateField)}
//               </span>
//             )}
//           </div>

//           {isOdooResult && additionalInfo.length > 0 && (
//             <div className="flex flex-wrap gap-1">
//               {additionalInfo.map((info, idx) => (
//                 <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
//                   {info}
//                 </span>
//               ))}
//             </div>
//           )}
          
//           {contentField && (
//             <p className="text-gray-700 leading-relaxed text-sm">
//               {contentField}
//             </p>
//           )}
          
//           {linkField && (
//             <div className="pt-2">
//               <a
//                 href={linkField}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center text-sm text-purple-600 hover:text-purple-700 hover:underline"
//               >
//                 {isOdooResult ? (
//                   <>
//                     <Database className="w-4 h-4 mr-1" />
//                     {linkField.includes('http') ? 'Visit Website' : 'Open in Odoo'}
//                   </>
//                 ) : (
//                   <>
//                     <Mail className="w-4 h-4 mr-1" />
//                     Open in Gmail
//                   </>
//                 )}
//               </a>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   const ErrorDisplay = ({ error }) => {
//     const errorInfo = parseError(error);
    
//     const getErrorIcon = (type) => {
//       switch (type) {
//         case 'auth':
//           return <ShieldAlert className="w-5 h-5" />;
//         case 'server':
//           return <AlertCircle className="w-5 h-5" />;
//         case 'network':
//           return <RefreshCw className="w-5 h-5" />;
//         default:
//           return <AlertCircle className="w-5 h-5" />;
//       }
//     };

//     const getErrorColors = (type) => {
//       switch (type) {
//         case 'auth':
//           return {
//             bg: 'bg-orange-50',
//             border: 'border-orange-200',
//             text: 'text-orange-800',
//             icon: 'text-orange-600',
//             button: 'bg-orange-600 hover:bg-orange-700'
//           };
//         case 'server':
//           return {
//             bg: 'bg-red-50',
//             border: 'border-red-200',
//             text: 'text-red-800',
//             icon: 'text-red-600',
//             button: 'bg-red-600 hover:bg-red-700'
//           };
//         case 'network':
//           return {
//             bg: 'bg-blue-50',
//             border: 'border-blue-200',
//             text: 'text-blue-800',
//             icon: 'text-blue-600',
//             button: 'bg-blue-600 hover:bg-blue-700'
//           };
//         default:
//           return {
//             bg: 'bg-gray-50',
//             border: 'border-gray-200',
//             text: 'text-gray-800',
//             icon: 'text-gray-600',
//             button: 'bg-gray-600 hover:bg-gray-700'
//           };
//       }
//     };

//     const colors = getErrorColors(errorInfo.type);

//     return (
//       <div className={`mb-4 p-4 ${colors.bg} ${colors.border} border rounded-xl`}>
//         <div className="flex items-start space-x-3">
//           <div className={`${colors.icon} flex-shrink-0 mt-0.5`}>
//             {getErrorIcon(errorInfo.type)}
//           </div>
//           <div className="flex-1 min-w-0">
//             <h4 className={`font-medium ${colors.text} mb-1`}>
//               {errorInfo.title}
//             </h4>
//             <p className={`text-sm ${colors.text} opacity-90 leading-relaxed`}>
//               {errorInfo.message}
//             </p>
//           </div>
//           <button
//             onClick={() => handleErrorAction(errorInfo)}
//             className={`flex-shrink-0 px-3 py-1.5 ${colors.button} text-white text-sm font-medium rounded-lg transition-colors`}
//           >
//             {errorInfo.action}
//           </button>
//         </div>
//       </div>
//     );
//   };

//   const hasConversations = conversations.length > 0;

//   return (
//     <div className="flex-1 flex flex-col bg-gray-50">
//       {hasConversations ? (
//         /* Conversation View - After First Query */
//         <div className="h-screen flex flex-col">
//           {/* Header - Connection Status */}
//           <div className="border-b border-gray-200 bg-white px-8 py-4 flex-shrink-0">
//             <div className="max-w-4xl mx-auto">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h1 className="text-xl font-medium text-gray-800">Good Evening, Kunal</h1>
//                   <p className="text-sm text-gray-500">Enter a keyword to get anything from your data!</p>
//                 </div>
                
//                 <div className="flex items-center space-x-4 text-xs">
//                   <span className={`flex items-center space-x-1 ${authenticatedEmail ? 'text-green-600' : 'text-gray-400'}`}>
//                     <Mail className="w-3 h-3" />
//                     <span>Gmail {authenticatedEmail ? '✓' : '✗'}</span>
//                   </span>
//                   <span className={`flex items-center space-x-1 ${odooConnection ? 'text-green-600' : 'text-gray-400'}`}>
//                     <Database className="w-3 h-3" />
//                     <span>Odoo {odooConnection ? '✓' : '✗'}</span>
//                   </span>
//                   {(authenticatedEmail || odooConnection) && (
//                     <button
//                       onClick={handleLogout}
//                       className="text-red-600 hover:text-red-700 underline"
//                     >
//                       Disconnect All
//                     </button>
//                   )}
//                   {onGmailSetup && (
//                     <button
//                       onClick={onGmailSetup}
//                       className="bg-purple-500 text-white px-3 py-1 rounded-lg hover:bg-purple-600"
//                     >
//                       Connect Services
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Scrollable Conversation Area */}
//           <div ref={conversationRef} className="flex-1 overflow-y-auto px-8 py-6">
//             <div className="max-w-4xl mx-auto space-y-6">
//               {conversations.map((message) => (
//                 <div key={message.id} className="space-y-4">
//                   {message.type === 'user' ? (
//                     <div className="flex justify-end">
//                       <div className="bg-purple-600 text-white rounded-2xl px-4 py-3 max-w-xl">
//                         <p className="text-sm">{message.content}</p>
//                         <div className="flex items-center space-x-2 mt-2 text-xs text-purple-200">
//                           {message.source === 'gmail' ? <Mail className="w-3 h-3" /> : <Database className="w-3 h-3" />}
//                           <span>{message.source}</span>
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="flex justify-start">
//                       <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-4xl w-full shadow-sm">
//                         {message.content.summary && (
//                           <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
//                             <h3 className="text-lg font-medium text-blue-900 mb-2">Summary</h3>
//                             <p className="text-blue-800 leading-relaxed">{message.content.summary}</p>
//                             <div className="mt-2 text-sm text-blue-600">
//                               Source: {message.content.source} • {message.content.results.length} results found
//                             </div>
//                           </div>
//                         )}
                        
//                         <h3 className="text-lg font-medium text-gray-900 mb-4">
//                           {message.content.results.length} Results Found
//                         </h3>
                        
//                         <div className="space-y-3">
//                           {message.content.results.map((result, index) => 
//                             renderResult(result, index, message.content.source)
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
              
//               {isLoading && (
//                 <div className="flex justify-start">
//                   <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-xl shadow-sm">
//                     <div className="flex items-center space-x-3">
//                       <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
//                       <span className="text-gray-600">Searching...</span>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Sticky Bottom Input */}
//           <div className="border-t border-gray-200 bg-white px-8 py-4 flex-shrink-0">
//             <div className="max-w-4xl mx-auto">
//               <div className="flex items-center space-x-3 bg-gray-100 rounded-full px-4 py-3">
//                 {/* Plus Button */}
//                 <button className="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors">
//                   <span className="text-gray-600 text-lg font-light">+</span>
//                 </button>

//                 {/* Tools Button */}
//                 <div className="relative">
//                   <button
//                     onClick={() => setShowToolsMenu(!showToolsMenu)}
//                     className="flex items-center space-x-2 bg-gray-200 hover:bg-gray-300 px-3 py-1.5 rounded-full text-gray-700 transition-colors"
//                   >
//                     <Settings className="w-4 h-4" />
//                     <span className="text-sm font-medium">Tools</span>
//                   </button>

//                   {showToolsMenu && (
//                     <div className="absolute bottom-full mb-2 left-0 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
//                       <div className="p-3">
//                         <div className="mb-3">
//                           <h4 className="text-sm font-medium text-gray-700 mb-2">Select Data Source</h4>
//                         </div>
//                         {tools.map((tool) => {
//                           const Icon = tool.icon;
//                           const isActive = selectedSource === tool.id;
//                           const isConnected = tool.connected;
                          
//                           return (
//                             <button
//                               key={tool.id}
//                               onClick={() => selectTool(tool.id)}
//                               className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all mb-2 ${
//                                 isActive 
//                                   ? 'bg-purple-50 border-2 border-purple-200 shadow-sm' 
//                                   : 'hover:bg-gray-50 border-2 border-transparent'
//                               }`}
//                             >
//                               <div className="relative">
//                                 <Icon className={`w-6 h-6 ${isActive ? 'text-purple-600' : 'text-gray-500'}`} />
//                                 {isConnected && (
//                                   <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
//                                 )}
//                               </div>
                              
//                               <div className="flex-1">
//                                 <div className="flex items-center justify-between">
//                                   <span className={`font-medium ${isActive ? 'text-purple-900' : 'text-gray-900'}`}>
//                                     {tool.name}
//                                   </span>
//                                   <div className="flex items-center space-x-2">
//                                     {isConnected ? (
//                                       <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">
//                                         Connected
//                                       </span>
//                                     ) : (
//                                       <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full font-medium">
//                                         Not Connected
//                                       </span>
//                                     )}
//                                     {isActive && (
//                                       <CheckCircle2 className="w-4 h-4 text-purple-600" />
//                                     )}
//                                   </div>
//                                 </div>
//                                 <p className="text-xs text-gray-500 mt-1">{tool.description}</p>
//                                 {isConnected && (
//                                   <p className="text-xs text-green-600 mt-1 font-medium">
//                                     {tool.id === 'gmail' ? authenticatedEmail : odooConnection?.username}
//                                   </p>
//                                 )}
//                               </div>
//                             </button>
//                           );
//                         })}
                        
//                         {/* Connect Services Button */}
//                         <div className="mt-3 pt-3 border-t border-gray-200">
//                           {onGmailSetup && (
//                             <button
//                               onClick={() => {
//                                 setShowToolsMenu(false);
//                                 onGmailSetup();
//                               }}
//                               className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
//                             >
//                               Connect New Service
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Input Field */}
//                 <div className="flex-1">
//                   <input
//                     type="text"
//                     placeholder="Ask anything"
//                     value={query}
//                     onChange={(e) => setQuery(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                     disabled={!isConnected() || isLoading}
//                     className="w-full bg-transparent border-none focus:outline-none text-gray-800 placeholder-gray-500 disabled:text-gray-400 text-base"
//                   />
//                 </div>

//                 {/* Right Side Buttons */}
//                 <div className="flex items-center space-x-2">
//                   {/* Mic Button */}
//                   <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm">
//                     <span className="text-gray-600 text-sm">🎤</span>
//                   </button>

//                   {/* Send/Action Button */}
//                   <button 
//                     onClick={handleSubmit}
//                     disabled={!isConnected() || isLoading || !query.trim()}
//                     className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
//                   >
//                     {isLoading ? (
//                       <Loader2 className="w-3 h-3 animate-spin" />
//                     ) : (
//                       <Send className="w-3 h-3" />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {error && (
//                 <div className="mt-3">
//                   <ErrorDisplay error={error} />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       ) : (
//         /* Initial Landing View - Centered Layout */
//         <div className="min-h-screen flex flex-col items-center justify-center px-8 py-16 overflow-auto">
          
//           <div className="text-center mb-12">
//             <h1 className="text-2xl font-medium text-gray-800 mb-2">Good Evening, Kunal</h1>
//             <p className="text-gray-500 text-base">Enter a Keyword to get anything from your data!</p>
            
//             {/* Connection Status */}
//             <div className="mt-4 space-y-2">
//               {/* Current Source Status */}
//               {isConnected() ? (
//                 <div className="flex items-center justify-center space-x-4">
//                   <p className="text-sm text-green-600">
//                     ✅ {selectedTool?.name} Connected: {getActiveConnection()}
//                   </p>
//                   <button
//                     onClick={handleLogout}
//                     className="text-xs text-red-600 hover:text-red-700 underline"
//                   >
//                     Disconnect All
//                   </button>
//                 </div>
//               ) : (
//                 <div className="flex items-center justify-center space-x-4">
//                   <p className="text-sm text-orange-600">
//                     ⚠️ Please authenticate your {selectedTool?.name} connection first
//                   </p>
//                   {onGmailSetup && (
//                     <button
//                       onClick={onGmailSetup}
//                       className="text-sm bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
//                     >
//                       Connect Services
//                     </button>
//                   )}
//                 </div>
//               )}

//               {/* All Connections Status */}
//               <div className="flex items-center justify-center space-x-6 text-xs">
//                 <span className={`flex items-center space-x-1 ${authenticatedEmail ? 'text-green-600' : 'text-gray-400'}`}>
//                   <Mail className="w-3 h-3" />
//                   <span>Gmail {authenticatedEmail ? '✓' : '✗'}</span>
//                 </span>
//                 <span className={`flex items-center space-x-1 ${odooConnection ? 'text-green-600' : 'text-gray-400'}`}>
//                   <Database className="w-3 h-3" />
//                   <span>Odoo {odooConnection ? '✓' : '✗'}</span>
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="w-full max-w-3xl">
//             <div className={`bg-white rounded-2xl border shadow-sm p-6 mb-12 transition-all duration-200 ${
//               isInputFocused 
//                 ? 'border-purple-300 shadow-lg ring-2 ring-purple-100' 
//                 : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
//             }`}>
//               <div className="flex items-center justify-between mb-6">
//                 {/* Tools Menu */}
//                 <div className="relative">
//                   <button
//                     onClick={() => setShowToolsMenu(!showToolsMenu)}
//                     className="flex items-center space-x-2 bg-purple-100 hover:bg-purple-200 px-3 py-2 rounded-xl text-gray-700 transition-colors"
//                   >
//                     <Settings className="w-4 h-4" />
//                     <span className="text-sm font-medium">Tools</span>
//                     <ChevronDown className={`w-4 h-4 transition-transform ${showToolsMenu ? 'rotate-180' : ''}`} />
//                   </button>

//                   {showToolsMenu && (
//                     <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
//                       <div className="p-3">
//                         <div className="mb-3">
//                           <h4 className="text-sm font-medium text-gray-700 mb-2">Select Data Source</h4>
//                         </div>
//                         {tools.map((tool) => {
//                           const Icon = tool.icon;
//                           const isActive = selectedSource === tool.id;
//                           const isConnected = tool.connected;
                          
//                           return (
//                             <button
//                               key={tool.id}
//                               onClick={() => selectTool(tool.id)}
//                               className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all mb-2 ${
//                                 isActive 
//                                   ? 'bg-purple-50 border-2 border-purple-200 shadow-sm' 
//                                   : 'hover:bg-gray-50 border-2 border-transparent'
//                               }`}
//                             >
//                               <div className="relative">
//                                 <Icon className={`w-6 h-6 ${isActive ? 'text-purple-600' : 'text-gray-500'}`} />
//                                 {isConnected && (
//                                   <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
//                                 )}
//                               </div>
                              
//                               <div className="flex-1">
//                                 <div className="flex items-center justify-between">
//                                   <span className={`font-medium ${isActive ? 'text-purple-900' : 'text-gray-900'}`}>
//                                     {tool.name}
//                                   </span>
//                                   <div className="flex items-center space-x-2">
//                                     {isConnected ? (
//                                       <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">
//                                         Connected
//                                       </span>
//                                     ) : (
//                                       <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full font-medium">
//                                         Not Connected
//                                       </span>
//                                     )}
//                                     {isActive && (
//                                       <CheckCircle2 className="w-4 h-4 text-purple-600" />
//                                     )}
//                                   </div>
//                                 </div>
//                                 <p className="text-xs text-gray-500 mt-1">{tool.description}</p>
//                                 {isConnected && (
//                                   <p className="text-xs text-green-600 mt-1 font-medium">
//                                     {tool.id === 'gmail' ? authenticatedEmail : odooConnection?.username}
//                                   </p>
//                                 )}
//                               </div>
//                             </button>
//                           );
//                         })}
                        
//                         {/* Connect Services Button */}
//                         <div className="mt-3 pt-3 border-t border-gray-200">
//                           {onGmailSetup && (
//                             <button
//                               onClick={() => {
//                                 setShowToolsMenu(false);
//                                 onGmailSetup();
//                               }}
//                               className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
//                             >
//                               Connect New Service
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Selected Source Indicator */}
//                 <div className="flex items-center space-x-1 text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
//                   {selectedTool?.icon && <selectedTool.icon className="w-4 h-4" />}
//                   <span>{selectedTool?.name}</span>
//                   {isConnected() && <span className="w-2 h-2 bg-green-400 rounded-full ml-1"></span>}
//                 </div>
//               </div>

//               <div className="mb-6">
//                 <textarea
//                   placeholder={isConnected() ? `Search your ${selectedTool?.name} data...` : `Please authenticate ${selectedTool?.name} first...`}
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   onFocus={() => setIsInputFocused(true)}
//                   onBlur={() => setIsInputFocused(false)}
//                   onKeyPress={handleKeyPress}
//                   disabled={!isConnected() || isLoading}
//                   className="w-full h-10 text-base bg-transparent border-none resize-none focus:outline-none text-gray-800 placeholder-gray-400 disabled:text-gray-500"
//                 />
//               </div>

//               {error && <ErrorDisplay error={error} />}

//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-4">
//                   <button 
//                     type="button"
//                     className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 text-sm transition-colors"
//                     disabled={!isConnected()}
//                   >
//                     <Paperclip className="w-4 h-4" />
//                     <span>Add Attachment</span>
//                   </button>
//                   <button 
//                     type="button"
//                     className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 text-sm transition-colors"
//                     disabled={!isConnected()}
//                   >
//                     <Image className="w-4 h-4" />
//                     <span>Use Image</span>
//                   </button>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <span className="text-gray-400 text-sm">{query.length}/1000</span>
//                   <button 
//                     onClick={handleSubmit}
//                     disabled={!isConnected() || isLoading || !query.trim()}
//                     className={`w-8 h-8 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center transition-all disabled:bg-gray-400 disabled:cursor-not-allowed ${
//                       query.length > 0 && !isLoading ? 'scale-110 shadow-md' : ''
//                     }`}
//                   >
//                     {isLoading ? (
//                       <Loader2 className="w-4 h-4 animate-spin" />
//                     ) : (
//                       <Send className="w-4 h-4" />
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="w-full max-w-6xl">
//             <h2 className="text-xl font-medium text-gray-800 mb-6">Your recent chats</h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {recentChats.map((chat, index) => (
//                 <div
//                   key={index}
//                   className="bg-white rounded-xl border border-gray-200 p-6 hover:border-purple-300 hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:-translate-y-1"
//                   onClick={() => {
//                     if (isConnected()) {
//                       setQuery(chat.title);
//                     }
//                   }}
//                 >
//                   <div className="flex items-start space-x-3">
//                     <MessageCircle className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
//                     <div className="flex-1">
//                       <h3 className="text-gray-800 font-medium leading-snug mb-3">{chat.title}</h3>
//                       <p className="text-gray-500 text-sm">{chat.timeAgo}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HomePage;




// import React, { useState, useEffect, useRef } from 'react';
// import { Send, Mail, AlertCircle, CheckCircle2, Loader2, Paperclip, Image, MessageCircle, ShieldAlert, RefreshCw, ChevronDown, Database, Settings } from 'lucide-react';

// const HomePage = ({ onGmailSetup, onLogout }) => {
//   const [query, setQuery] = useState('');
//   const [isInputFocused, setIsInputFocused] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [conversations, setConversations] = useState([]);
//   const [error, setError] = useState('');
//   const [authenticatedEmail, setAuthenticatedEmail] = useState(null);
//   const [odooConnection, setOdooConnection] = useState(null);
//   const [selectedSource, setSelectedSource] = useState('gmail');
//   const [showToolsMenu, setShowToolsMenu] = useState(false);
//   const conversationRef = useRef(null);
  
//   useEffect(() => {
//     const getConnectionsFromStorage = () => {
//       const storedEmail = localStorage.getItem('authenticatedEmail');
//       setAuthenticatedEmail(storedEmail);
      
//       const storedOdoo = localStorage.getItem('odooConnection');
//       if (storedOdoo) {
//         try {
//           const odooDetails = JSON.parse(storedOdoo);
//           setOdooConnection(odooDetails);
//         } catch (error) {
//           console.error('Error parsing Odoo connection:', error);
//           localStorage.removeItem('odooConnection');
//         }
//       } else {
//         setOdooConnection(null);
//       }
      
//       console.log('HomePage loaded connections - Gmail:', storedEmail, 'Odoo:', storedOdoo);
//     };

//     getConnectionsFromStorage();

//     const handleStorageChange = (e) => {
//       if (e.key === 'authenticatedEmail' || e.key === 'odooConnection') {
//         getConnectionsFromStorage();
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);
//     const interval = setInterval(getConnectionsFromStorage, 1000);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       clearInterval(interval);
//     };
//   }, []);

//   // Auto-scroll to latest message
//   useEffect(() => {
//     if (conversationRef.current && conversations.length > 0) {
//       setTimeout(() => {
//         conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
//       }, 100);
//     }
//   }, [conversations]);

//   const handleLogout = () => {
//     localStorage.removeItem('authenticatedEmail');
//     localStorage.removeItem('odooConnection');
//     setAuthenticatedEmail(null);
//     setOdooConnection(null);
//     if (onLogout) {
//       onLogout();
//     }
//   };

//   const getActiveConnection = () => {
//     if (selectedSource === 'gmail') {
//       return authenticatedEmail;
//     } else if (selectedSource === 'odoo') {
//       return odooConnection?.username;
//     }
//     return null;
//   };

//   const isConnected = () => {
//     if (selectedSource === 'gmail') {
//       return !!authenticatedEmail;
//     } else if (selectedSource === 'odoo') {
//       return !!odooConnection;
//     }
//     return false;
//   };

//   const tools = [
//     {
//       id: 'gmail',
//       name: 'Gmail',
//       icon: Mail,
//       description: 'Search your Gmail emails',
//       connected: !!authenticatedEmail
//     },
//     {
//       id: 'odoo',
//       name: 'Odoo',
//       icon: Database,
//       description: 'Search your Odoo data',
//       connected: !!odooConnection
//     }
//   ];

//   const recentChats = [
//     {
//       title: "Show me all contacts living in Berlin",
//       timeAgo: "6 Hours"
//     },
//     {
//       title: "My last touch points with Lukas",
//       timeAgo: "12 Hours"
//     },
//     {
//       title: "Who in my network is an SaaS expert",
//       timeAgo: "18 Hours"
//     }
//   ];

//   const parseError = (errorMessage) => {
//     if (errorMessage.includes('401') || errorMessage.includes('No valid credentials')) {
//       return {
//         type: 'auth',
//         title: 'Authentication Required',
//         message: `Your ${selectedSource} connection has expired or is invalid. Please reconnect your ${selectedSource} account to continue searching.`,
//         action: `Reconnect ${selectedSource.charAt(0).toUpperCase() + selectedSource.slice(1)}`
//       };
//     }
    
//     if (errorMessage.includes('500') || errorMessage.includes('API Error')) {
//       return {
//         type: 'server',
//         title: 'Server Error',
//         message: 'Something went wrong on our end. Please try again in a moment.',
//         action: 'Try Again'
//       };
//     }
    
//     if (errorMessage.includes('NetworkError') || errorMessage.includes('fetch')) {
//       return {
//         type: 'network',
//         title: 'Connection Error',
//         message: 'Unable to connect to our servers. Please check your internet connection.',
//         action: 'Retry'
//       };
//     }
    
//     return {
//       type: 'general',
//       title: 'Something went wrong',
//       message: 'An unexpected error occurred. Please try again.',
//       action: 'Try Again'
//     };
//   };

//   const handleSubmit = async () => {
//     if (!query.trim()) {
//       setError('Please enter a query');
//       return;
//     }

//     const activeConnection = getActiveConnection();
//     if (!activeConnection) {
//       setError(`Please authenticate your ${selectedSource} connection first`);
//       return;
//     }

//     setIsLoading(true);
//     setError('');

//     const userMessage = {
//       id: Date.now(),
//       type: 'user',
//       content: query.trim(),
//       source: selectedSource,
//       timestamp: new Date()
//     };
    
//     const currentQuery = query.trim();
//     setQuery('');
//     setConversations(prev => [...prev, userMessage]);

//     try {
//       let payload = {
//         query: currentQuery,
//         max_results: 10,
//         source: selectedSource
//       };

//       if (selectedSource === 'gmail') {
//         payload.gmail_address = authenticatedEmail;
//       } else if (selectedSource === 'odoo') {
//         payload.gmail_address = odooConnection?.username;
//       }

//       console.log('Search payload:', payload);

//       const response = await fetch(`${import.meta.env.VITE_SEARCH_URL}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload)
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('API Response:', data);
        
//         const assistantMessage = {
//           id: Date.now() + 1,
//           type: 'assistant',
//           content: {
//             results: data.results || [],
//             summary: data.summary,
//             source: data.source || selectedSource
//           },
//           timestamp: new Date()
//         };
        
//         setConversations(prev => [...prev, assistantMessage]);
//       } else {
//         const errorData = await response.text();
//         throw new Error(`API Error: ${response.status} - ${errorData}`);
//       }
//     } catch (error) {
//       console.error('Search error:', error);
//       setError(`Failed to search: ${error.message}`);
//       setConversations(prev => prev.slice(0, -1));
//       setQuery(currentQuery);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit();
//     }
//   };

//   const formatDate = (timestamp) => {
//     try {
//       let date;
      
//       if (typeof timestamp === 'string' && timestamp.includes('-')) {
//         date = new Date(timestamp);
//       } else if (typeof timestamp === 'string' && timestamp.length > 10) {
//         date = new Date(parseInt(timestamp));
//       } else if (typeof timestamp === 'number') {
//         date = new Date(timestamp);
//       } else {
//         date = new Date(timestamp);
//       }

//       if (isNaN(date.getTime())) {
//         return timestamp;
//       }

//       return date.toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       });
//     } catch {
//       return timestamp;
//     }
//   };

//   const handleErrorAction = (errorInfo) => {
//     if (errorInfo.type === 'auth' && onGmailSetup) {
//       onGmailSetup();
//     } else {
//       setError('');
//     }
//   };

//   const selectTool = (toolId) => {
//     setSelectedSource(toolId);
//     setShowToolsMenu(false);
//     setError('');
//   };

//   const selectedTool = tools.find(tool => tool.id === selectedSource);

//   const renderResult = (result, index, source) => {
//     const isOdooResult = source === 'odoo';
    
//     let title, fromField, dateField, contentField, linkField, additionalInfo;
    
//     if (isOdooResult) {
//       title = result.display_name || result.partner_name || result.name || 'Untitled Record';
//       fromField = result.email_from || result.email_normalized || result.partner_name;
//       dateField = result.create_date || result.write_date || result.date_open;
//       contentField = result.description || 
//                    (result.expected_revenue ? `Expected Revenue: $${result.expected_revenue}` : '') ||
//                    (result.stage_id ? `Stage: ${Array.isArray(result.stage_id) ? result.stage_id[1] : result.stage_id}` : '');
//       linkField = result.website;
      
//       additionalInfo = [];
//       if (result.phone) additionalInfo.push(`Phone: ${result.phone}`);
//       if (result.expected_revenue) additionalInfo.push(`Revenue: $${result.expected_revenue}`);
//       if (result.probability) additionalInfo.push(`Probability: ${result.probability}%`);
//       if (result.stage_id && Array.isArray(result.stage_id)) additionalInfo.push(`Stage: ${result.stage_id[1]}`);
//       if (result.user_id && Array.isArray(result.user_id)) additionalInfo.push(`Assigned to: ${result.user_id[1]}`);
//       if (result.city) additionalInfo.push(`Location: ${result.city}`);
//     } else {
//       title = result.subject || 'No Subject';
//       fromField = result.from;
//       dateField = result.date;
//       contentField = result.snippet;
//       linkField = result.link;
//       additionalInfo = [];
//     }

//     return (
//       <div
//         key={result.id || index}
//         className="bg-white rounded-xl border border-gray-200 p-4 hover:border-purple-300 hover:shadow-md transition-all duration-200"
//       >
//         <div className="space-y-3">
//           <h3 className="text-base font-semibold text-gray-900 leading-tight">
//             {title}
//           </h3>
          
//           <div className="flex items-center justify-between text-sm text-gray-600 flex-wrap gap-2">
//             {fromField && (
//               <span className="flex items-center">
//                 <span className="font-medium">
//                   {isOdooResult ? 'Contact:' : 'From:'}
//                 </span>
//                 <span className="ml-1">{fromField}</span>
//               </span>
//             )}
//             {dateField && (
//               <span className="text-gray-500 text-xs">
//                 {formatDate(dateField)}
//               </span>
//             )}
//           </div>

//           {isOdooResult && additionalInfo.length > 0 && (
//             <div className="flex flex-wrap gap-1">
//               {additionalInfo.map((info, idx) => (
//                 <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
//                   {info}
//                 </span>
//               ))}
//             </div>
//           )}
          
//           {contentField && (
//             <p className="text-gray-700 leading-relaxed text-sm">
//               {contentField}
//             </p>
//           )}
          
//           {linkField && (
//             <div className="pt-2">
//               <a
//                 href={linkField}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center text-sm text-purple-600 hover:text-purple-700 hover:underline"
//               >
//                 {isOdooResult ? (
//                   <>
//                     <Database className="w-4 h-4 mr-1" />
//                     {linkField.includes('http') ? 'Visit Website' : 'Open in Odoo'}
//                   </>
//                 ) : (
//                   <>
//                     <Mail className="w-4 h-4 mr-1" />
//                     Open in Gmail
//                   </>
//                 )}
//               </a>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   const ErrorDisplay = ({ error }) => {
//     const errorInfo = parseError(error);
    
//     const getErrorIcon = (type) => {
//       switch (type) {
//         case 'auth':
//           return <ShieldAlert className="w-5 h-5" />;
//         case 'server':
//           return <AlertCircle className="w-5 h-5" />;
//         case 'network':
//           return <RefreshCw className="w-5 h-5" />;
//         default:
//           return <AlertCircle className="w-5 h-5" />;
//       }
//     };

//     const getErrorColors = (type) => {
//       switch (type) {
//         case 'auth':
//           return {
//             bg: 'bg-orange-50',
//             border: 'border-orange-200',
//             text: 'text-orange-800',
//             icon: 'text-orange-600',
//             button: 'bg-orange-600 hover:bg-orange-700'
//           };
//         case 'server':
//           return {
//             bg: 'bg-red-50',
//             border: 'border-red-200',
//             text: 'text-red-800',
//             icon: 'text-red-600',
//             button: 'bg-red-600 hover:bg-red-700'
//           };
//         case 'network':
//           return {
//             bg: 'bg-blue-50',
//             border: 'border-blue-200',
//             text: 'text-blue-800',
//             icon: 'text-blue-600',
//             button: 'bg-blue-600 hover:bg-blue-700'
//           };
//         default:
//           return {
//             bg: 'bg-gray-50',
//             border: 'border-gray-200',
//             text: 'text-gray-800',
//             icon: 'text-gray-600',
//             button: 'bg-gray-600 hover:bg-gray-700'
//           };
//       }
//     };

//     const colors = getErrorColors(errorInfo.type);

//     return (
//       <div className={`mb-4 p-4 ${colors.bg} ${colors.border} border rounded-xl`}>
//         <div className="flex items-start space-x-3">
//           <div className={`${colors.icon} flex-shrink-0 mt-0.5`}>
//             {getErrorIcon(errorInfo.type)}
//           </div>
//           <div className="flex-1 min-w-0">
//             <h4 className={`font-medium ${colors.text} mb-1`}>
//               {errorInfo.title}
//             </h4>
//             <p className={`text-sm ${colors.text} opacity-90 leading-relaxed`}>
//               {errorInfo.message}
//             </p>
//           </div>
//           <button
//             onClick={() => handleErrorAction(errorInfo)}
//             className={`flex-shrink-0 px-3 py-1.5 ${colors.button} text-white text-sm font-medium rounded-lg transition-colors`}
//           >
//             {errorInfo.action}
//           </button>
//         </div>
//       </div>
//     );
//   };

//   const hasConversations = conversations.length > 0;

//   return (
//     <div className="flex-1 flex flex-col bg-gray-50">
//       {hasConversations ? (
//         /* Conversation View - After First Query */
//         <div className="h-screen flex flex-col">
//           {/* Header - Connection Status */}
//           <div className="border-b border-gray-200 bg-white px-8 py-4 flex-shrink-0">
//             <div className="max-w-4xl mx-auto">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h1 className="text-xl font-medium text-gray-800">Good Evening, Kunal</h1>
//                   <p className="text-sm text-gray-500">Enter a keyword to get anything from your data!</p>
//                 </div>
                
//                 <div className="flex items-center space-x-4 text-xs">
//                   <span className={`flex items-center space-x-1 ${authenticatedEmail ? 'text-green-600' : 'text-gray-400'}`}>
//                     <Mail className="w-3 h-3" />
//                     <span>Gmail {authenticatedEmail ? '✓' : '✗'}</span>
//                   </span>
//                   <span className={`flex items-center space-x-1 ${odooConnection ? 'text-green-600' : 'text-gray-400'}`}>
//                     <Database className="w-3 h-3" />
//                     <span>Odoo {odooConnection ? '✓' : '✗'}</span>
//                   </span>
//                   {(authenticatedEmail || odooConnection) && (
//                     <button
//                       onClick={handleLogout}
//                       className="text-red-600 hover:text-red-700 underline"
//                     >
//                       Disconnect All
//                     </button>
//                   )}
//                   {onGmailSetup && (
//                     <button
//                       onClick={onGmailSetup}
//                       className="bg-purple-500 text-white px-3 py-1 rounded-lg hover:bg-purple-600"
//                     >
//                       Connect Services
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Scrollable Conversation Area */}
//           <div ref={conversationRef} className="flex-1 overflow-y-auto px-8 py-6">
//             <div className="max-w-4xl mx-auto space-y-6">
//               {conversations.map((message) => (
//                 <div key={message.id} className="space-y-4">
//                   {message.type === 'user' ? (
//                     <div className="flex justify-end">
//                       <div className="bg-purple-600 text-white rounded-2xl px-4 py-3 max-w-xl">
//                         <p className="text-sm">{message.content}</p>
//                         <div className="flex items-center space-x-2 mt-2 text-xs text-purple-200">
//                           {message.source === 'gmail' ? <Mail className="w-3 h-3" /> : <Database className="w-3 h-3" />}
//                           <span>{message.source}</span>
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="flex justify-start">
//                       <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-4xl w-full shadow-sm">
//                         {message.content.summary && (
//                           <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
//                             <h3 className="text-lg font-medium text-blue-900 mb-2">Summary</h3>
//                             <p className="text-blue-800 leading-relaxed">{message.content.summary}</p>
//                             <div className="mt-2 text-sm text-blue-600">
//                               Source: {message.content.source} • {message.content.results.length} results found
//                             </div>
//                           </div>
//                         )}
                        
//                         <h3 className="text-lg font-medium text-gray-900 mb-4">
//                           {message.content.results.length} Results Found
//                         </h3>
                        
//                         <div className="space-y-3">
//                           {message.content.results.map((result, index) => 
//                             renderResult(result, index, message.content.source)
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
              
//               {isLoading && (
//                 <div className="flex justify-start">
//                   <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-xl shadow-sm">
//                     <div className="flex items-center space-x-3">
//                       <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
//                       <span className="text-gray-600">Searching...</span>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Sticky Bottom Input */}
//           <div className="border-t border-gray-200 bg-white px-8 py-4 flex-shrink-0">
//             <div className="max-w-4xl mx-auto">
//               <div className="flex items-center space-x-3 bg-gray-100 rounded-full px-4 py-3">
//                 {/* Selected Tool Icon with Green Dot */}
//                 <div className="relative">
//                   <div className="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors">
//                     {selectedTool?.icon && <selectedTool.icon className="w-4 h-4 text-gray-600" />}
//                   </div>
//                   {selectedTool?.connected && (
//                     <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
//                   )}
//                 </div>

//                 {/* Tools Button */}
//                 <div className="relative">
//                   <button
//                     onClick={() => setShowToolsMenu(!showToolsMenu)}
//                     className="flex items-center space-x-2 bg-gray-200 hover:bg-gray-300 px-3 py-1.5 rounded-full text-gray-700 transition-colors"
//                   >
//                     <Settings className="w-4 h-4" />
//                     <span className="text-sm font-medium">Tools</span>
//                   </button>

//                   {showToolsMenu && (
//                     <div className="absolute bottom-full mb-2 left-0 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
//                       <div className="p-3">
//                         <div className="mb-3">
//                           <h4 className="text-sm font-medium text-gray-700 mb-2">Select Data Source</h4>
//                         </div>
//                         {tools.map((tool) => {
//                           const Icon = tool.icon;
//                           const isActive = selectedSource === tool.id;
//                           const isConnected = tool.connected;
                          
//                           return (
//                             <button
//                               key={tool.id}
//                               onClick={() => selectTool(tool.id)}
//                               className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all mb-2 ${
//                                 isActive 
//                                   ? 'bg-purple-50 border-2 border-purple-200 shadow-sm' 
//                                   : 'hover:bg-gray-50 border-2 border-transparent'
//                               }`}
//                             >
//                               <div className="relative">
//                                 <Icon className={`w-6 h-6 ${isActive ? 'text-purple-600' : 'text-gray-500'}`} />
//                                 {isConnected && (
//                                   <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
//                                 )}
//                               </div>
                              
//                               <div className="flex-1">
//                                 <div className="flex items-center justify-between">
//                                   <span className={`font-medium ${isActive ? 'text-purple-900' : 'text-gray-900'}`}>
//                                     {tool.name}
//                                   </span>
//                                   <div className="flex items-center space-x-2">
//                                     {isConnected ? (
//                                       <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">
//                                         Connected
//                                       </span>
//                                     ) : (
//                                       <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full font-medium">
//                                         Not Connected
//                                       </span>
//                                     )}
//                                     {isActive && (
//                                       <CheckCircle2 className="w-4 h-4 text-purple-600" />
//                                     )}
//                                   </div>
//                                 </div>
//                                 <p className="text-xs text-gray-500 mt-1">{tool.description}</p>
//                                 {isConnected && (
//                                   <p className="text-xs text-green-600 mt-1 font-medium">
//                                     {tool.id === 'gmail' ? authenticatedEmail : odooConnection?.username}
//                                   </p>
//                                 )}
//                               </div>
//                             </button>
//                           );
//                         })}
                        
//                         {/* Connect Services Button */}
//                         <div className="mt-3 pt-3 border-t border-gray-200">
//                           {onGmailSetup && (
//                             <button
//                               onClick={() => {
//                                 setShowToolsMenu(false);
//                                 onGmailSetup();
//                               }}
//                               className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
//                             >
//                               Connect New Service
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Input Field */}
//                 <div className="flex-1">
//                   <input
//                     type="text"
//                     placeholder="Ask anything"
//                     value={query}
//                     onChange={(e) => setQuery(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                     disabled={!isConnected() || isLoading}
//                     className="w-full bg-transparent border-none focus:outline-none text-gray-800 placeholder-gray-500 disabled:text-gray-400 text-base"
//                   />
//                 </div>

//                 {/* Right Side Buttons */}
//                 <div className="flex items-center space-x-2">
//                   {/* Mic Button */}
//                   {/* <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm">
//                     <span className="text-gray-600 text-sm">🎤</span>
//                   </button> */}

//                   {/* Send/Action Button */}
//                   <button 
//                     onClick={handleSubmit}
//                     disabled={!isConnected() || isLoading || !query.trim()}
//                     className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
//                   >
//                     {isLoading ? (
//                       <Loader2 className="w-3 h-3 animate-spin" />
//                     ) : (
//                       <Send className="w-3 h-3" />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {error && (
//                 <div className="mt-3">
//                   <ErrorDisplay error={error} />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       ) : (
//         /* Initial Landing View - Centered Layout */
//         <div className="min-h-screen flex flex-col items-center justify-center px-8 py-16 overflow-auto">
          
//           <div className="text-center mb-12">
//             <h1 className="text-2xl font-medium text-gray-800 mb-2">Good Evening, Kunal</h1>
//             <p className="text-gray-500 text-base">Enter a Keyword to get anything from your data!</p>
            
//             {/* Connection Status */}
//             <div className="mt-4 space-y-2">
//               {/* Current Source Status */}
//               {isConnected() ? (
//                 <div className="flex items-center justify-center space-x-4">
//                   <p className="text-sm text-green-600">
//                     ✅ {selectedTool?.name} Connected: {getActiveConnection()}
//                   </p>
//                   <button
//                     onClick={handleLogout}
//                     className="text-xs text-red-600 hover:text-red-700 underline"
//                   >
//                     Disconnect All
//                   </button>
//                 </div>
//               ) : (
//                 <div className="flex items-center justify-center space-x-4">
//                   <p className="text-sm text-orange-600">
//                     ⚠️ Please authenticate your {selectedTool?.name} connection first
//                   </p>
//                   {onGmailSetup && (
//                     <button
//                       onClick={onGmailSetup}
//                       className="text-sm bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
//                     >
//                       Connect Services
//                     </button>
//                   )}
//                 </div>
//               )}

//               {/* All Connections Status */}
//               <div className="flex items-center justify-center space-x-6 text-xs">
//                 <span className={`flex items-center space-x-1 ${authenticatedEmail ? 'text-green-600' : 'text-gray-400'}`}>
//                   <Mail className="w-3 h-3" />
//                   <span>Gmail {authenticatedEmail ? '✓' : '✗'}</span>
//                 </span>
//                 <span className={`flex items-center space-x-1 ${odooConnection ? 'text-green-600' : 'text-gray-400'}`}>
//                   <Database className="w-3 h-3" />
//                   <span>Odoo {odooConnection ? '✓' : '✗'}</span>
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="w-full max-w-3xl">
//             <div className={`bg-white rounded-2xl border shadow-sm p-6 mb-12 transition-all duration-200 ${
//               isInputFocused 
//                 ? 'border-purple-300 shadow-lg ring-2 ring-purple-100' 
//                 : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
//             }`}>
//               <div className="flex items-center justify-between mb-6">
//                 {/* Tools Menu */}
//                 <div className="relative">
//                   <button
//                     onClick={() => setShowToolsMenu(!showToolsMenu)}
//                     className="flex items-center space-x-2 bg-purple-100 hover:bg-purple-200 px-3 py-2 rounded-xl text-gray-700 transition-colors"
//                   >
//                     <Settings className="w-4 h-4" />
//                     <span className="text-sm font-medium">Tools</span>
//                     <ChevronDown className={`w-4 h-4 transition-transform ${showToolsMenu ? 'rotate-180' : ''}`} />
//                   </button>

//                   {showToolsMenu && (
//                     <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
//                       <div className="p-3">
//                         <div className="mb-3">
//                           <h4 className="text-sm font-medium text-gray-700 mb-2">Select Data Source</h4>
//                         </div>
//                         {tools.map((tool) => {
//                           const Icon = tool.icon;
//                           const isActive = selectedSource === tool.id;
//                           const isConnected = tool.connected;
                          
//                           return (
//                             <button
//                               key={tool.id}
//                               onClick={() => selectTool(tool.id)}
//                               className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all mb-2 ${
//                                 isActive 
//                                   ? 'bg-purple-50 border-2 border-purple-200 shadow-sm' 
//                                   : 'hover:bg-gray-50 border-2 border-transparent'
//                               }`}
//                             >
//                               <div className="relative">
//                                 <Icon className={`w-6 h-6 ${isActive ? 'text-purple-600' : 'text-gray-500'}`} />
//                                 {isConnected && (
//                                   <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
//                                 )}
//                               </div>
                              
//                               <div className="flex-1">
//                                 <div className="flex items-center justify-between">
//                                   <span className={`font-medium ${isActive ? 'text-purple-900' : 'text-gray-900'}`}>
//                                     {tool.name}
//                                   </span>
//                                   <div className="flex items-center space-x-2">
//                                     {isConnected ? (
//                                       <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">
//                                         Connected
//                                       </span>
//                                     ) : (
//                                       <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full font-medium">
//                                         Not Connected
//                                       </span>
//                                     )}
//                                     {isActive && (
//                                       <CheckCircle2 className="w-4 h-4 text-purple-600" />
//                                     )}
//                                   </div>
//                                 </div>
//                                 <p className="text-xs text-gray-500 mt-1">{tool.description}</p>
//                                 {isConnected && (
//                                   <p className="text-xs text-green-600 mt-1 font-medium">
//                                     {tool.id === 'gmail' ? authenticatedEmail : odooConnection?.username}
//                                   </p>
//                                 )}
//                               </div>
//                             </button>
//                           );
//                         })}
                        
//                         {/* Connect Services Button */}
//                         <div className="mt-3 pt-3 border-t border-gray-200">
//                           {onGmailSetup && (
//                             <button
//                               onClick={() => {
//                                 setShowToolsMenu(false);
//                                 onGmailSetup();
//                               }}
//                               className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
//                             >
//                               Connect New Service
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Selected Source Indicator */}
//                 <div className="flex items-center space-x-1 text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
//                   {selectedTool?.icon && <selectedTool.icon className="w-4 h-4" />}
//                   <span>{selectedTool?.name}</span>
//                   {isConnected() && <span className="w-2 h-2 bg-green-400 rounded-full ml-1"></span>}
//                 </div>
//               </div>

//               <div className="mb-6">
//                 <textarea
//                   placeholder={isConnected() ? `Search your ${selectedTool?.name} data...` : `Please authenticate ${selectedTool?.name} first...`}
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   onFocus={() => setIsInputFocused(true)}
//                   onBlur={() => setIsInputFocused(false)}
//                   onKeyPress={handleKeyPress}
//                   disabled={!isConnected() || isLoading}
//                   className="w-full h-10 text-base bg-transparent border-none resize-none focus:outline-none text-gray-800 placeholder-gray-400 disabled:text-gray-500"
//                 />
//               </div>

//               {error && <ErrorDisplay error={error} />}

//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-4">
//                   <button 
//                     type="button"
//                     className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 text-sm transition-colors"
//                     disabled={!isConnected()}
//                   >
//                     <Paperclip className="w-4 h-4" />
//                     <span>Add Attachment</span>
//                   </button>
//                   <button 
//                     type="button"
//                     className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 text-sm transition-colors"
//                     disabled={!isConnected()}
//                   >
//                     <Image className="w-4 h-4" />
//                     <span>Use Image</span>
//                   </button>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <span className="text-gray-400 text-sm">{query.length}/1000</span>
//                   <button 
//                     onClick={handleSubmit}
//                     disabled={!isConnected() || isLoading || !query.trim()}
//                     className={`w-8 h-8 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center transition-all disabled:bg-gray-400 disabled:cursor-not-allowed ${
//                       query.length > 0 && !isLoading ? 'scale-110 shadow-md' : ''
//                     }`}
//                   >
//                     {isLoading ? (
//                       <Loader2 className="w-4 h-4 animate-spin" />
//                     ) : (
//                       <Send className="w-4 h-4" />
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="w-full max-w-6xl">
//             <h2 className="text-xl font-medium text-gray-800 mb-6">Your recent chats</h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {recentChats.map((chat, index) => (
//                 <div
//                   key={index}
//                   className="bg-white rounded-xl border border-gray-200 p-6 hover:border-purple-300 hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:-translate-y-1"
//                   onClick={() => {
//                     if (isConnected()) {
//                       setQuery(chat.title);
//                     }
//                   }}
//                 >
//                   <div className="flex items-start space-x-3">
//                     <MessageCircle className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
//                     <div className="flex-1">
//                       <h3 className="text-gray-800 font-medium leading-snug mb-3">{chat.title}</h3>
//                       <p className="text-gray-500 text-sm">{chat.timeAgo}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HomePage;




// import React, { useState, useEffect, useRef } from 'react';
// import { Send, Mail, AlertCircle, CheckCircle2, Loader2, Paperclip, Image, MessageCircle, ShieldAlert, RefreshCw, ChevronDown, Database, Settings } from 'lucide-react';

// const HomePage = ({ onGmailSetup, onLogout }) => {
//   const [query, setQuery] = useState('');
//   const [isInputFocused, setIsInputFocused] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [conversations, setConversations] = useState([]);
//   const [error, setError] = useState('');
//   const [authenticatedEmail, setAuthenticatedEmail] = useState(null);
//   const [odooConnection, setOdooConnection] = useState(null);
//   const [selectedSource, setSelectedSource] = useState('gmail');
//   const [showToolsMenu, setShowToolsMenu] = useState(false);
//   const conversationRef = useRef(null);
  
//   useEffect(() => {
//     const getConnectionsFromStorage = () => {
//       const storedEmail = localStorage.getItem('authenticatedEmail');
//       setAuthenticatedEmail(storedEmail);
      
//       const storedOdoo = localStorage.getItem('odooConnection');
//       if (storedOdoo) {
//         try {
//           const odooDetails = JSON.parse(storedOdoo);
//           setOdooConnection(odooDetails);
//         } catch (error) {
//           console.error('Error parsing Odoo connection:', error);
//           localStorage.removeItem('odooConnection');
//         }
//       } else {
//         setOdooConnection(null);
//       }
      
//       console.log('HomePage loaded connections - Gmail:', storedEmail, 'Odoo:', storedOdoo);
//     };

//     getConnectionsFromStorage();

//     const handleStorageChange = (e) => {
//       if (e.key === 'authenticatedEmail' || e.key === 'odooConnection') {
//         getConnectionsFromStorage();
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);
//     const interval = setInterval(getConnectionsFromStorage, 1000);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       clearInterval(interval);
//     };
//   }, []);

//   // Auto-scroll to latest message
//   useEffect(() => {
//     if (conversationRef.current && conversations.length > 0) {
//       setTimeout(() => {
//         conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
//       }, 100);
//     }
//   }, [conversations]);

//   const handleLogout = () => {
//     localStorage.removeItem('authenticatedEmail');
//     localStorage.removeItem('odooConnection');
//     setAuthenticatedEmail(null);
//     setOdooConnection(null);
//     if (onLogout) {
//       onLogout();
//     }
//   };

//   const getActiveConnection = () => {
//     if (selectedSource === 'gmail') {
//       return authenticatedEmail;
//     } else if (selectedSource === 'odoo') {
//       return odooConnection?.username;
//     }
//     return null;
//   };

//   const isConnected = () => {
//     if (selectedSource === 'gmail') {
//       return !!authenticatedEmail;
//     } else if (selectedSource === 'odoo') {
//       return !!odooConnection;
//     }
//     return false;
//   };

//   const tools = [
//     {
//       id: 'gmail',
//       name: 'Gmail',
//       icon: Mail,
//       description: 'Search your Gmail emails',
//       connected: !!authenticatedEmail
//     },
//     {
//       id: 'odoo',
//       name: 'Odoo',
//       icon: Database,
//       description: 'Search your Odoo data',
//       connected: !!odooConnection
//     }
//   ];

//   const recentChats = [
//     {
//       title: "Show me all contacts living in Berlin",
//       timeAgo: "6 Hours"
//     },
//     {
//       title: "My last touch points with Lukas",
//       timeAgo: "12 Hours"
//     },
//     {
//       title: "Who in my network is an SaaS expert",
//       timeAgo: "18 Hours"
//     }
//   ];

//   const parseError = (errorMessage) => {
//     if (errorMessage.includes('401') || errorMessage.includes('No valid credentials')) {
//       return {
//         type: 'auth',
//         title: 'Authentication Required',
//         message: `Your ${selectedSource} connection has expired or is invalid. Please reconnect your ${selectedSource} account to continue searching.`,
//         action: `Reconnect ${selectedSource.charAt(0).toUpperCase() + selectedSource.slice(1)}`
//       };
//     }
    
//     if (errorMessage.includes('500') || errorMessage.includes('API Error')) {
//       return {
//         type: 'server',
//         title: 'Server Error',
//         message: 'Something went wrong on our end. Please try again in a moment.',
//         action: 'Try Again'
//       };
//     }
    
//     if (errorMessage.includes('NetworkError') || errorMessage.includes('fetch')) {
//       return {
//         type: 'network',
//         title: 'Connection Error',
//         message: 'Unable to connect to our servers. Please check your internet connection.',
//         action: 'Retry'
//       };
//     }
    
//     return {
//       type: 'general',
//       title: 'Something went wrong',
//       message: 'An unexpected error occurred. Please try again.',
//       action: 'Try Again'
//     };
//   };

//   const handleSubmit = async () => {
//     if (!query.trim()) {
//       setError('Please enter a query');
//       return;
//     }

//     const activeConnection = getActiveConnection();
//     if (!activeConnection) {
//       setError(`Please authenticate your ${selectedSource} connection first`);
//       return;
//     }

//     setIsLoading(true);
//     setError('');

//     const userMessage = {
//       id: Date.now(),
//       type: 'user',
//       content: query.trim(),
//       source: selectedSource,
//       timestamp: new Date()
//     };
    
//     const currentQuery = query.trim();
//     setQuery('');
//     setConversations(prev => [...prev, userMessage]);

//     try {
//       let payload = {
//         query: currentQuery,
//         max_results: 10,
//         source: selectedSource
//       };

//       if (selectedSource === 'gmail') {
//         payload.gmail_address = authenticatedEmail;
//       } else if (selectedSource === 'odoo') {
//         payload.gmail_address = odooConnection?.username;
//       }

//       console.log('Search payload:', payload);

//       const response = await fetch(`${import.meta.env.VITE_SEARCH_URL}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload)
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('API Response:', data);
        
//         const assistantMessage = {
//           id: Date.now() + 1,
//           type: 'assistant',
//           content: {
//             results: data.results || [],
//             summary: data.summary,
//             source: data.source || selectedSource
//           },
//           timestamp: new Date()
//         };
        
//         setConversations(prev => [...prev, assistantMessage]);
//       } else {
//         const errorData = await response.text();
//         throw new Error(`API Error: ${response.status} - ${errorData}`);
//       }
//     } catch (error) {
//       console.error('Search error:', error);
//       setError(`Failed to search: ${error.message}`);
//       setConversations(prev => prev.slice(0, -1));
//       setQuery(currentQuery);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit();
//     }
//   };

//   const formatDate = (timestamp) => {
//     try {
//       let date;
      
//       if (typeof timestamp === 'string' && timestamp.includes('-')) {
//         date = new Date(timestamp);
//       } else if (typeof timestamp === 'string' && timestamp.length > 10) {
//         date = new Date(parseInt(timestamp));
//       } else if (typeof timestamp === 'number') {
//         date = new Date(timestamp);
//       } else {
//         date = new Date(timestamp);
//       }

//       if (isNaN(date.getTime())) {
//         return timestamp;
//       }

//       return date.toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       });
//     } catch {
//       return timestamp;
//     }
//   };

//   const handleErrorAction = (errorInfo) => {
//     if (errorInfo.type === 'auth' && onGmailSetup) {
//       onGmailSetup();
//     } else {
//       setError('');
//     }
//   };

//   const selectTool = (toolId) => {
//     setSelectedSource(toolId);
//     setShowToolsMenu(false);
//     setError('');
//   };

//   const selectedTool = tools.find(tool => tool.id === selectedSource);

//   const renderResult = (result, index, source) => {
//     const isOdooResult = source === 'odoo';
    
//     let title, fromField, dateField, contentField, linkField, additionalInfo;
    
//     if (isOdooResult) {
//       title = result.display_name || result.partner_name || result.name || 'Untitled Record';
//       fromField = result.email_from || result.email_normalized || result.partner_name;
//       dateField = result.create_date || result.write_date || result.date_open;
//       contentField = result.description || 
//                    (result.expected_revenue ? `Expected Revenue: $${result.expected_revenue}` : '') ||
//                    (result.stage_id ? `Stage: ${Array.isArray(result.stage_id) ? result.stage_id[1] : result.stage_id}` : '');
//       linkField = result.website;
      
//       additionalInfo = [];
//       if (result.phone) additionalInfo.push(`Phone: ${result.phone}`);
//       if (result.expected_revenue) additionalInfo.push(`Revenue: $${result.expected_revenue}`);
//       if (result.probability) additionalInfo.push(`Probability: ${result.probability}%`);
//       if (result.stage_id && Array.isArray(result.stage_id)) additionalInfo.push(`Stage: ${result.stage_id[1]}`);
//       if (result.user_id && Array.isArray(result.user_id)) additionalInfo.push(`Assigned to: ${result.user_id[1]}`);
//       if (result.city) additionalInfo.push(`Location: ${result.city}`);
//     } else {
//       title = result.subject || 'No Subject';
//       fromField = result.from;
//       dateField = result.date;
//       contentField = result.snippet;
//       linkField = result.link;
//       additionalInfo = [];
//     }

//     return (
//       <div
//         key={result.id || index}
//         className="bg-white rounded-xl border border-gray-200 p-4 hover:border-purple-300 hover:shadow-md transition-all duration-200"
//       >
//         <div className="space-y-3">
//           <h3 className="text-base font-semibold text-gray-900 leading-tight">
//             {title}
//           </h3>
          
//           <div className="flex items-center justify-between text-sm text-gray-600 flex-wrap gap-2">
//             {fromField && (
//               <span className="flex items-center">
//                 <span className="font-medium">
//                   {isOdooResult ? 'Contact:' : 'From:'}
//                 </span>
//                 <span className="ml-1">{fromField}</span>
//               </span>
//             )}
//             {dateField && (
//               <span className="text-gray-500 text-xs">
//                 {formatDate(dateField)}
//               </span>
//             )}
//           </div>

//           {isOdooResult && additionalInfo.length > 0 && (
//             <div className="flex flex-wrap gap-1">
//               {additionalInfo.map((info, idx) => (
//                 <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
//                   {info}
//                 </span>
//               ))}
//             </div>
//           )}
          
//           {contentField && (
//             <p className="text-gray-700 leading-relaxed text-sm">
//               {contentField}
//             </p>
//           )}
          
//           {linkField && (
//             <div className="pt-2">
//               <a
//                 href={linkField}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center text-sm text-purple-600 hover:text-purple-700 hover:underline"
//               >
//                 {isOdooResult ? (
//                   <>
//                     <Database className="w-4 h-4 mr-1" />
//                     {linkField.includes('http') ? 'Visit Website' : 'Open in Odoo'}
//                   </>
//                 ) : (
//                   <>
//                     <Mail className="w-4 h-4 mr-1" />
//                     Open in Gmail
//                   </>
//                 )}
//               </a>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   const ErrorDisplay = ({ error }) => {
//     const errorInfo = parseError(error);
    
//     const getErrorIcon = (type) => {
//       switch (type) {
//         case 'auth':
//           return <ShieldAlert className="w-5 h-5" />;
//         case 'server':
//           return <AlertCircle className="w-5 h-5" />;
//         case 'network':
//           return <RefreshCw className="w-5 h-5" />;
//         default:
//           return <AlertCircle className="w-5 h-5" />;
//       }
//     };

//     const getErrorColors = (type) => {
//       switch (type) {
//         case 'auth':
//           return {
//             bg: 'bg-orange-50',
//             border: 'border-orange-200',
//             text: 'text-orange-800',
//             icon: 'text-orange-600',
//             button: 'bg-orange-600 hover:bg-orange-700'
//           };
//         case 'server':
//           return {
//             bg: 'bg-red-50',
//             border: 'border-red-200',
//             text: 'text-red-800',
//             icon: 'text-red-600',
//             button: 'bg-red-600 hover:bg-red-700'
//           };
//         case 'network':
//           return {
//             bg: 'bg-blue-50',
//             border: 'border-blue-200',
//             text: 'text-blue-800',
//             icon: 'text-blue-600',
//             button: 'bg-blue-600 hover:bg-blue-700'
//           };
//         default:
//           return {
//             bg: 'bg-gray-50',
//             border: 'border-gray-200',
//             text: 'text-gray-800',
//             icon: 'text-gray-600',
//             button: 'bg-gray-600 hover:bg-gray-700'
//           };
//       }
//     };

//     const colors = getErrorColors(errorInfo.type);

//     return (
//       <div className={`mb-4 p-4 ${colors.bg} ${colors.border} border rounded-xl`}>
//         <div className="flex items-start space-x-3">
//           <div className={`${colors.icon} flex-shrink-0 mt-0.5`}>
//             {getErrorIcon(errorInfo.type)}
//           </div>
//           <div className="flex-1 min-w-0">
//             <h4 className={`font-medium ${colors.text} mb-1`}>
//               {errorInfo.title}
//             </h4>
//             <p className={`text-sm ${colors.text} opacity-90 leading-relaxed`}>
//               {errorInfo.message}
//             </p>
//           </div>
//           <button
//             onClick={() => handleErrorAction(errorInfo)}
//             className={`flex-shrink-0 px-3 py-1.5 ${colors.button} text-white text-sm font-medium rounded-lg transition-colors`}
//           >
//             {errorInfo.action}
//           </button>
//         </div>
//       </div>
//     );
//   };

//   const hasConversations = conversations.length > 0;

//   return (
//     <div className="flex-1 flex flex-col bg-gray-50">
//       {hasConversations ? (
//         /* Conversation View - After First Query */
//         <div className="h-screen flex flex-col">
//           {/* Header - Connection Status */}
//           <div className="border-b border-gray-200 bg-white px-8 py-4 flex-shrink-0">
//             <div className="max-w-4xl mx-auto">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h1 className="text-xl font-medium text-gray-800">Good Evening, Kunal</h1>
//                   <p className="text-sm text-gray-500">Enter a keyword to get anything from your data!</p>
//                 </div>
                
//                 <div className="flex items-center space-x-4 text-xs">
//                   <span className={`flex items-center space-x-1 ${authenticatedEmail ? 'text-green-600' : 'text-gray-400'}`}>
//                     <Mail className="w-3 h-3" />
//                     <span>Gmail {authenticatedEmail ? '✓' : '✗'}</span>
//                   </span>
//                   <span className={`flex items-center space-x-1 ${odooConnection ? 'text-green-600' : 'text-gray-400'}`}>
//                     <Database className="w-3 h-3" />
//                     <span>Odoo {odooConnection ? '✓' : '✗'}</span>
//                   </span>
//                   {(authenticatedEmail || odooConnection) && (
//                     <button
//                       onClick={handleLogout}
//                       className="text-red-600 hover:text-red-700 underline"
//                     >
//                       Disconnect All
//                     </button>
//                   )}
//                   {onGmailSetup && (
//                     <button
//                       onClick={onGmailSetup}
//                       className="bg-purple-500 text-white px-3 py-1 rounded-lg hover:bg-purple-600"
//                     >
//                       Connect Services
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Scrollable Conversation Area */}
//           <div ref={conversationRef} className="flex-1 overflow-y-auto px-8 py-6">
//             <div className="max-w-4xl mx-auto space-y-6">
//               {conversations.map((message) => (
//                 <div key={message.id} className="space-y-4">
//                   {message.type === 'user' ? (
//                     <div className="flex justify-end">
//                       <div className="bg-purple-600 text-white rounded-2xl px-4 py-3 max-w-xl">
//                         <p className="text-sm">{message.content}</p>
//                         <div className="flex items-center space-x-2 mt-2 text-xs text-purple-200">
//                           {message.source === 'gmail' ? <Mail className="w-3 h-3" /> : <Database className="w-3 h-3" />}
//                           <span>{message.source}</span>
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="flex justify-start">
//                       <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-4xl w-full shadow-sm">
//                         {message.content.summary && (
//                           <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
//                             <h3 className="text-lg font-medium text-blue-900 mb-2">Summary</h3>
//                             <p className="text-blue-800 leading-relaxed">{message.content.summary}</p>
//                             <div className="mt-2 text-sm text-blue-600">
//                               Source: {message.content.source} • {message.content.results.length} results found
//                             </div>
//                           </div>
//                         )}
                        
//                         <h3 className="text-lg font-medium text-gray-900 mb-4">
//                           {message.content.results.length} Results Found
//                         </h3>
                        
//                         <div className="space-y-3">
//                           {message.content.results.map((result, index) => 
//                             renderResult(result, index, message.content.source)
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
              
//               {isLoading && (
//                 <div className="flex justify-start">
//                   <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-xl shadow-sm">
//                     <div className="flex items-center space-x-3">
//                       <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
//                       <span className="text-gray-600">Searching...</span>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Sticky Bottom Input */}
//           <div className="border-t border-gray-200 bg-white px-8 py-4 flex-shrink-0">
//             <div className="max-w-4xl mx-auto">
//               <div className={`flex items-center space-x-3 bg-gray-100 rounded-full px-4 py-3 transition-all duration-200 ${
//                 query.trim() ? 'border-2 border-purple-300 shadow-lg' : 'border border-gray-200 shadow-sm'
//               }`}>
//                 {/* Selected Tool Icon with Green Dot */}
//                 <div className="relative">
//                   <div className="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors">
//                     {selectedTool?.icon && <selectedTool.icon className="w-4 h-4 text-gray-600" />}
//                   </div>
//                   {selectedTool?.connected && (
//                     <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
//                   )}
//                 </div>

//                 {/* Tools Button */}
//                 <div className="relative">
//                   <button
//                     onClick={() => setShowToolsMenu(!showToolsMenu)}
//                     className="flex items-center space-x-2 bg-gray-200 hover:bg-gray-300 px-3 py-1.5 rounded-full text-gray-700 transition-colors"
//                   >
//                     <Settings className="w-4 h-4" />
//                     <span className="text-sm font-medium">Tools</span>
//                   </button>

//                   {showToolsMenu && (
//                     <div className="absolute bottom-full mb-2 left-0 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
//                       <div className="p-3">
//                         <div className="mb-3">
//                           <h4 className="text-sm font-medium text-gray-700 mb-2">Select Data Source</h4>
//                         </div>
//                         {tools.map((tool) => {
//                           const Icon = tool.icon;
//                           const isActive = selectedSource === tool.id;
//                           const isConnected = tool.connected;
                          
//                           return (
//                             <button
//                               key={tool.id}
//                               onClick={() => selectTool(tool.id)}
//                               className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all mb-2 ${
//                                 isActive 
//                                   ? 'bg-purple-50 border-2 border-purple-200 shadow-sm' 
//                                   : 'hover:bg-gray-50 border-2 border-transparent'
//                               }`}
//                             >
//                               <div className="relative">
//                                 <Icon className={`w-6 h-6 ${isActive ? 'text-purple-600' : 'text-gray-500'}`} />
//                                 {isConnected && (
//                                   <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
//                                 )}
//                               </div>
                              
//                               <div className="flex-1">
//                                 <div className="flex items-center justify-between">
//                                   <span className={`font-medium ${isActive ? 'text-purple-900' : 'text-gray-900'}`}>
//                                     {tool.name}
//                                   </span>
//                                   <div className="flex items-center space-x-2">
//                                     {isConnected ? (
//                                       <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">
//                                         Connected
//                                       </span>
//                                     ) : (
//                                       <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full font-medium">
//                                         Not Connected
//                                       </span>
//                                     )}
//                                     {isActive && (
//                                       <CheckCircle2 className="w-4 h-4 text-purple-600" />
//                                     )}
//                                   </div>
//                                 </div>
//                                 <p className="text-xs text-gray-500 mt-1">{tool.description}</p>
//                                 {isConnected && (
//                                   <p className="text-xs text-green-600 mt-1 font-medium">
//                                     {tool.id === 'gmail' ? authenticatedEmail : odooConnection?.username}
//                                   </p>
//                                 )}
//                               </div>
//                             </button>
//                           );
//                         })}
                        
//                         {/* Connect Services Button */}
//                         <div className="mt-3 pt-3 border-t border-gray-200">
//                           {onGmailSetup && (
//                             <button
//                               onClick={() => {
//                                 setShowToolsMenu(false);
//                                 onGmailSetup();
//                               }}
//                               className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
//                             >
//                               Connect New Service
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Input Field */}
//                 <div className="flex-1">
//                   <input
//                     type="text"
//                     placeholder="Ask anything"
//                     value={query}
//                     onChange={(e) => setQuery(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                     disabled={!isConnected() || isLoading}
//                     className="w-full bg-transparent border-none focus:outline-none text-gray-800 placeholder-gray-500 disabled:text-gray-400 text-base"
//                   />
//                 </div>

//                 {/* Right Side Buttons */}
//                 <div className="flex items-center space-x-2">
//                   {/* Mic Button */}
//                   {/* <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm">
//                     <span className="text-gray-600 text-sm">🎤</span>
//                   </button> */}

//                   {/* Send/Action Button */}
//                   <button 
//                     onClick={handleSubmit}
//                     disabled={!isConnected() || isLoading || !query.trim()}
//                     className={`w-8 h-8 text-white rounded-full flex items-center justify-center transition-all disabled:bg-gray-400 disabled:cursor-not-allowed ${
//                       query.trim() ? 'bg-purple-600 hover:bg-purple-700 shadow-md' : 'bg-black hover:bg-gray-800'
//                     }`}
//                   >
//                     {isLoading ? (
//                       <Loader2 className="w-3 h-3 animate-spin" />
//                     ) : (
//                       <Send className="w-3 h-3" />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {error && (
//                 <div className="mt-3">
//                   <ErrorDisplay error={error} />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       ) : (
//         /* Initial Landing View - Centered Layout */
//         <div className="min-h-screen flex flex-col items-center justify-center px-8 py-16 overflow-auto">
          
//           <div className="text-center mb-12">
//             <h1 className="text-2xl font-medium text-gray-800 mb-2">Good Evening, Kunal</h1>
//             <p className="text-gray-500 text-base">Enter a Keyword to get anything from your data!</p>
            
//             {/* Connection Status */}
//             <div className="mt-4 space-y-2">
//               {/* Current Source Status */}
//               {isConnected() ? (
//                 <div className="flex items-center justify-center space-x-4">
//                   <p className="text-sm text-green-600">
//                     ✅ {selectedTool?.name} Connected: {getActiveConnection()}
//                   </p>
//                   <button
//                     onClick={handleLogout}
//                     className="text-xs text-red-600 hover:text-red-700 underline"
//                   >
//                     Disconnect All
//                   </button>
//                 </div>
//               ) : (
//                 <div className="flex items-center justify-center space-x-4">
//                   <p className="text-sm text-orange-600">
//                     ⚠️ Please authenticate your {selectedTool?.name} connection first
//                   </p>
//                   {onGmailSetup && (
//                     <button
//                       onClick={onGmailSetup}
//                       className="text-sm bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
//                     >
//                       Connect Services
//                     </button>
//                   )}
//                 </div>
//               )}

//               {/* All Connections Status */}
//               <div className="flex items-center justify-center space-x-6 text-xs">
//                 <span className={`flex items-center space-x-1 ${authenticatedEmail ? 'text-green-600' : 'text-gray-400'}`}>
//                   <Mail className="w-3 h-3" />
//                   <span>Gmail {authenticatedEmail ? '✓' : '✗'}</span>
//                 </span>
//                 <span className={`flex items-center space-x-1 ${odooConnection ? 'text-green-600' : 'text-gray-400'}`}>
//                   <Database className="w-3 h-3" />
//                   <span>Odoo {odooConnection ? '✓' : '✗'}</span>
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="w-full max-w-3xl">
//             <div className={`bg-white rounded-2xl border shadow-sm p-6 mb-12 transition-all duration-200 ${
//               isInputFocused 
//                 ? 'border-purple-300 shadow-lg ring-2 ring-purple-100' 
//                 : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
//             }`}>
//               <div className="flex items-center justify-between mb-6">
//                 {/* Tools Menu */}
//                 <div className="relative">
//                   <button
//                     onClick={() => setShowToolsMenu(!showToolsMenu)}
//                     className="flex items-center space-x-2 bg-purple-100 hover:bg-purple-200 px-3 py-2 rounded-xl text-gray-700 transition-colors"
//                   >
//                     <Settings className="w-4 h-4" />
//                     <span className="text-sm font-medium">Tools</span>
//                     <ChevronDown className={`w-4 h-4 transition-transform ${showToolsMenu ? 'rotate-180' : ''}`} />
//                   </button>

//                   {showToolsMenu && (
//                     <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
//                       <div className="p-3">
//                         <div className="mb-3">
//                           <h4 className="text-sm font-medium text-gray-700 mb-2">Select Data Source</h4>
//                         </div>
//                         {tools.map((tool) => {
//                           const Icon = tool.icon;
//                           const isActive = selectedSource === tool.id;
//                           const isConnected = tool.connected;
                          
//                           return (
//                             <button
//                               key={tool.id}
//                               onClick={() => selectTool(tool.id)}
//                               className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all mb-2 ${
//                                 isActive 
//                                   ? 'bg-purple-50 border-2 border-purple-200 shadow-sm' 
//                                   : 'hover:bg-gray-50 border-2 border-transparent'
//                               }`}
//                             >
//                               <div className="relative">
//                                 <Icon className={`w-6 h-6 ${isActive ? 'text-purple-600' : 'text-gray-500'}`} />
//                                 {isConnected && (
//                                   <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
//                                 )}
//                               </div>
                              
//                               <div className="flex-1">
//                                 <div className="flex items-center justify-between">
//                                   <span className={`font-medium ${isActive ? 'text-purple-900' : 'text-gray-900'}`}>
//                                     {tool.name}
//                                   </span>
//                                   <div className="flex items-center space-x-2">
//                                     {isConnected ? (
//                                       <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">
//                                         Connected
//                                       </span>
//                                     ) : (
//                                       <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full font-medium">
//                                         Not Connected
//                                       </span>
//                                     )}
//                                     {isActive && (
//                                       <CheckCircle2 className="w-4 h-4 text-purple-600" />
//                                     )}
//                                   </div>
//                                 </div>
//                                 <p className="text-xs text-gray-500 mt-1">{tool.description}</p>
//                                 {isConnected && (
//                                   <p className="text-xs text-green-600 mt-1 font-medium">
//                                     {tool.id === 'gmail' ? authenticatedEmail : odooConnection?.username}
//                                   </p>
//                                 )}
//                               </div>
//                             </button>
//                           );
//                         })}
                        
//                         {/* Connect Services Button */}
//                         <div className="mt-3 pt-3 border-t border-gray-200">
//                           {onGmailSetup && (
//                             <button
//                               onClick={() => {
//                                 setShowToolsMenu(false);
//                                 onGmailSetup();
//                               }}
//                               className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
//                             >
//                               Connect New Service
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Selected Source Indicator */}
//                 <div className="flex items-center space-x-1 text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
//                   {selectedTool?.icon && <selectedTool.icon className="w-4 h-4" />}
//                   <span>{selectedTool?.name}</span>
//                   {isConnected() && <span className="w-2 h-2 bg-green-400 rounded-full ml-1"></span>}
//                 </div>
//               </div>

//               <div className="mb-6">
//                 <textarea
//                   placeholder={isConnected() ? `Search your ${selectedTool?.name} data...` : `Please authenticate ${selectedTool?.name} first...`}
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   onFocus={() => setIsInputFocused(true)}
//                   onBlur={() => setIsInputFocused(false)}
//                   onKeyPress={handleKeyPress}
//                   disabled={!isConnected() || isLoading}
//                   className="w-full h-10 text-base bg-transparent border-none resize-none focus:outline-none text-gray-800 placeholder-gray-400 disabled:text-gray-500"
//                 />
//               </div>

//               {error && <ErrorDisplay error={error} />}

//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-4">
//                   <button 
//                     type="button"
//                     className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 text-sm transition-colors"
//                     disabled={!isConnected()}
//                   >
//                     <Paperclip className="w-4 h-4" />
//                     <span>Add Attachment</span>
//                   </button>
//                   <button 
//                     type="button"
//                     className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 text-sm transition-colors"
//                     disabled={!isConnected()}
//                   >
//                     <Image className="w-4 h-4" />
//                     <span>Use Image</span>
//                   </button>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <span className="text-gray-400 text-sm">{query.length}/1000</span>
//                   <button 
//                     onClick={handleSubmit}
//                     disabled={!isConnected() || isLoading || !query.trim()}
//                     className={`w-8 h-8 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center transition-all disabled:bg-gray-400 disabled:cursor-not-allowed ${
//                       query.length > 0 && !isLoading ? 'scale-110 shadow-md' : ''
//                     }`}
//                   >
//                     {isLoading ? (
//                       <Loader2 className="w-4 h-4 animate-spin" />
//                     ) : (
//                       <Send className="w-4 h-4" />
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="w-full max-w-6xl">
//             <h2 className="text-xl font-medium text-gray-800 mb-6">Your recent chats</h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {recentChats.map((chat, index) => (
//                 <div
//                   key={index}
//                   className="bg-white rounded-xl border border-gray-200 p-6 hover:border-purple-300 hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:-translate-y-1"
//                   onClick={() => {
//                     if (isConnected()) {
//                       setQuery(chat.title);
//                     }
//                   }}
//                 >
//                   <div className="flex items-start space-x-3">
//                     <MessageCircle className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
//                     <div className="flex-1">
//                       <h3 className="text-gray-800 font-medium leading-snug mb-3">{chat.title}</h3>
//                       <p className="text-gray-500 text-sm">{chat.timeAgo}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HomePage;



// import React, { useState, useEffect, useRef } from 'react';
// import { Send, Mail, AlertCircle, CheckCircle2, Loader2, Paperclip, Image, MessageCircle, ShieldAlert, RefreshCw, ChevronDown, Database, Settings } from 'lucide-react';

// const HomePage = ({ onGmailSetup, onLogout }) => {
//   const [query, setQuery] = useState('');
//   const [isInputFocused, setIsInputFocused] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [conversations, setConversations] = useState([]);
//   const [error, setError] = useState('');
//   const [authenticatedEmail, setAuthenticatedEmail] = useState(null);
//   const [odooConnection, setOdooConnection] = useState(null);
//   const [selectedSource, setSelectedSource] = useState('gmail');
//   const [showToolsMenu, setShowToolsMenu] = useState(false);
//   const conversationRef = useRef(null);
  
//   useEffect(() => {
//     const getConnectionsFromStorage = () => {
//       const storedEmail = localStorage.getItem('authenticatedEmail');
//       setAuthenticatedEmail(storedEmail);
      
//       const storedOdoo = localStorage.getItem('odooConnection');
//       if (storedOdoo) {
//         try {
//           const odooDetails = JSON.parse(storedOdoo);
//           setOdooConnection(odooDetails);
//         } catch (error) {
//           console.error('Error parsing Odoo connection:', error);
//           localStorage.removeItem('odooConnection');
//         }
//       } else {
//         setOdooConnection(null);
//       }
      
//       console.log('HomePage loaded connections - Gmail:', storedEmail, 'Odoo:', storedOdoo);
//     };

//     getConnectionsFromStorage();

//     const handleStorageChange = (e) => {
//       if (e.key === 'authenticatedEmail' || e.key === 'odooConnection') {
//         getConnectionsFromStorage();
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);
//     const interval = setInterval(getConnectionsFromStorage, 1000);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       clearInterval(interval);
//     };
//   }, []);

//   // Auto-scroll to latest message
//   useEffect(() => {
//     if (conversationRef.current && conversations.length > 0) {
//       setTimeout(() => {
//         conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
//       }, 100);
//     }
//   }, [conversations]);

//   const handleLogout = () => {
//     localStorage.removeItem('authenticatedEmail');
//     localStorage.removeItem('odooConnection');
//     setAuthenticatedEmail(null);
//     setOdooConnection(null);
//     if (onLogout) {
//       onLogout();
//     }
//   };

//   const getActiveConnection = () => {
//     if (selectedSource === 'gmail') {
//       return authenticatedEmail;
//     } else if (selectedSource === 'odoo') {
//       return odooConnection?.username;
//     }
//     return null;
//   };

//   const isConnected = () => {
//     if (selectedSource === 'gmail') {
//       return !!authenticatedEmail;
//     } else if (selectedSource === 'odoo') {
//       return !!odooConnection;
//     }
//     return false;
//   };

//   const tools = [
//     {
//       id: 'gmail',
//       name: 'Gmail',
//       icon: Mail,
//       description: 'Search your Gmail emails',
//       connected: !!authenticatedEmail
//     },
//     {
//       id: 'odoo',
//       name: 'Odoo',
//       icon: Database,
//       description: 'Search your Odoo data',
//       connected: !!odooConnection
//     }
//   ];

//   const recentChats = [
//     {
//       title: "Show me all contacts living in Berlin",
//       timeAgo: "6 Hours"
//     },
//     {
//       title: "My last touch points with Lukas",
//       timeAgo: "12 Hours"
//     },
//     {
//       title: "Who in my network is an SaaS expert",
//       timeAgo: "18 Hours"
//     }
//   ];

//   const parseError = (errorMessage) => {
//     if (errorMessage.includes('401') || errorMessage.includes('No valid credentials')) {
//       return {
//         type: 'auth',
//         title: 'Authentication Required',
//         message: `Your ${selectedSource} connection has expired or is invalid. Please reconnect your ${selectedSource} account to continue searching.`,
//         action: `Reconnect ${selectedSource.charAt(0).toUpperCase() + selectedSource.slice(1)}`
//       };
//     }
    
//     if (errorMessage.includes('500') || errorMessage.includes('API Error')) {
//       return {
//         type: 'server',
//         title: 'Server Error',
//         message: 'Something went wrong on our end. Please try again in a moment.',
//         action: 'Try Again'
//       };
//     }
    
//     if (errorMessage.includes('NetworkError') || errorMessage.includes('fetch')) {
//       return {
//         type: 'network',
//         title: 'Connection Error',
//         message: 'Unable to connect to our servers. Please check your internet connection.',
//         action: 'Retry'
//       };
//     }
    
//     return {
//       type: 'general',
//       title: 'Something went wrong',
//       message: 'An unexpected error occurred. Please try again.',
//       action: 'Try Again'
//     };
//   };

//   const handleSubmit = async () => {
//     if (!query.trim()) {
//       setError('Please enter a query');
//       return;
//     }

//     const activeConnection = getActiveConnection();
//     if (!activeConnection) {
//       setError(`Please authenticate your ${selectedSource} connection first`);
//       return;
//     }

//     setIsLoading(true);
//     setError('');

//     const userMessage = {
//       id: Date.now(),
//       type: 'user',
//       content: query.trim(),
//       source: selectedSource,
//       timestamp: new Date()
//     };
    
//     const currentQuery = query.trim();
//     setQuery('');
//     setConversations(prev => [...prev, userMessage]);

//     try {
//       let payload = {
//         query: currentQuery,
//         max_results: 10,
//         source: selectedSource
//       };

//       if (selectedSource === 'gmail') {
//         payload.gmail_address = authenticatedEmail;
//       } else if (selectedSource === 'odoo') {
//         payload.gmail_address = odooConnection?.username;
//       }

//       console.log('Search payload:', payload);

//       const response = await fetch(`${import.meta.env.VITE_SEARCH_URL}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload)
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('API Response:', data);
        
//         const assistantMessage = {
//           id: Date.now() + 1,
//           type: 'assistant',
//           content: {
//             results: data.results || [],
//             summary: data.summary,
//             source: data.source || selectedSource
//           },
//           timestamp: new Date()
//         };
        
//         setConversations(prev => [...prev, assistantMessage]);
//       } else {
//         const errorData = await response.text();
//         throw new Error(`API Error: ${response.status} - ${errorData}`);
//       }
//     } catch (error) {
//       console.error('Search error:', error);
//       setError(`Failed to search: ${error.message}`);
//       setConversations(prev => prev.slice(0, -1));
//       setQuery(currentQuery);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit();
//     }
//   };

//   const formatDate = (timestamp) => {
//     try {
//       let date;
      
//       if (typeof timestamp === 'string' && timestamp.includes('-')) {
//         date = new Date(timestamp);
//       } else if (typeof timestamp === 'string' && timestamp.length > 10) {
//         date = new Date(parseInt(timestamp));
//       } else if (typeof timestamp === 'number') {
//         date = new Date(timestamp);
//       } else {
//         date = new Date(timestamp);
//       }

//       if (isNaN(date.getTime())) {
//         return timestamp;
//       }

//       return date.toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       });
//     } catch {
//       return timestamp;
//     }
//   };

//   const handleErrorAction = (errorInfo) => {
//     if (errorInfo.type === 'auth' && onGmailSetup) {
//       onGmailSetup();
//     } else {
//       setError('');
//     }
//   };

//   const selectTool = (toolId) => {
//     setSelectedSource(toolId);
//     setShowToolsMenu(false);
//     setError('');
//   };

//   const selectedTool = tools.find(tool => tool.id === selectedSource);

//   const renderResult = (result, index, source) => {
//     const isOdooResult = source === 'odoo';
    
//     let title, fromField, dateField, contentField, linkField, additionalInfo;
    
//     if (isOdooResult) {
//       title = result.display_name || result.partner_name || result.name || 'Untitled Record';
//       fromField = result.email_from || result.email_normalized || result.partner_name;
//       dateField = result.create_date || result.write_date || result.date_open;
//       contentField = result.description || 
//                    (result.expected_revenue ? `Expected Revenue: $${result.expected_revenue}` : '') ||
//                    (result.stage_id ? `Stage: ${Array.isArray(result.stage_id) ? result.stage_id[1] : result.stage_id}` : '');
//       linkField = result.website;
      
//       additionalInfo = [];
//       if (result.phone) additionalInfo.push(`Phone: ${result.phone}`);
//       if (result.expected_revenue) additionalInfo.push(`Revenue: $${result.expected_revenue}`);
//       if (result.probability) additionalInfo.push(`Probability: ${result.probability}%`);
//       if (result.stage_id && Array.isArray(result.stage_id)) additionalInfo.push(`Stage: ${result.stage_id[1]}`);
//       if (result.user_id && Array.isArray(result.user_id)) additionalInfo.push(`Assigned to: ${result.user_id[1]}`);
//       if (result.city) additionalInfo.push(`Location: ${result.city}`);
//     } else {
//       title = result.subject || 'No Subject';
//       fromField = result.from;
//       dateField = result.date;
//       contentField = result.snippet;
//       linkField = result.link;
//       additionalInfo = [];
//     }

//     return (
//       <div
//         key={result.id || index}
//         className="bg-white rounded-xl border border-gray-200 p-4 hover:border-purple-300 hover:shadow-md transition-all duration-200"
//       >
//         <div className="space-y-3">
//           <h3 className="text-base font-semibold text-gray-900 leading-tight">
//             {title}
//           </h3>
          
//           <div className="flex items-center justify-between text-sm text-gray-600 flex-wrap gap-2">
//             {fromField && (
//               <span className="flex items-center">
//                 <span className="font-medium">
//                   {isOdooResult ? 'Contact:' : 'From:'}
//                 </span>
//                 <span className="ml-1">{fromField}</span>
//               </span>
//             )}
//             {dateField && (
//               <span className="text-gray-500 text-xs">
//                 {formatDate(dateField)}
//               </span>
//             )}
//           </div>

//           {isOdooResult && additionalInfo.length > 0 && (
//             <div className="flex flex-wrap gap-1">
//               {additionalInfo.map((info, idx) => (
//                 <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
//                   {info}
//                 </span>
//               ))}
//             </div>
//           )}
          
//           {contentField && (
//             <p className="text-gray-700 leading-relaxed text-sm">
//               {contentField}
//             </p>
//           )}
          
//           {linkField && (
//             <div className="pt-2">
//               <a
//                 href={linkField}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center text-sm text-purple-600 hover:text-purple-700 hover:underline"
//               >
//                 {isOdooResult ? (
//                   <>
//                     <Database className="w-4 h-4 mr-1" />
//                     {linkField.includes('http') ? 'Visit Website' : 'Open in Odoo'}
//                   </>
//                 ) : (
//                   <>
//                     <Mail className="w-4 h-4 mr-1" />
//                     Open in Gmail
//                   </>
//                 )}
//               </a>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   const ErrorDisplay = ({ error }) => {
//     const errorInfo = parseError(error);
    
//     const getErrorIcon = (type) => {
//       switch (type) {
//         case 'auth':
//           return <ShieldAlert className="w-5 h-5" />;
//         case 'server':
//           return <AlertCircle className="w-5 h-5" />;
//         case 'network':
//           return <RefreshCw className="w-5 h-5" />;
//         default:
//           return <AlertCircle className="w-5 h-5" />;
//       }
//     };

//     const getErrorColors = (type) => {
//       switch (type) {
//         case 'auth':
//           return {
//             bg: 'bg-orange-50',
//             border: 'border-orange-200',
//             text: 'text-orange-800',
//             icon: 'text-orange-600',
//             button: 'bg-orange-600 hover:bg-orange-700'
//           };
//         case 'server':
//           return {
//             bg: 'bg-red-50',
//             border: 'border-red-200',
//             text: 'text-red-800',
//             icon: 'text-red-600',
//             button: 'bg-red-600 hover:bg-red-700'
//           };
//         case 'network':
//           return {
//             bg: 'bg-blue-50',
//             border: 'border-blue-200',
//             text: 'text-blue-800',
//             icon: 'text-blue-600',
//             button: 'bg-blue-600 hover:bg-blue-700'
//           };
//         default:
//           return {
//             bg: 'bg-gray-50',
//             border: 'border-gray-200',
//             text: 'text-gray-800',
//             icon: 'text-gray-600',
//             button: 'bg-gray-600 hover:bg-gray-700'
//           };
//       }
//     };

//     const colors = getErrorColors(errorInfo.type);

//     return (
//       <div className={`mb-4 p-4 ${colors.bg} ${colors.border} border rounded-xl`}>
//         <div className="flex items-start space-x-3">
//           <div className={`${colors.icon} flex-shrink-0 mt-0.5`}>
//             {getErrorIcon(errorInfo.type)}
//           </div>
//           <div className="flex-1 min-w-0">
//             <h4 className={`font-medium ${colors.text} mb-1`}>
//               {errorInfo.title}
//             </h4>
//             <p className={`text-sm ${colors.text} opacity-90 leading-relaxed`}>
//               {errorInfo.message}
//             </p>
//           </div>
//           <button
//             onClick={() => handleErrorAction(errorInfo)}
//             className={`flex-shrink-0 px-3 py-1.5 ${colors.button} text-white text-sm font-medium rounded-lg transition-colors`}
//           >
//             {errorInfo.action}
//           </button>
//         </div>
//       </div>
//     );
//   };

//   const formatText = (text) => {
//     if (!text) return text;
    
//     // Split by line breaks first
//     const lines = text.split('\n');
    
//     return lines.map((line, lineIndex) => {
//       // Process each line for bold and italic formatting
//       const parts = [];
//       let remainingText = line;
//       let key = 0;
      
//       while (remainingText.length > 0) {
//         // Check for bold text (**text**)
//         const boldMatch = remainingText.match(/\*\*(.*?)\*\*/);
//         if (boldMatch) {
//           const beforeBold = remainingText.substring(0, boldMatch.index);
//           const boldText = boldMatch[1];
          
//           // Add text before bold
//           if (beforeBold) {
//             // Check for italic in the before text
//             const processedBefore = processItalic(beforeBold, key);
//             parts.push(...processedBefore.parts);
//             key = processedBefore.nextKey;
//           }
          
//           // Add bold text (also check for italic inside bold)
//           const processedBold = processItalic(boldText, key);
//           parts.push(
//             <strong key={key++}>
//               {processedBold.parts.length > 0 ? processedBold.parts : boldText}
//             </strong>
//           );
//           key = processedBold.nextKey;
          
//           // Continue with remaining text
//           remainingText = remainingText.substring(boldMatch.index + boldMatch[0].length);
//         } else {
//           // No more bold text, process remaining for italic
//           const processedRemaining = processItalic(remainingText, key);
//           parts.push(...processedRemaining.parts);
//           break;
//         }
//       }
      
//       return (
//         <span key={lineIndex}>
//           {parts.length > 0 ? parts : line}
//           {lineIndex < lines.length - 1 && <br />}
//         </span>
//       );
//     });
//   };

//   const processItalic = (text, startKey) => {
//     const parts = [];
//     let remainingText = text;
//     let key = startKey;
    
//     while (remainingText.length > 0) {
//       const italicMatch = remainingText.match(/\*(.*?)\*/);
//       if (italicMatch) {
//         const beforeItalic = remainingText.substring(0, italicMatch.index);
//         const italicText = italicMatch[1];
        
//         // Add text before italic
//         if (beforeItalic) {
//           parts.push(beforeItalic);
//         }
        
//         // Add italic text
//         parts.push(<em key={key++}>{italicText}</em>);
        
//         // Continue with remaining text
//         remainingText = remainingText.substring(italicMatch.index + italicMatch[0].length);
//       } else {
//         // No more italic text
//         if (remainingText) {
//           parts.push(remainingText);
//         }
//         break;
//       }
//     }
    
//     return { parts: parts.length > 0 ? parts : [text], nextKey: key };
//   };

//   const hasConversations = conversations.length > 0;

//   return (
//     <div className="flex-1 flex flex-col bg-gray-50">
//       {hasConversations ? (
//         /* Conversation View - After First Query */
//         <div className="h-screen flex flex-col">
//           {/* Header - Connection Status */}
//           <div className="border-b border-gray-200 bg-white px-8 py-4 flex-shrink-0">
//             <div className="max-w-4xl mx-auto">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h1 className="text-xl font-medium text-gray-800">Good Evening, Kunal</h1>
//                   <p className="text-sm text-gray-500">Enter a keyword to get anything from your data!</p>
//                 </div>
                
//                 <div className="flex items-center space-x-4 text-xs">
//                   <span className={`flex items-center space-x-1 ${authenticatedEmail ? 'text-green-600' : 'text-gray-400'}`}>
//                     <Mail className="w-3 h-3" />
//                     <span>Gmail {authenticatedEmail ? '✓' : '✗'}</span>
//                   </span>
//                   <span className={`flex items-center space-x-1 ${odooConnection ? 'text-green-600' : 'text-gray-400'}`}>
//                     <Database className="w-3 h-3" />
//                     <span>Odoo {odooConnection ? '✓' : '✗'}</span>
//                   </span>
//                   {(authenticatedEmail || odooConnection) && (
//                     <button
//                       onClick={handleLogout}
//                       className="text-red-600 hover:text-red-700 underline"
//                     >
//                       Disconnect All
//                     </button>
//                   )}
//                   {onGmailSetup && (
//                     <button
//                       onClick={onGmailSetup}
//                       className="bg-purple-500 text-white px-3 py-1 rounded-lg hover:bg-purple-600"
//                     >
//                       Connect Services
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Scrollable Conversation Area */}
//           <div ref={conversationRef} className="flex-1 overflow-y-auto px-8 py-6">
//             <div className="max-w-4xl mx-auto space-y-6">
//               {conversations.map((message) => (
//                 <div key={message.id} className="space-y-4">
//                   {message.type === 'user' ? (
//                     <div className="flex justify-end">
//                       <div className="bg-purple-600 text-white rounded-2xl px-4 py-3 max-w-xl">
//                         <p className="text-sm">{message.content}</p>
//                         <div className="flex items-center space-x-2 mt-2 text-xs text-purple-200">
//                           {message.source === 'gmail' ? <Mail className="w-3 h-3" /> : <Database className="w-3 h-3" />}
//                           <span>{message.source}</span>
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="flex justify-start">
//                       <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-4xl w-full shadow-sm">
//                         {message.content.summary && (
//                           <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
//                             <h3 className="text-lg font-medium text-blue-900 mb-2">Summary</h3>
//                             <div className="text-blue-800 leading-relaxed">{formatText(message.content.summary)}</div>
//                             <div className="mt-2 text-sm text-blue-600">
//                               Source: {message.content.source} • {message.content.results.length} results found
//                             </div>
//                           </div>
//                         )}
                        
//                         <h3 className="text-lg font-medium text-gray-900 mb-4">
//                           {message.content.results.length} Results Found
//                         </h3>
                        
//                         <div className="space-y-3">
//                           {message.content.results.map((result, index) => 
//                             renderResult(result, index, message.content.source)
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
              
//               {isLoading && (
//                 <div className="flex justify-start">
//                   <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-xl shadow-sm">
//                     <div className="flex items-center space-x-3">
//                       <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
//                       <span className="text-gray-600">Searching...</span>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Sticky Bottom Input */}
//           <div className="border-t border-gray-200 bg-white px-8 py-4 flex-shrink-0">
//             <div className="max-w-4xl mx-auto">
//               <div className={`flex items-center space-x-3 bg-gray-100 rounded-full px-4 py-3 transition-all duration-200 ${
//                 query.trim() ? 'border-2 border-purple-300 shadow-lg' : 'border border-gray-200 shadow-sm'
//               }`}>
//                 {/* Selected Tool Icon with Green Dot */}
//                 <div className="relative">
//                   <div className="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors">
//                     {selectedTool?.icon && <selectedTool.icon className="w-4 h-4 text-gray-600" />}
//                   </div>
//                   {selectedTool?.connected && (
//                     <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
//                   )}
//                 </div>

//                 {/* Tools Button */}
//                 <div className="relative">
//                   <button
//                     onClick={() => setShowToolsMenu(!showToolsMenu)}
//                     className="flex items-center space-x-2 bg-gray-200 hover:bg-gray-300 px-3 py-1.5 rounded-full text-gray-700 transition-colors"
//                   >
//                     <Settings className="w-4 h-4" />
//                     <span className="text-sm font-medium">Tools</span>
//                   </button>

//                   {showToolsMenu && (
//                     <div className="absolute bottom-full mb-2 left-0 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
//                       <div className="p-3">
//                         <div className="mb-3">
//                           <h4 className="text-sm font-medium text-gray-700 mb-2">Select Data Source</h4>
//                         </div>
//                         {tools.map((tool) => {
//                           const Icon = tool.icon;
//                           const isActive = selectedSource === tool.id;
//                           const isConnected = tool.connected;
                          
//                           return (
//                             <button
//                               key={tool.id}
//                               onClick={() => selectTool(tool.id)}
//                               className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all mb-2 ${
//                                 isActive 
//                                   ? 'bg-purple-50 border-2 border-purple-200 shadow-sm' 
//                                   : 'hover:bg-gray-50 border-2 border-transparent'
//                               }`}
//                             >
//                               <div className="relative">
//                                 <Icon className={`w-6 h-6 ${isActive ? 'text-purple-600' : 'text-gray-500'}`} />
//                                 {isConnected && (
//                                   <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
//                                 )}
//                               </div>
                              
//                               <div className="flex-1">
//                                 <div className="flex items-center justify-between">
//                                   <span className={`font-medium ${isActive ? 'text-purple-900' : 'text-gray-900'}`}>
//                                     {tool.name}
//                                   </span>
//                                   <div className="flex items-center space-x-2">
//                                     {isConnected ? (
//                                       <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">
//                                         Connected
//                                       </span>
//                                     ) : (
//                                       <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full font-medium">
//                                         Not Connected
//                                       </span>
//                                     )}
//                                     {isActive && (
//                                       <CheckCircle2 className="w-4 h-4 text-purple-600" />
//                                     )}
//                                   </div>
//                                 </div>
//                                 <p className="text-xs text-gray-500 mt-1">{tool.description}</p>
//                                 {isConnected && (
//                                   <p className="text-xs text-green-600 mt-1 font-medium">
//                                     {tool.id === 'gmail' ? authenticatedEmail : odooConnection?.username}
//                                   </p>
//                                 )}
//                               </div>
//                             </button>
//                           );
//                         })}
                        
//                         {/* Connect Services Button */}
//                         <div className="mt-3 pt-3 border-t border-gray-200">
//                           {onGmailSetup && (
//                             <button
//                               onClick={() => {
//                                 setShowToolsMenu(false);
//                                 onGmailSetup();
//                               }}
//                               className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
//                             >
//                               Connect New Service
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Input Field */}
//                 <div className="flex-1">
//                   <input
//                     type="text"
//                     placeholder="Ask anything"
//                     value={query}
//                     onChange={(e) => setQuery(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                     disabled={!isConnected() || isLoading}
//                     className="w-full bg-transparent border-none focus:outline-none text-gray-800 placeholder-gray-500 disabled:text-gray-400 text-base"
//                   />
//                 </div>

//                 {/* Right Side Buttons */}
//                 <div className="flex items-center space-x-2">
//                   {/* Mic Button */}
//                   <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm">
//                     <span className="text-gray-600 text-sm">🎤</span>
//                   </button>

//                   {/* Send/Action Button */}
//                   <button 
//                     onClick={handleSubmit}
//                     disabled={!isConnected() || isLoading || !query.trim()}
//                     className={`w-8 h-8 text-white rounded-full flex items-center justify-center transition-all disabled:bg-gray-400 disabled:cursor-not-allowed ${
//                       query.trim() ? 'bg-purple-600 hover:bg-purple-700 shadow-md' : 'bg-black hover:bg-gray-800'
//                     }`}
//                   >
//                     {isLoading ? (
//                       <Loader2 className="w-3 h-3 animate-spin" />
//                     ) : (
//                       <Send className="w-3 h-3" />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {error && (
//                 <div className="mt-3">
//                   <ErrorDisplay error={error} />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       ) : (
//         /* Initial Landing View - Centered Layout */
//         <div className="min-h-screen flex flex-col items-center justify-center px-8 py-16 overflow-auto">
          
//           <div className="text-center mb-12">
//             <h1 className="text-2xl font-medium text-gray-800 mb-2">Good Evening, Kunal</h1>
//             <p className="text-gray-500 text-base">Enter a Keyword to get anything from your data!</p>
            
//             {/* Connection Status */}
//             <div className="mt-4 space-y-2">
//               {/* Current Source Status */}
//               {isConnected() ? (
//                 <div className="flex items-center justify-center space-x-4">
//                   <p className="text-sm text-green-600">
//                     ✅ {selectedTool?.name} Connected: {getActiveConnection()}
//                   </p>
//                   <button
//                     onClick={handleLogout}
//                     className="text-xs text-red-600 hover:text-red-700 underline"
//                   >
//                     Disconnect All
//                   </button>
//                 </div>
//               ) : (
//                 <div className="flex items-center justify-center space-x-4">
//                   <p className="text-sm text-orange-600">
//                     ⚠️ Please authenticate your {selectedTool?.name} connection first
//                   </p>
//                   {onGmailSetup && (
//                     <button
//                       onClick={onGmailSetup}
//                       className="text-sm bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
//                     >
//                       Connect Services
//                     </button>
//                   )}
//                 </div>
//               )}

//               {/* All Connections Status */}
//               <div className="flex items-center justify-center space-x-6 text-xs">
//                 <span className={`flex items-center space-x-1 ${authenticatedEmail ? 'text-green-600' : 'text-gray-400'}`}>
//                   <Mail className="w-3 h-3" />
//                   <span>Gmail {authenticatedEmail ? '✓' : '✗'}</span>
//                 </span>
//                 <span className={`flex items-center space-x-1 ${odooConnection ? 'text-green-600' : 'text-gray-400'}`}>
//                   <Database className="w-3 h-3" />
//                   <span>Odoo {odooConnection ? '✓' : '✗'}</span>
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="w-full max-w-3xl">
//             <div className={`bg-white rounded-2xl border shadow-sm p-6 mb-12 transition-all duration-200 ${
//               isInputFocused 
//                 ? 'border-purple-300 shadow-lg ring-2 ring-purple-100' 
//                 : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
//             }`}>
//               <div className="flex items-center justify-between mb-6">
//                 {/* Tools Menu */}
//                 <div className="relative">
//                   <button
//                     onClick={() => setShowToolsMenu(!showToolsMenu)}
//                     className="flex items-center space-x-2 bg-purple-100 hover:bg-purple-200 px-3 py-2 rounded-xl text-gray-700 transition-colors"
//                   >
//                     <Settings className="w-4 h-4" />
//                     <span className="text-sm font-medium">Tools</span>
//                     <ChevronDown className={`w-4 h-4 transition-transform ${showToolsMenu ? 'rotate-180' : ''}`} />
//                   </button>

//                   {showToolsMenu && (
//                     <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
//                       <div className="p-3">
//                         <div className="mb-3">
//                           <h4 className="text-sm font-medium text-gray-700 mb-2">Select Data Source</h4>
//                         </div>
//                         {tools.map((tool) => {
//                           const Icon = tool.icon;
//                           const isActive = selectedSource === tool.id;
//                           const isConnected = tool.connected;
                          
//                           return (
//                             <button
//                               key={tool.id}
//                               onClick={() => selectTool(tool.id)}
//                               className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all mb-2 ${
//                                 isActive 
//                                   ? 'bg-purple-50 border-2 border-purple-200 shadow-sm' 
//                                   : 'hover:bg-gray-50 border-2 border-transparent'
//                               }`}
//                             >
//                               <div className="relative">
//                                 <Icon className={`w-6 h-6 ${isActive ? 'text-purple-600' : 'text-gray-500'}`} />
//                                 {isConnected && (
//                                   <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
//                                 )}
//                               </div>
                              
//                               <div className="flex-1">
//                                 <div className="flex items-center justify-between">
//                                   <span className={`font-medium ${isActive ? 'text-purple-900' : 'text-gray-900'}`}>
//                                     {tool.name}
//                                   </span>
//                                   <div className="flex items-center space-x-2">
//                                     {isConnected ? (
//                                       <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">
//                                         Connected
//                                       </span>
//                                     ) : (
//                                       <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full font-medium">
//                                         Not Connected
//                                       </span>
//                                     )}
//                                     {isActive && (
//                                       <CheckCircle2 className="w-4 h-4 text-purple-600" />
//                                     )}
//                                   </div>
//                                 </div>
//                                 <p className="text-xs text-gray-500 mt-1">{tool.description}</p>
//                                 {isConnected && (
//                                   <p className="text-xs text-green-600 mt-1 font-medium">
//                                     {tool.id === 'gmail' ? authenticatedEmail : odooConnection?.username}
//                                   </p>
//                                 )}
//                               </div>
//                             </button>
//                           );
//                         })}
                        
//                         {/* Connect Services Button */}
//                         <div className="mt-3 pt-3 border-t border-gray-200">
//                           {onGmailSetup && (
//                             <button
//                               onClick={() => {
//                                 setShowToolsMenu(false);
//                                 onGmailSetup();
//                               }}
//                               className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
//                             >
//                               Connect New Service
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Selected Source Indicator */}
//                 <div className="flex items-center space-x-1 text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
//                   {selectedTool?.icon && <selectedTool.icon className="w-4 h-4" />}
//                   <span>{selectedTool?.name}</span>
//                   {isConnected() && <span className="w-2 h-2 bg-green-400 rounded-full ml-1"></span>}
//                 </div>
//               </div>

//               <div className="mb-6">
//                 <textarea
//                   placeholder={isConnected() ? `Search your ${selectedTool?.name} data...` : `Please authenticate ${selectedTool?.name} first...`}
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   onFocus={() => setIsInputFocused(true)}
//                   onBlur={() => setIsInputFocused(false)}
//                   onKeyPress={handleKeyPress}
//                   disabled={!isConnected() || isLoading}
//                   className="w-full h-10 text-base bg-transparent border-none resize-none focus:outline-none text-gray-800 placeholder-gray-400 disabled:text-gray-500"
//                 />
//               </div>

//               {error && <ErrorDisplay error={error} />}

//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-4">
//                   <button 
//                     type="button"
//                     className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 text-sm transition-colors"
//                     disabled={!isConnected()}
//                   >
//                     <Paperclip className="w-4 h-4" />
//                     <span>Add Attachment</span>
//                   </button>
//                   <button 
//                     type="button"
//                     className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 text-sm transition-colors"
//                     disabled={!isConnected()}
//                   >
//                     <Image className="w-4 h-4" />
//                     <span>Use Image</span>
//                   </button>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <span className="text-gray-400 text-sm">{query.length}/1000</span>
//                   <button 
//                     onClick={handleSubmit}
//                     disabled={!isConnected() || isLoading || !query.trim()}
//                     className={`w-8 h-8 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center transition-all disabled:bg-gray-400 disabled:cursor-not-allowed ${
//                       query.length > 0 && !isLoading ? 'scale-110 shadow-md' : ''
//                     }`}
//                   >
//                     {isLoading ? (
//                       <Loader2 className="w-4 h-4 animate-spin" />
//                     ) : (
//                       <Send className="w-4 h-4" />
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="w-full max-w-6xl">
//             <h2 className="text-xl font-medium text-gray-800 mb-6">Your recent chats</h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {recentChats.map((chat, index) => (
//                 <div
//                   key={index}
//                   className="bg-white rounded-xl border border-gray-200 p-6 hover:border-purple-300 hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:-translate-y-1"
//                   onClick={() => {
//                     if (isConnected()) {
//                       setQuery(chat.title);
//                     }
//                   }}
//                 >
//                   <div className="flex items-start space-x-3">
//                     <MessageCircle className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
//                     <div className="flex-1">
//                       <h3 className="text-gray-800 font-medium leading-snug mb-3">{chat.title}</h3>
//                       <p className="text-gray-500 text-sm">{chat.timeAgo}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HomePage;





import React, { useState, useEffect, useRef } from 'react';
import { Send, Mail, AlertCircle, CheckCircle2, Loader2, Paperclip, Image, MessageCircle, ShieldAlert, RefreshCw, ChevronDown, Database, Settings } from 'lucide-react';

const HomePage = ({ onGmailSetup, onLogout }) => {
  const [query, setQuery] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState('');
  const [authenticatedEmail, setAuthenticatedEmail] = useState(null);
  const [odooConnection, setOdooConnection] = useState(null);
  const [selectedSource, setSelectedSource] = useState('gmail');
  const [showToolsMenu, setShowToolsMenu] = useState(false);
  const conversationRef = useRef(null);
  
  useEffect(() => {
    const getConnectionsFromStorage = () => {
      const storedEmail = localStorage.getItem('authenticatedEmail');
      setAuthenticatedEmail(storedEmail);
      
      const storedOdoo = localStorage.getItem('odooConnection');
      if (storedOdoo) {
        try {
          const odooDetails = JSON.parse(storedOdoo);
          setOdooConnection(odooDetails);
        } catch (error) {
          console.error('Error parsing Odoo connection:', error);
          localStorage.removeItem('odooConnection');
        }
      } else {
        setOdooConnection(null);
      }
      
      console.log('HomePage loaded connections - Gmail:', storedEmail, 'Odoo:', storedOdoo);
    };

    getConnectionsFromStorage();

    const handleStorageChange = (e) => {
      if (e.key === 'authenticatedEmail' || e.key === 'odooConnection') {
        getConnectionsFromStorage();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(getConnectionsFromStorage, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Auto-scroll to latest message
  useEffect(() => {
    if (conversationRef.current && conversations.length > 0) {
      setTimeout(() => {
        conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
      }, 100);
    }
  }, [conversations]);

  const handleLogout = () => {
    localStorage.removeItem('authenticatedEmail');
    localStorage.removeItem('odooConnection');
    setAuthenticatedEmail(null);
    setOdooConnection(null);
    if (onLogout) {
      onLogout();
    }
  };

  const getActiveConnection = () => {
    if (selectedSource === 'gmail') {
      return authenticatedEmail;
    } else if (selectedSource === 'odoo') {
      return odooConnection?.username;
    }
    return null;
  };

  const isConnected = () => {
    if (selectedSource === 'gmail') {
      return !!authenticatedEmail;
    } else if (selectedSource === 'odoo') {
      return !!odooConnection;
    }
    return false;
  };

  const tools = [
    {
      id: 'gmail',
      name: 'Gmail',
      icon: Mail,
      description: 'Search your Gmail emails',
      connected: !!authenticatedEmail
    },
    {
      id: 'odoo',
      name: 'Odoo',
      icon: Database,
      description: 'Search your Odoo data',
      connected: !!odooConnection
    }
  ];

  const recentChats = [
    {
      title: "Show me all contacts living in Berlin",
      timeAgo: "6 Hours"
    },
    {
      title: "My last touch points with Lukas",
      timeAgo: "12 Hours"
    },
    {
      title: "Who in my network is an SaaS expert",
      timeAgo: "18 Hours"
    }
  ];

  const parseError = (errorMessage) => {
    if (errorMessage.includes('401') || errorMessage.includes('No valid credentials')) {
      return {
        type: 'auth',
        title: 'Authentication Required',
        message: `Your ${selectedSource} connection has expired or is invalid. Please reconnect your ${selectedSource} account to continue searching.`,
        action: `Reconnect ${selectedSource.charAt(0).toUpperCase() + selectedSource.slice(1)}`
      };
    }
    
    if (errorMessage.includes('500') || errorMessage.includes('API Error')) {
      return {
        type: 'server',
        title: 'Server Error',
        message: 'Something went wrong on our end. Please try again in a moment.',
        action: 'Try Again'
      };
    }
    
    if (errorMessage.includes('NetworkError') || errorMessage.includes('fetch')) {
      return {
        type: 'network',
        title: 'Connection Error',
        message: 'Unable to connect to our servers. Please check your internet connection.',
        action: 'Retry'
      };
    }
    
    return {
      type: 'general',
      title: 'Something went wrong',
      message: 'An unexpected error occurred. Please try again.',
      action: 'Try Again'
    };
  };

  const handleSubmit = async () => {
    if (!query.trim()) {
      setError('Please enter a query');
      return;
    }

    const activeConnection = getActiveConnection();
    if (!activeConnection) {
      setError(`Please authenticate your ${selectedSource} connection first`);
      return;
    }

    setIsLoading(true);
    setError('');

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: query.trim(),
      source: selectedSource,
      timestamp: new Date()
    };
    
    const currentQuery = query.trim();
    setQuery('');
    setConversations(prev => [...prev, userMessage]);

    try {
      let payload = {
        query: currentQuery,
        max_results: 10,
        source: selectedSource
      };

      if (selectedSource === 'gmail') {
        payload.gmail_address = authenticatedEmail;
      } else if (selectedSource === 'odoo') {
        payload.gmail_address = odooConnection?.username;
      }

      console.log('Search payload:', payload);

      const response = await fetch(`${import.meta.env.VITE_SEARCH_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data);
        
        const assistantMessage = {
          id: Date.now() + 1,
          type: 'assistant',
          content: {
            results: data.results || [],
            summary: data.summary,
            source: data.source || selectedSource
          },
          timestamp: new Date()
        };
        
        setConversations(prev => [...prev, assistantMessage]);
      } else {
        const errorData = await response.text();
        throw new Error(`API Error: ${response.status} - ${errorData}`);
      }
    } catch (error) {
      console.error('Search error:', error);
      setError(`Failed to search: ${error.message}`);
      setConversations(prev => prev.slice(0, -1));
      setQuery(currentQuery);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const formatDate = (timestamp) => {
    try {
      let date;
      
      if (typeof timestamp === 'string' && timestamp.includes('-')) {
        date = new Date(timestamp);
      } else if (typeof timestamp === 'string' && timestamp.length > 10) {
        date = new Date(parseInt(timestamp));
      } else if (typeof timestamp === 'number') {
        date = new Date(timestamp);
      } else {
        date = new Date(timestamp);
      }

      if (isNaN(date.getTime())) {
        return timestamp;
      }

      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return timestamp;
    }
  };

  const handleErrorAction = (errorInfo) => {
    if (errorInfo.type === 'auth' && onGmailSetup) {
      onGmailSetup();
    } else {
      setError('');
    }
  };

  const selectTool = (toolId) => {
    setSelectedSource(toolId);
    setShowToolsMenu(false);
    setError('');
  };

  const selectedTool = tools.find(tool => tool.id === selectedSource);

  const renderResult = (result, index, source) => {
    const isOdooResult = source === 'odoo';
    
    let title, fromField, dateField, contentField, linkField, additionalInfo;
    
    if (isOdooResult) {
      title = result.display_name || result.partner_name || result.name || 'Untitled Record';
      fromField = result.email_from || result.email_normalized || result.partner_name;
      dateField = result.create_date || result.write_date || result.date_open;
      contentField = result.description || 
                   (result.expected_revenue ? `Expected Revenue: $${result.expected_revenue}` : '') ||
                   (result.stage_id ? `Stage: ${Array.isArray(result.stage_id) ? result.stage_id[1] : result.stage_id}` : '');
      linkField = result.website;
      
      additionalInfo = [];
      if (result.phone) additionalInfo.push(`Phone: ${result.phone}`);
      if (result.expected_revenue) additionalInfo.push(`Revenue: $${result.expected_revenue}`);
      if (result.probability) additionalInfo.push(`Probability: ${result.probability}%`);
      if (result.stage_id && Array.isArray(result.stage_id)) additionalInfo.push(`Stage: ${result.stage_id[1]}`);
      if (result.user_id && Array.isArray(result.user_id)) additionalInfo.push(`Assigned to: ${result.user_id[1]}`);
      if (result.city) additionalInfo.push(`Location: ${result.city}`);
    } else {
      title = result.subject || 'No Subject';
      fromField = result.from;
      dateField = result.date;
      contentField = result.snippet;
      linkField = result.link;
      additionalInfo = [];
    }

    return (
      <div
        key={result.id || index}
        className="bg-white rounded-xl border border-gray-200 p-4 hover:border-purple-300 hover:shadow-md transition-all duration-200"
      >
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-gray-900 leading-tight">
            {title}
          </h3>
          
          <div className="flex items-center justify-between text-sm text-gray-600 flex-wrap gap-2">
            {fromField && (
              <span className="flex items-center">
                <span className="font-medium">
                  {isOdooResult ? 'Contact:' : 'From:'}
                </span>
                <span className="ml-1">{fromField}</span>
              </span>
            )}
            {dateField && (
              <span className="text-gray-500 text-xs">
                {formatDate(dateField)}
              </span>
            )}
          </div>

          {isOdooResult && additionalInfo.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {additionalInfo.map((info, idx) => (
                <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {info}
                </span>
              ))}
            </div>
          )}
          
          {contentField && (
            <p className="text-gray-700 leading-relaxed text-sm">
              {contentField}
            </p>
          )}
          
          {linkField && (
            <div className="pt-2">
              <a
                href={linkField}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-purple-600 hover:text-purple-700 hover:underline"
              >
                {isOdooResult ? (
                  <>
                    <Database className="w-4 h-4 mr-1" />
                    {linkField.includes('http') ? 'Visit Website' : 'Open in Odoo'}
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-1" />
                    Open in Gmail
                  </>
                )}
              </a>
            </div>
          )}
        </div>
      </div>
    );
  };

  const ErrorDisplay = ({ error }) => {
    const errorInfo = parseError(error);
    
    const getErrorIcon = (type) => {
      switch (type) {
        case 'auth':
          return <ShieldAlert className="w-5 h-5" />;
        case 'server':
          return <AlertCircle className="w-5 h-5" />;
        case 'network':
          return <RefreshCw className="w-5 h-5" />;
        default:
          return <AlertCircle className="w-5 h-5" />;
      }
    };

    const getErrorColors = (type) => {
      switch (type) {
        case 'auth':
          return {
            bg: 'bg-orange-50',
            border: 'border-orange-200',
            text: 'text-orange-800',
            icon: 'text-orange-600',
            button: 'bg-orange-600 hover:bg-orange-700'
          };
        case 'server':
          return {
            bg: 'bg-red-50',
            border: 'border-red-200',
            text: 'text-red-800',
            icon: 'text-red-600',
            button: 'bg-red-600 hover:bg-red-700'
          };
        case 'network':
          return {
            bg: 'bg-blue-50',
            border: 'border-blue-200',
            text: 'text-blue-800',
            icon: 'text-blue-600',
            button: 'bg-blue-600 hover:bg-blue-700'
          };
        default:
          return {
            bg: 'bg-gray-50',
            border: 'border-gray-200',
            text: 'text-gray-800',
            icon: 'text-gray-600',
            button: 'bg-gray-600 hover:bg-gray-700'
          };
      }
    };

    const colors = getErrorColors(errorInfo.type);

    return (
      <div className={`mb-4 p-4 ${colors.bg} ${colors.border} border rounded-xl`}>
        <div className="flex items-start space-x-3">
          <div className={`${colors.icon} flex-shrink-0 mt-0.5`}>
            {getErrorIcon(errorInfo.type)}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className={`font-medium ${colors.text} mb-1`}>
              {errorInfo.title}
            </h4>
            <p className={`text-sm ${colors.text} opacity-90 leading-relaxed`}>
              {errorInfo.message}
            </p>
          </div>
          <button
            onClick={() => handleErrorAction(errorInfo)}
            className={`flex-shrink-0 px-3 py-1.5 ${colors.button} text-white text-sm font-medium rounded-lg transition-colors`}
          >
            {errorInfo.action}
          </button>
        </div>
      </div>
    );
  };

  const formatText = (text) => {
    if (!text) return text;
    
    // Split by line breaks first
    const lines = text.split('\n');
    
    return lines.map((line, lineIndex) => {
      // Process each line for bold and italic formatting
      const parts = [];
      let remainingText = line;
      let key = 0;
      
      while (remainingText.length > 0) {
        // Check for bold text (**text**)
        const boldMatch = remainingText.match(/\*\*(.*?)\*\*/);
        if (boldMatch) {
          const beforeBold = remainingText.substring(0, boldMatch.index);
          const boldText = boldMatch[1];
          
          // Add text before bold
          if (beforeBold) {
            // Check for italic in the before text
            const processedBefore = processItalic(beforeBold, key);
            parts.push(...processedBefore.parts);
            key = processedBefore.nextKey;
          }
          
          // Add bold text (also check for italic inside bold)
          const processedBold = processItalic(boldText, key);
          parts.push(
            <strong key={key++}>
              {processedBold.parts.length > 0 ? processedBold.parts : boldText}
            </strong>
          );
          key = processedBold.nextKey;
          
          // Continue with remaining text
          remainingText = remainingText.substring(boldMatch.index + boldMatch[0].length);
        } else {
          // No more bold text, process remaining for italic
          const processedRemaining = processItalic(remainingText, key);
          parts.push(...processedRemaining.parts);
          break;
        }
      }
      
      return (
        <span key={lineIndex}>
          {parts.length > 0 ? parts : line}
          {lineIndex < lines.length - 1 && <br />}
        </span>
      );
    });
  };

  const processItalic = (text, startKey) => {
    const parts = [];
    let remainingText = text;
    let key = startKey;
    
    while (remainingText.length > 0) {
      const italicMatch = remainingText.match(/\*(.*?)\*/);
      if (italicMatch) {
        const beforeItalic = remainingText.substring(0, italicMatch.index);
        const italicText = italicMatch[1];
        
        // Add text before italic
        if (beforeItalic) {
          parts.push(beforeItalic);
        }
        
        // Add italic text
        parts.push(<em key={key++}>{italicText}</em>);
        
        // Continue with remaining text
        remainingText = remainingText.substring(italicMatch.index + italicMatch[0].length);
      } else {
        // No more italic text
        if (remainingText) {
          parts.push(remainingText);
        }
        break;
      }
    }
    
    return { parts: parts.length > 0 ? parts : [text], nextKey: key };
  };

  const hasConversations = conversations.length > 0;

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {hasConversations ? (
        /* Conversation View - After First Query */
        <div className="h-screen flex flex-col">
          {/* Header - Connection Status */}
          <div className="border-b border-gray-200 bg-white px-8 py-4 flex-shrink-0">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-medium text-gray-800">Good Evening, Kunal</h1>
                  <p className="text-sm text-gray-500">Enter a keyword to get anything from your data!</p>
                </div>
                
                <div className="flex items-center space-x-4 text-xs">
                  <span className={`flex items-center space-x-1 ${authenticatedEmail ? 'text-green-600' : 'text-gray-400'}`}>
                    <Mail className="w-3 h-3" />
                    <span>Gmail {authenticatedEmail ? '✓' : '✗'}</span>
                  </span>
                  <span className={`flex items-center space-x-1 ${odooConnection ? 'text-green-600' : 'text-gray-400'}`}>
                    <Database className="w-3 h-3" />
                    <span>Odoo {odooConnection ? '✓' : '✗'}</span>
                  </span>
                  {(authenticatedEmail || odooConnection) && (
                    <button
                      onClick={handleLogout}
                      className="text-red-600 hover:text-red-700 underline"
                    >
                      Disconnect All
                    </button>
                  )}
                  {onGmailSetup && (
                    <button
                      onClick={onGmailSetup}
                      className="bg-purple-500 text-white px-3 py-1 rounded-lg hover:bg-purple-600"
                    >
                      Connect Services
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable Conversation Area */}
          <div ref={conversationRef} className="flex-1 overflow-y-auto px-8 py-6">
            <div className="max-w-4xl mx-auto space-y-6">
              {conversations.map((message) => (
                <div key={message.id} className="space-y-4">
                  {message.type === 'user' ? (
                    <div className="flex justify-end">
                      <div className="bg-purple-600 text-white rounded-2xl px-4 py-3 max-w-xl">
                        <p className="text-sm">{message.content}</p>
                        <div className="flex items-center space-x-2 mt-2 text-xs text-purple-200">
                          {message.source === 'gmail' ? <Mail className="w-3 h-3" /> : <Database className="w-3 h-3" />}
                          <span>{message.source}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-start">
                      <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-4xl w-full shadow-sm">
                        {message.content.summary && (
                          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                            <h3 className="text-lg font-medium text-blue-900 mb-2">Summary</h3>
                            <div className="text-blue-800 leading-relaxed">{formatText(message.content.summary)}</div>
                            <div className="mt-2 text-sm text-blue-600">
                              Source: {message.content.source} • {message.content.results.length} results found
                            </div>
                          </div>
                        )}
                        
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                          {message.content.results.length} Results Found
                        </h3>
                        
                        <div className="space-y-3">
                          {message.content.results.map((result, index) => 
                            renderResult(result, index, message.content.source)
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-xl shadow-sm">
                    <div className="flex items-center space-x-3">
                      <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
                      <span className="text-gray-600">Searching...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sticky Bottom Input */}
          <div className="border-t border-gray-200 bg-white px-8 py-4 flex-shrink-0">
            <div className="max-w-4xl mx-auto">
              <div className={`flex items-center space-x-3 bg-gray-100 rounded-full px-4 py-3 transition-all duration-200 ${
                query.trim() ? 'border-2 border-purple-300 shadow-lg' : 'border-2 border-gray-200 shadow-sm'
              }`}>
                {/* Selected Tool Icon with Green Dot */}
                <div className="relative">
                  <div className="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors">
                    {selectedTool?.icon && <selectedTool.icon className="w-4 h-4 text-gray-600" />}
                  </div>
                  {selectedTool?.connected && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                  )}
                </div>

                {/* Tools Button */}
                <div className="relative">
                  <button
                    onClick={() => setShowToolsMenu(!showToolsMenu)}
                    className="flex items-center space-x-2 bg-gray-200 hover:bg-gray-300 px-3 py-1.5 rounded-full text-gray-700 transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    <span className="text-sm font-medium">Tools</span>
                  </button>

                  {showToolsMenu && (
                    <div className="absolute bottom-full mb-2 left-0 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                      <div className="p-3">
                        <div className="mb-3">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Select Data Source</h4>
                        </div>
                        {tools.map((tool) => {
                          const Icon = tool.icon;
                          const isActive = selectedSource === tool.id;
                          const isConnected = tool.connected;
                          
                          return (
                            <button
                              key={tool.id}
                              onClick={() => selectTool(tool.id)}
                              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all mb-2 ${
                                isActive 
                                  ? 'bg-purple-50 border-2 border-purple-200 shadow-sm' 
                                  : 'hover:bg-gray-50 border-2 border-transparent'
                              }`}
                            >
                              <div className="relative">
                                <Icon className={`w-6 h-6 ${isActive ? 'text-purple-600' : 'text-gray-500'}`} />
                                {isConnected && (
                                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                                )}
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className={`font-medium ${isActive ? 'text-purple-900' : 'text-gray-900'}`}>
                                    {tool.name}
                                  </span>
                                  <div className="flex items-center space-x-2">
                                    {isConnected ? (
                                      <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">
                                        Connected
                                      </span>
                                    ) : (
                                      <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full font-medium">
                                        Not Connected
                                      </span>
                                    )}
                                    {isActive && (
                                      <CheckCircle2 className="w-4 h-4 text-purple-600" />
                                    )}
                                  </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">{tool.description}</p>
                                {isConnected && (
                                  <p className="text-xs text-green-600 mt-1 font-medium">
                                    {tool.id === 'gmail' ? authenticatedEmail : odooConnection?.username}
                                  </p>
                                )}
                              </div>
                            </button>
                          );
                        })}
                        
                        {/* Connect Services Button */}
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          {onGmailSetup && (
                            <button
                              onClick={() => {
                                setShowToolsMenu(false);
                                onGmailSetup();
                              }}
                              className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                            >
                              Connect New Service
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Field */}
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Ask anything"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={!isConnected() || isLoading}
                    className="w-full bg-transparent border-none focus:outline-none text-gray-800 placeholder-gray-500 disabled:text-gray-400 text-base"
                  />
                </div>

                {/* Right Side Buttons */}
                <div className="flex items-center space-x-2">
                  {/* Mic Button */}
                  {/* <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm">
                    <span className="text-gray-600 text-sm">🎤</span>
                  </button> */}

                  {/* Send/Action Button */}
                  <button 
                    onClick={handleSubmit}
                    disabled={!isConnected() || isLoading || !query.trim()}
                    className={`w-8 h-8 text-white rounded-full flex items-center justify-center transition-all disabled:bg-gray-400 disabled:cursor-not-allowed ${
                      query.trim() ? 'bg-purple-600 hover:bg-purple-700 shadow-md' : 'bg-black hover:bg-gray-800'
                    }`}
                  >
                    {isLoading ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Send className="w-3 h-3" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="mt-3">
                  <ErrorDisplay error={error} />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Initial Landing View - Centered Layout */
        <div className="min-h-screen flex flex-col items-center justify-center px-8 py-16 overflow-auto">
          
          <div className="text-center mb-12">
            <h1 className="text-2xl font-medium text-gray-800 mb-2">Good Evening, Kunal</h1>
            <p className="text-gray-500 text-base">Enter a Keyword to get anything from your data!</p>
            
            {/* Connection Status */}
            <div className="mt-4 space-y-2">
              {/* Current Source Status */}
              {isConnected() ? (
                <div className="flex items-center justify-center space-x-4">
                  <p className="text-sm text-green-600">
                    ✅ {selectedTool?.name} Connected: {getActiveConnection()}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="text-xs text-red-600 hover:text-red-700 underline"
                  >
                    Disconnect All
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-4">
                  <p className="text-sm text-orange-600">
                    ⚠️ Please authenticate your {selectedTool?.name} connection first
                  </p>
                  {onGmailSetup && (
                    <button
                      onClick={onGmailSetup}
                      className="text-sm bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                    >
                      Connect Services
                    </button>
                  )}
                </div>
              )}

              {/* All Connections Status */}
              <div className="flex items-center justify-center space-x-6 text-xs">
                <span className={`flex items-center space-x-1 ${authenticatedEmail ? 'text-green-600' : 'text-gray-400'}`}>
                  <Mail className="w-3 h-3" />
                  <span>Gmail {authenticatedEmail ? '✓' : '✗'}</span>
                </span>
                <span className={`flex items-center space-x-1 ${odooConnection ? 'text-green-600' : 'text-gray-400'}`}>
                  <Database className="w-3 h-3" />
                  <span>Odoo {odooConnection ? '✓' : '✗'}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="w-full max-w-3xl">
            <div className={`bg-white rounded-2xl border shadow-sm p-6 mb-12 transition-all duration-200 ${
              isInputFocused 
                ? 'border-purple-300 shadow-lg ring-2 ring-purple-100' 
                : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
            }`}>
              <div className="flex items-center justify-between mb-6">
                {/* Tools Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowToolsMenu(!showToolsMenu)}
                    className="flex items-center space-x-2 bg-purple-100 hover:bg-purple-200 px-3 py-2 rounded-xl text-gray-700 transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    <span className="text-sm font-medium">Tools</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showToolsMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {showToolsMenu && (
                    <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                      <div className="p-3">
                        <div className="mb-3">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Select Data Source</h4>
                        </div>
                        {tools.map((tool) => {
                          const Icon = tool.icon;
                          const isActive = selectedSource === tool.id;
                          const isConnected = tool.connected;
                          
                          return (
                            <button
                              key={tool.id}
                              onClick={() => selectTool(tool.id)}
                              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all mb-2 ${
                                isActive 
                                  ? 'bg-purple-50 border-2 border-purple-200 shadow-sm' 
                                  : 'hover:bg-gray-50 border-2 border-transparent'
                              }`}
                            >
                              <div className="relative">
                                <Icon className={`w-6 h-6 ${isActive ? 'text-purple-600' : 'text-gray-500'}`} />
                                {isConnected && (
                                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                                )}
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className={`font-medium ${isActive ? 'text-purple-900' : 'text-gray-900'}`}>
                                    {tool.name}
                                  </span>
                                  <div className="flex items-center space-x-2">
                                    {isConnected ? (
                                      <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">
                                        Connected
                                      </span>
                                    ) : (
                                      <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full font-medium">
                                        Not Connected
                                      </span>
                                    )}
                                    {isActive && (
                                      <CheckCircle2 className="w-4 h-4 text-purple-600" />
                                    )}
                                  </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">{tool.description}</p>
                                {isConnected && (
                                  <p className="text-xs text-green-600 mt-1 font-medium">
                                    {tool.id === 'gmail' ? authenticatedEmail : odooConnection?.username}
                                  </p>
                                )}
                              </div>
                            </button>
                          );
                        })}
                        
                        {/* Connect Services Button */}
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          {onGmailSetup && (
                            <button
                              onClick={() => {
                                setShowToolsMenu(false);
                                onGmailSetup();
                              }}
                              className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                            >
                              Connect New Service
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Selected Source Indicator */}
                <div className="flex items-center space-x-1 text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                  {selectedTool?.icon && <selectedTool.icon className="w-4 h-4" />}
                  <span>{selectedTool?.name}</span>
                  {isConnected() && <span className="w-2 h-2 bg-green-400 rounded-full ml-1"></span>}
                </div>
              </div>

              <div className="mb-6">
                <textarea
                  placeholder={isConnected() ? `Search your ${selectedTool?.name} data...` : `Please authenticate ${selectedTool?.name} first...`}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  onKeyPress={handleKeyPress}
                  disabled={!isConnected() || isLoading}
                  className="w-full h-10 text-base bg-transparent border-none resize-none focus:outline-none text-gray-800 placeholder-gray-400 disabled:text-gray-500"
                />
              </div>

              {error && <ErrorDisplay error={error} />}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button 
                    type="button"
                    className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 text-sm transition-colors"
                    disabled={!isConnected()}
                  >
                    <Paperclip className="w-4 h-4" />
                    <span>Add Attachment</span>
                  </button>
                  <button 
                    type="button"
                    className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 text-sm transition-colors"
                    disabled={!isConnected()}
                  >
                    <Image className="w-4 h-4" />
                    <span>Use Image</span>
                  </button>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400 text-sm">{query.length}/1000</span>
                  <button 
                    onClick={handleSubmit}
                    disabled={!isConnected() || isLoading || !query.trim()}
                    className={`w-8 h-8 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center transition-all disabled:bg-gray-400 disabled:cursor-not-allowed ${
                      query.length > 0 && !isLoading ? 'scale-110 shadow-md' : ''
                    }`}
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-6xl">
            <h2 className="text-xl font-medium text-gray-800 mb-6">Your recent chats</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentChats.map((chat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:border-purple-300 hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:-translate-y-1"
                  onClick={() => {
                    if (isConnected()) {
                      setQuery(chat.title);
                    }
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <MessageCircle className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-gray-800 font-medium leading-snug mb-3">{chat.title}</h3>
                      <p className="text-gray-500 text-sm">{chat.timeAgo}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;