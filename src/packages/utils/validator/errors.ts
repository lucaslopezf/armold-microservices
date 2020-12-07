export interface ValidationError {
  code: string;
  message: { [type: string]: string } | undefined | string;
  property?: string;
}
