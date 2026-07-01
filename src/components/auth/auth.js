// Petites fonctions utilitaires pour gérer le token d'authentification.
// Centralisées ici pour éviter de répéter localStorage.getItem(...) partout.

export const setToken = (token) => {
    localStorage.setItem('auth_token', token);
};

export const getToken = () => {
    return localStorage.getItem('auth_token');
};

export const removeToken = () => {
    localStorage.removeItem('auth_token');
};

export const isLoggedIn = () => {
    return !!getToken();
};

// À utiliser dans les fetch() vers les routes protégées Laravel
export const authHeaders = () => {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
    };
};
