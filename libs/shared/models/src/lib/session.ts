export interface GuestSession {
  id: string;
  isGuest: true;
}

export interface AuthedUser {
  id: string;
  name: string;
  email: string;
  isGuest: false;
}

export type Session = GuestSession | AuthedUser;
