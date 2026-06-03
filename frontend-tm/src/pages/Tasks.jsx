import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all"); // 'all', 'pending', 'completed'
    const [search, setSearch] = useState("");
    
    // Add task state
    const [newTaskText, setNewTaskText] = useState("");
    const [adding, setAdding] = useState(false);

    // Edit task state
    const [editingId, setEditingId] = useState(null);
    const [editingText, setEditingText] = useState("");

    const loadTasks = async () => {
        try {
            const res = await api.get("/users/task/getTask");
            setTasks(res.data);
        } catch (err) {
            console.error("Error fetching tasks:", err);
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
        } finally {
            setAdding(false);
        }
    };

    const handleToggleStatus = async (task) => {
        try {
            await api.patch(`/users/task/updateTask/${task._id}`, {
                status: !task.status
            });
            await loadTasks();
        } catch (err) {
            console.error("Error toggling task status:", err);
        }
    };

    const handleStartEdit = (task) => {
        setEditingId(task._id);
        setEditingText(task.task);
    };

    const handleSaveEdit = async (id) => {
        if (!editingText.trim()) return;
        try {
            await api.patch(`/users/task/updateTask/${id}`, {
                task: editingText
            });
            setEditingId(null);
            await loadTasks();
        } catch (err) {
            console.error("Error saving task edit:", err);
        }
    };

    const handleDeleteTask = async (id) => {
        if (!confirm("Delete this task?")) return;
        try {
            await api.delete(`/users/task/delTask/${id}`);
            await loadTasks();
        } catch (err) {
            console.error("Error deleting task:", err);
        }
    };

    // Filter and search tasks
    const filteredTasks = tasks.filter(task => {
        const matchesFilter = 
            filter === "all" || 
            (filter === "completed" && task.status === true) || 
            (filter === "pending" && task.status === false);
        
        const matchesSearch = task.task.toLowerCase().includes(search.toLowerCase());
        
        return matchesFilter && matchesSearch;
    });

    const activeCount = tasks.filter(t => !t.status).length;

    return (
        <Layout>
            <div className="space-y-6 font-sans">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-slate-855 dark:text-white m-0 tracking-tight transition-colors">My Task Space</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 m-0 transition-colors">Create, organize, and execute your current workload.</p>
                    </div>

                    <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl flex items-center gap-2 w-fit transition-colors">
                        <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                        <span>{activeCount} Active Tasks</span>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                    {/* Sidebar Filters */}
                    <div className="space-y-4">
                        {/* Search */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search tasks..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-purple-500 text-sm transition-all"
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 text-slate-400 dark:text-slate-650 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        {/* Status Filters */}
                        <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-1 transition-colors duration-300">
                            <h5 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-3 mb-3">Filter By</h5>
                            
                            <button
                                onClick={() => setFilter("all")}
                                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                                    filter === "all"
                                        ? "bg-purple-600/10 text-purple-600 dark:text-purple-400 border border-purple-500/20"
                                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/40 border border-transparent"
                                }`}
                            >
                                <span>All Tasks</span>
                                <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full transition-colors">{tasks.length}</span>
                            </button>

                            <button
                                onClick={() => setFilter("pending")}
                                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                                    filter === "pending"
                                        ? "bg-amber-600/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/40 border border-transparent"
                                }`}
                            >
                                <span>Pending</span>
                                <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full transition-colors">
                                    {tasks.filter(t => !t.status).length}
                                </span>
                            </button>

                            <button
                                onClick={() => setFilter("completed")}
                                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                                    filter === "completed"
                                        ? "bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/40 border border-transparent"
                                }`}
                            >
                                <span>Completed</span>
                                <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full transition-colors">
                                    {tasks.filter(t => t.status).length}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Task Workspace (Span 3) */}
                    <div className="lg:col-span-3 space-y-4">
                        {/* Inline Create Form */}
                        <form onSubmit={handleAddTask} className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Write a new task..."
                                value={newTaskText}
                                onChange={(e) => setNewTaskText(e.target.value)}
                                className="flex-1 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-purple-500 text-sm transition-all"
                            />
                            <button
                                type="submit"
                                disabled={adding || !newTaskText.trim()}
                                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-all shadow-md flex items-center gap-2 shrink-0"
                            >
                                {adding ? (
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                        </svg>
                                        <span>Add Task</span>
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Task List */}
                        {loading ? (
                            <div className="space-y-3">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="h-16 bg-slate-250 dark:bg-slate-900/30 rounded-xl border border-slate-200 dark:border-slate-800 animate-pulse"></div>
                                ))}
                            </div>
                        ) : filteredTasks.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 px-6 bg-white dark:bg-slate-900/10 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-slate-300 dark:text-slate-700 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                <p className="text-slate-500 dark:text-slate-400 font-semibold m-0 transition-colors">No tasks found matching filters.</p>
                                <p className="text-xs text-slate-400 dark:text-slate-650 mt-1.5 m-0 transition-colors">Try adjusting your filters or write a new task above.</p>
                            </div>
                        ) : (
                            <div className="space-y-2.5">
                                {filteredTasks.map((task) => (
                                    <div
                                        key={task._id}
                                        className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                                            task.status
                                                ? "bg-slate-50 border-slate-200 dark:bg-slate-900/10 dark:border-slate-900/40 opacity-55"
                                                : "bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700/80"
                                        }`}
                                    >
                                        <div className="flex items-center gap-4 min-w-0 flex-1">
                                            {/* Status Checkbox */}
                                            <button
                                                onClick={() => handleToggleStatus(task)}
                                                className={`h-5 w-5 rounded-md border flex items-center justify-center transition-all shrink-0 ${
                                                    task.status
                                                        ? "bg-emerald-500 border-emerald-400 text-slate-950"
                                                        : "border-slate-300 dark:border-slate-700 hover:border-purple-500 bg-slate-50 dark:bg-slate-950"
                                                }`}
                                            >
                                                {task.status && (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </button>

                                            {/* Task Name / Inline Edit */}
                                            {editingId === task._id ? (
                                                <div className="flex items-center gap-2 flex-1">
                                                    <input
                                                        type="text"
                                                        value={editingText}
                                                        onChange={(e) => setEditingText(e.target.value)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") handleSaveEdit(task._id);
                                                            else if (e.key === "Escape") setEditingId(null);
                                                        }}
                                                        autoFocus
                                                        className="w-full max-w-lg bg-slate-50 dark:bg-slate-950 border border-purple-500 rounded-lg px-2.5 py-1 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                                                    />
                                                    <button
                                                        onClick={() => handleSaveEdit(task._id)}
                                                        className="text-[10px] font-bold bg-purple-650/10 text-purple-600 dark:bg-purple-600/20 dark:text-purple-400 border border-purple-500/30 px-2 py-1 rounded hover:bg-purple-600 hover:text-white transition-all shrink-0"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingId(null)}
                                                        className="text-[10px] font-bold bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700 px-2 py-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-all shrink-0"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            ) : (
                                                <p
                                                    onDoubleClick={() => handleStartEdit(task)}
                                                    className={`text-sm font-medium text-slate-700 dark:text-slate-200 truncate m-0 flex-1 select-text cursor-pointer hover:text-purple-600 dark:hover:text-purple-400 transition-colors ${
                                                        task.status ? "line-through text-slate-400 dark:text-slate-500" : ""
                                                    }`}
                                                    title="Double click to edit"
                                                >
                                                    {task.task}
                                                </p>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-1.5 ml-2">
                                            {editingId !== task._id && (
                                                <button
                                                    onClick={() => handleStartEdit(task)}
                                                    className="p-1.5 rounded-lg text-slate-450 dark:text-slate-500 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-500/10 transition-all"
                                                    title="Edit task"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDeleteTask(task._id)}
                                                className="p-1.5 rounded-lg text-slate-450 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                                                title="Delete task"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Tasks;