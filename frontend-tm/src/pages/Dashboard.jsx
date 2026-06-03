import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";

function Dashboard() {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newTaskText, setNewTaskText] = useState("");
    const [adding, setAdding] = useState(false);

    const loadTasks = async () => {
        try {
            const res = await api.get("/users/task/getTask");
            setTasks(res.data);
        } catch (err) {
            console.error("Error loading tasks:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!newTaskText.trim()) return;

        setAdding(true);
        try {
            await api.post("/users/task/addTask", {
                task: newTaskText,
                status: false
            });
            setNewTaskText("");
            await loadTasks();
        } catch (err) {
            console.error("Error adding task:", err);
            alert("Failed to add task.");
        } finally {
            setAdding(false);
        }
    };

    const handleToggleTask = async (task) => {
        try {
            await api.patch(`/users/task/updateTask/${task._id}`, {
                status: !task.status
            });
            await loadTasks();
        } catch (err) {
            console.error("Error updating task:", err);
        }
    };

    const handleDeleteTask = async (id) => {
        if (!confirm("Are you sure you want to delete this task?")) return;
        try {
            await api.delete(`/users/task/delTask/${id}`);
            await loadTasks();
        } catch (err) {
            console.error("Error deleting task:", err);
        }
    };

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === true).length;
    const pendingTasks = totalTasks - completedTasks;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return (
        <Layout>
            <div className="space-y-8 font-sans">
                {/* Dashboard Hero Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-slate-900/40 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 backdrop-blur-sm transition-colors duration-300">
                    <div>
                        <h2 className="text-2xl font-black text-slate-850 dark:text-white m-0 tracking-tight transition-colors">Workspace Overview</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 m-0 transition-colors">Here's a breakdown of your productivity and tasks.</p>
                    </div>
                    <Link
                        to="/tasks"
                        className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg shadow-purple-500/20 hover:scale-[1.02] flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Manage All Tasks</span>
                    </Link>
                </div>

                {/* Statistics Cards */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-pulse">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-32 bg-slate-250 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800/80"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {/* Total Tasks Card */}
                        <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 relative overflow-hidden group transition-colors duration-300">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-xl group-hover:scale-150 transition-all duration-500"></div>
                            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider m-0 transition-colors">Total Tasks</p>
                            <h3 className="text-3xl font-extrabold text-slate-855 dark:text-white mt-2 mb-0 transition-colors">{totalTasks}</h3>
                            <p className="text-xs text-purple-600 dark:text-purple-400 mt-2 font-semibold">Active workspace items</p>
                        </div>

                        {/* Completed Tasks Card */}
                        <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 relative overflow-hidden group transition-colors duration-300">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl group-hover:scale-150 transition-all duration-500"></div>
                            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider m-0 transition-colors">Completed</p>
                            <h3 className="text-3xl font-extrabold text-emerald-500 dark:text-emerald-400 mt-2 mb-0 transition-colors">{completedTasks}</h3>
                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">Closed successfully</p>
                        </div>

                        {/* Pending Tasks Card */}
                        <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 relative overflow-hidden group transition-colors duration-300">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl group-hover:scale-150 transition-all duration-500"></div>
                            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider m-0 transition-colors">Pending</p>
                            <h3 className="text-3xl font-extrabold text-amber-600 dark:text-amber-500 mt-2 mb-0 transition-colors">{pendingTasks}</h3>
                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">Awaiting attention</p>
                        </div>

                        {/* Completion Rate Card */}
                        <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 relative overflow-hidden group transition-colors duration-300">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl group-hover:scale-150 transition-all duration-500"></div>
                            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider m-0 transition-colors">Completion Rate</p>
                            <h3 className="text-3xl font-extrabold text-slate-855 dark:text-white mt-2 mb-0 transition-colors">{completionRate}%</h3>
                            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-3.5 overflow-hidden">
                                <div
                                    className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full transition-all duration-550"
                                    style={{ width: `${completionRate}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Dashboard Split Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Tasks List - Left (Span 2) */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex justify-between items-center">
                            <h4 className="text-lg font-bold text-slate-855 dark:text-white m-0 transition-colors">Recent Tasks</h4>
                            <span className="text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1 rounded-full font-semibold transition-all">
                                {pendingTasks} Pending
                            </span>
                        </div>

                        {loading ? (
                            <div className="space-y-4">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="h-16 bg-slate-250 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800/80 animate-pulse"></div>
                                ))}
                            </div>
                        ) : tasks.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 px-6 bg-white dark:bg-slate-900/20 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-350 dark:text-slate-700 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0V9a2 2 0 00-2-2H6a2 2 0 00-2 2v2m4 6h4v1a3 3 0 01-3 3H9a3 3 0 01-3-3v-1" />
                                </svg>
                                <p className="text-slate-500 dark:text-slate-400 font-medium m-0 transition-colors">Your task list is empty.</p>
                                <p className="text-xs text-slate-400 dark:text-slate-650 mt-1 m-0 transition-colors">Add a new task on the right to get started.</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {tasks.slice(0, 5).map((task) => (
                                    <div
                                        key={task._id}
                                        className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                                            task.status
                                                ? "bg-slate-100/50 border-slate-200 dark:bg-slate-900/20 dark:border-slate-900/60 opacity-60"
                                                : "bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700/80"
                                        }`}
                                    >
                                        <div className="flex items-center gap-4 min-w-0">
                                            <button
                                                onClick={() => handleToggleTask(task)}
                                                className={`h-5 w-5 rounded-md border flex items-center justify-center transition-all ${
                                                    task.status
                                                        ? "bg-emerald-500 border-emerald-400 text-slate-950"
                                                        : "border-slate-300 hover:border-purple-500 dark:border-slate-700 dark:hover:border-purple-500 bg-slate-50 dark:bg-slate-950"
                                                }`}
                                            >
                                                {task.status && (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </button>
                                            <p className={`text-sm font-medium text-slate-700 dark:text-slate-200 truncate m-0 ${task.status ? "line-through text-slate-400 dark:text-slate-500" : ""}`}>
                                                {task.task}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteTask(task._id)}
                                            className="p-1.5 rounded-lg text-slate-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Quick Add Form - Right (Span 1) */}
                    <div className="bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 h-fit space-y-5 transition-colors duration-300">
                        <h4 className="text-lg font-bold text-slate-855 dark:text-white m-0">Quick Add Task</h4>
                        
                        <form onSubmit={handleAddTask} className="space-y-4">
                            <div>
                                <textarea
                                    rows={3}
                                    placeholder="What needs to be done?"
                                    value={newTaskText}
                                    onChange={(e) => setNewTaskText(e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-purple-500 text-sm resize-none transition-colors"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={adding || !newTaskText.trim()}
                                className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {adding ? (
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                        </svg>
                                        <span>Create Task</span>
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="border-t border-slate-200 dark:border-slate-800/80 pt-4 mt-2">
                            <h5 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">SaaS Tips</h5>
                            <ul className="text-xs text-slate-500 dark:text-slate-550 space-y-2 pl-4 list-disc">
                                <li>Toggle the checkbox to complete tasks.</li>
                                <li>Admins can view and delete all workspace actions.</li>
                                <li>Access settings and profile directly from the sidebar.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;