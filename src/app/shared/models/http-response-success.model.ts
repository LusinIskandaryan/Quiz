export class HttpResponseSuccessModel<T> {
  readonly message: string = '';
  readonly success: boolean = true;
  constructor(public readonly data: T, message: string) {
    this.data = data;
    this.message = message;
  }
}
