// src/types/index.ts
export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  link: string;
}

export interface Advantage {
  icon: string;
  title: string;
  description: string;
}

export interface Review {
  id: number;
  name: string;
  photo: string;
  text: string;
  carModel: string;
  rating: number;
}

export type MediaType = 'image' | 'video';

export interface GalleryItem {
  id: number;
  title: string;
  carModel: string;
  mediaType: MediaType;
  // Для изображений
  beforeImage?: string;
  afterImage?: string;
  // Для видео
  videoUrl?: string;
  videoPlatform?: 'vk' | 'rutube';
  videoThumbnail?: string;
  description?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CarZone {
  id: string;
  name: string;
  price: number;
  coordinates?: string;
}

export interface ContactFormData {
  name: string;
  phone: string;
  car?: string;
  service?: string;
  message?: string;
  selectedZones?: string;
  totalPrice?: number;
}