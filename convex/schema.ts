import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Users table to store WorkOS user information
  users: defineTable({
    workosUserId: v.string(), // WorkOS user ID
    email: v.string(),
    name: v.optional(v.string()),
    avatar: v.optional(v.string()),
    organizationId: v.optional(v.string()), // WorkOS organization ID
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_workos_user_id", ["workosUserId"])
    .index("by_email", ["email"])
    .index("by_organization", ["organizationId"]),

  // Projects for time tracking
  projects: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    color: v.optional(v.string()),
    organizationId: v.optional(v.string()), // WorkOS organization ID
    createdBy: v.id("users"),
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_organization", ["organizationId"])
    .index("by_creator", ["createdBy"])
    .index("by_active", ["isActive"]),

  // Time entries
  timeEntries: defineTable({
    userId: v.id("users"),
    projectId: v.optional(v.id("projects")),
    description: v.optional(v.string()),
    startTime: v.number(), // Unix timestamp
    endTime: v.optional(v.number()), // Unix timestamp, null if still running
    duration: v.optional(v.number()), // Duration in seconds
    isRunning: v.boolean(),
    organizationId: v.optional(v.string()), // WorkOS organization ID
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_project", ["projectId"])
    .index("by_organization", ["organizationId"])
    .index("by_running", ["isRunning"])
    .index("by_user_and_date", ["userId", "startTime"]),
});
