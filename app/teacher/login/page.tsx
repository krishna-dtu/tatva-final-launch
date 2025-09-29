'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn, User, Lock, Mic, Loader2, BookOpenText } from 'lucide-react';

// --- LoginForm Component ---
interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  isLoading: boolean;
  setMessage: (message: string) => void;
}

const LoginForm = ({ onLogin, isLoading, setMessage }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleVoiceInput = () => {
    setIsListening(true);
    setMessage("Voice Input: Listening started...");

    setTimeout(() => {
      setIsListening(false);
      const mockVoiceText = "123456"; // placeholder
      setMessage(`Voice Input received: "${mockVoiceText}". Please click 'Sign In' to proceed.`);
      // Optionally: setPassword(mockVoiceText);
    }, 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    onLogin(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 text-center">Teacher Sign In</h2>
      <p className="text-center text-sm text-gray-500">Access your class management dashboard.</p>

      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
        <div className="relative">
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            placeholder="your.name@school.edu"
            disabled={isLoading}
          />
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-400" />
        </div>
      </div>

      {/* Password Input */}
      <div className="relative">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <div className="flex items-center space-x-2">
          <div className="relative flex-grow">
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-1 py-3 border border-gray-300 rounded-l-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              placeholder="••••••••"
              disabled={isLoading}
            />
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-400" />
          </div>
          <button
            type="button"
            onClick={handleVoiceInput}
            disabled={isListening || isLoading}
            className={`p-3 rounded-r-lg shadow-sm transition duration-150 ${
              isListening ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' : 'bg-indigo-500 hover:bg-indigo-600 text-white'
            }`}
            title="Voice Input (Speech-to-Text for Password)"
          >
            {isListening ? <Loader2 className="h-5 w-5 animate-spin" /> : <Mic className="h-5 w-5" />}
          </button>
        </div>
        {isListening && <p className="mt-2 text-xs text-red-500 font-semibold">Listening... Say your password clearly.</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 disabled:opacity-50"
      >
        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <LogIn className="h-5 w-5" />}
        {isLoading ? 'Signing In...' : 'Sign In'}
      </button>

      {/* Link to Signup */}
      <p className="mt-4 text-center text-sm text-gray-600">
        New Teacher?{' '}
        <a href="/teacher/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
          Create an Account
        </a>
      </p>
    </form>
  );
};

// --- Main Login Page ---
const LoginTeacherPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = (email: string, password: string) => {
    setLoading(true);
    setMessage('');

    setTimeout(() => {
      setLoading(false);
      if (email.includes('error')) {
        setMessage('Login failed. Please check your credentials and try again.');
      } else {
        setMessage('Login successful! Redirecting to dashboard...');
        router.push('/teacher/dashboard'); // <-- redirect works now
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 sm:p-6 font-inter">
      <div className="mb-8 flex items-center gap-2 text-indigo-600">
        <BookOpenText className="w-8 h-8" />
        <span className="text-3xl font-extrabold tracking-tight">Tatva Teacher</span>
      </div>

      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
        {message && (
          <div className={`text-center p-3 mb-6 rounded-lg font-medium border ${
            message.includes('successful')
              ? 'bg-green-100 text-green-800 border-green-300'
              : 'bg-yellow-100 text-yellow-800 border-yellow-300'
          }`}>
            {message}
          </div>
        )}
        <LoginForm onLogin={handleLogin} isLoading={loading} setMessage={setMessage} />
      </div>

      <p className="mt-8 text-center text-xs text-gray-400">Designed for low-bandwidth environments.</p>
    </div>
  );
};

export default LoginTeacherPage;
