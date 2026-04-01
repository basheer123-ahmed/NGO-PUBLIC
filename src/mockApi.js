// Mock Database utilizing LocalStorage for high-velocity mission testing
// Zero Rate-Limits, Instant Identity Logging

const MOCK_STORAGE_KEY = 'sun_ngo_identities';

const getMockUsers = () => {
    const data = localStorage.getItem(MOCK_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

const saveMockUser = (user) => {
    const users = getMockUsers();
    users.push(user);
    localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(users));
};

export const mockAuth = {
    signUp: async (email, password, role) => {
        // Instant registration protocol
        const users = getMockUsers();
        if (users.find(u => u.email === email)) {
            throw new Error("Identity already logged in matrix.");
        }
        
        const newUser = { id: Date.now(), email, password, role };
        saveMockUser(newUser);
        
        return { data: { user: newUser }, error: null };
    },

    signIn: async (email, password) => {
        // High-speed verification protocol
        const users = getMockUsers();
        const user = users.find(u => u.email === email && u.password === password);
        
        if (!user) {
            throw new Error("Invalid matrix credentials.");
        }

        // Set session for Protected Routes to detect
        localStorage.setItem('sun_ngo_session', JSON.stringify(user));
        
        return { data: { user }, error: null };
    },

    getSession: () => {
        const session = localStorage.getItem('sun_ngo_session');
        return session ? JSON.parse(session) : null;
    },

    signOut: () => {
        localStorage.removeItem('sun_ngo_session');
    }
};
