import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";

function AdminUsers() {
    const { user: currentUser } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadUsers = async () => {
        try {
            const res = await api.get("/users/getUser");
            setUsers(res.data);
        } catch (err) {
            console.error("Error fetching users:", err);
            setError("Failed to load users. Make sure you have administrative privileges.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleDeleteUser = async (id, name) => {
        if (currentUser && currentUser.id === id) {
            alert("You cannot delete your own admin account.");
            return;
        }
        if (!confirm(`Are you sure you want to delete user "${name}"? This action is permanent.`)) return;

        try {
            await api.delete(`/users/delById/${id}`);
            await loadUsers();
        } catch (err) {
            console.error("Error deleting user:", err);
            alert(err.response?.data?.message || "Failed to delete user.");
        }
    };

    return (
        <Layout>
            <div className="space-y-6 font-sans">
                {/* Header */}
                <div>
                    <h2 className="text-2xl font-black text-slate-855 dark:text-white m-0 tracking-tight transition-colors">Admin User Management</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 m-0 transition-colors">View system accounts, monitor security roles, and manage credentials.</p>
                </div>

                {error && (
                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span>{error}</span>
                    </div>
                )}

                {/* Users Table / List */}
                <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden backdrop-blur-sm transition-colors duration-300">
                    {loading ? (
                        <div className="p-8 space-y-4 animate-pulse">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="h-12 bg-slate-100 dark:bg-slate-800/45 rounded-xl"></div>
                            ))}
                        </div>
                    ) : users.length === 0 ? (
                        <div className="p-8 text-center text-slate-500 text-sm font-semibold">
                            No users found in the system database.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/45 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                                        <th className="py-4 px-6">User / Initials</th>
                                        <th className="py-4 px-6">Email Address</th>
                                        <th className="py-4 px-6">Security Role</th>
                                        <th className="py-4 px-6 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
                                    {users.map((user) => (
                                        <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/25 transition-colors text-sm text-slate-600 dark:text-slate-300">
                                            <td className="py-4 px-6 flex items-center gap-3 font-semibold text-slate-800 dark:text-white">
                                                <div className="h-8 w-8 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold border border-purple-500/20 flex items-center justify-center text-xs select-none">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                                <span>{user.name}</span>
                                            </td>
                                            <td className="py-4 px-6 font-mono text-xs text-slate-500 dark:text-slate-400">{user.email}</td>
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase ${
                                                    user.role === "ADMIN"
                                                        ? "bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400 border border-indigo-500/20"
                                                        : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
                                                }`}>
                                                    <span className={`h-1.5 w-1.5 rounded-full ${user.role === "ADMIN" ? "bg-indigo-500 animate-pulse" : "bg-slate-400"}`}></span>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <button
                                                    onClick={() => handleDeleteUser(user.id, user.name)}
                                                    disabled={currentUser && currentUser.id === user.id}
                                                    className="px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-500 dark:text-rose-400 bg-rose-500/5 border border-rose-500/10 hover:bg-rose-500 hover:text-white hover:border-transparent transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                                                >
                                                    Delete User
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default AdminUsers;