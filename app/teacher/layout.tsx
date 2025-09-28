import { ReactNode } from "react";

export default function TeacherLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <header className="bg-indigo-600 text-white p-4 shadow-md">
        <h1 className="text-xl font-bold">Tatva Teacher Portal</h1>
      </header>

      {/* Main Content */}
      <main className="p-4">{children}</main>
    </div>
  );
}
