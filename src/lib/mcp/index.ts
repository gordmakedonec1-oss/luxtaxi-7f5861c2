import { auth, defineMcp } from "@lovable.dev/mcp-js";
import getDestinationsTool from "./tools/get-destinations";
import getServicesTool from "./tools/get-services";
import getContactInfoTool from "./tools/get-contact-info";
import getReviewsTool from "./tools/get-reviews";
import submitReviewTool from "./tools/submit-review";
import submitContactInquiryTool from "./tools/submit-contact-inquiry";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "luxtaxi-balkan-journeys",
  title: "LuxTaxi Balkan Journeys",
  version: "0.1.0",
  instructions: "Tools for LuxTaxi Битола — a premium taxi service based in Bitola, Macedonia. Use get_destinations and get_services for pricing and offerings, get_contact_info for contact methods, get_reviews for customer feedback, and submit_contact_inquiry / submit_review when the user wants to act through their LuxTaxi account.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [
    getDestinationsTool,
    getServicesTool,
    getContactInfoTool,
    getReviewsTool,
    submitReviewTool,
    submitContactInquiryTool,
  ],
});
