import React from 'react';
import { 
  ShieldCheck, 
  Users, 
  GraduationCap, 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Award, 
  Target,
  FileCheck2,
  Compass,
  Zap
} from 'lucide-react';

interface AboutPageProps {
  onReportClick: () => void;
  onExploreClick: () => void;
  setActivePage: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onReportClick,
  onExploreClick,
  setActivePage
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 bg-[#FAF9F5]">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-100 border border-stone-300 text-stone-800 text-xs font-mono font-bold uppercase">
          <ShieldCheck className="w-3.5 h-3.5 text-[#065F46]" />
          <span>Government of Jharkhand · State Innovation Council</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight font-heading">
          About SAMADHAN<span className="text-[#C2410C]">SETU</span> AI
        </h1>
        <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-sans">
          The public R&D innovation bridge translating grassroots civic challenges into university engineering capstones, state seed grants, corporate CSR backing, and verified field deployments.
        </p>
      </div>

      {/* The Core Mission */}
      <div className="bg-white rounded-2xl p-8 sm:p-10 border border-stone-200 shadow-2xs grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <div className="w-10 h-10 rounded-xl bg-stone-100 text-[#0F172A] flex items-center justify-center font-bold border border-stone-200">
            <Target className="w-5 h-5 text-[#C2410C]" />
          </div>
          <h2 className="text-2xl font-bold text-[#0F172A] font-heading">
            Why SAMADHANSETU?
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            In many developing regions, citizens report critical problems—such as arsenic in village drinking water, elephant human conflicts along forest buffers, or post-harvest crop spoilage—to complaint boxes that often lead to delayed administrative processing rather than engineering solutions.
          </p>
          <p className="text-sm text-stone-600 leading-relaxed">
            Concurrently, thousands of talented engineering students and university faculty across institutions like BIT Mesra, IIT (ISM) Dhanbad, and NIT Jamshedpur seek real-world capstone projects with genuine community relevance.
          </p>
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold text-stone-800 leading-relaxed">
            SAMADHANSETU AI bridges this gap through automated intake, priority indexing, multidisciplinary laboratory matchmaking, and transparent public progress tracking.
          </div>
        </div>

        <div className="bg-stone-50 rounded-xl p-6 border border-stone-200 space-y-4">
          <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider font-mono">
            The 4-Way Ecosystem Bridge
          </h3>
          <div className="space-y-2.5 text-xs">
            <div className="p-3 bg-white rounded-lg border border-stone-200 flex items-start gap-3">
              <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-mono font-bold text-xs border border-stone-200">01</span>
              <div>
                <strong className="text-[#0F172A] block font-semibold">Citizens & Gram Panchayats</strong>
                <span className="text-stone-500">Report problems via voice, photo evidence, or mobile with location coordinates.</span>
              </div>
            </div>

            <div className="p-3 bg-white rounded-lg border border-stone-200 flex items-start gap-3">
              <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-mono font-bold text-xs border border-stone-200">02</span>
              <div>
                <strong className="text-[#0F172A] block font-semibold">Government of Jharkhand</strong>
                <span className="text-stone-500">Validates societal priority, coordinates district administration, and unlocks seed funding.</span>
              </div>
            </div>

            <div className="p-3 bg-white rounded-lg border border-stone-200 flex items-start gap-3">
              <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-mono font-bold text-xs border border-stone-200">03</span>
              <div>
                <strong className="text-[#0F172A] block font-semibold">Universities & Academic Labs</strong>
                <span className="text-stone-500">Faculty mentors and student engineering teams build physical prototypes and test in field conditions.</span>
              </div>
            </div>

            <div className="p-3 bg-white rounded-lg border border-stone-200 flex items-start gap-3">
              <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-mono font-bold text-xs border border-stone-200">04</span>
              <div>
                <strong className="text-[#0F172A] block font-semibold">Industry & CSR Foundations</strong>
                <span className="text-stone-500">Provide Section 135 CSR grants, pilot testing facilities, and commercial scale.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Intelligence Architecture */}
      <div className="bg-[#0F172A] rounded-2xl p-8 sm:p-10 text-white shadow-md space-y-6 border border-stone-800">
        <div>
          <span className="text-xs font-mono font-bold text-[#EA580C] uppercase tracking-wider">
            SAMADHAN AI Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading mt-1 text-white">
            Algorithmic Transparency & Verification
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-2 max-w-2xl leading-relaxed">
            Our multi-modal evaluation models analyze incoming reports within seconds using transparent heuristic scoring, deduplication, and regional spatial clustering.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
          <div className="p-5 rounded-xl bg-stone-900 border border-stone-800 space-y-2">
            <div className="text-stone-200 font-bold text-sm flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#EA580C]" />
              <span>Spatial Deduplication</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Consolidates localized complaints across blocks into single high-impact regional challenges, preventing duplicate university efforts.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-stone-900 border border-stone-800 space-y-2">
            <div className="text-stone-200 font-bold text-sm flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#EA580C]" />
              <span>Societal Priority Indexing</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Calculates priority score based on vulnerable demographics, health hazard indicators, and historical seasonal risk feeds.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-stone-900 border border-stone-800 space-y-2">
            <div className="text-stone-200 font-bold text-sm flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#EA580C]" />
              <span>Institutional Matchmaking</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Matches required technical disciplines against verified institutional laboratories across all 24 districts in Jharkhand.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Actions */}
      <div className="bg-white border border-stone-200 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xs">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] font-heading">
            Participate in the Jharkhand Innovation Network
          </h3>
          <p className="text-xs text-stone-600 mt-1">
            Submit a community challenge from your area or explore existing research projects.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onReportClick}
            className="px-5 py-2.5 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-bold shadow-2xs cursor-pointer transition-colors"
          >
            Report a Challenge
          </button>
          <button
            onClick={onExploreClick}
            className="px-5 py-2.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold shadow-2xs cursor-pointer transition-colors"
          >
            Explore Challenges
          </button>
        </div>
      </div>

    </div>
  );
};

