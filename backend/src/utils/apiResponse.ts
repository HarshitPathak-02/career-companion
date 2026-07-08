export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  pagination?: PaginationMeta;
  errors?: unknown;
}

export interface PaginationMeta {

  page: number;

  limit: number;

  total: number;

  pages: number;

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

export const paginatedResponse = <T>(
  message: string,
  data: T,
  pagination: PaginationMeta
) => {

  return {
    success: true,
    message,
    data,
    pagination,
  };

};

