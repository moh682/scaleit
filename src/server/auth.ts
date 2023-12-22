import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { getServerSession, type DefaultSession, type NextAuthOptions } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';

import { db } from '@/server/db';
import { mysqlTable } from './db/utils';
import { eq } from 'drizzle-orm';
import { validatePassword } from '@/server/services/bcrypt';
import { users } from './db/schema';
import { randomUUID, randomBytes } from 'crypto';
import { env } from '@/env';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession['user'];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  useSecureCookies: env.NODE_ENV === 'production',
  secret: env.NEXTAUTH_SECRET,
  callbacks: {
    jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    session: ({ session, user, token, newSession, trigger }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      };
    },
  },
  // adapter: DrizzleAdapter(db, mysqlTable),
  providers: [
    CredentialProvider({
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing credentials');
        }

        const user = await db.query.users.findFirst({
          where: eq(users.email, credentials.email),
        });

        if (!user) {
          throw new Error('Account does not exist');
        }

        const isValidPassword = await validatePassword(credentials.password, user.password);

        if (!isValidPassword) {
          throw new Error('Wrong password');
        }

        return {
          id: user.id,
          email: user.email,
          name: `${user.firstname} ${user.lastname}`,
          image: user.image,
        };
      },
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'email@email.com',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
