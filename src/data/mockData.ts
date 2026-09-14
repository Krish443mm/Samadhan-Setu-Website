import { Challenge, ProjectWorkspace, IndustryOpportunity, ImpactStory } from '../types';

export const JHARKHAND_DISTRICTS = [
  'Ranchi',
  'Dhanbad',
  'East Singhbhum (Jamshedpur)',
  'Bokaro',
  'Hazaribagh',
  'Deoghar',
  'Dumka',
  'Khunti',
  'Giridih',
  'Palamu',
  'Ramgarh',
  'West Singhbhum',
  'Seraikela Kharsawan',
  'Gumla',
  'Latehar',
  'Lohardaga',
  'Simdega',
  'Garhwa',
  'Chatra',
  'Koderma',
  'Jamtara',
  'Pakur',
  'Godda',
  'Sahebganj'
];

export const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: 'ch-elephant',
    trackingCode: 'JH-SAM-2026-9401',
    title: 'AI-Based Early Warning System for Human–Elephant Conflict',
    description: 'Wild elephants frequently enter agricultural fields and nearby villages at night, causing crop destruction, property damage and risk to human life. Smallholder farmers face severe seasonal losses during harvest periods with imminent hazards to human safety.',
    citizenName: 'Soma Hembrom',
    citizenRole: 'Farmer & Panchayat Representative',
    submittedAt: '2026-02-18T19:30:00Z',
    domain: 'Agriculture',
    secondaryDomains: ['Environment', 'Rural Livelihoods', 'Wildlife Management'],
    location: {
      district: 'West Singhbhum',
      block: 'Goilkera & Saranda Buffer',
      villageOrCity: 'Buruhatu (8 Fringe Villages)',
      coordinates: { lat: 22.58, lng: 85.38 }
    },
    priorityScore: 94,
    priorityLevel: 'Critical',
    affectedPeople: 1200,
    geographicalSpread: '8 villages',
    similarReportsCount: 47,
    similarChallenges: [
      { id: 'sim-el-1', title: 'Elephant herd intrusion in Saranda buffer zones', similarity: 89 },
      { id: 'sim-el-2', title: 'Night crop destruction along Porahat forest fringe', similarity: 82 }
    ],
    status: 'Pilot Testing',
    requiredExpertise: [
      'Artificial Intelligence',
      'Computer Vision',
      'IoT',
      'Embedded Systems',
      'Agriculture',
      'Wildlife Research'
    ],
    solutionWorkflow: [
      '1. AI identifies movement near agricultural fields using nocturnal cameras.',
      '2. Edge computer vision verifies the animal as an elephant within 1.2s.',
      '3. Nearby villagers receive an early warning via automated village siren & SMS.',
      '4. Local authorities and forest rangers receive an immediate tactical alert.',
      '5. Incident data is recorded for predictive migration corridor mapping.'
    ],
    sdgGoals: [15, 2, 11],
    evidence: {
      images: [
        'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80'
      ],
      hasAudio: true,
      documents: [
        'West_Singhbhum_Elephant_Corridor_Audit.pdf',
        'EcoSense_EdgeAI_Camera_Deployment_Spec.pdf'
      ]
    },
    recommendedUniversities: [
      {
        universityId: 'uni-bit',
        universityName: 'BIT Mesra',
        matchScore: 94,
        rationale: 'AI and Machine Learning expertise, state-of-the-art IoT Research Lab, prominent Engineering Faculty, and established Innovation and Incubation Ecosystem.',
        facultyLead: 'Prof. K. S. Patnaik (Dept. of Computer Science & AI Lab)',
        labSpecialization: 'IoT Research Lab & Computer Vision Group'
      },
      {
        universityId: 'uni-bau',
        universityName: 'Birsa Agricultural University (BAU), Ranchi',
        matchScore: 88,
        rationale: 'Agro-forestry field stations and tribal farm boundary research.',
        facultyLead: 'Dr. Rajeshwar Soren',
        labSpecialization: 'Agro-Forestry & Crop Protection Division'
      },
      {
        universityId: 'uni-cuj',
        universityName: 'Central University of Jharkhand (CUJ)',
        matchScore: 84,
        rationale: 'Geo-informatics soundscape tracking and wildlife bio-acoustics.',
        facultyLead: 'Dr. Manoj Kumar',
        labSpecialization: 'Wildlife Geo-informatics Lab'
      }
    ],
    assignedUniversity: 'BIT Mesra',
    assignedProjectWorkspaceId: 'proj-elephant',
    endorsements: 2840,
    isEndorsedByCurrentUser: true,
    governmentNotes: 'Approved under Jharkhand Agriculture & Wildlife Tech Mission. Co-sponsored by EcoSense Technologies with ₹18.5 Lakhs hardware and pilot deployment grant across 8 fringe villages.',
    validatedByGov: true
  },
  {
    id: 'ch-01',
    trackingCode: 'JH-SAM-2026-1048',
    title: 'Arsenic & Industrial Runoff Filtration in Subernarekha River Basin',
    description: 'Over 45,000 villagers across Namkum and Angara blocks depend on Subernarekha river water for drinking and irrigation. Recent ground-tests show arsenic levels exceeding 0.06 mg/L (WHO limit: 0.01 mg/L) alongside severe industrial turbidity. High incidence of skin lesions and gastrointestinal issues reported.',
    citizenName: 'Mukesh Mahto',
    citizenRole: 'Gram Panchayat Sarpanch',
    submittedAt: '2026-03-01T10:30:00Z',
    domain: 'Water',
    secondaryDomains: ['Healthcare', 'Environment'],
    location: {
      district: 'Ranchi',
      block: 'Namkum',
      villageOrCity: 'Getalsud / Angara',
      coordinates: { lat: 23.37, lng: 85.35 }
    },
    priorityScore: 94,
    priorityLevel: 'Critical',
    affectedPeople: 48500,
    similarReportsCount: 42,
    similarChallenges: [
      { id: 'sim-01', title: 'Turbidity in Kanke dam feeder canal', similarity: 78 },
      { id: 'sim-02', title: 'Fluoride contamination in Hatia borehole', similarity: 65 }
    ],
    status: 'In Prototyping',
    requiredExpertise: ['Nanofiltration Membranes', 'Hydrological IoT', 'Biochemical Water Testing', 'Solar Gravity Pumps'],
    sdgGoals: [6, 3, 11],
    evidence: {
      images: [
        'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=800&q=80'
      ],
      hasAudio: true,
      documents: ['Water_Lab_Analysis_Namkum_2026.pdf', 'Panchayat_Health_Survey.pdf']
    },
    recommendedUniversities: [
      {
        universityId: 'uni-bit',
        universityName: 'Birla Institute of Technology (BIT) Mesra, Ranchi',
        matchScore: 96,
        rationale: 'World-class Center of Excellence in Water Membrane Nano-composites and local river basin watershed modeling.',
        facultyLead: 'Dr. Anandita Sen (Dept. of Chemical & Environmental Eng)',
        labSpecialization: 'Advanced Water Treatment & Membrane Lab'
      },
      {
        universityId: 'uni-ism',
        universityName: 'IIT (ISM) Dhanbad',
        matchScore: 91,
        rationale: 'Premier hydrogeology department with field validation kits for toxic mineral precipitation.',
        facultyLead: 'Prof. K. R. Bhattacharya',
        labSpecialization: 'Hydro-geochemistry Research Division'
      },
      {
        universityId: 'uni-nitj',
        universityName: 'NIT Jamshedpur',
        matchScore: 88,
        rationale: 'Experienced in industrial effluent neutralization and downstream river monitoring.',
        facultyLead: 'Dr. Sanjay Mukherjee',
        labSpecialization: 'Environmental Systems Laboratory'
      }
    ],
    assignedUniversity: 'Birla Institute of Technology (BIT) Mesra, Ranchi',
    assignedProjectWorkspaceId: 'proj-01',
    endorsements: 1840,
    isEndorsedByCurrentUser: true,
    governmentNotes: 'Fast-tracked under Jharkhand State Jal Jeevan Mission Tech Innovation Fund. District Collectorate authorized ₹15 Lakh pilot testing grant.',
    validatedByGov: true
  },
  {
    id: 'ch-02',
    trackingCode: 'JH-SAM-2026-1182',
    title: 'Off-Grid Solar Desiccant Vault for Lac & Forest Minor Produce Storage',
    description: 'Smallholder tribal farmers in Khunti district cultivate high-grade Rangeeni and Kusmi lac along with wild herbs. Lack of temperature and humidity-controlled storage causes 38% spoilage during monsoon humidity spikes, forcing distressed sales to middlemen at 50% below MSP.',
    citizenName: 'Shanti Munda',
    citizenRole: 'Tribal Lac Growers Cooperative Secretary',
    submittedAt: '2026-02-24T14:15:00Z',
    domain: 'Agriculture',
    secondaryDomains: ['Rural Livelihoods', 'Energy'],
    location: {
      district: 'Khunti',
      block: 'Torpa',
      villageOrCity: 'Dorma & Khunti Sub-division',
      coordinates: { lat: 23.07, lng: 85.28 }
    },
    priorityScore: 89,
    priorityLevel: 'High',
    affectedPeople: 32000,
    similarReportsCount: 29,
    similarChallenges: [
      { id: 'sim-03', title: 'Post-harvest moisture damage in wild honey (Gumla)', similarity: 82 },
      { id: 'sim-04', title: 'Lac encrustation pest infestation during warehouse storage', similarity: 71 }
    ],
    status: 'Pilot Testing',
    requiredExpertise: ['Solar Dehydration', 'Thermal Phase Change Materials (PCM)', 'IoT Humidity Telemetry', 'Agri-Post Harvest Tech'],
    sdgGoals: [1, 2, 8, 9],
    evidence: {
      images: [
        'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80'
      ],
      hasAudio: false,
      documents: ['Lac_Crop_Loss_Survey_Khunti.pdf']
    },
    recommendedUniversities: [
      {
        universityId: 'uni-bau',
        universityName: 'Birsa Agricultural University (BAU), Ranchi',
        matchScore: 98,
        rationale: 'National leader in lac cultivation entomology and tribal post-harvest value addition.',
        facultyLead: 'Dr. Rajeshwar Soren',
        labSpecialization: 'Post Harvest Engineering & Agro-Forestry Division'
      },
      {
        universityId: 'uni-nitj',
        universityName: 'NIT Jamshedpur',
        matchScore: 89,
        rationale: 'Solid mechanical engineering team specialized in solar thermal storage systems.',
        facultyLead: 'Dr. Alok Verma',
        labSpecialization: 'Renewable Thermal Tech Cell'
      },
      {
        universityId: 'uni-bit',
        universityName: 'BIT Mesra',
        matchScore: 84,
        rationale: 'IoT smart warehousing and low-cost sensor telemetry development.',
        facultyLead: 'Prof. S. C. Pal',
        labSpecialization: 'Embedded Sensors & Agriculture Lab'
      }
    ],
    assignedUniversity: 'Birsa Agricultural University (BAU), Ranchi',
    assignedProjectWorkspaceId: 'proj-02',
    endorsements: 1420,
    isEndorsedByCurrentUser: false,
    governmentNotes: 'Approved by TRIFED & Jharkhand Department of Agriculture. 5 pilot units funded in Torpa block.',
    validatedByGov: true
  },
  {
    id: 'ch-03',
    trackingCode: 'JH-SAM-2026-1290',
    title: 'Low-Cost IoT Aerosol Coal Dust Fogging Grid for Opencast Mine Perimeters',
    description: 'Fine respirable suspended particulate matter (PM2.5 and PM10) from Jharia and Katras coal loading depots drifts into surrounding residential settlements. Over 120,000 residents suffer from chronic respiratory ailments, pneumoconiosis, and eye irritation. Conventional water tankers are wasteful and inefficient.',
    citizenName: 'Dr. Arvind Sinha',
    citizenRole: 'Community Health Physician',
    submittedAt: '2026-03-02T08:45:00Z',
    domain: 'Environment',
    secondaryDomains: ['Healthcare', 'Urban Infrastructure'],
    location: {
      district: 'Dhanbad',
      block: 'Jharia',
      villageOrCity: 'Lodna & Katras Belts',
      coordinates: { lat: 23.74, lng: 86.41 }
    },
    priorityScore: 95,
    priorityLevel: 'Critical',
    affectedPeople: 125000,
    similarReportsCount: 56,
    similarChallenges: [
      { id: 'sim-05', title: 'Coal siding road dust in Bokaro Steel City', similarity: 84 },
      { id: 'sim-06', title: 'Fugitive emissions around thermal ash pond', similarity: 69 }
    ],
    status: 'Team Formed',
    requiredExpertise: ['Aerosol Physics', 'LoRa Air Quality Mesh', 'Micro-droplet Mist Cannons', 'Environmental Toxicology'],
    sdgGoals: [3, 11, 13],
    evidence: {
      images: [
        'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=800&q=80'
      ],
      hasAudio: true,
      documents: ['PM10_Air_Quality_Audit_Jharia.pdf']
    },
    recommendedUniversities: [
      {
        universityId: 'uni-ism',
        universityName: 'IIT (ISM) Dhanbad',
        matchScore: 99,
        rationale: 'Asia’s most distinguished mining engineering and environmental science research institution situated directly on-site.',
        facultyLead: 'Prof. Debranjan Sarkar (Dept. of Mining & Environmental Eng)',
        labSpecialization: 'Mine Safety & Air Quality Simulation Lab'
      },
      {
        universityId: 'uni-bit',
        universityName: 'BIT Mesra',
        matchScore: 82,
        rationale: 'Edge AI sensor mesh design and automated actuator systems.',
        facultyLead: 'Dr. Manas Rath',
        labSpecialization: 'Automation and Cyber-Physical Systems Lab'
      }
    ],
    assignedUniversity: 'IIT (ISM) Dhanbad',
    assignedProjectWorkspaceId: 'proj-03',
    endorsements: 2890,
    isEndorsedByCurrentUser: true,
    governmentNotes: 'Reviewed by Jharkhand State Pollution Control Board and Coal India CSR Wing.',
    validatedByGov: true
  },
  {
    id: 'ch-04',
    trackingCode: 'JH-SAM-2026-1405',
    title: 'AI Acoustic Early Warning System for Forest Fringe Wild Elephant Corridors',
    description: 'In rural border villages of Hazaribagh and Ramgarh, herd migrations frequently result in devastating crop trampling, property loss, and tragic human-elephant fatalities. Existing drum-beating and fire torches create hazardous panic and retaliatory injury.',
    citizenName: 'Birsa Soren',
    citizenRole: 'Village Forest Committee Member',
    submittedAt: '2026-03-03T16:20:00Z',
    domain: 'Environment',
    secondaryDomains: ['Rural Livelihoods', 'Agriculture'],
    location: {
      district: 'Hazaribagh',
      block: 'Churchu',
      villageOrCity: 'Kusumba & Border Forest Range',
      coordinates: { lat: 23.99, lng: 85.36 }
    },
    priorityScore: 91,
    priorityLevel: 'High',
    affectedPeople: 18000,
    similarReportsCount: 19,
    similarChallenges: [
      { id: 'sim-07', title: 'Elephant movement through Dalma Wildlife Sanctuary corridor (East Singhbhum)', similarity: 87 }
    ],
    status: 'Government Validated',
    requiredExpertise: ['Acoustic Machine Learning', 'Thermal Infrasound Sensors', 'Cellular/LoRa Relay', 'Wildlife Conservation'],
    sdgGoals: [15, 11],
    evidence: {
      images: [
        'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=800&q=80'
      ],
      hasAudio: true,
      documents: ['Elephant_Corridor_Damage_Log_2025.pdf']
    },
    recommendedUniversities: [
      {
        universityId: 'uni-cuj',
        universityName: 'Central University of Jharkhand (CUJ), Brambe',
        matchScore: 93,
        rationale: 'Strong bio-diversity and geo-informatics department with active wildlife tracking projects.',
        facultyLead: 'Dr. Manoj Kumar',
        labSpecialization: 'Wildlife Geo-informatics & Soundscape Lab'
      },
      {
        universityId: 'uni-bit',
        universityName: 'BIT Mesra',
        matchScore: 90,
        rationale: 'Deep learning audio classification on low-power Raspberry Pi / ESP32 modules.',
        facultyLead: 'Prof. R. N. Gupta',
        labSpecialization: 'Signal Processing & Bio-Acoustics Lab'
      }
    ],
    assignedUniversity: 'Central University of Jharkhand (CUJ), Brambe',
    endorsements: 1120,
    isEndorsedByCurrentUser: false,
    governmentNotes: 'Jharkhand Forest Department has approved sensor testing along designated 12km corridor.',
    validatedByGov: true
  },
  {
    id: 'ch-05',
    trackingCode: 'JH-SAM-2026-1512',
    title: 'Solar Portable Non-Invasive Hemoglobin & Malnutrition Scanner for Anganwadis',
    description: 'Santhal Pargana region exhibits maternal anemia rates exceeding 68% and severe child stunting in remote tribal hamlets. Blood prick invasive testing causes high refusal rates among mothers and requires cold-chain reagents that spoil in hot summers.',
    citizenName: 'Parvati Devi',
    citizenRole: 'Senior ASHA Worker',
    submittedAt: '2026-03-04T11:10:00Z',
    domain: 'Healthcare',
    secondaryDomains: ['Public Administration', 'Accessibility'],
    location: {
      district: 'Dumka',
      block: 'Kathikund',
      villageOrCity: 'Bada Chaperia & surrounding 14 hamlets',
      coordinates: { lat: 24.26, lng: 87.25 }
    },
    priorityScore: 96,
    priorityLevel: 'Critical',
    affectedPeople: 41000,
    similarReportsCount: 38,
    similarChallenges: [
      { id: 'sim-08', title: 'Lack of cold storage for vaccines in Latehar health sub-center', similarity: 62 },
      { id: 'sim-09', title: 'High maternal malnutrition in Pakur tribal belt', similarity: 91 }
    ],
    status: 'Deployed & Validated',
    requiredExpertise: ['Photoplethysmography (PPG)', 'Optical Biosensors', 'Edge Health AI', 'Offline Mobile Synchronization'],
    sdgGoals: [3, 2, 5, 10],
    evidence: {
      images: [
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80'
      ],
      hasAudio: false,
      documents: ['Kathikund_Maternal_Health_Data.pdf']
    },
    recommendedUniversities: [
      {
        universityId: 'uni-aiims',
        universityName: 'AIIMS Deoghar & BIT Mesra Joint Lab',
        matchScore: 97,
        rationale: 'Direct clinical validation capabilities with premier biomedical engineering team.',
        facultyLead: 'Dr. Saurabh Prakash & Dr. Neha Sinha',
        labSpecialization: 'Biomedical Optics & Community Medicine Division'
      },
      {
        universityId: 'uni-nitj',
        universityName: 'NIT Jamshedpur',
        matchScore: 86,
        rationale: 'Portable instrumentation and ultra-low power hardware enclosure design.',
        facultyLead: 'Dr. Tanmoy Ghosh',
        labSpecialization: 'Biomedical Electronics Unit'
      }
    ],
    assignedUniversity: 'AIIMS Deoghar & BIT Mesra Joint Lab',
    assignedProjectWorkspaceId: 'proj-05',
    endorsements: 3410,
    isEndorsedByCurrentUser: true,
    governmentNotes: 'State Health Mission has deployed 150 pilot devices across Dumka and Pakur with 94.2% diagnostic accuracy.',
    validatedByGov: true
  },
  {
    id: 'ch-06',
    trackingCode: 'JH-SAM-2026-1620',
    title: 'Low-Cost Offline Digital STEM Labs in Vernacular Santhali & Hindi for Tribal Schools',
    description: 'Over 80 rural government schools in Netarhat and plateau villages lack reliable internet connectivity, computer hardware, and science laboratory apparatus. Students are falling behind in practical physics, mathematics, and coding skills.',
    citizenName: 'Rameshwar Oraon',
    citizenRole: 'Rural High School Headmaster',
    submittedAt: '2026-03-05T09:00:00Z',
    domain: 'Education',
    secondaryDomains: ['Accessibility', 'Rural Livelihoods'],
    location: {
      district: 'Latehar',
      block: 'Mahuadanr',
      villageOrCity: 'Netarhat & Mahuadanr Valley',
      coordinates: { lat: 23.47, lng: 84.26 }
    },
    priorityScore: 87,
    priorityLevel: 'High',
    affectedPeople: 16500,
    similarReportsCount: 24,
    similarChallenges: [
      { id: 'sim-10', title: 'Solar electricity shortfall in Gumla Kasturba Gandhi Balika Vidyalaya', similarity: 73 }
    ],
    status: 'Under Review',
    requiredExpertise: ['Embedded Linux (Raspberry Pi/Orange Pi)', 'Vernacular EdTech UI/UX', 'Offline Mesh Networks', 'STEM Pedagogy'],
    sdgGoals: [4, 10],
    evidence: {
      images: [
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80'
      ],
      hasAudio: false,
      documents: ['Tribal_School_STEM_Assessment.pdf']
    },
    recommendedUniversities: [
      {
        universityId: 'uni-bit',
        universityName: 'BIT Mesra, Ranchi',
        matchScore: 94,
        rationale: 'Strong computer science and educational robotics student community with local outreach chapters.',
        facultyLead: 'Prof. Subhashis Sen',
        labSpecialization: 'Human-Computer Interaction & Open Source Labs'
      },
      {
        universityId: 'uni-cuj',
        universityName: 'Central University of Jharkhand',
        matchScore: 89,
        rationale: 'Department of Tribal Studies and Applied Linguistics.',
        facultyLead: 'Dr. Anupama Ekka',
        labSpecialization: 'Indigenous Knowledge & Language Tech'
      }
    ],
    endorsements: 890,
    isEndorsedByCurrentUser: false,
    governmentNotes: 'Under evaluation by Department of School Education and Literacy, Govt of Jharkhand.',
    validatedByGov: false
  },
  {
    id: 'ch-07',
    trackingCode: 'JH-SAM-2026-1733',
    title: 'Recycled Fly Ash & Mining Overburden Geo-polymer Pavers for Slum Pathways',
    description: 'During monsoons, narrow unpaved alleys in Bokaro thermal colonies and peri-urban slums turn into impassable mud traps, blocking emergency ambulances and school children. Millions of tons of fly ash and slag lie unutilized in industrial dumps.',
    citizenName: 'Sunita Soren',
    citizenRole: 'Women Self Help Group (SHG) Coordinator',
    submittedAt: '2026-03-05T13:40:00Z',
    domain: 'Urban Infrastructure',
    secondaryDomains: ['Environment', 'Rural Livelihoods'],
    location: {
      district: 'Bokaro',
      block: 'Chas',
      villageOrCity: 'Sector XII / Chas Peri-urban',
      coordinates: { lat: 23.63, lng: 86.17 }
    },
    priorityScore: 84,
    priorityLevel: 'Medium',
    affectedPeople: 29000,
    similarReportsCount: 15,
    similarChallenges: [
      { id: 'sim-11', title: 'Industrial slag disposal in Seraikela Kharsawan', similarity: 81 }
    ],
    status: 'University Assigned',
    requiredExpertise: ['Geopolymer Chemistry', 'Structural Civil Testing', 'Low-carbon Binders', 'Community Manufacturing'],
    sdgGoals: [9, 11, 12],
    evidence: {
      images: [
        'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=800&q=80'
      ],
      hasAudio: false,
      documents: ['Slum_Access_Monsoon_Survey.pdf']
    },
    recommendedUniversities: [
      {
        universityId: 'uni-nitj',
        universityName: 'NIT Jamshedpur',
        matchScore: 95,
        rationale: 'Recognized research hub in industrial byproduct valorization and sustainable geopolymer concrete.',
        facultyLead: 'Prof. Hemant Patidar',
        labSpecialization: 'Sustainable Building Materials Testing Facility'
      },
      {
        universityId: 'uni-ism',
        universityName: 'IIT (ISM) Dhanbad',
        matchScore: 88,
        rationale: 'Overburden characterization and civil engineering expertise.',
        facultyLead: 'Dr. G. C. Verma',
        labSpecialization: 'Geotechnical Engineering Lab'
      }
    ],
    assignedUniversity: 'NIT Jamshedpur',
    endorsements: 760,
    isEndorsedByCurrentUser: false,
    governmentNotes: 'Urban Development Department ready to mandate 30% fly ash pavers in municipal tenders once certified.',
    validatedByGov: true
  }
];

