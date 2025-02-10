import { getServerSession } from "next-auth";
import { AuthOptions } from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      username?: string | null;
    };
  }
}

const authOptions: AuthOptions = {
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
  providers: [
    TwitterProvider({
      clientId: process.env.AUTH_TWITTER_ID as string,
      clientSecret: process.env.AUTH_TWITTER_SECRET as string,
      version: "2.0",
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.username = token.username as string;
      }
      return session;
    },
    async jwt({ token, user, account, profile }) {
      if (profile) {
        // @ts-ignore
        token.username = profile.data.username;
      }
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  redirect: async ({ url, baseUrl }) => {
    // Allows relative callback URLs
    if (url.startsWith("/")) return `${baseUrl}${url}`
    // Allows callback URLs on the same origin
    else if (new URL(url).origin === baseUrl) return url
    return baseUrl
  },
};

/**
 * Helper function to get the session on the server without having to import the authOptions object every single time
 * @returns The session object or null
 */
const getSession = () => getServerSession(authOptions);

export { authOptions, getSession };
