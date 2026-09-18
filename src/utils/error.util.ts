export class ProfileConflictError extends Error {
  constructor(
    message: string,
    public readonly fieldErrors: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ProfileConflictError';
  }
}
