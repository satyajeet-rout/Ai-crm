import React, { useState } from 'react';
import { Search, Plus, Filter, ArrowUpDown, Home, Users, Bell, CheckSquare, FileText, Settings, Link, ArrowLeft, Mail, Phone, MapPin, Calendar, Edit, Trash2, Star, Clock, Mic, Send, MoreHorizontal, AlertCircle, CheckCircle2, Circle, BookOpen, X, Paperclip, Image, MessageCircle } from 'lucide-react';



const NotificationsPage = () => {
    const [notifications, setNotifications] = useState([
      {
        id: 1,
        type: "mention",
        title: "New message from Sina Sadegh",
        description: "Sina mentioned you in a LinkedIn post about startup funding",
        time: "2 hours ago",
        read: false,
        avatar: "👨‍💼",
        action: "View Post"
      },
      {
        id: 2,
        type: "task",
        title: "Task reminder",
        description: "Follow up with Maximilian about Magic Design collaboration",
        time: "4 hours ago",
        read: false,
        avatar: "📋",
        action: "View Task"
      },
      {
        id: 3,
        type: "contact",
        title: "New contact added",
        description: "Amy Wang from Apple has been added to your network",
        time: "6 hours ago",
        read: true,
        avatar: "👩‍🦰",
        action: "View Contact"
      },
      {
        id: 4,
        type: "meeting",
        title: "Meeting reminder",
        description: "Video call with Michael Sieb in 30 minutes",
        time: "Yesterday",
        read: true,
        avatar: "📅",
        action: "Join Meeting"
      },
      {
        id: 5,
        type: "update",
        title: "CRM Update",
        description: "Your weekly network analysis is ready to view",
        time: "2 days ago",
        read: true,
        avatar: "📊",
        action: "View Report"
      },
      {
        id: 6,
        type: "birthday",
        title: "Birthday reminder",
        description: "Ted Lasso's birthday is tomorrow",
        time: "3 days ago",
        read: true,
        avatar: "🎂",
        action: "Send Wishes"
      }
    ]);
  
    const markAsRead = (notificationId) => {
      setNotifications(notifications.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      ));
    };
  
    const markAllAsRead = () => {
      setNotifications(notifications.map(notif => ({ ...notif, read: true })));
    };
  
    const unreadCount = notifications.filter(n => !n.read).length;
  
    return (
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">Notifications</h1>
              {unreadCount > 0 && (
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm font-medium">
                  {unreadCount} unread
                </span>
              )}
            </div>
            <div className="flex items-center space-x-3">
              {unreadCount > 0 && (
                <button 
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Mark all as read
                </button>
              )}
              <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">Filter</span>
              </button>
            </div>
          </div>
        </div>
  
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto p-6">
            <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-6 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-lg">{notification.avatar}</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                              {notification.title}
                            </h3>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{notification.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">{notification.time}</span>
                            <div className="flex items-center space-x-2">
                              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                {notification.action}
                              </button>
                              {!notification.read && (
                                <button 
                                  onClick={() => markAsRead(notification.id)}
                                  className="text-xs text-gray-500 hover:text-gray-700"
                                >
                                  Mark as read
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
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
  


export default NotificationsPage;