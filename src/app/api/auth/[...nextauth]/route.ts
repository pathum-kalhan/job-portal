import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import CandidateModel from "../../models/Candidate";
import DbMongoose from "@/lib/db_mongoose";
import { verifyPassword } from "@/lib/auth";
import { NextAuthOptions } from "next-auth";
import EmployerModel from "../../models/Employer";

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
                : await EmployerModel.findOne({
                    email: email?.toLowerCase()?.trim(),
                  });

            if (!user) {
              throw new Error("No user found");
            }

            const isValid = await verifyPassword(password, user.password);

            if (!isValid) {
              throw new Error("Invalid credentials");
            }

            return {
              id: user._id,
              email: user.email,
              name: user.name,
              role: user.userType,
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
    async jwt({ token, user, session }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          // @ts-ignore
          role: user.role,
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
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
