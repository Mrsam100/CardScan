
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { Contact, JournalArticle } from './types';

export const BRAND_NAME = 'CardScan';

export const INDUSTRIES = [
  { name: "Tech & SaaS", icon: "🚀", color: "#FFB673" },
  { name: "Finance", icon: "📈", color: "#6A4FBF" },
  { name: "Healthcare", icon: "🏥", color: "#2AB9A9" },
  { name: "Creative Arts", icon: "🎨", color: "#FFD447" },
  { name: "Real Estate", icon: "🏠", color: "#E6007A" },
  { name: "Legal", icon: "⚖️", color: "#2775CA" },
  { name: "Education", icon: "🎓", color: "#14F195" },
  { name: "Manufacturing", icon: "🏭", color: "#8247E5" }
];

export const FEATURES = [
  { 
    title: "AI Extraction", 
    desc: "OCR that actually works. Gemini 2.5 extracts Name, Title, and Email with 99% accuracy.",
    icon: "👁️",
    color: "#FFB673"
  },
  { 
    title: "CRM Sync", 
    desc: "Instantly push new leads to HubSpot or Salesforce. Marc says: 'Analog friction is gone.'",
    icon: "🔄",
    color: "#6A4FBF"
  },
  { 
    title: "Auto-Connect", 
    desc: "Send personalized LinkedIn requests automatically. Larry says: 'OCR is solved.'",
    icon: "🔗",
    color: "#2AB9A9"
  },
  { 
    title: "AI Enrichment", 
    desc: "Sam says: 'Add AI enrichment.' We find their latest company news for perfect icebreakers.",
    icon: "✨",
    color: "#FFD447"
  }
];

export const INITIAL_CONTACTS: Contact[] = [
  { 
    id: 'c1', 
    name: 'Marc Andreessen', 
    jobTitle: 'Partner', 
    company: 'a16z', 
    email: 'marc@a16z.com', 
    phone: '555-0100', 
    status: 'active',
    timestamp: Date.now() - 86400000,
    aiInsights: "Obsessed with removing friction from the physical-to-digital bridge."
  },
  { 
    id: 'c2', 
    name: 'Sam Altman', 
    jobTitle: 'CEO', 
    company: 'OpenAI', 
    email: 'sam@openai.com', 
    phone: '555-0200', 
    status: 'active',
    timestamp: Date.now() - 43200000,
    aiInsights: "Focus on AGI and scaling intelligence. Recent news: Developer day announcements."
  }
];

// Fix: Added missing GLOSSARY for tooltips in ProductDetail
export const GLOSSARY: Record<string, string> = {
  "AI": "Artificial Intelligence - Software that performs tasks that normally require human intelligence.",
  "OCR": "Optical Character Recognition - Technology to convert image text into machine data.",
  "Friction": "Anything that makes a user experience more difficult or slower.",
  "CRM": "Customer Relationship Management - Software for managing leads and customer data.",
  "Gemini": "Google's powerful AI model used for high-accuracy text extraction."
};

// Fix: Added missing getPublisherInfo helper
export const getPublisherInfo = (name: string) => {
  const char = name.charAt(0);
  const colors: Record<string, string> = {
    'T': '#FFB673',
    'F': '#6A4FBF',
    'H': '#2AB9A9',
    'C': '#FFD447',
    'R': '#E6007A',
    'L': '#2775CA',
    'E': '#14F195',
    'M': '#8247E5'
  };
  return {
    logo: char,
    color: colors[char] || '#6A4FBF'
  };
};

// Fix: Added missing JOURNAL_ARTICLES for the Journal component
export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: '1',
    title: "The Future of Physical Networking",
    excerpt: "Why the physical business card is evolving into a digital lead.",
    content: "Business cards are a multi-century tradition. However, in the modern era, they represent analog friction. Digital capture tools like CardScan are turning these physical artifacts into actionable data streams for CRM pipelines.",
    date: "Feb 10, 2025"
  },
  {
    id: '2',
    title: "OCR Accuracy in 2025",
    excerpt: "How LLMs solved the text extraction problem.",
    content: "Historically, OCR was prone to errors. With the advent of Gemini 2.5, vision-to-text accuracy has reached 99%, allowing for seamless integration of physical data into digital ecosystems without manual correction.",
    date: "Jan 22, 2025"
  }
];
