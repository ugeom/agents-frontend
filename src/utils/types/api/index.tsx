// API related types
export interface RagApiResponse {
  answer: string;
  confidence?: number;
  sources?: string[];
}

export interface GoogleApiResponse {
  results: any[];
  status: string;
}

export interface StylesApiResponse {
  styles: any[];
}