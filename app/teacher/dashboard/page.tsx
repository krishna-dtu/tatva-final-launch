'use client';

import React, { useState } from 'react';
import { LayoutDashboard, Users, Bell, Plus, Settings, BookOpen, Clock, BarChart, FileText, CheckCircle, LogOut, MessageSquare, CornerUpLeft, Zap, Globe, Lock, Code, Languages, Save, Rocket } from 'lucide-react';

// --- Mock Data & Interfaces ---
interface ClassSummary {
    id: number;
    name: string;
    students: number;
    averageScore: number;
    lastActive: string;
    recentTopic: string;
}

interface PendingReport {
    id: number;
    title: string;
    class: string;
    status: 'Pending' | 'Urgent';
}

interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    value: number;
    color: string;
    shadow: string;
    glow: string; // NEW: For the space-themed card effect
}

const initialClasses: ClassSummary[] = [
    { id: 1, name: 'Grade 5: Mathematics', students: 32, averageScore: 78, lastActive: '2 days ago', recentTopic: 'Ratios and Proportions Quiz' },
    { id: 2, name: 'Grade 6: Science', students: 28, averageScore: 85, lastActive: '5 hours ago', recentTopic: 'Cell Structure Assignment' },
    { id: 3, name: 'Grade 7: History', students: 30, averageScore: 81, lastActive: '1 day ago', recentTopic: 'The Mughal Empire Lesson' },
];

const mockPendingReports: PendingReport[] = [
    { id: 101, title: 'Chapter 4 Quiz: Needs Grading', class: 'Grade 5: Mathematics', status: 'Urgent' },
    { id: 102, title: 'Diwali Challenge Submissions', class: 'Grade 6: Science', status: 'Pending' },
    { id: 103, title: 'Term 1 Project Reviews', class: 'Grade 5: Mathematics', status: 'Pending' },
];

const mockLanguages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'mr', name: 'Marathi' },
    { code: 'bn', name: 'Bengali' },
];

// --- MODAL COMPONENTS (Styling updated for visual consistency) ---

