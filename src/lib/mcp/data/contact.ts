export interface ContactMethod {
  type: "phone" | "email" | "viber" | "whatsapp" | "location";
  label: string;
  value: string;
  url?: string;
}

export const contactInfo: ContactMethod[] = [
  {
    type: "phone",
    label: "Phone",
    value: "+389 75 269 459",
    url: "tel:+38975269459",
  },
  {
    type: "viber",
    label: "Viber",
    value: "+389 75 269 459",
    url: "viber://chat?number=%2B38975269459",
  },
  {
    type: "whatsapp",
    label: "WhatsApp",
    value: "+389 75 269 459",
    url: "https://wa.me/38975269459",
  },
  {
    type: "email",
    label: "Email",
    value: "info@luxtaxi.mk",
    url: "mailto:info@luxtaxi.mk",
  },
  {
    type: "location",
    label: "Location",
    value: "Bitola, Macedonia",
  },
];

export const businessInfo = {
  name: "LuxTaxi Битола",
  tagline: "Вашиот партнер во патувањето",
  workingHours: "24/7",
  fleet: "VW Passat",
  baseLocation: "Bitola, Macedonia",
};
