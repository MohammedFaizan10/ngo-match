import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Users, Calendar, TrendingUp } from 'lucide-react';
import { Project } from '@/types';
import { useApp } from '@/context/AppContext';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const { currentUser, applyToProject, applications } = useApp();
  
  const hasApplied = currentUser?.appliedProjects?.includes(project.id);
  const canApply = currentUser?.type === 'volunteer' && !hasApplied;
  
  // Get application status for volunteer
  const userApplication = applications?.find(app => 
    app.projectId === project.id && app.volunteerId === currentUser?.id
  );

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
          <div className="flex items-center gap-2">
            {project.applicants.length > 0 && (
              <Badge variant="secondary" className="flex items-center gap-1 animate-scale-in">
                <Users className="w-3 h-3" />
                {project.applicants.length}
                {currentUser?.type === 'ngo' && currentUser.id === project.ngoId && (
                  <TrendingUp className="w-3 h-3 ml-1" />
                )}
              </Badge>
            )}
            {userApplication && (
              <Badge 
                className={`animate-fade-in ${
                  userApplication.status === 'accepted' 
                    ? 'bg-success/10 text-success border-success/20' 
                    : userApplication.status === 'rejected'
                    ? 'bg-destructive/10 text-destructive border-destructive/20'
                    : 'bg-warning/10 text-warning border-warning/20'
                }`}
              >
                {userApplication.status === 'accepted' ? '✓ Accepted' : 
                 userApplication.status === 'rejected' ? '✗ Rejected' : '⏳ Pending'}
              </Badge>
            )}
          </div>
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
            {hasApplied ? (
              userApplication?.status === 'accepted' ? 'Accepted ✓' :
              userApplication?.status === 'rejected' ? 'Not Selected' :
              'Applied - Pending'
            ) : 'Apply Now'}
          </Button>
        )}
        
        {currentUser?.type === 'ngo' && currentUser.id === project.ngoId && (
          <div className="bg-primary/5 rounded-lg p-3 border border-primary/10">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-primary">Your Project</span>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="font-bold text-primary">{project.applicants.length}</span>
                <span className="text-sm text-muted-foreground">applicant{project.applicants.length !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};