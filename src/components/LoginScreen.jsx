

import React, { useState } from 'react';

// Dummy credentials for demo purposes
const DUMMY_USERNAME = "admin";
const DUMMY_PASSWORD = "password123";

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Check credentials against dummy values
    if (username === DUMMY_USERNAME && password === DUMMY_PASSWORD) {
      onLogin(true);
    } else {
      setError('Invalid username or password. Try admin/password123');
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Left side with Financial Tools branding */}
      <div className="flex-1 flex flex-col items-center justify-center text-white">
        <div className="max-w-md px-8">
          <h1 className="text-4xl font-bold mb-6 text-center">
            <span className="text-blue-400">Financial</span> <span className="text-gray-100">Workbench</span>
          </h1>
          <p className="text-gray-300 text-center mb-12">Enterprise-grade financial analysis platform</p>
          
          <div className="border border-gray-700 rounded-lg p-8 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-sm shadow-xl">
            <h2 className="text-2xl font-semibold mb-6 text-blue-300">Financial Tools</h2>
            <ul className="space-y-5">
              <li className="flex items-start">
                <div className="mr-3 bg-blue-500 rounded-full p-1 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-gray-200">Cash flow forecasting with AI-powered predictions</span>
              </li>
              <li className="flex items-start">
                <div className="mr-3 bg-blue-500 rounded-full p-1 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-gray-200">Real-time AR/AP aging analysis with risk scoring</span>
              </li>
              <li className="flex items-start">
                <div className="mr-3 bg-blue-500 rounded-full p-1 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-gray-200">Budget variance tracking with automated insights</span>
              </li>
              <li className="flex items-start">
                <div className="mr-3 bg-blue-500 rounded-full p-1 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-gray-200">Custom financial report generation with one click</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Right side with login form */}
      <div className="flex-1 flex flex-col items-center justify-center bg-white">
        <div className="max-w-md w-full px-8">
          {/* InfraHive Logo */}
          <div className="mb-7 flex justify-center">
            <img 
              src="../../public/assets/images/infrahive.png" 
              alt="InfraHive Logo" 
              className="h-12"
              onError={(e) => {
                console.error("Error loading logo", e);
                e.target.onerror = null;
                e.target.style.display = 'none';
              }} 
            />
          </div>
          
          <div className="bg-white rounded-lg shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Welcome Back</h2>
            <p className="text-gray-500 text-center mb-8">Sign in to access your financial dashboard</p>
            
            {error && (
              <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded text-sm">
                <div className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{error}</span>
                </div>
              </div>
            )}
            
            <form onSubmit={handleLogin}>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Sign in
              </button>
            </form>
            
            <div className="mt-6 text-center text-xs text-gray-500">
              <p>Demo credentials: admin / password123</p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              &copy; 2025 InfraHive Financial Services. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;