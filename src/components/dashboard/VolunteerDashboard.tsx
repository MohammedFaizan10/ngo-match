import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { useApp } from '@/context/AppContext';
import { Heart, Target, CheckCircle } from 'lucide-react';

export const VolunteerDashboard = () => {
  const { currentUser, projects } = useApp();
  
  const appliedProjects = projects.filter(p => 
    currentUser?.appliedProjects?.includes(p.id)
  );
  
  const availableProjects = projects.filter(p => 
    !currentUser?.appliedProjects?.includes(p.id)
  );

  // Match projects based on skills
  const matchedProjects = availableProjects.filter(project =>
    project.requiredSkills.some(skill => 
      currentUser?.skills?.includes(skill)
    )
  );

  const otherProjects = availableProjects.filter(project =>
    !project.requiredSkills.some(skill => 
      currentUser?.skills?.includes(skill)
    )
  );

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">
          Welcome back, {currentUser?.name || currentUser?.username}!
        </h1>
        <p className="text-muted-foreground">
          Ready to make a difference? Find opportunities that match your skills.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-card">
          <CardContent className="flex items-center p-6">
            <Heart className="w-8 h-8 text-primary mr-3" />
            <div>
              <p className="text-2xl font-bold">{appliedProjects.length}</p>
              <p className="text-sm text-muted-foreground">Applications Sent</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="flex items-center p-6">
            <Target className="w-8 h-8 text-accent mr-3" />
            <div>
              <p className="text-2xl font-bold">{matchedProjects.length}</p>
              <p className="text-sm text-muted-foreground">Skill Matches</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="flex items-center p-6">
            <CheckCircle className="w-8 h-8 text-primary-glow mr-3" />
            <div>
              <p className="text-2xl font-bold">{currentUser?.skills?.length || 0}</p>
              <p className="text-sm text-muted-foreground">Skills Listed</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Your Skills */}
      {currentUser?.skills && currentUser.skills.length > 0 && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Your Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {currentUser.skills.map(skill => (
                <Badge key={skill} className="bg-primary/10 text-primary">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Applied Projects */}
      {appliedProjects.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Heart className="w-6 h-6 text-primary" />
            Your Applications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appliedProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}

      {/* Recommended Projects */}
      {matchedProjects.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Target className="w-6 h-6 text-accent" />
            Recommended for You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matchedProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}

      {/* Other Projects */}
      {otherProjects.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Other Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {otherProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {projects.length === 0 && (
        <Card className="shadow-card text-center p-8">
          <CardContent>
            <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No projects available yet</h3>
            <p className="text-muted-foreground">
              Check back soon for new volunteer opportunities!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
