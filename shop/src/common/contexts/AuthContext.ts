import * as React from 'react';

interface AuthUser {
  email: string;
  first_name: string;
  last_name: string;
}

interface AuthContextValue {
  /** State variable for whether user is authenticated or not. */
  isAuthenticated: boolean;
  /** Non-sensitive information about the authenticated user. */
  user: AuthUser;
  /** Login routine. */
  login: any;
  /** Logout routine. */
  logout: any;
}

const AuthContext = React.createContext<AuthContextValue | null>(null);

export default AuthContext;