// 1. Password Change Modal (Multi-step flow)
const ChangePasswordModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const [step, setStep] = useState(1);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [oldPassword, setOldPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleSendOtp = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('OTP requested for password change.');
        setStep(2);
    };

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        if (otp === '123456' && newPassword.length >= 6) {
            setStatus('success');
            setTimeout(() => onClose(), 2000);
        } else {
            setStatus('error');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 font-inter">
            <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl space-y-4 border border-indigo-200">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-800">Change Password</h3>
                    <button onClick={onClose} className="p-2 text-gray-500 hover:text-gray-700 rounded-full bg-gray-100"><CornerUpLeft className="h-5 w-5" /></button>
                </div>

                {status === 'success' ? (
                    <div className="p-4 bg-green-100 text-green-700 rounded-xl text-center font-medium border border-green-300">
                        <CheckCircle className="h-6 w-6 mx-auto mb-2" />
                        Password changed successfully!
                    </div>
                ) : (
                    <form onSubmit={step === 1 ? handleSendOtp : handlePasswordChange} className="space-y-4">
                        {step === 1 && (
                            <>
                                <label className="block text-sm font-medium text-gray-700">Verify Identity</label>
                                <input type="password" placeholder="Enter Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500" required />
                                <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-semibold shadow-md transition">
                                    Send Verification Code
                                </button>
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <p className="text-sm text-gray-600">Verification code sent to your registered email.</p>
                                <input type="text" placeholder="Enter 6-digit OTP (Mock: 123456)" value={otp} onChange={(e) => setOtp(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500" required maxLength={6} />
                                <input type="password" placeholder="Enter New Password (min 6 characters)" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500" required minLength={6} />
                                {status === 'error' && <p className="text-red-500 text-sm">Error: Invalid OTP or Password too short.</p>}
                                <button type="submit" className="w-full py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 font-semibold shadow-md transition">
                                    <Lock className="h-5 w-5 inline mr-2" /> Change Password
                                </button>
                            </>
                        )}
                    </form>
                )}
            </div>
        </div>
    );
};

// 2. Change Language Modal
const ChangeLanguageModal = ({ isOpen, onClose, currentLang, onSelectLang }: { isOpen: boolean, onClose: () => void, currentLang: string, onSelectLang: (lang: string) => void }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 font-inter">
            <div className="bg-white w-full max-w-sm p-6 rounded-2xl shadow-2xl space-y-4 border border-indigo-200">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Languages className="h-6 w-6 text-indigo-500" /> Select Language
                </h3>
                
                <div className="space-y-2">
                    {mockLanguages.map(lang => (
                        <button
                            key={lang.code}
                            onClick={() => { onSelectLang(lang.code); onClose(); }}
                            className={`w-full text-left p-3 rounded-xl border flex justify-between items-center transition ${
                                currentLang === lang.code ? 'bg-indigo-50 border-indigo-500 text-indigo-700 font-semibold shadow-sm' : 'bg-white border-gray-200 text-gray-800 hover:bg-gray-50'
                            }`}
                        >
                            {lang.name}
                            {currentLang === lang.code && <CheckCircle className="h-5 w-5" />}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};


// 3. Simple Modal for other settings (e.g., Profile)
const SimpleActionModal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 font-inter">
            <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl space-y-4 border border-indigo-200">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                    <button onClick={onClose} className="p-2 text-gray-500 hover:text-gray-700 rounded-full bg-gray-100"><CornerUpLeft className="h-5 w-5" /></button>
                </div>
                {children}
            </div>
        </div>
    );
};

// --- TAB COMPONENTS (Styled) ---

// 1. MODAL FOR CLASS CREATION (Simplified to the original one since it's used inside the main component)
const CreateClassModal = ({ isOpen, onClose, onCreate }: { isOpen: boolean, onClose: () => void, onCreate: (name: string, grade: string) => void }) => {
    const [className, setClassName] = useState('');
    const [gradeLevel, setGradeLevel] = useState('5');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (className && gradeLevel) {
            onCreate(className, gradeLevel);
            setClassName('');
            setGradeLevel('5');
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 font-inter">
            <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl space-y-4 border border-indigo-200">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-800">Create New Class</h3>
                    <button onClick={onClose} className="p-2 text-gray-500 hover:text-gray-700 rounded-full bg-gray-100">
                        <CornerUpLeft className="h-5 w-5" />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Class Name (e.g., Grade 7 History)</label>
                        <input
                            id="name"
                            type="text"
                            value={className}
                            onChange={(e) => setClassName(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500"
                            required
                            placeholder="Enter class name"
                        />
                    </div>
                    <div>
                        <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">Grade Level</label>
                        <select
                            id="grade"
                            value={gradeLevel}
                            onChange={(e) => setGradeLevel(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                            required
                        >
                            <option value="5">Grade 5</option>
                            <option value="6">Grade 6</option>
                            <option value="7">Grade 7</option>
                            <option value="8">Grade 8</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 py-3 bg-green-600 text-white font-bold rounded-xl shadow-md hover:bg-green-700 transition duration-200"
                    >
                        <Plus className="h-5 w-5" />
                        Save Class
                    </button>
                </form>
            </div>
        </div>
    );
};


// 2. Dashboard Tab Content (Space Theme Applied)
const DashboardTab = ({ classes }: { classes: ClassSummary[] }) => {
    const totalStudents = classes.reduce((sum, cls) => sum + cls.students, 0);

    const StatCard = ({ icon, title, value, color, shadow, glow }: StatCardProps) => (
        <div className={`relative flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden ${glow} p-6`}>
            {/* Subtle top bar glow */}
            <div className={`absolute top-0 left-0 right-0 h-1 ${color} opacity-70`}></div>
            
            <div className={`p-4 rounded-full ${color} text-white mb-3 shadow-md`}>
                {icon}
            </div>
            <p className="text-3xl font-extrabold text-gray-800">{value}</p>
            <p className="text-sm font-medium text-gray-500 mt-1 text-center">{title}</p>
        </div>
    );

    return (
        <section className="space-y-8">
            <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
                <Rocket className="h-5 w-5 text-indigo-500" />
                Mission Control: Teacher Overview
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
                <StatCard 
                    icon={<Users className="h-6 w-6" />} 
                    title="Students Enrolled" 
                    value={totalStudents} 
                    color="bg-indigo-500"
                    shadow="shadow-indigo-200"
                    glow="shadow-md"
                />
                <StatCard 
                    icon={<Clock className="h-6 w-6" />} 
                    title="Pending Reviews" 
                    value={mockPendingReports.length} 
                    color="bg-red-500"
                    shadow="shadow-red-200"
                    glow="shadow-md"
                />
            </div>

            <h3 className="text-lg font-semibold text-gray-800 border-l-4 border-indigo-400 pl-3">Your Active Class Planets</h3>
            {classes.map((cls) => (
                <div 
                    key={cls.id} 
                    className="p-4 bg-white rounded-xl shadow-md border border-gray-100 flex justify-between items-center active:scale-[0.99] transition transform hover:shadow-lg hover:border-indigo-300"
                >
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800">{cls.name}</h4>
                        <p className="text-sm text-gray-500">{cls.students} Enrolled Learners</p>
                    </div>
                    <div className="text-right">
                         <span className={`text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ${cls.averageScore > 80 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {cls.averageScore}% Avg
                        </span>
                    </div>
                </div>
            ))}
        </section>
    );
};

// 3. Classes Tab Content (Space Theme Applied)
const ClassesTab = ({ classes, setIsModalOpen }: { classes: ClassSummary[], setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    return (
        <section className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Galaxy Class Management</h2>

            <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition duration-200 text-base"
            >
                <Plus className="h-5 w-5" />
                Launch New Class Planet
            </button>

            <div className="space-y-3">
                {classes.map(cls => (
                    <a 
                        key={cls.id} 
                        href={`/teacher/(portal)/classes/${cls.id}`} 
                        className="block p-4 bg-white rounded-xl shadow-md border border-gray-100 active:scale-[0.98] transition transform hover:border-indigo-400 border-l-4 border-l-indigo-500"
                    >
                        <div className="flex justify-between items-center">
                            <h4 className="text-lg font-semibold text-gray-800">{cls.name}</h4>
                            <span className="text-sm font-medium text-indigo-500">Explore →</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                            <Code className="h-4 w-4 inline mr-1 text-gray-400" /> **Latest Mission:** {cls.recentTopic}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">Last activity: {cls.lastActive}</p>
                    </a>
                ))}
            </div>
        </section>
    );
};

// 4. Reports Tab Content (Space Theme Applied)
const ReportsTab = () => {
    return (
        <section className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Pending Review Missions</h2>
            <p className="text-gray-600">Tasks requiring your attention to keep the learning journey flowing.</p>

            <div className="space-y-3">
                {mockPendingReports.map(report => (
                    <div key={report.id} className="p-4 bg-white rounded-xl shadow-md border-l-4 border-red-500 flex justify-between items-start hover:shadow-lg transition">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <FileText className="h-5 w-5 text-red-500" />
                                <h4 className="font-semibold text-gray-800 truncate">{report.title}</h4>
                            </div>
                            <p className="text-xs text-gray-500 mt-1 ml-7">Class: {report.class}</p>
                        </div>
                        <button className={`ml-4 text-sm font-bold px-3 py-1 rounded-full whitespace-nowrap transition duration-150 shadow-sm ${
                            report.status === 'Urgent' 
                            ? 'bg-red-500 text-white hover:bg-red-600' 
                            : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                        }`}>
                            {report.status === 'Urgent' ? 'Grade Now' : 'Review'}
                        </button>
                    </div>
                ))}
                
                <div className="p-4 bg-white rounded-xl shadow-md border-l-4 border-green-500 flex items-center gap-2">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    <p className="font-medium text-gray-700">All student missions reviewed!</p>
                </div>
            </div>
        </section>
    );
};

// 5. Feedback/Suggestions Tab (Space Theme Applied)
const FeedbackTab = () => {
    const [feedback, setFeedback] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (feedback.trim()) {
            console.log('Feedback submitted:', feedback);
            setIsSubmitted(true);
            setTimeout(() => {
                setFeedback('');
                setIsSubmitted(false);
            }, 3000);
        }
    };

    return (
        <section className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Launch Feedback</h2>
            <p className="text-gray-600">Send us your coordinates for improvement across the knowledge galaxy.</p>

            {isSubmitted && (
                <div className="p-4 bg-green-100 text-green-700 rounded-xl font-medium flex items-center gap-2 border border-green-300">
                    <CheckCircle className="h-5 w-5" />
                    Thank you! Your feedback has been launched successfully.
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">Your Suggestions</label>
                    <textarea
                        id="feedback"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        rows={6}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                        placeholder="What features would you like to see?"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={!feedback.trim() || isSubmitted}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-md hover:bg-indigo-700 transition duration-200 disabled:opacity-50"
                >
                    <MessageSquare className="h-5 w-5" />
                    Transmit Feedback
                </button>
            </form>
        </section>
    );
};

// 6. Settings Tab Content (Space Theme Applied)
const SettingsTab = ({ openModal, currentLang }: { openModal: (modal: string) => void, currentLang: string }) => {
    const handleLogout = () => {
        console.log('Logging out...');
        localStorage.removeItem('teacher_auth_token'); 
        setTimeout(() => {
            window.location.href = '/teacher/login';
        }, 300);
    };

    const SettingItem = ({ title, action, icon: Icon, onClick }: { title: string, action: string, icon: React.ElementType, onClick: () => void }) => (
        <button 
            onClick={onClick}
            className="w-full p-4 flex justify-between items-center hover:bg-indigo-50 cursor-pointer transition text-left rounded-xl"
        >
            <span className="flex items-center gap-3 font-medium text-gray-800">
                <Icon className="h-5 w-5 text-indigo-500" />
                {title}
            </span>
            <span className="text-indigo-600 text-sm">{action} →</span>
        </button>
    );

    const languageName = mockLanguages.find(l => l.code === currentLang)?.name || 'English';

    return (
        <section className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Starship Configuration</h2>
            
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 divide-y divide-gray-100 p-2">
                <h3 className="text-lg font-semibold px-2 pt-3 text-indigo-700">Crew Account</h3>
                <SettingItem 
                    title="Profile & Contact" 
                    action="Manage"
                    icon={Users}
                    onClick={() => openModal('profile')}
                />
                <SettingItem 
                    title="Change Password" 
                    action="Update"
                    icon={Lock}
                    onClick={() => openModal('password')}
                />

                <h3 className="text-lg font-semibold px-2 pt-3 text-indigo-700">Interface Controls</h3>
                <SettingItem 
                    title="Notification Preferences" 
                    action="Configure"
                    icon={Bell}
                    onClick={() => openModal('notifications')}
                />
                <button onClick={() => openModal('language')} className="w-full p-4 flex justify-between items-center hover:bg-indigo-50 cursor-pointer transition text-left rounded-xl">
                     <span className="flex items-center gap-3 font-medium text-gray-800">
                        <Globe className="h-5 w-5 text-indigo-500" />
                        Language & Region
                    </span>
                    <span className="text-sm font-medium text-gray-600">{languageName}</span>
                </button>
                <SettingItem 
                    title="Accessibility Options" 
                    action="Adjust"
                    icon={Zap}
                    onClick={() => openModal('accessibility')}
                />

                <button 
                    className="w-full p-4 flex items-center gap-3 text-red-500 font-semibold hover:bg-red-50 transition rounded-b-xl"
                    onClick={handleLogout}
                >
                    <LogOut className="h-5 w-5" />
                    End Session (Sign Out)
                </button>
            </div>
        </section>
    );
};


// --- Main Page Component ---
const DashboardPage = () => {
    const [activeTab, setActiveTab] = useState('Dashboard');
    const [classes, setClasses] = useState(initialClasses);
    const [isClassModalOpen, setIsClassModalOpen] = useState(false);
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [language, setLanguage] = useState('en');

    const handleCreateClass = (name: string, grade: string) => {
        const newClass: ClassSummary = {
            id: classes.length + 1,
            name: `${name} (Grade ${grade})`,
            students: 0, 
            averageScore: 0,
            lastActive: 'Just now',
            recentTopic: 'New class created - Define first mission!',
        };
        setClasses(prev => [newClass, ...prev]);
        console.log(`Class created: ${name} (Grade ${grade})`);
    };

    const navItems = [
        { name: 'Dashboard', icon: <LayoutDashboard className="h-6 w-6" /> },
        { name: 'Classes', icon: <BookOpen className="h-6 w-6" /> },
        { name: 'Reports', icon: <BarChart className="h-6 w-6" /> },
        { name: 'Feedback', icon: <MessageSquare className="h-6 w-6" /> },
        { name: 'Settings', icon: <Settings className="h-6 w-6" /> },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-20 font-inter">
            {/* Header (Space Themed) */}
            <header className="sticky top-0 z-10 bg-white shadow-lg p-4 flex flex-col items-start justify-center text-center pb-6">
                <h1 className="text-2xl font-extrabold text-gray-800 w-full flex items-center justify-center gap-2">
                    Good Morning, Dr. Sharma! 🚀
                </h1>
                <p className="text-sm text-indigo-600 font-medium w-full mt-1">Ready to command your galaxy of knowledge?</p>
                <button aria-label="Notifications" className="absolute top-4 right-4 p-2 rounded-full bg-indigo-50 hover:bg-indigo-100 text-gray-600 relative shadow-sm transition">
                    <Bell className="h-6 w-6" />
                    <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
            </header>

            {/* Main Content */}
            <main className="p-4 space-y-8">
                {activeTab === 'Dashboard' && <DashboardTab classes={classes} />}
                {activeTab === 'Classes' && <ClassesTab classes={classes} setIsModalOpen={setIsClassModalOpen} />}
                {activeTab === 'Reports' && <ReportsTab />}
                {activeTab === 'Feedback' && <FeedbackTab />}
                {activeTab === 'Settings' && <SettingsTab 
                    openModal={setActiveModal} 
                    currentLang={language} 
                />}
            </main>

            {/* MODALS RENDERED HERE */}
            <CreateClassModal
                isOpen={isClassModalOpen}
                onClose={() => setIsClassModalOpen(false)}
                onCreate={handleCreateClass}
            />
            
            <ChangePasswordModal
                isOpen={activeModal === 'password'}
                onClose={() => setActiveModal(null)}
            />

            <ChangeLanguageModal
                isOpen={activeModal === 'language'}
                onClose={() => setActiveModal(null)}
                currentLang={language}
                onSelectLang={setLanguage}
            />

            <SimpleActionModal
                isOpen={activeModal === 'profile'}
                onClose={() => setActiveModal(null)}
                title="Profile Management (Mock)"
            >
                <p className="text-gray-600">This section allows the teacher to update their name, email, and school information.</p>
                <button onClick={() => setActiveModal(null)} className="w-full py-2 bg-indigo-600 text-white rounded-xl mt-4 hover:bg-indigo-700 transition">Close</button>
            </SimpleActionModal>


            {/* Bottom Navigation (Mobile - Space Themed) */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-indigo-200 shadow-2xl z-20">
                <div className="flex justify-around items-center h-16 max-w-full mx-auto">
                    {navItems.map(item => (
                        <button
                            key={item.name}
                            onClick={() => setActiveTab(item.name)}
                            className={`flex flex-col items-center justify-center p-1 w-full transition duration-150 ${
                                activeTab === item.name 
                                    ? 'text-indigo-600 font-bold border-t-4 border-indigo-600 pt-1 -mt-0.5' 
                                    : 'text-gray-500 hover:text-indigo-500'
                            }`}
                        >
                            {item.icon} 
                            <span className="text-xs mt-0.5 font-medium">{item.name}</span>
                        </button>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default DashboardPage;
