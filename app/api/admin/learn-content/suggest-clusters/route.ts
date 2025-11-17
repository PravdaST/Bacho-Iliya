import { supabaseAdmin } from '@/lib/supabase';
import { NextResponse } from 'next/server';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = 'google/gemini-2.5-flash-lite';

async function callOpenRouter(messages: any[], temperature = 0.4, maxTokens = 4000) {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://www.bacho-iliya.eu',
        'X-Title': 'Bacho Iliya AI Cluster Suggestions'
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature,
        max_tokens: maxTokens,
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[OpenRouter] API Error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });

      // Provide more specific error messages
      if (response.status === 401) {
        throw new Error('OpenRouter API authentication failed. Please check your API key.');
      } else if (response.status === 403) {
        throw new Error('OpenRouter API access forbidden. Your API key may not have the required permissions.');
      } else if (response.status === 429) {
        throw new Error('OpenRouter API rate limit exceeded. Please try again later.');
      } else {
        throw new Error(`OpenRouter API error (${response.status}): ${errorText}`);
      }
    }

    const data = await response.json();

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('[OpenRouter] Unexpected response format:', data);
      throw new Error('OpenRouter returned an invalid response format');
    }

    return data.choices[0].message.content;
  } catch (error: any) {
    // Log the full error for debugging
    console.error('[OpenRouter] Error calling API:', error);
    throw error; // Re-throw to be handled by caller
  }
}

