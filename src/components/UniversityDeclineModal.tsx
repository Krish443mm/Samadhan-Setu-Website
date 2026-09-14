import React, { useState } from 'react';
import { 
  AlertTriangle, 
  X, 
  GraduationCap, 
  Building2, 
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { Challenge } from '../types';

interface UniversityDeclineModalProps {
  isOpen: boolean;
  onClose: () => void;
  challenge: Challenge | null;
  onConfirmDecline: (reason: string, rerouteTo: string) => void;
}

export const UniversityDeclineModal: React.FC<UniversityDeclineModalProps> = ({
  isOpen,
  onClose,
  challenge,
  onConfirmDecline
}) => {
  const [selectedReason, setSelectedReason] = useState('Laboratory facilities currently allocated to high-throughput research');
  const [rerouteTo, setRerouteTo] = useState('IIT (ISM) Dhanbad');
  const [customNotes, setCustomNotes] = useState('');

  if (!isOpen || !challenge) return null;

  const reasons = [
    'Laboratory facilities currently allocated to high-throughput research',
    'Challenge domain better suited for metallurgical / mining specialists',
    'Faculty guide cohort full for current academic semester',
    'Requires specialized certification testing not available on campus'
  ];

  const handleDecline = () => {
    const finalReason = customNotes ? `${selectedReason} - Note: ${customNotes}` : selectedReason;
    onConfirmDecline(finalReason, rerouteTo);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 text-orange-600 font-bold text-sm">
            <AlertTriangle className="w-5 h-5" />
            <span>Decline / Reroute Challenge</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-900 font-heading">
            Decline Academic R&D Assignment
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Releasing: <strong className="text-slate-800">{challenge.title}</strong>
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Declining this challenge will free your lab capacity and allow the AI engine to re-assign it to the next best matched university in Jharkhand.
          </p>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Reason for Declining *
            </label>
            <div className="space-y-1.5">
              {reasons.map((r) => (
                <label 
                  key={r}
                  className={`flex items-start gap-2 p-2.5 rounded-xl border cursor-pointer transition-colors ${
                    selectedReason === r ? 'bg-orange-50/80 border-orange-300 text-orange-950 font-semibold' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <input 
                    type="radio" 
                    name="declineReason" 
                    checked={selectedReason === r} 
                    onChange={() => setSelectedReason(r)}
                    className="mt-0.5 text-orange-600 focus:ring-orange-500"
                  />
                  <span>{r}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Recommend Alternative University / Lab
            </label>
            <select
              value={rerouteTo}
              onChange={(e) => setRerouteTo(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium bg-white"
            >
              <option value="IIT (ISM) Dhanbad">IIT (ISM) Dhanbad (Mining & Mineral Chemistry)</option>
              <option value="NIT Jamshedpur">NIT Jamshedpur (Electronics & Applied Mechanics)</option>
              <option value="Birsa Agricultural University (BAU)">Birsa Agricultural University (Bio & Soil Science)</option>
              <option value="BIT Mesra, Ranchi">BIT Mesra, Ranchi (Civil & Remote Sensing)</option>
              <option value="CSIR-CIMFR">CSIR-CIMFR Dhanbad (Fuel & Environment Research)</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Additional Review Feedback (Optional)
            </label>
            <input 
              type="text"
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              placeholder="e.g. Recommended partnering with regional PHED engineers directly..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleDecline}
            className="px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-md cursor-pointer transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Confirm & Reroute Challenge</span>
          </button>
        </div>

      </div>
    </div>
  );
};
