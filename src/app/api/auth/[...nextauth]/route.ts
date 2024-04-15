import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import CandidateModel from "../../models/Candidate";
import DbMongoose from "../../../../lib/db_mongoose";
import { verifyPassword } from "../../../../lib/auth";
import { NextAuthOptions } from "next-auth";
import EmployerModel from "../../models/Employer";
import AdminModel from "../../models/Admin";

type credentials = {
  email: string;
  password: string;
  role: string;
};

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {},

      async authorize(credentials, req) {
        const { email, password, role } = credentials as credentials;

        try {
          if (credentials) {
            await DbMongoose();

            const user =
              role === "candidate"
                ? await CandidateModel.findOne({
                    email: email?.toLowerCase()?.trim(),
                  })
                : role === "employer"
                ? await EmployerModel.findOne({
                    email: email?.toLowerCase()?.trim(),
                  })
                : role === "admin"
                ? await AdminModel.findOne({
                    email: email?.toLowerCase()?.trim(),
                  })
                : null;

            if (!user) {
              throw new Error("No user found");
            }

            if (user.profileStatus==="blocked") {
              throw new Error("User is blocked");
            }

            const isValid = await verifyPassword(password, user.password);

            if (!isValid) {
              throw new Error("Invalid credentials");
            }

            return {
              id: user._id,
              email: user.email,
              name: user.name,
              profileImage: user.profilePic.image,
              role: user.userType,
              websiteUrl: user.websiteUrl ?? null,
            };
          }

          throw new Error("Invalid credentials");
        } catch (error) {
          throw new Error("Server error");
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session.profileImage) {
        token.profileImage = session.profileImage;
      }

      if (user) {
        return {
          ...token,
          id: user.id,
          // @ts-ignore
          role: user.role,
          // @ts-ignore
          websiteUrl: user.websiteUrl,
          // @ts-ignore
          profileImage: user.profileImage,
        };
      }

      return token;
    },
    async session({ session, user, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token?.role ?? "",
          profileImage: token.profileImage,
          // @ts-ignore
          webUrl: token.websiteUrl,
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
