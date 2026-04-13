import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type Role =
  | 'Super Admin'
  | 'HR Manager'
  | 'Finance Controller'
  | 'Inventory Manager'
  | 'Employee';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  initials: string;
}

/* ---------------- USERS ---------------- */
export const USERS: User[] = [
  { id: '1', name: 'Manikanth', email: 'avinash@example.com', role: 'Super Admin', initials: 'AN' },
  { id: '2', name: 'Emily Chen', email: 'emily@example.com', role: 'HR Manager', initials: 'EC' },
  { id: '3', name: 'Michael Chang', email: 'michael@example.com', role: 'Finance Controller', initials: 'MC' },
  { id: '4', name: 'Sarah Connor', email: 'sarah@example.com', role: 'Inventory Manager', initials: 'SC' },
  { id: '5', name: 'John Smith', email: 'john@example.com', role: 'Employee', initials: 'JS' },
];

/* ---------------- PERMISSIONS ---------------- */
export const DEFAULT_PERMISSIONS: Record<Role, string[]> = {
  'Super Admin': ['*'],
  'HR Manager': ['view:dashboard', 'view:hrm', 'view:resources', 'view:ai'],
  'Finance Controller': ['view:dashboard', 'view:finance', 'view:inventory', 'view:resources', 'view:ai'],
  'Inventory Manager': ['view:dashboard', 'view:inventory', 'view:resources', 'view:ai'],
  'Employee': ['view:dashboard', 'view:self_service', 'view:resources', 'view:ai'],
};

/* ---------------- CONTEXT TYPE ---------------- */
interface AuthContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  hasPermission: (permission: string) => boolean;
  rolePermissions: Record<Role, string[]>;
  updateRolePermission: (role: Role, permission: string, hasAccess: boolean) => void;
  isInitializing: boolean; // Add this
}

/* ---------------- CONTEXT ---------------- */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* ---------------- PROVIDER ---------------- */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [rolePermissions, setRolePermissions] =
    useState<Record<Role, string[]>>(DEFAULT_PERMISSIONS);
  const [isInitializing, setIsInitializing] = useState(true); // Default to true

  /* 🔥 Persist login after refresh */
  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setCurrentUser(parsedUser);
      setIsAuthenticated(true);
    }
    setIsInitializing(false);
  }, []);

  /* ---------------- PERMISSION CHECK ---------------- */
  const hasPermission = (permission: string) => {
    if (!currentUser) return false;

    const userPerms = rolePermissions['Super Admin'];
    if (userPerms.includes('*')) return true;

    return userPerms.includes(permission);
  };

  /* ---------------- UPDATE PERMISSIONS ---------------- */
  const updateRolePermission = (
    role: Role,
    permission: string,
    hasAccess: boolean
  ) => {
    setRolePermissions((prev) => {
      const perms = prev[role];

      if (hasAccess && !perms.includes(permission)) {
        return { ...prev, [role]: [...perms, permission] };
      }

      if (!hasAccess && perms.includes(permission)) {
        return { ...prev, [role]: perms.filter((p) => p !== permission) };
      }

      return prev;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isAuthenticated,
        setIsAuthenticated,
        hasPermission,
        rolePermissions,
        updateRolePermission,
        isInitializing
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* ---------------- HOOK ---------------- */
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}