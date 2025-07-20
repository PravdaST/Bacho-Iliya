import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
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

  const submitQuizMutation = useMutation({
    mutationFn: async (data: QuizFormValues) => {
      const response = await apiRequest("POST", "/api/quiz", {
        ...data,
        userAgent: navigator.userAgent,
      });
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
      <section className="py-20 bg-gradient-to-b from-cream to-white" id="quiz">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="w-16 h-16 bg-forest rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={32} className="text-cream" />
            </div>
            <h3 className="font-playfair text-2xl font-bold text-forest mb-4">
              Добре дошъл в движението!
            </h3>
            <p className="text-warm-gray mb-6">
              Твоят глас е чут. Заедно ще защитим истинския вкус.
            </p>
            <Button 
              onClick={() => setShowSuccess(false)}
              className="bg-forest text-cream hover:bg-forest/90"
            >
              Продължи
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-cream to-white" id="quiz">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-forest mb-6">
            Чий вкус ще защитиш?
          </h2>
          <p className="text-xl text-warm-gray max-w-2xl mx-auto">
            Стани част от движението. Кажи ни къде цениш истинския вкус, за да го защитим заедно.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white rounded-2xl shadow-xl p-8 md:p-12">
            {/* Question 1: City */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-forest">
                    В кой град цениш истинския вкус?
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full p-4 border-2 border-warm-brown/20 rounded-xl focus:border-forest bg-cream/50">
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

            {/* Question 2: Weapon */}
            <FormField
              control={form.control}
              name="weapon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-forest mb-4">
                    Кое е твоето оръжие в кухнята?
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid md:grid-cols-3 gap-4"
                    >
                      {WEAPON_OPTIONS.map((option) => (
                        <div key={option.value} className="relative">
                          <RadioGroupItem 
                            value={option.value} 
                            id={option.value}
                            className="sr-only peer"
                          />
                          <label 
                            htmlFor={option.value}
                            className="p-6 border-2 border-warm-brown/20 rounded-xl text-center hover:border-forest transition-colors bg-cream/30 hover:bg-cream/50 cursor-pointer block peer-checked:border-forest peer-checked:bg-cream"
                          >
                            <div className="text-3xl text-warm-brown mb-3">{option.icon}</div>
                            <p className="font-semibold text-forest">{option.label}</p>
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Question 3: Motivation */}
            <FormField
              control={form.control}
              name="motivation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-forest mb-4">
                    Защо се бориш?
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="space-y-3"
                    >
                      {MOTIVATION_OPTIONS.map((option) => (
                        <div key={option.value} className="relative">
                          <RadioGroupItem 
                            value={option.value} 
                            id={`motivation-${option.value}`}
                            className="sr-only peer"
                          />
                          <label 
                            htmlFor={`motivation-${option.value}`}
                            className="flex items-center p-4 border-2 border-warm-brown/20 rounded-xl cursor-pointer hover:border-forest transition-colors bg-cream/30 hover:bg-cream/50 peer-checked:border-forest peer-checked:bg-cream"
                          >
                            <div className="w-4 h-4 border-2 border-forest rounded-full mr-4 peer-checked:bg-forest flex items-center justify-center">
                              <div className="w-2 h-2 bg-forest rounded-full opacity-0 peer-checked:opacity-100"></div>
                            </div>
                            <span className="font-medium">{option.label}</span>
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Collection */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-forest">
                    Въведи своя имейл, за да се присъединиш:
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="твоят@имейл.bg"
                      className="w-full p-4 border-2 border-warm-brown/20 rounded-xl focus:border-forest bg-cream/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={submitQuizMutation.isPending}
              className="w-full bg-traditional-red hover:bg-traditional-red/90 text-white font-bold py-4 px-8 rounded-xl transition-colors transform hover:scale-105 text-lg"
            >
              {submitQuizMutation.isPending ? "Изпращане..." : "ПРИСЪЕДИНИ СЕ КЪМ ДВИЖЕНИЕТО"}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
