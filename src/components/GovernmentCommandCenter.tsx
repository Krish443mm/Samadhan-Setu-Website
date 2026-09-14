import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle2, 
  MapPin, 
  Cpu, 
  FileText, 
  Building2, 
  GraduationCap, 
  Zap, 
  BarChart3, 
  Activity, 
  Clock, 
  ArrowUpRight,
  Filter,
  Check,
  Coins,
  FileCheck2,
  Building,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  Download,
  Users,
  Layers,
  ArrowRight,
  ChevronDown,
  Info,
  Radio,
  Briefcase
} from 'lucide-react';
import { Challenge } from '../types';
import { JHARKHAND_DISTRICTS } from '../data/mockData';
import { JharkhandMap, JHARKHAND_DISTRICTS_DATA, DistrictData } from './JharkhandMap';

interface GovernmentCommandCenterProps {
  challenges: Challenge[];
  onSelectChallenge: (challenge: Challenge) => void;
  onValidateChallenge: (challenge: Challenge) => void;
}

export const GovernmentCommandCenter: React.FC<GovernmentCommandCenterProps> = ({
  challenges,
  onSelectChallenge,
  onValidateChallenge
}) => {
  // Global Filters
  const [selectedDistrictFilter, setSelectedDistrictFilter] = useState<string>('All');
  const [selectedDomainFilter, setSelectedDomainFilter] = useState<string>('All');
  const [selectedPriorityFilter, setSelectedPriorityFilter] = useState<string>('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All');
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<string>('Last 30 Days');

  // Interactive state
  const [validatedNotification, setValidatedNotification] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [lastUpdatedText, setLastUpdatedText] = useState<string>('Just now');
  const [chartDomainFilter, setChartDomainFilter] = useState<string>('All Domains');
  const [activeQueueTab, setActiveQueueTab] = useState<'validation' | 'assignment' | 'delayed' | 'pilotApproval'>('validation');

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdatedText('Just now');
      setValidatedNotification('State telemetry synchronized across all 24 district server nodes.');
      setTimeout(() => setValidatedNotification(null), 3500);
    }, 600);
  };

  const handleExportReport = () => {
    const reportSummary = `JHARKHAND CIVIC INNOVATION REPORT - ${new Date().toLocaleDateString('en-IN')}\n\n` +
      `Total Challenges: 12,840\nActive Projects: 426\nDeployed Solutions: 86\nCitizens Impacted: 1.2M\n\n` +
      `Filtered by District: ${selectedDistrictFilter}\nDomain: ${selectedDomainFilter}\nPriority: ${selectedPriorityFilter}\nPeriod: ${selectedTimePeriod}\n\n` +
      `Generated via SAMADHANSETU AI Command Center.`;
    
    const blob = new Blob([reportSummary], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Jharkhand_Innovation_Command_Report_${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    setValidatedNotification('Executive summary report exported successfully.');
    setTimeout(() => setValidatedNotification(null), 3500);
  };

  const handleValidate = (ch: Challenge) => {
    onValidateChallenge(ch);
    setValidatedNotification(`Challenge ${ch.trackingCode} validated and released to University R&D pipeline!`);
    setTimeout(() => setValidatedNotification(null), 4000);
  };

  // Currently selected district details for the interactive map panel
  const selectedDistrictData: DistrictData | undefined = useMemo(() => {
    if (selectedDistrictFilter === 'All') {
      return JHARKHAND_DISTRICTS_DATA.find(d => d.name === 'Ranchi') || JHARKHAND_DISTRICTS_DATA[0];
    }
    return JHARKHAND_DISTRICTS_DATA.find(d => d.name?.toLowerCase() === selectedDistrictFilter?.toLowerCase()) 
      || JHARKHAND_DISTRICTS_DATA.find(d => d.name === 'Ranchi');
  }, [selectedDistrictFilter]);

  // Emerging Challenge trends data
  const emergingTrends = [
    {
      domain: 'Drinking Water Access',
      district: 'Ranchi',
      growth: '+42%',
      peopleAffected: '18,400 potentially affected',
      priority: 'HIGH',
      priorityColor: 'text-[#C2410C] bg-amber-50 border-amber-200',
      detail: 'Namkum & Kanke blocks reporting sudden fluoride and nitrate concentration spikes.'
    },
    {
      domain: 'Crop Disease Detection',
      district: 'Hazaribagh',
      growth: '+31%',
      peopleAffected: '7,200 farmers',
      priority: 'HIGH',
      priorityColor: 'text-[#C2410C] bg-amber-50 border-amber-200',
      detail: 'Fungal leaf blight spreading across winter potato clusters in Katkamsandi.'
    },
    {
      domain: 'Waste Management & Dust',
      district: 'Dhanbad',
      growth: '+28%',
      peopleAffected: '24,000 residents',
      priority: 'MEDIUM',
      priorityColor: 'text-stone-700 bg-stone-100 border-stone-200',
      detail: 'Open-cast coal haulage routes generating elevated PM10 along settlement school corridors.'
    },
    {
      domain: 'Human-Wildlife Conflict',
      district: 'West Singhbhum',
      growth: '+54%',
      peopleAffected: '12,200 residents',
      priority: 'CRITICAL',
      priorityColor: 'text-[#DC2626] bg-red-50 border-red-200',
      detail: 'Nocturnal elephant herd migration breaching agricultural buffers across 8 fringe hamlets.'
    },
    {
      domain: 'Maternal Health Screening',
      district: 'Dumka',
      growth: '+38%',
      peopleAffected: '9,400 women & infants',
      priority: 'HIGH',
      priorityColor: 'text-[#C2410C] bg-amber-50 border-amber-200',
      detail: 'Remote Anganwadi centers reporting shortage of portable point-of-care ultrasound diagnostics.'
    },
    {
      domain: 'Tribal Lac Post-Harvest',
      district: 'Khunti',
      growth: '+46%',
      peopleAffected: '6,800 forest gatherers',
      priority: 'HIGH',
      priorityColor: 'text-[#C2410C] bg-amber-50 border-amber-200',
      detail: 'Unseasonal rains causing moisture fermentation in storage godowns before shellac processing.'
    }
  ];

  // AI Early Signals / Alerts
  const aiEarlySignals = [
    {
      id: 'sig-1',
      severity: 'HIGH',
      severityColor: 'bg-amber-100 text-[#C2410C] border-amber-200',
      title: 'Water-related challenges increased 42%',
      district: 'Ranchi',
      time: 'Detected 4 hours ago',
      recommendation: 'AI recommends prioritizing groundwater and drinking-water projects.',
      actionLabel: 'View Challenges',
      districtTarget: 'Ranchi',
      domainTarget: 'Water'
    },
    {
      id: 'sig-2',
      severity: 'HIGH',
      severityColor: 'bg-amber-100 text-[#C2410C] border-amber-200',
      title: '12 similar healthcare challenges detected across 4 blocks',
      district: 'West Singhbhum',
      time: 'Detected 12 hours ago',
      recommendation: 'AI recommends deploying mobile diagnostic tele-ultrasound pods to rural clinics.',
      actionLabel: 'View Challenges',
      districtTarget: 'West Singhbhum',
      domainTarget: 'Healthcare'
    },
    {
      id: 'sig-3',
      severity: 'MEDIUM',
      severityColor: 'bg-stone-100 text-stone-700 border-stone-300',
      title: 'Agricultural challenges have increased 27% statewide this quarter',
      district: 'Statewide',
      time: 'Detected 1 day ago',
      recommendation: 'AI recommends expanding post-harvest solar storage vaults and cold-chain pilots.',
      actionLabel: 'View Challenges',
      districtTarget: 'All',
      domainTarget: 'Agriculture'
    },
    {
      id: 'sig-4',
      severity: 'CRITICAL',
      severityColor: 'bg-red-100 text-[#DC2626] border-red-200',
      title: '3 high-priority challenges remain without a university match',
      district: 'Dumka & Palamu',
      time: 'Detected 2 days ago',
      recommendation: 'AI recommends auto-notifying BIT Mesra and Kolhan University R&D cells with ₹5L fast-track grants.',
      actionLabel: 'Assign University',
      districtTarget: 'Dumka',
      domainTarget: 'All'
    }
  ];

  // Domain Intelligence Breakdown (10 Domains)
  const domainIntelligence = [
    { name: 'Water', count: 2480, percentage: 19.3, trend: '↑ 42%', color: '#0284C7' },
    { name: 'Agriculture', count: 2140, percentage: 16.7, trend: '↑ 18%', color: '#059669' },
    { name: 'Education', count: 1840, percentage: 14.3, trend: '→ 3%', color: '#7C3AED' },
    { name: 'Healthcare', count: 1680, percentage: 13.1, trend: '↑ 22%', color: '#DC2626' },
    { name: 'Environment', count: 1420, percentage: 11.1, trend: '↑ 15%', color: '#D97706' },
    { name: 'Rural Livelihoods', count: 1150, percentage: 9.0, trend: '↑ 12%', color: '#4F46E5' },
    { name: 'Energy', count: 890, percentage: 6.9, trend: '↑ 8%', color: '#EA580C' },
    { name: 'Urban Infrastructure', count: 620, percentage: 4.8, trend: '↑ 5%', color: '#0F172A' },
    { name: 'Accessibility', count: 380, percentage: 3.0, trend: '→ 1%', color: '#0D9488' },
    { name: 'Public Administration', count: 240, percentage: 1.8, trend: '→ 0%', color: '#64748B' }
  ];

  // 12-Month Trend Series
  const monthlyTrendData: Record<string, number[]> = {
    'All Domains': [520, 590, 680, 740, 810, 920, 1050, 1140, 1260, 1380, 1510, 1640],
    'Water': [110, 125, 145, 160, 185, 210, 245, 270, 310, 345, 385, 430],
    'Agriculture': [95, 110, 125, 140, 155, 175, 195, 215, 240, 265, 290, 315],
    'Healthcare': [75, 85, 95, 105, 115, 130, 145, 160, 175, 195, 210, 230],
    'Education': [80, 85, 90, 95, 100, 105, 110, 120, 125, 130, 135, 140],
    'Environment': [60, 68, 75, 82, 90, 102, 115, 128, 142, 158, 172, 188]
  };

  const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
  const activeSeries = monthlyTrendData[chartDomainFilter] || monthlyTrendData['All Domains'];
  const maxVal = Math.max(...activeSeries);

  // University Participation data
  const universityData = [
    {
      name: 'BIT Mesra',
      received: 142,
      accepted: 122,
      active: 48,
      solutions: 28,
      responseRate: 86,
      focus: 'AI/IoT, Agro-Sensors, Edge Vision'
    },
    {
      name: 'NIT Jamshedpur',
      received: 118,
      accepted: 96,
      active: 38,
      solutions: 22,
      responseRate: 81,
      focus: 'Metallurgy, Clean Mining, Industrial IoT'
    },
    {
      name: 'Ranchi University',
      received: 94,
      accepted: 72,
      active: 26,
      solutions: 14,
      responseRate: 76,
      focus: 'Biochemistry, Water Arsenic, Public Health'
    },
    {
      name: 'IIT (ISM) Dhanbad',
      received: 84,
      accepted: 71,
      active: 28,
      solutions: 13,
      responseRate: 84,
      focus: 'Mine Safety, Micro-Mist PM Scrubbers, Geothermal'
    },
    {
      name: 'Central University of Jharkhand',
      received: 68,
      accepted: 52,
      active: 18,
      solutions: 9,
      responseRate: 76,
      focus: 'Tribal Livelihoods, Solar Phase-Change Vaults'
    }
  ];

  // Industry Partners breakdown
  const industryStats = {
    total: 186,
    categories: [
      { label: 'Mentorship', count: 74, icon: Briefcase },
      { label: 'Funding', count: 42, icon: Coins },
      { label: 'Technology', count: 31, icon: Cpu },
      { label: 'Pilot Support', count: 24, icon: CheckCircle2 },
      { label: 'Hardware', count: 15, icon: Zap }
    ]
  };

  // Filter challenges for the Action Required operational queue
  const filteredQueueChallenges = useMemo(() => {
    return challenges.filter(c => {
      const matchDistrict = selectedDistrictFilter === 'All' || c.location?.district?.toLowerCase() === selectedDistrictFilter.toLowerCase();
      const matchDomain = selectedDomainFilter === 'All' || c.domain?.toLowerCase() === selectedDomainFilter.toLowerCase();
      const matchPriority = selectedPriorityFilter === 'All' || c.priorityLevel?.toLowerCase() === selectedPriorityFilter.toLowerCase();
      return matchDistrict && matchDomain && matchPriority;
    });
  }, [challenges, selectedDistrictFilter, selectedDomainFilter, selectedPriorityFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 bg-[#FAF9F5]">
      
      {/* 1. DASHBOARD HEADER */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-[#0F172A] text-white">
              GOVERNMENT OF JHARKHAND · SAMADHANSETU AI
            </span>
            <span className="text-xs font-semibold text-[#065F46] flex items-center gap-1.5 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
              State Command Node Live
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight font-heading mt-2">
            Jharkhand Innovation Command Center
          </h1>
          
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
            A statewide view of societal challenges, institutional response and measurable innovation impact.
          </p>
        </div>

        {/* Right side: Last Updated & Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="text-right text-xs">
            <span className="text-stone-400 block text-[10px] uppercase font-bold">Statewide Telemetry</span>
            <span className="font-semibold text-stone-700">Last updated: {lastUpdatedText}</span>
          </div>

          <button
            id="refresh-telemetry-btn"
            onClick={handleRefresh}
            className="p-2.5 rounded-xl border border-stone-300 text-stone-700 hover:text-[#0F172A] hover:bg-white bg-stone-50 cursor-pointer shadow-2xs transition-all flex items-center gap-1.5 text-xs font-semibold"
            title="Refresh statewide intelligence telemetry"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#C2410C]' : 'text-stone-500'}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            onClick={handleExportReport}
            className="px-3.5 py-2.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white cursor-pointer shadow-2xs transition-colors flex items-center gap-1.5 text-xs font-bold"
            title="Export statewide intelligence report"
          >
            <Download className="w-3.5 h-3.5 text-white" />
            <span>Export Report</span>
          </button>
        </div>
      </header>

      {validatedNotification && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center justify-between shadow-2xs animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#065F46] shrink-0" />
            <span>{validatedNotification}</span>
          </div>
          <button 
            onClick={() => setValidatedNotification(null)}
            className="text-xs text-emerald-700 font-bold hover:underline cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 2. REFINED GLOBAL DASHBOARD FILTER BAR */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#C2410C]" />
            <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
              Command Filters
            </span>
          </div>
          <span className="text-[11px] text-stone-500 font-mono">
            Active Query: {selectedDistrictFilter} · {selectedDomainFilter} · {selectedPriorityFilter} · {selectedTimePeriod}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-1 text-xs">
          {/* District Filter */}
          <div>
            <label className="block text-[10px] font-mono uppercase font-bold text-stone-400 mb-1">
              District
            </label>
            <select
              id="command-filter-district"
              value={selectedDistrictFilter}
              onChange={(e) => setSelectedDistrictFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-semibold bg-stone-50 text-stone-800 shadow-2xs focus:outline-hidden focus:border-[#C2410C] focus:bg-white"
            >
              <option value="All">All Jharkhand (24 Districts)</option>
              {JHARKHAND_DISTRICTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Domain Filter */}
          <div>
            <label className="block text-[10px] font-mono uppercase font-bold text-stone-400 mb-1">
              Domain
            </label>
            <select
              id="command-filter-domain"
              value={selectedDomainFilter}
              onChange={(e) => setSelectedDomainFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-semibold bg-stone-50 text-stone-800 shadow-2xs focus:outline-hidden focus:border-[#C2410C] focus:bg-white"
            >
              <option value="All">All Domains</option>
              {domainIntelligence.map((dm) => (
                <option key={dm.name} value={dm.name}>{dm.name}</option>
              ))}
            </select>
          </div>

          {/* Priority Filter */}
          <div>
            <label className="block text-[10px] font-mono uppercase font-bold text-stone-400 mb-1">
              Priority
            </label>
            <select
              id="command-filter-priority"
              value={selectedPriorityFilter}
              onChange={(e) => setSelectedPriorityFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-semibold bg-stone-50 text-stone-800 shadow-2xs focus:outline-hidden focus:border-[#C2410C] focus:bg-white"
            >
              <option value="All">All Priorities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-[10px] font-mono uppercase font-bold text-stone-400 mb-1">
              Status
            </label>
            <select
              id="command-filter-status"
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-semibold bg-stone-50 text-stone-800 shadow-2xs focus:outline-hidden focus:border-[#C2410C] focus:bg-white"
            >
              <option value="All">All Status</option>
              <option value="Under Review">Under Review</option>
              <option value="Validated">Validated</option>
              <option value="Active">Active Projects</option>
              <option value="Pilot">Pilot Testing</option>
              <option value="Deployed">Deployed</option>
            </select>
          </div>

          {/* Time Period Filter */}
          <div>
            <label className="block text-[10px] font-mono uppercase font-bold text-stone-400 mb-1">
              Time Period
            </label>
            <select
              id="command-filter-time"
              value={selectedTimePeriod}
              onChange={(e) => setSelectedTimePeriod(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-semibold bg-stone-50 text-stone-800 shadow-2xs focus:outline-hidden focus:border-[#C2410C] focus:bg-white"
            >
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Last 90 Days">Last 90 Days</option>
              <option value="FY 2024-25">FY 2024–25</option>
              <option value="All Time">All Time</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. STATEWIDE SUMMARY STRIP */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-stone-200">
          
          <div className="pt-2 sm:pt-0 sm:px-3">
            <span className="text-[10px] font-mono uppercase font-bold text-stone-400 block tracking-wider">
              Citizen Intake
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] font-heading mt-1">
              12,840
            </div>
            <div className="text-xs font-semibold text-stone-700 mt-1">
              Challenges Received
            </div>
            <span className="text-[11px] text-[#065F46] font-medium flex items-center gap-1 mt-0.5">
              <span>●</span> 100% Geotagged
            </span>
          </div>

          <div className="pt-4 sm:pt-0 sm:px-4">
            <span className="text-[10px] font-mono uppercase font-bold text-stone-400 block tracking-wider">
              Nodal Pipeline
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#C2410C] font-heading mt-1">
              1,284
            </div>
            <div className="text-xs font-semibold text-stone-700 mt-1">
              Under Review
            </div>
            <span className="text-[11px] text-stone-500 font-medium block mt-0.5">
              Avg. 48hr Triage Turnaround
            </span>
          </div>

          <div className="pt-4 sm:pt-0 sm:px-4">
            <span className="text-[10px] font-mono uppercase font-bold text-stone-400 block tracking-wider">
              R&D Execution
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] font-heading mt-1">
              426
            </div>
            <div className="text-xs font-semibold text-stone-700 mt-1">
              Active Projects
            </div>
            <span className="text-[11px] text-[#0F172A] font-medium block mt-0.5">
              Across 72 Accredited Labs
            </span>
          </div>

          <div className="pt-4 sm:pt-0 sm:px-4">
            <span className="text-[10px] font-mono uppercase font-bold text-stone-400 block tracking-wider">
              Field Implementation
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#065F46] font-heading mt-1">
              86
            </div>
            <div className="text-xs font-semibold text-stone-700 mt-1">
              Solutions Deployed
            </div>
            <span className="text-[11px] text-[#065F46] font-medium block mt-0.5">
              In-Situ Operating Hardware
            </span>
          </div>

          <div className="pt-4 sm:pt-0 sm:px-4 col-span-2 sm:col-span-1">
            <span className="text-[10px] font-mono uppercase font-bold text-stone-400 block tracking-wider">
              Grassroots Reach
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] font-heading mt-1">
              1.2M
            </div>
            <div className="text-xs font-semibold text-stone-700 mt-1">
              Citizens Impacted
            </div>
            <span className="text-[11px] text-[#065F46] font-medium block mt-0.5">
              94.6% Community Approval
            </span>
          </div>

        </div>
      </div>

      {/* 4. MAIN VISUAL — JHARKHAND CHALLENGE MAP & SPATIAL MATRIX */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#C2410C] uppercase tracking-wider">
                GEOSPATIAL INTELLIGENCE LAYER
              </span>
              <span className="text-[10px] font-mono bg-stone-100 text-stone-600 px-2 py-0.5 rounded border border-stone-200">
                24 Districts
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-heading mt-1">
              Challenges Across Jharkhand
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-0.5 max-w-2xl">
              Heatmap telemetry communicates challenge density, critical priority thresholds, and domain concentration across all administrative blocks.
            </p>
          </div>

          {/* Map Legend */}
          <div className="flex items-center gap-4 bg-stone-50 px-4 py-2.5 rounded-xl border border-stone-200 text-xs">
            <span className="font-bold text-stone-600 text-[11px] uppercase tracking-wider">Intensity:</span>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-100 border border-emerald-300"></span>
              <span className="text-[11px] text-stone-600">Low</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-200 border border-amber-400"></span>
              <span className="text-[11px] text-stone-600">Moderate</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-orange-400 border border-orange-500"></span>
              <span className="text-[11px] text-stone-600">High</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-600 border border-red-700"></span>
              <span className="text-[11px] text-stone-900 font-bold">Critical</span>
            </div>
          </div>
        </div>

        {/* Selected District Deep-Dive Card */}
        {selectedDistrictData && (
          <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C2410C]" />
                <h3 className="text-lg font-bold text-[#0F172A] font-heading">
                  {selectedDistrictData.name} District Telemetry
                </h3>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                  selectedDistrictData.riskTier === 'Critical' 
                    ? 'bg-red-100 text-[#DC2626] border border-red-200' 
                    : selectedDistrictData.riskTier === 'High' 
                    ? 'bg-amber-100 text-[#C2410C] border border-amber-200' 
                    : 'bg-emerald-50 text-[#065F46] border border-emerald-200'
                }`}>
                  {selectedDistrictData.riskTier} Priority Tier
                </span>
              </div>
              <p className="text-xs text-stone-600">
                Division: <strong className="text-stone-800">{selectedDistrictData.division}</strong> · Lead Academic Node: <strong className="text-stone-800">{selectedDistrictData.primaryInstitute}</strong>
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-xs">
              <div className="p-2.5 rounded-lg bg-white border border-stone-200">
                <span className="text-[10px] font-mono uppercase text-stone-400 block font-bold">Total Challenges</span>
                <span className="text-base font-extrabold text-[#0F172A]">{selectedDistrictData.challengesCount}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-stone-200">
                <span className="text-[10px] font-mono uppercase text-stone-400 block font-bold">Critical</span>
                <span className="text-base font-extrabold text-[#DC2626]">{selectedDistrictData.criticalCount}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-stone-200">
                <span className="text-[10px] font-mono uppercase text-stone-400 block font-bold">Top Domain</span>
                <span className="text-xs font-bold text-stone-800 truncate block mt-0.5" title={selectedDistrictData.leadDomain}>
                  {selectedDistrictData.leadDomain.split('&')[0]}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-stone-200">
                <span className="text-[10px] font-mono uppercase text-stone-400 block font-bold">Active Projects</span>
                <span className="text-base font-extrabold text-[#065F46]">{selectedDistrictData.deployedSolutions + 3}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-stone-200 col-span-2 sm:col-span-1">
                <span className="text-[10px] font-mono uppercase text-stone-400 block font-bold">People Affected</span>
                <span className="text-base font-extrabold text-[#0F172A]">{selectedDistrictData.citizensImpacted}</span>
              </div>
            </div>
          </div>
        )}

        {/* Jharkhand Map Visual Container */}
        <div className="border border-stone-200 rounded-xl overflow-hidden p-2 bg-[#FAF9F5]">
          <JharkhandMap
            selectedDistrict={selectedDistrictFilter}
            onSelectDistrict={(dist) => setSelectedDistrictFilter(dist)}
          />
        </div>
      </section>

      {/* 5. AI ALERTS: SAMADHAN AI · EARLY SIGNALS */}
      <section className="bg-[#0F172A] rounded-2xl p-6 sm:p-8 text-white shadow-md border border-stone-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <Cpu className="w-5 h-5 text-[#EA580C]" />
            <h2 className="text-xl font-bold font-heading text-white tracking-tight">
              SAMADHAN AI · EARLY SIGNALS
            </h2>
          </div>
          <span className="text-[10px] font-mono bg-stone-800 text-[#F59E0B] px-3 py-1 rounded-md border border-stone-700">
            Automated Semantic Clustering & Spatial Anomaly Radar
          </span>
        </div>

        <p className="text-xs text-stone-300 max-w-3xl leading-relaxed">
          The intelligence layer continuously synthesizes incoming citizen reports across adjacent Panchayats to flag emerging trends before they escalate into statewide civic emergencies.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {aiEarlySignals.map((sig) => (
            <div key={sig.id} className="p-5 rounded-xl bg-stone-900 border border-stone-800 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${sig.severityColor}`}>
                    {sig.severity} SEVERITY
                  </span>
                  <span className="text-[11px] font-mono text-stone-400">
                    {sig.time}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-white font-heading leading-snug">
                  "{sig.title}"
                </h3>

                <div className="text-xs text-stone-300 flex items-center gap-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#EA580C]" />
                  <span>District: <strong className="text-white">{sig.district}</strong></span>
                </div>

                <div className="p-3 rounded-lg bg-stone-950/80 border border-stone-800 text-xs text-stone-300 leading-relaxed">
                  <span className="font-bold text-[#F59E0B] block text-[10px] uppercase font-mono mb-0.5">AI Recommendation</span>
                  {sig.recommendation}
                </div>
              </div>

              <div className="pt-2 border-t border-stone-800 flex items-center justify-between">
                <span className="text-[10px] text-stone-400 font-mono">
                  Autonomous Triage Model v3.8
                </span>
                <button
                  onClick={() => {
                    if (sig.districtTarget !== 'All') setSelectedDistrictFilter(sig.districtTarget);
                    if (sig.domainTarget !== 'All') setSelectedDomainFilter(sig.domainTarget);
                    // scroll to action queue
                    const el = document.getElementById('government-action-queue-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>{sig.actionLabel}</span>
                  <ArrowRight className="w-3 h-3 text-[#EA580C]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Two-Column Middle Section: Emerging Challenges & Challenges By Domain */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left (7 Cols): EMERGING CHALLENGES */}
        <div className="lg:col-span-7 space-y-8">
          
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-6">
            <div className="pb-3 border-b border-stone-200">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C2410C]">
                COMMUNITY CONCENTRATION RADAR
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] font-heading mt-0.5">
                EMERGING CHALLENGES
              </h2>
              <p className="text-xs text-stone-600 mt-0.5">
                Problems showing unusual growth or community concentration across adjacent districts.
              </p>
            </div>

            <div className="divide-y divide-stone-100">
              {emergingTrends.map((trend, idx) => (
                <div key={idx} className="py-4 first:pt-0 last:pb-0 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#0F172A] font-heading hover:text-[#C2410C] cursor-pointer"
                        onClick={() => {
                          setSelectedDistrictFilter(trend.district);
                          setSelectedDomainFilter(trend.domain.split(' ')[0]);
                        }}
                      >
                        {trend.domain}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-stone-100 text-stone-700 border border-stone-200">
                        📍 {trend.district}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-xs font-mono font-extrabold bg-red-50 text-[#DC2626] border border-red-200">
                        {trend.growth}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono border ${trend.priorityColor}`}>
                        {trend.priority}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {trend.detail}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-stone-500 pt-0.5">
                    <span>👥 Impact Radius: <strong className="text-stone-800">{trend.peopleAffected}</strong></span>
                    <button 
                      onClick={() => {
                        setSelectedDistrictFilter(trend.district);
                        const el = document.getElementById('government-action-queue-section');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-xs font-semibold text-[#0F172A] hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <span>Filter Queue</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* PROJECT LIFECYCLE: WHERE ARE PROJECTS IN THE PIPELINE? */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-6">
            <div className="pb-3 border-b border-stone-200">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#065F46]">
                PIPELINE CONVERSION METRICS
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] font-heading mt-0.5">
                WHERE ARE PROJECTS IN THE PIPELINE?
              </h2>
              <p className="text-xs text-stone-600 mt-0.5">
                Tracking conversion efficiency from grassroots citizen intake to validated institutional deployments.
              </p>
            </div>

            {/* Horizontal Lifecycle Visualization */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 text-center">
              
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="text-[10px] font-mono font-bold text-stone-400 uppercase">01 Reported</span>
                <div className="text-2xl font-extrabold text-[#0F172A] font-heading">2,840</div>
                <div className="text-[11px] text-stone-500">Citizen Submissions</div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="text-[10px] font-mono font-bold text-stone-400 uppercase">02 Review</span>
                <div className="text-2xl font-extrabold text-[#C2410C] font-heading">1,284</div>
                <div className="text-[11px] text-stone-500">Under Review</div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="text-[10px] font-mono font-bold text-stone-400 uppercase">03 Validated</span>
                <div className="text-2xl font-extrabold text-[#065F46] font-heading">620</div>
                <div className="text-[11px] text-stone-500">Gov Cleared</div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="text-[10px] font-mono font-bold text-stone-400 uppercase">04 Active</span>
                <div className="text-2xl font-extrabold text-[#0F172A] font-heading">426</div>
                <div className="text-[11px] text-stone-500">Active Projects</div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="text-[10px] font-mono font-bold text-stone-400 uppercase">05 Prototype</span>
                <div className="text-2xl font-extrabold text-stone-800 font-heading">180</div>
                <div className="text-[11px] text-stone-500">Lab Bench Prototypes</div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="text-[10px] font-mono font-bold text-stone-400 uppercase">06 Pilot</span>
                <div className="text-2xl font-extrabold text-[#C2410C] font-heading">92</div>
                <div className="text-[11px] text-stone-500">Field Pilots</div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1 col-span-2 sm:col-span-1">
                <span className="text-[10px] font-mono font-bold text-[#065F46] uppercase">07 Deployed</span>
                <div className="text-2xl font-extrabold text-[#065F46] font-heading">86</div>
                <div className="text-[11px] text-emerald-800 font-bold">Solutions Deployed</div>
              </div>

            </div>

            {/* Conversion progress visual bar */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs text-stone-500 font-medium">
                <span>Citizen Intake (2,840)</span>
                <span className="font-bold text-[#065F46]">Deployed Solutions (86) · 3.03% End-to-End Statewide Conversion</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-stone-100 overflow-hidden flex">
                <div className="h-full bg-stone-300" style={{ width: '45%' }} title="Reported & Review"></div>
                <div className="h-full bg-amber-400" style={{ width: '22%' }} title="Validated"></div>
                <div className="h-full bg-[#0F172A]" style={{ width: '18%' }} title="Active Teams"></div>
                <div className="h-full bg-[#C2410C]" style={{ width: '9%' }} title="Prototypes & Pilots"></div>
                <div className="h-full bg-[#065F46]" style={{ width: '6%' }} title="Deployed Solutions"></div>
              </div>
            </div>
          </section>

        </div>

        {/* Right (5 Cols): CHALLENGES BY DOMAIN & MONTHLY TREND */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* CHALLENGES BY DOMAIN */}
          <section className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs space-y-5">
            <div className="pb-3 border-b border-stone-200">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400">
                DISTRIBUTION METRICS
              </span>
              <h2 className="text-xl font-bold text-[#0F172A] font-heading mt-0.5">
                CHALLENGES BY DOMAIN
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Volume share and quarterly velocity across all 10 state problem categories.
              </p>
            </div>

            <div className="space-y-3.5">
              {domainIntelligence.map((dm) => (
                <div key={dm.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span 
                      className="font-bold text-stone-800 hover:text-[#C2410C] cursor-pointer flex items-center gap-1.5"
                      onClick={() => setSelectedDomainFilter(dm.name)}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: dm.color }}></span>
                      {dm.name}
                    </span>
                    <div className="flex items-center gap-2 font-mono text-[11px]">
                      <span className="font-extrabold text-[#0F172A]">{dm.count.toLocaleString()}</span>
                      <span className="text-stone-400">({dm.percentage}%)</span>
                      <span className={`font-bold ${dm.trend.includes('↑') ? 'text-[#065F46]' : 'text-stone-400'}`}>
                        {dm.trend}
                      </span>
                    </div>
                  </div>

                  <div className="w-full h-1.5 rounded-full bg-stone-100 overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500" 
                      style={{ width: `${dm.percentage * 4}%`, backgroundColor: dm.color }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* MONTHLY TREND: Challenge Reporting Trend */}
          <section className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-200">
              <div>
                <h3 className="text-base font-bold text-[#0F172A] font-heading">
                  Challenge Reporting Trend
                </h3>
                <span className="text-xs text-stone-500">Last 12 Months Intake Velocity</span>
              </div>

              {/* Chart Domain Filter */}
              <select
                value={chartDomainFilter}
                onChange={(e) => setChartDomainFilter(e.target.value)}
                className="px-2.5 py-1 rounded-lg border border-stone-200 text-xs font-semibold bg-stone-50 text-stone-800 focus:outline-hidden"
              >
                <option value="All Domains">All Domains</option>
                <option value="Water">Water</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Environment">Environment</option>
              </select>
            </div>

            {/* Line Chart / Histogram Presentation */}
            <div className="pt-2">
              <div className="h-44 w-full flex items-end gap-1 sm:gap-2 px-1">
                {activeSeries.map((val, idx) => {
                  const heightPercent = Math.round((val / maxVal) * 100);
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative">
                      {/* Tooltip on Hover */}
                      <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0F172A] text-white text-[10px] font-mono px-1.5 py-0.5 rounded pointer-events-none whitespace-nowrap z-20 shadow-xs">
                        {val} reports
                      </div>

                      <div className="w-full bg-stone-100 rounded-t-sm h-36 flex items-end">
                        <div 
                          className="w-full bg-[#0F172A] group-hover:bg-[#C2410C] transition-colors rounded-t-sm"
                          style={{ height: `${heightPercent}%` }}
                        ></div>
                      </div>

                      <span className="text-[10px] font-mono text-stone-400">
                        {months[idx]}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between items-center text-[11px] text-stone-500 pt-3 border-t border-stone-100 font-mono">
                <span>Oct 2023: {activeSeries[0]} / mo</span>
                <span className="text-[#065F46] font-bold">Sep 2024: {activeSeries[11]} / mo (3.1x Intake Acceleration)</span>
              </div>
            </div>
          </section>

        </div>

      </div>

      {/* 6. UNIVERSITY RESPONSE & INDUSTRY COLLABORATION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* UNIVERSITY RESPONSE (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-200">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#065F46]">
                ACADEMIC R&D COMMITMENT
              </span>
              <h3 className="text-xl font-bold text-[#0F172A] font-heading mt-0.5">
                UNIVERSITY RESPONSE
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">
                Top participating institutions, challenge adoption rates, and active lab solutions.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-stone-500 bg-stone-100 px-2.5 py-1 rounded">
              5 Lead State Universities
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-200 text-stone-400 uppercase font-bold text-[10px] tracking-wider font-mono">
                  <th className="py-2.5 px-2">Institution</th>
                  <th className="py-2.5 px-2 text-center">Received</th>
                  <th className="py-2.5 px-2 text-center">Accepted</th>
                  <th className="py-2.5 px-2 text-center">Active Projects</th>
                  <th className="py-2.5 px-2 text-center">Solutions</th>
                  <th className="py-2.5 px-2 text-right">Response Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-800">
                {universityData.map((uni, idx) => (
                  <tr key={idx} className="hover:bg-stone-50 transition-colors">
                    <td className="py-3 px-2">
                      <div className="font-bold text-[#0F172A] text-xs">{uni.name}</div>
                      <div className="text-[10px] text-stone-500">{uni.focus}</div>
                    </td>
                    <td className="py-3 px-2 text-center font-mono">{uni.received}</td>
                    <td className="py-3 px-2 text-center font-mono font-semibold text-[#065F46]">{uni.accepted}</td>
                    <td className="py-3 px-2 text-center font-mono font-bold text-[#0F172A]">{uni.active}</td>
                    <td className="py-3 px-2 text-center font-mono font-bold text-[#C2410C]">{uni.solutions}</td>
                    <td className="py-3 px-2 text-right">
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-50 text-[#065F46] border border-emerald-200">
                        {uni.responseRate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-[11px] text-stone-400 italic">
            * Verified institutional participation records logged via University Innovation Portals.
          </div>
        </div>

        {/* INDUSTRY COLLABORATION (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-5">
          <div className="pb-3 border-b border-stone-200">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C2410C]">
              CSR & COMMERCIAL COALITION
            </span>
            <h3 className="text-xl font-bold text-[#0F172A] font-heading mt-0.5">
              INDUSTRY COLLABORATION
            </h3>
            <p className="text-xs text-stone-600 mt-0.5">
              Corporate & startup participation across mentoring, capital pledges, and hardware testbeds.
            </p>
          </div>

          {/* Industry Big Metric */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-stone-400">Total Enrolled</span>
              <div className="text-3xl font-extrabold text-[#0F172A] font-heading">
                {industryStats.total}
              </div>
              <div className="text-xs font-semibold text-stone-700">Industry & CSR Partners</div>
            </div>
            <Building2 className="w-10 h-10 text-[#C2410C] opacity-80" />
          </div>

          {/* Category Breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {industryStats.categories.map((cat, i) => {
              const IconComp = cat.icon;
              return (
                <div key={i} className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-center space-y-1">
                  <IconComp className="w-4 h-4 mx-auto text-stone-600" />
                  <div className="text-lg font-extrabold text-[#0F172A] font-heading">{cat.count}</div>
                  <div className="text-[11px] font-semibold text-stone-600">{cat.label}</div>
                </div>
              );
            })}
          </div>

          <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-600 leading-relaxed">
            <span className="font-bold text-stone-800">Lead Corporate Collaborators:</span> Tata Steel Foundation, Coal India DMFT Council, EcoSense Technologies, Jindal Steel CSR.
          </div>
        </div>

      </div>

      {/* 7. GOVERNMENT ACTION QUEUE: ACTION REQUIRED */}
      <section 
        id="government-action-queue-section" 
        className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono bg-red-100 text-[#DC2626] border border-red-200">
                OPERATIONAL MANDATE
              </span>
              <span className="text-xs font-mono text-stone-400">State Nodal Desk</span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#0F172A] font-heading mt-1">
              ACTION REQUIRED
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
              High-priority challenges and delayed milestones requiring immediate departmental review and clearance.
            </p>
          </div>

          {/* Action Queue Sub-tabs */}
          <div className="flex flex-wrap items-center gap-1 bg-stone-100 p-1 rounded-xl text-xs">
            <button
              onClick={() => setActiveQueueTab('validation')}
              className={`px-3 py-1.5 rounded-lg font-semibold cursor-pointer transition-colors ${
                activeQueueTab === 'validation' ? 'bg-[#0F172A] text-white shadow-2xs' : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              Awaiting Validation (12)
            </button>
            <button
              onClick={() => setActiveQueueTab('assignment')}
              className={`px-3 py-1.5 rounded-lg font-semibold cursor-pointer transition-colors ${
                activeQueueTab === 'assignment' ? 'bg-[#0F172A] text-white shadow-2xs' : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              Awaiting University (8)
            </button>
            <button
              onClick={() => setActiveQueueTab('delayed')}
              className={`px-3 py-1.5 rounded-lg font-semibold cursor-pointer transition-colors ${
                activeQueueTab === 'delayed' ? 'bg-[#0F172A] text-white shadow-2xs' : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              Delayed Milestones (3)
            </button>
            <button
              onClick={() => setActiveQueueTab('pilotApproval')}
              className={`px-3 py-1.5 rounded-lg font-semibold cursor-pointer transition-colors ${
                activeQueueTab === 'pilotApproval' ? 'bg-[#0F172A] text-white shadow-2xs' : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              Pilot Approval (5)
            </button>
          </div>
        </div>

        {/* Tab 1: Awaiting Validation */}
        {activeQueueTab === 'validation' && (
          <div className="divide-y divide-stone-100">
            {filteredQueueChallenges.filter(c => !c.validatedByGov).length === 0 ? (
              <div className="p-8 text-center text-xs text-stone-500">
                No challenges awaiting validation under current filter selection.
              </div>
            ) : (
              filteredQueueChallenges.filter(c => !c.validatedByGov).slice(0, 5).map((ch) => {
                const isCrit = ch.priorityLevel === 'Critical';
                return (
                  <div key={ch.id} className="py-4 first:pt-0 last:pb-0 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-1.5 max-w-3xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                          isCrit ? 'bg-red-100 text-[#DC2626] border border-red-200' : 'bg-amber-100 text-[#C2410C] border border-amber-200'
                        }`}>
                          {ch.priorityLevel.toUpperCase()}
                        </span>
                        <span className="text-xs font-mono font-bold text-stone-500">
                          {ch.trackingCode}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-stone-100 text-stone-800 border border-stone-200">
                          {ch.domain}
                        </span>
                        <span className="text-xs text-stone-500">
                          📍 {ch.location.district} ({ch.location.block})
                        </span>
                        <span className="text-[11px] font-mono text-stone-400">
                          ⏰ 8 days awaiting validation
                        </span>
                      </div>

                      <h4 
                        onClick={() => onSelectChallenge(ch)}
                        className="text-base font-bold text-[#0F172A] hover:text-[#C2410C] cursor-pointer transition-colors font-heading"
                      >
                        {ch.title}
                      </h4>
                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {ch.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0 self-end lg:self-center">
                      <button
                        onClick={() => onSelectChallenge(ch)}
                        className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 cursor-pointer"
                      >
                        Review
                      </button>
                      <button
                        onClick={() => handleValidate(ch)}
                        className="px-4.5 py-2 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold shadow-2xs cursor-pointer flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5 text-[#34D399]" />
                        <span>Validate & Fund</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Tab 2: Awaiting University */}
        {activeQueueTab === 'assignment' && (
          <div className="divide-y divide-stone-100">
            <div className="py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-[#C2410C] border border-amber-200">
                    HIGH PRIORITY
                  </span>
                  <span className="text-xs font-mono font-bold text-stone-600">JH-SAN-0091</span>
                  <span className="text-xs text-stone-500">📍 Dumka (Shikaripara Block)</span>
                  <span className="text-[11px] font-mono text-stone-400">⏰ 6 days awaiting university</span>
                </div>
                <h4 className="text-base font-bold text-[#0F172A] font-heading">
                  High Silica Dust Exposure from Stone Crushing Units
                </h4>
                <p className="text-xs text-stone-600">
                  Worker settlements reporting chronic respiratory symptoms without localized dust precipitation or personal PPE.
                </p>
              </div>
              <button 
                onClick={() => setValidatedNotification('Auto-dispatch sent to IIT (ISM) Dhanbad Mining Environmental Lab.')}
                className="px-4 py-2 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold shrink-0 cursor-pointer"
              >
                Auto-Assign to IIT (ISM)
              </button>
            </div>

            <div className="py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-[#C2410C] border border-amber-200">
                    HIGH PRIORITY
                  </span>
                  <span className="text-xs font-mono font-bold text-stone-600">JH-PAL-0104</span>
                  <span className="text-xs text-stone-500">📍 Palamu (Chainpur Block)</span>
                  <span className="text-[11px] font-mono text-stone-400">⏰ 5 days awaiting university</span>
                </div>
                <h4 className="text-base font-bold text-[#0F172A] font-heading">
                  Severe Seasonal Borewell Depletion & Fluoride Concentration
                </h4>
                <p className="text-xs text-stone-600">
                  Pre-summer water table plummeting below 140 meters with fluoride levels exceeding 3.8 mg/L.
                </p>
              </div>
              <button 
                onClick={() => setValidatedNotification('Auto-dispatch sent to BIT Mesra Civil & Environmental Engineering.')}
                className="px-4 py-2 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold shrink-0 cursor-pointer"
              >
                Auto-Assign to BIT Mesra
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Delayed Milestones */}
        {activeQueueTab === 'delayed' && (
          <div className="divide-y divide-stone-100">
            <div className="py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-100 text-[#DC2626] border border-red-200">
                    DELAYED (18 DAYS OVERDUE)
                  </span>
                  <span className="text-xs text-stone-500">Lead: BIT Mesra R&D Team Gamma</span>
                </div>
                <h4 className="text-base font-bold text-[#0F172A] font-heading">
                  Automated Cold-Chain Thermal Sensor Deployment (Khunti)
                </h4>
                <p className="text-xs text-stone-600">
                  Milestone 3 (Microcontroller Firmware Validation) is overdue due to delayed component delivery.
                </p>
              </div>
              <button 
                onClick={() => setValidatedNotification('Expedited hardware clearance issued to Jharkhand Electronics Mission.')}
                className="px-4 py-2 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-semibold shrink-0 cursor-pointer"
              >
                Issue Nodal Notice
              </button>
            </div>
          </div>
        )}

        {/* Tab 4: Pilot Approval */}
        {activeQueueTab === 'pilotApproval' && (
          <div className="divide-y divide-stone-100">
            <div className="py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-[#065F46] border border-emerald-200">
                    BENCH PROTOTYPE COMPLETED
                  </span>
                  <span className="text-xs text-stone-500">PHED & Forest Division Joint Clearance</span>
                </div>
                <h4 className="text-base font-bold text-[#0F172A] font-heading">
                  AI Early Warning Siren Poles for Porahat Forest Fringe
                </h4>
                <p className="text-xs text-stone-600">
                  Awaiting District Forest Officer (DFO) and Panchayati Raj clearance for 8 pole installations.
                </p>
              </div>
              <button 
                onClick={() => setValidatedNotification('Official Field Testing Sanction signed and sent to West Singhbhum DFO.')}
                className="px-4 py-2 rounded-xl bg-[#065F46] hover:bg-[#044E38] text-white text-xs font-bold shrink-0 cursor-pointer"
              >
                Approve Field Pilot Sanction
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 8. IMPACT SNAPSHOT: STATEWIDE IMPACT */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-6">
        <div className="pb-3 border-b border-stone-200">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#065F46]">
            ACCOUNTABILITY & GROUND VERIFICATION
          </span>
          <h2 className="text-2xl font-extrabold text-[#0F172A] font-heading mt-0.5">
            STATEWIDE IMPACT
          </h2>
          <p className="text-xs text-stone-600 mt-0.5">
            Transparent breakdown distinguishing between verified government field assays, active pilot metrics, and modeled projections.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
          
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
            <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.2 rounded bg-stone-200 text-stone-700 inline-block">
              Estimated & Verified
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-heading mt-1">
              1.2M
            </div>
            <div className="text-xs font-semibold text-stone-700">Citizens Impacted</div>
            <div className="text-[10px] text-stone-500">Across 24 Districts</div>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
            <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.2 rounded bg-emerald-100 text-[#065F46] inline-block">
              Verified
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#065F46] font-heading mt-1">
              68,000
            </div>
            <div className="text-xs font-semibold text-stone-700">Farmers Benefited</div>
            <div className="text-[10px] text-stone-500">Yield & Crop Protected</div>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
            <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.2 rounded bg-emerald-100 text-[#065F46] inline-block">
              Verified
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0284C7] font-heading mt-1">
              14M L
            </div>
            <div className="text-xs font-semibold text-stone-700">Water Saved</div>
            <div className="text-[10px] text-stone-500">In Pilot Micro-Catchments</div>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
            <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.2 rounded bg-amber-100 text-[#C2410C] inline-block">
              Pilot Result
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#C2410C] font-heading mt-1">
              18,400 T
            </div>
            <div className="text-xs font-semibold text-stone-700">Waste Reduced</div>
            <div className="text-[10px] text-stone-500">Mining & Urban Slag</div>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
            <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.2 rounded bg-stone-200 text-stone-700 inline-block">
              Estimated
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-heading mt-1">
              2,840
            </div>
            <div className="text-xs font-semibold text-stone-700">Jobs Supported</div>
            <div className="text-[10px] text-stone-500">Rural Hardware Technicians</div>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
            <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.2 rounded bg-purple-100 text-[#7C3AED] inline-block">
              Registered
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#7C3AED] font-heading mt-1">
              42
            </div>
            <div className="text-xs font-semibold text-stone-700">Patents / IP Outcomes</div>
            <div className="text-[10px] text-stone-500">University Innovations</div>
          </div>

        </div>

        <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 flex items-start gap-2">
          <Info className="w-4 h-4 text-[#C2410C] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-stone-800">State Audit Policy:</strong> Verified figures reflect third-party audits performed by the Comptroller & State Nodal Evaluation Agency. Estimated numbers represent algorithmic aggregations of projected demographic benefit radii.
          </p>
        </div>
      </section>

    </div>
  );
};
