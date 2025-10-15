import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Menu, X, Home, BookOpen, TrendingUp } from 'lucide-react'; 

// --- Message Component ---
const Message = ({ text, sender }) => {
  const isUser = sender === 'You';
  const bubbleClasses = isUser
    ? 'bg-blue-600 text-white rounded-br-none ml-auto'
    : 'bg-gray-700 text-white rounded-bl-none mr-auto';
  const containerClasses = isUser ? 'flex justify-end' : 'flex justify-start';
  const avatarContainerClasses = isUser
    ? 'order-2 ml-2 bg-blue-500'
    : 'order-1 mr-2 bg-green-500';
  const avatarInitial = isUser ? 'Y' : 'A';

  return (
    <div className={`flex items-start mb-4 ${containerClasses}`}>
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full overflow-hidden ${avatarContainerClasses}
                    flex items-center justify-center text-sm font-bold text-white shadow-md`}
      >
        {avatarInitial}
      </div>
      <div className={`p-3 max-w-[70%] rounded-xl shadow-md ${bubbleClasses}`}>
        <p className="text-sm">{text}</p>
        {!isUser && (
          <span className="block text-xs text-gray-400 mt-1">{sender}</span>
        )}
      </div>
    </div>
  );
};

// --- Sidebar Component ---
const Sidebar = ({ isOpen, onClose }) => {
  const navItems = [
    { name: 'Dashboard', icon: Home, action: () => console.log('Navigate to Dashboard') },
    { name: 'Mood Trend', icon: TrendingUp, action: () => console.log('Open Mood Trend') },
    { name: 'Resources', icon: BookOpen, action: () => console.log('Open Resources') },
    { name: 'Close Chat', icon: X, action: onClose, isClose: true },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out 
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
                  onClose();
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

// --- ChatHeader Component ---
const ChatHeader = ({ onMenuClick }) => (
  <div className="flex items-center p-4 bg-gray-800 text-white shadow-md flex-shrink-0">
    <button
      onClick={onMenuClick}
      className="p-1 rounded-full hover:bg-gray-700 transition-colors lg:hidden"
      aria-label="Open menu"
    >
      <Menu className="w-6 h-6 text-gray-300" />
    </button>
    <h1 className="flex-grow text-center text-lg font-semibold lg:text-left lg:ml-2">
      Mental Health Chatbot
    </h1>
    <div className="w-6 h-6 opacity-0"></div>
  </div>
);

// --- ChatInput Component ---
const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center p-4 bg-gray-800 shadow-lg flex-shrink-0"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        className="flex-grow p-3 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-3"
      />
      <button
        type="submit"
        disabled={!message.trim()}
        className="p-3 bg-blue-600 rounded-full text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:bg-gray-500"
        aria-label="Send message"
      >
        <Send className="w-6 h-6" />
      </button>
    </form>
  );
};

// --- Main ChatScreen Component ---
const ChatScreen = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How can I assist you today with your mental health journey?', sender: 'Chatbot' },
    { id: 2, text: "I've been feeling overwhelmed lately with work and personal life. Any advice?", sender: 'You' },
    { id: 3, text: "It's common to feel overwhelmed. Let's break it down. Have you tried any stress-management techniques before?", sender: 'Chatbot' },
  ]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text) => {
    const newMessage = { id: messages.length + 1, text, sender: 'You' };
    setMessages((prev) => [...prev, newMessage]);

    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: `I've noted that you asked: "${text}". I recommend exploring our resource section! (Simulated response)`,
        sender: 'Chatbot',
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1500);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-900 text-white">
      {/* Sidebar (collapsible on mobile, visible on large screens) */}
      <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Chat Section */}
      <div className="flex flex-col flex-1">
        <ChatHeader onMenuClick={() => setIsMenuOpen(true)} />

        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((msg) => (
            <Message key={msg.id} text={msg.text} sender={msg.sender} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatScreen;
