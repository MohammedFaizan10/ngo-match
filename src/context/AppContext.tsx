import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Project, AppData } from '@/types';
import { toast } from '@/hooks/use-toast';

interface AppContextType {
  currentUser: User | null;
  projects: Project[];
  login: (username: string, password: string) => boolean;
  register: (userData: Omit<User, 'id' | 'appliedProjects'>) => boolean;
  logout: () => void;
  createProject: (projectData: Omit<Project, 'id' | 'ngoId' | 'ngoName' | 'applicants' | 'createdAt'>) => void;
  applyToProject: (projectId: string) => void;
  refreshProjects: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

// Initialize default data
const initializeData = (): AppData => {
  const existingData = localStorage.getItem('impactMatchData');
  if (existingData) {
    return JSON.parse(existingData);
  }

  const defaultData: AppData = {
    users: [
      {
        id: 'demo-volunteer',
        username: 'volunteer_demo',
        password: 'demo123',
        type: 'volunteer',
        name: 'Sarah Chen',
        skills: ['Web Development', 'UI/UX Design'],
        appliedProjects: []
      },
      {
        id: 'demo-ngo',
        username: 'greenearth_ngo',
        password: 'demo123',
        type: 'ngo',
        name: 'Green Earth Foundation'
      }
    ],
    projects: [
      {
        id: 'project-1',
        ngoId: 'demo-ngo',
        ngoName: 'Green Earth Foundation',
        title: 'Website Redesign for Environmental Campaign',
        description: 'We need a skilled web developer to redesign our website to better showcase our environmental initiatives and make it more engaging for donors and volunteers.',
        requiredSkills: ['Web Development', 'UI/UX Design', 'Graphic Design'],
        applicants: [],
        createdAt: new Date().toISOString(),
        location: 'Remote',
        duration: '2-3 months'
      },
      {
        id: 'project-2', 
        ngoId: 'demo-ngo',
        ngoName: 'Green Earth Foundation',
        title: 'Social Media Content Creation',
        description: 'Help us create compelling social media content to raise awareness about climate change and promote our upcoming tree planting events.',
        requiredSkills: ['Digital Marketing', 'Content Writing', 'Graphic Design'],
        applicants: [],
        createdAt: new Date().toISOString(),
        location: 'Remote',
        duration: '1-2 months'
      }
    ]
  };

  localStorage.setItem('impactMatchData', JSON.stringify(defaultData));
  return defaultData;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<AppData>(() => initializeData());
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Load user session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      const existingUser = data.users.find(u => u.id === user.id);
      if (existingUser) {
        setCurrentUser(existingUser);
      }
    }
  }, [data.users]);

  // Update localStorage when data changes
  useEffect(() => {
    localStorage.setItem('impactMatchData', JSON.stringify(data));
  }, [data]);

  const login = (username: string, password: string): boolean => {
    const user = data.users.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      toast({ title: "Welcome back!", description: `Logged in as ${user.name || user.username}` });
      return true;
    }
    toast({ title: "Login failed", description: "Invalid username or password", variant: "destructive" });
    return false;
  };

  const register = (userData: Omit<User, 'id' | 'appliedProjects'>): boolean => {
    const existingUser = data.users.find(u => u.username === userData.username);
    if (existingUser) {
      toast({ title: "Registration failed", description: "Username already exists", variant: "destructive" });
      return false;
    }

    const newUser: User = {
      ...userData,
      id: `user-${Date.now()}`,
      appliedProjects: []
    };

    setData(prev => ({
      ...prev,
      users: [...prev.users, newUser]
    }));

    setCurrentUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    toast({ title: "Welcome to Impact Match!", description: "Account created successfully" });
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    toast({ title: "Logged out", description: "See you next time!" });
  };

  const createProject = (projectData: Omit<Project, 'id' | 'ngoId' | 'ngoName' | 'applicants' | 'createdAt'>) => {
    if (!currentUser || currentUser.type !== 'ngo') return;

    const newProject: Project = {
      ...projectData,
      id: `project-${Date.now()}`,
      ngoId: currentUser.id,
      ngoName: currentUser.name || currentUser.username,
      applicants: [],
      createdAt: new Date().toISOString()
    };

    setData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));

    toast({ title: "Project created!", description: "Your volunteer opportunity has been posted" });
  };

  const applyToProject = (projectId: string) => {
    if (!currentUser || currentUser.type !== 'volunteer') return;

    // Check if already applied
    if (currentUser.appliedProjects?.includes(projectId)) {
      toast({ title: "Already applied", description: "You have already applied to this project", variant: "destructive" });
      return;
    }

    setData(prev => ({
      ...prev,
      users: prev.users.map(u => 
        u.id === currentUser.id 
          ? { ...u, appliedProjects: [...(u.appliedProjects || []), projectId] }
          : u
      ),
      projects: prev.projects.map(p =>
        p.id === projectId
          ? { ...p, applicants: [...p.applicants, currentUser.id] }
          : p
      )
    }));

    // Update current user state
    setCurrentUser(prev => prev ? {
      ...prev,
      appliedProjects: [...(prev.appliedProjects || []), projectId]
    } : null);

    toast({ title: "Application sent!", description: "The NGO will review your application" });
  };

  const refreshProjects = () => {
    const savedData = localStorage.getItem('impactMatchData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setData(parsedData);
    }
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      projects: data.projects,
      login,
      register,
      logout,
      createProject,
      applyToProject,
      refreshProjects
    }}>
      {children}
    </AppContext.Provider>
  );
};