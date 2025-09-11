'use client';

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { User, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const tokenRefreshIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const refreshToken = async (user: User) => {
      try {
        // Force refresh to get a new token
        const token = await user.getIdToken(true);
        localStorage.setItem('token', token);
      } catch (error) {
        console.error('Failed to refresh token:', error);
      }
    };

    const setupTokenRefresh = (user: User) => {
      // Clear any existing interval
      if (tokenRefreshIntervalRef.current) {
        clearInterval(tokenRefreshIntervalRef.current);
      }

      // Refresh token every 45 minutes (before the 1-hour expiration)
      tokenRefreshIntervalRef.current = setInterval(() => {
        refreshToken(user);
      }, 45 * 60 * 1000);
    };

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Get Firebase ID token and store in localStorage for GraphQL requests
        const token = await user.getIdToken();
        localStorage.setItem('token', token);
        setUser(user);
        // Setup automatic token refresh
        setupTokenRefresh(user);
      } else {
        localStorage.removeItem('token');
        setUser(null);
        // Clear token refresh interval when user logs out
        if (tokenRefreshIntervalRef.current) {
          clearInterval(tokenRefreshIntervalRef.current);
          tokenRefreshIntervalRef.current = null;
        }
      }
      setLoading(false);
    });

    // Cleanup on unmount
    return () => {
      unsubscribe();
      if (tokenRefreshIntervalRef.current) {
        clearInterval(tokenRefreshIntervalRef.current);
      }
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}