// import React, { useState } from 'react';
// import { Search, Plus, Filter, ArrowUpDown, Home, Users, Bell, CheckSquare, FileText, Settings, Link, ArrowLeft, Mail, Phone, MapPin, Calendar, Edit, Trash2, Star, Clock, Mic, Send, MoreHorizontal, AlertCircle, CheckCircle2, Circle, BookOpen, X, Paperclip, Image, MessageCircle, Database } from 'lucide-react';

// const IntegrationTabs = ({ onBack, onAuthenticated }) => {
//   const [activeTab, setActiveTab] = useState('gmail');
  
//   // Gmail state
//   const [email, setEmail] = useState('');
//   const [gmailLoading, setGmailLoading] = useState(false);
//   const [gmailMessage, setGmailMessage] = useState('');
//   const [gmailMessageType, setGmailMessageType] = useState('');
//   const [forceReauth, setForceReauth] = useState(false);
  
//   // Odoo state
//   const [odooUrl, setOdooUrl] = useState('');
//   const [odooDb, setOdooDb] = useState('');
//   const [odooUsername, setOdooUsername] = useState('');
//   const [odooPassword, setOdooPassword] = useState('');
//   const [odooLoading, setOdooLoading] = useState(false);
//   const [odooMessage, setOdooMessage] = useState('');
//   const [odooMessageType, setOdooMessageType] = useState('');

//   const handleGmailSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!email) {
//       setGmailMessage('Please enter a valid email address');
//       setGmailMessageType('error');
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setGmailMessage('Please enter a valid email address');
//       setGmailMessageType('error');
//       return;
//     }

//     setGmailLoading(true);
//     setGmailMessage('');

//     try {
//       const url = forceReauth 
//         ? `${import.meta.env.VITE_AUTH_URL}?gmail_address=${encodeURIComponent(email)}&force_reauth=true`
//         : `${import.meta.env.VITE_AUTH_URL}?gmail_address=${encodeURIComponent(email)}`;
        
//       const response = await fetch(url, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         mode: 'cors',
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Auth response:', data);
        
//         if (data.auth_url) {
//           setGmailMessage('Redirecting to Google authentication...');
//           setGmailMessageType('success');
          
//           localStorage.setItem('authenticatedEmail', email);
//           window.open(data.auth_url, '_blank', 'width=500,height=600,scrollbars=yes,resizable=yes');
          
//           if (onAuthenticated) {
//             onAuthenticated(email);
//           }
          
//           setEmail('');
//         } else if (data.message && data.message.includes('Already authenticated')) {
//           setGmailMessage('✅ This email is already authenticated and ready to use!');
//           setGmailMessageType('success');
          
//           localStorage.setItem('authenticatedEmail', email);
          
//           if (onAuthenticated) {
//             onAuthenticated(email);
//           }
          
//           setEmail('');
//         } else {
//           throw new Error('Unexpected response format from server');
//         }
//       } else {
//         const errorText = await response.text();
//         console.error('Server response:', response.status, errorText);
//         throw new Error(`Integration failed: ${response.status}`);
//       }
//     } catch (error) {
//       console.error('Integration error:', error);
//       if (error.message.includes('CORS')) {
//         setGmailMessage('CORS error - please contact your backend developer to enable CORS for this domain.');
//       } else if (error.message.includes('405')) {
//         setGmailMessage('Method not allowed - the server may expect GET instead of POST.');
//       } else {
//         setGmailMessage(`Failed to connect: ${error.message}`);
//       }
//       setGmailMessageType('error');
//     } finally {
//       setGmailLoading(false);
//     }
//   };

//   const handleOdooSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!odooUrl || !odooDb || !odooUsername || !odooPassword) {
//       setOdooMessage('Please fill in all required fields');
//       setOdooMessageType('error');
//       return;
//     }

//     setOdooLoading(true);
//     setOdooMessage('');

//     try {
//       const response = await fetch('https://info-retrieval-agent-btbsfphfe7fkegd8.centralindia-01.azurewebsites.net/auth/odoo', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         mode: 'cors',
//         body: JSON.stringify({
//           odoo_url: odooUrl,
//           odoo_db: odooDb,
//           odoo_username: odooUsername,
//           odoo_password: odooPassword
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Odoo auth response:', data);
        
//         setOdooMessage('✅ Odoo connection established successfully!');
//         setOdooMessageType('success');
        
//         if (onAuthenticated) {
//           onAuthenticated(odooUsername);
//         }
//       } else {
//         const errorText = await response.text();
//         console.error('Odoo server response:', response.status, errorText);
//         throw new Error(`Odoo connection failed: ${response.status}`);
//       }
//     } catch (error) {
//       console.error('Odoo integration error:', error);
//       if (error.message.includes('CORS')) {
//         setOdooMessage('CORS error - please contact your backend developer to enable CORS for this domain.');
//       } else {
//         setOdooMessage(`Failed to connect to Odoo: ${error.message}`);
//       }
//       setOdooMessageType('error');
//     } finally {
//       setOdooLoading(false);
//     }
//   };

//   const tabs = [
//     {
//       id: 'gmail',
//       name: 'Gmail',
//       icon: Mail,
//       color: 'red'
//     },
//     {
//       id: 'odoo',
//       name: 'Odoo',
//       icon: Database,
//       color: 'purple'
//     }
//   ];

//   return (
//     <div className="flex-1 bg-white overflow-auto">
//       {/* Header */}
//       <div className="border-b border-gray-200 bg-white">
//         <div className="flex items-center px-6 py-4">
//           <button
//             onClick={onBack}
//             className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
//           >
//             <ArrowLeft className="w-5 h-5 text-gray-600" />
//           </button>
//           <div className="flex items-center space-x-3">
//             <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
//               <Settings className="w-6 h-6 text-gray-600" />
//             </div>
//             <div>
//               <h1 className="text-xl font-semibold text-gray-900">Integration Hub</h1>
//               <p className="text-sm text-gray-500">Connect your external services and accounts</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="border-b border-gray-200">
//         <div className="px-6">
//           <nav className="-mb-px flex space-x-8">
//             {tabs.map((tab) => {
//               const Icon = tab.icon;
//               const isActive = activeTab === tab.id;
//               const colorClasses = {
//                 red: isActive ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-red-600 hover:border-red-300',
//                 purple: isActive ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-purple-600 hover:border-purple-300'
//               };
              
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`${colorClasses[tab.color]} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors`}
//                 >
//                   <Icon className="w-4 h-4" />
//                   <span>{tab.name}</span>
//                 </button>
//               );
//             })}
//           </nav>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="p-6">
//         <div className="max-w-md mx-auto">
//           {activeTab === 'gmail' ? (
//             <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
//               <div className="text-center mb-6">
//                 <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/1920px-Gmail_icon_%282020%29.svg.png" alt="Gmail Icon" className="w-9" />
//                 </div>
//                 <h2 className="text-lg font-semibold text-gray-900 mb-2">Connect Gmail</h2>
//                 <p className="text-sm text-gray-600">
//                   Enter your email address to start the integration process
//                 </p>
//               </div>

//               <div className="space-y-4">
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="your.email@company.com"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
//                     onKeyPress={(e) => {
//                       if (e.key === 'Enter') {
//                         handleGmailSubmit(e);
//                       }
//                     }}
//                   />
//                 </div>

//                 <div className="flex items-center space-x-2">
//                   <input
//                     type="checkbox"
//                     id="forceReauth"
//                     checked={forceReauth}
//                     onChange={(e) => setForceReauth(e.target.checked)}
//                     className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
//                   />
//                   <label htmlFor="forceReauth" className="text-sm text-gray-600">
//                     Force re-authentication (even if already connected)
//                   </label>
//                 </div>

//                 {gmailMessage && (
//                   <div className={`p-3 rounded-lg text-sm ${
//                     gmailMessageType === 'success' 
//                       ? 'bg-green-50 text-green-700 border border-green-200' 
//                       : 'bg-red-50 text-red-700 border border-red-200'
//                   }`}>
//                     <div className="flex items-center">
//                       {gmailMessageType === 'success' ? (
//                         <CheckCircle2 className="w-4 h-4 mr-2" />
//                       ) : (
//                         <AlertCircle className="w-4 h-4 mr-2" />
//                       )}
//                       {gmailMessage}
//                     </div>
//                   </div>
//                 )}

//                 <button
//                   onClick={handleGmailSubmit}
//                   disabled={gmailLoading}
//                   className="w-full bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
//                 >
//                   {gmailLoading ? (
//                     <div className="flex items-center">
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                       Connecting...
//                     </div>
//                   ) : (
//                     <div className="flex items-center">
//                       <Mail className="w-4 h-4 mr-2" />
//                       Connect Gmail
//                     </div>
//                   )}
//                 </button>
//               </div>

//               <div className="mt-6 pt-6 border-t border-gray-200">
//                 <div className="text-xs text-gray-500 space-y-2">
//                   <p className="flex items-start">
//                     <span className="w-2 h-2 bg-green-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
//                     Your data is encrypted and secure
//                   </p>
//                   <p className="flex items-start">
//                     <span className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
//                     We only access emails and contacts you authorize
//                   </p>
//                   <p className="flex items-start">
//                     <span className="w-2 h-2 bg-purple-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
//                     You can disconnect anytime in settings
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
//               <div className="text-center mb-6">
//                 <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <Database className="w-8 h-8 text-purple-500" />
//                 </div>
//                 <h2 className="text-lg font-semibold text-gray-900 mb-2">Connect Odoo</h2>
//                 <p className="text-sm text-gray-600">
//                   Enter your Odoo instance details to establish connection
//                 </p>
//               </div>

//               <div className="space-y-4">
//                 <div>
//                   <label htmlFor="odooUrl" className="block text-sm font-medium text-gray-700 mb-2">
//                     Odoo URL
//                   </label>
//                   <input
//                     type="url"
//                     id="odooUrl"
//                     value={odooUrl}
//                     onChange={(e) => setOdooUrl(e.target.value)}
//                     placeholder="https://your-instance.odoo.com"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                     onKeyPress={(e) => {
//                       if (e.key === 'Enter') {
//                         handleOdooSubmit(e);
//                       }
//                     }}
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="odooDb" className="block text-sm font-medium text-gray-700 mb-2">
//                     Database Name
//                   </label>
//                   <input
//                     type="text"
//                     id="odooDb"
//                     value={odooDb}
//                     onChange={(e) => setOdooDb(e.target.value)}
//                     placeholder="your-database-name"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="odooUsername" className="block text-sm font-medium text-gray-700 mb-2">
//                     Username
//                   </label>
//                   <input
//                     type="text"
//                     id="odooUsername"
//                     value={odooUsername}
//                     onChange={(e) => setOdooUsername(e.target.value)}
//                     placeholder="username@company.com"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="odooPassword" className="block text-sm font-medium text-gray-700 mb-2">
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     id="odooPassword"
//                     value={odooPassword}
//                     onChange={(e) => setOdooPassword(e.target.value)}
//                     placeholder="Your Odoo password"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                   />
//                 </div>

