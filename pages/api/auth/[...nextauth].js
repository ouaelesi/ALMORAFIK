import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import userModel from "../../../models/user"; 

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
          let user = await userModel.findOne({ email: profile.email });
          if (!user) {
            const defaultRole = await Role.findOne({ name: "student" }); 
          user = await userModel.create({
            userName: profile.name,
            email: profile.email,
            googleId: profile.sub,
            role: defaultRole._id,
          });
          }
          return { ...user.toObject(), id: user._id, role: user.role.name };
        }
      })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
});