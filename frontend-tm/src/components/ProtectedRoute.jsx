import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, requireAdmin = false }) {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex h-screen w-screen items-center justify-center bg-slate-950 text-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
                    <p className="text-slate-400 font-medium animate-pulse">Loading workspace...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    if (requireAdmin && user.role !== "ADMIN") {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

export default ProtectedRoute;