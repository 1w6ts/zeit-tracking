import {
  BetterAuth,
  convexAdapter,
  type AuthFunctions,
  type PublicAuthFunctions,
} from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { betterAuth } from "better-auth";
import { api, components, internal } from "./_generated/api";
import { query, type GenericCtx } from "./_generated/server";
import type { Id, DataModel } from "./_generated/dataModel";

const authFunctions: AuthFunctions = internal.auth;
const publicAuthFunctions: PublicAuthFunctions = api.auth;

export const betterAuthComponent = new BetterAuth(components.betterAuth, {
  authFunctions,
  publicAuthFunctions,
});

export const createAuth = (ctx: GenericCtx) =>
  betterAuth({
    baseURL: process.env.BASE_URL,
    database: convexAdapter(ctx, betterAuthComponent),

    emailAndPassword: {
      enabled: true,
    },
    plugins: [convex()],
  });

export const {
  createUser,
  updateUser,
  deleteUser,
  createSession,
  isAuthenticated,
} = betterAuthComponent.createAuthFunctions<DataModel>({
  onCreateUser: async (ctx, user) => {
    return ctx.db.insert("users", {});
  },
  onDeleteUser: async (ctx, userid) => {
    await ctx.db.delete(userid as Id<"users">);
  },
});

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const userMetadata = await betterAuthComponent.getAuthUser(ctx);
    if (!userMetadata) return null;

    const user = await ctx.db.get(userMetadata.userId as Id<"users">);
    return {
      ...user,
      ...userMetadata,
    };
  },
});
