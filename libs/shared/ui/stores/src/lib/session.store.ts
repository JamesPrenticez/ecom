import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Session, AuthedUser } from '@shared/models';

// Swap this out when real auth is wired up
const MOCK_USER: AuthedUser = {
  id: 'mock-001',
  name: 'Alex Rivera',
  email: 'alex@example.com',
  isGuest: false,
};

const newGuestSession = (): Session => ({
  id: crypto.randomUUID(),
  isGuest: true,
});

interface SessionStore {
  session: Session;
  loginAsMock: () => void;
  logout: () => void;
}

export const useSessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      session: newGuestSession(),

      loginAsMock: () =>
        set({ session: MOCK_USER }),

      logout: () =>
        set({ session: newGuestSession() }),
    }),
    {
      name: 'wild-wash-session',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
