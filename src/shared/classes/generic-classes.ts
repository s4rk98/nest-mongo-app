export class GenericResponseClass<T> {
  constructor(
    public data: T[] = [],
    public statusCode: number = 200,
    public success: boolean = true,
    public message: string = '',
  ) {}
}
