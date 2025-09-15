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
    <header className="border-b bg-card/30 backdrop-blur-xl sticky top-0 z-50 shadow-soft">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-all duration-300 group">
          <div className="w-10 h-10 gradient-primary rounded-2xl flex items-center justify-center shadow-magical group-hover:animate-wiggle">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold font-display text-gradient">Impact Connect</h1>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                isActive(item.path)
                  ? 'gradient-primary text-primary-foreground shadow-medium animate-bounce-gentle'
                  : 'text-muted-foreground hover:text-foreground hover:bg-primary/5 hover:shadow-soft border border-transparent hover:border-primary/20'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span className="font-body">{item.label}</span>
            </Link>
          ))}
        </nav>
        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <>
              <div className="hidden sm:flex items-center space-x-3 px-4 py-2 rounded-xl bg-primary/5 border border-primary/20">
                <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center shadow-soft">
                  {currentUser.type === 'volunteer' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Building2 className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className="text-sm">
                  <div className="font-medium font-body">{currentUser.name || currentUser.username}</div>
                  <div className="text-muted-foreground capitalize text-xs">{currentUser.type}</div>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={logout}
                className="hover:bg-destructive hover:text-destructive-foreground hover:border-destructive animate-fade-in"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <Button size="sm" variant="magical" className="animate-sparkle">
              <Link to="/home" className="flex items-center">
                Login
              </Link>
            </Button>
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