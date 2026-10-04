import signqube from '../assets/clients/signqube.webp'
import kilf from '../assets/clients/kilf.webp'
import maadhvi from '../assets/clients/maadhvi.webp'
import getaprint from '../assets/clients/getaprint.webp'
import partner from '../assets/clients/partner.webp'

export const nav = [
  { id: 'story', label: 'Story' },
  { id: 'solutions', label: 'Solutions' },
  { id: 'clients', label: 'Clients' },
  { id: 'process', label: 'Process' },
  { id: 'faq', label: 'FAQ' },
]

export const heroKeywords = [
  'AI agents',
  'WhatsApp Business API',
  'iOS & Android',
  'SaaS products',
  'Predictive analytics',
  'Cloud integration',
]

/* ---------- Story mode: the messy office ---------- */
// x / y are % positions on the desk, r = rotation. `mobile:false` hides a sheet on small screens.
export const messyPapers = [
  { id: 'p1', kind: 'sheet', title: 'Leads to call back', lines: ['Anu - interested?', 'Rahul - no reply', '+38 more...'], note: 'URGENT!!', x: 6, y: 12, r: -9, solves: 'ai' },
  { id: 'p2', kind: 'sticky', title: '47 unread WhatsApps', lines: ['who replied to', 'the offer msg?'], x: 30, y: 6, r: 6, solves: 'wa' },
  { id: 'p3', kind: 'sheet', title: 'invoice_FINAL_v7.xlsx', lines: ['copy -> paste -> pray', 'formula broken (again)'], x: 55, y: 10, r: -4, solves: 'sw' },
  { id: 'p4', kind: 'sheet', title: 'Appointment book', lines: ['10:30 double-booked', 'Mrs. Nair called twice'], note: 'fix this', x: 76, y: 16, r: 8, solves: 'wa', mobile: false },
  { id: 'p5', kind: 'sticky', title: 'App v2.3 or v2.4?', lines: ['iOS crash on login', 'Android ok?'], x: 14, y: 50, r: 5, solves: 'app' },
  { id: 'p6', kind: 'sheet', title: 'Monthly report', lines: ['6 spreadsheets', '3 hours of copy-paste'], x: 40, y: 44, r: -7, solves: 'ai' },
  { id: 'p7', kind: 'sheet', title: 'Customer complaints', lines: ['"no one answered"', '"slow support"'], note: 'ugh', x: 64, y: 48, r: 4, solves: 'ai', mobile: false },
  { id: 'p8', kind: 'sticky', title: 'Stock check?', lines: ['ERP vs. notebook', "numbers don't match"], x: 82, y: 54, r: -6, solves: 'sw' },
]

export const storyCaptions = [
  { kicker: 'Chapter 01 · Chaos', title: 'Monday, 9:04 AM. The office runs on paper and panic.', hand: 'sound familiar?' },
  { kicker: 'Chapter 02 · Crumple', title: 'Every manual task is a sheet you can crumple.', hand: 'toss it.' },
  { kicker: 'Chapter 03 · Clarity', title: 'What is left is one calm system that works while you sleep.', hand: 'ahh, finally.' },
]

/* ---------- Core products & services ---------- */
export const services = [
  {
    id: 'ai',
    no: '01',
    title: 'AI Solutions & Agents',
    short: 'AI Agents',
    hand: 'your 24/7 teammate',
    replaces: 'Leads to call back',
    outcome: 'Leads qualified and answered in seconds, day and night.',
    description:
      'We integrate advanced Artificial Intelligence into your workflows to automate complex tasks, analyze data for actionable insights, and create intuitive AI agents that enhance customer service and operational efficiency.',
    keywords: ['AI integration', 'Business automation', 'Custom AI agents', 'Machine learning', 'Predictive analytics', 'Chatbot development'],
    cta: 'Request AI Demo',
  },
  {
    id: 'wa',
    no: '02',
    title: 'WhatsApp Automation',
    short: 'WhatsApp',
    hand: 'replies before the chai cools',
    replaces: '47 unread WhatsApps',
    outcome: 'Bookings, support and broadcasts run on their own.',
    description:
      'Transform your customer communication with our robust WhatsApp Business API solutions. We build automated systems for appointment booking, instant support, lead qualification, and broadcast messaging.',
    keywords: ['WhatsApp Business API', 'Automated messaging', 'Chatbot marketing', 'Customer engagement', 'Conversational AI', 'Bulk messaging'],
    cta: 'Contact Sales',
  },
  {
    id: 'app',
    no: '03',
    title: 'Mobile App Development',
    short: 'Mobile Apps',
    hand: 'in every pocket',
    replaces: 'App v2.3 or v2.4?',
    outcome: 'One polished app on iOS and Android, shipped and maintained.',
    description:
      'We design and develop high-performance, user-centric mobile applications for iOS and Android. Whether you need a native or cross-platform solution, we deliver seamless digital experiences that drive user adoption.',
    keywords: ['iOS development', 'Android development', 'Cross-platform apps', 'UI/UX design', 'Mobile strategy', 'App maintenance'],
    cta: 'Get App Quote',
  },
  {
    id: 'sw',
    no: '04',
    title: 'Custom Software Development',
    short: 'Custom Software',
    hand: 'built to fit, not forced',
    replaces: 'invoice_FINAL_v7.xlsx',
    outcome: 'CRM, ERP and SaaS that replace the spreadsheet maze.',
    description:
      "Off-the-shelf solutions don't always fit unique business needs. We build scalable, secure, and bespoke enterprise software, from CRM and ERP systems to e-commerce platforms and SaaS products.",
    keywords: ['Enterprise software', 'Bespoke development', 'SaaS products', 'Web applications', 'Cloud integration', 'System modernization'],
    cta: 'Contact Sales',
  },
]