//                 {odooMessage && (
//                   <div className={`p-3 rounded-lg text-sm ${
//                     odooMessageType === 'success' 
//                       ? 'bg-green-50 text-green-700 border border-green-200' 
//                       : 'bg-red-50 text-red-700 border border-red-200'
//                   }`}>
//                     <div className="flex items-center">
//                       {odooMessageType === 'success' ? (
//                         <CheckCircle2 className="w-4 h-4 mr-2" />
//                       ) : (
//                         <AlertCircle className="w-4 h-4 mr-2" />
//                       )}
//                       {odooMessage}
//                     </div>
//                   </div>
//                 )}

//                 <button
//                   onClick={handleOdooSubmit}
//                   disabled={odooLoading}
//                   className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
//                 >
//                   {odooLoading ? (
//                     <div className="flex items-center">
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                       Connecting...
//                     </div>
//                   ) : (
//                     <div className="flex items-center">
//                       <Database className="w-4 h-4 mr-2" />
//                       Connect Odoo
//                     </div>
//                   )}
//                 </button>
//               </div>

//               <div className="mt-6 pt-6 border-t border-gray-200">
//                 <div className="text-xs text-gray-500 space-y-2">
//                   <p className="flex items-start">
//                     <span className="w-2 h-2 bg-green-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
//                     Credentials are transmitted securely
//                   </p>
//                   <p className="flex items-start">
//                     <span className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
//                     Read-only access to authorized data
//                   </p>
//                   <p className="flex items-start">
//                     <span className="w-2 h-2 bg-purple-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
//                     Connection can be revoked anytime
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IntegrationTabs;







// import React, { useState, useEffect } from 'react';
// import { Search, Plus, Filter, ArrowUpDown, Home, Users, Bell, CheckSquare, FileText, Settings, Link, ArrowLeft, Mail, Phone, MapPin, Calendar, Edit, Trash2, Star, Clock, Mic, Send, MoreHorizontal, AlertCircle, CheckCircle2, Circle, BookOpen, X, Paperclip, Image, MessageCircle, Database } from 'lucide-react';

// const IntegrationTabs = ({ onBack, onAuthenticated }) => {
//   const [activeTab, setActiveTab] = useState('gmail');
  
//   // Gmail state
//   const [email, setEmail] = useState('');
//   const [gmailLoading, setGmailLoading] = useState(false);
//   const [gmailMessage, setGmailMessage] = useState('');
//   const [gmailMessageType, setGmailMessageType] = useState('');
//   const [forceReauth, setForceReauth] = useState(false);
//   const [gmailConnected, setGmailConnected] = useState(false);
//   const [connectedGmailEmail, setConnectedGmailEmail] = useState('');
  
//   // Odoo state
//   const [odooUrl, setOdooUrl] = useState('');
//   const [odooDb, setOdooDb] = useState('');
//   const [odooUsername, setOdooUsername] = useState('');
//   const [odooPassword, setOdooPassword] = useState('');
//   const [odooLoading, setOdooLoading] = useState(false);
//   const [odooMessage, setOdooMessage] = useState('');
//   const [odooMessageType, setOdooMessageType] = useState('');
//   const [odooConnected, setOdooConnected] = useState(false);
//   const [connectedOdooDetails, setConnectedOdooDetails] = useState(null);

//   // Check for existing connections on component mount
//   useEffect(() => {
//     const savedEmail = localStorage.getItem('authenticatedEmail');
//     if (savedEmail) {
//       setGmailConnected(true);
//       setConnectedGmailEmail(savedEmail);
//     }
//   }, []);

//   const handleGmailSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!email) {
//       setGmailMessage('Please enter a valid email address');
//       setGmailMessageType('error');
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setGmailMessage('Please enter a valid email address');
//       setGmailMessageType('error');
//       return;
//     }

//     setGmailLoading(true);
//     setGmailMessage('');

//     try {
//       const url = forceReauth 
//         ? `${import.meta.env.VITE_AUTH_URL}?gmail_address=${encodeURIComponent(email)}&force_reauth=true`
//         : `${import.meta.env.VITE_AUTH_URL}?gmail_address=${encodeURIComponent(email)}`;
        
//       const response = await fetch(url, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         mode: 'cors',
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Auth response:', data);
        
//         if (data.auth_url) {
//           setGmailMessage('Redirecting to Google authentication...');
//           setGmailMessageType('success');
          
//           localStorage.setItem('authenticatedEmail', email);
//           window.open(data.auth_url, '_blank', 'width=500,height=600,scrollbars=yes,resizable=yes');
          
//           // Set connected state instead of calling onAuthenticated
//           setGmailConnected(true);
//           setConnectedGmailEmail(email);
//           setEmail('');
//         } else if (data.message && data.message.includes('Already authenticated')) {
//           setGmailMessage('✅ This email is already authenticated and ready to use!');
//           setGmailMessageType('success');
          
//           localStorage.setItem('authenticatedEmail', email);
          
//           // Set connected state instead of calling onAuthenticated
//           setGmailConnected(true);
//           setConnectedGmailEmail(email);
//           setEmail('');
//         } else {
//           throw new Error('Unexpected response format from server');
//         }
//       } else {
//         const errorText = await response.text();
//         console.error('Server response:', response.status, errorText);
//         throw new Error(`Integration failed: ${response.status}`);
//       }
//     } catch (error) {
//       console.error('Integration error:', error);
//       if (error.message.includes('CORS')) {
//         setGmailMessage('CORS error - please contact your backend developer to enable CORS for this domain.');
//       } else if (error.message.includes('405')) {
//         setGmailMessage('Method not allowed - the server may expect GET instead of POST.');
//       } else {
//         setGmailMessage(`Failed to connect: ${error.message}`);
//       }
//       setGmailMessageType('error');
//     } finally {
//       setGmailLoading(false);
//     }
//   };

//   const handleGmailDisconnect = () => {
//     setGmailConnected(false);
//     setConnectedGmailEmail('');
//     setGmailMessage('');
//     setGmailMessageType('');
//     localStorage.removeItem('authenticatedEmail');
//   };

//   const handleOdooDisconnect = () => {
//     setOdooConnected(false);
//     setConnectedOdooDetails(null);
//     setOdooMessage('');
//     setOdooMessageType('');
//   };

//   const handleOdooSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!odooUrl || !odooDb || !odooUsername || !odooPassword) {
//       setOdooMessage('Please fill in all required fields');
//       setOdooMessageType('error');
//       return;
//     }

//     setOdooLoading(true);
//     setOdooMessage('');

//     try {
//       const response = await fetch('https://info-retrieval-agent-btbsfphfe7fkegd8.centralindia-01.azurewebsites.net/auth/odoo', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         mode: 'cors',
//         body: JSON.stringify({
//           odoo_url: odooUrl,
//           odoo_db: odooDb,
//           odoo_username: odooUsername,
//           odoo_password: odooPassword
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Odoo auth response:', data);
        
//         setOdooMessage('✅ Odoo connection established successfully!');
//         setOdooMessageType('success');
        
//         // Set connected state instead of calling onAuthenticated
//         setOdooConnected(true);
//         setConnectedOdooDetails({
//           url: odooUrl,
//           database: odooDb,
//           username: odooUsername
//         });
        
//         // Clear form fields
//         setOdooUrl('');
//         setOdooDb('');
//         setOdooUsername('');
//         setOdooPassword('');
//       } else {
//         const errorText = await response.text();
//         console.error('Odoo server response:', response.status, errorText);
//         throw new Error(`Odoo connection failed: ${response.status}`);
//       }
//     } catch (error) {
//       console.error('Odoo integration error:', error);
//       if (error.message.includes('CORS')) {
//         setOdooMessage('CORS error - please contact your backend developer to enable CORS for this domain.');
//       } else {
//         setOdooMessage(`Failed to connect to Odoo: ${error.message}`);
//       }
//       setOdooMessageType('error');
//     } finally {
//       setOdooLoading(false);
//     }
//   };

//   const tabs = [
//     {
//       id: 'gmail',
//       name: 'Gmail',
//       icon: Mail,
//       color: 'red'
//     },
//     {
//       id: 'odoo',
//       name: 'Odoo',
//       icon: Database,
//       color: 'purple'
//     }
//   ];

//   return (
//     <div className="flex-1 bg-white">
//       {/* Header */}
//       <div className="border-b border-gray-200 bg-white">
//         <div className="flex items-center px-6 py-4">
//           <button
//             onClick={onBack}
//             className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
//           >
//             <ArrowLeft className="w-5 h-5 text-gray-600" />
//           </button>
//           <div className="flex items-center space-x-3">
//             <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
//               <Settings className="w-6 h-6 text-gray-600" />
//             </div>
//             <div>
//               <h1 className="text-xl font-semibold text-gray-900">Integration Hub</h1>
//               <p className="text-sm text-gray-500">Connect your external services and accounts</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="border-b border-gray-200">
//         <div className="px-6">
//           <nav className="-mb-px flex space-x-8">
//             {tabs.map((tab) => {
//               const Icon = tab.icon;
//               const isActive = activeTab === tab.id;
//               const colorClasses = {
//                 red: isActive ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-red-600 hover:border-red-300',
//                 purple: isActive ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-purple-600 hover:border-purple-300'
//               };
              
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`${colorClasses[tab.color]} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors`}
//                 >
//                   <Icon className="w-4 h-4" />
//                   <span>{tab.name}</span>
//                 </button>
//               );
//             })}
//           </nav>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="p-6">
//         <div className="max-w-md mx-auto">
//           {activeTab === 'gmail' ? (
//             <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
//               <div className="text-center mb-6">
//                 <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/1920px-Gmail_icon_%282020%29.svg.png" alt="Gmail Icon" className="w-9" />
//                 </div>
//                 <h2 className="text-lg font-semibold text-gray-900 mb-2">
//                   {gmailConnected ? 'Gmail Connected' : 'Connect Gmail'}
//                 </h2>
//                 <p className="text-sm text-gray-600">
//                   {gmailConnected 
//                     ? 'Your Gmail account is successfully connected' 
//                     : 'Enter your email address to start the integration process'
//                   }
//                 </p>
//               </div>

