export interface User {
  id: number;
  name: string;
  email: string;
  google_id: string;
  avatar?: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: () => void;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}