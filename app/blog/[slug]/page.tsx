'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ClockIcon } from '@/components/ui/Icon';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

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
  {
    id: 2,
    title: 'Тайните на перфектната домашна баница: Хрупкава коричка и сочна плънка',
    excerpt:
      'Баницата е едно от най-обичаните и традиционни български ястия, символ на домашен уют и кулинарно майсторство. Приготвянето ѝ може да изглежда предизвикателство, но с правилните съставки, прецизни стъпки и няколко полезни съвета, всеки може да създаде истински шедьовър.',
    slug: 'taynite-na-banitsata',
    category: 'Бабини рецепти',
    date: '29 Октомври 2024',
    readTime: '7 мин четене',
    image: '/blog/banitsa-sliced.png',
    author: 'Екипът на Бачо Илия',
    content: `Баницата е едно от най-обичаните и традиционни български ястия, символ на домашен уют и кулинарно майсторство. Приготвянето ѝ може да изглежда предизвикателство, но с правилните съставки, прецизни стъпки и няколко полезни съвета, всеки може да създаде истински шедьовър. В тази публикация ще разкрием тайните за приготвянето на перфектната домашна баница.

<div className="text-center my-8">
  <img src="/blog/banitsa-ingredients.png" alt="Ingredients for banitsa" className="w-full h-auto rounded-lg shadow-lg" />
</div>

## Съставки

За да приготвите автентична и вкусна баница, ще са Ви необходими следните продукти:

*   500 гр. точени кори за баница (препоръчително е да са тънки и еластични)
*   400 гр. сирене (краве или смес от краве и овче)
*   4-5 бр. яйца
*   200 гр. кисело мляко (с по-висока масленост)
*   1 ч.л. сода бикарбонат
*   150-200 мл. олио или разтопено масло (или комбинация)
*   Щипка сол (ако сиренето не е достатъчно солено)

<div className="text-center my-8">
  <img src="/blog/banitsa-assembling.png" alt="Assembling banitsa" className="w-full h-auto rounded-lg shadow-lg" />
</div>

## Начин на приготвяне

Следвайте тези стъпки, за да постигнете идеалната баница:

*   **Подготовка на плънката:** В дълбока купа натрошете сиренето. Добавете яйцата и разбъркайте добре. В отделна купичка смесете киселото мляко със содата бикарбонат и изчакайте да шупне. Прибавете шупналото кисело мляко към сместа от сирене и яйца. Разбъркайте до получаване на хомогенна плънка.
*   **Нареждане на баницата:** Намажете дъното на тава с диаметър около 30 см с малко олио/масло. Вземете една кора и я поставете в тавата, така че краищата ѝ да излизат извън тавата. Намажете я леко с мазнина.
*   **Редуване на кори и плънка:** Вземете втора кора, намажете я с мазнина и я набръчкайте леко, след което я поставете в тавата. Разпределете част от плънката върху нея. Продължете да редувате набръчкани кори, намазани с мазнина, и плънка, докато свършат корите и плънката.
*   **Завършване:** Покрийте баницата с последната кора, която сте оставили да виси извън тавата. Намажете обилно горната кора с останалата мазнина. По желание, преди печене, може да нарежете баницата на парчета.
*   **Печене:** Загрейте фурната на 180-200°C. Печете баницата за около 30-40 минути или докато придобие златистокафяв цвят и стане хрупкава.
*   **Охлаждане:** След като извадите баницата от фурната, покрийте я с чиста кърпа за 10-15 минути. Това ще я направи по-мека и сочна.

<div className="text-center my-8">
  <img src="/blog/banitsa-baking.png" alt="Banitsa baking in the oven" className="w-full h-auto rounded-lg shadow-lg" />
</div>

## Полезни съвети

За да направите баницата си още по-вкусна и апетитна, вземете предвид следните съвети:

*   **Качество на корите:** Използвайте висококачествени, тънки и еластични точени кори. Те са ключът към хрупкавата и въздушна баница.
*   **Мазнина:** Не пестете от мазнината. Комбинацията от олио и разтопено масло придава по-богат вкус и аромат.
*   **Сирене:** Изберете сирене с добър вкус и умерена соленост. Ако сиренето е много солено, може да го накиснете за кратко във вода.
*   **Кисело мляко:** Киселото мляко със сода прави баницата по-пухкава и сочна. Уверете се, че содата е шупнала добре.
*   **Температура на фурната:** Не печете баницата на прекалено висока температура, за да не изгори отвън, а да остане сурова отвътре. Умерената температура осигурява равномерно изпичане.
*   **Вариации:** Експериментирайте с добавяне на спанак, праз или тиква за различни вкусови преживявания.

<div className="text-center my-8">
  <img src="/blog/banitsa-sliced.png" alt="Sliced banitsa" className="w-full h-auto rounded-lg shadow-lg" />
</div>

Приготвянето на домашна баница е изкуство, което се усъвършенства с практика. Не се притеснявайте да експериментирате и да намерите своя собствен уникален подход. Добър апетит!`,
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
            <div className="font-handwritten text-walnut/90 space-y-6">
              <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ node, ...props }) => (
                    <h2 className="font-handwritten text-bulgarian-red mb-4 text-3xl mt-8" {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <p className="text-xl leading-relaxed my-4" {...props} />
                  ),
                  img: ({ node, ...props }) => (
                    <img className="w-full h-auto rounded-lg shadow-lg my-8" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc list-inside space-y-2 my-4 text-lg" {...props} />
                  ),
                  div: ({ node, ...props }) => (
                    <div {...props} />
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
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
