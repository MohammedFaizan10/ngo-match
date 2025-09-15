import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Users, Calendar } from 'lucide-react';
import { Project } from '@/types';
import { useApp } from '@/context/AppContext';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const { currentUser, applyToProject } = useApp();
  
  const hasApplied = currentUser?.appliedProjects?.includes(project.id);
  const canApply = currentUser?.type === 'volunteer' && !hasApplied;

  const handleApply = () => {
    if (canApply) {
      applyToProject(project.id);
    }
  };

  return (
    <Card className="shadow-card hover:shadow-elegant transition-smooth animate-slide-up">
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold">{project.title}</CardTitle>
            <CardDescription className="font-medium text-primary">
              {project.ngoName}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {project.applicants.length}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {project.description}
        </p>
        
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1">
            {project.requiredSkills.map(skill => (
              <Badge key={skill} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {project.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {project.location}
              </div>
            )}
            {project.duration && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {project.duration}
              </div>
            )}
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(project.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
        
        {currentUser?.type === 'volunteer' && (
          <Button 
            onClick={handleApply}
            disabled={!canApply}
            className={`w-full transition-smooth ${
              hasApplied 
                ? 'success-glow border border-primary/20' 
                : 'hero-gradient hover:shadow-glow'
            }`}
            variant={hasApplied ? 'outline' : 'default'}
          >
            {hasApplied ? 'Applied ✓' : 'Apply Now'}
          </Button>
        )}
        
        {currentUser?.type === 'ngo' && currentUser.id === project.ngoId && (
          <div className="text-sm text-muted-foreground">
            <p className="font-medium">Your project • {project.applicants.length} applicant(s)</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};