//               {gmailConnected ? (
//                 <div className="space-y-4">
//                   <div className="bg-green-50 border border-green-200 rounded-lg p-4">
//                     <div className="flex items-center mb-3">
//                       <CheckCircle2 className="w-5 h-5 text-green-600 mr-2" />
//                       <span className="font-medium text-green-900">Connected Successfully</span>
//                     </div>
//                     <div className="text-sm text-green-700">
//                       <p><strong>Email:</strong> {connectedGmailEmail}</p>
//                       <p><strong>Status:</strong> Active</p>
//                       <p><strong>Connected:</strong> {new Date().toLocaleDateString()}</p>
//                     </div>
//                   </div>

//                   <button
//                     onClick={handleGmailDisconnect}
//                     className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
//                   >
//                     <X className="w-4 h-4 mr-2" />
//                     Disconnect Gmail
//                   </button>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="your.email@company.com"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
//                     onKeyPress={(e) => {
//                       if (e.key === 'Enter') {
//                         handleGmailSubmit(e);
//                       }
//                     }}
//                   />
//                 </div>

//                 <div className="flex items-center space-x-2">
//                   <input
//                     type="checkbox"
//                     id="forceReauth"
//                     checked={forceReauth}
//                     onChange={(e) => setForceReauth(e.target.checked)}
//                     className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
//                   />
//                   <label htmlFor="forceReauth" className="text-sm text-gray-600">
//                     Force re-authentication (even if already connected)
//                   </label>
//                 </div>

//                 {gmailMessage && (
//                   <div className={`p-3 rounded-lg text-sm ${
//                     gmailMessageType === 'success' 
//                       ? 'bg-green-50 text-green-700 border border-green-200' 
//                       : 'bg-red-50 text-red-700 border border-red-200'
//                   }`}>
//                     <div className="flex items-center">
//                       {gmailMessageType === 'success' ? (
//                         <CheckCircle2 className="w-4 h-4 mr-2" />
//                       ) : (
//                         <AlertCircle className="w-4 h-4 mr-2" />
//                       )}
//                       {gmailMessage}
//                     </div>
//                   </div>
//                 )}

//                 <button
//                   onClick={handleGmailSubmit}
//                   disabled={gmailLoading}
//                   className="w-full bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
//                 >
//                   {gmailLoading ? (
//                     <div className="flex items-center">
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                       Connecting...
//                     </div>
//                   ) : (
//                     <div className="flex items-center">
//                       <Mail className="w-4 h-4 mr-2" />
//                       Connect Gmail
//                     </div>
//                   )}
//                 </button>
//               </div>
//               )}

//               {!gmailConnected && (
//               <div className="mt-6 pt-6 border-t border-gray-200">
//                 <div className="text-xs text-gray-500 space-y-2">
//                   <p className="flex items-start">
//                     <span className="w-2 h-2 bg-green-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
//                     Your data is encrypted and secure
//                   </p>
//                   <p className="flex items-start">
//                     <span className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
//                     We only access emails and contacts you authorize
//                   </p>
//                   <p className="flex items-start">
//                     <span className="w-2 h-2 bg-purple-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
//                     You can disconnect anytime in settings
//                   </p>
//                 </div>
//               </div>
//               )}
//             </div>
//           ) : (
//             <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
//               <div className="text-center mb-6">
//                 <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <Database className="w-8 h-8 text-purple-500" />
//                 </div>
//                 <h2 className="text-lg font-semibold text-gray-900 mb-2">
//                   {odooConnected ? 'Odoo Connected' : 'Connect Odoo'}
//                 </h2>
//                 <p className="text-sm text-gray-600">
//                   {odooConnected 
//                     ? 'Your Odoo instance is successfully connected' 
//                     : 'Enter your Odoo instance details to establish connection'
//                   }
//                 </p>
//               </div>

//               {odooConnected ? (
//                 <div className="space-y-4">
//                   <div className="bg-green-50 border border-green-200 rounded-lg p-4">
//                     <div className="flex items-center mb-3">
//                       <CheckCircle2 className="w-5 h-5 text-green-600 mr-2" />
//                       <span className="font-medium text-green-900">Connected Successfully</span>
//                     </div>
//                     <div className="text-sm text-green-700">
//                       <p><strong>URL:</strong> {connectedOdooDetails?.url}</p>
//                       <p><strong>Database:</strong> {connectedOdooDetails?.database}</p>
//                       <p><strong>Username:</strong> {connectedOdooDetails?.username}</p>
//                       <p><strong>Status:</strong> Active</p>
//                       <p><strong>Connected:</strong> {new Date().toLocaleDateString()}</p>
//                     </div>
//                   </div>

//                   <button
//                     onClick={handleOdooDisconnect}
//                     className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
//                   >
//                     <X className="w-4 h-4 mr-2" />
//                     Disconnect Odoo
//                   </button>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                 <div>
//                   <label htmlFor="odooUrl" className="block text-sm font-medium text-gray-700 mb-2">
//                     Odoo URL
//                   </label>
//                   <input
//                     type="url"
//                     id="odooUrl"
//                     value={odooUrl}
//                     onChange={(e) => setOdooUrl(e.target.value)}
//                     placeholder="https://your-instance.odoo.com"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                     onKeyPress={(e) => {
//                       if (e.key === 'Enter') {
//                         handleOdooSubmit(e);
//                       }
//                     }}
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="odooDb" className="block text-sm font-medium text-gray-700 mb-2">
//                     Database Name
//                   </label>
//                   <input
//                     type="text"
//                     id="odooDb"
//                     value={odooDb}
//                     onChange={(e) => setOdooDb(e.target.value)}
//                     placeholder="your-database-name"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="odooUsername" className="block text-sm font-medium text-gray-700 mb-2">
//                     Username
//                   </label>
//                   <input
//                     type="text"
//                     id="odooUsername"
//                     value={odooUsername}
//                     onChange={(e) => setOdooUsername(e.target.value)}
//                     placeholder="username@company.com"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="odooPassword" className="block text-sm font-medium text-gray-700 mb-2">
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     id="odooPassword"
//                     value={odooPassword}
//                     onChange={(e) => setOdooPassword(e.target.value)}
//                     placeholder="Your Odoo password"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                   />
//                 </div>

//                 {odooMessage && (
//                   <div className={`p-3 rounded-lg text-sm ${
//                     odooMessageType === 'success' 
//                       ? 'bg-green-50 text-green-700 border border-green-200' 
//                       : 'bg-red-50 text-red-700 border border-red-200'
//                   }`}>
//                     <div className="flex items-center">
//                       {odooMessageType === 'success' ? (
//                         <CheckCircle2 className="w-4 h-4 mr-2" />
//                       ) : (
//                         <AlertCircle className="w-4 h-4 mr-2" />
//                       )}
//                       {odooMessage}
//                     </div>
//                   </div>
//                 )}

//                 <button
//                   onClick={handleOdooSubmit}
//                   disabled={odooLoading}
//                   className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
//                 >
//                   {odooLoading ? (
//                     <div className="flex items-center">
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                       Connecting...
//                     </div>
//                   ) : (
//                     <div className="flex items-center">
//                       <Database className="w-4 h-4 mr-2" />
//                       Connect Odoo
//                     </div>
//                   )}
//                 </button>
//               </div>
//               )}

//               {!odooConnected && (
//               <div className="mt-6 pt-6 border-t border-gray-200">
//                 <div className="text-xs text-gray-500 space-y-2">
//                   <p className="flex items-start">
//                     <span className="w-2 h-2 bg-green-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
//                     Credentials are transmitted securely
//                   </p>
//                   <p className="flex items-start">
//                     <span className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
//                     Read-only access to authorized data
//                   </p>
//                   <p className="flex items-start">
//                     <span className="w-2 h-2 bg-purple-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
//                     Connection can be revoked anytime
//                   </p>
//                 </div>
//               </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IntegrationTabs;




// import React, { useState, useEffect } from 'react';
// import { Search, Plus, Filter, ArrowUpDown, Home, Users, Bell, CheckSquare, FileText, Settings, Link, ArrowLeft, Mail, Phone, MapPin, Calendar, Edit, Trash2, Star, Clock, Mic, Send, MoreHorizontal, AlertCircle, CheckCircle2, Circle, BookOpen, X, Paperclip, Image, MessageCircle, Database } from 'lucide-react';

// const IntegrationTabs = ({ onBack, onAuthenticated }) => {
//   const [activeTab, setActiveTab] = useState('gmail');
  
//   // Gmail state
//   const [email, setEmail] = useState('');
//   const [gmailLoading, setGmailLoading] = useState(false);
//   const [gmailMessage, setGmailMessage] = useState('');
//   const [gmailMessageType, setGmailMessageType] = useState('');
//   const [forceReauth, setForceReauth] = useState(false);
//   const [gmailConnected, setGmailConnected] = useState(false);
//   const [connectedGmailEmail, setConnectedGmailEmail] = useState('');
  
//   // Odoo state
//   const [odooUrl, setOdooUrl] = useState('');
//   const [odooDb, setOdooDb] = useState('');
//   const [odooUsername, setOdooUsername] = useState('');
//   const [odooPassword, setOdooPassword] = useState('');
//   const [odooLoading, setOdooLoading] = useState(false);
//   const [odooMessage, setOdooMessage] = useState('');
//   const [odooMessageType, setOdooMessageType] = useState('');
//   const [odooConnected, setOdooConnected] = useState(false);
//   const [connectedOdooDetails, setConnectedOdooDetails] = useState(null);

//   // Check for existing Gmail connection on component mount (Odoo doesn't persist)
//   useEffect(() => {
//     const savedEmail = localStorage.getItem('authenticatedEmail');
//     console.log('IntegrationTabs: Checking localStorage for authenticatedEmail:', savedEmail);
//     if (savedEmail) {
//       console.log('IntegrationTabs: Restoring Gmail connection for:', savedEmail);
//       setGmailConnected(true);
//       setConnectedGmailEmail(savedEmail);
//       setGmailMessage('Connection restored from previous session');
//       setGmailMessageType('success');
//     }
//     // Note: Odoo connections are not persisted and must be re-established each session
//   }, []);

