import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Users, 
  Sparkles, 
  ArrowRight, 
  AlertTriangle, 
  X, 
  Map, 
  ChevronRight, 
  ShieldCheck, 
  Radio, 
  Layers,
  Check,
  Building2,
  Cpu,
  Eye,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { Challenge, Domain, PriorityLevel, ChallengeStatus } from '../types';
import { JHARKHAND_DISTRICTS } from '../data/mockData';
import { JharkhandMap } from './JharkhandMap';

interface ExploreChallengesPageProps {
  challenges: Challenge[];
  onSelectChallenge: (challenge: Challenge) => void;
  onReportClick: () => void;
}

export const ExploreChallengesPage: React.FC<ExploreChallengesPageProps> = ({
  challenges,
  onSelectChallenge,
  onReportClick
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [selectedPriority, setSelectedPriority] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedSDG, setSelectedSDG] = useState<number | 'All'>('All');
  const [selectedExpertise, setSelectedExpertise] = useState<string>('All');
  const [showMap, setShowMap] = useState<boolean>(false);
  const [showFiltersDrawer, setShowFiltersDrawer] = useState<boolean>(false);

  // Categories requested
  const domainCategories: (Domain | 'All')[] = [
    'All',
    'Agriculture',
    'Water',
    'Healthcare',
    'Education',
    'Environment',
    'Energy',
    'Urban Infrastructure',
    'Accessibility',
    'Public Administration',
    'Rural Livelihoods'
  ];

  // Quick search keywords
  const searchExamples = ['water', 'agriculture', 'Ranchi', 'AI', 'healthcare'];

  // All unique required expertise items
  const allExpertise = useMemo(() => {
    const set = new Set<string>();
    challenges.forEach(ch => {
      ch.requiredExpertise.forEach(exp => set.add(exp));
    });
    return Array.from(set).sort();
  }, [challenges]);

  const sdgs = [
    { num: 1, label: 'SDG 1: No Poverty' },
    { num: 2, label: 'SDG 2: Zero Hunger' },
    { num: 3, label: 'SDG 3: Good Health' },
    { num: 4, label: 'SDG 4: Quality Education' },
    { num: 6, label: 'SDG 6: Clean Water' },
    { num: 7, label: 'SDG 7: Clean Energy' },
    { num: 9, label: 'SDG 9: Industry & Innovation' },
    { num: 11, label: 'SDG 11: Sustainable Cities' },
    { num: 13, label: 'SDG 13: Climate Action' },
    { num: 15, label: 'SDG 15: Life on Land' }
  ];

  // District challenge activity summary
  const districtActivity = [
    { name: 'Ranchi', count: 1420, active: 14, tag: 'Urban & Agro-Tech' },
    { name: 'East Singhbhum (Jamshedpur)', count: 980, active: 11, tag: 'Industrial Ecology' },
    { name: 'West Singhbhum', count: 740, active: 8, tag: 'Wildlife & Forest Buffer' },
    { name: 'Dhanbad', count: 890, active: 9, tag: 'Mining & Air Quality' },
    { name: 'Bokaro', count: 640, active: 6, tag: 'Hydrology & Energy' },
    { name: 'Hazaribagh', count: 560, active: 5, tag: 'Soil & Agriculture' },
    { name: 'Dumka', count: 520, active: 4, tag: 'Tribal Lac & Processing' }
  ];

  // Filter logic
  const filteredChallenges = useMemo(() => {
    return challenges.filter((ch) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = (ch.title || '').toLowerCase().includes(q);
        const matchesDesc = (ch.description || '').toLowerCase().includes(q);
        const matchesDistrict = (ch.location?.district || '').toLowerCase().includes(q);
        const matchesBlock = (ch.location?.block || '').toLowerCase().includes(q);
        const matchesVillage = (ch.location?.villageOrCity || '').toLowerCase().includes(q);
        const matchesTracking = (ch.trackingCode || '').toLowerCase().includes(q);
        const matchesDomain = (ch.domain || '').toLowerCase().includes(q);
        const matchesExpertise = (ch.requiredExpertise || []).some(exp => (exp || '').toLowerCase().includes(q));

        if (!matchesTitle && !matchesDesc && !matchesDistrict && !matchesBlock && !matchesVillage && !matchesTracking && !matchesDomain && !matchesExpertise) {
          return false;
        }
      }

      // Domain
      if (selectedDomain !== 'All' && ch.domain !== selectedDomain) {
        return false;
      }

      // District
      if (selectedDistrict !== 'All' && !(ch.location?.district || '').toLowerCase().includes(selectedDistrict.toLowerCase())) {
        return false;
      }

      // Priority
      if (selectedPriority !== 'All' && ch.priorityLevel !== selectedPriority) {
        return false;
      }

      // Status
      if (selectedStatus !== 'All') {
        const normStatus = (ch.status || '').toLowerCase();
        const targetStatus = selectedStatus.toLowerCase();
        if (targetStatus === 'reported' && !normStatus.includes('review') && !normStatus.includes('reported')) return false;
        if (targetStatus === 'validated' && !normStatus.includes('validated')) return false;
        if (targetStatus === 'university matched' && !normStatus.includes('assigned') && !normStatus.includes('matched')) return false;
        if (targetStatus === 'team formed' && !normStatus.includes('team')) return false;
        if (targetStatus === 'prototype' && !normStatus.includes('prototyping')) return false;
        if (targetStatus === 'pilot' && !normStatus.includes('pilot')) return false;
        if (targetStatus === 'deployed' && !normStatus.includes('deployed')) return false;
        if (!['reported', 'validated', 'university matched', 'team formed', 'prototype', 'pilot', 'deployed'].includes(targetStatus) && ch.status !== selectedStatus) {
          return false;
        }
      }

      // SDG
      if (selectedSDG !== 'All' && !ch.sdgGoals.includes(Number(selectedSDG))) {
        return false;
      }

      // Expertise
      if (selectedExpertise !== 'All' && !ch.requiredExpertise.includes(selectedExpertise)) {
        return false;
      }

      return true;
    });
  }, [challenges, searchQuery, selectedDomain, selectedDistrict, selectedPriority, selectedStatus, selectedSDG, selectedExpertise]);

  // Check if featured challenge matches the current filter
  const featuredChallenge = useMemo(() => {
    return challenges.find(c => c.id === 'ch-elephant') || challenges[0];
  }, [challenges]);

  const isFeaturedInFiltered = useMemo(() => {
    return filteredChallenges.some(c => c.id === featuredChallenge?.id);
  }, [filteredChallenges, featuredChallenge]);

  // Non-featured challenges to list in the grid
  const listChallenges = useMemo(() => {
    if (isFeaturedInFiltered) {
      return filteredChallenges.filter(c => c.id !== featuredChallenge?.id);
    }
    return filteredChallenges;
  }, [filteredChallenges, isFeaturedInFiltered, featuredChallenge]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedDomain('All');
    setSelectedDistrict('All');
    setSelectedPriority('All');
    setSelectedStatus('All');
    setSelectedSDG('All');
    setSelectedExpertise('All');
  };

  const hasActiveFilters = 
    searchQuery !== '' || 
    selectedDomain !== 'All' || 
    selectedDistrict !== 'All' || 
    selectedPriority !== 'All' || 
    selectedStatus !== 'All' || 
    selectedSDG !== 'All' ||
    selectedExpertise !== 'All';

  // Helper for lifecycle progress mapping
  const getLifecycleStage = (status: ChallengeStatus) => {
    switch (status) {
      case 'Under Review':
        return { label: 'Under Review', step: 2, total: 8, color: 'text-stone-700 bg-stone-100 border-stone-200' };
      case 'Government Validated':
        return { label: 'Gov Validated', step: 3, total: 8, color: 'text-[#065F46] bg-emerald-50 border-emerald-200' };
      case 'University Assigned':
        return { label: 'University Matched', step: 4, total: 8, color: 'text-[#0F172A] bg-stone-100 border-stone-300' };
      case 'Team Formed':
        return { label: 'Team Formed', step: 5, total: 8, color: 'text-indigo-900 bg-indigo-50 border-indigo-200' };
      case 'In Prototyping':
        return { label: 'Prototype Lab', step: 6, total: 8, color: 'text-[#C2410C] bg-amber-50 border-amber-200' };
      case 'Pilot Testing':
        return { label: 'Pilot Testing', step: 7, total: 8, color: 'text-[#C2410C] bg-amber-50 border-amber-200' };
      case 'Deployed & Validated':
        return { label: 'Deployed & Audited', step: 8, total: 8, color: 'text-[#065F46] bg-emerald-50 border-emerald-200' };
      default:
        return { label: status, step: 1, total: 8, color: 'text-stone-700 bg-stone-100 border-stone-200' };
    }
  };

  // Helper for AI match rationale bullet points
  const getAIMatchPoints = (ch: Challenge) => {
    if (ch.id === 'ch-elephant') {
      return [
        'AI/ML Computer Vision lab at BIT Mesra',
        'IoT nocturnal motion sensing research',
        'Environmental & wildlife engineering',
        'Field-proven rural innovation track record'
      ];
    }
    if (ch.id === 'ch-arsenic') {
      return [
        'Chemical Engineering & Water Purity Lab at IIT (ISM)',
        'Heavy metal adsorption spectrometry',
        'Groundwater hydrology field mapping',
        'Community filtration prototype experience'
      ];
    }
    if (ch.id === 'ch-lac') {
      return [
        'Thermal engineering & Phase Change Materials (BIT Mesra)',
        'Off-grid solar microgrid integration',
        'Birsa Agricultural University agro-forestry guidance',
        'Tribal cooperative cold-chain deployment'
      ];
    }
    if (ch.id === 'ch-maternal') {
      return [
        'Biomedical instrumentation at AIIMS Deoghar & BIT Mesra',
        'Low-bandwidth solar diagnostic kit design',
        'Tele-medicine rural edge protocol',
        'Anganwadi maternal health research unit'
      ];
    }
    if (ch.id === 'ch-coal') {
      return [
        'Mining engineering & aerosol physics at IIT (ISM) Dhanbad',
        'Real-time PM2.5/PM10 optical particle scrubbers',
        'Industrial fluid dynamics fogging nozzles',
        'Autonomous haulage dust telemetry'
      ];
    }
    // Generic fallback based on expertise
    return ch.requiredExpertise.slice(0, 4).map(exp => `${exp} departmental capabilities`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 bg-[#FAF9F5]">
      
      {/* Editorial Page Header */}
      <header className="pb-8 border-b border-stone-200">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono font-bold text-[#C2410C] uppercase tracking-wider">
                JHARKHAND'S OPEN CHALLENGE NETWORK
              </span>
              <span className="text-stone-300">|</span>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#065F46] text-[11px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#065F46] animate-pulse"></span>
                <span>12,840 challenges reported</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight font-heading">
              Problems Worth Solving.
            </h1>

            <p className="text-sm sm:text-base text-stone-600 font-normal leading-relaxed">
              Discover real societal challenges reported by communities across Jharkhand and find opportunities for research, innovation and collaboration.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              id="toggle-jharkhand-map-btn"
              onClick={() => setShowMap(!showMap)}
              className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-800 bg-white hover:bg-stone-50 font-semibold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
            >
              <Map className="w-4 h-4 text-[#C2410C]" />
              <span>{showMap ? 'Hide District Map' : 'Challenges Across Jharkhand'}</span>
            </button>

            <button
              id="explore-report-challenge-cta"
              onClick={onReportClick}
              className="px-5 py-2.5 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white font-bold text-xs shadow-2xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>+ Report Challenge</span>
            </button>
          </div>
        </div>
      </header>

      {/* Prominent Search Experience */}
      <section className="space-y-3">
        <div className="relative">
          <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input 
            type="text"
            id="challenge-marketplace-search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search challenges, locations, domains or expertise..."
            className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-stone-300 focus:border-[#0F172A] focus:ring-1 focus:ring-[#0F172A] text-sm text-[#0F172A] placeholder-stone-400 bg-white shadow-2xs outline-hidden transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Search Examples */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-stone-400 font-medium text-[11px]">Try searching:</span>
          {searchExamples.map((term) => (
            <button
              key={term}
              onClick={() => setSearchQuery(term)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-all cursor-pointer ${
                searchQuery.toLowerCase() === term.toLowerCase()
                  ? 'bg-[#0F172A] text-white border-[#0F172A]'
                  : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300 hover:bg-stone-50'
              }`}
            >
              "{term}"
            </button>
          ))}
        </div>
      </section>

      {/* Domain Navigation Area (Compact Domain Categories) */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono font-bold text-stone-400 uppercase tracking-wider">
            Explore By Domain
          </span>
          {selectedDomain !== 'All' && (
            <button
              onClick={() => setSelectedDomain('All')}
              className="text-xs text-[#C2410C] font-semibold hover:underline"
            >
              Show all domains
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none text-xs">
          {domainCategories.map((dom) => {
            const isSelected = selectedDomain === dom;
            return (
              <button
                key={dom}
                onClick={() => setSelectedDomain(dom)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0F172A] text-white shadow-2xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-400 hover:bg-stone-50'
                }`}
              >
                {dom === 'All' ? 'All Domains' : dom}
              </button>
            );
          })}
        </div>
      </section>

      {/* Refined Compact Filter System */}
      <section className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 shadow-2xs space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-stone-500" />
            <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wider font-mono">
              Refined Filters
            </span>
            {hasActiveFilters && (
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 font-semibold">
                {filteredChallenges.length} matches
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-[#C2410C] hover:text-[#9A3412] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                <span>Clear Filters</span>
              </button>
            )}
            <button
              onClick={() => setShowFiltersDrawer(!showFiltersDrawer)}
              className="sm:hidden text-xs text-stone-700 font-semibold flex items-center gap-1"
            >
              <span>{showFiltersDrawer ? 'Hide Filters' : 'More Filters'}</span>
              <ChevronDown className={`w-3.5 h-3.5 transform transition-transform ${showFiltersDrawer ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Filters Controls Row */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 text-xs ${showFiltersDrawer ? 'block' : 'hidden sm:grid'}`}>
          
          {/* District Filter */}
          <div>
            <label className="block text-[10px] font-bold text-stone-400 uppercase mb-1 font-mono">
              District
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs font-medium text-stone-800 bg-stone-50/50 hover:bg-white focus:bg-white focus:border-[#0F172A] outline-hidden transition-colors"
            >
              <option value="All">All 24 Districts</option>
              {JHARKHAND_DISTRICTS.map((dist) => (
                <option key={dist} value={dist}>{dist}</option>
              ))}
            </select>
          </div>

          {/* Priority Filter */}
          <div>
            <label className="block text-[10px] font-bold text-stone-400 uppercase mb-1 font-mono">
              Priority
            </label>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs font-medium text-stone-800 bg-stone-50/50 hover:bg-white focus:bg-white focus:border-[#0F172A] outline-hidden transition-colors"
            >
              <option value="All">All Priorities</option>
              <option value="Critical">Critical Priority</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>

          {/* Lifecycle Status Filter */}
          <div>
            <label className="block text-[10px] font-bold text-stone-400 uppercase mb-1 font-mono">
              Project Stage
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs font-medium text-stone-800 bg-stone-50/50 hover:bg-white focus:bg-white focus:border-[#0F172A] outline-hidden transition-colors"
            >
              <option value="All">All Stages</option>
              <option value="Reported">Reported / Under Review</option>
              <option value="Validated">Validated</option>
              <option value="University Matched">University Matched</option>
              <option value="Team Formed">Team Formed</option>
              <option value="Prototype">Prototype</option>
              <option value="Pilot">Pilot Testing</option>
              <option value="Deployed">Deployed</option>
            </select>
          </div>

          {/* Required Expertise Filter */}
          <div>
            <label className="block text-[10px] font-bold text-stone-400 uppercase mb-1 font-mono">
              Required Expertise
            </label>
            <select
              value={selectedExpertise}
              onChange={(e) => setSelectedExpertise(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs font-medium text-stone-800 bg-stone-50/50 hover:bg-white focus:bg-white focus:border-[#0F172A] outline-hidden transition-colors"
            >
              <option value="All">All Expertise Domains</option>
              {allExpertise.map((exp) => (
                <option key={exp} value={exp}>{exp}</option>
              ))}
            </select>
          </div>

          {/* SDG Filter */}
          <div>
            <label className="block text-[10px] font-bold text-stone-400 uppercase mb-1 font-mono">
              UN SDG Goal
            </label>
            <select
              value={selectedSDG}
              onChange={(e) => setSelectedSDG(e.target.value === 'All' ? 'All' : Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs font-medium text-stone-800 bg-stone-50/50 hover:bg-white focus:bg-white focus:border-[#0F172A] outline-hidden transition-colors"
            >
              <option value="All">All UN SDGs</option>
              {sdgs.map((sdg) => (
                <option key={sdg.num} value={sdg.num}>{sdg.label}</option>
              ))}
            </select>
          </div>

        </div>
      </section>

      {/* Challenges Across Jharkhand (Geographic Activity & Interactive Map) */}
      {showMap && (
        <section className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-stone-100">
            <div>
              <div className="flex items-center gap-2 text-stone-400 text-xs font-mono font-bold uppercase">
                <MapPin className="w-3.5 h-3.5 text-[#C2410C]" />
                <span>Geospatial Challenge Activity</span>
              </div>
              <h2 className="text-2xl font-bold text-[#0F172A] font-heading mt-1">
                Challenges Across Jharkhand
              </h2>
              <p className="text-xs text-stone-500 mt-1 max-w-2xl">
                Visualizing challenge density across all 24 administrative districts. Click on any district badge or on the interactive map to filter solutions in that region.
              </p>
            </div>

            {selectedDistrict !== 'All' && (
              <div className="flex items-center gap-2 bg-stone-100 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#0F172A]">
                <span>Active District Filter: <strong>{selectedDistrict}</strong></span>
                <button 
                  onClick={() => setSelectedDistrict('All')}
                  className="text-stone-400 hover:text-stone-700 ml-1"
                  title="Clear district filter"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* Quick District Density Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {districtActivity.map((d) => {
              const isSelected = (selectedDistrict || '').toLowerCase().includes((d.name || '').toLowerCase());
              return (
                <button
                  key={d.name}
                  onClick={() => setSelectedDistrict(isSelected ? 'All' : d.name)}
                  className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#0F172A] text-white border-[#0F172A]'
                      : 'bg-stone-50/60 border-stone-200 hover:border-stone-400 text-stone-800'
                  }`}
                >
                  <div className="text-xs font-bold truncate">{d.name.replace(' (Jamshedpur)', '')}</div>
                  <div className="text-[11px] font-mono mt-0.5 opacity-80">{d.count} reports</div>
                  <div className={`text-[10px] mt-1 font-semibold ${isSelected ? 'text-emerald-300' : 'text-[#065F46]'}`}>
                    ● {d.active} deployed
                  </div>
                </button>
              );
            })}
          </div>

          {/* The High-Precision Interactive Map */}
          <div className="pt-2">
            <JharkhandMap
              selectedDistrict={selectedDistrict}
              onSelectDistrict={(dist) => setSelectedDistrict(dist)}
            />
          </div>
        </section>
      )}

      {/* Featured Community Challenge (Prominent Editorial Hero Anchor) */}
      {isFeaturedInFiltered && featuredChallenge && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C2410C]"></span>
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#C2410C]">
                FEATURED COMMUNITY CHALLENGE
              </h2>
            </div>
            <span className="text-[11px] text-stone-400 font-mono">Spotlight Case Study</span>
          </div>

          <div 
            id="featured-challenge-card"
            className="bg-white rounded-2xl border border-stone-300 shadow-sm overflow-hidden hover:border-stone-400 transition-all"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              
              {/* Left Column: Editorial Information */}
              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                
                <div className="space-y-4">
                  {/* Eyebrow / Domain & Priority */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 rounded bg-[#0F172A] text-white text-[10px] font-mono font-bold uppercase tracking-wide">
                      {featuredChallenge.domain.toUpperCase()} · {featuredChallenge.location.district.toUpperCase()}
                    </span>
                    <span className="px-2.5 py-1 rounded bg-red-100 text-[#991B1B] text-[11px] font-bold tracking-wide border border-red-200/60">
                      CRITICAL PRIORITY · 94/100
                    </span>
                    <span className="px-2.5 py-1 rounded bg-amber-50 text-[#C2410C] text-[11px] font-bold border border-amber-200/60">
                      Current Stage: Pilot Testing
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-heading leading-tight">
                    {featuredChallenge.title}
                  </h3>

                  {/* Description excerpt */}
                  <p className="text-sm text-stone-600 leading-relaxed font-normal">
                    {featuredChallenge.description}
                  </p>

                  {/* Community Signal Strip */}
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/90 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-stone-800">
                        <Radio className="w-3.5 h-3.5 text-[#C2410C] animate-pulse" />
                        <span>COMMUNITY SIGNAL VERIFIED</span>
                      </div>
                      <span className="text-[11px] text-stone-400 font-mono">Panchayat Kiosk Audited</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-1 border-t border-stone-200/60 text-xs">
                      <div>
                        <span className="text-[10px] font-bold text-stone-400 uppercase block font-mono">Reports</span>
                        <strong className="text-sm text-[#0F172A]">{featuredChallenge.similarReportsCount} similar reports</strong>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-stone-400 uppercase block font-mono">Spread</span>
                        <strong className="text-sm text-[#0F172A]">8 fringe villages</strong>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-stone-400 uppercase block font-mono">Impact</span>
                        <strong className="text-sm text-[#065F46]">{featuredChallenge.affectedPeople.toLocaleString()} people affected</strong>
                      </div>
                    </div>
                    
                    <p className="text-[11px] text-stone-500 pt-1">
                      Multiple independent citizen reports clustered across Goilkera panchayats establish high statistical confidence that this issue requires urgent academic intervention.
                    </p>
                  </div>
                </div>

                {/* Footer Controls / CTA */}
                <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-xs text-stone-500">
                    📍 <strong>{featuredChallenge.location.villageOrCity}</strong>, {featuredChallenge.location.block}, {featuredChallenge.location.district}
                  </div>

                  <button
                    onClick={() => onSelectChallenge(featuredChallenge)}
                    className="px-5 py-2.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-xs shadow-2xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>View Challenge</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Column: Large Visual & AI Match Panel */}
              <div className="lg:col-span-5 bg-stone-50 border-t lg:border-t-0 lg:border-l border-stone-200 flex flex-col">
                
                {/* Visual Image */}
                <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-stone-200">
                  <img 
                    src={featuredChallenge.evidence.images?.[0] || 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=800&q=80'}
                    alt="Elephant Conflict Early Warning System"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="text-[10px] font-mono uppercase bg-black/50 px-2 py-0.5 rounded backdrop-blur-xs">
                      Field Photo Evidence
                    </span>
                    <div className="text-xs font-semibold mt-0.5">West Singhbhum Elephant Corridor</div>
                  </div>
                </div>

                {/* AI University Match Card */}
                <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-[#065F46] uppercase tracking-wider">
                        AI UNIVERSITY MATCH
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-[#065F46] text-xs font-mono font-bold">
                        94% MATCH SCORE
                      </span>
                    </div>

                    <div className="font-bold text-base text-[#0F172A] font-heading flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-stone-600 shrink-0" />
                      <span>Birla Institute of Technology (BIT) Mesra</span>
                    </div>

                    <div className="text-xs text-stone-600 font-medium">
                      Why this matches:
                    </div>

                    <ul className="space-y-1.5 text-xs text-stone-700">
                      {getAIMatchPoints(featuredChallenge).map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#065F46] shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-stone-200/80">
                    <span className="text-[10px] font-mono uppercase font-bold text-stone-400 block mb-1">
                      Required Expertise
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {featuredChallenge.requiredExpertise.slice(0, 4).map((exp, i) => (
                        <span key={i} className="text-[10px] font-medium bg-white border border-stone-200 text-stone-700 px-2 py-0.5 rounded">
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>
      )}

      {/* Challenge Results Section Header */}
      <div className="flex items-center justify-between pt-4 border-t border-stone-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] font-heading">
            Active Societal Innovation Challenges
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Showing {filteredChallenges.length} open problems awaiting research, technology development, and community pilots.
          </p>
        </div>

        <span className="text-xs font-mono text-stone-400">
          Page 1 of 1
        </span>
      </div>

      {/* Editorial Challenge Cards Grid */}
      {listChallenges.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listChallenges.map((ch) => {
            const isCritical = ch.priorityLevel === 'Critical';
            const isHigh = ch.priorityLevel === 'High';
            const topMatch = ch.recommendedUniversities?.[0];
            const lifecycle = getLifecycleStage(ch.status);
            const matchPoints = getAIMatchPoints(ch);

            return (
              <article
                key={ch.id}
                id={`challenge-editorial-card-${ch.id}`}
                onClick={() => onSelectChallenge(ch)}
                className="bg-white rounded-xl border border-stone-200/90 shadow-2xs hover:border-stone-400 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between group overflow-hidden"
              >
                <div className="p-6 space-y-4">
                  
                  {/* Domain & Priority Header Row */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider">
                      {ch.domain.toUpperCase()} · {ch.location.district.toUpperCase()}
                    </span>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      isCritical
                        ? 'bg-red-100 text-[#991B1B] border border-red-200/60'
                        : isHigh
                        ? 'bg-amber-100 text-[#C2410C] border border-amber-200/60'
                        : 'bg-stone-100 text-stone-700 border border-stone-200'
                    }`}>
                      {ch.priorityLevel} PRIORITY
                    </span>
                  </div>

                  {/* Challenge Title */}
                  <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#C2410C] transition-colors line-clamp-2 font-heading leading-snug">
                    {ch.title}
                  </h3>

                  {/* Location & Population Affected */}
                  <div className="space-y-1 text-xs text-stone-600">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span className="font-semibold text-stone-800">{ch.location.villageOrCity}</span>
                      <span className="text-stone-400">•</span>
                      <span>{ch.location.block}, {ch.location.district}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-stone-700 font-medium">
                      <Users className="w-3.5 h-3.5 text-[#0F172A] shrink-0" />
                      <span><strong>{ch.affectedPeople.toLocaleString()}</strong> people affected</span>
                    </div>
                  </div>

                  {/* Community Signal Block */}
                  <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200/70 text-xs space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-mono font-bold text-stone-700">
                        COMMUNITY SIGNAL
                      </span>
                      <span className="font-semibold text-[#065F46]">
                        {ch.similarReportsCount} similar reports
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 leading-normal">
                      Verified by multiple citizen reports across surrounding hamlets.
                    </p>
                  </div>

                  {/* AI University Match Box */}
                  <div className="p-3 rounded-lg bg-stone-50/70 border border-stone-200 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[10px] font-mono font-bold text-[#065F46] uppercase">
                        AI UNIVERSITY MATCH
                      </span>
                      <span className="text-xs font-mono font-bold text-[#065F46] bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/50">
                        {topMatch ? `${topMatch.matchScore}%` : '88%'}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-[#0F172A] truncate">
                      {topMatch?.universityName || 'BIT Mesra / IIT (ISM)'}
                    </div>

                    <div className="space-y-1 text-[11px] text-stone-600">
                      <div className="text-[10px] font-semibold text-stone-400 uppercase">Why this matches:</div>
                      {matchPoints.slice(0, 2).map((pt, idx) => (
                        <div key={idx} className="flex items-start gap-1">
                          <Check className="w-3 h-3 text-[#065F46] shrink-0 mt-0.5" />
                          <span className="truncate">{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Required Expertise Tags */}
                  <div className="space-y-1 pt-1">
                    <div className="text-[10px] font-mono uppercase font-bold text-stone-400">
                      Required expertise:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {ch.requiredExpertise.slice(0, 3).map((exp, i) => (
                        <span key={i} className="text-[10px] font-medium bg-stone-100 text-stone-700 px-2 py-0.5 rounded border border-stone-200">
                          {exp}
                        </span>
                      ))}
                      {ch.requiredExpertise.length > 3 && (
                        <span className="text-[10px] text-stone-400 px-1 py-0.5">
                          +{ch.requiredExpertise.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                </div>

                {/* Card Footer: Project Stage & CTA */}
                <div className="p-4 bg-stone-50/80 border-t border-stone-100 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-[10px] font-mono text-stone-400 uppercase">Current stage:</div>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${lifecycle.color}`}>
                      ● {lifecycle.label}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-[#0F172A] group-hover:text-[#C2410C] flex items-center gap-1 transition-colors">
                    <span>View Challenge</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 bg-white rounded-2xl border border-stone-200 p-8 space-y-4">
          <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-500 mx-auto flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-[#C2410C]" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[#0F172A] font-heading">
              No challenges match your current filters.
            </h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              We couldn't find any community problems matching your selected domain, district, priority tier, or search query.
            </p>
          </div>
          <button
            onClick={clearFilters}
            className="px-5 py-2.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-xs shadow-2xs cursor-pointer transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Bottom Information Callout */}
      <section className="bg-white rounded-xl p-6 border border-stone-200 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#065F46] uppercase">
            <ShieldCheck className="w-4 h-4 text-[#065F46]" />
            <span>State Innovation Council Governance</span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Every challenge listed on SAMADHANSETU undergoes multi-tiered verification with district administration, geographic cluster deduplication, and automated skill-mapping before reaching university research portals.
          </p>
        </div>

        <button
          onClick={onReportClick}
          className="px-4 py-2 rounded-xl border border-stone-300 text-stone-800 hover:bg-stone-50 text-xs font-bold whitespace-nowrap cursor-pointer"
        >
          Submit Community Challenge
        </button>
      </section>

    </div>
  );
};
