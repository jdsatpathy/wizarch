export interface ServiceItem {
  slug: string;
  title: string;
  tagline: string;
  badge: string;
  icon: string;
  overview: string;
  highlights: string[];
  deliverables: { title: string; description: string }[];
  targetAudience: string[];
}

export const servicesData: Record<string, ServiceItem> = {
  'mock-interview': {
    slug: 'mock-interview',
    title: 'Technical Mock Interview',
    tagline: 'Realistic 1-on-1 interview simulations tailored for Data Engineers & Data Architects.',
    badge: 'Interview Practice',
    icon: '🎯',
    overview: 'Get actionable, honest feedback from a Data Architect with 14+ years of enterprise experience. Practice live coding, SQL recursive logic, Spark pipeline optimizations, and distributed system design scenarios in a pressure-free environment.',
    highlights: [
      '45-minute realistic technical simulation + 15-minute deep-dive feedback',
      'System design scenarios covering Spark, Kafka, Snowflake, and DBT',
      'Comprehensive scoring rubric assessing coding, architecture, and communication',
      'Actionable study plan to fix identified technical gaps before real interviews'
    ],
    deliverables: [
      { title: 'Live Simulation', description: 'Real-world coding and system design prompt tailored to your target company level.' },
      { title: 'Detailed Score Card', description: 'Numerical scoring across Data Modeling, Pipeline Resilience, SQL, and Communication.' },
      { title: 'Session Recording & Notes', description: 'Complete recording of the interview along with bulleted key improvement areas.' }
    ],
    targetAudience: [
      'Data Engineers preparing for Senior or Staff level interviews',
      'Analytics Engineers stepping up into Data Platform roles',
      'Engineers looking to master System Design for Data Architecture'
    ]
  },

  'candidate-handholding': {
    slug: 'candidate-handholding',
    title: 'Candidate Handholding & Mentorship',
    tagline: 'Personalized 1-on-1 mentorship guiding your transition, interview prep, and career growth.',
    badge: '1-on-1 Mentorship',
    icon: '🚀',
    overview: 'Navigating career growth in Data Architecture and AI can be daunting alone. This dedicated handholding program provides continuous 1-on-1 guidance, portfolio review, interview prep, and strategy calls to help you land and succeed in high-impact data roles.',
    highlights: [
      'Tailored career roadmap based on thorough technical skill-gap evaluation',
      'Hands-on portfolio project guidance and architecture design reviews',
      'Mock interview iterations + direct offer negotiation strategy',
      'Dedicated weekly syncs + async chat support for on-the-job challenges'
    ],
    deliverables: [
      { title: 'Personalized Strategy Plan', description: 'Clear step-by-step roadmap tailored to your specific target roles and timelines.' },
      { title: 'Weekly 1-on-1 Syncs', description: 'Deep-dive calls reviewing progress, system designs, and upcoming interviews.' },
      { title: 'Offer Negotiation Strategy', description: 'Market data benchmarks and negotiation scripts to maximize your compensation.' }
    ],
    targetAudience: [
      'Engineers transitioning into Data Architecture or Lead Data Engineering',
      'Candidates preparing for aggressive job search campaigns',
      'Recently promoted engineers needing guidance on complex architecture projects'
    ]
  },

  'resume-review': {
    slug: 'resume-review',
    title: 'Resume & LinkedIn Optimization',
    tagline: 'Transform your resume into a metrics-driven profile that passes screeners and wows hiring managers.',
    badge: 'Resume Audit',
    icon: '📄',
    overview: 'Most data engineering resumes get filtered out because they list generic tools instead of quantifiable impact. Learn how to reframe your experience around data scale (TB/PB), SLA adherence, cost optimization, and resilient system design.',
    highlights: [
      'Line-by-line resume rewrite focused on scale metrics and engineering outcomes',
      'Automated candidate evaluation pass using the RecruitAI scoring matrix',
      'LinkedIn profile optimization to attract inbound recruiter reach-outs',
      '30-minute 1-on-1 walk-through call to refine your personal narrative'
    ],
    deliverables: [
      { title: 'Polished PDF & Doc Resume', description: 'ATS-friendly, beautifully formatted resume highlighting SLA and scale achievements.' },
      { title: 'RecruitAI Audit Report', description: 'Automated role-fit assessment score and strength/gap analysis breakdown.' },
      { title: '30-Min Strategy Call', description: 'Live walk-through discussing narrative framing and answering questions.' }
    ],
    targetAudience: [
      'Data Engineers not getting responses from submitted job applications',
      'Senior Engineers aiming for high-paying remote or staff-level roles',
      'Data Professionals wanting an ATS-optimized, high-impact resume'
    ]
  }
};