//   const handleGmailSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!email) {
//       setGmailMessage('Please enter a valid email address');
//       setGmailMessageType('error');
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setGmailMessage('Please enter a valid email address');
//       setGmailMessageType('error');
//       return;
//     }

//     setGmailLoading(true);
//     setGmailMessage('');

//     try {
//       const url = forceReauth 
//         ? `${import.meta.env.VITE_AUTH_URL}?gmail_address=${encodeURIComponent(email)}&force_reauth=true`
//         : `${import.meta.env.VITE_AUTH_URL}?gmail_address=${encodeURIComponent(email)}`;
        
//       const response = await fetch(url, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         mode: 'cors',
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Auth response:', data);
        
//         if (data.auth_url) {
//           setGmailMessage('Redirecting to Google authentication...');
//           setGmailMessageType('success');
          
//           // Save to localStorage immediately
//           localStorage.setItem('authenticatedEmail', email);
//           console.log('IntegrationTabs: Saved to localStorage:', email);
          
//           window.open(data.auth_url, '_blank', 'width=500,height=600,scrollbars=yes,resizable=yes');
          
//           // Set Gmail connected state
//           setGmailConnected(true);
//           setConnectedGmailEmail(email);
//           setEmail('');
          
//           // Call parent authentication handler for Gmail
//           if (onAuthenticated) {
//             onAuthenticated(email);
//           }
//         } else if (data.message && data.message.includes('Already authenticated')) {
//           setGmailMessage('✅ This email is already authenticated and ready to use!');
//           setGmailMessageType('success');
          
//           // Save to localStorage immediately
//           localStorage.setItem('authenticatedEmail', email);
//           console.log('IntegrationTabs: Saved to localStorage (already auth):', email);
          
//           // Set Gmail connected state
//           setGmailConnected(true);
//           setConnectedGmailEmail(email);
//           setEmail('');
          
//           // Call parent authentication handler for Gmail
//           if (onAuthenticated) {
//             onAuthenticated(email);
//           }
//         } else {
//           throw new Error('Unexpected response format from server');
//         }
//       } else {
//         const errorText = await response.text();
//         console.error('Server response:', response.status, errorText);
//         throw new Error(`Integration failed: ${response.status}`);
//       }
//     } catch (error) {
//       console.error('Integration error:', error);
//       if (error.message.includes('CORS')) {
//         setGmailMessage('CORS error - please contact your backend developer to enable CORS for this domain.');
//       } else if (error.message.includes('405')) {
//         setGmailMessage('Method not allowed - the server may expect GET instead of POST.');
//       } else {
//         setGmailMessage(`Failed to connect: ${error.message}`);
//       }
//       setGmailMessageType('error');
//     } finally {
//       setGmailLoading(false);
//     }
//   };

//   const handleGmailDisconnect = () => {
//     console.log('IntegrationTabs: Disconnecting Gmail, removing from localStorage');
//     setGmailConnected(false);
//     setConnectedGmailEmail('');
//     setGmailMessage('');
//     setGmailMessageType('');
//     localStorage.removeItem('authenticatedEmail');
//     console.log('IntegrationTabs: localStorage after removal:', localStorage.getItem('authenticatedEmail'));
//     // Note: This only affects Gmail authentication
//   };

//   const handleOdooDisconnect = () => {
//     setOdooConnected(false);
//     setConnectedOdooDetails(null);
//     setOdooMessage('');
//     setOdooMessageType('');
//     // Note: This only affects Odoo connection, separate from Gmail
//   };

//   const handleOdooSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!odooUrl || !odooDb || !odooUsername || !odooPassword) {
//       setOdooMessage('Please fill in all required fields');
//       setOdooMessageType('error');
//       return;
//     }

//     setOdooLoading(true);
//     setOdooMessage('');

//     try {
//       const response = await fetch('https://info-retrieval-agent-btbsfphfe7fkegd8.centralindia-01.azurewebsites.net/auth/odoo', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         mode: 'cors',
//         body: JSON.stringify({
//           odoo_url: odooUrl,
//           odoo_db: odooDb,
//           odoo_username: odooUsername,
//           odoo_password: odooPassword
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Odoo auth response:', data);
        
//         setOdooMessage('✅ Odoo connection established successfully!');
//         setOdooMessageType('success');
        
//         // Set Odoo connected state (separate from Gmail)
//         setOdooConnected(true);
//         setConnectedOdooDetails({
//           url: odooUrl,
//           database: odooDb,
//           username: odooUsername
//         });
        
//         // Clear form fields
//         setOdooUrl('');
//         setOdooDb('');
//         setOdooUsername('');
//         setOdooPassword('');
        
//         // Note: Don't call onAuthenticated for Odoo as it's different auth system
//       } else {
//         const errorText = await response.text();
//         console.error('Odoo server response:', response.status, errorText);
//         throw new Error(`Odoo connection failed: ${response.status}`);
//       }
//     } catch (error) {
//       console.error('Odoo integration error:', error);
//       if (error.message.includes('CORS')) {
//         setOdooMessage('CORS error - please contact your backend developer to enable CORS for this domain.');
//       } else {
//         setOdooMessage(`Failed to connect to Odoo: ${error.message}`);
//       }
//       setOdooMessageType('error');
//     } finally {
//       setOdooLoading(false);
//     }
//   };

//   const tabs = [
//     {
//       id: 'gmail',
//       name: 'Gmail',
//       icon: Mail,
//       color: 'red'
//     },
//     {
//       id: 'odoo',
//       name: 'Odoo',
//       icon: Database,
//       color: 'purple'
//     }
//   ];

//   return (
//     <div className="flex-1 bg-white">
//       {/* Header */}
//       <div className="border-b border-gray-200 bg-white">
//         <div className="flex items-center px-6 py-4">
//           <button
//             onClick={onBack}
//             className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
//           >
//             <ArrowLeft className="w-5 h-5 text-gray-600" />
//           </button>
//           <div className="flex items-center space-x-3">
//             <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
//               <Settings className="w-6 h-6 text-gray-600" />
//             </div>
//             <div>
//               <h1 className="text-xl font-semibold text-gray-900">Integration Hub</h1>
//               <p className="text-sm text-gray-500">Connect your external services and accounts</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="border-b border-gray-200">
//         <div className="px-6">
//           <nav className="-mb-px flex space-x-8">
//             {tabs.map((tab) => {
//               const Icon = tab.icon;
//               const isActive = activeTab === tab.id;
//               const colorClasses = {
//                 red: isActive ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-red-600 hover:border-red-300',
//                 purple: isActive ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-purple-600 hover:border-purple-300'
//               };
              
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`${colorClasses[tab.color]} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors`}
//                 >
//                   <Icon className="w-4 h-4" />
//                   <span>{tab.name}</span>
//                 </button>
//               );
//             })}
//           </nav>
//         </div>
//       </div>

//       {/* Debug Panel - Remove this in production */}
//       <div className="p-4 bg-gray-50 border-b border-gray-200">
//         <div className="max-w-md mx-auto">
//           <details className="text-xs text-gray-600">
//             <summary className="cursor-pointer">Debug Info (Click to expand)</summary>
//             <div className="mt-2 space-y-1">
//               <p><strong>localStorage Email:</strong> {localStorage.getItem('authenticatedEmail') || 'None'}</p>
//               <p><strong>Gmail Connected:</strong> {gmailConnected ? 'Yes' : 'No'}</p>
//               <p><strong>Connected Email:</strong> {connectedGmailEmail || 'None'}</p>
//               <p><strong>Odoo Connected:</strong> {odooConnected ? 'Yes' : 'No'}</p>
//               <p><strong>Active Tab:</strong> {activeTab}</p>
//             </div>
//           </details>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="p-6">
//         <div className="max-w-md mx-auto">
//           {activeTab === 'gmail' ? (
//             <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
//               <div className="text-center mb-6">
//                 <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/1920px-Gmail_icon_%282020%29.svg.png" alt="Gmail Icon" className="w-9" />
//                 </div>
//                 <h2 className="text-lg font-semibold text-gray-900 mb-2">
//                   {gmailConnected ? 'Gmail Connected' : 'Connect Gmail'}
//                 </h2>
//                 <p className="text-sm text-gray-600">
//                   {gmailConnected 
//                     ? 'Your Gmail account is successfully connected' 
//                     : 'Enter your email address to start the integration process'
//                   }
//                 </p>
//               </div>

//               {gmailConnected ? (
//                 <div className="space-y-4">
//                   <div className="bg-green-50 border border-green-200 rounded-lg p-4">
//                     <div className="flex items-center mb-3">
//                       <CheckCircle2 className="w-5 h-5 text-green-600 mr-2" />
//                       <span className="font-medium text-green-900">Connected Successfully</span>
//                     </div>
//                     <div className="text-sm text-green-700">
//                       <p><strong>Email:</strong> {connectedGmailEmail}</p>
//                       <p><strong>Status:</strong> OAuth Authenticated</p>
//                       <p><strong>Connected:</strong> {new Date().toLocaleDateString()}</p>
//                     </div>
//                   </div>

//                   <button
//                     onClick={handleGmailDisconnect}
//                     className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
//                   >
//                     <X className="w-4 h-4 mr-2" />
//                     Disconnect Gmail
//                   </button>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="your.email@company.com"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
//                     onKeyPress={(e) => {
//                       if (e.key === 'Enter') {
//                         handleGmailSubmit(e);
//                       }
//                     }}
//                   />
//                 </div>

//                 <div className="flex items-center space-x-2">
//                   <input
//                     type="checkbox"
//                     id="forceReauth"
//                     checked={forceReauth}
//                     onChange={(e) => setForceReauth(e.target.checked)}
//                     className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
//                   />
//                   <label htmlFor="forceReauth" className="text-sm text-gray-600">
//                     Force re-authentication (even if already connected)
//                   </label>
//                 </div>

//                 {gmailMessage && (
//                   <div className={`p-3 rounded-lg text-sm ${
//                     gmailMessageType === 'success' 
//                       ? 'bg-green-50 text-green-700 border border-green-200' 
//                       : 'bg-red-50 text-red-700 border border-red-200'
//                   }`}>
//                     <div className="flex items-center">
//                       {gmailMessageType === 'success' ? (
//                         <CheckCircle2 className="w-4 h-4 mr-2" />
//                       ) : (
//                         <AlertCircle className="w-4 h-4 mr-2" />
//                       )}
//                       {gmailMessage}
//                     </div>
//                   </div>
//                 )}

