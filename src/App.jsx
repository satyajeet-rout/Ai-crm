



// Task Modal Component
// const TaskModal = ({ isOpen, onClose, task, onSave, contacts }) => {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     priority: 'medium',
//     status: 'pending',
//     dueDate: '',
//     contact: '',
//     category: ''
//   });

//   React.useEffect(() => {
//     if (task) {
//       setFormData({
//         title: task.title || '',
//         description: task.description || '',
//         priority: task.priority || 'medium',
//         status: task.status || 'pending',
//         dueDate: task.dueDate || '',
//         contact: task.contact || '',
//         category: task.category || ''
//       });
//     } else {
//       setFormData({
//         title: '',
//         description: '',
//         priority: 'medium',
//         status: 'pending',
//         dueDate: '',
//         contact: '',
//         category: ''
//       });
//     }
//   }, [task, isOpen]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.title.trim()) return;
    
//     const selectedContact = contacts.find(c => c.name === formData.contact);
    
//     const taskData = {
//       ...formData,
//       id: task ? task.id : Date.now(),
//       contactAvatar: selectedContact?.avatar || null,
//       createdAt: task ? task.createdAt : new Date().toISOString(),
//       updatedAt: new Date().toISOString()
//     };
    
//     onSave(taskData);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-lg font-semibold text-gray-900">
//             {task ? 'Edit Task' : 'New Task'}
//           </h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//             <input
//               type="text"
//               value={formData.title}
//               onChange={(e) => setFormData({...formData, title: e.target.value})}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter task title..."
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//             <textarea
//               value={formData.description}
//               onChange={(e) => setFormData({...formData, description: e.target.value})}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
//               placeholder="Enter task description..."
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
//               <select
//                 value={formData.priority}
//                 onChange={(e) => setFormData({...formData, priority: e.target.value})}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="low">Low</option>
//                 <option value="medium">Medium</option>
//                 <option value="high">High</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//               <select
//                 value={formData.status}
//                 onChange={(e) => setFormData({...formData, status: e.target.value})}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="pending">Pending</option>
//                 <option value="in_progress">In Progress</option>
//                 <option value="completed">Completed</option>
//               </select>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
//             <input
//               type="date"
//               value={formData.dueDate}
//               onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
//             <select
//               value={formData.contact}
//               onChange={(e) => setFormData({...formData, contact: e.target.value})}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Select contact (optional)</option>
//               {contacts.map((contact) => (
//                 <option key={contact.id} value={contact.name}>
//                   {contact.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
//             <input
//               type="text"
//               value={formData.category}
//               onChange={(e) => setFormData({...formData, category: e.target.value})}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="e.g., Follow-up, Meeting, Review..."
//             />
//           </div>

//           <div className="flex justify-end space-x-3 pt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//             >
//               {task ? 'Update Task' : 'Create Task'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// Note Modal Component
// const NoteModal = ({ isOpen, onClose, note, onSave, contacts }) => {
//   const [formData, setFormData] = useState({
//     title: '',
//     content: '',
//     contact: '',
//     tags: []
//   });
//   const [tagInput, setTagInput] = useState('');

//   React.useEffect(() => {
//     if (note) {
//       setFormData({
//         title: note.title || '',
//         content: note.content || '',
//         contact: note.contact || '',
//         tags: note.tags || []
//       });
//     } else {
//       setFormData({
//         title: '',
//         content: '',
//         contact: '',
//         tags: []
//       });
//     }
//     setTagInput('');
//   }, [note, isOpen]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.title.trim()) return;
    
//     const selectedContact = contacts.find(c => c.name === formData.contact);
    
//     const noteData = {
//       ...formData,
//       id: note ? note.id : Date.now(),
//       contactAvatar: selectedContact?.avatar || null,
//       createdAt: note ? note.createdAt : new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//       favorite: note ? note.favorite : false
//     };
    
//     onSave(noteData);
//     onClose();
//   };

//   const addTag = () => {
//     if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
//       setFormData({
//         ...formData,
//         tags: [...formData.tags, tagInput.trim()]
//       });
//       setTagInput('');
//     }
//   };

//   const removeTag = (tagToRemove) => {
//     setFormData({
//       ...formData,
//       tags: formData.tags.filter(tag => tag !== tagToRemove)
//     });
//   };

//   const handleTagKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       addTag();
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-screen overflow-y-auto">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-lg font-semibold text-gray-900">
//             {note ? 'Edit Note' : 'New Note'}
//           </h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//             <input
//               type="text"
//               value={formData.title}
//               onChange={(e) => setFormData({...formData, title: e.target.value})}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter note title..."
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
//             <textarea
//               value={formData.content}
//               onChange={(e) => setFormData({...formData, content: e.target.value})}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-40 resize-none"
//               placeholder="Write your note here..."
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Contact (Optional)</label>
//             <select
//               value={formData.contact}
//               onChange={(e) => setFormData({...formData, contact: e.target.value})}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">No contact associated</option>
//               {contacts.map((contact) => (
//                 <option key={contact.id} value={contact.name}>
//                   {contact.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
//             <div className="flex items-center space-x-2 mb-2">
//               <input
//                 type="text"
//                 value={tagInput}
//                 onChange={(e) => setTagInput(e.target.value)}
//                 onKeyPress={handleTagKeyPress}
//                 className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Add a tag and press Enter..."
//               />
//               <button
//                 type="button"
//                 onClick={addTag}
//                 className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
//               >
//                 Add
//               </button>
//             </div>
//             {formData.tags.length > 0 && (
//               <div className="flex flex-wrap gap-2">
//                 {formData.tags.map((tag, index) => (
//                   <span
//                     key={index}
//                     className="inline-flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
//                   >
//                     <span>{tag}</span>
//                     <button
//                       type="button"
//                       onClick={() => removeTag(tag)}
//                       className="text-blue-500 hover:text-blue-700"
//                     >
//                       ×
//                     </button>
//                   </span>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div className="flex justify-end space-x-3 pt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//             >
//               {note ? 'Update Note' : 'Create Note'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };


// const HomePage = () => {
//   const [query, setQuery] = useState('');
//   const [isInputFocused, setIsInputFocused] = useState(false);

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

//   return (
//     <div className="flex-1 flex flex-col min-h-screen bg-gray-50 overflow-auto">
//       <div className="flex-1 flex flex-col items-center justify-center px-8 py-16">
        
//         {/* Avatar and greeting */}
//         <div className="text-center mb-12">
          
//           {/* <img  src=".././public/assets/images/cosmic-ball.png" alt="User Avatar" className="rounded-full w-20 h-20 mb-4 mx-auto" /> */}
//           <h1 className="text-2xl font-medium text-gray-800 mb-2">Good Evening, Kunal</h1>
//           <p className="text-gray-500 text-base">Enter a simple prompt to generate anything you want !</p>
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
//                 <span>🌐</span>
//                 <span>All Web</span>
//               </div>
//             </div>

//             {/* Large textarea */}
//             <div className="mb-6">
//               <textarea
//                 placeholder="Type your question here..."
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 onFocus={() => setIsInputFocused(true)}
//                 onBlur={() => setIsInputFocused(false)}
//                 className="w-full h-10 text-base bg-transparent border-none resize-none focus:outline-none text-gray-800 placeholder-gray-400"
//               />
//             </div>

//             {/* Bottom toolbar */}
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-4">
//                 <button className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 text-sm transition-colors">
//                   <Paperclip className="w-4 h-4" />
//                   <span>Add Attachment</span>
//                 </button>
//                 <button className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 text-sm transition-colors">
//                   <Image className="w-4 h-4" />
//                   <span>Use Image</span>
//                 </button>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <span className="text-gray-400 text-sm">{query.length}/1000</span>
//                 <button className={`w-8 h-8 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center transition-all ${
//                   query.length > 0 ? 'scale-110 shadow-md' : ''
//                 }`}>
//                   <Send className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Recent chats section */}
//         <div className="w-full max-w-6xl">
//           <h2 className="text-xl font-medium text-gray-800 mb-6">Your recents chats</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {recentChats.map((chat, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-xl border border-gray-200 p-6 hover:border-purple-300 hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:-translate-y-1"
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

// Search Results Component
// const SearchResults = () => {
//   const [query, setQuery] = useState('');

