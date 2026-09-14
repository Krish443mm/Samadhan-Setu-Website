export type UserRole = 'Citizen' | 'Government' | 'University' | 'Student' | 'Faculty' | 'Industry';

export type Domain = 
  | 'Water'
  | 'Agriculture'
  | 'Healthcare'
  | 'Education'
  | 'Environment'
  | 'Energy'
  | 'Urban Infrastructure'
  | 'Accessibility'
  | 'Public Administration'
  | 'Rural Livelihoods'
  | 'Wildlife Management';

export type PriorityLevel = 'Critical' | 'High' | 'Medium' | 'Low';

export type ChallengeStatus = 
  | 'Under Review'
  | 'Government Validated'
  | 'University Assigned'
  | 'Team Formed'
  | 'In Prototyping'
  | 'Pilot Testing'
  | 'Deployed & Validated';

export interface LocationData {
  district: string;
  block: string;
  villageOrCity: string;
  coordinates?: { lat: number; lng: number };
}

export interface UniversityMatch {
  universityId: string;
  universityName: string;
  matchScore: number;
  rationale: string;
  facultyLead?: string;
  labSpecialization?: string;
}

export interface Challenge {
  id: string;
  trackingCode: string;
  title: string;
  description: string;
  citizenName: string;
  citizenRole?: string;
  submittedAt: string;
  domain: Domain;
  secondaryDomains: Domain[];
  location: LocationData;
  priorityScore: number; // 0 - 100
  priorityLevel: PriorityLevel;
  affectedPeople: number;
  geographicalSpread?: string;
  similarReportsCount: number;
  similarChallenges: { id: string; title: string; similarity: number; matchReason?: string }[];
  status: ChallengeStatus;
  requiredExpertise: string[];
  solutionWorkflow?: string[];
  sdgGoals: number[];
  evidence: {
    images?: string[];
    videoUrl?: string;
    hasAudio?: boolean;
    documents?: string[];
  };
  recommendedUniversities: UniversityMatch[];
  assignedUniversity?: string;
  assignedProjectWorkspaceId?: string;
  endorsements: number;
  isEndorsedByCurrentUser?: boolean;
  governmentNotes?: string;
  validatedByGov?: boolean;
  triageAudit?: {
    source: 'gemini' | 'deterministic';
    evidenceAssessment?: {
      evidenceUsed: boolean;
      imageCount: number;
      summary: string;
    };
    similarChallengesCount: number;
  };
}

export interface ProjectTask {
  id: string;
  title: string;
  assignee: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
}

export interface Milestone {
  id: string;
  title: string;
  stage: 'Research' | 'Design' | 'Prototype' | 'Pilot' | 'Deployment' | 'Validation';
  completed: boolean;
  dueDate: string;
  deliverable: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: 'Faculty Mentor' | 'Student Lead' | 'Student Researcher' | 'Industry Advisor' | 'Gov Liaison';
  department: string;
  avatar: string;
}

export interface ProjectWorkspace {
  id: string;
  challengeId: string;
  title: string;
  domain: Domain;
  universityId: string;
  universityName: string;
  currentStage: 'Problem Research' | 'Solution Design' | 'Prototype Development' | 'Pilot Testing' | 'Deployment' | 'Impact Validation';
  progressPercentage: number;
  nextMilestone: string;
  teamMembers: TeamMember[];
  tasks: ProjectTask[];
  milestones: Milestone[];
  industryPartners: {
    name: string;
    type: 'Funding' | 'Technology' | 'Mentorship' | 'Testing Facility' | 'Commercialization';
    commitment: string;
    logo?: string;
  }[];
  documents: {
    id: string;
    name: string;
    type: string;
    uploadedBy: string;
    date: string;
    size: string;
  }[];
  discussions: {
    id: string;
    author: string;
    role: string;
    timestamp: string;
    message: string;
  }[];
  impactTelemetry?: {
    metricName: string;
    value: string;
    target: string;
    unit: string;
  }[];
}

export interface IndustryOpportunity {
  id: string;
  projectId: string;
  projectTitle: string;
  domain: Domain;
  district: string;
  university: string;
  matchScore: number;
  summary: string;
  technologyRequired: string[];
  fundingRequired: string;
  mentorshipRequired: string;
  pilotSiteRequired: string;
  activeCollaboratorsCount: number;
  csrEligible: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'challenge' | 'project' | 'grant' | 'system';
  linkId?: string;
}

export interface ImpactStory {
  id: string;
  title: string;
  domain: Domain;
  district: string;
  summary: string;
  citizensBenefited: number;
  beforeMetric: string;
  afterMetric: string;
  beforeDescription: string;
  afterDescription: string;
  image: string;
  partnerUniversity: string;
  industrySupporter: string;
  citizenQuote: {
    text: string;
    author: string;
    role: string;
  };
}
