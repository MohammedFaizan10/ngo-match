import React from 'react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { LogOut, User, Heart, Building2 } from 'lucide-react';

export const Header = () => {
  const { currentUser, logout } = useApp();

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 hero-gradient rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold">Impact Match</h1>
        </div>
        
        {currentUser && (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
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
          </div>
        )}
      </div>
    </header>
  );
};