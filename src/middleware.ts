import { withAuth } from "next-auth/middleware";

export default withAuth(
  
  { 
  callbacks: {
    authorized: ({ req, token }) => {
      
      const { pathname } = req.nextUrl;
      const employerMatch = pathname.match(/^\/dashboard\/employer\/?(.*)/);
      const candidateMatch = pathname.match(/^\/dashboard\/candidate\/?(.*)/); 
      const adminMatch = pathname.match(/^\/dashboard\/admin\/?(.*)/); 

      if (Boolean(token)) {

        if (employerMatch) {
          return token?.role === "employer";
        } else if (candidateMatch) {
          return token?.role === "candidate";
        } else if (adminMatch) {
          return token?.role === "admin";
        }
      } 

      return Boolean(token)
     
    },
  },
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
