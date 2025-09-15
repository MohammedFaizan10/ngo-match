import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useApp } from '@/context/AppContext';
import { SKILLS_OPTIONS } from '@/types';
import { Plus } from 'lucide-react';

export const CreateProjectForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requiredSkills: [] as string[],
    location: '',
    duration: ''
  });
  const { createProject } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createProject(formData);
    setFormData({
      title: '',
      description: '',
      requiredSkills: [],
      location: '',
      duration: ''
    });
    setIsOpen(false);
  };

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      requiredSkills: prev.requiredSkills.includes(skill)
        ? prev.requiredSkills.filter(s => s !== skill)
        : [...prev.requiredSkills, skill]
    }));
  };

  if (!isOpen) {
    return (
      <Button 
        onClick={() => setIsOpen(true)}
        className="hero-gradient transition-smooth hover:shadow-glow"
      >
        <Plus className="w-4 h-4 mr-2" />
        Post New Opportunity
      </Button>
    );
  }

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Create Volunteer Opportunity</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="project-title">Project Title</Label>
            <Input
              id="project-title"
              type="text"
              placeholder="e.g., Website Redesign for Charity"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="project-description">Description</Label>
            <Textarea
              id="project-description"
              placeholder="Describe the project, what volunteers will do, and the impact they'll make..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="min-h-[100px]"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="project-location">Location</Label>
              <Input
                id="project-location"
                type="text"
                placeholder="Remote, City, etc."
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="project-duration">Duration</Label>
              <Input
                id="project-duration"
                type="text"
                placeholder="2-3 months, 10 hours/week, etc."
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <Label>Required Skills:</Label>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-3 border rounded-md">
              {SKILLS_OPTIONS.map(skill => (
                <div key={skill} className="flex items-center space-x-2">
                  <Checkbox
                    id={`skill-${skill}`}
                    checked={formData.requiredSkills.includes(skill)}
                    onCheckedChange={() => handleSkillToggle(skill)}
                  />
                  <Label htmlFor={`skill-${skill}`} className="text-sm">
                    {skill}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button type="submit" className="hero-gradient transition-smooth hover:shadow-glow">
              Post Opportunity
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              className="transition-smooth"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};