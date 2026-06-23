'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, Send, Phone, Calendar, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { trackCTAClick, trackConversion } from '@/lib/analytics';
import { services, testimonials, cities } from '@/lib/data';

// Chat message interface
interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isQuickReply?: boolean;
  action?: 'book' | 'contact' | 'call' | 'navigate' | 'schedule';
}

// Chatbot knowledge base with comprehensive business information
const knowledgeBase = {
  // Company Information
  company: {
    name: 'Manaseerz Electric',
    founded: '5+ years ago',
    tagline: 'DFW Premier Electrical Specialists',
    mission: 'To provide the Dallas-Fort Worth metroplex with exceptional electrical services combining technical expertise, safety excellence, and customer-focused care.',
    vision: 'To be the most trusted and respected electrical services provider in the DFW area.',
    values: [
      'Integrity in every interaction',
      'Excellence in every installation',
      'Safety as our top priority',
      'Respect for your home and time',
      'Transparent, honest pricing',
      'Continuous learning and improvement',
    ],
    stats: {
      yearsExperience: '5+',
      projectsCompleted: '500+',
      happyCustomers: '127',
      citiesServed: '16',
      rating: '5.0',
      totalReviews: '127',
    },
    baseLocation: 'Lewisville, TX',
    serviceArea: 'Dallas-Fort Worth Metroplex',
    hours: 'Mon-Sat: 7AM-7PM',
    emergencyService: '24/7',
    license: 'Licensed and Insured in Texas',
  },

  // Services Information
  services: services.map((service) => ({
    name: service.title,
    description: service.description,
    priceRange: service.priceRange,
    icon: service.icon,
    id: service.id,
    features: [
      `Professional installation with secure mounting`,
      `Meets all Texas electrical codes`,
      `Clean and professional work`,
      `1-year labor warranty included`,
      `Transparent pricing with no hidden fees`,
      `Licensed and insured technicians`,
    ],
    faqs: [
      `How long does ${service.title.toLowerCase()} take?`,
      `What's included in the ${service.title.toLowerCase()} price?`,
      `Do you offer emergency ${service.title.toLowerCase()}?`,
    ],
  })),

  // Service Areas
  serviceAreas: cities.map((city) => ({
    name: `${city}, TX`,
    coverage: 'Same-day and next-day available',
    priority: 'Standard',
    emergencyAvailable: city === 'Lewisville' || city === 'Plano' || city === 'Dallas' || city === 'Frisco',
  })),

  // Pricing Information
  pricing: services.map((service) => ({
    service: service.title,
    range: service.priceRange,
    factors: ['Project complexity', 'Materials needed', 'Distance', 'Accessibility', 'Urgency'],
    bookingRequired: 'Yes - For accurate pricing',
  })),

  // Testimonials
  testimonials: testimonials.map((testimonial) => ({
    name: testimonial.name,
    city: testimonial.city,
    rating: testimonial.rating,
    project: testimonial.project,
    text: testimonial.text,
    location: testimonial.city,
    date: '2024',
  })),

  // Booking & Scheduling
  booking: {
    process: '5-step booking wizard (Service → Date → Time → Details → Confirmation)',
    advanceNotice: 'Same-day and next-day availability',
    confirmationMethod: 'Email + SMS confirmation',
    depositRequired: 'No deposit required for standard services',
    cancellationPolicy: '24-hour notice preferred, emergencies handled 24/7',
    schedulingPlatform: 'Online booking via website',
  },

  // Contact Information
  contact: {
    phone: '(682) 451-5951',
    email: 'info@manaseerz.com',
    address: 'Lewisville, TX',
    responseTime: {
      standard: '1-2 business days',
      urgent: 'Same-day or next-day',
      emergency: '24/7',
    },
    socialMedia: {
      google: 'Search "Manaseerz Electric" on Google',
      yelp: 'Read our reviews on Yelp',
      facebook: 'Follow us on Facebook',
      instagram: 'Follow us on Instagram',
    },
  },

  // Frequently Asked Questions (from FAQ component)
  faqs: [
    {
      question: 'How much do your services cost?',
      answer: 'Our pricing varies by project type and complexity. Chandelier installation starts at $150, EV charger installation at $300, smart home integration at $100, and complete renovations range from $500-$3,000. We provide free quotes with transparent, no-obligation pricing.',
      category: 'pricing',
    },
    {
      question: 'How quickly can you respond?',
      answer: 'We offer same-day and next-day availability throughout the DFW metroplex. Emergency services are available 24/7. For standard appointments, we typically can schedule within 1-3 business days depending on your location and project complexity.',
      category: 'availability',
    },
    {
      question: 'What cities do you serve?',
      answer: 'We serve the entire Dallas-Fort Worth metroplex including Lewisville, Frisco, McKinney, Plano, Dallas, Prosper, Allen, Carrollton, Richardson, Addison, Garland, Irving, Flower Mound, Southlake, Celina, and The Colony. If your city isn\'t listed, contact us - we may still serve your area!',
      category: 'areas',
    },
    {
      question: 'Are you licensed and insured?',
      answer: 'Yes! Manaseerz Electric is fully licensed and insured in the state of Texas. Our team consists of certified electrical professionals who undergo regular training to stay current with the latest codes and safety standards.',
      category: 'credentials',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, debit cards, cash, checks, and offer financing options for larger projects. Payment is typically due upon completion of work, though we may require a deposit for extensive renovations or special-order equipment.',
      category: 'payment',
    },
    {
      question: 'Do you offer warranties on your work?',
      answer: 'Absolutely! We stand behind our work with a 1-year labor warranty on all installations. Equipment warranties vary by manufacturer but typically range from 1-5 years. We\'ll provide full warranty details before starting any project.',
      category: 'warranty',
    },
    {
      question: 'Can you install any type of EV charger?',
      answer: 'Yes! We install all major EV charger brands including Tesla, ChargePoint, JuiceBox, ClipperCreek, and more. We handle everything from basic Level 1 chargers to high-power Level 2 installations with circuit panel upgrades as needed.',
      category: 'services',
    },
    {
      question: 'Do you provide the chandelier or just installation?',
      answer: 'We can help either way! If you already have a chandelier, we\'ll professionally install it with secure mounting and precise electrical connections. If you need help selecting one, we can recommend suppliers and ensure the fixture you choose is compatible with your electrical system.',
      category: 'services',
    },
    {
      question: 'What smart home systems do you work with?',
      answer: 'We install and integrate with major smart home platforms including Google Home, Amazon Alexa, Apple HomeKit, Ring, Philips Hue, Lutron Caséta, and more. Whether you want individual smart switches or a complete whole-home automation system, we\'ve got you covered.',
      category: 'services',
    },
    {
      question: 'Do you work with contractors on renovations?',
      answer: 'Yes, we regularly collaborate with general contractors, interior designers, and homeowners on renovation projects. We understand timelines, coordinate with other trades, and ensure electrical work is completed to code and on schedule.',
      category: 'services',
    },
    ],

  // Quick Actions
  quickActions: [
    {
      id: 'book-appointment',
      label: 'Book an Appointment',
      icon: Calendar,
      action: () => {
        trackCTAClick('Chatbot - Book Appointment CTA', 'Chatbot');
        window.location.href = '/book-appointment';
      },
    },
    {
      id: 'contact-form',
      label: 'Get Free Quote',
      icon: MessageSquare,
      action: () => {
        trackCTAClick('Chatbot - Contact Form CTA', 'Chatbot');
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'call-now',
      label: 'Call Now',
      icon: Phone,
      action: () => {
        trackCTAClick('Chatbot - Call Now CTA', 'Chatbot');
        window.location.href = 'tel:6824515951';
      },
    },
    {
      id: 'view-services',
      label: 'View Services',
      icon: ExternalLink,
      action: () => {
        trackCTAClick('Chatbot - View Services CTA', 'Chatbot');
        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'view-reviews',
      label: 'Read Reviews',
      icon: ExternalLink,
      action: () => {
        trackCTAClick('Chatbot - Reviews CTA', 'Chatbot');
        document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'view-faq',
      label: 'FAQ',
      icon: ExternalLink,
      action: () => {
        trackCTAClick('Chatbot - FAQ CTA', 'Chatbot');
        document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'view-portfolio',
      label: 'Portfolio',
      icon: ExternalLink,
      action: () => {
        trackCTAClick('Chatbot - Portfolio CTA', 'Chatbot');
        document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
  ],

  // Navigation Links
  navigation: {
    main: 'https://manaseerz-web.vercel.app',
    about: 'https://manaseerz-web.vercel.app/about',
    services: 'https://manaseerz-web.vercel.app/#services',
    portfolio: 'https://manaseerz-web.vercel.app/#portfolio',
    testimonials: 'https://manaseerz-web.vercel.app/#testimonials',
    faq: 'https://manaseerz-web.vercel.app/#faq',
    contact: 'contact',
    bookAppointment: '/book-appointment',
    privacy: '/privacy',
    terms: '/terms',
  },
};

// Intent recognition patterns
const intentPatterns = {
  // Pricing questions
  pricing: [
    /how much.*cost|price.*service|quote.*estimate|how.*charge/i,
    /how much.*(chandelier|ev charger|smart home|renovation|outlet|range hood)/i,
    /pricing.*for.*(chandelier|ev charger|smart home|renovation|outlet|range hood)/i,
    /what.*does.*cost/i,
    /estimate.*for/i,
  ],

  // Availability questions
  availability: [
    /how.*fast.*respond|how.*quick|when.*can.*come|availability/i,
    /same.*day|next.*day|available.*today|when.*free/i,
    /emergency|urgent|immediate.*need/i,
    /book.*appointment|schedule.*time|when.*available/i,
    /appointment.*available|opening.*book/i,
  ],

  // Service questions
  services: [
    /what.*service.*you.*offer|service.*do.*you.*provide|what.*can.*you.*do/i,
    /do.*you.*install|can.*you.*install|install.*(?:chandelier|ev charger|smart home|outlet|circuit|renovation|range hood)/i,
    /can.*you.*do|what.*do.*you.*do/i,
    /specialize.*in|expert.*in|offer.*(?:chandelier|ev charger|smart home|outlet|circuit|renovation|range hood)/i,
  ],

  // Service areas questions
  areas: [
    /where.*do.*you.*serve|service.*area|coverage.*area|which.*cities|cities.*served/i,
    /do.*you.*cover|do.*you.*serve|locations.*served/i,
    /do.*you.*work.*in|available.*in.*(?:Lewisville|Frisco|McKinney|Plano|Dallas|Prosper|Allen|Carrollton|Richardson|Addison|Garland|Irving|Flower Mound|Southlake|Celina|The Colony)/i,
    /(?:Lewisville|Frisco|McKinney|Plano|Dallas|Prosper|Allen|Carrollton|Richardson|Addison|Garland|Irving|Flower Mound|Southlake|Celina|The Colony).*available/i,
  ],

  // Credentials questions
  credentials: [
    /are.*you.*licensed|license.*number|insurance.*status|are.*you.*insured|licensed.*insured/i,
    /what.*license.*do.*you.*have|license.*information/i,
    /are.*you.*certified|certified.*electrician/i,
    /insurance.*coverage|carry.*insurance|insured.*electrician/i,
    /background.*check|check.*background|experience.*verification/i,
  ],

  // Contact questions
  contact: [
    /how.*can.*contact.*you|get.*in.*touch|reach.*you/i,
    /phone.*number|call.*you|contact.*information/i,
    /email.*address|send.*email|what.*your.*email/i,
    /address.*location|where.*are.*you.*located/i,
    /contact.*phone|phone.*number.*for/i,
    /call.*you.*support/i,
    /talk.*to.*human|speak.*with.*someone/i,
  ],

  // Review questions
  reviews: [
    /review.*rating|customer.*feedback|testimonial/i,
    /read.*reviews|what.*people.*say|google.*reviews/i,
    /customer.*feedback|how.*do.*customers.*like.*you/i,
    /rating.*score|average.*rating|overall.*rating/i,
    /five.*star|star.*rating/i,
  ],

  // Process questions
  process: [
    /how.*do.*you.*work|process.*follow|your.*methodology/i,
    /what.*happens.*during.*install.*process|steps.*involved/i,
    /how.*long.*does.*it.*take|duration.*estimate|time.*required/i,
    /do.*you.*clean.*up|cleanup.*process|leave.*space.*clean/i,
    /warranty.*included|guarantee.*covered|work.*backed/i,
  ],

  // Support questions
  support: [
    /help.*needed|need.*assistance|support.*request|customer.*support/i,
    /technical.*issue|problem.*with.*installation/i,
    /after.*sale.*service|follow.*up.*support/i,
    /warranty.*claim|file.*claim|service.*issue/i,
    /billing.*issue|payment.*question|invoice.*inquiry/i,
    /complaint.*resolution|dispute.*resolution/i,
  ],

  // Website features
  features: [
    /what.*this.*site|about.*this.*website|tell.*about.*site/i,
    /book.*appointment|can.*i.*book.*online|online.*booking/i,
    /get.*quote.*can.*i.*get.*estimate|request.*quote/i,
    /view.*projects|portfolio.*gallery|show.*your.*work/i,
    /leave.*review|submit.*feedback|write.*review/i,
    /file.*complaint|issue.*report/i,
  ],

  // Emergency questions
  emergency: [
    /emergency.*electrical|power.*outage.*emergency|urgent.*need.*help/i,
    /24.*hour.*service|middle.*of.*night|late.*night.*electric/i,
    /weekend.*available|available.*weekend|open.*weekend/i,
    /after.*hours.*support.*late.*support.*available/i,
  ],

  // Technology questions
  technology: [
    /smart.*home|automation.*technology|modern.*electrical/i,
    /ev.*charger|tesla.*charger|electric.*vehicle.*charging/i,
    /wifi.*install|network.*setup|internet.*installation/i,
    /code.*compliance|electrical.*codes|meeting.*standards/i,
  ],

  // Comparison questions
  comparison: [
    /why.*choose.*you|why.*you.*over.*others|competitor.*comparison/i,
    /better.*than.*competitors|superior.*service/i,
    /what.*makes.*you.*different|different.*from.*others/i,
    /vs.*other.*electricians|compared.*to/i,
  ],
};

// Fuzzy matching function for intent recognition
function calculateSimilarity(text: string, pattern: RegExp): number {
  const match = text.match(pattern);
  if (!match) return 0;
  const matchLength = match[0].length;
  const textLength = text.length;
  return (matchLength / textLength) * 100;
}

// Find best matching intent
function findBestIntent(userMessage: string): { intent: string; confidence: number; category?: string } | null {
  let bestMatch: { intent: string; confidence: number; category?: string } = { intent: 'general', confidence: 0 };

  for (const [category, patterns] of Object.entries(intentPatterns)) {
    for (const pattern of patterns) {
      const similarity = calculateSimilarity(userMessage, pattern);
      if (similarity > bestMatch.confidence) {
        bestMatch = { intent: category, confidence: similarity, category };
      }
    }
  }

  return bestMatch.confidence > 30 ? bestMatch : null;
}

// Get contextual response based on intent
function getContextualResponse(intent: string, userMessage: string): string | null {
  const { services: knowledgeServices, company, contact, serviceAreas, testimonials: knowledgeReviews } = knowledgeBase;

  switch (intent) {
    case 'pricing':
      const serviceMentioned = services.find((s) =>
        userMessage.toLowerCase().includes(s.title.toLowerCase().split(' ').slice(-1)[0]?.replace('?', ''))
      );
      if (serviceMentioned) {
        return `Our ${serviceMentioned.title} ranges from ${serviceMentioned.priceRange}. Factors include: project complexity, materials, and urgency. Would you like a detailed quote?`;
      }
      return `Our services range from $100 (outlets) to $3,000 (full renovations). We provide free quotes with transparent pricing. What service are you interested in?`;

    case 'availability':
      const areaMentioned = serviceAreas.find((a) =>
        userMessage.toLowerCase().includes(a.name.toLowerCase())
      );
      if (areaMentioned) {
        return `Yes, we serve ${areaMentioned.name}. ${areaMentioned.coverage}. ${areaMentioned.priority} priority with ${areaMentioned.emergencyAvailable ? '24/7 emergency support' : ''}.`;
      }
      return `We're available today! Same-day and next-day availability in most DFW cities. 24/7 emergency service available. Where are you located?`;

    case 'services':
      return `We offer 6 main services:\n\n• Chandelier Installation ($150-$500)\n• EV Charger Installation ($300-$800)\n• Smart Switches ($100-$400)\n• Outlet & Circuit Work ($100-$350)\n• Electrical Renovation ($500-$3,000)\n• Range Hood Wiring ($150-$400)\n\nAll include 1-year labor warranty. Which interests you?`;

    case 'areas':
      return `We serve 16 cities in the Dallas-Fort Worth metroplex:\n\nLewisville, Frisco, McKinney, Plano, Dallas, Prosper, Allen, Carrollton, Richardson, Addison, Garland, Irving, Flower Mound, Southlake, Celina, and The Colony.\n\nWe offer same-day and next-day availability in all areas.`;

    case 'credentials':
      return `Yes! Manaseerz Electric is fully licensed and insured in Texas. Our team consists of certified electrical professionals. License number available upon request. Your project is protected with our comprehensive insurance coverage.`;

    case 'contact':
      return `You can reach us:\n\n• Phone: ${contact.phone}\n• Email: ${contact.email}\n• Location: ${contact.address}\n• Emergency: 24/7 service available\n• Response time: ${contact.responseTime.standard}\n\nWe typically respond within 1-2 business days for standard inquiries.`;

    case 'reviews':
      const avgRating = company.stats.rating;
      const totalReviews = company.stats.totalReviews;
      const topProject = knowledgeReviews.sort((a, b) => b.rating - a.rating)[0];
      return `We're proud of our ${avgRating} average rating from ${totalReviews} reviews across all platforms.\n\nOur most-reviewed project is "${topProject.project}" from ${topProject.location}.\n\nWould you like to read more reviews?`;

    case 'process':
      return `Our process is simple and transparent:\n\n1. Contact us for a free estimate\n2. Schedule a convenient time\n3. Our licensed technicians arrive on time\n4. Complete work with precision and care\n5. Clean up and ensure satisfaction\n6. Enjoy your new electrical installation\n\nAll work includes 1-year labor warranty.`;

    case 'support':
      return `We're here to help! Common support areas we handle:\n\n• Technical troubleshooting\n• Warranty claims\n• Follow-up support\n• Billing inquiries\n• Schedule changes\n• Emergency services\n\nWhat do you need help with?`;

    case 'emergency':
      return `I understand you need emergency electrical service.\n\n📞 Call Now: ${contact.phone}\n🚀 Available 24/7 for electrical emergencies\n⚡ Average response: 30-60 minutes\n\nFor immediate assistance, please call us directly at ${contact.phone}.`;

    case 'technology':
      const techServices = knowledgeServices.filter((s) =>
        s.id.includes('smart') || s.id.includes('ev') || s.id.includes('outlet')
      );
      const techList = techServices.map((s) => `• ${s.name}`).join('\n');
      return `We specialize in modern electrical technologies:\n\n${techList}\n\nWe keep up with the latest technologies and codes to provide you with modern, efficient, and safe electrical solutions.`;

    case 'comparison':
      return `What makes Manaseerz Electric different:\n\n✅ Same-day and next-day availability\n✅ 5-year track record with 500+ projects\n✅ 5-star customer rating (127+ reviews)\n✅ Licensed and insured\n✅ 1-year labor warranty on all installations\n✅ Transparent pricing with no hidden fees\n✅ Clean and professional work\n\nWe're not just another electrical company. We're your trusted partners in electrical excellence.`;

    case 'features':
      return `Our website offers:\n\n✅ Multi-step appointment booking system\n✅ Real-time pricing calculator\n✅ Interactive service areas map\n✅ Customer reviews and testimonials\n✅ Comprehensive FAQ section\n✅ Portfolio showcasing completed projects\n✅ Secure contact forms with validation\n✅ 24/7 emergency support\n✅ Mobile-responsive design\n✅ Professional Tesla-inspired aesthetics\n\nExplore all our features!`;

    case 'book-appointment':
      return `Great! I can help you book an appointment.\n\nWe offer a 5-step booking process:\n1. Select your service\n2. Choose a date\n3. Pick a time slot\n4. Provide your details\n5. Get confirmation\n\n📅 <a href="/book-appointment" style="color: var(--color-gold-primary); text-decoration: underline;">Start booking here</a>\n\nOr call us directly: ${contact.phone}`;

    default:
      return null;
  }
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'bot',
      content: "👋 Hi there! I'm the Manaseerz Electric assistant. I can help you with services, pricing, bookings, or answer any questions. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [quickReplies, setQuickReplies] = useState<string[]>([]);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Process user message and generate response
  const processUserMessage = useCallback(async (content: string) => {
    const userMessage = content.toLowerCase().trim();
    const intentMatch = findBestIntent(userMessage);

    let response: string;

    if (intentMatch) {
      response = getContextualResponse(intentMatch.intent, userMessage) || '';
      trackConversion('form_submission', 'Chatbot - Intent Matched');
    } else if (content.includes('thank')) {
      response = "You're welcome! Is there anything else I can help you with?";
    } else if (content.includes('bye') || content.includes('goodbye') || content.includes('see ya') || content.includes('later')) {
      response = "Thank you for chatting with us! Feel free to come back anytime. We're here to help with all your electrical needs. Have a great day! 🌟";
      trackConversion('form_submission', 'Chatbot - Goodbye');
    } else {
      response = getGeneralResponse(userMessage, knowledgeBase);
      trackConversion('form_submission', 'Chatbot - General Query');
    }

    // Add bot response
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'bot',
      content: response,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMessage]);

    // Add relevant quick replies
    const relevantQuickReplies = getQuickReplies(intentMatch?.intent || null, knowledgeBase);
    if (relevantQuickReplies.length > 0 && relevantQuickReplies.length <= 4) {
      setQuickReplies(relevantQuickReplies);
      setShowQuickReplies(true);
    }
  }, []);

  // Add user message
  const addUserMessage = useCallback((content: string, action?: 'book' | 'contact' | 'call' | 'navigate' | 'schedule') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
      action,
    };

    setMessages((prev) => [...prev, newMessage]);

    if (action) {
      trackConversion('form_submission', action);
    }

    setIsTyping(false);
    setInputValue('');

    // Process user message
    setTimeout(() => {
      processUserMessage(content);
    }, 600);
  }, [processUserMessage]);

  // Handle quick reply
  const handleQuickReply = useCallback((reply: string, action?: 'book' | 'contact' | 'call' | 'navigate' | 'schedule') => {
    addUserMessage(reply, action);
    setShowQuickReplies(false);

    setTimeout(() => {
      setShowQuickReplies(true);
    }, 2000);
  }, [addUserMessage]);

  // Get appropriate quick replies based on context
  function getQuickReplies(intent: string | null, context: typeof knowledgeBase): string[] {
    if (!intent) return [];

    const { services: contextServices, serviceAreas: contextAreas } = context;

    switch (intent) {
      case 'pricing':
        return [
          'Get a detailed quote',
          'Which service interests you?',
          'What\'s your budget range?',
        ];

      case 'availability':
        return [
          'Check my area availability',
          'Same-day service?',
          'Emergency support?',
        ];

      case 'services':
        return contextServices.slice(0, 4).map((s) => s.name);

      case 'areas':
        return contextAreas.slice(0, 4).map((a) => a.name);

      case 'credentials':
        return [
          'Check license status',
          'Insurance verification',
          'Background check',
        ];

      case 'contact':
        return [
          'Get a free quote',
          'Call for immediate help',
          'Email us details',
        ];

      case 'reviews':
        return [
          'Read customer reviews',
          'Share your experience',
          'Write a review',
        ];

      case 'process':
        return [
          'How it works',
          'Booking process',
          'Timeline estimate',
        ];

      case 'support':
        return [
          'Technical support',
          'Warranty claim',
          'Billing inquiry',
        ];

      case 'emergency':
        return [
          'Call emergency line',
          '24/7 support',
          'Request emergency service',
        ];

      case 'technology':
        return [
          'EV charger expertise',
          'Smart home systems',
          'Code compliance',
        ];

      case 'comparison':
        return [
          'Why choose us',
          'Our advantages',
          'See what clients say',
        ];

      case 'features':
        return [
          'Appointment booking',
          'Pricing calculator',
          'Service map',
        ];

      case 'book-appointment':
        return ['Start booking', 'Book appointment', 'Schedule service'];

      default:
        return [
          'Get a free quote',
          'View our services',
          'See our work',
        ];
    }
  }

  // Get general response for unmatched queries
  function getGeneralResponse(userMessage: string, context: typeof knowledgeBase): string {
    const { faqs, contact, company, serviceAreas, testimonials: contextReviews } = context;

    // Check for specific keyword matches
    if (userMessage.includes('hello') || userMessage.includes('hi') || userMessage.includes('hey')) {
      return `Welcome to ${company.name}! I'm here to help you find the right electrical solution for your needs. What project can we assist you with today?`;
    }

    if (userMessage.includes('appointment') || userMessage.includes('book')) {
      return `Great! I can help you book an appointment. We offer same-day and next-day availability. You can book online at /book-appointment or call ${contact.phone}. What type of service are you interested in?`;
    }

    if (userMessage.includes('quote') || userMessage.includes('price') || userMessage.includes('cost')) {
      return `I can help you get a free quote! We provide transparent pricing for all our services. Our most popular services include: EV charger installation ($300-$800), Chandelier installation ($150-$500), Smart home integration ($100-$400), and complete renovations ($500-$3,000). Would you like a detailed estimate for a specific project?`;
    }

    if (userMessage.includes('review') || userMessage.includes('feedback') || userMessage.includes('testimonial')) {
      return `We're proud of our 5-star rating from 127 customers! Here's what some of our clients say:\n\n"${contextReviews[0].text}" - ${contextReviews[0].name}, ${contextReviews[0].city}\n"${contextReviews[1].text}" - ${contextReviews[1].name}, ${contextReviews[1].city}\n\nWould you like to read more reviews or share your experience?`;
    }

    if (userMessage.includes('area') || userMessage.includes('city') || userMessage.includes('where') || userMessage.includes('served')) {
      return `We serve the entire DFW metroplex, including: ${serviceAreas.slice(0, 6).map((a) => a.name).join(', ')}. We offer same-day and next-day service. Which city are you in?`;
    }

    if (userMessage.includes('service') || userMessage.includes('offer') || userMessage.includes('provide')) {
      return `We offer 6 main electrical services:\n\n1. Chandelier Installation ($150-$500)\n2. EV Charger Installation ($300-$800)\n3. Smart Switches ($100-$400)\n4. Outlet & Circuit Work ($100-$350)\n5. Electrical Renovation ($500-$3,000)\n6. Range Hood Wiring ($150-$400)\n\nAll include 1-year labor warranty. Which service are you interested in learning more about?`;
    }

    if (userMessage.includes('license') || userMessage.includes('insured') || userMessage.includes('certified')) {
      return `${company.license}. Our team consists of certified electrical professionals. We maintain comprehensive insurance coverage. Would you like verification details?`;
    }

    if (userMessage.includes('emergency') || userMessage.includes('urgent') || userMessage.includes('24/7') || userMessage.includes('late night')) {
      return `I understand you need emergency electrical service. 🚨\n\n📞 Call Emergency: ${contact.phone}\n⚡ Response Time: 30-60 minutes\n🔧 Available 24/7 for electrical emergencies\n\nFor immediate assistance, please call us directly at ${contact.phone}.`;
    }

    if (userMessage.includes('call') || userMessage.includes('phone') || userMessage.includes('number')) {
      return `Call us at ${contact.phone}. We're available Mon-Sat 7AM-7PM and 24/7 for emergencies. Or fill out our contact form and we'll get back to you within 1-2 business days.`;
    }

    if (userMessage.includes('email') || userMessage.includes('mail') || userMessage.includes('message')) {
      return `Email us at ${contact.email}. We typically respond within 24 hours. For urgent matters, please call us at ${contact.phone}.`;
    }

    if (userMessage.includes('about') || userMessage.includes('company') || userMessage.includes('business')) {
      return `${company.name} has ${company.stats.yearsExperience}+ years of experience with ${company.stats.projectsCompleted}+ completed projects and ${company.stats.happyCustomers}+ happy customers. We're based in ${company.baseLocation} and serve ${company.stats.citiesServed} cities. We're fully licensed and insured. Would you like to know more about our company story, mission, or values?`;
    }

    // Find relevant FAQ
    const relevantFaq = faqs.find((faq) =>
      userMessage.toLowerCase().includes(faq.question.toLowerCase().split(' ').slice(-3).join(' ')) ||
      faq.answer.toLowerCase().includes(userMessage.toLowerCase()) ||
      faq.category.toLowerCase().includes(userMessage.toLowerCase())
    );

    if (relevantFaq) {
      return `FAQ Answer:\n\n${relevantFaq.answer}\n\n${relevantFaq.category === 'availability' ? 'We offer same-day/next-day service with 24/7 emergency support available.' : ''}`;
    }

    // Default general response
    return `I can help you with:\n\n**Services:** Chandelier installation, EV chargers, smart homes, outlets, renovations, range hoods\n**Bookings:** Multi-step online booking system\n**Pricing:** Free quotes with transparent pricing\n**Support:** 24/7 emergency service available\n**Reviews:** 5-star rating from 127 customers\n**Areas:** Serving 16 DFW cities\n\nWhat would you like to explore? I can:\n• Help you find the right service\n• Provide pricing information\n• Book an appointment\n• Answer questions about our services\n• Navigate you to the right page`;
  }

  // Handle message submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addUserMessage(inputValue);
  };

  // Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (inputValue.trim()) {
        addUserMessage(inputValue);
      }
    }
  };

  // Open chat widget
  const openChat = () => {
    setIsOpen(true);
    setIsMinimized(false);
    trackCTAClick('Chatbot - Open Chat Widget', 'Chatbot');
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={openChat}
        className={cn(
          "fixed bottom-6 right-6 z-[1080] group",
          "rounded-2xl p-4 shadow-2xl",
          isMinimized
            ? "bg-[var(--color-surface-800)]/95"
            : "bg-[var(--color-gold-primary)] shadow-[var(--shadow-gold)]",
          "transition-all duration-300"
        )}
        aria-label="Open chat"
      >
        <motion.div className="relative">
          {isMinimized ? (
            <MessageSquare className="h-6 w-6 text-[var(--color-text-primary)]" />
          ) : (
            <>
              <MessageSquare className="h-6 w-6 text-[var(--color-black-pure)]" />
              {isOpen && (
                <div className="absolute -top-16 -right-16 bg-[var(--color-black-pure)] rounded-lg shadow-2xl p-2 border border-[var(--color-surface-800)]">
                  <div className="text-[var(--color-text-primary)] text-xs whitespace-nowrap">
                    Chat
                  </div>
                </div>
              )}
            </>
          )}
        </motion.div>
      </motion.button>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-[1070] w-full max-w-[420px] bg-[var(--color-surface-900)]/95 border border-[var(--color-surface-800)] rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-[var(--color-surface-800)]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 rounded-full bg-[var(--color-gold-primary)] flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-[var(--color-black-pure)]" />
                </div>
                <span className="text-[var(--color-text-primary)] font-semibold">
                  Manaseerz Assistant
                </span>
              </div>
              <button
                onClick={closeChat}
                className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="h-[calc(100vh-400px)] overflow-y-auto p-4 space-y-4" ref={messagesEndRef}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className={cn(
                    "flex gap-3",
                    message.role === 'user' ? 'flex-row' : 'flex-row-reverse'
                  )}
                >
                  {message.role === 'user' ? (
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-[var(--color-gold-primary)] flex items-center justify-center">
                        <span className="text-xs font-bold text-[var(--color-black-pure)]">U</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-[var(--color-surface-800)] flex items-center justify-center">
                        <span className="text-xs font-semibold text-[var(--color-gold-primary)]">M</span>
                      </div>
                    </div>
                  )}
                  <div className={cn(
                    "max-w-[85%] px-4 py-3 rounded-lg",
                    message.role === 'user'
                      ? 'bg-[var(--color-gold-primary)]/20 border border-[var(--color-gold-primary)]/30 text-[var(--color-black-pure)]'
                      : 'bg-[var(--color-surface-800)] border-[var(--color-surface-800)] text-[var(--color-text-primary)]'
                  )}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  className="flex items-center gap-2 text-[var(--color-text-muted)] text-sm px-4 py-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="h-4 w-4 border-2 border-[var(--color-gold-primary)] border-t-transparent border-b-transparent rounded-full animate-spin" />
                  <span>Thinking...</span>
                </motion.div>
              )}
            </div>

            {/* Quick Replies */}
            {showQuickReplies && quickReplies.length > 0 && (
              <div className="p-4 border-t border-[var(--color-surface-800)]">
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleQuickReply(reply)}
                      className="px-3 py-1.5 rounded-lg bg-[var(--color-gold-primary)]/10 border border-[var(--color-gold-primary)]/20 text-[var(--color-gold-primary)] text-xs font-medium transition-all hover:bg-[var(--color-gold-primary)] hover:text-[var(--color-black-pure)] hover:shadow-[var(--shadow-gold)]"
                    >
                      {reply}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-[var(--color-surface-800)]">
              <form onSubmit={handleSubmit}>
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 rounded-lg bg-[var(--color-surface-800)] border border-[var(--color-surface-700)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:border-[var(--color-gold-primary)] focus:ring-2 focus:ring-[var(--color-gold-primary)]/20 transition-all outline-none resize-none"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="px-6 py-3 rounded-lg bg-[var(--color-gold-primary)] text-[var(--color-black-pure)] font-medium transition-all hover:bg-[var(--color-gold-light)] hover:shadow-[var(--shadow-gold)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send</span>
                  </motion.button>
                </div>
              </form>
              <p className="text-xs text-[var(--color-text-muted)] mt-2">
                Powered by Manaseerz Electric • Serving DFW Metroplex Since 2019
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}