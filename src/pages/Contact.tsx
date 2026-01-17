import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

// Viber icon component
const ViberIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.398 0C9.873.015 5.961.235 3.895 2.182 2.276 3.779 1.702 6.131 1.647 9.018c-.056 2.887-.125 8.298 5.074 9.911v2.28s-.035.92.573 1.108c.735.227 1.165-.471 1.868-1.22.385-.41.916-.998 1.316-1.453 3.623.307 6.412-.393 6.727-.5.728-.247 4.843-.763 5.513-6.228.692-5.636-.328-9.208-2.141-10.81C19.043.627 16.97.09 14.424.024c-.46-.01-.9-.02-1.326-.023h-.1a26.007 26.007 0 0 0-1.6-.001zm.235 1.928h.143c.453.002.908.012 1.347.024 2.18.056 3.903.5 5.027 1.344 1.397 1.061 2.204 3.844 1.65 8.316-.527 4.314-3.654 4.6-4.23 4.797-.255.086-2.692.683-5.788.451 0 0-2.291 2.77-3.006 3.492-.113.114-.248.16-.338.139-.127-.03-.162-.176-.161-.39l.022-3.792c-4.212-1.254-3.967-5.669-3.923-8.026.045-2.357.47-4.278 1.706-5.497 1.672-1.575 5.076-1.828 7.551-1.858zM8.597 5.597a.638.638 0 0 0-.437.163c-.282.249-.554.511-.805.793a1.296 1.296 0 0 0-.344.697c-.016.124-.02.25-.013.374.056 1.113.48 2.14.948 3.114.624 1.283 1.476 2.447 2.482 3.454a11.527 11.527 0 0 0 3.678 2.64c.63.299 1.28.573 1.97.687a2.04 2.04 0 0 0 1.266-.13c.303-.14.568-.347.79-.6.17-.195.329-.44.342-.7.01-.191-.05-.375-.14-.544-.192-.365-.48-.657-.773-.932-.293-.274-.6-.543-.95-.741a.77.77 0 0 0-.776-.023c-.235.123-.427.307-.622.476-.196.17-.395.343-.628.455a.482.482 0 0 1-.317.04 5.556 5.556 0 0 1-1.67-.899 8.178 8.178 0 0 1-1.587-1.678 5.143 5.143 0 0 1-.555-1.008.445.445 0 0 1 .035-.33c.103-.209.263-.38.42-.55.16-.174.325-.345.456-.54a.767.767 0 0 0 .072-.805 18.03 18.03 0 0 0-.657-.995 8.417 8.417 0 0 0-.778-.931.782.782 0 0 0-.56-.257.638.638 0 0 0-.023 0zM12.053 5.81a.387.387 0 0 0-.081.008.396.396 0 0 0 .165.776 3.612 3.612 0 0 1 2.93 2.93.396.396 0 0 0 .777-.166 4.403 4.403 0 0 0-3.706-3.54.396.396 0 0 0-.085-.009zm-.08 1.392a.396.396 0 0 0 .147.77c.68.133 1.186.639 1.32 1.32a.396.396 0 1 0 .777-.155 2.434 2.434 0 0 0-2.064-2.064.396.396 0 0 0-.18.129zm3.955-1.93a.396.396 0 0 0-.083.008.396.396 0 0 0 .163.776 5.387 5.387 0 0 1 4.37 4.37.396.396 0 0 0 .776-.163 6.179 6.179 0 0 0-5.142-5.142.396.396 0 0 0-.084-.008z"/>
  </svg>
);

// WhatsApp icon component  
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function ContactPage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    date: "",
    message: "",
  });

  const contactInfo = [
    {
      icon: Phone,
      labelKey: "contactPage.phone",
      value: "+389 75 269 459",
      href: "tel:+38975269459",
    },
    {
      icon: Mail,
      labelKey: "contactPage.email",
      value: "info@luxtaxi.mk",
      href: "mailto:info@luxtaxi.mk",
    },
    {
      icon: MapPin,
      labelKey: "contactPage.location",
      value: "Битола, Македонија",
      href: null,
    },
    {
      icon: Clock,
      labelKey: "contactPage.workingHours",
      value: t("contactPage.availability"),
      href: null,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast({
        title: t("reviewsPage.errorTitle"),
        description: t("contactPage.errorRequired"),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: formData.name.trim(),
          email: formData.email.trim() || "Не е внесен",
          phone: formData.phone.trim(),
          destination: formData.destination.trim(),
          date: formData.date,
          message: formData.message.trim() || "Нема порака",
        },
      });

      if (error) throw error;

      toast({
        title: t("contactPage.successTitle"),
        description: t("contactPage.successMessage"),
      });
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        destination: "",
        date: "",
        message: "",
      });
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast({
        title: t("contactPage.errorTitle"),
        description: t("contactPage.errorMessage"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-navy-light to-background">
        <div className="container-luxury text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">{t("contactPage.label")}</span>
            <h1 className="luxury-heading text-foreground mb-6">
              {t("contactPage.title")} <span className="gold-gradient-text">{t("contactPage.titleHighlight")}</span>
            </h1>
            <div className="divider-gold mb-6" />
            <p className="luxury-subheading max-w-2xl mx-auto">
              {t("contactPage.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-serif font-semibold text-foreground mb-8">
                {t("contactPage.infoTitle")} <span className="gold-gradient-text">{t("contactPage.infoTitleHighlight")}</span>
              </h2>

              <div className="space-y-6 mb-10">
                {contactInfo.map((info) => (
                  <div key={info.labelKey} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">{t(info.labelKey)}</p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-foreground font-medium hover:text-primary transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-foreground font-medium">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Contact Buttons */}
              <div className="space-y-4">
                <Button variant="gold" size="lg" className="w-full" asChild>
                  <a href="tel:+38975269459" className="flex items-center justify-center gap-2">
                    <Phone className="w-5 h-5" />
                    {t("contactPage.callDirect")}
                  </a>
                </Button>
                <Button variant="gold-outline" size="lg" className="w-full" asChild>
                  <a
                    href="viber://chat?number=%2B38975269459"
                    className="flex items-center justify-center gap-2"
                  >
                    <ViberIcon className="w-5 h-5" />
                    {t("contactPage.sendViber")}
                  </a>
                </Button>
                <Button variant="gold-outline" size="lg" className="w-full" asChild>
                  <a
                    href="https://wa.me/38975269459"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                    {t("contactPage.sendWhatsApp")}
                  </a>
                </Button>
              </div>

              {/* Note */}
              <p className="text-muted-foreground text-sm mt-8">
                {t("contactPage.urgentNote")}
              </p>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="luxury-card p-8">
                <h3 className="text-2xl font-serif font-semibold text-foreground mb-6">{t("contactPage.formTitle")}</h3>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">{t("contactPage.nameLabel")}</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                        placeholder={t("contactPage.namePlaceholder")}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">{t("contactPage.phoneLabel")}</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                        placeholder={t("contactPage.phonePlaceholder")}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">{t("contactPage.emailLabel")}</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                      placeholder={t("contactPage.emailPlaceholder")}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">{t("contactPage.destinationLabel")}</label>
                      <input
                        type="text"
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                        placeholder={t("contactPage.destinationPlaceholder")}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">{t("contactPage.dateLabel")}</label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">{t("contactPage.messageLabel")}</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                      placeholder={t("contactPage.messagePlaceholder")}
                    />
                  </div>

                  <Button type="submit" variant="gold" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        {t("contactPage.submitting")}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        {t("contactPage.submitButton")}
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
