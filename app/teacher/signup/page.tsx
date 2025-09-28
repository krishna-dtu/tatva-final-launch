'use client';

import React, { useState } from 'react';
import { User, Mail, Lock, BookOpenText, School, Loader2, Mic, UserPlus } from 'lucide-react';

// Define the type for the props (essential for .tsx file)
interface SignupFormProps {
    onSignup: (name: string, email: string, password: string, institution: string) => void;
    isLoading: boolean;
    setMessage: (message: string) => void;
}

// --- SignupForm Component (You should ideally move this to components/TeacherPortal/SignupForm.tsx) ---

const SignupForm = ({ onSignup, isLoading, setMessage }: SignupFormProps) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [institution, setInstitution] = useState('');
    const [isListening, setIsListening] = useState(false);

    // Placeholder for future voice input for password
    const handleVoiceInput = () => {
        setIsListening(true);
        setMessage("Voice Input: Listening started for password...");

        // In the final implementation, this will call the Web Speech API or a cloud service
        setTimeout(() => {
            setIsListening(false);
            // Placeholder: Assume voice input captures some text
            const mockVoiceText = "newsecurepass123";
            setMessage(`Voice Input received: "${mockVoiceText}". Please fill in other details and click 'Sign Up'.`);
            // In a real app, you would set the password state here: setPassword(mockVoiceText);
        }, 3000);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(''); // Clear previous messages
        onSignup(name, email, password, institution);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 text-center">Teacher Sign Up</h2>
            <p className="text-center text-sm text-gray-500">Register to start managing your classes.</p>

            {/* Name Input */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                </label>
                <div className="relative">
                    <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                        placeholder="Dr. Priya Sharma"
                        disabled={isLoading}
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-400" />
                </div>
            </div>

            {/* Email Input */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                </label>
                <div className="relative">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                        placeholder="your.name@school.edu"
                        disabled={isLoading}
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-400" />
                </div>
            </div>

            {/* Institution Input */}
            <div>
                <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-1">
                    School / Institution Name
                </label>
                <div className="relative">
                    <input
                        id="institution"
                        name="institution"
                        type="text"
                        required
                        value={institution}
                        onChange={(e) => setInstitution(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                        placeholder="Rural Model School"
                        disabled={isLoading}
                    />
                    <School className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-400" />
                </div>
            </div>

            {/* Password Input and Voice Toggle */}
            <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Create Password
                </label>
                <div className="flex items-center space-x-2">
                    <div className="relative flex-grow">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-1 py-3 border border-gray-300 rounded-l-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                            placeholder="••••••••"
                            disabled={isLoading}
                        />
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-400" />
                    </div>
                    {/* Voice Input Button (Advanced Feature - Task 2) */}
                    <button
                        type="button"
                        onClick={handleVoiceInput}
                        disabled={isListening || isLoading}
                        className={`p-3 rounded-r-lg shadow-sm transition duration-150 ${
                            isListening
                                ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                                : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                        }`}
                        title="Voice Input (Speech-to-Text for Password)"
                    >
                        {isListening ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            <Mic className="h-5 w-5" />
                        )}
                    </button>
                </div>
                {isListening && (
                    <p className="mt-2 text-xs text-red-500 font-semibold">
                        Listening... Say your password clearly.
                    </p>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 disabled:opacity-50"
            >
                {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                    <UserPlus className="h-5 w-5" />
                )}
                {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>

            {/* Link to Login */}
            <p className="mt-4 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <a href="/teacher/login" className="font-medium text-green-600 hover:text-green-500">
                    Sign In here
                </a>
            </p>
        </form>
    );
};


// --- SignupTeacherPage (app/teacher/signup/page.tsx content) ---

const SignupTeacherPage = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(''); // State to hold success/error messages

    // Mock signup handler
    const handleSignup = (name: string, email: string, password: string, institution: string) => {
        setLoading(true);
        setMessage(''); // Clear previous message
        console.log('Attempting signup:', { name, email, password, institution });

        // Replace this with your actual Firebase/Backend API call
        setTimeout(() => {
            setLoading(false);
            if (email.includes('exists')) { // Mock error scenario (user exists)
                setMessage('Signup failed: This email is already registered.');
            } else {
                setMessage('Account created successfully! Please proceed to login.');
                // On success, typically navigate to a verification screen or login page
                console.log('Mock Signup Successful. Prompting user to log in...');
            }
        }, 2000); // Slightly longer timeout for signup process
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 sm:p-6 font-inter">
            {/* Application Header/Logo */}
            <div className="mb-8 flex items-center gap-2 text-indigo-600">
                <BookOpenText className="w-8 h-8" />
                <span className="text-3xl font-extrabold tracking-tight">Tatva Teacher</span>
            </div>

            {/* Signup Card Container */}
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
                {/* Feedback Message Box */}
                {message && (
                    <div className={`text-center p-3 mb-6 rounded-lg font-medium border ${message.includes('successfully') ? 'bg-green-100 text-green-800 border-green-300' : 'bg-red-100 text-red-800 border-red-300'}`}>
                        {message}
                    </div>
                )}
                <SignupForm onSignup={handleSignup} isLoading={loading} setMessage={setMessage} />
            </div>

            <p className="mt-8 text-center text-xs text-gray-400">
                Data security and privacy are our top priorities.
            </p>
        </div>
    );
};

export default SignupTeacherPage;
