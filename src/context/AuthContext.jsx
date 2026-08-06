import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEFAULT_USERS = [
  { id: 'rodrigo', name: 'Rodrigo', role: 'Admin', avatar: '👨‍💻', color: 'bg-blue-600' },
  { id: 'companero', name: 'Compañero', role: 'Socio', avatar: '🤝', color: 'bg-emerald-600' }
];

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('crm_active_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return DEFAULT_USERS[0]; // Rodrigo default
  });

  const [availableUsers, setAvailableUsers] = useState(DEFAULT_USERS);

  useEffect(() => {
    localStorage.setItem('crm_active_user', JSON.stringify(currentUser));
  }, [currentUser]);

  const switchUser = (userId) => {
    const found = availableUsers.find(u => u.id === userId);
    if (found) {
      setCurrentUser(found);
    }
  };

  const addUser = (name, role = 'Socio') => {
    const newId = name.toLowerCase().replace(/\s+/g, '_');
    const newUser = {
      id: newId,
      name,
      role,
      avatar: '👤',
      color: 'bg-purple-600'
    };
    setAvailableUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
  };

  return (
    <AuthContext.Provider value={{ currentUser, switchUser, availableUsers, addUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
