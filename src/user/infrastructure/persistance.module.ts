import { Module } from '@nestjs/common';
import { UserRepositoryPort } from './user.port';
import { UserRepositoryAdapter } from './repository/user.adapter';

@Module({
  providers: [
    {
      provide: UserRepositoryPort,
      useClass: UserRepositoryAdapter,
    },
  ],
  exports: [UserRepositoryPort],
})
export class UserPersistenceModule {}