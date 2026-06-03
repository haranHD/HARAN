import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {
    return (
        <div className="flex h-screen w-screen overflow-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans transition-colors duration-300">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className="flex-grow overflow-y-auto p-8 bg-slate-100/40 dark:bg-slate-950/50 transition-colors duration-300">
                    <div className="w-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Layout;
