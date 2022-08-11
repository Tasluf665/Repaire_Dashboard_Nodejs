import React, { useContext, useState } from "react";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  async function signup(name, email, password) {
    let response = await fetch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/api/users`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, email: email, password: password }),
        mode: "cors",
      }
    );

    let result = await response.json();

    if (!result.error) return result.success;
    else throw new Error(result.error);
  }

  async function login(email, password) {
    let response = await fetch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/api/auth`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      }
    );

    let result = await response.json();
    console.log("🚀 ~ file: AuthContext.js ~ line 44 ~ login ~ result", result);

    if (!result.error) setCurrentUser(result.data);
    else throw new Error(result.error);
  }

  async function loginWithGoogle(name, email, googleId, accessToken) {
    let response = await fetch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/api/users/google`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, googleId, accessToken }),
        mode: "cors",
      }
    );

    let result = await response.json();

    if (!result.error) setCurrentUser(result.data);
    else throw new Error(result.error);
  }

  async function resetPassword(email) {
    let response = await fetch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/api/auth/forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
        mode: "cors",
      }
    );

    let result = await response.json();

    if (!result.error) return result.success;
    else throw new Error(result.error);
  }

  const value = {
    currentUser,
    signup,
    login,
    loginWithGoogle,
    resetPassword,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
