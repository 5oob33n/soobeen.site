
export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  imageUrl: string;
  galleryUrls?: string[];
  videoUrl?: string;
  audioUrl?: string;
  projectType?: string;
  location?: string;
  materials?: string;
  materialsKo?: string;
  exhibition?: string;
  credits?: string;
  // Korean translations
  titleKo?: string;
  categoryKo?: string;
  descriptionKo?: string;
}

export interface MenuItem {
  label: string;
  id: string;
}

export interface CVItem {
  year: string | number;
  title: string;
  description?: string;
  location?: string;
  company?: string;
  position?: string;
  degree?: string;
  school?: string;
}

export type AsciiCharSet = 'density' | 'binary' | 'blocks';