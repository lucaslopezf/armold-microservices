export interface ValidationError {
  code: string;
  message?: { [type: string]: string } | string;
  property?: string;
}
