import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone: string;
  destination: string;
  date: string;
  message: string;
}

// Input validation function
function validateInput(data: ContactEmailRequest): string | null {
  // Validate name
  const name = data.name?.trim();
  if (!name || name.length < 2 || name.length > 100) {
    return "Name must be 2-100 characters";
  }

  // Validate email format if provided
  if (data.email) {
    const email = data.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Invalid email format";
    }
    if (email.length > 255) {
      return "Email must be less than 255 characters";
    }
  }

  // Validate phone if provided
  if (data.phone) {
    const phone = data.phone.trim();
    const phoneRegex = /^\+?[0-9\s\-()]{6,20}$/;
    if (!phoneRegex.test(phone)) {
      return "Invalid phone format";
    }
  }

  // Validate message
  const message = data.message?.trim();
  if (!message || message.length < 10 || message.length > 2000) {
    return "Message must be 10-2000 characters";
  }

  // Validate destination if provided
  if (data.destination && data.destination.length > 200) {
    return "Destination must be less than 200 characters";
  }

  // Validate date if provided
  if (data.date && data.date.length > 50) {
    return "Date must be less than 50 characters";
  }

  return null;
}

// Simple HTML escaping for safe email content
function escapeHtml(text: string): string {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData: ContactEmailRequest = await req.json();

    // Validate input
    const validationError = validateInput(requestData);
    if (validationError) {
      console.warn("Validation failed:", validationError);
      return new Response(
        JSON.stringify({ error: validationError }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Sanitize inputs
    const name = escapeHtml(requestData.name.trim());
    const email = escapeHtml(requestData.email?.trim() || "");
    const phone = escapeHtml(requestData.phone?.trim() || "");
    const destination = escapeHtml(requestData.destination?.trim() || "");
    const date = escapeHtml(requestData.date?.trim() || "");
    const message = escapeHtml(requestData.message.trim());

    console.log("Processing contact form submission from:", name);

    // Send notification email to admin
    const emailResponse = await resend.emails.send({
      from: "LuxTaxi Contact Form <onboarding@resend.dev>",
      to: ["luxtaxi.mk@gmail.com"],
      subject: `Нова порака од ${name} - LuxTaxi`,
      html: `
        <h1>Нова порака од контакт формата</h1>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Име:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${email || "Не е внесен"}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Телефон:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${phone || "Не е внесен"}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Дестинација:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${destination || "Не е внесена"}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Датум:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${date || "Не е внесен"}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Порака:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${message}</td>
          </tr>
        </table>
        <p style="margin-top: 20px; color: #666;">Оваа порака е испратена преку контакт формата на LuxTaxi веб страницата.</p>
      `,
    });

    console.log("Email sent successfully");

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    
    // Return generic error message to prevent information leakage
    return new Response(
      JSON.stringify({ 
        error: "Се случи грешка при испраќање на пораката. Ве молиме обидете се повторно или контактирајте не директно." 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
