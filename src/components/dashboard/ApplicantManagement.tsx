import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';
import { User, Check, X, Clock, Mail, MapPin } from 'lucide-react';

export const ApplicantManagement = () => {
  const { currentUser, projects, users, applications, updateApplicationStatus } = useApp();
  
  const myProjects = projects.filter(p => p.ngoId === currentUser?.id);
  const myApplications = applications?.filter(app => 
    myProjects.some(project => project.id === app.projectId)
  ) || [];

  const getApplicantDetails = (volunteerId: string) => {
    return users.find(user => user.id === volunteerId);
  };

  const getProjectDetails = (projectId: string) => {
    return projects.find(project => project.id === projectId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-success text-success-foreground';
      case 'rejected': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted': return <Check className="w-3 h-3" />;
      case 'rejected': return <X className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  if (myApplications.length === 0) {
    return (
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Application Management
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No applications yet. When volunteers apply to your projects, you'll be able to manage them here.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          Application Management ({myApplications.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {myApplications.map(application => {
            const applicant = getApplicantDetails(application.volunteerId);
            const project = getProjectDetails(application.projectId);
            
            if (!applicant || !project) return null;
            
            return (
              <div key={application.id} className="border border-border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{applicant.name || applicant.username}</h4>
                      <Badge className={getStatusColor(application.status)}>
                        {getStatusIcon(application.status)}
                        <span className="ml-1 capitalize">{application.status}</span>
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Applied to: <span className="font-medium">{project.title}</span></p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Applied on {new Date(application.appliedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Applicant Skills */}
                {applicant.skills && applicant.skills.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {applicant.skills.map(skill => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skill Match Indicator */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">Skill Match:</p>
                  <div className="flex flex-wrap gap-1">
                    {project.requiredSkills.map(skill => {
                      const hasSkill = applicant.skills?.includes(skill);
                      return (
                        <Badge 
                          key={skill} 
                          variant={hasSkill ? "default" : "outline"}
                          className={hasSkill ? "bg-primary text-primary-foreground" : "text-muted-foreground"}
                        >
                          {hasSkill && <Check className="w-3 h-3 mr-1" />}
                          {skill}
                        </Badge>
                      );
                    })}
                  </div>
                </div>

                {/* Action Buttons */}
                {application.status === 'pending' && (
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      onClick={() => updateApplicationStatus(application.id, 'accepted')}
                      className="bg-success hover:bg-success/90 text-success-foreground"
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => updateApplicationStatus(application.id, 'rejected')}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};