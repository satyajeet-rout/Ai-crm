// import React, { useState } from 'react';
// import { Search, Plus, Filter, ArrowUpDown, Home, Users, Bell, CheckSquare, FileText, Settings, Link, ArrowLeft, Mail, Phone, MapPin, Calendar, Edit, Trash2, Star, Clock, Mic, Send, MoreHorizontal, AlertCircle, CheckCircle2, Circle, BookOpen, X, Paperclip, Image, MessageCircle } from 'lucide-react';






// const Sidebar = ({ activeView, setActiveView }) => {
//     const [chatHistory, setChatHistory] = useState([
//       {
//         id: 1,
//         title: "Show me all contacts living in Berlin",
//         timeAgo: "6 Hours",
//         lastMessage: "Found 23 contacts in Berlin area..."
//       },
//       {
//         id: 2,
//         title: "My last touch points with Lukas",
//         timeAgo: "12 Hours",
//         lastMessage: "Your last interaction was via email..."
//       },
//       {
//         id: 3,
//         title: "Who in my network is an SaaS expert",
//         timeAgo: "18 Hours",
//         lastMessage: "Found 8 SaaS experts in your network..."
//       },
//       {
//         id: 4,
//         title: "Add www.linkedin.com/in/sina-sadegh",
//         timeAgo: "1 day",
//         lastMessage: "Contact added successfully..."
//       },
//       {
//         id: 5,
//         title: "Schedule meeting with investors",
//         timeAgo: "2 days",
//         lastMessage: "Available time slots for next week..."
//       }
//     ]);
  
//     const handleDeleteChat = (chatId, e) => {
//       e.stopPropagation();
//       if (window.confirm('Are you sure you want to delete this chat?')) {
//         setChatHistory(chatHistory.filter(chat => chat.id !== chatId));
//       }
//     };
  
//     return (
//       <div className="w-64 bg-[#FBFAFF] border-r border-gray-200 flex flex-col h-full">
//         {/* User Profile */}
//         <div className="p-4 border-b border-gray-200">
//           <div className="flex items-center space-x-3">
//             <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
//               <span className="text-sm">👨</span>
//             </div>
//             <span className="text-gray-600 font-medium">Kunal</span>
//           </div>
//         </div>
  
//         {/* Search */}
//         <div className="p-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <input
//               type="text"
//               placeholder="Search..."
//               onClick={() => setActiveView('search')}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
//               readOnly
//             />
//             <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">
//               ⌘↵
//             </div>
//           </div>
//         </div>
  
//         {/* Navigation */}
//         <nav className="flex flex-col flex-1 overflow-hidden">
//           <div className="px-4 space-y-1 mb-6">
//             <button 
//               onClick={() => setActiveView('home')}
//               className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg ${
//                 activeView === 'home' ? 'bg-[#F3E7FF] text-gray-900 font-medium' : 'text-gray-700 hover:bg-gray-100'
//               }`}
//             >
//               <Home className="w-5 h-5" />
//               <span>Home</span>
//             </button>
//             <button 
//               onClick={() => setActiveView('contacts')}
//               className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg ${
//                 activeView === 'contacts' ? 'bg-[#F3E7FF] text-gray-900 font-medium' : 'text-gray-700 hover:bg-gray-100'
//               }`}
//             >
//               <Users className="w-5 h-5" />
//               <span>Contacts</span>
//             </button>
//             <button 
//               onClick={() => setActiveView('notifications')}
//               className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg ${
//                 activeView === 'notifications' ? 'bg-[#F3E7FF] text-gray-900 font-medium' : 'text-gray-700 hover:bg-gray-100'
//               }`}
//             >
//               <Bell className="w-5 h-5" />
//               <span>Notification</span>
//             </button>
//             <button 
//               onClick={() => setActiveView('tasks')}
//               className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg ${
//                 activeView === 'tasks' ? 'bg-[#F3E7FF] text-gray-900 font-medium' : 'text-gray-700 hover:bg-gray-100'
//               }`}
//             >
//               <CheckSquare className="w-5 h-5" />
//               <span>Tasks</span>
//             </button>
//             <button 
//               onClick={() => setActiveView('notes')}
//               className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg ${
//                 activeView === 'notes' ? 'bg-[#F3E7FF] text-gray-900 font-medium' : 'text-gray-700 hover:bg-gray-100'
//               }`}
//             >
//               <FileText className="w-5 h-5" />
//               <span>Notes</span>
//             </button>
//           </div>
  
