import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";FACEBOOK_CLIENT_ID
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import userModel from "../../../models/user"; // Adjust the import path as necessary

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const user = await userModel.findOne({ email: credentials.email });
        if (user && bcrypt.compareSync(credentials.password, user.hashPassword)) {
          return { id: user._id, email: user.email, name: user.userName };
        }
        return null;
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      async profile(profile) {
        // Find or create user in your database
        let user = await userModel.findOne({ email: profile.email });
        if (!user) {
          user = await userModel.create({
            userName: profile.name,
            email: profile.email,
            googleId: profile.sub,
            hashPassword: bcrypt.hashSync(profile.sub, 10)
          });
        }
        return { ...user.toObject(), id: user._id };
      }
    }),
    FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        async profile(profile) {
          // Find or create user in your database
          let user = await userModel.findOne({ email: profile.email });
          if (!user) {
            user = await userModel.create({
              userName: profile.name,
              email: profile.email,
              facebookId: profile.id,
              hashPassword: bcrypt.hashSync(profile.id, 10)
            });
          }
          return { ...user.toObject(), id: user._id };
        }
      })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
});