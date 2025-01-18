import NextAuth from "next-auth";
import Twitter from "next-auth/providers/twitter";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Twitter],
  callbacks: {
    signIn: ({ user, account, profile, email, credentials }) => {
      user.id = profile?.id as string;
      return true;
    },
    jwt: async ({ token, trigger, profile, user, session }) => {
      return token;
    },
    session: ({ session, token }) => {
      // @ts-ignore
      session.user.id = token.id
      return session;
    }
  },
});
