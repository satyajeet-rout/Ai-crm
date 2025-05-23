import React from 'react';
import { Search, Plus, Filter, ArrowUpDown, Home, Users, Bell, CheckSquare, FileText, Settings, Link, ArrowLeft, Mail, Phone, MapPin, Calendar, Edit, Trash2, Star, Clock, Mic, Send, MoreHorizontal, AlertCircle, CheckCircle2, Circle, BookOpen, X, Paperclip, Image, MessageCircle } from 'lucide-react';


const ContactsList = ({ onContactClick }) => {
    const contacts = [
      // Today section
      {
        id: 1,
        name: "Sina Sadegh",
        email: "sina@wizardventures.co",
        phone: "+1 (555) 123-4567",
        avatar: "👨‍💼",
        group: "Investor",
        company: "Wizard Ventures",
        companyIcon: "🧙‍♂️",
        tags: ["Product Hunt", "Founder"],
        location: "San Francisco, CA",
        section: "today",
        bio: "Serial entrepreneur and investor focused on early-stage startups. Founded 3 companies and invested in 50+ startups.",
        additionalCount: 1
      },
      {
        id: 2,
        name: "Maximilian Fleitmann",
        email: "max@magicdesign.io",
        phone: "+1 (555) 234-5678",
        avatar: "👨",
        group: "Close friends",
        company: "Magic Design",
        companyIcon: "✨",
        tags: ["Angel Investor", "SaaS"],
        location: "Berlin, Germany",
        section: "today",
        bio: "Design-focused entrepreneur building the future of digital experiences. Previously founded two design agencies.",
        additionalCount: 2
      },
      // Yesterday section
      {
        id: 3,
        name: "Michael Sieb",
        email: "michael@usetable.ai",
        phone: "+1 (555) 345-6789",
        avatar: "👨‍💼",
        group: "Product Hunt",
        company: "table",
        companyIcon: "📊",
        tags: ["Family", "Blockchain"],
        location: "New York, NY",
        section: "yesterday",
        bio: "AI researcher and product builder. Passionate about data visualization and making complex information accessible.",
        additionalCount: 1
      },
      {
        id: 4,
        name: "Natali Craig",
        email: "natali@cherry.com",
        phone: "+1 (555) 456-7890",
        avatar: "👩‍🦰",
        group: "Close friends",
        company: "Cherry Ventures",
        companyIcon: "🍒",
        tags: ["GTM Expert", "SaaS"],
        location: "London, UK",
        section: "yesterday",
        bio: "Go-to-market specialist helping B2B SaaS companies scale from seed to Series A. Former VP of Growth at 3 unicorns.",
        additionalCount: 3
      },
      {
        id: 5,
        name: "Lukas Grunzke",
        email: "lukas@notion.co",
        phone: "+1 (555) 567-8901",
        avatar: "👨‍💼",
        group: "Investor",
        company: "Notion",
        companyIcon: "📝",
        tags: ["Founder", "Product Hunt"],
        location: "San Francisco, CA",
        section: "yesterday",
        bio: "Product leader at Notion, previously founded a productivity startup acquired by Notion in 2021.",
        additionalCount: 2
      },
      // 2 days ago section
      {
        id: 6,
        name: "Courtney Werner",
        email: "courtney@calendly.com",
        phone: "+1 (555) 678-9012",
        avatar: "👩‍💼",
        group: "Startup founder",
        company: "Slack",
        companyIcon: "💬",
        tags: ["SaaS", "Family"],
        location: "San Francisco, CA",
        section: "2days",
        bio: "Product leader at Slack, focused on improving team collaboration and productivity tools."
      },
      {
        id: 7,
        name: "Amy Wang",
        email: "amy@google.com",
        phone: "+1 (555) 789-0123",
        avatar: "👩‍🦰",
        group: "Startup founder",
        company: "Apple",
        companyIcon: "🍎",
        tags: ["GTM Expert", "Founder"],
        location: "Cupertino, CA",
        section: "2days",
        bio: "Senior Product Manager at Apple, previously founded a successful mobile app startup."
      },
      {
        id: 8,
        name: "Ted Lasso",
        email: "ted@sequioa.com",
        phone: "+1 (555) 890-1234",
        avatar: "👨‍🦱",
        group: "Barcelona",
        company: "Sequoia Capital",
        companyIcon: "🌲",
        tags: ["Family", "Angel Investor"],
        location: "Menlo Park, CA",
        section: "2days",
        bio: "Partner at Sequoia Capital, focused on early-stage consumer and enterprise investments.",
        additionalCount: 3
      },
      {
        id: 9,
        name: "Amanda Clinton",
        email: "amanda@salesforce.com",
        phone: "+1 (555) 901-2345",
        avatar: "👩‍💼",
        group: "Dinner party",
        company: "Airtable",
        companyIcon: "📋",
        tags: ["Product Hunt", "Blockchain"],
        location: "San Francisco, CA",
        section: "2days",
        bio: "VP of Product at Airtable, passionate about no-code solutions and database innovation.",
        additionalCount: 1
      }
    ];
  
    const getTagColor = (tag) => {
      const colors = {
        "Product Hunt": "bg-orange-100 text-orange-700",
        "Founder": "bg-green-100 text-green-700",
        "Angel Investor": "bg-blue-100 text-blue-700",
        "SaaS": "bg-purple-100 text-purple-700",
        "Family": "bg-pink-100 text-pink-700",
        "Blockchain": "bg-indigo-100 text-indigo-700",
        "GTM Expert": "bg-cyan-100 text-cyan-700"
      };
      return colors[tag] || "bg-gray-100 text-gray-700";
    };
  
    const getGroupIcon = (group) => {
      const icons = {
        "Investor": "💰",
        "Close friends": "👥",
        "Product Hunt": "🚀",
        "Startup founder": "👔",
        "Barcelona": "🏛️",
        "Dinner party": "🍽️"
      };
      return icons[group] || "👥";
    };
  
    const getSectionTitle = (section) => {
      switch(section) {
        case "today": return null;
        case "yesterday": return "Yesterday";
        case "2days": return "2 days ago";
        default: return section;
      }
    };
  
    const renderContactsBySection = () => {
      const sections = ["today", "yesterday", "2days"];
      return sections.map(section => {
        const sectionContacts = contacts.filter(contact => contact.section === section);
        if (sectionContacts.length === 0) return null;
  
        return (
          <div key={section}>
            {getSectionTitle(section) && (
              <div className="text-sm text-gray-500 font-medium mb-3 mt-6 px-6">
                {getSectionTitle(section)}
              </div>
            )}
            {sectionContacts.map((contact) => (
              <div 
                key={contact.id} 
                onClick={() => onContactClick && onContactClick(contact)}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="grid grid-cols-12 gap-6 items-center px-6 py-4">
                  {/* Person Column */}
                  <div className="col-span-4 flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg">
                      {contact.avatar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-gray-900 truncate">{contact.name}</div>
                      <div className="text-sm text-gray-500 truncate">{contact.email}</div>
                    </div>
                  </div>
  
                  {/* Groups Column */}
                  <div className="col-span-2 flex items-center space-x-2">
                    <span className="text-lg">{getGroupIcon(contact.group)}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-700 text-sm truncate border border-gray-200 bg-gray-50 px-2 py-1 rounded">
                        {contact.group}
                      </span>
                      {contact.additionalCount && (
                        <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full">
                          +{contact.additionalCount}
                        </span>
                      )}
                    </div>
                  </div>
  
                  {/* Company Column */}
                  <div className="col-span-3 flex items-center space-x-2">
                    <span className="text-lg">{contact.companyIcon}</span>
                    <span className="text-gray-700 text-sm truncate">{contact.company}</span>
                  </div>
  
                  {/* Tags Column */}
                  <div className="col-span-3 flex items-center flex-wrap gap-1">
                    {contact.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor(tag)}`}
                      >
                        {tag}
                      </span>
                    ))}
                    {contact.tags.length > 2 && (
                      <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full">
                        +{contact.tags.length - 2}
                      </span>
                    )}
                    {contact.additionalCount && contact.tags.length <= 2 && (
                      <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full">
                        +{contact.additionalCount}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Border line with margins - starts from Groups column */}
                <div className="ml-6 mr-6 border-b border-gray-200"></div>
              </div>
            ))}
          </div>
        );
      });
    };
  
    return (
      <div className="flex-1 flex flex-col bg-white">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">Contacts</h1>
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm font-medium">729</span>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">Filter</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <ArrowUpDown className="w-4 h-4" />
                <span className="text-sm font-medium">Sort</span>
              </button>
            </div>
          </div>
        </div>
  
        {/* Table Header */}
        <div className="px-6 py-3 border-b border-gray-200 bg-gray-50 mt-7">
          <div className="grid grid-cols-12 gap-6 text-sm font-medium text-gray-700">
            <div className="col-span-4">Person</div>
            <div className="col-span-2">Groups</div>
            <div className="col-span-3">Company name</div>
            <div className="col-span-3">Tags</div>
          </div>
        </div>
  
        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto">
          {renderContactsBySection()}
        </div>
      </div>
    );
};
  
export default ContactsList;