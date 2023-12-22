import { withAuth } from 'next-auth/middleware';

const allowedPathnames = ['/api/trpc/auth.signup', '/auth/signup'];

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      if (token) return true;

      if (allowedPathnames.some((path) => req.nextUrl.pathname.startsWith(path))) return true;
      return false;
    },
  },
  pages: {
    signIn: '/auth/login',
  },
});
