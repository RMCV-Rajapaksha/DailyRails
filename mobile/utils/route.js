import React, { useContext, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { AuthContext } from "../context/AuthContext";

// Higher-order component to protect authenticated routes
export const withAuth = (Component) => {
  return (props) => {
    const { user, loading } = useContext(AuthContext);

    useEffect(() => {
      if (!loading && !user) {
        // Redirect to sign-in if not authenticated
        router.replace("/sign-in");
      }
    }, [loading, user]);

    if (loading) {
      return (
        <View className="flex-1 items-center justify-center bg-white">
          <ActivityIndicator size="large" color="#41A3B3" />
        </View>
      );
    }

    if (!user) {
      // Return null while redirecting
      return null;
    }

    // User is authenticated, render the protected component
    return <Component {...props} />;
  };
};

// Higher-order component for admin-only routes
export const withAdminAuth = (Component) => {
  return (props) => {
    const { user, loading } = useContext(AuthContext);

    useEffect(() => {
      if (!loading) {
        if (!user) {
          // Not logged in - redirect to sign in
          router.replace("/sign-in");
        } else if (!isAdmin(user)) {
          // Logged in but not admin - redirect to home
          router.replace("/home");
        }
      }
    }, [loading, user]);

    // Helper to check if user is admin
    const isAdmin = (user) => {
      // Replace with your admin check logic
      return user.Email?.toLowerCase().includes("admin");
    };

    if (loading || !user || !isAdmin(user)) {
      return (
        <View className="flex-1 items-center justify-center bg-white">
          <ActivityIndicator size="large" color="#41A3B3" />
        </View>
      );
    }

    // User is authenticated and is admin, render the protected component
    return <Component {...props} />;
  };
};
