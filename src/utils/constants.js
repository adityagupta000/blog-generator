// src/utils/constants.js

export const EXAMPLE_PROMPTS = [
  "The impact of artificial intelligence on modern healthcare",
  "Sustainable living practices for urban environments",
  "The future of remote work and digital nomadism",
  "Blockchain technology and its real-world applications"
];

export const FEATURES = [
  {
    title: '1000+ Words',
    description: 'Comprehensive blog posts with rich content',
    icon: 'FileText'
  },
  {
    title: 'AI-Powered',
    description: 'Advanced language model for quality output',
    icon: 'Sparkles'
  },
  {
    title: 'Lightning Fast',
    description: 'Generate blogs in 5-10 seconds',
    icon: 'Zap'
  },
  {
    title: 'Pro Formatting',
    description: 'Perfect structure with markdown support',
    icon: 'CheckCircle'
  }
];

export const PROMPT_CONFIG = {
  MIN_LENGTH: 10,
  MAX_LENGTH: 1000,
  PLACEHOLDER: "Example: Write a comprehensive guide about the benefits of meditation, including scientific evidence, different meditation techniques, tips for beginners, and how to build a consistent practice..."
};

export const API_CONFIG = {
  ENDPOINT: import.meta.env.VITE_API_ENDPOINT || '/api/generate-blog',
  TIMEOUT: 30000
};