import { defineTool } from "@lovable.dev/mcp-js";
import { services } from "../data/services";

export default defineTool({
  name: "get_services",
  title: "Get Services",
  description: "List the taxi services offered by LuxTaxi: VIP transfers, corporate transport, delegations, and airport transfers.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(services, null, 2) }],
    structuredContent: { services },
  }),
});