//                 <button
//                   onClick={handleGmailSubmit}
//                   disabled={gmailLoading}
//                   className="w-full bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
//                 >
//                   {gmailLoading ? (
//                     <div className="flex items-center">
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                       Connecting...
//                     </div>
//                   ) : (
//                     <div className="flex items-center">
//                       <Mail className="w-4 h-4 mr-2" />
//                       Connect Gmail
//                     </div>
//                   )}
//                 </button>
//               </div>
//               )}

//               {!gmailConnected && (
//               <div className="mt-6 pt-6 border-t border-gray-200">
//                 <div className="text-xs text-gray-500 space-y-2">
//                   <p className="flex items-start">
//                     <span className="w-2 h-2 bg-green-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
//                     Your data is encrypted and secure
//                   </p>
//                   <p className="flex items-start">
//                     <span className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
//                     We only access emails and contacts you authorize
//                   </p>
//                   <p className="flex items-start">
//                     <span className="w-2 h-2 bg-purple-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
//                     You can disconnect anytime in settings
//                   </p>
//                 </div>
//               </div>
//               )}
//             </div>
//           ) : (
//             <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
//               <div className="text-center mb-6">
//                 <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <Database className="w-8 h-8 text-purple-500" />
//                 </div>
//                 <h2 className="text-lg font-semibold text-gray-900 mb-2">
//                   {odooConnected ? 'Odoo Connected' : 'Connect Odoo'}
//                 </h2>
//                 <p className="text-sm text-gray-600">
//                   {odooConnected 
//                     ? 'Your Odoo instance is successfully connected' 
//                     : 'Enter your Odoo instance details to establish connection'
//                   }
//                 </p>
//               </div>

//               {odooConnected ? (
//                 <div className="space-y-4">
//                   <div className="bg-green-50 border border-green-200 rounded-lg p-4">
//                     <div className="flex items-center mb-3">
//                       <CheckCircle2 className="w-5 h-5 text-green-600 mr-2" />
//                       <span className="font-medium text-green-900">Connected Successfully</span>
//                     </div>
//                     <div className="text-sm text-green-700">
//                       <p><strong>URL:</strong> {connectedOdooDetails?.url}</p>
//                       <p><strong>Database:</strong> {connectedOdooDetails?.database}</p>
//                       <p><strong>Username:</strong> {connectedOdooDetails?.username}</p>
//                       <p><strong>Status:</strong> Direct Connection</p>
//                       <p><strong>Connected:</strong> {new Date().toLocaleDateString()}</p>
//                     </div>
//                   </div>

//                   <button
//                     onClick={handleOdooDisconnect}
//                     className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
//                   >
//                     <X className="w-4 h-4 mr-2" />
//                     Disconnect Odoo
//                   </button>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                 <div>
//                   <label htmlFor="odooUrl" className="block text-sm font-medium text-gray-700 mb-2">
//                     Odoo URL
//                   </label>
//                   <input
//                     type="url"
//                     id="odooUrl"
//                     value={odooUrl}
//                     onChange={(e) => setOdooUrl(e.target.value)}
//                     placeholder="https://your-instance.odoo.com"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                     onKeyPress={(e) => {
//                       if (e.key === 'Enter') {
//                         handleOdooSubmit(e);
//                       }
//                     }}
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="odooDb" className="block text-sm font-medium text-gray-700 mb-2">
//                     Database Name
//                   </label>
//                   <input
//                     type="text"
//                     id="odooDb"
//                     value={odooDb}
//                     onChange={(e) => setOdooDb(e.target.value)}
//                     placeholder="your-database-name"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="odooUsername" className="block text-sm font-medium text-gray-700 mb-2">
//                     Username
//                   </label>
//                   <input
//                     type="text"
//                     id="odooUsername"
//                     value={odooUsername}
//                     onChange={(e) => setOdooUsername(e.target.value)}
//                     placeholder="username@company.com"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="odooPassword" className="block text-sm font-medium text-gray-700 mb-2">
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     id="odooPassword"
//                     value={odooPassword}
//                     onChange={(e) => setOdooPassword(e.target.value)}
//                     placeholder="Your Odoo password"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                   />
//                 </div>

//                 {odooMessage && (
//                   <div className={`p-3 rounded-lg text-sm ${
//                     odooMessageType === 'success' 
//                       ? 'bg-green-50 text-green-700 border border-green-200' 
//                       : 'bg-red-50 text-red-700 border border-red-200'
//                   }`}>
//                     <div className="flex items-center">
//                       {odooMessageType === 'success' ? (
//                         <CheckCircle2 className="w-4 h-4 mr-2" />
//                       ) : (
//                         <AlertCircle className="w-4 h-4 mr-2" />
//                       )}
//                       {odooMessage}
//                     </div>
//                   </div>
//                 )}

//                 <button
//                   onClick={handleOdooSubmit}
//                   disabled={odooLoading}
//                   className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
//                 >
//                   {odooLoading ? (
//                     <div className="flex items-center">
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                       Connecting...
//                     </div>
//                   ) : (
//                     <div className="flex items-center">
//                       <Database className="w-4 h-4 mr-2" />
//                       Connect Odoo
//                     </div>
//                   )}
//                 </button>
//               </div>
//               )}

//               {!odooConnected && (
//               <div className="mt-6 pt-6 border-t border-gray-200">
//                 <div className="text-xs text-gray-500 space-y-2">
//                   <p className="flex items-start">
//                     <span className="w-2 h-2 bg-green-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
//                     Credentials are transmitted securely
//                   </p>
//                   <p className="flex items-start">
//                     <span className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
//                     Read-only access to authorized data
//                   </p>
//                   <p className="flex items-start">
//                     <span className="w-2 h-2 bg-purple-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
//                     Connection can be revoked anytime
//                   </p>
//                 </div>
//               </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IntegrationTabs;


// import React, { useState, useEffect } from 'react';
// import { Search, Plus, Filter, ArrowUpDown, Home, Users, Bell, CheckSquare, FileText, Settings, Link, ArrowLeft, Mail, Phone, MapPin, Calendar, Edit, Trash2, Star, Clock, Mic, Send, MoreHorizontal, AlertCircle, CheckCircle2, Circle, BookOpen, X, Paperclip, Image, MessageCircle, Database } from 'lucide-react';

// const IntegrationTabs = ({ onBack, onAuthenticated }) => {
//   const [activeTab, setActiveTab] = useState('gmail');
  
//   // Gmail state
//   const [email, setEmail] = useState('');
//   const [gmailLoading, setGmailLoading] = useState(false);
//   const [gmailMessage, setGmailMessage] = useState('');
//   const [gmailMessageType, setGmailMessageType] = useState('');
//   const [forceReauth, setForceReauth] = useState(false);
//   const [gmailConnected, setGmailConnected] = useState(false);
//   const [connectedGmailEmail, setConnectedGmailEmail] = useState('');
  
//   // Odoo state
//   const [odooUrl, setOdooUrl] = useState('');
//   const [odooDb, setOdooDb] = useState('');
//   const [odooUsername, setOdooUsername] = useState('');
//   const [odooPassword, setOdooPassword] = useState('');
//   const [odooLoading, setOdooLoading] = useState(false);
//   const [odooMessage, setOdooMessage] = useState('');
//   const [odooMessageType, setOdooMessageType] = useState('');
//   const [odooConnected, setOdooConnected] = useState(false);
//   const [connectedOdooDetails, setConnectedOdooDetails] = useState(null);

//   // Check for existing connections on component mount
//   useEffect(() => {
//     // Restore Gmail connection
//     const savedEmail = localStorage.getItem('authenticatedEmail');
//     console.log('IntegrationTabs: Checking localStorage for authenticatedEmail:', savedEmail);
//     if (savedEmail) {
//       console.log('IntegrationTabs: Restoring Gmail connection for:', savedEmail);
//       setGmailConnected(true);
//       setConnectedGmailEmail(savedEmail);
//       setGmailMessage('Connection restored from previous session');
//       setGmailMessageType('success');
//     }
    
//     // Restore Odoo connection
//     const savedOdooDetails = localStorage.getItem('odooConnection');
//     console.log('IntegrationTabs: Checking localStorage for odooConnection:', savedOdooDetails);
//     if (savedOdooDetails) {
//       try {
//         const odooDetails = JSON.parse(savedOdooDetails);
//         console.log('IntegrationTabs: Restoring Odoo connection for:', odooDetails);
//         setOdooConnected(true);
//         setConnectedOdooDetails(odooDetails);
//         setOdooMessage('Connection restored from previous session');
//         setOdooMessageType('success');
//       } catch (error) {
//         console.error('IntegrationTabs: Error parsing saved Odoo details:', error);
//         localStorage.removeItem('odooConnection');
//       }
//     }
//   }, []);

//   const handleGmailSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!email) {
//       setGmailMessage('Please enter a valid email address');
//       setGmailMessageType('error');
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setGmailMessage('Please enter a valid email address');
//       setGmailMessageType('error');
//       return;
//     }

//     setGmailLoading(true);
//     setGmailMessage('');

//     try {
//       const url = forceReauth 
//         ? `${import.meta.env.VITE_AUTH_URL}?gmail_address=${encodeURIComponent(email)}&force_reauth=true`
//         : `${import.meta.env.VITE_AUTH_URL}?gmail_address=${encodeURIComponent(email)}`;
        
//       const response = await fetch(url, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         mode: 'cors',
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Auth response:', data);
        
//         if (data.auth_url) {
//           setGmailMessage('Redirecting to Google authentication...');
//           setGmailMessageType('success');
          
//           // Save to localStorage immediately
//           localStorage.setItem('authenticatedEmail', email);
//           console.log('IntegrationTabs: Saved to localStorage:', email);
          
//           window.open(data.auth_url, '_blank', 'width=500,height=600,scrollbars=yes,resizable=yes');
          
//           // Set Gmail connected state
//           setGmailConnected(true);
//           setConnectedGmailEmail(email);
//           setEmail('');
          
//           // Call parent authentication handler for Gmail
//           if (onAuthenticated) {
//             onAuthenticated(email);
//           }
//         } else if (data.message && data.message.includes('Already authenticated')) {
//           setGmailMessage('✅ This email is already authenticated and ready to use!');
//           setGmailMessageType('success');
          
//           // Save to localStorage immediately
//           localStorage.setItem('authenticatedEmail', email);
//           console.log('IntegrationTabs: Saved to localStorage (already auth):', email);
          
//           // Set Gmail connected state
//           setGmailConnected(true);
//           setConnectedGmailEmail(email);
//           setEmail('');
          
