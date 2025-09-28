'use client';

import { useRouter } from 'next/navigation';
import { LayoutDashboard, BookOpen, BarChart, Settings } from 'lucide-react';

export default function BottomNav() {
  const router = useRouter();

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" />, path: '/dashboard' },
    { name: 'Classes', icon: <BookOpen className="h-5 w-5" />, path: '/classes' },
    { name: 'Reports', icon: <BarChart className="h-5 w-5" />, path: '/reports' },
    { name: 'Settings', icon: <Settings className="h-5 w-5" />, path: '/settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow z-20">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => router.push(item.path)}
            className={`flex flex-col items-center justify-center p-1 w-full transition duration-150 ${
              typeof window !== 'undefined' && window.location.pathname === item.path
                ? 'text-indigo-600 border-t-2 border-indigo-600 -mt-0.5'
                : 'text-gray-500 hover:text-indigo-500'
            }`}
          >
            {item.icon}
            <span className="text-xs mt-0.5 font-medium">{item.name}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
