import withAuth from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
    newUser: "/onboarding",
    signOut: "/",
  },
});

export const config = { matcher: ["/", "/create-one", "/:path"] };
