import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';

const LoginScreen = () => {
  // 1. State Management for Inputs and Errors
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // For showing a loading state

  // 2. Form Submission Handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // 3. Basic Validation Check
    if (!email || !password) {
      setError('Please enter both your email/username and password.');
      return;
    }

    // Set loading state and simulate an API call
    setIsLoading(true);

    try {
      // ----------------------------------------------------
      // ** SIMULATED ASYNCHRONOUS LOGIN PROCESS **
      // Replace this with your actual backend API call (e.g., Axios or Fetch)
      // ----------------------------------------------------
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

      // Check simulated credentials (Replace with server response logic)
      if (email === 'user@zentrack.com' && password === 'password123') {
        console.log('Login Successful!', { email, password });
        // In a real app: Redirect user, store JWT token, update global state, etc.
        alert('Login Successful! Redirecting...'); 
      } else {
        // Simulate a failed login response
        setError('Login failed. Please check your credentials.');
      }
      
    } catch (apiError) {
      // Handle actual network or API errors here
      console.error('API Error:', apiError);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false); // Stop loading regardless of success or failure
    }
  };

  // Handler for the Sign Up button (no change needed here, just logging)
  const handleSignUp = () => {
    console.log('Navigating to Sign Up page...');
    // In a real app: Use React Router or similar navigation logic
  };

  return (
    // Outer container
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      
      {/* Login Card */}
      <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg">
        
        {/* Logo and Welcome Message (Unchanged) */}
        <h1 className="text-3xl font-bold text-center mb-1 tracking-wider text-gray-800">
          ZenTrack
        </h1>
        <p className="text-sm text-center text-gray-500 mb-8">
          Welcome back. Please login to your account.
        </p>

        {/* Error Message Display */}
        {error && (
          <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* Email or Username Input */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Email or Username"
              aria-label="Email or Username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Input handling
              disabled={isLoading}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg text-base focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition duration-150 ease-in-out disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              aria-label="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Input handling
              disabled={isLoading}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg text-base focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition duration-150 ease-in-out disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
          </div>
          
          {/* Forgot Password Link */}
          <a href="#" className="block text-right text-sm text-blue-500 hover:text-blue-600 transition">
            Forgot Password?
          </a>

          {/* Login Button (Blue) - Includes Loading State UI */}
          <button 
            type="submit" 
            disabled={isLoading} // Disable button while loading
            className="w-full py-3 bg-blue-500 text-white font-semibold text-lg rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out shadow-lg shadow-blue-300/50 mt-6 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading && (
              // Simple Tailwind spinner (requires custom keyframes or a library like `daisyui` for a perfect circle)
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            <span>{isLoading ? 'Logging In...' : 'Login'}</span>
          </button>
        </form>

        {/* Sign Up Prompt and Button (Unchanged) */}
        <div className="mt-10 mb-4 text-center">
          <p className="text-sm text-gray-400">Don't have an account?</p>
        </div>

        <button 
          type="button" 
          onClick={handleSignUp} 
          disabled={isLoading}
          className="w-full py-3 bg-green-300 text-gray-800 font-semibold text-lg rounded-lg hover:bg-green-400 transition duration-200 ease-in-out shadow-lg shadow-green-300/50 disabled:bg-green-200 disabled:cursor-not-allowed"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;