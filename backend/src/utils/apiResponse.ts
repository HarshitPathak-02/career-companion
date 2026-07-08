export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export const successResponse = <T>(
  message: string,
  data?: T
): ApiResponse<T> => {
  if (data === undefined) {
    return {
      success: true,
      message,
    };
  }

  return {
    success: true,
    message,
    data,
  };
};

export const errorResponse = (
  message: string
): ApiResponse => {
  return {
    success: false,
    message,
  };
};