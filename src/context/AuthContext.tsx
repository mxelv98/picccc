import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';

interface User {
    id: string; // UUID
    email: string;
    role: 'user' | 'admin';
    vip_status?: 'active' | 'expired' | 'none';
    plan_type?: 'vip' | 'vup';
    vipSubscription?: {
        ends_at: string;
        active: boolean;
        plan_type?: 'vip' | 'vup';
    };
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    logout: () => void;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState<Session | null>(null);

    const fetchFullUserProfile = async (sessionUser: any, accessToken: string) => {
        try {
            const res = await fetch('/api/user/me', {
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
            } else {
                console.error('Failed to fetch/sync user profile, using fallback');
                // Fallback: Use session data
                setUser({
                    id: sessionUser.id,
                    email: sessionUser.email!,
                    role: 'user', // Default
                    vip_status: 'none'
                });
            }
        } catch (e) {
            console.error(e);
            // Fallback on error too
            setUser({
                id: sessionUser.id,
                email: sessionUser.email!,
                role: 'user',
                vip_status: 'none'
            });
        }
    };

    const refreshUser = async () => {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        if (currentSession?.user) {
            await fetchFullUserProfile(currentSession.user, currentSession.access_token);
        }
    };

    useEffect(() => {
        let mounted = true;

        // Function to handle session state
        const handleSession = async (session: Session | null) => {
            setSession(session);
            if (session?.user) {
                await fetchFullUserProfile(session.user, session.access_token);
            } else {
                setUser(null);
            }
            if (mounted) setLoading(false);
        };

        // Initial fetch
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (mounted) handleSession(session);
        });

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (mounted) {
                // Should we set loading true here? Usually no, as it's a transition.
                // But we might want to if we are switching users.
                // For now, let's just update the user.
                handleSession(session);
            }
        });

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, []);

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ user, loading, logout, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