//   const exampleQueries = [
//     {
//       icon: "🔍",
//       text: "Show me all contacts living in Berlin"
//     },
//     {
//       icon: "📊",
//       text: "My last touch points with Lukas"
//     },
//     {
//       icon: "🎯",
//       text: "Who in my network is an SaaS expert"
//     },
//     {
//       icon: "👤",
//       text: "Add www.linkedin.com/in/sina-sadegh"
//     }
//   ];

//   return (
//     <div className="flex-1 flex flex-col bg-gray-50">
//       <div className="p-6">
//         <div className="max-w-2xl mx-auto mt-20">
//           <div className="text-center mb-8">
//             <h2 className="text-4xl font-medium text-gray-800 mb-4">
//               Interact with your CRM
//             </h2>
//           </div>

//           {/* Search Input */}
//           <div className="relative mb-8">
//             <input
//               type="text"
//               placeholder="Ask anything..."
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               className="w-full px-4 py-4 pr-20 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 text-gray-700 placeholder-gray-400"
//             />
//             <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
//               <button className="p-2 text-gray-400 hover:text-gray-600">
//                 <Clock className="w-4 h-4" />
//               </button>
//               <button className="p-2 text-gray-400 hover:text-gray-600">
//                 <Mic className="w-4 h-4" />
//               </button>
//               <button className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
//                 <Send className="w-4 h-4" />
//               </button>
//             </div>
//           </div>

//           {/* Example Queries */}
//           <div className="grid grid-cols-2 gap-3 mb-6">
//             {exampleQueries.map((example, index) => (
//               <button
//                 key={index}
//                 onClick={() => setQuery(example.text)}
//                 className="flex items-center space-x-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all text-left"
//               >
//                 <span className="text-lg">{example.icon}</span>
//                 <span className="text-gray-700 text-sm">{example.text}</span>
//               </button>
//             ))}
//           </div>

//           {/* More Examples Button */}
//           <div className="text-center">
//             <button className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900">
//               <Plus className="w-4 h-4" />
//               <span>More examples</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// Tasks Component
// const TasksPage = () => {

//   const [activeTab, setActiveTab] = useState('pending');
//   const [tasks, setTasks] = useState([
//     {
//       id: 1,
//       title: "Follow up with Sina about investment",
//       description: "Send follow-up email regarding Series A discussion",
//       priority: "high",
//       status: "pending",
//       dueDate: "2025-05-23",
//       contact: "Sina Sadegh",
//       contactAvatar: "👨‍💼",
//       category: "Follow-up",
//       createdAt: "2025-05-20T10:30:00Z",
//       updatedAt: "2025-05-20T10:30:00Z"
//     },
//     {
//       id: 2,
//       title: "Schedule call with Maximilian",
//       description: "Discuss potential collaboration on Magic Design project",
//       priority: "medium",
//       status: "pending",
//       dueDate: "2025-05-24",
//       contact: "Maximilian Fleitmann",
//       contactAvatar: "👨",
//       category: "Meeting",
//       createdAt: "2025-05-19T14:20:00Z",
//       updatedAt: "2025-05-19T14:20:00Z"
//     },
//     {
//       id: 3,
//       title: "Review Michael's product demo",
//       description: "Evaluate table.ai platform and provide feedback",
//       priority: "low",
//       status: "completed",
//       dueDate: "2025-05-22",
//       contact: "Michael Sieb",
//       contactAvatar: "👨‍💼",
//       category: "Review",
//       createdAt: "2025-05-18T09:15:00Z",
//       updatedAt: "2025-05-22T16:45:00Z"
//     },
//     {
//       id: 4,
//       title: "Send intro to Natali and Lukas",
//       description: "Connect for potential GTM collaboration",
//       priority: "medium",
//       status: "pending",
//       dueDate: "2025-05-25",
//       contact: "Natali Craig",
//       contactAvatar: "👩‍🦰",
//       category: "Introduction",
//       createdAt: "2025-05-21T11:00:00Z",
//       updatedAt: "2025-05-21T11:00:00Z"
//     },
//     {
//       id: 5,
//       title: "Prepare Q2 investor update",
//       description: "Compile metrics and progress report for investors",
//       priority: "high",
//       status: "in_progress",
//       dueDate: "2025-05-30",
//       contact: null,
//       contactAvatar: null,
//       category: "Admin",
//       createdAt: "2025-05-17T08:45:00Z",
//       updatedAt: "2025-05-22T13:20:00Z"
//     }
//   ]);

//   const [showTaskModal, setShowTaskModal] = useState(false);
//   const [editingTask, setEditingTask] = useState(null);

//   const contacts = [
//     { id: 1, name: "Sina Sadegh", avatar: "👨‍💼" },
//     { id: 2, name: "Maximilian Fleitmann", avatar: "👨" },
//     { id: 3, name: "Michael Sieb", avatar: "👨‍💼" },
//     { id: 4, name: "Natali Craig", avatar: "👩‍🦰" },
//     { id: 5, name: "Lukas Grunzke", avatar: "👨‍💼" },
//     { id: 6, name: "Courtney Werner", avatar: "👩‍💼" },
//     { id: 7, name: "Amy Wang", avatar: "👩‍🦰" },
//     { id: 8, name: "Ted Lasso", avatar: "👨‍🦱" },
//     { id: 9, name: "Amanda Clinton", avatar: "👩‍💼" }
//   ];

//   const toggleTaskStatus = (taskId) => {
//     setTasks(tasks.map(task => 
//       task.id === taskId 
//         ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed', updatedAt: new Date().toISOString() }
//         : task
//     ));
//   };

//   const handleCreateTask = () => {
//     setEditingTask(null);
//     setShowTaskModal(true);
//   };

//   const handleEditTask = (task) => {
//     setEditingTask(task);
//     setShowTaskModal(true);
//   };

//   const handleSaveTask = (taskData) => {
//     if (editingTask) {
//       setTasks(tasks.map(task => 
//         task.id === editingTask.id ? taskData : task
//       ));
//     } else {
//       setTasks([taskData, ...tasks]);
//     }
//   };

//   const handleDeleteTask = (taskId) => {
//     if (window.confirm('Are you sure you want to delete this task?')) {
//       setTasks(tasks.filter(task => task.id !== taskId));
//     }
//   };

