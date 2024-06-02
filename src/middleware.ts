import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/login',
  },
});

// Protect all routes except /login and /api/*
export const config = {
  matcher: ['/((?!api|login).*)'],
};
