"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BULGARIAN_CITIES, WEAPON_OPTIONS, MOTIVATION_OPTIONS } from "@/lib/constants";

const quizSchema = z.object({
  city: z.string().min(1, "Моля изберете град"),
  weapon: z.string().min(1, "Моля изберете оръжие"),
  motivation: z.string().min(1, "Моля изберете мотивация"),
  email: z.string().email("Моля въведете валиден имейл адрес"),
});

type QuizFormValues = z.infer<typeof quizSchema>;

export default function QuizSection() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<QuizFormValues>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      city: "",
      weapon: "",
      motivation: "",
      email: "",
    },
  });

  const onSubmit = async (data: QuizFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call for static export
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setShowSuccess(true);
      form.reset();
      toast({
        title: "Успешно се присъединихте!",
        description: "Добре дошли в движението за истински вкус.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Възникна грешка",
        description: "Моля опитайте отново.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <section className="py-20 bg-cream" id="quiz">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center bg-natural-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="w-16 h-16 bg-warm-brown rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={32} className="text-cream" />
            </div>
            <h3 className="font-playfair text-2xl font-bold text-warm-brown mb-4">
              Добре дошъл в движението!
            </h3>
            <p className="text-warm-stone mb-6">
              Твоят глас е чут. Заедно ще защитим истинския вкус.
            </p>
            <button 
              onClick={() => setShowSuccess(false)}
              className="bg-warm-brown text-cream hover:bg-warm-brown/90 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Продължи
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-cream" id="quiz">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-warm-brown mb-6">
            Чий вкус ще защитиш?
          </h2>
          <p className="text-xl text-warm-brown/80 max-w-2xl mx-auto">
            Стани част от движението. Кажи ни къде цениш истинския вкус, за да го защитим заедно.
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-natural-white rounded-2xl shadow-xl p-8 md:p-12 border border-warm-brown/10">
          {/* Question 1: City */}
          <div className="form-field">
            <label className="block text-lg font-semibold text-warm-brown mb-3">
              1. От кой град ще защитаваш истинския вкус?
            </label>
            <select
              {...form.register("city")}
              className="w-full p-4 border border-warm-brown/20 rounded-lg focus:ring-2 focus:ring-warm-brown focus:border-transparent"
            >
              <option value="">Избери твоя град</option>
              {BULGARIAN_CITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {form.formState.errors.city && (
              <p className="text-tradition-red text-sm mt-1">{form.formState.errors.city.message}</p>
            )}
          </div>

          {/* Question 2: Weapon */}
          <div className="form-field">
            <label className="block text-lg font-semibold text-warm-brown mb-3">
              2. Избери своето оръжие в битката за автентичност:
            </label>
            <div className="space-y-3">
              {WEAPON_OPTIONS.map((option) => (
                <label key={option.value} className="flex items-start space-x-3 cursor-pointer p-3 hover:bg-cream rounded-lg transition-colors">
                  <input
                    type="radio"
                    {...form.register("weapon")}
                    value={option.value}
                    className="mt-1 text-warm-brown focus:ring-warm-brown"
                  />
                  <span className="text-warm-stone">{option.label}</span>
                </label>
              ))}
            </div>
            {form.formState.errors.weapon && (
              <p className="text-tradition-red text-sm mt-1">{form.formState.errors.weapon.message}</p>
            )}
          </div>

          {/* Question 3: Motivation */}
          <div className="form-field">
            <label className="block text-lg font-semibold text-warm-brown mb-3">
              3. Каква е твоята мотивация в тази революция?
            </label>
            <div className="space-y-3">
              {MOTIVATION_OPTIONS.map((option) => (
                <label key={option.value} className="flex items-start space-x-3 cursor-pointer p-3 hover:bg-cream rounded-lg transition-colors">
                  <input
                    type="radio"
                    {...form.register("motivation")}
                    value={option.value}
                    className="mt-1 text-warm-brown focus:ring-warm-brown"
                  />
                  <span className="text-warm-stone">{option.label}</span>
                </label>
              ))}
            </div>
            {form.formState.errors.motivation && (
              <p className="text-tradition-red text-sm mt-1">{form.formState.errors.motivation.message}</p>
            )}
          </div>

          {/* Question 4: Email */}
          <div className="form-field">
            <label className="block text-lg font-semibold text-warm-brown mb-3">
              4. Твоя имейл адрес за връзка с движението:
            </label>
            <input
              type="email"
              {...form.register("email")}
              placeholder="твоя.имейл@example.com"
              className="w-full p-4 border border-warm-brown/20 rounded-lg focus:ring-2 focus:ring-warm-brown focus:border-transparent"
            />
            {form.formState.errors.email && (
              <p className="text-tradition-red text-sm mt-1">{form.formState.errors.email.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="revolution-button bg-tradition-red text-natural-white px-12 py-4 text-xl font-bold rounded-lg hover:bg-tradition-red/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "ПРИСЪЕДИНЯВАНЕ..." : "ПРИСЪЕДИНИ СЕ КЪМ ДВИЖЕНИЕТО"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}