import { authMiddleware } from "@clerk/nextjs";

// See https://clerk.com/docs/nextjs/middleware for more information about configuring middleware
// TODO: remove testing public routes
export default authMiddleware({
	publicRoutes: ["/"],
});

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
