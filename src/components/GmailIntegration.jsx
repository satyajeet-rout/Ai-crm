


// import React, { useState } from 'react';
// import { Search, Plus, Filter, ArrowUpDown, Home, Users, Bell, CheckSquare, FileText, Settings, Link, ArrowLeft, Mail, Phone, MapPin, Calendar, Edit, Trash2, Star, Clock, Mic, Send, MoreHorizontal, AlertCircle, CheckCircle2, Circle, BookOpen, X, Paperclip, Image, MessageCircle } from 'lucide-react';

// const GmailIntegration = ({ onBack }) => {
//   const [email, setEmail] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [messageType, setMessageType] = useState(''); // 'success' or 'error'
//   const [forceReauth, setForceReauth] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!email) {
//       setMessage('Please enter a valid email address');
//       setMessageType('error');
//       return;
//     }

//     // Basic email validation - accepts any valid email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setMessage('Please enter a valid email address');
//       setMessageType('error');
//       return;
//     }

//     setIsLoading(true);
//     setMessage('');

//     try {
//       const url = forceReauth 
//         ? `https://info-retrieval-agent-btbsfphfe7fkegd8.centralindia-01.azurewebsites.net/auth/start?gmail_address=${encodeURIComponent(email)}&force_reauth=true`
//         : `https://info-retrieval-agent-btbsfphfe7fkegd8.centralindia-01.azurewebsites.net/auth/start?gmail_address=${encodeURIComponent(email)}`;
        
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
//           setMessage('Redirecting to Google authentication...');
//           setMessageType('success');
          
//           // Open the auth URL in a new window/tab
//           window.open(data.auth_url, '_blank', 'width=500,height=600,scrollbars=yes,resizable=yes');
          
//           setEmail('');
//         } else if (data.message && data.message.includes('Already authenticated')) {
//           setMessage('✅ This email is already authenticated and ready to use!');
//           setMessageType('success');
//           setEmail('');
          
//           // Optional: You could add a callback here to notify parent component
//           // if (onAlreadyAuthenticated) onAlreadyAuthenticated(email);
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
//         setMessage('CORS error - please contact your backend developer to enable CORS for this domain.');
//       } else if (error.message.includes('405')) {
//         setMessage('Method not allowed - the server may expect GET instead of POST.');
//       } else {
//         setMessage(`Failed to connect: ${error.message}`);
//       }
//       setMessageType('error');
//     } finally {
//       setIsLoading(false);
//     }
//   };

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
//             <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
//               <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
//                 <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h3.819v.545L12 10.455l6.545-6.089v-.545h3.819c.904 0 1.636.732 1.636 1.636Z"/>
//               </svg>
//             </div>
//             <div>
//               <h1 className="text-xl font-semibold text-gray-900">Email Integration</h1>
//               <p className="text-sm text-gray-500">Connect your email account to sync contacts and emails</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="p-6">
//         <div className="max-w-md mx-auto">
//           <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
//             <div className="text-center mb-6">
//               <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg className="w-8 h-8 text-red-500" viewBox="0 0 24 24" fill="currentColor">
//                   <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h3.819v.545L12 10.455l6.545-6.089v-.545h3.819c.904 0 1.636.732 1.636 1.636Z"/>
//                 </svg>
//               </div>
//               <h2 className="text-lg font-semibold text-gray-900 mb-2">Connect Email</h2>
//               <p className="text-sm text-gray-600">
//                 Enter your email address to start the integration process
//               </p>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="your.email@company.com"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
//                   onKeyPress={(e) => {
//                     if (e.key === 'Enter') {
//                       handleSubmit(e);
//                     }
//                   }}
//                 />
//               </div>

//               <div className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   id="forceReauth"
//                   checked={forceReauth}
//                   onChange={(e) => setForceReauth(e.target.checked)}
//                   className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
//                 />
//                 <label htmlFor="forceReauth" className="text-sm text-gray-600">
//                   Force re-authentication (even if already connected)
//                 </label>
//               </div>

//               {message && (
//                 <div className={`p-3 rounded-lg text-sm ${
//                   messageType === 'success' 
//                     ? 'bg-green-50 text-green-700 border border-green-200' 
//                     : 'bg-red-50 text-red-700 border border-red-200'
//                 }`}>
//                   <div className="flex items-center">
//                     {messageType === 'success' ? (
//                       <CheckCircle2 className="w-4 h-4 mr-2" />
//                     ) : (
//                       <AlertCircle className="w-4 h-4 mr-2" />
//                     )}
//                     {message}
//                   </div>
//                 </div>
//               )}

