import { Metadata } from 'next';
import Link from 'next/link';
import { generateAboutMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateAboutMetadata();

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-vintage-cream">
      {/* Hero Section with Video */}
      <section className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
        {/* YouTube Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <iframe
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] md:w-[200%] md:h-[200%] pointer-events-none"
            src="https://www.youtube.com/embed/xnPMI6cEhR4?autoplay=1&mute=1&controls=0&loop=1&playlist=xnPMI6cEhR4&modestbranding=1&rel=0&showinfo=0&disablekb=1&fs=0&iv_load_policy=3"
            title="Презентация Милки лукс"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            style={{ border: 'none' }}
          />
        </div>

        {/* Gradient Overlay - Moderate */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20 z-10" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
          <div className="container mx-auto max-w-5xl">
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white mb-4 drop-shadow-lg">
              Историята на Бачо Илия
            </h1>
            <p className="font-body text-2xl md:text-3xl text-white max-w-3xl drop-shadow-md font-semibold">
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
            <h2 className="font-handwritten text-4xl text-traditional-brown mb-6">
              Как Започна Всичко
            </h2>
            <div className="prose prose-lg max-w-none text-warm-brown">
              <p className="font-handwritten text-xl md:text-2xl leading-relaxed mb-4 font-semibold">
                Помниш ли как бабините сирена миришеха? Как киселото мляко беше с корица
                отгоре и се ядеше с лъжица? Как айранът беше гъст и утоляваше жаждата
                по-добре от всичко друго?
              </p>
              <p className="font-handwritten text-xl md:text-2xl leading-relaxed mb-4 font-semibold">
                Точно за този вкус мечтаехме когато започнахме през 1995 година. Илия,
                чийто дядо всички наричаха "Бачо", взе бабината рецепта за бяло сирене
                и реши - няма повече да търся този вкус по магазините. Ще го правя сам.
              </p>
              <p className="font-handwritten text-xl md:text-2xl leading-relaxed mb-4 font-semibold">
                Първото сирене го направи в малък цех в Пловдив. Само краве мляко, сол
                и култура. Нищо повече. Съседите опитаха и казаха "Бачо Илия, това е като
                на село!". Името си остана.
              </p>
              <p className="font-handwritten text-xl md:text-2xl leading-relaxed font-semibold">
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
                <h2 className="font-handwritten text-4xl mb-4">
                  Част от Семейството Milkylux
                </h2>
                <p className="font-handwritten text-lg leading-relaxed mb-4">
                  От 2015 година Бачо Илия е част от Milkylux - компания създадена през 1996 година,
                  която произвежда традиционни български млечни продукти за пазарите в България и чужбина.
                </p>
                <p className="font-handwritten text-lg leading-relaxed mb-4">
                  С над 27 години опит, производственият цех в град Бяла Черква разполага с площ от
                  25,000 кв.м и преработва 130,000 литра мляко дневно. Милкилукс работи с първокатегорийни
                  ферми от 6 региона - В. Търново, Русе, Плевен, Ловеч, Търговище и Враца.
                </p>
                <p className="font-handwritten text-lg leading-relaxed mb-6">
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

        {/* Production Capacity & Quality */}
        <section className="mb-12 md:mb-20">
          <h2 className="font-handwritten text-3xl md:text-4xl text-traditional-brown text-center mb-6 md:mb-10">
            Производство и Качество
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
            {/* Production Capacity */}
            <div className="bg-parchment border-2 border-traditional-brown rounded-lg p-6 shadow-vintage">
              <h3 className="font-handwritten text-3xl text-traditional-brown mb-4">
                Производствен капацитет
              </h3>
              <ul className="space-y-3 text-warm-brown font-handwritten">
                <li className="flex items-start gap-3">
                  <span className="text-bulgarian-red font-bold text-xl">•</span>
                  <span>130,000 литра дневна преработка на мляко</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-bulgarian-red font-bold text-xl">•</span>
                  <span>100 тона сирене на смяна</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-bulgarian-red font-bold text-xl">•</span>
                  <span>20 тона кашкавал дневно</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-bulgarian-red font-bold text-xl">•</span>
                  <span>1,500 тона месечен капацитет специалитети</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-bulgarian-red font-bold text-xl">•</span>
                  <span>200 тона класически бели саламурени сирена месечно</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-bulgarian-red font-bold text-xl">•</span>
                  <span>25,000 кв.м производствена площ</span>
                </li>
              </ul>
            </div>

            {/* Quality Certifications */}
            <div className="bg-parchment border-2 border-traditional-brown rounded-lg p-6 shadow-vintage">
              <h3 className="font-handwritten text-3xl text-traditional-brown mb-4">
                Сертификати и награди
              </h3>
              <ul className="space-y-3 text-warm-brown font-handwritten">
                <li className="flex items-start gap-3">
                  <span className="text-bulgarian-red font-bold text-xl">✓</span>
                  <span><strong>HACCP</strong> - система за самоконтрол и лицензиране</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-bulgarian-red font-bold text-xl">✓</span>
                  <span><strong>IFS</strong> - International Food Standard сертификация</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-bulgarian-red font-bold text-xl">✓</span>
                  <span><strong>Kosher</strong> - сертификация за кошер продукти</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-bulgarian-red font-bold text-xl">✓</span>
                  <span><strong>Halal</strong> - сертификация за халал продукти</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-bulgarian-red font-bold text-xl">✓</span>
                  <span><strong>IQS</strong> - сертификация за качество</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-bulgarian-red font-bold text-xl">🏆</span>
                  <span><strong>5 златни медала</strong> за качество от Inter Expo Center - София</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-sunflower/20 to-sunflower/10 border-l-4 border-sunflower p-6 rounded">
            <p className="font-handwritten text-warm-brown text-lg leading-relaxed text-center">
              <strong>Използваме само мляко от първокатегорийни ферми</strong> от 6 региона на България.
              Произвеждаме млечни продукти по оригинална българска технология с най-висок стандарт за качество.
            </p>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-12 md:mb-20">
          <h2 className="font-handwritten text-3xl md:text-4xl text-traditional-brown text-center mb-6 md:mb-10">
            Как Правим Продуктите
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-parchment border-2 border-traditional-brown rounded-lg p-6 shadow-vintage">
              <h3 className="font-handwritten text-2xl text-traditional-brown mb-3 text-center">
                Добро Мляко = Добро Сирене
              </h3>
              <p className="font-handwritten text-warm-brown text-center">
                Работим с ферми където кравите пасат навън, не стоят в клетки.
                Звучи просто, ама това прави огромна разлика във вкуса.
              </p>
            </div>

            <div className="bg-parchment border-2 border-traditional-brown rounded-lg p-6 shadow-vintage">
              <h3 className="font-handwritten text-2xl text-traditional-brown mb-3 text-center">
                Без Бързане
              </h3>
              <p className="font-handwritten text-warm-brown text-center">
                Сиренето узрява минимум 30 дни. Киселото мляко се прави всеки ден прясно.
                Айранът се пакетира същия ден. Не търсим начини да ускорим нещата.
              </p>
            </div>

            <div className="bg-parchment border-2 border-traditional-brown rounded-lg p-6 shadow-vintage">
              <h3 className="font-handwritten text-2xl text-traditional-brown mb-3 text-center">
                Четете Етикета
              </h3>
              <p className="font-handwritten text-warm-brown text-center">
                Нашите продукти имат 3-4 съставки. Мляко, сол, култура. Толкова.
                Ако видите списък с 15 неща на друга опаковка - запитайте се защо.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline - Visual Modern Design */}
        <section className="mb-16 md:mb-24">
          <h2 className="font-handwritten text-3xl md:text-5xl text-traditional-brown text-center mb-8 md:mb-16">
            30 Години в 6 Ключови Момента
          </h2>

          {/* Timeline Container */}
          <div className="relative max-w-5xl mx-auto">
            {/* Vertical Line (Mobile & Desktop) */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-bulgarian-red via-sunflower to-bulgarian-red md:transform md:-translate-x-1/2" />

            {/* Timeline Items */}
            <div className="space-y-12 md:space-y-16">
              {/* 1995 - Right Side (Mobile: always right, Desktop: alternating) */}
              <div className="relative flex items-start md:items-center">
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-bulgarian-red rounded-full border-4 border-old-paper md:transform md:-translate-x-1/2 z-10" />
                <div className="ml-16 md:ml-0 md:w-1/2 md:pr-12 md:text-right">
                  <div className="bg-parchment border-2 border-traditional-brown rounded-lg p-4 md:p-6 shadow-vintage">
                    <span className="inline-block bg-bulgarian-red text-white px-3 py-1 text-sm font-bold rounded mb-2">1995</span>
                    <h3 className="font-handwritten text-xl md:text-2xl text-traditional-brown mb-2">
                      Първото Сирене
                    </h3>
                    <p className="font-handwritten text-sm md:text-base text-warm-brown leading-relaxed">
                      Илия прави първото сирене в малък цех в Пловдив. Съседите опитват и искат още.
                    </p>
                  </div>
                </div>
              </div>

              {/* 1996 - Left Side (Desktop only) */}
              <div className="relative flex items-start md:items-center">
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-sunflower rounded-full border-4 border-old-paper md:transform md:-translate-x-1/2 z-10" />
                <div className="ml-16 md:ml-0 md:w-1/2 md:ml-auto md:pl-12">
                  <div className="bg-parchment border-2 border-traditional-brown rounded-lg p-4 md:p-6 shadow-vintage">
                    <span className="inline-block bg-sunflower text-traditional-brown px-3 py-1 text-sm font-bold rounded mb-2">1996</span>
                    <h3 className="font-handwritten text-xl md:text-2xl text-traditional-brown mb-2">
                      Създаване на Milkylux
                    </h3>
                    <p className="font-handwritten text-sm md:text-base text-warm-brown leading-relaxed">
                      Основава се дружество "Милки Лукс" ЕООД. Започва изграждането на модерен млекопреработвателен цех.
                    </p>
                  </div>
                </div>
              </div>

              {/* 1999 - Right Side */}
              <div className="relative flex items-start md:items-center">
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-bulgarian-red rounded-full border-4 border-old-paper md:transform md:-translate-x-1/2 z-10" />
                <div className="ml-16 md:ml-0 md:w-1/2 md:pr-12 md:text-right">
                  <div className="bg-parchment border-2 border-traditional-brown rounded-lg p-4 md:p-6 shadow-vintage">
                    <span className="inline-block bg-bulgarian-red text-white px-3 py-1 text-sm font-bold rounded mb-2">1999</span>
                    <h3 className="font-handwritten text-xl md:text-2xl text-traditional-brown mb-2">
                      Старт на производството
                    </h3>
                    <p className="font-handwritten text-sm md:text-base text-warm-brown leading-relaxed">
                      Цехът в Бяла Черква започва работа с капацитет 130,000 литра мляко дневно.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2003 - Left Side (Desktop) */}
              <div className="relative flex items-start md:items-center">
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-sunflower rounded-full border-4 border-old-paper md:transform md:-translate-x-1/2 z-10" />
                <div className="ml-16 md:ml-0 md:w-1/2 md:ml-auto md:pl-12">
                  <div className="bg-parchment border-2 border-traditional-brown rounded-lg p-4 md:p-6 shadow-vintage">
                    <span className="inline-block bg-sunflower text-traditional-brown px-3 py-1 text-sm font-bold rounded mb-2">2003</span>
                    <h3 className="font-handwritten text-xl md:text-2xl text-traditional-brown mb-2">
                      Разширяване на гамата
                    </h3>
                    <p className="font-handwritten text-sm md:text-base text-warm-brown leading-relaxed">
                      Започваме производство на кашкавал и кисело мляко. 20 тона кашкавал дневно.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2015 - Right Side */}
              <div className="relative flex items-start md:items-center">
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-bulgarian-red rounded-full border-4 border-old-paper md:transform md:-translate-x-1/2 z-10" />
                <div className="ml-16 md:ml-0 md:w-1/2 md:pr-12 md:text-right">
                  <div className="bg-parchment border-2 border-traditional-brown rounded-lg p-4 md:p-6 shadow-vintage">
                    <span className="inline-block bg-bulgarian-red text-white px-3 py-1 text-sm font-bold rounded mb-2">2015</span>
                    <h3 className="font-handwritten text-xl md:text-2xl text-traditional-brown mb-2">
                      Присъединяване към Milkylux
                    </h3>
                    <p className="font-handwritten text-sm md:text-base text-warm-brown leading-relaxed">
                      Бачо Илия става част от семейството Milkylux. Международни сертификати, същите рецепти.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2025 - Left Side (Desktop) with special styling */}
              <div className="relative flex items-start md:items-center">
                <div className="absolute left-8 md:left-1/2 w-6 h-6 bg-gradient-to-br from-bulgarian-red to-sunflower rounded-full border-4 border-old-paper shadow-lg md:transform md:-translate-x-1/2 z-10 animate-pulse" />
                <div className="ml-16 md:ml-0 md:w-1/2 md:ml-auto md:pl-12">
                  <div className="bg-gradient-to-br from-bulgarian-red/10 to-sunflower/10 border-2 border-bulgarian-red rounded-lg p-4 md:p-6 shadow-xl">
                    <span className="inline-block bg-gradient-to-r from-bulgarian-red to-sunflower text-white px-4 py-1 text-sm font-bold rounded mb-2">2025 - ДНЕС</span>
                    <h3 className="font-handwritten text-xl md:text-2xl text-bulgarian-red mb-2">
                      Днес
                    </h3>
                    <p className="font-handwritten text-sm md:text-base text-warm-brown leading-relaxed font-semibold">
                      27 години опит, 5 златни медала, 90+ магазина в цяла България. Хиляди семейства с нас всяка седмица.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-bulgarian-red to-bulgarian-red text-vintage-cream rounded-lg p-6 md:p-10 text-center shadow-vintage">
          <h2 className="font-handwritten text-3xl md:text-4xl mb-3 md:mb-4">
            Опитай Продуктите Безплатно
          </h2>
          <p className="font-handwritten text-base md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">
            Участвай в нашето раздаване и спечели пакет с продукти. Вкус от село,
            доставен до вратата ти.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center max-w-md md:max-w-none mx-auto">
            <Link
              href="/"
              className="w-full sm:w-auto inline-block bg-vintage-cream text-bulgarian-red px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold text-base md:text-lg hover:bg-parchment transition-all hover:scale-105 shadow-lg"
            >
              Участвай в Раздаването
            </Link>
            <Link
              href="/products"
              className="w-full sm:w-auto inline-block bg-transparent border-2 border-vintage-cream text-vintage-cream px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold text-base md:text-lg hover:bg-vintage-cream hover:text-bulgarian-red transition-all hover:scale-105"
            >
              Виж Продуктите
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
