import { HttpErrorResponse } from '@angular/common/http';

export const httpErrorProps = () => {
  return (res: {
    error: HttpErrorResponse;
    success?: boolean;
  }) => ({
    error: res.error,
    success: res.success ?? false,
  });
};