//           {/* Chats Section */}
//           <div className="flex items-center justify-between mb-3 px-4">
//               <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Recent Chats</h3>
//               <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full text-xs font-medium">
//                 {chatHistory.length}
//               </span>
//             </div>
//           <div className="flex-1 px-4 mb-6 overflow-y-auto">
//             <div className="space-y-1">
//               {chatHistory.slice(0, 5).map((chat) => (
//                 <div
//                   key={chat.id}
//                   className="group relative"
//                 >
//                   <button
//                     onClick={() => setActiveView('home')}
//                     className="w-full text-left p-2 rounded-lg hover:bg-gray-100 transition-colors"
//                   >
//                     <div className="flex items-start space-x-2">
//                       <MessageCircle className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
//                       <div className="min-w-0 flex-1 pr-6">
//                         <p className="text-xs font-medium text-gray-700 line-clamp-2 leading-tight mb-1">
//                           {chat.title}
//                         </p>
//                         <div className="flex items-center justify-between">
//                           <p className="text-xs text-gray-500 truncate flex-1 mr-1">
//                             {chat.lastMessage}
//                           </p>
//                           <span className="text-xs text-gray-400 whitespace-nowrap">
//                             {chat.timeAgo}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </button>
                  
//                   {/* Delete Button */}
//                   <button
//                     onClick={(e) => handleDeleteChat(chat.id, e)}
//                     className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-all duration-200"
//                     title="Delete chat"
//                   >
//                     <X className="w-3 h-3" />
//                   </button>
//                 </div>
//               ))}
//             </div>
            
//             {chatHistory.length > 5 && (
//               <button 
//                 onClick={() => setActiveView('chats')}
//                 className="w-full mt-2 text-xs text-gray-500 hover:text-gray-700 text-center py-1"
//               >
//                 View all chats ({chatHistory.length})
//               </button>
//             )}
//           </div>
//         </nav>
  
//         {/* Bottom Navigation */}
//         <div className="p-4 border-t border-gray-200">
//           <div className="space-y-1">
//             <button 
//               onClick={() => setActiveView('gmail')}
//               className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg ${
//                 activeView === 'gmail' ? 'bg-[#F3E7FF] text-gray-900 font-medium' : 'text-gray-700 hover:bg-gray-100'
//               }`}
//             >
//               <div className="w-5 h-5 flex items-center justify-center">
//                 {/* <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
//                   <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h3.819v.545L12 10.455l6.545-6.089v-.545h3.819c.904 0 1.636.732 1.636 1.636Z"/>
//                 </svg> */}
//                 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/1920px-Gmail_icon_%282020%29.svg.png" alt="Gmail Icon" className="w-12 text-white" />
//               </div>
//               <span>Gmail</span>
//             </button>
//             <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
//               <Settings className="w-5 h-5" />
//               <span>Settings</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };


// export default Sidebar;


import React, { useState } from 'react';
import { Search, Plus, Filter, ArrowUpDown, Home, Users, Bell, CheckSquare, FileText, Settings, Link, ArrowLeft, Mail, Phone, MapPin, Calendar, Edit, Trash2, Star, Clock, Mic, Send, MoreHorizontal, AlertCircle, CheckCircle2, Circle, BookOpen, X, Paperclip, Image, MessageCircle } from 'lucide-react';

