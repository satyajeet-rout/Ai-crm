// import React, { useState } from 'react';
// import { Search, Plus, Filter, ArrowUpDown, Home, Users, Bell, CheckSquare, FileText, Settings, Link, ArrowLeft, Mail, Phone, MapPin, Calendar, Edit, Trash2, Star, Clock, Mic, Send, MoreHorizontal, AlertCircle, CheckCircle2, Circle, BookOpen, X, Paperclip, Image, MessageCircle } from 'lucide-react';



// const HomePage = () => {
//     const [query, setQuery] = useState('');
//     const [isInputFocused, setIsInputFocused] = useState(false);
  
//     const recentChats = [
//       {
//         title: "Show me all contacts living in Berlin",
//         timeAgo: "6 Hours"
//       },
//       {
//         title: "My last touch points with Lukas",
//         timeAgo: "12 Hours"
//       },
//       {
//         title: "Who in my network is an SaaS expert",
//         timeAgo: "18 Hours"
//       }
//     ];
  
//     return (
//       <div className="flex-1 flex flex-col min-h-screen bg-gray-50 overflow-auto">
//         <div className="flex-1 flex flex-col items-center justify-center px-8 py-16">
          
//           {/* Avatar and greeting */}
//           <div className="text-center mb-12">
            
//             {/* <img  src=".././public/assets/images/cosmic-ball.png" alt="User Avatar" className="rounded-full w-20 h-20 mb-4 mx-auto" /> */}
//             <h1 className="text-2xl font-medium text-gray-800 mb-2">Good Evening, Kunal</h1>
//             <p className="text-gray-500 text-base">Enter a simple prompt to generate anything you want !</p>
//           </div>
  
//           {/* Main input area */}
//           <div className="w-full max-w-3xl">
//             <div className={`bg-white rounded-2xl border shadow-sm p-6 mb-12 transition-all duration-200 ${
//               isInputFocused 
//                 ? 'border-purple-300 shadow-lg ring-2 ring-purple-100' 
//                 : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
//             }`}>
//               {/* Input header */}
//               <div className="flex items-center justify-between mb-6">
//                 <div className="flex items-center space-x-2 text-gray-600">
//                   <Send className="w-4 h-4" />
//                   <span className="text-sm font-medium">Ask whatever you want</span>
//                 </div>
//                 <div className="flex items-center space-x-1 text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
//                   <span>🌐</span>
//                   <span>All Web</span>
//                 </div>
//               </div>
  
//               {/* Large textarea */}
//               <div className="mb-6">
//                 <textarea
//                   placeholder="Type your question here..."
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   onFocus={() => setIsInputFocused(true)}
//                   onBlur={() => setIsInputFocused(false)}
//                   className="w-full h-10 text-base bg-transparent border-none resize-none focus:outline-none text-gray-800 placeholder-gray-400"
//                 />
//               </div>
  
//               {/* Bottom toolbar */}
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-4">
//                   <button className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 text-sm transition-colors">
//                     <Paperclip className="w-4 h-4" />
//                     <span>Add Attachment</span>
//                   </button>
//                   <button className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 text-sm transition-colors">
//                     <Image className="w-4 h-4" />
//                     <span>Use Image</span>
//                   </button>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <span className="text-gray-400 text-sm">{query.length}/1000</span>
//                   <button className={`w-8 h-8 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center transition-all ${
//                     query.length > 0 ? 'scale-110 shadow-md' : ''
//                   }`}>
//                     <Send className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
  
//           {/* Recent chats section */}
//           <div className="w-full max-w-6xl">
//             <h2 className="text-xl font-medium text-gray-800 mb-6">Your recents chats</h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {recentChats.map((chat, index) => (
//                 <div
//                   key={index}
//                   className="bg-white rounded-xl border border-gray-200 p-6 hover:border-purple-300 hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:-translate-y-1"
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
//       </div>
//     );
// };
  
// export default HomePage;



// import React, { useState, useEffect } from 'react';
// import { Send, Mail, AlertCircle, CheckCircle2, Loader2, Paperclip, Image, MessageCircle } from 'lucide-react';

// const HomePage = ({ onGmailSetup, onLogout }) => {
//   const [query, setQuery] = useState('');
//   const [isInputFocused, setIsInputFocused] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [results, setResults] = useState([]);
//   const [error, setError] = useState('');
//   const [authenticatedEmail, setAuthenticatedEmail] = useState(null);
  