//   const getPriorityColor = (priority) => {
//     switch(priority) {
//       case 'high': return 'bg-red-100 text-red-700 border-red-200';
//       case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
//       case 'low': return 'bg-green-100 text-green-700 border-green-200';
//       default: return 'bg-gray-100 text-gray-700 border-gray-200';
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch(status) {
//       case 'completed': return <CheckCircle2 className="w-4 h-4 text-green-600" />;
//       case 'in_progress': return <AlertCircle className="w-4 h-4 text-yellow-600" />;
//       default: return <Circle className="w-4 h-4 text-gray-400" />;
//     }
//   };

//   const pendingTasks = tasks.filter(task => task.status !== 'completed');
//   const completedTasks = tasks.filter(task => task.status === 'completed');

//   return (
//     <div className="flex-1 flex flex-col bg-gray-50">
//   {/* Header */}
//   <div className="bg-white border-b border-gray-200 px-6 py-4">
//     <div className="flex items-center justify-between">
//       <div className="flex items-center space-x-4">
//         <h1 className="text-xl font-semibold text-gray-900">Tasks</h1>
//         <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm font-medium">
//           {pendingTasks.length}
//         </span>
//       </div>
//       <div className="flex items-center space-x-3">
//         <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
//           <Filter className="w-4 h-4" />
//           <span className="text-sm font-medium">Filter</span>
//         </button>
//         <button 
//           onClick={handleCreateTask}
//           className="flex items-center space-x-2 px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
//         >
//           <Plus className="w-4 h-4" />
//           <span className="text-sm font-medium">New Task</span>
//         </button>
//       </div>
//     </div>
//   </div>

//   {/* Tabs */}
//   <div className=" mt-4 mb-4">
//     <div className="px-6">
//       <nav className="flex justify-center space-x-4">
//         <button
//           onClick={() => setActiveTab('pending')}
//           className={`py-3 px-6 border font-medium text-sm transition-colors rounded-lg ${
//             activeTab === 'pending'
//               ? 'border-gray-900 bg-gray-900 text-white'
//               : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400'
//           }`}
//         >
//           Pending
//           <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
//             activeTab === 'pending'
//               ? 'bg-white text-gray-900'
//               : 'bg-gray-100 text-gray-600'
//           }`}>
//             {pendingTasks.length}
//           </span>
//         </button>
//         <button
//           onClick={() => setActiveTab('completed')}
//           className={`py-3 px-6 border font-medium text-sm transition-colors rounded-lg ${
//             activeTab === 'completed'
//               ? 'border-gray-900 bg-gray-900 text-white'
//               : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400'
//           }`}
//         >
//           Completed
//           <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
//             activeTab === 'completed'
//               ? 'bg-white text-gray-900'
//               : 'bg-gray-100 text-gray-600'
//           }`}>
//             {completedTasks.length}
//           </span>
//         </button>
//       </nav>
//     </div>
//   </div>

//   <div className="flex-1 overflow-y-auto p-6">
//     <div className="max-w-4xl mx-auto">
      
//       {/* Pending Tasks Tab */}
//       {activeTab === 'pending' && (
//         <div className="bg-white rounded-lg border border-gray-200">
//           <div className="px-6 py-4 border-b border-gray-200">
//             <h2 className="text-lg font-medium text-gray-900">Pending Tasks</h2>
//           </div>
//           {pendingTasks.length === 0 ? (
//             <div className="p-8 text-center text-gray-500">
//               <p>No pending tasks</p>
//             </div>
//           ) : (
//             <div className="divide-y divide-gray-200">
//               {pendingTasks.map((task) => (
//                 <div key={task.id} className="p-6 hover:bg-gray-50 transition-colors">
//                   <div className="flex items-start space-x-4">
//                     <button 
//                       onClick={() => toggleTaskStatus(task.id)}
//                       className="mt-1 hover:bg-gray-100 rounded p-1"
//                     >
//                       {getStatusIcon(task.status)}
//                     </button>
//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-center justify-between mb-2">
//                         <h3 className="text-base font-medium text-gray-900">{task.title}</h3>
//                         <div className="flex items-center space-x-2">
//                           <span className={`px-2 py-1 text-xs font-medium border rounded-full ${getPriorityColor(task.priority)}`}>
//                             {task.priority}
//                           </span>
//                           <div className="flex items-center space-x-1">
//                             <button 
//                               onClick={() => handleEditTask(task)}
//                               className="p-1 text-gray-400 hover:text-blue-600"
//                             >
//                               <Edit className="w-4 h-4" />
//                             </button>
//                             <button 
//                               onClick={() => handleDeleteTask(task.id)}
//                               className="p-1 text-gray-400 hover:text-red-600"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </button>
//                             <button className="p-1 text-gray-400 hover:text-gray-600">
//                               <MoreHorizontal className="w-4 h-4" />
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                       <p className="text-sm text-gray-600 mb-3">{task.description}</p>
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center space-x-4">
//                           {task.contact && (
//                             <div className="flex items-center space-x-2">
//                               <span className="text-sm">{task.contactAvatar}</span>
//                               <span className="text-sm text-gray-600">{task.contact}</span>
//                             </div>
//                           )}
//                           <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
//                             {task.category}
//                           </span>
//                         </div>
//                         <div className="flex items-center space-x-1 text-sm text-gray-500">
//                           <Calendar className="w-4 h-4" />
//                           <span>{new Date(task.dueDate).toLocaleDateString()}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}

//       {/* Completed Tasks Tab */}
//       {activeTab === 'completed' && (
//         <div className="bg-white rounded-lg border border-gray-200">
//           <div className="px-6 py-4 border-b border-gray-200">
//             <h2 className="text-lg font-medium text-gray-900">Completed Tasks</h2>
//           </div>
//           {completedTasks.length === 0 ? (
//             <div className="p-8 text-center text-gray-500">
//               <p>No completed tasks</p>
//             </div>
//           ) : (
//             <div className="divide-y divide-gray-200">
//               {completedTasks.map((task) => (
//                 <div key={task.id} className="p-6 hover:bg-gray-50 transition-colors opacity-75">
//                   <div className="flex items-start space-x-4">
//                     <button 
//                       onClick={() => toggleTaskStatus(task.id)}
//                       className="mt-1 hover:bg-gray-100 rounded p-1"
//                     >
//                       {getStatusIcon(task.status)}
//                     </button>
//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-center justify-between mb-2">
//                         <h3 className="text-base font-medium text-gray-500 line-through">{task.title}</h3>
//                         <div className="flex items-center space-x-1">
//                           <button 
//                             onClick={() => handleEditTask(task)}
//                             className="p-1 text-gray-400 hover:text-blue-600"
//                           >
//                             <Edit className="w-4 h-4" />
//                           </button>
//                           <button 
//                             onClick={() => handleDeleteTask(task.id)}
//                             className="p-1 text-gray-400 hover:text-red-600"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                           <button className="p-1 text-gray-400 hover:text-gray-600">
//                             <MoreHorizontal className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </div>
//                       <p className="text-sm text-gray-500 mb-3">{task.description}</p>
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center space-x-4">
//                           {task.contact && (
//                             <div className="flex items-center space-x-2">
//                               <span className="text-sm">{task.contactAvatar}</span>
//                               <span className="text-sm text-gray-500">{task.contact}</span>
//                             </div>
//                           )}
//                           <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">
//                             {task.category}
//                           </span>
//                         </div>
//                         <div className="flex items-center space-x-1 text-sm text-gray-400">
//                           <Calendar className="w-4 h-4" />
//                           <span>{new Date(task.dueDate).toLocaleDateString()}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   </div>

//   <TaskModal
//     isOpen={showTaskModal}
//     onClose={() => setShowTaskModal(false)}
//     task={editingTask}
//     onSave={handleSaveTask}
//     contacts={contacts}
//   />
// </div>
//   );
// };

// Notifications Component
// const NotificationsPage = () => {
//   const [notifications, setNotifications] = useState([
//     {
//       id: 1,
//       type: "mention",
//       title: "New message from Sina Sadegh",
//       description: "Sina mentioned you in a LinkedIn post about startup funding",
//       time: "2 hours ago",
//       read: false,
//       avatar: "👨‍💼",
//       action: "View Post"
//     },
//     {
//       id: 2,
//       type: "task",
//       title: "Task reminder",
//       description: "Follow up with Maximilian about Magic Design collaboration",
//       time: "4 hours ago",
//       read: false,
//       avatar: "📋",
//       action: "View Task"
//     },
//     {
//       id: 3,
//       type: "contact",
//       title: "New contact added",
//       description: "Amy Wang from Apple has been added to your network",
//       time: "6 hours ago",
//       read: true,
//       avatar: "👩‍🦰",
//       action: "View Contact"
//     },
//     {
//       id: 4,
//       type: "meeting",
//       title: "Meeting reminder",
//       description: "Video call with Michael Sieb in 30 minutes",
//       time: "Yesterday",
//       read: true,
//       avatar: "📅",
//       action: "Join Meeting"
//     },
//     {
//       id: 5,
//       type: "update",
//       title: "CRM Update",
//       description: "Your weekly network analysis is ready to view",
//       time: "2 days ago",
//       read: true,
//       avatar: "📊",
//       action: "View Report"
//     },
//     {
//       id: 6,
//       type: "birthday",
//       title: "Birthday reminder",
//       description: "Ted Lasso's birthday is tomorrow",
//       time: "3 days ago",
//       read: true,
//       avatar: "🎂",
//       action: "Send Wishes"
//     }
//   ]);

//   const markAsRead = (notificationId) => {
//     setNotifications(notifications.map(notif => 
//       notif.id === notificationId ? { ...notif, read: true } : notif
//     ));
//   };

//   const markAllAsRead = () => {
//     setNotifications(notifications.map(notif => ({ ...notif, read: true })));
//   };

//   const unreadCount = notifications.filter(n => !n.read).length;

//   return (
//     <div className="flex-1 flex flex-col bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 px-6 py-4">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <h1 className="text-xl font-semibold text-gray-900">Notifications</h1>
//             {unreadCount > 0 && (
//               <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm font-medium">
//                 {unreadCount} unread
//               </span>
//             )}
//           </div>
//           <div className="flex items-center space-x-3">
//             {unreadCount > 0 && (
//               <button 
//                 onClick={markAllAsRead}
//                 className="text-sm text-blue-600 hover:text-blue-700 font-medium"
//               >
//                 Mark all as read
//               </button>
//             )}
//             <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
//               <Filter className="w-4 h-4" />
//               <span className="text-sm font-medium">Filter</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="flex-1 overflow-y-auto">
//         <div className="max-w-3xl mx-auto p-6">
//           <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
//             {notifications.map((notification) => (
//               <div 
//                 key={notification.id} 
//                 className={`p-6 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}
//               >
//                 <div className="flex items-start space-x-4">
//                   <div className="flex-shrink-0">
//                     <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
//                       <span className="text-lg">{notification.avatar}</span>
//                     </div>
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-start justify-between">
//                       <div className="flex-1">
//                         <div className="flex items-center space-x-2 mb-1">
//                           <h3 className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
//                             {notification.title}
//                           </h3>
//                           {!notification.read && (
//                             <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
//                           )}
//                         </div>
//                         <p className="text-sm text-gray-600 mb-3">{notification.description}</p>
//                         <div className="flex items-center justify-between">
//                           <span className="text-xs text-gray-500">{notification.time}</span>
//                           <div className="flex items-center space-x-2">
//                             <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
//                               {notification.action}
//                             </button>
//                             {!notification.read && (
//                               <button 
//                                 onClick={() => markAsRead(notification.id)}
//                                 className="text-xs text-gray-500 hover:text-gray-700"
//                               >
//                                 Mark as read
//                               </button>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
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

// Notes Component
// const NotesPage = () => {
//   const [notes, setNotes] = useState([
//     {
//       id: 1,
//       title: "Meeting Notes - Sina Sadegh",
//       content: "Discussed potential Series A investment. Key points:\n- Looking for $5M round\n- Strong traction with 50% MoM growth\n- Focus on enterprise clients\n- Timeline: Q3 2025",
//       contact: "Sina Sadegh",
//       contactAvatar: "👨‍💼",
//       createdAt: "2025-05-22T10:30:00Z",
//       updatedAt: "2025-05-22T14:15:00Z",
//       tags: ["investment", "meeting"],
//       favorite: true
//     },
//     {
//       id: 2,
//       title: "Product Demo Feedback - table.ai",
//       content: "Michael's new AI platform for data visualization:\n\n✅ Pros:\n- Intuitive interface\n- Fast query processing\n- Good integration options\n\n❌ Areas for improvement:\n- Limited customization\n- Pricing seems high\n- Need better mobile support",
//       contact: "Michael Sieb",
//       contactAvatar: "👨‍💼",
//       createdAt: "2025-05-21T16:20:00Z",
//       updatedAt: "2025-05-21T16:45:00Z",
//       tags: ["product", "feedback"],
//       favorite: false
//     },
//     {
//       id: 3,
//       title: "Barcelona Networking Event",
//       content: "Great connections made at the startup event:\n\n🎯 Key contacts:\n- 3 potential investors\n- 2 technical co-founders\n- 1 marketing expert\n\nFollow-ups scheduled for next week.",
//       contact: null,
//       contactAvatar: null,
//       createdAt: "2025-05-20T19:00:00Z",
//       updatedAt: "2025-05-20T19:30:00Z",
//       tags: ["networking", "event"],
//       favorite: false
//     },
//     {
//       id: 4,
//       title: "Q2 Investor Update Draft",
//       content: "Key metrics to include:\n- Revenue: $2.3M (+45% QoQ)\n- Customers: 150 (+30)\n- Team: 25 employees (+8)\n- Runway: 18 months\n\nPriorities for Q3:\n- Product launch v2.0\n- Enterprise sales focus\n- Team expansion",
//       contact: null,
//       contactAvatar: null,
//       createdAt: "2025-05-19T11:15:00Z",
//       updatedAt: "2025-05-22T09:30:00Z",
//       tags: ["investors", "metrics"],
//       favorite: true
//     }
//   ]);

//   const [selectedNote, setSelectedNote] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showNoteModal, setShowNoteModal] = useState(false);
//   const [editingNote, setEditingNote] = useState(null);

//   const contacts = [
//     { id: 1, name: "Sina Sadegh", avatar: "👨‍💼" },
//     { id: 2, name: "Maximilian Fleitmann", avatar: "👨" },
//     { id: 3, name: "Michael Sieb", avatar: "👨‍💼" },
//     { id: 4, name: "Natali Craig", avatar: "👩‍🦰" },
//     { id: 5, name: "Lukas Grunzke", avatar: "👨‍💼" },
//     { id: 6, name: "Courtney Werner", avatar: "👩‍💼" },
//     { id: 7, name: "Amy Wang", avatar: "👩‍🦰" },
//     { id: 8, name: "Ted Lasso", avatar: "👨‍🦱" },
//     { id: 9, name: "Amanda Clinton", avatar: "👩‍💼" }
//   ];

//   const toggleFavorite = (noteId) => {
//     setNotes(notes.map(note => 
//       note.id === noteId ? { ...note, favorite: !note.favorite, updatedAt: new Date().toISOString() } : note
//     ));
//     if (selectedNote && selectedNote.id === noteId) {
//       setSelectedNote({...selectedNote, favorite: !selectedNote.favorite});
//     }
//   };

//   const handleCreateNote = () => {
//     setEditingNote(null);
//     setShowNoteModal(true);
//   };

//   const handleEditNote = (note) => {
//     setEditingNote(note);
//     setShowNoteModal(true);
//   };

//   const handleSaveNote = (noteData) => {
//     if (editingNote) {
//       setNotes(notes.map(note => 
//         note.id === editingNote.id ? noteData : note
//       ));
//       if (selectedNote && selectedNote.id === editingNote.id) {
//         setSelectedNote(noteData);
//       }
//     } else {
//       setNotes([noteData, ...notes]);
//     }
//   };

//   const handleDeleteNote = (noteId) => {
//     if (window.confirm('Are you sure you want to delete this note?')) {
//       setNotes(notes.filter(note => note.id !== noteId));
//       if (selectedNote && selectedNote.id === noteId) {
//         setSelectedNote(null);
//       }
//     }
//   };

//   const filteredNotes = notes.filter(note => 
//     note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffInHours = (now - date) / (1000 * 60 * 60);
    
//     if (diffInHours < 24) {
//       return `${Math.floor(diffInHours)} hours ago`;
//     } else if (diffInHours < 48) {
//       return 'Yesterday';
//     } else {
//       return date.toLocaleDateString();
//     }
//   };

//   const getTagColor = (tag) => {
//     const colors = {
//       "investment": "bg-green-100 text-green-700",
//       "meeting": "bg-blue-100 text-blue-700",
//       "product": "bg-purple-100 text-purple-700",
//       "feedback": "bg-orange-100 text-orange-700",
//       "networking": "bg-pink-100 text-pink-700",
//       "event": "bg-cyan-100 text-cyan-700",
//       "investors": "bg-indigo-100 text-indigo-700",
//       "metrics": "bg-yellow-100 text-yellow-700"
//     };
//     return colors[tag] || "bg-gray-100 text-gray-700";
//   };

//   if (selectedNote) {
//     return (
//       <div className="flex-1 flex flex-col bg-gray-50">
//         {/* Header */}
//         <div className="bg-white border-b border-gray-200 px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <button 
//                 onClick={() => setSelectedNote(null)}
//                 className="p-2 hover:bg-gray-100 rounded-lg"
//               >
//                 <ArrowLeft className="w-5 h-5 text-gray-600" />
//               </button>
//               <h1 className="text-xl font-semibold text-gray-900">{selectedNote.title}</h1>
//             </div>
//             <div className="flex items-center space-x-2">
//               <button 
//                 onClick={() => toggleFavorite(selectedNote.id)}
//                 className={`p-2 rounded-lg ${selectedNote.favorite ? 'text-yellow-500 bg-yellow-50' : 'text-gray-400 hover:text-gray-600'}`}
//               >
//                 <Star className="w-5 h-5" />
//               </button>
//               <button 
//                 onClick={() => handleEditNote(selectedNote)}
//                 className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg"
//               >
//                 <Edit className="w-5 h-5" />
//               </button>
//               <button 
//                 onClick={() => handleDeleteNote(selectedNote.id)}
//                 className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
//               >
//                 <Trash2 className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Note Content */}
//         <div className="flex-1 overflow-y-auto p-6">
//           <div className="max-w-4xl mx-auto">
//             <div className="bg-white rounded-lg border border-gray-200 p-6">
//               {/* Note Meta */}
//               <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
//                 <div className="flex items-center space-x-4">
//                   {selectedNote.contact && (
//                     <div className="flex items-center space-x-2">
//                       <span className="text-lg">{selectedNote.contactAvatar}</span>
//                       <span className="text-sm font-medium text-gray-700">{selectedNote.contact}</span>
//                     </div>
//                   )}
//                   <div className="flex flex-wrap gap-2">
//                     {selectedNote.tags.map((tag, index) => (
//                       <span
//                         key={index}
//                         className={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor(tag)}`}
//                       >
//                         {tag}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="text-sm text-gray-500">
//                   Updated {formatDate(selectedNote.updatedAt)}
//                 </div>
//               </div>

//               {/* Note Content */}
//               <div className="prose max-w-none">
//                 <div className="text-gray-700 whitespace-pre-line text-sm leading-relaxed">
//                   {selectedNote.content}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <NoteModal
//           isOpen={showNoteModal}
//           onClose={() => setShowNoteModal(false)}
//           note={editingNote}
//           onSave={handleSaveNote}
//           contacts={contacts}
//         />
//       </div>
//     );
//   }

//   return (
//     <div className="flex-1 flex flex-col bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 px-6 py-4">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <h1 className="text-xl font-semibold text-gray-900">Notes</h1>
//             <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm font-medium">
//               {notes.length}
//             </span>
//           </div>
//           <div className="flex items-center space-x-3">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//               <input
//                 type="text"
//                 placeholder="Search notes..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
//               />
//             </div>
//             <button 
//               onClick={handleCreateNote}
//               className="flex items-center space-x-2 px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
//             >
//               <Plus className="w-4 h-4" />
//               <span className="text-sm font-medium">New Note</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="flex-1 overflow-y-auto p-6">
//         <div className="max-w-5xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {filteredNotes.map((note) => (
//               <div 
//                 key={note.id}
//                 onClick={() => setSelectedNote(note)}
//                 className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md hover:border-gray-300 transition-all cursor-pointer relative group"
//               >
//                 <div className="flex items-start justify-between mb-3">
//                   <h3 className="font-medium text-gray-900 text-sm line-clamp-2 flex-1 mr-2">
//                     {note.title}
//                   </h3>
//                   <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                     <button 
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         toggleFavorite(note.id);
//                       }}
//                       className={`flex-shrink-0 p-1 rounded ${note.favorite ? 'text-yellow-500' : 'text-gray-300 hover:text-gray-400'}`}
//                     >
//                       <Star className="w-4 h-4" />
//                     </button>
//                     <button 
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleEditNote(note);
//                       }}
//                       className="flex-shrink-0 p-1 rounded text-gray-400 hover:text-blue-600"
//                     >
//                       <Edit className="w-3 h-3" />
//                     </button>
//                     <button 
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleDeleteNote(note.id);
//                       }}
//                       className="flex-shrink-0 p-1 rounded text-gray-400 hover:text-red-600"
//                     >
//                       <Trash2 className="w-3 h-3" />
//                     </button>
//                   </div>
//                 </div>
                
//                 <p className="text-gray-600 text-xs mb-4 line-clamp-3">
//                   {note.content}
//                 </p>
                
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-2">
//                     {note.contact && (
//                       <>
//                         <span className="text-sm">{note.contactAvatar}</span>
//                         <span className="text-xs text-gray-500 truncate max-w-20">
//                           {note.contact}
//                         </span>
//                       </>
//                     )}
//                   </div>
//                   <span className="text-xs text-gray-400">
//                     {formatDate(note.updatedAt)}
//                   </span>
//                 </div>
                
//                 {note.tags.length > 0 && (
//                   <div className="flex flex-wrap gap-1 mt-3">
//                     {note.tags.slice(0, 2).map((tag, index) => (
//                       <span
//                         key={index}
//                         className={`px-1.5 py-0.5 rounded text-xs ${getTagColor(tag)}`}
//                       >
//                         {tag}
//                       </span>
//                     ))}
//                     {note.tags.length > 2 && (
//                       <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
//                         +{note.tags.length - 2}
//                       </span>
//                     )}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
          
//           {filteredNotes.length === 0 && (
//             <div className="text-center py-12">
//               <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No notes found</h3>
//               <p className="text-gray-500 mb-4">
//                 {searchTerm ? 'Try adjusting your search terms.' : 'Create your first note to get started.'}
//               </p>
//               <button 
//                 onClick={handleCreateNote}
//                 className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
//               >
//                 <Plus className="w-4 h-4" />
//                 <span>New Note</span>
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       <NoteModal
//         isOpen={showNoteModal}
//         onClose={() => setShowNoteModal(false)}
//         note={editingNote}
//         onSave={handleSaveNote}
//         contacts={contacts}
//       />
//     </div>
//   );
// };




// const Sidebar = ({ activeView, setActiveView }) => {
//   const [chatHistory, setChatHistory] = useState([
//     {
//       id: 1,
//       title: "Show me all contacts living in Berlin",
//       timeAgo: "6 Hours",
//       lastMessage: "Found 23 contacts in Berlin area..."
//     },
//     {
//       id: 2,
//       title: "My last touch points with Lukas",
//       timeAgo: "12 Hours",
//       lastMessage: "Your last interaction was via email..."
//     },
//     {
//       id: 3,
//       title: "Who in my network is an SaaS expert",
//       timeAgo: "18 Hours",
//       lastMessage: "Found 8 SaaS experts in your network..."
//     },
//     {
//       id: 4,
//       title: "Add www.linkedin.com/in/sina-sadegh",
//       timeAgo: "1 day",
//       lastMessage: "Contact added successfully..."
//     },
//     {
//       id: 5,
//       title: "Schedule meeting with investors",
//       timeAgo: "2 days",
//       lastMessage: "Available time slots for next week..."
//     }
//   ]);

//   const handleDeleteChat = (chatId, e) => {
//     e.stopPropagation();
//     if (window.confirm('Are you sure you want to delete this chat?')) {
//       setChatHistory(chatHistory.filter(chat => chat.id !== chatId));
//     }
//   };

//   return (
//     <div className="w-64 bg-[#FBFAFF] border-r border-gray-200 flex flex-col h-full">
//       {/* User Profile */}
//       <div className="p-4 border-b border-gray-200">
//         <div className="flex items-center space-x-3">
//           <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
//             <span className="text-sm">👨</span>
//           </div>
//           <span className="text-gray-600 font-medium">Kunal</span>
//         </div>
//       </div>

//       {/* Search */}
//       <div className="p-4">
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//           <input
//             type="text"
//             placeholder="Search..."
//             onClick={() => setActiveView('search')}
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
//             readOnly
//           />
//           <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">
//             ⌘↵
//           </div>
//         </div>
//       </div>

//       {/* Navigation */}
//       <nav className="flex flex-col flex-1 overflow-hidden">
//         <div className="px-4 space-y-1 mb-6">
//           <button 
//             onClick={() => setActiveView('home')}
//             className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg ${
//               activeView === 'home' ? 'bg-[#F3E7FF] text-gray-900 font-medium' : 'text-gray-700 hover:bg-gray-100'
//             }`}
//           >
//             <Home className="w-5 h-5" />
//             <span>Home</span>
//           </button>
//           <button 
//             onClick={() => setActiveView('contacts')}
//             className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg ${
//               activeView === 'contacts' ? 'bg-[#F3E7FF] text-gray-900 font-medium' : 'text-gray-700 hover:bg-gray-100'
//             }`}
//           >
//             <Users className="w-5 h-5" />
//             <span>Contacts</span>
//           </button>
//           <button 
//             onClick={() => setActiveView('notifications')}
//             className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg ${
//               activeView === 'notifications' ? 'bg-[#F3E7FF] text-gray-900 font-medium' : 'text-gray-700 hover:bg-gray-100'
//             }`}
//           >
//             <Bell className="w-5 h-5" />
//             <span>Notification</span>
//           </button>
//           <button 
//             onClick={() => setActiveView('tasks')}
//             className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg ${
//               activeView === 'tasks' ? 'bg-[#F3E7FF] text-gray-900 font-medium' : 'text-gray-700 hover:bg-gray-100'
//             }`}
//           >
//             <CheckSquare className="w-5 h-5" />
//             <span>Tasks</span>
//           </button>
//           <button 
//             onClick={() => setActiveView('notes')}
//             className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg ${
//               activeView === 'notes' ? 'bg-[#F3E7FF] text-gray-900 font-medium' : 'text-gray-700 hover:bg-gray-100'
//             }`}
//           >
//             <FileText className="w-5 h-5" />
//             <span>Notes</span>
//           </button>
//         </div>

//         {/* Chats Section */}
//         <div className="flex items-center justify-between mb-3 px-4">
//             <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Recent Chats</h3>
//             <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full text-xs font-medium">
//               {chatHistory.length}
//             </span>
//           </div>
//         <div className="flex-1 px-4 mb-6 overflow-y-auto">
//           {/* <div className="flex items-center justify-between mb-3">
//             <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Recent Chats</h3>
//             <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full text-xs font-medium">
//               {chatHistory.length}
//             </span>
//           </div> */}
//           <div className="space-y-1">
//             {chatHistory.slice(0, 5).map((chat) => (
//               <div
//                 key={chat.id}
//                 className="group relative"
//               >
//                 <button
//                   onClick={() => setActiveView('home')}
//                   className="w-full text-left p-2 rounded-lg hover:bg-gray-100 transition-colors"
//                 >
//                   <div className="flex items-start space-x-2">
//                     <MessageCircle className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
//                     <div className="min-w-0 flex-1 pr-6">
//                       <p className="text-xs font-medium text-gray-700 line-clamp-2 leading-tight mb-1">
//                         {chat.title}
//                       </p>
//                       <div className="flex items-center justify-between">
//                         <p className="text-xs text-gray-500 truncate flex-1 mr-1">
//                           {chat.lastMessage}
//                         </p>
//                         <span className="text-xs text-gray-400 whitespace-nowrap">
//                           {chat.timeAgo}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </button>
                
//                 {/* Delete Button */}
//                 <button
//                   onClick={(e) => handleDeleteChat(chat.id, e)}
//                   className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-all duration-200"
//                   title="Delete chat"
//                 >
//                   <X className="w-3 h-3" />
//                 </button>
//               </div>
//             ))}
//           </div>
          
//           {chatHistory.length > 5 && (
//             <button 
//               onClick={() => setActiveView('chats')}
//               className="w-full mt-2 text-xs text-gray-500 hover:text-gray-700 text-center py-1"
//             >
//               View all chats ({chatHistory.length})
//             </button>
//           )}
//         </div>
//       </nav>

//       {/* Bottom Navigation */}
//       <div className="p-4 border-t border-gray-200">
//         <div className="space-y-1">
//           <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
//             <Link className="w-5 h-5" />
//             <span>Integration</span>
//           </button>
//           <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
//             <Settings className="w-5 h-5" />
//             <span>Settings</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
// const ContactsList = ({ onContactClick }) => {
//   const contacts = [
//     // Today section
//     {
//       id: 1,
//       name: "Sina Sadegh",
//       email: "sina@wizardventures.co",
//       phone: "+1 (555) 123-4567",
//       avatar: "👨‍💼",
//       group: "Investor",
//       company: "Wizard Ventures",
//       companyIcon: "🧙‍♂️",
//       tags: ["Product Hunt", "Founder"],
//       location: "San Francisco, CA",
//       section: "today",
//       bio: "Serial entrepreneur and investor focused on early-stage startups. Founded 3 companies and invested in 50+ startups.",
//       additionalCount: 1
//     },
//     {
//       id: 2,
//       name: "Maximilian Fleitmann",
//       email: "max@magicdesign.io",
//       phone: "+1 (555) 234-5678",
//       avatar: "👨",
//       group: "Close friends",
//       company: "Magic Design",
//       companyIcon: "✨",
//       tags: ["Angel Investor", "SaaS"],
//       location: "Berlin, Germany",
//       section: "today",
//       bio: "Design-focused entrepreneur building the future of digital experiences. Previously founded two design agencies.",
//       additionalCount: 2
//     },
//     // Yesterday section
//     {
//       id: 3,
//       name: "Michael Sieb",
//       email: "michael@usetable.ai",
//       phone: "+1 (555) 345-6789",
//       avatar: "👨‍💼",
//       group: "Product Hunt",
//       company: "table",
//       companyIcon: "📊",
//       tags: ["Family", "Blockchain"],
//       location: "New York, NY",
//       section: "yesterday",
//       bio: "AI researcher and product builder. Passionate about data visualization and making complex information accessible.",
//       additionalCount: 1
//     },
//     {
//       id: 4,
//       name: "Natali Craig",
//       email: "natali@cherry.com",
//       phone: "+1 (555) 456-7890",
//       avatar: "👩‍🦰",
//       group: "Close friends",
//       company: "Cherry Ventures",
//       companyIcon: "🍒",
//       tags: ["GTM Expert", "SaaS"],
//       location: "London, UK",
//       section: "yesterday",
//       bio: "Go-to-market specialist helping B2B SaaS companies scale from seed to Series A. Former VP of Growth at 3 unicorns.",
//       additionalCount: 3
//     },
//     {
//       id: 5,
//       name: "Lukas Grunzke",
//       email: "lukas@notion.co",
//       phone: "+1 (555) 567-8901",
//       avatar: "👨‍💼",
//       group: "Investor",
//       company: "Notion",
//       companyIcon: "📝",
//       tags: ["Founder", "Product Hunt"],
//       location: "San Francisco, CA",
//       section: "yesterday",
//       bio: "Product leader at Notion, previously founded a productivity startup acquired by Notion in 2021.",
//       additionalCount: 2
//     },
//     // 2 days ago section
//     {
//       id: 6,
//       name: "Courtney Werner",
//       email: "courtney@calendly.com",
//       phone: "+1 (555) 678-9012",
//       avatar: "👩‍💼",
//       group: "Startup founder",
//       company: "Slack",
//       companyIcon: "💬",
//       tags: ["SaaS", "Family"],
//       location: "San Francisco, CA",
//       section: "2days",
//       bio: "Product leader at Slack, focused on improving team collaboration and productivity tools."
//     },
//     {
//       id: 7,
//       name: "Amy Wang",
//       email: "amy@google.com",
//       phone: "+1 (555) 789-0123",
//       avatar: "👩‍🦰",
//       group: "Startup founder",
//       company: "Apple",
//       companyIcon: "🍎",
//       tags: ["GTM Expert", "Founder"],
//       location: "Cupertino, CA",
//       section: "2days",
//       bio: "Senior Product Manager at Apple, previously founded a successful mobile app startup."
//     },
//     {
//       id: 8,
//       name: "Ted Lasso",
//       email: "ted@sequioa.com",
//       phone: "+1 (555) 890-1234",
//       avatar: "👨‍🦱",
//       group: "Barcelona",
//       company: "Sequoia Capital",
//       companyIcon: "🌲",
//       tags: ["Family", "Angel Investor"],
//       location: "Menlo Park, CA",
//       section: "2days",
//       bio: "Partner at Sequoia Capital, focused on early-stage consumer and enterprise investments.",
//       additionalCount: 3
//     },
//     {
//       id: 9,
//       name: "Amanda Clinton",
//       email: "amanda@salesforce.com",
//       phone: "+1 (555) 901-2345",
//       avatar: "👩‍💼",
//       group: "Dinner party",
//       company: "Airtable",
//       companyIcon: "📋",
//       tags: ["Product Hunt", "Blockchain"],
//       location: "San Francisco, CA",
//       section: "2days",
//       bio: "VP of Product at Airtable, passionate about no-code solutions and database innovation.",
//       additionalCount: 1
//     }
//   ];

//   const getTagColor = (tag) => {
//     const colors = {
//       "Product Hunt": "bg-orange-100 text-orange-700",
//       "Founder": "bg-green-100 text-green-700",
//       "Angel Investor": "bg-blue-100 text-blue-700",
//       "SaaS": "bg-purple-100 text-purple-700",
//       "Family": "bg-pink-100 text-pink-700",
//       "Blockchain": "bg-indigo-100 text-indigo-700",
//       "GTM Expert": "bg-cyan-100 text-cyan-700"
//     };
//     return colors[tag] || "bg-gray-100 text-gray-700";
//   };

//   const getGroupIcon = (group) => {
//     const icons = {
//       "Investor": "💰",
//       "Close friends": "👥",
//       "Product Hunt": "🚀",
//       "Startup founder": "👔",
//       "Barcelona": "🏛️",
//       "Dinner party": "🍽️"
//     };
//     return icons[group] || "👥";
//   };

//   const getSectionTitle = (section) => {
//     switch(section) {
//       case "today": return null;
//       case "yesterday": return "Yesterday";
//       case "2days": return "2 days ago";
//       default: return section;
//     }
//   };

//   const renderContactsBySection = () => {
//     const sections = ["today", "yesterday", "2days"];
//     return sections.map(section => {
//       const sectionContacts = contacts.filter(contact => contact.section === section);
//       if (sectionContacts.length === 0) return null;

//       return (
//         <div key={section}>
//           {getSectionTitle(section) && (
//             <div className="text-sm text-gray-500 font-medium mb-3 mt-6 px-6">
//               {getSectionTitle(section)}
//             </div>
//           )}
//           {sectionContacts.map((contact) => (
//             <div 
//               key={contact.id} 
//               onClick={() => onContactClick && onContactClick(contact)}
//               className="hover:bg-gray-50 cursor-pointer transition-colors"
//             >
//               <div className="grid grid-cols-12 gap-6 items-center px-6 py-4">
//                 {/* Person Column */}
//                 <div className="col-span-4 flex items-center space-x-3">
//                   <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg">
//                     {contact.avatar}
//                   </div>
//                   <div className="min-w-0 flex-1">
//                     <div className="font-medium text-gray-900 truncate">{contact.name}</div>
//                     <div className="text-sm text-gray-500 truncate">{contact.email}</div>
//                   </div>
//                 </div>

//                 {/* Groups Column */}
//                 <div className="col-span-2 flex items-center space-x-2">
//                   <span className="text-lg">{getGroupIcon(contact.group)}</span>
//                   <div className="flex items-center space-x-2">
//                     <span className="text-gray-700 text-sm truncate border border-gray-200 bg-gray-50 px-2 py-1 rounded">
//                       {contact.group}
//                     </span>
//                     {contact.additionalCount && (
//                       <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full">
//                         +{contact.additionalCount}
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 {/* Company Column */}
//                 <div className="col-span-3 flex items-center space-x-2">
//                   <span className="text-lg">{contact.companyIcon}</span>
//                   <span className="text-gray-700 text-sm truncate">{contact.company}</span>
//                 </div>

//                 {/* Tags Column */}
//                 <div className="col-span-3 flex items-center flex-wrap gap-1">
//                   {contact.tags.slice(0, 2).map((tag, tagIndex) => (
//                     <span
//                       key={tagIndex}
//                       className={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor(tag)}`}
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                   {contact.tags.length > 2 && (
//                     <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full">
//                       +{contact.tags.length - 2}
//                     </span>
//                   )}
//                   {contact.additionalCount && contact.tags.length <= 2 && (
//                     <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full">
//                       +{contact.additionalCount}
//                     </span>
//                   )}
//                 </div>
//               </div>
              
//               {/* Border line with margins - starts from Groups column */}
//               <div className="ml-6 mr-6 border-b border-gray-200"></div>
//             </div>
//           ))}
//         </div>
//       );
//     });
//   };

//   return (
//     <div className="flex-1 flex flex-col bg-white">
//       {/* Header */}
//       <div className="border-b border-gray-200 px-6 py-4">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <h1 className="text-xl font-semibold text-gray-900">Contacts</h1>
//             <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm font-medium">729</span>
//           </div>
//           <div className="flex items-center space-x-3">
//             <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
//               <Filter className="w-4 h-4" />
//               <span className="text-sm font-medium">Filter</span>
//             </button>
//             <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
//               <ArrowUpDown className="w-4 h-4" />
//               <span className="text-sm font-medium">Sort</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Table Header */}
//       <div className="px-6 py-3 border-b border-gray-200 bg-gray-50 mt-7">
//         <div className="grid grid-cols-12 gap-6 text-sm font-medium text-gray-700">
//           <div className="col-span-4">Person</div>
//           <div className="col-span-2">Groups</div>
//           <div className="col-span-3">Company name</div>
//           <div className="col-span-3">Tags</div>
//         </div>
//       </div>

//       {/* Contacts List */}
//       <div className="flex-1 overflow-y-auto">
//         {renderContactsBySection()}
//       </div>
//     </div>
//   );
// };

// Contact Detail Component
// const ContactDetail = ({ contact, onBack }) => {
//   if (!contact) return null;

//   const getTagColor = (tag) => {
//     const colors = {
//       "Product Hunt": "bg-orange-100 text-orange-700",
//       "Founder": "bg-green-100 text-green-700",
//       "Angel Investor": "bg-blue-100 text-blue-700",
//       "SaaS": "bg-gray-100 text-gray-700",
//       "Family": "bg-pink-100 text-pink-700",
//       "Blockchain": "bg-indigo-100 text-indigo-700",
//       "GTM Expert": "bg-cyan-100 text-cyan-700"
//     };
//     return colors[tag] || "bg-gray-100 text-gray-700";
//   };

//   return (
//     <div className="flex-1 flex flex-col bg-gray-50">
//       {/* Header */}
//       <div className="border-b border-gray-200 px-6 py-4 bg-white">
//         <div className="flex items-center space-x-4">
//           <button 
//             onClick={onBack}
//             className="p-2 hover:bg-gray-100 rounded-lg"
//           >
//             <ArrowLeft className="w-5 h-5 text-gray-600" />
//           </button>
//           <h1 className="text-xl font-semibold text-gray-900">{contact.name}</h1>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 overflow-y-auto p-6">
//         <div className="max-w-6xl mx-auto">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
//             {/* Left Column - Profile Info */}
//             <div className="lg:col-span-2 space-y-6">
              
//               {/* Profile Card */}
//               <div className="bg-white rounded-lg border border-gray-200 p-6">
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="flex items-center space-x-4">
//                     <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl">
//                       {contact.avatar}
//                     </div>
//                     <div>
//                       <h2 className="text-xl font-semibold text-gray-900">{contact.name}</h2>
//                       <div className="flex items-center space-x-2 mt-1">
//                         <span className="text-base">{contact.companyIcon}</span>
//                         <span className="text-base font-medium text-gray-700">{contact.company}</span>
//                       </div>
//                       <div className="flex items-center space-x-1 mt-1">
//                         <MapPin className="w-4 h-4 text-gray-400" />
//                         <span className="text-sm text-gray-500">{contact.location}</span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex space-x-1">
//                     <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg">
//                       <Star className="w-4 h-4" />
//                     </button>
//                     <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg">
//                       <Edit className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>

//                 {/* Tags */}
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {contact.tags.map((tag, index) => (
//                     <span
//                       key={index}
//                       className={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor(tag)}`}
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>

//                 {/* Bio */}
//                 <div>
//                   <p className="text-gray-600 text-sm leading-relaxed">{contact.bio}</p>
//                 </div>
//               </div>

//               {/* Contact Information */}
//               <div className="bg-white rounded-lg border border-gray-200 p-6">
//                 <h3 className="text-base font-medium text-gray-900 mb-4">Contact Information</h3>
//                 <div className="space-y-3">
//                   <div className="flex items-center space-x-3">
//                     <Mail className="w-4 h-4 text-gray-400" />
//                     <span className="text-sm text-gray-600">Email</span>
//                     <span className="text-sm text-gray-900 font-medium">{contact.email}</span>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <Phone className="w-4 h-4 text-gray-400" />
//                     <span className="text-sm text-gray-600">Phone</span>
//                     <span className="text-sm text-gray-900 font-medium">{contact.phone}</span>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <MapPin className="w-4 h-4 text-gray-400" />
//                     <span className="text-sm text-gray-600">Location</span>
//                     <span className="text-sm text-gray-900 font-medium">{contact.location}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Recent Activity */}
//               <div className="bg-white rounded-lg border border-gray-200 p-6">
//                 <h3 className="text-base font-medium text-gray-900 mb-4">Recent Activity</h3>
//                 <div className="space-y-3">
//                   <div className="flex items-center space-x-3 py-2">
//                     <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
//                       <Mail className="w-3 h-3 text-blue-600" />
//                     </div>
//                     <div className="flex-1">
//                       <div className="text-sm font-medium text-gray-900">Email sent</div>
//                       <div className="text-xs text-gray-500">2 hours ago</div>
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-3 py-2">
//                     <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
//                       <Phone className="w-3 h-3 text-green-600" />
//                     </div>
//                     <div className="flex-1">
//                       <div className="text-sm font-medium text-gray-900">Phone call - 15 min</div>
//                       <div className="text-xs text-gray-500">Yesterday</div>
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-3 py-2">
//                     <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
//                       <Calendar className="w-3 h-3 text-gray-600" />
//                     </div>
//                     <div className="flex-1">
//                       <div className="text-sm font-medium text-gray-900">Meeting scheduled</div>
//                       <div className="text-xs text-gray-500">3 days ago</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right Column - Actions */}
//             <div className="space-y-6">
              
//               {/* Quick Actions */}
//               <div className="bg-white rounded-lg border border-gray-200 p-6">
//                 <h3 className="text-base font-medium text-gray-900 mb-4">Quick Actions</h3>
//                 <div className="space-y-2">
//                   <button className="w-full flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left">
//                     <Mail className="w-4 h-4 text-blue-600" />
//                     <span className="text-sm font-medium text-blue-700">Send Email</span>
//                   </button>
//                   <button className="w-full flex items-center space-x-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left">
//                     <Phone className="w-4 h-4 text-green-600" />
//                     <span className="text-sm font-medium text-green-700">Call Now</span>
//                   </button>
//                   <button className="w-full flex items-center space-x-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left">
//                     <Calendar className="w-4 h-4 text-gray-600" />
//                     <span className="text-sm font-medium text-gray-700">Schedule Meeting</span>
//                   </button>
//                 </div>
//               </div>

//               {/* Group Information */}
//               <div className="bg-white rounded-lg border border-gray-200 p-6">
//                 <h3 className="text-base font-medium text-gray-900 mb-4">Groups</h3>
//                 <div className="space-y-2">
//                   <div className="flex items-center space-x-2">
//                     <span className="text-base">💰</span>
//                     <span className="text-sm text-gray-700">{contact.group}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Notes */}
//               <div className="bg-white rounded-lg border border-gray-200 p-6">
//                 <h3 className="text-base font-medium text-gray-900 mb-4">Notes</h3>
//                 <textarea 
//                   className="w-full h-24 p-3 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Add a note about this contact..."
//                 />
//                 <button className="mt-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg hover:bg-gray-800">
//                   Save Note
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };





// import React, { useState } from 'react';
// import { Search, Plus, Filter, ArrowUpDown, Home, Users, Bell, CheckSquare, FileText, Settings, Link, ArrowLeft, Mail, Phone, MapPin, Calendar, Edit, Trash2, Star, Clock, Mic, Send, MoreHorizontal, AlertCircle, CheckCircle2, Circle, BookOpen, X, Paperclip, Image, MessageCircle } from 'lucide-react';
// import HomePage from './components/HomePage';
// import ContactDetail from './components/ContactDetail';
// import ContactsList from './components/ContactsList';
// import TasksPage from './components/TaskPage';
// import NotificationsPage from './components/NotificationsPage';
// import NotesPage from './components/NotesPage';
// import Sidebar from './components/Sidebar';
// import GmailIntegration from './components/GmailIntegration';

// // Main App Component
// const App = () => {
//   const [activeView, setActiveView] = useState('home');
//   const [selectedContact, setSelectedContact] = useState(null);

//   const handleContactClick = (contact) => {
//     setSelectedContact(contact);
//   };

//   const handleBackToContacts = () => {
//     setSelectedContact(null);
//   };

//   const renderMainContent = () => {
//     if (activeView === 'home') {
//       return <HomePage />;
//     }
    
//     if (activeView === 'search') {
//       return <HomePage />;
//     }
    
//     if (activeView === 'contacts') {
//       if (selectedContact) {
//         return <ContactDetail contact={selectedContact} onBack={handleBackToContacts} />;
//       }
//       return <ContactsList onContactClick={handleContactClick} />;
//     }

//     if (activeView === 'tasks') {
//       return <TasksPage />;
//     }

//     if (activeView === 'notifications') {
//       return <NotificationsPage />;
//     }

//     if (activeView === 'notes') {
//       return <NotesPage />;
//     }

//     if (activeView === 'gmail') {
//       return <GmailIntegration onBack={() => setActiveView('home')} />;
//     }
    
//     // Default fallback for other views
//     return (
//       <div className="flex-1 flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <h2 className="text-2xl font-semibold text-gray-900 mb-2">
//             {activeView.charAt(0).toUpperCase() + activeView.slice(1)}
//           </h2>
//           <p className="text-gray-600">This page is coming soon...</p>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="flex h-screen bg-white">
//       <Sidebar activeView={activeView} setActiveView={setActiveView} />
//       {renderMainContent()}
//     </div>
//   );
// };

// export default App;



import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, ArrowUpDown, Home, Users, Bell, CheckSquare, FileText, Settings, Link, ArrowLeft, Mail, Phone, MapPin, Calendar, Edit, Trash2, Star, Clock, Mic, Send, MoreHorizontal, AlertCircle, CheckCircle2, Circle, BookOpen, X, Paperclip, Image, MessageCircle } from 'lucide-react';
import HomePage from './components/HomePage';
import ContactDetail from './components/ContactDetail';
import ContactsList from './components/ContactsList';
import TasksPage from './components/TaskPage';
import NotificationsPage from './components/NotificationsPage';
import NotesPage from './components/NotesPage';
import Sidebar from './components/Sidebar';
import GmailIntegration from './components/GmailIntegration';

// Main App Component
const App = () => {
  const [activeView, setActiveView] = useState('home');
  const [selectedContact, setSelectedContact] = useState(null);
  const [authenticatedEmail, setAuthenticatedEmail] = useState(null);

  // Load authenticated email from localStorage on app start
  useEffect(() => {
    const savedEmail = localStorage.getItem('authenticatedEmail');
    console.log('App.jsx loading from localStorage:', savedEmail); // Debug log
    if (savedEmail) {
      setAuthenticatedEmail(savedEmail);
      console.log('App.jsx set authenticatedEmail to:', savedEmail); // Debug log
    }
  }, []);

  // Handle authentication success
  const handleAuthentication = (email) => {
    console.log('App.jsx handleAuthentication called with:', email); // Debug log
    setAuthenticatedEmail(email);
    localStorage.setItem('authenticatedEmail', email);
    setActiveView('home'); // Navigate back to home after authentication
  };

  // Handle logout/disconnect
  const handleLogout = () => {
    setAuthenticatedEmail(null);
    localStorage.removeItem('authenticatedEmail');
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

  const handleBackToContacts = () => {
    setSelectedContact(null);
  };

  const renderMainContent = () => {
    if (activeView === 'home') {
      console.log('App.jsx rendering HomePage with authenticatedEmail:', authenticatedEmail); // Debug log
      return (
        <HomePage 
          authenticatedEmail={authenticatedEmail}
          onGmailSetup={() => setActiveView('gmail')}
          onLogout={handleLogout}
        />
      );
    }
    
    if (activeView === 'search') {
      console.log('App.jsx rendering search HomePage with authenticatedEmail:', authenticatedEmail); // Debug log
      return (
        <HomePage 
          authenticatedEmail={authenticatedEmail}
          onGmailSetup={() => setActiveView('gmail')}
          onLogout={handleLogout}
        />
      );
    }
    
    if (activeView === 'contacts') {
      if (selectedContact) {
        return <ContactDetail contact={selectedContact} onBack={handleBackToContacts} />;
      }
      return <ContactsList onContactClick={handleContactClick} />;
    }

    if (activeView === 'tasks') {
      return <TasksPage />;
    }

    if (activeView === 'notifications') {
      return <NotificationsPage />;
    }

    if (activeView === 'notes') {
      return <NotesPage />;
    }

    if (activeView === 'gmail') {
      return (
        <GmailIntegration 
          onBack={() => setActiveView('home')} 
          onAuthenticated={handleAuthentication}
        />
      );
    }
    
    // Default fallback for other views
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {activeView.charAt(0).toUpperCase() + activeView.slice(1)}
          </h2>
          <p className="text-gray-600">This page is coming soon...</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView}
        authenticatedEmail={authenticatedEmail}
        onLogout={handleLogout}
      />
      {renderMainContent()}
    </div>
  );
};

export default App;