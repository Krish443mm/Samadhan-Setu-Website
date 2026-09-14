import React, { useState } from 'react';
import { 
  Shield, 
  Search, 
  Bell, 
  Menu, 
  X, 
  CheckCircle2, 
  ExternalLink,
  ChevronDown,
  Bot
} from 'lucide-react';
import { UserRole } from '../types';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  onOpenSearch: () => void;
  onOpenReportModal: () => void;
  notifications?: any[];
  onSelectChallengeById?: (id: string) => void;
  onOpenCopilot?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  setActivePage,
  currentRole,
  setCurrentRole,
  onOpenSearch,
  onOpenReportModal,
  notifications: externalNotifications,
  onSelectChallengeById,
  onOpenCopilot
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [portalsDropdownOpen, setPortalsDropdownOpen] = useState(false);

  const notifications = [
    { id: 1, title: 'Government Validated', desc: 'Namkum Water Challenge assigned to BIT Mesra', time: '10m ago', unread: true },
    { id: 2, title: 'Industry Funding Pledge', desc: 'Tata Steel Foundation pledged ₹14.5L for Water Kiosk', time: '1h ago', unread: true },
    { id: 3, title: 'New Challenge Alert', desc: 'Solar Cold Storage reported in Khunti (Priority 89%)', time: '3h ago', unread: false },
    { id: 4, title: 'Pilot Complete', desc: 'Dumka Anemia Scanner achieved 94% screening rate', time: '1d ago', unread: false }
  ];

  const roles: { role: UserRole; label: string; badge: string }[] = [
    { role: 'Citizen', label: 'Citizen', badge: 'Public Reporter' },
    { role: 'Government', label: 'Govt Official', badge: 'Command Center' },
    { role: 'University', label: 'University Dean', badge: 'Academic Admin' },
    { role: 'Faculty', label: 'Faculty Mentor', badge: 'R&D Lead' },
    { role: 'Student', label: 'Student Innovator', badge: 'Project Team' },
    { role: 'Industry', label: 'Industry / CSR', badge: 'Partner & Sponsor' }
  ];

  const isPortalActive = ['government', 'command', 'university', 'workspace', 'industry'].includes(activePage);

  const currentRoleInfo = roles.find(r => r.role === currentRole) || roles[0];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-stone-200">
      {/* Institutional Top Banner */}
      <div className="bg-[#0F172A] text-stone-300 text-xs py-1 px-4 sm:px-6 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span className="font-semibold text-stone-200">
              झारखण्ड सरकार · Government of Jharkhand
            </span>
            <span className="text-stone-500 hidden sm:inline">|</span>
            <span className="hidden md:inline text-stone-400">
              State Innovation Council & Higher Education R&D Network
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-mono">
            <span className="text-stone-400 hidden sm:inline">
              Statewide Status: <span className="text-emerald-400 font-medium">Operational</span>
            </span>
            <span className="text-stone-600 hidden sm:inline">|</span>
            <span className="text-stone-300">24 Districts Active</span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <button 
            id="nav-brand-logo"
            onClick={() => setActivePage('landing')}
            className="flex items-center gap-2.5 text-left group focus:outline-hidden cursor-pointer shrink-0"
          >
            <div className="w-9 h-9 rounded-lg bg-[#0F172A] border border-stone-700 flex items-center justify-center text-white">
              <Shield className="w-4 h-4 text-[#EA580C]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#0F172A] font-heading">
                  SAMADHAN<span className="text-[#C2410C]">SETU</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase font-mono bg-stone-100 text-stone-800 border border-stone-300">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-stone-500 font-medium tracking-tight mt-0.5 hidden sm:block">
                GovTech Societal Innovation Platform
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              id="nav-home"
              onClick={() => setActivePage('landing')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-colors cursor-pointer ${
                activePage === 'landing' || activePage === 'home'
                  ? 'text-[#0F172A] bg-stone-100 font-bold border-b-2 border-[#C2410C]'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              Home
            </button>

            <button
              id="nav-report"
              onClick={onOpenReportModal}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-colors cursor-pointer ${
                activePage === 'report'
                  ? 'text-[#C2410C] bg-orange-50 font-bold border-b-2 border-[#C2410C]'
                  : 'text-[#C2410C] hover:text-[#9A3412] hover:bg-orange-50/60'
              }`}
            >
              Report Challenge
            </button>

            <button
              id="nav-explore"
              onClick={() => setActivePage('explore')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-colors cursor-pointer ${
                activePage === 'explore' || activePage === 'details'
                  ? 'text-[#0F172A] bg-stone-100 font-bold border-b-2 border-[#C2410C]'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              Explore Challenges
            </button>

            {/* Portals / Dashboards Dropdown */}
            <div className="relative">
              <button
                id="nav-portals-menu"
                onClick={() => setPortalsDropdownOpen(!portalsDropdownOpen)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-colors cursor-pointer flex items-center gap-1 ${
                  isPortalActive
                    ? 'text-[#0F172A] bg-stone-100 font-bold border-b-2 border-[#C2410C]'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                }`}
              >
                <span>Dashboards</span>
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </button>

              {portalsDropdownOpen && (
                <div 
                  className="absolute left-0 mt-1 w-52 bg-white rounded-xl shadow-lg border border-stone-200 p-1.5 z-50 animate-in fade-in duration-100"
                  onMouseLeave={() => setPortalsDropdownOpen(false)}
                >
                  <button
                    onClick={() => { setActivePage('government'); setPortalsDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium cursor-pointer ${
                      activePage === 'government' ? 'bg-stone-100 font-bold text-[#0F172A]' : 'text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    Govt Command Center
                  </button>
                  <button
                    onClick={() => { setActivePage('university'); setPortalsDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium cursor-pointer ${
                      activePage === 'university' ? 'bg-stone-100 font-bold text-[#0F172A]' : 'text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    University R&D Hub
                  </button>
                  <button
                    onClick={() => { setActivePage('workspace'); setPortalsDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium cursor-pointer ${
                      activePage === 'workspace' ? 'bg-stone-100 font-bold text-[#0F172A]' : 'text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    Project Workspace
                  </button>
                  <button
                    onClick={() => { setActivePage('industry'); setPortalsDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium cursor-pointer ${
                      activePage === 'industry' ? 'bg-stone-100 font-bold text-[#0F172A]' : 'text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    Industry & CSR Hub
                  </button>
                </div>
              )}
            </div>

            <button
              id="nav-impact"
              onClick={() => setActivePage('impact')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-colors cursor-pointer ${
                activePage === 'impact'
                  ? 'text-[#0F172A] bg-stone-100 font-bold border-b-2 border-[#C2410C]'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              Impact
            </button>

            <button
              id="nav-about"
              onClick={() => setActivePage('about')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-colors cursor-pointer ${
                activePage === 'about'
                  ? 'text-[#0F172A] bg-stone-100 font-bold border-b-2 border-[#C2410C]'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              About
            </button>
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Global Search Button */}
            <button
              id="global-search-btn"
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-2.5 py-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors border border-stone-200 text-xs font-medium cursor-pointer"
              title="Search Challenges & Projects (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-stone-500" />
              <span className="hidden sm:inline text-stone-500">Search</span>
              <kbd className="hidden sm:inline px-1.5 py-0.5 text-[10px] font-mono text-stone-400 bg-stone-50 border border-stone-200 rounded">
                ⌘K
              </kbd>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                id="notifications-toggle-btn"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-stone-200"
                title="Platform Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EA580C] rounded-full"></span>
              </button>

              {/* Notifications Popover */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-stone-200 p-4 z-50 animate-in fade-in duration-100">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                    <h4 className="font-semibold text-stone-900 text-xs flex items-center gap-1.5 uppercase tracking-wide font-mono">
                      <Bell className="w-3.5 h-3.5 text-stone-500" />
                      Platform Notifications
                    </h4>
                    <span className="text-[11px] text-stone-500 font-medium cursor-pointer hover:underline">
                      Mark all read
                    </span>
                  </div>
                  <div className="divide-y divide-stone-100 max-h-64 overflow-y-auto mt-1">
                    {notifications.map((n) => (
                      <div key={n.id} className="py-2.5 px-1 hover:bg-stone-50 rounded-lg transition-colors cursor-pointer">
                        <div className="flex items-start justify-between">
                          <span className="text-xs font-semibold text-stone-900 flex items-center gap-1.5">
                            {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]"></span>}
                            {n.title}
                          </span>
                          <span className="text-[10px] text-stone-400 font-mono">{n.time}</span>
                        </div>
                        <p className="text-xs text-stone-600 mt-0.5">{n.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2.5 border-t border-stone-100 text-center">
                    <button 
                      onClick={() => { setNotificationsOpen(false); setActivePage('explore'); }}
                      className="text-xs font-semibold text-[#0F172A] hover:text-[#C2410C] flex items-center justify-center gap-1 w-full"
                    >
                      View all activity <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* AI Copilot Trigger */}
            {onOpenCopilot && (
              <button
                id="nav-copilot-btn"
                onClick={onOpenCopilot}
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#0F172A] text-white hover:bg-[#1E293B] transition-all cursor-pointer"
                title="Open SAMADHAN AI Copilot"
              >
                <Bot className="w-3.5 h-3.5 text-[#EA580C]" />
                <span>SAMADHAN AI</span>
              </button>
            )}

            {/* Role Switcher / Profile */}
            <div className="relative">
              <button
                id="role-switcher-dropdown"
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-2 px-2.5 py-1 rounded-lg border border-stone-200 hover:border-stone-300 bg-stone-50 hover:bg-stone-100 transition-all cursor-pointer text-left"
              >
                <div className="w-6 h-6 rounded bg-[#0F172A] text-white flex items-center justify-center font-bold text-[11px]">
                  {currentRole.charAt(0)}
                </div>
                <div className="hidden sm:block">
                  <div className="text-[11px] font-bold text-stone-800 flex items-center gap-1">
                    {currentRoleInfo.label}
                    <ChevronDown className="w-3 h-3 text-stone-400" />
                  </div>
                </div>
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-60 bg-white rounded-xl shadow-xl border border-stone-200 p-2 z-50 animate-in fade-in duration-100">
                  <div className="px-2.5 py-1.5 border-b border-stone-100">
                    <p className="text-xs font-bold text-stone-900">User Perspective</p>
                    <p className="text-[10px] text-stone-500">Switch role for tailored views</p>
                  </div>
                  <div className="py-1 space-y-0.5">
                    {roles.map((r) => (
                      <button
                        key={r.role}
                        id={`role-option-${r.role}`}
                        onClick={() => {
                          setCurrentRole(r.role);
                          setRoleDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left text-xs transition-colors cursor-pointer ${
                          currentRole === r.role ? 'bg-stone-100 font-bold text-[#0F172A]' : 'text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        <div>
                          <div className="font-semibold">{r.label}</div>
                          <div className="text-[10px] text-stone-400">{r.badge}</div>
                        </div>
                        {currentRole === r.role && <CheckCircle2 className="w-3.5 h-3.5 text-[#065F46]" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-4 py-3 space-y-1 shadow-md">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenReportModal();
            }}
            className="w-full py-2.5 px-3 mb-2 rounded-lg font-bold text-xs bg-[#C2410C] hover:bg-[#9A3412] text-white flex items-center justify-center gap-1.5"
          >
            <span>+</span>
            <span>Report a Challenge</span>
          </button>

          <div className="divide-y divide-stone-100">
            <div className="space-y-0.5 pb-2">
              <button
                onClick={() => { setActivePage('landing'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold ${
                  activePage === 'landing' ? 'bg-stone-100 text-[#0F172A]' : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => { setActivePage('explore'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold ${
                  activePage === 'explore' ? 'bg-stone-100 text-[#0F172A]' : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                Explore Challenges
              </button>
              <button
                onClick={() => { setActivePage('impact'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold ${
                  activePage === 'impact' ? 'bg-stone-100 text-[#0F172A]' : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                Impact
              </button>
              <button
                onClick={() => { setActivePage('about'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold ${
                  activePage === 'about' ? 'bg-stone-100 text-[#0F172A]' : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                About
              </button>
            </div>

            <div className="pt-2 space-y-0.5">
              <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider px-3">Portals</span>
              <button
                onClick={() => { setActivePage('government'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium ${
                  activePage === 'government' ? 'bg-stone-100 font-bold text-[#0F172A]' : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                Govt Command Center
              </button>
              <button
                onClick={() => { setActivePage('university'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium ${
                  activePage === 'university' ? 'bg-stone-100 font-bold text-[#0F172A]' : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                University R&D Hub
              </button>
              <button
                onClick={() => { setActivePage('workspace'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium ${
                  activePage === 'workspace' ? 'bg-stone-100 font-bold text-[#0F172A]' : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                Project Workspace
              </button>
              <button
                onClick={() => { setActivePage('industry'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium ${
                  activePage === 'industry' ? 'bg-stone-100 font-bold text-[#0F172A]' : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                Industry & CSR Hub
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

