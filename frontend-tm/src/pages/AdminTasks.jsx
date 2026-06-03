import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

function AdminTasks() {
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all"); // 'all', 'completed', 'pending'
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");

    const loadData = async () => {
        try {
            // Fetch all tasks and all users concurrently
            const [tasksRes, usersRes] = await Promise.all([
                api.get("/users/task/allTasks"),
                api.get("/users/getUser")
            ]);
            setTasks(tasksRes.data);
            setUsers(usersRes.data);
        } catch (err) {
            console.error("Error loading admin tasks database:", err);
            setError("Failed to load admin workspace data. Administrative credentials required.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleDeleteTask = async (id) => {
        if (!confirm("Are you sure you want to delete this user task?")) return;
        try {
            await api.delete(`/users/task/delTask/${id}`);
            await loadData();
        } catch (err) {
            console.error("Error deleting user task:", err);
            alert("Failed to delete task.");
        }
    };

    // User lookup map
    const userMap = users.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
    }, {});

    // Filter tasks
    const filteredTasks = tasks.filter(task => {
        const matchesFilter = 
            filter === "all" ||
            (filter === "completed" && task.status === true) ||
            (filter === "pending" && task.status === false);

        // Get user details
        const assignedUser = userMap[task.userId];
        const userName = assignedUser?.name || "Unknown User";
        
        const matchesSearch = 
            task.task.toLowerCase().includes(search.toLowerCase()) ||
            userName.toLowerCase().includes(search.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    return (
        <Layout>
            <div className="space-y-6 font-sans">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-slate-855 dark:text-white m-0 tracking-tight transition-colors">Admin Task Management</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 m-0 transition-colors">Monitor and audit all tasks across the workspace environment.</p>
                    </div>

                    <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl flex items-center gap-2 w-fit transition-colors">
                        <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
                        <span>{tasks.length} Total Workspace Tasks</span>
                    </div>
                </div>

                {error && (
                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span>{error}</span>
                    </div>
                )}

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                    {/* Search */}
                    <div className="relative w-full md:w-80">
                        <input
                            type="text"
                            placeholder="Search task details or user..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-slate-850 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-purple-500 text-sm transition-all"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 text-slate-450 dark:text-slate-650 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    {/* Status Tabs */}
                    <div className="flex bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-1.5 rounded-xl transition-colors">
                        <button
                            onClick={() => setFilter("all")}
                            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                filter === "all" ? "bg-purple-650 text-white" : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                            }`}
                        >
                            All Tasks
                        </button>
                        <button
                            onClick={() => setFilter("pending")}
                            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                filter === "pending" ? "bg-purple-650 text-white" : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                            }`}
                        >
                            Pending
                        </button>
                        <button
                            onClick={() => setFilter("completed")}
                            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                filter === "completed" ? "bg-purple-650 text-white" : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                            }`}
                        >
                            Completed
                        </button>
                    </div>
                </div>

                {/* Task Database Table */}
                <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden backdrop-blur-sm transition-colors duration-300">
                    {loading ? (
                        <div className="p-8 space-y-4 animate-pulse">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="h-12 bg-slate-100 dark:bg-slate-800/45 rounded-xl"></div>
                            ))}
                        </div>
                    ) : filteredTasks.length === 0 ? (
                        <div className="p-8 text-center text-slate-500 text-sm font-semibold">
                            No tasks found in system database matching query.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/45 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                                        <th className="py-4 px-6">Task Description</th>
                                        <th className="py-4 px-6">Assigned User</th>
                                        <th className="py-4 px-6">Task Status</th>
                                        <th className="py-4 px-6">Created At</th>
                                        <th className="py-4 px-6 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
                                    {filteredTasks.map((task) => {
                                        const assignedUser = userMap[task.userId];
                                        return (
                                            <tr key={task._id} className="hover:bg-slate-50 dark:hover:bg-slate-900/25 transition-colors text-sm text-slate-600 dark:text-slate-300">
                                                <td className="py-4 px-6 font-semibold text-slate-800 dark:text-white max-w-xs truncate" title={task.task}>
                                                    {task.task}
                                                </td>
                                                <td className="py-4 px-6">
                                                    {assignedUser ? (
                                                        <div className="flex flex-col">
                                                            <span className="text-slate-700 dark:text-slate-300 font-medium">{assignedUser.name}</span>
                                                            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-0.5">{assignedUser.email}</span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-slate-500 font-mono text-xs">ID: {task.userId}</span>
                                                    )}
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                                        task.status 
                                                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                                                            : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                                                    }`}>
                                                        {task.status ? "Completed" : "Pending"}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-xs text-slate-450 dark:text-slate-500 font-mono">
                                                    {new Date(task.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="py-4 px-6 text-right">
                                                    <button
                                                        onClick={() => handleDeleteTask(task._id)}
                                                        className="px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-500 dark:text-rose-400 bg-rose-500/5 border border-rose-500/10 hover:bg-rose-500 hover:text-white hover:border-transparent transition-all duration-200"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default AdminTasks;
