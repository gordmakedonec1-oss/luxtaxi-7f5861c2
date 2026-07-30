import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "submit_review",
  title: "Submit Review",
  description: "Submit a customer review for LuxTaxi. Requires authentication; the review is recorded with the signed-in user's identity.",
  inputSchema: {
    rating: z.number().int().min(1).max(5).describe("Star rating from 1 to 5."),
    comment: z.string().trim().min(5).max(1000).describe("Review comment."),
    name: z.string().trim().min(2).max(100).optional().describe("Optional display name. Defaults to the signed-in user's first name if available."),
  },
  annotations: { readOnlyHint: false, idempotentHint: false, openWorldHint: false },
  handler: async ({ rating, comment, name }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated. Please connect your LuxTaxi account first." }], isError: true };
    }

    const supabase = supabaseForUser(ctx);
    const displayName = name?.trim() || ctx.getUserEmail()?.split("@")[0] || "LuxTaxi User";

    const { data, error } = await supabase
      .from("reviews")
      .insert({
        rating,
        comment: comment.trim(),
        name: displayName,
        email: ctx.getUserEmail(),
        is_anonymous: false,
      })
      .select();

    if (error) {
      return { content: [{ type: "text", text: error.message }], isError: true };
    }

    return {
      content: [{ type: "text", text: "Review submitted successfully." }],
      structuredContent: { review: data?.[0] },
    };
  },
});
