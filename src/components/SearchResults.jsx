import React, { useState } from 'react';
import { Search, Plus, Filter, ArrowUpDown, Home, Users, Bell, CheckSquare, FileText, Settings, Link, ArrowLeft, Mail, Phone, MapPin, Calendar, Edit, Trash2, Star, Clock, Mic, Send, MoreHorizontal, AlertCircle, CheckCircle2, Circle, BookOpen, X, Paperclip, Image, MessageCircle } from 'lucide-react';



const SearchResults = () => {
    const [query, setQuery] = useState('');
  
    const exampleQueries = [
      {
        icon: "🔍",
        text: "Show me all contacts living in Berlin"
      },
      {
        icon: "📊",
        text: "My last touch points with Lukas"
      },
      {
        icon: "🎯",
        text: "Who in my network is an SaaS expert"
      },
      {
        icon: "👤",
        text: "Add www.linkedin.com/in/sina-sadegh"
      }
    ];
  
    return (
      <div className="flex-1 flex flex-col bg-gray-50">
        <div className="p-6">
          <div className="max-w-2xl mx-auto mt-20">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-medium text-gray-800 mb-4">
                Interact with your CRM
              </h2>
            </div>
  
            {/* Search Input */}
            <div className="relative mb-8">
              <input
                type="text"
                placeholder="Ask anything..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-4 py-4 pr-20 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 text-gray-700 placeholder-gray-400"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Clock className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Mic className="w-4 h-4" />
                </button>
                <button className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
  
            {/* Example Queries */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {exampleQueries.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setQuery(example.text)}
                  className="flex items-center space-x-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all text-left"
                >
                  <span className="text-lg">{example.icon}</span>
                  <span className="text-gray-700 text-sm">{example.text}</span>
                </button>
              ))}
            </div>
  
            {/* More Examples Button */}
            <div className="text-center">
              <button className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900">
                <Plus className="w-4 h-4" />
                <span>More examples</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
};
  

export default SearchResults;