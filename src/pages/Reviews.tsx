import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Star, Send, Loader2, User, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

interface Review {
  id: string;
  name: string | null;
  rating: number;
  comment: string;
  created_at: string;
}

export default function ReviewsPage() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 5,
    comment: "",
    isAnonymous: false,
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      // Use the secure public_reviews view that excludes email addresses
      const { data, error } = await supabase
        .from("public_reviews")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.comment.trim()) {
      toast({
        title: t("reviewsPage.errorTitle"),
        description: t("reviewsPage.errorComment"),
        variant: "destructive",
      });
      return;
    }

    if (!formData.isAnonymous && !formData.name.trim()) {
      toast({
        title: t("reviewsPage.errorTitle"),
        description: t("reviewsPage.errorName"),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("reviews").insert({
        name: formData.isAnonymous ? null : formData.name.trim(),
        email: formData.email.trim() || null,
        rating: formData.rating,
        comment: formData.comment.trim(),
        is_anonymous: formData.isAnonymous,
      });

      if (error) throw error;

      toast({
        title: t("reviewsPage.successTitle"),
        description: t("reviewsPage.successMessage"),
      });

      setFormData({
        name: "",
        email: "",
        rating: 5,
        comment: "",
        isAnonymous: false,
      });
    } catch (error: any) {
      console.error("Error submitting review:", error);
      toast({
        title: t("reviewsPage.errorTitle"),
        description: t("reviewsPage.errorMessage"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : undefined}
            onClick={interactive && onRate ? () => onRate(star) : undefined}
            className={`${interactive ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default"}`}
            disabled={!interactive}
          >
            <Star
              className={`w-5 h-5 ${
                star <= rating ? "fill-primary text-primary" : "text-muted-foreground"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === "mk" ? "mk-MK" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Sample reviews data with translations
  const sampleReviews = language === "mk" ? [
    {
      id: "1",
      name: "Марко",
      rating: 5,
      comment: "Врв сервис, возачот беше супер коректен. Ме зеде на време од аеродром и ме донесе дома без никакви проблеми. Препорачувам!",
      date: "15 јануари 2026",
    },
    {
      id: "2",
      name: "Ана",
      rating: 5,
      comment: "Најдобар такси што сум го користела за до Солун. Чисто возило, пријатен возач, и цената беше коректна. Дефинитивно ќе ги викам повторно.",
      date: "12 јануари 2026",
    },
    {
      id: "3",
      name: "Дејан",
      rating: 5,
      comment: "Ги користам веќе трет пат и секогаш се задоволен. За аеродром Скопје секогаш на време, возилото е удобно. Одлична услуга!",
      date: "8 јануари 2026",
    },
    {
      id: "4",
      name: "Елена",
      rating: 5,
      comment: "Патувавме до Охрид за викенд. Возачот беше мошне љубезен, ни помогна со куферите. Цената беше договорена однапред, без изненадувања.",
      date: "5 јануари 2026",
    },
    {
      id: "5",
      name: "Горан",
      rating: 5,
      comment: "Брза резервација преку Viber, веднаш добив потврда. Возилото дојде точно на време. Ќе ги препорачам на сите!",
      date: "2 јануари 2026",
    },
    {
      id: "6",
      name: "Ивана",
      rating: 5,
      comment: "Одлично искуство! Патував до Белград со нив, патот помина многу брзо. Имаше WiFi во возилото, возачот беше професионален.",
      date: "28 декември 2025",
    },
  ] : [
    {
      id: "1",
      name: "Marco",
      rating: 5,
      comment: "Top service, the driver was very professional. He picked me up on time from the airport and brought me home without any issues. Highly recommend!",
      date: "January 15, 2026",
    },
    {
      id: "2",
      name: "Ana",
      rating: 5,
      comment: "Best taxi I've used to Thessaloniki. Clean vehicle, pleasant driver, and the price was fair. Will definitely call them again.",
      date: "January 12, 2026",
    },
    {
      id: "3",
      name: "David",
      rating: 5,
      comment: "I've used them three times now and I'm always satisfied. Always on time for Skopje airport, the vehicle is comfortable. Excellent service!",
      date: "January 8, 2026",
    },
    {
      id: "4",
      name: "Elena",
      rating: 5,
      comment: "We traveled to Ohrid for the weekend. The driver was very kind and helped us with the luggage. Price was agreed in advance, no surprises.",
      date: "January 5, 2026",
    },
    {
      id: "5",
      name: "George",
      rating: 5,
      comment: "Quick booking via Viber, immediately got confirmation. The vehicle arrived right on time. Will recommend to everyone!",
      date: "January 2, 2026",
    },
    {
      id: "6",
      name: "Ivana",
      rating: 5,
      comment: "Excellent experience! Traveled to Belgrade with them, the trip went by quickly. There was WiFi in the vehicle, the driver was professional.",
      date: "December 28, 2025",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-navy-light to-background">
        <div className="container-luxury text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
              {t("reviewsPage.label")}
            </span>
            <h1 className="luxury-heading text-foreground mb-6">
              {t("reviewsPage.title")} <span className="gold-gradient-text">{t("reviewsPage.titleHighlight")}</span>
            </h1>
            <div className="divider-gold mb-6" />
            <p className="luxury-subheading max-w-2xl mx-auto">
              {t("reviewsPage.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Submit Review Form */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="luxury-card p-8"
            >
              <h2 className="text-2xl font-serif font-semibold text-foreground mb-6">
                {t("reviewsPage.formTitle")}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Anonymous Toggle */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={formData.isAnonymous}
                    onChange={(e) =>
                      setFormData({ ...formData, isAnonymous: e.target.checked })
                    }
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <label htmlFor="anonymous" className="text-muted-foreground">
                    {t("reviewsPage.anonymous")}
                  </label>
                </div>

                {!formData.isAnonymous && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">
                        <User className="w-4 h-4 inline mr-1" />
                        {t("reviewsPage.nameLabel")}
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                        placeholder={t("reviewsPage.namePlaceholder")}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">
                        <Mail className="w-4 h-4 inline mr-1" />
                        {t("reviewsPage.emailLabel")}
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                        placeholder={t("reviewsPage.emailPlaceholder")}
                      />
                    </div>
                  </div>
                )}

                {/* Rating */}
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">{t("reviewsPage.ratingLabel")}</label>
                  {renderStars(formData.rating, true, (rating) =>
                    setFormData({ ...formData, rating })
                  )}
                </div>

                {/* Comment */}
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">{t("reviewsPage.commentLabel")}</label>
                  <textarea
                    value={formData.comment}
                    onChange={(e) =>
                      setFormData({ ...formData, comment: e.target.value })
                    }
                    rows={4}
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder={t("reviewsPage.commentPlaceholder")}
                  />
                </div>

                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      {t("reviewsPage.submitting")}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      {t("reviewsPage.submitButton")}
                    </>
                  )}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  {t("reviewsPage.approvalNote")}
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reviews List */}
      <section className="section-padding bg-secondary/30">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="luxury-card p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{review.name}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                  </div>
                  {renderStars(review.rating)}
                </div>
                <p className="text-muted-foreground">{review.comment}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
