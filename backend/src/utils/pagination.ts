export interface PaginationOptions {
  page?: number;
  limit?: number;
}

export interface PaginationResult {
  page: number;
  limit: number;
  skip: number;
}


export const getPagination = (
  options: PaginationOptions
): PaginationResult => {

  const page =
    Number(options.page) > 0
      ? Number(options.page)
      : 1;


  const limit =
    Number(options.limit) > 0
      ? Math.min(Number(options.limit), 100)
      : 10;


  const skip = (page - 1) * limit;


  return {
    page,
    limit,
    skip,
  };
};