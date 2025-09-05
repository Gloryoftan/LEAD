export interface Milestone {
  id: string;
  title: string;
  description: string;
  completedDate?: Date;
  status: 'completed' | 'in-progress' | 'pending';
  category: 'skill' | 'project' | 'achievement' | 'certification';
  priority: 'high' | 'medium' | 'low';
  tags: string[];
}

export interface Member {
  id: string;
  name: string;
  position: string;
  department: string;
  avatar?: string;
  email: string;
  joinDate: Date;
  bio: string;
  skills: string[];
  milestones: Milestone[];
  currentGoals: string[];
  performance: {
    rating: number; // 1-5
    lastReviewDate: Date;
    notes: string;
  };
}

export interface TeamData {
  members: Member[];
  lastUpdated: Date;
}
