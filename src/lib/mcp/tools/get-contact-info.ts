import { defineTool } from "@lovable.dev/mcp-js";
import { contactInfo, businessInfo } from "../data/contact";

export default defineTool({
  name: "get_contact_info",
  title: "Get Contact Info",
  description: "Return LuxTaxi contact methods (phone, Viber, WhatsApp, email), location, fleet, and working hours.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify({ business: businessInfo, contact: contactInfo }, null, 2) }],
    structuredContent: { business: businessInfo, contact: contactInfo },
  }),
});