export const marqueeKeywords = [
  'AI Integration', 'Custom AI Agents', 'WhatsApp Business API', 'Conversational AI', 'iOS Apps', 'Android Apps',
  'Flutter', 'React Native', 'SaaS Products', 'CRM & ERP', 'Cloud Integration', 'Predictive Analytics',
]

export const marqueeOutcomes = [
  'less paperwork', 'faster replies', 'zero missed leads', 'happier customers', 'one source of truth', 'growth on autopilot',
]

/* ---------- Clients ---------- */
export const clients = [
  { name: 'Signqube Innovations Pvt Ltd', logo: signqube, sector: 'Technology', fit: 'cover' },
  { name: 'Kollam International Literature Fest', logo: kilf, sector: 'Culture & events', fit: 'cover' },
  { name: 'Maadhvi by Revathi', logo: maadhvi, sector: 'Fashion & lifestyle' },
  { name: 'Getaprint', logo: getaprint, sector: 'Printing' },
  { name: 'Capital Media', logo: null, sector: 'Media' },
  { name: 'Community care partner', logo: partner, sector: 'Care & community' },
]

export const testimonial = {
  quote:
    'Working with Getanix has been a game-changer for our digital presence. Their team delivered a sophisticated, custom platform that perfectly aligns with our vision for the Kollam International Literature Fest. Their technical expertise and support are unmatched.',
  author: 'KILF Team',
  org: 'Kollam International Literature Fest',
  logo: kilf,
}

/* ---------- Process (a real sequence, so it is numbered) ---------- */
export const process = [
  { title: 'Consultation & Discovery', text: 'We sit with your team, map the paper trail and find the tasks worth automating first.', hand: 'we listen first' },
  { title: 'UI/UX Design', text: 'Wireframes and clickable prototypes you can test before a single line of code.' },
  { title: 'Development', text: 'Agile sprints with demos every two weeks, so you always see real progress.' },
  { title: 'Quality Assurance', text: 'Rigorous manual and automated testing across devices, browsers and edge cases.' },
  { title: 'Deployment', text: 'Smooth launch on cloud or on-premise, with data migration and team training.' },
  { title: 'Maintenance', text: 'Monitoring, updates and new features as your business grows.', hand: "we stay" },
]

/* ---------- FAQ (SEO & AEO) ---------- */
export const faqs = [
  {
    group: 'General',
    items: [
      { q: 'What services does Getanix Technologies offer?', a: 'Getanix is a technology firm specializing in AI Solutions, WhatsApp Automation, Mobile App Development, and Custom Software Development for businesses globally.' },
      { q: 'Where is Getanix Technologies located?', a: 'Our primary development center is in Kerala, India, serving clients worldwide with robust remote and hybrid collaboration models.' },
      { q: 'How can Getanix help my business grow?', a: 'We leverage technology to automate repetitive tasks, build engaging digital products, and create data-driven strategies that increase efficiency and revenue.' },
    ],
  },
  {
    group: 'AI & Automation',
    items: [
      { q: 'Can you create a custom AI chatbot for my website?', a: 'Yes. We develop advanced AI agents and chatbots tailored to your specific business logic for improved customer support and lead generation.' },
      { q: 'What are the benefits of WhatsApp Automation for business?', a: 'WhatsApp automation improves response times, reduces operational costs, and provides a personalized customer experience at scale through automated notifications and conversational flows.' },
    ],
  },
  {
    group: 'Development',
    items: [
      { q: 'Does Getanix develop mobile apps for both iOS and Android?', a: 'Yes. We build native iOS and Android apps, as well as cost-effective cross-platform applications using frameworks like Flutter and React Native.' },
      { q: 'What is the process for custom software development?', a: 'We follow a structured Agile methodology: Consultation & Discovery, UI/UX Design, Development, rigorous Quality Assurance (QA), Deployment, and ongoing Maintenance.' },
      { q: 'Do you develop SaaS platforms?', a: 'Yes. We specialize in end-to-end SaaS product development, helping entrepreneurs and enterprises bring cloud-based software ideas to market.' },
    ],
  },
  {
    group: 'Engagement & Pricing',
    items: [
      { q: 'How do I get a quote for my project?', a: 'Reach out through the contact form on this page to schedule a free initial consultation. We will send a detailed project proposal and timeline.' },
      { q: 'What is your pricing model?', a: 'We offer flexible engagement models, including fixed-price contracts for defined scopes and dedicated development teams (Time & Material) for ongoing projects.' },
    ],
  },
]

export const inquiryTypes = [
  { id: 'sales', label: 'Contact Sales', hint: 'Tell us about your business and what slows it down.' },
  { id: 'ai', label: 'Request AI Demo', hint: 'See an AI agent or WhatsApp flow working on your use case.' },
  { id: 'app', label: 'Get App Quote', hint: 'Share your app idea and we will send scope, timeline and cost.' },
]
