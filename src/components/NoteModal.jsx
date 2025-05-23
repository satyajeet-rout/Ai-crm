import React, { useState } from 'react';
import { Search, Plus, Filter, ArrowUpDown, Home, Users, Bell, CheckSquare, FileText, Settings, Link, ArrowLeft, Mail, Phone, MapPin, Calendar, Edit, Trash2, Star, Clock, Mic, Send, MoreHorizontal, AlertCircle, CheckCircle2, Circle, BookOpen, X, Paperclip, Image, MessageCircle } from 'lucide-react';


const NoteModal = ({ isOpen, onClose, note, onSave, contacts }) => {
    const [formData, setFormData] = useState({
      title: '',
      content: '',
      contact: '',
      tags: []
    });
    const [tagInput, setTagInput] = useState('');
  
    React.useEffect(() => {
      if (note) {
        setFormData({
          title: note.title || '',
          content: note.content || '',
          contact: note.contact || '',
          tags: note.tags || []
        });
      } else {
        setFormData({
          title: '',
          content: '',
          contact: '',
          tags: []
        });
      }
      setTagInput('');
    }, [note, isOpen]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!formData.title.trim()) return;
      
      const selectedContact = contacts.find(c => c.name === formData.contact);
      
      const noteData = {
        ...formData,
        id: note ? note.id : Date.now(),
        contactAvatar: selectedContact?.avatar || null,
        createdAt: note ? note.createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        favorite: note ? note.favorite : false
      };
      
      onSave(noteData);
      onClose();
    };
  
    const addTag = () => {
      if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
        setFormData({
          ...formData,
          tags: [...formData.tags, tagInput.trim()]
        });
        setTagInput('');
      }
    };
  
    const removeTag = (tagToRemove) => {
      setFormData({
        ...formData,
        tags: formData.tags.filter(tag => tag !== tagToRemove)
      });
    };
  
    const handleTagKeyPress = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        addTag();
      }
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-screen overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {note ? 'Edit Note' : 'New Note'}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
  
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter note title..."
                required
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-40 resize-none"
                placeholder="Write your note here..."
                required
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact (Optional)</label>
              <select
                value={formData.contact}
                onChange={(e) => setFormData({...formData, contact: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">No contact associated</option>
                {contacts.map((contact) => (
                  <option key={contact.id} value={contact.name}>
                    {contact.name}
                  </option>
                ))}
              </select>
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
              <div className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleTagKeyPress}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add a tag and press Enter..."
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Add
                </button>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
  
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {note ? 'Update Note' : 'Create Note'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
};
  

export default NoteModal;