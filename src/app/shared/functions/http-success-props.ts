import { RequestResponse } from '../interfaces';

export const httpSuccessProps = <T>() => {
  return (res: RequestResponse<T>) => ({
    data: res.data,
    success: true,
    message: res.message,
  });
};
