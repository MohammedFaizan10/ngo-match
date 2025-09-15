import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Header';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, User, Check, X, Clock, Mail, Calendar, MapPin } from 'lucide-react';

const ApplicantsList = () => {
  const { currentUser, projects, users, applications, updateApplicationStatus } = useApp();
  const navigate = useNavigate();
  
  if (!currentUser || currentUser.type !== 'ngo') {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-destructive">Access Denied</h1>
            <p className="text-muted-foreground mt-2">Only NGOs can view this page.</p>
            <Button onClick={() => navigate('/')} className="mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
      case 'accepted': return 'bg-success/10 text-success border-success/20';
      case 'rejected': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-warning/10 text-warning border-warning/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted': return <Check className="w-3 h-3" />;
      case 'rejected': return <X className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  const groupedApplications = myApplications.reduce((acc, app) => {
    const project = getProjectDetails(app.projectId);
    if (project) {
      if (!acc[project.title]) {
        acc[project.title] = [];
      }
      acc[project.title].push(app);
    }
    return acc;
  }, {} as Record<string, typeof myApplications>);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="hover-scale"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold">All Applicants</h1>
            <p className="text-muted-foreground">
              Manage applications for your volunteer opportunities
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-card">
            <CardContent className="flex items-center p-6">
              <User className="w-8 h-8 text-primary mr-3" />
              <div>
                <p className="text-2xl font-bold">{myApplications.length}</p>
                <p className="text-sm text-muted-foreground">Total Applications</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="flex items-center p-6">
              <Clock className="w-8 h-8 text-warning mr-3" />
              <div>
                <p className="text-2xl font-bold">
                  {myApplications.filter(app => app.status === 'pending').length}
                </p>
                <p className="text-sm text-muted-foreground">Pending Review</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="flex items-center p-6">
              <Check className="w-8 h-8 text-success mr-3" />
              <div>
                <p className="text-2xl font-bold">
                  {myApplications.filter(app => app.status === 'accepted').length}
                </p>
                <p className="text-sm text-muted-foreground">Accepted</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="flex items-center p-6">
              <X className="w-8 h-8 text-destructive mr-3" />
              <div>
                <p className="text-2xl font-bold">
                  {myApplications.filter(app => app.status === 'rejected').length}
                </p>
                <p className="text-sm text-muted-foreground">Rejected</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Applications by Project */}
        {Object.keys(groupedApplications).length === 0 ? (
          <Card className="shadow-card text-center p-8">
            <CardContent>
              <Mail className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Applications Yet</h3>
              <p className="text-muted-foreground mb-4">
                When volunteers apply to your projects, you'll be able to manage them here.
              </p>
              <Link to="/">
                <Button>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedApplications).map(([projectTitle, apps]) => (
              <Card key={projectTitle} className="shadow-card animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    {projectTitle} ({apps.length} applicant{apps.length !== 1 ? 's' : ''})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {apps.map(application => {
                      const applicant = getApplicantDetails(application.volunteerId);
                      const project = getProjectDetails(application.projectId);
                      
                      if (!applicant || !project) return null;
                      
                      return (
                        <div 
                          key={application.id} 
                          className="border border-border rounded-lg p-4 space-y-4 hover-scale animate-slide-in-right"
                        >
                          <div className="flex justify-between items-start">
                            <div className="space-y-2">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                  <User className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-lg">{applicant.name || applicant.username}</h4>
                                  <p className="text-sm text-muted-foreground">@{applicant.username}</p>
                                </div>
                              </div>
                            </div>
                            <Badge className={`${getStatusColor(application.status)} animate-scale-in`}>
                              {getStatusIcon(application.status)}
                              <span className="ml-1 capitalize">{application.status}</span>
                            </Badge>
                          </div>

                          {/* Applicant Skills */}
                          {applicant.skills && applicant.skills.length > 0 && (
                            <div className="space-y-2">
                              <p className="text-sm font-medium">Skills:</p>
                              <div className="flex flex-wrap gap-2">
                                {applicant.skills.map(skill => (
                                  <Badge 
                                    key={skill} 
                                    variant="outline" 
                                    className="text-xs hover-scale"
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Skill Match Indicator */}
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Skill Match for this Project:</p>
                            <div className="flex flex-wrap gap-2">
                              {project.requiredSkills.map(skill => {
                                const hasSkill = applicant.skills?.includes(skill);
                                return (
                                  <Badge 
                                    key={skill} 
                                    variant={hasSkill ? "default" : "outline"}
                                    className={`${hasSkill ? "bg-primary text-primary-foreground" : "text-muted-foreground"} hover-scale`}
                                  >
                                    {hasSkill && <Check className="w-3 h-3 mr-1" />}
                                    {skill}
                                  </Badge>
                                );
                              })}
                            </div>
                          </div>

                          {/* Application Details */}
                          <div className="flex items-center gap-4 text-xs text-muted-foreground bg-muted/30 rounded p-2">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Applied {new Date(application.appliedAt).toLocaleDateString()}
                            </div>
                            {project.location && (
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {project.location}
                              </div>
                            )}
                          </div>

                          {/* Action Buttons */}
                          {application.status === 'pending' && (
                            <div className="flex gap-3 pt-2">
                              <Button
                                size="sm"
                                onClick={() => updateApplicationStatus(application.id, 'accepted')}
                                className="bg-success hover:bg-success/90 text-success-foreground hover-scale"
                              >
                                <Check className="w-4 h-4 mr-2" />
                                Accept Application
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => updateApplicationStatus(application.id, 'rejected')}
                                className="hover-scale"
                              >
                                <X className="w-4 h-4 mr-2" />
                                Reject Application
                              </Button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicantsList;