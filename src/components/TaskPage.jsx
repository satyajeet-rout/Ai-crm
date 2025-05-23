import React, { useState } from 'react';
import { Search, Plus, Filter, ArrowUpDown, Home, Users, Bell, CheckSquare, FileText, Settings, Link, ArrowLeft, Mail, Phone, MapPin, Calendar, Edit, Trash2, Star, Clock, Mic, Send, MoreHorizontal, AlertCircle, CheckCircle2, Circle, BookOpen, X, Paperclip, Image, MessageCircle } from 'lucide-react';
import TaskModal from './TaskModal';



const TasksPage = () => {

    const [activeTab, setActiveTab] = useState('pending');
    const [tasks, setTasks] = useState([
      {
        id: 1,
        title: "Follow up with Sina about investment",
        description: "Send follow-up email regarding Series A discussion",
        priority: "high",
        status: "pending",
        dueDate: "2025-05-23",
        contact: "Sina Sadegh",
        contactAvatar: "👨‍💼",
        category: "Follow-up",
        createdAt: "2025-05-20T10:30:00Z",
        updatedAt: "2025-05-20T10:30:00Z"
      },
      {
        id: 2,
        title: "Schedule call with Maximilian",
        description: "Discuss potential collaboration on Magic Design project",
        priority: "medium",
        status: "pending",
        dueDate: "2025-05-24",
        contact: "Maximilian Fleitmann",
        contactAvatar: "👨",
        category: "Meeting",
        createdAt: "2025-05-19T14:20:00Z",
        updatedAt: "2025-05-19T14:20:00Z"
      },
      {
        id: 3,
        title: "Review Michael's product demo",
        description: "Evaluate table.ai platform and provide feedback",
        priority: "low",
        status: "completed",
        dueDate: "2025-05-22",
        contact: "Michael Sieb",
        contactAvatar: "👨‍💼",
        category: "Review",
        createdAt: "2025-05-18T09:15:00Z",
        updatedAt: "2025-05-22T16:45:00Z"
      },
      {
        id: 4,
        title: "Send intro to Natali and Lukas",
        description: "Connect for potential GTM collaboration",
        priority: "medium",
        status: "pending",
        dueDate: "2025-05-25",
        contact: "Natali Craig",
        contactAvatar: "👩‍🦰",
        category: "Introduction",
        createdAt: "2025-05-21T11:00:00Z",
        updatedAt: "2025-05-21T11:00:00Z"
      },
      {
        id: 5,
        title: "Prepare Q2 investor update",
        description: "Compile metrics and progress report for investors",
        priority: "high",
        status: "in_progress",
        dueDate: "2025-05-30",
        contact: null,
        contactAvatar: null,
        category: "Admin",
        createdAt: "2025-05-17T08:45:00Z",
        updatedAt: "2025-05-22T13:20:00Z"
      }
    ]);
  
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
  
    const contacts = [
      { id: 1, name: "Sina Sadegh", avatar: "👨‍💼" },
      { id: 2, name: "Maximilian Fleitmann", avatar: "👨" },
      { id: 3, name: "Michael Sieb", avatar: "👨‍💼" },
      { id: 4, name: "Natali Craig", avatar: "👩‍🦰" },
      { id: 5, name: "Lukas Grunzke", avatar: "👨‍💼" },
      { id: 6, name: "Courtney Werner", avatar: "👩‍💼" },
      { id: 7, name: "Amy Wang", avatar: "👩‍🦰" },
      { id: 8, name: "Ted Lasso", avatar: "👨‍🦱" },
      { id: 9, name: "Amanda Clinton", avatar: "👩‍💼" }
    ];
  
    const toggleTaskStatus = (taskId) => {
      setTasks(tasks.map(task => 
        task.id === taskId 
          ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed', updatedAt: new Date().toISOString() }
          : task
      ));
    };
  
    const handleCreateTask = () => {
      setEditingTask(null);
      setShowTaskModal(true);
    };
  
    const handleEditTask = (task) => {
      setEditingTask(task);
      setShowTaskModal(true);
    };
  
    const handleSaveTask = (taskData) => {
      if (editingTask) {
        setTasks(tasks.map(task => 
          task.id === editingTask.id ? taskData : task
        ));
      } else {
        setTasks([taskData, ...tasks]);
      }
    };
  
    const handleDeleteTask = (taskId) => {
      if (window.confirm('Are you sure you want to delete this task?')) {
        setTasks(tasks.filter(task => task.id !== taskId));
      }
    };
  
    const getPriorityColor = (priority) => {
      switch(priority) {
        case 'high': return 'bg-red-100 text-red-700 border-red-200';
        case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        case 'low': return 'bg-green-100 text-green-700 border-green-200';
        default: return 'bg-gray-100 text-gray-700 border-gray-200';
      }
    };
  
    const getStatusIcon = (status) => {
      switch(status) {
        case 'completed': return <CheckCircle2 className="w-4 h-4 text-green-600" />;
        case 'in_progress': return <AlertCircle className="w-4 h-4 text-yellow-600" />;
        default: return <Circle className="w-4 h-4 text-gray-400" />;
      }
    };
  
    const pendingTasks = tasks.filter(task => task.status !== 'completed');
    const completedTasks = tasks.filter(task => task.status === 'completed');
  
    return (
      <div className="flex-1 flex flex-col bg-gray-50">
    {/* Header */}
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-900">Tasks</h1>
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm font-medium">
            {pendingTasks.length}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filter</span>
          </button>
          <button 
            onClick={handleCreateTask}
            className="flex items-center space-x-2 px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">New Task</span>
          </button>
        </div>
      </div>
    </div>
  
    {/* Tabs */}
    <div className=" mt-4 mb-4">
      <div className="px-6">
        <nav className="flex justify-center space-x-4">
          <button
            onClick={() => setActiveTab('pending')}
            className={`py-3 px-6 border font-medium text-sm transition-colors rounded-lg ${
              activeTab === 'pending'
                ? 'border-gray-900 bg-gray-900 text-white'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400'
            }`}
          >
            Pending
            <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
              activeTab === 'pending'
                ? 'bg-white text-gray-900'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {pendingTasks.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`py-3 px-6 border font-medium text-sm transition-colors rounded-lg ${
              activeTab === 'completed'
                ? 'border-gray-900 bg-gray-900 text-white'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400'
            }`}
          >
            Completed
            <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
              activeTab === 'completed'
                ? 'bg-white text-gray-900'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {completedTasks.length}
            </span>
          </button>
        </nav>
      </div>
    </div>
  
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Pending Tasks Tab */}
        {activeTab === 'pending' && (
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Pending Tasks</h2>
            </div>
            {pendingTasks.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <p>No pending tasks</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {pendingTasks.map((task) => (
                  <div key={task.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start space-x-4">
                      <button 
                        onClick={() => toggleTaskStatus(task.id)}
                        className="mt-1 hover:bg-gray-100 rounded p-1"
                      >
                        {getStatusIcon(task.status)}
                      </button>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-base font-medium text-gray-900">{task.title}</h3>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs font-medium border rounded-full ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                            <div className="flex items-center space-x-1">
                              <button 
                                onClick={() => handleEditTask(task)}
                                className="p-1 text-gray-400 hover:text-blue-600"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteTask(task.id)}
                                className="p-1 text-gray-400 hover:text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-gray-600">
                                <MoreHorizontal className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            {task.contact && (
                              <div className="flex items-center space-x-2">
                                <span className="text-sm">{task.contactAvatar}</span>
                                <span className="text-sm text-gray-600">{task.contact}</span>
                              </div>
                            )}
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {task.category}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
  
        {/* Completed Tasks Tab */}
        {activeTab === 'completed' && (
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Completed Tasks</h2>
            </div>
            {completedTasks.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <p>No completed tasks</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {completedTasks.map((task) => (
                  <div key={task.id} className="p-6 hover:bg-gray-50 transition-colors opacity-75">
                    <div className="flex items-start space-x-4">
                      <button 
                        onClick={() => toggleTaskStatus(task.id)}
                        className="mt-1 hover:bg-gray-100 rounded p-1"
                      >
                        {getStatusIcon(task.status)}
                      </button>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-base font-medium text-gray-500 line-through">{task.title}</h3>
                          <div className="flex items-center space-x-1">
                            <button 
                              onClick={() => handleEditTask(task)}
                              className="p-1 text-gray-400 hover:text-blue-600"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteTask(task.id)}
                              className="p-1 text-gray-400 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-gray-600">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mb-3">{task.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            {task.contact && (
                              <div className="flex items-center space-x-2">
                                <span className="text-sm">{task.contactAvatar}</span>
                                <span className="text-sm text-gray-500">{task.contact}</span>
                              </div>
                            )}
                            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">
                              {task.category}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1 text-sm text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  
    <TaskModal
      isOpen={showTaskModal}
      onClose={() => setShowTaskModal(false)}
      task={editingTask}
      onSave={handleSaveTask}
      contacts={contacts}
    />
  </div>
    );
};
  
export default TasksPage;