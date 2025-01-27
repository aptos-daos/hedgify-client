import NextAuth from "next-auth";
import Twitter from "next-auth/providers/twitter";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Twitter],
  callbacks: {
    signIn: ({ user, account, profile, email, credentials }) => {
      user.id = profile?.id as string;
      console.log(profile);
      return true;
    },
    jwt: async ({ token, trigger, profile, user, session }) => {
      return token;
    },
    session: ({ session, token }) => {
      // console.log("session",session);
      // console.log("token",token);
      // console.log("user",user);
      // console.log("newSession",newSession);
      // console.log("newSession",trigger);
      // @ts-expect-error
      session.user.id = token.id;
      return session;
    },
  },
});