//           // Call parent authentication handler for Gmail
//           if (onAuthenticated) {
//             onAuthenticated(email);
//           }
//         } else {
//           throw new Error('Unexpected response format from server');
//         }
//       } else {
//         const errorText = await response.text();
//         console.error('Server response:', response.status, errorText);
//         throw new Error(`Integration failed: ${response.status}`);
//       }
//     } catch (error) {
//       console.error('Integration error:', error);
//       if (error.message.includes('CORS')) {
//         setGmailMessage('CORS error - please contact your backend developer to enable CORS for this domain.');
//       } else if (error.message.includes('405')) {
//         setGmailMessage('Method not allowed - the server may expect GET instead of POST.');
//       } else {
//         setGmailMessage(`Failed to connect: ${error.message}`);
//       }
//       setGmailMessageType('error');
//     } finally {
//       setGmailLoading(false);
//     }
//   };

//   const handleGmailDisconnect = () => {
//     console.log('IntegrationTabs: Disconnecting Gmail, removing from localStorage');
//     setGmailConnected(false);
//     setConnectedGmailEmail('');
//     setGmailMessage('');
//     setGmailMessageType('');
//     localStorage.removeItem('authenticatedEmail');
//     console.log('IntegrationTabs: localStorage after removal:', localStorage.getItem('authenticatedEmail'));
//     // Note: This only affects Gmail authentication
//   };

//   const handleOdooDisconnect = () => {
//     console.log('IntegrationTabs: Disconnecting Odoo, removing from localStorage');
//     setOdooConnected(false);
//     setConnectedOdooDetails(null);
//     setOdooMessage('');
//     setOdooMessageType('');
//     localStorage.removeItem('odooConnection');
//     console.log('IntegrationTabs: Odoo localStorage after removal:', localStorage.getItem('odooConnection'));
//     // Note: This only affects Odoo connection, separate from Gmail
//   };

//   const handleOdooSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!odooUrl || !odooDb || !odooUsername || !odooPassword) {
//       setOdooMessage('Please fill in all required fields');
//       setOdooMessageType('error');
//       return;
//     }

//     setOdooLoading(true);
//     setOdooMessage('');

//     try {
//       const response = await fetch('https://info-retrieval-agent-btbsfphfe7fkegd8.centralindia-01.azurewebsites.net/auth/odoo', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         mode: 'cors',
//         body: JSON.stringify({
//           odoo_url: odooUrl,
//           odoo_db: odooDb,
//           odoo_username: odooUsername,
//           odoo_password: odooPassword
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Odoo auth response:', data);
        
//         setOdooMessage('✅ Odoo connection established successfully!');
//         setOdooMessageType('success');
        
//         // Prepare Odoo connection details
//         const odooDetails = {
//           url: odooUrl,
//           database: odooDb,
//           username: odooUsername,
//           connectedAt: new Date().toISOString()
//         };
        
//         // Set Odoo connected state
//         setOdooConnected(true);
//         setConnectedOdooDetails(odooDetails);
        
//         // Save to localStorage for persistence
//         localStorage.setItem('odooConnection', JSON.stringify(odooDetails));
//         console.log('IntegrationTabs: Saved Odoo connection to localStorage:', odooDetails);
        
//         // Clear form fields (but don't store password)
//         setOdooUrl('');
//         setOdooDb('');
//         setOdooUsername('');
//         setOdooPassword('');
        
//         // Note: Don't call onAuthenticated for Odoo as it's different auth system
//       } else {
//         const errorText = await response.text();
//         console.error('Odoo server response:', response.status, errorText);
//         throw new Error(`Odoo connection failed: ${response.status}`);
//       }
//     } catch (error) {
//       console.error('Odoo integration error:', error);
//       if (error.message.includes('CORS')) {
//         setOdooMessage('CORS error - please contact your backend developer to enable CORS for this domain.');
//       } else {
//         setOdooMessage(`Failed to connect to Odoo: ${error.message}`);
//       }
//       setOdooMessageType('error');
//     } finally {
//       setOdooLoading(false);
//     }
//   };

//   const tabs = [
//     {
//       id: 'gmail',
//       name: 'Gmail',
//       icon: Mail,
//       color: 'red'
//     },
//     {
//       id: 'odoo',
//       name: 'Odoo',
//       icon: Database,
//       color: 'purple'
//     }
//   ];

//   return (
//     <div className="flex-1 bg-white">
//       {/* Header */}
//       <div className="border-b border-gray-200 bg-white">
//         <div className="flex items-center px-6 py-4">
//           <button
//             onClick={onBack}
//             className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
//           >
//             <ArrowLeft className="w-5 h-5 text-gray-600" />
//           </button>
//           <div className="flex items-center space-x-3">
//             <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
//               <Settings className="w-6 h-6 text-gray-600" />
//             </div>
//             <div>
//               <h1 className="text-xl font-semibold text-gray-900">Integration Hub</h1>
//               <p className="text-sm text-gray-500">Connect your external services and accounts</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="border-b border-gray-200">
//         <div className="px-6">
//           <nav className="-mb-px flex space-x-8">
//             {tabs.map((tab) => {
//               const Icon = tab.icon;
//               const isActive = activeTab === tab.id;
//               const colorClasses = {
//                 red: isActive ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-red-600 hover:border-red-300',
//                 purple: isActive ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-purple-600 hover:border-purple-300'
//               };
              
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`${colorClasses[tab.color]} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors`}
//                 >
//                   <Icon className="w-4 h-4" />
//                   <span>{tab.name}</span>
//                 </button>
//               );
//             })}
//           </nav>
//         </div>
//       </div>

//       {/* Debug Panel - Remove this in production */}
//       <div className="p-4 bg-gray-50 border-b border-gray-200">
//         <div className="max-w-md mx-auto">
//           <details className="text-xs text-gray-600">
//             <summary className="cursor-pointer">Debug Info (Click to expand)</summary>
//             <div className="mt-2 space-y-1">
//               <p><strong>localStorage Email:</strong> {localStorage.getItem('authenticatedEmail') || 'None'}</p>
//               <p><strong>localStorage Odoo:</strong> {localStorage.getItem('odooConnection') || 'None'}</p>
//               <p><strong>Gmail Connected:</strong> {gmailConnected ? 'Yes' : 'No'}</p>
//               <p><strong>Connected Email:</strong> {connectedGmailEmail || 'None'}</p>
//               <p><strong>Odoo Connected:</strong> {odooConnected ? 'Yes' : 'No'}</p>
//               <p><strong>Odoo Details:</strong> {connectedOdooDetails ? JSON.stringify(connectedOdooDetails) : 'None'}</p>
//               <p><strong>Active Tab:</strong> {activeTab}</p>
//             </div>
//           </details>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="p-6">
//         <div className="max-w-md mx-auto">
//           {activeTab === 'gmail' ? (
//             <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
//               <div className="text-center mb-6">
//                 <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/1920px-Gmail_icon_%282020%29.svg.png" alt="Gmail Icon" className="w-9" />
//                 </div>
//                 <h2 className="text-lg font-semibold text-gray-900 mb-2">
//                   {gmailConnected ? 'Gmail Connected' : 'Connect Gmail'}
//                 </h2>
//                 <p className="text-sm text-gray-600">
//                   {gmailConnected 
//                     ? 'Your Gmail account is successfully connected' 
//                     : 'Enter your email address to start the integration process'
//                   }
//                 </p>
//               </div>

//               {gmailConnected ? (
//                 <div className="space-y-4">
//                   <div className="bg-green-50 border border-green-200 rounded-lg p-4">
//                     <div className="flex items-center mb-3">
//                       <CheckCircle2 className="w-5 h-5 text-green-600 mr-2" />
//                       <span className="font-medium text-green-900">Connected Successfully</span>
//                     </div>
//                     <div className="text-sm text-green-700">
//                       <p><strong>Email:</strong> {connectedGmailEmail}</p>
//                       <p><strong>Status:</strong> OAuth Authenticated</p>
//                       <p><strong>Connected:</strong> {new Date().toLocaleDateString()}</p>
//                     </div>
//                   </div>

//                   <button
//                     onClick={handleGmailDisconnect}
//                     className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
//                   >
//                     <X className="w-4 h-4 mr-2" />
//                     Disconnect Gmail
//                   </button>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="your.email@company.com"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
//                     onKeyPress={(e) => {
//                       if (e.key === 'Enter') {
//                         handleGmailSubmit(e);
//                       }
//                     }}
//                   />
//                 </div>

//                 <div className="flex items-center space-x-2">
//                   <input
//                     type="checkbox"
//                     id="forceReauth"
//                     checked={forceReauth}
//                     onChange={(e) => setForceReauth(e.target.checked)}
//                     className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
//                   />
//                   <label htmlFor="forceReauth" className="text-sm text-gray-600">
//                     Force re-authentication (even if already connected)
//                   </label>
//                 </div>

//                 {gmailMessage && (
//                   <div className={`p-3 rounded-lg text-sm ${
//                     gmailMessageType === 'success' 
//                       ? 'bg-green-50 text-green-700 border border-green-200' 
//                       : 'bg-red-50 text-red-700 border border-red-200'
//                   }`}>
//                     <div className="flex items-center">
//                       {gmailMessageType === 'success' ? (
//                         <CheckCircle2 className="w-4 h-4 mr-2" />
//                       ) : (
//                         <AlertCircle className="w-4 h-4 mr-2" />
//                       )}
//                       {gmailMessage}
//                     </div>
//                   </div>
//                 )}

//                 <button
//                   onClick={handleGmailSubmit}
//                   disabled={gmailLoading}
//                   className="w-full bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
//                 >
//                   {gmailLoading ? (
//                     <div className="flex items-center">
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                       Connecting...
//                     </div>
//                   ) : (
//                     <div className="flex items-center">
//                       <Mail className="w-4 h-4 mr-2" />
//                       Connect Gmail
//                     </div>
//                   )}
//                 </button>
//               </div>
//               )}

