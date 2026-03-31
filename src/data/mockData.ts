export type Language = 'en' | 'hi';

export interface TextBlock {
  id: string;
  content: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  fontSize: number;
  fontFamily: string;
  color: string;
  fontWeight: string;
  fontStyle?: string;
  textDecoration?: string;
  backgroundColor?: string;
  language: Language;
  isOcr?: boolean;
  confidenceScore?: number;
}

export interface Annotation {
  id: string;
  content: string;
  x: number;
  y: number;
  color: string;
  author: string;
  createdAt: string;
}

export interface Page {
  id: string;
  pageNumber: number;
  blocks: TextBlock[];
  annotations: Annotation[];
  isScanned?: boolean;
  scannedImageUrl?: string;
}

export interface Document {
  id: string;
  title: string;
  updatedAt: string;
  thumbnailUrl?: string;
  pages: Page[];
  fileSize?: string;
  wordCount?: number;
  isStarred?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'guest' | 'registered';
}

export const mockUser: User = {
  id: 'u1',
  name: 'Demo User',
  email: 'demo@example.com',
  role: 'registered'
};

const englishBlocks: TextBlock[] = [
{
  id: 'b1',
  content: 'ACME Corporation',
  x: 50,
  y: 50,
  fontSize: 24,
  fontFamily: 'Inter',
  color: '#000000',
  fontWeight: 'bold',
  language: 'en'
},
{
  id: 'b2',
  content: '123 Business Rd, Tech City, TC 10101',
  x: 50,
  y: 85,
  fontSize: 12,
  fontFamily: 'Inter',
  color: '#666666',
  fontWeight: 'normal',
  language: 'en'
},
{
  id: 'b3',
  content: 'Date: October 24, 2023',
  x: 50,
  y: 130,
  fontSize: 12,
  fontFamily: 'Inter',
  color: '#000000',
  fontWeight: 'normal',
  language: 'en'
},
{
  id: 'b4',
  content: 'Dear Stakeholders,',
  x: 50,
  y: 180,
  fontSize: 14,
  fontFamily: 'Inter',
  color: '#000000',
  fontWeight: 'bold',
  language: 'en'
},
{
  id: 'b5',
  content:
  'We are pleased to announce our Q3 earnings which have exceeded expectations across all major verticals. The integration of our new AI-driven tools has streamlined operations significantly.',
  x: 50,
  y: 220,
  width: 700,
  fontSize: 12,
  fontFamily: 'Inter',
  color: '#000000',
  fontWeight: 'normal',
  language: 'en'
},
{
  id: 'b6',
  content: 'Sincerely,',
  x: 50,
  y: 300,
  fontSize: 12,
  fontFamily: 'Inter',
  color: '#000000',
  fontWeight: 'normal',
  language: 'en'
},
{
  id: 'b7',
  content: 'Jane Doe, CEO',
  x: 50,
  y: 350,
  fontSize: 12,
  fontFamily: 'Inter',
  color: '#000000',
  fontWeight: 'bold',
  language: 'en'
}];


const englishBlocksPage2: TextBlock[] = [
{
  id: 'b8',
  content: 'Appendix A: Financials',
  x: 50,
  y: 50,
  fontSize: 18,
  fontFamily: 'Inter',
  color: '#000',
  fontWeight: 'bold',
  language: 'en'
},
{
  id: 'b9',
  content: 'Q3 Revenue: $4.2M (+15% YoY)',
  x: 50,
  y: 100,
  fontSize: 14,
  fontFamily: 'Inter',
  color: '#333',
  fontWeight: 'normal',
  language: 'en'
},
{
  id: 'b10',
  content: 'Operating Costs: $1.8M (-5% YoY)',
  x: 50,
  y: 130,
  fontSize: 14,
  fontFamily: 'Inter',
  color: '#333',
  fontWeight: 'normal',
  language: 'en'
},
{
  id: 'b11',
  content: 'Net Profit Margin: 24%',
  x: 50,
  y: 160,
  fontSize: 14,
  fontFamily: 'Inter',
  color: '#333',
  fontWeight: 'bold',
  language: 'en'
},
{
  id: 'b12',
  content: '• Expanded into 3 new European markets',
  x: 70,
  y: 210,
  fontSize: 12,
  fontFamily: 'Inter',
  color: '#555',
  fontWeight: 'normal',
  language: 'en'
},
{
  id: 'b13',
  content: '• Launched v2.0 of our core platform',
  x: 70,
  y: 240,
  fontSize: 12,
  fontFamily: 'Inter',
  color: '#555',
  fontWeight: 'normal',
  language: 'en'
}];


