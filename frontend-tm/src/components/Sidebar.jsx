import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
    const { user } = useAuth();

    const linkClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 border ${
            isActive
                ? "bg-purple-600/10 text-purple-600 border-purple-500/20 dark:bg-purple-600/20 dark:text-purple-400 dark:border-purple-500/30 shadow-[0_2px_10px_rgba(168,85,247,0.05)] dark:shadow-[0_0_15px_rgba(168,85,247,0.15)] font-semibold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:translate-x-1 border-transparent"
        }`;

    return (
        <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full z-10 transition-colors duration-300">
            {/* Brand Logo */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                </div>
                <div>
                    <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight m-0 select-none">TaskVibe</h1>
                    <span className="text-xs font-semibold text-purple-600 dark:text-purple-500 uppercase tracking-widest">Workspace</span>
                </div>
            </div>

            {/* Menu Links */}
            <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-4 mb-2">Main Menu</div>
                
                <NavLink to="/dashboard" className={linkClass}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
                    </svg>
                    <span>Dashboard</span>
                </NavLink>

                <NavLink to="/tasks" className={linkClass}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span>My Tasks</span>
                </NavLink>

                <NavLink to="/profile" className={linkClass}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>My Profile</span>
                </NavLink>

                {user && user.role === "ADMIN" && (
                    <>
                        <div className="pt-6 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-4 mb-2">Administration</div>
                        
                        <NavLink to="/admin/users" className={linkClass}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span>Admin Users</span>
                        </NavLink>

                        <NavLink to="/admin/tasks" className={linkClass}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            <span>Admin Tasks</span>
                        </NavLink>
                    </>
                )}
            </div>

            {/* Bottom User Quick Info */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold border border-purple-500/20 flex items-center justify-center text-sm select-none">
                        {user ? user.name.charAt(0).toUpperCase() : "?"}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate m-0">{user ? user.name : "Guest"}</p>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate m-0 font-mono">{user ? user.email : "guest@taskvibe.io"}</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
