import React, { useState } from 'react';
import { 
  MapPin, 
  Layers, 
  TrendingUp, 
  CheckCircle2, 
  Users, 
  GraduationCap, 
  Activity, 
  Info,
  ShieldCheck,
  ChevronRight,
  Filter
} from 'lucide-react';

export interface DistrictData {
  id: string;
  name: string;
  division: 'Palamu' | 'North Chotanagpur' | 'South Chotanagpur' | 'Kolhan' | 'Santhal Pargana';
  challengesCount: number;
  criticalCount: number;
  deployedSolutions: number;
  citizensImpacted: string;
  leadDomain: string;
  primaryInstitute: string;
  riskTier: 'Critical' | 'High' | 'Moderate';
  // SVG positioning coordinates (relative 0-1000 viewBox)
  svgX: number;
  svgY: number;
  width?: number;
  height?: number;
  path?: string;
}

export const JHARKHAND_DISTRICTS_DATA: DistrictData[] = [
  // Palamu Division (North-West)
  {
    id: 'garhwa',
    name: 'Garhwa',
    division: 'Palamu',
    challengesCount: 420,
    criticalCount: 68,
    deployedSolutions: 3,
    citizensImpacted: '38,000',
    leadDomain: 'Water & Drought Resilience',
    primaryInstitute: 'Nilamber Pitamber University',
    riskTier: 'High',
    svgX: 130,
    svgY: 175,
    path: 'M 70 140 L 160 115 L 180 180 L 140 235 L 75 210 Z'
  },
  {
    id: 'palamu',
    name: 'Palamu',
    division: 'Palamu',
    challengesCount: 610,
    criticalCount: 95,
    deployedSolutions: 4,
    citizensImpacted: '52,000',
    leadDomain: 'Groundwater Arsenic & Soil Salinity',
    primaryInstitute: 'Birsa Agricultural Research Sub-Station',
    riskTier: 'High',
    svgX: 235,
    svgY: 195,
    path: 'M 180 115 L 290 125 L 285 220 L 185 235 Z'
  },
  {
    id: 'latehar',
    name: 'Latehar',
    division: 'Palamu',
    challengesCount: 390,
    criticalCount: 45,
    deployedSolutions: 3,
    citizensImpacted: '29,000',
    leadDomain: 'Forest Livelihoods & Mini-Grids',
    primaryInstitute: 'BIT Mesra Extension Center',
    riskTier: 'Moderate',
    svgX: 250,
    svgY: 290,
    path: 'M 185 235 L 285 220 L 310 320 L 210 340 Z'
  },

  // North Chotanagpur (North-Central)
  {
    id: 'chatra',
    name: 'Chatra',
    division: 'North Chotanagpur',
    challengesCount: 480,
    criticalCount: 62,
    deployedSolutions: 3,
    citizensImpacted: '34,000',
    leadDomain: 'Rural Road Connectivity & Solar Storage',
    primaryInstitute: 'Vinoba Bhave University',
    riskTier: 'Moderate',
    svgX: 355,
    svgY: 195,
    path: 'M 290 125 L 390 140 L 400 240 L 285 220 Z'
  },
  {
    id: 'hazaribagh',
    name: 'Hazaribagh',
    division: 'North Chotanagpur',
    challengesCount: 820,
    criticalCount: 110,
    deployedSolutions: 6,
    citizensImpacted: '78,000',
    leadDomain: 'Vegetable Cold Chain & Soil Nutrients',
    primaryInstitute: 'Vinoba Bhave University, Hazaribagh',
    riskTier: 'Moderate',
    svgX: 450,
    svgY: 230,
    path: 'M 400 170 L 490 175 L 500 270 L 395 260 Z'
  },
  {
    id: 'koderma',
    name: 'Koderma',
    division: 'North Chotanagpur',
    challengesCount: 380,
    criticalCount: 42,
    deployedSolutions: 2,
    citizensImpacted: '24,000',
    leadDomain: 'Mica Belt Mine Rehabilitation',
    primaryInstitute: 'VBU Science Extension Lab',
    riskTier: 'Moderate',
    svgX: 465,
    svgY: 130,
    path: 'M 390 115 L 515 110 L 490 175 L 400 170 Z'
  },
  {
    id: 'giridih',
    name: 'Giridih',
    division: 'North Chotanagpur',
    challengesCount: 640,
    criticalCount: 78,
    deployedSolutions: 4,
    citizensImpacted: '61,000',
    leadDomain: 'Parasnath Hill Agro-Forestry & Solar Microgrids',
    primaryInstitute: 'Giridih Mining & Science College',
    riskTier: 'Moderate',
    svgX: 580,
    svgY: 180,
    path: 'M 515 110 L 640 125 L 630 225 L 490 175 Z'
  },
  {
    id: 'bokaro',
    name: 'Bokaro',
    division: 'North Chotanagpur',
    challengesCount: 980,
    criticalCount: 130,
    deployedSolutions: 7,
    citizensImpacted: '94,000',
    leadDomain: 'Industrial Effluent & Steel Byproduct Recycling',
    primaryInstitute: 'IIT ISM Extension / Bokaro Steel Tech Lab',
    riskTier: 'Moderate',
    svgX: 560,
    svgY: 280,
    path: 'M 495 245 L 615 235 L 625 320 L 510 325 Z'
  },
  {
    id: 'dhanbad',
    name: 'Dhanbad',
    division: 'North Chotanagpur',
    challengesCount: 1420,
    criticalCount: 290,
    deployedSolutions: 11,
    citizensImpacted: '185,000',
    leadDomain: 'Jharia Coal Mine Fire & PM2.5 Haulage Fogging',
    primaryInstitute: 'IIT (ISM) Dhanbad & CSIR-CIMFR',
    riskTier: 'Critical',
    svgX: 685,
    svgY: 275,
    path: 'M 615 225 L 720 230 L 735 320 L 625 320 Z'
  },
  {
    id: 'ramgarh',
    name: 'Ramgarh',
    division: 'North Chotanagpur',
    challengesCount: 520,
    criticalCount: 74,
    deployedSolutions: 4,
    citizensImpacted: '46,000',
    leadDomain: 'Damodar River Watershed & Mineral Haulage Roads',
    primaryInstitute: 'BIT Mesra Remote Sensing Center',
    riskTier: 'Moderate',
    svgX: 470,
    svgY: 310,
    path: 'M 430 270 L 510 270 L 510 340 L 430 340 Z'
  },

  // South Chotanagpur (Central & South-West)
  {
    id: 'ranchi',
    name: 'Ranchi',
    division: 'South Chotanagpur',
    challengesCount: 1840,
    criticalCount: 220,
    deployedSolutions: 18,
    citizensImpacted: '240,000',
    leadDomain: 'Subernarekha River Purity & Urban Traffic Optimization',
    primaryInstitute: 'BIT Mesra & Birsa Agricultural University',
    riskTier: 'High',
    svgX: 430,
    svgY: 380,
    path: 'M 350 330 L 485 335 L 505 430 L 375 425 Z'
  },
  {
    id: 'lohardaga',
    name: 'Lohardaga',
    division: 'South Chotanagpur',
    challengesCount: 310,
    criticalCount: 38,
    deployedSolutions: 2,
    citizensImpacted: '22,000',
    leadDomain: 'Bauxite Haulage Dust & Rainwater Retention',
    primaryInstitute: 'Ranchi University Science Campus',
    riskTier: 'Moderate',
    svgX: 305,
    svgY: 350,
    path: 'M 265 315 L 350 330 L 340 395 L 260 375 Z'
  },
  {
    id: 'gumla',
    name: 'Gumla',
    division: 'South Chotanagpur',
    challengesCount: 540,
    criticalCount: 72,
    deployedSolutions: 4,
    citizensImpacted: '48,000',
    leadDomain: 'Ragi & Minor Millets Solar Dehydration Units',
    primaryInstitute: 'Birsa Agricultural University Zonal Station',
    riskTier: 'Moderate',
    svgX: 250,
    svgY: 435,
    path: 'M 190 370 L 320 380 L 305 500 L 195 470 Z'
  },
  {
    id: 'simdega',
    name: 'Simdega',
    division: 'South Chotanagpur',
    challengesCount: 360,
    criticalCount: 44,
    deployedSolutions: 3,
    citizensImpacted: '28,000',
    leadDomain: 'Tribal Solar Cold Chains & Rural Telehealth',
    primaryInstitute: 'BAU Krishi Vigyan Kendra',
    riskTier: 'Moderate',
    svgX: 245,
    svgY: 560,
    path: 'M 185 470 L 305 500 L 290 620 L 180 580 Z'
  },
  {
    id: 'khunti',
    name: 'Khunti',
    division: 'South Chotanagpur',
    challengesCount: 870,
    criticalCount: 145,
    deployedSolutions: 7,
    citizensImpacted: '82,000',
    leadDomain: 'Tribal Lac Processing & Solar Phase-Change Vaults',
    primaryInstitute: 'ICAR National Institute of Secondary Agriculture',
    riskTier: 'High',
    svgX: 410,
    svgY: 460,
    path: 'M 350 425 L 470 425 L 450 515 L 335 500 Z'
  },

  // Kolhan Division (South-East)
  {
    id: 'west-singhbhum',
    name: 'West Singhbhum (Chaibasa)',
    division: 'Kolhan',
    challengesCount: 780,
    criticalCount: 120,
    deployedSolutions: 5,
    citizensImpacted: '75,000',
    leadDomain: 'Saranda Elephant Corridor Acoustic Mesh Network',
    primaryInstitute: 'Kolhan University, Chaibasa',
    riskTier: 'High',
    svgX: 420,
    svgY: 575,
    path: 'M 330 500 L 480 510 L 490 670 L 340 660 Z'
  },
  {
    id: 'saraikela-kharsawan',
    name: 'Saraikela Kharsawan',
    division: 'Kolhan',
    challengesCount: 560,
    criticalCount: 76,
    deployedSolutions: 4,
    citizensImpacted: '49,000',
    leadDomain: 'Auto Ancillary Pollution & Skill Apprenticeship',
    primaryInstitute: 'NIT Jamshedpur Extension Labs',
    riskTier: 'Moderate',
    svgX: 540,
    svgY: 480,
    path: 'M 470 435 L 590 425 L 590 535 L 480 515 Z'
  },
  {
    id: 'east-singhbhum',
    name: 'East Singhbhum (Jamshedpur)',
    division: 'Kolhan',
    challengesCount: 1290,
    criticalCount: 180,
    deployedSolutions: 12,
    citizensImpacted: '146,000',
    leadDomain: 'Subernarekha Heavy Metals & Industrial Runoff',
    primaryInstitute: 'National Institute of Technology (NIT) Jamshedpur',
    riskTier: 'High',
    svgX: 645,
    svgY: 510,
    path: 'M 590 435 L 720 440 L 710 590 L 590 545 Z'
  },

  // Santhal Pargana Division (North-East)
  {
    id: 'deoghar',
    name: 'Deoghar',
    division: 'Santhal Pargana',
    challengesCount: 690,
    criticalCount: 88,
    deployedSolutions: 5,
    citizensImpacted: '67,000',
    leadDomain: 'Pilgrim Crowd Telemetry & Urban Sanitation',
    primaryInstitute: 'AIIMS Deoghar & BIT Extension',
    riskTier: 'Moderate',
    svgX: 690,
    svgY: 155,
    path: 'M 640 120 L 745 130 L 730 205 L 630 190 Z'
  },
  {
    id: 'dumka',
    name: 'Dumka',
    division: 'Santhal Pargana',
    challengesCount: 760,
    criticalCount: 140,
    deployedSolutions: 6,
    citizensImpacted: '73,000',
    leadDomain: 'Tribal Sickle Cell Diagnostics & Maternal Telehealth',
    primaryInstitute: 'Sido Kanhu Murmu University (SKMU)',
    riskTier: 'Critical',
    svgX: 785,
    svgY: 190,
    path: 'M 730 150 L 840 150 L 830 245 L 725 225 Z'
  },
  {
    id: 'jamtara',
    name: 'Jamtara',
    division: 'Santhal Pargana',
    challengesCount: 440,
    criticalCount: 54,
    deployedSolutions: 3,
    citizensImpacted: '32,000',
    leadDomain: 'Cyber Literacy & Solar Agriculture Kiosks',
    primaryInstitute: 'SKMU Science College Jamtara',
    riskTier: 'Moderate',
    svgX: 745,
    svgY: 260,
    path: 'M 720 225 L 810 230 L 800 305 L 720 295 Z'
  },
  {
    id: 'godda',
    name: 'Godda',
    division: 'Santhal Pargana',
    challengesCount: 510,
    criticalCount: 65,
    deployedSolutions: 4,
    citizensImpacted: '41,000',
    leadDomain: 'Thermal Plant Ash Dispersion & Soil Remediation',
    primaryInstitute: 'SKMU Godda College',
    riskTier: 'Moderate',
    svgX: 840,
    svgY: 110,
    path: 'M 770 70 L 870 80 L 860 170 L 760 150 Z'
  },
  {
    id: 'pakur',
    name: 'Pakur',
    division: 'Santhal Pargana',
    challengesCount: 460,
    criticalCount: 60,
    deployedSolutions: 3,
    citizensImpacted: '35,000',
    leadDomain: 'Stone Crusher Silicosis Prevention & Safe Water',
    primaryInstitute: 'SKMU Technical Extension Unit',
    riskTier: 'Moderate',
    svgX: 890,
    svgY: 180,
    path: 'M 845 150 L 925 155 L 920 240 L 835 230 Z'
  },
  {
    id: 'sahibganj',
    name: 'Sahibganj',
    division: 'Santhal Pargana',
    challengesCount: 550,
    criticalCount: 82,
    deployedSolutions: 4,
    citizensImpacted: '48,000',
    leadDomain: 'Ganges River Soil Erosion & Inland Waterway Logistics',
    primaryInstitute: 'Sahibganj College (SKMU)',
    riskTier: 'High',
    svgX: 905,
    svgY: 105,
    path: 'M 870 75 L 950 85 L 940 160 L 855 155 Z'
  }
];

