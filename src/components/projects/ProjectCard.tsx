import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Users, Calendar, TrendingUp } from 'lucide-react';
import { Project } from '@/types';
import { useApp } from '@/context/AppContext';

interface ProjectCardProps {
  project: Project;
  showApplicantCount?: boolean;
  isPreview?: boolean;
}

export const ProjectCard = ({ project, showApplicantCount = true, isPreview = false }: ProjectCardProps) => {
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
    <Card className="shadow-soft hover:shadow-magical transition-all duration-300 hover-lift animate-fade-in rounded-2xl gradient-card border border-primary/5">
      <CardHeader>
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold font-display text-foreground hover:text-gradient transition-colors">{project.title}</CardTitle>
            <CardDescription className="font-medium text-primary font-body mt-1">
              {project.ngoName}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {showApplicantCount && project.applicants.length > 0 && (
              <Badge variant="secondary" className="flex items-center gap-1 animate-scale-in shadow-soft hover:shadow-medium bg-success-light text-success border border-success/20">
                <Users className="w-3 h-3" />
                {project.applicants.length}
                {currentUser?.type === 'ngo' && currentUser.id === project.ngoId && (
                  <TrendingUp className="w-3 h-3 ml-1 animate-bounce-gentle" />
                )}
              </Badge>
            )}
            {userApplication && (
              <Badge 
                className={`animate-fade-in shadow-soft ${
                  userApplication.status === 'accepted' 
                    ? 'bg-success-light text-success border-success/30 shadow-glow' 
                    : userApplication.status === 'rejected'
                    ? 'bg-destructive/10 text-destructive border-destructive/30'
                    : 'bg-warning-light text-warning border-warning/30 animate-pulse-soft'
                }`}
              >
                {userApplication.status === 'accepted' ? '✨ Accepted' : 
                 userApplication.status === 'rejected' ? '❌ Not Selected' : '⏳ Pending'}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {project.description}
        </p>
        
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {project.requiredSkills.map(skill => (
              <Badge key={skill} variant="outline" className="text-xs font-body shadow-soft hover:shadow-medium bg-accent-light text-accent border-accent/20 hover:bg-accent hover:text-accent-foreground transition-all duration-300">
                {skill}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground font-body">
            {project.location && (
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-muted/50">
                <MapPin className="w-3 h-3 text-primary" />
                {project.location}
              </div>
            )}
            {project.duration && (
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-muted/50">
                <Clock className="w-3 h-3 text-accent" />
                {project.duration}
              </div>
            )}
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-muted/50">
              <Calendar className="w-3 h-3 text-success" />
              {new Date(project.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
        
        {isPreview ? (
          <Button 
            disabled 
            variant="soft"
            className="w-full cursor-not-allowed opacity-70 animate-bounce-gentle"
          >
            💫 Sign up to Apply
          </Button>
        ) : currentUser?.type === 'volunteer' && (
          <Button 
            onClick={handleApply}
            disabled={!canApply}
            variant={hasApplied ? 'soft' : 'magical'}
            className={`w-full font-body font-semibold ${
              hasApplied 
                ? 'animate-sparkle' 
                : 'hover:animate-wiggle'
            }`}
          >
            {hasApplied ? (
              userApplication?.status === 'accepted' ? '🎉 Accepted!' :
              userApplication?.status === 'rejected' ? '💔 Not Selected' :
              '⏳ Applied - Pending'
            ) : '💖 Apply Now'}
          </Button>
        )}
        
        {currentUser?.type === 'ngo' && currentUser.id === project.ngoId && (
          <div className="gradient-glow rounded-2xl p-4 border border-primary/20 shadow-magical animate-glow">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium font-display text-primary">✨ Your Project</span>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary animate-bounce-gentle" />
                <span className="font-bold text-primary text-lg">{project.applicants.length}</span>
                <span className="text-sm text-muted-foreground font-body">applicant{project.applicants.length !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};