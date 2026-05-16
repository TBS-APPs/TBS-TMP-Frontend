export interface AddActionResult<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface DeleteActionResult<T> {
  success: boolean;
  message?: string;
  data?: T;
}