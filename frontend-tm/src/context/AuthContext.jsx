import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setUser(null);
                setLoading(false);
                return;
            }
            const res = await api.get("/users/profile");
            setUser(res.data);
        } catch (err) {
            console.error("Failed to fetch profile:", err);
            localStorage.removeItem("token");
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const login = async (token) => {
        localStorage.setItem("token", token);
        setLoading(true);
        await fetchProfile();
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        window.location.href = "/";
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, refreshUser: fetchProfile }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
