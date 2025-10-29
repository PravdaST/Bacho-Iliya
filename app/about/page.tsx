import { Metadata } from 'next';
import Link from 'next/link';
import { generateAboutMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateAboutMetadata();

export default function AboutPage() {
  return (
    <div className="bg-vintage-cream min-h-screen">
      {/* Hero Section with Video */}
      <section className="relative h-[400px] overflow-hidden md:h-[500px] lg:h-[600px]">
        {/* YouTube Video Background */}
        <div className="absolute inset-0 h-full w-full">
          <iframe
            className="pointer-events-none absolute top-1/2 left-1/2 h-[300%] w-[300%] -translate-x-1/2 -translate-y-1/2 md:h-[200%] md:w-[200%]"
            src="https://www.youtube.com/embed/xnPMI6cEhR4?autoplay=1&mute=1&controls=0&loop=1&playlist=xnPMI6cEhR4&modestbranding=1&rel=0&showinfo=0&disablekb=1&fs=0&iv_load_policy=3"
            title="Презентация Милки лукс"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            style={{ border: 'none' }}
          />
        </div>

        {/* Gradient Overlay - Moderate */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />

        {/* Content */}
        <div className="absolute right-0 bottom-0 left-0 z-20 p-8">
          <div className="container mx-auto max-w-5xl">
            <h1 className="font-heading mb-4 text-5xl text-white drop-shadow-lg md:text-6xl lg:text-7xl">
              Историята на Бачо Илия
            </h1>
            <p className="font-body max-w-3xl text-2xl font-semibold text-white drop-shadow-md md:text-3xl">
              От 1995 година правим сирене точно както ти баба го правеше
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto max-w-5xl px-4 py-12">
        {/* Our Story */}
        <section className="mb-16">
          <div className="bg-parchment border-traditional-brown shadow-vintage rounded-lg border-2 p-8">
            <h2 className="font-handwritten text-traditional-brown mb-6 text-4xl">
              Как Започна Всичко
            </h2>
            <div className="prose prose-lg text-warm-brown max-w-none">
              <p className="font-handwritten mb-4 text-xl leading-relaxed font-semibold md:text-2xl">
                Помниш ли как бабините сирена миришеха? Как киселото мляко беше с корица отгоре и се
                ядеше с лъжица? Как айранът беше гъст и утоляваше жаждата по-добре от всичко друго?
              </p>
              <p className="font-handwritten mb-4 text-xl leading-relaxed font-semibold md:text-2xl">
                Точно за този вкус мечтаехме когато започнахме през 1995 година. Илия, чийто дядо
                всички наричаха "Бачо", взе бабината рецепта за бяло сирене и реши - няма повече да
                търся този вкус по магазините. Ще го правя сам.
              </p>
              <p className="font-handwritten mb-4 text-xl leading-relaxed font-semibold md:text-2xl">
                Първото сирене го направи в малък цех в Пловдив. Само краве мляко, сол и култура.
                Нищо повече. Съседите опитаха и казаха "Бачо Илия, това е като на село!". Името си
                остана.
              </p>
              <p className="font-handwritten text-xl leading-relaxed font-semibold md:text-2xl">
                Днес, 30 години по-късно, все още правим продуктите по същия начин. Защото ако нещо
                е добро, защо да го променяш?
              </p>
            </div>
          </div>
        </section>

        {/* Milkylux Section */}
        <section className="mb-16">
          <div className="from-bulgarian-red to-bulgarian-red shadow-vintage rounded-lg bg-gradient-to-br p-8 text-white">
            <div className="mb-6 flex flex-col items-center gap-6 md:flex-row">
              <div className="flex-1">
                <h2 className="font-heading mb-4 text-4xl text-white">
                  Част от Семейството Milkylux
                </h2>
                <p className="font-body mb-4 text-lg leading-relaxed text-white">
                  От 2015 година Бачо Илия е част от Milkylux - компания създадена през 1996 година,
                  която произвежда традиционни български млечни продукти за пазарите в България и
                  чужбина.
                </p>
                <p className="font-body mb-4 text-lg leading-relaxed text-white">
                  С над 27 години опит, производственият цех в град Бяла Черква разполага с площ от
                  25,000 кв.м и преработва 130,000 литра мляко дневно. Милкилукс работи с
                  първокатегорийни ферми от 6 региона - В. Търново, Русе, Плевен, Ловеч, Търговище и
                  Враца.
                </p>
                <p className="font-body mb-6 text-lg leading-relaxed text-white">
                  Какво се промени? Цехът стана по-голям, опаковките по-хубави, контролът на
                  качеството по-строг. Какво НЕ се промени? Рецептите. Тези остават същите като в
                  началото.
                </p>
                <a
                  href="https://milkylux.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bulgarian-red hover:bg-cream inline-block rounded-lg bg-white px-8 py-4 text-lg font-bold shadow-lg transition-all hover:scale-105"
                >
                  Разгледай Milkylux →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Production Capacity & Quality */}
        <section className="mb-12 md:mb-20">
          <h2 className="font-handwritten text-traditional-brown mb-6 text-center text-3xl md:mb-10 md:text-4xl">
            Производство и Качество
          </h2>
          <div className="mb-6 grid grid-cols-1 gap-4 md:mb-8 md:grid-cols-2 md:gap-6">
            {/* Production Capacity */}
            <div className="bg-parchment border-traditional-brown shadow-vintage rounded-lg border-2 p-6">
              <h3 className="font-handwritten text-traditional-brown mb-4 text-3xl">
                Производствен капацитет
              </h3>
              <ul className="text-warm-brown font-handwritten space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-bulgarian-red text-xl font-bold">•</span>
                  <span>130,000 литра дневна преработка на мляко</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-bulgarian-red text-xl font-bold">•</span>
                  <span>100 тона сирене на смяна</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-bulgarian-red text-xl font-bold">•</span>
                  <span>20 тона кашкавал дневно</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-bulgarian-red text-xl font-bold">•</span>
                  <span>1,500 тона месечен капацитет специалитети</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-bulgarian-red text-xl font-bold">•</span>
                  <span>200 тона класически бели саламурени сирена месечно</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-bulgarian-red text-xl font-bold">•</span>
                  <span>25,000 кв.м производствена площ</span>
                </li>
              </ul>
            </div>

            {/* Quality Certifications */}
            <div className="bg-parchment border-traditional-brown shadow-vintage rounded-lg border-2 p-6">
              <h3 className="font-handwritten text-traditional-brown mb-4 text-3xl">
                Сертификати и награди
              </h3>
              <ul className="text-warm-brown font-handwritten space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-bulgarian-red text-xl font-bold">✓</span>
                  <span>
                    <strong>HACCP</strong> - система за самоконтрол и лицензиране
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-bulgarian-red text-xl font-bold">✓</span>
                  <span>
                    <strong>IFS</strong> - International Food Standard сертификация
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-bulgarian-red text-xl font-bold">✓</span>
                  <span>
                    <strong>Kosher</strong> - сертификация за кошер продукти
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-bulgarian-red text-xl font-bold">✓</span>
                  <span>
                    <strong>Halal</strong> - сертификация за халал продукти
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-bulgarian-red text-xl font-bold">✓</span>
                  <span>
                    <strong>IQS</strong> - сертификация за качество
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-bulgarian-red text-xl font-bold">🏆</span>
                  <span>
                    <strong>5 златни медала</strong> за качество от Inter Expo Center - София
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="from-sunflower/20 to-sunflower/10 border-sunflower rounded border-l-4 bg-gradient-to-r p-6">
            <p className="font-handwritten text-warm-brown text-center text-lg leading-relaxed">
              <strong>Използваме само мляко от първокатегорийни ферми</strong> от 6 региона на
              България. Произвеждаме млечни продукти по оригинална българска технология с най-висок
              стандарт за качество.
            </p>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-12 md:mb-20">
          <h2 className="font-handwritten text-traditional-brown mb-6 text-center text-3xl md:mb-10 md:text-4xl">
            Как Правим Продуктите
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            <div className="bg-parchment border-traditional-brown shadow-vintage rounded-lg border-2 p-6">
              <h3 className="font-handwritten text-traditional-brown mb-3 text-center text-2xl">
                Добро Мляко = Добро Сирене
              </h3>
              <p className="font-handwritten text-warm-brown text-center">
                Работим с ферми където кравите пасат навън, не стоят в клетки. Звучи просто, ама
                това прави огромна разлика във вкуса.
              </p>
            </div>

            <div className="bg-parchment border-traditional-brown shadow-vintage rounded-lg border-2 p-6">
              <h3 className="font-handwritten text-traditional-brown mb-3 text-center text-2xl">
                Без Бързане
              </h3>
              <p className="font-handwritten text-warm-brown text-center">
                Сиренето узрява минимум 30 дни. Киселото мляко се прави всеки ден прясно. Айранът се
                пакетира същия ден. Не търсим начини да ускорим нещата.
              </p>
            </div>

            <div className="bg-parchment border-traditional-brown shadow-vintage rounded-lg border-2 p-6">
              <h3 className="font-handwritten text-traditional-brown mb-3 text-center text-2xl">
                Четете Етикета
              </h3>
              <p className="font-handwritten text-warm-brown text-center">
                Нашите продукти имат 3-4 съставки. Мляко, сол, култура. Толкова. Ако видите списък с
                15 неща на друга опаковка - запитайте се защо.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline - Visual Modern Design */}
        <section className="mb-16 md:mb-24">
          <h2 className="font-handwritten text-traditional-brown mb-8 text-center text-3xl md:mb-16 md:text-5xl">
            30 Години в 6 Ключови Момента
          </h2>

          {/* Timeline Container */}
          <div className="relative mx-auto max-w-5xl">
            {/* Vertical Line (Mobile & Desktop) */}
            <div className="from-bulgarian-red via-sunflower to-bulgarian-red absolute top-0 bottom-0 left-8 w-0.5 bg-gradient-to-b md:left-1/2 md:-translate-x-1/2 md:transform" />

            {/* Timeline Items */}
            <div className="space-y-12 md:space-y-16">
              {/* 1995 - Right Side (Mobile: always right, Desktop: alternating) */}
              <div className="relative flex items-start md:items-center">
                <div className="bg-bulgarian-red border-old-paper absolute left-8 z-10 h-4 w-4 rounded-full border-4 md:left-1/2 md:-translate-x-1/2 md:transform" />
                <div className="ml-16 md:ml-0 md:w-1/2 md:pr-12 md:text-right">
                  <div className="bg-parchment border-traditional-brown shadow-vintage rounded-lg border-2 p-4 md:p-6">
                    <span className="bg-bulgarian-red mb-2 inline-block rounded px-3 py-1 text-sm font-bold text-white">
                      1995
                    </span>
                    <h3 className="font-handwritten text-traditional-brown mb-2 text-xl md:text-2xl">
                      Първото Сирене
                    </h3>
                    <p className="font-handwritten text-warm-brown text-sm leading-relaxed md:text-base">
                      Илия прави първото сирене в малък цех в Пловдив. Съседите опитват и искат още.
                    </p>
                  </div>
                </div>
              </div>

              {/* 1996 - Left Side (Desktop only) */}
              <div className="relative flex items-start md:items-center">
                <div className="bg-sunflower border-old-paper absolute left-8 z-10 h-4 w-4 rounded-full border-4 md:left-1/2 md:-translate-x-1/2 md:transform" />
                <div className="ml-16 md:ml-0 md:ml-auto md:w-1/2 md:pl-12">
                  <div className="bg-parchment border-traditional-brown shadow-vintage rounded-lg border-2 p-4 md:p-6">
                    <span className="bg-sunflower text-traditional-brown mb-2 inline-block rounded px-3 py-1 text-sm font-bold">
                      1996
                    </span>
                    <h3 className="font-handwritten text-traditional-brown mb-2 text-xl md:text-2xl">
                      Създаване на Milkylux
                    </h3>
                    <p className="font-handwritten text-warm-brown text-sm leading-relaxed md:text-base">
                      Основава се дружество "Милки Лукс" ЕООД. Започва изграждането на модерен
                      млекопреработвателен цех.
                    </p>
                  </div>
                </div>
              </div>

              {/* 1999 - Right Side */}
              <div className="relative flex items-start md:items-center">
                <div className="bg-bulgarian-red border-old-paper absolute left-8 z-10 h-4 w-4 rounded-full border-4 md:left-1/2 md:-translate-x-1/2 md:transform" />
                <div className="ml-16 md:ml-0 md:w-1/2 md:pr-12 md:text-right">
                  <div className="bg-parchment border-traditional-brown shadow-vintage rounded-lg border-2 p-4 md:p-6">
                    <span className="bg-bulgarian-red mb-2 inline-block rounded px-3 py-1 text-sm font-bold text-white">
                      1999
                    </span>
                    <h3 className="font-handwritten text-traditional-brown mb-2 text-xl md:text-2xl">
                      Старт на производството
                    </h3>
                    <p className="font-handwritten text-warm-brown text-sm leading-relaxed md:text-base">
                      Цехът в Бяла Черква започва работа с капацитет 130,000 литра мляко дневно.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2003 - Left Side (Desktop) */}
              <div className="relative flex items-start md:items-center">
                <div className="bg-sunflower border-old-paper absolute left-8 z-10 h-4 w-4 rounded-full border-4 md:left-1/2 md:-translate-x-1/2 md:transform" />
                <div className="ml-16 md:ml-0 md:ml-auto md:w-1/2 md:pl-12">
                  <div className="bg-parchment border-traditional-brown shadow-vintage rounded-lg border-2 p-4 md:p-6">
                    <span className="bg-sunflower text-traditional-brown mb-2 inline-block rounded px-3 py-1 text-sm font-bold">
                      2003
                    </span>
                    <h3 className="font-handwritten text-traditional-brown mb-2 text-xl md:text-2xl">
                      Разширяване на гамата
                    </h3>
                    <p className="font-handwritten text-warm-brown text-sm leading-relaxed md:text-base">
                      Започваме производство на кашкавал и кисело мляко. 20 тона кашкавал дневно.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2015 - Right Side */}
              <div className="relative flex items-start md:items-center">
                <div className="bg-bulgarian-red border-old-paper absolute left-8 z-10 h-4 w-4 rounded-full border-4 md:left-1/2 md:-translate-x-1/2 md:transform" />
                <div className="ml-16 md:ml-0 md:w-1/2 md:pr-12 md:text-right">
                  <div className="bg-parchment border-traditional-brown shadow-vintage rounded-lg border-2 p-4 md:p-6">
                    <span className="bg-bulgarian-red mb-2 inline-block rounded px-3 py-1 text-sm font-bold text-white">
                      2015
                    </span>
                    <h3 className="font-handwritten text-traditional-brown mb-2 text-xl md:text-2xl">
                      Присъединяване към Milkylux
                    </h3>
                    <p className="font-handwritten text-warm-brown text-sm leading-relaxed md:text-base">
                      Бачо Илия става част от семейството Milkylux. Международни сертификати, същите
                      рецепти.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2025 - Left Side (Desktop) with special styling */}
              <div className="relative flex items-start md:items-center">
                <div className="from-bulgarian-red to-sunflower border-old-paper absolute left-8 z-10 h-6 w-6 animate-pulse rounded-full border-4 bg-gradient-to-br shadow-lg md:left-1/2 md:-translate-x-1/2 md:transform" />
                <div className="ml-16 md:ml-0 md:ml-auto md:w-1/2 md:pl-12">
                  <div className="from-bulgarian-red/10 to-sunflower/10 border-bulgarian-red rounded-lg border-2 bg-gradient-to-br p-4 shadow-xl md:p-6">
                    <span className="from-bulgarian-red to-sunflower mb-2 inline-block rounded bg-gradient-to-r px-4 py-1 text-sm font-bold text-white">
                      2025 - ДНЕС
                    </span>
                    <h3 className="font-handwritten text-bulgarian-red mb-2 text-xl md:text-2xl">
                      Днес
                    </h3>
                    <p className="font-handwritten text-warm-brown text-sm leading-relaxed font-semibold md:text-base">
                      27 години опит, 5 златни медала, 90+ магазина в цяла България. Хиляди
                      семейства с нас всяка седмица.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="from-bulgarian-red to-bulgarian-red text-vintage-cream shadow-vintage rounded-lg bg-gradient-to-r p-6 text-center md:p-10">
          <h2 className="font-handwritten mb-3 text-3xl md:mb-4 md:text-4xl">
            Опитай Продуктите Безплатно
          </h2>
          <p className="font-handwritten mx-auto mb-6 max-w-2xl text-base md:mb-8 md:text-xl">
            Участвай в нашето раздаване и спечели пакет с продукти. Вкус от село, доставен до
            вратата ти.
          </p>
          <div className="mx-auto flex max-w-md flex-col justify-center gap-3 sm:flex-row md:max-w-none md:gap-4">
            <Link
              href="/"
              className="bg-vintage-cream text-bulgarian-red hover:bg-parchment inline-block w-full rounded-lg px-6 py-3 text-base font-bold shadow-lg transition-all hover:scale-105 sm:w-auto md:px-8 md:py-4 md:text-lg"
            >
              Участвай в Раздаването
            </Link>
            <Link
              href="/products"
              className="border-vintage-cream text-vintage-cream hover:bg-vintage-cream hover:text-bulgarian-red inline-block w-full rounded-lg border-2 bg-transparent px-6 py-3 text-base font-bold transition-all hover:scale-105 sm:w-auto md:px-8 md:py-4 md:text-lg"
            >
              Виж Продуктите
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