//   // Get email from localStorage on component mount and when localStorage changes
//   useEffect(() => {
//     const getEmailFromStorage = () => {
//       const storedEmail = localStorage.getItem('authenticatedEmail');
//       setAuthenticatedEmail(storedEmail);
//       console.log('HomePage loaded email from localStorage:', storedEmail);
//     };

//     // Load initially
//     getEmailFromStorage();

//     // Listen for localStorage changes (when user authenticates in another tab/component)
//     const handleStorageChange = (e) => {
//       if (e.key === 'authenticatedEmail') {
//         setAuthenticatedEmail(e.newValue);
//         console.log('HomePage detected localStorage change:', e.newValue);
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);
    
//     // Also check periodically (for same-tab changes)
//     const interval = setInterval(getEmailFromStorage, 1000);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       clearInterval(interval);
//     };
//   }, []);

//   // Handle logout
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
//     setResults([]);

//     try {
//       const response = await fetch('https://info-retrieval-agent-btbsfphfe7fkegd8.centralindia-01.azurewebsites.net/api/v1/retrieve', {
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
//         setResults(data.results || data);
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

//   return (
//     <div className="flex-1 flex flex-col min-h-screen bg-gray-50 overflow-auto">
//       <div className="flex-1 flex flex-col items-center justify-center px-8 py-16">
        
//         {/* Avatar and greeting */}
//         <div className="text-center mb-12">
//           <h1 className="text-2xl font-medium text-gray-800 mb-2">Good Evening, Kunal</h1>
//           <p className="text-gray-500 text-base">Enter a simple prompt to generate anything you want!</p>
          
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

//         {/* Main input area */}
//         <div className="w-full max-w-3xl">
//           <div className={`bg-white rounded-2xl border shadow-sm p-6 mb-12 transition-all duration-200 ${
//             isInputFocused 
//               ? 'border-purple-300 shadow-lg ring-2 ring-purple-100' 
//               : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
//           }`}>
//             {/* Input header */}
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center space-x-2 text-gray-600">
//                 <Send className="w-4 h-4" />
//                 <span className="text-sm font-medium">Ask whatever you want</span>
//               </div>
//               <div className="flex items-center space-x-1 text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
//                 <Mail className="w-4 h-4" />
//                 <span>Gmail</span>
//               </div>
//             </div>

//             {/* Large textarea */}
//             <div className="mb-6">
//               <textarea
//                 placeholder={authenticatedEmail ? "Type your question here..." : "Please authenticate your email first..."}
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 onFocus={() => setIsInputFocused(true)}
//                 onBlur={() => setIsInputFocused(false)}
//                 onKeyPress={handleKeyPress}
//                 disabled={!authenticatedEmail || isLoading}
//                 className="w-full h-10 text-base bg-transparent border-none resize-none focus:outline-none text-gray-800 placeholder-gray-400 disabled:text-gray-500"
//               />
//             </div>

//             {/* Error message */}
//             {error && (
//               <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
//                 <div className="flex items-center">
//                   <AlertCircle className="w-4 h-4 mr-2" />
//                   {error}
//                 </div>
//               </div>
//             )}

//             {/* Bottom toolbar */}
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

//         {/* Results section */}
//         {results.length > 0 && (
//           <div className="w-full max-w-6xl mb-8">
//             <h2 className="text-xl font-medium text-gray-800 mb-6">Search Results</h2>
//             <div className="space-y-4">
//               {results.map((result, index) => (
//                 <div
//                   key={index}
//                   className="bg-white rounded-xl border border-gray-200 p-6 hover:border-purple-300 hover:shadow-lg transition-all duration-200"
//                 >
//                   <div className="space-y-2">
//                     {result.subject && (
//                       <h3 className="text-lg font-medium text-gray-800">{result.subject}</h3>
//                     )}
//                     {result.from && (
//                       <p className="text-sm text-gray-600">From: {result.from}</p>
//                     )}
//                     {result.date && (
//                       <p className="text-sm text-gray-500">Date: {result.date}</p>
//                     )}
//                     {result.snippet && (
//                       <p className="text-gray-700 mt-2">{result.snippet}</p>
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

//         {/* Recent chats section */}
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
// import { Send, Mail, AlertCircle, CheckCircle2, Loader2, Paperclip, Image, MessageCircle } from 'lucide-react';

