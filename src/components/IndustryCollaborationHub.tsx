import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  HandCoins, 
  Award, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  TrendingUp, 
  FileText, 
  Layers, 
  HeartHandshake, 
  Sparkles,
  ExternalLink,
  DollarSign,
  ChevronRight,
  Search,
  Filter,
  Cpu,
  Radio,
  Microscope,
  Users,
  ArrowUpRight,
  Check,
  X,
  SlidersHorizontal,
  Info,
  Compass,
  Target,
  Factory,
  Briefcase,
  MapPin,
  Scale,
  RefreshCw,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { IndustryOpportunity } from '../types';

interface IndustryCollaborationHubProps {
  opportunities: IndustryOpportunity[];
  onSelectProject: (challengeId: string) => void;
}

interface ProjectOpportunityItem {
  id: string;
  projectId: string;
  challengeId: string;
  title: string;
  domain: string;
  district: string;
  location: string;
  university: string;
  currentStage: string;
  problem: string;
  matchScore: number;
  potentialBeneficiaries: string;
  technologyNeeded: string[];
  lookingFor: string[];
  fundingRequired: string;
  fundingAmountNum: number;
  fundingRaised: number;
  breakdown: {
    techExpertise: number;
    industryCapability: number;
    infrastructure: number;
    previousProjects: number;
    geographicPresence: number;
  };
  priority?: 'HIGH PRIORITY' | 'STANDARD';
}

