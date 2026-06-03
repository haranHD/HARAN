import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/Layout";

function CreateTask() {
    const navigate = useNavigate();
    const [task, setTask] = useState("");
    const [status, setStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleCreateTask = async (e) => {
        e.preventDefault();
        if (!task.trim()) return;

        setLoading(true);
        setError("");

        try {
            await api.post("/users/task/addTask", {
                task: task.trim(),
                status: status
            });
            navigate("/tasks");
        } catch (err) {
            console.error("Error creating task:", err);
            setError(err.response?.data?.message || "Failed to create task. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="max-w-xl mx-auto space-y-6 font-sans">
                {/* Header */}
                <div>
                    <h2 className="text-2xl font-black text-slate-855 dark:text-white m-0 tracking-tight transition-colors">Create Workspace Task</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 m-0 transition-colors">Add a new action item or task to your workspace backlog.</p>
                </div>

                {/* Form Card */}
                <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden transition-colors duration-300">
                    {/* Glowing highlight */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl"></div>

                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-450 dark:text-rose-400 text-xs font-semibold flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleCreateTask} className="space-y-6">
                        {/* Task Content */}
                        <div>
                            <label className="block text-xs font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider mb-2">Task Details / Description</label>
                            <textarea
                                rows={4}
                                required
                                placeholder="What needs to be done? E.g., Deploy user microservices to staging environment..."
                                value={task}
                                onChange={(e) => setTask(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-sm transition-all resize-none"
                            />
                        </div>

                        {/* Task Status Toggle */}
                        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-200 dark:border-slate-800/80 transition-colors">
                            <div>
                                <p className="text-sm font-semibold text-slate-750 dark:text-slate-200 m-0">Mark as Completed</p>
                                <p className="text-xs text-slate-450 dark:text-slate-550 m-0 mt-0.5">Set the initial state of this task as completed.</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setStatus(!status)}
                                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                    status ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-800"
                                }`}
                            >
                                <span
                                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                        status ? "translate-x-5" : "translate-x-0"
                                    }`}
                                />
                            </button>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => navigate("/tasks")}
                                className="flex-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 font-semibold py-3 px-4 rounded-xl text-sm transition-all text-center"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading || !task.trim()}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold py-3 px-4 rounded-xl text-sm transition-all shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                ) : (
                                    <span>Create Task</span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default CreateTask;