export const INITIAL_PROJECT_WORKSPACES: ProjectWorkspace[] = [
  {
    id: 'proj-elephant',
    challengeId: 'ch-elephant',
    title: 'AI-Powered Elephant Early Warning System',
    domain: 'Agriculture',
    universityId: 'uni-bit',
    universityName: 'BIT Mesra',
    currentStage: 'Pilot Testing',
    progressPercentage: 72,
    nextMilestone: '8-Village Mesh Activation & Alert Response Verification',
    teamMembers: [
      { id: 'tm-el-1', name: 'Prof. K. S. Patnaik', role: 'Faculty Mentor', department: 'Computer Science & AI Lab (BIT Mesra)', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
      { id: 'tm-el-2', name: 'Ananya Soren', role: 'Student Lead', department: 'M.Tech AI & Robotics', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80' },
      { id: 'tm-el-3', name: 'Rahul Munda', role: 'Student Researcher', department: 'B.Tech IoT & Embedded Systems', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80' },
      { id: 'tm-el-4', name: 'Dr. Rameshwar Singh', role: 'Industry Advisor', department: 'Wildlife Research Specialist', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
      { id: 'tm-el-5', name: 'Vikash Anand', role: 'Industry Advisor', department: 'EcoSense Technologies Lead Engineer', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80' },
      { id: 'tm-el-6', name: 'Sanjay Tirkey', role: 'Gov Liaison', department: 'West Singhbhum Forest Division', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' }
    ],
    tasks: [
      { id: 'tsk-el-1', title: 'Deploy 24 low-cost edge AI camera units across Saranda forest buffer', assignee: 'Rahul Munda', status: 'done', priority: 'High', dueDate: '2026-02-28' },
      { id: 'tsk-el-2', title: 'Calibrate nocturnal infrared YOLOv8 model for dense canopy conditions', assignee: 'Ananya Soren', status: 'done', priority: 'High', dueDate: '2026-03-02' },
      { id: 'tsk-el-3', title: 'Integrate automated SMS/IVR siren trigger with West Singhbhum Forest Range HQ', assignee: 'Vikash Anand', status: 'done', priority: 'High', dueDate: '2026-03-05' },
      { id: 'tsk-el-4', title: 'Analyze 342 logged early warning alerts and verify village response times', assignee: 'Prof. K. S. Patnaik', status: 'in-progress', priority: 'High', dueDate: '2026-03-12' },
      { id: 'tsk-el-5', title: 'Draft scale-up DPR for 50 additional villages with EcoSense Technologies', assignee: 'Sanjay Tirkey', status: 'todo', priority: 'Medium', dueDate: '2026-03-25' }
    ],
    milestones: [
      { id: 'm-el-1', title: 'Acoustic & Thermal Infrasound Corridor Mapping', stage: 'Research', completed: true, dueDate: '2025-11-30', deliverable: 'West Singhbhum 8-Village Corridor Blueprint' },
      { id: 'm-el-2', title: 'Edge AI Vision Box & Solar Power Pack Schematics', stage: 'Design', completed: true, dueDate: '2025-12-20', deliverable: 'Rugged Low-Power Hardware Enclosure' },
      { id: 'm-el-3', title: '10-Node Sensor Mesh Testing at BIT Mesra Forest Lab', stage: 'Prototype', completed: true, dueDate: '2026-01-25', deliverable: 'Benchmarked 1.2s Detection Model' },
      { id: 'm-el-4', title: 'Live 8-Village Pilot Deployment in West Singhbhum', stage: 'Pilot', completed: true, dueDate: '2026-02-28', deliverable: '342 Real-Time Verified Alerts Generated' },
      { id: 'm-el-5', title: 'Scale-up Handover to Forest Dept & State Agriculture Mission', stage: 'Deployment', completed: false, dueDate: '2026-05-15', deliverable: 'State-wide Replication Standard' }
    ],
    industryPartners: [
      { name: 'EcoSense Technologies', type: 'Technology', commitment: 'IoT hardware, prototype funding, technical mentorship, and pilot deployment support' }
    ],
    documents: [
      { id: 'doc-el-1', name: 'EcoSense_EdgeAI_Camera_Firmware_v3.2.c', type: 'Code', uploadedBy: 'Rahul Munda', date: '2026-03-01', size: '312 KB' },
      { id: 'doc-el-2', name: 'BIT_Mesra_Elephant_Conflict_Pilot_Report.pdf', type: 'PDF', uploadedBy: 'Prof. K. S. Patnaik', date: '2026-03-04', size: '4.2 MB' },
      { id: 'doc-el-3', name: 'West_Singhbhum_8Villages_Telemetry_Map.geojson', type: 'Data', uploadedBy: 'Ananya Soren', date: '2026-03-05', size: '890 KB' }
    ],
    discussions: [
      { id: 'disc-el-1', author: 'Vikash Anand (EcoSense Technologies)', role: 'Industry Advisor', timestamp: '1 day ago', message: 'EcoSense field engineers completed the battery backup calibration on all 24 camera units in West Singhbhum. Ready for monsoon surge.' },
      { id: 'disc-el-2', author: 'Prof. K. S. Patnaik', role: 'Faculty Mentor', timestamp: '2 days ago', message: 'Edge inference latency is now down to 1.14 seconds on our low-power neural accelerator. Elephant verification accuracy tested at 97.8% across 342 real encounters.' },
      { id: 'disc-el-3', author: 'Soma Hembrom (Citizen Reporter)', role: 'Panchayat Representative', timestamp: '3 hours ago', message: 'The automated siren in Buruhatu alerted our village 18 minutes before a herd of 9 elephants reached the paddy fields. Not a single house or crop was damaged!' }
    ],
    impactTelemetry: [
      { metricName: 'Crop Damage Reduced', value: '62%', target: '60%', unit: '%' },
      { metricName: 'Farmers Benefited', value: '1,200', target: '1,200', unit: 'Farmers' },
      { metricName: 'Villages Covered', value: '8', target: '8', unit: 'Villages' },
      { metricName: 'Early Warning Alerts Generated', value: '342', target: '300+', unit: 'Alerts' },
      { metricName: 'Citizen Satisfaction', value: '4.6/5', target: '4.5/5', unit: 'Score' }
    ]
  },
  {
    id: 'proj-01',
    challengeId: 'ch-01',
    title: 'Nanofiltration & Solar Gravity Grid for Subernarekha River Basin',
    domain: 'Water',
    universityId: 'uni-bit',
    universityName: 'Birla Institute of Technology (BIT) Mesra, Ranchi',
    currentStage: 'Prototype Development',
    progressPercentage: 68,
    nextMilestone: 'Field Water Quality Validation & Heavy Metal Retention Test',
    teamMembers: [
      { id: 'tm-1', name: 'Dr. Anandita Sen', role: 'Faculty Mentor', department: 'Chemical & Environmental Eng', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80' },
      { id: 'tm-2', name: 'Rohit Kumar Barnwal', role: 'Student Lead', department: 'B.Tech Chemical Eng (Final Year)', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80' },
      { id: 'tm-3', name: 'Ananya Roy', role: 'Student Researcher', department: 'M.Tech Environmental Water Tech', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80' },
      { id: 'tm-4', name: 'Pravin Tigga', role: 'Student Researcher', department: 'B.Tech IoT & Embedded Systems', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80' },
      { id: 'tm-5', name: 'Er. Sandeep Mittal', role: 'Industry Advisor', department: 'Tata Steel Utilities & Infrastructure', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
      { id: 'tm-6', name: 'Rajesh Kujur', role: 'Gov Liaison', department: 'Jharkhand Drinking Water & Sanitation Dept', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' }
    ],
    tasks: [
      { id: 'tsk-1', title: 'Complete Graphene Oxide composite membrane cross-flow test', assignee: 'Rohit Barnwal', status: 'done', priority: 'High', dueDate: '2026-03-01' },
      { id: 'tsk-2', title: 'Calibrate LoRaWAN Turbidity and pH sensor module on river bank', assignee: 'Pravin Tigga', status: 'in-progress', priority: 'High', dueDate: '2026-03-10' },
      { id: 'tsk-3', title: 'Submit third-party NABL water safety lab sample', assignee: 'Ananya Roy', status: 'in-progress', priority: 'High', dueDate: '2026-03-14' },
      { id: 'tsk-4', title: 'Draft Panchayat O&M community handbook in Hindi and Kurukh', assignee: 'Rajesh Kujur', status: 'todo', priority: 'Medium', dueDate: '2026-03-22' }
    ],
    milestones: [
      { id: 'm-1', title: 'Comprehensive Baseline Contaminant Mapping', stage: 'Research', completed: true, dueDate: '2026-01-15', deliverable: 'Namkum River Baseline Report' },
      { id: 'm-2', title: 'CAD Blueprint of Dual-Stage Gravity Filter', stage: 'Design', completed: true, dueDate: '2026-02-10', deliverable: 'Modular Filter Enclosure Schematics' },
      { id: 'm-3', title: 'Working 5,000 L/Day Field Prototype Setup', stage: 'Prototype', completed: false, dueDate: '2026-03-20', deliverable: 'Getalsud Pilot Station Hardware' },
      { id: 'm-4', title: '60-Day Pilot Community Testing with Live Sensors', stage: 'Pilot', completed: false, dueDate: '2026-04-30', deliverable: 'Continuous Sensor Telemetry Logs' },
      { id: 'm-5', title: 'Handover to Gram Panchayat & District PHED', stage: 'Deployment', completed: false, dueDate: '2026-05-30', deliverable: 'Commissioning Certificate' }
    ],
    industryPartners: [
      { name: 'Tata Steel Foundation', type: 'Funding', commitment: '₹14.5 Lakhs hardware & membrane grant' },
      { name: 'Praj Industries CSR', type: 'Technology', commitment: 'Ceramic ultra-filtration module sponsorship' }
    ],
    documents: [
      { id: 'doc-1', name: 'BIT_Mesra_Water_Purification_Patent_Draft.pdf', type: 'PDF', uploadedBy: 'Dr. Anandita Sen', date: '2026-02-18', size: '2.4 MB' },
      { id: 'doc-2', name: 'NABL_Water_Quality_Batch1_Results.pdf', type: 'PDF', uploadedBy: 'Ananya Roy', date: '2026-02-28', size: '1.1 MB' },
      { id: 'doc-3', name: 'IoT_Telemetry_Firmware_v2.c', type: 'Code', uploadedBy: 'Pravin Tigga', date: '2026-03-02', size: '142 KB' }
    ],
    discussions: [
      { id: 'disc-1', author: 'Dr. Anandita Sen', role: 'Faculty Mentor', timestamp: '2 days ago', message: 'The membrane backwashing cycle has shown 98.4% flow recovery after 120 hours of simulated silt exposure. Outstanding progress team!' },
      { id: 'disc-2', author: 'Er. Sandeep Mittal', role: 'Industry Advisor', timestamp: 'Yesterday', message: 'Tata Steel Jamshedpur workshop can machine the stainless steel 316 manifold free of cost. Sending shipping details by tomorrow.' },
      { id: 'disc-3', author: 'Mukesh Mahto (Sarpanch)', role: 'Citizen Reporter', timestamp: '5 hours ago', message: 'The Angara village council has designated the land next to the school for the community solar water point. We are eagerly awaiting the trial.' }
    ],
    impactTelemetry: [
      { metricName: 'Arsenic Retention Efficiency', value: '99.4%', target: '98.0%', unit: '%' },
      { metricName: 'Clean Water Delivered', value: '18,400', target: '50,000', unit: 'Liters/Day' },
      { metricName: 'Energy Cost per 1000L', value: '₹1.80', target: '₹3.50', unit: 'INR' },
      { metricName: 'Villagers Covered in Pilot', value: '3,200', target: '45,000', unit: 'People' }
    ]
  },
  {
    id: 'proj-02',
    challengeId: 'ch-02',
    title: 'Solar Phase-Change Cold Vault & Controlled Desiccant Dehydrator',
    domain: 'Agriculture',
    universityId: 'uni-bau',
    universityName: 'Birsa Agricultural University (BAU), Ranchi',
    currentStage: 'Pilot Testing',
    progressPercentage: 82,
    nextMilestone: 'Monsoon Humidity Stability Run with Khunti Farmer Cooperative',
    teamMembers: [
      { id: 'tm-7', name: 'Dr. Rajeshwar Soren', role: 'Faculty Mentor', department: 'Entomology & Agro-Forestry', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80' },
      { id: 'tm-8', name: 'Sunil Mahato', role: 'Student Lead', department: 'M.Sc Agricultural Engineering', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80' },
      { id: 'tm-9', name: 'Pooja Kumari', role: 'Student Researcher', department: 'B.Tech Electrical & Renewable Energy', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' }
    ],
    tasks: [
      { id: 'tsk-5', title: 'Verify thermal phase retention curves across 36 hours without sunlight', assignee: 'Sunil Mahato', status: 'done', priority: 'High', dueDate: '2026-02-25' },
      { id: 'tsk-6', title: 'Connect solar inverter to remote 4G cloud dashboard', assignee: 'Pooja Kumari', status: 'done', priority: 'Medium', dueDate: '2026-03-01' },
      { id: 'tsk-7', title: 'Train 25 women lac cultivators on loading and moisture testing', assignee: 'Dr. Rajeshwar Soren', status: 'in-progress', priority: 'High', dueDate: '2026-03-12' }
    ],
    milestones: [
      { id: 'm-6', title: 'Crop Spoilage Survey & Thermal Spec', stage: 'Research', completed: true, dueDate: '2025-11-20', deliverable: 'Tribal Lac Post-Harvest Loss Assessment' },
      { id: 'm-7', title: 'Prototype PCM Chamber Fabrication', stage: 'Design', completed: true, dueDate: '2025-12-15', deliverable: '3-Ton Insulated Chamber' },
      { id: 'm-8', title: 'Field Installation at Torpa Cooperative', stage: 'Pilot', completed: true, dueDate: '2026-02-10', deliverable: 'Torpa Pilot Station Operational' },
      { id: 'm-9', title: 'State-wide Deployment Blueprint for TRIFED', stage: 'Deployment', completed: false, dueDate: '2026-04-15', deliverable: 'Scale-up Tender Specification' }
    ],
    industryPartners: [
      { name: 'Adani Solar CSR', type: 'Technology', commitment: '5kW Bifacial Solar Panels and MPPT units' },
      { name: 'JSLPS Palash Brand', type: 'Commercialization', commitment: 'Direct procurement linkage for 500 tons' }
    ],
    documents: [
      { id: 'doc-4', name: 'BAU_Solar_Lac_Vault_Design_Manual.pdf', type: 'PDF', uploadedBy: 'Dr. Rajeshwar Soren', date: '2026-01-20', size: '4.8 MB' }
    ],
    discussions: [
      { id: 'disc-4', author: 'Sunil Mahato', role: 'Student Lead', timestamp: '1 day ago', message: 'Torpa cooperative just processed their first 1,200 kg batch of Kusmi lac. Zero moisture clumping recorded!' }
    ],
    impactTelemetry: [
      { metricName: 'Post-Harvest Spoilage Rate', value: '3.2%', target: '< 5%', unit: '%' },
      { metricName: 'Farmer Realized Price Increase', value: '+42%', target: '+35%', unit: '%' },
      { metricName: 'Solar Self-Sufficiency', value: '96%', target: '90%', unit: '%' }
    ]
  },
  {
    id: 'proj-03',
    challengeId: 'ch-03',
    title: 'Aerosol Suppression Mist Cannon & LoRa Pollution Mesh',
    domain: 'Environment',
    universityId: 'uni-ism',
    universityName: 'IIT (ISM) Dhanbad',
    currentStage: 'Solution Design',
    progressPercentage: 42,
    nextMilestone: 'Wind Tunnel Micro-droplet Evaporation Test',
    teamMembers: [
      { id: 'tm-10', name: 'Prof. Debranjan Sarkar', role: 'Faculty Mentor', department: 'Mining & Environmental Eng', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80' },
      { id: 'tm-11', name: 'Kavita Murmu', role: 'Student Lead', department: 'M.Tech Environmental Geotechnology', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' }
    ],
    tasks: [
      { id: 'tsk-8', title: 'Complete CFD simulation of aerodynamic mist trajectory', assignee: 'Kavita Murmu', status: 'in-progress', priority: 'High', dueDate: '2026-03-18' }
    ],
    milestones: [
      { id: 'm-10', title: 'Emission Baseline at Jharia Siding', stage: 'Research', completed: true, dueDate: '2026-02-15', deliverable: 'Jharia PM10/PM2.5 Heatmap' }
    ],
    industryPartners: [
      { name: 'Coal India Foundation', type: 'Funding', commitment: '₹28 Lakhs research & testbed sponsorship' }
    ],
    documents: [],
    discussions: [],
    impactTelemetry: [
      { metricName: 'PM10 Reduction in Test Rig', value: '62%', target: '60%', unit: '%' }
    ]
  },
  {
    id: 'proj-05',
    challengeId: 'ch-05',
    title: 'Non-Invasive Optical Hemoglobin & Child Growth AI Scanner',
    domain: 'Healthcare',
    universityId: 'uni-aiims',
    universityName: 'AIIMS Deoghar & BIT Mesra Joint Lab',
    currentStage: 'Impact Validation',
    progressPercentage: 96,
    nextMilestone: 'State Health Mission Integration Review',
    teamMembers: [
      { id: 'tm-12', name: 'Dr. Saurabh Prakash', role: 'Faculty Mentor', department: 'Biomedical Engineering (BIT Mesra)', avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=200&q=80' },
      { id: 'tm-13', name: 'Dr. Neha Sinha', role: 'Faculty Mentor', department: 'Community Medicine (AIIMS Deoghar)', avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80' },
      { id: 'tm-14', name: 'Amitabh Sen', role: 'Student Lead', department: 'M.Tech Biomedical AI', avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=200&q=80' }
    ],
    tasks: [
      { id: 'tsk-9', title: 'Synthesize Dumka 150-device field accuracy audit', assignee: 'Dr. Neha Sinha', status: 'done', priority: 'High', dueDate: '2026-02-28' }
    ],
    milestones: [
      { id: 'm-11', title: 'Optical PPG Sensor Calibration', stage: 'Research', completed: true, dueDate: '2025-06-15', deliverable: 'Optical Multi-wavelength Algorithm' },
      { id: 'm-12', title: 'Clinical Trial on 1,500 Pregnant Women at AIIMS', stage: 'Pilot', completed: true, dueDate: '2025-11-30', deliverable: 'Ethical Review & Clinical Dossier' },
      { id: 'm-13', title: 'Deployment of 150 Devices in Santhal Pargana', stage: 'Deployment', completed: true, dueDate: '2026-01-15', deliverable: 'Anganwadi Fleet Operational' },
      { id: 'm-14', title: 'State-wide Scale to 12,000 Anganwadi Centers', stage: 'Validation', completed: false, dueDate: '2026-06-30', deliverable: 'National Health Mission Approval' }
    ],
    industryPartners: [
      { name: 'Infosys Foundation', type: 'Funding', commitment: '₹45 Lakhs equipment manufacturing grant' }
    ],
    documents: [
      { id: 'doc-5', name: 'AIIMS_Clinical_Trial_Hemoglobin_Accuracy_Report.pdf', type: 'PDF', uploadedBy: 'Dr. Neha Sinha', date: '2025-12-05', size: '3.6 MB' }
    ],
    discussions: [],
    impactTelemetry: [
      { metricName: 'Anemic Mothers Screened', value: '41,200', target: '30,000', unit: 'Mothers' },
      { metricName: 'Correlation with Blood Prick (R²)', value: '0.94', target: '0.90', unit: 'Score' },
      { metricName: 'Test Time per Patient', value: '45 sec', target: '< 60 sec', unit: 'Time' },
      { metricName: 'Consumable Cost per Test', value: '₹0.00', target: '₹0.00', unit: 'INR' }
    ]
  }
];

export const INDUSTRY_OPPORTUNITIES: IndustryOpportunity[] = [
  {
    id: 'ind-elephant',
    projectId: 'proj-elephant',
    projectTitle: 'AI-Powered Elephant Early Warning System',
    domain: 'Agriculture',
    district: 'West Singhbhum',
    university: 'BIT Mesra',
    matchScore: 98,
    summary: 'EcoSense Technologies partnered with BIT Mesra to supply IoT edge AI hardware, prototype funding, technical mentorship, and pilot deployment support across 8 vulnerable villages in West Singhbhum.',
    technologyRequired: ['Low-power Edge AI Vision Cameras', 'Thermal Infrared Sensor Nodes', 'Solar MPPT Battery Enclosures', 'LoRaWAN Long-Range Gateways'],
    fundingRequired: '₹25 Lakhs CSR Grant for 50 additional forest perimeter nodes',
    mentorshipRequired: 'Industrial edge computing lifecycle, rugged IP67 enclosure engineering, and wildlife corridor telemetry',
    pilotSiteRequired: '8 agricultural villages in West Singhbhum bordering Saranda & Goilkera ranges',
    activeCollaboratorsCount: 2,
    csrEligible: true
  },
  {
    id: 'ind-01',
    projectId: 'proj-01',
    projectTitle: 'Nanofiltration & Solar Gravity Grid for Subernarekha River Basin',
    domain: 'Water',
    district: 'Ranchi',
    university: 'BIT Mesra, Ranchi',
    matchScore: 97,
    summary: 'Seeking scaling partner for 25 rural community nano-membrane water filtration kiosks powered by solar gravity pumps along toxic industrial river stretch.',
    technologyRequired: ['Ceramic Ultrafiltration membranes', 'Industrial grade solar inverters', 'Automated valve actuators'],
    fundingRequired: '₹22 Lakhs CSR Grant for 10 village stations',
    mentorshipRequired: 'Industrial water utility O&M engineering and water testing protocols',
    pilotSiteRequired: 'Industrial plant water discharge monitoring point',
    activeCollaboratorsCount: 2,
    csrEligible: true
  },
  {
    id: 'ind-02',
    projectId: 'proj-02',
    projectTitle: 'Solar Phase-Change Cold Vault & Dehydrator for Tribal Lac Farmers',
    domain: 'Agriculture',
    district: 'Khunti',
    university: 'Birsa Agricultural University (BAU), Ranchi',
    matchScore: 94,
    summary: 'Scaling decentralized 3-Ton solar phase change cold rooms for forest minor produce and perishable vegetables to eliminate distress selling.',
    technologyRequired: ['Phase Change Material (PCM) thermal packs', 'Heavy-duty solar tracking mounts', '4G IoT environmental sensors'],
    fundingRequired: '₹18 Lakhs for 5 cluster storage vaults',
    mentorshipRequired: 'Cold-chain logistics, packaging, and export standard compliance',
    pilotSiteRequired: 'Tribal agricultural cooperative collection hubs in Torpa and Dorma',
    activeCollaboratorsCount: 3,
    csrEligible: true
  },
  {
    id: 'ind-03',
    projectId: 'proj-03',
    projectTitle: 'Aerosol Suppression Mist Cannon & LoRa Pollution Mesh',
    domain: 'Environment',
    district: 'Dhanbad',
    university: 'IIT (ISM) Dhanbad',
    matchScore: 92,
    summary: 'Automated LoRa-controlled micro-droplet misting network along coal haulage routes and opencast mine sidings to suppress PM10 and PM2.5.',
    technologyRequired: ['High-pressure atomizing nozzles', 'Outdoor particulate optical sensors', 'Water recycling pump skids'],
    fundingRequired: '₹35 Lakhs for 3km haul-road grid',
    mentorshipRequired: 'Heavy industrial equipment safety certification and mine regulation standards',
    pilotSiteRequired: 'Jharia opencast mine perimeter road',
    activeCollaboratorsCount: 1,
    csrEligible: true
  },
  {
    id: 'ind-04',
    projectId: 'proj-04',
    projectTitle: 'Fly Ash & Mining Overburden Geo-polymer Pavers for Peri-Urban Slums',
    domain: 'Urban Infrastructure',
    district: 'Bokaro',
    university: 'NIT Jamshedpur',
    matchScore: 89,
    summary: 'Zero-cement interlocking pavement blocks manufactured from industrial thermal fly ash and slag by local women self-help groups.',
    technologyRequired: ['Hydraulic block pressing machines', 'Alkaline activator storage tanks', 'Portable compressive strength tester'],
    fundingRequired: '₹12 Lakhs machinery grant for women SHG toolroom',
    mentorshipRequired: 'Civil construction quality assurance and IS-code certification',
    pilotSiteRequired: 'Chas municipal slum internal access roads',
    activeCollaboratorsCount: 1,
    csrEligible: true
  },
  {
    id: 'ind-05',
    projectId: 'proj-05',
    projectTitle: 'Portable Non-Invasive Hemoglobin & Malnutrition Scanner for Anganwadis',
    domain: 'Healthcare',
    district: 'Dumka',
    university: 'AIIMS Deoghar & BIT Mesra Joint Lab',
    matchScore: 98,
    summary: 'Mass manufacturing scale-up of optical biosensor reader requiring no needle pricks, no chemical reagents, and no electricity grid connection.',
    technologyRequired: ['Medical grade injection molding', 'Multi-wavelength LED arrays', 'Bluetooth Low Energy BLE 5.2 chips'],
    fundingRequired: '₹50 Lakhs for 1,000 unit production batch',
    mentorshipRequired: 'Medical device ISO 13485 certification and CDSCO regulatory clearance',
    pilotSiteRequired: 'Primary Health Centers across Santhal Pargana',
    activeCollaboratorsCount: 2,
    csrEligible: true
  }
];

export const IMPACT_STORIES: ImpactStory[] = [
  {
    id: 'imp-elephant',
    title: 'AI Elephant Early Warning Protects 1,200 Farmers Across 8 Villages in West Singhbhum',
    domain: 'Agriculture',
    district: 'West Singhbhum',
    summary: 'Engineered by BIT Mesra and supported by EcoSense Technologies, low-cost edge AI cameras and IoT sensor nodes detect nocturnal elephant intrusions, reducing crop damage by 62% and generating 342 verified life-saving alerts.',
    citizensBenefited: 1200,
    beforeMetric: 'Devastating Night Crop Trampling',
    afterMetric: '62% Crop Damage Reduced & 342 Alerts',
    beforeDescription: 'Wild herds repeatedly entered paddy and maize fields under darkness; 1,200 farmers suffered massive seasonal losses, property destruction, and severe mortal danger.',
    afterDescription: 'Edge AI detects animal movement, verifies elephants within 1.2s, activates village warning sirens, and alerts forest rangers 15–20 minutes before herds reach human settlements.',
    image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1000&q=80',
    partnerUniversity: 'BIT Mesra',
    industrySupporter: 'EcoSense Technologies',
    citizenQuote: {
      text: 'Wild elephants used to destroy our paddy fields every night. Now, the AI cameras verify movement and sound village sirens 15 minutes before they arrive. 1,200 of us in 8 villages can finally protect our harvest and sleep safely.',
      author: 'Soma Hembrom',
      role: 'Farmer & Panchayat Representative, Buruhatu'
    }
  },
  {
    id: 'imp-01',
    title: 'Safe Drinking Water Restored for 45,000 Villagers in Namkum',
    domain: 'Water',
    district: 'Ranchi',
    summary: 'Nanofiltration kiosks developed by BIT Mesra students and funded by Tata Steel CSR brought arsenic levels down from 0.062 mg/L to zero detected, ending a 15-year clean water crisis.',
    citizensBenefited: 48500,
    beforeMetric: '0.062 mg/L Arsenic (Hazardous)',
    afterMetric: '0.001 mg/L (WHO Safe Standard)',
    beforeDescription: 'Community relied on yellow-tinted river water; 28% of children suffered gastrointestinal disorders; families spent ₹600/month on bottled cans.',
    afterDescription: 'Solar gravity kiosks provide 24/7 crystal-pure water at ₹0.10/liter maintained autonomously by the Gram Panchayat water committee.',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1000&q=80',
    partnerUniversity: 'BIT Mesra, Ranchi',
    industrySupporter: 'Tata Steel Foundation',
    citizenQuote: {
      text: 'For 15 years we suffered skin rashes and stomach pain from the river water. Today, our children carry pure water bottles to school every morning. This technology gave our village its health back.',
      author: 'Mukesh Mahto',
      role: 'Gram Panchayat Sarpanch, Namkum'
    }
  },
  {
    id: 'imp-02',
    title: 'Tribal Lac Farmers Increase Income by 42% with Solar Desiccant Vaults',
    domain: 'Agriculture',
    district: 'Khunti',
    summary: 'Birsa Agricultural University engineered a zero-electricity thermal phase change vault that prevents humidity rotting of harvested lac in remote forests.',
    citizensBenefited: 32000,
    beforeMetric: '38% Crop Loss in Monsoon',
    afterMetric: '3.2% Negligible Loss',
    beforeDescription: 'Distress selling at ₹220/kg due to rapid fungal growth and humidity encrustation during monsoon delays.',
    afterDescription: 'Farmers store harvested lac safely for up to 9 months and sell directly to Palash brand outlets at ₹480/kg guaranteed price.',
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1000&q=80',
    partnerUniversity: 'Birsa Agricultural University',
    industrySupporter: 'Adani Solar & TRIFED',
    citizenQuote: {
      text: 'We used to borrow money at high interest when our lac spoiled in damp huts. Now our entire women’s cooperative stores produce in the solar vault with dignity.',
      author: 'Shanti Munda',
      role: 'Cooperative President, Torpa'
    }
  },
  {
    id: 'imp-03',
    title: 'Zero-Prick Anemia Screening Reaches 41,000 Tribal Mothers in Dumka',
    domain: 'Healthcare',
    district: 'Dumka',
    summary: 'Optical multi-wavelength scanner created by AIIMS Deoghar and BIT Mesra detected severe anemia in 3,800 pregnant women early enough to prevent obstetric complications.',
    citizensBenefited: 41200,
    beforeMetric: '22% Anemia Screening Rate',
    afterMetric: '96% Screening Coverage',
    beforeDescription: 'Needle pricks caused cultural hesitation and reagent kits repeatedly expired during hot summers.',
    afterDescription: 'ASHA workers simply slide a finger into the solar sensor clip; reading syncs to tablet in 45 seconds with instant dietary intervention alerts.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80',
    partnerUniversity: 'AIIMS Deoghar & BIT Mesra',
    industrySupporter: 'Infosys Foundation',
    citizenQuote: {
      text: 'No blood, no needle, no pain. Every mother in my village happily comes to the Anganwadi center now for testing.',
      author: 'Parvati Devi',
      role: 'Senior ASHA Worker'
    }
  }
];

export const PLATFORM_STATS = {
  challengesReceived: 12840,
  universitiesParticipating: 72,
  industryPartners: 186,
  solutionsDeployed: 86,
  citizensImpacted: 1240000,
  waterSavedLiters: '48.2 Million',
  farmersBenefited: '142,000',
  wasteReducedTons: '18,500',
  jobsCreated: '3,840',
  patentsGenerated: 34,
  startupsCreated: 21,
  citizenSatisfactionRate: 94.6
};

export const MOCK_NOTIFICATIONS = [
  {
    id: 'n-el-1',
    title: 'EcoSense & BIT Mesra Pilot Active',
    message: '342 elephant early warning alerts verified across 8 villages in West Singhbhum (JH-SAM-2026-9401).',
    timestamp: '10 mins ago',
    read: false,
    type: 'project' as const,
    linkId: 'ch-elephant'
  },
  {
    id: 'n-1',
    title: 'BIT Mesra Accepted Challenge',
    message: 'Advanced Water Lab accepted your Subernarekha filtration report (JH-SAM-2026-1048).',
    timestamp: '15 mins ago',
    read: false,
    type: 'project' as const,
    linkId: 'ch-01'
  },
  {
    id: 'n-2',
    title: 'Tata Steel CSR Grant Released',
    message: '₹14.5 Lakhs milestone grant released for field telemetry deployment.',
    timestamp: '2 hours ago',
    read: false,
    type: 'grant' as const,
    linkId: 'ch-01'
  },
  {
    id: 'n-3',
    title: 'Government Seed Validation',
    message: 'Department of Higher Education validated 3 new challenges in Khunti and Dhanbad.',
    timestamp: 'Yesterday',
    read: true,
    type: 'challenge' as const,
    linkId: 'ch-02'
  }
];

// Convenience Aliases
export const MOCK_CHALLENGES = INITIAL_CHALLENGES;
export const MOCK_WORKSPACES = INITIAL_PROJECT_WORKSPACES;
export const MOCK_INDUSTRY_OPPORTUNITIES = INDUSTRY_OPPORTUNITIES;
export const MOCK_IMPACT_STORIES = IMPACT_STORIES;