const Sidebar = ({ activeView, setActiveView }) => {
    const [chatHistory, setChatHistory] = useState([
      {
        id: 1,
        title: "Show me all contacts living in Berlin",
        timeAgo: "6 Hours",
        lastMessage: "Found 23 contacts in Berlin area..."
      },
      {
        id: 2,
        title: "My last touch points with Lukas",
        timeAgo: "12 Hours",
        lastMessage: "Your last interaction was via email..."
      },
      {
        id: 3,
        title: "Who in my network is an SaaS expert",
        timeAgo: "18 Hours",
        lastMessage: "Found 8 SaaS experts in your network..."
      },
      {
        id: 4,
        title: "Add www.linkedin.com/in/sina-sadegh",
        timeAgo: "1 day",
        lastMessage: "Contact added successfully..."
      },
      {
        id: 5,
        title: "Schedule meeting with investors",
        timeAgo: "2 days",
        lastMessage: "Available time slots for next week..."
      }
    ]);
  
    const handleDeleteChat = (chatId, e) => {
      e.stopPropagation();
      if (window.confirm('Are you sure you want to delete this chat?')) {
        setChatHistory(chatHistory.filter(chat => chat.id !== chatId));
      }
    };
  
    return (
      <div className="w-64 bg-[#FBFAFF] border-r border-gray-200 flex flex-col h-full">
        {/* User Profile */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-sm">👨</span>
            </div>
            <span className="text-gray-600 font-medium">Kunal</span>
          </div>
        </div>
  
        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              onClick={() => setActiveView('search')}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
              readOnly
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">
              ⌘↵
            </div>
          </div>
        </div>
  
        {/* Navigation */}
        <nav className="flex flex-col flex-1 overflow-hidden">
          <div className="px-4 space-y-1 mb-6">
            <button 
              onClick={() => setActiveView('home')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg ${
                activeView === 'home' ? 'bg-[#F3E7FF] text-gray-900 font-medium' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </button>
            <button 
              onClick={() => setActiveView('contacts')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg ${
                activeView === 'contacts' ? 'bg-[#F3E7FF] text-gray-900 font-medium' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Users className="w-5 h-5" />
              <span>Contacts</span>
            </button>
            <button 
              onClick={() => setActiveView('notifications')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg ${
                activeView === 'notifications' ? 'bg-[#F3E7FF] text-gray-900 font-medium' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Bell className="w-5 h-5" />
              <span>Notification</span>
            </button>
            <button 
              onClick={() => setActiveView('tasks')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg ${
                activeView === 'tasks' ? 'bg-[#F3E7FF] text-gray-900 font-medium' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <CheckSquare className="w-5 h-5" />
              <span>Tasks</span>
            </button>
            <button 
              onClick={() => setActiveView('notes')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg ${
                activeView === 'notes' ? 'bg-[#F3E7FF] text-gray-900 font-medium' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FileText className="w-5 h-5" />
              <span>Notes</span>
            </button>
          </div>
  
          {/* Chats Section */}
          <div className="flex items-center justify-between mb-3 px-4">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Recent Chats</h3>
              <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full text-xs font-medium">
                {chatHistory.length}
              </span>
            </div>
          <div className="flex-1 px-4 mb-6 overflow-y-auto">
            <div className="space-y-1">
              {chatHistory.slice(0, 5).map((chat) => (
                <div
                  key={chat.id}
                  className="group relative"
                >
                  <button
                    onClick={() => setActiveView('home')}
                    className="w-full text-left p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start space-x-2">
                      <MessageCircle className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0 flex-1 pr-6">
                        <p className="text-xs font-medium text-gray-700 line-clamp-2 leading-tight mb-1">
                          {chat.title}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500 truncate flex-1 mr-1">
                            {chat.lastMessage}
                          </p>
                          <span className="text-xs text-gray-400 whitespace-nowrap">
                            {chat.timeAgo}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                  
                  {/* Delete Button */}
                  <button
                    onClick={(e) => handleDeleteChat(chat.id, e)}
                    className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-all duration-200"
                    title="Delete chat"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
            
            {chatHistory.length > 5 && (
              <button 
                onClick={() => setActiveView('chats')}
                className="w-full mt-2 text-xs text-gray-500 hover:text-gray-700 text-center py-1"
              >
                View all chats ({chatHistory.length})
              </button>
            )}
          </div>
        </nav>
  
        {/* Bottom Navigation */}
        <div className="p-4 border-t border-gray-200">
          <div className="space-y-1">
            <button 
              onClick={() => setActiveView('integrations')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg ${
                activeView === 'integrations' ? 'bg-[#F3E7FF] text-gray-900 font-medium' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Link className="w-5 h-5" />
              <span>Integrations</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

export default Sidebar;