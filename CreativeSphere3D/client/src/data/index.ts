
import { ProjectType, GalleryItemType, SkillCategory } from "@/types";

export const projects: ProjectType[] = [
  {
    id: 11,
    title: "AWS KENDRA SEARCH ENGINE",
    description: "Built a powerful search engine using AWS Kendra without writing code. Features intelligent search capabilities with FAQs and synonyms integration, powered by AWS S3 and Kendra's smart indexing.",
    image: "https://images.unsplash.com/photo-1549605659-32d82da3a059?auto=format&q=80",
    category: "Cloud",
    technologies: ["AWS Kendra", "AWS S3", "Cloud Search"],
    links: {
      github: "https://github.com/sarankumar1325/CLOUD-PROJECTS/tree/main/SEARCH%20ENGINE",
      live: "#",
    },
    color: "primary",
  },
  {
    id: 12,
    title: "MIRROR MEMORY",
    description: "Advanced AI agent architecture using PEFT-Driven tuning and enhanced memory layers. Features multi-step reasoning and self-validating loops for improved context retention and decision making.",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&q=80",
    category: "AI Architecture",
    technologies: ["PEFT", "LLM", "Memory Systems"],
    links: {
      github: "#",
      live: "#",
    },
    color: "accent",
  },
  {
    id: 1,
    title: "EMAIL SPAM CLASSIFIER",
    description: "LSTM-based Classifier utilizing Long Short-Term Memory networks for sequential pattern recognition in email content. Implements Support Vector Machines for efficient email spam detection based on distinct feature mapping.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&q=80",
    category: "Machine Learning",
    technologies: ["LSTM", "SVM", "Python", "ML"],
    links: {
      github: "https://github.com/sarankumar1325/TRS_EMAIL_SPAM_CLASSIFIER",
      live: "#",
    },
    color: "primary",
  },
  {
    id: 2,
    title: "AUTISM DETECTION",
    description: "Machine learning model for autism detection using Intel OneAPI extension for scikit-learn. Achieves 1.73x faster processing speed through optimized implementation.",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&q=80",
    category: "Healthcare AI",
    technologies: ["Intel OneAPI", "scikit-learn", "Python"],
    links: {
      github: "https://github.com/sarankumar1325/AUTISM-DETECTION-WITH-INTEL-ONEAPI",
      live: "#",
    },
    color: "accent",
  },
  {
    id: 3,
    title: "ONCONET",
    description: "Deep learning models for accurate lung cancer detection using hybrid neural network architectures. Implements CNNs for lung cancer prediction to enhance diagnosis accuracy.",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&q=80",
    category: "Healthcare AI",
    technologies: ["Deep Learning", "CNN", "Python"],
    links: {
      github: "https://github.com/sarankumar1325/ONCONET",
      live: "#",
    },
    color: "teal",
  },
  {
    id: 4,
    title: "WEATHERMATE AI",
    description: "Intelligent weather agent built with Lyzr framework, leveraging Gemini API and OpenWeather API. Provides personalized recommendations based on current weather conditions.",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&q=80",
    category: "AI Agent",
    technologies: ["Lyzr", "Gemini API", "OpenWeather API"],
    links: {
      live: "https://weathermateai.netlify.app/",
      github: "https://github.com/sarankumar1325/WEATHERMATE-AI",
    },
    color: "primary",
  },
  {
    id: 5,
    title: "FIEZZO",
    description: "Event management system with AI-powered retrieval techniques for enhanced information accessibility. Features optimized user interface for seamless interaction.",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&q=80",
    category: "Web App",
    technologies: ["AI", "UI/UX", "Web Development"],
    links: {
      live: "https://kpriet.ac.in/fiezzo",
      github: "#",
    },
    color: "secondary",
  },
  {
    id: 6,
    title: "WEALTHSENSE AI",
    description: "AI-powered stock analysis and recommendation system using intelligent agents. Provides data-driven insights for making informed investment decisions.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&q=80",
    category: "FinTech",
    technologies: ["AI Agents", "Financial Analysis", "ML"],
    links: {
      github: "#",
      live: "#",
    },
    color: "accent",
  },
  {
    id: 7,
    title: "TAXBUDDY AI",
    description: "Intelligent tax assistant for Indian tax filing, featuring automated calculations, compliance checks, and personalized recommendations for tax savings.",
    image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&q=80",
    category: "FinTech",
    technologies: ["AI", "Tax Automation", "Web Development"],
    links: {
      github: "https://github.com/sarankumar1325/TaxBuddy-Tax-Assistent",
      live: "#",
    },
    color: "primary",
  },
  {
    id: 8,
    title: "THINKBLOOM",
    description: "AI-powered notes application designed to help users organize, study, and maximize productivity. Features advanced AI capabilities for enhanced note management.",
    image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&q=80",
    category: "Productivity",
    technologies: ["TypeScript", "AI", "CSS"],
    links: {
      live: "https://thinkbloom.lovable.app/",
      github: "https://github.com/sarankumar1325/THINKBLOOM",
    },
    color: "teal",
  },
  {
    id: 9,
    title: "JOB-INSIGHT",
    description: "AI-driven web application providing job insights, career advice, and tailored resume generation. Powered by Lyzr AI for job analysis and ATS-friendly resume creation.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&q=80",
    category: "Career Tech",
    technologies: ["Lyzr AI", "Web Development"],
    links: {
      live: "https://lnkd.in/g-F3eWRW",
      github: "https://github.com/sarankumar1325/JOB-INSIGHT",
    },
    color: "secondary",
  },
  {
    id: 10,
    title: "ROASTMYCV",
    description: "Smart, AI-powered application designed to analyze, critique, and enhance resumes in real time. Offers detailed feedback on formatting, content, and industry relevance.",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&q=80",
    category: "AI Tool",
    technologies: ["TypeScript", "AI", "CSS"],
    links: {
      live: "http://resumeroaster.lovable.app",
      github: "#",
    },
    color: "accent",
  }
];

export const galleryItems: GalleryItemType[] = [
  {
    id: 1,
    title: "Dashboard Design",
    category: "UI/UX Project",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&q=80",
  },
  {
    id: 2,
    title: "Mobile App",
    category: "React Native Project",
    image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&q=80",
  },
  {
    id: 3,
    title: "3D Game Assets",
    category: "Three.js Project",
    image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&q=80",
  },
  {
    id: 4,
    title: "AR Experience",
    category: "WebXR Project",
    image: "https://images.unsplash.com/photo-1536148935331-408321065b18?auto=format&q=80",
  },
  {
    id: 5,
    title: "Team Dashboard",
    category: "Full-Stack Project",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&q=80",
  },
];

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/yourusername",
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/yourusername",
    icon: "linkedin",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/yourusername",
    icon: "twitter",
  },
  {
    name: "Instagram",
    url: "https://instagram.com/yourusername",
    icon: "instagram",
  },
];