//               <button
//                 onClick={handleSubmit}
//                 disabled={isLoading}
//                 className="w-full bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
//               >
//                 {isLoading ? (
//                   <div className="flex items-center">
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                     Connecting...
//                   </div>
//                 ) : (
//                   <div className="flex items-center">
//                     <Mail className="w-4 h-4 mr-2" />
//                     Connect Email
//                   </div>
//                 )}
//               </button>
//             </div>

//             <div className="mt-6 pt-6 border-t border-gray-200">
//               <div className="text-xs text-gray-500 space-y-2">
//                 <p className="flex items-start">
//                   <span className="w-2 h-2 bg-green-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
//                   Your data is encrypted and secure
//                 </p>
//                 <p className="flex items-start">
//                   <span className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
//                   We only access emails and contacts you authorize
//                 </p>
//                 <p className="flex items-start">
//                   <span className="w-2 h-2 bg-purple-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
//                   You can disconnect anytime in settings
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GmailIntegration;



import React, { useState } from 'react';
import { Search, Plus, Filter, ArrowUpDown, Home, Users, Bell, CheckSquare, FileText, Settings, Link, ArrowLeft, Mail, Phone, MapPin, Calendar, Edit, Trash2, Star, Clock, Mic, Send, MoreHorizontal, AlertCircle, CheckCircle2, Circle, BookOpen, X, Paperclip, Image, MessageCircle } from 'lucide-react';

const GmailIntegration = ({ onBack, onAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [forceReauth, setForceReauth] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setMessage('Please enter a valid email address');
      setMessageType('error');
      return;
    }

    // Basic email validation - accepts any valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Please enter a valid email address');
      setMessageType('error');
      return;
    }

    setIsLoading(true);
    setMessage('');

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
          setMessage('Redirecting to Google authentication...');
          setMessageType('success');
          
          // Save email to localStorage when auth starts
          localStorage.setItem('authenticatedEmail', email);
          
          // Open the auth URL in a new window/tab
          window.open(data.auth_url, '_blank', 'width=500,height=600,scrollbars=yes,resizable=yes');
          
          // Pass the authenticated email back to parent
          if (onAuthenticated) {
            onAuthenticated(email);
          }
          
          setEmail('');
        } else if (data.message && data.message.includes('Already authenticated')) {
          setMessage('✅ This email is already authenticated and ready to use!');
          setMessageType('success');
          
          // Save email to localStorage for already authenticated users
          localStorage.setItem('authenticatedEmail', email);
          
          // Pass the authenticated email back to parent
          if (onAuthenticated) {
            onAuthenticated(email);
          }
          
          setEmail('');
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
        setMessage('CORS error - please contact your backend developer to enable CORS for this domain.');
      } else if (error.message.includes('405')) {
        setMessage('Method not allowed - the server may expect GET instead of POST.');
      } else {
        setMessage(`Failed to connect: ${error.message}`);
      }
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-white">
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
            <div className="w-12   rounded-lg flex items-center justify-center">
              {/* <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h3.819v.545L12 10.455l6.545-6.089v-.545h3.819c.904 0 1.636.732 1.636 1.636Z"/>
              </svg> */}
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/1920px-Gmail_icon_%282020%29.svg.png" alt="Gmail Icon" className="w-12 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Email Integration</h1>
              <p className="text-sm text-gray-500">Connect your email account to sync contacts and emails</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="max-w-md mx-auto">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                {/* <svg className="w-8 h-8 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h3.819v.545L12 10.455l6.545-6.089v-.545h3.819c.904 0 1.636.732 1.636 1.636Z"/>
                </svg> */}
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/1920px-Gmail_icon_%282020%29.svg.png" alt="Gmail Icon" className="w-9 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Connect Email</h2>
              <p className="text-sm text-gray-600">
                Enter your email address to start the integration process
              </p>
            </div>

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
                      handleSubmit(e);
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

              {message && (
                <div className={`p-3 rounded-lg text-sm ${
                  messageType === 'success' 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  <div className="flex items-center">
                    {messageType === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                    ) : (
                      <AlertCircle className="w-4 h-4 mr-2" />
                    )}
                    {message}
                  </div>
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Connecting...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Connect Email
                  </div>
                )}
              </button>
            </div>

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default GmailIntegration;