interface JharkhandMapProps {
  selectedDistrict: string;
  onSelectDistrict: (districtName: string) => void;
  className?: string;
  compact?: boolean;
}

export const JharkhandMap: React.FC<JharkhandMapProps> = ({
  selectedDistrict,
  onSelectDistrict,
  className = '',
  compact = false
}) => {
  const [activeLayer, setActiveLayer] = useState<'density' | 'impact' | 'universities'>('density');
  const [hoveredDistrict, setHoveredDistrict] = useState<DistrictData | null>(null);
  const [selectedDivisionFilter, setSelectedDivisionFilter] = useState<string>('All');

  // Selected district info object
  const activeDistrictInfo = JHARKHAND_DISTRICTS_DATA.find(
    d => d.name === selectedDistrict || selectedDistrict.includes(d.name)
  ) || hoveredDistrict || JHARKHAND_DISTRICTS_DATA.find(d => d.id === 'ranchi');

  const divisions = ['All', 'South Chotanagpur', 'North Chotanagpur', 'Kolhan', 'Santhal Pargana', 'Palamu'];

  const filteredDistricts = selectedDivisionFilter === 'All'
    ? JHARKHAND_DISTRICTS_DATA
    : JHARKHAND_DISTRICTS_DATA.filter(d => d.division === selectedDivisionFilter);

  // Helper for color coding district paths
  const getDistrictColor = (d: DistrictData) => {
    const isSelected = selectedDistrict === d.name || selectedDistrict.includes(d.name);
    const isHovered = hoveredDistrict?.id === d.id;

    if (isSelected) {
      return 'fill-[#0F172A] stroke-[#C2410C] stroke-2';
    }

    if (activeLayer === 'density') {
      if (d.riskTier === 'Critical') {
        return isHovered 
          ? 'fill-[#991B1B] stroke-[#FAF9F5] stroke-2' 
          : 'fill-[#DC2626] stroke-[#FAF9F5]/70 stroke-[1.5]';
      }
      if (d.riskTier === 'High') {
        return isHovered 
          ? 'fill-[#C2410C] stroke-[#FAF9F5] stroke-2' 
          : 'fill-[#EA580C] stroke-[#FAF9F5]/70 stroke-[1.5]';
      }
      return isHovered 
        ? 'fill-[#D97706] stroke-[#FAF9F5] stroke-2' 
        : 'fill-[#F59E0B]/85 stroke-[#FAF9F5]/70 stroke-[1.5]';
    }

    if (activeLayer === 'impact') {
      if (d.deployedSolutions >= 10) {
        return isHovered 
          ? 'fill-[#064E3B] stroke-[#FAF9F5] stroke-2' 
          : 'fill-[#065F46] stroke-[#FAF9F5]/70 stroke-[1.5]';
      }
      if (d.deployedSolutions >= 5) {
        return isHovered 
          ? 'fill-[#047857] stroke-[#FAF9F5] stroke-2' 
          : 'fill-[#10B981] stroke-[#FAF9F5]/70 stroke-[1.5]';
      }
      return isHovered 
        ? 'fill-[#059669] stroke-[#FAF9F5] stroke-2' 
        : 'fill-[#34D399] stroke-[#FAF9F5]/70 stroke-[1.5]';
    }

    // Universities layer
    if (d.id === 'ranchi' || d.id === 'dhanbad' || d.id === 'east-singhbhum') {
      return isHovered 
        ? 'fill-[#1E1B4B] stroke-[#FAF9F5] stroke-2' 
        : 'fill-[#312E81] stroke-[#FAF9F5]/70 stroke-[1.5]';
    }
    return isHovered 
      ? 'fill-[#4338CA] stroke-[#FAF9F5] stroke-2' 
      : 'fill-[#6366F1]/80 stroke-[#FAF9F5]/70 stroke-[1.5]';
  };

  return (
    <div className={`bg-white rounded-2xl border border-stone-200/90 shadow-sm overflow-hidden ${className}`}>
      
      {/* Map Control Bar */}
      <div className="p-4 sm:p-5 border-b border-stone-200/80 bg-[#FAF9F5]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#0F172A] text-[#FAF9F5]">
              <MapPin className="w-3 h-3 text-[#EA580C]" />
              Jharkhand Geospatial Telemetry
            </span>
            <span className="text-xs text-stone-500 font-medium">
              24 Districts · 5 Administrative Divisions
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#0F172A] font-heading mt-1">
            Statewide Civic Innovation Heatmap
          </h3>
        </div>

        {/* Layer Switcher */}
        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200 self-start sm:self-auto">
          <button
            onClick={() => setActiveLayer('density')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeLayer === 'density' 
                ? 'bg-[#0F172A] text-white shadow-2xs' 
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Challenge Density
          </button>
          <button
            onClick={() => setActiveLayer('impact')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeLayer === 'impact' 
                ? 'bg-[#065F46] text-white shadow-2xs' 
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Field Pilots & Impact
          </button>
          <button
            onClick={() => setActiveLayer('universities')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeLayer === 'universities' 
                ? 'bg-[#1E1B4B] text-white shadow-2xs' 
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            University Labs
          </button>
        </div>
      </div>

      {/* Division quick filter chips */}
      {!compact && (
        <div className="px-4 py-2 bg-stone-50 border-b border-stone-200/70 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-stone-400 font-medium whitespace-nowrap flex items-center gap-1">
            <Filter className="w-3 h-3" /> Division:
          </span>
          {divisions.map((div) => (
            <button
              key={div}
              onClick={() => setSelectedDivisionFilter(div)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors whitespace-nowrap cursor-pointer ${
                selectedDivisionFilter === div
                  ? 'bg-stone-800 text-white font-semibold'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}
            >
              {div}
            </button>
          ))}
          {selectedDistrict !== 'All' && (
            <button
              onClick={() => onSelectDistrict('All')}
              className="ml-auto px-2.5 py-1 rounded-md text-[11px] font-bold text-[#C2410C] bg-[#C2410C]/10 hover:bg-[#C2410C]/20 transition-colors whitespace-nowrap"
            >
              Reset to Statewide View (All)
            </button>
          )}
        </div>
      )}

      {/* Main Map Presentation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 relative">
        
        {/* SVG Interactive Map Canvas */}
        <div className={`${compact ? 'lg:col-span-12' : 'lg:col-span-8'} p-4 sm:p-6 bg-gradient-to-b from-[#FAF9F5] to-white relative flex flex-col items-center justify-center min-h-[380px]`}>
          
          {/* Subtle River & Contour Watermarks */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#0F172A_1px,transparent_1px)] [background-size:16px_16px]"></div>

          <svg 
            viewBox="50 50 920 620" 
            className="w-full max-w-[680px] h-auto max-h-[460px] drop-shadow-sm select-none"
            aria-label="Stylized Map of Jharkhand Districts"
          >
            <defs>
              <filter id="jharkhand-shadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.08" />
              </filter>
            </defs>

            {/* Simulated River Systems (Damodar & Subernarekha) */}
            <path
              d="M 280 320 Q 420 320 540 280 T 730 280"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="2.5"
              strokeDasharray="4 3"
              opacity="0.4"
            />
            <path
              d="M 430 380 Q 520 460 620 490 T 720 580"
              fill="none"
              stroke="#0EA5E9"
              strokeWidth="2.5"
              strokeDasharray="4 3"
              opacity="0.4"
            />

            {/* Districts Polygons */}
            {JHARKHAND_DISTRICTS_DATA.map((dist) => {
              const isSelected = selectedDistrict === dist.name || selectedDistrict.includes(dist.name);
              const isDimmed = selectedDivisionFilter !== 'All' && dist.division !== selectedDivisionFilter;
              
              return (
                <g 
                  key={dist.id}
                  className={`cursor-pointer transition-all duration-200 ${isDimmed ? 'opacity-25' : 'opacity-100'}`}
                  onClick={() => onSelectDistrict(dist.name)}
                  onMouseEnter={() => setHoveredDistrict(dist)}
                  onMouseLeave={() => setHoveredDistrict(null)}
                >
                  <path
                    d={dist.path}
                    className={`${getDistrictColor(dist)} transition-all duration-300`}
                    filter={isSelected ? 'url(#jharkhand-shadow)' : undefined}
                  />

                  {/* District Center Node */}
                  <circle
                    cx={dist.svgX}
                    cy={dist.svgY}
                    r={isSelected ? 6 : 4}
                    className={`${isSelected ? 'fill-white stroke-[#0F172A] stroke-2' : 'fill-white/90 stroke-stone-900/40'}`}
                  />

                  {/* District Text Label */}
                  <text
                    x={dist.svgX}
                    y={dist.svgY + 14}
                    textAnchor="middle"
                    className={`text-[9px] font-bold tracking-tight pointer-events-none ${
                      isSelected ? 'fill-white font-extrabold' : 'fill-stone-900'
                    }`}
                    style={{ textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}
                  >
                    {dist.name.split(' ')[0]}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Map Legend Overlay */}
          <div className="w-full mt-4 pt-3 border-t border-stone-200/80 flex flex-wrap items-center justify-between text-xs text-stone-500 gap-2">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-stone-700">Legend:</span>
              {activeLayer === 'density' && (
                <>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#DC2626]"></span> Critical Focus</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#EA580C]"></span> High Volume</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#F59E0B]"></span> Active Intake</span>
                </>
              )}
              {activeLayer === 'impact' && (
                <>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#065F46]"></span> 10+ Deployed</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#10B981]"></span> 5-9 Deployed</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#34D399]"></span> 1-4 Pilots</span>
                </>
              )}
              {activeLayer === 'universities' && (
                <>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#1E1B4B]"></span> Tier-1 Hubs</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#6366F1]"></span> Zonal Labs</span>
                </>
              )}
            </div>

            <div className="text-[11px] text-stone-400">
              Click any district to filter live challenges
            </div>
          </div>
        </div>

        {/* Selected District Telemetry Dossier */}
        {!compact && activeDistrictInfo && (
          <div className="lg:col-span-4 p-5 sm:p-6 bg-stone-50/90 border-t lg:border-t-0 lg:border-l border-stone-200/80 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-stone-200/80 text-stone-800">
                  {activeDistrictInfo.division} Division
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                  activeDistrictInfo.riskTier === 'Critical' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {activeDistrictInfo.riskTier} Urgency
                </span>
              </div>

              <div>
                <h4 className="text-2xl font-extrabold text-[#0F172A] font-heading">
                  {activeDistrictInfo.name}
                </h4>
                <p className="text-xs text-stone-600 mt-1">
                  Primary Challenge Domain: <strong className="text-stone-900">{activeDistrictInfo.leadDomain}</strong>
                </p>
              </div>

              {/* Stat Grid */}
              <div className="grid grid-cols-2 gap-2.5 pt-2">
                <div className="p-3 bg-white rounded-xl border border-stone-200/90 shadow-2xs">
                  <div className="text-[10px] uppercase font-bold text-stone-400">Total Challenges</div>
                  <div className="text-xl font-extrabold text-[#0F172A] font-heading mt-0.5">
                    {activeDistrictInfo.challengesCount.toLocaleString()}
                  </div>
                  <div className="text-[10px] font-semibold text-[#DC2626] mt-0.5">
                    {activeDistrictInfo.criticalCount} Critical Priority
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-stone-200/90 shadow-2xs">
                  <div className="text-[10px] uppercase font-bold text-stone-400">Deployed Pilots</div>
                  <div className="text-xl font-extrabold text-[#065F46] font-heading mt-0.5">
                    {activeDistrictInfo.deployedSolutions} Solutions
                  </div>
                  <div className="text-[10px] font-semibold text-stone-500 mt-0.5">
                    {activeDistrictInfo.citizensImpacted} Beneficiaries
                  </div>
                </div>
              </div>

              {/* R&D Partner & Academic Presence */}
              <div className="p-3.5 bg-white rounded-xl border border-stone-200/90 space-y-1.5 shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E1B4B]">
                  <GraduationCap className="w-3.5 h-3.5 text-[#4338CA]" />
                  <span>Lead R&D Partner</span>
                </div>
                <div className="text-xs font-semibold text-stone-800">
                  {activeDistrictInfo.primaryInstitute}
                </div>
                <div className="text-[11px] text-stone-500">
                  Faculties actively testing prototypes in community wards.
                </div>
              </div>

              {/* Direct District Filter Action */}
              <button
                onClick={() => onSelectDistrict(activeDistrictInfo.name)}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-[#0F172A] hover:bg-[#1E293B] text-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Filter Challenges in {activeDistrictInfo.name}</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#EA580C]" />
              </button>
            </div>

            <div className="mt-6 pt-3 border-t border-stone-200 text-[11px] text-stone-400 flex items-center justify-between">
              <span>Govt. of Jharkhand Verified</span>
              <span>Updated Today</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
