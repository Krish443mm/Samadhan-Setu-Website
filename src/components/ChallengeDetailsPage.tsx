import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Users, 
  Sparkles, 
  GraduationCap, 
  Building2, 
  CheckCircle2, 
  ShieldCheck, 
  Cpu, 
  ThumbsUp, 
  Share2, 
  ExternalLink, 
  AlertTriangle, 
  FileText, 
  Volume2, 
  Clock, 
  Zap, 
  Award,
  Layers,
  ChevronRight,
  HandHeart,
  Compass,
  FileCheck2,
  Radio,
  TrendingUp,
  Check,
  ChevronDown,
  ArrowRight,
  Eye,
  Target,
  Quote
} from 'lucide-react';
import { Challenge, UserRole } from '../types';
import { IndustryPledgeModal } from './IndustryPledgeModal';
import { UniversityDeclineModal } from './UniversityDeclineModal';

interface ChallengeDetailsPageProps {
  challenge: Challenge;
  onBack: () => void;
  currentRole: UserRole;
  onAcceptChallenge?: (challenge: Challenge) => void;
  onValidateChallenge?: (challenge: Challenge) => void;
  onCollaborateIndustry?: (challenge: Challenge) => void;
  onDeclineChallenge?: (challenge: Challenge, reason: string, rerouteTo: string) => void;
  onPledgeIndustry?: (challenge: Challenge, pledge: any) => void;
}

