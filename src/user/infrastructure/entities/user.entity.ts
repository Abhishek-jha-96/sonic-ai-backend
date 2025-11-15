import { Prisma } from '@prisma/client';

export type UserEntity = Prisma.UserGetPayload<{}>;
