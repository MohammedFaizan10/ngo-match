import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { VolunteerDashboard } from '@/components/dashboard/VolunteerDashboard';
import { NGODashboard } from '@/components/dashboard/NGODashboard';
import { Header } from '@/components/Header';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Heart, 
  Users, 
  Target, 
  Zap,
  TrendingUp,
  Globe,
  Info
} from 'lucide-react';

const Home = () => {
  const { currentUser, projects } = useApp();
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

  // If no user logged in, show app features with auth requirement for applications
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <section className="text-center py-12 mb-12">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl font-bold">
              Explore Impact Connect
            </h1>
            <p className="text-xl text-muted-foreground">
              Discover volunteer opportunities and see how skills create meaningful change. 
              <span className="font-semibold text-primary"> Sign up to start applying!</span>
            </p>
          </div>
        </section>

        {/* Login Alert */}
        <Alert className="mb-8 border-primary/20 bg-primary/5">
          <Info className="h-4 w-4" />
          <AlertDescription className="text-sm">
            You can browse all opportunities below, but you'll need to create an account to apply for projects and connect with organizations.
          </AlertDescription>
        </Alert>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Platform Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-primary">2,500+</div>
                    <div className="text-sm text-muted-foreground">Active Volunteers</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-primary">450+</div>
                    <div className="text-sm text-muted-foreground">Partner NGOs</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-primary">3,200+</div>
                    <div className="text-sm text-muted-foreground">Projects</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-primary">125k+</div>
                    <div className="text-sm text-muted-foreground">Lives Impacted</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Available Projects */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  Available Opportunities
                  <Badge variant="secondary" className="ml-2">
                    {projects.length} Active
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {projects.length > 0 ? (
                  <div className="grid gap-6">
                    {projects.slice(0, 6).map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        showApplicantCount={false}
                        isPreview={true}
                      />
                    ))}
                    {projects.length > 6 && (
                      <div className="text-center pt-4">
                        <p className="text-muted-foreground">
                          + {projects.length - 6} more opportunities available after signup
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No projects available at the moment. Check back soon!</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Key Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Platform Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                    <Target className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <div className="font-medium">Smart Matching</div>
                      <div className="text-sm text-muted-foreground">AI-powered skill matching</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                    <Users className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <div className="font-medium">Verified NGOs</div>
                      <div className="text-sm text-muted-foreground">Trusted organizations only</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                    <Heart className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <div className="font-medium">Real Impact</div>
                      <div className="text-sm text-muted-foreground">Measurable outcomes</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                    <Zap className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <div className="font-medium">Easy Process</div>
                      <div className="text-sm text-muted-foreground">Streamlined applications</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Auth */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Join Impact Connect</CardTitle>
                </CardHeader>
                <CardContent>
                  {showRegister ? (
                    <RegisterForm onSwitchToLogin={() => setShowRegister(false)} />
                  ) : (
                    <LoginForm onSwitchToRegister={() => setShowRegister(true)} />
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Why Join?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 hero-gradient rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Heart className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">Apply to Projects</div>
                      <div className="text-xs text-muted-foreground">Connect directly with NGOs</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 hero-gradient rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Target className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">Get Matched</div>
                      <div className="text-xs text-muted-foreground">Find opportunities that fit your skills</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 hero-gradient rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <TrendingUp className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">Track Impact</div>
                      <div className="text-xs text-muted-foreground">See your contributions in action</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;