// const HomePage = ({ onGmailSetup, onLogout }) => {
//   const [query, setQuery] = useState('');
//   const [isInputFocused, setIsInputFocused] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [results, setResults] = useState(null);
//   const [error, setError] = useState('');
//   const [authenticatedEmail, setAuthenticatedEmail] = useState(null);
  
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
//       const response = await fetch('https://info-retrieval-agent-btbsfphfe7fkegd8.centralindia-01.azurewebsites.net/api/v1/retrieve', {
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
//     } catch (e) {
//       return timestamp;
//     }
//   };

//   return (
//     <div className="flex-1 flex flex-col min-h-screen bg-gray-50 overflow-auto">
//       <div className="flex-1 flex flex-col items-center justify-center px-8 py-16">
        
//         <div className="text-center mb-12">
//           <h1 className="text-2xl font-medium text-gray-800 mb-2">Good Evening, Kunal</h1>
//           <p className="text-gray-500 text-base">Enter a simple prompt to generate anything you want!</p>
          
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
//               <div className="flex items-center space-x-2 text-gray-600">
//                 <Send className="w-4 h-4" />
//                 <span className="text-sm font-medium">Ask whatever you want</span>
//               </div>
//               <div className="flex items-center space-x-1 text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
//                 <Mail className="w-4 h-4" />
//                 <span>Gmail</span>
//               </div>
//             </div>

//             <div className="mb-6">
//               <textarea
//                 placeholder={authenticatedEmail ? "Type your question here..." : "Please authenticate your email first..."}
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 onFocus={() => setIsInputFocused(true)}
//                 onBlur={() => setIsInputFocused(false)}
//                 onKeyPress={handleKeyPress}
//                 disabled={!authenticatedEmail || isLoading}
//                 className="w-full h-10 text-base bg-transparent border-none resize-none focus:outline-none text-gray-800 placeholder-gray-400 disabled:text-gray-500"
//               />
//             </div>

//             {error && (
//               <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
//                 <div className="flex items-center">
//                   <AlertCircle className="w-4 h-4 mr-2" />
//                   {error}
//                 </div>
//               </div>
//             )}

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
//                     {result.subject && (
//                       <h3 className="text-lg font-medium text-gray-800 leading-tight">
//                         {result.subject}
//                       </h3>
//                     )}
                    
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
// import { Send, Mail, AlertCircle, CheckCircle2, Loader2, Paperclip, Image, MessageCircle } from 'lucide-react';

// const HomePage = ({ onGmailSetup, onLogout }) => {
//   const [query, setQuery] = useState('');
//   const [isInputFocused, setIsInputFocused] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [results, setResults] = useState(null);
//   const [error, setError] = useState('');
//   const [authenticatedEmail, setAuthenticatedEmail] = useState(null);
  
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
//     } catch (e) {
//       return timestamp;
//     }
//   };

//   return (
//     <div className="flex-1 flex flex-col min-h-screen bg-gray-50 overflow-auto">
//       <div className="flex-1 flex flex-col items-center justify-center px-8 py-16">
        
//         <div className="text-center mb-12">
//           <h1 className="text-2xl font-medium text-gray-800 mb-2">Good Evening, Kunal</h1>
//           <p className="text-gray-500 text-base">Enter a simple prompt to generate anything you want!</p>
          
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
//               <div className="flex items-center space-x-2 text-gray-600">
//                 <Send className="w-4 h-4" />
//                 <span className="text-sm font-medium">Ask whatever you want</span>
//               </div>
//               <div className="flex items-center space-x-1 text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
//                 <Mail className="w-4 h-4" />
//                 <span>Gmail</span>
//               </div>
//             </div>

//             <div className="mb-6">
//               <textarea
//                 placeholder={authenticatedEmail ? "Type your question here..." : "Please authenticate your email first..."}
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 onFocus={() => setIsInputFocused(true)}
//                 onBlur={() => setIsInputFocused(false)}
//                 onKeyPress={handleKeyPress}
//                 disabled={!authenticatedEmail || isLoading}
//                 className="w-full h-10 text-base bg-transparent border-none resize-none focus:outline-none text-gray-800 placeholder-gray-400 disabled:text-gray-500"
//               />
//             </div>

