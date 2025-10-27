export interface ProductSize {
  size: string;
  weight: string;
  price?: string; // optional, може да не показваме цена
  image?: string; // optional, image за конкретния размер
  description?: string; // optional, специално описание за размера
}

export interface NutritionFacts {
  energy: string;
  fat: string;
  saturatedFat: string;
  carbohydrates: string;
  sugars: string;
  protein: string;
  salt: string;
  calcium?: string;
}

export interface ProductTestimonial {
  name: string;
  location: string;
  quote: string;
  rating: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'cheese' | 'yogurt' | 'drinks' | 'other';
  shortDescription: string;
  fullDescription: string;
  image: string;
  sizes: ProductSize[];
  ingredients: string[];
  nutritionPer100g: NutritionFacts;
  relatedRecipes: string[]; // slugs от recipes-data
  bachoTip: string;
  testimonials: ProductTestimonial[];
  features: string[];
  shelfLife: string;
  storage: string;
}

export const products: Product[] = [
  {
    id: 'byalo-sirene',
    name: 'Бяло сирене',
    slug: 'byalo-sirene',
    category: 'cheese',
    shortDescription: 'Традиционно българско бяло сирене, направено по бабината рецепта от краве мляко.',
    fullDescription: 'Нашето бяло сирене е направено точно както бабата ме научи преди 50 години. Само прясно краве мляко от щастливи крави на свободен избор, сол и култура. Без консерванти, без химия, без бързане. Узрява минимум 30 дни за да получи истинския плътен вкус на традиционното българско сирене.',
    image: '/products/sirene/BI-sirene-400-metal-480x480.png',
    sizes: [
      {
        size: 'Мини',
        weight: '200г',
        price: '3.50 лв',
        image: '/products/sirene/BI-sirene-200-vac-480x480.png',
        description: 'Компактна вакуумна опаковка 200г - идеална за проба или малки домакинства'
      },
      {
        size: 'Стандартна',
        weight: '300г',
        price: '4.80 лв',
        image: '/products/sirene/BI-sirene-300-vac-480x480.png',
        description: 'Популярна вакуумна опаковка 300г - удобна за редовна употреба'
      },
      {
        size: 'Средна',
        weight: '400г',
        price: '6.00 лв',
        image: '/products/sirene/BI-sirene-400-metal-480x480.png',
        description: 'Най-популярният размер в метална кутия - запазва свежестта и вкуса'
      },
      {
        size: 'Голяма',
        weight: '800г',
        price: '11.50 лв',
        image: '/products/sirene/BI-sirene-800-metal-480x480.png',
        description: 'Голяма метална опаковка - идеална за по-често ползване'
      },
      {
        size: 'Семейна',
        weight: '4кг',
        price: '56.00 лв',
        image: '/products/sirene/BI-sirene-4KG-480x480.png',
        description: 'Голяма семейна опаковка - перфектна за баници и семейни празници'
      },
      {
        size: 'Ресторантска',
        weight: '8кг',
        price: '108.00 лв',
        image: '/products/sirene/BI-sirene-8KG-480x480.jpg',
        description: 'Професионална опаковка за ресторанти и кетъринг'
      }
    ],
    ingredients: [
      'Пастьоризирано краве мляко',
      'Сол',
      'Млечнокисели култури',
      'Сирищен фермент'
    ],
    nutritionPer100g: {
      energy: '281 kcal / 1175 kJ',
      fat: '22g',
      saturatedFat: '14g',
      carbohydrates: '1.5g',
      sugars: '1.5g',
      protein: '19g',
      salt: '2.8g',
      calcium: '490mg'
    },
    relatedRecipes: ['traditional-banitsa', 'shopska-salad-classic', 'snezhanka-tarator-combo'],
    bachoTip: 'Сиренето трябва да е едро счукано за баница, не на ситно. Така хапва по-хубаво и вкусът излиза по-добре.',
    testimonials: [
      {
        name: 'Мария',
        location: 'София',
        quote: 'Децата ми отказваха всяко сирене... 5-годишната ми дъщеря сега иска само Бачо Илия!',
        rating: 5
      },
      {
        name: 'Иван',
        location: 'Пловдив',
        quote: 'От години търсех вкуса на бабините сирена... Пробвах Бачо Илия и плаках като малко дете.',
        rating: 5
      },
      {
        name: 'Елена',
        location: 'Варна',
        quote: 'Четях етикети като луда... Бачо Илия: само мляко, сол и култура. Точно това искам!',
        rating: 5
      }
    ],
    features: [
      'Само от краве мляко на свободен избор',
      'Без консерванти и химия',
      'Узрява минимум 30 дни',
      'Традиционна бабина рецепта',
      'Плътна текстура и наситен вкус',
      'Високо съдържание на калций'
    ],
    shelfLife: '60 дни от датата на производство',
    storage: 'Съхранявайте на температура от 2°C до 8°C в оригиналната опаковка'
  },
  {
    id: 'kashkaval',
    name: 'Кашкавал',
    slug: 'kashkaval',
    category: 'cheese',
    shortDescription: 'Златист, полутвърд кашкавал с нежен вкус, който се топи красиво.',
    fullDescription: 'Кашкавалът е направен по същата бабина рецепта, но с повече търпение. Узрява 60 дни за да получи характерния си златист цвят и кремава текстура. Топи се красиво и е перфектен за панирано кашкавал, пици или просто като закуска. Децата го обичат, родителите му се доверяват.',
    image: '/products/kashkaval/BI-kashkaval-1500-480x480.png',
    sizes: [
      {
        size: 'Мини',
        weight: '300г',
        price: '7.50 лв',
        image: '/products/kashkaval/BI-kashkaval-300-vac-480x480.png',
        description: 'Компактна вакуумна опаковка - идеална за проба или малко домакинство'
      },
      {
        size: 'Семейна опаковка',
        weight: '1.5кг',
        price: '33.00 лв',
        image: '/products/kashkaval/BI-kashkaval-1500-480x480.png',
        description: 'Популярният семеен размер - достатъчен за цяла седмица'
      },
      {
        size: 'Ресторантска',
        weight: '7кг',
        price: '147.00 лв',
        image: '/products/kashkaval/BI-kashkaval-7000-480x480.jpg',
        description: 'Професионална опаковка за ресторанти, кетъринг и пицарии'
      }
    ],
    ingredients: [
      'Пастьоризирано краве мляко',
      'Сол',
      'Млечнокисели култури',
      'Сирищен фермент'
    ],
    nutritionPer100g: {
      energy: '357 kcal / 1494 kJ',
      fat: '28g',
      saturatedFat: '18g',
      carbohydrates: '0.5g',
      sugars: '0.5g',
      protein: '26g',
      salt: '2.5g',
      calcium: '720mg'
    },
    relatedRecipes: ['kashkaval-pane', 'traditional-banitsa'],
    bachoTip: 'Кашкавалът се топи красиво ако го изважиш 10 минути преди готвене от хладилника. Сервирай го топло - по-добре от ресторантско.',
    testimonials: [
      {
        name: 'Георги',
        location: 'Бургас',
        quote: 'Синът ми е на 8 години и ми каза "тате, този кашкавал е по-добър от пицата в центъра". Повече не мога да кажа.',
        rating: 5
      },
      {
        name: 'Десислава',
        location: 'Русе',
        quote: 'Правя панирано кашкавал всяка неделя с Бачо Илия. Всеки път ядем до последното парченце.',
        rating: 5
      }
    ],
    features: [
      'Узрява 60 дни за перфектен вкус',
      'Топи се кремаво и красиво',
      'Златист цвят без оцветители',
      'Идеален за панирано и пици',
      'Високо съдържание на протеин',
      'Любимец на децата'
    ],
    shelfLife: '90 дни от датата на производство',
    storage: 'Съхранявайте на температура от 2°C до 8°C. След отваряне консумирайте в рамките на 7 дни.'
  },
  {
    id: 'kiselo-mlyako-2',
    name: 'Кисело мляко 2%',
    slug: 'kiselo-mlyako-2',
    category: 'yogurt',
    shortDescription: 'Нискомаслено българско кисело мляко с корица - лек и здравословен избор.',
    fullDescription: 'Кисело мляко 2% мазнини - перфектният баланс между здравословно хранене и традиционен вкус. Правим го всеки ден от прясно краве мляко и жива култура. Гъсто, с корица отгоре, с истински вкус на село. Идеално за хора които пазят линията, но не искат да жертват вкуса.',
    image: '/products/kiselo-mlqko/BI-kiselo-mlyqko-2-480x480.jpg',
    sizes: [
      { size: 'Стандартна', weight: '400г', price: '3.20 лв' }
    ],
    ingredients: [
      'Пастьоризирано краве мляко',
      'Млечнокисели култури (Lactobacillus bulgaricus, Streptococcus thermophilus)'
    ],
    nutritionPer100g: {
      energy: '56 kcal / 234 kJ',
      fat: '2g',
      saturatedFat: '1.3g',
      carbohydrates: '4.7g',
      sugars: '4.7g',
      protein: '4g',
      salt: '0.1g',
      calcium: '125mg'
    },
    relatedRecipes: ['snezhanka-tarator-combo'],
    bachoTip: 'Това кисело мляко е нискомаслено, но пак гъсто! Перфектно за таратор и снежанка - кремава текстура, без излишни калории.',
    testimonials: [
      {
        name: 'Надежда',
        location: 'София',
        quote: 'Най-доброто кисело мляко което съм яла след бабиното. Истинско, гъсто, с корица отгоре.',
        rating: 5
      },
      {
        name: 'Петър',
        location: 'Велико Търново',
        quote: 'Правя таратор само с Бачо Илия кисело мляко. Другите са вода, това е кисело мляко!',
        rating: 5
      }
    ],
    features: [
      'Гъста, кремава текстура',
      'Естествена корица на повърхността',
      'Жива пробиотична култура',
      'Без захар и подсладители',
      'Прясно - произведено до 24 часа',
      'Перфектно за таратор и снежанка'
    ],
    shelfLife: '14 дни от датата на производство',
    storage: 'Съхранявайте на температура от 2°C до 6°C. Не замразявайте.'
  },
  {
    id: 'kiselo-mlyako-3-6',
    name: 'Кисело мляко 3.6%',
    slug: 'kiselo-mlyako-3-6',
    category: 'yogurt',
    shortDescription: 'Класическо българско кисело мляко - златната среда между вкус и здраве.',
    fullDescription: 'Кисело мляко 3.6% мазнини - това е класиката! Най-популярният вариант в България. Не е много мазно, не е много лайт - точно както трябва да бъде истинското българско кисело мляко. Гъсто, с корица, с бабиния вкус на село. Перфектно за таратор, снежанка или просто така с мед.',
    image: '/products/kiselo-mlqko/BI-kiselo-mlyqko-3.6-480x480.jpg',
    sizes: [
      { size: 'Стандартна', weight: '400г', price: '3.50 лв' }
    ],
    ingredients: [
      'Пастьоризирано краве мляко',
      'Млечнокисели култури (Lactobacillus bulgaricus, Streptococcus thermophilus)'
    ],
    nutritionPer100g: {
      energy: '64 kcal / 268 kJ',
      fat: '3.6g',
      saturatedFat: '2.3g',
      carbohydrates: '4.5g',
      sugars: '4.5g',
      protein: '3.5g',
      salt: '0.1g',
      calcium: '120mg'
    },
    relatedRecipes: ['snezhanka-tarator-combo'],
    bachoTip: 'Това е "златната среда" - ако не знаеш кое да избереш, вземи 3.6%. То е класиката, която всички обичаме от дете.',
    testimonials: [
      {
        name: 'Петър',
        location: 'Велико Търново',
        quote: 'Правя таратор само с Бачо Илия 3.6%. Другите са вода, това е кисело мляко!',
        rating: 5
      },
      {
        name: 'Мария',
        location: 'Пловдив',
        quote: 'Децата ми ядат това кисело мляко с лъжица и викат "още!". Първият път да видя това!',
        rating: 5
      }
    ],
    features: [
      'Класически 3.6% мазнини',
      'Гъста, кремава текстура',
      'Естествена корица на повърхността',
      'Жива пробиотична култура',
      'Без захар и подсладители',
      'Перфектно за таратор и снежанка'
    ],
    shelfLife: '14 дни от датата на производство',
    storage: 'Съхранявайте на температура от 2°C до 6°C. Не замразявайте.'
  },
  {
    id: 'kiselo-mlyako-4-5',
    name: 'Кисело мляко 4.5%',
    slug: 'kiselo-mlyako-4-5',
    category: 'yogurt',
    shortDescription: 'Пълномаслено българско кисело мляко - за истинските ценители на вкуса.',
    fullDescription: 'Кисело мляко 4.5% мазнини - това е "Rolls-Royce"-ът на киселите млека! Най-пълномасленото, най-кремавото, с най-наситен вкус. Ако искаш истинско село кисело мляко като на бабата, това е то. Топи се на езика, гъсто като крем, с богат млечен вкус. За истинските гурмани.',
    image: '/products/kiselo-mlqko/BI-kiselo-mlyqko-4.5-480x480.jpg',
    sizes: [
      { size: 'Стандартна', weight: '400г', price: '3.80 лв' }
    ],
    ingredients: [
      'Пастьоризирано краве мляко',
      'Млечнокисели култури (Lactobacillus bulgaricus, Streptococcus thermophilus)'
    ],
    nutritionPer100g: {
      energy: '72 kcal / 301 kJ',
      fat: '4.5g',
      saturatedFat: '2.9g',
      carbohydrates: '4.3g',
      sugars: '4.3g',
      protein: '3.3g',
      salt: '0.1g',
      calcium: '115mg'
    },
    relatedRecipes: ['snezhanka-tarator-combo'],
    bachoTip: 'Пълномасленото кисело мляко е тайната за перфектна снежанка - излиза като крем, копринена, като на ресторант!',
    testimonials: [
      {
        name: 'Надежда',
        location: 'София',
        quote: 'Най-доброто кисело мляко което съм яла след бабиното. Истинско, гъсто, с корица отгоре!',
        rating: 5
      },
      {
        name: 'Иван',
        location: 'Варна',
        quote: 'Ям го с лъжица като десерт. Жена ми казва "то е кисело мляко, не сладолед!" Ама е толкова добро...',
        rating: 5
      }
    ],
    features: [
      'Пълномаслено 4.5%',
      'Най-кремавата текстура',
      'Богат, наситен вкус',
      'Естествена корица',
      'Жива пробиотична култура',
      'Топи се на езика като крем'
    ],
    shelfLife: '14 дни от датата на производство',
    storage: 'Съхранявайте на температура от 2°C до 6°C. Не замразявайте.'
  },
  {
    id: 'ayran',
    name: 'Айран',
    slug: 'ayran',
    category: 'drinks',
    shortDescription: 'Истински български айран - освежаващ, леко солен, като на село.',
    fullDescription: 'Айранът на Бачо Илия е направен както бабата ме научи - от прясно кисело мляко, вода и щипка сол. Без консерванти, без стабилизатори, без добавки. Просто истински айран който утолява жаждата и освежава в горещите летни дни. Перфектен с баница, с мусака или просто така когато си изморен.',
    image: '/products/airan/Ayran-500-480x480.jpg',
    sizes: [
      {
        size: 'Мини',
        weight: '250мл',
        price: '1.80 лв',
        image: '/products/airan/Ayran-250-480x480.jpg',
        description: 'Компактна бутилка 250мл - идеална за закуска или път'
      },
      {
        size: 'Стандартна',
        weight: '500мл',
        price: '3.20 лв',
        image: '/products/airan/Ayran-500-480x480.jpg',
        description: 'Най-популярният размер - перфектен за хранене или освежаване'
      },
      {
        size: 'Семейна',
        weight: '1л',
        price: '5.80 лв',
        image: '/products/airan/Ayran-1000-480x480.jpg',
        description: 'Семейна бутилка 1 литър - за цялото семейство или по-голяма жажда'
      }
    ],
    ingredients: [
      'Кисело мляко (краве мляко, млечнокисели култури)',
      'Вода',
      'Сол'
    ],
    nutritionPer100g: {
      energy: '28 kcal / 117 kJ',
      fat: '1.5g',
      saturatedFat: '1g',
      carbohydrates: '2.2g',
      sugars: '2.2g',
      protein: '1.7g',
      salt: '0.4g',
      calcium: '60mg'
    },
    relatedRecipes: [],
    bachoTip: 'Айранът е най-добър студен, но не ледено студен! На 8-10 градуса е перфектен - утолява жаждата без да те наръби.',
    testimonials: [
      {
        name: 'Георги',
        location: 'Пловдив',
        quote: 'Спрях да пия кока-кола. Само айран на Бачо Илия през лятото. Децата ми също!',
        rating: 5
      },
      {
        name: 'Елена',
        location: 'Бургас',
        quote: 'Правя баница всяка неделя. С айран на Бачо Илия е като на село при баба!',
        rating: 5
      }
    ],
    features: [
      'Направен от прясно кисело мляко',
      'Без консерванти и добавки',
      'Освежаващ и утоляващ жаждата',
      'Леко солен, традиционен вкус',
      'Богат на пробиотици',
      'Перфектен с баница и мусака'
    ],
    shelfLife: '7 дни от датата на производство',
    storage: 'Съхранявайте на температура от 2°C до 6°C. Разбъркайте преди употреба.'
  },
  {
    id: 'protein-kiselo-mlyako',
    name: 'Протеиново кисело мляко',
    slug: 'protein-kiselo-mlyako',
    category: 'yogurt',
    shortDescription: 'Високо-протеиново кисело мляко с 10% протеин - за активни хора и спортисти.',
    fullDescription: 'Протеиновото кисело мляко на Бачо Илия е създадено специално за активни хора, спортисти и всички които искат повече протеин в храната си. С 10г протеин на 100г, това е двойно повече от обикновеното кисело мляко! Гъста текстура, приятен вкус, без добавени протеинови прахове - просто концентрирано мляко и жива култура. Перфектно след тренировка или като здравословна закуска.',
    image: '/products/protein/BachoIliya-Protein-480x480.png',
    sizes: [
      {
        size: 'Стандартна',
        weight: '400г',
        price: '5.20 лв',
        image: '/products/protein/BachoIliya-Protein-480x480.png',
        description: 'Високо-протеинова опаковка 400г - 40г протеин на опаковка!'
      }
    ],
    ingredients: [
      'Концентрирано пастьоризирано краве мляко',
      'Млечнокисели култури (Lactobacillus bulgaricus, Streptococcus thermophilus)'
    ],
    nutritionPer100g: {
      energy: '88 kcal / 368 kJ',
      fat: '2.5g',
      saturatedFat: '1.6g',
      carbohydrates: '5.2g',
      sugars: '5.2g',
      protein: '10g',
      salt: '0.15g',
      calcium: '180mg'
    },
    relatedRecipes: [],
    bachoTip: 'След тренировка ядеш ли протеиново кисело мляко? Мускулите ти ще благодарят! 40г протеин в 1 опаковка, естествено от мляко.',
    testimonials: [
      {
        name: 'Атанас',
        location: 'София',
        quote: 'Преди плащах 10 лева за протеинов шейк с химия. Сега ям кисело мляко на Бачо Илия за 3 лева и е по-добро!',
        rating: 5
      },
      {
        name: 'Мартин',
        location: 'Варна',
        quote: 'Качвам мускулна маса с протеиново кисело мляко. Вкусът е страхотен, протеините са реални!',
        rating: 5
      }
    ],
    features: [
      'Високо съдържание на протеин - 10г/100г',
      '40г протеин в 1 опаковка',
      'Без добавени протеинови прахове',
      'Естествено концентрирано мляко',
      'Жива пробиотична култура',
      'Перфектно след тренировка',
      'Гъста, кремава текстура'
    ],
    shelfLife: '14 дни от датата на производство',
    storage: 'Съхранявайте на температура от 2°C до 6°C. Не замразявайте.'
  }
];

// Helper functions
export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(product => product.slug === slug);
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return products.filter(product => product.category === category);
}

export function getAllProductSlugs(): string[] {
  return products.map(product => product.slug);
}
