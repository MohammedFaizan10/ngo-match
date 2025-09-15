import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import heroImage from '@/assets/hero-impact.jpg';
import { 
  Heart, 
  Users, 
  Target, 
  Zap, 
  ArrowRight, 
  CheckCircle, 
  Globe, 
  TrendingUp,
  Shield,
  Award,
  UserCheck,
  Building,
  Lightbulb,
  Handshake,
  Sparkles,
  Star,
  Wand2
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card/30 backdrop-blur-xl shadow-soft">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 group">
            <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center shadow-magical group-hover:animate-wiggle">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold font-display text-gradient">Impact Connect</span>
          </div>
          
          <Link to="/home">
            <Button variant="magical" size="lg" className="animate-sparkle font-display">
              Get Started
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img 
            src={heroImage}
            alt="Volunteers making impact together"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 gradient-primary opacity-90"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-success/20"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-32">
          <div className="max-w-4xl mx-auto text-center text-white space-y-8 animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20 animate-bounce-gentle">
              <Sparkles className="w-5 h-5 animate-sparkle" />
              <span className="font-body text-sm">Where Magic Meets Impact</span>
            </div>
            
            <h1 className="text-7xl lg:text-8xl font-bold font-display leading-tight animate-slide-up">
              Connect Skills,
              <br />
              <span className="text-white animate-glow">Create Magic</span>
            </h1>
            
            <p className="text-2xl leading-relaxed max-w-3xl mx-auto font-body opacity-90 animate-fade-in">
              ✨ Where passionate volunteers meet amazing NGOs to create sparkles of change. 
              Find your perfect match and make the world a little more magical! 🌟
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link to="/home">
                <Button size="xl" variant="soft" className="animate-bounce-gentle hover:animate-wiggle font-display">
                  🚀 Start Your Journey
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button size="xl" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-body animate-fade-in">
                💫 Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center border-none bg-background/50 backdrop-blur">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-primary mb-2">2,500+</div>
                <div className="text-muted-foreground font-medium">Active Volunteers</div>
              </CardContent>
            </Card>
            <Card className="text-center border-none bg-background/50 backdrop-blur">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-primary mb-2">450+</div>
                <div className="text-muted-foreground font-medium">Partner NGOs</div>
              </CardContent>
            </Card>
            <Card className="text-center border-none bg-background/50 backdrop-blur">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-primary mb-2">3,200+</div>
                <div className="text-muted-foreground font-medium">Projects Completed</div>
              </CardContent>
            </Card>
            <Card className="text-center border-none bg-background/50 backdrop-blur">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-primary mb-2">125k+</div>
                <div className="text-muted-foreground font-medium">Lives Impacted</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Powerful Features for Maximum Impact</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform is designed to make meaningful connections between skilled volunteers and organizations that need them most.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover-scale">
              <CardHeader>
                <div className="w-12 h-12 hero-gradient rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Smart Skill Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our AI-powered algorithm matches volunteers with projects based on their specific skills, experience, and interests.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-scale">
              <CardHeader>
                <div className="w-12 h-12 hero-gradient rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Verified Organizations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All NGOs are thoroughly vetted and verified to ensure your volunteer efforts go to legitimate, impactful causes.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-scale">
              <CardHeader>
                <div className="w-12 h-12 hero-gradient rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Impact Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Track your contributions and see the real-world impact of your volunteer work with detailed analytics and reports.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-scale">
              <CardHeader>
                <div className="w-12 h-12 hero-gradient rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Global Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Find volunteer opportunities both locally and globally, with remote work options for digital contributions.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-scale">
              <CardHeader>
                <div className="w-12 h-12 hero-gradient rounded-lg flex items-center justify-center mb-4">
                  <UserCheck className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Easy Application Process</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Streamlined application system that makes it simple to apply for opportunities and track application status.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-scale">
              <CardHeader>
                <div className="w-12 h-12 hero-gradient rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Recognition System</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Earn badges, certificates, and recognition for your volunteer contributions to showcase your impact.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">How Impact Connect Works</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Simple steps to start making a difference or find the perfect volunteers for your organization
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16">
            {/* For Volunteers */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-center mb-8 text-primary">For Volunteers</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 hero-gradient rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Create Your Profile</h4>
                    <p className="text-muted-foreground">Sign up and add your skills, interests, and availability to create a comprehensive volunteer profile.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 hero-gradient rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Discover Opportunities</h4>
                    <p className="text-muted-foreground">Browse projects that match your skills or explore new areas where you can make an impact.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 hero-gradient rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Apply & Connect</h4>
                    <p className="text-muted-foreground">Apply to projects that interest you and connect directly with NGOs to start making a difference.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* For NGOs */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-center mb-8 text-primary">For NGOs</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 hero-gradient rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Register Your Organization</h4>
                    <p className="text-muted-foreground">Create your NGO profile and get verified to access our network of passionate volunteers.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 hero-gradient rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Post Your Projects</h4>
                    <p className="text-muted-foreground">Create detailed project listings with required skills and let our matching algorithm find the right volunteers.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 hero-gradient rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Manage Applications</h4>
                    <p className="text-muted-foreground">Review applications, connect with volunteers, and manage your projects all from one dashboard.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skill Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Skills That Make a Difference</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From technical expertise to creative talents, every skill has the power to create positive change
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover-scale">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Building className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg">Technology</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Web Development</Badge>
                  <Badge variant="secondary">Mobile Apps</Badge>
                  <Badge variant="secondary">Data Analysis</Badge>
                  <Badge variant="secondary">AI/ML</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-scale">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg">Creative</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Graphic Design</Badge>
                  <Badge variant="secondary">Content Writing</Badge>
                  <Badge variant="secondary">Photography</Badge>
                  <Badge variant="secondary">Video Production</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-scale">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Handshake className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg">Business</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Marketing</Badge>
                  <Badge variant="secondary">Finance</Badge>
                  <Badge variant="secondary">Project Management</Badge>
                  <Badge variant="secondary">Strategy</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-scale">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg">Social Impact</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Education</Badge>
                  <Badge variant="secondary">Healthcare</Badge>
                  <Badge variant="secondary">Community Outreach</Badge>
                  <Badge variant="secondary">Fundraising</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-primary-glow/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold">Ready to Make an Impact?</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of volunteers and NGOs already creating positive change through Impact Connect. 
              Your skills can make a real difference in the world.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/home">
                <Button size="lg" className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 text-lg px-8 py-4">
                  Get Started Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 hero-gradient rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold">Impact Connect</span>
            </div>
            
            <p className="text-muted-foreground">
              © 2024 Impact Connect. Connecting skills to create meaningful change.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;