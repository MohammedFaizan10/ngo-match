import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useApp } from '@/context/AppContext';
import { SKILLS_OPTIONS } from '@/types';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export const RegisterForm = ({ onSwitchToLogin }: RegisterFormProps) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    type: 'volunteer' as 'volunteer' | 'ngo',
    skills: [] as string[]
  });
  const { register } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(formData);
  };

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  return (
    <Card className="w-full max-w-md shadow-card">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Join Impact Match</CardTitle>
        <CardDescription>Create your account to start making a difference</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your full name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="reg-username">Username</Label>
            <Input
              id="reg-username"
              type="text"
              placeholder="Choose a username"
              value={formData.username}
              onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="reg-password">Password</Label>
            <Input
              id="reg-password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              required
            />
          </div>
          
          <div className="space-y-3">
            <Label>I am a:</Label>
            <RadioGroup 
              value={formData.type} 
              onValueChange={(value: 'volunteer' | 'ngo') => 
                setFormData(prev => ({ ...prev, type: value, skills: [] }))
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="volunteer" id="volunteer" />
                <Label htmlFor="volunteer">Volunteer - I want to help with projects</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ngo" id="ngo" />
                <Label htmlFor="ngo">NGO - I want to post volunteer opportunities</Label>
              </div>
            </RadioGroup>
          </div>
          
          {formData.type === 'volunteer' && (
            <div className="space-y-3">
              <Label>My Skills (select all that apply):</Label>
              <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto p-2 border rounded-md">
                {SKILLS_OPTIONS.map(skill => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox
                      id={skill}
                      checked={formData.skills.includes(skill)}
                      onCheckedChange={() => handleSkillToggle(skill)}
                    />
                    <Label htmlFor={skill} className="text-xs">{skill}</Label>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <Button type="submit" className="w-full hero-gradient transition-smooth hover:shadow-glow">
            Create Account
          </Button>
          
          <div className="text-center pt-4">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-primary font-medium hover:underline transition-smooth"
              >
                Sign in here
              </button>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};