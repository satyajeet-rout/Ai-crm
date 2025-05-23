import React from 'react';
import { Search, Plus, Filter, ArrowUpDown, Home, Users, Bell, CheckSquare, FileText, Settings, Link, ArrowLeft, Mail, Phone, MapPin, Calendar, Edit, Trash2, Star, Clock, Mic, Send, MoreHorizontal, AlertCircle, CheckCircle2, Circle, BookOpen, X, Paperclip, Image, MessageCircle } from 'lucide-react';


const ContactDetail = ({ contact, onBack }) => {
    if (!contact) return null;
  
    const getTagColor = (tag) => {
      const colors = {
        "Product Hunt": "bg-orange-100 text-orange-700",
        "Founder": "bg-green-100 text-green-700",
        "Angel Investor": "bg-blue-100 text-blue-700",
        "SaaS": "bg-gray-100 text-gray-700",
        "Family": "bg-pink-100 text-pink-700",
        "Blockchain": "bg-indigo-100 text-indigo-700",
        "GTM Expert": "bg-cyan-100 text-cyan-700"
      };
      return colors[tag] || "bg-gray-100 text-gray-700";
    };
  
    return (
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4 bg-white">
          <div className="flex items-center space-x-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">{contact.name}</h1>
          </div>
        </div>
  
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column - Profile Info */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Profile Card */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl">
                        {contact.avatar}
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">{contact.name}</h2>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-base">{contact.companyIcon}</span>
                          <span className="text-base font-medium text-gray-700">{contact.company}</span>
                        </div>
                        <div className="flex items-center space-x-1 mt-1">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-500">{contact.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg">
                        <Star className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {contact.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor(tag)}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
  
                  {/* Bio */}
                  <div>
                    <p className="text-gray-600 text-sm leading-relaxed">{contact.bio}</p>
                  </div>
                </div>
  
                {/* Contact Information */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-base font-medium text-gray-900 mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Email</span>
                      <span className="text-sm text-gray-900 font-medium">{contact.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Phone</span>
                      <span className="text-sm text-gray-900 font-medium">{contact.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Location</span>
                      <span className="text-sm text-gray-900 font-medium">{contact.location}</span>
                    </div>
                  </div>
                </div>
  
                {/* Recent Activity */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-base font-medium text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 py-2">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <Mail className="w-3 h-3 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">Email sent</div>
                        <div className="text-xs text-gray-500">2 hours ago</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 py-2">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <Phone className="w-3 h-3 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">Phone call - 15 min</div>
                        <div className="text-xs text-gray-500">Yesterday</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 py-2">
                      <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                        <Calendar className="w-3 h-3 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">Meeting scheduled</div>
                        <div className="text-xs text-gray-500">3 days ago</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              {/* Right Column - Actions */}
              <div className="space-y-6">
                
                {/* Quick Actions */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-base font-medium text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <button className="w-full flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left">
                      <Mail className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-700">Send Email</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left">
                      <Phone className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-700">Call Now</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left">
                      <Calendar className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Schedule Meeting</span>
                    </button>
                  </div>
                </div>
  
                {/* Group Information */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-base font-medium text-gray-900 mb-4">Groups</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-base">💰</span>
                      <span className="text-sm text-gray-700">{contact.group}</span>
                    </div>
                  </div>
                </div>
  
                {/* Notes */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-base font-medium text-gray-900 mb-4">Notes</h3>
                  <textarea 
                    className="w-full h-24 p-3 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Add a note about this contact..."
                  />
                  <button className="mt-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg hover:bg-gray-800">
                    Save Note
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};
  

export default ContactDetail;