export const IndustryCollaborationHub: React.FC<IndustryCollaborationHubProps> = ({
  opportunities,
  onSelectProject
}) => {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [selectedTechnology, setSelectedTechnology] = useState('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedContribution, setSelectedContribution] = useState('All');
  const [selectedFundingRange, setSelectedFundingRange] = useState('All');
  const [selectedStage, setSelectedStage] = useState('All');

  // Modals state
  const [collaborationProject, setCollaborationProject] = useState<ProjectOpportunityItem | null>(null);
  const [matchBreakdownProject, setMatchBreakdownProject] = useState<ProjectOpportunityItem | null>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Active Profile State (Default: EcoSense Technologies)
  const [activeProfile, setActiveProfile] = useState({
    name: 'EcoSense Technologies',
    type: 'Industrial IoT & Environmental Hardware Corp',
    expertise: ['IoT', 'Computer Vision', 'Environmental Monitoring'],
    capabilities: ['Hardware', 'Engineering', 'Testing', 'Pilot Deployment'],
    preferredDomains: ['Water', 'Environment', 'Agriculture'],
    preferredDistricts: ['Ranchi', 'Dumka', 'West Singhbhum'],
    contactPerson: 'Vikash Anand (Director of Applied Engineering)',
    contactEmail: 'v.anand@ecosensetech.in'
  });

  // Collaboration form state
  const [selectedContributionTypes, setSelectedContributionTypes] = useState<string[]>(['Hardware', 'Technical Mentorship']);
  const [collabOrg, setCollabOrg] = useState(activeProfile.name);
  const [collabContact, setCollabContact] = useState(activeProfile.contactPerson);
  const [collabEmail, setCollabEmail] = useState(activeProfile.contactEmail);
  const [collabMessage, setCollabMessage] = useState('We can provide low-power sensor packages, field mounting enclosures, and technical engineering mentorship for the field trials.');
  const [collabDetails, setCollabDetails] = useState('Includes 10 custom IP67 test units and 40 engineering hours of firmware optimization.');
  const [collabEstimatedValue, setCollabEstimatedValue] = useState('500000');

  // Register form state
  const [regOrgName, setRegOrgName] = useState('');
  const [regOrgType, setRegOrgType] = useState('Startup');
  const [regExpertise, setRegExpertise] = useState('AI & Computer Vision, IoT Sensors');
  const [regPreferredDomains, setRegPreferredDomains] = useState('Water, Agriculture');
  const [regDistricts, setRegDistricts] = useState('Ranchi, Hazaribagh');
  const [regContactName, setRegContactName] = useState('');
  const [regContactEmail, setRegContactEmail] = useState('');

  // Enriched opportunities catalogue
  const allProjectOpportunities: ProjectOpportunityItem[] = useMemo(() => {
    return [
      {
        id: 'ind-elephant',
        projectId: 'proj-elephant',
        challengeId: 'ch-elephant',
        title: 'AI-Based Early Warning System for Human–Elephant Conflict',
        domain: 'Agriculture',
        district: 'West Singhbhum',
        location: 'West Singhbhum · Agriculture · Wildlife Safety',
        university: 'Birla Institute of Technology (BIT) Mesra',
        currentStage: 'Prototype → Pilot',
        problem: 'Wild elephant herds repeatedly enter fringe agricultural villages and fields at night, resulting in devastating crop trampling, human casualties, and retaliatory incidents.',
        matchScore: 94,
        potentialBeneficiaries: '1,200 people (8 villages)',
        technologyNeeded: ['Computer Vision', 'IoT Sensors', 'Edge AI', 'GIS'],
        lookingFor: ['Hardware', 'Technical Mentorship', 'Pilot Support'],
        fundingRequired: '₹25.0 Lakhs',
        fundingAmountNum: 2500000,
        fundingRaised: 1850000,
        breakdown: {
          techExpertise: 40,
          industryCapability: 25,
          infrastructure: 15,
          previousProjects: 10,
          geographicPresence: 10
        },
        priority: 'HIGH PRIORITY'
      },
      {
        id: 'ind-water-dumka',
        projectId: 'proj-01',
        challengeId: 'ch-01',
        title: 'Rural Water Quality Monitoring Network',
        domain: 'Water',
        district: 'Dumka',
        location: 'Dumka · Drinking Water · Community Health',
        university: 'BIT Mesra & AIIMS Deoghar Joint Lab',
        currentStage: 'Prototype',
        problem: 'Rural tribal hamlets lack affordable, continuous real-time water quality monitoring to detect microbial pathogens and heavy metals in shallow aquifer borewells.',
        matchScore: 91,
        potentialBeneficiaries: '18,000 residents',
        technologyNeeded: ['IoT Sensors', 'Sensor Technology', 'Cloud Infrastructure', 'Solar Power'],
        lookingFor: ['Hardware', 'Testing', 'Funding', 'Pilot Deployment'],
        fundingRequired: '₹8–12 Lakh',
        fundingAmountNum: 1000000,
        fundingRaised: 420000,
        breakdown: {
          techExpertise: 38,
          industryCapability: 24,
          infrastructure: 14,
          previousProjects: 8,
          geographicPresence: 7
        },
        priority: 'HIGH PRIORITY'
      },
      {
        id: 'ind-crop-disease',
        projectId: 'proj-02',
        challengeId: 'ch-02',
        title: 'Smart Crop Disease Detection & Localized Advisory',
        domain: 'Agriculture',
        district: 'Hazaribagh',
        location: 'Hazaribagh · Agriculture · Food Security',
        university: 'Birsa Agricultural University (BAU), Ranchi',
        currentStage: 'Prototype',
        problem: 'Early blight and bacterial wilt destroy smallholder vegetable crops before extension officers can visit remote farms, causing up to 45% yield losses.',
        matchScore: 88,
        potentialBeneficiaries: '7,200 farmers',
        technologyNeeded: ['Computer Vision', 'Mobile Applications', 'Edge AI', 'Data Analytics'],
        lookingFor: ['Testing', 'Pilot Deployment', 'Mentorship', 'Technology'],
        fundingRequired: '₹14.0 Lakhs',
        fundingAmountNum: 1400000,
        fundingRaised: 650000,
        breakdown: {
          techExpertise: 36,
          industryCapability: 22,
          infrastructure: 13,
          previousProjects: 9,
          geographicPresence: 8
        },
        priority: 'HIGH PRIORITY'
      },
      {
        id: 'ind-transport-ranchi',
        projectId: 'proj-04',
        challengeId: 'ch-04',
        title: 'Accessible Public Transport & Shared Mobility Mapping',
        domain: 'Urban Infrastructure',
        district: 'Ranchi',
        location: 'Ranchi · Urban Mobility · Inclusive Access',
        university: 'NIT Jamshedpur & BIT Mesra',
        currentStage: 'Pilot Deployment',
        problem: 'Persons with disabilities, senior citizens, and women workers face unpredictable shared auto-rickshaw feeder routes and unmapped peri-urban transport gaps.',
        matchScore: 86,
        potentialBeneficiaries: '24,000 potential beneficiaries',
        technologyNeeded: ['GIS', 'Mobile Applications', 'Cloud Infrastructure', 'Data Analytics'],
        lookingFor: ['Technology', 'Commercialization', 'Pilot Deployment'],
        fundingRequired: '₹16.5 Lakhs',
        fundingAmountNum: 1650000,
        fundingRaised: 980000,
        breakdown: {
          techExpertise: 34,
          industryCapability: 20,
          infrastructure: 15,
          previousProjects: 9,
          geographicPresence: 8
        },
        priority: 'HIGH PRIORITY'
      },
      {
        id: 'ind-waste-dhanbad',
        projectId: 'proj-03',
        challengeId: 'ch-03',
        title: 'Smart Waste Segregation & Methane Flaring Network',
        domain: 'Environment',
        district: 'Dhanbad',
        location: 'Dhanbad · Environmental Tech · Civic Sanitation',
        university: 'IIT (ISM) Dhanbad',
        currentStage: 'Prototype Ready',
        problem: 'Mining township landfills suffer spontaneous subsurface combustion due to unsegregated organic waste emitting unmanaged methane plumes.',
        matchScore: 89,
        potentialBeneficiaries: '45,000 residents',
        technologyNeeded: ['Computer Vision', 'IoT Sensors', 'Renewable Energy', 'Edge AI'],
        lookingFor: ['Hardware', 'Testing', 'Pilot Deployment', 'Funding'],
        fundingRequired: '₹28.0 Lakhs',
        fundingAmountNum: 2800000,
        fundingRaised: 1400000,
        breakdown: {
          techExpertise: 37,
          industryCapability: 23,
          infrastructure: 14,
          previousProjects: 8,
          geographicPresence: 7
        },
        priority: 'STANDARD'
      },
      {
        id: 'ind-cold-storage',
        projectId: 'proj-02-scale',
        challengeId: 'ch-02',
        title: 'Solar Phase-Change Micro Cold Storage for Rural Farmers',
        domain: 'Agriculture',
        district: 'Khunti',
        location: 'Khunti · Tribal Farming · Post-Harvest Tech',
        university: 'Birsa Agricultural University & BIT Mesra',
        currentStage: 'Pilot Validation',
        problem: 'Tribal minor forest produce and lac harvesters are forced into distress sales due to lack of off-grid temperature-controlled holding chambers.',
        matchScore: 92,
        potentialBeneficiaries: '3,800 forest produce harvesters',
        technologyNeeded: ['Renewable Energy', 'IoT Sensors', 'Thermal PCM', 'Cloud Infrastructure'],
        lookingFor: ['Hardware', 'Commercialization', 'Funding', 'Pilot Deployment'],
        fundingRequired: '₹18.0 Lakhs',
        fundingAmountNum: 1800000,
        fundingRaised: 1100000,
        breakdown: {
          techExpertise: 39,
          industryCapability: 24,
          infrastructure: 13,
          previousProjects: 9,
          geographicPresence: 7
        },
        priority: 'STANDARD'
      },
      {
        id: 'ind-healthcare-scanner',
        projectId: 'proj-05',
        challengeId: 'ch-05',
        title: 'Portable Non-Invasive Hemoglobin & Malnutrition Reader',
        domain: 'Healthcare',
        district: 'Dumka',
        location: 'Dumka · Rural Healthcare · Maternal Welfare',
        university: 'AIIMS Deoghar & BIT Mesra Joint Lab',
        currentStage: 'Prototype → Testing',
        problem: 'Rural Anganwadi workers face severe supply delays with disposable needle lancets, causing undetected acute anemia in expectant mothers.',
        matchScore: 95,
        potentialBeneficiaries: '32,000 rural women and infants',
        technologyNeeded: ['Assistive Technology', 'IoT Sensors', 'Mobile Applications', 'Edge AI'],
        lookingFor: ['Testing', 'Hardware', 'Commercialization', 'Funding'],
        fundingRequired: '₹32.0 Lakhs',
        fundingAmountNum: 3200000,
        fundingRaised: 2100000,
        breakdown: {
          techExpertise: 40,
          industryCapability: 25,
          infrastructure: 14,
          previousProjects: 9,
          geographicPresence: 7
        },
        priority: 'HIGH PRIORITY'
      }
    ];
  }, []);

  // Filter options
  const filterOptions = {
    domains: ['All', 'Agriculture', 'Water', 'Environment', 'Healthcare', 'Urban Infrastructure'],
    technologies: ['All', 'Computer Vision', 'IoT Sensors', 'Edge AI', 'GIS', 'Mobile Applications', 'Cloud Infrastructure', 'Data Analytics', 'Renewable Energy', 'Assistive Technology'],
    districts: ['All', 'West Singhbhum', 'Dumka', 'Hazaribagh', 'Ranchi', 'Dhanbad', 'Khunti', 'Bokaro'],
    contributionTypes: ['All', 'Mentorship', 'Funding', 'Technology', 'Hardware', 'Testing', 'Pilot Deployment', 'Commercialization'],
    fundingRanges: ['All', 'Under ₹10 Lakh', '₹10–20 Lakh', '₹20–30 Lakh', 'Over ₹30 Lakh'],
    stages: ['All', 'Prototype', 'Prototype → Pilot', 'Pilot Deployment', 'Pilot Validation', 'Prototype Ready']
  };

  // Filtered list based on all criteria
  const filteredProjects = useMemo(() => {
    return allProjectOpportunities.filter((item) => {
      // Search term
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = (item.title || '').toLowerCase().includes(query);
        const matchDomain = (item.domain || '').toLowerCase().includes(query);
        const matchDistrict = (item.district || '').toLowerCase().includes(query);
        const matchTech = (item.technologyNeeded || []).some(t => (t || '').toLowerCase().includes(query));
        const matchProblem = (item.problem || '').toLowerCase().includes(query);
        if (!matchTitle && !matchDomain && !matchDistrict && !matchTech && !matchProblem) {
          return false;
        }
      }

      // Domain
      if (selectedDomain !== 'All' && item.domain !== selectedDomain) {
        return false;
      }

      // Technology
      if (selectedTechnology !== 'All' && !item.technologyNeeded.includes(selectedTechnology)) {
        return false;
      }

      // District
      if (selectedDistrict !== 'All' && item.district !== selectedDistrict) {
        return false;
      }

      // Contribution Type
      if (selectedContribution !== 'All') {
        const mapped = selectedContribution === 'Pilot Deployment' ? 'Pilot Support' : selectedContribution === 'Mentorship' ? 'Technical Mentorship' : selectedContribution;
        const hasContrib = (item.lookingFor || []).some(c => (c || '').toLowerCase().includes((mapped || '').toLowerCase()) || (mapped || '').toLowerCase().includes((c || '').toLowerCase()));
        if (!hasContrib) return false;
      }

      // Funding Range
      if (selectedFundingRange !== 'All') {
        if (selectedFundingRange === 'Under ₹10 Lakh' && item.fundingAmountNum >= 1000000) return false;
        if (selectedFundingRange === '₹10–20 Lakh' && (item.fundingAmountNum < 1000000 || item.fundingAmountNum > 2000000)) return false;
        if (selectedFundingRange === '₹20–30 Lakh' && (item.fundingAmountNum < 2000000 || item.fundingAmountNum > 3000000)) return false;
        if (selectedFundingRange === 'Over ₹30 Lakh' && item.fundingAmountNum <= 3000000) return false;
      }

      // Stage
      if (selectedStage !== 'All' && item.currentStage !== selectedStage) {
        return false;
      }

      return true;
    });
  }, [allProjectOpportunities, searchQuery, selectedDomain, selectedTechnology, selectedDistrict, selectedContribution, selectedFundingRange, selectedStage]);

  // Handle open collaboration modal
  const handleOpenCollaborate = (project: ProjectOpportunityItem) => {
    setCollaborationProject(project);
    setCollabOrg(activeProfile.name);
    setCollabContact(activeProfile.contactPerson);
    setCollabEmail(activeProfile.contactEmail);
    // Pre-populate checkboxes matching project need
    const initialTypes = project.lookingFor.map(l => {
      if (l.includes('Mentorship')) return 'Mentor';
      if (l.includes('Hardware')) return 'Provide Hardware';
      if (l.includes('Support') || l.includes('Pilot')) return 'Support Pilot Deployment';
      if (l.includes('Testing')) return 'Provide Testing Facility';
      if (l.includes('Funding')) return 'Fund';
      return l;
    });
    setSelectedContributionTypes(initialTypes.length > 0 ? initialTypes : ['Provide Hardware', 'Mentor']);
  };

  // Toggle contribution type in modal
  const handleToggleContributionType = (type: string) => {
    if (selectedContributionTypes.includes(type)) {
      setSelectedContributionTypes(selectedContributionTypes.filter(t => t !== type));
    } else {
      setSelectedContributionTypes([...selectedContributionTypes, type]);
    }
  };

  // Handle Submit Collaboration Request
  const handleSubmitCollaboration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!collaborationProject) return;

    setSuccessToast(`Collaboration proposal transmitted! ${collabOrg} successfully pledged ₹${(Number(collabEstimatedValue) / 100000).toFixed(1)} Lakhs equivalent support to "${collaborationProject.title}". Faculty & Government coordinators notified.`);
    setCollaborationProject(null);
    setTimeout(() => setSuccessToast(null), 5000);
  };

  // Handle Register Industry Partner
  const handleRegisterPartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regOrgName.trim()) return;

    setActiveProfile({
      name: regOrgName,
      type: regOrgType,
      expertise: regExpertise.split(',').map(s => s.trim()),
      capabilities: ['Engineering', 'Mentorship', 'Field Testing'],
      preferredDomains: regPreferredDomains.split(',').map(s => s.trim()),
      preferredDistricts: regDistricts.split(',').map(s => s.trim()),
      contactPerson: regContactName || 'Authorized Coordinator',
      contactEmail: regContactEmail || 'partner@innovate.in'
    });

    setIsRegisterModalOpen(false);
    setSuccessToast(`Welcome, ${regOrgName}! Your industry profile is active. SAMADHAN AI match scores re-calculated.`);
    setTimeout(() => setSuccessToast(null), 5000);
  };

  // Seven Contribution Paths
  const sevenContributionPaths = [
    {
      key: 'Mentor',
      title: 'MENTOR',
      icon: Award,
      color: 'border-indigo-200 bg-indigo-50/50 text-indigo-900',
      tagColor: 'bg-indigo-100 text-indigo-800',
      description: 'Share technical and domain expertise directly with university student and faculty R&D teams.',
      actionLabel: 'Explore Mentorship Needs',
      filterTarget: 'Mentorship'
    },
    {
      key: 'Fund',
      title: 'FUND',
      icon: HandCoins,
      color: 'border-emerald-200 bg-emerald-50/50 text-emerald-900',
      tagColor: 'bg-emerald-100 text-emerald-800',
      description: 'Provide project or pilot funding under Section 135 CSR tax-exempt civic grants.',
      actionLabel: 'View Funding Calls',
      filterTarget: 'Funding'
    },
    {
      key: 'Technology',
      title: 'TECHNOLOGY',
      icon: Zap,
      color: 'border-blue-200 bg-blue-50/50 text-blue-900',
      tagColor: 'bg-blue-100 text-blue-800',
      description: 'Provide software, APIs, cloud credits, or specialized data analytics infrastructure.',
      actionLabel: 'Supply Tech Stack',
      filterTarget: 'Technology'
    },
    {
      key: 'Hardware',
      title: 'HARDWARE',
      icon: Cpu,
      color: 'border-amber-200 bg-amber-50/50 text-amber-900',
      tagColor: 'bg-amber-100 text-[#C2410C]',
      description: 'Provide precision equipment, sensor nodes, solar kits, or industrial enclosures.',
      actionLabel: 'Contribute Hardware',
      filterTarget: 'Hardware'
    },
    {
      key: 'Testing',
      title: 'TESTING',
      icon: Microscope,
      color: 'border-purple-200 bg-purple-50/50 text-purple-900',
      tagColor: 'bg-purple-100 text-purple-800',
      description: 'Provide certified laboratories, environmental stress chambers, or NABL assay facilities.',
      actionLabel: 'Offer Testing Labs',
      filterTarget: 'Testing'
    },
    {
      key: 'Pilot',
      title: 'PILOT',
      icon: Radio,
      color: 'border-stone-300 bg-stone-100/70 text-stone-900',
      tagColor: 'bg-stone-200 text-stone-800',
      description: 'Support real-world deployment, field testing sites, and village community trials.',
      actionLabel: 'Deploy Field Trials',
      filterTarget: 'Pilot Deployment'
    },
    {
      key: 'Commercialize',
      title: 'COMMERCIALIZE',
      icon: TrendingUp,
      color: 'border-orange-200 bg-orange-50/50 text-orange-950',
      tagColor: 'bg-orange-100 text-[#C2410C]',
      description: 'Help scale, license IP, manufacture, and bring successful grassroots solutions to market.',
      actionLabel: 'Explore Licensing & Scale',
      filterTarget: 'Commercialization'
    }
  ];

  // Active Industry Collaborations list
  const activeCollaborationsList = [
    {
      id: 'ac-1',
      partner: 'EcoSense Technologies',
      type: 'IoT Hardware Partner',
      project: 'AI Elephant Conflict Warning System',
      stage: 'Pilot Testing',
      status: 'ACTIVE',
      badgeColor: 'bg-emerald-50 text-[#065F46] border-emerald-200'
    },
    {
      id: 'ac-2',
      partner: 'AgriTech Innovations',
      type: 'Agricultural Technology Partner',
      project: 'Smart Crop Disease Advisory',
      stage: 'Field Deployment',
      status: 'ACTIVE',
      badgeColor: 'bg-emerald-50 text-[#065F46] border-emerald-200'
    },
    {
      id: 'ac-3',
      partner: 'CleanWater Labs',
      type: 'Testing Partner',
      project: 'Nanofiltration River Basin Kiosks',
      stage: 'Water Quality Validation',
      status: 'ACTIVE',
      badgeColor: 'bg-emerald-50 text-[#065F46] border-emerald-200'
    }
  ];

  // Technology Needs Marketplace Items
  const technologyNeedsList = [
    { tech: 'Computer Vision', projectsCount: 14, district: 'West Singhbhum & Ranchi', stage: 'Pilot Ready', impact: 'Elephant & pest detection' },
    { tech: 'IoT Sensors', projectsCount: 22, district: 'Dumka & Khunti', stage: 'Prototyping', impact: 'Water & soil telemetry' },
    { tech: 'GIS Mapping', projectsCount: 9, district: 'Ranchi & Dhanbad', stage: 'Field Deployment', impact: 'Transit & corridor routing' },
    { tech: 'Mobile Applications', projectsCount: 16, district: 'Hazaribagh & Bokaro', stage: 'Alpha Testing', impact: 'Dialect farmer alerts' },
    { tech: 'Cloud Infrastructure', projectsCount: 11, district: 'Statewide Cloud', stage: 'Scale-out', impact: 'Centralized district sync' },
    { tech: 'Data Analytics', projectsCount: 8, district: 'Ranchi Urban', stage: 'Validation', impact: 'PHED grievance prediction' },
    { tech: 'Renewable Energy', projectsCount: 13, district: 'Khunti & Dumka', stage: 'Hardware Build', impact: 'Solar off-grid storage' },
    { tech: 'Assistive Technology', projectsCount: 6, district: 'Deoghar & Ranchi', stage: 'Clinical Testing', impact: 'Non-invasive screening' }
  ];

  // Mentorship Areas
  const mentorshipAreas = [
    { area: 'Artificial Intelligence', projects: 18, availableMentors: 24, activeMentorships: 14 },
    { area: 'IoT & Embedded Systems', projects: 22, availableMentors: 31, activeMentorships: 19 },
    { area: 'Agriculture & Post-Harvest', projects: 16, availableMentors: 19, activeMentorships: 12 },
    { area: 'Healthcare & Biomedical', projects: 10, availableMentors: 14, activeMentorships: 8 },
    { area: 'Water Engineering', projects: 12, availableMentors: 16, activeMentorships: 9 },
    { area: 'Urban Planning & Mobility', projects: 7, availableMentors: 11, activeMentorships: 6 },
    { area: 'Public Policy & Standards', projects: 9, availableMentors: 13, activeMentorships: 7 },
    { area: 'Entrepreneurship & IP', projects: 15, availableMentors: 20, activeMentorships: 11 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 bg-[#FAF9F5] text-stone-800">
      
      {/* SUCCESS TOAST */}
      {successToast && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center justify-between shadow-2xs animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#065F46] shrink-0" />
            <span>{successToast}</span>
          </div>
          <button 
            onClick={() => setSuccessToast(null)} 
            className="text-xs text-emerald-800 font-bold hover:underline cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. EDITORIAL HEADER */}
      {/* ========================================================================= */}
      <header className="bg-white rounded-2xl p-6 sm:p-10 border border-stone-200 shadow-2xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold text-[#C2410C] uppercase tracking-wider">
                SAMADHANSETU AI · INDUSTRY NETWORK
              </span>
              <span className="text-stone-300">|</span>
              <span className="text-xs text-stone-500 font-medium">
                Section 135 CSR & Technology Transfer Hub
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight font-heading leading-tight">
              Turn Expertise Into Impact.
            </h1>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl">
              Discover high-potential societal innovation projects where your organization can contribute technology, funding, mentorship, infrastructure or deployment support.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <a
              href="#matched-opportunities"
              id="header-explore-cta"
              className="px-5 py-3 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore Opportunities</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              id="header-register-cta"
              onClick={() => setIsRegisterModalOpen(true)}
              className="px-5 py-3 rounded-xl border border-stone-300 bg-stone-50 hover:bg-white text-stone-800 text-xs font-bold shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Building2 className="w-4 h-4 text-stone-500" />
              <span>Register as Industry Partner</span>
            </button>
          </div>
        </div>

        {/* Central Question Callout */}
        <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-stone-600 italic">
            <span className="font-semibold text-stone-900 not-italic font-mono uppercase text-[10px] bg-stone-100 px-2 py-0.5 rounded">
              MISSION PRINCIPLE
            </span>
            <span>"Where can our organization create the most measurable societal impact?"</span>
          </div>
          <div className="flex items-center gap-4 text-stone-500 font-medium">
            <span>• Government Verified</span>
            <span>• Academic Capstones</span>
            <span>• Direct Field Access</span>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. INDUSTRY SUMMARY: COMPACT IMPACT STRIP */}
      {/* ========================================================================= */}
      <section aria-label="Industry Summary Impact Strip">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          
          <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400">Network</span>
              <Building2 className="w-3.5 h-3.5 text-stone-400" />
            </div>
            <div className="mt-2">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-heading">186</div>
              <div className="text-xs font-semibold text-stone-600 mt-0.5">Industry Partners</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400">Mentoring</span>
              <Award className="w-3.5 h-3.5 text-stone-400" />
            </div>
            <div className="mt-2">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-heading">74</div>
              <div className="text-xs font-semibold text-stone-600 mt-0.5">Active Mentorships</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400">Investment</span>
              <HandCoins className="w-3.5 h-3.5 text-stone-400" />
            </div>
            <div className="mt-2">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#065F46] font-heading">42</div>
              <div className="text-xs font-semibold text-stone-600 mt-0.5">Funded Projects</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400">Engineering</span>
              <Zap className="w-3.5 h-3.5 text-stone-400" />
            </div>
            <div className="mt-2">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-heading">31</div>
              <div className="text-xs font-semibold text-stone-600 mt-0.5">Technology Contributions</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs flex flex-col justify-between col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400">Field Trials</span>
              <Radio className="w-3.5 h-3.5 text-stone-400" />
            </div>
            <div className="mt-2">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#C2410C] font-heading">24</div>
              <div className="text-xs font-semibold text-stone-600 mt-0.5">Pilot Partnerships</div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SAMADHAN AI INSIGHTS BAR */}
      {/* ========================================================================= */}
      <div className="bg-[#0F172A] rounded-2xl p-5 text-white shadow-xs border border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4 text-[#F59E0B]" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase font-bold text-[#F59E0B] tracking-wider block">
                SAMADHAN AI MATCH ENGINE
              </span>
              <span className="text-[10px] text-stone-400">
                Matched with: <strong>{activeProfile.name}</strong>
              </span>
            </div>
            <p className="text-xs text-stone-200 leading-relaxed max-w-3xl">
              "Your IoT & Computer Vision expertise matches 18 active projects. 3 high-priority projects in Jharkhand require hardware support, and your previous agriculture work increases match scores across 7 rural opportunities."
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setSelectedTechnology('IoT Sensors');
            const el = document.getElementById('matched-opportunities');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold whitespace-nowrap self-start md:self-center cursor-pointer transition-colors"
        >
          View IoT Matches (18) →
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 4. LARGE FEATURED INNOVATION OPPORTUNITY */}
      {/* ========================================================================= */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-orange-100 text-[#C2410C] border border-orange-200">
              FEATURED INNOVATION OPPORTUNITY
            </span>
            <span className="text-xs text-stone-500 font-medium">Flagship Civic Pilot</span>
          </div>
          <span className="text-xs font-mono font-bold text-[#065F46] bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            91% AI MATCH
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-stone-500 mb-1">
                <MapPin className="w-3.5 h-3.5 text-[#C2410C]" />
                <span>Dumka, Jharkhand</span>
                <span>•</span>
                <span className="font-semibold text-stone-800">BIT Mesra & AIIMS Deoghar Joint Lab</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-heading">
                Rural Water Quality Monitoring Network
              </h2>
            </div>

            <div className="space-y-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
              <p>
                <strong className="text-stone-900 font-semibold">Problem: </strong>
                Communities lack affordable real-time water quality monitoring. Shallow drinking water wells across Santhal Pargana face seasonal arsenic and fecal coliform contamination without early warning.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-[10px] font-mono uppercase text-stone-400 font-bold block">Current Stage</span>
                <span className="text-xs font-extrabold text-[#0F172A] mt-0.5 block">Prototype</span>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-[10px] font-mono uppercase text-stone-400 font-bold block">Potential Impact</span>
                <span className="text-xs font-extrabold text-[#065F46] mt-0.5 block">18,000 residents</span>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 col-span-2 sm:col-span-1">
                <span className="text-[10px] font-mono uppercase text-stone-400 font-bold block">Funding Goal</span>
                <span className="text-xs font-extrabold text-[#0F172A] mt-0.5 block">₹8–12 Lakh</span>
              </div>
            </div>

            {/* Looking For Badges */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-mono uppercase font-bold text-stone-500 block">
                Looking for Specific Contributions:
              </span>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {['IoT Hardware', 'Sensor Technology', 'Field Testing', 'Pilot Funding'].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-800 font-medium border border-stone-200">
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Action Box */}
          <div className="lg:col-span-4 bg-stone-50 rounded-2xl p-6 border border-stone-200 space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-stone-500 font-bold block">
                Recommended Action
              </span>
              <div className="text-xs text-stone-700">
                Supply calibrated water sensor probes and telemetry gateway hardware for the 15-village pilot phase.
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                id="featured-explore-btn"
                onClick={() => onSelectProject('ch-01')}
                className="w-full py-2.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold shadow-2xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Project</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <button
                id="featured-offer-support-btn"
                onClick={() => {
                  const dumkaProject = allProjectOpportunities.find(p => p.id === 'ind-water-dumka');
                  if (dumkaProject) handleOpenCollaborate(dumkaProject);
                }}
                className="w-full py-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 text-xs font-bold shadow-2xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <HeartHandshake className="w-3.5 h-3.5 text-[#C2410C]" />
                <span>Offer Support</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. OPPORTUNITY SEARCH & COMPREHENSIVE FILTERS */}
      {/* ========================================================================= */}
      <section className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C2410C]">
              OPPORTUNITY DISCOVERY ENGINE
            </span>
            <h2 className="text-lg font-bold text-[#0F172A] font-heading mt-0.5">
              Search & Filter Societal Innovation Calls
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-stone-500 font-medium">Showing:</span>
            <strong className="text-[#0F172A] font-bold">{filteredProjects.length} Projects</strong>
            {(searchQuery || selectedDomain !== 'All' || selectedTechnology !== 'All' || selectedDistrict !== 'All' || selectedContribution !== 'All' || selectedFundingRange !== 'All' || selectedStage !== 'All') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDomain('All');
                  setSelectedTechnology('All');
                  setSelectedDistrict('All');
                  setSelectedContribution('All');
                  setSelectedFundingRange('All');
                  setSelectedStage('All');
                }}
                className="ml-2 text-xs font-bold text-[#C2410C] hover:underline cursor-pointer flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Search Field */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-stone-400" />
          </div>
          <input
            id="industry-opportunity-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects, technologies, domains or districts..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-300 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0F172A] bg-stone-50/50"
          />
        </div>

        {/* Clickable Quick Example Tags */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-stone-400 font-medium mr-1 text-[11px]">Popular Searches:</span>
          {['IoT', 'Agriculture', 'Water', 'Healthcare', 'Ranchi', 'Computer Vision'].map((ex) => (
            <button
              key={ex}
              onClick={() => setSearchQuery(ex)}
              className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-medium transition-colors cursor-pointer"
            >
              {ex}
            </button>
          ))}
        </div>

        {/* Responsive Filters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          
          {/* Domain */}
          <div>
            <label className="block text-[10px] font-mono font-bold uppercase text-stone-500 mb-1">
              Domain
            </label>
            <select
              id="filter-domain"
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="w-full px-2.5 py-2 rounded-xl border border-stone-200 bg-white text-xs font-semibold text-stone-800"
            >
              {filterOptions.domains.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Technology */}
          <div>
            <label className="block text-[10px] font-mono font-bold uppercase text-stone-500 mb-1">
              Technology
            </label>
            <select
              id="filter-tech"
              value={selectedTechnology}
              onChange={(e) => setSelectedTechnology(e.target.value)}
              className="w-full px-2.5 py-2 rounded-xl border border-stone-200 bg-white text-xs font-semibold text-stone-800"
            >
              {filterOptions.technologies.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* District */}
          <div>
            <label className="block text-[10px] font-mono font-bold uppercase text-stone-500 mb-1">
              District
            </label>
            <select
              id="filter-district"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-2.5 py-2 rounded-xl border border-stone-200 bg-white text-xs font-semibold text-stone-800"
            >
              {filterOptions.districts.map(dist => (
                <option key={dist} value={dist}>{dist}</option>
              ))}
            </select>
          </div>

          {/* Contribution Type */}
          <div>
            <label className="block text-[10px] font-mono font-bold uppercase text-stone-500 mb-1">
              Contribution Type
            </label>
            <select
              id="filter-contribution"
              value={selectedContribution}
              onChange={(e) => setSelectedContribution(e.target.value)}
              className="w-full px-2.5 py-2 rounded-xl border border-stone-200 bg-white text-xs font-semibold text-stone-800"
            >
              {filterOptions.contributionTypes.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Funding Range */}
          <div>
            <label className="block text-[10px] font-mono font-bold uppercase text-stone-500 mb-1">
              Funding Range
            </label>
            <select
              id="filter-funding"
              value={selectedFundingRange}
              onChange={(e) => setSelectedFundingRange(e.target.value)}
              className="w-full px-2.5 py-2 rounded-xl border border-stone-200 bg-white text-xs font-semibold text-stone-800"
            >
              {filterOptions.fundingRanges.map(fr => (
                <option key={fr} value={fr}>{fr}</option>
              ))}
            </select>
          </div>

          {/* Project Stage */}
          <div>
            <label className="block text-[10px] font-mono font-bold uppercase text-stone-500 mb-1">
              Project Stage
            </label>
            <select
              id="filter-stage"
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="w-full px-2.5 py-2 rounded-xl border border-stone-200 bg-white text-xs font-semibold text-stone-800"
            >
              {filterOptions.stages.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. AI-MATCHED OPPORTUNITIES (PRIMARY SECTION) */}
      {/* ========================================================================= */}
      <section id="matched-opportunities" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#065F46] uppercase tracking-wider">
                SAMADHAN AI · MATCHED OPPORTUNITIES
              </span>
              <span className="text-stone-300">|</span>
              <span className="text-xs text-stone-500 font-medium">
                Personalized for {activeProfile.name}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-heading mt-1">
              High-Impact Innovation Opportunities
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
              Projects ranked according to your organization's expertise, capabilities, technology and previous contributions.
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-xs font-bold text-stone-500 font-mono">
              MATCH ENGINE: V4.2 NEURAL RANK
            </span>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 space-y-4">
            <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#0F172A]">No Matching Opportunities Found</h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              No civic innovation projects match your active search and filter combinations. Try resetting filters or using a broader query.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDomain('All');
                setSelectedTechnology('All');
                setSelectedDistrict('All');
                setSelectedContribution('All');
              }}
              className="px-4 py-2 rounded-xl bg-[#0F172A] text-white text-xs font-bold cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((proj) => {
              return (
                <div
                  key={proj.id}
                  className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs hover:border-stone-400 transition-all flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3">
                    
                    {/* Header Row with Match Score and Domain */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold bg-stone-100 text-stone-800 px-2.5 py-0.5 rounded border border-stone-200 uppercase">
                          {proj.domain}
                        </span>
                        {proj.priority === 'HIGH PRIORITY' && (
                          <span className="text-[10px] font-mono font-bold text-[#DC2626] bg-red-50 px-2 py-0.5 rounded border border-red-200">
                            HIGH PRIORITY
                          </span>
                        )}
                      </div>

                      {/* AI Match Badge with Explanation Trigger */}
                      <button
                        onClick={() => setMatchBreakdownProject(proj)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-[#065F46] border border-emerald-200 hover:bg-emerald-100 text-xs font-bold font-mono transition-colors cursor-pointer"
                        title="Click to view AI match breakdown explanation"
                      >
                        <Sparkles className="w-3 h-3 text-[#065F46]" />
                        <span>{proj.matchScore}% MATCH</span>
                        <Info className="w-3 h-3 text-stone-400" />
                      </button>
                    </div>

                    {/* Title & Location */}
                    <div>
                      <h3 className="text-lg font-bold text-[#0F172A] font-heading leading-snug">
                        {proj.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-1 font-medium">
                        <MapPin className="w-3 h-3 text-stone-400" />
                        <span>{proj.location}</span>
                      </div>
                    </div>

                    {/* Current Stage & Beneficiaries Pill Row */}
                    <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                      <div className="p-2 rounded-xl bg-stone-50 border border-stone-200">
                        <span className="text-[10px] font-mono uppercase text-stone-400 font-bold block">Current Stage</span>
                        <span className="font-bold text-[#0F172A] text-xs mt-0.5 block">{proj.currentStage}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-stone-50 border border-stone-200">
                        <span className="text-[10px] font-mono uppercase text-stone-400 font-bold block">Potential Beneficiaries</span>
                        <span className="font-bold text-[#065F46] text-xs mt-0.5 block">{proj.potentialBeneficiaries}</span>
                      </div>
                    </div>

                    {/* Problem Description */}
                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                      <strong className="text-stone-900 font-semibold">Problem: </strong>
                      {proj.problem}
                    </p>

                    {/* Technology Needed */}
                    <div className="space-y-1 pt-1">
                      <span className="text-[10px] font-mono uppercase font-bold text-stone-400 block">
                        Technology Needed
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {proj.technologyNeeded.map(tech => (
                          <span key={tech} className="px-2 py-0.5 rounded text-[11px] font-medium bg-stone-100 text-stone-700 border border-stone-200">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Looking For */}
                    <div className="space-y-1 pt-1">
                      <span className="text-[10px] font-mono uppercase font-bold text-stone-400 block">
                        Looking For Contribution:
                      </span>
                      <div className="flex flex-wrap gap-1.5 text-xs">
                        {proj.lookingFor.map(item => (
                          <span key={item} className="px-2 py-0.5 rounded text-[11px] font-bold text-[#C2410C] bg-orange-50 border border-orange-200">
                            ✓ {item}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Actions Row */}
                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                    <button
                      onClick={() => onSelectProject(proj.challengeId)}
                      className="px-3 py-2 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <span>View Project</span>
                      <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                    </button>

                    <button
                      onClick={() => handleOpenCollaborate(proj)}
                      className="px-4 py-2 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold shadow-2xs transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <HeartHandshake className="w-3.5 h-3.5" />
                      <span>Collaborate</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* 7. CONTRIBUTION TYPES: HOW CAN YOU HELP? */}
      {/* ========================================================================= */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-6">
        <div className="pb-3 border-b border-stone-100">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C2410C]">
            PARTNERSHIP PATHWAYS
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] font-heading mt-0.5">
            How Can You Help?
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Choose from seven distinct engagement models tailored to corporate CSR mandates, tech ventures, and research institutions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sevenContributionPaths.map((cp) => {
            const IconComponent = cp.icon;
            return (
              <div
                key={cp.key}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${cp.color}`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${cp.tagColor}`}>
                      {cp.title}
                    </span>
                    <IconComponent className="w-4 h-4 opacity-70" />
                  </div>

                  <p className="text-xs leading-relaxed font-medium">
                    {cp.description}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSelectedContribution(cp.filterTarget);
                    const el = document.getElementById('matched-opportunities');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-2 rounded-xl bg-white/90 hover:bg-white text-xs font-bold text-stone-900 border border-stone-300 shadow-2xs transition-colors text-center cursor-pointer"
                >
                  {cp.actionLabel} →
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. ACTIVE INDUSTRY COLLABORATIONS */}
      {/* ========================================================================= */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400">
              FIELD ALLIANCE LEDGER
            </span>
            <h2 className="text-xl font-bold text-[#0F172A] font-heading mt-0.5">
              Active Industry Collaborations
            </h2>
          </div>
          <span className="text-[11px] font-mono text-stone-400 italic">
            *Certified Demo Partnerships
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {activeCollaborationsList.map((collab) => (
            <div key={collab.id} className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${collab.badgeColor}`}>
                  {collab.status}
                </span>
                <span className="text-[10px] font-mono text-stone-400 uppercase font-bold">
                  {collab.stage}
                </span>
              </div>

              <div>
                <h4 className="font-extrabold text-sm text-stone-900 font-heading">{collab.partner}</h4>
                <div className="text-xs font-medium text-[#C2410C] mt-0.5">{collab.type}</div>
              </div>

              <div className="pt-2 border-t border-stone-200/80 text-xs text-stone-600">
                <span className="text-stone-400 block text-[10px] font-mono uppercase">Project</span>
                <span className="font-semibold text-stone-900">{collab.project}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. PROJECTS NEEDING INDUSTRY SUPPORT (ACTIONABLE SECTION) */}
      {/* ========================================================================= */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-6">
        <div className="pb-3 border-b border-stone-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#DC2626]">
              URGENT GRASSROOTS CALLS
            </span>
            <h2 className="text-xl font-bold text-[#0F172A] font-heading mt-0.5">
              Projects Needing Industry Support
            </h2>
          </div>
          <span className="text-xs font-semibold text-stone-500">3 Priority Calls</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Item 1 */}
          <div className="p-5 rounded-xl border border-red-200 bg-red-50/30 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-100 text-[#DC2626] border border-red-200">
                  HIGH PRIORITY
                </span>
                <span className="text-xs font-mono text-stone-500">Dumka</span>
              </div>

              <h3 className="font-bold text-sm text-[#0F172A] font-heading">
                Rural Water Quality Monitoring
              </h3>

              <div className="text-xs text-stone-700">
                <span className="font-semibold text-stone-900 block">Critical Need:</span>
                Sensor Hardware + Pilot Funding
              </div>

              <div className="text-xs font-semibold text-[#065F46]">
                18,000 potential beneficiaries
              </div>
            </div>

            <button
              onClick={() => {
                const item = allProjectOpportunities.find(p => p.id === 'ind-water-dumka');
                if (item) handleOpenCollaborate(item);
              }}
              className="w-full py-2 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold transition-colors cursor-pointer shadow-2xs text-center"
            >
              Offer Support
            </button>
          </div>

          {/* Item 2 */}
          <div className="p-5 rounded-xl border border-stone-200 bg-stone-50/60 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-orange-100 text-[#C2410C] border border-orange-200">
                  HARVEST CRITICAL
                </span>
                <span className="text-xs font-mono text-stone-500">Hazaribagh</span>
              </div>

              <h3 className="font-bold text-sm text-[#0F172A] font-heading">
                Smart Crop Disease Detection
              </h3>

              <div className="text-xs text-stone-700">
                <span className="font-semibold text-stone-900 block">Critical Need:</span>
                Agricultural Data + Field Testing
              </div>

              <div className="text-xs font-semibold text-[#065F46]">
                7,200 farmers
              </div>
            </div>

            <button
              onClick={() => {
                const item = allProjectOpportunities.find(p => p.id === 'ind-crop-disease');
                if (item) handleOpenCollaborate(item);
              }}
              className="w-full py-2 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold transition-colors cursor-pointer shadow-2xs text-center"
            >
              Offer Support
            </button>
          </div>

          {/* Item 3 */}
          <div className="p-5 rounded-xl border border-stone-200 bg-stone-50/60 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 text-blue-800 border border-blue-200">
                  INCLUSIVE TRANSIT
                </span>
                <span className="text-xs font-mono text-stone-500">Ranchi</span>
              </div>

              <h3 className="font-bold text-sm text-[#0F172A] font-heading">
                Accessible Public Transport Mapping
              </h3>

              <div className="text-xs text-stone-700">
                <span className="font-semibold text-stone-900 block">Critical Need:</span>
                GIS Technology + Mobility Expertise
              </div>

              <div className="text-xs font-semibold text-[#065F46]">
                24,000 potential beneficiaries
              </div>
            </div>

            <button
              onClick={() => {
                const item = allProjectOpportunities.find(p => p.id === 'ind-transport-ranchi');
                if (item) handleOpenCollaborate(item);
              }}
              className="w-full py-2 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold transition-colors cursor-pointer shadow-2xs text-center"
            >
              Offer Support
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. FUNDING & MENTORSHIP DUAL CAROUSEL/GRID */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* FUNDING OPPORTUNITIES */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="pb-3 border-b border-stone-100">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#065F46]">
                CAPITAL ALLOCATION
              </span>
              <h2 className="text-xl font-bold text-[#0F172A] font-heading mt-0.5">
                Funding Opportunities
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Projects seeking CSR and angel seed grants with direct measurable societal ROI.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase font-bold text-stone-500">Project</span>
                <span className="text-[10px] font-mono font-bold text-[#065F46] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Target: ₹8–12 Lakh
                </span>
              </div>
              
              <h4 className="font-bold text-sm text-[#0F172A]">
                Rural Water Quality Monitoring
              </h4>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-stone-400 block text-[10px] font-mono uppercase">Purpose</span>
                  <span className="text-stone-700 font-medium">Sensor prototype, Field deployment, Testing</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] font-mono uppercase">Stage & Impact</span>
                  <span className="text-stone-700 font-medium">Prototype • 18,000 residents</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-stone-400 italic">
              Note: CSR grants are disbursed according to milestone verification by State Department nodal officers.
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedContribution('Funding');
              const el = document.getElementById('matched-opportunities');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full py-2.5 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-bold shadow-2xs transition-colors cursor-pointer text-center"
          >
            Explore Funding Opportunities →
          </button>
        </section>

        {/* MENTORSHIP NETWORK */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="pb-3 border-b border-stone-100">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-700">
                KNOWLEDGE EXCHANGE
              </span>
              <h2 className="text-xl font-bold text-[#0F172A] font-heading mt-0.5">
                Mentorship Network
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Areas of corporate engineering and domain expertise urgently needed by project labs.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {mentorshipAreas.map((m) => (
                <div key={m.area} className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs">
                  <div className="font-bold text-[#0F172A] truncate" title={m.area}>{m.area}</div>
                  <div className="text-[10px] text-stone-500 mt-1 flex justify-between">
                    <span>Needs: <strong>{m.projects}</strong></span>
                    <span>Active: <strong className="text-[#065F46]">{m.activeMentorships}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedContribution('Mentorship');
              const el = document.getElementById('matched-opportunities');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full py-2.5 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-bold shadow-2xs transition-colors cursor-pointer text-center"
          >
            Join Mentorship Network →
          </button>
        </section>

      </div>

      {/* ========================================================================= */}
      {/* 11. TECHNOLOGY MARKETPLACE */}
      {/* ========================================================================= */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-6">
        <div className="pb-3 border-b border-stone-100">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0F172A]">
            TECH INFRASTRUCTURE EXCHANGE
          </span>
          <h2 className="text-xl font-bold text-[#0F172A] font-heading mt-0.5">
            Technology Needs
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Real hardware, API, and algorithmic requirements aggregated across 24 district challenge solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {technologyNeedsList.map((item) => (
            <div key={item.tech} className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0F172A]">{item.tech}</span>
                <span className="text-[10px] font-mono font-bold text-[#C2410C] bg-orange-50 px-1.5 py-0.5 rounded border border-orange-200">
                  {item.projectsCount} projects
                </span>
              </div>
              <div className="text-[11px] text-stone-500">
                Region: <strong className="text-stone-700">{item.district}</strong>
              </div>
              <div className="text-[11px] text-stone-600">
                Impact: {item.impact}
              </div>
              <button
                onClick={() => {
                  setSelectedTechnology(item.tech);
                  const el = document.getElementById('matched-opportunities');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-[11px] font-bold text-[#0F172A] hover:underline cursor-pointer pt-1 block"
              >
                View matching projects →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12. PILOT DEPLOYMENT & COMMERCIALIZATION (READY TO SCALE) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* PILOT OPPORTUNITIES */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-5">
          <div className="pb-3 border-b border-stone-100">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C2410C]">
              FIELD DEPLOYMENT SITES
            </span>
            <h2 className="text-xl font-bold text-[#0F172A] font-heading mt-0.5">
              Pilot Opportunities
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Prototypes ready for immediate trial site testing in municipality and panchayat jurisdictions.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900">Smart Waste Segregation System</span>
              <span className="text-[10px] font-mono font-bold text-[#065F46] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Prototype Ready
              </span>
            </div>

            <div className="text-xs text-stone-600">
              Location: <strong>Dhanbad Municipal Corporation</strong>
            </div>

            <div className="space-y-1 text-xs">
              <span className="text-[10px] font-mono uppercase text-stone-400 font-bold block">Looking For:</span>
              <div className="flex flex-wrap gap-1.5 text-[11px]">
                <span className="px-2 py-0.5 rounded bg-stone-200 text-stone-800">Municipal Partner</span>
                <span className="px-2 py-0.5 rounded bg-stone-200 text-stone-800">Testing Site</span>
                <span className="px-2 py-0.5 rounded bg-stone-200 text-stone-800">Deployment Support</span>
              </div>
            </div>

            <button
              onClick={() => {
                const item = allProjectOpportunities.find(p => p.id === 'ind-waste-dhanbad');
                if (item) handleOpenCollaborate(item);
              }}
              className="w-full mt-2 py-2 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold cursor-pointer"
            >
              Support Pilot
            </button>
          </div>
        </section>

        {/* READY TO SCALE (COMMERCIALIZATION) */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-5">
          <div className="pb-3 border-b border-stone-100">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#065F46]">
              SPIN-OFF & LICENSING
            </span>
            <h2 className="text-xl font-bold text-[#0F172A] font-heading mt-0.5">
              Ready to Scale
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Validated innovations approaching market distribution and corporate licensing.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900">Solar-Powered Cold Storage for Rural Farmers</span>
              <span className="text-[10px] font-mono font-bold text-[#C2410C] bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                Pilot Validation
              </span>
            </div>

            <div className="text-xs text-stone-600">
              Potential Market: <strong>Jharkhand agricultural cooperatives</strong>
            </div>

            <div className="space-y-1 text-xs">
              <span className="text-[10px] font-mono uppercase text-stone-400 font-bold block">Needs:</span>
              <div className="flex flex-wrap gap-1.5 text-[11px]">
                <span className="px-2 py-0.5 rounded bg-stone-200 text-stone-800">Distribution</span>
                <span className="px-2 py-0.5 rounded bg-stone-200 text-stone-800">Manufacturing</span>
                <span className="px-2 py-0.5 rounded bg-stone-200 text-stone-800">Market Access</span>
              </div>
            </div>

            <button
              onClick={() => {
                const item = allProjectOpportunities.find(p => p.id === 'ind-cold-storage');
                if (item) handleOpenCollaborate(item);
              }}
              className="w-full mt-2 py-2 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold cursor-pointer"
            >
              Explore Commercialization
            </button>
          </div>
        </section>

      </div>

      {/* ========================================================================= */}
      {/* 13. INDUSTRY PROFILE & IMPACT CREATED */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Active Industry Profile */}
        <section className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400">
                ORGANIZATION PREFERENCES
              </span>
              <h3 className="text-lg font-bold text-[#0F172A] font-heading mt-0.5">
                Industry Profile
              </h3>
            </div>
            <button
              onClick={() => setIsRegisterModalOpen(true)}
              className="text-xs font-bold text-[#C2410C] hover:underline cursor-pointer"
            >
              Edit Profile
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200">
              <div>
                <span className="font-extrabold text-sm text-[#0F172A] block">{activeProfile.name}</span>
                <span className="text-stone-500">{activeProfile.type}</span>
              </div>
              <span className="px-2 py-1 rounded text-[10px] font-mono font-bold bg-emerald-50 text-[#065F46] border border-emerald-200">
                AI Profile Active
              </span>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-stone-400 block mb-1">
                Expertise
              </span>
              <div className="flex flex-wrap gap-1">
                {activeProfile.expertise.map(e => (
                  <span key={e} className="px-2 py-0.5 rounded bg-stone-100 text-stone-800 text-[11px]">
                    {e}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-stone-400 block mb-1">
                Capabilities
              </span>
              <div className="flex flex-wrap gap-1">
                {activeProfile.capabilities.map(c => (
                  <span key={c} className="px-2 py-0.5 rounded bg-stone-100 text-stone-800 text-[11px]">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-stone-400 block">Preferred Domains</span>
                <span className="text-stone-700 font-semibold">{activeProfile.preferredDomains.join(', ')}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-stone-400 block">Preferred Districts</span>
                <span className="text-stone-700 font-semibold">{activeProfile.preferredDistricts.join(', ')}</span>
              </div>
            </div>

            <p className="text-[11px] text-stone-400 italic pt-1">
              This profile parameters directly calibrate the SAMADHAN AI match scores across all listed innovation calls.
            </p>
          </div>
        </section>

        {/* Impact Created By Industry */}
        <section className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#065F46]">
                AGGREGATE OUTCOMES
              </span>
              <h3 className="text-lg font-bold text-[#0F172A] font-heading mt-0.5">
                Industry Impact
              </h3>
            </div>
            <span className="text-[11px] font-mono text-stone-400">
              *Verified Sector Data
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
              <div className="text-2xl font-extrabold text-[#065F46] font-heading">42</div>
              <div className="text-[11px] font-semibold text-stone-600 mt-0.5">Projects Funded</div>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
              <div className="text-2xl font-extrabold text-[#0F172A] font-heading">74</div>
              <div className="text-[11px] font-semibold text-stone-600 mt-0.5">Mentorships</div>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
              <div className="text-2xl font-extrabold text-[#0F172A] font-heading">31</div>
              <div className="text-[11px] font-semibold text-stone-600 mt-0.5">Tech Contributions</div>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
              <div className="text-2xl font-extrabold text-[#C2410C] font-heading">24</div>
              <div className="text-[11px] font-semibold text-stone-600 mt-0.5">Pilot Deployments</div>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 col-span-2">
              <div className="text-2xl font-extrabold text-[#065F46] font-heading">68,000+</div>
              <div className="text-[11px] font-bold text-[#065F46] mt-0.5">Citizens Potentially Benefited</div>
            </div>
          </div>

          <p className="text-[11px] text-stone-400 leading-relaxed">
            Data reflects verified milestones authenticated jointly by participating university vice-chancellors and district collectors under the Jharkhand State Innovation Framework.
          </p>
        </section>

      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: COLLABORATION MODAL */}
      {/* ========================================================================= */}
      {collaborationProject && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-2xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-xl border border-stone-200 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between pb-3 border-b border-stone-100">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#C2410C] uppercase tracking-wider">
                  COLLABORATION PROPOSAL
                </span>
                <h3 className="text-xl font-extrabold text-[#0F172A] font-heading mt-0.5">
                  How would you like to contribute?
                </h3>
              </div>
              <button
                onClick={() => setCollaborationProject(null)}
                className="text-stone-400 hover:text-stone-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Target Project Brief */}
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-1">
              <div className="font-extrabold text-[#0F172A]">{collaborationProject.title}</div>
              <div className="text-stone-500">
                {collaborationProject.location} • Stage: <strong>{collaborationProject.currentStage}</strong>
              </div>
            </div>

            <form onSubmit={handleSubmitCollaboration} className="space-y-5 text-xs">
              
              {/* Checkboxes: 7 contribution options */}
              <div className="space-y-2">
                <label className="block text-stone-800 font-bold uppercase tracking-wider text-[10px] font-mono">
                  Select Contribution Modes
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    'Mentor',
                    'Fund',
                    'Provide Technology',
                    'Provide Hardware',
                    'Provide Testing Facility',
                    'Support Pilot Deployment',
                    'Commercialize Solution'
                  ].map((mode) => {
                    const isChecked = selectedContributionTypes.includes(mode);
                    return (
                      <label
                        key={mode}
                        className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-all ${
                          isChecked 
                            ? 'bg-[#0F172A] text-white border-[#0F172A]' 
                            : 'bg-stone-50 text-stone-700 border-stone-300 hover:bg-stone-100'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleContributionType(mode)}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 rounded flex items-center justify-center border ${isChecked ? 'bg-white text-[#0F172A] border-white' : 'border-stone-400'}`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="font-semibold text-xs">{mode}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Organization & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-bold mb-1">Organization Name</label>
                  <input
                    type="text"
                    required
                    value={collabOrg}
                    onChange={(e) => setCollabOrg(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">Contact Person</label>
                  <input
                    type="text"
                    required
                    value={collabContact}
                    onChange={(e) => setCollabContact(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-medium"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-stone-700 font-bold mb-1">Message to Academic & Field Team</label>
                <textarea
                  rows={2}
                  required
                  value={collabMessage}
                  onChange={(e) => setCollabMessage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-medium"
                />
              </div>

              {/* Optional Contribution Details */}
              <div>
                <label className="block text-stone-700 font-bold mb-1">Optional Contribution Details (Hardware specs, lab tools, hours)</label>
                <input
                  type="text"
                  value={collabDetails}
                  onChange={(e) => setCollabDetails(e.target.value)}
                  placeholder="e.g., 20 IP67 solar enclosure units, 50 hours technical mentorship"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-medium"
                />
              </div>

              {/* Estimated Contribution Value */}
              <div>
                <label className="block text-stone-700 font-bold mb-1">Estimated Contribution Value (INR ₹)</label>
                <input
                  type="number"
                  step="50000"
                  value={collabEstimatedValue}
                  onChange={(e) => setCollabEstimatedValue(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-medium"
                />
                <span className="text-[11px] text-stone-400 mt-1 block">
                  Equivalent to ₹{(Number(collabEstimatedValue) / 100000).toFixed(1)} Lakhs in grant, tooling or in-kind support
                </span>
              </div>

              {/* Modal Buttons */}
              <div className="pt-3 flex justify-end gap-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setCollaborationProject(null)}
                  className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-bold hover:bg-stone-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold cursor-pointer shadow-2xs flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Submit Collaboration Request</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: MATCH EXPLANATION MODAL */}
      {/* ========================================================================= */}
      {matchBreakdownProject && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-2xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 space-y-5 shadow-xl border border-stone-200">
            
            <div className="flex items-start justify-between pb-3 border-b border-stone-100">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#065F46] uppercase tracking-wider">
                  MATCH EXPLANATION
                </span>
                <h3 className="text-lg font-bold text-[#0F172A] font-heading mt-0.5">
                  Why this matches your organization
                </h3>
              </div>
              <button
                onClick={() => setMatchBreakdownProject(null)}
                className="text-stone-400 hover:text-stone-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs">
              <strong className="text-stone-900">{matchBreakdownProject.title}</strong>
              <div className="text-stone-500 mt-0.5">{matchBreakdownProject.location}</div>
            </div>

            {/* Score Breakdown Bars */}
            <div className="space-y-3 text-xs">
              
              <div className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span className="text-stone-700">Technology expertise</span>
                  <span className="text-[#0F172A] font-mono font-bold">{matchBreakdownProject.breakdown.techExpertise}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                  <div className="h-full bg-[#0F172A]" style={{ width: `${matchBreakdownProject.breakdown.techExpertise * 2.5}%` }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span className="text-stone-700">Industry capability</span>
                  <span className="text-[#0F172A] font-mono font-bold">{matchBreakdownProject.breakdown.industryCapability}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                  <div className="h-full bg-[#0F172A]" style={{ width: `${matchBreakdownProject.breakdown.industryCapability * 4}%` }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span className="text-stone-700">Infrastructure</span>
                  <span className="text-[#0F172A] font-mono font-bold">{matchBreakdownProject.breakdown.infrastructure}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                  <div className="h-full bg-[#0F172A]" style={{ width: `${matchBreakdownProject.breakdown.infrastructure * 6.6}%` }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span className="text-stone-700">Previous projects</span>
                  <span className="text-[#0F172A] font-mono font-bold">{matchBreakdownProject.breakdown.previousProjects}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                  <div className="h-full bg-[#0F172A]" style={{ width: `${matchBreakdownProject.breakdown.previousProjects * 10}%` }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span className="text-stone-700">Geographic presence</span>
                  <span className="text-[#0F172A] font-mono font-bold">{matchBreakdownProject.breakdown.geographicPresence}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                  <div className="h-full bg-[#0F172A]" style={{ width: `${matchBreakdownProject.breakdown.geographicPresence * 10}%` }}></div>
                </div>
              </div>

              {/* Total Row */}
              <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
                <span className="font-extrabold text-sm text-[#0F172A]">Total AI Match:</span>
                <span className="text-lg font-extrabold text-[#065F46] font-mono">
                  {matchBreakdownProject.matchScore}% MATCH
                </span>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
              <span className="font-bold block mb-0.5">● AI-Generated Recommendation</span>
              This score is dynamically computed by the SAMADHAN AI matchmaking algorithm based on your declared organization profile, technology competencies, and past civic contributions. It is an advisory recommendation and not a scientifically validated certification.
            </div>

            <button
              onClick={() => setMatchBreakdownProject(null)}
              className="w-full py-2.5 rounded-xl bg-[#0F172A] text-white text-xs font-bold cursor-pointer"
            >
              Close Match Explanation
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: REGISTER AS INDUSTRY PARTNER MODAL */}
      {/* ========================================================================= */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-2xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-xl border border-stone-200">
            
            <div className="flex items-start justify-between pb-3 border-b border-stone-100">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#065F46] uppercase tracking-wider">
                  ALLIANCE ONBOARDING
                </span>
                <h3 className="text-xl font-bold text-[#0F172A] font-heading mt-0.5">
                  Register as Industry Partner
                </h3>
              </div>
              <button
                onClick={() => setIsRegisterModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRegisterPartner} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-700 font-bold mb-1">Company / Organization Name</label>
                <input
                  type="text"
                  required
                  value={regOrgName}
                  onChange={(e) => setRegOrgName(e.target.value)}
                  placeholder="e.g. Tata Steel CSR / AgroTech Labs"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Organization Category</label>
                <select
                  value={regOrgType}
                  onChange={(e) => setRegOrgType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-semibold"
                >
                  <option value="Enterprise / Large Corporate">Enterprise / Large Corporate</option>
                  <option value="Startup">Startup</option>
                  <option value="MSME">MSME</option>
                  <option value="CSR Foundation">CSR Foundation</option>
                  <option value="Research Laboratory">Research Laboratory</option>
                  <option value="Technology Company">Technology Company</option>
                  <option value="Innovation Hub">Innovation Hub</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Core Expertise (comma-separated)</label>
                <input
                  type="text"
                  value={regExpertise}
                  onChange={(e) => setRegExpertise(e.target.value)}
                  placeholder="e.g. IoT, Computer Vision, Water Chemistry"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-bold mb-1">Preferred Domains</label>
                  <input
                    type="text"
                    value={regPreferredDomains}
                    onChange={(e) => setRegPreferredDomains(e.target.value)}
                    placeholder="e.g. Agriculture, Water"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-bold mb-1">Preferred Districts</label>
                  <input
                    type="text"
                    value={regDistricts}
                    onChange={(e) => setRegDistricts(e.target.value)}
                    placeholder="e.g. Ranchi, Dumka"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-bold mb-1">Contact Person Name</label>
                  <input
                    type="text"
                    value={regContactName}
                    onChange={(e) => setRegContactName(e.target.value)}
                    placeholder="e.g. Priya Das (Head of CSR)"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-bold mb-1">Official Email</label>
                  <input
                    type="email"
                    value={regContactEmail}
                    onChange={(e) => setRegContactEmail(e.target.value)}
                    placeholder="p.das@company.com"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-medium"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsRegisterModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 text-xs font-bold hover:bg-stone-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold cursor-pointer"
                >
                  Save & Calibrate Matches
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
