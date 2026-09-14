import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { ReportChallengePage } from './components/ReportChallengePage';
import { ExploreChallengesPage } from './components/ExploreChallengesPage';
import { ChallengeDetailsPage } from './components/ChallengeDetailsPage';
import { GovernmentCommandCenter } from './components/GovernmentCommandCenter';
import { UniversityDashboard } from './components/UniversityDashboard';
import { ProjectWorkspaceView } from './components/ProjectWorkspaceView';
import { IndustryCollaborationHub } from './components/IndustryCollaborationHub';
import { ImpactDashboard } from './components/ImpactDashboard';
import { AboutPage } from './components/AboutPage';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { CopilotDrawer } from './components/CopilotDrawer';

import { 
  Challenge, 
  UserRole, 
  ProjectWorkspace, 
  IndustryOpportunity, 
  ImpactStory, 
  Notification 
} from './types';
import { 
  MOCK_CHALLENGES, 
  MOCK_WORKSPACES, 
  MOCK_INDUSTRY_OPPORTUNITIES, 
  MOCK_IMPACT_STORIES, 
  MOCK_NOTIFICATIONS 
} from './data/mockData';

import { 
  Bot, 
  ShieldCheck
} from 'lucide-react';

export default function App() {
  // Navigation & View State
  const [activePage, setActivePage] = useState<string>('landing');
  const [currentRole, setCurrentRole] = useState<UserRole>('Citizen');
  
  // Data State
  const [challenges, setChallenges] = useState<Challenge[]>(MOCK_CHALLENGES);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(MOCK_CHALLENGES[0]);
  const [workspaces, setWorkspaces] = useState<ProjectWorkspace[]>(MOCK_WORKSPACES);
  const [selectedWorkspace, setSelectedWorkspace] = useState<ProjectWorkspace | null>(MOCK_WORKSPACES[0]);
  const [opportunities, setOpportunities] = useState<IndustryOpportunity[]>(MOCK_INDUSTRY_OPPORTUNITIES);
  const [stories, setStories] = useState<ImpactStory[]>(MOCK_IMPACT_STORIES);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  // Copilot & Search Modals State
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Keyboard shortcut for Search (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Browser History Navigation Sync (Back / Forward button support)
  useEffect(() => {
    if (window.location.hash) {
      const initialPage = window.location.hash.replace('#', '');
      const validPages = ['landing', 'report', 'explore', 'details', 'government', 'university', 'workspace', 'industry', 'impact', 'about'];
      if (validPages.includes(initialPage)) {
        setActivePage(initialPage);
      }
    }

    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.page) {
        setActivePage(e.state.page);
      } else if (window.location.hash) {
        const pageFromHash = window.location.hash.replace('#', '');
        if (pageFromHash) setActivePage(pageFromHash);
      } else {
        setActivePage('landing');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    try {
      if (window.location.hash !== `#${activePage}`) {
        window.history.pushState({ page: activePage }, '', `#${activePage}`);
      }
    } catch {
      // Ignore navigation errors
    }
  }, [activePage]);

  // Handlers
  const handleSelectChallenge = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setActivePage('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectWorkspace = (workspace: ProjectWorkspace) => {
    setSelectedWorkspace(workspace);
    setActivePage('workspace');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChallengeSubmitted = (newChallenge: Challenge) => {
    setChallenges(prev => [newChallenge, ...prev]);
    setSelectedChallenge(newChallenge);
    setActivePage('details');

    // Add alert notification
    const newNotif: Notification = {
      id: `notif-${Date.now()}`,
      title: 'Challenge Dispatched to Triage',
      message: `Your report ${newChallenge.trackingCode} is now undergoing automated AI triage and GIS validation.`,
      timestamp: 'Just now',
      read: false,
      type: 'challenge',
      linkId: newChallenge.id
    };
    setNotifications(prev => [newNotif, ...prev]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleValidateChallenge = (challenge: Challenge) => {
    const updated = challenges.map((c) => {
      if (c.id === challenge.id) {
        return {
          ...c,
          validatedByGov: true,
          status: 'Government Validated' as const,
          governmentNotes: 'State Department of Higher Education & Innovation Council cleared ₹15,00,000 seed grant authorization for university pilot testing.'
        };
      }
      return c;
    });
    setChallenges(updated);
    if (selectedChallenge?.id === challenge.id) {
      setSelectedChallenge({
        ...selectedChallenge,
        validatedByGov: true,
        status: 'Government Validated',
        governmentNotes: 'State Department of Higher Education & Innovation Council cleared ₹15,00,000 seed grant authorization for university pilot testing.'
      });
    }
  };

  const handleAcceptChallengeAsUniversity = (challenge: Challenge) => {
    // Update challenge status to University Assigned
    setChallenges(prev => prev.map(c => {
      if (c.id === challenge.id) {
        return {
          ...c,
          status: 'University Assigned' as const,
          assignedUniversity: currentRole === 'University' ? 'BIT Mesra, Ranchi' : 'IIT (ISM) Dhanbad'
        };
      }
      return c;
    }));

    if (selectedChallenge?.id === challenge.id) {
      setSelectedChallenge(prev => prev ? {
        ...prev,
        status: 'University Assigned',
        assignedUniversity: currentRole === 'University' ? 'BIT Mesra, Ranchi' : 'IIT (ISM) Dhanbad'
      } : null);
    }

    // Check if workspace already exists
    let ws = workspaces.find(w => w.challengeId === challenge.id);
    if (!ws) {
      ws = {
        id: `ws-${Date.now()}`,
        challengeId: challenge.id,
        title: `Advanced ${challenge.domain} Engineering & Field Deployment System`,
        domain: challenge.domain,
        universityId: currentRole === 'University' ? 'uni-bit' : 'uni-ism',
        universityName: currentRole === 'University' ? 'BIT Mesra, Ranchi' : 'IIT (ISM) Dhanbad',
        currentStage: 'Prototype Development',
        progressPercentage: 20,
        nextMilestone: 'Lab Prototype Fabrication & Sensor Benchmarking',
        teamMembers: [
          { id: 'tm-new-1', name: 'Dr. Anandita Sen', role: 'Faculty Mentor', department: 'Applied Sciences & Research', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80' },
          { id: 'tm-new-2', name: 'Aarav Sharma', role: 'Student Lead', department: 'M.Tech Applied Engineering', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
          { id: 'tm-new-3', name: 'Sunita Soren', role: 'Student Researcher', department: 'B.Tech Embedded Systems', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' }
        ],
        tasks: [
          { id: `tsk-${Date.now()}-1`, title: 'Finalize core bill of materials and components', assignee: 'Aarav Sharma', status: 'done', priority: 'High', dueDate: '2026-03-25' },
          { id: `tsk-${Date.now()}-2`, title: 'Execute baseline telemetry & sensor calibration in laboratory', assignee: 'Sunita Soren', status: 'in-progress', priority: 'High', dueDate: '2026-04-05' }
        ],
        milestones: [
          { id: `ms-${Date.now()}-1`, title: 'Problem Research & Prior Art Literature', stage: 'Research', completed: true, dueDate: '2026-03-15', deliverable: 'State-of-the-Art Technical Analysis' },
          { id: `ms-${Date.now()}-2`, title: 'Prototype Development & Lab Validation', stage: 'Prototype', completed: false, dueDate: '2026-04-20', deliverable: 'Functional Benchmarked Unit' }
        ],
        industryPartners: [
          { name: 'Jharkhand Innovation Council', type: 'Mentorship', commitment: 'Mentorship and pilot site liaison' }
        ],
        documents: [
          { id: `doc-${Date.now()}-1`, name: 'Technical_Feasibility_Report.pdf', type: 'PDF', uploadedBy: 'Dr. Anandita Sen', date: '2026-03-10', size: '1.2 MB' }
        ],
        discussions: [
          { id: `disc-${Date.now()}-1`, author: 'Dr. Anandita Sen', role: 'Faculty Mentor', timestamp: 'Just now', message: 'Challenge accepted into University R&D Cell. We are beginning initial bench testing.' }
        ]
      };
      setWorkspaces(prev => [ws!, ...prev]);
    }
    setSelectedWorkspace(ws);
    setActivePage('workspace');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateWorkspace = (updatedWs: ProjectWorkspace) => {
    setWorkspaces(prev => prev.map(w => w.id === updatedWs.id ? updatedWs : w));
    setSelectedWorkspace(updatedWs);
  };

  const handleDeclineChallenge = (challenge: Challenge, reason: string, rerouteTo: string) => {
    const updated = challenges.map(c => {
      if (c.id === challenge.id) {
        return {
          ...c,
          status: 'Under Review' as const,
          recommendedUniversities: c.recommendedUniversities.map(u => 
            u.universityName.includes('BIT Mesra')
              ? { ...u, matchScore: 55, rationale: `Declined (${reason}). Re-routed to ${rerouteTo}.` }
              : u
          )
        };
      }
      return c;
    });
    setChallenges(updated);
    if (selectedChallenge?.id === challenge.id) {
      setSelectedChallenge(updated.find(c => c.id === challenge.id) || null);
    }
  };

  const handlePledgeIndustry = (challenge: Challenge, pledge: any) => {
    setChallenges(prev => prev.map(c => {
      if (c.id === challenge.id) {
        return {
          ...c,
          status: c.status === 'Accepted' || c.status === 'University Assigned' ? 'Prototype in Progress' : c.status
        };
      }
      return c;
    }));

    if (selectedChallenge?.id === challenge.id) {
      setSelectedChallenge(prev => prev ? {
        ...prev,
        status: prev.status === 'Accepted' || prev.status === 'University Assigned' ? 'Prototype in Progress' : prev.status
      } : null);
    }

    setWorkspaces(prev => prev.map(w => {
      if (w.challengeId === challenge.id) {
        const supportType: 'Funding' | 'Technology' | 'Mentorship' | 'Testing Facility' | 'Commercialization' = 
          pledge.pledgeMode === 'Grant' ? 'Funding' :
          pledge.pledgeMode === 'Hardware Tooling' ? 'Technology' :
          pledge.pledgeMode === 'Testing Facilities' ? 'Testing Facility' : 'Mentorship';

        const updatedPartners = [
          ...(w.industryPartners || []),
          {
            name: pledge.companyName,
            type: supportType,
            commitment: `₹${(pledge.amount / 100000).toFixed(1)}L pledge (${pledge.pledgeMode})`,
            logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=100&q=80'
          }
        ];

        return {
          ...w,
          industryPartners: updatedPartners
        };
      }
      return w;
    }));
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-stone-900 flex flex-col font-sans selection:bg-[#C2410C] selection:text-white antialiased">
      
      {/* Global Navigation Bar */}
      <Navbar 
        activePage={activePage}
        setActivePage={(p) => {
          setActivePage(p);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        notifications={notifications}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenReportModal={() => {
          setActivePage('report');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectChallengeById={(id) => {
          const ch = challenges.find(c => c.id === id);
          if (ch) handleSelectChallenge(ch);
        }}
        onOpenCopilot={() => setIsCopilotOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activePage === 'landing' && (
          <LandingPage 
            onReportClick={() => {
              setActivePage('report');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreClick={() => {
              setActivePage('explore');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectChallenge={handleSelectChallenge}
            challenges={challenges}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'report' && (
          <ReportChallengePage 
            onChallengeSubmitted={handleChallengeSubmitted}
            onCancel={() => setActivePage('landing')}
          />
        )}

        {activePage === 'explore' && (
          <ExploreChallengesPage 
            challenges={challenges}
            onSelectChallenge={handleSelectChallenge}
            onReportClick={() => setActivePage('report')}
          />
        )}

        {activePage === 'details' && (
          <ChallengeDetailsPage 
            challenge={selectedChallenge || challenges[0]}
            onBack={() => setActivePage('explore')}
            currentRole={currentRole}
            onAcceptChallenge={handleAcceptChallengeAsUniversity}
            onValidateChallenge={handleValidateChallenge}
            onCollaborateIndustry={() => setActivePage('industry')}
            onDeclineChallenge={handleDeclineChallenge}
            onPledgeIndustry={handlePledgeIndustry}
          />
        )}

        {activePage === 'government' && (
          <GovernmentCommandCenter 
            challenges={challenges}
            onSelectChallenge={handleSelectChallenge}
            onValidateChallenge={handleValidateChallenge}
          />
        )}

        {activePage === 'university' && (
          <UniversityDashboard 
            challenges={challenges}
            workspaces={workspaces}
            onSelectWorkspace={handleSelectWorkspace}
            onSelectChallenge={handleSelectChallenge}
            onAcceptChallenge={handleAcceptChallengeAsUniversity}
            onDeclineChallenge={handleDeclineChallenge}
          />
        )}

        {activePage === 'workspace' && (
          <ProjectWorkspaceView 
            workspace={selectedWorkspace || workspaces[0]}
            onBack={() => setActivePage('university')}
            currentRole={currentRole}
            onUpdateWorkspace={handleUpdateWorkspace}
          />
        )}

        {activePage === 'industry' && (
          <IndustryCollaborationHub 
            opportunities={opportunities}
            onSelectProject={(challengeId) => {
              const ch = challenges.find(c => c.id === challengeId);
              if (ch) handleSelectChallenge(ch);
            }}
          />
        )}

        {activePage === 'impact' && (
          <ImpactDashboard 
            stories={stories}
            onSelectProject={(challengeId) => {
              const ch = challenges.find(c => c.id === challengeId);
              if (ch) handleSelectChallenge(ch);
            }}
          />
        )}

        {activePage === 'about' && (
          <AboutPage 
            onReportClick={() => {
              setActivePage('report');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreClick={() => {
              setActivePage('explore');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            setActivePage={(p) => {
              setActivePage(p);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Global Search Modal */}
      <GlobalSearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        challenges={challenges}
        workspaces={workspaces}
        onSelectChallenge={(ch) => {
          handleSelectChallenge(ch);
          setIsSearchOpen(false);
        }}
        onSelectWorkspace={(ws) => {
          handleSelectWorkspace(ws);
          setIsSearchOpen(false);
        }}
        onExploreFilterDomain={(domain) => {
          setIsSearchOpen(false);
          setActivePage('explore');
        }}
      />

      {/* Floating SAMADHAN AI Trigger Button */}
      {!isCopilotOpen && (
        <div className="fixed bottom-6 right-6 z-40 animate-in fade-in duration-200">
          <button
            id="samadhan-copilot-trigger"
            onClick={() => setIsCopilotOpen(true)}
            className="px-4 py-3 rounded-2xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-xs shadow-lg shadow-black/20 transition-all flex items-center gap-2.5 cursor-pointer group border border-stone-700"
            title="Open SAMADHAN AI Copilot"
          >
            <div className="relative">
              <Bot className="w-4 h-4 text-[#EA580C] group-hover:rotate-12 transition-transform" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400"></span>
            </div>
            <span className="font-heading font-semibold tracking-tight">SAMADHAN AI</span>
            <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded font-mono text-stone-300">Copilot</span>
          </button>
        </div>
      )}

      {/* Floating Copilot Drawer Component */}
      <CopilotDrawer 
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        challenges={challenges}
        selectedChallenge={selectedChallenge}
        workspaces={workspaces}
        selectedWorkspace={selectedWorkspace}
        opportunities={opportunities}
        stories={stories}
        activePage={activePage}
        currentRole={currentRole}
        onSelectChallenge={handleSelectChallenge}
        onSelectWorkspace={handleSelectWorkspace}
        onNavigatePage={(page) => {
          setActivePage(page);
          setIsCopilotOpen(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Global Institutional Footer */}
      <footer className="bg-[#0F172A] text-white border-t border-stone-800 mt-20 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
            
            {/* Brand Col */}
            <div className="space-y-4 md:col-span-1">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#C2410C] flex items-center justify-center text-white font-bold font-heading text-base shadow-2xs">
                  स
                </div>
                <div>
                  <div className="font-extrabold text-base tracking-tight font-heading text-white">
                    SAMADHANSETU <span className="text-[#F97316]">AI</span>
                  </div>
                  <div className="text-[10px] text-stone-400 tracking-wider uppercase font-semibold">
                    Government of Jharkhand
                  </div>
                </div>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Empowering grassroots citizens across 24 districts to submit regional societal challenges, transformed into verified university capstone R&D and CSR partnerships.
              </p>
              <div className="flex items-center gap-2 text-xs text-stone-400">
                <ShieldCheck className="w-4 h-4 text-[#34D399]" />
                <span>State Higher Education Council Portal</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-300 mb-4 font-mono">
                Platform Navigation
              </h4>
              <ul className="space-y-2 text-xs text-stone-400">
                <li>
                  <button onClick={() => { setActivePage('report'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white cursor-pointer transition-colors">
                    Report a Challenge
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActivePage('explore'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white cursor-pointer transition-colors">
                    Explore Challenge Marketplace
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActivePage('government'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white cursor-pointer transition-colors">
                    Government Command Center
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActivePage('university'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white cursor-pointer transition-colors">
                    University R&D Portal
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActivePage('industry'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white cursor-pointer transition-colors">
                    Industry & CSR Hub
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActivePage('impact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white cursor-pointer transition-colors">
                    Measurable Impact Ledger
                  </button>
                </li>
              </ul>
            </div>

            {/* Key Partners in Jharkhand */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-300 mb-4 font-mono">
                Academic Consortium
              </h4>
              <ul className="space-y-2 text-xs text-stone-400">
                <li>BIT Mesra, Ranchi</li>
                <li>IIT (ISM) Dhanbad</li>
                <li>NIT Jamshedpur</li>
                <li>Birsa Agricultural University (BAU)</li>
                <li>CSIR-CIMFR Dhanbad</li>
                <li>Ranchi University</li>
              </ul>
            </div>

            {/* Compliance & SDGs */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-300 mb-4 font-mono">
                Civic Governance & SDGs
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed mb-3">
                Interventions directly aligned with UN Sustainable Development Goals: Clean Water (SDG 6), Zero Hunger (SDG 2), and Industry & Innovation (SDG 9).
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-300 text-[10px] font-bold border border-stone-700">SDG 6</span>
                <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-300 text-[10px] font-bold border border-stone-700">SDG 2</span>
                <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-300 text-[10px] font-bold border border-stone-700">SDG 3</span>
                <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-300 text-[10px] font-bold border border-stone-700">SDG 9</span>
                <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-300 text-[10px] font-bold border border-stone-700">SDG 11</span>
              </div>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
            <div>
              © 2026 SAMADHANSETU AI. Department of Higher Education, Science & Technology, Government of Jharkhand.
            </div>
            <div className="flex items-center gap-4">
              <span>National Informatics Standards</span>
              <span>•</span>
              <span>State Spatial Data Infrastructure</span>
              <span>•</span>
              <span>STQC Security Certified</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
