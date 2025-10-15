import React, { useState } from 'react';
import { Home, TrendingUp, MessageSquare, Newspaper, X, Menu } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, PieChart, Pie, Cell, RadialBarChart, RadialBar
} from 'recharts';

// --- Sidebar Component ---
const Sidebar = ({ isOpen, onClose, onNavigate }) => {
  const navItems = [
    { name: 'Dashboard', icon: Home, key: 'dashboard' },
    { name: 'Mood Tracker', icon: TrendingUp, key: 'moodTracker' },
    { name: 'Chat', icon: MessageSquare, key: 'chat' },
    { name: 'Resources', icon: Newspaper, key: 'resources' },
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
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static`}
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
                  if (item.isClose) onClose();
                  if (item.key) onNavigate(item.key);
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

// --- Dashboard Component with Recharts ---
const Dashboard = () => {
  const dailyMoodData = [
    { date: 'Oct 1', moodScore: 3 },
    { date: 'Oct 2', moodScore: 4 },
    { date: 'Oct 3', moodScore: 2 },
    { date: 'Oct 4', moodScore: 5 },
    { date: 'Oct 5', moodScore: 3 },
    { date: 'Oct 6', moodScore: 4 },
    { date: 'Oct 7', moodScore: 5 },
  ];

  const moodFrequencyData = [
    { mood: 'Happy', count: 10 },
    { mood: 'Sad', count: 5 },
    { mood: 'Anxious', count: 7 },
    { mood: 'Neutral', count: 8 },
  ];

  const moodDistributionData = [
    { name: 'Happy', value: 40 },
    { name: 'Sad', value: 20 },
    { name: 'Neutral', value: 25 },
    { name: 'Anxious', value: 15 },
  ];

  const positiveEmotionData = [
    { name: 'Positive', value: 70 },
  ];

  const COLORS = ['#4ade80', '#f87171', '#fbbf24', '#60a5fa'];

  return (
    <div className="flex flex-col p-6 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800">Mental Health Dashboard</h1>

      {/* Line Chart - Daily Mood */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-2">Daily Mood</h2>
        <LineChart width={700} height={250} data={dailyMoodData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 5]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="moodScore" stroke="#60a5fa" strokeWidth={3} activeDot={{ r: 6 }} />
        </LineChart>
      </div>

      {/* Bar Chart - Mood Frequency */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-2">Mood Frequency</h2>
        <BarChart width={700} height={250} data={moodFrequencyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mood" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#4ade80" />
        </BarChart>
      </div>

      {/* Pie Chart - Mood Distribution */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-2">Mood Distribution (Last 30 Days)</h2>
        <PieChart width={400} height={250}>
          <Pie
            data={moodDistributionData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {moodDistributionData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* Radial Bar Chart - Positive Emotion % */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-2">Positive Emotion %</h2>
        <RadialBarChart
          width={300}
          height={250}
          cx="50%"
          cy="50%"
          innerRadius="20%"
          outerRadius="100%"
          barSize={20}
          data={positiveEmotionData}
          startAngle={180}
          endAngle={-180}
        >
          <RadialBar
            minAngle={15}
            background
            clockWise
            dataKey="value"
            fill="#4ade80"
          />
          <Tooltip />
        </RadialBarChart>
      </div>
    </div>
  );
};

// --- Main App Layout ---
const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState('dashboard'); // dashboard default

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'moodTracker':
        return <div>Mood Tracker Page (Add your MoodTracker component here)</div>;
      case 'chat':
        return <div>Chat Page (Add your Chat component here)</div>;
      case 'resources':
        return <div>Resources Page (Add your Resources component here)</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={(pageKey) => {
          setActivePage(pageKey);
          setIsMenuOpen(false);
        }}
      />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center p-4 bg-white shadow-md flex-shrink-0">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors lg:hidden"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="flex-grow text-center text-xl font-semibold lg:text-left">
            {activePage === 'dashboard' ? 'Dashboard' : activePage.charAt(0).toUpperCase() + activePage.slice(1)}
          </h1>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">{renderPage()}</div>
      </div>
    </div>
  );
};

export default App;
