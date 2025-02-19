import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../src/Contexts/AuthProvider';

const ProtectedRouter = ({children}) => {
    // const {user} = useAuth();
    const [user, setUser] = useState(1); // Initialize user state to null

  const navigate = useNavigate();

  useEffect(() => {
    
    const checkAuth = () => {
     
        const storedUser = localStorage.getItem("user");
        setUser(storedUser ? JSON.parse(storedUser) : null);
        console.log("User",user);
    };
     
    checkAuth();
  }, []);

  useEffect(() => {
    if (user === null) {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  return user ? children : null;
}

export default ProtectedRouter
