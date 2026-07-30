import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { destinationCategories } from "../data/destinations";

export default defineTool({
  name: "get_destinations",
  title: "Get Destinations",
  description: "List LuxTaxi destinations and one-way prices from Bitola, grouped by category (airports, borders, Greece, Serbia, Albania, Bulgaria, Croatia, Montenegro, Kosovo, tourist spots, Macedonian cities).",
  inputSchema: {
    category: z.enum(["all", "airports", "borders", "greece", "serbia", "albania", "bulgaria", "croatia", "montenegro", "kosovo", "tourist", "cities"]).default("all").describe("Filter by destination category."),
    search: z.string().optional().describe("Optional case-insensitive search term for destination name."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category, search }) => {
    let categories = category === "all" ? destinationCategories : destinationCategories.filter((c) => c.id === category);

    if (search?.trim()) {
      const term = search.trim().toLowerCase();
      categories = categories
        .map((c) => ({ ...c, destinations: c.destinations.filter((d) => d.nameEn.toLowerCase().includes(term) || d.nameMk.toLowerCase().includes(term)) }))
        .filter((c) => c.destinations.length > 0);
    }

    return {
      content: [{ type: "text", text: JSON.stringify(categories, null, 2) }],
      structuredContent: { categories },
    };
  },
});
