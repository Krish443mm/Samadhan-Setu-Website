import { Challenge, ProjectWorkspace, IndustryOpportunity, ImpactStory, UserRole } from '../types';

export interface CopilotAction {
  id: string;
  label: string;
  type: 'navigate' | 'select_challenge' | 'select_workspace';
  target: string;
}

export interface CopilotAnswer {
  text: string;
  actions?: CopilotAction[];
  followUps?: string[];
  badges?: { label: string; color: string }[];
  sourceTrust?: string;
}

export interface CopilotContext {
  activePage: string;
  currentRole: UserRole;
  selectedChallenge: Challenge | null;
  selectedWorkspace: ProjectWorkspace | null;
  challenges: Challenge[];
  workspaces: ProjectWorkspace[];
  opportunities: IndustryOpportunity[];
  stories: ImpactStory[];
}

export const DEFAULT_SUGGESTED_QUESTIONS = [
  "What are the biggest challenges in Ranchi?",
  "Show high-priority water problems.",
  "Which university is best for this challenge?",
  "Who can help fund this project?",
  "Summarize this project.",
  "What is blocking this project?",
  "Suggest technology for this challenge.",
  "Why is this challenge priority 87?",
  "Which projects have the highest impact?",
  "What should the team do next?"
];

// Contextual Quick Actions per Page
export function getContextualQuickActions(activePage: string, selectedChallenge: Challenge | null, selectedWorkspace: ProjectWorkspace | null): { label: string; query: string }[] {
  if (selectedChallenge || activePage === 'details') {
    return [
      { label: "Analyze this challenge", query: "Analyze this challenge" },
      { label: "Explain priority", query: "Why is this challenge priority 87?" },
      { label: "Find similar challenges", query: "Why are these challenges similar?" },
      { label: "Recommend university", query: "Which university is best for this challenge?" },
      { label: "Recommend industry", query: "Who can help fund this project?" },
      { label: "Suggest technology", query: "Suggest technology for this challenge." }
    ];
  }

  if (selectedWorkspace || activePage === 'workspace') {
    return [
      { label: "Summarize project", query: "Summarize this project." },
      { label: "Identify blockers", query: "What is blocking this project?" },
      { label: "Suggest next step", query: "What should the team do next?" },
      { label: "Find industry support", query: "Who can help fund this project?" },
      { label: "Explain impact", query: "Explain the potential impact of this project." }
    ];
  }

  switch (activePage) {
    case 'government':
      return [
        { label: "Explain trends", query: "What problems are increasing fastest?" },
        { label: "Find critical districts", query: "Which districts need attention?" },
        { label: "Awaiting validation", query: "Show critical challenges awaiting validation." },
        { label: "Generate action summary", query: "What should I do next?" }
      ];
    case 'university':
      return [
        { label: "Recommend challenges", query: "Which challenges best match our expertise?" },
        { label: "Explain 94% match", query: "Why is this challenge a 94% match?" },
        { label: "Projects needing teams", query: "Show projects needing student teams." },
        { label: "Find industry partners", query: "Who can help fund this project?" }
      ];
    case 'industry':
      return [
        { label: "Projects needing IoT", query: "Which projects need IoT support?" },
        { label: "Projects needing funding", query: "Show projects needing funding." },
        { label: "Where to contribute?", query: "Where can our company contribute?" },
        { label: "Explore CSR opportunities", query: "Show projects needing industry support." }
      ];
    case 'impact':
      return [
        { label: "Highest impact projects", query: "Which projects have the highest impact?" },
        { label: "Show impact by district", query: "Show impact by district." },
        { label: "Verified outcomes", query: "Which outcomes are verified?" },
        { label: "Total beneficiaries", query: "How many citizens have been impacted?" }
      ];
    case 'report':
      return [
        { label: "How to describe problem", query: "How do I describe a problem clearly?" },
        { label: "What evidence helps", query: "What evidence helps universities most?" },
        { label: "How priority is calculated", query: "Why is this challenge priority 87?" }
      ];
    case 'explore':
    default:
      return [
        { label: "Biggest challenges in Ranchi", query: "What are the biggest challenges in Ranchi?" },
        { label: "High-priority water problems", query: "Show high-priority water problems." },
        { label: "Need university support", query: "Which challenges need university support?" },
        { label: "Highest impact projects", query: "Which projects have the highest impact?" }
      ];
  }
}

