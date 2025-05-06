export interface ProjectType {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  links: {
    live: string;
    github: string;
  };
  color: 'primary' | 'secondary' | 'accent' | 'teal';
}

export interface SkillType {
  name: string;
  level: number;
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: JSX.Element;
  color: 'primary' | 'secondary' | 'accent' | 'teal';
  skills: SkillType[];
}

export interface GalleryItemType {
  id: number;
  title: string;
  category: string;
  image: string;
}

export interface ContactFormType {
  name: string;
  email: string;
  subject: string;
  message: string;
}
