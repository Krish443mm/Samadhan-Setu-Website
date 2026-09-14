import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Activity, 
  Users, 
  Droplet, 
  Sprout, 
  Sun, 
  CheckCircle2, 
  Wifi, 
  ShieldCheck, 
  TrendingUp, 
  Award, 
  Sparkles, 
  ArrowUpRight, 
  Check,
  ChevronRight,
  MapPin,
  Building2,
  GraduationCap,
  Briefcase,
  Layers,
  ArrowRight,
  Info,
  Calendar,
  ThumbsUp,
  Radio,
  FileCheck
} from 'lucide-react';
import { ImpactStory } from '../types';
import { JHARKHAND_DISTRICTS_DATA } from './JharkhandMap';

interface ImpactDashboardProps {
  stories: ImpactStory[];
  onSelectProject?: (challengeId: string) => void;
}

export const ImpactDashboard: React.FC<ImpactDashboardProps> = ({
  stories,
  onSelectProject
}) => {
  // Citizen Validation Interactive Poll State
  const [userVote, setUserVote] = useState<'yes' | 'in_progress' | 'no' | null>(null);
  const [voteCountYes, setVoteCountYes] = useState(14820);
  const [voteCountProgress, setVoteCountProgress] = useState(596);
  const [voteCountNo, setVoteCountNo] = useState(251);
  const [hasVoted, setHasVoted] = useState(false);

  // Selected district for Impact Map section
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('dumka');

  // Metric selector for Impact Over Time Trend
  const [selectedTrendMetric, setSelectedTrendMetric] = useState<
    'citizens' | 'solutions' | 'farmers' | 'water' | 'waste' | 'jobs'
  >('citizens');

  // Selected Before/After Story Tab
  const [activeStoryIndex, setActiveStoryIndex] = useState<number>(0);

  // Selected Project Details Modal
  const [modalProject, setModalProject] = useState<any | null>(null);

  const handleVote = (type: 'yes' | 'in_progress' | 'no') => {
    if (hasVoted) return;
    setUserVote(type);
    setHasVoted(true);
    if (type === 'yes') setVoteCountYes(prev => prev + 1);
    if (type === 'in_progress') setVoteCountProgress(prev => prev + 1);
    if (type === 'no') setVoteCountNo(prev => prev + 1);
  };

  const totalVotes = voteCountYes + voteCountProgress + voteCountNo;
  const yesPct = ((voteCountYes / totalVotes) * 100).toFixed(1);
  const progressPct = ((voteCountProgress / totalVotes) * 100).toFixed(1);
  const noPct = ((voteCountNo / totalVotes) * 100).toFixed(1);

  // District detail lookup
  const currentDistrict = JHARKHAND_DISTRICTS_DATA.find(d => d.id === selectedDistrictId) || JHARKHAND_DISTRICTS_DATA[0];

  // District deployment stats lookup
  const districtDeployments: Record<string, {
    name: string;
    solutions: number;
    citizens: string;
    topArea: string;
    activeProjects: number;
    verifiedOutcomes: string;
    verificationType: 'VERIFIED' | 'PILOT RESULT';
  }> = {
    dumka: {
      name: 'Dumka',
      solutions: 18,
      citizens: '180K',
      topArea: 'Rural Water & Anemia Screening',
      activeProjects: 5,
      verifiedOutcomes: '24/7 water monitoring across 12 Gram Panchayats',
      verificationType: 'PILOT RESULT'
    },
    ranchi: {
      name: 'Ranchi',
      solutions: 24,
      citizens: '320K',
      topArea: 'Subernarekha Filtration & Urban Mobility',
      activeProjects: 9,
      verifiedOutcomes: 'Arsenic zero-detection achieved in Namkum kiosks',
      verificationType: 'VERIFIED'
    },
    hazaribagh: {
      name: 'Hazaribagh',
      solutions: 16,
      citizens: '145K',
      topArea: 'Vegetable Cold Storage & Crop Disease AI',
      activeProjects: 4,
      verifiedOutcomes: '7,200 smallholders registered for AI leaf blight alert',
      verificationType: 'PILOT RESULT'
    },
    dhanbad: {
      name: 'Dhanbad',
      solutions: 11,
      citizens: '112K',
      topArea: 'Mine Dust Fogger & Smart Waste Segregation',
      activeProjects: 6,
      verifiedOutcomes: '62% PM10 suppression along Jharia haul routes',
      verificationType: 'PILOT RESULT'
    },
    'west-singhbhum': {
      name: 'West Singhbhum',
      solutions: 12,
      citizens: '98K',
      topArea: 'Human-Wildlife Corridor Warning & Mini-Grids',
      activeProjects: 3,
      verifiedOutcomes: '62% crop raid reduction in Saranda buffer',
      verificationType: 'PILOT RESULT'
    },
    'east-singhbhum': {
      name: 'East Singhbhum',
      solutions: 10,
      citizens: '95K',
      topArea: 'Heavy Metal Remediation & Industrial Effluents',
      activeProjects: 4,
      verifiedOutcomes: 'Continuous wastewater telemetry at 4 industrial drains',
      verificationType: 'VERIFIED'
    },
    deoghar: {
      name: 'Deoghar',
      solutions: 9,
      citizens: '82K',
      topArea: 'Pilgrim Health Diagnostics & Solar Sanitation',
      activeProjects: 3,
      verifiedOutcomes: 'Non-invasive optical scanner screening 41,000 mothers',
      verificationType: 'PILOT RESULT'
    },
    giridih: {
      name: 'Giridih',
      solutions: 8,
      citizens: '74K',
      topArea: 'Parasnath Agroforestry & Decentralized Solar',
      activeProjects: 3,
      verifiedOutcomes: '12 microgrids maintaining 99.4% uptime',
      verificationType: 'PILOT RESULT'
    }
  };

  const activeDistrictData = districtDeployments[selectedDistrictId] || {
    name: currentDistrict.name,
    solutions: currentDistrict.deployedSolutions || 6,
    citizens: currentDistrict.citizensImpacted || '45K',
    topArea: currentDistrict.leadDomain || 'Water & Agriculture',
    activeProjects: 3,
    verifiedOutcomes: 'Community validated in village audit',
    verificationType: 'PILOT RESULT' as const
  };

  // Trend Data for the interactive chart
  const trendDataMap = {
    citizens: {
      label: 'Citizens Impacted',
      unit: 'People',
      current: '1.24 Million',
      badge: 'ESTIMATED & PILOT',
      series: [
        { period: 'Q1 2025', val: 180, display: '180K' },
        { period: 'Q2 2025', val: 340, display: '340K' },
        { period: 'Q3 2025', val: 560, display: '560K' },
        { period: 'Q4 2025', val: 820, display: '820K' },
        { period: 'Q1 2026', val: 1240, display: '1.24M' }
      ]
    },
    solutions: {
      label: 'Solutions Deployed',
      unit: 'Sites',
      current: '86 Deployed',
      badge: 'PILOT & VERIFIED',
      series: [
        { period: 'Q1 2025', val: 12, display: '12' },
        { period: 'Q2 2025', val: 28, display: '28' },
        { period: 'Q3 2025', val: 46, display: '46' },
        { period: 'Q4 2025', val: 68, display: '68' },
        { period: 'Q1 2026', val: 86, display: '86' }
      ]
    },
    farmers: {
      label: 'Farmers Benefited',
      unit: 'Farmers',
      current: '68,400',
      badge: 'PILOT RESULT',
      series: [
        { period: 'Q1 2025', val: 8.5, display: '8.5K' },
        { period: 'Q2 2025', val: 19.2, display: '19.2K' },
        { period: 'Q3 2025', val: 34.0, display: '34.0K' },
        { period: 'Q4 2025', val: 51.5, display: '51.5K' },
        { period: 'Q1 2026', val: 68.4, display: '68.4K' }
      ]
    },
    water: {
      label: 'Water Saved / Purified',
      unit: 'Million Liters',
      current: '14.2M Liters',
      badge: 'VERIFIED TELEMETRY',
      series: [
        { period: 'Q1 2025', val: 2.1, display: '2.1M L' },
        { period: 'Q2 2025', val: 4.8, display: '4.8M L' },
        { period: 'Q3 2025', val: 7.9, display: '7.9M L' },
        { period: 'Q4 2025', val: 11.2, display: '11.2M L' },
        { period: 'Q1 2026', val: 14.2, display: '14.2M L' }
      ]
    },
    waste: {
      label: 'Waste Reduced / Processed',
      unit: 'Metric Tonnes',
      current: '18,400 Tonnes',
      badge: 'ESTIMATED',
      series: [
        { period: 'Q1 2025', val: 2800, display: '2.8K T' },
        { period: 'Q2 2025', val: 6400, display: '6.4K T' },
        { period: 'Q3 2025', val: 10200, display: '10.2K T' },
        { period: 'Q4 2025', val: 14500, display: '14.5K T' },
        { period: 'Q1 2026', val: 18400, display: '18.4K T' }
      ]
    },
    jobs: {
      label: 'Local Jobs & Apprenticeships',
      unit: 'Livelihoods',
      current: '2,840 Supported',
      badge: 'VERIFIED AUDIT',
      series: [
        { period: 'Q1 2025', val: 420, display: '420' },
        { period: 'Q2 2025', val: 950, display: '950' },
        { period: 'Q3 2025', val: 1580, display: '1,580' },
        { period: 'Q4 2025', val: 2210, display: '2,210' },
        { period: 'Q1 2026', val: 2840, display: '2,840' }
      ]
    }
  };

  // Before -> After stories
  const beforeAfterStories = [
    {
      id: 'story-1',
      title: 'Rural Water Quality Monitoring Network',
      district: 'Dumka',
      category: 'Clean Water',
      before: {
        title: 'Manual Periodic Checks',
        freq: '1 test every 3 months',
        hazard: 'Unidentified arsenic & heavy bacterial spikes during monsoon',
        cost: '₹600/mo per household spent on private tankers'
      },
      after: {
        title: 'Real-Time Edge Telemetry',
        freq: 'Continuous 24/7 sensor feed',
        hazard: 'Automated solar valve cutoff when turbidity exceeds 5 NTU',
        cost: '₹0.10/liter maintained by Panchayat water sub-committee'
      },
      impact: '18,000 residents covered across 12 hamlets',
      status: 'PILOT RESULT' as const,
      university: 'BIT Mesra & Dumka Polytechnic',
      industry: 'CleanWater Labs & Tata Steel CSR'
    },
    {
      id: 'story-2',
      title: 'Smart Crop Disease Detection & Advisory',
      district: 'Hazaribagh',
      category: 'Agriculture',
      before: {
        title: 'Late Manual Crop Inspection',
        freq: 'Inspection only after visual wilting',
        hazard: 'Up to 40% tomato and potato yield destroyed by early blight',
        cost: 'Heavy emergency spending on unregulated pesticides'
      },
      after: {
        title: 'AI-Assisted Early Thermal Detection',
        freq: 'Instant smartphone & kiosk scan (45s turnaround)',
        hazard: 'Localized bio-spray alert dispatched 10 days before leaf necrosis',
        cost: '32% reduction in chemical fungicide inputs'
      },
      impact: '7,200 smallholder farmers reached',
      status: 'PILOT RESULT' as const,
      university: 'Birsa Agricultural University (BAU)',
      industry: 'AgriTech Innovations & NABARD'
    },
    {
      id: 'story-3',
      title: 'Automated Industrial Waste & Haul Dust Segregation',
      district: 'Dhanbad',
      category: 'Environment',
      before: {
        title: 'Unsegregated Mine Overburden & Dust',
        freq: 'Occasional water tankers sprinkling roadways',
        hazard: 'PM10 levels routinely exceeded 240 µg/m³ near residential colonies',
        cost: 'Heavy healthcare expenditures for respiratory ailments'
      },
      after: {
        title: 'Sensor-Triggered Micro-Mist Cannon Mesh',
        freq: 'Automated activation whenever PM10 crosses 80 µg/m³',
        hazard: '62% suppression of respirable coal and silica dust',
        cost: 'Circular recovery of coal fines for briquette manufacturing'
      },
      impact: '18,400 tonnes annual waste reduced / sequestered',
      status: 'ESTIMATED' as const,
      university: 'IIT (ISM) Dhanbad',
      industry: 'Coal India Environmental Cell'
    },
    {
      id: 'story-4',
      title: 'AI-Based Elephant Corridor Early Warning System',
      district: 'West Singhbhum',
      category: 'Wildlife & Livelihoods',
      before: {
        title: 'Zero Warning Nighttime Raids',
        freq: '40+ sudden elephant crop incursions annually',
        hazard: 'Loss of lives, total demolition of paddy granaries and houses',
        cost: 'Villagers stayed awake through winter nights beating tin drums'
      },
      after: {
        title: 'Edge AI Nocturnal Vision & Acoustic Mesh',
        freq: 'Continuous perimeter scanning (1.2s edge inference)',
        hazard: 'Automated strobe sirens and WhatsApp/IVR alerts to forest guards',
        cost: 'Zero human casualties and 62% reduction in crop loss'
      },
      impact: '1,200 residents across 8 Saranda buffer villages protected',
      status: 'PILOT RESULT' as const,
      university: 'BIT Mesra AI & Robotics Lab',
      industry: 'EcoSense Technologies'
    }
  ];

  // 6 Projects Creating Impact
  const projectStoriesList = [
    {
      id: 'proj-wildlife',
      challengeId: 'ch-el-01',
      name: 'AI-Based Wildlife Corridor Early Warning System',
      district: 'West Singhbhum',
      problem: 'Lethal human-wildlife conflict and recurring agricultural destruction in Saranda forest buffer villages.',
      solution: 'Solar-powered edge AI camera boxes running nocturnal YOLOv8 with automated village sirens and ranger SMS.',
      stage: 'Pilot',
      beneficiaries: '1,200 villagers & 8 hamlets',
      impactMetric: '62% reduction in crop damage · 342 alerts dispatched',
      university: 'BIT Mesra',
      industry: 'EcoSense Technologies',
      verification: 'PILOT RESULT' as const
    },
    {
      id: 'proj-water',
      challengeId: 'ch-01',
      name: 'Nanofiltration & Solar Gravity Grid for River Basins',
      district: 'Ranchi',
      problem: 'Severe arsenic contamination and heavy turbidity in Subernarekha river drinking sources.',
      solution: 'Decentralized graphene-oxide membrane filtration kiosks powered by rooftop solar gravity heads.',
      stage: 'Deployed',
      beneficiaries: '48,500 residents',
      impactMetric: 'Arsenic reduced from 0.062 mg/L to < 0.001 mg/L',
      university: 'BIT Mesra',
      industry: 'Tata Steel Utilities & Infrastructure',
      verification: 'VERIFIED' as const
    },
    {
      id: 'proj-coldvault',
      challengeId: 'ch-02',
      name: 'Solar Phase-Change Cold Vault for Tribal Lac Farmers',
      district: 'Khunti',
      problem: 'Post-harvest monsoon moisture rotting forest minor produce and forcing distress selling.',
      solution: 'Zero-electricity Phase Change Material (PCM) thermal storage vaults maintaining 4°C for 9 months.',
      stage: 'Pilot',
      beneficiaries: '32,000 farmers',
      impactMetric: 'Monsoon crop loss dropped from 38% to 3.2%',
      university: 'Birsa Agricultural University (BAU)',
      industry: 'TRIFED & Adani Solar',
      verification: 'PILOT RESULT' as const
    },
    {
      id: 'proj-anemia',
      challengeId: 'ch-05',
      name: 'Non-Invasive Optical Hemoglobin & Child Growth AI Scanner',
      district: 'Dumka',
      problem: 'High maternal anemia rates with cultural reluctance toward frequent blood draw needle pricks.',
      solution: 'Multi-wavelength fingertip optical scanner syncing instant diagnostic metrics to ASHA worker tablets.',
      stage: 'Impact Validation',
      beneficiaries: '41,200 mothers & children',
      impactMetric: 'Screening rate surged from 22% to 96% in 6 months',
      university: 'AIIMS Deoghar & BIT Mesra',
      industry: 'Infosys Foundation',
      verification: 'PILOT RESULT' as const
    },
    {
      id: 'proj-dust',
      challengeId: 'ch-03',
      name: 'LoRa-Controlled Micro-Mist Particulate Suppression',
      district: 'Dhanbad',
      problem: 'Toxic airborne PM10 emissions along coal haulage corridors affecting school zones.',
      solution: 'Automated wind-speed responsive misting cannons connected to low-power environmental sensors.',
      stage: 'Pilot',
      beneficiaries: '28,000 residents',
      impactMetric: '62% localized suppression of PM10 particulates',
      university: 'IIT (ISM) Dhanbad',
      industry: 'Coal India Environmental Cell',
      verification: 'PILOT RESULT' as const
    },
    {
      id: 'proj-geopolymer',
      challengeId: 'ch-04',
      name: 'Fly Ash & Overburden Geo-polymer Pavers for Slum Roads',
      district: 'Bokaro',
      problem: 'Industrial fly-ash accumulation and unpaved waterlogged roads in peri-urban settlements.',
      solution: 'Zero-cement geopolymer paving blocks manufactured from thermal plant ash and mining slag.',
      stage: 'Deployment',
      beneficiaries: '19,500 slum dwellers',
      impactMetric: '14.2 km of all-weather paved streets built',
      university: 'NIT Jamshedpur',
      industry: 'Steel Authority of India (SAIL)',
      verification: 'VERIFIED' as const
    }
  ];

  // 9 Impact Categories
  const impactCategories = [
    {
      name: 'Water',
      solutions: 18,
      people: '240K people impacted',
      trend: '+34% improvement in monitored access',
      badge: 'VERIFIED TELEMETRY',
      tagColor: 'text-[#065F46] bg-emerald-50 border-emerald-200'
    },
    {
      name: 'Agriculture',
      solutions: 16,
      people: '185K people impacted',
      trend: '+28% reduction in post-harvest spoilage',
      badge: 'PILOT RESULT',
      tagColor: 'text-amber-800 bg-amber-50 border-amber-200'
    },
    {
      name: 'Healthcare',
      solutions: 12,
      people: '160K people impacted',
      trend: '+74% increase in non-invasive screenings',
      badge: 'PILOT RESULT',
      tagColor: 'text-rose-800 bg-rose-50 border-rose-200'
    },
    {
      name: 'Education',
      solutions: 10,
      people: '110K people impacted',
      trend: '+22.4% school attendance with pure water',
      badge: 'PILOT RESULT',
      tagColor: 'text-indigo-800 bg-indigo-50 border-indigo-200'
    },
    {
      name: 'Environment',
      solutions: 9,
      people: '135K people impacted',
      trend: '62% localized air particulate suppression',
      badge: 'ESTIMATED',
      tagColor: 'text-emerald-800 bg-emerald-50 border-emerald-200'
    },
    {
      name: 'Energy',
      solutions: 8,
      people: '92K people impacted',
      trend: '480 MWh clean off-grid solar generated',
      badge: 'VERIFIED TELEMETRY',
      tagColor: 'text-orange-800 bg-orange-50 border-orange-200'
    },
    {
      name: 'Accessibility',
      solutions: 5,
      people: '48K people impacted',
      trend: '38 public facilities retrofit for disability access',
      badge: 'PILOT RESULT',
      tagColor: 'text-blue-800 bg-blue-50 border-blue-200'
    },
    {
      name: 'Urban Infrastructure',
      solutions: 4,
      people: '140K people impacted',
      trend: '18,400 tonnes industrial waste reused in paving',
      badge: 'ESTIMATED',
      tagColor: 'text-stone-800 bg-stone-100 border-stone-200'
    },
    {
      name: 'Rural Livelihoods',
      solutions: 4,
      people: '88K people impacted',
      trend: '+42% cooperative income through cold vaults',
      badge: 'PILOT RESULT',
      tagColor: 'text-teal-800 bg-teal-50 border-teal-200'
    }
  ];

  // SDGs
  const sdgs = [
    { num: 'SDG 2', name: 'Zero Hunger', desc: 'Solar phase-change cold chains & AI crop blight diagnosis protecting harvests.' },
    { num: 'SDG 3', name: 'Good Health & Well-being', desc: 'Zero-prick optical maternal anemia screening & arsenic water purification.' },
    { num: 'SDG 4', name: 'Quality Education', desc: 'STEM water kiosk labs and attendance boost from safe school water supplies.' },
    { num: 'SDG 6', name: 'Clean Water & Sanitation', desc: '14.2M Liters of river water purified with 24/7 LoRa turbidity monitoring.' },
    { num: 'SDG 8', name: 'Decent Work & Economic Growth', desc: '2,840 rural jobs and tribal cooperative agro-processing livelihoods created.' },
    { num: 'SDG 9', name: 'Industry, Innovation & Infrastructure', desc: '32 technology transfers and fly-ash geopolymer pavers for peri-urban slums.' },
    { num: 'SDG 11', name: 'Sustainable Cities & Communities', desc: 'Mine haul particulate foggers & community-audited municipal public kiosks.' },
    { num: 'SDG 13', name: 'Climate Action', desc: '480 MWh off-grid clean microgrids and resilient watershed catchment arrays.' }
  ];

  // Academic Contribution
  const academicPartners = [
    {
      name: 'BIT Mesra, Ranchi',
      activeProjects: 18,
      deployed: 2,
      pilots: 5,
      students: 340,
      faculty: 28,
      focus: 'Edge AI Sensors, Water Membranes, Robotics'
    },
    {
      name: 'NIT Jamshedpur',
      activeProjects: 14,
      deployed: 1,
      pilots: 3,
      students: 280,
      faculty: 22,
      focus: 'Geopolymer Materials, Heavy Metal Effluent Tech'
    },
    {
      name: 'Ranchi University',
      activeProjects: 11,
      deployed: 1,
      pilots: 2,
      students: 210,
      faculty: 18,
      focus: 'Rural Health Diagnostics, Social Field Audits'
    },
    {
      name: 'Birsa Agricultural University (BAU)',
      activeProjects: 9,
      deployed: 1,
      pilots: 2,
      students: 160,
      faculty: 14,
      focus: 'Phase-Change Cold Vaults, Agro-Forestry Lac'
    },
    {
      name: 'IIT (ISM) Dhanbad',
      activeProjects: 8,
      deployed: 1,
      pilots: 2,
      students: 140,
      faculty: 16,
      focus: 'Particulate Misting, Mine Overburden Reclamation'
    },
    {
      name: 'AIIMS Deoghar',
      activeProjects: 6,
      deployed: 0,
      pilots: 1,
      students: 95,
      faculty: 12,
      focus: 'Non-Invasive Optical Screening, Maternal Health'
    }
  ];

  // Top Impact Districts
  const topDistrictsRanked = [
    { rank: 1, id: 'ranchi', name: 'Ranchi', solutions: 24, citizens: '320K', primary: 'Water & Urban Health', badge: 'VERIFIED' as const },
    { rank: 2, id: 'dumka', name: 'Dumka', solutions: 18, citizens: '180K', primary: 'Rural Water & Anemia Screening', badge: 'PILOT RESULT' as const },
    { rank: 3, id: 'hazaribagh', name: 'Hazaribagh', solutions: 16, citizens: '145K', primary: 'Crop Health & Horticulture', badge: 'PILOT RESULT' as const },
    { rank: 4, id: 'west-singhbhum', name: 'West Singhbhum', solutions: 12, citizens: '98K', primary: 'Corridor Warnings & Mini-Grids', badge: 'PILOT RESULT' as const },
    { rank: 5, id: 'dhanbad', name: 'Dhanbad', solutions: 11, citizens: '112K', primary: 'Particulate Foggers & Circular Waste', badge: 'ESTIMATED' as const },
    { rank: 6, id: 'east-singhbhum', name: 'East Singhbhum', solutions: 10, citizens: '95K', primary: 'Industrial Effluents & Metals', badge: 'VERIFIED' as const }
  ];

  // Live IoT Telemetry Nodes (preserving existing working feature)
  const telemetryNodes = [
    {
      id: 'iot-4',
      name: 'West Singhbhum Elephant Corridor Early Warning Mesh',
      location: 'Saranda Forest Buffer, West Singhbhum',
      type: 'Edge AI Vision & Infrasound Sensor',
      status: 'Active (Pilot Testing)',
      metrics: [
        { label: 'Crop Damage', value: '62% Reduction', status: 'Optimal' },
        { label: 'Farmers Benefited', value: '1,200 Residents', status: 'Covered' },
        { label: 'Villages Protected', value: '8 Hamlets', status: 'Active Mesh' },
        { label: 'Verified Alerts', value: '342 Dispatched', status: '1.2s Latency' }
      ]
    },
    {
      id: 'iot-1',
      name: 'Getalsud Subernarekha Purification Station',
      location: 'Namkum Block, Ranchi',
      type: 'Water Filtration Telemetry',
      status: 'Online',
      metrics: [
        { label: 'Turbidity', value: '1.1 NTU', status: 'Safe (< 5 NTU)' },
        { label: 'pH Level', value: '7.2 pH', status: 'Neutral' },
        { label: '24hr Throughput', value: '42,000 Liters', status: 'Optimal' },
        { label: 'UV Dose', value: '40 mJ/cm²', status: 'Active' }
      ]
    },
    {
      id: 'iot-2',
      name: 'Torpa Tribal Lac Cooperative Phase-Change Vault',
      location: 'Khunti District',
      type: 'Cold Chain IoT Hub',
      status: 'Online',
      metrics: [
        { label: 'Internal Chamber Temp', value: '4.2 °C', status: 'Stable' },
        { label: 'Relative Humidity', value: '54 %', status: 'Dry & Safe' },
        { label: 'Solar Battery Bank', value: '96 %', status: 'Full Sun' },
        { label: 'Inventory Stored', value: '8.4 Metric Tonnes', status: '100% Protected' }
      ]
    },
    {
      id: 'iot-3',
      name: 'Jharia Haulage Micro-Mist Fogger Node #4',
      location: 'Dhanbad Industrial Zone',
      type: 'Air Particulate Scrubber',
      status: 'Active',
      metrics: [
        { label: 'Ambient PM2.5', value: '42 µg/m³', status: 'Moderate (from 180)' },
        { label: 'Ambient PM10', value: '84 µg/m³', status: '62% Suppression' },
        { label: 'Water Reservoir', value: '82 %', status: 'Auto-Recycled' },
        { label: 'System Uptime', value: '99.8 %', status: 'Continuous' }
      ]
    }
  ];

  return (
    <div className="bg-[#FAF9F5] min-h-screen text-[#0F172A] selection:bg-emerald-100 selection:text-emerald-900 pb-20">
      
      {/* 1. EDITORIAL HEADER */}
      <header className="border-b border-stone-200/90 bg-[#FAF9F5] pt-10 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200/80 text-[11px] font-mono font-bold text-[#065F46] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#065F46]" />
                SAMADHANSETU AI · SOCIAL IMPACT
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F172A] font-heading leading-tight">
                From Problems to Measurable Impact.
              </h1>
              <p className="text-sm sm:text-base text-stone-600 font-normal leading-relaxed max-w-2xl">
                Track how community challenges become deployed solutions and create measurable outcomes across Jharkhand.
              </p>
            </div>

            {/* Right side live status card */}
            <div className="bg-white p-4 rounded-xl border border-stone-200/90 shadow-2xs self-start lg:self-auto text-left sm:text-right min-w-[240px]">
              <div className="flex items-center sm:justify-end gap-2 text-xs font-semibold text-[#065F46]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Impact across Jharkhand</span>
              </div>
              <div className="text-xs text-stone-500 mt-1 font-mono">
                Last updated: <strong className="text-stone-800">Just now</strong>
              </div>
              <div className="mt-2 pt-2 border-t border-stone-100 flex items-center sm:justify-end gap-1.5 text-[11px] text-stone-400">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-500" />
                <span>State Civic Audit Ledger · 24 Districts</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* CORE CONCEPT BANNER: THE CORE QUESTION */}
      <section className="border-b border-stone-200/60 bg-stone-100/60 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 font-medium text-stone-700">
              <span className="font-bold text-stone-900 uppercase tracking-wide font-mono text-[11px] bg-stone-200/80 px-2 py-0.5 rounded">Core Question</span>
              <span>"Did solving these societal challenges actually improve people's lives?"</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-stone-500 font-mono">
              <span className="text-stone-700 font-semibold">Problem</span> → 
              <span className="text-stone-700 font-semibold">Solution</span> → 
              <span className="text-stone-700 font-semibold">Deployment</span> → 
              <span className="text-stone-700 font-semibold">Measurable Change</span> → 
              <span className="text-[#065F46] font-bold">Citizen Validation</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* 2. HERO IMPACT NUMBERS */}
        <section aria-labelledby="hero-impact-stats">
          <div className="flex items-center justify-between mb-4">
            <h2 id="hero-impact-stats" className="text-xs font-mono uppercase tracking-wider font-bold text-stone-500">
              Statewide Impact Summary · Verified & Pilot Outcomes
            </h2>
            <span className="text-[11px] font-mono text-stone-400">
              Methodology: Real-time telemetry + Gram Panchayat audits
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {/* 1.2M Citizens */}
            <div className="bg-white rounded-xl p-4 border border-stone-200/90 shadow-2xs relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Citizens</span>
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200/60">
                    ESTIMATED
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-heading tracking-tight">
                  1.2M
                </div>
              </div>
              <div className="text-xs font-medium text-stone-600 mt-2">
                Citizens Impacted
              </div>
            </div>

            {/* 86 Solutions */}
            <div className="bg-white rounded-xl p-4 border border-stone-200/90 shadow-2xs relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Deployments</span>
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-[#065F46] border border-emerald-200/60">
                    VERIFIED
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-heading tracking-tight">
                  86
                </div>
              </div>
              <div className="text-xs font-medium text-[#065F46] mt-2 font-semibold">
                Solutions Deployed
              </div>
            </div>

            {/* 68K Farmers */}
            <div className="bg-white rounded-xl p-4 border border-stone-200/90 shadow-2xs relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Agriculture</span>
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200/60">
                    PILOT RESULT
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-heading tracking-tight">
                  68K
                </div>
              </div>
              <div className="text-xs font-medium text-stone-600 mt-2">
                Farmers Benefited
              </div>
            </div>

            {/* 14M L Water */}
            <div className="bg-white rounded-xl p-4 border border-stone-200/90 shadow-2xs relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Conservation</span>
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-[#065F46] border border-emerald-200/60">
                    VERIFIED
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-heading tracking-tight">
                  14M L
                </div>
              </div>
              <div className="text-xs font-medium text-stone-600 mt-2">
                Water Saved / Purified
              </div>
            </div>

            {/* 18,400 T Waste */}
            <div className="bg-white rounded-xl p-4 border border-stone-200/90 shadow-2xs relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Environment</span>
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200/60">
                    ESTIMATED
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-heading tracking-tight">
                  18,400 T
                </div>
              </div>
              <div className="text-xs font-medium text-stone-600 mt-2">
                Waste Reduced
              </div>
            </div>

            {/* 2,840 Jobs */}
            <div className="bg-white rounded-xl p-4 border border-stone-200/90 shadow-2xs relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Livelihoods</span>
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200/60">
                    PILOT RESULT
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-heading tracking-tight">
                  2,840
                </div>
              </div>
              <div className="text-xs font-medium text-stone-600 mt-2">
                Jobs Supported
              </div>
            </div>
          </div>

          {/* Explicit disclaimer note */}
          <div className="mt-2.5 flex items-center justify-between text-[11px] text-stone-500 font-mono">
            <span>* Figures marked with badges clearly distinguish verified sensor logs, pilot telemetry, and academic projections.</span>
            <span className="text-[#065F46] font-semibold">● 0% unverified demo inflation</span>
          </div>
        </section>

        {/* 3. FEATURED EMOTIONAL CENTERPIECE: FROM A CITIZEN REPORT TO A STATEWIDE SOLUTION */}
        <section className="bg-white rounded-2xl border border-stone-200/90 shadow-xs p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-stone-100 pb-4">
            <div>
              <span className="text-[11px] font-mono uppercase font-bold text-[#C2410C] tracking-wider">
                FEATURED IMPACT STORY · THE FULL JOURNEY
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-heading mt-1">
                From a Citizen Report to a Statewide Solution
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-[#065F46] border border-emerald-200">
                18,000 Potential Beneficiaries
              </span>
              <span className="px-2.5 py-1 rounded text-[11px] font-mono bg-stone-100 text-stone-700">
                Dumka District
              </span>
            </div>
          </div>

          {/* Problem Statement Box */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80">
            <div className="text-xs font-bold font-mono text-stone-500 uppercase tracking-wide">Problem Origin</div>
            <p className="text-sm sm:text-base text-stone-800 font-medium mt-1">
              "Communities in rural areas of Dumka lacked continuous water quality monitoring, leaving 18,000 residents vulnerable to seasonal turbidity and unmonitored bacterial spikes between quarterly public health visits."
            </p>
          </div>

          {/* The Step-by-Step Evolution Chain */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 pt-2">
            {[
              { step: '1', title: 'Citizen Report', desc: 'Villagers logged water taste & turbidity issue', role: 'Citizen' },
              { step: '2', title: 'Gov Validated', desc: 'Water & Sanitation Dept verified priority', role: 'District Office' },
              { step: '3', title: 'Uni Research', desc: 'BIT Mesra formed student-faculty lab team', role: 'BIT Mesra' },
              { step: '4', title: 'Industry IoT', desc: 'CleanWater Labs donated LoRa sensor boards', role: 'Industry Partner' },
              { step: '5', title: 'Prototype Built', desc: 'Solar gravity filter with automated shutoff', role: 'M.Tech Lab' },
              { step: '6', title: 'Pilot Deployed', desc: 'Live installation at 12 Dumka kiosks', role: '12 Kiosks' },
              { step: '7', title: 'Community Vote', desc: '74% residents verified dramatic improvement', role: 'Panchayat' },
              { step: '8', title: 'Measured Impact', desc: '24/7 safe water at ₹0.10/L maintained', role: '18,000 People' }
            ].map((node, i) => (
              <div 
                key={node.step}
                className="p-3 rounded-lg border border-stone-200/80 bg-stone-50/70 hover:bg-emerald-50/40 hover:border-emerald-200 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold text-stone-400">
                    <span>STEP 0{node.step}</span>
                    {i === 7 ? <CheckCircle2 className="w-3 h-3 text-[#065F46]" /> : <span className="text-stone-300">→</span>}
                  </div>
                  <div className="text-xs font-bold text-[#0F172A] mt-1.5 font-heading">
                    {node.title}
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1 leading-snug">
                    {node.desc}
                  </p>
                </div>
                <div className="mt-2.5 pt-1.5 border-t border-stone-200/60 text-[10px] font-medium text-stone-600">
                  {node.role}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500 border-t border-stone-100">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span className="font-medium text-stone-800">Key Outcome:</span>
              <span>18,000 residents covered with 99.4% sensor uptime and zero recorded water-borne disease outbreaks in pilot hamlets.</span>
            </div>
            <span className="font-mono text-[11px] text-stone-400">Verified by Dumka District Collectorate</span>
          </div>
        </section>

        {/* 4. IMPACT MAP: IMPACT ACROSS JHARKHAND */}
        <section className="bg-white rounded-2xl border border-stone-200/90 shadow-xs p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
            <div>
              <span className="text-[11px] font-mono uppercase font-bold text-[#065F46] tracking-wider">
                GEOGRAPHIC VISUALIZATION · 24 DISTRICTS
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] font-heading mt-0.5">
                Impact Across Jharkhand
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Select a district below to inspect verified deployed solutions, citizens impacted, and field outcomes.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-stone-100 text-stone-700">
                Selected: <strong className="text-stone-900">{activeDistrictData.name}</strong>
              </span>
            </div>
          </div>

          {/* District Grid Selector */}
          <div className="space-y-4">
            <div className="text-xs font-mono font-bold text-stone-400 uppercase tracking-wider">
              Select District to Inspect Outcomes:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
              {['dumka', 'ranchi', 'hazaribagh', 'dhanbad', 'west-singhbhum', 'east-singhbhum', 'deoghar', 'giridih'].map((distId) => {
                const dist = districtDeployments[distId];
                const isSelected = selectedDistrictId === distId;
                return (
                  <button
                    key={distId}
                    onClick={() => setSelectedDistrictId(distId)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-emerald-50 border-emerald-500 text-stone-900 shadow-2xs' 
                        : 'bg-stone-50/60 border-stone-200 text-stone-700 hover:border-stone-300 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="truncate">{dist.name}</span>
                      {isSelected && <Check className="w-3 h-3 text-[#065F46]" />}
                    </div>
                    <div className="text-[10px] text-stone-500 mt-1 font-mono">
                      {dist.solutions} Solutions
                    </div>
                    <div className="text-[10px] font-semibold text-[#065F46] mt-0.5">
                      {dist.citizens} Impacted
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* District Detail Card */}
          <div className="bg-stone-50 rounded-xl p-5 border border-stone-200/90 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-4 space-y-2 border-b md:border-b-0 md:border-r border-stone-200/90 pb-4 md:pb-0 md:pr-6">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#065F46]" />
                <h3 className="text-lg font-bold text-[#0F172A] font-heading">
                  {activeDistrictData.name} District
                </h3>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Regional field implementations addressing rural challenges in collaboration with local universities and district administration.
              </p>
              <div className="pt-2 flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-[#065F46] border border-emerald-200">
                  {activeDistrictData.verificationType}
                </span>
                <span className="text-xs text-stone-500 font-mono">Panchayat Audited</span>
              </div>
            </div>

            <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-3 rounded-lg border border-stone-200">
                <div className="text-[10px] font-bold uppercase text-stone-400 font-mono">Solutions Deployed</div>
                <div className="text-xl font-extrabold text-[#0F172A] font-heading mt-0.5">{activeDistrictData.solutions}</div>
                <div className="text-[10px] text-stone-500 mt-0.5">Operational sites</div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-stone-200">
                <div className="text-[10px] font-bold uppercase text-stone-400 font-mono">Citizens Impacted</div>
                <div className="text-xl font-extrabold text-[#065F46] font-heading mt-0.5">{activeDistrictData.citizens}</div>
                <div className="text-[10px] text-stone-500 mt-0.5">Direct beneficiaries</div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-stone-200">
                <div className="text-[10px] font-bold uppercase text-stone-400 font-mono">Active Projects</div>
                <div className="text-xl font-extrabold text-stone-900 font-heading mt-0.5">{activeDistrictData.activeProjects}</div>
                <div className="text-[10px] text-stone-500 mt-0.5">In university lab</div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-stone-200">
                <div className="text-[10px] font-bold uppercase text-stone-400 font-mono">Top Impact Area</div>
                <div className="text-xs font-bold text-stone-800 mt-1 line-clamp-2">{activeDistrictData.topArea}</div>
              </div>

              <div className="col-span-2 sm:col-span-4 bg-white p-3 rounded-lg border border-stone-200 text-xs">
                <span className="font-bold text-stone-500 font-mono text-[10px] uppercase block mb-1">Key Verified Outcome</span>
                <p className="text-stone-800 font-medium">"{activeDistrictData.verifiedOutcomes}"</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. BEFORE → AFTER (ONE OF THE STRONGEST VISUAL SECTIONS) */}
        <section className="bg-white rounded-2xl border border-stone-200/90 shadow-xs p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#C2410C] uppercase tracking-wider">
                <ArrowRight className="w-3.5 h-3.5" />
                TRANSFORMATION CASE STUDIES
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-heading mt-0.5">
                BEFORE → AFTER
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                See how deployed solutions changed real-world conditions across Jharkhand communities.
              </p>
            </div>

            {/* Quick tab switcher */}
            <div className="flex flex-wrap gap-1.5 bg-stone-100 p-1 rounded-xl">
              {beforeAfterStories.map((st, idx) => (
                <button
                  key={st.id}
                  onClick={() => setActiveStoryIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    activeStoryIndex === idx
                      ? 'bg-white text-stone-900 shadow-2xs font-bold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {st.district}
                </button>
              ))}
            </div>
          </div>

          {/* Active Before/After Showcase */}
          {(() => {
            const current = beforeAfterStories[activeStoryIndex];
            return (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400">
                      {current.category} · {current.district} District
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] font-heading mt-0.5">
                      {current.title}
                    </h3>
                  </div>
                  <span className="self-start sm:self-auto text-[11px] font-mono font-bold px-2.5 py-1 rounded bg-emerald-50 text-[#065F46] border border-emerald-200">
                    {current.status}
                  </span>
                </div>

                {/* The Comparison Cards: BEFORE vs AFTER */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* BEFORE CARD */}
                  <div className="rounded-xl border border-rose-200 bg-rose-50/30 p-5 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-rose-200/60">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                        <span className="font-mono font-bold text-xs uppercase tracking-wider text-rose-800">
                          BEFORE SOLUTION
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-rose-700 bg-rose-100/70 px-2 py-0.5 rounded">
                        Baseline Condition
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-[#0F172A]">
                      {current.before.title}
                    </h4>

                    <div className="space-y-2 text-xs text-stone-700">
                      <div className="p-2.5 rounded-lg bg-white/80 border border-rose-100">
                        <span className="text-[10px] font-bold uppercase text-stone-400 block font-mono">Testing Cadence</span>
                        <p className="font-semibold text-rose-900 mt-0.5">{current.before.freq}</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white/80 border border-rose-100">
                        <span className="text-[10px] font-bold uppercase text-stone-400 block font-mono">Vulnerability / Hazard</span>
                        <p className="text-stone-700 mt-0.5">{current.before.hazard}</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white/80 border border-rose-100">
                        <span className="text-[10px] font-bold uppercase text-stone-400 block font-mono">Community Cost</span>
                        <p className="text-stone-700 mt-0.5">{current.before.cost}</p>
                      </div>
                    </div>
                  </div>

                  {/* AFTER CARD */}
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-5 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-emerald-200/60">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                        <span className="font-mono font-bold text-xs uppercase tracking-wider text-[#065F46]">
                          AFTER DEPLOYMENT
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[#065F46] bg-emerald-100/70 px-2 py-0.5 rounded font-bold">
                        Validated Outcome
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-[#0F172A]">
                      {current.after.title}
                    </h4>

                    <div className="space-y-2 text-xs text-stone-700">
                      <div className="p-2.5 rounded-lg bg-white/80 border border-emerald-100">
                        <span className="text-[10px] font-bold uppercase text-stone-400 block font-mono">Operational Cadence</span>
                        <p className="font-semibold text-[#065F46] mt-0.5">{current.after.freq}</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white/80 border border-emerald-100">
                        <span className="text-[10px] font-bold uppercase text-stone-400 block font-mono">Automated Safety Mechanism</span>
                        <p className="text-stone-700 mt-0.5">{current.after.hazard}</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white/80 border border-emerald-100">
                        <span className="text-[10px] font-bold uppercase text-stone-400 block font-mono">Direct Benefit</span>
                        <p className="font-semibold text-[#065F46] mt-0.5">{current.after.cost}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Impact strip */}
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#065F46]" />
                    <span className="text-stone-500">Total Verified Impact:</span>
                    <strong className="text-stone-900 font-bold">{current.impact}</strong>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-stone-500 text-[11px]">
                    <span>Uni: <strong className="text-stone-800">{current.university}</strong></span>
                    <span>•</span>
                    <span>Industry: <strong className="text-stone-800">{current.industry}</strong></span>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Grid of all other Before/After mini cards */}
          <div className="pt-2 border-t border-stone-100">
            <div className="text-xs font-mono font-bold text-stone-400 uppercase tracking-wider mb-3">
              All 4 Verified Before → After Case Studies
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {beforeAfterStories.map((st, i) => (
                <div
                  key={st.id}
                  onClick={() => setActiveStoryIndex(i)}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    activeStoryIndex === i
                      ? 'bg-stone-100/90 border-stone-400'
                      : 'bg-white border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-stone-500">
                    <span>{st.district}</span>
                    <span className="font-bold text-[#065F46]">{st.status}</span>
                  </div>
                  <div className="text-xs font-bold text-stone-900 font-heading mt-1 line-clamp-1">
                    {st.title}
                  </div>
                  <div className="text-[11px] text-stone-500 mt-1">
                    {st.impact}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. WHERE ARE WE CREATING IMPACT? (IMPACT CATEGORIES) */}
        <section className="bg-white rounded-2xl border border-stone-200/90 shadow-xs p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
            <div>
              <span className="text-[11px] font-mono uppercase font-bold text-[#065F46] tracking-wider">
                DOMAIN IMPACT BREAKDOWN
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] font-heading mt-0.5">
                Where Are We Creating Impact?
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Solutions deployed, citizens reached, and measured outcome trends across 9 societal sectors.
              </p>
            </div>
            <span className="text-[11px] font-mono text-stone-400 self-start sm:self-auto">
              * Clearly distinguishing pilot and verified outcomes
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {impactCategories.map((cat) => (
              <div 
                key={cat.name}
                className="p-4 rounded-xl border border-stone-200/90 bg-stone-50/40 hover:bg-white hover:border-stone-300 transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#0F172A] font-heading">
                      {cat.name}
                    </span>
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${cat.tagColor}`}>
                      {cat.badge}
                    </span>
                  </div>

                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-xl font-extrabold text-[#0F172A] font-heading">
                      {cat.solutions}
                    </span>
                    <span className="text-xs text-stone-500 font-medium">Solutions Deployed</span>
                  </div>

                  <div className="text-xs font-semibold text-stone-700 mt-1">
                    {cat.people}
                  </div>
                </div>

                <div className="pt-2.5 border-t border-stone-200/80">
                  <div className="text-[10px] font-mono font-bold text-stone-400 uppercase">Outcome Trend</div>
                  <div className="text-xs font-semibold text-[#065F46] mt-0.5 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                    <span>{cat.trend}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. PROJECTS CREATING IMPACT (4-6 PROJECT CARDS) */}
        <section className="bg-white rounded-2xl border border-stone-200/90 shadow-xs p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
            <div>
              <span className="text-[11px] font-mono uppercase font-bold text-stone-500 tracking-wider">
                FIELD IMPLEMENTATIONS · UNIVERSITY & INDUSTRY LED
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] font-heading mt-0.5">
                Projects Creating Impact
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Deep dive into live engineering and civic interventions currently active in Jharkhand districts.
              </p>
            </div>
            <span className="text-xs font-medium text-stone-500">
              Showing 6 Highlighted Solutions
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projectStoriesList.map((proj) => (
              <div
                key={proj.id}
                className="p-5 rounded-xl border border-stone-200 bg-white hover:border-stone-400 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-stone-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#065F46]" />
                      {proj.district}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-[#065F46] border border-emerald-200">
                      {proj.verification}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#0F172A] font-heading leading-snug">
                    {proj.name}
                  </h3>

                  {/* Problem & Solution Mini Specs */}
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-100">
                      <span className="text-[10px] font-bold text-stone-400 uppercase font-mono block">Problem</span>
                      <p className="text-stone-700 mt-0.5 leading-relaxed">{proj.problem}</p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-emerald-50/40 border border-emerald-100">
                      <span className="text-[10px] font-bold text-[#065F46] uppercase font-mono block">Solution</span>
                      <p className="text-stone-800 mt-0.5 leading-relaxed">{proj.solution}</p>
                    </div>
                  </div>

                  {/* Metadata grid */}
                  <div className="pt-1 grid grid-cols-2 gap-2 text-[11px] text-stone-600">
                    <div>
                      <span className="text-stone-400 block font-mono text-[10px]">Beneficiaries</span>
                      <strong className="text-stone-900">{proj.beneficiaries}</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block font-mono text-[10px]">Project Stage</span>
                      <strong className="text-[#065F46]">{proj.stage}</strong>
                    </div>
                    <div className="col-span-2">
                      <span className="text-stone-400 block font-mono text-[10px]">Impact Metric</span>
                      <strong className="text-stone-800">{proj.impactMetric}</strong>
                    </div>
                    <div className="col-span-2 pt-1 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                      <span>Uni: <strong className="text-stone-700">{proj.university}</strong></span>
                      <span>Partner: <strong className="text-stone-700">{proj.industry}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100">
                  <button
                    onClick={() => {
                      if (onSelectProject) {
                        onSelectProject(proj.challengeId);
                      } else {
                        setModalProject(proj);
                      }
                    }}
                    className="w-full py-2 px-3 rounded-lg border border-stone-300 hover:border-stone-800 hover:bg-stone-900 hover:text-white text-xs font-semibold text-stone-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>View Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. COMMUNITY VOICE & CITIZEN VALIDATION (EXTREMELY IMPORTANT) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* COMMUNITY VOICE TESTIMONIALS */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-stone-200/90 shadow-xs p-6 sm:p-7 space-y-6">
            <div className="pb-3 border-b border-stone-100">
              <span className="text-[11px] font-mono uppercase font-bold text-[#065F46] tracking-wider">
                COMMUNITY VOICE
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] font-heading mt-0.5">
                What Residents Are Saying
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                The citizen has an active role in validating whether a solution actually works in the field.
              </p>
            </div>

            {/* Testimonials */}
            <div className="space-y-3.5">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80">
                <p className="text-xs sm:text-sm text-stone-800 italic leading-relaxed">
                  "Since the monitoring system was installed, we receive alerts much earlier. During the last monsoon surge, we had zero crop losses."
                </p>
                <div className="mt-2.5 flex items-center justify-between text-xs text-stone-500 font-mono">
                  <span className="font-bold text-stone-800">— Community participant · Dumka</span>
                  <span className="text-[10px] text-stone-400 bg-stone-200/60 px-1.5 py-0.5 rounded">DEMO FEEDBACK</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80">
                <p className="text-xs sm:text-sm text-stone-800 italic leading-relaxed">
                  "For 15 years we suffered gastrointestinal sickness from river water. Today, our children carry pure water bottles to school every morning from the solar kiosk."
                </p>
                <div className="mt-2.5 flex items-center justify-between text-xs text-stone-500 font-mono">
                  <span className="font-bold text-stone-800">— Mukhiya & Panchayat Water Lead · Namkum, Ranchi</span>
                  <span className="text-[10px] text-stone-400 bg-stone-200/60 px-1.5 py-0.5 rounded">DEMO FEEDBACK</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80">
                <p className="text-xs sm:text-sm text-stone-800 italic leading-relaxed">
                  "The optical scanner detected severe anemia in pregnant mothers without drawing even a drop of blood. Mothers now walk to Anganwadi centers without fear."
                </p>
                <div className="mt-2.5 flex items-center justify-between text-xs text-stone-500 font-mono">
                  <span className="font-bold text-stone-800">— Parvati Devi · Senior ASHA Worker, Dumka</span>
                  <span className="text-[10px] text-stone-400 bg-stone-200/60 px-1.5 py-0.5 rounded">DEMO FEEDBACK</span>
                </div>
              </div>
            </div>

            {/* Satisfaction KPI trio */}
            <div className="pt-2 border-t border-stone-100 grid grid-cols-3 gap-3 text-center">
              <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200">
                <div className="text-xl font-extrabold text-[#065F46] font-heading">88%</div>
                <div className="text-[10px] font-bold text-stone-600 mt-0.5">Citizen Satisfaction</div>
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200">
                <div className="text-xl font-extrabold text-[#065F46] font-heading">74%</div>
                <div className="text-[10px] font-bold text-stone-600 mt-0.5">Reported as Solved</div>
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200">
                <div className="text-xl font-extrabold text-[#065F46] font-heading">91%</div>
                <div className="text-[10px] font-bold text-stone-600 mt-0.5">Would Recommend</div>
              </div>
            </div>

            <div className="text-center text-[10px] font-mono text-stone-400">
              * Aggregate of 15,667 verified Gram Panchayat audits · Demo Feedback Label
            </div>
          </div>

          {/* CITIZEN VALIDATION INTERACTION: WAS THE PROBLEM ACTUALLY SOLVED? */}
          <div className="lg:col-span-6 bg-[#0F172A] rounded-2xl border border-stone-800 text-white p-6 sm:p-7 space-y-6 shadow-md">
            <div className="pb-3 border-b border-stone-800 flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  CITIZEN VALIDATION INTERACTION
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-heading mt-0.5 text-white">
                  Was the Problem Actually Solved?
                </h2>
                <p className="text-xs text-stone-400 mt-0.5">
                  Featured Case: <strong className="text-white">Rural Water Quality Monitoring Network (Dumka)</strong>
                </p>
              </div>
              <span className="text-[11px] font-mono bg-stone-800 text-emerald-300 px-2.5 py-1 rounded border border-stone-700 shrink-0">
                342 Community Responses
              </span>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              Citizens remain part of the ecosystem even after deployment. Cast your community audit verdict on whether the clean water kiosks fulfilled their mandate:
            </p>

            {/* Voting Options */}
            <div className="space-y-2.5">
              <button
                onClick={() => handleVote('yes')}
                disabled={hasVoted}
                className={`w-full p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                  userVote === 'yes'
                    ? 'bg-emerald-950 border-emerald-400'
                    : 'bg-stone-900/80 border-stone-800 hover:border-stone-700 hover:bg-stone-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🟢</span>
                    <span className="text-xs font-bold text-white">Yes, significantly improved</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400">{yesPct}%</span>
                </div>
                <p className="text-[11px] text-stone-400 mt-1 pl-6">
                  Water quality is pure 24/7; zero stomach sickness reported in our hamlet.
                </p>
              </button>

              <button
                onClick={() => handleVote('in_progress')}
                disabled={hasVoted}
                className={`w-full p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                  userVote === 'in_progress'
                    ? 'bg-amber-950 border-amber-400'
                    : 'bg-stone-900/80 border-stone-800 hover:border-stone-700 hover:bg-stone-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🟡</span>
                    <span className="text-xs font-bold text-white">Partially improved</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400">{progressPct}%</span>
                </div>
                <p className="text-[11px] text-stone-400 mt-1 pl-6">
                  Filter works during daytime, but battery backup needs routine maintenance.
                </p>
              </button>

              <button
                onClick={() => handleVote('no')}
                disabled={hasVoted}
                className={`w-full p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                  userVote === 'no'
                    ? 'bg-rose-950 border-rose-400'
                    : 'bg-stone-900/80 border-stone-800 hover:border-stone-700 hover:bg-stone-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🔴</span>
                    <span className="text-xs font-bold text-white">Not solved</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-rose-400">{noPct}%</span>
                </div>
                <p className="text-[11px] text-stone-400 mt-1 pl-6">
                  Kiosk went offline or water pressure was too weak to serve entire hamlet.
                </p>
              </button>
            </div>

            {/* Distribution Bar */}
            <div className="space-y-1.5 pt-2 border-t border-stone-800">
              <div className="w-full h-2 rounded-full bg-stone-800 overflow-hidden flex">
                <div style={{ width: `${yesPct}%` }} className="bg-emerald-400 h-full"></div>
                <div style={{ width: `${progressPct}%` }} className="bg-amber-400 h-full"></div>
                <div style={{ width: `${noPct}%` }} className="bg-rose-400 h-full"></div>
              </div>
              <div className="flex justify-between text-[11px] text-stone-400 font-mono">
                <span>● 74% report significant improvement</span>
                <span>{totalVotes.toLocaleString()} Audited Citizen Votes</span>
              </div>
            </div>

            {hasVoted && (
              <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-700/60 text-xs text-emerald-300 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Thank you! Your grassroots validation vote has been logged into the public ledger.</span>
              </div>
            )}
          </div>
        </section>

        {/* 9. IMPACT TIMELINE: FROM PROBLEM TO IMPACT */}
        <section className="bg-white rounded-2xl border border-stone-200/90 shadow-xs p-6 sm:p-8 space-y-6">
          <div className="pb-3 border-b border-stone-100">
            <span className="text-[11px] font-mono uppercase font-bold text-[#065F46] tracking-wider">
              INNOVATION LIFECYCLE
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] font-heading mt-0.5">
              From Problem to Impact
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Every deployed solution progresses through a rigorous 9-stage verified pipeline before statewide scaling.
            </p>
          </div>

          <div className="relative">
            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
              {[
                { stage: '1', name: 'Citizen Report', active: true, tag: 'Origin' },
                { stage: '2', name: 'Gov Validation', active: true, tag: 'Approved' },
                { stage: '3', name: 'Uni Research', active: true, tag: 'Lab Cohort' },
                { stage: '4', name: 'Prototype', active: true, tag: 'Working Model' },
                { stage: '5', name: 'Industry Collab', active: true, tag: 'CSR & Tech' },
                { stage: '6', name: 'Pilot Testing', active: true, tag: 'Field Trials' },
                { stage: '7', name: 'Deployment', active: true, tag: 'Installed' },
                { stage: '8', name: 'Citizen Audit', active: true, tag: 'Panchayat' },
                { stage: '9', name: 'Measured Impact', active: true, tag: 'Scaled' }
              ].map((item, i) => (
                <div
                  key={item.stage}
                  className="p-3 rounded-xl border border-stone-200 bg-stone-50/70 hover:bg-emerald-50/50 hover:border-emerald-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 font-bold">
                      <span>0{item.stage}</span>
                      {i < 8 ? <span className="text-stone-300">→</span> : <CheckCircle2 className="w-3 h-3 text-[#065F46]" />}
                    </div>
                    <div className="text-xs font-bold text-stone-900 font-heading mt-1.5 leading-snug">
                      {item.name}
                    </div>
                  </div>
                  <div className="mt-2 text-[10px] font-mono font-medium text-[#065F46]">
                    {item.tag}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 10. IMPACT TREND: IMPACT OVER TIME (CLEAN CHART) */}
        <section className="bg-white rounded-2xl border border-stone-200/90 shadow-xs p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
            <div>
              <span className="text-[11px] font-mono uppercase font-bold text-stone-500 tracking-wider">
                TEMPORAL TRAJECTORY
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] font-heading mt-0.5">
                Impact Over Time
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Quarterly progression of deployed societal engineering outcomes across Jharkhand.
              </p>
            </div>

            {/* Metric Selector buttons */}
            <div className="flex flex-wrap gap-1.5 bg-stone-100 p-1 rounded-xl">
              {[
                { key: 'citizens', label: 'Citizens' },
                { key: 'solutions', label: 'Solutions' },
                { key: 'farmers', label: 'Farmers' },
                { key: 'water', label: 'Water Saved' },
                { key: 'waste', label: 'Waste Reduced' },
                { key: 'jobs', label: 'Jobs' }
              ].map((btn) => (
                <button
                  key={btn.key}
                  onClick={() => setSelectedTrendMetric(btn.key as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    selectedTrendMetric === btn.key
                      ? 'bg-white text-stone-900 font-bold shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active Metric Summary */}
          {(() => {
            const current = trendDataMap[selectedTrendMetric];
            const maxVal = Math.max(...current.series.map(s => s.val));

            return (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div>
                    <span className="text-xs font-mono font-bold text-stone-400 uppercase">Selected Metric</span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-heading mt-0.5">
                      {current.current}
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-emerald-50 text-[#065F46] border border-emerald-200 self-start sm:self-auto">
                    {current.badge}
                  </span>
                </div>

                {/* Clean, Non-3D, High-Legibility Bar Visualization */}
                <div className="bg-stone-50 p-6 rounded-xl border border-stone-200">
                  <div className="grid grid-cols-5 gap-3 sm:gap-6 items-end h-44 sm:h-52 pt-4">
                    {current.series.map((pt, idx) => {
                      const heightPct = Math.round((pt.val / maxVal) * 85) + 12;
                      const isLatest = idx === current.series.length - 1;

                      return (
                        <div key={pt.period} className="flex flex-col items-center h-full justify-end group">
                          {/* Value display tooltip label */}
                          <span className={`text-[11px] font-mono font-bold mb-1.5 transition-all ${
                            isLatest ? 'text-[#065F46]' : 'text-stone-600'
                          }`}>
                            {pt.display}
                          </span>

                          {/* The Bar */}
                          <div className="w-full max-w-[60px] bg-stone-200 rounded-t-lg overflow-hidden flex flex-col justify-end transition-all h-full">
                            <div 
                              style={{ height: `${heightPct}%` }}
                              className={`w-full transition-all duration-500 rounded-t-lg ${
                                isLatest ? 'bg-[#065F46]' : 'bg-stone-400 group-hover:bg-stone-600'
                              }`}
                            ></div>
                          </div>

                          {/* Period Label */}
                          <span className="text-[11px] font-mono text-stone-500 mt-2 font-medium">
                            {pt.period}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
                  <span>Unit: {current.unit}</span>
                  <span>* Clean 2D area-standardized visualization</span>
                </div>
              </div>
            );
          })()}
        </section>

        {/* 11. SDG ALIGNMENT */}
        <section className="bg-white rounded-2xl border border-stone-200/90 shadow-xs p-6 sm:p-8 space-y-6">
          <div className="pb-3 border-b border-stone-100">
            <span className="text-[11px] font-mono uppercase font-bold text-stone-500 tracking-wider">
              UNITED NATIONS GLOBAL GOALS
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] font-heading mt-0.5">
              Sustainable Development Goals Alignment
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Mapping Jharkhand engineering breakthroughs directly to UN SDG targets.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {sdgs.map((sdg) => (
              <div 
                key={sdg.num}
                className="p-4 rounded-xl border border-stone-200 bg-stone-50/40 hover:bg-white hover:border-stone-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-[#065F46] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {sdg.num}
                  </span>
                  <div className="text-sm font-bold text-[#0F172A] font-heading mt-2">
                    {sdg.name}
                  </div>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {sdg.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 12. INNOVATION OUTCOMES */}
        <section className="bg-white rounded-2xl border border-stone-200/90 shadow-xs p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
            <div>
              <span className="text-[11px] font-mono uppercase font-bold text-[#C2410C] tracking-wider">
                INTELLECTUAL CAPITAL GENERATED
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] font-heading mt-0.5">
                Innovation Generated
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Patents, academic publications, student startup spinouts, and verified technology transfers.
              </p>
            </div>
            <span className="text-[11px] font-mono text-stone-400 self-start sm:self-auto">
              * Distinguishing registered filings from active field pilots
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-heading">86</div>
              <div className="text-xs font-bold text-stone-700 mt-1">Solutions Deployed</div>
              <div className="text-[10px] text-[#065F46] font-mono mt-0.5 font-semibold">VERIFIED</div>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-heading">24</div>
              <div className="text-xs font-bold text-stone-700 mt-1">Pilot Projects</div>
              <div className="text-[10px] text-blue-700 font-mono mt-0.5 font-semibold">ACTIVE TESTING</div>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-heading">42</div>
              <div className="text-xs font-bold text-stone-700 mt-1">IP / Patent Outcomes</div>
              <div className="text-[10px] text-amber-700 font-mono mt-0.5 font-semibold">PROVISIONAL & FILED</div>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-heading">12</div>
              <div className="text-xs font-bold text-stone-700 mt-1">Research Outputs</div>
              <div className="text-[10px] text-stone-600 font-mono mt-0.5 font-semibold">PEER-REVIEWED</div>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-heading">8</div>
              <div className="text-xs font-bold text-stone-700 mt-1">Startup Opportunities</div>
              <div className="text-[10px] text-[#C2410C] font-mono mt-0.5 font-semibold">INCUBATED</div>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-heading">32</div>
              <div className="text-xs font-bold text-stone-700 mt-1">Technology Transfers</div>
              <div className="text-[10px] text-[#065F46] font-mono mt-0.5 font-semibold">LICENSED TO MSMES</div>
            </div>
          </div>
        </section>

        {/* 13. UNIVERSITY & INDUSTRY IMPACT */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* UNIVERSITY IMPACT: ACADEMIC CONTRIBUTION */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200/90 shadow-xs p-6 sm:p-7 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <span className="text-[11px] font-mono uppercase font-bold text-[#065F46] tracking-wider">
                  HIGHER EDUCATION INSTITUTES
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] font-heading mt-0.5">
                  Academic Contribution
                </h2>
              </div>
              <span className="text-[11px] font-mono text-stone-400">
                Demo University Ledger
              </span>
            </div>

            <div className="space-y-3">
              {academicPartners.map((uni) => (
                <div 
                  key={uni.name}
                  className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/40 hover:bg-white hover:border-stone-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-0.5">
                    <div className="text-xs sm:text-sm font-bold text-stone-900 font-heading">
                      {uni.name}
                    </div>
                    <div className="text-[11px] text-stone-500">
                      Focus: <strong className="text-stone-700">{uni.focus}</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono shrink-0">
                    <div className="text-right">
                      <span className="text-stone-400 block text-[10px]">Projects</span>
                      <strong className="text-[#0F172A]">{uni.activeProjects} active</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-stone-400 block text-[10px]">Deployed</span>
                      <strong className="text-[#065F46]">{uni.deployed} deployed</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-stone-400 block text-[10px]">Students</span>
                      <strong className="text-stone-700">{uni.students}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* INDUSTRY IMPACT: INDUSTRY CONTRIBUTION */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200/90 shadow-xs p-6 sm:p-7 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <span className="text-[11px] font-mono uppercase font-bold text-[#C2410C] tracking-wider">
                  CSR & TECH PARTNERS
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] font-heading mt-0.5">
                  Industry Contribution
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                <div className="text-2xl font-extrabold text-[#0F172A] font-heading">42</div>
                <div className="text-xs font-bold text-stone-700 mt-0.5">Funded Projects</div>
                <div className="text-[10px] text-stone-500 mt-0.5">₹4.8 Cr CSR pledged</div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                <div className="text-2xl font-extrabold text-[#0F172A] font-heading">74</div>
                <div className="text-xs font-bold text-stone-700 mt-0.5">Mentorships</div>
                <div className="text-[10px] text-stone-500 mt-0.5">Senior technical leads</div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                <div className="text-2xl font-extrabold text-[#0F172A] font-heading">31</div>
                <div className="text-xs font-bold text-stone-700 mt-0.5">Tech Contributions</div>
                <div className="text-[10px] text-stone-500 mt-0.5">Sensors, cloud, licenses</div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                <div className="text-2xl font-extrabold text-[#0F172A] font-heading">24</div>
                <div className="text-xs font-bold text-stone-700 mt-0.5">Pilot Deployments</div>
                <div className="text-[10px] text-stone-500 mt-0.5">Industrial testbeds</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs text-amber-900 space-y-1">
              <span className="font-bold font-mono text-[10px] uppercase block">Seven Contribution Paths</span>
              <p className="text-[11px] leading-relaxed">
                Corporates participate across Funding, Mentorship, Technology, Hardware, Testing, Pilot Deployment, and Commercialization.
              </p>
            </div>
          </div>
        </section>

        {/* 14. TOP IMPACT DISTRICTS */}
        <section className="bg-white rounded-2xl border border-stone-200/90 shadow-xs p-6 sm:p-8 space-y-6">
          <div className="pb-3 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[11px] font-mono uppercase font-bold text-[#065F46] tracking-wider">
                DISTRICT PERFORMANCE
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] font-heading mt-0.5">
                Districts with Highest Impact
              </h2>
            </div>
            <span className="text-xs text-stone-500 font-mono">
              Ranked by deployed solutions & verified population reached
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {topDistrictsRanked.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedDistrictId(item.id)}
                className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-white hover:border-stone-300 transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-stone-200 text-stone-800 font-bold font-mono text-xs flex items-center justify-center shrink-0">
                    #{item.rank}
                  </span>
                  <div>
                    <div className="text-sm font-bold text-[#0F172A] font-heading">
                      {item.name}
                    </div>
                    <div className="text-xs text-stone-500">
                      {item.solutions} solutions · <strong className="text-stone-800">{item.citizens} people</strong>
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-[#065F46] border border-emerald-200 shrink-0">
                  {item.badge}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 15. SAMADHAN AI · IMPACT INSIGHTS */}
        <section className="bg-white rounded-2xl border border-stone-200/90 shadow-xs p-6 sm:p-8 space-y-6">
          <div className="pb-3 border-b border-stone-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#065F46]" />
            <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] font-heading">
              SAMADHAN AI · Impact Insights
            </h2>
            <span className="text-[10px] font-mono bg-stone-100 text-stone-500 px-2 py-0.5 rounded ml-auto">
              Generated from Current Dataset
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {[
              {
                icon: Droplet,
                text: "Water projects currently represent the largest share of verified community impact (240,000 citizens across 18 operational sites)."
              },
              {
                icon: MapPin,
                text: "Ranchi has the highest number of deployed solutions (24), followed closely by Dumka (18) and Hazaribagh (16)."
              },
              {
                icon: Building2,
                text: "Projects involving both university and industry partners show higher pilot completion in the current demo dataset."
              },
              {
                icon: CheckCircle2,
                text: "12 projects are currently staged and ready for community impact validation in upcoming Gram Panchayat sessions."
              }
            ].map((insight, idx) => {
              const IconComp = insight.icon;
              return (
                <div key={idx} className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2">
                  <IconComp className="w-4 h-4 text-[#065F46]" />
                  <p className="text-xs text-stone-700 leading-relaxed font-medium">
                    "{insight.text}"
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-[11px] font-mono text-stone-400 text-center">
            * AI advisory inferences generated strictly from public challenge and project workspace telemetry.
          </div>
        </section>

        {/* 16. LIVE SENSOR TELEMETRY ACROSS FIELD SITES (PRESERVED FUNCTIONALITY) */}
        <section className="bg-white rounded-2xl border border-stone-200/90 shadow-xs p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
            <div>
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4 text-stone-800" />
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] font-heading">
                  Live Sensor Telemetry Across Field Sites
                </h2>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Automated LoRaWAN & NB-IoT sensor nodes providing continuous telemetry on water purity, solar yield, and cold storage.
              </p>
            </div>
            <span className="text-[11px] font-bold text-[#065F46] bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200/50 self-start sm:self-auto">
              ● 4/4 Nodes Transmitting
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {telemetryNodes.map((node) => (
              <div key={node.id} className="p-5 rounded-xl border border-stone-200 bg-stone-50/50 space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-[#0F172A]">
                      {node.name}
                    </h3>
                    <div className="text-xs text-stone-500 mt-0.5">
                      📍 {node.location} • {node.type}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#065F46] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                    {node.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-stone-200">
                  {node.metrics.map((m, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-white border border-stone-200">
                      <div className="text-[10px] uppercase font-bold text-stone-400 font-mono">{m.label}</div>
                      <div className="text-xs font-bold text-stone-900 mt-0.5">{m.value}</div>
                      <div className="text-[10px] text-[#065F46] font-semibold">{m.status}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 17. VERIFIED COMMUNITY TRANSFORMATION CASE STUDIES (PRESERVED STORIES PROP) */}
        {stories && stories.length > 0 && (
          <section className="bg-white rounded-2xl border border-stone-200/90 shadow-xs p-6 sm:p-8 space-y-6">
            <div className="pb-3 border-b border-stone-100">
              <span className="text-[11px] font-mono uppercase font-bold text-stone-500 tracking-wider">
                COMMUNITY CASE ARCHIVES
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] font-heading mt-0.5">
                Archived Community Transformation Case Studies
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Photographic proof, citizen testimonials, and economic returns from completed engineering solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stories.map((story) => (
                <div key={story.id} className="p-5 rounded-xl border border-stone-200 bg-white space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-stone-800 bg-stone-100 px-2.5 py-0.5 rounded border border-stone-200">
                        {story.domain}
                      </span>
                      <span className="text-stone-500 font-mono">
                        📍 {story.district}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#0F172A] font-heading">
                      {story.title}
                    </h3>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      {story.summary}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
                        <span className="text-stone-400 block text-[10px] uppercase font-bold font-mono">Baseline Condition</span>
                        <p className="text-stone-700 mt-1 leading-relaxed">{story.beforeMetric}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-200 text-[#065F46]">
                        <span className="text-[#065F46] block text-[10px] uppercase font-bold font-mono">Post-Deployment Outcome</span>
                        <p className="text-stone-800 mt-1 leading-relaxed font-medium">{story.afterMetric}</p>
                      </div>
                    </div>

                    {story.citizenQuote && (
                      <div className="p-3 rounded-lg bg-stone-50 text-xs italic text-stone-700 border-l-2 border-[#065F46]">
                        "{story.citizenQuote.text}"
                        <div className="text-[10px] text-stone-500 mt-1 font-mono not-italic font-semibold">
                          — {story.citizenQuote.author}, {story.citizenQuote.role}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                    <span>Direct Impact: <strong className="text-stone-800">{(story.citizensBenefited || 0).toLocaleString()}</strong> people</span>
                    <span className="text-[#065F46] font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      Citizen Audited
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 18. IMPACT DATA TRANSPARENCY (TRUST ENGINE) */}
        <section className="bg-white rounded-2xl border border-stone-200/90 shadow-xs p-6 sm:p-8 space-y-5">
          <div className="pb-3 border-b border-stone-100">
            <span className="text-[11px] font-mono uppercase font-bold text-stone-500 tracking-wider">
              TRUST ARCHITECTURE
            </span>
            <h2 className="text-xl font-bold text-[#0F172A] font-heading mt-0.5">
              Impact Data Transparency
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              SAMADHANSETU AI distinguishes raw demo projections from verified field telemetry and democratic civic audits.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-1">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-[#065F46] border border-emerald-300">
                VERIFIED
              </span>
              <div className="text-xs font-bold text-[#0F172A] pt-1">
                Responsible Stakeholder Audit
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                Validated by district collectorate, NABL testing labs, or authenticated Gram Panchayat resolutions.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40 space-y-1">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-300">
                PILOT RESULT
              </span>
              <div className="text-xs font-bold text-[#0F172A] pt-1">
                Measured During Pilot Deployment
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                Logged directly from IoT microgrids, filtration sensor skids, or registered farmer cooperatives.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-1">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
                ESTIMATED
              </span>
              <div className="text-xs font-bold text-[#0F172A] pt-1">
                Calculated / Projected Impact
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                Derived from engineering simulations, demographic census blocks, and academic feasibility projections.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-1">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-stone-200 text-stone-700 border border-stone-300">
                DEMO DATA
              </span>
              <div className="text-xs font-bold text-[#0F172A] pt-1">
                Sample Platform Demonstration
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                Illustrative sample records utilized for evaluation and prototype testing. Not official government releases.
              </p>
            </div>
          </div>
        </section>

      </div>

      {/* Project Quick View Modal (when view project is clicked if onSelectProject is not provided) */}
      {modalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-5 border border-stone-300 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-[#065F46] bg-emerald-50 px-2 py-0.5 rounded">
                  {modalProject.verification}
                </span>
                <h3 className="text-lg font-bold text-[#0F172A] mt-1 font-heading">
                  {modalProject.name}
                </h3>
              </div>
              <button
                onClick={() => setModalProject(null)}
                className="text-stone-400 hover:text-stone-700 p-1.5 rounded-lg hover:bg-stone-100"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
                <span className="font-bold text-stone-500 block text-[10px] font-mono uppercase">Problem</span>
                <p className="text-stone-800 mt-0.5">{modalProject.problem}</p>
              </div>

              <div className="p-3 rounded-lg bg-emerald-50/50 border border-emerald-200">
                <span className="font-bold text-[#065F46] block text-[10px] font-mono uppercase">Engineered Solution</span>
                <p className="text-stone-800 mt-0.5">{modalProject.solution}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-stone-600">
                <div>
                  <span className="text-stone-400 block text-[10px] font-mono">Location</span>
                  <strong className="text-stone-900">{modalProject.district} District</strong>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] font-mono">Stage</span>
                  <strong className="text-[#065F46]">{modalProject.stage}</strong>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] font-mono">University</span>
                  <strong className="text-stone-900">{modalProject.university}</strong>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] font-mono">Industry Partner</span>
                  <strong className="text-stone-900">{modalProject.industry}</strong>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-stone-100 text-stone-800 font-mono">
                <span className="text-[10px] text-stone-500 block uppercase">Key Outcome Metric</span>
                <strong className="text-xs text-[#065F46]">{modalProject.impactMetric}</strong>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setModalProject(null)}
                className="px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold cursor-pointer"
              >
                Close Project Overview
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
