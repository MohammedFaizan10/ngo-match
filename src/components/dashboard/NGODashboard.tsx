import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { CreateProjectForm } from '@/components/projects/CreateProjectForm';
import { useApp } from '@/context/AppContext';
import { Building2, Users, Plus, Briefcase } from 'lucide-react';

export const NGODashboard = () => {
  const { currentUser, projects } = useApp();
  
  const myProjects = projects.filter(p => p.ngoId === currentUser?.id);
  const totalApplicants = myProjects.reduce((sum, p) => sum + p.applicants.length, 0);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">
          Welcome, {currentUser?.name || currentUser?.username}!
        </h1>
        <p className="text-muted-foreground">
          Manage your volunteer opportunities and connect with skilled volunteers.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-card">
          <CardContent className="flex items-center p-6">
            <Briefcase className="w-8 h-8 text-primary mr-3" />
            <div>
              <p className="text-2xl font-bold">{myProjects.length}</p>
              <p className="text-sm text-muted-foreground">Active Projects</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="flex items-center p-6">
            <Users className="w-8 h-8 text-accent mr-3" />
            <div>
              <p className="text-2xl font-bold">{totalApplicants}</p>
              <p className="text-sm text-muted-foreground">Total Applicants</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="flex items-center p-6">
            <Building2 className="w-8 h-8 text-primary-glow mr-3" />
            <div>
              <p className="text-2xl font-bold">{myProjects.length > 0 ? Math.round(totalApplicants / myProjects.length * 10) / 10 : 0}</p>
              <p className="text-sm text-muted-foreground">Avg per Project</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Project Form */}
      <div className="flex justify-center">
        <CreateProjectForm />
      </div>

      {/* My Projects */}
      {myProjects.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-primary" />
            Your Projects ({myProjects.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      ) : (
        <Card className="shadow-card text-center p-8">
          <CardContent>
            <Plus className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
            <p className="text-muted-foreground mb-4">
              Start by creating your first volunteer opportunity to connect with skilled volunteers.
            </p>
          </CardContent>
        </Card>
      )}

      {/* All Projects Overview */}
      {projects.length > myProjects.length && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Users className="w-6 h-6 text-accent" />
            Community Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects
              .filter(p => p.ngoId !== currentUser?.id)
              .map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};