//             {error && (
//               <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
//                 <div className="flex items-center">
//                   <AlertCircle className="w-4 h-4 mr-2" />
//                   {error}
//                 </div>
//               </div>
//             )}

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
// import { Send, Mail, AlertCircle, CheckCircle2, Loader2, Paperclip, Image, MessageCircle, ShieldAlert, RefreshCw } from 'lucide-react';

// const HomePage = ({ onGmailSetup, onLogout }) => {
//   const [query, setQuery] = useState('');
//   const [isInputFocused, setIsInputFocused] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [results, setResults] = useState(null);
//   const [error, setError] = useState('');
//   const [authenticatedEmail, setAuthenticatedEmail] = useState(null);
  
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
//           <p className="text-gray-500 text-base">Enter a simple prompt to generate anything you want!</p>
          
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
//               <div className="flex items-center space-x-2 text-gray-600 bg-purple-200 px-2 rounded-full">
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
//                 placeholder={authenticatedEmail ? "Type your question here..." : "Please authenticate your email first..."}
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


import React, { useState, useEffect } from 'react';
import { Send, Mail, AlertCircle, CheckCircle2, Loader2, Paperclip, Image, MessageCircle, ShieldAlert, RefreshCw } from 'lucide-react';

const HomePage = ({ onGmailSetup, onLogout }) => {
  const [query, setQuery] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [authenticatedEmail, setAuthenticatedEmail] = useState(null);
  const [lastSearchQuery, setLastSearchQuery] = useState('');
  
  useEffect(() => {
    const getEmailFromStorage = () => {
      const storedEmail = localStorage.getItem('authenticatedEmail');
      setAuthenticatedEmail(storedEmail);
      console.log('HomePage loaded email from localStorage:', storedEmail);
    };

    getEmailFromStorage();

    const handleStorageChange = (e) => {
      if (e.key === 'authenticatedEmail') {
        setAuthenticatedEmail(e.newValue);
        console.log('HomePage detected localStorage change:', e.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(getEmailFromStorage, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authenticatedEmail');
    setAuthenticatedEmail(null);
    if (onLogout) {
      onLogout();
    }
  };

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

  // Enhanced error parsing function
  const parseError = (errorMessage) => {
    // Check for authentication errors
    if (errorMessage.includes('401') || errorMessage.includes('No valid credentials')) {
      return {
        type: 'auth',
        title: 'Authentication Required',
        message: 'Your email connection has expired or is invalid. Please reconnect your Gmail account to continue searching.',
        action: 'Reconnect Gmail'
      };
    }
    
    // Check for server errors
    if (errorMessage.includes('500') || errorMessage.includes('API Error')) {
      return {
        type: 'server',
        title: 'Server Error',
        message: 'Something went wrong on our end. Please try again in a moment.',
        action: 'Try Again'
      };
    }
    
    // Check for network errors
    if (errorMessage.includes('NetworkError') || errorMessage.includes('fetch')) {
      return {
        type: 'network',
        title: 'Connection Error',
        message: 'Unable to connect to our servers. Please check your internet connection.',
        action: 'Retry'
      };
    }
    
    // Default error
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

    if (!authenticatedEmail) {
      setError('Please authenticate your email first');
      return;
    }

    setIsLoading(true);
    setError('');
    setResults(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_SEARCH_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query.trim(),
          max_results: 10,
          gmail_address: authenticatedEmail,
          source: "gmail"
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data);
        
        if (data.status === 'success' && data.results) {
          setResults({
            results: data.results,
            summary: data.summary,
            source: data.source
          });
        } else {
          setResults({ results: data.results || data, summary: null, source: null });
        }
        setLastSearchQuery(query.trim());
        setQuery('');
      } else {
        const errorData = await response.text();
        throw new Error(`API Error: ${response.status} - ${errorData}`);
      }
    } catch (error) {
      console.error('Search error:', error);
      setError(`Failed to search: ${error.message}`);
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
      return new Date(parseInt(timestamp)).toLocaleDateString('en-US', {
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
      // Clear error and allow retry
      setError('');
    }
  };

  // Enhanced error display component
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

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gray-50 overflow-auto">
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-16">
        
        <div className="text-center mb-12">
          <h1 className="text-2xl font-medium text-gray-800 mb-2">Good Evening, Kunal</h1>
          <p className="text-gray-500 text-base">Enter a Keyword to get anything from your mail!</p>
          
          {authenticatedEmail ? (
            <div className="flex items-center justify-center space-x-4 mt-2">
              <p className="text-sm text-green-600">✅ Connected: {authenticatedEmail}</p>
              <button
                onClick={handleLogout}
                className="text-xs text-red-600 hover:text-red-700 underline"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-4 mt-2">
              <p className="text-sm text-orange-600">⚠️ Please authenticate your email first</p>
              {onGmailSetup && (
                <button
                  onClick={onGmailSetup}
                  className="text-sm bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                >
                  Connect Email
                </button>
              )}
            </div>
          )}
        </div>

        <div className="w-full max-w-3xl">
          <div className={`bg-white rounded-2xl border shadow-sm p-6 mb-12 transition-all duration-200 ${
            isInputFocused 
              ? 'border-purple-300 shadow-lg ring-2 ring-purple-100' 
              : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2 bg-purple-200 px-2 rounded-xl text-gray-600">
                {/* <Send className="w-4 h-4" /> */}
                <span className="text-sm font-medium">Ask whatever you want</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                <Mail className="w-4 h-4" />
                <span>Gmail</span>
              </div>
            </div>

            <div className="mb-6">
              <textarea
                placeholder={authenticatedEmail ? "Type your Keyword here..." : "Please authenticate your email first..."}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                onKeyPress={handleKeyPress}
                disabled={!authenticatedEmail || isLoading}
                className="w-full h-10 text-base bg-transparent border-none resize-none focus:outline-none text-gray-800 placeholder-gray-400 disabled:text-gray-500"
              />
            </div>

            {error && <ErrorDisplay error={error} />}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button 
                  type="button"
                  className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 text-sm transition-colors"
                  disabled={!authenticatedEmail}
                >
                  <Paperclip className="w-4 h-4" />
                  <span>Add Attachment</span>
                </button>
                <button 
                  type="button"
                  className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 text-sm transition-colors"
                  disabled={!authenticatedEmail}
                >
                  <Image className="w-4 h-4" />
                  <span>Use Image</span>
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-gray-400 text-sm">{query.length}/1000</span>
                <button 
                  onClick={handleSubmit}
                  disabled={!authenticatedEmail || isLoading || !query.trim()}
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

        {results && results.results && results.results.length > 0 && (
          <div className="w-full max-w-6xl mb-8">
            {lastSearchQuery && (
              <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-xl">
                <div className="flex items-center  space-x-2">
                  {/* <Send className="w-4 h-4 text-purple-600" /> */}
                  <span className="text-2xl font-medium text-black-700">Search Query:</span>
                  <span className="text-purple-800 text-2xl font-medium">"{lastSearchQuery}"</span>
                </div>
              </div>
            )}
            
            {results.summary && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <h3 className="text-lg font-medium text-blue-900 mb-2">Summary</h3>
                <p className="text-blue-800 leading-relaxed">{results.summary}</p>
                <div className="mt-2 text-sm text-blue-600">
                  Source: {results.source || 'Gmail'} • {results.results.length} results found
                </div>
              </div>
            )}
            
            <h2 className="text-xl font-medium text-gray-800 mb-6">Search Results</h2>
            <div className="space-y-4">
              {results.results.map((result, index) => (
                <div
                  key={result.id || index}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:border-purple-300 hover:shadow-lg transition-all duration-200"
                >
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                      {result.subject || 'No Subject'}
                    </h3>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      {result.from && (
                        <span className="flex items-center">
                          <span className="font-medium">From:</span>
                          <span className="ml-1">{result.from}</span>
                        </span>
                      )}
                      {result.date && (
                        <span className="text-gray-500">
                          {formatDate(result.date)}
                        </span>
                      )}
                    </div>
                    
                    {result.snippet && (
                      <p className="text-gray-700 leading-relaxed">
                        {result.snippet}
                      </p>
                    )}
                    
                    {result.link && (
                      <div className="pt-2">
                        <a
                          href={result.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-purple-600 hover:text-purple-700 hover:underline"
                        >
                          <Mail className="w-4 h-4 mr-1" />
                          Open in Gmail
                        </a>
                      </div>
                    )}
                    
                    {typeof result === 'string' && (
                      <p className="text-gray-700">{result}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="w-full max-w-6xl">
          <h2 className="text-xl font-medium text-gray-800 mb-6">Your recent chats</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentChats.map((chat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:border-purple-300 hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:-translate-y-1"
                onClick={() => {
                  if (authenticatedEmail) {
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
    </div>
  );
};

export default HomePage;