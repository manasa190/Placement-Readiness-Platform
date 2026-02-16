import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, BookOpen, PenTool, FileText, User, GraduationCap, Clock, CheckCircle2, Trophy } from 'lucide-react';

const Sidebar = () => {
    const links = [
        { to: '/placement/dashboard', label: 'Dashboard', icon: <LayoutDashboard /> },
        { to: '/placement/practice', label: 'Practice', icon: <BookOpen /> },
        { to: '/placement/assessments', label: 'Assessments', icon: <PenTool /> },
        { to: '/placement/history', label: 'History', icon: <Clock /> },
        { to: '/placement/07-test', label: 'Checklist', icon: <CheckCircle2 /> },
        { to: '/placement/proof', label: 'Proof', icon: <Trophy /> },
        { to: '/placement/resources', label: 'Resources', icon: <FileText /> },
        { to: '/placement/profile', label: 'Profile', icon: <User /> },
    ];

    return (
        <div className="w-64 h-full border-r border-gray-200 bg-white flex flex-col">
            <div className="p-6">
                <div className="flex items-center gap-3 text-primary font-bold text-xl">
                    <GraduationCap className="w-8 h-8" />
                    <span>PrepMaster</span>
                </div>
            </div>
            <nav className="flex-grow px-4 space-y-2 py-4">
                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium
              ${isActive
                                ? 'bg-primary/10 text-primary'
                                : 'text-gray-600 hover:bg-gray-50'
                            }
            `}
                    >
                        {React.cloneElement(link.icon, { className: 'w-5 h-5' })}
                        {link.label}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

const Header = () => {
    return (
        <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-8">
            <div className="text-xl font-bold text-gray-800">Placement Prep</div>
            <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
                    JD
                </div>
            </div>
        </header>
    );
};

const DashboardShell = () => {
    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardShell;
