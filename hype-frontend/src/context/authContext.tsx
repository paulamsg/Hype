import React from "react";
import { createContext, useState } from "react";
import type { AuthContextType, User } from "../types/auth.types";

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"))
    const [user, setUser] = useState<User | null>(() => {
        const saved = localStorage.getItem("user")
        return saved ? JSON.parse(saved) : null
    })
    const [loading, setLoading] = useState(false)

    const saveAuth = (token: string, user: User) => {
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        setToken(token)
        setUser(user)
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setToken(null)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, loading, saveAuth, logout }}>
            {children}
        </AuthContext.Provider>
    )
}