export async function POST(request: Request) {
  const supabase = supabaseAdmin;

  // Validate critical environment variables
  if (!OPENROUTER_API_KEY) {
    console.error('[Suggest Clusters] OPENROUTER_API_KEY is not configured');
    return NextResponse.json(
      {
        error: 'OpenRouter API key is not configured. Please set OPENROUTER_API_KEY in environment variables.',
        hint: 'Check Vercel Dashboard → Settings → Environment Variables'
      },
      { status: 500 }
    );
  }

  try {
    // --- OPTIMIZATION: Fetch all existing titles ONCE ---
    const { data: allPosts, error: allPostsError } = await supabase
      .from('blog_posts')
      .select('title')
      .eq('category', 'learn-guide');

    if (allPostsError) {
      console.error('[Suggest Clusters] Database error fetching all posts:', allPostsError);
      return NextResponse.json(
        {
          error: 'Failed to fetch existing content from database',
          details: allPostsError.message
        },
        { status: 500 }
      );
    }

    // Create a Set for efficient, case-insensitive lookups
    const existingTitlesSet = new Set(allPosts.map(p => p.title.toLowerCase()));
    const existingTitles = allPosts.map(p => p.title);

    // Build context for the prompt (no change here)
    const existingClustersList = existingTitles.join(', ') || 'няма'; // Simplified for prompt context
    const existingPillarsList = ''; // This was already simplified, keeping it clean

    // AI analyzes site and suggests clusters
    const analysisPrompt = [
      {
        role: 'system',
        content: `Ти си SEO експерт, български етнолог и кулинарен историк. Работиш за Бачо Илия - истински български млечен бранд. Твоята задача е да създаваш СТРУКТУРИ от съдържание (Topic Clusters).

КРИТИЧНО ВАЖНО: ЙЕРАРХИЯ CLUSTER-PILLAR

Трябва да разбереш разликата между Cluster и Pillar.

1.  **CLUSTER (КЛЪСТЕР):**
    *   Това е **ШИРОКА КАТЕГОРИЯ** от теми. Обзорна статия.
    *   **Примери за Cluster:** "Традиционни български закуски със сирене", "Летни супи с кисело мляко", "Десерти с млечни продукти".

2.  **PILLAR (СТЪЛБ):**
    *   Това е **ЕДНА КОНКРЕТНА, ЦЯЛА РЕЦЕПТА** или тема в тази категория.
    *   **Примери за Pillars** в клъстера "Традиционни български закуски със сирене": "Баница със сирене", "Пържени филийки с яйце и сирене", "Бухти със сирене", "Солен кекс със сирене".

**ПРИМЕРИ ЗА СТРУКТУРА:**

**✅ ДОБЪР ПРИМЕР (Какво да правиш):**
*   **CLUSTER:** "Традиционни български тестени изделия със сирене"
*   **PILLARS:**
    1.  "Класическа баница със сирене"
    2.  "Домашен тутманик"
    3.  "Мързеливи милинки със сирене"
    4.  "Гюзлеми със сирене на тиган"
    5.  "Солен кекс със сирене и кашкавал"
    6.  "Сиренки по шопски"
    7.  "Родопски пататник"
    8.  "Добруджанска баница"

**❌ ЛОШ ПРИМЕР (Какво да НЕ правиш):**
*   **CLUSTER:** "Рецепта за Баница със сирене"
*   **PILLARS:** "Тесто за баница", "Плънка за баница", "Навиване на баница", "Печене на баница"  <-- ТОВА Е ГРЕШНО!

**ТВОЯТА ЗАДАЧА Е ДА ГЕНЕРИРАШ ШИРОКИ КЛЪСТЕРИ И В ТЯХ ДА ПРЕДЛОЖИШ КОНКРЕТНИ РЕЦЕПТИ КАТО PILLARS.**

**ВАЖНО ПРАВИЛО ЗА РЕЛЕВАНТНОСТ:** Когато генерираш Cluster на тема 'кисело мляко', използвай САМО рецепти от списъка 'РЕЦЕПТИ С КИСЕЛО МЛЯКО'. Когато темата е 'сирене', използвай САМО рецепти от списъка 'РЕЦЕПТИ СЪС СИРЕНЕ'. НЕ СМЕСВАЙ РЕЦЕПТИ ОТ РАЗЛИЧНИ СПИСЪЦИ!

---

ЗАБРАНЕНИ НЕЩА:
- НЕ прави една рецепта Cluster. Cluster-ът е КАТЕГОРИЯ.
- НЕ предлагай съставки или стъпки от рецепта като Pillars. Pillar-ът е ЦЯЛА рецепта.
- НИКАКВИ емотикони (📝, ✨, 🤖, ✅).
- НИКАКВИ измислени рецепти.
- НИКАКВИ буквални преводи от английски.

КАТЕГОРИИ:
- recipes: Автентични български рецепти.
- health: Научно доказани ползи.
- culture: Истински български традиции.
- products: Реално производство.
- tradition: Автентични празници.

ФОРМАТ - САМО валиден JSON:
[
  {
    "clusterTitle": "Заглавие на ШИРОКА КАТЕГОРИЯ",
    "category": "recipes",
    "description": "Описание на категорията, НЕ на една рецепта.",
    "suggestedPillars": ["Цяла рецепта 1", "Цяла рецепта 2", "Цяла рецепта 3", "Цяла рецепта 4", "Цяла рецепта 5", "Цяла рецепта 6", "Цяла рецепта 7", "Цяла рецепта 8"],
    "keywords": "български SEO думи",
    "seoValue": "high|medium",
    "difficulty": "beginner|intermediate|advanced",
    "confidence": 0.0-1.0
  }
]

КРИТИЧНО ВАЖНО - БРОЙ PILLARS:
- Минимум 8 pillars на cluster (НЕ по-малко!).
- Оптимално 10-12 pillars.
- Всеки pillar е отделна, специфична подтема (цяла рецепта).

ПРОВЕРКА ПРЕДИ ОТГОВОР:
1. Cluster-ът категория ли е?
2. Pillar-ите цели рецепти ли са?
3. Има ли поне 8 pillar-а?
4. Има ли емотикони? → ПРЕМАХНИ ГИ.
5. Рецептите реални ли са? → ПРОВЕРИ.`
      },
      {
        role: 'user',
        content: `РЕАЛЕН АНАЛИЗ НА БАЧО ИЛИЯ:

Съществуващи Clusters:
${existingClustersList}

Съществуващи Pillars:
${existingPillarsList}

Продукти на Бачо Илия (РЕАЛНИ):
- Кисело мляко Бачо Илия (400г, 500г стъкло)
- Сирене Бачо Илия (саламурено, в различни опаковки)
- Айран Бачо Илия
- Масло Бачо Илия

Истински български рецепти с млечни продукти (САМО РЕАЛНИ от Google.bg търсения):

РЕЦЕПТИ С КИСЕЛО МЛЯКО:
- Таратор класическа рецепта (студена супа с кисело мляко, краставици, чесън, копър)
- Снежанка (салата с цедено кисело мляко, краставици, чесън и копър)
- Яйца по панагюрски (яйца с кисело мляко и чушлета)
- Кекс с кисело мляко (меки и пухкави кексчета)
- Десерт с кисело мляко
- Соденки с кисело мляко
- Пърленки с кисело мляко
- Катми с кисело мляко

РЕЦЕПТИ СЪС СИРЕНЕ:
- Баница със сирене (класическа рецепта)
- Бърза баница със сирене
- Пълнени чушки със сирене и яйце
- Сирене по шопски
- Миш маш рецепта (яйца със сирене и домати)
- Картофи със сирене на фурна
- Бухти със сирене
- Солен кекс със сирене
- Пържени филийки с яйце и сирене

ТРАДИЦИОННИ ДЕСЕРТИ:
- Млечна баница рецепта
- Сладкиш с прясно мляко
- Крем карамел рецепта
- Домашен млечен крем
- Грис халва с прясно мляко
- Палачинки с прясно мляко

РЕГИОНАЛНИ РЕЦЕПТИ:
- Качамак със сирене (родопски специалитет)
- Родопски клин рецепта
- Пататник рецепта
- Мекици със сирене и кисело мляко
- Таратор по селски

АЙРЯН РЕЦЕПТИ:
- Как се прави айрян
- Студена супа с айрян
- Солен айрян

ИЗВАРА/КАТЪК:
- Рецепти с извара
- Сладкиш с извара
- Катък рецепта
- Катък с чесън и орехи
- Извара за фитнес (високопротеинова храна)

BRAND POSITIONING - БАЧО ИЛИЯ (употреба: естествено, НЕ СПАМ):

КАКВО Е БАЧО ИЛИЯ:
- Семейна фирма с 30+ години традиция (основана 1990-те)
- Истински български производител на млечни продукти
- Традиционни рецепти, предавани от поколения
- Без консерванти и изкуствени добавки
- Качествено българско сирене и кисело мляко

КАК ДА СПОМЕНАВАШ БАЧО ИЛИЯ (естествено positioning):
✅ ПРАВИЛНО (1-2 пъти на статия MAX, ЕСТЕСТВЕНО):
- "За приготвянето на таратора използвайте качествено българско кисело мляко като Бачо Илия"
- "Истинското българско сирене без консерванти (като Бачо Илия) има автентичен вкус"
- "За автентична баница изберете българско сирене по традиционна рецепта като Бачо Илия"
- "Качественото кисело мляко като Бачо Илия е ключът към перфектния таратор"

❌ ГРЕШНО (СПАМ или прекалено агресивно):
- "Бачо Илия е най-доброто кисело мляко" (твърде директно, изглежда като реклама)
- Споменаване на Бачо Илия 5+ пъти в една статия (СПАМ)
- "Само Бачо Илия прави истинско сирене" (твърде агресивно)
- Споменаване на КОНКУРЕНТИ (НЕ споменавай Маджаров, ЛБ Булгарикум, Верея и др.)

АЛТЕРНАТИВИ (вместо конкуренти):
- "качествено българско кисело мляко" (общо)
- "автентични български млечни продукти" (общо)
- "проверени производители" (общо)
- "традиционно българско сирене" (общо)

РЕАЛНИ SEARCH TERMS ЗА SEO (използвай в cluster заглавия):
- "домашно кисело мляко", "закваска за кисело мляко"
- "истинско българско сирене", "качествено българско сирене"
- "бабини рецепти със сирене", "традиционна рецепта"
- "родопско кисело мляко", "фермерски млечни продукти"
- "извара за фитнес", "катък рецепта"
- "таратор класическа рецепта", "баница със сирене"

ЗАДАЧА: Предложи 8-10 НОВИ, РЕАЛНИ cluster теми за българския пазар.

СТРОГИ ИЗИСКВАНИЯ:
1. БЕЗ емотикони (забранени са 📝, ✨, 🤖, и т.н.)
2. САМО реални български рецепти и традиции от горния списък
3. САМО естествен български език (не буквален превод)
4. САМО съществуващи продукти на Бачо Илия
5. Всеки pillar трябва да е РЕАЛНА тема от горните рецепти
6. Използвай реални search terms за SEO заглавия

Върни САМО JSON масив.`
      }
    ];

    const aiResponse = await callOpenRouter(analysisPrompt, 0.8, 4000);

    console.log('=== AI CLUSTER SUGGESTIONS ===');
    console.log(aiResponse);
    console.log('===============================');

    // Clean AI response
    let cleanedResponse = aiResponse.trim();
    if (cleanedResponse.startsWith('```json')) {
      cleanedResponse = cleanedResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanedResponse.startsWith('```')) {
      cleanedResponse = cleanedResponse.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    let suggestions;
    try {
      suggestions = JSON.parse(cleanedResponse);
    } catch (e) {
      console.error('❌ JSON Parse Error:', e);
      console.error('AI Response was:', aiResponse);
      console.error('Cleaned response was:', cleanedResponse);

      // Fallback РЕАЛНИ suggestions for Bacho Iliya
      suggestions = [
        {
          clusterTitle: 'Традиционни български закуски със сирене',
          category: 'recipes',
          description: 'Категория, посветена на класически български закуски, в които главен герой е истинското българско сирене. От баница до пържени филийки.',
          suggestedPillars: [
            'Класическа баница със сирене и яйца',
            'Бързи пържени филийки с яйце и сирене',
            'Домашни бухти със сирене',
            'Солен кекс със сирене и кашкавал',
            'Миш-маш с домати, чушки и сирене',
            'Сирене по шопски на фурна',
            'Пълнени чушки със сирене и яйце',
            'Картофи на фурна със сирене',
            'Тутманик със сирене',
            'Гюзлеми със сирене на тиган'
          ],
          keywords: 'закуска със сирене, баница, пържени филийки, сирене по шопски, български рецепти',
          seoValue: 'high',
          difficulty: 'beginner',
          confidence: 0.9
        },
        {
          clusterTitle: 'Здравословни ползи и приложения на киселото мляко',
          category: 'health',
          description: 'Научно доказани ползи от консумацията на кисело мляко и практическото му приложение за поддържане на добро здраве.',
          suggestedPillars: [
            'Lactobacillus bulgaricus: Уникалната българска бактерия',
            'Как киселото мляко подпомага храносмилателната система',
            'Ролята на пробиотиците в киселото мляко за имунитета',
            'Калций и протеин в киселото мляко за здрави кости и мускули',
            'Приложение на киселото мляко в детското хранене',
            'Може ли кисело мляко да се яде при лактозна непоносимост?',
            'Кисело мляко за здрава кожа и коса: Маски и домашна козметика',
            'Нискомаслено срещу пълномаслено кисело мляко: Кое да изберем?',
            'Домашно кисело мляко: Как да си го приготвим',
            'Кулинарни приложения на киселото мляко извън таратора'
          ],
          keywords: 'кисело мляко ползи, пробиотици, лактобацили, здраве, храносмилане',
          seoValue: 'high',
          difficulty: 'intermediate',
          confidence: 0.88
        }
      ];
    }

    // Validate suggestions is array
    if (!Array.isArray(suggestions)) {
      suggestions = [suggestions];
    }

    // --- OPTIMIZATION: In-memory duplicate filtering ---
    console.log('[AI Suggestions] Filtering duplicates from suggestions...');
    const filteredSuggestions = [];
    const duplicateWarnings = [];

    for (const suggestion of suggestions) {
      const { clusterTitle } = suggestion;

      if (!clusterTitle) {
        console.warn('[AI Suggestions] ⚠️ Skipping suggestion with no title');
        continue;
      }

      // 1. Check for exact title match (case-insensitive)
      if (existingTitlesSet.has(clusterTitle.toLowerCase())) {
        duplicateWarnings.push({
          suggestedTitle: clusterTitle,
          reason: 'Идентично заглавие',
          existingPosts: [clusterTitle] // Simplified warning
        });
        console.log(`[AI Suggestions] ⚠️ Skipping duplicate: "${clusterTitle}"`);
        continue;
      }

      // 2. Check for similar titles (simplified - check if 2+ keywords match)
      const normalizedSuggestedTitle = clusterTitle
        .toLowerCase()
        .replace(/[:\-–—,\.!?]/g, '')
        .trim();
      const suggestedKeywords = normalizedSuggestedTitle.split(/\s+/).filter((w: string) => w.length > 3);

      let isSimilar = false;
      if (suggestedKeywords.length > 0) {
        for (const existingTitle of existingTitles) {
          const postTitleNormalized = existingTitle
            .toLowerCase()
            .replace(/[:\-–—,\.!?]/g, '')
            .trim();

          const matchingKeywords = suggestedKeywords.filter((kw: string) =>
            postTitleNormalized.includes(kw)
          );

          if (matchingKeywords.length >= Math.min(2, suggestedKeywords.length)) {
            isSimilar = true;
            duplicateWarnings.push({
              suggestedTitle: clusterTitle,
              reason: 'Подобно заглавие',
              existingPosts: [existingTitle]
            });
            console.log(`[AI Suggestions] ⚠️ Skipping similar: "${clusterTitle}" (similar to "${existingTitle}")`);
            break; // Found a similar post, no need to check further
          }
        }
      }

      if (isSimilar) {
        continue; // Skip this suggestion
      }

      // Not a duplicate, include it
      filteredSuggestions.push(suggestion);
    }

    console.log(`[AI Suggestions] ✅ Filtered: ${suggestions.length} → ${filteredSuggestions.length} (removed ${suggestions.length - filteredSuggestions.length} duplicates)`);

    return NextResponse.json({
      success: true,
      suggestions: filteredSuggestions,
      existingClusters: existingTitles.length, // Use count from the single fetch
      existingPillars: existingPillarsList.length, // This was not the main focus, but can be improved too
      duplicatesRemoved: suggestions.length - filteredSuggestions.length,
      duplicateWarnings: duplicateWarnings.length > 0 ? duplicateWarnings : undefined
    });

  } catch (error: any) {
    console.error('[Suggest Clusters] Unexpected error:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      cause: error.cause
    });

    // Return detailed error in development, generic in production
    return NextResponse.json(
      {
        error: error.message || 'Failed to suggest clusters',
        type: error.name || 'UnknownError',
        ...(process.env.NODE_ENV === 'development' && {
          stack: error.stack,
          details: 'Check server logs for more information'
        })
      },
      { status: 500 }
    );
  }
}
