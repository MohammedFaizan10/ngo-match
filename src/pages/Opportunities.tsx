import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useApp } from '@/context/AppContext';
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Users, 
  Target,
  Globe,
  TrendingUp
} from 'lucide-react';

const Opportunities = () => {
  const { projects, currentUser } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');

  // Get all unique skills from projects
  const allSkills = [...new Set(projects.flatMap(project => project.requiredSkills))];
  const allLocations = [...new Set(projects.map(project => project.location).filter(Boolean))];
  const durations = ['Short-term (< 1 month)', 'Medium-term (1-3 months)', 'Long-term (> 3 months)', 'Ongoing'];

  // Filter projects based on search and filters
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.ngoName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSkill = selectedSkill === 'all' || project.requiredSkills.includes(selectedSkill);
    const matchesLocation = selectedLocation === 'all' || project.location === selectedLocation;
    const matchesDuration = selectedDuration === 'all' || project.duration === selectedDuration;
    
    return matchesSearch && matchesSkill && matchesLocation && matchesDuration;
  });

  // Get recommended projects for volunteers
  const getRecommendedProjects = () => {
    if (!currentUser?.skills) return [];
    
    return projects.filter(project => 
      project.requiredSkills.some(skill => currentUser.skills.includes(skill))
    );
  };

  const recommendedProjects = currentUser?.type === 'volunteer' ? getRecommendedProjects() : [];

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSkill('all');
    setSelectedLocation('all');
    setSelectedDuration('all');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <section className="text-center py-12 mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Find Your Perfect Opportunity
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover meaningful volunteer opportunities that match your skills and passion. 
            Every project is an opportunity to create positive change.
          </p>
        </section>

        {/* Stats Cards */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-primary">{projects.length}</div>
              <div className="text-sm text-muted-foreground">Total Opportunities</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-primary">{allSkills.length}</div>
              <div className="text-sm text-muted-foreground">Skill Categories</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-primary">{allLocations.length}</div>
              <div className="text-sm text-muted-foreground">Locations</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-primary">
                {currentUser?.type === 'volunteer' ? recommendedProjects.length : projects.filter(p => p.applicants.length > 0).length}
              </div>
              <div className="text-sm text-muted-foreground">
                {currentUser?.type === 'volunteer' ? 'Recommended for You' : 'Active Projects'}
              </div>
            </CardContent>
          </Card>
        </section>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Search */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search opportunities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Skills Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Skills Required</label>
                  <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                    <SelectTrigger>
                      <SelectValue placeholder="All skills" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All skills</SelectItem>
                      {allSkills.map(skill => (
                        <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="All locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All locations</SelectItem>
                      {allLocations.map(location => (
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Duration Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Duration</label>
                  <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                    <SelectTrigger>
                      <SelectValue placeholder="All durations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All durations</SelectItem>
                      {durations.map(duration => (
                        <SelectItem key={duration} value={duration}>{duration}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Clear Filters */}
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={clearFilters}
                >
                  Clear All Filters
                </Button>

                {/* Popular Skills */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Popular Skills</label>
                  <div className="flex flex-wrap gap-2">
                    {allSkills.slice(0, 6).map(skill => (
                      <Badge 
                        key={skill} 
                        variant={selectedSkill === skill ? "default" : "secondary"}
                        className="cursor-pointer text-xs"
                        onClick={() => setSelectedSkill(selectedSkill === skill ? 'all' : skill)}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Recommended Projects (for volunteers only) */}
            {currentUser?.type === 'volunteer' && recommendedProjects.length > 0 && (
              <section>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      Recommended for You
                      <Badge variant="secondary" className="ml-2">
                        {recommendedProjects.length} matches
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      {recommendedProjects.slice(0, 3).map(project => (
                        <ProjectCard 
                          key={project.id} 
                          project={project}
                          showApplicantCount={false}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>
            )}

            {/* All Opportunities */}
            <section>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-primary" />
                      All Opportunities
                      <Badge variant="secondary" className="ml-2">
                        {filteredProjects.length} found
                      </Badge>
                    </CardTitle>
                    
                    {filteredProjects.length !== projects.length && (
                      <Button variant="ghost" size="sm" onClick={clearFilters}>
                        Show All ({projects.length})
                      </Button>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent>
                  {filteredProjects.length > 0 ? (
                    <div className="grid gap-6">
                      {filteredProjects.map(project => (
                        <ProjectCard 
                          key={project.id} 
                          project={project}
                          showApplicantCount={true}
                          isPreview={!currentUser}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Target className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                      <h3 className="text-lg font-medium mb-2">No opportunities found</h3>
                      <p className="text-muted-foreground mb-4">
                        Try adjusting your search or filters to find more opportunities.
                      </p>
                      <Button variant="outline" onClick={clearFilters}>
                        Clear Filters
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Opportunities;