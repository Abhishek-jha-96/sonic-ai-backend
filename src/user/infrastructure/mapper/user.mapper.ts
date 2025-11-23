import { User as PrismaUser } from '@prisma/client';
import { AuthProvider, User } from 'src/user/domain/user';

export class UserMapper {
  static toDomain(prismaUser: PrismaUser): User {
    return new User(
      prismaUser.id,
      prismaUser.name,
      prismaUser.email,
      prismaUser.auth_provider as AuthProvider,
      prismaUser.is_verified,
      prismaUser.created_at,
      prismaUser.modified_at,
      prismaUser.password || undefined,
    );
  }
}
