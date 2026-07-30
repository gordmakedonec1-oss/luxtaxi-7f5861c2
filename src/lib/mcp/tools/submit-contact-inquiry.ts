import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "submit_contact_inquiry",
  title: "Submit Contact Inquiry",
  description: "Send a ride inquiry or message to LuxTaxi via the contact form. Requires authentication.",
  inputSchema: {
    name: z.string().trim().min(2).max(100).describe("Full name of the person making the inquiry."),
    phone: z.string().trim().min(6).max(20).describe("Contact phone number."),
    destination: z.string().trim().max(200).optional().describe("Desired destination or route."),
    date: z.string().max(50).optional().describe("Desired travel date."),
    message: z.string().trim().min(10).max(2000).describe("Inquiry details."),
  },
  annotations: { readOnlyHint: false, idempotentHint: false, openWorldHint: false },
  handler: async ({ name, phone, destination, date, message }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated. Please connect your LuxTaxi account first." }], isError: true };
    }

    const supabase = supabaseForUser(ctx);

    const { data, error } = await supabase.functions.invoke("send-contact-email", {
      body: {
        name: name.trim(),
        email: ctx.getUserEmail() || "",
        phone: phone.trim(),
        destination: destination?.trim() || "",
        date: date?.trim() || "",
        message: message.trim(),
        website: "",
      },
    });

    if (error) {
      return { content: [{ type: "text", text: error.message }], isError: true };
    }

    return {
      content: [{ type: "text", text: "Inquiry sent successfully. LuxTaxi will contact you soon." }],
      structuredContent: data,
    };
  },
});
