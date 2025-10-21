import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { generateAboutMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateAboutMetadata();

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-vintage-cream">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <Image
          src="/bacho-video-poster.webp"
          alt="Бачо Илия - Истински български млечни продукти"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-traditional-brown/90 via-traditional-brown/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto max-w-5xl">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-vintage-cream mb-4">
              Историята на Бачо Илия
            </h1>
            <p className="text-xl text-vintage-cream/90 max-w-3xl">
              От 1995 година правим сирене точно както ти баба го правеше
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-5xl py-12">
        {/* Our Story */}
        <section className="mb-16">
          <div className="bg-parchment border-2 border-traditional-brown rounded-lg p-8 shadow-vintage">
            <h2 className="font-display text-3xl text-traditional-brown mb-6">
              Как Започна Всичко
            </h2>
            <div className="prose prose-lg max-w-none text-warm-brown">
              <p className="text-lg leading-relaxed mb-4">
                Помниш ли как бабините сирена миришеха? Как киселото мляко беше с корица
                отгоре и се ядеше с лъжица? Как айранът беше гъст и утоляваше жаждата
                по-добре от всичко друго?
              </p>
              <p className="text-lg leading-relaxed mb-4">
                Точно за този вкус мечтаехме когато започнахме през 1995 година. Илия,
                чийто дядо всички наричаха "Бачо", взе бабината рецепта за бяло сирене
                и реши - няма повече да търся този вкус по магазините. Ще го правя сам.
              </p>
              <p className="text-lg leading-relaxed mb-4">
                Първото сирене го направи в малък цех в Пловдив. Само краве мляко, сол
                и култура. Нищо повече. Съседите опитаха и казаха "Бачо Илия, това е като
                на село!". Името си остана.
              </p>
              <p className="text-lg leading-relaxed">
                Днес, 30 години по-късно, все още правим продуктите по същия начин.
                Защото ако нещо е добро, защо да го променяш?
              </p>
            </div>
          </div>
        </section>

        {/* Milkylux Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-bulgarian-red to-bulgarian-red text-vintage-cream rounded-lg p-8 shadow-vintage">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
              <div className="flex-1">
                <h2 className="font-display text-3xl mb-4">
                  Част от Семейството Milkylux
                </h2>
                <p className="text-lg leading-relaxed mb-4">
                  От 2015 година Бачо Илия е част от Milkylux - компания която произвежда
                  традиционни български млечни продукти за пазарите в България и чужбина.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  Какво се промени? Цехът стана по-голям, опаковките по-хубави,
                  контролът на качеството по-строг. Какво НЕ се промени? Рецептите.
                  Тези остават същите като в началото.
                </p>
                <a
                  href="https://milkylux.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-vintage-cream text-bulgarian-red px-8 py-4 rounded-lg font-bold text-lg hover:bg-parchment transition-all hover:scale-105 shadow-lg"
                >
                  Разгледай Milkylux →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-16">
          <h2 className="font-display text-3xl text-traditional-brown text-center mb-8">
            Как Правим Продуктите
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-parchment border-2 border-traditional-brown rounded-lg p-6 shadow-vintage">
              <h3 className="font-display text-xl text-traditional-brown mb-3 text-center">
                Добро Мляко = Добро Сирене
              </h3>
              <p className="text-warm-brown text-center">
                Работим с ферми където кравите пасат навън, не стоят в клетки.
                Звучи просто, ама това прави огромна разлика във вкуса.
              </p>
            </div>

            <div className="bg-parchment border-2 border-traditional-brown rounded-lg p-6 shadow-vintage">
              <h3 className="font-display text-xl text-traditional-brown mb-3 text-center">
                Без Бързане
              </h3>
              <p className="text-warm-brown text-center">
                Сиренето узрява минимум 30 дни. Киселото мляко се прави всеки ден прясно.
                Айранът се пакетира същия ден. Не търсим начини да ускорим нещата.
              </p>
            </div>

            <div className="bg-parchment border-2 border-traditional-brown rounded-lg p-6 shadow-vintage">
              <h3 className="font-display text-xl text-traditional-brown mb-3 text-center">
                Четете Етикета
              </h3>
              <p className="text-warm-brown text-center">
                Нашите продукти имат 3-4 съставки. Мляко, сол, култура. Толкова.
                Ако видите списък с 15 неща на друга опаковка - запитайте се защо.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-16">
          <h2 className="font-display text-3xl text-traditional-brown text-center mb-8">
            30 Години в 4 Момента
          </h2>
          <div className="bg-parchment border-2 border-traditional-brown rounded-lg p-8 shadow-vintage">
            <div className="space-y-6">
              <div className="flex gap-4 pb-6 border-b border-traditional-brown/20">
                <div className="flex-shrink-0 w-16 h-16 bg-bulgarian-red text-vintage-cream rounded-full flex items-center justify-center font-bold text-lg">
                  1995
                </div>
                <div>
                  <h3 className="font-bold text-traditional-brown text-xl mb-2">
                    Първото Сирене
                  </h3>
                  <p className="text-warm-brown">
                    Илия прави първото сирене в малък цех в Пловдив. Съседите опитват
                    и искат още. Бавно започва да продава на пазара.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pb-6 border-b border-traditional-brown/20">
                <div className="flex-shrink-0 w-16 h-16 bg-bulgarian-red text-vintage-cream rounded-full flex items-center justify-center font-bold text-lg">
                  2003
                </div>
                <div>
                  <h3 className="font-bold text-traditional-brown text-xl mb-2">
                    Кисело Мляко и Кашкавал
                  </h3>
                  <p className="text-warm-brown">
                    Клиентите питат "Правиш ли кисело мляко?". Започваме да правим и
                    кашкавал, и кисело мляко по същите бабини рецепти.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pb-6 border-b border-traditional-brown/20">
                <div className="flex-shrink-0 w-16 h-16 bg-bulgarian-red text-vintage-cream rounded-full flex items-center justify-center font-bold text-lg">
                  2015
                </div>
                <div>
                  <h3 className="font-bold text-traditional-brown text-xl mb-2">
                    Присъединяване към Milkylux
                  </h3>
                  <p className="text-warm-brown">
                    Бачо Илия става част от холдинга Milkylux. По-голям цех, по-строг
                    контрол, но същите рецепти като преди 20 години.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-16 h-16 bg-bulgarian-red text-vintage-cream rounded-full flex items-center justify-center font-bold text-lg">
                  2025
                </div>
                <div>
                  <h3 className="font-bold text-traditional-brown text-xl mb-2">
                    Днес
                  </h3>
                  <p className="text-warm-brown">
                    Хиляди български семейства ядат нашите продукти всяка седмица.
                    Децата растат със същите вкусове с които техните родители са
                    пораснали на село.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-bulgarian-red to-bulgarian-red text-vintage-cream rounded-lg p-8 text-center shadow-vintage">
          <h2 className="font-display text-3xl mb-4">
            Опитай Продуктите Безплатно
          </h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Участвай в нашето раздаване и спечели пакет с продукти. Вкус от село,
            доставен до вратата ти.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-block bg-vintage-cream text-bulgarian-red px-8 py-4 rounded-lg font-bold text-lg hover:bg-parchment transition-all hover:scale-105 shadow-lg"
            >
              Участвай в Раздаването
            </Link>
            <Link
              href="/products"
              className="inline-block bg-transparent border-2 border-vintage-cream text-vintage-cream px-8 py-4 rounded-lg font-bold text-lg hover:bg-vintage-cream hover:text-bulgarian-red transition-all hover:scale-105"
            >
              Виж Продуктите
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
