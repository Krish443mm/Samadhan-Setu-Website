import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  GraduationCap, 
  Building2, 
  CheckCircle2, 
  Users, 
  Cpu, 
  TrendingUp, 
  Compass, 
  Activity, 
  ChevronRight, 
  Globe2, 
  Award, 
  Zap, 
  HandHeart, 
  MapPin,
  Clock,
  ArrowUpRight,
  Droplet,
  Radio,
  FileCheck
} from 'lucide-react';
import { Challenge } from '../types';
import { JharkhandMap } from './JharkhandMap';

interface LandingPageProps {
  onReportClick: () => void;
  onExploreClick: () => void;
  onSelectChallenge: (challenge: Challenge) => void;
  challenges: Challenge[];
  setActivePage: (page: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onReportClick,
  onExploreClick,
  onSelectChallenge,
  challenges,
  setActivePage
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(1);
  const [selectedMapDistrict, setSelectedMapDistrict] = useState('Ranchi');

  // The 8-stage civic innovation journey
  const ecosystemSteps = [
    {
      step: 1,
      name: 'Citizen',
      tag: 'Problem Intake',
      icon: Users,
      color: 'bg-[#0F172A]',
      accentBorder: 'border-stone-800',
      description: 'Citizens, gram pradhans, and municipal ward residents log ground challenges with photographic evidence, voice notes in tribal languages, and geocoded coordinates.',
      metric: '12,840+ Reports Logged'
    },
    {
      step: 2,
      name: 'AI Analysis',
      tag: 'Semantic Triage',
      icon: Cpu,
      color: 'bg-[#1E1B4B]',
      accentBorder: 'border-indigo-900',
      description: 'The AI intelligence engine extracts technical requirements, eliminates redundant reports across neighboring villages, and computes an objective Societal Priority Index (0–100).',
      metric: '99.4% Semantic Clustering'
    },
    {
      step: 3,
      name: 'Gov Validation',
      tag: 'Policy Alignment',
      icon: ShieldCheck,
      color: 'bg-[#065F46]',
      accentBorder: 'border-emerald-900',
      description: 'District nodal officers validate urgency, align the challenge with state development schemes, and clear seed grant disbursements for lab prototypes within 48 hours.',
      metric: '48hr Fast-Track Clearance'
    },
    {
      step: 4,
      name: 'University',
      tag: 'Academic R&D',
      icon: GraduationCap,
      color: 'bg-[#4338CA]',
      accentBorder: 'border-indigo-700',
      description: 'Engineering, biotech, and agricultural faculties (BIT Mesra, IIT ISM Dhanbad, BAU) adopt verified challenges as credit-bearing capstone and doctoral projects.',
      metric: '72 Participating Institutes'
    },
    {
      step: 5,
      name: 'Industry',
      tag: 'CSR & Mentorship',
      icon: Building2,
      color: 'bg-[#C2410C]',
      accentBorder: 'border-orange-800',
      description: 'Corporate partners and CSR foundations contribute Section 135 grants, rapid hardware fabrication tooling, and senior engineering mentors to refine student designs.',
      metric: '186 Active Corporate Partners'
    },
    {
      step: 6,
      name: 'Prototype',
      tag: 'Engineering Build',
      icon: Zap,
      color: 'bg-[#B45309]',
      accentBorder: 'border-amber-800',
      description: 'Multidisciplinary student teams fabricate bench-scale systems, IoT sensor nodes, and water or agricultural hardware with safety certifications.',
      metric: '142 Prototypes Built'
    },
    {
      step: 7,
      name: 'Pilot',
      tag: 'Field Deployment',
      icon: Radio,
      color: 'bg-[#047857]',
      accentBorder: 'border-emerald-800',
      description: 'Prototypes undergo rigorous 60-day in-situ testing in affected panchayats with real-time telemetry streaming water purity, solar uptime, or air particulate suppression.',
      metric: '86 Deployed Field Pilots'
    },
    {
      step: 8,
      name: 'Community Impact',
      tag: 'Citizen Endorsement',
      icon: HandHeart,
      color: 'bg-[#064E3B]',
      accentBorder: 'border-teal-900',
      description: 'Local residents cast tamper-resistant digital endorsements verifying whether daily life improved. Validated results are sealed in the public state impact ledger.',
      metric: '1.2M+ Verified Beneficiaries'
    }
  ];

  return (
    <div className="space-y-20 pb-24 overflow-hidden bg-[#FAF9F5]">
      
      {/* 1. HERO SECTION: Editorial GovTech & Jharkhand Identity */}
      <section className="relative pt-8 sm:pt-14 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Subtle decorative background texture */}
        <div className="absolute inset-0 -z-10 opacity-[0.025] pointer-events-none bg-[radial-gradient(#0F172A_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Institutional Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-200/70 border border-stone-300 text-[#0F172A] text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#C2410C]"></span>
              <span className="font-mono text-[11px]">SAMADHANSETU AI</span>
              <span className="text-stone-400">·</span>
              <span>झारखण्ड नवाचार मंच</span>
            </div>

            {/* Editorial Heading */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl font-extrabold text-[#0F172A] tracking-tight leading-[1.08] font-heading">
                EVERY PROBLEM <br />
                <span className="text-[#C2410C] font-editorial italic font-normal">
                  DESERVES A SOLUTION.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-stone-700 leading-relaxed max-w-2xl font-normal pt-2">
                Connecting citizens, government, universities, and industry to transform grassroots challenges into verified technological solutions across all 24 districts of Jharkhand.
              </p>
            </div>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 max-w-md">
              <button
                id="hero-primary-cta"
                onClick={onReportClick}
                className="px-7 py-3.5 rounded-xl font-bold text-base bg-[#C2410C] hover:bg-[#9A3412] text-white shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Report a Challenge</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                id="hero-secondary-cta"
                onClick={onExploreClick}
                className="px-7 py-3.5 rounded-xl font-bold text-base bg-white hover:bg-stone-50 text-[#0F172A] border border-stone-300 shadow-2xs hover:border-stone-400 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-[#0F172A]" />
                <span>Explore Challenges</span>
              </button>
            </div>

            {/* Trust and Governance Signals */}
            <div className="pt-6 border-t border-stone-200/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#065F46] shrink-0" />
                <span>State Innovation Council Backed</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#1E1B4B] shrink-0" />
                <span>72 Academic Research Labs</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#C2410C] shrink-0" />
                <span>Section 135 CSR Compliant</span>
              </div>
            </div>

          </div>

          {/* Right Hero Visual: Stylized Interactive Jharkhand Geospatial Preview */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse"></span>
                    <span className="text-xs font-bold text-[#0F172A]">Active Ground Telemetry</span>
                  </div>
                  <span className="text-[11px] font-mono text-stone-500">
                    24 Districts Live
                  </span>
                </div>

                {/* Compact Map Preview */}
                <JharkhandMap
                  compact={true}
                  selectedDistrict={selectedMapDistrict}
                  onSelectDistrict={(dist) => {
                    setSelectedMapDistrict(dist);
                  }}
                  className="border-0 shadow-none"
                />

                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#C2410C]" />
                    <span className="font-semibold text-stone-800">
                      Selected: {selectedMapDistrict}
                    </span>
                  </div>
                  <button
                    onClick={onExploreClick}
                    className="text-[11px] font-bold text-[#C2410C] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Inspect District</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. EDITORIAL DATA STORYTELLING (Not generic floating cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-10 shadow-2xs">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-stone-200">
            <div>
              <span className="text-xs font-mono font-bold text-[#C2410C] uppercase tracking-wider">
                Statewide Innovation Ledger
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight font-heading mt-1">
                Real Numbers. Verifiable Community Transformation.
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
                Every metric is audited by district administration and corroborated through resident voting and live IoT sensor feeds.
              </p>
            </div>
            
            <button
              onClick={() => setActivePage('impact')}
              className="text-xs font-bold text-[#0F172A] hover:text-[#C2410C] flex items-center gap-1.5 transition-colors cursor-pointer self-start md:self-auto"
            >
              <span>View Full Impact Ledger</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Editorial Data Storytelling Columns */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 pt-8">
            
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight font-heading">
                12,840
              </div>
              <div className="text-xs font-bold uppercase tracking-wide text-stone-500">
                Challenges Received
              </div>
              <p className="text-xs text-stone-600 leading-relaxed pt-1">
                Logged from rural panchayats and municipal wards across all 24 districts.
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#1E1B4B] tracking-tight font-heading">
                72
              </div>
              <div className="text-xs font-bold uppercase tracking-wide text-stone-500">
                Universities Active
              </div>
              <p className="text-xs text-stone-600 leading-relaxed pt-1">
                Faculty labs from BIT Mesra, IIT ISM Dhanbad, BAU, and NIT Jamshedpur.
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#C2410C] tracking-tight font-heading">
                186
              </div>
              <div className="text-xs font-bold uppercase tracking-wide text-stone-500">
                Industry Partners
              </div>
              <p className="text-xs text-stone-600 leading-relaxed pt-1">
                Enterprises providing CSR Section 135 capital, hardware tooling, and testing.
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#065F46] tracking-tight font-heading">
                86
              </div>
              <div className="text-xs font-bold uppercase tracking-wide text-stone-500">
                Solutions Deployed
              </div>
              <p className="text-xs text-stone-600 leading-relaxed pt-1">
                Operational prototypes running in remote villages and industrial belts.
              </p>
            </div>

            <div className="space-y-1 col-span-2 sm:col-span-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#064E3B] tracking-tight font-heading">
                1.2M+
              </div>
              <div className="text-xs font-bold uppercase tracking-wide text-stone-500">
                Citizens Impacted
              </div>
              <p className="text-xs text-stone-600 leading-relaxed pt-1">
                Direct residents benefiting from purified water, solar cold chain, and clean air.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 3. HOW IT WORKS: DISTINCTIVE 8-STAGE CIVIC INNOVATION JOURNEY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#0F172A] rounded-2xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#FAF9F5_1px,transparent_1px)] [background-size:20px_20px]"></div>

          <div className="relative z-10 max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-800 text-stone-300 text-xs font-mono">
              <span>HOW SAMADHANSETU WORKS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading mt-2">
              The Closed-Loop Civic Innovation Journey
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-1">
              A transparent, accountable lifecycle moving problems from a village lane to state-certified technology.
            </p>
          </div>

          {/* Stepper Grid (8 Distinct Stages) */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {ecosystemSteps.map((node, idx) => {
              const isSelected = activeStepIndex === idx;
              const Icon = node.icon;
              return (
                <button
                  key={node.step}
                  id={`journey-step-${node.step}`}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`p-3.5 rounded-xl text-left transition-all border cursor-pointer ${
                    isSelected 
                      ? 'bg-stone-800/90 border-[#C2410C] ring-2 ring-[#C2410C]/60 text-white' 
                      : 'bg-stone-900/60 border-stone-800 hover:bg-stone-800/60 text-stone-300 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <div className={`w-8 h-8 rounded-lg ${node.color} flex items-center justify-center text-white border border-stone-700`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-stone-400">0{node.step}</span>
                  </div>
                  <h3 className="font-bold text-xs text-white tracking-tight">{node.name}</h3>
                  <p className="text-[10px] text-[#F59E0B] font-medium mt-0.5">{node.tag}</p>
                </button>
              );
            })}
          </div>

          {/* Stage Details Spotlight */}
          <div className="relative z-10 mt-6 p-5 sm:p-6 rounded-xl bg-stone-900/80 border border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl ${ecosystemSteps[activeStepIndex].color} flex items-center justify-center text-white shrink-0 border border-stone-700`}>
                {React.createElement(ecosystemSteps[activeStepIndex].icon, { className: 'w-6 h-6' })}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#F59E0B] uppercase">Phase 0{ecosystemSteps[activeStepIndex].step}</span>
                  <span className="text-white font-bold text-base">{ecosystemSteps[activeStepIndex].name} Stage</span>
                  <span className="text-stone-400 text-xs">({ecosystemSteps[activeStepIndex].tag})</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-2xl">
                  {ecosystemSteps[activeStepIndex].description}
                </p>
                <div className="text-xs font-semibold text-[#34D399] pt-1">
                  Validated State Signal: {ecosystemSteps[activeStepIndex].metric}
                </div>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-2 self-end md:self-center">
              <button
                onClick={onExploreClick}
                className="px-4 py-2 rounded-lg bg-stone-100 hover:bg-white text-[#0F172A] text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Explore Active Pipeline</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 4. FOUR CORE INSTITUTIONAL PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <span className="text-xs font-mono font-bold text-[#C2410C] uppercase tracking-wider">
            Institutional Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight font-heading mt-1">
            Bridging Grassroots Needs with Scientific Rigor
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Pillar 1: AI Problem Intelligence */}
          <div className="bg-white rounded-2xl p-7 border border-stone-200/90 shadow-2xs flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center text-[#0F172A]">
                <Cpu className="w-5 h-5 text-[#0F172A]" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Pillar 01</span>
              <h3 className="text-xl font-bold text-[#0F172A] font-heading">
                AI Problem Intelligence & Duplicate Clustering
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Transforming citizen voice notes, dialect descriptions, and uploaded photographs into standardized engineering specifications. Semantic triage clusters duplicate reports across adjacent villages and calculates objective Societal Priority Scores.
              </p>

              <div className="pt-2 space-y-2 text-xs text-stone-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#065F46]" />
                  <span>Cross-panchayat semantic clustering prevents redundant funding</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#065F46]" />
                  <span>Automated Societal Priority Score (0–100) based on health risk and population</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#065F46]" />
                  <span>Decomposes challenges into specific engineering discipline requirements</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-500 font-medium">Model: Gemini 3.8-Flash Assisted</span>
              <button 
                onClick={onReportClick}
                className="font-bold text-[#C2410C] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Report Ground Issue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Pillar 2: University R&D & Capstone Research */}
          <div className="bg-white rounded-2xl p-7 border border-stone-200/90 shadow-2xs flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center text-[#1E1B4B]">
                <GraduationCap className="w-5 h-5 text-[#1E1B4B]" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Pillar 02</span>
              <h3 className="text-xl font-bold text-[#0F172A] font-heading">
                Academic R&D Labs & Capstone Credit
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Universities step out of theoretical isolation. Engineering and science students tackle documented civic crises at their doorstep, guided by faculty guides and backed by state research grants and patent assistance.
              </p>

              <div className="pt-2 space-y-2 text-xs text-stone-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#065F46]" />
                  <span>Direct match with 72 regional research centers and engineering faculties</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#065F46]" />
                  <span>Multidisciplinary student teams receive formal 6-credit capstone honors</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#065F46]" />
                  <span>Direct faculty mentor KPI attribution and patent support</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-500 font-medium">BIT Mesra · IIT ISM · NIT · BAU</span>
              <button 
                onClick={() => setActivePage('university')}
                className="font-bold text-[#1E1B4B] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Explore University Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Pillar 3: Industry Partnerships & CSR Scale */}
          <div className="bg-white rounded-2xl p-7 border border-stone-200/90 shadow-2xs flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center text-[#C2410C]">
                <Building2 className="w-5 h-5 text-[#C2410C]" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Pillar 03</span>
              <h3 className="text-xl font-bold text-[#0F172A] font-heading">
                Corporate CSR & Industrial Scaling
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Conduit for corporate CSR foundations (Tata Steel, Aditya Birla, CCL, JSPL) to fund, mentor, and industrialize student prototypes into scalable social enterprises compliant with Section 135 of the Companies Act.
              </p>

              <div className="pt-2 space-y-2 text-xs text-stone-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#065F46]" />
                  <span>Formal CSR grant disbursement aligned with state priority missions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#065F46]" />
                  <span>Access to corporate tooling, testing bays, and supply chain procurement</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#065F46]" />
                  <span>Commercialization licensing and social enterprise incubation</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-500 font-medium">186 Corporate Partners</span>
              <button 
                onClick={() => setActivePage('industry')}
                className="font-bold text-[#C2410C] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Visit Industry Hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Pillar 4: Verifiable Community Impact */}
          <div className="bg-white rounded-2xl p-7 border border-stone-200/90 shadow-2xs flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center text-[#065F46]">
                <HandHeart className="w-5 h-5 text-[#065F46]" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Pillar 04</span>
              <h3 className="text-xl font-bold text-[#0F172A] font-heading">
                Verifiable Public Impact & IoT Telemetry
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                A closed-loop platform that never closes a ticket without community validation. Live IoT sensor feeds, water purity assays, and direct resident voting prove that technological deployment actually solved the challenge.
              </p>

              <div className="pt-2 space-y-2 text-xs text-stone-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#065F46]" />
                  <span>Live telemetry: water turbidity, solar uptime, and air particulate levels</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#065F46]" />
                  <span>Post-deployment citizen satisfaction validation (94.6% positive)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#065F46]" />
                  <span>Permanent, transparent audit trail for state grant accountability</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-500 font-medium">1.2M+ Documented Beneficiaries</span>
              <button 
                onClick={() => setActivePage('impact')}
                className="font-bold text-[#065F46] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Inspect Impact Ledger</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 5. ACTIVE SOCIETAL CHALLENGES SPOTLIGHT (Case-Study Editorial Layout) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-mono font-bold text-[#C2410C] uppercase tracking-wider">
              Priority Ground Challenges
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight font-heading mt-1">
              Active Challenges Under R&D in Jharkhand
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Real citizen problems currently undergoing university prototyping and CSR funding across districts.
            </p>
          </div>

          <button
            onClick={onExploreClick}
            className="text-xs font-bold text-[#0F172A] hover:text-[#C2410C] flex items-center gap-1 cursor-pointer self-start sm:self-auto transition-colors"
          >
            <span>View All 12,840 Challenges</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {challenges.slice(0, 3).map((ch) => {
            const isCritical = ch.priorityLevel === 'Critical';
            return (
              <div 
                key={ch.id}
                onClick={() => onSelectChallenge(ch)}
                className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-2xs hover:shadow-sm hover:border-stone-400 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-stone-100 text-stone-800 border border-stone-200">
                      {ch.domain}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                      isCritical ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {ch.priorityScore}% Priority
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#C2410C] transition-colors line-clamp-2 leading-snug">
                    {ch.title}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {ch.description}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-xs text-stone-500 border-t border-stone-100">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      {ch.location.district}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-stone-400" />
                      {ch.affectedPeople.toLocaleString()} Affected
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[#065F46] bg-emerald-50 px-2 py-0.5 rounded">
                    ● {ch.status}
                  </span>
                  <span className="text-xs font-bold text-[#0F172A] group-hover:text-[#C2410C] flex items-center gap-1 transition-colors">
                    View Case <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. CITIZEN PARTICIPATION & SUBMISSION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-[#0F172A] p-8 sm:p-12 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-stone-800">
          <div className="max-w-2xl space-y-3">
            <span className="px-3 py-1 rounded-md bg-stone-800 text-stone-300 text-xs font-mono">
              DIRECT CITIZEN PARTICIPATION
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading">
              Notice a Challenge in Your Panchayat, Ward, or Hamlet?
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Do not let local problems go unheard. Submit photos, voice notes in your native language, or coordinates. Our AI connects your challenge to top university scientists, state grants, and CSR sponsors.
            </p>
          </div>
          <button
            onClick={onReportClick}
            className="shrink-0 px-8 py-4 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white font-bold text-sm shadow-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Submit a Challenge Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
};
