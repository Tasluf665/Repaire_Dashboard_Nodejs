import React, { useContext, useState } from "react";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  async function signup(name, email, password) {
    let response = await fetch("http://localhost:3001/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, email: email, password: password }),
      mode: "cors",
    });

    let result = await response.json();

    if (!result.error) return result;
    else throw new Error(result.error);
  }

  async function login(email, password) {
    let response = await fetch("http://localhost:3001/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    let result = await response.json();
    console.log(result);

    if (!result.error) setCurrentUser(result);
    else throw new Error(result.error);
  }

  async function loginWithGoogle(name, email, googleId) {
    let response = await fetch("http://localhost:3001/api/users/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, googleId }),
      mode: "cors",
    });

    let result = await response.json();

    if (!result.error) setCurrentUser(result);
    else throw new Error(result.error);
  }

  const value = {
    currentUser,
    signup,
    login,
    loginWithGoogle,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
