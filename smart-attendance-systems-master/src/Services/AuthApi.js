import { useAuth } from '../Context/AuthContext';

export const useApi = () => {
  const { accessToken, setAccessToken } = useAuth();

  const fetchWithAuth = async (url, options = {}) => {
    const res = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (res.status === 401) {
      const refreshRes = await fetch('http://localhost:5000/api/auth/refresh-token', {
        method: 'POST',
        credentials: 'include',
      });

      if (!refreshRes.ok) throw new Error('Session expired');

      const data = await refreshRes.json();
      setAccessToken(data.accessToken);

      return fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${data.accessToken}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
    }

    return res;
  };

  return fetchWithAuth;
};