const hindiBlocks: TextBlock[] = [
{
  id: 'hb1',
  content: 'भारत का संविधान',
  x: 300,
  y: 60,
  fontSize: 28,
  fontFamily: 'Noto Sans Devanagari',
  color: '#000000',
  fontWeight: 'bold',
  language: 'hi'
},
{
  id: 'hb2',
  content: 'भाग 1: संघ और उसका राज्यक्षेत्र',
  x: 280,
  y: 110,
  fontSize: 18,
  fontFamily: 'Noto Sans Devanagari',
  color: '#333333',
  fontWeight: 'bold',
  language: 'hi'
},
{
  id: 'hb3',
  content: 'अनुच्छेद 1 - संघ का नाम और राज्यक्षेत्र',
  x: 50,
  y: 170,
  fontSize: 16,
  fontFamily: 'Noto Sans Devanagari',
  color: '#000000',
  fontWeight: 'bold',
  language: 'hi'
},
{
  id: 'hb4',
  content: '(1) भारत, अर्थात् इंडिया, राज्यों का संघ होगा।',
  x: 50,
  y: 210,
  fontSize: 14,
  fontFamily: 'Noto Sans Devanagari',
  color: '#000000',
  fontWeight: 'normal',
  language: 'hi'
},
{
  id: 'hb5',
  content:
  '(2) राज्य और उनके राज्यक्षेत्र वे होंगे जो पहली अनुसूची में विनिर्दिष्ट हैं।',
  x: 50,
  y: 240,
  fontSize: 14,
  fontFamily: 'Noto Sans Devanagari',
  color: '#000000',
  fontWeight: 'normal',
  language: 'hi'
}];


const hindiBlocksPage2: TextBlock[] = [
{
  id: 'hb6',
  content: 'अनुच्छेद 2 - नए राज्यों का प्रवेश या स्थापना',
  x: 50,
  y: 60,
  fontSize: 16,
  fontFamily: 'Noto Sans Devanagari',
  color: '#000000',
  fontWeight: 'bold',
  language: 'hi'
},
{
  id: 'hb7',
  content:
  'संसद, विधि द्वारा, ऐसे निबंधनों और शर्तों पर, जो वह ठीक समझे, संघ में नए राज्यों का प्रवेश या उनकी स्थापना कर सकेगी।',
  x: 50,
  y: 100,
  width: 700,
  fontSize: 14,
  fontFamily: 'Noto Sans Devanagari',
  color: '#000000',
  fontWeight: 'normal',
  language: 'hi'
},
{
  id: 'hb8',
  content:
  'अनुच्छेद 3 - नए राज्यों का निर्माण और वर्तमान राज्यों के क्षेत्रों, सीमाओं या नामों में परिवर्तन',
  x: 50,
  y: 160,
  width: 700,
  fontSize: 16,
  fontFamily: 'Noto Sans Devanagari',
  color: '#000000',
  fontWeight: 'bold',
  language: 'hi'
}];


const scannedHindiBlocks: TextBlock[] = [
{
  id: 'shb1',
  content: 'महत्वपूर्ण सूचना',
  x: 320,
  y: 80,
  fontSize: 24,
  fontFamily: 'Noto Sans Devanagari',
  color: '#000000',
  fontWeight: 'bold',
  language: 'hi',
  isOcr: true,
  confidenceScore: 0.95
},
{
  id: 'shb2',
  content:
  'सभी कर्मचारियों को सूचित किया जाता है कि कल कार्यालय में अवकाश रहेगा।',
  x: 80,
  y: 150,
  width: 600,
  fontSize: 16,
  fontFamily: 'Noto Sans Devanagari',
  color: '#111111',
  fontWeight: 'normal',
  language: 'hi',
  isOcr: true,
  confidenceScore: 0.88
},
{
  id: 'shb3',
  content: 'आदेशानुसार,',
  x: 80,
  y: 220,
  fontSize: 14,
  fontFamily: 'Noto Sans Devanagari',
  color: '#000000',
  fontWeight: 'normal',
  language: 'hi',
  isOcr: true,
  confidenceScore: 0.92
},
{
  id: 'shb4',
  content: 'प्रबंधन समिति',
  x: 80,
  y: 260,
  fontSize: 14,
  fontFamily: 'Noto Sans Devanagari',
  color: '#000000',
  fontWeight: 'bold',
  language: 'hi',
  isOcr: true,
  confidenceScore: 0.97
}];


