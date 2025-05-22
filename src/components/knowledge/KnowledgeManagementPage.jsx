
import React, { useState, useRef, useEffect } from 'react';
import { Search, Plus, Home, User, BookOpen, LayoutGrid, X, Settings } from 'lucide-react';

// Import all images from the knowledge folder
import img1 from '../knowledge/1.png';
import img2 from '../knowledge/2.png';
import img3 from '../knowledge/3.png';
import img4 from '../knowledge/4.png';
import img5 from '../knowledge/5.png';
import img6 from '../knowledge/6.png';
import img7 from '../knowledge/7.png';
import img8 from '../knowledge/8.png';
import img9 from '../knowledge/9.png';
import img10 from '../knowledge/10.png';
import img11 from '../knowledge/11.png';
import img12 from '../knowledge/12.png';
import img13 from '../knowledge/13.png';
import img14 from '../knowledge/14.png';
import img15 from '../knowledge/15.png';
import img18 from '../knowledge/18.png';
import img19 from '../knowledge/19.png';

// Map the imported images to their IDs
const imageMap = {
  '1': img1,
  '2': img2,
  '3': img3,
  '4': img4,
  '5': img5,
  '6': img6,
  '7': img7,
  '8': img8,
  '9': img9,
  '10': img10,
  '11': img11,
  '12': img12,
  '13': img13,
  '14': img14,
  '15': img15,
  '18': img18,
  '19': img19,
};

// Updated knowledgeManagement array with imported images
const knowledgeManagement = [
  { id: 1, name: "Airtable", image: imageMap['1'] },
  { id: 2, name: "Tally API", image: imageMap['2'] },
  { id: 3, name: "Salesforce", image: imageMap['3'] },
  { id: 4, name: "SAP", image: imageMap['4'] },
  { id: 5, name: "Microsoft Dynamic 360", image: imageMap['5'] },
  { id: 6, name: "Oracle Suite", image: imageMap['6'] },
  { id: 7, name: "Confluence (Cloud)", image: imageMap['7'] },
  { id: 8, name: "Confluence (Datacenter)", image: imageMap['7'] },
  { id: 9, name: "Tableau", image: imageMap['8'] },
  { id: 10, name: "Google Drive", image: imageMap['9'] },
  { id: 11, name: "Microsoft One Drive", image: imageMap['10'] },
  { id: 12, name: "Microsoft Azure", image: imageMap['11'] },
  { id: 13, name: "Google Cloud Platform (GCP)", image: imageMap['12'] },
  { id: 14, name: "Microsoft Teams", image: imageMap['13'] },
  { id: 15, name: "Gmail", image: imageMap['14'] },
  { id: 16, name: "Microsoft Outlook", image: imageMap['15'] },
  { id: 17, name: "Slack", image: imageMap['18'] },
  { id: 18, name: "Jira (Cloud)", image: imageMap['19'] },
  { id: 19, name: "Jira (Datacenter)", image: imageMap['19'] },
];

// Content array for dialog
const contentArray = [
  "Index user permissions associated with documents",
  "Content and permissions updates sync multiple times every hour after initial indexing",
  "Search for issues, stories, tasks, epics, dashboards, and filters",
];

// Custom components that mimic Material UI
const Avatar = ({ src, className }) => (
  <div className={`rounded-full overflow-hidden ${className}`}>
    <img src={src} alt="User" className="w-full h-full object-cover" />
  </div>
);

