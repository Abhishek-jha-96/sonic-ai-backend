export enum AuthProvider {
  EMAIL = 'email',
  GOOGLE_AUTH = 'google_auth',
}

export class User {
  constructor(
    public readonly id: string,
    public name: string,
    public readonly email: string,
    public readonly auth_provider: AuthProvider,
    public readonly is_verified: boolean,
    public readonly created_at: Date,
    public readonly modified_at: Date,
  ) {}
}
