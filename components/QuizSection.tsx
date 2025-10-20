"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Check, Shield, Heart, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { BULGARIAN_CITIES, WEAPON_OPTIONS, MOTIVATION_OPTIONS } from "@/lib/constants";
import { useScrollAnimation, fadeInVariants, staggerContainer } from "@/hooks/use-scroll-animation";

const quizSchema = z.object({
  city: z.string().min(1, "Моля изберете град"),
  weapon: z.string().min(1, "Моля изберете оръжие"),
  motivation: z.string().min(1, "Моля изберете мотивация"),
  email: z.string().email("Моля въведете валиден имейл адрес"),
});

type QuizFormValues = z.infer<typeof quizSchema>;

export default function QuizSection() {
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();
  const { ref, isInView } = useScrollAnimation(0.2);

  const form = useForm<QuizFormValues>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      city: "",
      weapon: "",
      motivation: "",
      email: "",
    },
  });

  const submitQuizMutation = useMutation({
    mutationFn: async (data: QuizFormValues) => {
      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          userAgent: navigator.userAgent,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    },
    onSuccess: () => {
      setShowSuccess(true);
      form.reset();
      toast({
        title: "Успешно се присъединихте!",
        description: "Добре дошли в движението за истински вкус.",
      });
    },
    onError: (error) => {
      toast({
        title: "Възникна грешка",
        description: "Моля опитайте отново.",
        variant: "destructive",
      });
      console.error("Quiz submission error:", error);
    },
  });

  const onSubmit = (data: QuizFormValues) => {
    submitQuizMutation.mutate(data);
  };

  if (showSuccess) {
    return (
      <motion.section 
        className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-cream to-warm-beige/30 px-4 sm:px-6 lg:px-8" 
        id="quiz"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto max-w-5xl">
          <motion.div 
            className="text-center bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-warm-beige/20"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div 
              className="w-20 h-20 bg-gradient-to-br from-warm-brown to-farm-brown rounded-full flex items-center justify-center mx-auto mb-6 relative"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-warm-brown to-farm-brown rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <Check size={40} className="text-cream relative z-10" />
            </motion.div>
            <h3 className="font-playfair text-2xl font-bold text-warm-brown mb-4">
              Добре дошъл в движението!
            </h3>
            <p className="text-gray-700 mb-6">
              Твоят глас е чут. Заедно ще защитим истинския вкус.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={() => setShowSuccess(false)}
                className="bg-warm-brown text-cream hover:bg-warm-brown/90"
              >
                Продължи
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section 
      ref={ref}
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-cream via-warm-beige/20 to-cream px-4 sm:px-6 lg:px-8" 
      id="quiz"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div 
          className="text-center mb-10 sm:mb-12 lg:mb-16"
          variants={fadeInVariants}
        >
          <motion.h2 
            className="font-playfair text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-warm-brown mb-4 sm:mb-6"
            variants={fadeInVariants}
          >
            Чий вкус ще защитиш?
          </motion.h2>
          <motion.p 
            className="text-base sm:text-lg lg:text-xl text-warm-brown/80 max-w-3xl mx-auto px-4"
            variants={fadeInVariants}
          >
            Стани част от движението. Кажи ни къде цениш истинския вкус, за да го защитим заедно.
          </motion.p>
        </motion.div>

        <motion.div variants={fadeInVariants}>
          <Form {...form}>
            <motion.form 
              onSubmit={form.handleSubmit(onSubmit)} 
              className="space-y-6 sm:space-y-8 bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12 border border-warm-beige/30"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
            {/* Question 1: City */}
            <motion.div variants={fadeInVariants}>
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold text-warm-brown flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      В кой град цениш истинския вкус?
                    </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full p-3 sm:p-4 text-base sm:text-lg border-2 border-warm-brown/30 rounded-xl focus:border-warm-brown bg-cream/30 touch-manipulation">
                        <SelectValue placeholder="Избери град..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {BULGARIAN_CITIES.map((city) => (
                        <SelectItem key={city.value} value={city.value}>
                          {city.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            </motion.div>

            {/* Question 2: Weapon */}
            <motion.div variants={fadeInVariants}>
              <FormField
                control={form.control}
                name="weapon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold text-warm-brown mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      Кое е твоето оръжие в кухнята?
                    </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
                    >
                      {WEAPON_OPTIONS.map((option) => (
                        <motion.div 
                          key={option.value} 
                          className="relative"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <RadioGroupItem 
                            value={option.value} 
                            id={option.value}
                            className="sr-only peer"
                          />
                          <label 
                            htmlFor={option.value}
                            className={`p-6 border-2 rounded-xl text-center transition-all duration-300 cursor-pointer block ${
                              form.watch('weapon') === option.value 
                                ? 'border-traditional-red bg-traditional-red/10 shadow-lg' 
                                : 'border-warm-brown/30 bg-cream/30 hover:border-warm-brown hover:bg-cream/50'
                            }`}
                          >
                            <motion.div 
                              className="mb-3"
                              animate={{ rotate: [0, 2, -2, 0] }}
                              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                              whileHover={{ scale: 1.1 }}
                            >
                              {option.isImage ? (
                                <img 
                                  src={option.icon} 
                                  alt={option.label}
                                  className="w-16 h-16 mx-auto object-contain rounded-lg shadow-md"
                                />
                              ) : (
                                <div className={`text-3xl transition-colors duration-300 ${
                                  form.watch('weapon') === option.value ? 'text-traditional-red' : 'text-warm-brown'
                                }`}>
                                  {option.icon}
                                </div>
                              )}
                            </motion.div>
                            <p className={`font-semibold transition-colors duration-300 ${
                              form.watch('weapon') === option.value ? 'text-traditional-red' : 'text-warm-brown'
                            }`}>
                              {option.label}
                            </p>
                          </label>
                        </motion.div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </motion.div>

            {/* Question 3: Motivation */}
            <motion.div variants={fadeInVariants}>
              <FormField
              control={form.control}
              name="motivation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-warm-brown mb-4 flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Защо се бориш?
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="space-y-3"
                    >
                      {MOTIVATION_OPTIONS.map((option, index) => (
                        <motion.div 
                          key={option.value} 
                          className="relative"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ x: 5 }}
                        >
                          <RadioGroupItem 
                            value={option.value} 
                            id={`motivation-${option.value}`}
                            className="sr-only peer"
                          />
                          <label 
                            htmlFor={`motivation-${option.value}`}
                            className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                              form.watch('motivation') === option.value 
                                ? 'border-traditional-red bg-traditional-red/10 shadow-lg' 
                                : 'border-warm-brown/30 bg-cream/30 hover:border-warm-brown hover:bg-cream/50'
                            }`}
                          >
                            <motion.div 
                              className={`w-5 h-5 border-2 rounded-full mr-4 flex items-center justify-center transition-all duration-300 ${
                                form.watch('motivation') === option.value 
                                  ? 'border-traditional-red bg-traditional-red' 
                                  : 'border-warm-brown'
                              }`}
                              whileHover={{ scale: 1.2 }}
                            >
                              <div className={`w-2 h-2 bg-white rounded-full transition-all duration-300 ${
                                form.watch('motivation') === option.value ? 'opacity-100' : 'opacity-0'
                              }`}></div>
                            </motion.div>
                            <span className={`font-medium transition-colors duration-300 ${
                              form.watch('motivation') === option.value ? 'text-traditional-red font-semibold' : 'text-gray-700'
                            }`}>
                              {option.label}
                            </span>
                          </label>
                        </motion.div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </motion.div>

            {/* Email Collection */}
            <motion.div variants={fadeInVariants}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold text-warm-brown flex items-center gap-2">
                      <Heart className="w-5 h-5" />
                      Въведи своя имейл, за да се присъединиш:
                    </FormLabel>
                    <FormControl>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileFocus={{ scale: 1.02 }}
                      >
                        <Input
                          {...field}
                          type="email"
                          placeholder="твоят@имейл.bg"
                          className="w-full p-4 border-2 border-warm-brown/30 rounded-xl focus:border-warm-brown bg-cream/30 transition-all duration-300"
                        />
                      </motion.div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div variants={fadeInVariants}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="submit"
                  disabled={submitQuizMutation.isPending}
                  className="relative w-full bg-gradient-to-r from-traditional-red to-warm-brown hover:from-traditional-red/90 hover:to-warm-brown/90 text-cream font-bold py-4 px-8 rounded-xl text-lg overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-warm-beige/20 to-cream/20"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <span className="relative z-10">
                    {submitQuizMutation.isPending ? (
                      <motion.span
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        Изпращане...
                      </motion.span>
                    ) : (
                      "ПРИСЪЕДИНИ СЕ КЪМ ДВИЖЕНИЕТО"
                    )}
                  </span>
                </Button>
              </motion.div>
            </motion.div>
            </motion.form>
          </Form>
        </motion.div>
      </div>
    </motion.section>
  );
}