const IconButton = ({ className, onClick, children }) => (
  <button 
    className={`p-2 rounded-full transition-colors ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

const SearchInput = () => (
  <div className="relative w-full">
    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
      <Search className="h-5 w-5 text-gray-500" />
    </div>
    <input
      type="text"
      className="w-full py-2 pl-10 pr-3 rounded-full border border-gray-300 shadow-md bg-white text-gray-900 focus:outline-none"
      placeholder="Search for anything"
    />
  </div>
);

const Dialog = ({ open, onClose, children, fullScreen, maxWidth }) => {
  if (!open) return null;
  
  const dialogClasses = fullScreen 
    ? "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-start pl-[54px]"
    : "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center";
  
  const contentClasses = fullScreen
    ? "bg-transparent flex justify-center w-full"
    : `bg-white rounded-lg p-5 relative ${maxWidth === 'sm' ? 'max-w-md w-full mx-4' : 'w-full max-w-4xl mx-4'}`;
  
  return (
    <div className={dialogClasses} onClick={onClose}>
      <div 
        className={contentClasses}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

// Dialog Components
const ManagementDialog = ({ selectedApp, handleInviteDialog, contentArray }) => (
  <div className="bg-gray-100 rounded-t-lg p-6 w-full">
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-4">
        <img src={selectedApp.image} alt={selectedApp.name} className="w-12 h-12" />
        <h2 className="text-xl font-semibold">{selectedApp.name}</h2>
      </div>
      <button 
        className="py-1 px-3 rounded border border-gray-300 hover:bg-gray-100 text-xs flex items-center gap-x-1"
        onClick={handleInviteDialog}
      >
        Invite
      </button>
    </div>
    <div className="space-y-4">
      {contentArray.map((content, index) => (
        <p key={index} className="text-sm text-gray-600">{content}</p>
      ))}
    </div>
  </div>
);

// Invite Dialog Component
const InviteDialog = ({ handleInviteDialog }) => (
  <div className="p-5 pt-9 px-6 relative">
    <IconButton
      className="absolute top-1 right-1 p-1"
      onClick={handleInviteDialog}
    >
      <X className="w-4 h-4" />
    </IconButton>
    <div className="flex justify-between items-center pb-2">
      <p className="font-normal text-2xl text-black">Invite</p>
      <Settings className="w-5 h-5" />
    </div>
    <div className="flex flex-col gap-y-1">
      <p className="text-sm text-gray-500">
        Choose who can view and comment on deployments
      </p>
      <input 
        type="text"
        className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none"
        placeholder="Add people or teams"
      />
    </div>
    <div className="pt-4">
      <p className="font-medium text-sm">People with access</p>
      <div className="flex items-center gap-x-1 mt-1">
        <div
          className="w-8 h-8 rounded-full"
          style={{
            background: "linear-gradient(to bottom right, #00eaff, #ff00f7)",
          }}
        />
        <p className="text-sm leading-none">
          hereiskunalverma's projects team members
        </p>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleInviteDialog}
          className="border-0 mt-5 px-6 py-2 rounded text-black bg-gray-200 text-sm"
        >
          Save
        </button>
      </div>
    </div>
  </div>
);

// Main Component
const KnowledgeManagementPage = () => {
  const [div1Height, setDiv1Height] = useState("83px");
  const [rightGridWidth, setRightGridWidth] = useState("");
  const [selectedApp, setSelectedApp] = useState({
    id: 1,
    name: "Airtable",
    image: imageMap['1'],
  });
  const [openApp, setOpenApp] = useState(false);
  const [inviteOpen, setOpenInvite] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  
  const headerRef = useRef();
  const rightGridRef = useRef();

  const handleAppDialog = () => {
    setOpenApp(!openApp);
  };

  const handleInviteDialog = () => {
    setOpenInvite(!inviteOpen);
  };

  useEffect(() => {
    // Update dimensions
    const updateDimensions = () => {
      if (headerRef.current) {
        setDiv1Height(`${headerRef.current.clientHeight}px`);
      }
      if (rightGridRef.current) {
        setRightGridWidth(`${rightGridRef.current.clientWidth}px`);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  return (
    <div className="flex-1 h-full bg-white overflow-hidden">
      <div className="h-full relative border-l border-gray-200 overflow-auto">
        {/* Header with search */}
        <div 
          ref={headerRef}
          className="py-4 relative w-full flex justify-center bg-white border-b border-gray-200"
        >
          <div className="w-2/5">
            <SearchInput />
          </div>
          
        </div>
        
        {/* Main grid layout */}
        <div 
          className="bg-white flex" 
          style={{ height: `calc(100vh - ${div1Height})` }}
        >
          {/* Left column - Title */}
          <div className="w-1/5 p-8 h-full">
            <p className="text-2xl font-bold">Knowledge Management</p>
          </div>
          
          {/* Right column - Content */}
          <div 
            ref={rightGridRef}
            className="w-4/5 p-8 pr-10 overflow-auto flex h-full flex-col gap-y-8"
          >
            {/* Title and Add App Button */}
            <div className="flex justify-between items-center">
              <p className="text-2xl font-medium">Apps</p>
              <button className="flex items-center gap-x-2 bg-gray-200 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors">
                <span className="text-xl font-light">+</span>
                <span>Add app</span>
              </button>
            </div>
            
            {/* Description */}
            <p className="text-base text-gray-600">
              InfraHive works best when you can search across all the tools you
              and your team use every day. Connect all the tools you need by
              clicking on each and following the steps shown.
            </p>
            
            {/* App Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {knowledgeManagement.map((app) => (
                <div 
                  key={app.id}
                  onClick={() => {
                    setSelectedApp(app);
                    handleAppDialog();
                  }}
                  className="border border-gray-200 rounded-lg h-[110px] flex items-center justify-start px-4 cursor-pointer bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <img src={app.image} alt={app.name} className="w-14 h-14" />
                    <p className="text-base font-medium text-gray-800">{app.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* App Details Dialog */}
      <Dialog
        fullScreen
        open={openApp}
        onClose={handleAppDialog}
      >
        <div
          className="bg-gray-100 h-full flex justify-center"
          onClick={handleAppDialog}
          style={{
            width: rightGridWidth,
            marginTop: div1Height,
            height: `calc(100vh - ${div1Height})`,
            overflow: "auto",
          }}
        >
          <ManagementDialog
            selectedApp={selectedApp}
            handleInviteDialog={handleInviteDialog}
            contentArray={contentArray}
          />
        </div>
      </Dialog>
      
      {/* Invite Dialog */}
      <Dialog
        maxWidth="sm"
        open={inviteOpen}
        onClose={handleAppDialog}
      >
        <InviteDialog handleInviteDialog={handleInviteDialog} />
      </Dialog>
    </div>
  );
};

export default KnowledgeManagementPage;