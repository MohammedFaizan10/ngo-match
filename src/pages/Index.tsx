import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { VolunteerDashboard } from '@/components/dashboard/VolunteerDashboard';
import { NGODashboard } from '@/components/dashboard/NGODashboard';
import { Header } from '@/components/Header';
import heroImage from '@/assets/hero-impact.jpg';
import { Heart, Users, Target, Zap } from 'lucide-react';

const Index = () => {
  const { currentUser } = useApp();
  const [showRegister, setShowRegister] = useState(false);

  // If user is logged in, show the appropriate dashboard
  if (currentUser) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          {currentUser.type === 'volunteer' ? (
            <VolunteerDashboard />
          ) : (
            <NGODashboard />
          )}
        </main>
      </div>
    );
  }

  // If no user logged in, show landing page with auth
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage}
            alt="Volunteers making impact together"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-gradient opacity-80"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="text-white space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold">Impact Match</h1>
              </div>
              
              <h2 className="text-5xl lg:text-6xl font-bold leading-tight">
                Connect Skills
                <br />
                <span className="text-primary-glow">Create Impact</span>
              </h2>
              
              <p className="text-xl text-white/90 leading-relaxed max-w-lg">
                Connecting passionate volunteers with NGOs to create meaningful change. 
                Find opportunities that match your skills and make a real difference in the world.
              </p>
              
              {/* Features */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center space-x-3">
                  <Target className="w-5 h-5 text-primary-glow" />
                  <span className="text-white/90">Skill Matching</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-primary-glow" />
                  <span className="text-white/90">Trusted NGOs</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Heart className="w-5 h-5 text-primary-glow" />
                  <span className="text-white/90">Real Impact</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="w-5 h-5 text-primary-glow" />
                  <span className="text-white/90">Easy Apply</span>
                </div>
              </div>
            </div>
            
            {/* Auth Forms */}
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                {showRegister ? (
                  <RegisterForm onSwitchToLogin={() => setShowRegister(false)} />
                ) : (
                  <LoginForm onSwitchToRegister={() => setShowRegister(true)} />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-muted-foreground">Volunteers</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">200+</div>
              <div className="text-muted-foreground">NGO Partners</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">1,000+</div>
              <div className="text-muted-foreground">Projects Completed</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">50k+</div>
              <div className="text-muted-foreground">Lives Impacted</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How Impact Match Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple steps to start making a difference or find the perfect volunteers for your cause
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 hero-gradient rounded-full flex items-center justify-center mx-auto shadow-glow">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Sign Up</h3>
              <p className="text-muted-foreground">
                Create your profile as a volunteer with your skills or as an NGO looking for help
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 hero-gradient rounded-full flex items-center justify-center mx-auto shadow-glow">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Find Matches</h3>
              <p className="text-muted-foreground">
                Discover projects that match your skills or find skilled volunteers for your cause
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 hero-gradient rounded-full flex items-center justify-center mx-auto shadow-glow">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Make Impact</h3>
              <p className="text-muted-foreground">
                Apply to projects or review applications to start creating positive change together
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
