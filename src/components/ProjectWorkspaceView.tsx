import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  Users, 
  Building2, 
  GraduationCap, 
  FileText, 
  Plus, 
  Send, 
  Download, 
  Sparkles, 
  Check, 
  Zap, 
  ExternalLink,
  Layers,
  MessageSquare,
  AlertCircle,
  AlertTriangle,
  Share2,
  Calendar,
  Paperclip,
  ShieldCheck,
  ChevronRight,
  Filter,
  ArrowUpRight,
  Activity,
  Flame,
  RefreshCw,
  FileCheck2,
  TrendingUp,
  Coins,
  Eye,
  Briefcase,
  Radio,
  Cpu,
  Bookmark,
  Info,
  ChevronDown
} from 'lucide-react';
import { ProjectWorkspace, UserRole, ProjectTask, Milestone } from '../types';

interface ProjectWorkspaceViewProps {
  workspace: ProjectWorkspace;
  onBack: () => void;
  currentRole: UserRole;
  onUpdateWorkspace: (updatedWorkspace: ProjectWorkspace) => void;
}

export const ProjectWorkspaceView: React.FC<ProjectWorkspaceViewProps> = ({
  workspace,
  onBack,
  currentRole,
  onUpdateWorkspace
}) => {
  // Navigation tabs
  type TabType = 'overview' | 'team' | 'tasks' | 'milestones' | 'documents' | 'discussion' | 'industry' | 'impact';
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Helper to extract deliverables
  const getDeliverables = (ws: ProjectWorkspace) => {
    if ((ws as any).deliverables && Array.isArray((ws as any).deliverables)) {
      return (ws as any).deliverables;
    }
    if (ws.documents && Array.isArray(ws.documents)) {
      return ws.documents.map(d => ({
        id: d.id,
        title: d.name,
        type: (d.type || '').toLowerCase(),
        uploadedAt: d.date,
        size: d.size,
        author: d.uploadedBy,
        category: (d.name || '').includes('Report') ? 'Testing' : (d.name || '').includes('Patent') ? 'Legal / IP' : (d.name || '').includes('Firmware') || (d.name || '').includes('.c') ? 'Technical' : 'Research'
      }));
    }
    return [];
  };

  // State
  const [milestones, setMilestones] = useState<Milestone[]>(workspace.milestones || []);
  const [discussions, setDiscussions] = useState(workspace.discussions || []);
  const [teamMembers, setTeamMembers] = useState(workspace.teamMembers || []);
  const [deliverables, setDeliverables] = useState(getDeliverables(workspace));
  const [tasks, setTasks] = useState<ProjectTask[]>(workspace.tasks || []);
  const [newComment, setNewComment] = useState('');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Modals state
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteRole, setInviteRole] = useState<'Student Lead' | 'Student Researcher' | 'Faculty Mentor' | 'Industry Advisor' | 'Gov Liaison'>('Student Researcher');
  const [inviteDept, setInviteDept] = useState('Computer Science & AI Lab');
  const [inviteExpertise, setInviteExpertise] = useState('AI / Computer Vision');
  const [inviteResponsibility, setInviteResponsibility] = useState('Edge model training');
  const [inviteAvailability, setInviteAvailability] = useState('15 hrs/week');

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [assetTitle, setAssetTitle] = useState('');
  const [assetType, setAssetType] = useState<'pdf' | 'cad' | 'code' | 'dataset'>('pdf');
  const [assetCategory, setAssetCategory] = useState<'Research' | 'Proposal' | 'Technical' | 'Testing' | 'Government' | 'Legal / IP'>('Technical');

  const [isUpdateProjectModalOpen, setIsUpdateProjectModalOpen] = useState(false);
  const [updateStage, setUpdateStage] = useState(workspace.currentStage || 'Pilot Testing');
  const [updateProgress, setUpdateProgress] = useState(workspace.progressPercentage ?? 72);
  const [updateNote, setUpdateNote] = useState('');

  // Task filter & creation state
  const [taskFilterStatus, setTaskFilterStatus] = useState<string>('All');
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState(teamMembers[0]?.name || 'Aarav Kumar');
  const [newTaskPriority, setNewTaskPriority] = useState<'High' | 'Medium' | 'Low'>('High');
  const [newTaskDueDate, setNewTaskDueDate] = useState('2026-09-22');

  // Documents category filter
  const [docCategoryFilter, setDocCategoryFilter] = useState<string>('All');

  // Keep synced if workspace prop changes
  React.useEffect(() => {
    setMilestones(workspace.milestones || []);
    setDiscussions(workspace.discussions || []);
    setTeamMembers(workspace.teamMembers || []);
    setDeliverables(getDeliverables(workspace));
    setTasks(workspace.tasks || []);
    setUpdateStage(workspace.currentStage || 'Pilot Testing');
    setUpdateProgress(workspace.progressPercentage ?? 72);
  }, [workspace]);

  // Project core attributes
  const isElephant = workspace.id === 'proj-elephant' || workspace.challengeId === 'ch-elephant';
  const projectTitle = workspace.title || (workspace as any).projectTitle || 'AI-Based Early Warning System for Human–Elephant Conflict';
  const projectLocation = isElephant ? 'West Singhbhum · Agriculture · Wildlife Safety' : `${workspace.domain || 'Technology'} · Community Innovation`;
  const leadInstitution = workspace.universityName || 'BIT Mesra';
  const govPartner = isElephant ? 'Department of Rural Development & West Singhbhum Forest Division' : 'State Innovation Council & District Administration';
  const projectIdDisplay = workspace.id ? (workspace.id.startsWith('PRJ-') ? workspace.id : `PRJ-JH-${workspace.id.toUpperCase()}`) : 'PRJ-JH-2026-0042';
  const startDateDisplay = '14 Jan 2026';

  // Dynamic progress calculation
  const overallProgress = useMemo(() => {
    if (milestones.length > 0) {
      const completed = milestones.filter(m => m.completed === true || (m as any).status === 'Completed').length;
      return Math.round((completed / milestones.length) * 100);
    }
    return workspace.progressPercentage ?? 72;
  }, [milestones, workspace.progressPercentage]);

  // Next Milestone determination
  const nextMilestoneItem = useMemo(() => {
    const pending = milestones.find(m => !m.completed && (m as any).status !== 'Completed');
    if (pending) {
      return {
        title: pending.title,
        dueDate: pending.dueDate || '18 September 2026',
        progress: 68,
        owner: pending.stage === 'Pilot' ? 'IoT & Field Research Team' : 'BIT Mesra R&D Lab',
        id: pending.id
      };
    }
    return {
      title: 'Field testing in 3 villages',
      dueDate: '18 September 2026',
      progress: 68,
      owner: 'IoT & Field Research Team',
      id: 'm-default'
    };
  }, [milestones]);

  // 6-Stage Innovation Lifecycle
  const lifecycleStages = [
    { num: '01', key: 'Problem Research', label: 'Problem Research', status: 'completed' },
    { num: '02', key: 'Solution Design', label: 'Solution Design', status: 'completed' },
    { num: '03', key: 'Prototype', label: 'Prototype', status: 'completed' },
    { num: '04', key: 'Pilot Testing', label: 'Pilot Testing', status: 'current' },
    { num: '05', key: 'Deployment', label: 'Deployment', status: 'upcoming' },
    { num: '06', key: 'Impact Validation', label: 'Impact Validation', status: 'upcoming' }
  ];

  // Multidisciplinary disciplines breakdown
  const participatingDisciplines = [
    { name: 'Computer Science', role: 'Edge Vision & AI Inference', icon: Cpu, color: 'text-indigo-700 bg-indigo-50 border-indigo-200' },
    { name: 'Electronics', role: 'LoRa Mesh & Solar Sensor Packs', icon: Zap, color: 'text-amber-700 bg-amber-50 border-amber-200' },
    { name: 'Mechanical Engineering', role: 'Weatherproof Enclosures & Mounts', icon: Layers, color: 'text-stone-700 bg-stone-100 border-stone-200' },
    { name: 'Environmental Science', role: 'Corridor & Elephant Behavioral Bio-data', icon: ShieldCheck, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    { name: 'Agriculture', role: 'Paddy Crop Damage Assessment', icon: TrendingUp, color: 'text-[#C2410C] bg-orange-50 border-orange-200' },
    { name: 'Management', role: 'Gram Panchayat & Forest QRT Operations', icon: Users, color: 'text-blue-700 bg-blue-50 border-blue-200' }
  ];

  // Toggle milestone completion
  const handleToggleMilestone = (milestoneId: string) => {
    const updated = milestones.map((m) => {
      if (m.id === milestoneId) {
        const nextCompleted = !m.completed;
        return { 
          ...m, 
          completed: nextCompleted,
          status: nextCompleted ? 'Completed' : 'In Progress'
        };
      }
      return m;
    });
    setMilestones(updated);

    const completedCount = updated.filter(m => m.completed).length;
    const newPct = Math.round((completedCount / updated.length) * 100);

    const updatedWs: ProjectWorkspace = {
      ...workspace,
      milestones: updated,
      progressPercentage: newPct
    };
    onUpdateWorkspace(updatedWs);

    setSuccessToast(`Milestone updated! Project completion now at ${newPct}%.`);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  // Toggle or change task status
  const handleToggleTaskStatus = (taskId: string) => {
    const updated = tasks.map((t) => {
      if (t.id === taskId) {
        const nextStatus = t.status === 'done' ? 'in-progress' : t.status === 'in-progress' ? 'done' : 'in-progress';
        return { ...t, status: nextStatus as any };
      }
      return t;
    });
    setTasks(updated);

    const updatedWs: ProjectWorkspace = {
      ...workspace,
      tasks: updated
    };
    onUpdateWorkspace(updatedWs);
    setSuccessToast(`Task status updated!`);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  // Add task
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: ProjectTask = {
      id: `task-${Date.now()}`,
      title: newTaskTitle,
      assignee: newTaskAssignee,
      priority: newTaskPriority,
      status: 'in-progress',
      dueDate: newTaskDueDate
    };

    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
    const updatedWs: ProjectWorkspace = {
      ...workspace,
      tasks: updatedTasks
    };
    onUpdateWorkspace(updatedWs);

    setIsAddTaskModalOpen(false);
    setNewTaskTitle('');
    setSuccessToast(`Task "${newTask.title}" added to project tasks!`);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  // Add discussion comment
  const handlePostComment = () => {
    if (!newComment.trim()) return;

    const authorMap: Record<string, string> = {
      Student: 'Aarav Kumar (Student Lead)',
      Faculty: 'Dr. Ananya Sharma (Faculty Mentor)',
      Industry: 'Vikash Anand (EcoSense Technologies)',
      Government: 'Sanjay Tirkey (Forest Range Officer)'
    };

    const newEntry = {
      id: `disc-${Date.now()}`,
      author: authorMap[currentRole] || 'Dr. Ananya Sharma (Faculty Mentor)',
      role: currentRole === 'Student' ? 'Student Lead' : currentRole === 'Faculty' ? 'Faculty Mentor' : currentRole === 'Industry' ? 'Industry Mentor' : 'Gov Liaison',
      timestamp: 'Just now',
      message: newComment
    };

    const updatedDiscussions = [...discussions, newEntry];
    setDiscussions(updatedDiscussions);
    setNewComment('');

    const updatedWs: ProjectWorkspace = {
      ...workspace,
      discussions: updatedDiscussions
    };
    onUpdateWorkspace(updatedWs);
    setSuccessToast('Message sent to project workspace stream.');
    setTimeout(() => setSuccessToast(null), 3000);
  };

  // Handle Invite Team Member
  const handleInviteMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName.trim()) return;

    const newMember = {
      id: `tm-${Date.now()}`,
      name: inviteName,
      role: inviteRole,
      department: inviteDept,
      expertise: inviteExpertise,
      responsibility: inviteResponsibility,
      availability: inviteAvailability,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
    };

    const updatedMembers = [...teamMembers, newMember as any];
    setTeamMembers(updatedMembers);
    const updatedWs: ProjectWorkspace = {
      ...workspace,
      teamMembers: updatedMembers
    };
    onUpdateWorkspace(updatedWs);

    setIsInviteModalOpen(false);
    setInviteName('');
    setSuccessToast(`${newMember.name} has joined the multidisciplinary team!`);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  // Handle Upload Deliverable / Document
  const handleUploadAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assetTitle.trim()) return;

    const extension = assetType === 'pdf' ? 'pdf' : assetType === 'cad' ? 'step' : assetType === 'code' ? 'py' : 'csv';
    const finalTitle = assetTitle.includes('.') ? assetTitle : `${assetTitle}.${extension}`;

    const newDoc = {
      id: `doc-${Date.now()}`,
      name: finalTitle,
      title: finalTitle,
      type: assetType.toUpperCase(),
      category: assetCategory,
      uploadedBy: currentRole === 'Student' ? 'Aarav Kumar' : 'Dr. Ananya Sharma',
      author: currentRole === 'Student' ? 'Aarav Kumar' : 'Dr. Ananya Sharma',
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
      uploadedAt: 'Just now',
      size: '1.8 MB'
    };

    const updatedDels = [newDoc, ...deliverables];
    setDeliverables(updatedDels);
    const updatedDocs = [newDoc, ...(workspace.documents || [])];

    const updatedWs: ProjectWorkspace = {
      ...workspace,
      documents: updatedDocs as any
    };
    onUpdateWorkspace(updatedWs);

    setIsUploadModalOpen(false);
    setAssetTitle('');
    setSuccessToast(`Document "${newDoc.name}" uploaded to ${assetCategory} archive!`);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  // Handle Download
  const handleDownloadAsset = (title: string) => {
    setSuccessToast(`Downloading "${title}" from certified project archive.`);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  // Handle Update Project Overall Info
  const handleSaveProjectUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedWs: ProjectWorkspace = {
      ...workspace,
      currentStage: updateStage as any,
      progressPercentage: Number(updateProgress)
    };
    onUpdateWorkspace(updatedWs);
    setIsUpdateProjectModalOpen(false);
    setSuccessToast(`Project updated: ${updateStage} · ${updateProgress}% progress!`);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  // Handle Share Project
  const handleShareProject = () => {
    const shareUrl = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setSuccessToast('Project link copied to clipboard! Ready to share with stakeholders.');
    } else {
      setSuccessToast('Project reference PRJ-JH-2026-0042 shared with registered peers.');
    }
    setTimeout(() => setSuccessToast(null), 3500);
  };

  // Enriched Team Members with required schema fields
  const categorizedTeam = useMemo(() => {
    const raw = teamMembers.length > 0 ? teamMembers : [
      { id: 'tm-1', name: 'Aarav Kumar', role: 'Student Lead', department: 'Computer Science', expertise: 'AI / Computer Vision', responsibility: 'Model Training & Hardware Integration', availability: '20 hrs/week', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80' },
      { id: 'tm-2', name: 'Priya Singh', role: 'Student Researcher', department: 'Environmental Engineering', expertise: 'IoT / Sensors', responsibility: 'Field Sensor Mesh & Battery Packs', availability: '15 hrs/week', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80' },
      { id: 'tm-3', name: 'Dr. Ananya Sharma', role: 'Faculty Mentor', department: 'Computer Science', expertise: 'AI / Computer Vision', responsibility: 'Academic Governance & Methodology', availability: '5 hrs/week', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80' },
      { id: 'tm-4', name: 'Vikash Anand', role: 'Industry Advisor', department: 'EcoSense Technologies', expertise: 'Edge Hardware & Enclosures', responsibility: 'Firmware & Industrial Prototyping', availability: 'On-Call / Weekly Sync', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80' },
      { id: 'tm-5', name: 'Sanjay Tirkey', role: 'Gov Liaison', department: 'West Singhbhum Forest Division', expertise: 'Wildlife Ecology & Corridor Policy', responsibility: 'Gram Panchayat Permissions & QRT Alerts', availability: 'Nodal Officer', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80' }
    ];

    const studentTeam = raw.filter((m: any) => m.role === 'Student Lead' || m.role === 'Student Researcher' || m.role?.includes('Student'));
    const facultyMentors = raw.filter((m: any) => m.role === 'Faculty Mentor' || m.role?.includes('Faculty'));
    const industryMentors = raw.filter((m: any) => m.role === 'Industry Advisor' || m.role?.includes('Industry'));
    const govStakeholders = raw.filter((m: any) => m.role === 'Gov Liaison' || m.role?.includes('Gov') || m.role?.includes('Forest') || m.department?.includes('Forest'));

    return { raw, studentTeam, facultyMentors, industryMentors, govStakeholders };
  }, [teamMembers]);

  // Filtered Tasks
  const filteredTasks = useMemo(() => {
    if (taskFilterStatus === 'All') return tasks;
    if (taskFilterStatus === 'Completed') return tasks.filter(t => t.status === 'done');
    if (taskFilterStatus === 'In Progress') return tasks.filter(t => t.status === 'in-progress');
    if (taskFilterStatus === 'Not Started') return tasks.filter(t => t.status === 'todo');
    if (taskFilterStatus === 'Blocked') return tasks.filter(t => t.status === 'review' || (t as any).isBlocked);
    return tasks;
  }, [tasks, taskFilterStatus]);

  // Documents list
  const standardDocuments = [
    { id: 'doc-ps', name: 'Problem Statement.pdf', category: 'Research', type: 'PDF', updatedDate: '16 Jan 2026', owner: 'Aarav Kumar', size: '1.4 MB' },
    { id: 'doc-rf', name: 'Research Findings.pdf', category: 'Research', type: 'PDF', updatedDate: '02 Feb 2026', owner: 'Priya Singh', size: '3.2 MB' },
    { id: 'doc-pa', name: 'Prototype Architecture.pdf', category: 'Technical', type: 'PDF', updatedDate: '18 Feb 2026', owner: 'Dr. Ananya Sharma', size: '4.8 MB' },
    { id: 'doc-pt', name: 'Pilot Testing Report.pdf', category: 'Testing', type: 'PDF', updatedDate: '05 Mar 2026', owner: 'Vikash Anand', size: '2.6 MB' },
    { id: 'doc-ga', name: 'Government Approval.pdf', category: 'Government', type: 'PDF', updatedDate: '12 Feb 2026', owner: 'Sanjay Tirkey', size: '940 KB' },
    { id: 'doc-ip', name: 'IP Documentation.pdf', category: 'Legal / IP', type: 'PDF', updatedDate: '28 Feb 2026', owner: 'BIT Mesra Patent Cell', size: '2.1 MB' }
  ];

  const allDocumentsList = useMemo(() => {
    const custom = deliverables.map((d: any) => ({
      id: d.id,
      name: d.title || d.name,
      category: d.category || 'Technical',
      type: (d.type || 'PDF').toUpperCase(),
      updatedDate: d.uploadedAt || d.date || 'Recent',
      owner: d.author || d.uploadedBy || 'Team Member',
      size: d.size || '1.2 MB'
    }));

    // Merge standard items with custom uploads
    const merged = [...standardDocuments];
    custom.forEach((c: any) => {
      if (!merged.some(m => m.name === c.name)) {
        merged.unshift(c);
      }
    });

    if (docCategoryFilter === 'All') return merged;
    return merged.filter(d => (d.category || '').toLowerCase() === (docCategoryFilter || '').toLowerCase());
  }, [deliverables, docCategoryFilter]);

  // Industry Partners
  const industryPartnersList = [
    {
      id: 'ind-1',
      name: 'EcoSense Technologies',
      matchScore: 89,
      role: 'IoT Hardware Partner',
      contributions: ['Hardware', 'Technical Mentorship', 'Prototype Support'],
      status: 'Active',
      description: 'Industrial sensor fabricator providing nocturnal IR camera enclosures, optical sensors, and PCB firmware support.'
    },
    {
      id: 'ind-2',
      name: 'AgriTech Innovations',
      matchScore: 86,
      role: 'Pilot Partner',
      contributions: ['Farmer Network', 'Field Testing'],
      status: 'Active',
      description: 'Regional agro-tech cooperative connecting 8 village Gram Panchayats and facilitating local farmer alert validation.'
    },
    {
      id: 'ind-3',
      name: 'Tata Steel CSR Foundation',
      matchScore: 92,
      role: 'Community Scale Partner',
      contributions: ['Funding', 'Community Logistics'],
      status: 'Active',
      description: 'Grant donor providing ₹18.5L in field deployment infrastructure and solar battery banks.'
    }
  ];

  // Industry Contribution breakdown
  const industryContributionWeights = [
    { label: 'Hardware', pct: 90, barWidth: 'w-[90%]', color: 'bg-emerald-600' },
    { label: 'Mentorship', pct: 70, barWidth: 'w-[70%]', color: 'bg-[#0F172A]' },
    { label: 'Funding', pct: 55, barWidth: 'w-[55%]', color: 'bg-[#C2410C]' },
    { label: 'Pilot Support', pct: 85, barWidth: 'w-[85%]', color: 'bg-indigo-600' },
    { label: 'Testing', pct: 60, barWidth: 'w-[60%]', color: 'bg-amber-600' }
  ];

  // Blockers & Risks
  const blockersAndRisks = [
    {
      severity: 'HIGH',
      severityColor: 'bg-red-50 text-[#DC2626] border-red-200',
      title: '3 sensor units delayed',
      owner: 'Industry Partner (EcoSense)',
      expectedDate: '14 September 2026',
      description: 'Custom optical filters for nocturnal IR units awaiting customs release at Kolkata port.'
    },
    {
      severity: 'MEDIUM',
      severityColor: 'bg-amber-50 text-[#C2410C] border-amber-200',
      title: 'Village pilot permissions pending',
      owner: 'Government Coordinator (Forest Range Office)',
      expectedDate: '16 September 2026',
      description: 'Gram Sabha resolution pending approval in 2 peripheral fringe hamlets in Saranda corridor.'
    }
  ];

  // Project Health metrics
  const projectHealthMetrics = [
    { label: 'Schedule', status: 'On Track', color: 'text-[#065F46] bg-emerald-50 border-emerald-200' },
    { label: 'Budget', status: 'On Track', color: 'text-[#065F46] bg-emerald-50 border-emerald-200' },
    { label: 'Technical', status: 'At Risk', color: 'text-[#DC2626] bg-red-50 border-red-200' },
    { label: 'Community', status: 'On Track', color: 'text-[#065F46] bg-emerald-50 border-emerald-200' },
    { label: 'Industry', status: 'On Track', color: 'text-[#065F46] bg-emerald-50 border-emerald-200' }
  ];

  // Project Outputs
  const projectOutputs = [
    { label: 'Prototype', value: 'Version 0.8', tag: 'Pilot', tagColor: 'bg-amber-100 text-[#C2410C]' },
    { label: 'Research Paper', value: 'IEEE Sensors Draft', tag: 'Draft', tagColor: 'bg-stone-100 text-stone-700' },
    { label: 'Patent / IP', value: 'Provisional Indian Patent #2026-JH-019', tag: 'Under Evaluation', tagColor: 'bg-purple-100 text-[#7C3AED]' },
    { label: 'Startup Potential', value: 'Agro-Defense Tech Spin-off', tag: 'High', tagColor: 'bg-blue-100 text-blue-800' },
    { label: 'Deployment Readiness', value: '68% TR-Level 7', tag: 'Verified', tagColor: 'bg-emerald-100 text-[#065F46]' }
  ];

  // Recent Activity timeline
  const recentActivities = [
    { time: 'Today', title: 'Prototype sensor uploaded', author: 'Aarav Kumar', desc: 'Nocturnal infrared calibration dataset v2.4 committed.' },
    { time: 'Yesterday', title: 'Faculty mentor approved pilot plan', author: 'Dr. Ananya Sharma', desc: 'Signed off on Saranda forest buffer testing protocol.' },
    { time: '2 days ago', title: 'Government review completed', author: 'Sanjay Tirkey (Forest Division)', desc: 'Interim safety inspection report submitted to District Collectorate.' },
    { time: '4 days ago', title: 'Industry partner joined project', author: 'EcoSense Technologies', desc: 'Signed tri-partite MOU with BIT Mesra for hardware sponsorship.' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-[#FAF9F5] text-stone-800">
      
      {/* 1. TOP NAV & BREADCRUMB */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <button
            id="workspace-back-btn"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 hover:text-[#0F172A] hover:bg-white bg-stone-50 cursor-pointer shadow-2xs transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Hub</span>
          </button>

          <span className="text-stone-300">/</span>
          <span className="text-xs font-mono font-bold text-stone-500 uppercase tracking-wider">
            WORKSPACE STUDIO
          </span>
          <span className="text-stone-300">/</span>
          <span className="text-xs font-mono font-bold text-[#C2410C]">
            {projectIdDisplay}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            id="workspace-share-btn"
            onClick={handleShareProject}
            className="px-3 py-1.5 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 hover:bg-white bg-stone-50 cursor-pointer shadow-2xs transition-colors flex items-center gap-1.5"
            title="Share project with stakeholders"
          >
            <Share2 className="w-3.5 h-3.5 text-stone-500" />
            <span>Share Project</span>
          </button>

          <button
            id="workspace-update-btn"
            onClick={() => setIsUpdateProjectModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold cursor-pointer shadow-2xs transition-colors flex items-center gap-1.5"
            title="Update project stage and milestones"
          >
            <RefreshCw className="w-3.5 h-3.5 text-white" />
            <span>Update Project</span>
          </button>
        </div>
      </div>

      {/* SUCCESS NOTIFICATION TOAST */}
      {successToast && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center justify-between shadow-2xs animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#065F46] shrink-0" />
            <span>{successToast}</span>
          </div>
          <button onClick={() => setSuccessToast(null)} className="text-xs text-emerald-700 font-bold hover:underline cursor-pointer">
            Dismiss
          </button>
        </div>
      )}

      {/* 2. PROJECT HEADER */}
      <header className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          
          <div className="space-y-3 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#0F172A] text-white font-mono">
                SAMADHANSETU PROJECT
              </span>

              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-[#C2410C] border border-orange-200 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-pulse"></span>
                STATUS: {updateStage.toUpperCase()}
              </span>

              <span className="text-[11px] font-mono text-stone-500">
                Ref: <strong className="text-stone-800">{projectIdDisplay}</strong>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight font-heading leading-tight">
              {projectTitle}
            </h1>

            <p className="text-xs sm:text-sm font-medium text-stone-600 flex items-center gap-1.5">
              <span>📍</span>
              <span>{projectLocation}</span>
            </p>

            {/* Institutional Partnerships Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-[10px] font-mono uppercase text-stone-400 font-bold block">Lead Institution</span>
                <span className="font-extrabold text-[#0F172A] flex items-center gap-1 mt-0.5">
                  <GraduationCap className="w-3.5 h-3.5 text-[#0F172A]" />
                  <span>{leadInstitution}</span>
                </span>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-[10px] font-mono uppercase text-stone-400 font-bold block">Government Partner</span>
                <span className="font-extrabold text-[#0F172A] truncate block mt-0.5" title={govPartner}>
                  {govPartner}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-[10px] font-mono uppercase text-stone-400 font-bold block">Start Date</span>
                <span className="font-extrabold text-[#0F172A] flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-stone-400" />
                  <span>{startDateDisplay}</span>
                </span>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-[10px] font-mono uppercase text-stone-400 font-bold block">Current Stage</span>
                <span className="font-extrabold text-[#C2410C] flex items-center gap-1 mt-0.5">
                  <Flame className="w-3.5 h-3.5 text-[#C2410C]" />
                  <span>{updateStage}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Big Progress Badge */}
          <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-stone-50 border border-stone-200 shrink-0 text-center min-w-[170px]">
            <span className="text-[10px] font-mono uppercase font-bold text-stone-400 block tracking-wider">
              Overall Progress
            </span>
            <div className="text-4xl font-extrabold text-[#0F172A] font-heading my-1">
              {overallProgress}%
            </div>
            <span className="text-[11px] font-semibold text-[#065F46] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block">
              ● Stage 04 of 06 Active
            </span>
          </div>

        </div>
      </header>

      {/* 3. PROJECT PROGRESS & LIFECYCLE BAR */}
      <section className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-100">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C2410C]">
              END-TO-END INNOVATION PATHWAY
            </span>
            <h2 className="text-lg font-bold text-[#0F172A] font-heading mt-0.5">
              Project Lifecycle
            </h2>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="font-semibold text-stone-500">
              Current Stage: <strong className="text-[#C2410C] font-bold">Pilot Testing</strong>
            </span>
          </div>
        </div>

        {/* 6 Stage Lifecycle Steps */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {lifecycleStages.map((st) => {
            const isDone = st.status === 'completed';
            const isCurr = st.status === 'current';
            return (
              <div 
                key={st.num}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isCurr 
                    ? 'bg-orange-50/70 border-orange-300 ring-2 ring-orange-200/80 shadow-2xs' 
                    : isDone 
                    ? 'bg-emerald-50/60 border-emerald-200 text-stone-800' 
                    : 'bg-stone-50/70 border-stone-200 text-stone-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-mono font-bold ${isCurr ? 'text-[#C2410C]' : isDone ? 'text-[#065F46]' : 'text-stone-400'}`}>
                    {st.num}
                  </span>
                  {isDone ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#065F46]" />
                  ) : isCurr ? (
                    <span className="w-2 h-2 rounded-full bg-[#EA580C] animate-ping"></span>
                  ) : (
                    <span className="w-2 h-2 rounded-full border border-stone-300"></span>
                  )}
                </div>

                <div className={`text-xs font-bold font-heading ${isCurr ? 'text-[#0F172A]' : isDone ? 'text-stone-800' : 'text-stone-400'}`}>
                  {st.label}
                </div>

                <div className="text-[10px] font-medium mt-1">
                  {isDone && <span className="text-[#065F46] font-semibold">✓ Completed</span>}
                  {isCurr && <span className="text-[#C2410C] font-bold">● Current Stage</span>}
                  {st.status === 'upcoming' && <span className="text-stone-400">○ Upcoming</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Fill Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between text-xs text-stone-500 font-medium">
            <span>Overall Project Progress</span>
            <span className="font-bold text-[#0F172A]">{overallProgress}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden flex">
            <div className="h-full bg-[#065F46]" style={{ width: `${Math.min(50, overallProgress)}%` }} title="Completed"></div>
            <div className="h-full bg-[#C2410C]" style={{ width: `${Math.max(0, overallProgress - 50)}%` }} title="Active Stage"></div>
          </div>
        </div>
      </section>

      {/* 4. NEXT MILESTONE CALLOUT BANNER */}
      <section className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-orange-100 text-[#C2410C] border border-orange-200">
              NEXT MILESTONE
            </span>
            <span className="text-xs text-stone-500 font-medium">
              Target Deadline: <strong className="text-stone-800">{nextMilestoneItem.dueDate}</strong>
            </span>
          </div>

          <h3 className="text-xl font-bold text-[#0F172A] font-heading">
            {nextMilestoneItem.title}
          </h3>

          <div className="flex flex-wrap items-center gap-4 text-xs text-stone-600">
            <span>Owner: <strong className="text-stone-900">{nextMilestoneItem.owner}</strong></span>
            <span>•</span>
            <span>Deliverable: <strong className="text-stone-900">Live Village Mesh Telemetry</strong></span>
            <span>•</span>
            <span>Progress: <strong className="text-[#065F46]">{nextMilestoneItem.progress}%</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setActiveTab('milestones')}
            className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-800 hover:bg-stone-50 text-xs font-bold cursor-pointer transition-colors"
          >
            View Milestone
          </button>
          
          <button
            onClick={() => {
              handleToggleMilestone(nextMilestoneItem.id);
            }}
            className="px-4 py-2.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold cursor-pointer transition-colors shadow-2xs flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5 text-white" />
            <span>Update Progress</span>
          </button>
        </div>
      </section>

      {/* 5. SAMADHAN AI INSIGHTS BAR */}
      <div className="bg-[#0F172A] rounded-2xl p-5 text-white shadow-xs border border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4 text-[#F59E0B]" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase font-bold text-[#F59E0B] tracking-wider block">
              SAMADHAN AI INSIGHT
            </span>
            <p className="text-xs text-stone-200 leading-relaxed max-w-3xl">
              "Pilot milestone is 4 days ahead of schedule in Namkum, though technical risk increased because 3 camera sensor units are delayed. Recommended next action: complete field calibration before pilot testing."
            </p>
          </div>
        </div>

        <button 
          onClick={() => setActiveTab('tasks')}
          className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold whitespace-nowrap self-start md:self-center cursor-pointer transition-colors"
        >
          Inspect Tasks →
        </button>
      </div>

      {/* 6. MAIN NAVIGATION TABS */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs p-1.5">
        <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar text-xs font-bold">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'team', label: `Team (${categorizedTeam.raw.length})` },
            { id: 'tasks', label: `Tasks (${tasks.length})` },
            { id: 'milestones', label: `Milestones (${milestones.length})` },
            { id: 'documents', label: `Documents (${allDocumentsList.length})` },
            { id: 'discussion', label: `Discussion (${discussions.length})` },
            { id: 'industry', label: `Industry (${industryPartnersList.length})` },
            { id: 'impact', label: 'Impact' }
          ].map((t) => (
            <button
              key={t.id}
              id={`workspace-tab-${t.id}`}
              onClick={() => setActiveTab(t.id as TabType)}
              className={`px-4 py-2.5 rounded-xl cursor-pointer transition-all whitespace-nowrap font-medium text-xs ${
                activeTab === t.id 
                  ? 'bg-[#0F172A] text-white font-bold shadow-2xs' 
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </div>

      {/* ========================================================================= */}
      {/* TAB CONTENT AREAS */}
      {/* ========================================================================= */}

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          
          {/* Top Overview Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left 8 Cols: Objective & Workflow & Activity */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* CURRENT OBJECTIVE */}
              <section className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-4">
                <div className="pb-2 border-b border-stone-100 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C2410C]">
                    PROJECT CHARTER
                  </span>
                  <span className="text-xs font-semibold text-stone-500">Phase: Verification</span>
                </div>

                <h3 className="text-lg font-bold text-[#0F172A] font-heading">
                  Current Objective
                </h3>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  Wild elephants frequently enter agricultural fields and fringe villages at night in West Singhbhum, causing devastating crop loss and risking human lives. This multidisciplinary project deploys low-cost solar edge AI cameras and LoRa sensor nodes across 8 villages to verify elephant herds within 1.2 seconds, triggering automated village sirens and SMS alerts to 1,200 farmers while notifying the Forest Quick Response Team.
                </p>

                {/* Multidisciplinary Contribution Formula Callout */}
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 mt-4 space-y-2">
                  <span className="text-[10px] font-mono uppercase font-bold text-stone-500 block">
                    Multidisciplinary Architecture
                  </span>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-stone-800">
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-800 border border-indigo-200">AI</span>
                    <span>+</span>
                    <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">IoT</span>
                    <span>+</span>
                    <span className="px-2.5 py-1 rounded-lg bg-orange-50 text-orange-800 border border-orange-200">Agriculture</span>
                    <span>+</span>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">Environmental Science</span>
                    <span>=</span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#0F172A] text-white">Integrated Solution</span>
                  </div>
                </div>
              </section>

              {/* RECENT ACTIVITY TIMELINE */}
              <section className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-4">
                <div className="pb-2 border-b border-stone-100 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400">
                    AUDIT TRAIL
                  </span>
                  <span className="text-xs text-stone-500 font-mono">Real-Time Sync</span>
                </div>

                <h3 className="text-lg font-bold text-[#0F172A] font-heading">
                  Recent Activity
                </h3>

                <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
                  {recentActivities.map((act, i) => (
                    <div key={i} className="relative space-y-0.5 text-xs">
                      <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-[#C2410C] ring-4 ring-white"></div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] uppercase font-bold text-[#C2410C]">{act.time}</span>
                        <span className="font-bold text-stone-900">{act.title}</span>
                      </div>
                      <p className="text-stone-600">{act.desc}</p>
                      <span className="text-[11px] text-stone-400 block">By {act.author}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* BLOCKERS & RISKS */}
              <section className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-4">
                <div className="pb-2 border-b border-stone-100 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#DC2626]">
                    RISK REGISTER
                  </span>
                  <span className="text-xs text-stone-500">2 Active Items</span>
                </div>

                <h3 className="text-lg font-bold text-[#0F172A] font-heading">
                  Blockers & Risks
                </h3>

                <div className="space-y-3">
                  {blockersAndRisks.map((risk, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${risk.severityColor}`}>
                            {risk.severity}
                          </span>
                          <h4 className="text-xs font-bold text-stone-900">{risk.title}</h4>
                        </div>
                        <span className="text-[11px] font-mono text-stone-500">Target: {risk.expectedDate}</span>
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed">{risk.description}</p>
                      <div className="text-[11px] text-stone-500">
                        Owner: <strong className="text-stone-800">{risk.owner}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

            </div>

            {/* Right 4 Cols: Health, Outputs, Impact & Government Connection */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* PROJECT HEALTH */}
              <section className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs space-y-4">
                <div className="pb-2 border-b border-stone-100">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400">
                    MONITORING MATRIX
                  </span>
                  <h3 className="text-base font-bold text-[#0F172A] font-heading mt-0.5">
                    Project Health
                  </h3>
                </div>

                <div className="space-y-2.5 text-xs">
                  {projectHealthMetrics.map((hm) => (
                    <div key={hm.label} className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                      <span className="font-semibold text-stone-700">{hm.label}</span>
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold font-mono border ${hm.color}`}>
                        {hm.status}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* PROJECT OUTPUTS */}
              <section className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs space-y-4">
                <div className="pb-2 border-b border-stone-100">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400">
                    DELIVERABLE MATURITY
                  </span>
                  <h3 className="text-base font-bold text-[#0F172A] font-heading mt-0.5">
                    Project Outputs
                  </h3>
                </div>

                <div className="space-y-3 text-xs">
                  {projectOutputs.map((po) => (
                    <div key={po.label} className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase text-stone-400 font-bold">{po.label}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${po.tagColor}`}>
                          {po.tag}
                        </span>
                      </div>
                      <div className="font-bold text-stone-900 text-xs">{po.value}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* GOVERNMENT CONNECTION */}
              <section className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs space-y-3">
                <div className="pb-2 border-b border-stone-100 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#065F46]">
                    CIVIC STAKEHOLDER
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-50 text-[#065F46] border border-emerald-200">
                    ACTIVE
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#0F172A] font-heading">
                  Department of Rural Development
                </h3>

                <p className="text-xs text-stone-600">
                  Partnered with West Singhbhum Forest Division and District Administration.
                </p>

                <div className="pt-2 space-y-1.5 text-xs text-stone-600">
                  <div className="font-bold text-stone-800 text-[11px] uppercase font-mono">Current Involvement:</div>
                  <div className="space-y-1 text-[11px]">
                    <div>✓ Challenge validation</div>
                    <div>✓ Pilot coordination & village access</div>
                    <div>✓ QRT wireless frequency integration</div>
                    <div>✓ Deployment scaling approval</div>
                  </div>
                </div>

                <div className="pt-2 text-[10px] text-stone-400 italic">
                  * Demo partnership verified for state innovation evaluation.
                </div>
              </section>

            </div>

          </div>

        </div>
      )}

      {/* TAB 2: TEAM */}
      {activeTab === 'team' && (
        <div className="space-y-8">
          
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C2410C]">
                  COLLABORATIVE INNOVATION STUDIO
                </span>
                <h2 className="text-2xl font-bold text-[#0F172A] font-heading mt-0.5">
                  PROJECT TEAM
                </h2>
                <p className="text-xs text-stone-600 mt-0.5">
                  Cross-disciplinary student researchers, university faculty mentors, corporate advisors, and departmental liaisons.
                </p>
              </div>

              <button
                onClick={() => setIsInviteModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold cursor-pointer shadow-2xs transition-colors flex items-center gap-1.5 self-start sm:self-center"
              >
                <Plus className="w-3.5 h-3.5 text-white" />
                <span>+ Add Team Member</span>
              </button>
            </div>

            {/* MULTIDISCIPLINARY DISCIPLINES CARD */}
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase font-mono text-stone-700 tracking-wider">
                  Participating Disciplines
                </span>
                <span className="text-[11px] text-stone-500 font-mono">6 Fields Interlocked</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {participatingDisciplines.map((d, i) => {
                  const Icon = d.icon;
                  return (
                    <div key={i} className="p-3 rounded-xl bg-white border border-stone-200 text-center space-y-1">
                      <div className="w-7 h-7 mx-auto rounded-lg flex items-center justify-center bg-stone-100 text-stone-700">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-xs font-bold text-[#0F172A] font-heading">{d.name}</div>
                      <p className="text-[10px] text-stone-500 leading-tight">{d.role}</p>
                    </div>
                  );
                })}
              </div>

              {/* Multidisciplinary Equation */}
              <div className="p-3 rounded-xl bg-white border border-stone-200 text-center text-xs font-bold text-stone-800 flex flex-wrap items-center justify-center gap-2">
                <span className="text-indigo-700">AI</span>
                <span className="text-stone-400">+</span>
                <span className="text-amber-700">IoT</span>
                <span className="text-stone-400">+</span>
                <span className="text-orange-700">Agriculture</span>
                <span className="text-stone-400">+</span>
                <span className="text-emerald-700">Environmental Science</span>
                <span className="text-stone-400">=</span>
                <span className="text-[#0F172A] uppercase font-mono tracking-wider font-extrabold">Integrated Solution</span>
              </div>
            </div>

            {/* 1. STUDENT TEAM */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase font-mono text-stone-800 tracking-wider">
                  Student Team ({categorizedTeam.studentTeam.length})
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categorizedTeam.studentTeam.map((m: any) => (
                  <div key={m.id} className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                    <div className="flex items-start gap-3">
                      <img src={m.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'} alt={m.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-stone-200" />
                      <div>
                        <h4 className="text-sm font-bold text-[#0F172A]">{m.name}</h4>
                        <span className="px-2 py-0.2 rounded text-[10px] font-bold uppercase font-mono bg-indigo-50 text-indigo-800 border border-indigo-200">
                          {m.role}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs text-stone-600">
                      <div><strong className="text-stone-800">Department:</strong> {m.department}</div>
                      <div><strong className="text-stone-800">Expertise:</strong> {m.expertise || 'Computer Vision & Embedded'}</div>
                      <div><strong className="text-stone-800">Responsibility:</strong> {m.responsibility || 'Field Model Training'}</div>
                      <div><strong className="text-stone-800">Availability:</strong> {m.availability || '20 hrs/week'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. FACULTY MENTORS */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold uppercase font-mono text-stone-800 tracking-wider">
                Faculty Mentors ({categorizedTeam.facultyMentors.length})
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categorizedTeam.facultyMentors.map((m: any) => (
                  <div key={m.id} className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                    <div className="flex items-start gap-3">
                      <img src={m.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80'} alt={m.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-stone-200" />
                      <div>
                        <h4 className="text-sm font-bold text-[#0F172A]">{m.name}</h4>
                        <span className="px-2 py-0.2 rounded text-[10px] font-bold uppercase font-mono bg-purple-50 text-purple-800 border border-purple-200">
                          {m.role}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs text-stone-600">
                      <div><strong className="text-stone-800">Department:</strong> {m.department}</div>
                      <div><strong className="text-stone-800">Expertise:</strong> {m.expertise || 'AI & Distributed Systems'}</div>
                      <div><strong className="text-stone-800">Responsibility:</strong> {m.responsibility || 'R&D Governance & Patent Cell Review'}</div>
                      <div><strong className="text-stone-800">Availability:</strong> {m.availability || '5 hrs/week'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. INDUSTRY MENTORS */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold uppercase font-mono text-stone-800 tracking-wider">
                Industry Mentors ({categorizedTeam.industryMentors.length})
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categorizedTeam.industryMentors.map((m: any) => (
                  <div key={m.id} className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                    <div className="flex items-start gap-3">
                      <img src={m.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'} alt={m.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-stone-200" />
                      <div>
                        <h4 className="text-sm font-bold text-[#0F172A]">{m.name}</h4>
                        <span className="px-2 py-0.2 rounded text-[10px] font-bold uppercase font-mono bg-blue-50 text-blue-800 border border-blue-200">
                          {m.role}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs text-stone-600">
                      <div><strong className="text-stone-800">Company:</strong> {m.department}</div>
                      <div><strong className="text-stone-800">Expertise:</strong> {m.expertise || 'Edge Hardware & Solar Enclosures'}</div>
                      <div><strong className="text-stone-800">Responsibility:</strong> {m.responsibility || 'Industrial Testing & Prototype Grants'}</div>
                      <div><strong className="text-stone-800">Availability:</strong> {m.availability || 'Weekly Sync'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. GOVERNMENT STAKEHOLDERS */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold uppercase font-mono text-stone-800 tracking-wider">
                Government Stakeholders ({categorizedTeam.govStakeholders.length})
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categorizedTeam.govStakeholders.map((m: any) => (
                  <div key={m.id} className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                    <div className="flex items-start gap-3">
                      <img src={m.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80'} alt={m.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-stone-200" />
                      <div>
                        <h4 className="text-sm font-bold text-[#0F172A]">{m.name}</h4>
                        <span className="px-2 py-0.2 rounded text-[10px] font-bold uppercase font-mono bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {m.role}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs text-stone-600">
                      <div><strong className="text-stone-800">Department:</strong> {m.department}</div>
                      <div><strong className="text-stone-800">Expertise:</strong> {m.expertise || 'Forest Ecology & Panchayat Liaison'}</div>
                      <div><strong className="text-stone-800">Responsibility:</strong> {m.responsibility || 'Field Access & Quick Response Coordination'}</div>
                      <div><strong className="text-stone-800">Availability:</strong> {m.availability || 'Official Nodal Desk'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 3: TASKS */}
      {activeTab === 'tasks' && (
        <div className="space-y-8">
          
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C2410C]">
                  ACTION REGISTER
                </span>
                <h2 className="text-2xl font-bold text-[#0F172A] font-heading mt-0.5">
                  PROJECT TASKS
                </h2>
                <p className="text-xs text-stone-600 mt-0.5">
                  Sprint deliverables assigned to multidisciplinary researchers and partners.
                </p>
              </div>

              <button
                onClick={() => setIsAddTaskModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold cursor-pointer shadow-2xs transition-colors flex items-center gap-1.5 self-start sm:self-center"
              >
                <Plus className="w-3.5 h-3.5 text-white" />
                <span>+ Add Task</span>
              </button>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="text-[11px] font-mono font-bold text-stone-400 uppercase">Filter:</span>
              {['All', 'In Progress', 'Completed', 'Not Started', 'Blocked'].map((st) => (
                <button
                  key={st}
                  onClick={() => setTaskFilterStatus(st)}
                  className={`px-3 py-1 rounded-lg font-semibold text-xs transition-colors cursor-pointer ${
                    taskFilterStatus === st 
                      ? 'bg-[#0F172A] text-white' 
                      : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Tasks Table / Responsive Cards */}
            <div className="divide-y divide-stone-100">
              {filteredTasks.map((t) => {
                const isDone = t.status === 'done';
                const isInProg = t.status === 'in-progress';
                const isTodo = t.status === 'todo';
                const isBlocked = t.status === 'review';

                const statusLabel = isDone ? 'Completed' : isInProg ? 'In Progress' : isBlocked ? 'Blocked' : 'Not Started';
                const statusColor = isDone 
                  ? 'bg-emerald-50 text-[#065F46] border-emerald-200' 
                  : isInProg 
                  ? 'bg-blue-50 text-blue-800 border-blue-200' 
                  : isBlocked 
                  ? 'bg-red-50 text-[#DC2626] border-red-200' 
                  : 'bg-stone-100 text-stone-600 border-stone-200';

                return (
                  <div key={t.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 first:pt-0 last:pb-0">
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => handleToggleTaskStatus(t.id)}
                        className={`w-5 h-5 rounded flex items-center justify-center cursor-pointer transition-colors mt-0.5 shrink-0 ${
                          isDone 
                            ? 'bg-[#065F46] text-white' 
                            : 'border border-stone-300 hover:border-[#0F172A] bg-white'
                        }`}
                        title="Toggle task completion"
                      >
                        {isDone && <Check className="w-3.5 h-3.5" />}
                      </button>

                      <div>
                        <h4 className={`text-xs sm:text-sm font-bold ${isDone ? 'line-through text-stone-400' : 'text-[#0F172A]'}`}>
                          {t.title}
                        </h4>
                        <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-stone-500">
                          <span>Owner: <strong className="text-stone-800">{t.assignee}</strong></span>
                          <span>•</span>
                          <span>Due: <strong className="text-stone-800">{t.dueDate}</strong></span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                        t.priority === 'High' ? 'bg-amber-100 text-[#C2410C]' : 'bg-stone-100 text-stone-600'
                      }`}>
                        {t.priority}
                      </span>

                      <button
                        onClick={() => handleToggleTaskStatus(t.id)}
                        className={`px-2.5 py-0.5 rounded text-[10px] font-bold font-mono border cursor-pointer ${statusColor}`}
                      >
                        {statusLabel}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      )}

      {/* TAB 4: MILESTONES */}
      {activeTab === 'milestones' && (
        <div className="space-y-8">
          
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#065F46]">
                  GATEWAY SCHEDULE
                </span>
                <h2 className="text-2xl font-bold text-[#0F172A] font-heading mt-0.5">
                  MILESTONE TIMELINE
                </h2>
                <p className="text-xs text-stone-600 mt-0.5">
                  Sequential R&D milestones. Click checkbox to toggle milestone delivery.
                </p>
              </div>

              <span className="text-xs font-bold text-stone-700 bg-stone-100 px-3 py-1.5 rounded-xl border border-stone-200 font-mono">
                {milestones.filter(m => m.completed).length} of {milestones.length} Completed
              </span>
            </div>

            {/* Milestones Vertical / Flow Timeline */}
            <div className="space-y-4">
              {milestones.map((m, idx) => {
                const isDone = m.completed === true || (m as any).status === 'Completed';
                const isInProg = !isDone && idx === 3; // Pilot Testing active stage
                const isUpcoming = !isDone && !isInProg;

                return (
                  <div 
                    key={m.id}
                    className={`p-5 rounded-xl border transition-all ${
                      isDone 
                        ? 'bg-emerald-50/40 border-emerald-200' 
                        : isInProg 
                        ? 'bg-orange-50/40 border-orange-200 ring-1 ring-orange-300' 
                        : 'bg-stone-50/50 border-stone-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => handleToggleMilestone(m.id)}
                          className={`w-6 h-6 rounded-lg flex items-center justify-center cursor-pointer transition-colors mt-0.5 shrink-0 ${
                            isDone 
                              ? 'bg-[#065F46] text-white' 
                              : isInProg 
                              ? 'border-2 border-[#C2410C] bg-white' 
                              : 'border-2 border-stone-300 hover:border-stone-400 bg-white'
                          }`}
                          title="Toggle milestone delivery"
                        >
                          {isDone && <Check className="w-4 h-4" />}
                          {isInProg && <span className="w-2 h-2 rounded-full bg-[#C2410C]"></span>}
                        </button>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono text-stone-400 font-bold">0{idx + 1}</span>
                            <h3 className={`text-sm font-bold ${isDone ? 'line-through text-stone-400' : 'text-[#0F172A]'}`}>
                              {m.title}
                            </h3>
                          </div>

                          <p className="text-xs text-stone-600">
                            Deliverable: <strong className="text-stone-800">{m.deliverable || 'Field validation report and verified artifacts.'}</strong>
                          </p>

                          <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-stone-500">
                            <span>Stage: <strong>{m.stage}</strong></span>
                            <span>•</span>
                            <span>Target Date: <strong>{m.dueDate}</strong></span>
                            <span>•</span>
                            <span>Owner: <strong>{idx < 3 ? 'BIT Mesra & Students' : idx === 3 ? 'IoT & Field Research Team' : 'Forest Dept Handover'}</strong></span>
                          </div>
                        </div>
                      </div>

                      <span className={`px-2.5 py-1 rounded text-xs font-bold font-mono shrink-0 border ${
                        isDone 
                          ? 'bg-emerald-100 text-[#065F46] border-emerald-200' 
                          : isInProg 
                          ? 'bg-orange-100 text-[#C2410C] border-orange-200' 
                          : 'bg-stone-100 text-stone-600 border-stone-200'
                      }`}>
                        {isDone ? 'Completed' : isInProg ? 'In Progress' : 'Upcoming'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      )}

      {/* TAB 5: DOCUMENTS */}
      {activeTab === 'documents' && (
        <div className="space-y-8">
          
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0F172A]">
                  CERTIFIED ARTIFACT REPOSITORY
                </span>
                <h2 className="text-2xl font-bold text-[#0F172A] font-heading mt-0.5">
                  PROJECT DOCUMENTS
                </h2>
                <p className="text-xs text-stone-600 mt-0.5">
                  Peer-reviewed technical architecture, field reports, and patent filings.
                </p>
              </div>

              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold cursor-pointer shadow-2xs transition-colors flex items-center gap-1.5 self-start sm:self-center"
              >
                <Plus className="w-3.5 h-3.5 text-white" />
                <span>Upload Document</span>
              </button>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="text-[11px] font-mono font-bold text-stone-400 uppercase">Categories:</span>
              {['All', 'Research', 'Proposal', 'Technical', 'Testing', 'Government', 'Legal / IP'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setDocCategoryFilter(cat)}
                  className={`px-3 py-1 rounded-lg font-semibold text-xs transition-colors cursor-pointer ${
                    docCategoryFilter === cat 
                      ? 'bg-[#0F172A] text-white' 
                      : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Documents List */}
            <div className="divide-y divide-stone-100">
              {allDocumentsList.map((doc: any) => (
                <div key={doc.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center font-bold text-xs text-[#0F172A] shrink-0 font-mono">
                      {doc.type}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#0F172A] hover:underline cursor-pointer"
                        onClick={() => handleDownloadAsset(doc.name)}
                      >
                        {doc.name}
                      </h4>
                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-stone-500 mt-0.5">
                        <span className="px-1.5 py-0.2 rounded bg-stone-100 text-stone-700 text-[10px] font-mono font-bold">
                          {doc.category}
                        </span>
                        <span>•</span>
                        <span>Updated: <strong>{doc.updatedDate}</strong></span>
                        <span>•</span>
                        <span>Owner: <strong>{doc.owner}</strong></span>
                        <span>•</span>
                        <span>Size: {doc.size}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => handleDownloadAsset(doc.name)}
                      className="px-3 py-1.5 rounded-lg border border-stone-200 text-stone-700 hover:text-[#0F172A] hover:bg-stone-50 text-xs font-bold cursor-pointer transition-colors flex items-center gap-1"
                      title="Download file"
                    >
                      <Download className="w-3.5 h-3.5 text-stone-500" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      )}

      {/* TAB 6: DISCUSSION */}
      {activeTab === 'discussion' && (
        <div className="space-y-8">
          
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-200">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400">
                  COLLABORATIVE STREAM
                </span>
                <h2 className="text-2xl font-bold text-[#0F172A] font-heading mt-0.5">
                  PROJECT DISCUSSIONS
                </h2>
                <p className="text-xs text-stone-600 mt-0.5">
                  Direct communication between student researchers, faculty guides, industry mentors, and government coordinators.
                </p>
              </div>

              <span className="text-xs font-semibold text-stone-500 font-mono">
                Posting as: <strong className="text-[#0F172A]">{currentRole}</strong>
              </span>
            </div>

            {/* Conversation Messages */}
            <div className="space-y-4">
              {discussions.map((msg) => (
                <div key={msg.id} className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#0F172A] text-white flex items-center justify-center font-bold text-[11px]">
                        {msg.author.charAt(0)}
                      </div>
                      <span className="text-xs font-bold text-[#0F172A]">{msg.author}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono bg-stone-200 text-stone-800">
                        {msg.role}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-stone-400">{msg.timestamp}</span>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed pl-9">
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>

            {/* Professional Message Composer */}
            <div className="p-4 rounded-xl bg-white border border-stone-300 space-y-3 shadow-2xs">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
                placeholder="Write a message to project collaborators, mention testing logs, or link a schematic..."
                className="w-full text-xs text-stone-800 placeholder-stone-400 focus:outline-hidden resize-none"
              />

              <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-900 font-semibold cursor-pointer"
                >
                  <Paperclip className="w-3.5 h-3.5 text-stone-400" />
                  <span>Attach file</span>
                </button>

                <button
                  onClick={handlePostComment}
                  className="px-4 py-2 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold cursor-pointer shadow-2xs transition-colors flex items-center gap-1.5"
                >
                  <span>Send</span>
                  <Send className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 7: INDUSTRY */}
      {activeTab === 'industry' && (
        <div className="space-y-8">
          
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C2410C]">
                  CORPORATE ENGAGEMENT
                </span>
                <h2 className="text-2xl font-bold text-[#0F172A] font-heading mt-0.5">
                  INDUSTRY COLLABORATION
                </h2>
                <p className="text-xs text-stone-600 mt-0.5">
                  Corporate partners providing hardware prototyping, technical mentorship, testing facilities, and CSR grants.
                </p>
              </div>

              <button
                onClick={() => {
                  setSuccessToast('Industry matching inquiry dispatched to State CSR Coordination Cell.');
                  setTimeout(() => setSuccessToast(null), 3500);
                }}
                className="px-4 py-2 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold cursor-pointer shadow-2xs transition-colors flex items-center gap-1.5 self-start sm:self-center"
              >
                <Plus className="w-3.5 h-3.5 text-white" />
                <span>Find Industry Partner</span>
              </button>
            </div>

            {/* INDUSTRY CONTRIBUTION PROGRESS VISUALIZATION */}
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase font-mono text-stone-700 tracking-wider">
                  Industry Contribution Matrix
                </span>
                <span className="text-[11px] text-stone-500 font-mono">Resource Commitment</span>
              </div>

              <div className="space-y-3">
                {industryContributionWeights.map((ic) => (
                  <div key={ic.label} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-stone-700">
                      <span>{ic.label}</span>
                      <span className="font-mono font-bold">{ic.pct}% Commitment</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-stone-200 overflow-hidden">
                      <div className={`h-full rounded-full ${ic.barWidth} ${ic.color}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Partners Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {industryPartnersList.map((partner) => (
                <div key={partner.id} className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-[#065F46] border border-emerald-200">
                        {partner.matchScore}% Match
                      </span>
                      <span className="text-[10px] font-mono font-bold uppercase text-stone-500">
                        ● {partner.status}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#0F172A] font-heading">
                      {partner.name}
                    </h3>

                    <p className="text-xs font-semibold text-[#C2410C]">
                      Role: {partner.role}
                    </p>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      {partner.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-200 space-y-2">
                    <span className="text-[10px] font-mono uppercase font-bold text-stone-400 block">Contribution</span>
                    <div className="flex flex-wrap gap-1.5">
                      {partner.contributions.map((c, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-white border border-stone-200 text-[10px] font-semibold text-stone-700">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      )}

      {/* TAB 8: IMPACT */}
      {activeTab === 'impact' && (
        <div className="space-y-8">
          
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#065F46]">
                  COMMUNITY VALUE CREATION
                </span>
                <h2 className="text-2xl font-bold text-[#0F172A] font-heading mt-0.5">
                  MEASURABLE PROJECT IMPACT
                </h2>
                <p className="text-xs text-stone-600 mt-0.5">
                  Field telemetry and ground surveys conducted across West Singhbhum pilot villages.
                </p>
              </div>

              <span className="text-xs font-bold text-[#065F46] bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 font-mono">
                Pilot Result Verified
              </span>
            </div>

            {/* Impact Metric Cards with Clear Statuses */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.2 rounded bg-emerald-100 text-[#065F46] inline-block">
                  Verified
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#065F46] font-heading mt-1">
                  1,200
                </div>
                <div className="text-xs font-semibold text-stone-700">Potential Beneficiaries</div>
                <div className="text-[10px] text-stone-500">Farmers & Hamlets</div>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.2 rounded bg-emerald-100 text-[#065F46] inline-block">
                  Verified
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#065F46] font-heading mt-1">
                  8
                </div>
                <div className="text-xs font-semibold text-stone-700">Villages</div>
                <div className="text-[10px] text-stone-500">Saranda Forest Fringe</div>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.2 rounded bg-amber-100 text-[#C2410C] inline-block">
                  Pilot Result
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#C2410C] font-heading mt-1">
                  342
                </div>
                <div className="text-xs font-semibold text-stone-700">Pilot Participants</div>
                <div className="text-[10px] text-stone-500">Early Alerts Dispatched</div>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.2 rounded bg-stone-200 text-stone-700 inline-block">
                  Estimated
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-heading mt-1">
                  62%
                </div>
                <div className="text-xs font-semibold text-stone-700">Crop Damage Reduction</div>
                <div className="text-[10px] text-stone-500">Paddy Fields Saved</div>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1 col-span-2 sm:col-span-1">
                <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.2 rounded bg-emerald-100 text-[#065F46] inline-block">
                  Verified
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#065F46] font-heading mt-1">
                  88%
                </div>
                <div className="text-xs font-semibold text-stone-700">Community Satisfaction</div>
                <div className="text-[10px] text-stone-500">Gram Sabha Surveys</div>
              </div>

            </div>

            {/* Field Pilot Certification Note */}
            <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 space-y-2">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#065F46]" />
                <h4 className="font-bold text-stone-900 uppercase font-mono">Field Pilot Certification:</h4>
              </div>
              <p className="leading-relaxed">
                "Prior to the BIT Mesra and EcoSense Technologies system deployment, nocturnal elephant incursions caused ₹38 Lakhs in crop loss across 8 fringe hamlets in 2024. During the 2025–2026 pilot period, 342 real-time verified alerts allowed villagers and Quick Response Teams to safely divert herds with zero human casualties and an estimated 62% reduction in paddy crop damage."
              </p>
              <div className="text-stone-500 font-semibold pt-1">
                — Certified by Divisional Forest Officer (DFO), West Singhbhum & Saranda Forest Division
              </div>
            </div>

            {/* State Audit Policy Note */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 flex items-start gap-2">
              <Info className="w-4 h-4 text-[#C2410C] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong className="text-stone-800">Telemetry Distinction Policy:</strong> Metrics labeled as <em>Verified</em> have completed third-party district audits. Metrics labeled <em>Pilot Result</em> represent live sensor logs. Metrics labeled <em>Estimated</em> reflect algorithmic demographic projections.
              </p>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODALS */}
      {/* ========================================================================= */}

      {/* 1. INVITE / ADD TEAM MEMBER MODAL */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 bg-[#0F172A]/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-stone-200 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h3 className="text-base font-bold text-[#0F172A] font-heading">
                Add Team Member
              </h3>
              <button 
                onClick={() => setIsInviteModalOpen(false)} 
                className="text-stone-400 hover:text-stone-600 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleInviteMember} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1 text-[10px] font-mono">
                  Full Name *
                </label>
                <input 
                  type="text"
                  required
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="e.g. Aarav Kumar or Dr. Ananya Sharma"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 focus:bg-white focus:outline-hidden focus:border-[#0F172A]"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1 text-[10px] font-mono">
                  Role Category *
                </label>
                <select 
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 focus:bg-white focus:outline-hidden"
                >
                  <option value="Student Lead">Student Lead</option>
                  <option value="Student Researcher">Student Researcher</option>
                  <option value="Faculty Mentor">Faculty Mentor</option>
                  <option value="Industry Advisor">Industry Advisor</option>
                  <option value="Gov Liaison">Government Stakeholder / Liaison</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1 text-[10px] font-mono">
                  Department / Laboratory *
                </label>
                <input 
                  type="text"
                  required
                  value={inviteDept}
                  onChange={(e) => setInviteDept(e.target.value)}
                  placeholder="e.g. Computer Science, Electronics, Agriculture"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 focus:bg-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1 text-[10px] font-mono">
                  Expertise
                </label>
                <input 
                  type="text"
                  value={inviteExpertise}
                  onChange={(e) => setInviteExpertise(e.target.value)}
                  placeholder="e.g. AI / Computer Vision, IoT Sensors"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 focus:bg-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1 text-[10px] font-mono">
                  Responsibility
                </label>
                <input 
                  type="text"
                  value={inviteResponsibility}
                  onChange={(e) => setInviteResponsibility(e.target.value)}
                  placeholder="e.g. Model training, sensor calibration"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 focus:bg-white focus:outline-hidden"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl border border-stone-300 text-stone-700 font-bold hover:bg-stone-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold cursor-pointer"
                >
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. ADD TASK MODAL */}
      {isAddTaskModalOpen && (
        <div className="fixed inset-0 bg-[#0F172A]/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-stone-200 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h3 className="text-base font-bold text-[#0F172A] font-heading">
                Create Project Task
              </h3>
              <button onClick={() => setIsAddTaskModalOpen(false)} className="text-stone-400 hover:text-stone-600 text-sm font-bold cursor-pointer">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1 text-[10px] font-mono">
                  Task Title *
                </label>
                <input 
                  type="text"
                  required
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="e.g. Train elephant detection model"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 focus:bg-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1 text-[10px] font-mono">
                  Owner / Assignee *
                </label>
                <select 
                  value={newTaskAssignee}
                  onChange={(e) => setNewTaskAssignee(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 focus:bg-white focus:outline-hidden"
                >
                  {categorizedTeam.raw.map((m: any) => (
                    <option key={m.id} value={m.name}>{m.name} ({m.role})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 uppercase mb-1 text-[10px] font-mono">
                    Priority
                  </label>
                  <select 
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 focus:bg-white focus:outline-hidden"
                  >
                    <option value="High">HIGH</option>
                    <option value="Medium">MEDIUM</option>
                    <option value="Low">LOW</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 uppercase mb-1 text-[10px] font-mono">
                    Due Date
                  </label>
                  <input 
                    type="date"
                    value={newTaskDueDate}
                    onChange={(e) => setNewTaskDueDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddTaskModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl border border-stone-300 text-stone-700 font-bold hover:bg-stone-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold cursor-pointer"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. UPLOAD DOCUMENT MODAL */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-[#0F172A]/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-stone-200 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h3 className="text-base font-bold text-[#0F172A] font-heading">
                Upload Project Document
              </h3>
              <button onClick={() => setIsUploadModalOpen(false)} className="text-stone-400 hover:text-stone-600 text-sm font-bold cursor-pointer">
                ✕
              </button>
            </div>

            <form onSubmit={handleUploadAsset} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1 text-[10px] font-mono">
                  Document Title *
                </label>
                <input 
                  type="text"
                  required
                  value={assetTitle}
                  onChange={(e) => setAssetTitle(e.target.value)}
                  placeholder="e.g. Pilot Testing Report"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 focus:bg-white focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 uppercase mb-1 text-[10px] font-mono">
                    Category *
                  </label>
                  <select 
                    value={assetCategory}
                    onChange={(e) => setAssetCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 focus:bg-white focus:outline-hidden"
                  >
                    <option value="Research">Research</option>
                    <option value="Proposal">Proposal</option>
                    <option value="Technical">Technical</option>
                    <option value="Testing">Testing</option>
                    <option value="Government">Government</option>
                    <option value="Legal / IP">Legal / IP</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 uppercase mb-1 text-[10px] font-mono">
                    File Type
                  </label>
                  <select 
                    value={assetType}
                    onChange={(e) => setAssetType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 focus:bg-white focus:outline-hidden"
                  >
                    <option value="pdf">PDF Document</option>
                    <option value="cad">CAD / STEP</option>
                    <option value="code">Source Code / Firmware</option>
                    <option value="dataset">CSV / Dataset</option>
                  </select>
                </div>
              </div>

              <div className="p-4 border-2 border-dashed border-stone-300 rounded-xl text-center bg-stone-50 space-y-1">
                <FileText className="w-5 h-5 text-stone-400 mx-auto" />
                <p className="text-xs text-stone-600 font-semibold">Click or drag document here</p>
                <p className="text-[10px] text-stone-400">PDF, STEP, C, Python, CSV up to 25MB</p>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl border border-stone-300 text-stone-700 font-bold hover:bg-stone-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold cursor-pointer"
                >
                  Upload & Sign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. UPDATE PROJECT STATUS MODAL */}
      {isUpdateProjectModalOpen && (
        <div className="fixed inset-0 bg-[#0F172A]/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-stone-200 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h3 className="text-base font-bold text-[#0F172A] font-heading">
                Update Project Status
              </h3>
              <button onClick={() => setIsUpdateProjectModalOpen(false)} className="text-stone-400 hover:text-stone-600 text-sm font-bold cursor-pointer">
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProjectUpdate} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1 text-[10px] font-mono">
                  Current Stage *
                </label>
                <select 
                  value={updateStage}
                  onChange={(e) => setUpdateStage(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 focus:bg-white focus:outline-hidden"
                >
                  <option value="Problem Research">01 Problem Research</option>
                  <option value="Solution Design">02 Solution Design</option>
                  <option value="Prototype Development">03 Prototype Development</option>
                  <option value="Pilot Testing">04 Pilot Testing</option>
                  <option value="Deployment">05 Deployment</option>
                  <option value="Impact Validation">06 Impact Validation</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1 text-[10px] font-mono">
                  Overall Progress ({updateProgress}%)
                </label>
                <input 
                  type="range"
                  min={0}
                  max={100}
                  value={updateProgress}
                  onChange={(e) => setUpdateProgress(Number(e.target.value))}
                  className="w-full accent-[#0F172A]"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1 text-[10px] font-mono">
                  Sprint Update Note
                </label>
                <textarea 
                  rows={2}
                  value={updateNote}
                  onChange={(e) => setUpdateNote(e.target.value)}
                  placeholder="e.g. Field testing in Buruhatu and Namkum villages completed with zero false alarms."
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 focus:bg-white focus:outline-hidden resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUpdateProjectModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl border border-stone-300 text-stone-700 font-bold hover:bg-stone-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
