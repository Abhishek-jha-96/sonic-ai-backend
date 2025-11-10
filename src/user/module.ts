import { Module } from '@nestjs/common';
import { UserController } from './controller';
import { UserService } from './service';
import { PrismaService } from 'src/infrastructure/persistence/prisma.service';
import { UserPersistenceModule } from './infrastructure/module';

@Module({
  imports: [UserPersistenceModule],
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService, UserPersistenceModule],
})
export class UserModule {}
