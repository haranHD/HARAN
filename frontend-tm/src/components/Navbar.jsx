import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-20 transition-colors duration-300">
            {/* Header Left / Greeting */}
            <div>
                <p className="text-slate-400 dark:text-slate-400 text-xs m-0">Welcome back,</p>
                <h3 className="text-slate-800 dark:text-white text-base font-bold m-0 transition-colors">{user ? user.name : "Guest User"}</h3>
            </div>

            {/* Header Right / Profile, Theme & Action */}
            <div className="flex items-center gap-4">
                {/* Theme Toggle Button */}
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-800 hover:bg-slate-150 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800/60 transition-all duration-300"
                    title={`Toggle to ${theme === "dark" ? "light" : "dark"} mode`}
                >
                    {theme === "dark" ? (
                        // Sun icon
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                        </svg>
                    ) : (
                        // Moon icon
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                    )}
                </button>

                {user && (
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <span className={`h-2 w-2 rounded-full ${user.role === 'ADMIN' ? 'bg-indigo-500 animate-pulse' : 'bg-emerald-500'}`}></span>
                        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">{user.role}</span>
                    </div>
                )}

                <button
                    onClick={logout}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-rose-500 hover:text-white dark:text-rose-400 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500 hover:border-transparent transition-all duration-300 shadow-sm"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Sign Out</span>
                </button>
            </div>
        </header>
    );
}

export default Navbar;