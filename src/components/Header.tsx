import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { LogOut, User, Heart, Building2, Home, Search, Plus, Info } from 'lucide-react';

export const Header = () => {
  const { currentUser, logout } = useApp();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/home', label: 'Home', icon: Home },
    { path: '/opportunities', label: 'Find Opportunities', icon: Search },
    ...(currentUser?.type === 'ngo' ? [{ path: '/post-opportunity', label: 'Post Opportunity', icon: Plus }] : []),
    { path: '/about', label: 'About', icon: Info },
  ];

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 hero-gradient rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold">Impact Connect</h1>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive(item.path)
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        
        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <>
              <div className="hidden sm:flex items-center space-x-2 text-sm">
                {currentUser.type === 'volunteer' ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Building2 className="w-4 h-4" />
                )}
                <span className="font-medium">{currentUser.name || currentUser.username}</span>
                <span className="text-muted-foreground capitalize">({currentUser.type})</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={logout}
                className="transition-smooth hover:bg-destructive hover:text-destructive-foreground"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <Link to="/home">
              <Button size="sm" className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90">
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          {/* Mobile navigation can be added here if needed */}
        </div>
      </div>
    </header>
  );
};