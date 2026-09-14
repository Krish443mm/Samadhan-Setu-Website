import React, { useState } from 'react';
import { 
  Building2, 
  HandCoins, 
  CheckCircle2, 
  X, 
  Award, 
  Zap, 
  ShieldCheck,
  TrendingUp,
  FileText
} from 'lucide-react';
import { Challenge } from '../types';

interface IndustryPledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  challenge: Challenge | null;
  onConfirmPledge: (pledgeData: {
    companyName: string;
    pledgeMode: 'Grant' | 'Hardware Tooling' | 'Technical Mentorship' | 'Testing Facilities';
    amount: number;
    contactName: string;
    contactEmail: string;
    notes: string;
  }) => void;
}

export const IndustryPledgeModal: React.FC<IndustryPledgeModalProps> = ({
  isOpen,
  onClose,
  challenge,
  onConfirmPledge
}) => {
  const [companyName, setCompanyName] = useState('Tata Steel Foundation');
  const [pledgeMode, setPledgeMode] = useState<'Grant' | 'Hardware Tooling' | 'Technical Mentorship' | 'Testing Facilities'>('Grant');
  const [amount, setAmount] = useState('1000000'); // 10 Lakhs default
  const [contactName, setContactName] = useState('Vikram Sen (CSR Director)');
  const [contactEmail, setContactEmail] = useState('v.sen@tatasteel-csr.in');
  const [notes, setNotes] = useState('Committed to funding field trials, pilot fabrication, and rural water telemetry hardware.');

  if (!isOpen || !challenge) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmPledge({
      companyName,
      pledgeMode,
      amount: Number(amount) || 500000,
      contactName,
      contactEmail,
      notes
    });
    onClose();
  };

  const presetAmounts = [
    { label: '₹5 Lakhs', val: '500000' },
    { label: '₹10 Lakhs', val: '1000000' },
    { label: '₹25 Lakhs', val: '2500000' },
    { label: '₹50 Lakhs', val: '5000000' }
  ];

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
              <Building2 className="w-3.5 h-3.5" />
              <span>Section 135 CSR & Industry Partnership</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-heading">
              Pledge Industry Collaboration
            </h3>
            <p className="text-xs text-slate-500">
              For Challenge: <strong className="text-slate-800">{challenge.title}</strong>
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Company Name */}
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Company / CSR Foundation Name *
            </label>
            <input 
              type="text"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. Tata Steel Foundation, Coal India CSR, JSPL"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium text-sm focus:ring-2 focus:ring-blue-200 outline-hidden"
            />
          </div>

          {/* Mode of Collaboration */}
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Collaboration / Pledge Mode *
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'Grant', label: 'CSR Seed Grant', icon: HandCoins },
                { id: 'Technical Mentorship', label: 'Tech Mentorship', icon: Award },
                { id: 'Hardware Tooling', label: 'Tooling & Components', icon: Zap },
                { id: 'Testing Facilities', label: 'Industrial Test Lab', icon: ShieldCheck }
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = pledgeMode === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPledgeMode(item.id as any)}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs' 
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="font-bold text-xs">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grant Amount */}
          {pledgeMode === 'Grant' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-bold text-slate-700 uppercase tracking-wider">
                  Pledge Amount (INR) *
                </label>
                <span className="text-blue-600 font-bold text-sm font-mono">
                  ₹{(Number(amount) / 100000).toFixed(2)} Lakhs
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2 mb-2">
                {presetAmounts.map((preset) => (
                  <button
                    key={preset.val}
                    type="button"
                    onClick={() => setAmount(preset.val)}
                    className={`py-1.5 px-2 rounded-lg text-center font-bold border transition-colors cursor-pointer ${
                      amount === preset.val ? 'bg-blue-50 text-blue-700 border-blue-400' : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              <input 
                type="number"
                min="50000"
                step="50000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium text-sm focus:ring-2 focus:ring-blue-200 outline-hidden"
              />
            </div>
          )}

          {/* Contact Representative */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Liaison Officer Name *
              </label>
              <input 
                type="text"
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Official Corporate Email *
              </label>
              <input 
                type="email"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
              />
            </div>
          </div>

          {/* Mentorship / Scope Notes */}
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Collaboration Scope & Support Notes
            </label>
            <textarea 
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Detail specific engineering guidance, equipment access, or milestone requirements..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-medium leading-relaxed"
            />
          </div>

          {/* Disclaimer */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 leading-relaxed">
            By pledging, your organization agrees to enter an institutional MOU with the participating University R&D Cell under Government of Jharkhand innovation guidelines.
          </div>

          {/* Modal Actions */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md cursor-pointer transition-colors"
            >
              Confirm & Submit Pledge
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
