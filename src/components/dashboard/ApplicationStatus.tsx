import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';
import { CheckCircle, Clock, XCircle, MapPin, Calendar } from 'lucide-react';

export const ApplicationStatus = () => {
  const { currentUser, projects, applications } = useApp();
  
  const userApplications = applications?.filter(app => app.volunteerId === currentUser?.id) || [];
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted': return <CheckCircle className="w-4 h-4 text-success" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-destructive" />;
      default: return <Clock className="w-4 h-4 text-warning" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-success/10 text-success border-success/20';
      case 'rejected': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-warning/10 text-warning border-warning/20';
    }
  };

  const getProjectDetails = (projectId: string) => {
    return projects.find(p => p.id === projectId);
  };

  if (userApplications.length === 0) {
    return null;
  }

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Application Status ({userApplications.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {userApplications.map(application => {
            const project = getProjectDetails(application.projectId);
            if (!project) return null;

            return (
              <div 
                key={application.id} 
                className="border border-border rounded-lg p-4 space-y-3 animate-fade-in hover-scale"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h4 className="font-semibold text-sm">{project.title}</h4>
                    <p className="text-xs text-muted-foreground">{project.ngoName}</p>
                  </div>
                  <Badge className={`${getStatusColor(application.status)} animate-scale-in`}>
                    {getStatusIcon(application.status)}
                    <span className="ml-1 capitalize">{application.status}</span>
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  {project.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {project.location}
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Applied {new Date(application.appliedAt).toLocaleDateString()}
                  </div>
                </div>
                
                {application.status === 'pending' && (
                  <div className="text-xs text-muted-foreground bg-muted/50 rounded p-2">
                    <Clock className="w-3 h-3 inline mr-1" />
                    Your application is under review by the NGO.
                  </div>
                )}
                
                {application.status === 'accepted' && (
                  <div className="text-xs text-success bg-success/10 rounded p-2">
                    <CheckCircle className="w-3 h-3 inline mr-1" />
                    Congratulations! Your application has been accepted.
                  </div>
                )}
                
                {application.status === 'rejected' && (
                  <div className="text-xs text-destructive bg-destructive/10 rounded p-2">
                    <XCircle className="w-3 h-3 inline mr-1" />
                    This application was not selected. Keep trying!
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