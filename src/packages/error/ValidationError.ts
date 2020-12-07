export interface HttpArmoldError {
  id: string;
  status: number;
  message?: string;
  errors?: ArmoldError[];
}

export interface ArmoldError {
  detail?: string;
  code: string;
}
