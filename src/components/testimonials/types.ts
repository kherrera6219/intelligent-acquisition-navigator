
export interface TestimonialData {
  name: string;
  role: string;
  organization: string;
  content: string;
  image: string;
  score: number;
  sector: 'federal' | 'state' | 'local';
  featured: boolean;
}