export const ChallengeDetailsPage: React.FC<ChallengeDetailsPageProps> = ({
  challenge,
  onBack,
  currentRole,
  onAcceptChallenge,
  onValidateChallenge,
  onCollaborateIndustry,
  onDeclineChallenge,
  onPledgeIndustry
}) => {
  const [endorsements, setEndorsements] = useState(challenge.endorsements);
  const [hasEndorsed, setHasEndorsed] = useState(challenge.isEndorsedByCurrentUser || false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);
  const [isPledgeModalOpen, setIsPledgeModalOpen] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [isWhyPriorityOpen, setIsWhyPriorityOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'evidence' | 'audio' | 'docs'>('evidence');
  const [copiedLink, setCopiedLink] = useState(false);

  const handleToggleEndorse = () => {
    if (hasEndorsed) {
      setEndorsements(prev => prev - 1);
      setHasEndorsed(false);
    } else {
      setEndorsements(prev => prev + 1);
      setHasEndorsed(true);
      setActionSuccessMessage('Thank you! Your citizen endorsement has been logged into the state telemetry tally.');
      setTimeout(() => setActionSuccessMessage(null), 4000);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setActionSuccessMessage('Challenge tracking link copied to clipboard!');
      setTimeout(() => {
        setCopiedLink(false);
        setActionSuccessMessage(null);
      }, 3500);
    }
  };

  const isCritical = challenge.priorityLevel === 'Critical';

  // 9 stages of the Solution Journey
  const solutionStages = [
    { num: '01', name: 'Reported', key: 'reported' },
    { num: '02', name: 'AI Analyzed', key: 'analyzed' },
    { num: '03', name: 'Government Validated', key: 'validated' },
    { num: '04', name: 'University Matched', key: 'matched' },
    { num: '05', name: 'Team Formed', key: 'team' },
    { num: '06', name: 'Prototype', key: 'prototype' },
    { num: '07', name: 'Pilot', key: 'pilot' },
    { num: '08', name: 'Deployed', key: 'deployed' },
    { num: '09', name: 'Impact Validated', key: 'impact' }
  ];

  // Map status to current stage index (0-indexed)
  const getCurrentStageIndex = () => {
    const s = (challenge?.status || '').toLowerCase();
    if (s.includes('deployed')) return 7; // Stage 08 Deployed
    if (s.includes('pilot')) return 6; // Stage 07 Pilot
    if (s.includes('prototyp')) return 5; // Stage 06 Prototype
    if (s.includes('team')) return 4; // Stage 05 Team Formed
    if (s.includes('assigned') || s.includes('matched')) return 3; // Stage 04 University Matched
    if (s.includes('validated')) return 2; // Stage 03 Government Validated
    if (s.includes('review') || s.includes('analyzed')) return 1; // Stage 02 AI Analyzed
    return 0; // Stage 01 Reported
  };

  const currentStageIdx = getCurrentStageIndex();
  const progressPercent = Math.round(((currentStageIdx + 1) / 9) * 100);

  // Curated keywords based on challenge
  const getKeywords = () => {
    if (challenge.id === 'ch-elephant') {
      return ['Human-elephant conflict', 'Crop protection', 'Early warning', 'IoT', 'Computer Vision', 'Rural Safety'];
    }
    if (challenge.id === 'ch-arsenic') {
      return ['Groundwater Arsenic', 'Fluoride Filtration', 'Rural Tubewells', 'Chemical Speciation', 'Adsorption Media', 'Safe Drinking Water'];
    }
    if (challenge.id === 'ch-lac') {
      return ['Tribal Lac Processing', 'Phase Change Materials', 'Thermal Vault', 'Solar Microgrid', 'Cold Chain', 'Post-Harvest Value'];
    }
    if (challenge.id === 'ch-maternal') {
      return ['Rural Ultrasound', 'Maternal Diagnostics', 'Tele-Health Edge', 'Anganwadi Network', 'Point-of-Care Kit', 'Low Power Medical'];
    }
    if (challenge.id === 'ch-coal') {
      return ['Open-cast Mining', 'Particulate Dust PM2.5', 'Micro-Mist Scrubbing', 'Haulage Road', 'Aerosol Physics', 'Public Lung Health'];
    }
    return [challenge.domain, ...challenge.requiredExpertise.slice(0, 5)];
  };

  // Curated industry partners
  const getIndustryPartners = () => {
    if (challenge.id === 'ch-elephant') {
      return [
        {
          name: 'EcoSense Technologies',
          matchScore: 89,
          type: 'Wildlife IoT & Edge Sensor Manufacturer',
          provisions: ['IoT Hardware', 'Technical Mentorship', 'Prototype Funding', 'Pilot Deployment']
        },
        {
          name: 'Tata Steel CSR Foundation',
          matchScore: 94,
          type: 'Section 135 Industrial Sponsor',
          provisions: ['CSR Capital Grant (₹25L)', 'Industrial Tooling', 'Forest Division Liaison', 'Solar Fabrication Labs']
        }
      ];
    }
    return [
      {
        name: 'Jharkhand Technology Innovation Fund',
        matchScore: 91,
        type: 'Gov-Industry R&D Consortium',
        provisions: ['Prototype Fabrication Grant', 'Technical Advisory', 'Pilot Site Testing Facilities']
      },
      {
        name: 'Tata Consultancy Services Foundation',
        matchScore: 88,
        type: 'Civic Tech Engineering Partner',
        provisions: ['Cloud IoT Infrastructure', 'Field Mentorship', 'Enterprise Scaling Support']
      }
    ];
  };

  // Curated similar challenges with status and locations
  const getEnrichedSimilarChallenges = () => {
    if (challenge.id === 'ch-elephant') {
      return [
        {
          title: 'Crop damage caused by elephant movement',
          location: 'West Singhbhum, Porahat Range',
          similarity: 92,
          status: 'Pilot Testing'
        },
        {
          title: 'Night-time wildlife intrusion near forest fringe villages',
          location: 'West Singhbhum, Goilkera Block',
          similarity: 87,
          status: 'Government Validated'
        },
        {
          title: 'Elephant migration corridor barrier breach',
          location: 'East Singhbhum, Ghatshila',
          similarity: 78,
          status: 'Under Review'
        }
      ];
    }
    return challenge.similarChallenges.map((sc, i) => ({
      title: sc.title,
      location: `${challenge.location.district} Region`,
      similarity: sc.similarity,
      status: i === 0 ? 'Pilot Testing' : 'Government Validated'
    }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 bg-[#FAF9F5]">
      
      {/* Top Breadcrumb & Quick Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-[#0F172A] cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-stone-500" />
          <span>Back to All Challenges</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs text-stone-500 font-mono">
            Tracking Code: <strong className="text-stone-800 font-bold">{challenge.trackingCode}</strong>
          </span>
          <button 
            onClick={handleShare}
            className="px-3 py-1.5 text-xs font-semibold text-stone-700 hover:text-stone-950 bg-white rounded-lg border border-stone-200 cursor-pointer shadow-2xs transition-colors flex items-center gap-1.5"
            title="Share challenge dossier"
          >
            <Share2 className="w-3.5 h-3.5 text-stone-500" />
            <span>{copiedLink ? 'Link Copied!' : 'Share Challenge'}</span>
          </button>
        </div>
      </div>

      {actionSuccessMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center justify-between shadow-2xs animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#065F46]" />
            <span>{actionSuccessMessage}</span>
          </div>
          <button onClick={() => setActionSuccessMessage(null)} className="text-xs text-emerald-700 font-bold hover:underline">
            Dismiss
          </button>
        </div>
      )}

      {/* TOP SECTION: Strong Challenge Header */}
      <header className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-6">
        
        {/* Eyebrow & Meta Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-[#0F172A] text-white uppercase tracking-wider">
              {challenge.domain.toUpperCase()} · {challenge.location.district.toUpperCase()}
            </span>
            <span className="px-2.5 py-1 rounded text-[11px] font-bold bg-stone-100 text-stone-800 border border-stone-200">
              📍 {challenge.location.district.toUpperCase()}, JHARKHAND
            </span>
            <span className="px-2.5 py-1 rounded text-[11px] font-bold bg-stone-100 text-stone-800 border border-stone-200">
              👥 {challenge.affectedPeople.toLocaleString()} PEOPLE AFFECTED
            </span>
            <span className="px-2.5 py-1 rounded text-[11px] font-bold bg-stone-100 text-stone-800 border border-stone-200">
              📡 {challenge.similarReportsCount} SIMILAR REPORTS
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded text-[11px] font-bold tracking-wider ${
              isCritical 
                ? 'bg-red-100 text-[#991B1B] border border-red-200/80' 
                : 'bg-amber-100 text-[#C2410C] border border-amber-200/80'
            }`}>
              {challenge.priorityLevel.toUpperCase()} PRIORITY ({challenge.priorityScore}/100)
            </span>
            <span className="px-2.5 py-1 rounded text-[11px] font-bold bg-emerald-50 text-[#065F46] border border-emerald-200">
              STATUS: {challenge.status.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Challenge Main Heading & Description */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight font-heading leading-tight">
            {challenge.title}
          </h1>
          
          <p className="text-sm sm:text-base text-stone-600 font-normal leading-relaxed max-w-4xl">
            {challenge.description}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-stone-500">
            <span>Reported by: <strong className="text-stone-800">{challenge.citizenName}</strong> ({challenge.citizenRole || 'Local Resident'})</span>
            <span>•</span>
            <span>Gram Panchayat: <strong className="text-stone-800">{challenge.location.villageOrCity}</strong>, Block: <strong className="text-stone-800">{challenge.location.block}</strong></span>
            <span>•</span>
            <span>Submitted: {new Date(challenge.submittedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>
        </div>

        {/* Primary & Secondary Action Bar */}
        <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4 bg-stone-50 -mx-6 -mb-6 p-5 sm:p-6 rounded-b-2xl">
          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleEndorse}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                hasEndorsed 
                  ? 'bg-[#0F172A] text-white shadow-2xs' 
                  : 'bg-white border border-stone-300 text-stone-700 hover:bg-stone-50'
              }`}
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>{hasEndorsed ? 'Endorsed by You' : 'I am affected (+1 Endorse)'}</span>
              <span className="px-1.5 py-0.5 rounded bg-stone-200 text-stone-800 text-[10px] font-mono">{endorsements}</span>
            </button>
            
            <span className="text-xs text-stone-500 hidden sm:inline">
              👥 <strong>{challenge.affectedPeople.toLocaleString()}</strong> residents verified in impact radius
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Government Role Action */}
            {currentRole === 'Government' && !challenge.validatedByGov && (
              <button
                onClick={() => {
                  onValidateChallenge?.(challenge);
                  setActionSuccessMessage('Challenge validated by District Magistrate! State R&D seed grant unlocked.');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#0F172A] hover:bg-[#1E293B] text-white cursor-pointer shadow-2xs flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#34D399]" />
                <span>Validate & Unlock State Grant</span>
              </button>
            )}

            {/* University Role Actions */}
            {(currentRole === 'University' || currentRole === 'Faculty' || currentRole === 'Student') && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsDeclineModalOpen(true)}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 cursor-pointer transition-colors"
                >
                  Decline / Reroute
                </button>
                <button
                  onClick={() => {
                    onAcceptChallenge?.(challenge);
                    setActionSuccessMessage('Adopted by University R&D Cell! Redirecting to Project Workspace.');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#0F172A] hover:bg-[#1E293B] text-white cursor-pointer shadow-2xs flex items-center gap-1.5"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-white" />
                  <span>Adopt as Capstone R&D</span>
                </button>
              </div>
            )}

            {/* Primary Action: Collaborate on This Challenge */}
            <button
              id="collaborate-on-challenge-btn"
              onClick={() => {
                onCollaborateIndustry?.(challenge);
                setIsPledgeModalOpen(true);
              }}
              className="px-5 py-2.5 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-bold shadow-2xs transition-colors cursor-pointer flex items-center gap-2"
            >
              <HandHeart className="w-4 h-4" />
              <span>Collaborate on This Challenge</span>
            </button>
          </div>
        </div>

      </header>

      {/* SOLUTION JOURNEY (FROM PROBLEM TO IMPACT TIMELINE) */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-100">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C2410C]">
              LIFECYCLE TIMELINE
            </span>
            <h2 className="text-2xl font-bold text-[#0F172A] font-heading mt-0.5">
              FROM PROBLEM TO IMPACT
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Structured 9-stage engineering & deployment pathway from citizen intake to verified community transformation.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-stone-50 px-4 py-2 rounded-xl border border-stone-200">
            <span className="text-xs text-stone-500 font-medium">Stage Progress:</span>
            <span className="text-base font-extrabold text-[#065F46] font-mono">{progressPercent}%</span>
          </div>
        </div>

        {/* 9 Stages Horizontal / Stepper Display */}
        <div className="overflow-x-auto pb-3 pt-2 scrollbar-none">
          <div className="flex items-center min-w-[760px] justify-between relative">
            {/* Connecting Bar */}
            <div className="absolute top-4 left-4 right-4 h-0.5 bg-stone-200 -z-0"></div>
            <div 
              className="absolute top-4 left-4 h-0.5 bg-[#0F172A] -z-0 transition-all duration-500"
              style={{ width: `${(currentStageIdx / (solutionStages.length - 1)) * 96}%` }}
            ></div>

            {solutionStages.map((st, idx) => {
              const isPast = idx < currentStageIdx;
              const isCurrent = idx === currentStageIdx;
              const isFuture = idx > currentStageIdx;

              return (
                <div key={st.num} className="flex flex-col items-center relative z-10 text-center px-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                    isCurrent
                      ? 'bg-[#C2410C] text-white ring-4 ring-orange-100 shadow-xs scale-110'
                      : isPast
                      ? 'bg-[#0F172A] text-white'
                      : 'bg-stone-100 text-stone-400 border border-stone-200'
                  }`}>
                    {isPast ? <Check className="w-4 h-4" /> : st.num}
                  </div>
                  
                  <span className={`text-[11px] font-semibold mt-2 max-w-[85px] leading-tight ${
                    isCurrent ? 'text-[#C2410C] font-bold' : isPast ? 'text-[#0F172A]' : 'text-stone-400'
                  }`}>
                    {st.name}
                  </span>

                  {isCurrent && (
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[#C2410C] bg-orange-50 px-1.5 py-0.2 rounded mt-1 font-bold">
                      Current Stage
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Two-Column Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (7 Cols): Editorial Narrative, Evidence, Proposed Solution */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* PROBLEM STORY: THE CHALLENGE */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C2410C]">
                  GROUND REALITY DOSSIER
                </span>
                <h2 className="text-xl font-bold text-[#0F172A] font-heading mt-0.5">
                  THE CHALLENGE
                </h2>
              </div>
              <span className="text-xs text-stone-400 font-mono">Panchayat Case ID #{challenge.trackingCode.split('-').pop()}</span>
            </div>

            {/* Citizen Quote Treatment */}
            <div className="p-5 rounded-xl bg-stone-50 border-l-4 border-[#C2410C] space-y-2">
              <Quote className="w-5 h-5 text-[#C2410C] opacity-60" />
              <p className="text-sm sm:text-base font-serif italic text-stone-800 leading-relaxed">
                "{challenge.description}"
              </p>
              <div className="text-xs text-stone-500 pt-1 font-sans not-italic">
                — <strong>{challenge.citizenName}</strong>, {challenge.citizenRole || 'Community Representative'}, {challenge.location.villageOrCity}
              </div>
            </div>

            {/* 4 Editorial Facets: Why This Matters, Who Is Affected, Where It Is Happening, Community Context */}
            <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed pt-2">
              <div>
                <h3 className="font-bold text-[#0F172A] text-sm font-heading mb-1">
                  Why this matters
                </h3>
                <p>
                  Frequent night-time crop raiding forces smallholder farming families into hazardous night vigils using improvised firecrackers and lanterns. This escalates animal stress, leads to severe injury or fatal confrontations, and wipes out seasonal food reserves essential for subsistence.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-[#0F172A] text-sm font-heading mb-1">
                  Who is affected
                </h3>
                <p>
                  Over <strong>{challenge.affectedPeople.toLocaleString()} indigenous residents</strong> across 8 fringe hamlets, predominantly tribal cultivators growing indigenous paddy, seasonal pulses, and winter vegetables along the forest reserve boundary.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-[#0F172A] text-sm font-heading mb-1">
                  Where it is happening
                </h3>
                <p>
                  Saranda and Porahat forest buffer perimeter in <strong>{challenge.location.district} ({challenge.location.block} block)</strong>, an active historical migratory corridor experiencing reduced natural forage and increasing habitat fragmentation.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-[#0F172A] text-sm font-heading mb-1">
                  Community context
                </h3>
                <p>
                  Traditional deterrent methods (drumming, open trenches, high-voltage illegal fences) have proved either ineffective, dangerous, or harmful to both protected wildlife and livestock. The community urgently seeks non-lethal, automated early warning detection.
                </p>
              </div>
            </div>

            {challenge.governmentNotes && (
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-[#0F172A]">
                  <ShieldCheck className="w-4 h-4 text-[#065F46]" />
                  <span>District Administration Field Endorsement:</span>
                </div>
                <p className="leading-relaxed text-stone-700">
                  {challenge.governmentNotes}
                </p>
              </div>
            )}
          </section>

          {/* VISUAL EVIDENCE SECTION */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500">
                  PRIMARY VERIFICATION
                </span>
                <h2 className="text-xl font-bold text-[#0F172A] font-heading mt-0.5">
                  Visual Evidence & Field Assays
                </h2>
              </div>

              {/* Sub-tabs */}
              <div className="flex items-center gap-1 text-xs">
                <button
                  onClick={() => setActiveTab('evidence')}
                  className={`px-3 py-1 rounded-lg font-semibold cursor-pointer transition-colors ${
                    activeTab === 'evidence' ? 'bg-[#0F172A] text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  Photographs
                </button>
                {challenge.evidence.hasAudio && (
                  <button
                    onClick={() => setActiveTab('audio')}
                    className={`px-3 py-1 rounded-lg font-semibold cursor-pointer transition-colors ${
                      activeTab === 'audio' ? 'bg-[#0F172A] text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    Voice Statement
                  </button>
                )}
                {challenge.evidence.documents && challenge.evidence.documents.length > 0 && (
                  <button
                    onClick={() => setActiveTab('docs')}
                    className={`px-3 py-1 rounded-lg font-semibold cursor-pointer transition-colors ${
                      activeTab === 'docs' ? 'bg-[#0F172A] text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    Assays ({challenge.evidence.documents.length})
                  </button>
                )}
              </div>
            </div>

            {/* Images display */}
            {activeTab === 'evidence' && (
              <div className="space-y-3">
                {challenge.evidence.images && challenge.evidence.images.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {challenge.evidence.images.map((img, i) => (
                      <div key={i} className="relative rounded-xl overflow-hidden border border-stone-200 group h-52 sm:h-56 bg-stone-100">
                        <img 
                          src={img} 
                          alt={`Field evidence documentation ${i + 1}`} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex flex-col justify-end p-3 text-white">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300">
                            Verified Ground Documentation #{i + 1}
                          </span>
                          <span className="text-xs font-medium mt-0.5">
                            {challenge.location.district} Agricultural Buffer Boundary
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-xs text-stone-500 bg-stone-50 rounded-xl border border-stone-200">
                    No field photographs uploaded for this case dossier.
                  </div>
                )}
                <p className="text-[11px] text-stone-500">
                  Photographic evidence timestamped and cross-checked against satellite crop density indices by the Department of Science and Technology.
                </p>
              </div>
            )}

            {/* Audio Voice Note */}
            {activeTab === 'audio' && challenge.evidence.hasAudio && (
              <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                      className="w-10 h-10 rounded-full bg-[#0F172A] hover:bg-[#1E293B] text-white flex items-center justify-center cursor-pointer transition-transform active:scale-95 shadow-2xs"
                    >
                      <Volume2 className={`w-5 h-5 ${isPlayingAudio ? 'animate-bounce text-[#EA580C]' : ''}`} />
                    </button>
                    <div>
                      <div className="text-xs font-bold text-stone-800">
                        {isPlayingAudio ? 'Playing Native Voice Statement (0:48)' : 'Citizen Voice Note Recorded in Dialect'}
                      </div>
                      <div className="text-[11px] text-stone-500">
                        Captured via Panchayat Citizen Kiosk · Geocoded ground truth
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-stone-600 bg-stone-200 px-2.5 py-1 rounded">
                    Audio Assay
                  </span>
                </div>

                <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                  <div className={`h-full bg-[#C2410C] ${isPlayingAudio ? 'w-3/5 transition-all duration-1000' : 'w-0'}`}></div>
                </div>

                <p className="text-[11px] text-stone-600 italic bg-white p-3 rounded-lg border border-stone-200">
                  "Elephants crossed the eastern nullah at 11:20 PM last Thursday. The crop damage was severe in Buruhatu village. We need an automated alarm so farmers don't have to face herds in the pitch dark."
                </p>
              </div>
            )}

            {/* Documents */}
            {activeTab === 'docs' && challenge.evidence.documents && (
              <div className="space-y-2">
                {challenge.evidence.documents.map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs">
                    <div className="flex items-center gap-2 text-stone-800 font-semibold">
                      <FileText className="w-4 h-4 text-[#C2410C]" />
                      <span>{doc}</span>
                    </div>
                    <button 
                      onClick={() => {
                        setActionSuccessMessage(`Accessing verified technical assay: ${doc}`);
                        setTimeout(() => setActionSuccessMessage(null), 4000);
                      }}
                      className="text-xs text-[#0F172A] font-bold hover:underline cursor-pointer"
                    >
                      Download PDF
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* EXPECTED SOLUTION: POSSIBLE SOLUTION DIRECTION */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-5">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#065F46]">
                ENGINEERING ROADMAP
              </span>
              <h2 className="text-xl font-bold text-[#0F172A] font-heading mt-0.5">
                POSSIBLE SOLUTION DIRECTION
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Proposed approach currently in prototype modeling at university engineering laboratories.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs text-stone-800 leading-relaxed font-medium">
              "Low-cost edge AI cameras and IoT sensor nodes detect elephant movement near agricultural areas."
            </div>

            {/* Step-by-step Proposed Workflow */}
            <div className="space-y-2.5">
              <span className="text-[10px] font-mono uppercase font-bold text-stone-400 block">
                Technical Execution Pipeline (Proposed Prototype)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center text-xs">
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                  <div className="w-5 h-5 rounded-full bg-stone-200 text-stone-700 font-mono text-[10px] font-bold mx-auto flex items-center justify-center">1</div>
                  <div className="font-bold text-stone-800">Edge Sensation</div>
                  <div className="text-[10px] text-stone-500">AI detects nocturnal movement near field borders</div>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                  <div className="w-5 h-5 rounded-full bg-stone-200 text-stone-700 font-mono text-[10px] font-bold mx-auto flex items-center justify-center">2</div>
                  <div className="font-bold text-stone-800">Classification</div>
                  <div className="text-[10px] text-stone-500">Vision model verifies elephant herd in 1.2s</div>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                  <div className="w-5 h-5 rounded-full bg-stone-200 text-stone-700 font-mono text-[10px] font-bold mx-auto flex items-center justify-center">3</div>
                  <div className="font-bold text-stone-800">Resident Alert</div>
                  <div className="text-[10px] text-stone-500">Automated siren & SMS warning to 8 villages</div>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                  <div className="w-5 h-5 rounded-full bg-stone-200 text-stone-700 font-mono text-[10px] font-bold mx-auto flex items-center justify-center">4</div>
                  <div className="font-bold text-stone-800">Tactical Alert</div>
                  <div className="text-[10px] text-stone-500">Ranger division dispatches patrol units</div>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                  <div className="w-5 h-5 rounded-full bg-stone-200 text-stone-700 font-mono text-[10px] font-bold mx-auto flex items-center justify-center">5</div>
                  <div className="font-bold text-stone-800">Corridor Telemetry</div>
                  <div className="text-[10px] text-stone-500">GIS records data for migration mapping</div>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 text-[11px] text-stone-500 flex items-center gap-2">
              <span className="font-bold text-stone-700">Notice:</span>
              <span>This represents a proposed prototype direction. The solution remains subject to active field testing and empirical refinement.</span>
            </div>
          </section>

          {/* IMPACT POTENTIAL SECTION */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-5">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#065F46]">
                MEASURABLE OUTCOMES
              </span>
              <h2 className="text-xl font-bold text-[#0F172A] font-heading mt-0.5">
                IMPACT POTENTIAL & METRICS
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Distinguishing between modeled expectations and live field pilot verifications.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <div className="text-[10px] font-mono uppercase font-bold text-stone-400">Estimated Beneficiaries</div>
                <div className="text-2xl font-extrabold text-[#0F172A] font-heading">1,200</div>
                <div className="text-[11px] text-stone-600 font-medium">Farmers & families benefited</div>
                <span className="inline-block text-[9px] font-mono text-stone-500 bg-stone-200/60 px-1.5 py-0.2 rounded">Estimated</span>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <div className="text-[10px] font-mono uppercase font-bold text-stone-400">Fringe Hamlets</div>
                <div className="text-2xl font-extrabold text-[#0F172A] font-heading">8</div>
                <div className="text-[11px] text-stone-600 font-medium">Villages protected</div>
                <span className="inline-block text-[9px] font-mono text-stone-500 bg-stone-200/60 px-1.5 py-0.2 rounded">Coverage</span>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <div className="text-[10px] font-mono uppercase font-bold text-stone-400">Target Loss Reduction</div>
                <div className="text-2xl font-extrabold text-[#065F46] font-heading">62%</div>
                <div className="text-[11px] text-stone-600 font-medium">Crop damage saved</div>
                <span className="inline-block text-[9px] font-mono text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">Target</span>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <div className="text-[10px] font-mono uppercase font-bold text-stone-400">Warning Telemetry</div>
                <div className="text-2xl font-extrabold text-[#C2410C] font-heading">342</div>
                <div className="text-[11px] text-stone-600 font-medium">Early warnings dispatched</div>
                <span className="inline-block text-[9px] font-mono text-amber-900 bg-amber-100 px-1.5 py-0.2 rounded">Pilot Result</span>
              </div>
            </div>
          </section>

        </div>

        {/* Right Column (5 Cols): AI Intelligence, University Match, Industry Partners */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* SAMADHAN AI ANALYSIS */}
          <section className="bg-[#0F172A] rounded-2xl p-6 text-white shadow-md border border-stone-800 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#EA580C]" />
                <h2 className="text-base font-bold font-heading">
                  SAMADHAN AI ANALYSIS
                </h2>
              </div>
              <span className="text-[10px] font-mono text-stone-300 bg-stone-800 px-2.5 py-0.5 rounded border border-stone-700">
                Triage Model v3.8
              </span>
            </div>

            {/* Score & Priority Visualization */}
            <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-stone-400 block">
                    PRIORITY SCORE
                  </span>
                  <div className="text-3xl font-extrabold text-[#F59E0B] font-heading">
                    {challenge.priorityScore} <span className="text-sm font-normal text-stone-400">/ 100</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase font-bold text-stone-400 block">
                    PRIORITY LEVEL
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-red-950 text-red-400 border border-red-800 text-xs font-bold uppercase font-mono">
                    {challenge.priorityLevel}
                  </span>
                </div>
              </div>

              {/* Horizontal Score Bar */}
              <div className="w-full h-2 rounded-full bg-stone-800 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#F59E0B] to-[#DC2626] rounded-full" 
                  style={{ width: `${challenge.priorityScore}%` }}
                ></div>
              </div>

              <div className="flex justify-between text-[10px] font-mono text-stone-400 pt-1">
                <span>ESTIMATED PEOPLE AFFECTED: <strong>{challenge.affectedPeople.toLocaleString()}</strong></span>
                <span>SIMILAR CHALLENGES: <strong>{challenge.similarReportsCount}</strong></span>
              </div>
            </div>

            {/* Primary & Secondary Domains */}
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-stone-400 block mb-1">
                  PRIMARY DOMAIN
                </span>
                <span className="px-2.5 py-1 rounded bg-stone-800 text-white font-semibold inline-block border border-stone-700">
                  {challenge.domain}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-stone-400 block mb-1">
                  SECONDARY DOMAINS
                </span>
                <div className="flex flex-wrap gap-1">
                  {(challenge.secondaryDomains || ['Environment', 'Rural Livelihood', 'Wildlife Management']).map((sec, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-stone-800/80 text-stone-300 text-[11px] border border-stone-700">
                      {sec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Keywords */}
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-stone-400 block mb-1">
                  KEYWORDS
                </span>
                <div className="flex flex-wrap gap-1">
                  {getKeywords().map((kw, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-stone-900 text-stone-300 text-[10px] border border-stone-800">
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* WHY THIS PRIORITY? (Expandable Section) */}
            <div className="pt-2 border-t border-stone-800">
              <button
                onClick={() => setIsWhyPriorityOpen(!isWhyPriorityOpen)}
                className="w-full flex items-center justify-between text-left text-xs font-bold text-stone-300 hover:text-white py-1 cursor-pointer"
              >
                <span>Why did SAMADHAN AI assign this priority?</span>
                <ChevronDown className={`w-3.5 h-3.5 transform transition-transform ${isWhyPriorityOpen ? 'rotate-180' : ''}`} />
              </button>

              {isWhyPriorityOpen && (
                <div className="mt-2 p-3.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-300 space-y-2 leading-relaxed">
                  <p>
                    Priority is high because the challenge has multiple reports across <strong>8 villages</strong>, affects approximately <strong>1,200 people</strong> and involves potential risk to human safety and agricultural livelihoods.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px] text-stone-400 font-mono">
                    <div>● Community reports: <strong>47 reports</strong></div>
                    <div>● Population: <strong>1,200 people</strong></div>
                    <div>● Geographical spread: <strong>8 villages</strong></div>
                    <div>● Safety risk: <strong>Immediate nocturnal</strong></div>
                    <div>● Economic impact: <strong>High seasonal loss</strong></div>
                    <div>● Urgency: <strong>Active harvest cycle</strong></div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* COMMUNITY SIGNAL */}
          <section className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-[#C2410C]" />
                <h3 className="text-sm font-bold text-[#0F172A] font-heading">
                  COMMUNITY SIGNAL
                </h3>
              </div>
              <span className="text-[10px] font-bold text-[#065F46] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Panchayat Verified
              </span>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              When multiple citizens report similar problems in the same region, SAMADHANSETU identifies a stronger signal that the issue requires coordinated intervention.
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
                <span className="text-stone-400 block text-[10px] uppercase font-mono font-bold">Similar Reports</span>
                <span className="text-base font-extrabold text-[#0F172A]">{challenge.similarReportsCount} reports</span>
              </div>
              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
                <span className="text-stone-400 block text-[10px] uppercase font-mono font-bold">Villages Spread</span>
                <span className="text-base font-extrabold text-[#0F172A]">8 villages</span>
              </div>
              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
                <span className="text-stone-400 block text-[10px] uppercase font-mono font-bold">Population Impact</span>
                <span className="text-base font-extrabold text-[#065F46]">{challenge.affectedPeople.toLocaleString()} residents</span>
              </div>
              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
                <span className="text-stone-400 block text-[10px] uppercase font-mono font-bold">Related Incidents</span>
                <span className="text-base font-extrabold text-[#C2410C]">342 events</span>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-stone-500">
              📍 GPS Coordinates: <code className="font-mono text-stone-700">{challenge.location.coordinates ? `${challenge.location.coordinates.lat}°N, ${challenge.location.coordinates.lng}°E` : '22.58°N, 85.38°E'}</code>
            </div>
          </section>

          {/* EXPERTISE NEEDED */}
          <section className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs space-y-3">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400">
                TECHNICAL DISCIPLINES
              </span>
              <h3 className="text-sm font-bold text-[#0F172A] font-heading mt-0.5">
                EXPERTISE NEEDED
              </h3>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {challenge.requiredExpertise.map((exp, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1 rounded-lg text-xs font-semibold bg-stone-100 text-stone-800 border border-stone-200"
                >
                  {exp}
                </span>
              ))}
              <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-stone-100 text-stone-800 border border-stone-200">
                GIS
              </span>
            </div>
          </section>

          {/* UNIVERSITY MATCHING: WHO CAN HELP SOLVE THIS? */}
          <section className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs space-y-4">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#065F46]">
                ACADEMIC R&D ALLIANCE
              </span>
              <h3 className="text-base font-bold text-[#0F172A] font-heading mt-0.5">
                WHO CAN HELP SOLVE THIS?
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                AI-ranked university recommendations based on expertise, research capabilities and innovation infrastructure.
              </p>
            </div>

            <div className="space-y-3">
              {challenge.recommendedUniversities.slice(0, 3).map((uni) => (
                <div key={uni.universityId} className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 hover:bg-stone-100/80 transition-colors space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-[#0F172A] font-heading">
                        {uni.universityName}
                      </div>
                      {uni.facultyLead && (
                        <div className="text-[11px] text-stone-500 mt-0.5">
                          Lead: {uni.facultyLead}
                        </div>
                      )}
                    </div>
                    <span className="px-2 py-0.5 rounded text-xs font-mono font-extrabold bg-[#0F172A] text-white shrink-0">
                      {uni.matchScore}%
                    </span>
                  </div>

                  <div className="text-[11px] text-stone-600 font-semibold pt-1">
                    Why it matches:
                  </div>

                  <ul className="space-y-1 text-xs text-stone-700">
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#065F46] shrink-0 mt-0.5" />
                      <span>AI / Machine Learning expertise</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#065F46] shrink-0 mt-0.5" />
                      <span>IoT research capability</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#065F46] shrink-0 mt-0.5" />
                      <span>Engineering faculty specialization</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#065F46] shrink-0 mt-0.5" />
                      <span>Innovation and incubation ecosystem</span>
                    </li>
                  </ul>

                  <div className="pt-2 border-t border-stone-200/80 flex items-center justify-between text-xs">
                    <button
                      onClick={() => {
                        setActionSuccessMessage(`Opening university dossier: ${uni.universityName}`);
                        setTimeout(() => setActionSuccessMessage(null), 4000);
                      }}
                      className="text-stone-600 hover:text-stone-900 font-semibold cursor-pointer"
                    >
                      View University Profile
                    </button>
                    <button
                      onClick={() => {
                        setActionSuccessMessage(`Invitation dispatched to ${uni.universityName} Dean of R&D.`);
                        setTimeout(() => setActionSuccessMessage(null), 4000);
                      }}
                      className="text-[#C2410C] hover:text-[#9A3412] font-bold cursor-pointer flex items-center gap-1"
                    >
                      <span>Invite University</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* INDUSTRY MATCHING: INDUSTRY PARTNERS */}
          <section className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs space-y-4">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C2410C]">
                CORPORATE & CSR COLLABORATION
              </span>
              <h3 className="text-base font-bold text-[#0F172A] font-heading mt-0.5">
                INDUSTRY PARTNERS
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Potential corporate CSR sponsors and technological equipment providers.
              </p>
            </div>

            <div className="space-y-3">
              {getIndustryPartners().map((ind, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-[#0F172A]">
                        {ind.name}
                      </div>
                      <div className="text-[11px] text-stone-500">
                        {ind.type}
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-emerald-50 text-[#065F46] border border-emerald-200 shrink-0">
                      {ind.matchScore}% Match
                    </span>
                  </div>

                  <div className="pt-1">
                    <span className="text-[10px] font-mono uppercase font-bold text-stone-400 block mb-1">
                      Can provide:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {ind.provisions.map((prov, i) => (
                        <span key={i} className="text-[10px] font-medium bg-white border border-stone-200 text-stone-700 px-2 py-0.5 rounded">
                          {prov}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-200/80">
                    <button
                      onClick={() => setIsPledgeModalOpen(true)}
                      className="text-xs font-bold text-[#C2410C] hover:text-[#9A3412] flex items-center gap-1 cursor-pointer"
                    >
                      <span>Request Collaboration</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* DUPLICATE / SIMILARITY DETECTION: SIMILAR CHALLENGES */}
          <section className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs space-y-4">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400">
                SEMANTIC DEDUPLICATION
              </span>
              <h3 className="text-base font-bold text-[#0F172A] font-heading mt-0.5">
                SIMILAR CHALLENGES
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                SAMADHAN AI merges related reports into clustered community priority dossiers.
              </p>
            </div>

            <div className="space-y-2">
              {getEnrichedSimilarChallenges().map((sc, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-stone-200 bg-stone-50/70 text-xs space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-bold text-stone-800 leading-snug">
                      {sc.title}
                    </div>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold text-[#065F46] bg-emerald-50 border border-emerald-200 shrink-0">
                      {sc.similarity}% similar
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-stone-500 pt-0.5">
                    <span>📍 {sc.location}</span>
                    <span className="font-medium text-stone-700">● {sc.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

      </div>

      {/* CALL TO ACTION (Bottom Action Area) */}
      <section className="bg-white rounded-2xl p-8 border border-stone-300 shadow-xs text-center space-y-4">
        <div className="max-w-2xl mx-auto space-y-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C2410C]">
            COMMUNITY R&D ALLIANCE
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-heading">
            Ready to help solve this problem?
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Universities, student researchers, corporate CSR divisions, and government liaisons can collaborate to fund, prototype, and deploy solutions across Jharkhand.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => {
              onAcceptChallenge?.(challenge);
              setActionSuccessMessage('Challenge accepted by University R&D Cell! Redirecting to Project Workspace.');
            }}
            className="px-6 py-3 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold shadow-2xs transition-colors cursor-pointer"
          >
            Accept Challenge
          </button>

          <button
            onClick={() => setIsPledgeModalOpen(true)}
            className="px-6 py-3 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-bold shadow-2xs transition-colors cursor-pointer"
          >
            Collaborate
          </button>

          <button
            onClick={() => {
              setActionSuccessMessage('Solution proposal draft opened. Please outline your technical methodology.');
              setTimeout(() => setActionSuccessMessage(null), 5000);
            }}
            className="px-6 py-3 rounded-xl bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 text-xs font-bold transition-colors cursor-pointer"
          >
            Propose Solution
          </button>
        </div>
      </section>

      {/* Industry Collaboration / CSR Pledge Modal */}
      <IndustryPledgeModal 
        isOpen={isPledgeModalOpen}
        onClose={() => setIsPledgeModalOpen(false)}
        challenge={challenge}
        onConfirmPledge={(pledge) => {
          onPledgeIndustry?.(challenge, pledge);
          setActionSuccessMessage(`Success! ${pledge.companyName} pledged ₹${(pledge.amount / 100000).toFixed(1)}L in ${pledge.pledgeMode} support.`);
          setTimeout(() => setActionSuccessMessage(null), 5000);
        }}
      />

      {/* University Decline Modal */}
      <UniversityDeclineModal 
        isOpen={isDeclineModalOpen}
        onClose={() => setIsDeclineModalOpen(false)}
        challenge={challenge}
        onConfirmDecline={(reason, rerouteTo) => {
          onDeclineChallenge?.(challenge, reason, rerouteTo);
          setActionSuccessMessage(`Challenge declined and successfully re-routed to ${rerouteTo}.`);
          setTimeout(() => setActionSuccessMessage(null), 5000);
        }}
      />

    </div>
  );
};