const mixedBlocksPage1: TextBlock[] = [
{
  id: 'mb1',
  content: 'Global Tech Summit 2024',
  x: 250,
  y: 60,
  fontSize: 24,
  fontFamily: 'Inter',
  color: '#1e3a5f',
  fontWeight: 'bold',
  language: 'en'
},
{
  id: 'mb2',
  content: 'Executive Summary',
  x: 50,
  y: 120,
  fontSize: 18,
  fontFamily: 'Inter',
  color: '#000',
  fontWeight: 'bold',
  language: 'en'
},
{
  id: 'mb3',
  content:
  'The summit concluded with groundbreaking announcements in AI and renewable energy sectors. Over 5,000 delegates attended from 40 countries.',
  x: 50,
  y: 160,
  width: 700,
  fontSize: 12,
  fontFamily: 'Inter',
  color: '#333',
  fontWeight: 'normal',
  language: 'en'
},
{
  id: 'mb4',
  content: 'मुख्य निष्कर्ष (Key Takeaways)',
  x: 50,
  y: 220,
  fontSize: 16,
  fontFamily: 'Noto Sans Devanagari',
  color: '#000',
  fontWeight: 'bold',
  language: 'hi'
},
{
  id: 'mb5',
  content:
  'सम्मेलन में कृत्रिम बुद्धिमत्ता (AI) के नैतिक उपयोग और जलवायु परिवर्तन पर वैश्विक सहयोग पर जोर दिया गया।',
  x: 50,
  y: 260,
  width: 700,
  fontSize: 14,
  fontFamily: 'Noto Sans Devanagari',
  color: '#333',
  fontWeight: 'normal',
  language: 'hi'
}];


const mixedBlocksPage2: TextBlock[] = [
{
  id: 'mb6',
  content: 'Legal Framework & Compliance',
  x: 50,
  y: 60,
  fontSize: 18,
  fontFamily: 'Inter',
  color: '#000',
  fontWeight: 'bold',
  language: 'en'
},
{
  id: 'mb7',
  content:
  'अंतर्राष्ट्रीय व्यापार कानून के अनुसार, सभी भागीदार कंपनियों को धारा 4(A) का पालन करना अनिवार्य है।',
  x: 50,
  y: 110,
  width: 700,
  fontSize: 14,
  fontFamily: 'Noto Sans Devanagari',
  color: '#333',
  fontWeight: 'normal',
  language: 'hi'
},
{
  id: 'mb8',
  content: 'Reference: Global Trade Act 2023, Section 4(A), Paragraph 2.',
  x: 50,
  y: 150,
  fontSize: 12,
  fontFamily: 'Inter',
  color: '#666',
  fontStyle: 'italic',
  fontWeight: 'normal',
  language: 'en'
}];


export const mockDocuments: Document[] = [
{
  id: 'doc1',
  title: 'Q3_Earnings_Report.pdf',
  updatedAt: '2023-10-24T10:00:00Z',
  fileSize: '1.2 MB',
  wordCount: 450,
  isStarred: true,
  pages: [
  { id: 'p1', pageNumber: 1, blocks: englishBlocks, annotations: [] },
  { id: 'p2', pageNumber: 2, blocks: englishBlocksPage2, annotations: [] }]

},
{
  id: 'doc2',
  title: 'Constitution_Hindi.pdf',
  updatedAt: '2023-10-25T14:30:00Z',
  fileSize: '3.4 MB',
  wordCount: 1200,
  isStarred: false,
  pages: [
  {
    id: 'p3',
    pageNumber: 1,
    blocks: hindiBlocks,
    annotations: [
    {
      id: 'a1',
      content: 'Check translation',
      x: 600,
      y: 200,
      color: '#fef08a',
      author: 'Reviewer',
      createdAt: '2023-10-25T15:00:00Z'
    }]

  },
  { id: 'p3_2', pageNumber: 2, blocks: hindiBlocksPage2, annotations: [] }]

},
{
  id: 'doc3',
  title: 'Scanned_Notice_Hindi.pdf',
  updatedAt: '2023-10-26T09:15:00Z',
  fileSize: '5.1 MB',
  wordCount: 85,
  isStarred: false,
  pages: [
  {
    id: 'p4',
    pageNumber: 1,
    blocks: scannedHindiBlocks,
    annotations: [],
    isScanned: true,
    scannedImageUrl:
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1130"><rect width="100%" height="100%" fill="%23f8f9fa"/><text x="320" y="100" font-family="sans-serif" font-size="24" fill="%23999" opacity="0.5" transform="rotate(-5 320 100)">महत्वपूर्ण सूचना</text><text x="80" y="170" font-family="sans-serif" font-size="16" fill="%23999" opacity="0.5" transform="rotate(-2 80 170)">सभी कर्मचारियों को सूचित किया जाता है कि कल कार्यालय में अवकाश रहेगा।</text></svg>'
  }]

},
{
  id: 'doc4',
  title: 'Mixed_Report_EN_HI.pdf',
  updatedAt: '2023-10-27T11:20:00Z',
  fileSize: '2.8 MB',
  wordCount: 620,
  isStarred: true,
  pages: [
  { id: 'p5', pageNumber: 1, blocks: mixedBlocksPage1, annotations: [] },
  { id: 'p6', pageNumber: 2, blocks: mixedBlocksPage2, annotations: [] }]

}];