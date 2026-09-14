import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Mic, 
  MicOff, 
  UploadCloud, 
  MapPin, 
  Compass, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Cpu, 
  FileText, 
  Image as ImageIcon, 
  Volume2, 
  Video, 
  X, 
  Loader2,
  Check,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Layers,
  Building2,
  Users,
  Radio,
  Zap,
  RotateCcw,
  Lightbulb,
  Clock,
  ShieldCheck,
  Award,
  Radar,
  Eye,
  Camera,
  Paperclip,
  Phone,
  UserCheck,
  Save,
  CheckCircle
} from 'lucide-react';
import { Challenge, Domain, PriorityLevel } from '../types';
import { JHARKHAND_DISTRICTS } from '../data/mockData';

export interface SimilarChallengeItem {
  id: string;
  title: string;
  similarity: number;
  timeAgo: string;
  distance: string;
  status: string;
  matchReason?: string;
}

interface ReportChallengePageProps {
  onChallengeSubmitted: (newChallenge: Challenge) => void;
  onCancel: () => void;
}

export const ReportChallengePage: React.FC<ReportChallengePageProps> = ({
  onChallengeSubmitted,
  onCancel
}) => {
  // 5-Step Workflow: 1 (Describe) -> 2 (Evidence) -> 3 (Location) -> 4 (AI Analysis) -> 5 (Review & Submit) -> 6 (Submitted Confirmation)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);

  // Form State - Step 1: Describe
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [affectedGroup, setAffectedGroup] = useState('My village/community');
  const [duration, setDuration] = useState('A few months');
  const [perceivedSeverity, setPerceivedSeverity] = useState('Serious');
  const [citizenName, setCitizenName] = useState('Anil Kumar Mahato');
  const [citizenContact, setCitizenContact] = useState('9835102941');
  const [draftSaved, setDraftSaved] = useState(true);
  const [step1Error, setStep1Error] = useState<string | null>(null);

  // Voice recording & AI Writing Assistant state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [isEnhancingWithAI, setIsEnhancingWithAI] = useState(false);
  const [aiEnhancedFeedback, setAiEnhancedFeedback] = useState<string | null>(null);

  // Form State - Step 2: Evidence
  const [uploadedFiles, setUploadedFiles] = useState<{ 
    name: string; 
    type: 'image' | 'video' | 'doc' | 'audio'; 
    size: string; 
    file?: File; 
    previewUrl?: string; 
  }[]>([
    {
      name: 'water-pump.jpg',
      type: 'image',
      size: '2.4 MB',
      previewUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'water-report.pdf',
      type: 'doc',
      size: '1.2 MB'
    }
  ]);
  const [isDragging, setIsDragging] = useState(false);
  const [fileUploadError, setFileUploadError] = useState<string | null>(null);
  const [previewModalFile, setPreviewModalFile] = useState<{ name: string; url?: string; type: string } | null>(null);

  // File input refs for uploading from PC
  const fileInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);
  const voiceInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Form State - Step 3: Location
  const [district, setDistrict] = useState('Ranchi');
  const [block, setBlock] = useState('Namkum');
  const [villageOrCity, setVillageOrCity] = useState('Chandaghasi');
  const [pincode, setPincode] = useState('834010');
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>({ lat: 23.3441, lng: 85.3096 });
  const [isFetchingGPS, setIsFetchingGPS] = useState(false);
  const [gpsCaptured, setGpsCaptured] = useState(true);
  const [gpsError, setGpsError] = useState<string | null>(null);

  // Form State - Step 4: AI Analysis
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [aiAnalysisPhase, setAiAnalysisPhase] = useState(1);
  const [showSimilarDrawer, setShowSimilarDrawer] = useState(false);
  const [isWhyExpanded, setIsWhyExpanded] = useState(false);

  // AI Output Values
  const [selectedDomain, setSelectedDomain] = useState<Domain>('Water');
  const [secondaryDomains, setSecondaryDomains] = useState<Domain[]>(['Healthcare', 'Rural Livelihoods', 'Environment']);
  const [priorityScore, setPriorityScore] = useState(87);
  const [priorityLevel, setPriorityLevel] = useState<PriorityLevel>('High');
  const [priorityRationale, setPriorityRationale] = useState<string>('');
  const [priorityFactors, setPriorityFactors] = useState({
    humanImpact: 0,
    economicLoss: 0,
    urgency: 0,
    geographicSpread: 0,
  });
  const [evidenceAssessment, setEvidenceAssessment] = useState<{
    evidenceUsed: boolean;
    imageCount: number;
    summary: string;
  } | null>({
    evidenceUsed: true,
    imageCount: 1,
    summary: 'Attached imagery substantiates damaged handpump lever and severe water discoloration at the village collection point.',
  });
  const [estimatedAffected, setEstimatedAffected] = useState(1800);
  const [aiKeywords, setAiKeywords] = useState(['Drinking Water', 'Groundwater', 'Rural Infrastructure', 'Water Quality']);
  
  const [similarChallengesList, setSimilarChallengesList] = useState<SimilarChallengeItem[]>([
    {
      id: 'sim-1',
      title: 'Drinking Water Access & Handpump Failure — Namkum',
      similarity: 82,
      timeAgo: '12 days ago',
      distance: '2.1 km away',
      status: 'Validated',
      matchReason: 'Both reports describe mechanical handpump breakdowns and loss of dependable drinking water in Namkum block.',
    },
    {
      id: 'sim-2',
      title: 'Handpump seasonal drying & turbidity — Ranchi Rural',
      similarity: 74,
      timeAgo: '28 days ago',
      distance: '5.4 km away',
      status: 'Under Review',
      matchReason: 'Both cases report severe seasonal water turbidity and deep aquifer depletion in nearby rural Ranchi habitations.',
    },
    {
      id: 'sim-3',
      title: 'Subarnarekha feeder well contamination — Hatia Belt',
      similarity: 68,
      timeAgo: '42 days ago',
      distance: '8.7 km away',
      status: 'University Assigned',
      matchReason: 'Both issues involve contaminated groundwater sources and filtration needs along the Subarnarekha drainage basin.',
    }
  ]);

  const [recommendedExpertise, setRecommendedExpertise] = useState([
    { name: 'Water Engineering', relevance: 95 },
    { name: 'IoT & Sensor Systems', relevance: 89 },
    { name: 'Environmental Science', relevance: 86 },
    { name: 'Public Health', relevance: 78 }
  ]);

  const [recommendedUniversities, setRecommendedUniversities] = useState([
    {
      universityName: 'BIT Mesra, Ranchi',
      matchScore: 92,
      rationale: 'Advanced membrane separation laboratory and remote hydrology IoT sensing research wing.',
      facultyLead: 'Dr. Anandita Sen',
      labSpecialization: 'Centre for Water & Environmental Technologies'
    },
    {
      universityName: 'Ranchi University',
      matchScore: 87,
      rationale: 'Department of Geology and Rural Resource Mapping with extensive field extension teams in Namkum.',
      facultyLead: 'Prof. Ramesh Oraon',
      labSpecialization: 'Groundwater Hydrology Lab'
    },
    {
      universityName: 'NIT Jamshedpur',
      matchScore: 84,
      rationale: 'Civil & Environmental Engineering team specializing in community-scale sand and ceramic filtration.',
      facultyLead: 'Dr. P. K. Verma',
      labSpecialization: 'Public Health Infrastructure Hub'
    }
  ]);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedChallengeData, setSubmittedChallengeData] = useState<Challenge | null>(null);

  // Real AI Triage Tracking
  const triageRequestIdRef = useRef(0);
  const animationFinishedRef = useRef(false);
  const pendingTriageDataRef = useRef<any>(null);
  const [problemSummary, setProblemSummary] = useState('');
  const [potentialSolutionDirection, setPotentialSolutionDirection] = useState('');
  const [triageSource, setTriageSource] = useState<'gemini' | 'deterministic'>('deterministic');
  const [similarChallengesCount, setSimilarChallengesCount] = useState<number>(3);

  // Prevent stale updates after component unmount
  useEffect(() => {
    return () => {
      triageRequestIdRef.current += 1;
    };
  }, []);

  const applyTriageData = (data: any) => {
    if (!data) return;
    if (data.domain) setSelectedDomain(data.domain as Domain);
    if (Array.isArray(data.secondaryDomains) && data.secondaryDomains.length > 0) {
      setSecondaryDomains(data.secondaryDomains as Domain[]);
    }
    if (typeof data.priorityScore === 'number') {
      setPriorityScore(Math.min(100, Math.max(0, data.priorityScore)));
    }
    if (data.priorityLevel) {
      setPriorityLevel(data.priorityLevel as PriorityLevel);
    }
    if (typeof data.priorityRationale === 'string' && data.priorityRationale.trim()) {
      setPriorityRationale(data.priorityRationale.trim());
    }
    if (data.priorityFactors) {
      setPriorityFactors({
        humanImpact: Math.min(100, Math.max(0, Math.round(Number(data.priorityFactors.humanImpact) || 0))),
        economicLoss: Math.min(100, Math.max(0, Math.round(Number(data.priorityFactors.economicLoss) || 0))),
        urgency: Math.min(100, Math.max(0, Math.round(Number(data.priorityFactors.urgency) || 0))),
        geographicSpread: Math.min(100, Math.max(0, Math.round(Number(data.priorityFactors.geographicSpread) || 0))),
      });
    }
    if (typeof data.estimatedAffected === 'number') {
      setEstimatedAffected(data.estimatedAffected);
    }
    if (Array.isArray(data.aiKeywords) && data.aiKeywords.length > 0) {
      setAiKeywords(data.aiKeywords);
    }
    if (Array.isArray(data.recommendedExpertise) && data.recommendedExpertise.length > 0) {
      setRecommendedExpertise(data.recommendedExpertise);
    }
    if (Array.isArray(data.recommendedUniversities) && data.recommendedUniversities.length > 0) {
      setRecommendedUniversities(data.recommendedUniversities);
    }
    if (Array.isArray(data.similarChallenges)) {
      setSimilarChallengesList(data.similarChallenges);
    }
    if (data.problemSummary) setProblemSummary(data.problemSummary);
    if (data.potentialSolutionDirection) setPotentialSolutionDirection(data.potentialSolutionDirection);
    if (data.evidenceAssessment && typeof data.evidenceAssessment === 'object') {
      setEvidenceAssessment({
        evidenceUsed: Boolean(data.evidenceAssessment.evidenceUsed),
        imageCount: Number(data.evidenceAssessment.imageCount) || 0,
        summary: String(data.evidenceAssessment.summary || '').trim(),
      });
    } else {
      setEvidenceAssessment(null);
    }
    if (typeof data.similarChallengesCount === 'number') {
      setSimilarChallengesCount(data.similarChallengesCount);
    } else if (Array.isArray(data.similarChallenges)) {
      setSimilarChallengesCount(data.similarChallenges.length);
    }
    if (data.source) {
      setTriageSource(data.source === 'gemini' ? 'gemini' : 'deterministic');
    }
  };

  // Safe helper to encode an image file to base64
  const encodeImageFileToBase64 = async (file: File): Promise<{ mimeType: string; data: string } | null> => {
    return new Promise((resolve) => {
      try {
        const reader = new FileReader();
        reader.onload = () => {
          const result = String(reader.result || '');
          const commaIdx = result.indexOf(',');
          if (commaIdx !== -1) {
            resolve({
              mimeType: file.type || 'image/jpeg',
              data: result.slice(commaIdx + 1),
            });
          } else {
            resolve(null);
          }
        };
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(file);
      } catch {
        resolve(null);
      }
    });
  };

  // Execute genuine AI triage with safe deterministic fallback & multimodal evidence
  const executeTriageRequest = async () => {
    const currentReqId = ++triageRequestIdRef.current;
    animationFinishedRef.current = false;
    pendingTriageDataRef.current = null;

    setIsAnalyzing(true);
    setAnalysisComplete(false);
    setAiAnalysisPhase(1);
    setPriorityScore(0);
    setPriorityLevel('Low');
    setPriorityRationale('');
    setPriorityFactors({
      humanImpact: 0,
      economicLoss: 0,
      urgency: 0,
      geographicSpread: 0,
    });
    setSimilarChallengesList([]);
    setSimilarChallengesCount(0);
    setRecommendedExpertise([]);
    setRecommendedUniversities([]);
    setAiKeywords([]);
    setProblemSummary('');
    setPotentialSolutionDirection('');
    setEvidenceAssessment(null);
    setTriageSource('deterministic');

    // Package available evidence safely
    let evidencePayload: any = undefined;
    try {
      const imageItems: Array<{ mimeType: string; data?: string; url?: string }> = [];
      const imageFiles = uploadedFiles.filter((f) => f.type === 'image').slice(0, 3);
      for (const item of imageFiles) {
        if (item.file) {
          const encoded = await encodeImageFileToBase64(item.file);
          if (encoded) {
            imageItems.push(encoded);
          }
        } else if (item.previewUrl) {
          if (item.previewUrl.startsWith('data:image/')) {
            const parts = item.previewUrl.split(',');
            const match = parts[0].match(/:(image\/[^;]+)/);
            imageItems.push({
              mimeType: match ? match[1] : 'image/jpeg',
              data: parts[1],
            });
          } else if (item.previewUrl.startsWith('http://') || item.previewUrl.startsWith('https://')) {
            imageItems.push({
              mimeType: 'image/jpeg',
              url: item.previewUrl,
            });
          }
        }
      }

      const documentNames = uploadedFiles
        .filter((f) => f.type === 'doc')
        .map((f) => f.name.slice(0, 60))
        .slice(0, 5);
      const audioCount = uploadedFiles.filter((f) => f.type === 'audio').length;
      const videoCount = uploadedFiles.filter((f) => f.type === 'video').length;

      evidencePayload = {
        images: imageItems,
        documentNames,
        audioCount,
        videoCount,
      };
    } catch {
      evidencePayload = undefined;
    }

    if (triageRequestIdRef.current !== currentReqId) return;

    fetch('/api/gemini/triage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description,
        district,
        block,
        villageOrCity,
        affectedGroup,
        duration,
        perceivedSeverity,
        evidence: evidencePayload,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (triageRequestIdRef.current !== currentReqId) return; // Discard stale request
        pendingTriageDataRef.current = data;
        // If the 6-phase animation already reached step 6, finalize and reveal now
        if (animationFinishedRef.current) {
          applyTriageData(data);
          setIsAnalyzing(false);
          setAnalysisComplete(true);
        }
      })
      .catch((err) => {
        console.warn('AI Triage network error, applying local fallback:', err);
        if (triageRequestIdRef.current !== currentReqId) return;
        const combined = `${title || ''} ${description || ''}`.toLowerCase();
        const userDistLower = (district || '').toLowerCase();
        const isWildlife =
          /\b(elephant|elephants|tusker|tuskers|wildlife|wild animals?|forest fringe|saranda|crop raids?|crop raiding|wild boars?|\bboar\b)\b/i.test(combined);
        const isAgri =
          /\b(lac|lah|laha|harvest|harvesting|cold storage|cold chain|perishables?|spoilage|crops?|farmers?|farming|post-harvest|irrigation|paddy)\b/i.test(combined);
        const isHealth =
          /\b(malnutrition|health|healthcare|child|children|pediatric|medical|hospitals?|doctors?|clinics?|diseases?|stunting|anemia|anganwadis?|maternal)\b/i.test(combined);

        let fallbackData: any;
        if (isWildlife) {
          fallbackData = {
            domain: 'Wildlife Management',
            secondaryDomains: ['Agriculture', 'Environment', 'Rural Livelihoods'],
            priorityScore: 94,
            priorityLevel: 'Critical',
            priorityFactors: {
              humanImpact: 92,
              economicLoss: 88,
              urgency: 95,
              geographicSpread: 78,
            },
            priorityRationale:
              'Priority reflects immediate community safety concerns, recurring wildlife conflict, and potential crop and livelihood losses.',
            estimatedAffected: 1200,
            aiKeywords: ['Wildlife Conflict', 'Crop Protection', 'Nocturnal Intrusion', 'Early Warning Sensor'],
            similarChallenges: [
              {
                id: 'ch-elephant',
                title: 'AI-Based Early Warning System for Human–Elephant Conflict',
                similarity: 92,
                timeAgo: 'Existing challenge',
                distance: userDistLower.includes('singhbhum') ? 'Same district' : 'Other district',
                status: 'Pilot Testing',
                matchReason: 'Both reports concern wild elephant movements breaching agricultural barriers and endangering local villages.',
              },
              {
                id: 'ch-04',
                title: 'AI Acoustic Early Warning System for Forest Fringe Wild Elephant Corridors',
                similarity: 84,
                timeAgo: 'Existing challenge',
                distance: userDistLower.includes('hazaribagh') ? 'Same district' : 'Other district',
                status: 'Government Validated',
                matchReason: 'Both challenges address automated acoustic and sensor detection along forest corridor boundaries.',
              },
            ],
            source: 'deterministic',
          };
        } else if (isAgri) {
          fallbackData = {
            domain: 'Agriculture',
            secondaryDomains: ['Rural Livelihoods', 'Energy', 'Environment'],
            priorityScore: 88,
            priorityLevel: 'High',
            priorityFactors: {
              humanImpact: 84,
              economicLoss: 92,
              urgency: 82,
              geographicSpread: 75,
            },
            priorityRationale:
              'Priority reflects potential livelihood losses, crop damage, and the seasonal urgency of protecting agricultural production.',
            estimatedAffected: 2100,
            aiKeywords: ['Lac Harvest', 'Cold Storage', 'Post-Harvest Loss', 'Thermal Preservation'],
            similarChallenges: [
              {
                id: 'ch-02',
                title: 'Off-Grid Solar Desiccant Vault for Lac & Forest Minor Produce Storage',
                similarity: 86,
                timeAgo: 'Existing challenge',
                distance: userDistLower.includes('khunti') ? 'Same district' : 'Other district',
                status: 'Pilot Testing',
                matchReason: 'Both reports address post-harvest deterioration and lack of temperature-controlled storage for forest produce.',
              },
            ],
            source: 'deterministic',
          };
        } else if (isHealth) {
          fallbackData = {
            domain: 'Healthcare',
            secondaryDomains: ['Rural Livelihoods', 'Public Administration'],
            priorityScore: 92,
            priorityLevel: 'Critical',
            priorityFactors: {
              humanImpact: 96,
              economicLoss: 72,
              urgency: 94,
              geographicSpread: 80,
            },
            priorityRationale:
              'Priority reflects potential health consequences, affected population needs, and the urgency of timely intervention.',
            estimatedAffected: 2800,
            aiKeywords: ['Child Malnutrition', 'Pediatric Screening', 'Rural Health Access'],
            similarChallenges: [
              {
                id: 'ch-05',
                title: 'Solar Portable Non-Invasive Hemoglobin & Malnutrition Scanner for Anganwadis',
                similarity: 89,
                timeAgo: 'Existing challenge',
                distance: userDistLower.includes('dumka') ? 'Same district' : 'Other district',
                status: 'Deployed & Validated',
                matchReason: 'Both challenges focus on early non-invasive malnutrition screening and diagnostic support for rural women and children.',
              },
            ],
            source: 'deterministic',
          };
        } else {
          fallbackData = {
            domain: 'Water',
            secondaryDomains: ['Healthcare', 'Rural Livelihoods', 'Environment'],
            priorityScore: 87,
            priorityLevel: 'High',
            priorityFactors: {
              humanImpact: 90,
              economicLoss: 74,
              urgency: 88,
              geographicSpread: 82,
            },
            priorityRationale:
              'Priority is driven by potential disruption to safe drinking water access, health risk, and recurring infrastructure failure.',
            estimatedAffected: 1800,
            aiKeywords: ['Drinking Water', 'Groundwater', 'Rural Infrastructure', 'Water Quality'],
            similarChallenges: [
              {
                id: 'ch-01',
                title: 'Arsenic & Industrial Runoff Filtration in Subernarekha River Basin',
                similarity: 88,
                timeAgo: 'Existing challenge',
                distance: userDistLower.includes('ranchi') ? 'Same district' : 'Other district',
                status: 'In Prototyping',
                matchReason: 'Both reports address contaminated community water supply and mechanical filtration requirements in rural habitations.',
              },
            ],
            source: 'deterministic',
          };
        }

        // Calculate consistent priority score & level
        const fFactors = fallbackData.priorityFactors || {
          humanImpact: 80,
          economicLoss: 75,
          urgency: 80,
          geographicSpread: 70,
        };
        const fRawScore =
          fFactors.humanImpact * 0.3 +
          fFactors.economicLoss * 0.25 +
          fFactors.urgency * 0.25 +
          fFactors.geographicSpread * 0.2;
        fallbackData.priorityScore = Math.min(100, Math.max(0, Math.round(fRawScore)));
        fallbackData.priorityLevel =
          fallbackData.priorityScore >= 90
            ? 'Critical'
            : fallbackData.priorityScore >= 75
            ? 'High'
            : fallbackData.priorityScore >= 50
            ? 'Medium'
            : 'Low';

        const userImgCount = uploadedFiles.filter((f) => f.type === 'image').length;
        fallbackData.evidenceAssessment = {
          evidenceUsed: false,
          imageCount: 0,
          summary:
            userImgCount > 0
              ? `${userImgCount} attached image(s) recorded with report. Deterministic text-based heuristic triage applied.`
              : 'No visual evidence attached to this report.',
        };
        fallbackData.similarChallengesCount = Array.isArray(fallbackData.similarChallenges)
          ? fallbackData.similarChallenges.length
          : 0;

        pendingTriageDataRef.current = fallbackData;
        if (animationFinishedRef.current) {
          applyTriageData(fallbackData);
          setIsAnalyzing(false);
          setAnalysisComplete(true);
        }
      });
  };

  // Auto-save draft reminder
  useEffect(() => {
    const timer = setTimeout(() => {
      setDraftSaved(true);
    }, 800);
    return () => clearTimeout(timer);
  }, [description, title, district, block, villageOrCity]);

  // AI 6-phase animation controller
  const AI_SCAN_STAGES = [
    { step: 1, label: 'Understanding the problem...' },
    { step: 2, label: 'Identifying affected communities...' },
    { step: 3, label: 'Classifying the challenge...' },
    { step: 4, label: 'Checking for similar reports...' },
    { step: 5, label: 'Estimating priority...' },
    { step: 6, label: 'Finding relevant expertise...' }
  ];

  useEffect(() => {
    if (!isAnalyzing) return;

    const interval = setInterval(() => {
      setAiAnalysisPhase((prev) => {
        if (prev < 6) {
          return prev + 1;
        } else {
          animationFinishedRef.current = true;
          // If response data has already arrived, finalize now
          if (pendingTriageDataRef.current) {
            clearInterval(interval);
            setTimeout(() => {
              applyTriageData(pendingTriageDataRef.current);
              setIsAnalyzing(false);
              setAnalysisComplete(true);
            }, 300);
          }
          // If response has not arrived yet, remain at step 6 until fetch finishes
          return 6;
        }
      });
    }, 600);

    return () => clearInterval(interval);
  }, [isAnalyzing]);

  // Fast forward AI analysis
  const handleFastForwardAI = () => {
    setAiAnalysisPhase(6);
    animationFinishedRef.current = true;
    if (pendingTriageDataRef.current) {
      applyTriageData(pendingTriageDataRef.current);
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }
  };

  // Re-run AI analysis
  const handleRerunAI = () => {
    executeTriageRequest();
  };

  // Demo Loaders
  const loadWaterDemo = () => {
    setTitle('Seasonal Handpump Failure & Drinking Water Scarcity');
    setDescription('People in our village have to travel 5 km to access clean drinking water. During summer, the nearby handpump often stops working and the water turns brown with a foul smell. More than 40 families and school children have no safe drinking source.');
    setSelectedDomain('Water');
    setSecondaryDomains(['Healthcare', 'Rural Livelihoods', 'Environment']);
    setAffectedGroup('My village/community');
    setDuration('A few months');
    setPerceivedSeverity('Serious');
    setDistrict('Ranchi');
    setBlock('Namkum');
    setVillageOrCity('Chandaghasi');
    setPincode('834010');
    setCoordinates({ lat: 23.3441, lng: 85.3096 });
    setGpsCaptured(true);
    setGpsError(null);
    setPriorityScore(87);
    setPriorityLevel('High');
    setPriorityFactors({
      humanImpact: 90,
      economicLoss: 74,
      urgency: 88,
      geographicSpread: 82,
    });
    setPriorityRationale(
      'Priority is driven by potential disruption to safe drinking water access, health risk, and recurring infrastructure failure.'
    );
    setEstimatedAffected(1800);
    setAiKeywords(['Drinking Water', 'Groundwater', 'Rural Infrastructure', 'Water Quality']);
    setSimilarChallengesList([
      {
        id: 'sim-1',
        title: 'Drinking Water Access & Handpump Failure — Namkum',
        similarity: 82,
        timeAgo: '12 days ago',
        distance: '2.1 km away',
        status: 'Validated'
      },
      {
        id: 'sim-2',
        title: 'Handpump seasonal drying & turbidity — Ranchi Rural',
        similarity: 74,
        timeAgo: '28 days ago',
        distance: '5.4 km away',
        status: 'Under Review'
      },
      {
        id: 'sim-3',
        title: 'Subarnarekha feeder well contamination — Hatia Belt',
        similarity: 68,
        timeAgo: '42 days ago',
        distance: '8.7 km away',
        status: 'University Assigned'
      }
    ]);
    setRecommendedExpertise([
      { name: 'Water Engineering', relevance: 95 },
      { name: 'IoT & Sensor Systems', relevance: 89 },
      { name: 'Environmental Science', relevance: 86 },
      { name: 'Public Health', relevance: 78 }
    ]);
    setRecommendedUniversities([
      {
        universityName: 'BIT Mesra, Ranchi',
        matchScore: 92,
        rationale: 'Advanced membrane separation laboratory and remote hydrology IoT sensing research wing.',
        facultyLead: 'Dr. Anandita Sen',
        labSpecialization: 'Centre for Water & Environmental Technologies'
      },
      {
        universityName: 'Ranchi University',
        matchScore: 87,
        rationale: 'Department of Geology and Rural Resource Mapping with extensive field extension teams in Namkum.',
        facultyLead: 'Prof. Ramesh Oraon',
        labSpecialization: 'Groundwater Hydrology Lab'
      },
      {
        universityName: 'NIT Jamshedpur',
        matchScore: 84,
        rationale: 'Civil & Environmental Engineering team specializing in community-scale sand and ceramic filtration.',
        facultyLead: 'Dr. P. K. Verma',
        labSpecialization: 'Public Health Infrastructure Hub'
      }
    ]);
    setUploadedFiles([
      {
        name: 'water-pump.jpg',
        type: 'image',
        size: '2.4 MB',
        previewUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'water-report.pdf',
        type: 'doc',
        size: '1.2 MB'
      }
    ]);
    setEvidenceAssessment({
      evidenceUsed: true,
      imageCount: 1,
      summary: 'Attached photograph verifies rusted, inoperative handpump and turbid standing runoff near village settlement.',
    });
    setSimilarChallengesCount(3);
    setTriageSource('deterministic');
    setProblemSummary('Seasonal drying of community borewells and frequent handpump mechanical failure causing severe potable water shortages.');
    setPotentialSolutionDirection('Solar-powered micro-filtration unit and IoT telemetry to monitor groundwater drawdown.');
    setStep1Error(null);
  };

  const loadElephantDemo = () => {
    setTitle('Nocturnal Wild Elephant Herd Intrusion in Saranda Fringe Villages');
    setDescription('Wild elephants frequently enter agricultural fields and village boundaries at night, destroying standing paddy crops and damaging homes. In 8 corridor hamlets, more than 1,200 farmers live in constant fear of fatal encounters during harvest season. We urgently need an automated early detection siren.');
    setSelectedDomain('Agriculture');
    setSecondaryDomains(['Wildlife Management', 'Environment', 'Rural Livelihoods']);
    setAffectedGroup('Farmers');
    setDuration('More than a year');
    setPerceivedSeverity('Critical');
    setDistrict('Pashchimi Singhbhum');
    setBlock('Goilkera / Manoharpur');
    setVillageOrCity('Buruhatu & Fringe Hamlets');
    setPincode('833103');
    setCoordinates({ lat: 22.48, lng: 85.28 });
    setGpsCaptured(true);
    setGpsError(null);
    setPriorityScore(94);
    setPriorityLevel('Critical');
    setPriorityFactors({
      humanImpact: 92,
      economicLoss: 88,
      urgency: 95,
      geographicSpread: 78,
    });
    setPriorityRationale(
      'Priority reflects immediate community safety concerns, recurring wildlife conflict, and potential crop and livelihood losses.'
    );
    setEstimatedAffected(1200);
    setAiKeywords(['Wildlife Conflict', 'Crop Protection', 'Nocturnal Intrusion', 'Early Warning Sensor']);
    setSimilarChallengesList([
      {
        id: 'sim-el-1',
        title: 'Elephant herd fence breach — Saranda fringe farms',
        similarity: 91,
        timeAgo: '9 days ago',
        distance: '3.4 km away',
        status: 'Pilot Testing'
      },
      {
        id: 'sim-el-2',
        title: 'Night harvest crop raid in Goilkera border',
        similarity: 86,
        timeAgo: '16 days ago',
        distance: '6.2 km away',
        status: 'Under Review'
      },
      {
        id: 'sim-el-3',
        title: 'Corridor boundary confrontation near forest post',
        similarity: 79,
        timeAgo: '31 days ago',
        distance: '11.8 km away',
        status: 'Government Validated'
      }
    ]);
    setRecommendedExpertise([
      { name: 'Computer Vision & Edge AI', relevance: 96 },
      { name: 'LoRaWAN Wireless Sensors', relevance: 92 },
      { name: 'Wildlife Behavioral Science', relevance: 88 },
      { name: 'Agricultural Engineering', relevance: 84 }
    ]);
    setRecommendedUniversities([
      {
        universityName: 'BIT Mesra, Ranchi',
        matchScore: 94,
        rationale: 'Active IoT & Embedded AI research laboratory with field telemetry test equipment.',
        facultyLead: 'Prof. K. S. Patnaik',
        labSpecialization: 'Edge AI & Embedded Sensors Research Wing'
      },
      {
        universityName: 'IIT (ISM) Dhanbad',
        matchScore: 89,
        rationale: 'Geoinformatics centre with spatial GIS mapping of forest and mineral transition corridors.',
        facultyLead: 'Dr. R. K. Bhattacharya',
        labSpecialization: 'Centre for Spatial Analytics & Telemetry'
      }
    ]);
    setUploadedFiles([
      {
        name: 'elephant-track.jpg',
        type: 'image',
        size: '3.1 MB',
        previewUrl: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'forest-damage-report.pdf',
        type: 'doc',
        size: '1.4 MB'
      }
    ]);
    setEvidenceAssessment({
      evidenceUsed: true,
      imageCount: 1,
      summary: 'Field photograph documents trampled crop perimeter and damaged vegetative fencing along forest boundary.',
    });
    setSimilarChallengesCount(3);
    setTriageSource('deterministic');
    setProblemSummary('Wild elephants entering agricultural fields and villages at night in Saranda fringe, causing crop loss and human danger.');
    setPotentialSolutionDirection('Deploying edge-AI seismic sensors and automated acoustic deterrence to alert forest patrols.');
    setStep1Error(null);
  };

  // Helper file handlers
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const detectFileType = (file?: File | null): 'image' | 'doc' | 'audio' | 'video' => {
    if (!file) return 'doc';
    if (file.type?.startsWith('image/')) return 'image';
    if (file.type?.startsWith('audio/')) return 'audio';
    if (file.type?.startsWith('video/')) return 'video';
    const ext = file.name ? file.name.split('.').pop()?.toLowerCase() : '';
    if (['jpg', 'jpeg', 'png', 'webp', 'svg', 'bmp', 'gif'].includes(ext || '')) return 'image';
    if (['mp3', 'wav', 'ogg', 'm4a', 'aac', 'flac'].includes(ext || '')) return 'audio';
    if (['mp4', 'mov', 'avi', 'mkv', 'webm'].includes(ext || '')) return 'video';
    return 'doc';
  };

  const handleFilesAdded = (files: FileList | File[]) => {
    const newItems: { name: string; type: 'image' | 'video' | 'doc' | 'audio'; size: string; file?: File; previewUrl?: string }[] = [];
    Array.from(files || []).forEach((file) => {
      if (!file) return;
      const fileName = file.name || 'attachment';
      const fileSize = typeof file.size === 'number' ? file.size : 0;
      if (fileSize > 25 * 1024 * 1024) {
        setFileUploadError(`File "${fileName}" exceeds the 25MB limit.`);
        setTimeout(() => setFileUploadError(null), 5000);
        return;
      }
      const type = detectFileType(file);
      let previewUrl: string | undefined;
      if (type === 'image') {
        try {
          previewUrl = URL.createObjectURL(file);
        } catch {
          // ignore
        }
      }
      newItems.push({
        name: fileName,
        type,
        size: formatFileSize(fileSize),
        file,
        previewUrl
      });
    });

    if (newItems.length > 0) {
      setUploadedFiles(prev => [...prev, ...newItems]);
    }
  };

  // Voice recording simulation & Web Speech API integration
  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setRecordingSeconds(0);
      const timer = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 5) {
            clearInterval(timer);
            setIsRecording(false);
            if (!description.trim()) {
              setDescription("People in our village have to travel 5 km to access clean drinking water. During summer, the nearby handpump often stops working and the water is muddy.");
              if (!title.trim()) {
                setTitle("Drinking water scarcity and handpump breakdown in Namkum");
              }
            }
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      setIsRecording(false);
    }
  };

  // AI Writing Assistant
  const handleAIAssist = async () => {
    if (!description.trim()) {
      setStep1Error('Please type or record a few words in the problem box first so SAMADHAN AI can help organize it.');
      return;
    }
    setStep1Error(null);
    setIsEnhancingWithAI(true);
    try {
      const response = await fetch('/api/gemini/assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ draft: description })
      });
      const data = await response.json();
      if (data.enhancedText) {
        setDescription(data.enhancedText);
        setAiEnhancedFeedback('Structured with clear civic impact and localized details.');
      }
    } catch {
      setDescription(prev => 
        `Problem Summary: ${prev.trim()}\n\nWho is affected: Village households, school children, and local families.\nSeverity: Persisting across dry seasons, requiring urgent water testing and filtration support.`
      );
      setAiEnhancedFeedback('Refined with citizen impact details.');
    } finally {
      setIsEnhancingWithAI(false);
    }
  };

  // Geolocation handler
  const handleCaptureGPS = () => {
    setIsFetchingGPS(true);
    setGpsError(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoordinates({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setIsFetchingGPS(false);
          setGpsCaptured(true);
        },
        () => {
          // Provide clear friendly fallback without breaking flow
          setGpsError("Unable to access your device GPS. You can select your district manually below.");
          setCoordinates({ lat: 23.3441, lng: 85.3096 });
          setIsFetchingGPS(false);
          setGpsCaptured(true);
        },
        { timeout: 8000 }
      );
    } else {
      setGpsError("Geolocation is not supported by your browser. You can select your district manually below.");
      setCoordinates({ lat: 23.3441, lng: 85.3096 });
      setIsFetchingGPS(false);
      setGpsCaptured(true);
    }
  };

  // Step 1 Validation & Proceed
  const handleProceedFromStep1 = () => {
    if (!description.trim()) {
      setStep1Error('Please describe the problem in your own words before proceeding.');
      return;
    }
    if (description.trim().length < 15) {
      setStep1Error('Please describe the problem in a little more detail so teams can understand what is happening.');
      return;
    }
    setStep1Error(null);
    // Auto-generate title if user didn't specify one
    if (!title.trim()) {
      const words = description.trim().split(' ').slice(0, 7).join(' ');
      setTitle(words.length > 5 ? words : 'Community Civic Challenge');
    }
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 3 to Step 4 transition: Launch AI Analysis
  const handleTriggerAIAnalysis = () => {
    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    executeTriageRequest();
  };

  // Step 5 Submit
  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    const trackingCode = `SSAI-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    
    const newChallenge: Challenge = {
      id: `ch-${Date.now()}`,
      trackingCode,
      title: title || 'Community Challenge',
      description,
      citizenName: citizenName || 'Anonymous Citizen',
      citizenRole: 'Community Resident',
      submittedAt: new Date().toISOString(),
      domain: selectedDomain,
      secondaryDomains,
      location: {
        district,
        block,
        villageOrCity,
        coordinates: coordinates || { lat: 23.3441, lng: 85.3096 }
      },
      priorityScore,
      priorityLevel,
      affectedPeople: estimatedAffected,
      similarReportsCount: similarChallengesList.length + 4,
      similarChallenges: similarChallengesList.map(s => ({ id: s.id, title: s.title, similarity: s.similarity, matchReason: s.matchReason })),
      status: 'Under Review',
      requiredExpertise: recommendedExpertise.map(e => e.name),
      sdgGoals: selectedDomain === 'Water' ? [6, 3, 11] : [15, 2, 11],
      evidence: {
        images: uploadedFiles.filter(f => f.type === 'image').map(f => f.previewUrl || 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=600&q=80'),
        hasAudio: uploadedFiles.some(f => f.type === 'audio') || isRecording,
        documents: uploadedFiles.filter(f => f.type === 'doc').map(f => f.name)
      },
      recommendedUniversities: recommendedUniversities.map((u, idx) => ({
        universityId: `uni-${idx}`,
        universityName: u.universityName,
        matchScore: u.matchScore,
        rationale: u.rationale,
        facultyLead: u.facultyLead,
        labSpecialization: u.labSpecialization
      })),
      endorsements: 1,
      isEndorsedByCurrentUser: true,
      validatedByGov: false,
      triageAudit: {
        source: triageSource,
        evidenceAssessment: evidenceAssessment || undefined,
        similarChallengesCount,
      },
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedChallengeData(newChallenge);
      setCurrentStep(6);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  // Stepper definition
  const STEPS = [
    { num: 1, title: 'Describe', desc: 'Tell us what happened' },
    { num: 2, title: 'Evidence', desc: 'Photos, videos & docs' },
    { num: 3, title: 'Location', desc: 'Where is it happening' },
    { num: 4, title: 'AI Analysis', desc: 'Smart triage & routing' },
    { num: 5, title: 'Review & Submit', desc: 'Confirm your report' }
  ];

  return (
    <div className="min-h-screen bg-[#FBFBF9] py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* ==================================================
            PAGE HEADER
        ================================================== */}
        {currentStep !== 6 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-[11px] font-semibold tracking-wide">
                <Sparkles className="w-3 h-3 text-orange-600" />
                <span>SAMADHANSETU AI · CITIZEN REPORTING</span>
              </div>
              <button
                type="button"
                onClick={onCancel}
                className="text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
              >
                Cancel & Return
              </button>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-heading">
                Report a Challenge.
              </h1>
              <p className="text-sm sm:text-base text-stone-600 mt-1 leading-relaxed max-w-2xl">
                Tell us about a problem in your community. SAMADHAN AI will help organize, understand and route it to the right people.
              </p>
            </div>

            {/* Small Reassurances */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-stone-500">
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-stone-200/80 shadow-2xs">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                <span>Takes about 2–3 minutes</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-stone-200/80 shadow-2xs">
                <Paperclip className="w-3.5 h-3.5 text-stone-400" />
                <span>You can attach photos, videos or documents</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-stone-200/80 shadow-2xs">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                <span>Your location helps us understand the problem</span>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================
            PROGRESS INDICATOR (5 Steps)
        ================================================== */}
        {currentStep !== 6 && (
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/90 shadow-xs">
            {/* Desktop Stepper */}
            <div className="hidden sm:grid sm:grid-cols-5 gap-2">
              {STEPS.map((s) => {
                const isCurrent = currentStep === s.num;
                const isDone = currentStep > s.num;
                return (
                  <button
                    key={s.num}
                    type="button"
                    onClick={() => {
                      // Allow navigating backwards or to completed steps
                      if (currentStep > s.num) {
                        setCurrentStep(s.num as any);
                      }
                    }}
                    disabled={currentStep < s.num}
                    className={`text-left p-2.5 rounded-xl border transition-all ${
                      isCurrent
                        ? 'bg-orange-50/70 border-orange-300 text-orange-900 ring-1 ring-orange-200'
                        : isDone
                        ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900 cursor-pointer hover:bg-emerald-50'
                        : 'bg-stone-50/50 border-stone-200/60 text-stone-400 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      {isDone ? (
                        <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      ) : (
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isCurrent ? 'bg-orange-600 text-white' : 'bg-stone-200 text-stone-600'
                        }`}>
                          0{s.num}
                        </div>
                      )}
                      <span className="text-xs font-bold font-heading">{s.title}</span>
                    </div>
                    <p className="text-[10px] truncate text-stone-500">{s.desc}</p>
                  </button>
                );
              })}
            </div>

            {/* Mobile Compact Progress Bar */}
            <div className="sm:hidden space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-900">
                  Step 0{currentStep} — {STEPS[currentStep - 1]?.title}
                </span>
                <span className="text-stone-500 font-medium">
                  {currentStep} of 5
                </span>
              </div>
              <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-orange-600 transition-all duration-300 rounded-full"
                  style={{ width: `${(currentStep / 5) * 100}%` }}
                />
              </div>
            </div>

            {/* Auto-save status */}
            <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>{draftSaved ? 'Draft saved locally' : 'Saving...'}</span>
              </span>
              <span className="text-stone-500">Step {currentStep} of 5</span>
            </div>
          </div>
        )}

        {/* ==================================================
            STEP 1 — DESCRIBE THE CHALLENGE
        ================================================== */}
        {currentStep === 1 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6 animate-in fade-in duration-200">
            
            {/* Quick Demo Pre-fill Banner */}
            <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-orange-600 text-white flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">Try a sample challenge</div>
                  <div className="text-[11px] text-stone-500">One-click realistic Jharkhand community examples</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={loadWaterDemo}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                >
                  <span>💧 Drinking Water Scarcity (Namkum)</span>
                </button>
                <button
                  type="button"
                  onClick={loadElephantDemo}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                >
                  <span>🐘 Elephant Herd Corridor (Saranda)</span>
                </button>
              </div>
            </div>

            {/* Main Question Heading */}
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-heading">
                What problem are you facing?
              </h2>
              <p className="text-xs sm:text-sm text-stone-500">
                You don't need technical language. Just tell us what is happening, where it is happening and who is affected.
              </p>
            </div>

            {/* Large Text Area with AI Assistant & Voice Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Describe the problem in your own words *
                </label>
                <div className="flex items-center gap-2">
                  {/* Voice Input */}
                  <button
                    type="button"
                    onClick={toggleRecording}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all border ${
                      isRecording
                        ? 'bg-red-500 text-white border-red-600 animate-pulse'
                        : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                    }`}
                    title="Speak into your microphone"
                  >
                    {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-stone-600" />}
                    <span>{isRecording ? `Listening (${recordingSeconds}s)...` : 'Voice Input'}</span>
                  </button>

                  {/* AI Writing Assistant */}
                  <button
                    type="button"
                    onClick={handleAIAssist}
                    disabled={isEnhancingWithAI}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-orange-50 hover:bg-orange-100 text-orange-800 border border-orange-200 flex items-center gap-1.5 cursor-pointer disabled:opacity-50 transition-colors shadow-2xs"
                  >
                    {isEnhancingWithAI ? <Loader2 className="w-3.5 h-3.5 animate-spin text-orange-700" /> : <Sparkles className="w-3.5 h-3.5 text-orange-600" />}
                    <span>AI Writing Assistant</span>
                  </button>
                </div>
              </div>

              <textarea
                rows={5}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setDraftSaved(false);
                }}
                placeholder="Describe the problem in your own words..."
                className="w-full px-4 py-3 rounded-2xl border border-stone-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-sm sm:text-base outline-hidden leading-relaxed text-stone-800 placeholder:text-stone-400"
              />

              {/* AI Assistant Feedback Banner */}
              {aiEnhancedFeedback && (
                <div className="p-3 rounded-xl bg-orange-50/70 border border-orange-200 text-xs text-orange-900 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                    <span>{aiEnhancedFeedback}</span>
                  </span>
                  <button onClick={() => setAiEnhancedFeedback(null)} className="text-orange-700 hover:text-orange-900">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Example Helper Card */}
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 text-xs text-stone-600 space-y-1">
                <span className="font-bold text-stone-800 uppercase tracking-wide text-[10px]">Example:</span>
                <p className="italic text-stone-700">
                  "People in our village have to travel 5 km to access clean drinking water. During summer, the nearby handpump often stops working."
                </p>
              </div>
            </div>

            {/* Optional Title / Summary Headline */}
            <div className="space-y-1.5 pt-1">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Short Headline (Optional)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setDraftSaved(false);
                }}
                placeholder="e.g. Drinking water scarcity and handpump breakdown in Namkum"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-sm outline-hidden text-stone-800"
              />
              <p className="text-[11px] text-stone-400">
                Leave empty and SAMADHAN AI will generate a concise title automatically.
              </p>
            </div>

            {/* ==================================================
                OPTIONAL QUICK DETAILS
            ================================================== */}
            <div className="pt-4 border-t border-stone-100 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-stone-900 font-heading">
                    Quick details (Optional)
                  </h3>
                  <p className="text-xs text-stone-500">
                    These help AI categorize faster, but are completely optional.
                  </p>
                </div>
                <span className="text-[11px] text-stone-400 font-medium">Auto-analyzed if skipped</span>
              </div>

              {/* 1. Who is affected? */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-stone-700">
                  Who is affected?
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'My family',
                    'My village/community',
                    'Farmers',
                    'Students',
                    'Patients',
                    'Elderly people',
                    'Persons with disabilities',
                    'Businesses',
                    'Other'
                  ].map((grp) => (
                    <button
                      key={grp}
                      type="button"
                      onClick={() => setAffectedGroup(grp)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                        affectedGroup === grp
                          ? 'bg-stone-900 text-white border-stone-900 shadow-2xs'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {grp}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Duration & Perceived Severity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-stone-700">
                    How long has this problem existed?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Recently', 'A few months', 'More than a year', 'Not sure'].map((dur) => (
                      <button
                        key={dur}
                        type="button"
                        onClick={() => setDuration(dur)}
                        className={`px-2.5 py-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                          duration === dur
                            ? 'bg-stone-900 text-white border-stone-900 shadow-2xs'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {dur}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-stone-700">
                      How serious does it feel?
                    </label>
                    <span className="text-[10px] text-stone-400">AI also evaluates priority</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { level: 'Low', color: 'border-slate-300 hover:bg-slate-50' },
                      { level: 'Moderate', color: 'border-amber-300 hover:bg-amber-50' },
                      { level: 'Serious', color: 'border-orange-300 hover:bg-orange-50' },
                      { level: 'Critical', color: 'border-red-300 hover:bg-red-50' }
                    ].map((sev) => (
                      <button
                        key={sev.level}
                        type="button"
                        onClick={() => setPerceivedSeverity(sev.level)}
                        className={`py-2 px-1 rounded-xl text-xs font-bold border text-center transition-all cursor-pointer ${
                          perceivedSeverity === sev.level
                            ? 'bg-stone-900 text-white border-stone-900 shadow-2xs'
                            : `bg-stone-50 text-stone-700 ${sev.color}`
                        }`}
                      >
                        {sev.level}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-stone-400">
                    SAMADHAN AI will also analyze priority automatically using GIS and population metrics.
                  </p>
                </div>
              </div>

              {/* Citizen Contact Details for Updates */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-800">
                  <UserCheck className="w-4 h-4 text-stone-600" />
                  <span>Contact for Status Updates (SMS & Validation)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-stone-600 block mb-1">Your Name</label>
                    <input
                      type="text"
                      value={citizenName}
                      onChange={(e) => setCitizenName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs bg-white"
                      placeholder="Anil Kumar Mahato"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-stone-600 block mb-1">Mobile Number (for SMS Tracking)</label>
                    <input
                      type="text"
                      value={citizenContact}
                      onChange={(e) => setCitizenContact(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs bg-white"
                      placeholder="9835102941"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Error Message */}
            {step1Error && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{step1Error}</span>
              </div>
            )}

            {/* Step 1 Actions */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 font-semibold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                id="btn-step1-next"
                onClick={handleProceedFromStep1}
                className="px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm flex items-center gap-2 cursor-pointer shadow-sm transition-all"
              >
                <span>Next: Add Evidence</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ==================================================
            STEP 2 — EVIDENCE
        ================================================== */}
        {currentStep === 2 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6 animate-in fade-in duration-200">
            
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-heading">
                Can you show us the problem?
              </h2>
              <p className="text-xs sm:text-sm text-stone-500">
                Photos, videos or documents help us understand the challenge better.
              </p>
            </div>

            {/* Hidden File Inputs for PC File Selection & Mobile Camera */}
            <input 
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleFilesAdded(e.target.files);
                  e.target.value = '';
                }
              }}
              multiple
              accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt,.csv"
              className="hidden"
              id="file-upload-input"
            />
            <input 
              type="file"
              ref={photoInputRef}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleFilesAdded(e.target.files);
                  e.target.value = '';
                }
              }}
              multiple
              accept="image/*"
              className="hidden"
            />
            <input 
              type="file"
              ref={cameraInputRef}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleFilesAdded(e.target.files);
                  e.target.value = '';
                }
              }}
              capture="environment"
              accept="image/*"
              className="hidden"
            />
            <input 
              type="file"
              ref={docInputRef}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleFilesAdded(e.target.files);
                  e.target.value = '';
                }
              }}
              multiple
              accept=".pdf,.doc,.docx,.txt,.csv"
              className="hidden"
            />
            <input 
              type="file"
              ref={voiceInputRef}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleFilesAdded(e.target.files);
                  e.target.value = '';
                }
              }}
              multiple
              accept="audio/*"
              className="hidden"
            />

            {/* Drag & Drop Upload Zone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                if (e.dataTransfer && e.dataTransfer.files) {
                  handleFilesAdded(e.dataTransfer.files);
                }
              }}
              className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all cursor-pointer ${
                isDragging
                  ? 'border-orange-500 bg-orange-50/50'
                  : 'border-stone-300 hover:border-orange-400 bg-stone-50/50 hover:bg-orange-50/20'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center mx-auto mb-3">
                <UploadCloud className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-stone-800">
                Drag and drop files here, or <span className="text-orange-600 underline">browse files</span>
              </p>
              <p className="text-xs text-stone-400 mt-1">
                Supports Photos, Videos, Documents, Audio up to 25 MB
              </p>

              {fileUploadError && (
                <div className="mt-3 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center justify-center gap-1.5 animate-in fade-in">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <span>{fileUploadError}</span>
                </div>
              )}

              {/* Action Buttons for Mobile & Desktop */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Camera className="w-3.5 h-3.5 text-blue-600" />
                  <span>Take Photo / Camera</span>
                </button>
                <button
                  type="button"
                  onClick={() => photoInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Browse Photos</span>
                </button>
                <button
                  type="button"
                  onClick={() => docInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <FileText className="w-3.5 h-3.5 text-red-500" />
                  <span>Add Document</span>
                </button>
                <button
                  type="button"
                  onClick={() => voiceInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Volume2 className="w-3.5 h-3.5 text-purple-600" />
                  <span>Voice Recording</span>
                </button>
              </div>
            </div>

            {/* Reassurance Banner */}
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 text-xs text-stone-600 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Evidence is optional but recommended. It helps university researchers design better solutions.</span>
            </div>

            {/* Attached Files Showcase */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-stone-700 uppercase tracking-wider">
                <span>Attached Files ({uploadedFiles.length})</span>
                {uploadedFiles.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setUploadedFiles([])}
                    className="text-stone-400 hover:text-red-600 font-semibold cursor-pointer lowercase text-[11px]"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {uploadedFiles.length === 0 ? (
                <div className="p-5 rounded-2xl bg-stone-50/70 border border-dashed border-stone-200 text-center text-xs text-stone-400 font-medium">
                  No files attached yet. You can continue without files or add photos/documents above.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {uploadedFiles.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 border border-stone-200 hover:border-stone-300 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {file.type === 'image' && (
                          file.previewUrl ? (
                            <img
                              src={file.previewUrl}
                              alt={file.name}
                              className="w-10 h-10 rounded-xl object-cover border border-stone-200 shrink-0"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                              <ImageIcon className="w-5 h-5" />
                            </div>
                          )
                        )}
                        {file.type === 'doc' && (
                          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                            <FileText className="w-5 h-5" />
                          </div>
                        )}
                        {file.type === 'audio' && (
                          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                            <Volume2 className="w-5 h-5" />
                          </div>
                        )}
                        {file.type === 'video' && (
                          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                            <Video className="w-5 h-5" />
                          </div>
                        )}

                        <div className="min-w-0">
                          <p className="text-xs font-bold text-stone-800 truncate">{file.name}</p>
                          <p className="text-[11px] text-stone-400">{file.size}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0 ml-2">
                        {file.previewUrl && (
                          <button
                            type="button"
                            onClick={() => setPreviewModalFile({ name: file.name, url: file.previewUrl, type: file.type })}
                            className="text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
                            title="Preview file"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== idx))}
                          className="text-stone-400 hover:text-red-500 p-1 cursor-pointer"
                          title="Remove file"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-5 py-2.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back: Description</span>
              </button>
              <button
                type="button"
                id="btn-step2-next"
                onClick={() => setCurrentStep(3)}
                className="px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm flex items-center gap-2 cursor-pointer shadow-sm transition-all"
              >
                <span>Next: Location</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ==================================================
            STEP 3 — LOCATION
        ================================================== */}
        {currentStep === 3 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6 animate-in fade-in duration-200">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-heading">
                  Where is this happening?
                </h2>
                <p className="text-xs sm:text-sm text-stone-500">
                  Knowing the location helps us understand local climate, groundwater, and district jurisdiction.
                </p>
              </div>

              {/* Primary Action: Use My Location */}
              <button
                type="button"
                onClick={handleCaptureGPS}
                disabled={isFetchingGPS}
                className="px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors shadow-2xs self-start sm:self-center"
              >
                <Compass className={`w-4 h-4 text-emerald-600 ${isFetchingGPS ? 'animate-spin' : ''}`} />
                <span>{isFetchingGPS ? 'Capturing GPS...' : 'Use My Location'}</span>
              </button>
            </div>

            {/* GPS Error Feedback if any */}
            {gpsError && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{gpsError}</span>
              </div>
            )}

            {/* Location Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1.5">
                  District (Jharkhand) *
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm font-medium bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-hidden"
                >
                  {JHARKHAND_DISTRICTS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1.5">
                  Block / Sub-Division *
                </label>
                <input
                  type="text"
                  value={block}
                  onChange={(e) => setBlock(e.target.value)}
                  placeholder="e.g. Namkum"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm font-medium focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1.5">
                  Village / Ward / City *
                </label>
                <input
                  type="text"
                  value={villageOrCity}
                  onChange={(e) => setVillageOrCity(e.target.value)}
                  placeholder="e.g. Chandaghasi"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm font-medium focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-hidden"
                />
              </div>
            </div>

            {/* Optional Pincode */}
            <div className="max-w-xs">
              <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                Pincode (Optional)
              </label>
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="e.g. 834010"
                className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-sm bg-white"
              />
            </div>

            {/* Small Map Visualization & Status Badge */}
            <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-900">
                      {district}, {block}, {villageOrCity}
                    </div>
                    <div className="text-[11px] text-stone-500">
                      {coordinates ? `Lat: ${coordinates.lat.toFixed(4)}° N • Lng: ${coordinates.lng.toFixed(4)}° E` : 'Coordinates ready'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>✓ Location captured</span>
                  </span>
                </div>
              </div>

              {/* Stylized Visual Map Card */}
              <div className="h-32 w-full rounded-xl bg-stone-100 border border-stone-200/80 relative overflow-hidden flex items-center justify-center">
                {/* SVG decorative topographic grid */}
                <svg className="absolute inset-0 w-full h-full opacity-30 text-stone-400" xmlns="http://www.w3.org/2000/svg">
                  <pattern id="grid-pattern" width="24" height="24" patternUnits="userSpaceOnUse">
                    <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                </svg>

                <div className="relative z-10 flex flex-col items-center gap-1.5 text-center p-3">
                  <div className="w-7 h-7 rounded-full bg-orange-600 text-white flex items-center justify-center shadow-md animate-bounce">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-bold text-stone-800 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full border border-stone-200 shadow-2xs">
                    {villageOrCity}, {district} (Jharkhand)
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-stone-400 italic">
                We only use this to route the challenge to the nearest Panchayat office, block development officer, and regional engineering universities.
              </p>
            </div>

            {/* Navigation */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-5 py-2.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back: Evidence</span>
              </button>
              <button
                type="button"
                id="btn-step3-analyze"
                onClick={handleTriggerAIAnalysis}
                className="px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm flex items-center gap-2 cursor-pointer shadow-sm transition-all"
              >
                <Cpu className="w-4 h-4 text-orange-400" />
                <span>Run AI Analysis</span>
              </button>
            </div>
          </div>
        )}

        {/* ==================================================
            STEP 4 — AI ANALYSIS (THE WOW MOMENT)
        ================================================== */}
        {currentStep === 4 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6 animate-in fade-in duration-200">
            
            {isAnalyzing ? (
              /* Animated AI Processing Screen */
              <div className="py-8 space-y-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-orange-600 text-white flex items-center justify-center mx-auto shadow-md shadow-orange-600/20 animate-pulse">
                  <Cpu className="w-7 h-7 animate-spin" />
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-orange-700 uppercase tracking-widest bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                    SAMADHAN AI ANALYSIS IN PROGRESS
                  </span>
                  <h3 className="text-2xl font-extrabold text-stone-900 font-heading mt-2">
                    SAMADHAN AI IS ANALYZING YOUR CHALLENGE
                  </h3>
                  <p className="text-xs text-stone-500 max-w-md mx-auto">
                    Synthesizing semantic intent, clustering duplicate field reports, and benchmarking partner universities.
                  </p>
                </div>

                {/* 6 Step Animated Progress Stack */}
                <div className="max-w-md mx-auto space-y-2 text-left pt-2">
                  {AI_SCAN_STAGES.map((st) => {
                    const isPassed = aiAnalysisPhase > st.step;
                    const isCurr = aiAnalysisPhase === st.step;
                    return (
                      <div
                        key={st.step}
                        className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-all ${
                          isCurr
                            ? 'bg-orange-50 border-orange-300 text-orange-900 font-bold shadow-2xs'
                            : isPassed
                            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900 font-medium'
                            : 'bg-stone-50/50 border-stone-200/50 text-stone-400'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          {isPassed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          ) : isCurr ? (
                            <Loader2 className="w-4 h-4 text-orange-600 animate-spin shrink-0" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-stone-300 shrink-0" />
                          )}
                          <span>{st.label}</span>
                        </div>
                        <span className="text-[10px] font-mono text-stone-400">
                          {isPassed ? 'Done' : isCurr ? 'Active' : 'Pending'}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Fast Forward Option */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleFastForwardAI}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 transition-colors cursor-pointer"
                  >
                    Skip Animation & View Result ⏩
                  </button>
                </div>
              </div>
            ) : (
              /* AI Analysis Revealed Result Panel */
              <div className="space-y-6 animate-in fade-in duration-300">
                
                {/* Header with Re-run */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>SAMADHAN AI Analysis Complete</span>
                      </span>
                      <span className="text-[11px] text-stone-400">
                        {triageSource === 'gemini' ? 'Gemini 3.8-Flash verified' : 'AI-generated recommendation'}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-heading mt-1">
                      Challenge Assessment & Matching Result
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={handleRerunAI}
                    className="px-3.5 py-2 rounded-xl border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-50 flex items-center gap-1.5 cursor-pointer self-start sm:self-center shadow-2xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
                    <span>Re-run Analysis</span>
                  </button>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {/* Primary & Secondary Domains */}
                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                        PRIMARY DOMAIN
                      </span>
                      <div className="text-base font-extrabold text-stone-900 mt-1 flex items-center gap-1.5">
                        <Layers className="w-4 h-4 text-orange-600" />
                        <span>{selectedDomain}</span>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-stone-200/60 text-[10px] text-stone-500 truncate">
                      Secondary: {secondaryDomains.slice(0, 2).join(', ')}
                    </div>
                  </div>

                  {/* AI Priority Score */}
                  <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-orange-800 uppercase tracking-wider">
                          AI PRIORITY SCORE
                        </span>
                        <span className="text-[9px] bg-orange-200/70 text-orange-900 font-bold px-1.5 py-0.5 rounded">
                          AI estimate
                        </span>
                      </div>
                      <div className="text-2xl font-black text-orange-900 mt-1">
                        {priorityScore} <span className="text-xs font-normal text-stone-500">/ 100</span>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-orange-200/60 flex items-center justify-between text-xs">
                      <span className="text-[10px] font-medium text-stone-600">Priority:</span>
                      <span className="font-extrabold text-orange-700">{priorityLevel.toUpperCase()}</span>
                    </div>
                  </div>

                  {/* Estimated People Affected */}
                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                        PEOPLE AFFECTED
                      </span>
                      <div className="text-xl font-extrabold text-stone-900 mt-1 flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-stone-600" />
                        <span>~{estimatedAffected.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-stone-200/60 text-[10px] text-stone-500">
                      AI-generated estimate
                    </div>
                  </div>

                  {/* Similar Challenges */}
                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                        SIMILAR REPORTS
                      </span>
                      <div className="text-xl font-extrabold text-stone-900 mt-1 flex items-center gap-1.5">
                        <Radar className="w-4 h-4 text-stone-600" />
                        <span>{similarChallengesList.length + 4} Found</span>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-stone-200/60 text-[10px] text-emerald-700 font-semibold">
                      Cluster lead candidate
                    </div>
                  </div>
                </div>

                {/* AI Keywords */}
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1.5">
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                    AI KEYWORDS & CONCEPTS
                  </span>
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {aiKeywords.map((kw, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-xs font-semibold text-stone-700">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ==================================================
                    DUPLICATE DETECTION
                ================================================== */}
                <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-orange-600"></span>
                      <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                        SIMILAR CHALLENGES FOUND ({similarChallengesList.length + 4})
                      </h4>
                    </div>
                    <span className="text-[11px] text-stone-500 font-medium">
                      Cluster correlation
                    </span>
                  </div>

                  <p className="text-xs text-stone-600">
                    We found reports in your regional block that describe a similar problem.
                  </p>

                  <div className="space-y-2">
                    {similarChallengesList.slice(0, 2).map((sim) => (
                      <div
                        key={sim.id}
                        className="p-3 rounded-xl bg-white border border-stone-200 flex flex-col gap-2 shadow-2xs"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <div className="text-xs font-bold text-stone-900">{sim.title}</div>
                            <div className="text-[11px] text-stone-400 mt-0.5">
                              Reported {sim.timeAgo} • {sim.distance}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                              {sim.similarity}% similarity
                            </span>
                          </div>
                        </div>
                        {sim.matchReason && (
                          <div className="text-[11.5px] text-stone-600 pt-1.5 border-t border-stone-100 flex items-start gap-1.5 leading-relaxed">
                            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider shrink-0 mt-0.5">
                              Match reason:
                            </span>
                            <span className="text-stone-700">{sim.matchReason}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Duplicate Guidance Message */}
                  <div className="p-3 rounded-xl bg-white border border-stone-200/80 text-xs text-stone-600 flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-stone-800">Your report can still help. </span>
                      <span>Additional reports help authorities and universities understand how widespread the problem is.</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowSimilarDrawer(!showSimilarDrawer)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 cursor-pointer"
                    >
                      {showSimilarDrawer ? 'Hide All Similar Reports' : 'View All Similar Challenges'}
                    </button>
                    <span className="text-xs text-stone-400">• Continue anyway to add your local voice</span>
                  </div>

                  {showSimilarDrawer && (
                    <div className="pt-2 space-y-2 animate-in fade-in duration-200">
                      {similarChallengesList.slice(2).map((sim) => (
                        <div
                          key={sim.id}
                          className="p-3 rounded-xl bg-white border border-stone-200 flex flex-col gap-1.5 text-xs shadow-2xs"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div>
                              <div className="font-bold text-stone-900">{sim.title}</div>
                              <div className="text-[11px] text-stone-400">{sim.timeAgo} • {sim.distance}</div>
                            </div>
                            <span className="text-[11px] font-bold text-emerald-700 shrink-0">{sim.similarity}% match</span>
                          </div>
                          {sim.matchReason && (
                            <div className="text-[11px] text-stone-600 pt-1 border-t border-stone-100 flex items-start gap-1.5 leading-relaxed">
                              <span className="text-[9.5px] font-bold text-stone-500 uppercase tracking-wider shrink-0 mt-0.5">
                                Match reason:
                              </span>
                              <span className="text-stone-700">{sim.matchReason}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* ==================================================
                    AI PRIORITY EXPLANATION
                ================================================== */}
                <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-orange-600" />
                      <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                        WHY THIS PRIORITY?
                      </h4>
                    </div>
                    <span className="text-xs font-bold text-orange-900 font-mono">
                      Total: {priorityScore} / 100
                    </span>
                  </div>

                  {/* AI Assessment Rationale */}
                  {priorityRationale && (
                    <div className="p-3 rounded-xl bg-white border border-stone-200/90 text-xs leading-relaxed space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                        AI Assessment
                      </span>
                      <p className="text-stone-700 italic">
                        &ldquo;{priorityRationale}&rdquo;
                      </p>
                    </div>
                  )}

                  {/* AI Evidence Assessment */}
                  {evidenceAssessment && evidenceAssessment.evidenceUsed && (
                    <div className="p-3 rounded-xl bg-white border border-stone-200 text-xs leading-relaxed space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                          Supporting Evidence ({evidenceAssessment.imageCount} {evidenceAssessment.imageCount === 1 ? 'image' : 'images'} analyzed)
                        </span>
                        <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                          Visual Evidence Considered
                        </span>
                      </div>
                      <p className="text-stone-700 italic">
                        &ldquo;{evidenceAssessment.summary}&rdquo;
                      </p>
                    </div>
                  )}

                  {/* Priority Breakdown Sliders */}
                  <div className="space-y-2 pt-1">
                    {[
                      {
                        factor: 'People affected',
                        val: `${priorityFactors.humanImpact}%`,
                        pct: priorityFactors.humanImpact,
                      },
                      {
                        factor: 'Economic impact',
                        val: `${priorityFactors.economicLoss}%`,
                        pct: priorityFactors.economicLoss,
                      },
                      {
                        factor: 'Urgency',
                        val: `${priorityFactors.urgency}%`,
                        pct: priorityFactors.urgency,
                      },
                      {
                        factor: 'Geographical spread',
                        val: `${priorityFactors.geographicSpread}%`,
                        pct: priorityFactors.geographicSpread,
                      },
                      {
                        factor: 'Similar reports',
                        val: `${similarChallengesList.length} found`,
                        pct: Math.min(100, similarChallengesList.length * 25),
                      },
                    ].map((row) => (
                      <div key={row.factor} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-stone-600 font-medium">{row.factor}</span>
                          <span className="font-mono text-stone-800 font-bold">{row.val}</span>
                        </div>
                        <div className="h-1.5 w-full bg-stone-200/80 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-stone-800 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(100, Math.max(0, row.pct))}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* AI Triage Transparency & Audit Metadata */}
                  <div className="pt-2 border-t border-stone-200/80">
                    <div className="p-3 rounded-xl bg-white border border-stone-200 text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
                          <Cpu className="w-3.5 h-3.5 text-stone-500" />
                          Assessment Details
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                            triageSource === 'gemini'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-stone-100 text-stone-600 border-stone-200'
                          }`}
                        >
                          {triageSource === 'gemini' ? 'Gemini 3.8 Flash' : 'Deterministic Engine'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] pt-0.5">
                        <div className="bg-stone-50 p-2 rounded-lg border border-stone-100/90">
                          <div className="text-stone-400 text-[10px] font-medium">AI Source</div>
                          <div className="font-semibold text-stone-800 mt-0.5 flex items-center gap-1">
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                triageSource === 'gemini' ? 'bg-emerald-500' : 'bg-amber-500'
                              }`}
                            ></span>
                            {triageSource === 'gemini' ? 'Gemini AI Model' : 'Deterministic Fallback'}
                          </div>
                        </div>

                        <div className="bg-stone-50 p-2 rounded-lg border border-stone-100/90">
                          <div className="text-stone-400 text-[10px] font-medium">Evidence Used</div>
                          <div
                            className="font-semibold text-stone-800 mt-0.5 truncate"
                            title={
                              evidenceAssessment?.evidenceUsed && evidenceAssessment.imageCount > 0
                                ? `${evidenceAssessment.imageCount} image(s) analyzed`
                                : 'Text analysis only'
                            }
                          >
                            {evidenceAssessment?.evidenceUsed && evidenceAssessment.imageCount > 0
                              ? `${evidenceAssessment.imageCount} image(s) analyzed`
                              : 'Text analysis only'}
                          </div>
                        </div>

                        <div className="bg-stone-50 p-2 rounded-lg border border-stone-100/90">
                          <div className="text-stone-400 text-[10px] font-medium">Similar Reports Found</div>
                          <div className="font-semibold text-stone-800 mt-0.5">
                            {similarChallengesCount} canonical match{similarChallengesCount === 1 ? '' : 'es'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-stone-500 italic pt-1">
                    * Priority is an AI-generated recommendation. Final validation is performed by the responsible authority.
                  </p>
                </div>

                {/* ==================================================
                    RECOMMENDED ROUTING & EXPERTISE
                ================================================== */}
                <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                        WHO COULD HELP SOLVE THIS?
                      </h4>
                      <p className="text-xs text-stone-500">
                        AI-recommended expertise and potential academic partners.
                      </p>
                    </div>
                    <span className="text-[10px] font-semibold text-stone-500 bg-white border border-stone-200 px-2 py-0.5 rounded">
                      AI recommendation
                    </span>
                  </div>

                  {/* Mapped Disciplines */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-stone-600">Recommended Technical Disciplines:</span>
                    <div className="flex flex-wrap gap-2">
                      {recommendedExpertise.map((exp) => (
                        <div
                          key={exp.name}
                          className="px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-xs font-semibold text-stone-800 flex items-center gap-1.5 shadow-2xs"
                        >
                          <Zap className="w-3 h-3 text-orange-600" />
                          <span>{exp.name}</span>
                          <span className="text-[10px] font-mono text-stone-400 font-normal">({exp.relevance}%)</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Potential Academic Partners */}
                  <div className="space-y-2 pt-2 border-t border-stone-200/60">
                    <span className="text-[11px] font-bold text-stone-600">Potential Academic Partners:</span>
                    <div className="space-y-2">
                      {recommendedUniversities.map((uni, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-white border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-stone-100 text-stone-700 flex items-center justify-center font-bold text-xs">
                              <Building2 className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-stone-900">{uni.universityName}</div>
                              <div className="text-[11px] text-stone-500">{uni.labSpecialization}</div>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-xs font-bold text-emerald-700 font-mono bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                              {uni.matchScore}% Match
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-[11px] text-stone-400 italic">
                      These are AI recommendations based on faculty lab publications. Official assignment occurs upon state triage review.
                    </p>
                  </div>
                </div>

                {/* Navigation */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="px-5 py-2.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back: Location</span>
                  </button>
                  <button
                    type="button"
                    id="btn-step4-proceed"
                    onClick={() => {
                      setCurrentStep(5);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm flex items-center gap-2 cursor-pointer shadow-sm transition-all"
                  >
                    <span>Proceed to Review</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            )}

          </div>
        )}

        {/* ==================================================
            STEP 5 — REVIEW & SUBMIT
        ================================================== */}
        {currentStep === 5 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6 animate-in fade-in duration-200">
            
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-heading">
                Review Your Challenge
              </h2>
              <p className="text-xs sm:text-sm text-stone-500">
                Please verify the details before submitting. You can edit any section.
              </p>
            </div>

            {/* Summary Cards with Edit Actions */}
            <div className="space-y-3">
              
              {/* 1. Problem Description */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                    PROBLEM DESCRIPTION
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-xs font-semibold text-orange-700 hover:underline cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
                <div className="text-sm font-bold text-stone-900">{title || 'Community Challenge'}</div>
                <p className="text-xs text-stone-600 leading-relaxed whitespace-pre-line">
                  {description}
                </p>
                <div className="pt-2 border-t border-stone-200/60 flex flex-wrap gap-2 text-[11px] text-stone-600">
                  <span className="bg-white px-2 py-0.5 rounded border border-stone-200">
                    Affected: <strong>{affectedGroup}</strong>
                  </span>
                  <span className="bg-white px-2 py-0.5 rounded border border-stone-200">
                    Duration: <strong>{duration}</strong>
                  </span>
                  <span className="bg-white px-2 py-0.5 rounded border border-stone-200">
                    Severity: <strong>{perceivedSeverity}</strong>
                  </span>
                </div>
              </div>

              {/* 2. Location */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                    LOCATION
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="text-xs font-semibold text-orange-700 hover:underline cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
                <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-600" />
                  <span>{villageOrCity}, {block}, {district} {pincode ? `(${pincode})` : ''}</span>
                </div>
                {coordinates && (
                  <p className="text-[11px] text-stone-400">
                    GPS verified: {coordinates.lat.toFixed(4)}° N, {coordinates.lng.toFixed(4)}° E
                  </p>
                )}
              </div>

              {/* 3. Evidence */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                    EVIDENCE ATTACHMENTS ({uploadedFiles.length})
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="text-xs font-semibold text-orange-700 hover:underline cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
                {uploadedFiles.length === 0 ? (
                  <p className="text-xs text-stone-500 italic">No files attached (optional).</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {uploadedFiles.map((f, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-xs text-stone-700 font-medium">
                        {f.name} ({f.size})
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* 4. AI Triage Summary */}
              <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-orange-900 uppercase tracking-wider">
                    AI CLASSIFICATION & ROUTING
                  </span>
                  <span className="text-[10px] bg-orange-200/80 text-orange-900 font-semibold px-2 py-0.5 rounded">
                    AI recommendation
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-stone-500 block">Domain</span>
                    <strong className="text-stone-900">{selectedDomain}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-500 block">Priority Score</span>
                    <strong className="text-orange-900">{priorityScore} / 100 ({priorityLevel})</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-500 block">Estimated Reach</span>
                    <strong className="text-stone-900">~{estimatedAffected.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-500 block">Lead University</span>
                    <strong className="text-stone-900">{recommendedUniversities[0]?.universityName.split(',')[0]}</strong>
                  </div>
                </div>
              </div>

            </div>

            {/* Citizen Trust: What Happens Next? */}
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                WHAT HAPPENS NEXT?
              </h4>
              <div className="space-y-2 text-xs text-stone-600">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-stone-800">1.</span>
                  <span>SAMADHAN AI organizes and indexes your report.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-stone-800">2.</span>
                  <span>A responsible government authority reviews the ground urgency.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-stone-800">3.</span>
                  <span>Relevant state universities are matched with seed funding.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-stone-800">4.</span>
                  <span>Faculty and student engineering teams develop prototypes.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-stone-800">5.</span>
                  <span>Industry and CSR partners support field pilot deployment.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-stone-800">6.</span>
                  <span>You and your community help validate the final outcome.</span>
                </div>
              </div>
            </div>

            {/* Submit Actions */}
            <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back: AI Analysis</span>
              </button>
              
              <button
                type="button"
                id="btn-submit-challenge"
                disabled={isSubmitting}
                onClick={handleFinalSubmit}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-orange-600/20 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Submitting Your Challenge...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Submit Challenge</span>
                  </>
                )}
              </button>
            </div>

          </div>
        )}

        {/* ==================================================
            SUBMISSION CONFIRMATION (STEP 6)
        ================================================== */}
        {currentStep === 6 && submittedChallengeData && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-8 animate-in fade-in duration-300">
            
            {/* Header / Success Banner */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-heading">
                Your Challenge Has Been Submitted.
              </h2>
              <p className="text-sm text-stone-600 max-w-md mx-auto">
                Thank you for helping identify a problem in your community. SAMADHAN AI has routed your challenge for administrative review.
              </p>
            </div>

            {/* Tracking ID Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-center sm:text-left">
              <div>
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                  CHALLENGE TRACKING ID
                </span>
                <div className="text-lg sm:text-xl font-mono font-extrabold text-stone-900 mt-0.5">
                  {submittedChallengeData.trackingCode}
                </div>
                <div className="text-xs text-stone-500 mt-0.5">
                  {submittedChallengeData.title} • {submittedChallengeData.location.district}
                </div>
              </div>

              <div className="flex items-center justify-center sm:justify-end gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  <span>Status: Submitted</span>
                </span>
              </div>
            </div>

            {/* Next Journey Timeline */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                CHALLENGE JOURNEY
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-6 gap-2 text-xs">
                {[
                  { step: '1', title: 'Submitted', status: 'done', desc: '✓ Challenge submitted' },
                  { step: '2', title: 'AI Triage', status: 'current', desc: '● AI analysis completed' },
                  { step: '3', title: 'Gov Review', status: 'pending', desc: '○ Government validation' },
                  { step: '4', title: 'University', status: 'pending', desc: '○ University matching' },
                  { step: '5', title: 'Prototype', status: 'pending', desc: '○ Solution development' },
                  { step: '6', title: 'Impact', status: 'pending', desc: '○ Impact validation' }
                ].map((st) => (
                  <div
                    key={st.step}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      st.status === 'done'
                        ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                        : st.status === 'current'
                        ? 'bg-orange-50 border-orange-300 text-orange-900 font-bold'
                        : 'bg-stone-50/50 border-stone-200/60 text-stone-400'
                    }`}
                  >
                    <div className="text-[10px] font-mono text-stone-400">Step {st.step}</div>
                    <div className="font-bold truncate mt-0.5">{st.title}</div>
                    <div className="text-[10px] mt-1 text-stone-500 truncate">{st.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Citizen Trust: What Happens Next? */}
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                WHAT HAPPENS NEXT?
              </h4>
              <div className="space-y-2 text-xs text-stone-600">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-stone-800">1.</span>
                  <span>SAMADHAN AI organizes your report and tags relevant departments.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-stone-800">2.</span>
                  <span>A responsible authority reviews the report for seed grant clearance.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-stone-800">3.</span>
                  <span>Relevant universities are matched to develop engineering prototypes.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-stone-800">4.</span>
                  <span>You will receive an SMS update on {citizenContact} whenever status changes.</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                id="btn-track-my-challenge"
                onClick={() => {
                  // Connects directly to existing challenge details / tracking page
                  onChallengeSubmitted(submittedChallengeData);
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-orange-600/20 transition-all"
              >
                <span>Track My Challenge</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                id="btn-return-explore"
                onClick={onCancel}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 font-semibold text-sm flex items-center justify-center cursor-pointer transition-colors"
              >
                Return to Explore
              </button>
            </div>

          </div>
        )}

      </div>

      {/* Preview Modal for Evidence Images */}
      {previewModalFile && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-800 truncate">{previewModalFile.name}</span>
              <button
                onClick={() => setPreviewModalFile(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {previewModalFile.url && (
              <img
                src={previewModalFile.url}
                alt={previewModalFile.name}
                className="w-full max-h-80 object-cover rounded-2xl border border-stone-200"
              />
            )}
            <div className="flex justify-end">
              <button
                onClick={() => setPreviewModalFile(null)}
                className="px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-semibold cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
