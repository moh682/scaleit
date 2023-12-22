import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { users } from '@/server/db/schema';
import { eq } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';
import { hashPassword } from '@/server/services/bcrypt';

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstname: z.string().min(1).max(64),
  lastname: z.string().min(1).max(64),
});

export const authRouter = createTRPCRouter({
  signup: publicProcedure.input(signupSchema).mutation(async ({ ctx, input }) => {
    console.log('mutation called');
    const user = await ctx.db.query.users.findFirst({
      where: eq(users.email, input.email),
    });

    if (user) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Email already exists',
      });
    }

    const hashedPassword = await hashPassword(input.password);

    const temp: typeof users.$inferInsert = {
      email: input.email,
      password: hashedPassword,
      firstname: input.firstname,
      lastname: input.lastname,
    };
    await ctx.db.insert(users).values(temp).execute();

    return 'ok' as const;
  }),
});
