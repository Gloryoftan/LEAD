export interface Milestone {
  id: string;
  title: string;
  description: string;
  completedDate?: Date;
  status: 'completed' | 'in-progress' | 'pending';
  category: 'leadership' | 'training' | 'project' | 'achievement' | 'certification';
  priority: 'high' | 'medium' | 'low';
  tags: string[];
  clickable?: boolean;
  link?: string;
}

export interface ProjectGoals {
  specific: string;
  measurable: string;
  attainable: string;
  relevant: string;
  timeBound: string;
}

export interface PainPoint {
  situation: string;
  keywords: string;
  support: string;
}

export interface Member {
  id: string;
  name: string;
  englishName?: string;
  memberId?: string;
  position: string;
  department: string;
  educationLevel?: string;
  avatar?: string;
  email: string;
  joinDate: Date;
  bio: string;
  skills: string[];
  milestones: Milestone[];
  currentGoals: string[];
  projectGoals?: ProjectGoals;
  painPoints?: PainPoint[];
  performance: {
    rating: number; // 1-5
    lastReviewDate: Date;
    notes: string;
  };
  leadershipLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  participationRate: number; // 课程参与率
  assignmentCompletionRate: number; // 作业完成率
  bottleneckResolutionRate: number; // 卡点解决率
}

export interface TeamData {
  members: Member[];
  lastUpdated: Date;
}
