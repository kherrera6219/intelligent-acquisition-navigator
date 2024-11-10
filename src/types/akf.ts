export interface AKFComponent {
  name: string;
  description: string;
}

export interface AKFSection {
  key: string;
  title: string;
  formula: string;
  description: string;
  icon: React.ReactNode;
  components: AKFComponent[];
}

export interface Relationship {
  from: string;
  to: string;
  description: string;
}

export type ChartType = 'line' | 'bar';