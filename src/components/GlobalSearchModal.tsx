import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  MapPin, 
  ArrowRight, 
  Layers, 
  Sparkles, 
  GraduationCap, 
  Building2,
  CheckCircle2
} from 'lucide-react';
import { Challenge, ProjectWorkspace } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  challenges: Challenge[];
  workspaces: ProjectWorkspace[];
  onSelectChallenge: (challenge: Challenge) => void;
  onSelectWorkspace: (workspace: ProjectWorkspace) => void;
  onExploreFilterDomain: (domain: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  challenges,
  workspaces,
  onSelectChallenge,
  onSelectWorkspace,
  onExploreFilterDomain
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard shortcut ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    if (!query.trim()) {
      return {
        challenges: challenges.slice(0, 3),
        workspaces: workspaces.slice(0, 2)
      };
    }
    const q = (query || '').toLowerCase().trim();
    if (!q) {
      return {
        challenges: (challenges || []).slice(0, 3),
        workspaces: (workspaces || []).slice(0, 2)
      };
    }

    const matchedChallenges = (challenges || []).filter(c => {
      if (!c) return false;
      const title = String(c.title || '').toLowerCase();
      const desc = String(c.description || '').toLowerCase();
      const domain = String(c.domain || '').toLowerCase();
      const district = String(c.location?.district || '').toLowerCase();
      const block = String(c.location?.block || '').toLowerCase();
      const village = String(c.location?.villageOrCity || '').toLowerCase();
      const tracking = String(c.trackingCode || '').toLowerCase();
      return (
        title.includes(q) ||
        desc.includes(q) ||
        domain.includes(q) ||
        district.includes(q) ||
        block.includes(q) ||
        village.includes(q) ||
        tracking.includes(q)
      );
    }).slice(0, 5);

    const matchedWorkspaces = (workspaces || []).filter(w => {
      if (!w) return false;
      const pTitle = String(w.title || (w as any).projectTitle || '').toLowerCase();
      const cTitle = String((w as any).challengeTitle || '').toLowerCase();
      const uName = String(w.universityName || '').toLowerCase();
      const fLead = String((w as any).facultyLead || w.teamMembers?.find(m => m?.role === 'Faculty Mentor')?.name || '').toLowerCase();

      return pTitle.includes(q) || cTitle.includes(q) || uName.includes(q) || fLead.includes(q);
    }).slice(0, 3);

    return {
      challenges: matchedChallenges,
      workspaces: matchedWorkspaces
    };
  }, [query, challenges, workspaces]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 p-4 z-50 animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-stone-200 bg-stone-50/50">
          <Search className="w-4 h-4 text-stone-500 shrink-0" />
          <input 
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search challenges, tracking codes, districts (Ranchi, Dumka...), or lab projects..."
            className="flex-1 text-sm outline-hidden text-stone-900 placeholder:text-stone-400 font-medium bg-transparent"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 text-stone-400 hover:text-stone-600 rounded-md cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <button 
            onClick={onClose}
            className="px-2 py-0.5 text-[11px] font-mono font-semibold bg-stone-200 text-stone-600 rounded hover:bg-stone-300 cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Search Results Container */}
        <div className="overflow-y-auto p-4 space-y-4">
          
          {/* Quick Domain Tags */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-wider">
              FILTER BY DOMAIN
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['Water', 'Agriculture', 'Healthcare', 'Environment', 'Energy', 'Rural Livelihoods'].map((dom) => (
                <button
                  key={dom}
                  onClick={() => {
                    onExploreFilterDomain(dom);
                    onClose();
                  }}
                  className="px-2.5 py-1 rounded text-xs font-medium bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer border border-stone-200"
                >
                  {dom}
                </button>
              ))}
            </div>
          </div>

          {/* Matched Challenges */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-stone-500 uppercase tracking-wider">
              <span>Community Challenges ({results.challenges.length})</span>
              {!query && <span className="text-[10px] text-stone-400 font-normal">Recent</span>}
            </div>

            {results.challenges.length === 0 ? (
              <p className="text-xs text-stone-400 py-2">No matching challenges found.</p>
            ) : (
              results.challenges.map((ch) => (
                <div
                  key={ch.id}
                  onClick={() => {
                    onSelectChallenge(ch);
                    onClose();
                  }}
                  className="p-3 rounded-xl hover:bg-stone-50 border border-stone-200 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold rounded bg-stone-100 text-stone-700 border border-stone-200">
                        {ch.domain}
                      </span>
                      <span className="text-xs font-mono text-stone-400">{ch.trackingCode}</span>
                      <span className="text-xs text-stone-500">📍 {ch.location.district}</span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#0F172A] group-hover:text-[#C2410C] transition-colors line-clamp-1 font-heading">
                      {ch.title}
                    </h4>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-[#C2410C] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                </div>
              ))
            )}
          </div>

          {/* Matched Project Workspaces */}
          <div className="space-y-2 pt-2 border-t border-stone-100">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-stone-500 uppercase tracking-wider">
              <span>University R&D Workspaces ({results.workspaces.length})</span>
            </div>

            {results.workspaces.length === 0 ? (
              <p className="text-xs text-stone-400 py-2">No matching projects found.</p>
            ) : (
              results.workspaces.map((ws) => (
                <div
                  key={ws.id}
                  onClick={() => {
                    onSelectWorkspace(ws);
                    onClose();
                  }}
                  className="p-3 rounded-xl hover:bg-stone-50 border border-stone-200 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold rounded bg-stone-100 text-stone-700 border border-stone-200">
                        🎓 {ws.universityName}
                      </span>
                      <span className="text-xs text-stone-500">{ws.currentStage || (ws as any).stage || 'Prototype'}</span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#0F172A] group-hover:text-[#C2410C] transition-colors line-clamp-1 font-heading">
                      {ws.title || (ws as any).projectTitle || 'Research Project'}
                    </h4>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-[#C2410C] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                </div>
              ))
            )}
          </div>

        </div>

        {/* Footer info */}
        <div className="p-2.5 bg-stone-50 border-t border-stone-200 text-xs text-stone-400 flex items-center justify-between px-5 font-mono text-[11px]">
          <span>Navigate with mouse or keyboard</span>
          <span>SAMADHANSETU Telemetry Index</span>
        </div>
      </div>
    </div>
  );
};
