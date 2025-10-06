import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    id_user: number;
    email_user: string;
    password_user: string;
}

interface AuthState {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            login: (user: User) => set({ user }),
            logout: () => set({ user: null }),
        }),
        {
            name: 'auth-storage',
        }
    )
);
