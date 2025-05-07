import React, { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react'
import Loading from '../assets/Loading';
import api from '../api/api';

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(true);
    const [token, setToken] = useState(null);
    const [isTokenFetching, setIsTokenFetching] = useState(true); // New state to handle fetching

    useEffect(() => {
        console.log('useEffect');
        const fetchToken = async () => {
            try {
                const response = await api.get('/accesstoken');
                setToken(response.data.accessToken);
                setUser(response.data.email);
                console.log(response.data.email);
            } catch (error) {
                setToken(null);
            } finally {
                setIsTokenFetching(false); // Set fetching to false once done
            }
        }

        fetchToken();

    }, []);

    useLayoutEffect(() => {
        console.log('useLay1Effect');

        if (token) { // Only setup interceptor if token is available
            const intercepter = api.interceptors.request.use((config) => {
                config.headers.Authorization = !config._retry && token ? `Bearer ${token}` : config.headers.Authorization;
                return config;
            });

            return () => {
                api.interceptors.request.eject(intercepter);
            }
        }
    }, [token]);

    useLayoutEffect(() => {
        console.log('useLay2Effect');

        if (token) { // Only setup interceptor if token is available
            const refresIntercepter = api.interceptors.response.use(
                (response) => response,
                async (error) => {
                    const originalRequest = error.config;

                    if (error.response.status === 403 && error.response.data.message === 'Unauthorized' && !originalRequest._retry) {
                        try {
                            const response = await api.get('/accesstoken');
                            setToken(response.data.accessToken);

                            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
                            originalRequest._retry = true;

                            return api(originalRequest);
                        } catch (error) {
                            setToken(null);
                        }
                    }
                    return Promise.reject(error);
                }
            );

            return () => {
                api.interceptors.response.eject(refresIntercepter);
            }
        }
    }, [token]);

    if (isTokenFetching) {
        return <Loading/>;
    }

    return <AuthContext.Provider value={{ user, setUser, setToken }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}

