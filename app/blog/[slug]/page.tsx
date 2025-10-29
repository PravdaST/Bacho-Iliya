'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ClockIcon } from '@/components/ui/Icon';

const blogPosts = [
  {
    id: 1,
    title: 'Тайните на перфектната домашна лютеница: Вкусът, който ни връща в детството',
    excerpt:
      'Всяка есен, когато първите студени ветрове започнат да напомнят за себе си, въздухът в българските дворове се изпълва с един неповторим, сладникав и леко опушен аромат.',
    slug: 'taynite-na-lyutenicata',
    category: 'Бабини рецепти',
    date: '27 Октомври 2024',
    readTime: '5 мин четене',
    image: '/blog/lutenitsa-on-bread.png',
    author: 'Екипът на Бачо Илия',
    content: `Всяка есен, когато първите студени ветрове започнат да напомнят за себе си, въздухът в българските дворове се изпълва с един неповторим, сладникав и леко опушен аромат. Това е ароматът на лютеницата – не просто зимнина, а истински символ на българския дом, традиция и, разбира се, вкусът от детството.

В Бачо Илия вярваме, че някои неща не бива да се променят. Точно както нашето сирене се прави по бабини рецепти, така и перфектната лютеница изисква търпение, любов и спазването на няколко златни тайни.

<div className="text-center my-8">
  <img src="/blog/lutenitsa-ingredients.png" alt="Fresh ingredients for lutenitsa" className="w-full h-auto rounded-lg shadow-lg" />
</div>

## 1. Тайната на Суровината: Само Най-Доброто

Няма как да направите истинска лютеница от некачествени продукти. Тайната на Бачо Илия се крие в избора на зеленчуци:

• **Червен пипер (Капия)**: Трябва да е месест, напълно узрял и да има силен, сладък аромат. Това е основата на вкуса.

• **Домати**: Използвайте само добре узрели, червени домати. Те дават сладостта и плътността.

• **Патладжан (по желание)**: Той добавя онази специфична, леко опушена дълбочина на вкуса.

**Съвет от Бачо Илия**: Не бързайте! Изчакайте пиперът да узрее напълно. Качеството на лютеницата се определя още на полето.

<div className="text-center my-8">
  <img src="/blog/lutenitsa-cooking-process.png" alt="Traditional lutenitsa cooking process" className="w-full h-auto rounded-lg shadow-lg" />
</div>

## 2. Тайната на Печенето: Огънят е Душата

Много хора днес варят зеленчуците, за да спестят време, но това е първата грешка.

Истинският вкус на лютеницата идва от печенето на жар или във фурна на силен огън. Печенето кара захарите в пипера да се карамелизират, а лекият опушен аромат прониква в месестата част.

• **Защо печене?** Печенето отстранява излишната вода и концентрира вкуса. Освен това, то придава на лютеницата онзи тъмен, наситен цвят, който познаваме от детството.

• **След печенето**: Веднага покрийте пипера с влажна кърпа или го поставете в найлонов плик. Топлината ще задуши кората и тя ще се обели лесно.

## 3. Тайната на Смилането: Балансът

След като зеленчуците са опечени и обелени, идва моментът на смилането.

• **Груба или Фина?** Истинската домашна лютеница не е като бебешка храна. Тя трябва да има текстура. Смелете по-голямата част от пипера и доматите, но оставете една малка част от пипера на ситно нарязани парченца.

## 4. Тайната на Варенето: Търпението е Ключът

Това е най-дългата и най-важна част. Лютеницата трябва да се вари дълго и бавно, за да се изпари цялата вода и да се сгъсти.

• **Постоянно бъркане**: Лютеницата лесно загаря! Използвайте дървена лъжица и бъркайте постоянно, особено когато започне да се сгъстява.

• **Кога е готова?** Когато бъркате и видите дъното на тенджерата за секунда-две, преди лютеницата да се стече обратно, значи е готова!

## 5. Тайната на Подправките: Времето и Мястото

Подправките трябва да се добавят към края на варенето.

• **Мазнина**: Добавете олио или зехтин, за да "запечатате" вкуса.

• **Захар и Сол**: Добавете на вкус. Някои пипери са по-сладки, други – по-безвкусни.

• **Оцет (по желание)**: Малко оцет в края може да балансира сладостта и да служи като естествен консервант.

## Рецепта за Истинска Домашна Лютеница

**Продукти:**
- Червен пипер (Капия): 10 кг
- Домати: 5 кг
- Патладжан (по желание): 1 кг
- Олио/Зехтин: 500 мл
- Сол: На вкус (около 3-4 с.л.)
- Захар: На вкус (около 2-3 с.л.)
- Оцет (9%): 2-3 с.л.

**Приготвяне:**

1. **Печене**: Изпечете пипера и патладжана. Обелете ги и ги оставете да се отцедят.

2. **Домати**: Смелете доматите и ги сварете отделно, докато се сгъстят наполовина.

3. **Смилане**: Смелете опечените зеленчуци (оставете малко пипер на парченца).

4. **Варене**: Смесете всички смлени зеленчуци и ги добавете към сгъстения доматен сок.

5. **Търпение**: Варете на тих огън, като бъркате постоянно, докато лютеницата се сгъсти.

6. **Подправяне**: Добавете олиото, солта, захарта и оцета. Варете още 10-15 минути.

7. **Буркани**: Напълнете горещата лютеница в сухи, стерилизирани буркани. Затворете плътно и стерилизирайте за 10 минути.

<div className="text-center my-8">
  <img src="/blog/lutenitsa-jars.png" alt="Jars of homemade lutenitsa" className="w-full h-auto rounded-lg shadow-lg" />
</div>

## Вкусът от Детството

Лютеницата е най-вкусна, когато е споделена. Намажете дебел пласт върху филия домашен хляб и добавете парче автентично бяло сирене "Бачо Илия" – направено също с любов и без химия, точно както баба го е правила.

Това е перфектната комбинация от традиция и истински вкус.`,
  },
];

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="bg-old-paper flex min-h-screen items-center justify-center pt-32">
        <div className="text-center">
          <h1 className="font-handwritten text-walnut mb-4 text-4xl">Статията не е намерена</h1>
          <Link href="/blog" className="text-bulgarian-red font-handwritten hover:underline">
            Обратно към блога
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <div className="bg-old-paper relative min-h-screen overflow-hidden">
      <div className="bg-vintage-paper pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              href="/blog"
              className="text-bulgarian-red font-handwritten inline-flex items-center gap-2 hover:underline"
            >
              <span>←</span>
              <span>Обратно към блога</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="mb-4">
              <span className="bg-bulgarian-red font-handwritten inline-block px-4 py-1 text-sm tracking-wider text-white">
                {post.category}
              </span>
            </div>

            <h1 className="font-handwritten text-bulgarian-red mb-6 text-4xl leading-tight md:text-6xl">
              {post.title}
            </h1>

            <div className="text-walnut/70 font-handwritten flex flex-wrap items-center gap-4">
              <span>{post.date}</span>
              <span>•</span>
              <div className="flex items-center gap-2">
                <ClockIcon size={16} />
                <span>{post.readTime}</span>
              </div>
              <span>•</span>
              <span>{post.author}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative mb-12 flex h-[400px] items-center justify-center border-2 overflow-hidden"
          >
            <img
              src={post.image}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="prose prose-lg mb-16 max-w-none"
          >
            <div className="font-handwritten text-walnut/90 space-y-8">
              {/* Intro */}
              <div className="space-y-4 text-xl leading-relaxed">
                <p>
                  Всяка есен, когато първите студени ветрове започнат да напомнят за себе си,
                  въздухът в българските дворове се изпълва с един неповторим, сладникав и леко
                  опушен аромат. Това е ароматът на <strong>лютеницата</strong> – не просто зимнина,
                  а истински символ на българския дом, традиция и, разбира се,{' '}
                  <strong>вкусът от детството</strong>.
                </p>
                <p>
                  При Бачо Илия ние вярваме, че някои неща не трябва да се променят. Точно както
                  нашето сирене се прави по бабини рецепти, така и перфектната лютеница изисква
                  търпение, любов и спазването на няколко <strong>златни тайни</strong>.
                </p>
                <p className="text-bulgarian-red text-lg italic">
                  Ето ги и тях, предадени от поколения:
                </p>
              </div>

              <div className="via-bulgarian-red/30 my-8 h-px bg-gradient-to-r from-transparent to-transparent" />

              {/* Section 1 */}
              <div className="text-center my-8">
                <img src="/blog/lutenitsa-ingredients.png" alt="Fresh ingredients for lutenitsa" className="w-full h-auto rounded-lg shadow-lg" />
              </div>
              <section className="space-y-4">
                <h2 className="font-handwritten text-bulgarian-red mb-4 text-3xl">
                  1. Тайната на Суровината: Само Най-Доброто
                </h2>
                <p className="text-xl leading-relaxed">
                  Няма как да направите истинска лютеница от некачествени продукти. Тайната на Бачо
                  Илия е в <strong>избора на зеленчуци</strong>:
                </p>
                <ul className="list-none space-y-3 pl-0 text-lg">
                  <li className="flex gap-3">
                    <span className="text-bulgarian-red">•</span>
                    <span>
                      <strong>Червен пипер (Капия):</strong> Трябва да е месест, напълно узрял и да
                      има силен, сладък аромат. Това е основата на вкуса.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-bulgarian-red">•</span>
                    <span>
                      <strong>Домати:</strong> Използвайте само добре узрели, червени домати. Те
                      дават сладостта и плътността.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-bulgarian-red">•</span>
                    <span>
                      <strong>Патладжан (по желание):</strong> Той добавя онази специфична, леко
                      опушена дълбочина на вкуса.
                    </span>
                  </li>
                </ul>
                <div className="bg-sunflower/10 border-sunflower mt-4 border-l-4 p-4">
                  <p className="text-lg">
                    <strong>Съвет от Бачо Илия:</strong> Не бързайте! Изчакайте пиперът да узрее
                    напълно. Качеството на лютеницата се определя още на полето.
                  </p>
                </div>
              </section>

              {/* Section 2 */}
              <div className="text-center my-8">
                <img src="/blog/lutenitsa-cooking-process.png" alt="Traditional lutenitsa cooking process" className="w-full h-auto rounded-lg shadow-lg" />
              </div>
              <section className="space-y-4">
                <h2 className="font-handwritten text-bulgarian-red mb-4 text-3xl">
                  2. Тайната на Печенето: Огънят е Душата
                </h2>
                <p className="text-xl leading-relaxed">
                  Много хора днес варят зеленчуците, за да спестят време, но това е{' '}
                  <strong>първата грешка</strong>.
                </p>
                <p className="text-xl leading-relaxed">
                  Истинският вкус на лютеницата идва от{' '}
                  <strong>печенето на жар или във фурна на силен огън</strong>. Печенето кара
                  захарите в пипера да се карамелизират, а лекият опушен аромат прониква в месестата
                  част.
                </p>
                <ul className="list-none space-y-3 pl-0 text-lg">
                  <li className="flex gap-3">
                    <span className="text-bulgarian-red">•</span>
                    <span>
                      <strong>Защо печене?</strong> Печенето отстранява излишната вода и концентрира
                      вкуса. Освен това, то придава на лютеницата онзи тъмен, наситен цвят, който
                      познаваме от детството.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-bulgarian-red">•</span>
                    <span>
                      <strong>След печенето:</strong> Веднага покрийте пипера с влажна кърпа или го
                      поставете в найлонов плик. Топлината ще задуши кората и тя ще се обели лесно,
                      без да губите от месестата част.
                    </span>
                  </li>
                </ul>
              </section>

              {/* Section 3 */}
              <div className="text-center my-8">
                <img src="/blog/lutenitsa-grinding.png" alt="Grinding ingredients for lutenitsa" className="w-full h-auto rounded-lg shadow-lg" />
              </div>
              <section className="space-y-4">
                <h2 className="font-handwritten text-bulgarian-red mb-4 text-3xl">
                  3. Тайната на Смилането: Балансът
                </h2>
                <p className="text-xl leading-relaxed">
                  След като зеленчуците са опечени и обелени, идва моментът на смилането.
                </p>
                <ul className="list-none space-y-3 pl-0 text-lg">
                  <li className="flex gap-3">
                    <span className="text-bulgarian-red">•</span>
                    <span>
                      <strong>Груба или Фина?</strong> Истинската домашна лютеница не е като бебешка
                      храна. Тя трябва да има <strong>текстура</strong>. Смелете по-голямата част от
                      пипера и доматите, но оставете{' '}
                      <strong>една малка част от пипера на ситно нарязани парченца</strong>. Това
                      придава на лютеницата "характер" и я прави по-апетитна.
                    </span>
                  </li>
                </ul>
              </section>

              {/* Section 4 */}
              <div className="text-center my-8">
                <img src="/blog/lutenitsa-boiling.png" alt="Lutenitsa boiling in a pot" className="w-full h-auto rounded-lg shadow-lg" />
              </div>
              <section className="space-y-4">
                <h2 className="font-handwritten text-bulgarian-red mb-4 text-3xl">
                  4. Тайната на Варенето: Търпението е Ключът
                </h2>
                <p className="text-xl leading-relaxed">
                  Това е най-дългата и най-важна част. Лютеницата трябва да се вари{' '}
                  <strong>дълго и бавно</strong>, за да се изпари цялата вода и да се сгъсти.
                </p>
                <ul className="list-none space-y-3 pl-0 text-lg">
                  <li className="flex gap-3">
                    <span className="text-bulgarian-red">•</span>
                    <span>
                      <strong>Постоянно бъркане:</strong> Лютеницата лесно загаря! Използвайте
                      дървена лъжица и бъркайте постоянно, особено когато започне да се сгъстява.
                      Това е моментът, в който трябва да проявите <strong>търпение и любов</strong>.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-bulgarian-red">•</span>
                    <span>
                      <strong>Кога е готова?</strong> Когато бъркате и видите дъното на тенджерата
                      за секунда-две, преди лютеницата да се стече обратно, значи е готова!
                    </span>
                  </li>
                </ul>
              </section>

              {/* Section 5 */}
              <div className="text-center my-8">
                <img src="/blog/lutenitsa-spices.png" alt="Spices for lutenitsa" className="w-full h-auto rounded-lg shadow-lg" />
              </div>
              <section className="space-y-4">
                <h2 className="font-handwritten text-bulgarian-red mb-4 text-3xl">
                  5. Тайната на Подправките: Времето и Мястото
                </h2>
                <p className="text-xl leading-relaxed">
                  Подправките трябва да се добавят към края на варенето.
                </p>
                <ul className="list-none space-y-3 pl-0 text-lg">
                  <li className="flex gap-3">
                    <span className="text-bulgarian-red">•</span>
                    <span>
                      <strong>Мазнина:</strong> Добавете олио или зехтин, за да "запечатате" вкуса и
                      да придадете блясък.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-bulgarian-red">•</span>
                    <span>
                      <strong>Захар и Сол:</strong> Добавете на вкус. Някои пипери са по-сладки,
                      други – по-безвкусни. Добавете солта и захарта постепенно, като опитвате.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-bulgarian-red">•</span>
                    <span>
                      <strong>Оцет (по желание):</strong> Малко оцет в края на варенето може да
                      балансира сладостта и да служи като естествен консервант.
                    </span>
                  </li>
                </ul>
              </section>

              <div className="via-bulgarian-red/30 my-8 h-px bg-gradient-to-r from-transparent to-transparent" />

              {/* Recipe Section */}
              <div className="text-center my-8">
                <img src="/blog/lutenitsa-recipe-dish.png" alt="Lutenitsa recipe and dish" className="w-full h-auto rounded-lg shadow-lg" />
              </div>
              <section className="bg-old-paper/50 border-walnut/20 space-y-6 border-2 p-8">
                <h2 className="font-handwritten text-bulgarian-red mb-6 text-3xl">
                  Рецепта за Истинска Домашна Лютеница
                </h2>
                <p className="mb-6 text-xl leading-relaxed">
                  След като знаете тайните, ето и една изпитана рецепта:
                </p>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-bulgarian-red text-white">
                        <th className="font-handwritten border-bulgarian-red border p-4 text-left text-xl">
                          Продукт
                        </th>
                        <th className="font-handwritten border-bulgarian-red border p-4 text-left text-xl">
                          Количество
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-lg">
                      <tr className="bg-white">
                        <td className="border-walnut/20 border p-4">Червен пипер (Капия)</td>
                        <td className="border-walnut/20 border p-4">10 кг</td>
                      </tr>
                      <tr className="bg-old-paper/30">
                        <td className="border-walnut/20 border p-4">Домати</td>
                        <td className="border-walnut/20 border p-4">5 кг</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="border-walnut/20 border p-4">Патладжан (по желание)</td>
                        <td className="border-walnut/20 border p-4">1 кг</td>
                      </tr>
                      <tr className="bg-old-paper/30">
                        <td className="border-walnut/20 border p-4">Олио/Зехтин</td>
                        <td className="border-walnut/20 border p-4">500 мл</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="border-walnut/20 border p-4">Сол</td>
                        <td className="border-walnut/20 border p-4">На вкус (около 3-4 с.л.)</td>
                      </tr>
                      <tr className="bg-old-paper/30">
                        <td className="border-walnut/20 border p-4">Захар</td>
                        <td className="border-walnut/20 border p-4">На вкус (около 2-3 с.л.)</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="border-walnut/20 border p-4">Оцет (9%)</td>
                        <td className="border-walnut/20 border p-4">2-3 с.л.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Steps */}
                <div className="mt-8 space-y-4">
                  <h3 className="font-handwritten text-bulgarian-red mb-4 text-2xl">Приготвяне:</h3>
                  <ol className="space-y-4 text-lg">
                    <li className="flex gap-4">
                      <span className="bg-bulgarian-red flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full font-bold text-white">
                        1
                      </span>
                      <span>
                        <strong>Печене:</strong> Изпечете пипера и патладжана. Обелете ги и ги
                        оставете да се отцедят.
                      </span>
                    </li>
                    <li className="flex gap-4">
                      <span className="bg-bulgarian-red flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full font-bold text-white">
                        2
                      </span>
                      <span>
                        <strong>Домати:</strong> Смелете доматите и ги сварете отделно, докато се
                        сгъстят наполовина.
                      </span>
                    </li>
                    <li className="flex gap-4">
                      <span className="bg-bulgarian-red flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full font-bold text-white">
                        3
                      </span>
                      <span>
                        <strong>Смилане:</strong> Смелете опечените зеленчуци (оставете малко пипер
                        на парченца).
                      </span>
                    </li>
                    <li className="flex gap-4">
                      <span className="bg-bulgarian-red flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full font-bold text-white">
                        4
                      </span>
                      <span>
                        <strong>Варене:</strong> Смесете всички смлени зеленчуци и ги добавете към
                        сгъстения доматен сок.
                      </span>
                    </li>
                    <li className="flex gap-4">
                      <span className="bg-bulgarian-red flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full font-bold text-white">
                        5
                      </span>
                      <span>
                        <strong>Търпение:</strong> Варете на тих огън, като бъркате постоянно,
                        докато лютеницата се сгъсти до желаната консистенция.
                      </span>
                    </li>
                    <li className="flex gap-4">
                      <span className="bg-bulgarian-red flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full font-bold text-white">
                        6
                      </span>
                      <span>
                        <strong>Подправяне:</strong> Добавете олиото, солта, захарта и оцета. Варете
                        още 10-15 минути.
                      </span>
                    </li>
                    <li className="flex gap-4">
                      <span className="bg-bulgarian-red flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full font-bold text-white">
                        7
                      </span>
                      <span>
                        <strong>Буркани:</strong> Напълнете горещата лютеница в сухи, стерилизирани
                        буркани. Затворете плътно и стерилизирайте за 10 минути.
                      </span>
                    </li>
                  </ol>
                </div>
              </section>

              <div className="via-bulgarian-red/30 my-8 h-px bg-gradient-to-r from-transparent to-transparent" />

              {/* Conclusion */}
              <div className="text-center my-8">
                <img src="/blog/lutenitsa-jars.png" alt="Jars of homemade lutenitsa" className="w-full h-auto rounded-lg shadow-lg" />
              </div>
              <section className="bg-sunflower/10 border-sunflower/30 space-y-4 border-2 p-8">
                <h2 className="font-handwritten text-bulgarian-red mb-4 text-3xl">
                  Вкусът от Детството
                </h2>
                <p className="text-xl leading-relaxed">
                  Лютеницата е най-вкусна, когато е споделена. Намажете дебел пласт върху филия{' '}
                  <strong>домашен хляб</strong> и добавете парче{' '}
                  <strong>автентично бяло сирене "Бачо Илия"</strong> – направено също с любов и без
                  химия, точно както баба го е правила.
                </p>
                <p className="text-xl leading-relaxed">
                  Това е перфектната комбинация от традиция и истински вкус.
                </p>
                <p className="text-bulgarian-red mt-6 text-lg italic">
                  <strong>Споделете с нас:</strong> Какви са вашите тайни за перфектната лютеница?
                  Разкажете ни в коментарите!
                </p>
              </section>
            </div>
          </motion.div>

          <div className="via-bulgarian-red/30 my-16 h-px bg-gradient-to-r from-transparent to-transparent" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="font-handwritten text-walnut mb-6 text-3xl">Още статии</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="border-walnut/20 block border-2 bg-white p-6 transition-shadow hover:shadow-xl"
                >
                  <div className="mb-3">
                    <span className="bg-bulgarian-red font-handwritten inline-block px-3 py-1 text-xs tracking-wider text-white">
                      {relatedPost.category}
                    </span>
                  </div>
                  <h3 className="font-handwritten text-walnut mb-2 text-2xl">
                    {relatedPost.title}
                  </h3>
                  <p className="font-handwritten text-walnut/70 text-base">{relatedPost.excerpt}</p>
                  <div className="text-bulgarian-red font-handwritten mt-4 flex items-center gap-2 text-base">
                    <span>Прочети повече</span>
                    <span>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </article>
      </div>
    </div>
  );
}
