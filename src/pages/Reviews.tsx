import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Star, Send, Loader2, User, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Review {
  id: string;
  name: string | null;
  rating: number;
  comment: string;
  is_anonymous: boolean;
  created_at: string;
}

export default function ReviewsPage() {
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
      const { data, error } = await supabase
        .from("reviews")
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
        title: "Грешка",
        description: "Ве молиме напишете коментар.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.isAnonymous && !formData.name.trim()) {
      toast({
        title: "Грешка",
        description: "Ве молиме внесете име или изберете анонимно.",
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
        title: "Благодариме!",
        description: "Вашата оцена е примена и ќе биде објавена по одобрување.",
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
        title: "Грешка",
        description: "Обидете се повторно.",
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
    return new Date(dateString).toLocaleDateString("mk-MK", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
              Рецензии
            </span>
            <h1 className="luxury-heading text-foreground mb-6">
              Што велат нашите <span className="gold-gradient-text">клиенти</span>
            </h1>
            <div className="divider-gold mb-6" />
            <p className="luxury-subheading max-w-2xl mx-auto">
              Прочитајте искуства од задоволни патници или споделете го вашето
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
                Оставете ваша оцена
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
                    Анонимно
                  </label>
                </div>

                {!formData.isAnonymous && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">
                        <User className="w-4 h-4 inline mr-1" />
                        Име *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                        placeholder="Вашето име"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">
                        <Mail className="w-4 h-4 inline mr-1" />
                        Е-маил (опционално)
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                        placeholder="vash@email.com"
                      />
                    </div>
                  </div>
                )}

                {/* Rating */}
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Оцена</label>
                  {renderStars(formData.rating, true, (rating) =>
                    setFormData({ ...formData, rating })
                  )}
                </div>

                {/* Comment */}
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Коментар *</label>
                  <textarea
                    value={formData.comment}
                    onChange={(e) =>
                      setFormData({ ...formData, comment: e.target.value })
                    }
                    rows={4}
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="Споделете го вашето искуство..."
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
                      Се испраќа...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Испрати оцена
                    </>
                  )}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  * Секоја оцена се одобрува пред да биде објавена.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reviews List */}
      <section className="section-padding bg-secondary/30">
        <div className="container-luxury">
          <h2 className="text-3xl font-serif font-semibold text-foreground text-center mb-12">
            Одобрени <span className="gold-gradient-text">рецензии</span>
          </h2>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : reviews.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">
              Сè уште нема одобрени рецензии. Бидете први!
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review, index) => (
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
                        <p className="font-medium text-foreground">
                          {review.is_anonymous ? "Анонимен" : review.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(review.created_at)}
                        </p>
                      </div>
                    </div>
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
