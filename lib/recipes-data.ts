export interface Recipe {
  slug: string;
  title: string;
  titleBg: string;
  description: string;
  descriptionBg: string;
  image: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  difficulty: 'Лесна' | 'Средна' | 'Трудна';
  bachoProducts: string[];
  ingredients: {
    item: string;
    itemBg: string;
  }[];
  instructions: {
    step: string;
    stepBg: string;
  }[];
  tips: {
    tip: string;
    tipBg: string;
  }[];
  story: string;
  storyBg: string;
}

export const recipes: Recipe[] = [
  {
    slug: 'traditional-banitsa',
    title: 'Traditional Bulgarian Banitsa',
    titleBg: 'Традиционна българска баница',
    description:
      "Authentic Bulgarian banitsa made with Bacho Ilia white cheese, following grandmother's traditional recipe passed down through generations.",
    descriptionBg:
      'Автентична българска баница с бяло сирене от Бачо Илия, приготвена по традиционна бабина рецепта, предавана от поколение на поколение.',
    image: '/recipes/banitsa.webp',
    prepTime: '30 минути',
    cookTime: '45 минути',
    servings: 8,
    difficulty: 'Средна',
    bachoProducts: ['Бяло сирене Бачо Илия', 'Кисело мляко Бачо Илия'],
    ingredients: [
      { item: '500g Bacho Ilia white cheese', itemBg: '500г бяло сирене „Бачо Илия“' },
      { item: '1 package filo pastry (400g)', itemBg: '1 пакет точени кори (400г)' },
      { item: '4 eggs', itemBg: '4 яйца' },
      { item: '200ml Bacho Ilia yogurt', itemBg: '200мл кисело мляко „Бачо Илия“' },
      { item: '100ml sunflower oil', itemBg: '100мл слънчогледово олио' },
      { item: '50g butter', itemBg: '50г масло' },
      { item: 'Pinch of salt', itemBg: 'Щипка сол' },
    ],
    instructions: [
      {
        step: 'Preheat oven to 180°C. Grease a round baking pan with butter.',
        stepBg: 'Загрейте фурната на 180°C. Намажете с масло кръгла тава.',
      },
      {
        step: 'Crumble the Bacho Ilia white cheese in a bowl. Add 3 eggs and Bacho Ilia yogurt, mix well.',
        stepBg:
          'Натрошете в купа бялото сирене „Бачо Илия“. Добавете 3 яйца и киселото мляко „Бачо Илия“ и разбъркайте добре.',
      },
      {
        step: 'Mix oil with 100ml water. Brush one filo sheet with the mixture, scrunch it and place in the pan. Repeat with all sheets.',
        stepBg:
          'Смесете олиото със 100мл вода. Намажете една кора със сместа, нагънете я и я поставете в тавата. Повторете с всички кори.',
      },
      {
        step: 'Pour the Bacho Ilia cheese mixture evenly over the filo pastry.',
        stepBg: 'Разпределете равномерно сместа със сиренето върху корите.',
      },
      {
        step: 'Beat remaining egg and brush the top. Bake for 45 minutes until golden brown.',
        stepBg:
          'Разбийте останалото яйце и намажете баницата отгоре. Печете 45 минути до придобиване на златист цвят.',
      },
    ],
    tips: [
      {
        tip: 'Use only authentic Bacho Ilia white cheese for the true traditional taste',
        tipBg: 'За истински традиционен вкус използвайте само автентично бяло сирене „Бачо Илия“.',
      },
      {
        tip: 'Bacho Ilia yogurt adds the perfect creamy texture',
        tipBg: 'Киселото мляко „Бачо Илия“ придава перфектната кремообразна текстура.',
      },
      {
        tip: 'Let the banitsa rest for 10 minutes before cutting for best results',
        tipBg: 'За най-добри резултати оставете баницата да почине 10 минути преди да я нарежете.',
      },
    ],
    story:
      "Banitsa is the heart of Bulgarian cuisine. This recipe has been perfected over 30+ years by Bacho Ilia, using only natural ingredients. Every bite brings back childhood memories of grandma's kitchen, with the authentic taste of Bacho Ilia products made from happy cows.",
    storyBg:
      'Баницата е сърцето на българската кухня. Тази рецепта е усъвършенствана в продължение на повече от 30 години от „Бачо Илия“ и в нея се използват само естествени съставки. Всяка хапка връща детските спомени за бабината кухня с автентичния вкус на продуктите „Бачо Илия“, направени с мляко от щастливи крави.',
  },
  {
    slug: 'shopska-salad-classic',
    title: 'Classic Shopska Salad with Bacho Ilia Cheese',
    titleBg: 'Класическа шопска салата със сирене „Бачо Илия“',
    description:
      'The iconic Bulgarian salad topped with generous amounts of grated Bacho Ilia white cheese - fresh, authentic, and irresistibly delicious.',
    descriptionBg:
      'Емблематичната българска салата, покрита с щедро количество настъргано бяло сирене „Бачо Илия“ – свежа, автентична и неустоимо вкусна.',
    image: '/recipes/shopska.webp',
    prepTime: '15 минути',
    cookTime: '0 минути',
    servings: 4,
    difficulty: 'Лесна',
    bachoProducts: ['Бяло сирене Бачо Илия'],
    ingredients: [
      { item: '4 large tomatoes', itemBg: '4 големи домата' },
      { item: '2 cucumbers', itemBg: '2 краставици' },
      { item: '2 bell peppers', itemBg: '2 чушки' },
      { item: '1 onion', itemBg: '1 глава лук' },
      {
        item: '200g Bacho Ilia white cheese (grated)',
        itemBg: '200г бяло сирене „Бачо Илия“ (настъргано)',
      },
      { item: 'Fresh parsley', itemBg: 'Прясна магданоз' },
      { item: '4 tbsp sunflower oil', itemBg: '4 с.л. слънчогледово олио' },
      { item: '2 tbsp vinegar', itemBg: '2 с.л. оцет' },
      { item: 'Salt to taste', itemBg: 'Сол на вкус' },
    ],
    instructions: [
      {
        step: 'Dice tomatoes, cucumbers, and bell peppers into medium cubes.',
        stepBg: 'Нарежете доматите, краставиците и чушките на средноголеми кубчета.',
      },
      {
        step: 'Finely chop the onion and parsley.',
        stepBg: 'Нарежете на ситно лука и магданоза.',
      },
      {
        step: 'Mix all vegetables in a large bowl.',
        stepBg: 'Смесете всички зеленчуци в голяма купа.',
      },
      {
        step: 'Dress with oil, vinegar, and salt. Toss gently.',
        stepBg: 'Овкусете с олио, оцет и сол. Разбъркайте внимателно.',
      },
      {
        step: 'Top generously with grated Bacho Ilia white cheese. Garnish with parsley.',
        stepBg: 'Покрийте щедро с настъргано бяло сирене „Бачо Илия“. Украсете с магданоз.',
      },
    ],
    tips: [
      {
        tip: 'The secret is in the cheese - only authentic Bacho Ilia white cheese delivers the true Bulgarian taste',
        tipBg:
          'Тайната е в сиренето – само автентичното бяло сирене „Бачо Илия“ носи истинския български вкус.',
      },
      {
        tip: "Don't be shy with the Bacho Ilia cheese - the more, the better!",
        tipBg: 'Не се притеснявайте да сложите повече сирене „Бачо Илия“ – колкото повече, толкова по-добре!',
      },
      {
        tip: 'Use chilled vegetables for the crispiest salad',
        tipBg: 'Използвайте охладени зеленчуци за най-хрупкавата салата.',
      },
    ],
    story:
      "Shopska salad is Bulgaria's pride on every table. What makes it truly special is the Bacho Ilia white cheese on top - made without preservatives, just like our grandmothers made it 30 years ago. The authentic taste of Bacho Ilia products transforms this simple salad into a celebration of Bulgarian tradition.",
    storyBg:
      'Шопската салата е гордостта на България на всяка трапеза. Това, което я прави наистина специална, е бялото сирене „Бачо Илия“ отгоре – направено без консерванти, точно както нашите баби са го правели преди 30 години. Автентичният вкус на продуктите „Бачо Илия“ превръща тази проста салата в празник на българската традиция.',
  },
  {
    slug: 'snezhanka-tarator-combo',
    title: 'Snezhanka Salad with Bacho Ilia Yogurt',
    titleBg: 'Салата Снежанка с кисело мляко „Бачо Илия“',
    description:
      'Refreshing cucumber and Bacho Ilia yogurt salad with garlic and walnuts - the perfect summer dish made with authentic Bulgarian dairy.',
    descriptionBg:
      'Освежаваща салата от краставици и кисело мляко „Бачо Илия“ с чесън и орехи – перфектното лятно ястие с автентични български млечни продукти.',
    image: '/recipes/snezhanka.webp',
    prepTime: '20 минути',
    cookTime: '0 минути',
    servings: 6,
    difficulty: 'Лесна',
    bachoProducts: ['Кисело мляко Бачо Илия', 'Бяло сирене Бачо Илия'],
    ingredients: [
      { item: '500g Bacho Ilia yogurt', itemBg: '500г кисело мляко „Бачо Илия“' },
      {
        item: '100g Bacho Ilia white cheese (optional)',
        itemBg: '100г бяло сирене „Бачо Илия“ (по желание)',
      },
      { item: '3 cucumbers', itemBg: '3 краставици' },
      { item: '3 garlic cloves', itemBg: '3 скилидки чесън' },
      { item: '50g walnuts (chopped)', itemBg: '50г орехи (нарязани)' },
      { item: '2 tbsp olive oil', itemBg: '2 с.л. зехтин' },
      { item: 'Fresh dill', itemBg: 'Прясна копър' },
      { item: 'Salt to taste', itemBg: 'Сол на вкус' },
    ],
    instructions: [
      {
        step: 'Peel and finely dice the cucumbers. Sprinkle with salt and let drain for 10 minutes.',
        stepBg:
          'Обелете и нарежете на ситно краставиците. Поръсете със сол и ги оставете да се отцедят за 10 минути.',
      },
      {
        step: 'In a bowl, mix Bacho Ilia yogurt with crushed garlic.',
        stepBg: 'В купа смесете киселото мляко „Бачо Илия“ със счукания чесън.',
      },
      {
        step: 'Squeeze excess water from cucumbers and add to the yogurt mixture.',
        stepBg: 'Изстискайте излишната вода от краставиците и ги добавете към киселото мляко.',
      },
      {
        step: 'If using, crumble Bacho Ilia white cheese and stir in gently.',
        stepBg:
          'Ако използвате, натрошете бялото сирене „Бачо Илия“ и разбъркайте внимателно.',
      },
      {
        step: 'Top with chopped walnuts, drizzle with olive oil, and garnish with fresh dill.',
        stepBg: 'Поръсете с нарязани орехи, полейте със зехтин и украсете с пресен копър.',
      },
    ],
    tips: [
      {
        tip: 'Bacho Ilia yogurt is the key - its authentic Bulgarian taste and creamy texture make this dish perfect',
        tipBg:
          'Киселото мляко „Бачо Илия“ е ключът – неговият автентичен български вкус и кремообразна текстура правят това ястие перфектно.',
      },
      {
        tip: 'Adding Bacho Ilia white cheese creates an even richer, more traditional flavor',
        tipBg: 'Добавянето на бяло сирене „Бачо Илия“ създава още по-богат, традиционен вкус.',
      },
      {
        tip: 'Serve chilled for the best refreshing experience',
        tipBg: 'Сервирайте салатата охладена за най-освежаващо изживяване.',
      },
    ],
    story:
      'Snezhanka is a beloved Bulgarian classic, especially during hot summer days. The name means "Snow White" in Bulgarian. Using Bacho Ilia yogurt - made from happy cows without any chemicals - gives this salad the authentic taste that our grandmothers knew. The Bacho Ilia dairy products are crafted with 30+ years of tradition, bringing childhood memories to your table.',
    storyBg:
      'Снежанка е обичана българска класика, особено през горещите летни дни. Използването на кисело мляко „Бачо Илия“ – направено с мляко от щастливи крави, без никакви химикали – придава на тази салата автентичния вкус, който нашите баби познаваха. Млечните продукти „Бачо Илия“ са създадени с над 30-годишна традиция и носят детските спомени на вашата трапеза.',
  },
  {
    slug: 'kashkaval-pane',
    title: 'Fried Kashkaval (Pane) - Bacho Ilia Style',
    titleBg: 'Паниран кашкавал по рецепта на „Бачо Илия“',
    description:
      'Crispy on the outside, melty on the inside - fried Bacho Ilia kashkaval that brings back childhood memories with every bite.',
    descriptionBg:
      'Хрупкав отвън, топящ се отвътре – паниран кашкавал „Бачо Илия“, който връща детските спомени с всяка хапка.',
    image: '/recipes/kashkaval-pane.webp',
    prepTime: '15 минути',
    cookTime: '10 минути',
    servings: 4,
    difficulty: 'Лесна',
    bachoProducts: ['Кашкавал Бачо Илия'],
    ingredients: [
      { item: '400g Bacho Ilia kashkaval (yellow cheese)', itemBg: '400г кашкавал „Бачо Илия“' },
      { item: '2 eggs', itemBg: '2 яйца' },
      { item: '100g flour', itemBg: '100г брашно' },
      { item: '150g breadcrumbs', itemBg: '150г галета' },
      { item: 'Oil for frying', itemBg: 'Олио за пържене' },
      { item: 'Black pepper to taste', itemBg: 'Черен пипер на вкус' },
      { item: 'Lemon wedges for serving', itemBg: 'Резенчета лимон за сервиране' },
    ],
    instructions: [
      {
        step: 'Cut Bacho Ilia kashkaval into thick slices (about 1.5cm).',
        stepBg: 'Нарежете кашкавала „Бачо Илия“ на дебели филийки (около 1,5 см).',
      },
      {
        step: 'Prepare three plates: one with flour, one with beaten eggs, one with breadcrumbs.',
        stepBg: 'Подгответе три чинии: една с брашно, една с разбити яйца и една с галета.',
      },
      {
        step: 'Coat each Bacho Ilia kashkaval slice first in flour, then egg, then breadcrumbs.',
        stepBg:
          'Оваляйте всяка филийка кашкавал „Бачо Илия“ първо в брашно, после в яйце и накрая в галета.',
      },
      {
        step: 'Heat oil in a deep pan. Fry kashkaval slices until golden brown on both sides (about 2-3 minutes per side).',
        stepBg:
          'Загрейте олио в дълбок тиган. Изпържете филийките кашкавал до златистокафяво от двете страни (за около 2-3 минути от всяка страна).',
      },
      {
        step: 'Drain on paper towels. Serve hot with lemon wedges.',
        stepBg: 'Отцедете върху кухненска хартия. Сервирайте горещ с резенчета лимон.',
      },
    ],
    tips: [
      {
        tip: "Only Bacho Ilia kashkaval melts perfectly while keeping its shape - that's the magic of authentic Bulgarian cheese",
        tipBg:
          'Само кашкавалът „Бачо Илия“ се топи перфектно, като запазва формата си – това е магията на автентичния български кашкавал.',
      },
      {
        tip: "Don't make slices too thin - Bacho Ilia kashkaval needs thickness to create that perfect melty center",
        tipBg:
          'Не правете филийките твърде тънки – кашкавалът „Бачо Илия“ се нуждае от дебелина, за да се създаде перфектната топяща се среда.',
      },
      {
        tip: 'Serve immediately while the Bacho Ilia kashkaval is still hot and melting',
        tipBg: 'Сервирайте веднага, докато кашкавалът „Бачо Илия“ е още горещ и топящ се.',
      },
    ],
    story:
      "Fried kashkaval is every Bulgarian child's favorite treat. What makes this recipe special is using Bacho Ilia kashkaval - made traditionally for over 30 years without preservatives, just like our grandmothers made it. The authentic taste of Bacho Ilia yellow cheese, from happy cows, creates that unforgettable combination of crispy exterior and creamy, melty interior that takes you straight back to childhood.",
    storyBg:
      'Панираният кашкавал е любимото изкушение на всяко българско дете. Това, което прави тази рецепта специална, е използването на кашкавал „Бачо Илия“ – произведен традиционно повече от 30 години без консерванти, точно както са го правили нашите баби. Автентичният вкус на кашкавала „Бачо Илия“, направен с мляко от щастливи крави, създава онази незабравима комбинация от хрупкава коричка и кремообразна, топяща се вътрешност, която ви връща направо в детството.',
  },
  {
    slug: 'mish-mash-traditional',
    title: 'Traditional Mish-Mash with Bacho Ilia Cheese',
    titleBg: 'Традиционен миш-маш със сирене „Бачо Илия“',
    description:
      'The ultimate Bulgarian scrambled eggs with peppers, tomatoes, and generous chunks of melted Bacho Ilia white cheese - comfort food at its finest.',
    descriptionBg:
      'Най-добрите български бъркани яйца с чушки, домати и щедри парчета разтопено бяло сирене „Бачо Илия“ – храна за душата в най-добрия ѝ вид.',
    image: '/recipes/mish-mash.webp',
    prepTime: '10 минути',
    cookTime: '15 минути',
    servings: 2,
    difficulty: 'Лесна',
    bachoProducts: ['Бяло сирене Бачо Илия'],
    ingredients: [
      { item: '4 eggs', itemBg: '4 яйца' },
      {
        item: '200g Bacho Ilia white cheese (cubed)',
        itemBg: '200г бяло сирене „Бачо Илия“ (на кубчета)',
      },
      { item: '2 large tomatoes (diced)', itemBg: '2 големи домата (нарязани на кубчета)' },
      { item: '2 bell peppers (diced)', itemBg: '2 чушки (нарязани на кубчета)' },
      { item: '1 onion (chopped)', itemBg: '1 глава лук (нарязан)' },
      { item: '3 tbsp sunflower oil', itemBg: '3 с.л. слънчогледово олио' },
      { item: 'Fresh parsley', itemBg: 'Прясна магданоз' },
      { item: 'Salt and pepper to taste', itemBg: 'Сол и черен пипер на вкус' },
    ],
    instructions: [
      {
        step: 'Heat oil in a large pan. Sauté chopped onion until soft.',
        stepBg: 'Загрейте олио в голям тиган. Задушете нарязания лук, докато омекне.',
      },
      {
        step: 'Add diced bell peppers and cook for 5 minutes.',
        stepBg: 'Добавете нарязаните чушки и гответе 5 минути.',
      },
      {
        step: 'Add diced tomatoes, season with salt and pepper. Cook until tomatoes soften.',
        stepBg: 'Добавете нарязаните домати, подправете със сол и пипер. Гответе, докато доматите омекнат.',
      },
      {
        step: 'Add cubed Bacho Ilia white cheese, stir gently.',
        stepBg: 'Добавете нарязаното на кубчета бяло сирене „Бачо Илия“ и разбъркайте внимателно.',
      },
      {
        step: 'Beat eggs and pour over the vegetables and Bacho Ilia cheese. Stir until eggs are cooked but still creamy.',
        stepBg:
          'Разбийте яйцата и ги изсипете върху зеленчуците и сиренето. Разбърквайте, докато яйцата се сготвят, но останат сочни.',
      },
      {
        step: 'Garnish with fresh parsley and serve hot.',
        stepBg: 'Украсете с пресен магданоз и сервирайте ястието горещо.',
      },
    ],
    tips: [
      {
        tip: 'Bacho Ilia white cheese is essential - it melts perfectly into the eggs creating that authentic Bulgarian taste',
        tipBg:
          'Бялото сирене „Бачо Илия“ е задължително – то се топи перфектно в яйцата, създавайки онзи автентичен български вкус.',
      },
      {
        tip: "Don't overcook the eggs - keep them slightly creamy for the best texture with Bacho Ilia cheese",
        tipBg:
          'Не пресготвяйте яйцата – запазете ги леко кремообразни за най-добра текстура.',
      },
      {
        tip: 'Use generous chunks of Bacho Ilia cheese - you want every bite to have that melted cheese goodness',
        tipBg:
          'Използвайте големи парчета сирене „Бачо Илия“ – така всяка хапка ще има от разтопеното сирене.',
      },
    ],
    story:
      'Mish-Mash is the soul of Bulgarian home cooking - simple, hearty, and incredibly satisfying. The secret ingredient that elevates this dish from good to unforgettable is Bacho Ilia white cheese. Made without chemicals or preservatives, following recipes perfected over 30+ years, Bacho Ilia cheese brings the authentic taste that our grandmothers knew. Every chunk of melted Bacho Ilia white cheese in this mish-mash is a taste of Bulgarian tradition, made from happy cows and filled with childhood memories.',
    storyBg:
      'Миш-машът е душата на българската домашна кухня – просто, засищащо и невероятно вкусно ястие. Тайната съставка, която го превръща от добро в незабравимо, е бялото сирене „Бачо Илия“. Произведено без химикали и консерванти, по рецепти, усъвършенствани в продължение на повече от 30 години, сиренето „Бачо Илия“ носи автентичния вкус, който нашите баби познаваха. Всяко парче разтопено бяло сирене „Бачо Илия“ в този миш-маш е вкус на българска традиция, направен с мляко от щастливи крави и пълен с детски спомени.',
  },
  {
    slug: 'palneni-chushki',
    title: 'Traditional Bulgarian Stuffed Peppers',
    titleBg: 'Традиционни български пълнени чушки',
    description:
      "Tender bell peppers stuffed with seasoned meat and rice, slowly cooked in a rich tomato sauce. Served with a generous dollop of Bacho Ilia yogurt - pure comfort food from grandmother's kitchen.",
    descriptionBg:
      'Крехки чушки, пълнени с подправена кайма и ориз, бавно задушени в богат доматен сос. Сервират се с щедра лъжица кисело мляко „Бачо Илия“ – уютна храна, досущ като от бабината кухня.',
    image: '/recipes/palneni_chushki_recepta.jpg',
    prepTime: '30 минути',
    cookTime: '40 минути',
    servings: 6,
    difficulty: 'Средна',
    bachoProducts: ['Кисело мляко Бачо Илия'],
    ingredients: [
      { item: '8-10 large bell peppers', itemBg: '8-10 големи чушки' },
      {
        item: '500g ground meat (pork and beef mix)',
        itemBg: '500г кайма (смес от свинско и телешко)',
      },
      { item: '1 cup rice', itemBg: '1 чаша ориз' },
      { item: '1 large onion (finely chopped)', itemBg: '1 голяма глава лук (нарязан на ситно)' },
      { item: '2 carrots (grated)', itemBg: '2 моркова (настъргани)' },
      {
        item: '400g canned tomatoes or 4 fresh tomatoes (grated)',
        itemBg: '400г домати от консерва или 4 пресни домата (настъргани)',
      },
      { item: '2 tbsp tomato paste', itemBg: '2 с.л. доматено пюре' },
      { item: '3 tbsp sunflower oil', itemBg: '3 с.л. слънчогледово олио' },
      { item: 'Fresh parsley (chopped)', itemBg: 'Прясна магданоз (нарязан)' },
      { item: 'Paprika, salt, black pepper', itemBg: 'Червен пипер, сол, черен пипер' },
      {
        item: '300g Bacho Ilia yogurt (for serving)',
        itemBg: '300г кисело мляко „Бачо Илия“ (за сервиране)',
      },
    ],
    instructions: [
      {
        step: 'Cut the tops off the bell peppers and remove seeds and membranes. Set aside.',
        stepBg: 'Отрежете капачетата на чушките и почистете семките и вътрешността. Оставете ги настрана.',
      },
      {
        step: 'In a large bowl, mix ground meat, rice, finely chopped onion, grated carrots, chopped parsley, paprika, salt and pepper.',
        stepBg:
          'В голяма купа смесете каймата, ориза, нарязания на ситно лук, настърганите моркови, нарязания магданоз, червения пипер, сол и черен пипер.',
      },
      {
        step: 'Stuff each pepper with the meat mixture, filling about 3/4 full (rice will expand).',
        stepBg:
          'Напълнете всяка чушка със сместа, като я запълвате до около 3/4 (оризът ще набъбне).',
      },
      {
        step: 'Heat oil in a large pot. Arrange stuffed peppers standing upright in the pot.',
        stepBg: 'Загрейте олио в голяма тенджера. Подредете пълнените чушки изправени в тенджерата.',
      },
      {
        step: 'Mix grated tomatoes, tomato paste, and 2 cups water. Pour over the peppers. Add salt and paprika to the sauce.',
        stepBg:
          'Смесете настърганите домати, доматеното пюре и 2 чаши вода. Изсипете сместа върху чушките. Добавете сол и червен пипер към соса.',
      },
      {
        step: 'Cover and simmer on low heat for 40 minutes until peppers are tender and rice is fully cooked.',
        stepBg:
          'Покрийте и гответе на слаб огън за 40 минути, докато чушките омекнат и оризът се сготви напълно.',
      },
      {
        step: 'Serve hot with a generous dollop of Bacho Ilia yogurt on top.',
        stepBg: 'Сервирайте ястието горещо, с щедра лъжица кисело мляко „Бачо Илия“ отгоре.',
      },
    ],
    tips: [
      {
        tip: 'The magic finish is Bacho Ilia yogurt - its authentic Bulgarian taste and creamy texture perfectly complement the rich tomato sauce',
        tipBg:
          'Магическият завършек е киселото мляко „Бачо Илия“ – неговият автентичен български вкус и кремообразна текстура перфектно допълват богатия доматен сос.',
      },
      {
        tip: "Don't overfill the peppers - rice needs space to expand during cooking",
        tipBg: 'Не препълвайте чушките – оризът се нуждае от място, за да набъбне по време на готвене.',
      },
      {
        tip: 'Use a mix of red and yellow peppers for a more colorful dish',
        tipBg: 'Използвайте смес от червени и жълти чушки за по-цветно ястие.',
      },
    ],
    story:
      'Пълнените чушки са класика от бабината трапеза – ястие, което топли сърцето и душата. Всяка българска баба го прави по свой начин, но всички имат едно общо нещо – сервират го с автентично българско кисело мляко. Киселото мляко „Бачо Илия“, направено с мляко от щастливи крави, без химикали и консерванти, е перфектното допълнение. Всяка лъжица студено кисело мляко върху горещите, задушени чушки създава онзи незабравим контраст, който ви връща направо в детството на бабината маса.',
    storyBg:
      'Пълнените чушки са класика от бабината трапеза – ястие, което топли сърцето и душата. Всяка българска баба го прави по свой начин, но всички имат едно общо нещо – сервират го с автентично българско кисело мляко. Киселото мляко „Бачо Илия“, направено с мляко от щастливи крави, без химикали и консерванти, е перфектното допълнение. Всяка лъжица студено кисело мляко върху горещите, задушени чушки създава онзи незабравим контраст, който ви връща направо в детството на бабината маса.',
  },
  {
    slug: 'tikvenik',
    title: 'Traditional Pumpkin Banitsa - Tikvenik',
    titleBg: 'Традиционен тиквеник – баница с тиква',
    description:
      'Sweet autumn banitsa filled with grated pumpkin, walnuts, cinnamon and honey. A beloved Christmas Eve tradition that fills the home with warmth and nostalgia.',
    descriptionBg:
      'Сладка есенна баница, пълнена с настъргана тиква, орехи, канела и мед. Любима традиция за Бъдни вечер, която изпълва дома с топлина и носталгия.',
    image: '/recipes/tikvenik.jpg',
    prepTime: '25 минути',
    cookTime: '50 минути',
    servings: 10,
    difficulty: 'Средна',
    bachoProducts: ['Мляко Бачо Илия'],
    ingredients: [
      { item: '1 package filo pastry (400g)', itemBg: '1 пакет точени кори (400г)' },
      { item: '800g pumpkin (grated)', itemBg: '800г тиква (настъргана)' },
      { item: '200g walnuts (chopped)', itemBg: '200г орехи (нарязани)' },
      { item: '150g sugar', itemBg: '150г захар' },
      { item: '100ml Bacho Ilia milk', itemBg: '100мл прясно мляко „Бачо Илия“' },
      { item: '100ml sunflower oil', itemBg: '100мл слънчогледово олио' },
      { item: '80g butter (melted)', itemBg: '80г масло (разтопено)' },
      { item: '3 tbsp honey', itemBg: '3 с.л. мед' },
      { item: '2 tsp cinnamon', itemBg: '2 ч.л. канела' },
      { item: 'Pinch of vanilla', itemBg: 'Щипка ванилия' },
      { item: 'Powdered sugar for dusting', itemBg: 'Пудра захар за поръсване' },
    ],
    instructions: [
      {
        step: 'Grate the pumpkin and mix with sugar. Let sit for 30 minutes to release moisture, then squeeze out excess liquid.',
        stepBg:
          'Настържете тиквата и я смесете със захарта. Оставете я за 30 минути, за да си пусне сока, след което изстискайте излишната течност.',
      },
      {
        step: 'Add chopped walnuts, cinnamon, and vanilla to the pumpkin mixture.',
        stepBg: 'Добавете нарязаните орехи, канелата и ванилията към сместа с тиквата.',
      },
      {
        step: 'Preheat oven to 180°C. Grease a round baking pan with butter.',
        stepBg: 'Загрейте фурната на 180°C. Намажете с масло кръгла тава.',
      },
      {
        step: 'Mix Bacho Ilia milk, oil, and melted butter in a bowl.',
        stepBg: 'В купа смесете прясното мляко „Бачо Илия“, олиото и разтопеното масло.',
      },
      {
        step: 'Brush one filo sheet with the milk-butter mixture, add 2-3 tbsp pumpkin filling, roll loosely and coil into the pan like a snail shell. Repeat with remaining sheets, arranging them in a spiral.',
        stepBg:
          'Намажете една кора със сместа, добавете 2-3 с.л. от плънката с тиква, навийте свободно и поставете в тавата като охлюв. Повторете с останалите кори, като ги подреждате в спирала.',
      },
      {
        step: 'Brush top with remaining milk-butter mixture. Bake for 50 minutes until golden brown.',
        stepBg:
          'Намажете отгоре с останалата смес. Печете 50 минути до придобиване на златист цвят.',
      },
      {
        step: 'While hot, drizzle with honey. Let cool slightly, dust with powdered sugar and serve.',
        stepBg:
          'Докато е още горещ, полейте тиквеника с мед. Оставете го да се охлади леко, поръсете с пудра захар и сервирайте.',
      },
    ],
    tips: [
      {
        tip: 'Bacho Ilia milk adds authentic Bulgarian flavor and helps create the perfect golden crust',
        tipBg:
          'Прясното мляко „Бачо Илия“ добавя автентичен български вкус и помага за създаването на перфектната златиста коричка.',
      },
      {
        tip: "Don't skip squeezing the pumpkin - excess moisture will make the banitsa soggy",
        tipBg:
          'Не пропускайте да изстискате тиквата – излишната влага ще направи баницата глетава.',
      },
      {
        tip: 'Roll the filo loosely to keep the tikvenik fluffy and layered',
        tipBg: 'Навивайте корите свободно, за да остане тиквеникът пухкав и на пластове.',
      },
    ],
    story:
      'Тиквеникът е сладката емблема на българската Коледа – задължително ястие за Бъдни вечер според старите традиции. В книгата „Стари български рецепти“ го наричат национално съкровище. Всяка баба има своя тайна – някои слагат повече мед, други – повече орехи, но всички използват най-доброто мляко. Прясното мляко „Бачо Илия“, направено с мляко от щастливи крави, без химикали, е това, което прави коричката златиста и хрупкава, точно както си я спомняме от детството. Ароматът на тиквеник в къщата – това е ароматът на Коледа!',
    storyBg:
      'Тиквеникът е сладката емблема на българската Коледа – задължително ястие за Бъдни вечер според старите традиции. В книгата „Стари български рецепти“ го наричат национално съкровище. Всяка баба има своя тайна – някои слагат повече мед, други – повече орехи, но всички използват най-доброто мляко. Прясното мляко „Бачо Илия“, направено с мляко от щастливи крави, без химикали, е това, което прави коричката златиста и хрупкава, точно както си я спомняме от детството. Ароматът на тиквеник в къщата – това е ароматът на Коледа!',
  },
  {
    slug: 'musaka-classic',
    title: 'Classic Bulgarian Moussaka',
    titleBg: 'Класическа българска мусака',
    description:
      "Layers of seasoned ground meat, tender potatoes, and a fluffy Bacho Ilia yogurt topping - the most beloved Sunday dish in every Bulgarian home. Pure comfort that smells like grandma's kitchen.",
    descriptionBg:
      'Пластове от подправена кайма, нежни картофи и пухкава заливка с кисело мляко „Бачо Илия“ – най-обичаното неделно ястие във всеки български дом. Уют, който ухае на бабината кухня.',
    image: '/recipes/musaka.jpg',
    prepTime: '30 минути',
    cookTime: '50 минути',
    servings: 8,
    difficulty: 'Средна',
    bachoProducts: ['Кисело мляко Бачо Илия'],
    ingredients: [
      {
        item: '700g ground meat (pork and beef mix)',
        itemBg: '700г кайма (смес от свинско и телешко)',
      },
      { item: '1kg potatoes (peeled and sliced)', itemBg: '1кг картофи (обелени и нарязани)' },
      { item: '2 large onions (chopped)', itemBg: '2 големи глави лук (нарязани)' },
      { item: '2 carrots (grated)', itemBg: '2 моркова (настъргани)' },
      { item: '4 eggs', itemBg: '4 яйца' },
      { item: '400g Bacho Ilia yogurt', itemBg: '400г кисело мляко „Бачо Илия“' },
      { item: '100ml sunflower oil', itemBg: '100мл слънчогледово олио' },
      { item: '1 tsp paprika', itemBg: '1 ч.л. червен пипер' },
      { item: 'Fresh parsley (chopped)', itemBg: 'Прясна магданоз (нарязан)' },
      { item: 'Salt, black pepper, savory', itemBg: 'Сол, черен пипер, чубрица' },
      { item: '1 tbsp flour', itemBg: '1 с.л. брашно' },
    ],
    instructions: [
      {
        step: 'Heat 3 tbsp oil in a large pan. Sauté chopped onions until golden, add grated carrots and cook for 5 minutes.',
        stepBg:
          'Загрейте 3 с.л. олио в голям тиган. Задушете нарязания лук до златисто, добавете настърганите моркови и гответе 5 минути.',
      },
      {
        step: 'Add ground meat, breaking it up. Season with paprika, salt, pepper, and savory. Cook until meat is browned. Add chopped parsley.',
        stepBg:
          'Добавете каймата, като я раздробявате. Подправете с червен пипер, сол, черен пипер и чубрица. Гответе, докато каймата покафенее. Добавете нарязания магданоз.',
      },
      {
        step: 'Preheat oven to 180°C. Grease a large baking dish with oil.',
        stepBg: 'Загрейте фурната на 180°C. Намажете голяма тава с олио.',
      },
      {
        step: 'Layer half the sliced potatoes in the dish, season with salt. Add all the meat mixture, spreading evenly. Top with remaining potatoes.',
        stepBg:
          'Поставете половината от нарязаните картофи в тавата, подправете със сол. Добавете цялата смес с каймата, като я разпределите равномерно. Покрийте с останалите картофи.',
      },
      {
        step: 'In a bowl, whisk together eggs, Bacho Ilia yogurt, flour, and a pinch of salt until smooth.',
        stepBg:
          'В купа разбийте яйцата, киселото мляко „Бачо Илия“, брашното и щипка сол до получаване на гладка смес.',
      },
      {
        step: 'Pour the Bacho Ilia yogurt mixture evenly over the potatoes, ensuring complete coverage.',
        stepBg:
          'Изсипете сместа с киселото мляко равномерно върху картофите, като се уверите, че ги покрива напълно.',
      },
      {
        step: 'Bake for 50 minutes until the top is golden brown and puffy. Let rest for 10 minutes before serving.',
        stepBg:
          'Печете 50 минути, докато заливката стане златиста и пухкава. Оставете да почине 10 минути преди сервиране.',
      },
    ],
    tips: [
      {
        tip: "The secret to perfect moussaka is Bacho Ilia yogurt - it creates that signature fluffy, golden topping that's authentically Bulgarian",
        tipBg:
          'Тайната на перфектната мусака е в киселото мляко „Бачо Илия“ – то създава характерната пухкава, златиста заливка, която е автентично българска.',
      },
      {
        tip: 'Slice potatoes thinly and evenly for consistent cooking',
        tipBg: 'Нарежете картофите на тънки и равномерни парчета за равномерно готвене.',
      },
      {
        tip: "Don't skip the resting time - it helps the moussaka set perfectly",
        tipBg: 'Не пропускайте времето за почивка – то помага на мусаката да се стегне перфектно.',
      },
    ],
    story:
      'Мусаката е най-обичаното ястие в България – това не е просто храна, а неделно следобедно щастие! Всяка баба я прави малко по-различно, но всички имат едно общо нещо – използват най-доброто кисело мляко. Киселото мляко „Бачо Илия“, направено с мляко от щастливи крави, без химикали и консерванти, е това, което прави заливката пухкава, златиста и с неповторим вкус. Когато отворите фурната и ви завладее ароматът на мусака с кисело мляко „Бачо Илия“ – това е ароматът на българската неделя, на семейната трапеза, на детството. Ухае на баба до печката!',
    storyBg:
      'Мусаката е най-обичаното ястие в България – това не е просто храна, а неделно следобедно щастие! Всяка баба я прави малко по-различно, но всички имат едно общо нещо – използват най-доброто кисело мляко. Киселото мляко „Бачо Илия“, направено с мляко от щастливи крави, без химикали и консерванти, е това, което прави заливката пухкава, златиста и с неповторим вкус. Когато отворите фурната и ви завладее ароматът на мусака с кисело мляко „Бачо Илия“ – това е ароматът на българската неделя, на семейната трапеза, на детството. Ухае на баба до печката!',
  },
  {
    slug: 'bob-yahnia',
    title: 'Traditional Bean Stew - Bob na Cherveno',
    titleBg: 'Традиционен боб по манастирски',
    description:
      'Hearty winter bean stew cooked with onions, peppers, and savory tomato sauce. Served with a generous spoonful of Bacho Ilia yogurt - warming comfort from the village.',
    descriptionBg:
      'Засищаща зимна боб яхния, сготвена с лук, чушки и ароматен доматен сос. Сервира се с щедра лъжица кисело мляко „Бачо Илия“ – топла и уютна храна, досущ като от село.',
    image: '/recipes/bob-qhniq.jpg',
    prepTime: '15 минути',
    cookTime: '90 минути',
    servings: 6,
    difficulty: 'Лесна',
    bachoProducts: ['Кисело мляко Бачо Илия'],
    ingredients: [
      { item: '500g dried white beans', itemBg: '500г сух бял боб' },
      { item: '2 large onions (chopped)', itemBg: '2 големи глави лук (нарязани)' },
      { item: '2 carrots (diced)', itemBg: '2 моркова (нарязани на кубчета)' },
      { item: '2 red bell peppers (diced)', itemBg: '2 червени чушки (нарязани на кубчета)' },
      {
        item: '400g canned tomatoes or 4 fresh tomatoes (grated)',
        itemBg: '400г домати от консерва или 4 пресни домата (настъргани)',
      },
      { item: '3 tbsp tomato paste', itemBg: '3 с.л. доматено пюре' },
      { item: '4 tbsp sunflower oil', itemBg: '4 с.л. слънчогледово олио' },
      { item: '2 bay leaves', itemBg: '2 дафинови листа' },
      { item: '2 tsp paprika', itemBg: '2 ч.л. червен пипер' },
      { item: '1 tsp dried mint', itemBg: '1 ч.л. сушена мента' },
      { item: '1 tsp savory (chubritsa)', itemBg: '1 ч.л. чубрица' },
      { item: 'Salt, black pepper', itemBg: 'Сол, черен пипер' },
      {
        item: '300g Bacho Ilia yogurt (for serving)',
        itemBg: '300г кисело мляко „Бачо Илия“ (за сервиране)',
      },
      { item: 'Fresh bread', itemBg: 'Прясна хляб' },
    ],
    instructions: [
      {
        step: 'Soak beans overnight in cold water. Drain and rinse before cooking.',
        stepBg: 'Накиснете боба за една нощ в студена вода. Отцедете и изплакнете преди готвене.',
      },
      {
        step: 'Place beans in a large pot, cover with fresh water (about 5cm above beans). Bring to boil, then simmer for 60 minutes until tender.',
        stepBg:
          'Сложете боба в голяма тенджера, покрийте с чиста вода (около 5 см над боба). Оставете да заври, след което намалете огъня и варете 60 минути, докато омекне.',
      },
      {
        step: 'In a separate pan, heat oil. Sauté chopped onions until soft, add diced carrots and peppers, cook for 10 minutes.',
        stepBg:
          'В отделен тиган загрейте олио. Задушете нарязания лук до омекване, добавете нарязаните моркови и чушки и гответе 10 минути.',
      },
      {
        step: 'Add paprika, tomato paste, grated tomatoes, bay leaves, mint, savory, salt and pepper to the vegetable mixture. Cook for 5 minutes.',
        stepBg:
          'Добавете червения пипер, доматеното пюре, настърганите домати, дафиновите листа, ментата, чубрицата, сол и черен пипер към зеленчуковата смес. Гответе 5 минути.',
      },
      {
        step: 'Add the vegetable-tomato mixture to the cooked beans. Mix well and simmer together for 30 minutes, stirring occasionally.',
        stepBg:
          'Добавете зеленчуково-доматената смес към сварения боб. Разбъркайте добре и оставете да къкри заедно за 30 минути, като разбърквате от време на време.',
      },
      {
        step: 'Adjust seasoning. Serve hot in bowls with a generous dollop of Bacho Ilia yogurt on top and fresh bread on the side.',
        stepBg:
          'Овкусете допълнително, ако е необходимо. Сервирайте ястието горещо в купички с щедра лъжица кисело мляко „Бачо Илия“ отгоре и прясна хляб отстрани.',
      },
    ],
    tips: [
      {
        tip: 'The authentic Bulgarian touch is Bacho Ilia yogurt on top - it cools and balances the hearty stew perfectly',
        tipBg:
          'Автентичният български завършек е киселото мляко „Бачо Илия“ отгоре – то охлажда и балансира перфектно засищащата яхния.',
      },
      {
        tip: 'For a spicier version, add hot peppers or red pepper flakes',
        tipBg: 'За по-пикантен вариант добавете люти чушки или люспи от червен пипер.',
      },
      {
        tip: 'This stew tastes even better the next day - the flavors develop overnight',
        tipBg: 'Тази яхния е още по-вкусна на следващия ден – ароматите се развиват през нощта.',
      },
    ],
    story:
      'Боб яхнията е зимна топлина в чиния – селско ястие, което сгрява като камина в студените дни! Всяко българско семейство има своя версия, но всички са съгласни за едно – без щедра лъжица студено кисело мляко отгоре, боб яхнията не е същата! Киселото мляко „Бачо Илия“, направено по стари рецепти с мляко от щастливи крави, е последният щрих, който превръща обикновения боб в кулинарно изживяване. Топлата яхния, студеното кисело мляко, пресният хляб – това е българската зима на масата! Плътно, засищащо, с вкус на село и традиция.',
    storyBg:
      'Боб яхнията е зимна топлина в чиния – селско ястие, което сгрява като камина в студените дни! Всяко българско семейство има своя версия, но всички са съгласни за едно – без щедра лъжица студено кисело мляко отгоре, боб яхнията не е същата! Киселото мляко „Бачо Илия“, направено по стари рецепти с мляко от щастливи крави, е последният щрих, който превръща обикновения боб в кулинарно изживяване. Топлата яхния, студеното кисело мляко, пресният хляб – това е българската зима на масата! Плътно, засищащо, с вкус на село и традиция.',
  },
  {
    slug: 'mlechna-banica',
    title: 'Traditional Milk Banitsa',
    titleBg: 'Традиционна млечна баница',
    description:
      'Simple yet perfect - layers of filo dough soaked in Bacho Ilia milk, eggs and butter. The leading recipe in every Bulgarian cookbook - versatile, satisfying, and always delicious.',
    descriptionBg:
      'Проста, но перфектна – пластове от точени кори, напоени с прясно мляко „Бачо Илия“, яйца и масло. Водеща рецепта във всяка българска готварска книга – универсална, засищаща и винаги вкусна.',
    image: '/recipes/mlechna-banitsa.jpg',
    prepTime: '15 минути',
    cookTime: '45 минути',
    servings: 8,
    difficulty: 'Лесна',
    bachoProducts: ['Мляко Бачо Илия'],
    ingredients: [
      { item: '1 package filo pastry (400g)', itemBg: '1 пакет точени кори (400г)' },
      { item: '500ml Bacho Ilia milk', itemBg: '500мл прясно мляко „Бачо Илия“' },
      { item: '4 eggs', itemBg: '4 яйца' },
      { item: '100g butter (melted)', itemBg: '100г масло (разтопено)' },
      { item: '100ml sunflower oil', itemBg: '100мл слънчогледово олио' },
      { item: '1 tsp salt', itemBg: '1 ч.л. сол' },
      { item: '1 tsp baking soda (optional)', itemBg: '1 ч.л. сода бикарбонат (по желание)' },
      {
        item: 'Optional: 50g sugar for sweet version',
        itemBg: 'По избор: 50г захар за сладък вариант',
      },
    ],
    instructions: [
      {
        step: 'Preheat oven to 180°C. Grease a large rectangular baking pan with butter.',
        stepBg: 'Загрейте фурната на 180°C. Намажете голяма правоъгълна тава с масло.',
      },
      {
        step: 'In a large bowl, whisk together eggs, Bacho Ilia milk, melted butter, oil, and salt (add sugar if making sweet version). Mix until smooth.',
        stepBg:
          'В голяма купа разбийте яйцата, прясното мляко „Бачо Илия“, разтопеното масло, олиото и солта (добавете захар, ако правите сладък вариант). Разбъркайте до гладкост.',
      },
      {
        step: 'If using baking soda, add it to the milk mixture and stir quickly.',
        stepBg: 'Ако използвате сода, добавете я към млечната смес и разбъркайте бързо.',
      },
      {
        step: 'Layer 2-3 filo sheets in the bottom of the pan, crumpling them slightly. Pour some of the Bacho Ilia milk mixture over them. Repeat layers until all sheets are used, ending with milk mixture on top.',
        stepBg:
          'Поставете 2-3 кори на дъното на тавата, като ги намачкате леко. Изсипете част от млечната смес върху тях. Повторете пластовете, докато се изчерпят всички кори, като завършите с млечна смес отгоре.',
      },
      {
        step: 'Make sure all filo sheets are well soaked with the Bacho Ilia milk mixture. Let stand for 10 minutes before baking.',
        stepBg:
          'Уверете се, че всички кори са добре напоени с млечната смес. Оставете да престои 10 минути преди печене.',
      },
      {
        step: 'Bake for 45 minutes until golden brown and puffy on top.',
        stepBg: 'Печете 45 минути, докато баницата стане златиста и пухкава отгоре.',
      },
      {
        step: 'Let cool for 10 minutes before cutting. Serve warm or cold - delicious either way!',
        stepBg:
          'Оставете да се охлади 10 минути преди нарязване. Сервирайте топла или студена – вкусна е и в двата случая!',
      },
    ],
    tips: [
      {
        tip: 'Bacho Ilia milk is the soul of this banitsa - its authentic taste and quality make all the difference',
        tipBg:
          'Прясното мляко „Бачо Илия“ е душата на тази баница – неговият автентичен вкус и качество правят цялата разлика.',
      },
      {
        tip: 'For a savory version, omit sugar and serve with yogurt. For sweet version, add sugar and dust with powdered sugar',
        tipBg:
          'За солен вариант пропуснете захарта и сервирайте с кисело мляко. За сладък вариант добавете захар и поръсете с пудра захар.',
      },
      {
        tip: 'The key is ensuring every layer is well soaked with Bacho Ilia milk',
        tipBg: 'Ключът е да се уверите, че всеки пласт е добре напоен с прясното мляко „Бачо Илия“.',
      },
    ],
    story:
      'Млечната баница е водеща рецепта във всяка българска готварска книга – и има защо! Тя е универсалната баница – лесна за правене, винаги се получава, всеки я обича. Сутрин със захар и кафе – закуска. На обяд без захар, с кисело мляко – обяд. Това е баницата, която никога не отсъства от българската трапеза! Тайната? Прясното мляко „Бачо Илия“, направено по традиционни рецепти с мляко от щастливи крави. То е това, което прави тази проста баница незабравима – чиста, истинска, с вкус на българско село и семейна маса. Проста, но перфектна!',
    storyBg:
      'Млечната баница е водеща рецепта във всяка българска готварска книга – и има защо! Тя е универсалната баница – лесна за правене, винаги се получава, всеки я обича. Сутрин със захар и кафе – закуска. На обяд без захар, с кисело мляко – обяд. Това е баницата, която никога не отсъства от българската трапеза! Тайната? Прясното мляко „Бачо Илия“, направено по традиционни рецепти с мляко от щастливи крави. То е това, което прави тази проста баница незабравима – чиста, истинска, с вкус на българско село и семейна маса. Проста, но перфектна!',
  },
  {
    slug: 'kufteta-parzeni',
    title: 'Classic Bulgarian Meatballs - Kufteta',
    titleBg: 'Класически български кюфтета',
    description:
      'THE most popular Bulgarian dish - juicy fried meatballs seasoned with cumin, garlic, and savory. Served with Bacho Ilia yogurt, fresh salad, and lyutenitsa. Pure heaven!',
    descriptionBg:
      'НАЙ-популярното българско ястие – сочни пържени кюфтета, подправени с кимион, чесън и чубрица. Сервират се с кисело мляко „Бачо Илия“, свежа салата и лютеница. Истински рай!',
    image: '/recipes/kufteta.webp',
    prepTime: '15 минути',
    cookTime: '15 минути',
    servings: 4,
    difficulty: 'Лесна',
    bachoProducts: ['Кисело мляко Бачо Илия'],
    ingredients: [
      {
        item: '500g ground meat (pork and beef mix)',
        itemBg: '500г кайма (смес от свинско и телешко)',
      },
      { item: '1 large onion (finely chopped)', itemBg: '1 голяма глава лук (нарязан на ситно)' },
      { item: '2 garlic cloves (minced)', itemBg: '2 скилидки чесън (нарязани на ситно)' },
      { item: '1 slice bread (soaked in water)', itemBg: '1 филия хляб (накиснат във вода)' },
      { item: '1 egg', itemBg: '1 яйце' },
      { item: '2 tsp ground cumin', itemBg: '2 ч.л. кимион на прах' },
      { item: '1 tsp dried savory (chubritsa)', itemBg: '1 ч.л. сушена чубрица' },
      { item: '1 tsp paprika', itemBg: '1 ч.л. червен пипер' },
      { item: '1/2 tsp baking soda', itemBg: '1/2 ч.л. сода бикарбонат' },
      { item: 'Salt, black pepper', itemBg: 'Сол, черен пипер' },
      { item: 'Oil for frying', itemBg: 'Олио за пържене' },
      {
        item: '300g Bacho Ilia yogurt (for serving)',
        itemBg: '300г кисело мляко „Бачо Илия“ (за сервиране)',
      },
      { item: 'Fresh green salad, lyutenitsa', itemBg: 'Свежа зелена салата, лютеница' },
    ],
    instructions: [
      {
        step: 'Squeeze excess water from soaked bread. In a large bowl, combine ground meat, bread, egg, chopped onion, minced garlic, cumin, savory, paprika, baking soda, salt and pepper.',
        stepBg:
          'Изстискайте излишната вода от накиснатия хляб. В голяма купа смесете каймата, хляба, яйцето, нарязания лук, нарязания чесън, кимиона, чубрицата, червения пипер, содата, солта и черния пипер.',
      },
      {
        step: 'Knead the mixture well for 5 minutes until it becomes sticky and well combined.',
        stepBg: 'Омесете сместа добре за 5 минути, докато стане лепкава и хомогенна.',
      },
      {
        step: 'Let the mixture rest for 15 minutes in the refrigerator.',
        stepBg: 'Оставете сместа да почине 15 минути в хладилника.',
      },
      {
        step: 'With wet hands, shape the mixture into oval meatballs (about 2 tbsp each).',
        stepBg: 'С мокри ръце оформете сместа на овални кюфтета (около 2 с.л. всяко).'
      },
      {
        step: 'Heat oil in a deep pan (about 2cm deep). Fry meatballs in batches, turning to brown evenly on all sides, about 4-5 minutes per batch.',
        stepBg:
          'Загрейте олио в дълбок тиган (около 2 см дълбочина). Изпържете кюфтетата на партиди, като ги обръщате, за да покафенеят равномерно от всички страни, за около 4-5 минути на партида.',
      },
      {
        step: 'Drain on paper towels. Serve hot with generous dollops of Bacho Ilia yogurt, fresh green salad, and lyutenitsa.',
        stepBg:
          'Отцедете върху кухненска хартия. Сервирайте горещи с щедри лъжици кисело мляко „Бачо Илия“, свежа зелена салата и лютеница.',
      },
    ],
    tips: [
      {
        tip: 'The authentic Bulgarian way is with Bacho Ilia yogurt - its cool, tangy taste perfectly balances the hot, spicy meatballs',
        tipBg:
          'Автентичният български начин е с кисело мляко „Бачо Илия“ – неговият хладен, кисел вкус перфектно балансира горещите, пикантни кюфтета.',
      },
      {
        tip: "Baking soda makes the meatballs fluffy and tender - don't skip it!",
        tipBg: 'Содата прави кюфтетата пухкави и нежни – не я пропускайте!',
      },
      {
        tip: 'Wet hands prevent the meat mixture from sticking when shaping',
        tipBg: 'Мокрите ръце предотвратяват залепването на сместа при оформянето на кюфтетата.',
      },
    ],
    story:
      'Кюфтетата са най-любимото, най-готвеното и най-популярното ястие в България! Няма обяд без кюфтета някъде в България – така е! Всяка българска домакиня ги прави, всяко българско дете ги обожава, всеки български гост ги иска. Тайната? Кимионът, чубрицата, содата... и задължително студеното кисело мляко „Бачо Илия“ отстрани! Без него кюфтетата не са същите. Топли, сочни, златисти кюфтета, студено кисело мляко „Бачо Илия“, хрупкава зелена салата, пикантна лютеница – това е България в чиния! Просто, честно, вкусно. Кюфтета със зелена салата и лютеница – това е истинска българска закуска, обяд и вечеря!',
    storyBg:
      'Кюфтетата са най-любимото, най-готвеното и най-популярното ястие в България! Няма обяд без кюфтета някъде в България – така е! Всяка българска домакиня ги прави, всяко българско дете ги обожава, всеки български гост ги иска. Тайната? Кимионът, чубрицата, содата... и задължително студеното кисело мляко „Бачо Илия“ отстрани! Без него кюфтетата не са същите. Топли, сочни, златисти кюфтета, студено кисело мляко „Бачо Илия“, хрупкава зелена салата, пикантната лютеница – това е България в чиния! Просто, честно, вкусно. Кюфтета със зелена салата и лютеница – това е истинска българска закуска, обяд и вечеря!',
  },
];

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return recipes.find((recipe) => recipe.slug === slug);
}

export function getAllRecipeSlugs(): string[] {
  return recipes.map((recipe) => recipe.slug);
}
