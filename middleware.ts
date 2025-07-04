import { authkitMiddleware } from "@workos-inc/authkit-nextjs";

export default authkitMiddleware({
    middlewareAuth: {
        enabled: true,
        unauthenticatedPaths: ["/"]
    },
});

export const config = { matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], };