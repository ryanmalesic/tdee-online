type ApiError = {
  code: number;
  message: string;
  description: string;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isApiError(arg: any): arg is ApiError {
  return arg.code !== undefined && arg.message !== undefined && arg.description !== undefined;
}

export default ApiError;
