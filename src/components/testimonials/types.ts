
export type TestimonialSector = 'local' | 'federal' | 'state' | 'private' | 'education' | 'healthcare';

export interface TestimonialData {
  name: string;
  role: string;
  organization: string;
  content: string;
  image: string;
  score: number;
  sector: TestimonialSector;
  featured: boolean;
}
