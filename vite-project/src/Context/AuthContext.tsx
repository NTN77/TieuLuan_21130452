import React, { createContext, useState, ReactNode } from "react";

// Định nghĩa kiểu dữ liệu cho Context
type AuthContextType = {
    tokenContext: string | null;
    setTokenContext: (token: string | null) => void;
    usernameContext: string | null;
    setUsernameContext: (username: string | null) => void;
    emailContext: string | null;
    setEmailContext: (email: string | null) => void;
    status: string | null;
    setStatus: (status: string | null) => void;
    roleContext: string | null;
    setRoleContext: (role: string | null) => void;
    logout: () => void;
};

// Tạo AuthContext với kiểu dữ liệu
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Định nghĩa AuthProvider
type AuthProviderProps = {
    children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [tokenContext, setTokenContext] = useState<string | null>(null);
    const [usernameContext, setUsernameContext] = useState<string | null>(null);
    const [emailContext, setEmailContext] = useState<string | null>(null);
    const [status, setStatus] = useState<string | null>(null);
    const [roleContext, setRoleContext] = useState<string | null>(null);

    // Hàm logout
    const logout = () => {
        setTokenContext(null);
        setUsernameContext(null);
        setEmailContext(null);
        setStatus(null);
        setRoleContext(null);

        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider
            value={{
                tokenContext,
                setTokenContext,
                usernameContext,
                setUsernameContext,
                emailContext,
                setEmailContext,
                status,
                setStatus,
                roleContext,
                setRoleContext,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