//               {!gmailConnected && (
//               <div className="mt-6 pt-6 border-t border-gray-200">
//                 <div className="text-xs text-gray-500 space-y-2">
//                   <p className="flex items-start">
//                     <span className="w-2 h-2 bg-green-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
//                     Your data is encrypted and secure
//                   </p>
//                   <p className="flex items-start">
//                     <span className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
//                     We only access emails and contacts you authorize
//                   </p>
//                   <p className="flex items-start">
//                     <span className="w-2 h-2 bg-purple-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
//                     You can disconnect anytime in settings
//                   </p>
//                 </div>
//               </div>
//               )}
//             </div>
//           ) : (
//             <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
//               <div className="text-center mb-6">
//                 <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <Database className="w-8 h-8 text-purple-500" />
//                 </div>
//                 <h2 className="text-lg font-semibold text-gray-900 mb-2">
//                   {odooConnected ? 'Odoo Connected' : 'Connect Odoo'}
//                 </h2>
//                 <p className="text-sm text-gray-600">
//                   {odooConnected 
//                     ? 'Your Odoo instance is successfully connected' 
//                     : 'Enter your Odoo instance details to establish connection'
//                   }
//                 </p>
//               </div>

//               {odooConnected ? (
//                 <div className="space-y-4">
//                   <div className="bg-green-50 border border-green-200 rounded-lg p-4">
//                     <div className="flex items-center mb-3">
//                       <CheckCircle2 className="w-5 h-5 text-green-600 mr-2" />
//                       <span className="font-medium text-green-900">Connected Successfully</span>
//                     </div>
//                     <div className="text-sm text-green-700">
//                       <p><strong>URL:</strong> {connectedOdooDetails?.url}</p>
//                       <p><strong>Database:</strong> {connectedOdooDetails?.database}</p>
//                       <p><strong>Username:</strong> {connectedOdooDetails?.username}</p>
//                       <p><strong>Status:</strong> Direct Connection</p>
//                       <p><strong>Connected:</strong> {connectedOdooDetails?.connectedAt ? new Date(connectedOdooDetails.connectedAt).toLocaleDateString() : new Date().toLocaleDateString()}</p>
//                     </div>
//                   </div>

//                   <button
//                     onClick={handleOdooDisconnect}
//                     className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
//                   >
//                     <X className="w-4 h-4 mr-2" />
//                     Disconnect Odoo
//                   </button>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                 <div>
//                   <label htmlFor="odooUrl" className="block text-sm font-medium text-gray-700 mb-2">
//                     Odoo URL
//                   </label>
//                   <input
//                     type="url"
//                     id="odooUrl"
//                     value={odooUrl}
//                     onChange={(e) => setOdooUrl(e.target.value)}
//                     placeholder="https://your-instance.odoo.com"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                     onKeyPress={(e) => {
//                       if (e.key === 'Enter') {
//                         handleOdooSubmit(e);
//                       }
//                     }}
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="odooDb" className="block text-sm font-medium text-gray-700 mb-2">
//                     Database Name
//                   </label>
//                   <input
//                     type="text"
//                     id="odooDb"
//                     value={odooDb}
//                     onChange={(e) => setOdooDb(e.target.value)}
//                     placeholder="your-database-name"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="odooUsername" className="block text-sm font-medium text-gray-700 mb-2">
//                     Username
//                   </label>
//                   <input
//                     type="text"
//                     id="odooUsername"
//                     value={odooUsername}
//                     onChange={(e) => setOdooUsername(e.target.value)}
//                     placeholder="username@company.com"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="odooPassword" className="block text-sm font-medium text-gray-700 mb-2">
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     id="odooPassword"
//                     value={odooPassword}
//                     onChange={(e) => setOdooPassword(e.target.value)}
//                     placeholder="Your Odoo password"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                   />
//                 </div>

//                 {odooMessage && (
//                   <div className={`p-3 rounded-lg text-sm ${
//                     odooMessageType === 'success' 
//                       ? 'bg-green-50 text-green-700 border border-green-200' 
//                       : 'bg-red-50 text-red-700 border border-red-200'
//                   }`}>
//                     <div className="flex items-center">
//                       {odooMessageType === 'success' ? (
//                         <CheckCircle2 className="w-4 h-4 mr-2" />
//                       ) : (
//                         <AlertCircle className="w-4 h-4 mr-2" />
//                       )}
//                       {odooMessage}
//                     </div>
//                   </div>
//                 )}

//                 <button
//                   onClick={handleOdooSubmit}
//                   disabled={odooLoading}
//                   className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
//                 >
//                   {odooLoading ? (
//                     <div className="flex items-center">
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                       Connecting...
//                     </div>
//                   ) : (
//                     <div className="flex items-center">
//                       <Database className="w-4 h-4 mr-2" />
//                       Connect Odoo
//                     </div>
//                   )}
//                 </button>
//               </div>
//               )}

//               {!odooConnected && (
//               <div className="mt-6 pt-6 border-t border-gray-200">
//                 <div className="text-xs text-gray-500 space-y-2">
//                   <p className="flex items-start">
//                     <span className="w-2 h-2 bg-green-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
//                     Credentials are transmitted securely
//                   </p>
//                   <p className="flex items-start">
//                     <span className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
//                     Read-only access to authorized data
//                   </p>
//                   <p className="flex items-start">
//                     <span className="w-2 h-2 bg-purple-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
//                     Connection can be revoked anytime
//                   </p>
//                 </div>
//               </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IntegrationTabs;



import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, ArrowUpDown, Home, Users, Bell, CheckSquare, FileText, Settings, Link, ArrowLeft, Mail, Phone, MapPin, Calendar, Edit, Trash2, Star, Clock, Mic, Send, MoreHorizontal, AlertCircle, CheckCircle2, Circle, BookOpen, X, Paperclip, Image, MessageCircle, Database, Eye, EyeOff } from 'lucide-react';

