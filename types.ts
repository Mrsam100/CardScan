
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface Contact {
  id: string;
  name: string;
  jobTitle: string;
  company: string;
  email: string;
  phone: string;
  linkedinUrl?: string;
  notes?: string;
  image?: string; // Base64 of the card or profile pic
  aiInsights?: string; // Sam's enrichment
  status: 'active' | 'archived';
  timestamp: number;
  bio?: string;
  // Physical card fields
  address?: string;
  fax?: string;
  telex?: string;
}

export interface IntegrationLog {
  id: string;
  contactId: string;
  platform: 'LinkedIn' | 'CRM' | 'Contacts' | 'Email';
  status: 'pending' | 'success' | 'failed';
  timestamp: number;
  message: string;
}

export type AppView = 'landing' | 'scan' | 'vault' | 'crm' | 'network' | 'settings' | 'my-card';

export interface AppSettings {
  language: 'en' | 'ar' | 'hi' | 'es' | 'fr';
  currency: string;
  darkMode: boolean;
  crmType: 'HubSpot' | 'Salesforce' | 'Local Only';
  autoLinkedIn: boolean;
  businessType?: string;
  taxRate?: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface Paper {
  id: string;
  title: string;
  publisher: string;
  authors: string[];
  abstract: string;
  abstractPreview: string;
  publicationDate: string;
  category: string;
  doi: string;
  whyMatters: string;
  upvotes: number;
  timestamp: number;
  aiInsights: string[];
  publisherLogo: string;
  readTime: string;
  fileUrl?: string;
  description?: string;
}

export interface JournalArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
}
