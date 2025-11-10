import { Module } from '@nestjs/common';
import { RelationalPersistenceModule } from './infrastructure/persistence/relational-persistence.module';

@Module({
  imports: [RelationalPersistenceModule],
})
export class AppModule {}
