import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load stored auth data when app starts
  useEffect(() => {
    const loadStoredAuth = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("@user");
        const storedToken = await AsyncStorage.getItem("@token");

        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Error loading authentication data", error);
      } finally {
        setLoading(false);
      }
    };

    loadStoredAuth();
  }, []);

  // Store user data and token
  const signIn = async (userData, userToken) => {
    try {
      await AsyncStorage.setItem("@user", JSON.stringify(userData));
      await AsyncStorage.setItem("@token", userToken);
      setUser(userData);
      setToken(userToken);
      return true;
    } catch (error) {
      console.error("Error storing authentication data", error);
      Alert.alert("Error", "Could not save login information");
      return false;
    }
  };

  // Clear stored user data and token
  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("@user");
      await AsyncStorage.removeItem("@token");
      setUser(null);
      setToken(null);
      return true;
    } catch (error) {
      console.error("Error removing authentication data", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        signIn,
        signOut,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
