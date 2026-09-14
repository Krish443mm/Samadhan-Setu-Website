import React, { useState } from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  Users, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Award, 
  BookOpen, 
  TrendingUp, 
  ChevronRight, 
  Plus,
  ShieldCheck,
  Zap,
  Building2,
  FileCheck2
} from 'lucide-react';
import { Challenge, ProjectWorkspace } from '../types';
import { UniversityDeclineModal } from './UniversityDeclineModal';

interface UniversityDashboardProps {
  challenges: Challenge[];
  workspaces: ProjectWorkspace[];
  onSelectWorkspace: (workspace: ProjectWorkspace) => void;
  onSelectChallenge: (challenge: Challenge) => void;
  onAcceptChallenge: (challenge: Challenge) => void;
  onDeclineChallenge?: (challenge: Challenge, reason: string, rerouteTo: string) => void;
}

export const UniversityDashboard: React.FC<UniversityDashboardProps> = ({
  challenges,
  workspaces,
  onSelectWorkspace,
  onSelectChallenge,
  onAcceptChallenge,
  onDeclineChallenge
}) => {
  const [selectedUniversity, setSelectedUniversity] = useState('BIT Mesra, Ranchi');
  const [selectedChallengeToDecline, setSelectedChallengeToDecline] = useState<Challenge | null>(null);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [isStudentCallModalOpen, setIsStudentCallModalOpen] = useState(false);
  const [selectedSkillForApplicants, setSelectedSkillForApplicants] = useState<string | null>(null);
  const [dashboardNotice, setDashboardNotice] = useState<string | null>(null);

  // Simulated student skill matrix
  const skillMatrix = [
    { skill: 'Embedded IoT & Telemetry', current: 14, needed: 18, status: 'Active' },
    { skill: 'Environmental Biochemical Assay', current: 8, needed: 10, status: 'Active' },
    { skill: 'Solar PV & Inverter Hydraulics', current: 12, needed: 12, status: 'Optimal' },
    { skill: 'Rural Sociology & Field Enumeration', current: 6, needed: 9, status: 'Recruiting' },
    { skill: 'Tribal Forest Produce Supply Chain', current: 5, needed: 8, status: 'Recruiting' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-[#FAF9F5]">
      
      {/* Header & University Select */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#065F46] uppercase tracking-wider">
              Jharkhand Higher Education R&D Network
            </span>
            <span className="text-stone-300">|</span>
            <span className="text-xs text-stone-500 font-medium">
              Academic Hub: <strong>{selectedUniversity}</strong>
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight font-heading mt-1">
            University Innovation & R&D Portal
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
            Match regional civic challenges with specialized university laboratories, assign multidisciplinary student capstone teams, and track state seed grants.
          </p>
        </div>

        {/* University Switcher */}
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-stone-300 shadow-2xs self-start md:self-auto">
          <GraduationCap className="w-4 h-4 text-stone-700 ml-2" />
          <select
            value={selectedUniversity}
            onChange={(e) => setSelectedUniversity(e.target.value)}
            className="px-2 py-1.5 rounded-lg border-0 text-xs font-bold text-stone-800 bg-transparent focus:ring-0 outline-hidden cursor-pointer"
          >
            <option value="BIT Mesra, Ranchi">BIT Mesra, Ranchi</option>
            <option value="IIT (ISM) Dhanbad">IIT (ISM) Dhanbad</option>
            <option value="NIT Jamshedpur">NIT Jamshedpur</option>
            <option value="Birsa Agricultural University (BAU)">Birsa Agricultural University (BAU)</option>
            <option value="Ranchi University">Ranchi University</option>
          </select>
        </div>
      </div>

      {dashboardNotice && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#065F46]" />
            <span>{dashboardNotice}</span>
          </div>
          <button onClick={() => setDashboardNotice(null)} className="text-xs text-emerald-700 font-bold hover:underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Top Academic Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-2xs">
          <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Active Capstones</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-heading mt-1">
            28 Projects
          </div>
          <div className="text-[11px] font-semibold text-stone-500 mt-1">
            Across 4 Engineering Depts
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-2xs">
          <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Student Researchers</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-heading mt-1">
            142 Students
          </div>
          <div className="text-[11px] font-semibold text-[#065F46] mt-1">
            Earning 6 Capstone Credits
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-2xs">
          <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Disbursed Seed Grants</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#065F46] font-heading mt-1">
            ₹1.48 Cr
          </div>
          <div className="text-[11px] font-semibold text-stone-500 mt-1">
            Govt. of Jharkhand + CSR
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-2xs">
          <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Patents & Field Pilots</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#C2410C] font-heading mt-1">
            12 Filed
          </div>
          <div className="text-[11px] font-semibold text-stone-500 mt-1">
            4 Transferred to Regional MSMEs
          </div>
        </div>
      </div>

      {/* AI Matched Incoming Challenges */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/90 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C2410C]" />
              <h2 className="text-lg font-bold text-[#0F172A] font-heading">
                AI-Recommended Incoming Societal Challenges
              </h2>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Ranked by semantic match against {selectedUniversity} faculty publications and certified laboratory capabilities.
            </p>
          </div>
          <span className="text-[11px] font-bold text-stone-700 bg-stone-100 px-2.5 py-1 rounded border border-stone-200">
            Automated Academic Match
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {challenges.slice(0, 3).map((ch) => (
            <div key={ch.id} className="p-5 rounded-xl bg-stone-50/70 border border-stone-200 hover:border-stone-400 transition-all flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold bg-stone-200 text-stone-800 px-2 py-0.5 rounded">
                    {ch.domain}
                  </span>
                  <span className="text-[11px] font-bold text-[#065F46] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                    96% AI Match
                  </span>
                </div>

                <h3 
                  onClick={() => onSelectChallenge(ch)}
                  className="text-sm font-bold text-[#0F172A] hover:text-[#C2410C] cursor-pointer line-clamp-2"
                >
                  {ch.title}
                </h3>
                <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                  {ch.description}
                </p>

                <div className="mt-3 pt-2 border-t border-stone-200 text-xs text-stone-600 space-y-1">
                  <div>📍 <strong>{ch.location.district}</strong> District ({ch.location.block})</div>
                  <div>⚡ Skills: {ch.requiredExpertise.slice(0, 2).join(', ')}</div>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
                <button
                  onClick={() => onSelectChallenge(ch)}
                  className="text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  Review Specs
                </button>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setSelectedChallengeToDecline(ch);
                      setIsDeclineModalOpen(true);
                    }}
                    className="px-2.5 py-1.5 rounded-lg border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-semibold cursor-pointer transition-colors"
                  >
                    Decline
                  </button>
                  <button
                    onClick={() => onAcceptChallenge(ch)}
                    className="px-3 py-1.5 rounded-lg bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold flex items-center gap-1 cursor-pointer shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Adopt & Form Team</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active University Workspaces */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/90 shadow-2xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div>
            <h2 className="text-lg font-bold text-[#0F172A] font-heading">
              Active Multidisciplinary Project Workspaces
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Live engineering prototypes under development with student teams and industry sponsors.
            </p>
          </div>
          <span className="text-xs font-bold text-[#065F46] bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200/50">
            {workspaces.length} Running Workspaces
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workspaces.map((ws) => {
            const stage = ws.currentStage || (ws as any).stage || 'Prototype';
            const title = ws.title || (ws as any).projectTitle;
            const challengeTitle = challenges.find(c => c.id === ws.challengeId)?.title || (ws as any).challengeTitle || 'Community Challenge';
            const progress = ws.progressPercentage ?? (ws as any).completionPct ?? 70;
            const budgetVal = (ws as any).budget?.allocated ? ((ws as any).budget.allocated / 100000).toFixed(1) : '18.5';
            const leadName = (ws as any).facultyLead || ws.teamMembers.find(m => m.role === 'Faculty Mentor')?.name || ws.teamMembers[0]?.name || 'Faculty Lead';
            const isElephantProject = ws.id === 'proj-elephant';

            return (
              <div 
                key={ws.id}
                onClick={() => onSelectWorkspace(ws)}
                className={`p-6 rounded-xl border transition-all cursor-pointer bg-white flex flex-col justify-between group space-y-4 ${
                  isElephantProject 
                    ? 'border-stone-400 shadow-sm bg-stone-50/40' 
                    : 'border-stone-200 hover:border-stone-400 hover:shadow-2xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-stone-800 bg-stone-100 px-2.5 py-0.5 rounded border border-stone-200">
                        {stage}
                      </span>
                      {isElephantProject && (
                        <span className="text-[10px] font-bold text-[#C2410C] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          Active Pilot
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-semibold text-stone-500">
                      Grant: <strong className="text-stone-800">₹{budgetVal}L</strong>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#C2410C] transition-colors font-heading">
                    {title}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                    Solving: {challengeTitle}
                  </p>

                  {/* Progress Bar */}
                  <div className="mt-4 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-stone-500 font-medium">Sprint Completion</span>
                      <span className="font-extrabold text-[#0F172A]">{progress}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                      <div 
                        className="h-full bg-[#0F172A] rounded-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Team Avatars & Faculty Lead */}
                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2 overflow-hidden">
                        {ws.teamMembers.map((m) => (
                          <img 
                            key={m.id} 
                            src={m.avatar} 
                            alt={m.name} 
                            className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                          />
                        ))}
                      </div>
                      <span className="text-stone-600 font-medium">{ws.teamMembers.length} Members</span>
                    </div>
                    <span className="text-stone-500">
                      Lead: <strong className="text-stone-700">{leadName}</strong>
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-500">
                    Sponsor: <strong className="text-stone-800">{ws.industryPartners[0]?.name || 'EcoSense Technologies'}</strong>
                  </span>
                  <span className="font-bold text-[#0F172A] group-hover:text-[#C2410C] flex items-center gap-1 transition-colors">
                    Open Workspace <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Multidisciplinary Team Builder & AI Skill Gap Matrix */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/90 shadow-2xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-stone-700" />
              <h2 className="text-lg font-bold text-[#0F172A] font-heading">
                AI Multidisciplinary Skill Matrix & Student Recruitment
              </h2>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              The AI engine checks if project teams have necessary skills or if cross-department enrollment is required.
            </p>
          </div>
          <button 
            onClick={() => setIsStudentCallModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-stone-100 text-stone-800 text-xs font-bold hover:bg-stone-200 cursor-pointer flex items-center gap-1.5 transition-colors"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Publish Student Call</span>
          </button>
        </div>

        <div className="divide-y divide-stone-100">
          {skillMatrix.map((item, idx) => (
            <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <span className="font-bold text-stone-900">{item.skill}</span>
                <div className="text-[11px] text-stone-500">
                  {item.current} Enrolled Students / {item.needed} Needed Across Active Labs
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                  item.status === 'Optimal' 
                    ? 'bg-emerald-50 text-[#065F46] border border-emerald-200' 
                    : item.status === 'Recruiting'
                    ? 'bg-amber-50 text-amber-800 border border-amber-200'
                    : 'bg-stone-100 text-stone-800 border border-stone-200'
                }`}>
                  ● {item.status}
                </span>
                <button 
                  onClick={() => setSelectedSkillForApplicants(item.skill)}
                  className="text-xs font-semibold text-[#C2410C] hover:underline cursor-pointer"
                >
                  View Applicants
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decline Challenge Modal */}
      <UniversityDeclineModal 
        isOpen={isDeclineModalOpen}
        onClose={() => setIsDeclineModalOpen(false)}
        challenge={selectedChallengeToDecline}
        onConfirmDecline={(reason, rerouteTo) => {
          if (selectedChallengeToDecline && onDeclineChallenge) {
            onDeclineChallenge(selectedChallengeToDecline, reason, rerouteTo);
          }
          setDashboardNotice(`Challenge ${selectedChallengeToDecline?.trackingCode} declined and re-routed to ${rerouteTo}.`);
          setTimeout(() => setDashboardNotice(null), 5000);
        }}
      />

      {/* Publish Student Call Modal */}
      {isStudentCallModalOpen && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-2xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-stone-200">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h3 className="text-base font-bold text-stone-900 font-heading">
                Publish Interdisciplinary Student Call
              </h3>
              <button onClick={() => setIsStudentCallModalOpen(false)} className="text-stone-400 hover:text-stone-600">
                ✕
              </button>
            </div>
            <p className="text-xs text-stone-500">
              Broadcasts a project stipend & academic capstone recruitment notice to campus portals across BIT Mesra, NIT Jamshedpur, and IIT (ISM) Dhanbad.
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="font-bold text-stone-800 block">Target Cohort</span>
                <span className="text-stone-600">3rd & 4th Year B.Tech / M.Tech Students</span>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="font-bold text-stone-800 block">Stipend & Credits</span>
                <span className="text-stone-600">₹8,000/mo DBT Seed Grant + 4 Academic Capstone Credits</span>
              </div>
            </div>
            <div className="pt-3 flex justify-end gap-2">
              <button
                onClick={() => setIsStudentCallModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 text-xs font-bold hover:bg-stone-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsStudentCallModalOpen(false);
                  setDashboardNotice('Student Recruitment Notice successfully dispatched to campus portals!');
                  setTimeout(() => setDashboardNotice(null), 5000);
                }}
                className="px-4 py-2 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold cursor-pointer"
              >
                Broadcast Notice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Applicants Modal */}
      {selectedSkillForApplicants && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-2xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-stone-200">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <div>
                <h3 className="text-base font-bold text-stone-900 font-heading">
                  Student Applicants: {selectedSkillForApplicants}
                </h3>
                <p className="text-xs text-stone-500">Verified academic enrollment via Academic Bank of Credits (ABC ID)</p>
              </div>
              <button onClick={() => setSelectedSkillForApplicants(null)} className="text-stone-400 hover:text-stone-600">
                ✕
              </button>
            </div>

            <div className="space-y-2.5 max-h-72 overflow-y-auto">
              {[
                { name: 'Priya Soren', college: 'BIT Mesra', year: '4th Year ECE', gpa: '8.9 GPA', cert: 'Embedded C & RTOS' },
                { name: 'Amitabh Kumar', college: 'NIT Jamshedpur', year: '3rd Year Mechanical', gpa: '8.4 GPA', cert: 'CAD/SolidWorks' },
                { name: 'Sunita Munda', college: 'BAU Ranchi', year: 'M.Sc Agro-Forestry', gpa: '9.1 GPA', cert: 'Soil & Water Assay' }
              ].map((applicant, i) => (
                <div key={i} className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-stone-800">{applicant.name}</div>
                    <div className="text-[11px] text-stone-500">{applicant.college} • {applicant.year} • {applicant.gpa}</div>
                    <div className="text-[10px] text-[#065F46] font-semibold">{applicant.cert}</div>
                  </div>
                  <button
                    onClick={() => {
                      setDashboardNotice(`Shortlisted ${applicant.name} for capstone interview! Candidate notified via campus portal.`);
                      setSelectedSkillForApplicants(null);
                      setTimeout(() => setDashboardNotice(null), 5000);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#0F172A] text-white text-xs font-bold hover:bg-[#1E293B] cursor-pointer"
                  >
                    Shortlist
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedSkillForApplicants(null)}
                className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 text-xs font-bold hover:bg-stone-50 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
