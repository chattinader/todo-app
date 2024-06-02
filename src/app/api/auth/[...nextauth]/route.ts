import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bycript from 'bcrypt';
import { getUser } from '@app/api/api';

// Declare the options for the authentication using NextAuth and json-server
export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials: Record<string, string> | undefined) {
        // Add type assertion to credentials parameter
        const { username, password } = credentials as Record<string, string>;
        if (!username || !password) {
          return null;
        }

        const user = await getUser(username);
        if (user === undefined) {
          return null;
        }

        const isPasswordValid = await bycript.compare(
          password,
          user.hashedPassword
        );
        if (!isPasswordValid) {
          return null;
        }

        return user;
      },
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
