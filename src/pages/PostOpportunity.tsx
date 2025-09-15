import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useApp } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  X, 
  MapPin, 
  Clock, 
  Users, 
  Target,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

const PostOpportunity = () => {
  const { currentUser, createProject } = useApp();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requiredSkills: [] as string[],
    location: '',
    duration: '',
    category: '',
    requirements: '',
    benefits: ''
  });
  
  const [newSkill, setNewSkill] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  // Redirect if not NGO
  if (!currentUser || currentUser.type !== 'ngo') {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Alert className="border-destructive/20 bg-destructive/5">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You need to be logged in as an NGO to post opportunities. 
              Please login or register as an NGO to continue.
            </AlertDescription>
          </Alert>
        </main>
      </div>
    );
  }

  const availableSkills = [
    'Web Development', 'Mobile Development', 'UI/UX Design', 'Graphic Design',
    'Content Writing', 'Copywriting', 'Social Media Marketing', 'Digital Marketing',
    'Data Analysis', 'Project Management', 'Event Planning', 'Photography',
    'Video Editing', 'Translation', 'Teaching', 'Fundraising', 'Research',
    'Accounting', 'Legal Advice', 'Consulting', 'Mentoring', 'Public Speaking'
  ];

  const categories = [
    'Education', 'Environment', 'Healthcare', 'Poverty Alleviation',
    'Human Rights', 'Technology for Good', 'Community Development',
    'Arts & Culture', 'Disaster Relief', 'Animal Welfare'
  ];

  const durations = [
    'Short-term (< 1 month)',
    'Medium-term (1-3 months)',
    'Long-term (> 3 months)',
    'Ongoing'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addSkill = (skill: string) => {
    if (skill && !formData.requiredSkills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        requiredSkills: [...prev.requiredSkills, skill]
      }));
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleAddCustomSkill = () => {
    if (newSkill.trim()) {
      addSkill(newSkill.trim());
      setNewSkill('');
    }
  };

  const validateForm = () => {
    const newErrors: string[] = [];
    
    if (!formData.title.trim()) newErrors.push('Project title is required');
    if (!formData.description.trim()) newErrors.push('Project description is required');
    if (formData.requiredSkills.length === 0) newErrors.push('At least one skill is required');
    if (!formData.category) newErrors.push('Project category is required');
    if (!formData.duration) newErrors.push('Project duration is required');
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await createProject(formData);
      navigate('/home');
    } catch (error) {
      console.error('Failed to create project:', error);
      setErrors(['Failed to create project. Please try again.']);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Post New Opportunity</h1>
          <p className="text-xl text-muted-foreground">
            Create a volunteer opportunity and connect with skilled individuals 
            who want to support your cause.
          </p>
        </div>

        {errors.length > 0 && (
          <Alert className="mb-6 border-destructive/20 bg-destructive/5">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <div className="font-medium mb-1">Please fix the following errors:</div>
              <ul className="list-disc list-inside space-y-1">
                {errors.map((error, index) => (
                  <li key={index} className="text-sm">{error}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Project Title *</label>
                <Input
                  placeholder="e.g., Website Development for Education Initiative"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Project Description *</label>
                <Textarea
                  placeholder="Describe your project, its goals, and what volunteers will be doing..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="text-base"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category *</label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Duration *</label>
                  <Select value={formData.duration} onValueChange={(value) => handleInputChange('duration', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      {durations.map(duration => (
                        <SelectItem key={duration} value={duration}>{duration}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input
                  placeholder="e.g., Remote, New York, USA, or Hybrid"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="text-base"
                />
              </div>
            </CardContent>
          </Card>

          {/* Required Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Required Skills *
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Selected Skills */}
              {formData.requiredSkills.length > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Selected Skills</label>
                  <div className="flex flex-wrap gap-2">
                    {formData.requiredSkills.map(skill => (
                      <Badge 
                        key={skill} 
                        variant="default"
                        className="flex items-center gap-1 px-3 py-1"
                      >
                        {skill}
                        <X 
                          className="w-3 h-3 cursor-pointer hover:text-destructive" 
                          onClick={() => removeSkill(skill)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Add Skills */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Choose from popular skills</label>
                  <div className="flex flex-wrap gap-2">
                    {availableSkills
                      .filter(skill => !formData.requiredSkills.includes(skill))
                      .map(skill => (
                      <Badge 
                        key={skill} 
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                        onClick={() => addSkill(skill)}
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Or add a custom skill</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter skill name..."
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomSkill())}
                    />
                    <Button type="button" onClick={handleAddCustomSkill}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Additional Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Requirements</label>
                <Textarea
                  placeholder="Any specific requirements, qualifications, or expectations for volunteers..."
                  value={formData.requirements}
                  onChange={(e) => handleInputChange('requirements', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Benefits for Volunteers</label>
                <Textarea
                  placeholder="What will volunteers gain from this experience? (e.g., skills, experience, networking, certificates)..."
                  value={formData.benefits}
                  onChange={(e) => handleInputChange('benefits', e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex gap-4 justify-end">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/home')}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 min-w-32"
            >
              {isSubmitting ? 'Creating...' : 'Post Opportunity'}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default PostOpportunity;