# SAMADHANSETU AI (समाधान सेतु)
### AI-Powered Societal Innovation Collaboration Portal for Jharkhand & Nationwide

**SAMADHANSETU AI** is an institutional platform designed to bridge the grassroots divide by connecting **Citizens**, **Government Officials**, **University Researchers**, and **Industry/CSR Partners** into a unified societal problem-solving pipeline:

$$\text{Citizen Report} \longrightarrow \text{AI Triage} \longrightarrow \text{Govt. Validation} \longrightarrow \text{University Sandbox} \longrightarrow \text{Industry/CSR Support} \longrightarrow \text{Measurable Social Impact}$$

---

## Key Features

1. **Multilingual Citizen Challenge Intake**
   - Step-by-step reporting with geolocation tagging across all 24 districts of Jharkhand (Ranchi, West Singhbhum, Khunti, Dhanbad, Gumla, etc.).
   - Multi-modal evidence upload (field photos, documents, citizen voice recordings, and video clips) up to 25MB.
   - AI Writing Assistant to help grassroots citizens formulate clear, actionable challenge statements.

2. **Gemini AI Multi-Factor Triage Engine**
   - Automated civic domain classification (Wildlife Management, Water Security, Agriculture & Cold Chain, Healthcare, Air Quality & Particulate Dust, Education/STEM, Urban Infrastructure).
   - Mathematical priority scoring (0–100) based on weighted factors: Human Impact (30%), Economic Loss (25%), Urgency (25%), and Geographic Spread (20%).
   - Duplicate & canonical similarity detection against existing provincial challenges with geographical distance calculation.
   - Intelligent university lab and faculty specialization recommendation.

3. **Government Validation & District Administration Portal**
   - District Magistrate (DM) and Departmental Secretary review dashboards.
   - Administrative endorsement, field verification status, and inter-departmental routing.

4. **University Innovation Sandbox & Collaborative Workspaces**
   - Matches problem statements to premier institutions (BIT Mesra, IIT ISM Dhanbad, Birsa Agricultural University, Central University of Jharkhand, NIT Jamshedpur).
   - Collaborative workspaces with active sprints, telemetry feeds, hardware bill of materials, and field trial logs.

5. **Industry & CSR Co-Sponsorship Pipeline**
   - Corporate Social Responsibility (Section 135) co-sponsorship matching.
   - Transparent milestone-linked escrow funding and capital mobilization tracking.

6. **Statewide Impact Ledger & Interactive Explorer**
   - Verifiable real-time ledger: 1,240,000+ citizens impacted, 48.2M liters of potable water purified, 86 working field installations.
   - District-level heatmaps, domain filtering, and global smart search.

---

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Motion (`motion/react`), Lucide React
- **Backend / API**: Express.js, `@google/genai` (Gemini 2.5/Flash), Node.js (ESM + CommonJS bundling with `esbuild`)
- **Build Tool**: Vite 6, `tsx`
- **Hosting Targets**: Google Cloud Run (containerized) & Vercel (serverless function via `vercel.json` + `/api/index.ts`)

---

## Getting Started Locally

### Prerequisites
- Node.js 18+ or 20+
- npm 9+

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/samadhansetu-ai.git
   cd samadhansetu-ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   Add your Google Gemini API key to `.env`:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   *(Note: The application includes a fallback context engine that allows full demonstration and testing even without an API key).*

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Production Build

To build the static frontend and bundled server backend:

```bash
npm run build
```

To run the production server:

```bash
npm start
```

---

## Deploying to Vercel

This repository is pre-configured for direct deployment on [Vercel](https://vercel.com):

1. Push this repository to GitHub.
2. In the Vercel Dashboard, click **Add New Project** and import this repository.
3. In **Environment Variables**, add:
   - `GEMINI_API_KEY`: Your Google Gemini API Key.
4. Click **Deploy**. Vercel will automatically build the Vite frontend (`dist/`) and route `/api/*` endpoints to the serverless function defined in `/api/index.ts`.

---

## Repository Structure

```
├── api/
│   └── index.ts               # Vercel serverless function entry point
├── public/                    # Static assets & icons
├── src/
│   ├── components/            # UI components (Intake, Workspaces, Explorer, etc.)
│   ├── data/                  # Canonical dataset, universities, and districts
│   ├── types.ts               # Shared TypeScript schemas & interfaces
│   ├── App.tsx                # Main portal view routing & layout
│   ├── main.tsx               # Client React DOM entry point
│   └── index.css              # Global styles & Tailwind CSS v4 directives
├── .env.example               # Example environment variables
├── metadata.json              # Platform metadata & permissions
├── package.json               # Dependencies and scripts
├── server.ts                  # Express API server (Gemini AI triage & copilot)
├── tsconfig.json              # TypeScript configuration
├── vercel.json                # Vercel deployment configuration & routing
└── vite.config.ts             # Vite build configuration
```

---

## License

Developed under open civic-tech collaboration principles for societal transformation and grassroots innovation.
