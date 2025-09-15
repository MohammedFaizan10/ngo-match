export interface User {
  id: string;
  username: string;
  password: string;
  type: 'volunteer' | 'ngo';
  skills?: string[];
  appliedProjects?: string[];
  name?: string;
}

export interface Application {
  id: string;
  projectId: string;
  volunteerId: string;
  status: 'pending' | 'accepted' | 'rejected';
  appliedAt: string;
}

export interface Project {
  id: string;
  ngoId: string;
  ngoName: string;
  title: string;
  description: string;
  requiredSkills: string[];
  applicants: string[];
  createdAt: string;
  location?: string;
  duration?: string;
}

export interface AppData {
  users: User[];
  projects: Project[];
  applications: Application[];
}

export const SKILLS_OPTIONS = [
  'Web Development',
  'Mobile App Development', 
  'Graphic Design',
  'UI/UX Design',
  'Digital Marketing',
  'Content Writing',
  'Social Media Management',
  'Project Management',
  'Data Analysis',
  'Photography',
  'Video Editing',
  'Fundraising',
  'Event Planning',
  'Legal Services',
  'Accounting',
  'Teaching/Training',
  'Translation',
  'Research',
  'Healthcare',
  'Environmental Sciences'
];