const IntegrationTabs = ({ onBack, onAuthenticated }) => {
  const [activeTab, setActiveTab] = useState('gmail');
  
  // Gmail state
  const [email, setEmail] = useState('');
  const [gmailLoading, setGmailLoading] = useState(false);
  const [gmailMessage, setGmailMessage] = useState('');
  const [gmailMessageType, setGmailMessageType] = useState('');
  const [forceReauth, setForceReauth] = useState(false);
  const [gmailConnected, setGmailConnected] = useState(false);
  const [connectedGmailEmail, setConnectedGmailEmail] = useState('');
  
  // Odoo state
  const [odooUrl, setOdooUrl] = useState('');
  const [odooDb, setOdooDb] = useState('');
  const [odooUsername, setOdooUsername] = useState('');
  const [odooPassword, setOdooPassword] = useState('');
  const [odooLoading, setOdooLoading] = useState(false);
  const [odooMessage, setOdooMessage] = useState('');
  const [odooMessageType, setOdooMessageType] = useState('');
  const [odooConnected, setOdooConnected] = useState(false);
  const [connectedOdooDetails, setConnectedOdooDetails] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Check for existing connections on component mount
  useEffect(() => {
    // Restore Gmail connection
    const savedEmail = localStorage.getItem('authenticatedEmail');
    console.log('IntegrationTabs: Checking localStorage for authenticatedEmail:', savedEmail);
    if (savedEmail) {
      console.log('IntegrationTabs: Restoring Gmail connection for:', savedEmail);
      setGmailConnected(true);
      setConnectedGmailEmail(savedEmail);
      setGmailMessage('Connection restored from previous session');
      setGmailMessageType('success');
    }
    
    // Restore Odoo connection
    const savedOdooDetails = localStorage.getItem('odooConnection');
    console.log('IntegrationTabs: Checking localStorage for odooConnection:', savedOdooDetails);
    if (savedOdooDetails) {
      try {
        const odooDetails = JSON.parse(savedOdooDetails);
        console.log('IntegrationTabs: Restoring Odoo connection for:', odooDetails);
        setOdooConnected(true);
        setConnectedOdooDetails(odooDetails);
        setOdooMessage('Connection restored from previous session');
        setOdooMessageType('success');
      } catch (error) {
        console.error('IntegrationTabs: Error parsing saved Odoo details:', error);
        localStorage.removeItem('odooConnection');
      }
    }
  }, []);

  const handleGmailSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setGmailMessage('Please enter a valid email address');
      setGmailMessageType('error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setGmailMessage('Please enter a valid email address');
      setGmailMessageType('error');
      return;
    }

    setGmailLoading(true);
    setGmailMessage('');

    try {
      const url = forceReauth 
        ? `${import.meta.env.VITE_AUTH_URL}?gmail_address=${encodeURIComponent(email)}&force_reauth=true`
        : `${import.meta.env.VITE_AUTH_URL}?gmail_address=${encodeURIComponent(email)}`;
        
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Auth response:', data);
        
        if (data.auth_url) {
          setGmailMessage('Redirecting to Google authentication...');
          setGmailMessageType('success');
          
          // Save to localStorage immediately
          localStorage.setItem('authenticatedEmail', email);
          console.log('IntegrationTabs: Saved to localStorage:', email);
          
          window.open(data.auth_url, '_blank', 'width=500,height=600,scrollbars=yes,resizable=yes');
          
          // Set Gmail connected state
          setGmailConnected(true);
          setConnectedGmailEmail(email);
          setEmail('');
          
          // Note: Removed onAuthenticated call to prevent redirect to home
        } else if (data.message && data.message.includes('Already authenticated')) {
          setGmailMessage('✅ This email is already authenticated and ready to use!');
          setGmailMessageType('success');
          
          // Save to localStorage immediately
          localStorage.setItem('authenticatedEmail', email);
          console.log('IntegrationTabs: Saved to localStorage (already auth):', email);
          
          // Set Gmail connected state
          setGmailConnected(true);
          setConnectedGmailEmail(email);
          setEmail('');
          
          // Note: Removed onAuthenticated call to prevent redirect to home
        } else {
          throw new Error('Unexpected response format from server');
        }
      } else {
        const errorText = await response.text();
        console.error('Server response:', response.status, errorText);
        throw new Error(`Integration failed: ${response.status}`);
      }
    } catch (error) {
      console.error('Integration error:', error);
      if (error.message.includes('CORS')) {
        setGmailMessage('CORS error - please contact your backend developer to enable CORS for this domain.');
      } else if (error.message.includes('405')) {
        setGmailMessage('Method not allowed - the server may expect GET instead of POST.');
      } else {
        setGmailMessage(`Failed to connect: ${error.message}`);
      }
      setGmailMessageType('error');
    } finally {
      setGmailLoading(false);
    }
  };

  const handleGmailDisconnect = () => {
    console.log('IntegrationTabs: Disconnecting Gmail, removing from localStorage');
    setGmailConnected(false);
    setConnectedGmailEmail('');
    setGmailMessage('');
    setGmailMessageType('');
    localStorage.removeItem('authenticatedEmail');
    console.log('IntegrationTabs: localStorage after removal:', localStorage.getItem('authenticatedEmail'));
    // Note: This only affects Gmail authentication
  };

  const handleOdooDisconnect = () => {
    console.log('IntegrationTabs: Disconnecting Odoo, removing from localStorage');
    setOdooConnected(false);
    setConnectedOdooDetails(null);
    setOdooMessage('');
    setOdooMessageType('');
    localStorage.removeItem('odooConnection');
    console.log('IntegrationTabs: Odoo localStorage after removal:', localStorage.getItem('odooConnection'));
    // Note: This only affects Odoo connection, separate from Gmail
  };

  const handleOdooSubmit = async (e) => {
    e.preventDefault();
    
    if (!odooUrl || !odooDb || !odooUsername || !odooPassword) {
      setOdooMessage('Please fill in all required fields');
      setOdooMessageType('error');
      return;
    }

    setOdooLoading(true);
    setOdooMessage('');

    try {
      const response = await fetch('https://info-retrieval-agent-btbsfphfe7fkegd8.centralindia-01.azurewebsites.net/auth/odoo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify({
          odoo_url: odooUrl,
          odoo_db: odooDb,
          odoo_username: odooUsername,
          odoo_password: odooPassword
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Odoo auth response:', data);
        
        setOdooMessage('✅ Odoo connection established successfully!');
        setOdooMessageType('success');
        
        // Prepare Odoo connection details
        const odooDetails = {
          url: odooUrl,
          database: odooDb,
          username: odooUsername,
          connectedAt: new Date().toISOString()
        };
        
        // Set Odoo connected state
        setOdooConnected(true);
        setConnectedOdooDetails(odooDetails);
        
        // Save to localStorage for persistence
        localStorage.setItem('odooConnection', JSON.stringify(odooDetails));
        console.log('IntegrationTabs: Saved Odoo connection to localStorage:', odooDetails);
        
        // Clear form fields (but don't store password)
        setOdooUrl('');
        setOdooDb('');
        setOdooUsername('');
        setOdooPassword('');
        
        // Note: Don't call onAuthenticated for Odoo as it's different auth system
      } else {
        let errorMessage = `Odoo connection failed: ${response.status}`;
        
        try {
          const errorData = await response.json();
          console.error('Odoo server response:', response.status, errorData);
          
          if (errorData.detail) {
            // Extract the actual error message from the detail field
            if (errorData.detail.includes('Invalid credentials')) {
              errorMessage = 'Invalid credentials. Please check your username and password.';
            } else if (errorData.detail.includes('authentication failed')) {
              errorMessage = 'Authentication failed. Please verify your credentials and try again.';
            } else {
              errorMessage = errorData.detail;
            }
          }
        } catch (parseError) {
          // If response is not JSON, fall back to text
          try {
            const errorText = await response.text();
            console.error('Odoo server response (text):', response.status, errorText);
            if (errorText.includes('Invalid credentials')) {
              errorMessage = 'Invalid credentials. Please check your username and password.';
            }
          } catch (textError) {
            console.error('Failed to parse error response:', textError);
          }
        }
        
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Odoo integration error:', error);
      if (error.message.includes('CORS')) {
        setOdooMessage('CORS error - please contact your backend developer to enable CORS for this domain.');
      } else {
        setOdooMessage(`Failed to connect to Odoo: ${error.message}`);
      }
      setOdooMessageType('error');
    } finally {
      setOdooLoading(false);
    }
  };

  const tabs = [
    {
      id: 'gmail',
      name: 'Gmail',
      icon: Mail,
      color: 'red'
    },
    {
      id: 'odoo',
      name: 'Odoo',
      icon: Database,
      color: 'purple'
    }
  ];

  return (
    <div className="flex-1 bg-white overflow-auto">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="flex items-center px-6 py-4">
          <button
            onClick={onBack}
            className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              {/* <Settings className="w-6 h-6 text-gray-600" /> */}
              <Link className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Integration Hub</h1>
              <p className="text-sm text-gray-500">Connect your external services and accounts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="px-6">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const colorClasses = {
                red: isActive ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-red-600 hover:border-red-300',
                purple: isActive ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-purple-600 hover:border-purple-300'
              };
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${colorClasses[tab.color]} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Debug Panel - Remove this in production */}
      {/* <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="max-w-md mx-auto">
          <details className="text-xs text-gray-600">
            <summary className="cursor-pointer">Debug Info (Click to expand)</summary>
            <div className="mt-2 space-y-1">
              <p><strong>localStorage Email:</strong> {localStorage.getItem('authenticatedEmail') || 'None'}</p>
              <p><strong>localStorage Odoo:</strong> {localStorage.getItem('odooConnection') || 'None'}</p>
              <p><strong>Gmail Connected:</strong> {gmailConnected ? 'Yes' : 'No'}</p>
              <p><strong>Connected Email:</strong> {connectedGmailEmail || 'None'}</p>
              <p><strong>Odoo Connected:</strong> {odooConnected ? 'Yes' : 'No'}</p>
              <p><strong>Odoo Details:</strong> {connectedOdooDetails ? JSON.stringify(connectedOdooDetails) : 'None'}</p>
              <p><strong>Active Tab:</strong> {activeTab}</p>
            </div>
          </details>
        </div>
      </div> */}

      {/* Content */}
      <div className="p-6">
        <div className="max-w-md mx-auto">
          {activeTab === 'gmail' ? (
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/1920px-Gmail_icon_%282020%29.svg.png" alt="Gmail Icon" className="w-9" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  {gmailConnected ? 'Gmail Connected' : 'Connect Gmail'}
                </h2>
                <p className="text-sm text-gray-600">
                  {gmailConnected 
                    ? 'Your Gmail account is successfully connected' 
                    : 'Enter your email address to start the integration process'
                  }
                </p>
              </div>

              {gmailConnected ? (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mr-2" />
                      <span className="font-medium text-green-900">Connected Successfully</span>
                    </div>
                    <div className="text-sm text-green-700">
                      <p><strong>Email:</strong> {connectedGmailEmail}</p>
                      <p><strong>Status:</strong> OAuth Authenticated</p>
                      <p><strong>Connected:</strong> {new Date().toLocaleDateString()}</p>
                    </div>
                  </div>

                  <button
                    onClick={handleGmailDisconnect}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Disconnect Gmail
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@company.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleGmailSubmit(e);
                      }
                    }}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="forceReauth"
                    checked={forceReauth}
                    onChange={(e) => setForceReauth(e.target.checked)}
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label htmlFor="forceReauth" className="text-sm text-gray-600">
                    Force re-authentication (even if already connected)
                  </label>
                </div>

                {gmailMessage && (
                  <div className={`p-3 rounded-lg text-sm ${
                    gmailMessageType === 'success' 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    <div className="flex items-center">
                      {gmailMessageType === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                      ) : (
                        <AlertCircle className="w-4 h-4 mr-2" />
                      )}
                      {gmailMessage}
                    </div>
                  </div>
                )}

                <button
                  onClick={handleGmailSubmit}
                  disabled={gmailLoading}
                  className="w-full bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  {gmailLoading ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Connecting...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      Connect Gmail
                    </div>
                  )}
                </button>
              </div>
              )}

              {!gmailConnected && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-xs text-gray-500 space-y-2">
                  <p className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    Your data is encrypted and secure
                  </p>
                  <p className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    We only access emails and contacts you authorize
                  </p>
                  <p className="flex items-start">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    You can disconnect anytime in settings
                  </p>
                </div>
              </div>
              )}
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Database className="w-8 h-8 text-purple-500" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  {odooConnected ? 'Odoo Connected' : 'Connect Odoo'}
                </h2>
                <p className="text-sm text-gray-600">
                  {odooConnected 
                    ? 'Your Odoo instance is successfully connected' 
                    : 'Enter your Odoo instance details to establish connection'
                  }
                </p>
              </div>

              {odooConnected ? (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mr-2" />
                      <span className="font-medium text-green-900">Connected Successfully</span>
                    </div>
                    <div className="text-sm text-green-700">
                      <p><strong>URL:</strong> {connectedOdooDetails?.url}</p>
                      <p><strong>Database:</strong> {connectedOdooDetails?.database}</p>
                      <p><strong>Username:</strong> {connectedOdooDetails?.username}</p>
                      <p><strong>Status:</strong> Direct Connection</p>
                      <p><strong>Connected:</strong> {connectedOdooDetails?.connectedAt ? new Date(connectedOdooDetails.connectedAt).toLocaleDateString() : new Date().toLocaleDateString()}</p>
                    </div>
                  </div>

                  <button
                    onClick={handleOdooDisconnect}
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Disconnect Odoo
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                <div>
                  <label htmlFor="odooUrl" className="block text-sm font-medium text-gray-700 mb-2">
                    Odoo URL
                  </label>
                  <input
                    type="url"
                    id="odooUrl"
                    value={odooUrl}
                    onChange={(e) => setOdooUrl(e.target.value)}
                    placeholder="https://your-instance.odoo.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleOdooSubmit(e);
                      }
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="odooDb" className="block text-sm font-medium text-gray-700 mb-2">
                    Database Name
                  </label>
                  <input
                    type="text"
                    id="odooDb"
                    value={odooDb}
                    onChange={(e) => setOdooDb(e.target.value)}
                    placeholder="your-database-name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="odooUsername" className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    id="odooUsername"
                    value={odooUsername}
                    onChange={(e) => setOdooUsername(e.target.value)}
                    placeholder="username@company.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="odooPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="odooPassword"
                      value={odooPassword}
                      onChange={(e) => setOdooPassword(e.target.value)}
                      placeholder="Your Odoo password"
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {odooMessage && (
                  <div className={`p-3 rounded-lg text-sm ${
                    odooMessageType === 'success' 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    <div className="flex items-center">
                      {odooMessageType === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                      ) : (
                        <AlertCircle className="w-4 h-4 mr-2" />
                      )}
                      {odooMessage}
                    </div>
                  </div>
                )}

                <button
                  onClick={handleOdooSubmit}
                  disabled={odooLoading}
                  className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  {odooLoading ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Connecting...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Database className="w-4 h-4 mr-2" />
                      Connect Odoo
                    </div>
                  )}
                </button>
              </div>
              )}

              {!odooConnected && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-xs text-gray-500 space-y-2">
                  <p className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    Credentials are transmitted securely
                  </p>
                  <p className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    Read-only access to authorized data
                  </p>
                  <p className="flex items-start">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    Connection can be revoked anytime
                  </p>
                </div>
              </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IntegrationTabs;