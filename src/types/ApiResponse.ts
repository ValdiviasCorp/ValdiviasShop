export interface SuccessResponse<T> {
  status: true;
  data: T;
  message?: string;
}

export interface ErrorResponse {
  status: false;
  message: string;
  data?: never;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;