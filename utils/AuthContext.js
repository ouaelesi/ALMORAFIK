import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoad, setIsLoad] = useState(false);

  const router = useRouter();

  // Register user
  const register = async ({ fullname, email, password }) => {
    setIsLoad(true);
    console.log(fullname, email, password);
  };

  // Login user
  const login = async (token) => {
    setIsLoad(true);
    token
      ? setUser({ email: token.email, userName: token.userName })
      : setUser(null);

    console.log("====> the user ", user);
  };

  // Logout user
  const logout = () => {
    console.log("User Logged out");
  };

  // Check if user id Logged in
  const checkedUserLoggedIn = async (user) => {
    console.log("Checked");
  };

  return (
    <AuthContext.Provider
      value={{ register, login, logout, isLoad, user, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
