export interface StoreLocation {
  id: string;
  name: string;
  type: 'supermarket' | 'local-shop' | 'market' | 'specialty';
  city: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  phone?: string;
  workingHours: string;
  products: string[]; // product IDs from products-data
  description?: string;
}

export const stores: StoreLocation[] = [
  // София - 3 магазина
  {
    id: 'kaufland-sofia-vitosha',
    name: 'Кауфланд',
    type: 'supermarket',
    city: 'София',
    address: 'бул. Витоша 100',
    coordinates: { lat: 42.6977, lng: 23.3219 },
    phone: '02 123 4567',
    workingHours: 'Всеки ден 08:00 - 22:00',
    products: ['byalo-sirene', 'kashkaval', 'kiselo-mlyako', 'maslo'],
    description: 'Всички продукти Бачо Илия в хладилната витрина за млечни продукти'
  },
  {
    id: 'billa-sofia-nadejda',
    name: 'Билла',
    type: 'supermarket',
    city: 'София',
    address: 'ж.к. Надежда, бул. Ломско шосе 47',
    coordinates: { lat: 42.7339, lng: 23.3035 },
    phone: '02 234 5678',
    workingHours: 'Всеки ден 07:30 - 22:30',
    products: ['byalo-sirene', 'kashkaval', 'kiselo-mlyako'],
    description: 'Намерете Бачо Илия в секцията за традиционни български продукти'
  },
  {
    id: 'local-sofia-zhenski-pazar',
    name: 'Младежки магазин',
    type: 'local-shop',
    city: 'София',
    address: 'Женски пазар, ул. Стефан Стамболов 3',
    coordinates: { lat: 42.7028, lng: 23.3250 },
    phone: '0888 123 456',
    workingHours: 'Пон-Съб 07:00 - 18:00',
    products: ['byalo-sirene', 'kashkaval', 'kiselo-mlyako', 'izvara', 'maslo'],
    description: 'Пресни продукти доставяни всеки ден, малък семеен магазин на Женски пазар'
  },

  // Пловдив - 2 магазина
  {
    id: 'metro-plovdiv',
    name: 'Метро',
    type: 'supermarket',
    city: 'Пловдив',
    address: 'бул. Васил Априлов 186',
    coordinates: { lat: 42.1354, lng: 24.7453 },
    phone: '032 123 456',
    workingHours: 'Всеки ден 08:00 - 21:00',
    products: ['byalo-sirene', 'kashkaval', 'kiselo-mlyako', 'maslo'],
    description: 'Пълна гама продукти Бачо Илия'
  },
  {
    id: 'local-plovdiv-kapana',
    name: 'Капанско деликатесно',
    type: 'specialty',
    city: 'Пловдив',
    address: 'ул. Райко Даскалов 12, Капана',
    coordinates: { lat: 42.1462, lng: 24.7514 },
    phone: '0877 234 567',
    workingHours: 'Всеки ден 09:00 - 20:00',
    products: ['byalo-sirene', 'kashkaval', 'kiselo-mlyako', 'izvara', 'maslo'],
    description: 'Специализиран магазин за традиционни български продукти в сърцето на Капана'
  },

  // Варна - 2 магазина
  {
    id: 'fantastico-varna',
    name: 'Фантастико',
    type: 'supermarket',
    city: 'Варна',
    address: 'бул. Сливница 125',
    coordinates: { lat: 43.2141, lng: 27.9147 },
    phone: '052 345 678',
    workingHours: 'Всеки ден 07:00 - 23:00',
    products: ['byalo-sirene', 'kashkaval', 'kiselo-mlyako'],
    description: 'Продукти Бачо Илия в отдел млечни продукти'
  },
  {
    id: 'local-varna-kolhozen',
    name: 'Колхозен пазар',
    type: 'market',
    city: 'Варна',
    address: 'Колхозен пазар, ул. Добрич 12',
    coordinates: { lat: 43.2047, lng: 27.9202 },
    phone: '0899 456 789',
    workingHours: 'Всеки ден 06:00 - 16:00',
    products: ['byalo-sirene', 'kashkaval', 'kiselo-mlyako', 'izvara', 'maslo'],
    description: 'Щанд No 23 - всички продукти Бачо Илия на пазарни цени'
  },

  // Бургас - 1 магазин
  {
    id: 'kaufland-burgas',
    name: 'Кауфланд',
    type: 'supermarket',
    city: 'Бургас',
    address: 'ул. Железопътна 2',
    coordinates: { lat: 42.5048, lng: 27.4626 },
    phone: '056 789 012',
    workingHours: 'Всеки ден 08:00 - 22:00',
    products: ['byalo-sirene', 'kashkaval', 'kiselo-mlyako', 'maslo'],
    description: 'Пълна гама продукти Бачо Илия в хладилната секция'
  },

  // Велико Търново - 1 магазин
  {
    id: 'local-veliko-tarnovo',
    name: 'Традиция',
    type: 'specialty',
    city: 'Велико Търново',
    address: 'ул. Стефан Стамболов 15',
    coordinates: { lat: 43.0757, lng: 25.6172 },
    phone: '062 234 567',
    workingHours: 'Пон-Съб 08:00 - 19:00',
    products: ['byalo-sirene', 'kashkaval', 'kiselo-mlyako', 'izvara', 'maslo'],
    description: 'Специализиран магазин за български традиционни продукти'
  },

  // Стара Загора - 1 магазин
  {
    id: 'billa-stara-zagora',
    name: 'Билла',
    type: 'supermarket',
    city: 'Стара Загора',
    address: 'бул. Цар Симеон Велики 120',
    coordinates: { lat: 42.4258, lng: 25.6346 },
    phone: '042 567 890',
    workingHours: 'Всеки ден 07:30 - 22:30',
    products: ['byalo-sirene', 'kashkaval', 'kiselo-mlyako'],
    description: 'Продукти Бачо Илия в секция традиционни продукти'
  },

  // Русе - 1 магазин
  {
    id: 'kaufland-ruse',
    name: 'Кауфланд',
    type: 'supermarket',
    city: 'Русе',
    address: 'ул. Липник 120',
    coordinates: { lat: 43.8486, lng: 25.9657 },
    phone: '082 890 123',
    workingHours: 'Всеки ден 08:00 - 22:00',
    products: ['byalo-sirene', 'kashkaval', 'kiselo-mlyako', 'maslo'],
    description: 'Всички продукти Бачо Илия налични'
  },

  // Благоевград - 1 магазин
  {
    id: 'local-blagoevgrad',
    name: 'Пирин магазин',
    type: 'local-shop',
    city: 'Благоевград',
    address: 'ул. Македония 25',
    coordinates: { lat: 42.0202, lng: 23.0944 },
    phone: '073 456 789',
    workingHours: 'Пон-Съб 08:00 - 19:00, Нед 09:00 - 14:00',
    products: ['byalo-sirene', 'kashkaval', 'kiselo-mlyako', 'izvara'],
    description: 'Местен магазин с висококачествени български продукти'
  }
];

// Helper functions
export function getAllStores(): StoreLocation[] {
  return stores;
}

export function getStoresByCity(city: string): StoreLocation[] {
  return stores.filter(store => store.city === city);
}

export function getAllCities(): string[] {
  const cities = stores.map(store => store.city);
  return [...new Set(cities)].sort();
}

export function getStoresByProduct(productId: string): StoreLocation[] {
  return stores.filter(store => store.products.includes(productId));
}

export function searchStores(query: string): StoreLocation[] {
  const lowerQuery = query.toLowerCase();
  return stores.filter(store =>
    store.name.toLowerCase().includes(lowerQuery) ||
    store.city.toLowerCase().includes(lowerQuery) ||
    store.address.toLowerCase().includes(lowerQuery)
  );
}
