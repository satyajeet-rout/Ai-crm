import React, { useState } from 'react';
import { Search, Plus, Filter, ArrowUpDown, Home, Users, Bell, CheckSquare, FileText, Settings, Link, ArrowLeft, Mail, Phone, MapPin, Calendar, Edit, Trash2, Star, Clock, Mic, Send, MoreHorizontal, AlertCircle, CheckCircle2, Circle, BookOpen, X, Paperclip, Image, MessageCircle } from 'lucide-react';
import NoteModal from './NoteModal';




const NotesPage = () => {
    const [notes, setNotes] = useState([
      {
        id: 1,
        title: "Meeting Notes - Sina Sadegh",
        content: "Discussed potential Series A investment. Key points:\n- Looking for $5M round\n- Strong traction with 50% MoM growth\n- Focus on enterprise clients\n- Timeline: Q3 2025",
        contact: "Sina Sadegh",
        contactAvatar: "👨‍💼",
        createdAt: "2025-05-22T10:30:00Z",
        updatedAt: "2025-05-22T14:15:00Z",
        tags: ["investment", "meeting"],
        favorite: true
      },
      {
        id: 2,
        title: "Product Demo Feedback - table.ai",
        content: "Michael's new AI platform for data visualization:\n\n✅ Pros:\n- Intuitive interface\n- Fast query processing\n- Good integration options\n\n❌ Areas for improvement:\n- Limited customization\n- Pricing seems high\n- Need better mobile support",
        contact: "Michael Sieb",
        contactAvatar: "👨‍💼",
        createdAt: "2025-05-21T16:20:00Z",
        updatedAt: "2025-05-21T16:45:00Z",
        tags: ["product", "feedback"],
        favorite: false
      },
      {
        id: 3,
        title: "Barcelona Networking Event",
        content: "Great connections made at the startup event:\n\n🎯 Key contacts:\n- 3 potential investors\n- 2 technical co-founders\n- 1 marketing expert\n\nFollow-ups scheduled for next week.",
        contact: null,
        contactAvatar: null,
        createdAt: "2025-05-20T19:00:00Z",
        updatedAt: "2025-05-20T19:30:00Z",
        tags: ["networking", "event"],
        favorite: false
      },
      {
        id: 4,
        title: "Q2 Investor Update Draft",
        content: "Key metrics to include:\n- Revenue: $2.3M (+45% QoQ)\n- Customers: 150 (+30)\n- Team: 25 employees (+8)\n- Runway: 18 months\n\nPriorities for Q3:\n- Product launch v2.0\n- Enterprise sales focus\n- Team expansion",
        contact: null,
        contactAvatar: null,
        createdAt: "2025-05-19T11:15:00Z",
        updatedAt: "2025-05-22T09:30:00Z",
        tags: ["investors", "metrics"],
        favorite: true
      }
    ]);
  
    const [selectedNote, setSelectedNote] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showNoteModal, setShowNoteModal] = useState(false);
    const [editingNote, setEditingNote] = useState(null);
  
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
  
    const toggleFavorite = (noteId) => {
      setNotes(notes.map(note => 
        note.id === noteId ? { ...note, favorite: !note.favorite, updatedAt: new Date().toISOString() } : note
      ));
      if (selectedNote && selectedNote.id === noteId) {
        setSelectedNote({...selectedNote, favorite: !selectedNote.favorite});
      }
    };
  
    const handleCreateNote = () => {
      setEditingNote(null);
      setShowNoteModal(true);
    };
  
    const handleEditNote = (note) => {
      setEditingNote(note);
      setShowNoteModal(true);
    };
  
    const handleSaveNote = (noteData) => {
      if (editingNote) {
        setNotes(notes.map(note => 
          note.id === editingNote.id ? noteData : note
        ));
        if (selectedNote && selectedNote.id === editingNote.id) {
          setSelectedNote(noteData);
        }
      } else {
        setNotes([noteData, ...notes]);
      }
    };
  
    const handleDeleteNote = (noteId) => {
      if (window.confirm('Are you sure you want to delete this note?')) {
        setNotes(notes.filter(note => note.id !== noteId));
        if (selectedNote && selectedNote.id === noteId) {
          setSelectedNote(null);
        }
      }
    };
  
    const filteredNotes = notes.filter(note => 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const now = new Date();
      const diffInHours = (now - date) / (1000 * 60 * 60);
      
      if (diffInHours < 24) {
        return `${Math.floor(diffInHours)} hours ago`;
      } else if (diffInHours < 48) {
        return 'Yesterday';
      } else {
        return date.toLocaleDateString();
      }
    };
  
    const getTagColor = (tag) => {
      const colors = {
        "investment": "bg-green-100 text-green-700",
        "meeting": "bg-blue-100 text-blue-700",
        "product": "bg-purple-100 text-purple-700",
        "feedback": "bg-orange-100 text-orange-700",
        "networking": "bg-pink-100 text-pink-700",
        "event": "bg-cyan-100 text-cyan-700",
        "investors": "bg-indigo-100 text-indigo-700",
        "metrics": "bg-yellow-100 text-yellow-700"
      };
      return colors[tag] || "bg-gray-100 text-gray-700";
    };
  
    if (selectedNote) {
      return (
        <div className="flex-1 flex flex-col bg-gray-50">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setSelectedNote(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <h1 className="text-xl font-semibold text-gray-900">{selectedNote.title}</h1>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => toggleFavorite(selectedNote.id)}
                  className={`p-2 rounded-lg ${selectedNote.favorite ? 'text-yellow-500 bg-yellow-50' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Star className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleEditNote(selectedNote)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleDeleteNote(selectedNote.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
  
          {/* Note Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                {/* Note Meta */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                  <div className="flex items-center space-x-4">
                    {selectedNote.contact && (
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{selectedNote.contactAvatar}</span>
                        <span className="text-sm font-medium text-gray-700">{selectedNote.contact}</span>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {selectedNote.tags.map((tag, index) => (
                        <span
                          key={index}
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor(tag)}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    Updated {formatDate(selectedNote.updatedAt)}
                  </div>
                </div>
  
                {/* Note Content */}
                <div className="prose max-w-none">
                  <div className="text-gray-700 whitespace-pre-line text-sm leading-relaxed">
                    {selectedNote.content}
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <NoteModal
            isOpen={showNoteModal}
            onClose={() => setShowNoteModal(false)}
            note={editingNote}
            onSave={handleSaveNote}
            contacts={contacts}
          />
        </div>
      );
    }
  
    return (
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">Notes</h1>
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm font-medium">
                {notes.length}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>
              <button 
                onClick={handleCreateNote}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">New Note</span>
              </button>
            </div>
          </div>
        </div>
  
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredNotes.map((note) => (
                <div 
                  key={note.id}
                  onClick={() => setSelectedNote(note)}
                  className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md hover:border-gray-300 transition-all cursor-pointer relative group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-medium text-gray-900 text-sm line-clamp-2 flex-1 mr-2">
                      {note.title}
                    </h3>
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(note.id);
                        }}
                        className={`flex-shrink-0 p-1 rounded ${note.favorite ? 'text-yellow-500' : 'text-gray-300 hover:text-gray-400'}`}
                      >
                        <Star className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditNote(note);
                        }}
                        className="flex-shrink-0 p-1 rounded text-gray-400 hover:text-blue-600"
                      >
                        <Edit className="w-3 h-3" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteNote(note.id);
                        }}
                        className="flex-shrink-0 p-1 rounded text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-xs mb-4 line-clamp-3">
                    {note.content}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {note.contact && (
                        <>
                          <span className="text-sm">{note.contactAvatar}</span>
                          <span className="text-xs text-gray-500 truncate max-w-20">
                            {note.contact}
                          </span>
                        </>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">
                      {formatDate(note.updatedAt)}
                    </span>
                  </div>
                  
                  {note.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {note.tags.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className={`px-1.5 py-0.5 rounded text-xs ${getTagColor(tag)}`}
                        >
                          {tag}
                        </span>
                      ))}
                      {note.tags.length > 2 && (
                        <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                          +{note.tags.length - 2}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {filteredNotes.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No notes found</h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm ? 'Try adjusting your search terms.' : 'Create your first note to get started.'}
                </p>
                <button 
                  onClick={handleCreateNote}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Note</span>
                </button>
              </div>
            )}
          </div>
        </div>
  
        <NoteModal
          isOpen={showNoteModal}
          onClose={() => setShowNoteModal(false)}
          note={editingNote}
          onSave={handleSaveNote}
          contacts={contacts}
        />
      </div>
    );
};
  

export default NotesPage;