import { Module } from '@nestjs/common';
import { RelationalPersistenceModule } from './infrastructure/persistence/relational-persistence.module';
import { UserModule } from './user/module';

@Module({
  imports: [
    RelationalPersistenceModule,
    UserModule
  ],
})
export class AppModule {}
