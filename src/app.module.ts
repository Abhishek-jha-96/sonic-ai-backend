import { Module } from '@nestjs/common';
import { RelationalPersistenceModule } from './infrastructure/persistence/relational-persistence.module';
import { UserModule } from './user/module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    RelationalPersistenceModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule { }
