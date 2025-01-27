import { AuthOptions, getServerSession } from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

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
    async signIn() {
      return true;
    },
    async session({ session, token }) {
      console.log(session);
      if (session.user) {
        // @ts-ignore
        session.user.id = token.sub as string;
      }
      return session;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    }
  }
};

/**
 * Helper function to get the session on the server without having to import the authOptions object every single time
 * @returns The session object or null
 */
const getSession = () => getServerSession(authOptions);

export { authOptions, getSession };
