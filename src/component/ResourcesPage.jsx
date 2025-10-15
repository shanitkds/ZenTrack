import React, { useState } from 'react';
import {
  ArrowLeft,
  Search,
  User,
  BriefcaseMedical,
  Video,
  Users,
  MessageSquare,
  Newspaper,
  Menu,
  Home,
  TrendingUp,
  X,
} from 'lucide-react';

// --- Sidebar Component ---
const Sidebar = ({ isOpen, onClose }) => {
  const navItems = [
    { name: 'Dashboard', icon: Home, action: () => console.log('Dashboard clicked') },
    { name: 'Mood Tracker', icon: TrendingUp, action: () => console.log('Mood Tracker clicked') },
    { name: 'Chat', icon: MessageSquare, action: () => console.log('Chat clicked') },
    { name: 'Resources', icon: Newspaper, action: () => console.log('Resources clicked') },
    { name: 'Close Menu', icon: X, action: onClose, isClose: true },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 lg:static`}
      >
        <div className="p-5 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">ZenTrack Menu</h2>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => {
                  item.action();
                  if (item.isClose) onClose();
                }}
                className={`flex items-center w-full p-3 rounded-lg text-sm font-medium transition-colors ${
                  item.isClose
                    ? 'text-red-400 hover:bg-red-900/50'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};

// --- Resources Page ---
const ResourcesPage = ({ onBackClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const resourceCategories = [
    { name: 'Personal Mentor', icon: User, color: 'text-blue-500', bgColor: 'bg-blue-100' },
    { name: 'Doctor Consultation', icon: BriefcaseMedical, color: 'text-green-500', bgColor: 'bg-green-100' },
    { name: 'Therapy Services', icon: Users, color: 'text-purple-500', bgColor: 'bg-purple-100' },
    { name: 'Online Communities', icon: MessageSquare, color: 'text-teal-500', bgColor: 'bg-teal-100' },
    { name: 'Videos', icon: Video, color: 'text-yellow-500', bgColor: 'bg-yellow-100' },
    { name: 'Articles', icon: Newspaper, color: 'text-red-500', bgColor: 'bg-red-100' },
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50 text-gray-800">
      {/* Sidebar Section */}
      <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-center p-4 bg-white shadow-md flex-shrink-0">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors lg:hidden"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>

          <h1 className="flex-grow text-center text-xl font-semibold lg:text-left">
            Resources
          </h1>

          <button
            onClick={onBackClick}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Main Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          {/* Categories */}
          <div className="max-w-5xl mx-auto">
            <h2 className="text-lg font-semibold mb-4 text-center md:text-left">
              Categories
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {resourceCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.name}
                    className="flex flex-col items-center justify-center p-5 bg-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
                  >
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center mb-2 ${category.bgColor}`}
                    >
                      <Icon className={`w-7 h-7 ${category.color}`} />
                    </div>
                    <span className="text-sm font-medium text-gray-700 text-center">
                      {category.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;
