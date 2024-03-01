import { withAuth } from "next-auth/middleware";

export default withAuth(
  
  { 
  callbacks: {
    authorized: ({ req, token }) => {

      if (Boolean(token)) {
        const { pathname } = req.nextUrl;
        const employerMatch = pathname.match(/^\/dashboard\/employer\/?(.*)/);
        const candidateMatch = pathname.match(/^\/dashboard\/candidate\/?(.*)/);

        if (employerMatch) {
          return token?.role === "employer";
        } else if (candidateMatch) {
          return token?.role === "candidate";
        }
      } 

      return Boolean(token)
     
    },
  },
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