// Generate rich, structured Copilot responses
export function generateCopilotResponse(query: string, context: CopilotContext): CopilotAnswer {
  const q = (query || '').trim().toLowerCase();
  const elephantChallenge = context.challenges.find(c => c.id === 'ch-elephant') || context.challenges[0];
  const waterChallenge = context.challenges.find(c => c.domain === 'Water') || context.challenges[1];
  const elephantWorkspace = context.workspaces.find(w => w.challengeId === 'ch-elephant') || context.workspaces[0];

  const sourceTrust = "Based on: SAMADHANSETU demo dataset • Current project information • AI analysis";

  // 1. "What are the biggest challenges in Ranchi?"
  if (
    q.includes("biggest challenges in ranchi") ||
    (q.includes("challenges") && q.includes("ranchi")) ||
    q.includes("problems in ranchi")
  ) {
    return {
      text: `### TOP CHALLENGE AREAS (RANCHI DISTRICT)

1. **Water & Sanitation**
   - **2,480 reports** • ↑ **42% growth**
   - Seasonal drying of deep borewells and industrial turbidity in Namkum corridor.

2. **Agriculture & Perishable Storage**
   - **1,840 reports** • ↑ **18% growth**
   - Vegetable and seasonal paddy transport cold-chain deficits.

3. **Public Healthcare & Malnutrition**
   - **1,220 reports** • ↑ **12% growth**
   - Iron deficiency and maternal nutrition tracking across rural blocks.

#### AI INSIGHT
Water-related challenges are showing the strongest growth in the current demo dataset. Groundwater extraction and sub-surface runoffs have accelerated seasonal handpump failure across 14 rural wards in Namkum and Hatia belts.`,
      badges: [
        { label: "Ranchi District", color: "bg-indigo-100 text-indigo-800" },
        { label: "5,540 Total Reports", color: "bg-emerald-100 text-emerald-800" },
        { label: "Water +42% Trend", color: "bg-amber-100 text-amber-800" }
      ],
      actions: [
        { id: "act-water-ch", label: "Explore Water Challenges", type: "select_challenge", target: waterChallenge?.id || "ch-01" },
        { id: "act-explore", label: "Explore All Challenges", type: "navigate", target: "explore" }
      ],
      followUps: [
        "Show high-priority water problems.",
        "Which universities are suitable for water projects?",
        "Which districts need attention?"
      ],
      sourceTrust
    };
  }

  // 2. "Show high-priority water problems."
  if (
    q.includes("high-priority water") ||
    q.includes("high priority water") ||
    (q.includes("water") && (q.includes("problems") || q.includes("challenge") || q.includes("priority")))
  ) {
    return {
      text: `### HIGH-PRIORITY WATER CHALLENGES

1. **Rural Drinking Water Access & Nanofiltration**
   - **District:** Ranchi (Namkum)
   - **Priority:** **91 / 100 (Critical)**
   - **Domain:** Water & Sanitation • ~42,000 residents affected
   - **Status:** Ceramic membrane prototype active with BIT Mesra

2. **Groundwater Arsenic & Industrial Effluent**
   - **District:** Dumka (Santhal Pargana)
   - **Priority:** **88 / 100 (High)**
   - **Domain:** Water & Public Health • ~28,000 residents affected
   - **Status:** Under Government Technical Review

3. **Handpump Reliability & Deep Aquifer Turbidity**
   - **District:** Hazaribagh
   - **Priority:** **84 / 100 (High)**
   - **Domain:** Rural Infrastructure • ~14,500 residents affected
   - **Status:** University Matching in Progress

#### AI INSIGHT
Water-related challenges are showing the strongest growth in the current demo dataset. Early sensor telemetry indicates pre-monsoon turbidity spikes require decentralized nanofiltration.`,
      badges: [
        { label: "Water Sector", color: "bg-blue-100 text-blue-800" },
        { label: "3 Critical Matches", color: "bg-red-100 text-red-800" },
        { label: "BIT Mesra Lead", color: "bg-indigo-100 text-indigo-800" }
      ],
      actions: [
        { id: "act-water-case", label: "View Namkum Water Project", type: "select_challenge", target: waterChallenge?.id || "ch-01" },
        { id: "act-uni-water", label: "See BIT Mesra Water Lab", type: "navigate", target: "university" }
      ],
      followUps: [
        "Which university is best for this challenge?",
        "Who can help fund this project?",
        "What are the biggest challenges in Ranchi?"
      ],
      sourceTrust
    };
  }

  // 3. "Which university is best for this challenge?" / "Why is this challenge a 94% match?" / "Recommend university"
  if (
    q.includes("which university") ||
    q.includes("recommend university") ||
    q.includes("best match") ||
    q.includes("university is best") ||
    q.includes("94% match") ||
    (q.includes("university") && q.includes("expertise"))
  ) {
    const isWater = context.selectedChallenge?.domain === 'Water' || q.includes('water');
    const isElephant = context.selectedChallenge?.id === 'ch-elephant' || q.includes('elephant') || !isWater;

    if (isWater) {
      return {
        text: `### BEST MATCH

**BIT Mesra, Ranchi**
**96% AI Match**

**Why:**
• *Membrane Separation Laboratory* with patented gravity nanofiber filter technology
• Faculty Lead: Prof. Anandita Sen (Civil & Environmental Engineering)
• 14 completed community water pilot deployments across Jharkhand

---

### OTHER MATCHES:
- **IIT (ISM) Dhanbad** — **93% AI Match** (Heavy metal & mine drainage neutralization)
- **NIT Jamshedpur** — **89% AI Match** (Subernarekha basin hydraulic telemetry)
- **Central University of Jharkhand (CUJ)** — **85% AI Match** (Fluoride adsorption clays)

*Note: This is an AI recommendation based on faculty lab publications and campus infrastructure. It does not imply that the university has formally accepted the challenge.*`,
        badges: [
          { label: "Top Match: BIT Mesra 96%", color: "bg-emerald-100 text-emerald-800" },
          { label: "Patented Membrane R&D", color: "bg-blue-100 text-blue-800" }
        ],
        actions: [
          { id: "act-uni-hub", label: "Open University R&D Portal", type: "navigate", target: "university" },
          { id: "act-water-case", label: "View Namkum Water Project", type: "select_challenge", target: waterChallenge?.id || "ch-01" }
        ],
        followUps: [
          "Suggest technology for this challenge.",
          "Who can help fund this project?",
          "Show high-priority water problems."
        ],
        sourceTrust
      };
    }

    return {
      text: `### BEST MATCH

**BIT Mesra, Ranchi**
**94% AI Match**

**Why:**
• **Computer Vision & Embedded Edge AI:** Real-time nocturnal infrared classification lab
• **IoT Telemetry:** Sub-GHz LoRaWAN mesh transmitter prototypes
• **Field Deployment Experience:** Existing MoU with West Singhbhum Forest Division

---

### OTHER MATCHES:
- **IIT (ISM) Dhanbad** — **89% AI Match** (Spatial GIS wildlife corridor analytics)
- **Birsa Agricultural University (BAU)** — **82% AI Match** (Crop protection & agrarian resilience)

*Note: This is an AI recommendation based on faculty lab publications and campus infrastructure. It does not imply that the university has formally accepted the challenge.*`,
      badges: [
        { label: "Top Match: BIT Mesra 94%", color: "bg-emerald-100 text-emerald-800" },
        { label: "Edge AI Lab", color: "bg-purple-100 text-purple-800" }
      ],
      actions: [
        { id: "act-uni-portal", label: "Open University Portal", type: "navigate", target: "university" },
        { id: "act-el-case", label: "View Elephant Conflict Case", type: "select_challenge", target: "ch-elephant" }
      ],
      followUps: [
        "Suggest technology for this challenge.",
        "Who can help fund this project?",
        "What is blocking this project?"
      ],
      sourceTrust
    };
  }

  // 4. "Who can help fund this project?" / "Industry recommendations"
  if (
    q.includes("who can help fund") ||
    q.includes("fund this project") ||
    q.includes("industry recommendations") ||
    q.includes("industry partner") ||
    q.includes("where can our company contribute") ||
    (q.includes("projects") && q.includes("funding")) ||
    q.includes("csr")
  ) {
    return {
      text: `### RECOMMENDED INDUSTRY & CSR PARTNERS

1. **EcoSense Technologies**
   - **Match Score:** **89% AI Match**
   - **Can provide:**
     • **IoT Hardware:** 25 Edge Sensor Kits & Camera Housings
     • **Technical Mentorship:** Guidance for university engineering students
     • **Pilot Support:** Solar telemetry gateway infrastructure

2. **Tata Steel Foundation**
   - **Match Score:** **86% AI Match**
   - **Can provide:**
     • **Catalytic Co-funding:** ₹14.5 Lakhs milestone-linked CSR sponsorship
     • **Community Mobilization:** Field safety awareness in 22 corridor villages
     • **Long-term Maintenance:** Village maintenance toolkits

3. **AgriTech Innovations & NABARD**
   - **Match Score:** **82% AI Match**
   - **Can provide:**
     • **Field Deployment:** Agricultural cold storage and crop protection kits`,
      badges: [
        { label: "Section 135 Eligible", color: "bg-emerald-100 text-emerald-800" },
        { label: "EcoSense 89%", color: "bg-indigo-100 text-indigo-800" },
        { label: "Tata Steel Foundation", color: "bg-purple-100 text-purple-800" }
      ],
      actions: [
        { id: "act-ind-hub", label: "Open Industry Collaboration Hub", type: "navigate", target: "industry" },
        { id: "act-open-ws", label: "Open Project Workspace", type: "select_workspace", target: elephantWorkspace?.id || "ws-elephant" }
      ],
      followUps: [
        "Summarize this project.",
        "What is blocking this project?",
        "Suggest technology for this challenge."
      ],
      sourceTrust
    };
  }

  // 5. "Summarize this project."
  if (
    q.includes("summarize this project") ||
    q.includes("summarize project") ||
    q.includes("project's progress") ||
    q.includes("project status")
  ) {
    const ws = context.selectedWorkspace || elephantWorkspace;
    return {
      text: `### PROJECT STATUS
**72% complete** (Active Pilot Testing)

### CURRENT STAGE
**Pilot Testing**

### COMPLETED
• Problem Research & Ground Survey (100%)
• Solution Design & Edge Model Training (100%)
• Prototype Fabrication & Sensor Benchmarking (100%)

### IN PROGRESS
• Pilot Testing across Buruhatu & 8 fringe hamlets (68%)

### NEXT
• Field testing expansion in 3 additional forest corridor villages

### RISKS & BLOCKERS
• **Sensor delivery delay:** 3 edge camera enclosures delayed in transit

### INDUSTRY PARTNERS
• **EcoSense Technologies** (Hardware sponsor) & **Tata Steel Foundation** (CSR Grant)

### MEASURABLE IMPACT
• **1,200 potential beneficiaries** • Zero human casualties recorded during harvest season`,
      badges: [
        { label: "72% Completed", color: "bg-emerald-100 text-emerald-800" },
        { label: "Pilot Stage", color: "bg-indigo-100 text-indigo-800" },
        { label: "1,200 Beneficiaries", color: "bg-purple-100 text-purple-800" }
      ],
      actions: [
        { id: "act-open-ws", label: "Open Project Workspace", type: "select_workspace", target: ws?.id || "ws-elephant" },
        { id: "act-blockers", label: "View Project Blockers", type: "select_workspace", target: ws?.id || "ws-elephant" }
      ],
      followUps: [
        "What is blocking this project?",
        "What should the team do next?",
        "Who can help fund this project?"
      ],
      sourceTrust
    };
  }

  // 6. "What is blocking this project?" / "Identify blockers"
  if (
    q.includes("blocking this project") ||
    q.includes("blocking the project") ||
    q.includes("blockers") ||
    q.includes("what is blocking") ||
    q.includes("identify blockers")
  ) {
    return {
      text: `### PROJECT BLOCKERS & RISKS

- **HIGH PRIORITY:**
  • **3 sensor units delayed:** Solar edge camera housings are delayed at the regional logistics depot (estimated arrival: +4 days).
- **MEDIUM PRIORITY:**
  • **Village pilot permissions pending:** Awaiting final Gram Sabha countersignature in 2 fringe hamlets for tree-mounted siren towers.

#### AI RECOMMENDATION
Prioritize hardware delivery expedite with supplier logistics and confirm pilot permissions with local Panchayat representatives before scheduling next field testing run.`,
      badges: [
        { label: "1 High Blocker", color: "bg-red-100 text-red-800" },
        { label: "1 Medium Blocker", color: "bg-amber-100 text-amber-800" },
        { label: "AI Action Recommended", color: "bg-indigo-100 text-indigo-800" }
      ],
      actions: [
        { id: "act-ws-tasks", label: "Open Project Workspace Tasks", type: "select_workspace", target: elephantWorkspace?.id || "ws-elephant" }
      ],
      followUps: [
        "What should the team do next?",
        "Summarize this project.",
        "Who can help fund this project?"
      ],
      sourceTrust
    };
  }

  // 7. "Suggest technology for this challenge."
  if (
    q.includes("suggest technology") ||
    q.includes("suggest technologies") ||
    q.includes("recommended technology") ||
    (q.includes("technology") && q.includes("challenge"))
  ) {
    return {
      text: `### RECOMMENDED TECHNOLOGY

1. **Computer Vision (YOLOv8-Nano)**
   - **Why it helps:** For identifying elephants from nocturnal infrared camera feeds (<1.2s inference).
   - **Complexity:** Moderate
   - **Potential deployment consideration:** Must operate on 12V solar rechargeable LiFePO4 batteries in heavy forest canopy.

2. **IoT Sensors & LoRaWAN Mesh**
   - **Why it helps:** For environmental and tripwire location monitoring across 8km without cellular network towers.
   - **Complexity:** Low-Moderate
   - **Potential deployment consideration:** Requires high tree-mounted omnidirectional relay antennas.

3. **Edge AI Processing Units**
   - **Why it helps:** For low-connectivity areas to prevent reliance on cloud latency during emergency alerts.
   - **Complexity:** Moderate
   - **Potential deployment consideration:** Hardware thermal protection during peak summer heatwaves.

4. **GIS Risk Mapping & Corridor Telemetry**
   - **Why it helps:** For mapping high-risk migration zones and prepositioning Forest Quick Response Teams.
   - **Complexity:** Low
   - **Potential deployment consideration:** Needs verified GPS incident logs from ground patrol guards.

*Note: AI technological recommendations are intended for engineering feasibility planning and do not guarantee complete problem resolution.*`,
      badges: [
        { label: "Edge AI Vision", color: "bg-purple-100 text-purple-800" },
        { label: "LoRaWAN Mesh", color: "bg-blue-100 text-blue-800" },
        { label: "Non-Lethal Deterrence", color: "bg-emerald-100 text-emerald-800" }
      ],
      actions: [
        { id: "act-view-el", label: "View Elephant Challenge", type: "select_challenge", target: "ch-elephant" },
        { id: "act-open-ws", label: "Open Engineering Workspace", type: "select_workspace", target: elephantWorkspace?.id || "ws-elephant" }
      ],
      followUps: [
        "Which university is best for this challenge?",
        "Who can help fund this project?",
        "Summarize this project."
      ],
      sourceTrust
    };
  }

  // 8. "Why is this challenge priority 87?" / "Explain priority"
  if (
    q.includes("why is this challenge priority") ||
    q.includes("explain priority") ||
    q.includes("priority 87") ||
    q.includes("priority 94") ||
    q.includes("how is priority calculated")
  ) {
    const score = q.includes("94") ? 94 : 87;
    return {
      text: `### WHY THIS PRIORITY?

- **PEOPLE AFFECTED (30% Weight):** High population density relying on vulnerable local resources (~1,800 residents directly impacted).
- **SEVERITY (25% Weight):** High disruption to health, agricultural livelihood, and human safety.
- **GEOGRAPHICAL SPREAD (20% Weight):** Corridors spanning multiple contiguous village hamlets and blocks.
- **URGENCY (15% Weight):** Active seasonal escalation requiring intervention before peak dry/harvest period.
- **SIMILAR REPORTS (10% Weight):** 7 clustered civic reports from neighboring regional blocks.

### TOTAL PRIORITY SCORE: **${score} / 100**

*This is an AI-generated prioritization recommendation. Final validation should be performed by the responsible authority.*`,
      badges: [
        { label: `AI Priority: ${score}/100`, color: "bg-orange-100 text-orange-800" },
        { label: "Multi-Factor Weighted", color: "bg-indigo-100 text-indigo-800" }
      ],
      actions: [
        { id: "act-exp-ch", label: "View Challenge Details", type: "select_challenge", target: elephantChallenge?.id || "ch-elephant" },
        { id: "act-sim", label: "Find Similar Challenges", type: "select_challenge", target: elephantChallenge?.id || "ch-elephant" }
      ],
      followUps: [
        "Why are these challenges similar?",
        "Which university is best for this challenge?",
        "Suggest technology for this challenge."
      ],
      sourceTrust
    };
  }

  // 9. "Why are these challenges similar?" / "Similarity explanation"
  if (
    q.includes("why are these challenges similar") ||
    q.includes("similarity explanation") ||
    q.includes("similar problems") ||
    q.includes("find similar")
  ) {
    return {
      text: `### SIMILARITY ANALYSIS: **82% Match**

**Shared Signals & Semantic Clusters:**
• **Problem:** Drinking water scarcity and handpump mechanical failure
• **Location:** Ranchi region (Namkum / Hatia rural corridor)
• **Affected Population:** Rural community households and school children
• **Domain & Root Cause:** Seasonal groundwater table depletion and lack of scheduled preventive maintenance

*AI similarity estimate based on NLP semantic embeddings and spatial proximity within the current demo dataset.*`,
      badges: [
        { label: "82% Semantic Match", color: "bg-emerald-100 text-emerald-800" },
        { label: "Spatial Proximity: 4.2km", color: "bg-blue-100 text-blue-800" }
      ],
      actions: [
        { id: "act-exp", label: "Explore Challenges Marketplace", type: "navigate", target: "explore" }
      ],
      followUps: [
        "Show high-priority water problems.",
        "Which university is best for this challenge?",
        "Suggest technology for this challenge."
      ],
      sourceTrust
    };
  }

  // 10. "Which projects have the highest impact?" / "Impact questions"
  if (
    q.includes("highest impact") ||
    q.includes("top impact") ||
    q.includes("impact by district") ||
    q.includes("verified outcomes") ||
    q.includes("how many citizens have been impacted")
  ) {
    return {
      text: `### TOP IMPACT PROJECTS (STATEWIDE LEDGER)

1. **AI Early Warning Elephant Detection Grid**
   - **District:** West Singhbhum (Saranda Buffer)
   - **People Impacted:** **1,200 residents**
   - **Stage:** Pilot Testing • **Impact Status:** \`Pilot Result\` (Zero casualties, 86% crop loss reduction)

2. **Decentralized Solar Lac Cold Storage Vaults**
   - **District:** Khunti (Torpa block)
   - **People Impacted:** **3,400 tribal farmers**
   - **Stage:** Scaled Deployment • **Impact Status:** \`Verified\` (92% spoilage reduction, ₹1.8 Cr preserved)

3. **Ceramic Nanofiltration Clean Drinking Water Kiosks**
   - **District:** Ranchi (Namkum)
   - **People Impacted:** **42,000 residents**
   - **Stage:** Prototyping • **Impact Status:** \`Pilot Result\` (48.2 Million Liters clean water delivered)

4. **IoT Coal Dust Aerosol Road Misting Grid**
   - **District:** Dhanbad (Jharia corridor)
   - **People Impacted:** **85,000 residents**
   - **Stage:** Field Prototyping • **Impact Status:** \`Estimated\` (38% PM2.5 reduction target)

#### AI IMPACT INSIGHT
Across all 24 districts, **1,240,000+ residents** have experienced documented improvements, backed by 86 deployed solutions and 34 filed patents.`,
      badges: [
        { label: "1.24M+ Beneficiaries", color: "bg-emerald-100 text-emerald-800" },
        { label: "86 Deployed Solutions", color: "bg-indigo-100 text-indigo-800" },
        { label: "State Audited", color: "bg-amber-100 text-amber-800" }
      ],
      actions: [
        { id: "act-impact", label: "Open Measurable Impact Ledger", type: "navigate", target: "impact" },
        { id: "act-gov", label: "Open Govt Command Center", type: "navigate", target: "government" }
      ],
      followUps: [
        "What are the biggest challenges in Ranchi?",
        "Summarize this project.",
        "Show high-priority water problems."
      ],
      sourceTrust
    };
  }

  // 11. "What should the team do next?" / "What should I do next?" / Action Recommendations
  if (
    q.includes("what should the team do next") ||
    q.includes("what should i do next") ||
    q.includes("suggest next step") ||
    q.includes("action recommendations") ||
    q.includes("actions requiring attention")
  ) {
    return {
      text: `### RECOMMENDED ACTIONS FOR YOUR CONTEXT

Based on current platform telemetry across Jharkhand's 24 districts:

- **Government Authorities:**
  • **12 high-priority challenges** currently require administrative validation and seed grant sign-off.
- **University Faculty & Deans:**
  • **3 challenges** in your domain (Water & Wildlife) are awaiting institutional expressions of interest.
- **Industry & CSR Partners:**
  • **5 projects** match your corporate technology and CSR contribution profile.
- **Project Engineering Teams:**
  • **One critical milestone** (Hardware enclosure inspection) is scheduled within 3 days.`,
      badges: [
        { label: "12 Awaiting Validation", color: "bg-amber-100 text-amber-800" },
        { label: "3 Univ Opportunities", color: "bg-indigo-100 text-indigo-800" },
        { label: "5 CSR Matches", color: "bg-emerald-100 text-emerald-800" }
      ],
      actions: [
        { id: "act-gov", label: "Government Validation Queue", type: "navigate", target: "government" },
        { id: "act-ws", label: "Open Project Workspace", type: "select_workspace", target: elephantWorkspace?.id || "ws-elephant" }
      ],
      followUps: [
        "Summarize this project.",
        "What is blocking this project?",
        "What are the biggest challenges in Ranchi?"
      ],
      sourceTrust
    };
  }

  // 12. Government Dashboard specific questions: "What problems are increasing fastest?" / "Which districts need attention?"
  if (
    q.includes("increasing fastest") ||
    q.includes("districts need attention") ||
    q.includes("awaiting validation")
  ) {
    return {
      text: `### FASTEST INCREASING CHALLENGES & DISTRICTS NEEDING ATTENTION

1. **West Singhbhum (Saranda Buffer)**
   - **Growth:** ↑ **54% rise** in reported nocturnal herd encounters during harvest season.
   - **Urgent Action:** 8 fringe hamlets requiring automated early warning sirens.

2. **Ranchi Rural (Namkum & Hatia)**
   - **Growth:** ↑ **42% rise** in drinking well drying and turbidity complaints.
   - **Urgent Action:** 14 villages require emergency mobile water testing and filtration.

3. **Dhanbad (Coal Mining Belt)**
   - **Growth:** ↑ **31% rise** in PM2.5 airborne dust complaints from residents near haul roads.
   - **Urgent Action:** Road misting canon prototypes need deployment authorization.`,
      badges: [
        { label: "West Singhbhum: High Risk", color: "bg-red-100 text-red-800" },
        { label: "Ranchi: +42% Trend", color: "bg-amber-100 text-amber-800" }
      ],
      actions: [
        { id: "act-gov", label: "Open Government Command Center", type: "navigate", target: "government" },
        { id: "act-el", label: "View West Singhbhum Project", type: "select_challenge", target: "ch-elephant" }
      ],
      followUps: [
        "Show high-priority water problems.",
        "Which university is best for this challenge?",
        "What should the team do next?"
      ],
      sourceTrust
    };
  }

  // Default synthesis
  return {
    text: `### SAMADHAN AI Copilot Synthesis

Based on the current **SAMADHANSETU demo dataset** across Jharkhand's 24 districts for "${query}":

- **Active Challenges:** 12,840 citizen problem reports undergoing AI triage and clustering.
- **Participating Universities:** 72 academic institutions and laboratories (including BIT Mesra, IIT ISM Dhanbad, and BAU Ranchi).
- **Corporate & CSR Partners:** 186 industry sponsors including Tata Steel Foundation and EcoSense Technologies.
- **Verified Deployed Solutions:** 86 community projects currently operational with over 1.24 Million citizens benefited.

You can ask me to analyze specific challenges, recommend university labs, suggest technologies, identify project blockers, or summarize verified social impact.`,
    badges: [
      { label: "Statewide Intelligence", color: "bg-indigo-100 text-indigo-800" },
      { label: `Context: ${context.activePage.toUpperCase()}`, color: "bg-slate-100 text-slate-700" }
    ],
    actions: [
      { id: "act-exp", label: "Explore Challenges", type: "navigate", target: "explore" },
      { id: "act-ws", label: "Open Project Workspace", type: "select_workspace", target: elephantWorkspace?.id || "ws-elephant" },
      { id: "act-imp", label: "View Impact Ledger", type: "navigate", target: "impact" }
    ],
    followUps: [
      "What are the biggest challenges in Ranchi?",
      "Show high-priority water problems.",
      "Which university is best for this challenge?"
    ],
    sourceTrust
  };
}
