import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get or create user from WorkOS session
export const getOrCreateUser = mutation({
  args: {
    workosUserId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    avatar: v.optional(v.string()),
    organizationId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_workos_user_id", (q) =>
        q.eq("workosUserId", args.workosUserId)
      )
      .unique();

    const now = Date.now();

    if (existingUser) {
      // Update existing user with latest info
      await ctx.db.patch(existingUser._id, {
        email: args.email,
        name: args.name,
        avatar: args.avatar,
        organizationId: args.organizationId,
        updatedAt: now,
      });
      return existingUser._id;
    }

    // Create new user
    return await ctx.db.insert("users", {
      workosUserId: args.workosUserId,
      email: args.email,
      name: args.name,
      avatar: args.avatar,
      organizationId: args.organizationId,
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Get user by WorkOS ID
export const getUserByWorkosId = query({
  args: { workosUserId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_workos_user_id", (q) =>
        q.eq("workosUserId", args.workosUserId)
      )
      .unique();
  },
});

// Get user by Convex ID
export const getUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});
