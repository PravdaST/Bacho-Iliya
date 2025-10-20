# Open Graph Images для Bacho Ilia

Тази папка съдържа Open Graph (OG) изображения за социално споделяне.

## Технически изисквания

**Важно:** Всички OG изображения трябва да са:
- **Размер:** 1200x630 пиксела (2:1 съотношение)
- **Формат:** JPG или PNG
- **Размер на файл:** < 300KB за оптимална скорост
- **Цветово пространство:** sRGB

## Необходими изображения

### 1. Основни страници

#### `default.jpg` (1200x630)
- Основно OG изображение, използвано като резервно
- Показва лого Бачо Илия с фон старинна хартия
- Текст: "Автентични български млечни продукти"

#### `home.jpg` (1200x630)
- За началната страница
- Показва главния продукт (бяло сирене) с раздаване badge
- Текст: "Спечели безплатни продукти Бачо Илия!"

#### `products.jpg` (1200x630)
- За страницата /products
- Показва 3-4 продукта в polaroid стил
- Текст: "Нашите продукти - Истински млечни продукти"

#### `giveaway.jpg` (1200x630)
- За раздаването
- Eye-catching дизайн с продукти и "РАЗДАВАНЕ" текст
- Deadline и CTA: "Участвай сега!"

#### `recipes.jpg` (1200x630)
- За страницата с рецепти
- Показва баница или традиционно ястие
- Текст: "Рецепти с продукти Бачо Илия"

#### `stores.jpg` (1200x630)
- За страницата "Къде да купиш"
- Карта на България с локации
- Текст: "Намери магазин с продукти Бачо Илия"

#### `about.jpg` (1200x630)
- За страницата "За нас"
- Vintage фотография или илюстрация на Бачо Илия
- Текст: "История и традиция от 1950"

### 2. Продуктови изображения

Динамични OG изображения за всеки продукт (/products/[slug]):

#### `product-byalo-sirene.jpg` (1200x630)
- Бяло сирене в красива визия
- Име на продукта и категория
- Цена и размери

#### `product-kashkaval.jpg` (1200x630)
- Кашкавал
- Име и категория

#### `product-kiselo-mlyako-2.jpg` (1200x630)
- Кисело мляко 2%
- Акцент върху нискомаслено

#### `product-kiselo-mlyako-3-6.jpg` (1200x630)
- Кисело мляко 3.6%

#### `product-kiselo-mlyako-4-5.jpg` (1200x630)
- Кисело мляко 4.5%

#### `product-ayran.jpg` (1200x630)
- Айран
- Освежаващ summer vibe

#### `product-izvara.jpg` (1200x630)
- Извара

#### `product-maslo.jpg` (1200x630)
- Масло

## Дизайн насоки

### Цветова палитра (от tailwind.config.ts)
```css
--old-paper: #F5E6D3
--walnut: #5D4E37
--bulgarian-red: #D62828
--sunflower: #F77F00
--faded-denim: #4A5859
```

### Брандинг елементи
- Използвай handwritten font за заглавия (Caveat)
- Vintage/scrapbook стил
- Polaroid рамки за продуктови изображения
- Washi tape декорация
- Paper texture background

### Текст на изображенията
- Заглавие: 40-60 символа
- Описание: 100-120 символа
- Големи, четливи шрифтове (min 48px за заглавия)
- Висок контраст за четимост

## Как да генерирате OG изображения

### Опция 1: Ръчно с Figma/Photoshop
1. Създайте artboard 1200x630px
2. Използвайте цветовете и стила от дизайна на сайта
3. Експортирайте като JPG (качество 85%)

### Опция 2: Автоматично с @vercel/og (препоръчително за бъдеще)
Можем да създадем API route за динамично генериране на OG изображения:

```typescript
// app/api/og/route.tsx
import { ImageResponse } from '@vercel/og';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title');

  return new ImageResponse(
    (
      <div style={{
        background: '#F5E6D3',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <h1 style={{ fontSize: 64 }}>{title}</h1>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
```

### Опция 3: Използвай Canva
1. Отвори Canva
2. Създай custom size: 1200x630px
3. Използвай templates за social media
4. Експортирай като JPG

## Тестване на OG изображения

### Facebook Sharing Debugger
https://developers.facebook.com/tools/debug/

### Twitter Card Validator
https://cards-dev.twitter.com/validator

### LinkedIn Post Inspector
https://www.linkedin.com/post-inspector/

### Open Graph Preview Tool
https://www.opengraph.xyz/

## Status

✅ Metadata библиотека създадена (`lib/metadata.ts`)
✅ Products page metadata добавени
✅ Dynamic product metadata добавени
⏳ OG изображения - необходимо създаване
⏳ Dynamic OG image generation API - бъдеща имплементация
