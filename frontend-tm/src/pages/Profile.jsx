import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";

function Profile() {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStats = async () => {
            try {
                const res = await api.get("/users/task/getTask");
                setTasks(res.data);
            } catch (err) {
                console.error("Error fetching tasks for stats:", err);
            } finally {
                setLoading(false);
            }
        };
        loadStats();
    }, []);

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === true).length;
    const pendingTasks = totalTasks - completedTasks;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return (
        <Layout>
            <div className="max-w-2xl mx-auto space-y-6 font-sans">
                {/* Header */}
                <div>
                    <h2 className="text-2xl font-black text-slate-855 dark:text-white m-0 tracking-tight transition-colors">My Profile</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 m-0 transition-colors">View your account details and productivity dashboard metrics.</p>
                </div>

                {/* Profile Detail Card */}
                {user && (
                    <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden space-y-8">
                        {/* Glowing background */}
                        <div className="absolute top-0 right-0 w-44 h-44 bg-purple-600/5 rounded-full blur-3xl"></div>

                        {/* Top Info Banner */}
                        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-800">
                            {/* Avatar */}
                            <div className="h-20 w-20 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-3xl font-extrabold text-white shadow-xl shadow-purple-500/10">
                                {user.name.charAt(0).toUpperCase()}
                            </div>

                            {/* Info */}
                            <div className="text-center sm:text-left space-y-1">
                                <h3 className="text-xl font-extrabold text-white m-0 tracking-tight">{user.name}</h3>
                                <p className="text-slate-400 text-sm m-0 font-mono">{user.email}</p>

                                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-semibold text-purple-400 mt-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                                    <span>{user.role} Account</span>
                                </div>
                            </div>
                        </div>

                        {/* Task metrics */}
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Productivity Report</h4>

                            {loading ? (
                                <div className="h-16 bg-slate-800/30 rounded-2xl animate-pulse"></div>
                            ) : (
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div className="bg-slate-950/40 border border-slate-850 p-4 rounded-2xl">
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider m-0">Tasks Created</p>
                                        <p className="text-2xl font-black text-white m-0 mt-1">{totalTasks}</p>
                                    </div>
                                    <div className="bg-slate-950/40 border border-slate-850 p-4 rounded-2xl">
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider m-0">Completed</p>
                                        <p className="text-2xl font-black text-emerald-400 m-0 mt-1">{completedTasks}</p>
                                    </div>
                                    <div className="bg-slate-950/40 border border-slate-850 p-4 rounded-2xl">
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider m-0">Pending</p>
                                        <p className="text-2xl font-black text-amber-500 m-0 mt-1">{pendingTasks}</p>
                                    </div>
                                </div>
                            )}

                            {!loading && totalTasks > 0 && (
                                <div className="bg-slate-950/20 border border-slate-850/80 rounded-2xl p-6 space-y-3">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="font-semibold text-slate-400">Total Completion Rate</span>
                                        <span className="font-bold text-white">{completionRate}%</span>
                                    </div>
                                    <div className="w-full bg-slate-850 h-2.5 rounded-full overflow-hidden">
                                        <div
                                            className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full transition-all duration-550"
                                            style={{ width: `${completionRate}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default Profile;