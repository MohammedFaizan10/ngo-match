import React from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Target, 
  Users, 
  Globe, 
  Award, 
  TrendingUp, 
  ArrowRight,
  CheckCircle,
  Lightbulb,
  HandHeart
} from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-16 mb-16">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 hero-gradient rounded-full flex items-center justify-center shadow-glow">
                <Heart className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl font-bold mb-6">
              About Impact Connect
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Impact Connect is a revolutionary platform that bridges the gap between skilled volunteers 
              and NGOs working to create positive change. We believe every skill has the power to make 
              a difference, and every cause deserves the right support.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="hover-scale">
            <CardHeader>
              <div className="w-12 h-12 hero-gradient rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                To democratize social impact by connecting passionate volunteers with meaningful 
                opportunities that match their skills and interests, while empowering NGOs to 
                find the talent they need to amplify their impact.
              </p>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader>
              <div className="w-12 h-12 hero-gradient rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-2xl">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                A world where every person can easily contribute their unique skills to causes 
                they care about, creating a global network of changemakers united in building 
                a better future for all.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Core Values */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do and shape our approach to connecting skills with causes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover-scale">
              <CardContent className="pt-6">
                <div className="w-16 h-16 hero-gradient rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Impact First</h3>
                <p className="text-muted-foreground">
                  Every feature we build and every connection we facilitate is designed to maximize 
                  real-world positive impact.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-scale">
              <CardContent className="pt-6">
                <div className="w-16 h-16 hero-gradient rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Community Driven</h3>
                <p className="text-muted-foreground">
                  We believe in the power of community and collaborative action to solve 
                  the world's most pressing challenges.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-scale">
              <CardContent className="pt-6">
                <div className="w-16 h-16 hero-gradient rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                <p className="text-muted-foreground">
                  We continuously innovate to make volunteering more accessible, 
                  effective, and rewarding for everyone involved.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Platform Impact */}
        <section className="py-16 bg-muted/30 rounded-2xl mb-16">
          <div className="container mx-auto px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Platform Impact</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Real numbers showing the difference we're making together
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-3">
                <div className="text-4xl font-bold text-primary">2,500+</div>
                <div className="text-muted-foreground">Active Volunteers</div>
                <div className="text-xs text-muted-foreground">Across 50+ countries</div>
              </div>
              
              <div className="space-y-3">
                <div className="text-4xl font-bold text-primary">450+</div>
                <div className="text-muted-foreground">Partner NGOs</div>
                <div className="text-xs text-muted-foreground">Verified organizations</div>
              </div>
              
              <div className="space-y-3">
                <div className="text-4xl font-bold text-primary">3,200+</div>
                <div className="text-muted-foreground">Projects Completed</div>
                <div className="text-xs text-muted-foreground">Success rate: 94%</div>
              </div>
              
              <div className="space-y-3">
                <div className="text-4xl font-bold text-primary">125k+</div>
                <div className="text-muted-foreground">Lives Impacted</div>
                <div className="text-xs text-muted-foreground">And growing daily</div>
              </div>
            </div>
          </div>
        </section>

        {/* How We Work */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How We Create Impact</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our approach to connecting skills with causes for maximum social impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover-scale">
              <CardContent className="pt-6">
                <div className="w-12 h-12 hero-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Smart Matching</h3>
                <p className="text-sm text-muted-foreground">
                  AI-powered algorithms match volunteers with projects based on skills, interests, and availability
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-scale">
              <CardContent className="pt-6">
                <div className="w-12 h-12 hero-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Verified Partners</h3>
                <p className="text-sm text-muted-foreground">
                  Rigorous vetting process ensures all NGOs are legitimate and impactful organizations
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-scale">
              <CardContent className="pt-6">
                <div className="w-12 h-12 hero-gradient rounded-full flex items-center">
                  <span className="text-white font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Seamless Connection</h3>
                <p className="text-sm text-muted-foreground">
                  Easy application and communication tools facilitate smooth collaboration
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-scale">
              <CardContent className="pt-6">
                <div className="w-12 h-12 hero-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">4</span>
                </div>
                <h3 className="font-semibold mb-2">Impact Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive analytics help measure and celebrate the real-world impact created
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Skills Categories */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Skills That Change the World</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every skill matters. From technical expertise to creative talents, 
              we help you find the perfect way to make a difference.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { category: 'Technology', skills: ['Web Development', 'Data Analysis', 'AI/ML', 'Mobile Apps'], color: 'bg-blue-500' },
              { category: 'Creative', skills: ['Design', 'Writing', 'Photography', 'Video'], color: 'bg-purple-500' },
              { category: 'Business', skills: ['Marketing', 'Finance', 'Strategy', 'Operations'], color: 'bg-green-500' },
              { category: 'Education', skills: ['Teaching', 'Training', 'Curriculum', 'Mentoring'], color: 'bg-orange-500' },
              { category: 'Healthcare', skills: ['Medical', 'Nutrition', 'Mental Health', 'Research'], color: 'bg-red-500' },
            ].map((item, index) => (
              <Card key={index} className="hover-scale">
                <CardHeader>
                  <div className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center mb-2`}>
                    <HandHeart className="w-5 h-5 text-white" />
                  </div>
                  <CardTitle className="text-lg">{item.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {item.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 text-center bg-gradient-to-br from-primary/10 via-primary-glow/5 to-background rounded-2xl">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">Ready to Make Your Impact?</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of changemakers who are already creating positive impact 
              through their skills and passion.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/home">
                <Button size="lg" className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90">
                  Get Started Today
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              
              <Link to="/opportunities">
                <Button size="lg" variant="outline">
                  Browse Opportunities
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;