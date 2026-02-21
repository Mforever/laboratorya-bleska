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

export interface GalleryItem {
  id: number;
  category: 'polish' | 'ceramic' | 'ppf';
  title: string;
  beforeAfter: 'До/После' | 'После';
  image: string;
  carModel: string;
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
  email?: string;
  message?: string;
  selectedZones?: string;
  totalPrice?: number;
}