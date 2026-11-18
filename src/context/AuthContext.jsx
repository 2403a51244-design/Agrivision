import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const DEMO_ACCOUNTS = {
  farmer: {
    email: "farmer@agrivision.ai",
    password: "farmer123",
    name: "Ramesh Patel",
    role: "farmer",
    roleLabel: "Organic Crop Producer",
    farmName: "Green Horizon Agro Farms",
    farmSize: "14.5 Acres",
    location: "Punjab, India (Zone 3)",
    crops: ["Wheat", "Tomato", "Rice", "Mustard"],
    avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=200&q=80",
    phone: "+91 98765 43210",
    soilType: "Alluvial Loamy",
    badge: "Verified Smart Farmer"
  },
  expert: {
    email: "expert@agrivision.ai",
    password: "expert123",
    name: "Dr. Sarah Jenkins, Ph.D.",
    role: "agronomist",
    roleLabel: "Senior Plant Pathologist",
    farmName: "Agricultural Research & Extension Council",
    farmSize: "State Diagnostic Laboratory",
    location: "Agronomy Research Hub",
    crops: ["All Cereals & Horticultural Crops"],
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    phone: "+1 (555) 382-9901",
    soilType: "Multi-soil Analysis Center",
    badge: "Certified Agronomist"
  },
  guest: {
    email: "guest@agrivision.ai",
    password: "guest",
    name: "Demo Guest Farmer",
    role: "farmer",
    roleLabel: "Exploring AgriVision",
    farmName: "Sunrise Pilot Field",
    farmSize: "5 Acres",
    location: "Central Farming Belt",
    crops: ["Tomato", "Potato"],
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    phone: "+1 800-AGRI-AI",
    soilType: "Sandy Loam",
    badge: "Guest Account"
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('agrivision_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEMO_ACCOUNTS.farmer;
      }
    }
    return DEMO_ACCOUNTS.farmer; // Default to farmer so user instantly sees a rich live dashboard!
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authNotification, setAuthNotification] = useState(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('agrivision_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('agrivision_user');
    }
  }, [user]);

  const loginWithCredentials = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    
    if (cleanEmail === DEMO_ACCOUNTS.farmer.email.toLowerCase() && password === DEMO_ACCOUNTS.farmer.password) {
      setUser(DEMO_ACCOUNTS.farmer);
      notify("Welcome back, Ramesh Patel! Logged in as Farmer.");
      return { success: true };
    }
    
    if (cleanEmail === DEMO_ACCOUNTS.expert.email.toLowerCase() && password === DEMO_ACCOUNTS.expert.password) {
      setUser(DEMO_ACCOUNTS.expert);
      notify("Welcome back, Dr. Jenkins! Logged in as Plant Pathologist.");
      return { success: true };
    }

    if (cleanEmail === DEMO_ACCOUNTS.guest.email.toLowerCase()) {
      setUser(DEMO_ACCOUNTS.guest);
      notify("Logged in as Guest Farmer.");
      return { success: true };
    }

    // Check custom registered users from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('agrivision_registered_users') || '[]');
    const matched = registeredUsers.find(u => u.email.toLowerCase() === cleanEmail && u.password === password);
    if (matched) {
      setUser(matched);
      notify(`Welcome back, ${matched.name}!`);
      return { success: true };
    }

    return { success: false, error: "Invalid email or password. You can use the quick 1-click Demo buttons below!" };
  };

  const loginAsDemo = (roleKey) => {
    const account = DEMO_ACCOUNTS[roleKey] || DEMO_ACCOUNTS.farmer;
    setUser(account);
    notify(`Switched session to ${account.name} (${account.roleLabel})`);
  };

  const registerUser = (newUserData) => {
    const fullUser = {
      ...newUserData,
      role: newUserData.role || 'farmer',
      roleLabel: newUserData.role === 'agronomist' ? 'Plant Pathologist' : 'Farm Owner',
      avatar: newUserData.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      badge: "Member"
    };

    const registeredUsers = JSON.parse(localStorage.getItem('agrivision_registered_users') || '[]');
    registeredUsers.push(fullUser);
    localStorage.setItem('agrivision_registered_users', JSON.stringify(registeredUsers));

    setUser(fullUser);
    notify(`Account created successfully! Welcome, ${fullUser.name}`);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    notify("Logged out successfully.");
  };

  const notify = (msg) => {
    setAuthNotification(msg);
    setTimeout(() => {
      setAuthNotification(null);
    }, 4000);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthModalOpen,
      setIsAuthModalOpen,
      authNotification,
      loginWithCredentials,
      loginAsDemo,
      registerUser,
      logout,
      demoAccounts: DEMO_ACCOUNTS
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
