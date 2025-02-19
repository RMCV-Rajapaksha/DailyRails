import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../src/Contexts/AuthProvider';

export default function ProtectedRoute({children}) {

    const {user} = useAuth();

    console.log('us',user);
    const navigate = useNavigate();
    
    useEffect(() => {
        if(user === null){
            navigate('/login', {replace: true});
        }
    }, [user, navigate]);

  return children;
}