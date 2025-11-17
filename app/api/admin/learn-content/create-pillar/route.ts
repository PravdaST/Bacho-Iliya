import { supabaseAdmin } from '@/lib/supabase';
import { NextResponse } from 'next/server';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = 'google/gemini-2.5-flash-lite';

// Slugify function
function slugify(text: string): string {
  const transliterationMap: { [key: string]: string } = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ж': 'zh', 'з': 'z',
    'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p',
    'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch',
    'ш': 'sh', 'щ': 'sht', 'ъ': 'a', 'ь': 'y', 'ю': 'yu', 'я': 'ya',
    'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ж': 'Zh', 'З': 'Z',
    'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O', 'П': 'P',
    'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'Ts', 'Ч': 'Ch',
    'Ш': 'Sh', 'Щ': 'Sht', 'Ъ': 'A', 'Ь': 'Y', 'Ю': 'Yu', 'Я': 'Ya'
  };

  return text
    .split('')
    .map(char => transliterationMap[char] || char)
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function callOpenRouter(messages: any[], temperature = 0.7, maxTokens = 20000) {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://www.bacho-iliya.eu',
      'X-Title': 'Bacho Iliya Learn Content Generator'
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      temperature,
      max_tokens: maxTokens,
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenRouter error ${response.status}: ${error}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

async function generateImage(prompt: string, slug: string): Promise<string | null> {
  try {
    console.log('[Image] Generating with Gemini 2.5 Flash Image...');

    const imageResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://www.bacho-iliya.eu',
        'X-Title': 'Bacho Iliya Image Generator'
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-image',
        messages: [{
          role: 'user',
          content: prompt
        }],
        temperature: 0.8,
        max_tokens: 1000,
        image_config: {
          aspect_ratio: '16:9'
        }
      })
    });

    if (!imageResponse.ok) {
      console.error('[Image] Generation failed');
      return null;
    }

    const data = await imageResponse.json();
    console.log('[Image] Full response:', JSON.stringify(data, null, 2).substring(0, 500));

    // According to OpenRouter docs, images are in message.images array
    const message = data.choices[0]?.message;
    const images = message?.images;

    if (!images || images.length === 0) {
      console.error('[Image] No images in response');
      return null;
    }

    // Extract base64 data URL from first image
    const base64DataUrl = images[0]?.image_url?.url;

    if (!base64DataUrl || !base64DataUrl.startsWith('data:image')) {
      console.error('[Image] Invalid image format:', base64DataUrl?.substring(0, 100));
      return null;
    }

    console.log('[Image] Received base64 image, uploading to Supabase Storage...');

    // Extract base64 data (remove "data:image/png;base64," prefix)
    const base64Data = base64DataUrl.replace(/^data:image\/\w+;base64,/, '');
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // Upload to Supabase Storage
    const fileName = `learn-guides/${slug}-${Date.now()}.png`;
    const supabase = supabaseAdmin;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload(fileName, imageBuffer, {
        contentType: 'image/png',
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('[Image] Upload error:', uploadError);
      return null;
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('blog-images')
      .getPublicUrl(fileName);

    const publicUrl = publicUrlData.publicUrl;
    console.log('[Image] Uploaded successfully:', publicUrl);

    return publicUrl;

  } catch (error) {
    console.error('[Image] Error:', error);
    return null;
  }
}

export async function POST(request: Request) {
  const supabase = supabaseAdmin;

  try {
    const {
      title: pillarTitle,
      category,
      keywords,
      clusterSlug: parentClusterSlug,
      relatedPillars = []
    } = await request.json();

    // Generate slug
    const slug = slugify(pillarTitle);

    console.log('[Pillar] Checking for exact duplicates (same slug)...');

    // Simple duplicate check - only exact slug match
    const { data: existingPost } = await supabase
      .from('blog_posts')
      .select('id, title, slug')
      .eq('slug', slug)
      .eq('category', 'learn-guide')
      .single();

    if (existingPost) {
      const exactTitleMatch = [existingPost];
      const similarTitles: any[] = [];
      const exactSlugMatch = [existingPost];

      // Prepare error message
      let errorMessage = '⚠️ Открити дублирания:\n\n';

      if (exactTitleMatch.length > 0) {
        errorMessage += '❌ ИДЕНТИЧНО ЗАГЛАВИЕ:\n';
        exactTitleMatch.forEach((post: any) => {
          errorMessage += `- "${post.title}" (${post.guide_type})\n`;
        });
      }

      if (exactSlugMatch.length > 0) {
        errorMessage += '\n❌ ИДЕНТИЧЕН SLUG:\n';
        exactSlugMatch.forEach((post: any) => {
          errorMessage += `- "${post.title}" (/${post.slug})\n`;
        });
      }

      if (similarTitles.length > 0) {
        errorMessage += '\n⚠️ ПОДОБНИ ЗАГЛАВИЯ:\n';
        similarTitles.forEach((post: any) => {
          errorMessage += `- "${post.title}" (${post.guide_type})\n`;
        });
      }

      return NextResponse.json(
        {
          error: errorMessage,
          duplicate: true,
          duplicates: duplicateCheck.duplicates
        },
        { status: 409 }
      );
    }

    console.log('[Pillar] No duplicates found ✅');

    // Check if parent cluster exists
    let clusterExists = false;
    let clusterData: { title: string; slug: string } | null = null;
    let clusterContext = '';

    if (parentClusterSlug) {
      const { data: cluster } = await supabase
        .from('blog_posts')
        .select('title, slug, content')
        .eq('slug', parentClusterSlug)
        .eq('guide_type', 'cluster')
        .eq('is_published', true)
        .single();

      if (cluster) {
        clusterExists = true;
        clusterData = { title: cluster.title, slug: cluster.slug };
        clusterContext = `
Cluster статия: "${cluster.title}"
Този pillar е част от горната cluster тема.`;
      }
    }

    // Get related pillars for internal linking
    let relatedPillarsData: { title: string; slug: string }[] = [];

    if (relatedPillars && relatedPillars.length > 0) {
      // Fetch titles for provided slugs
      const { data: pillarsFromDb } = await supabase
        .from('blog_posts')
        .select('title, slug')
        .in('slug', relatedPillars)
        .eq('guide_type', 'pillar');

      relatedPillarsData = pillarsFromDb || [];
    }

    const relatedPillarsList = relatedPillarsData
      .map(p => `"${p.title}"`)
      .join(', ') || 'няма';

    // Step 1: Generate pillar content
    const contentPrompt = [
      {
        role: 'system',
        content: `Ти си български етнолог, кулинарен историк и експерт по традиционни млечни продукти. Работиш за Бачо Илия - истински български млечен бранд с 30+ години традиция.

КРИТИЧНО ВАЖНО - БЪЛГАРСКИ ЕЗИК:
- Пиши на ЕСТЕСТВЕН български език (НЕ буквални преводи!)
- Граматически перфектен български
- Експертен, но топъл разговорен тон
- Като че говориш с приятел за традиционната ни кухня

❌ АБСОЛЮТНО ЗАБРАНЕНО:
- НИКАКВИ емотикони в текста или заглавията (📝, ✨, 🥛, 🧀, 🍲, 🤖, ✅, 🔥, 💪, 🎯)
- НИКАКВИ измислени рецепти (Майонеза с кисело мляко, Крем карамел с кисело мляко)
- НИКАКВИ несъществуващи комбинации (Шопска салата с кисело мляко)
- НИКАКВИ буквални преводи от английски (Пърженки = French Toast, НЕ е българско!)
- НЕ използвай думи с -ing форми или английски термини
- H1 тагове
- <article>, <header>, <footer> тагове
- Complex grids, cards, sections

🔵 РЕАЛНИ БЪЛГАРСКИ РЕЦЕПТИ И ТЕРМИНИ (използвай САМО тези):

РЕЦЕПТИ С КИСЕЛО МЛЯКО:
таратор класическа рецепта, снежанка рецепта, яйца по панагюрски, кекс с кисело мляко, десерт с кисело мляко, соденки с кисело мляко, катми с кисело мляко

РЕЦЕПТИ СЪС СИРЕНЕ:
баница със сирене, бърза баница със сирене, пълнени чушки със сирене и яйце, сирене по шопски, миш маш рецепта, картофи със сирене на фурна, бухти със сирене, солен кекс със сирене, пържени филийки с яйце и сирене

ДЕСЕРТИ:
млечна баница рецепта, сладкиш с прясно мляко, крем карамел рецепта, домашен млечен крем, грис халва с прясно мляко, палачинки с прясно мляко

АЙРЯН:
как се прави айрян, студена супа с айрян, рецепта за айрян, солен айрян

ИЗВАРА/КАТЪК:
рецепти с извара, сладкиш с извара, как се прави катък, рецепта за катък, катък с чесън и орехи, извара протеин, извара за фитнес

РЕГИОНАЛНИ:
качамак със сирене, таратор по селски, родопски клин рецепта, пататник рецепта, мекици със сирене и кисело мляко, родопско кисело мляко, родопско сирене

ЗДРАВОСЛОВНИ ТЕРМИНИ:
пробиотици, кисело мляко пробиотици, млечнокисели бактерии, лактобацили, здравословно храносмилане, без консерванти, протеини, храни богати на калций

БРАНД ТЕРМИНИ:
истинско българско кисело мляко, традиционни български млечни продукти, натурално кисело мляко, българско сирене без консерванти, качествено българско сирене, фермерски млечни продукти, занаятчийско сирене, кисело мляко по БДС, сирене по БДС, бабини рецепти със сирене, домашно кисело мляко рецепта

ПРОДУКТИ НА БАЧО ИЛИЯ (РЕАЛНИ):
- Кисело мляко Бачо Илия (400г, 500г стъкло)
- Сирене Бачо Илия (саламурено)
- Айран Бачо Илия
- Масло Бачо Илия

КРИТИЧНО ВАЖНО - ПРОСТ HTML ФОРМАТ:

✅ РАЗРЕШЕНО:
- <p> параграфи
- <h2> и <h3> заглавия (БЕЗ емотикони!)
- <ul>, <li> списъци
- <a href="/learn/SLUG"> internal links
- <strong> за emphasis
- <div class="tldr-section"> за резюмета
- <table> таблици с responsive класове

СТРУКТУРА НА PILLAR СТАТИЯ (5,500 думи):

1. TLDR секция в началото:
   <div class="tldr-section">
     <h3>Ключови моменти</h3>
     <p>Обобщение в 3-4 изречения...</p>
   </div>

2. Въведение (400 думи) - Защо е важна тази тема
3. Основни понятия (600 думи) - Дефиниции и терминология
4. Детайлен анализ (1500 думи) - Задълбочено разглеждане
5. Практически примери (1000 думи) - Конкретни случаи
6. Таблици и данни (800 думи) - Структурирана информация
7. Често задавани въпроси (600 думи) - 5-7 популярни въпроса
8. Заключение (600 думи) - Резюме и препоръки

SMART INTERNAL LINKING:

${clusterExists && clusterData ? `CLUSTER СЪЩЕСТВУВА (линкни обратно):
   "${clusterData.title}" → <a href="/learn/${clusterData.slug}">${clusterData.title}</a>
   Добави линк в началото И в заключението.` : `CLUSTER НЕ СЪЩЕСТВУВА ОЩЕ:
   Споменай общата тема без линк.`}

${relatedPillarsData.length > 0 ? `RELATED PILLARS (линкни към тях):
${relatedPillarsData.map((p, i) => `   ${i + 1}. "${p.title}" → <a href="/learn/${p.slug}">${p.title}</a>`).join('\n')}
   Добави 2-3 линка естествено в текста.` : `НЯМА други pillar теми още.`}

ПРАВИЛО: САМО линкове към СЪЩЕСТВУВАЩИ guides!

ТАБЛИЦИ (responsive):
<div class="overflow-x-auto my-6">
  <table class="min-w-full border-collapse border border-zinc-300">
    <thead>
      <tr class="bg-zinc-100">
        <th class="border border-zinc-300 px-4 py-2 text-left">Колона</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="border border-zinc-300 px-4 py-2">Данни</td>
      </tr>
    </tbody>
  </table>
</div>

🔗 CROSS-CONTENT LINKING (ВАЖНО - добавяй естествени линкове):

ПРОДУКТИ БАЧО ИЛИЯ (добави линкове където е релевантно):
- Бяло сирене → <a href="/products/byalo-sirene">Бяло сирене Бачо Илия</a>
- Кашкавал → <a href="/products/kashkaval">Кашкавал Бачо Илия</a>
- Кисело мляко (общо) → <a href="/products/kiselo-mlyako-3-6">Кисело мляко Бачо Илия</a>
- Кисело мляко 2% → <a href="/products/kiselo-mlyako-2">Нискомаслено кисело мляко 2%</a>
- Кисело мляко 3.6% → <a href="/products/kiselo-mlyako-3-6">Класическо кисело мляко 3.6%</a>
- Кисело мляко 4.5% → <a href="/products/kiselo-mlyako-4-5">Пълномаслено кисело мляко 4.5%</a>
- Айрян → <a href="/products/ayran">Айрян Бачо Илия</a>
- Протеиново кисело мляко → <a href="/products/protein-kiselo-mlyako">Протеиново кисело мляко</a>

РЕЦЕПТИ (добави линкове където споменаваш):
- Баница → <a href="/recipes/traditional-banitsa">Традиционна баница със сирене</a>
- Млечна баница → <a href="/recipes/mlechna-banica">Млечна баница</a>
- Шопска салата → <a href="/recipes/shopska-salad-classic">Шопска салата</a>
- Таратор/Снежанка → <a href="/recipes/snezhanka-tarator-combo">Таратор и Снежанка</a>
- Панирано кашкавал → <a href="/recipes/kashkaval-pane">Панирано кашкавал</a>
- Миш-маш → <a href="/recipes/mish-mash-traditional">Миш-маш</a>
- Мусака → <a href="/recipes/musaka-classic">Българска мусака</a>

МАГАЗИНИ:
- Къде да купиш/Намери в магазина → <a href="/where-to-buy">Къде да купиш Бачо Илия</a>

ПРАВИЛА ЗА LINKING:
- Добави 2-4 product линка естествено в текста
- Добави 1-2 recipe линка където е релевантно
- НЕ спамвай - линковете трябва да са естествени и полезни
- Използвай различни anchor текстове (не винаги "Бачо Илия")

SEO ОПТИМИЗАЦИЯ:
- Използвай "${pillarTitle}" и keywords естествено
- H2/H3 заглавия с keywords
- Първи параграф с main topic

ТЕМАТИКА:
- Фокус върху млечни продукти
- Българска традиционна кухня
- Здравословни ползи
- Традиции и култура
- Практически съвети
- Споменай "Бачо Илия" като пример където е уместно

ВАЖНО:
- 5,500 думи (НЕ по-малко!)
- Задълбочен, експертен тон
- БЕЗ емотикони НАВСЯКЪДЕ
- Чист HTML код
- Естествени internal links
- САМО реални български рецепти и традиции

ФИНАЛНА ПРОВЕРКА ПРЕДИ ГЕНЕРИРАНЕ:
1. Има ли КАКВИТО И ДА Е емотикони? → ПРЕМАХНИ ГИ ВЕДНАГА
2. Споменати ли са измислени рецепти? → ЗАМЕНИ С РЕАЛНИ
3. Звучи ли като превод от английски? → ПРЕНАПИШИ НА ЕСТЕСТВЕН БЪЛГАРСКИ
4. Има ли несъществуващи комбинации? → ЗАМЕНИ С АВТЕНТИЧНИ`
      },
      {
        role: 'user',
        content: `Създай PILLAR guide за тема: "${pillarTitle}"
Категория: ${category}
Keywords: ${keywords || 'няма'}
${clusterContext}

Related pillars за линкване: ${relatedPillarsList}

Генерирай пълно HTML съдържание (5,500 думи) с internal links.`
      }
    ];

    let content = await callOpenRouter(contentPrompt, 0.7, 20000);

    // Clean up markdown code fences
    content = content.trim();
    if (content.startsWith('```html')) {
      content = content.replace(/^```html\s*/, '').replace(/\s*```$/, '');
    } else if (content.startsWith('```')) {
      content = content.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    // Step 2: Generate metadata
    const metaPrompt = [
      {
        role: 'system',
        content: `Генерирай SEO metadata за статия за млечни продукти. Върни само валиден JSON:
{
  "meta_title": "SEO заглавие (50-60 символа)",
  "meta_description": "SEO описание (150-160 символа)",
  "slug": "url-friendly-slug-in-latin-only"
}

КРИТИЧНО ВАЖНО:
- slug трябва да е САМО на латиница!
- БЕЗ емотикони в meta_title или meta_description
- Естествен български език (не буквални преводи)
- САМО реални теми (не измислени рецепти)

Пример: "Таратор рецепта" → "tarator-recepta"`
      },
      {
        role: 'user',
        content: `Заглавие: ${pillarTitle}\nCategory: ${category}`
      }
    ];

    const metaResponse = await callOpenRouter(metaPrompt, 0.5, 500);
    let metadata;
    try {
      const cleanMeta = metaResponse.trim()
        .replace(/^```json\s*/, '')
        .replace(/\s*```$/, '');
      metadata = JSON.parse(cleanMeta);

      // Ensure slug is Latin
      if (/[\u0400-\u04FF]/.test(metadata.slug)) {
        metadata.slug = slugify(pillarTitle);
      }
    } catch (e) {
      metadata = {
        meta_title: pillarTitle,
        meta_description: pillarTitle,
        slug: slugify(pillarTitle)
      };
    }

    // Step 3: Extract excerpt from TLDR
    let excerpt = '';
    try {
      const tldrMatch = content.match(/<div class="tldr-section">[\s\S]*?<p>(.*?)<\/p>[\s\S]*?<\/div>/);
      if (tldrMatch) {
        excerpt = tldrMatch[1]
          .replace(/<[^>]*>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim()
          .substring(0, 200);
      }
    } catch (e) {
      console.error('[Pillar] Failed to extract excerpt:', e);
    }

    // Step 4: Generate featured image
    let featuredImageUrl: string | null = null;
    try {
      console.log('[Pillar] Generating featured image...');
      const imagePrompt = `Create a photorealistic, high-quality food photography image for in-depth article: "${pillarTitle}".

STYLE: Professional food photography, studio lighting, sharp focus, shallow depth of field, close-up details
SUBJECT: Specific Bulgarian dairy product or traditional dish related to the topic, beautifully presented
DETAILS: Rustic wooden surface, traditional Bulgarian elements (clay bowl, copper pot, embroidered cloth), natural lighting
MOOD: Educational yet appetizing, authentic, detailed, inviting
QUALITY: 8K resolution, professional food photography, magazine quality, realistic textures and details

Category context: ${category}

IMPORTANT: NO text, NO logos, NO letters visible in the image. Pure photorealistic food photography only.`;

      featuredImageUrl = await generateImage(imagePrompt, metadata.slug);

      if (featuredImageUrl) {
        console.log('[Pillar] Featured image generated');
      }
    } catch (imageError) {
      console.error('[Pillar] Failed to generate featured image:', imageError);
    }

    // Step 5: Save to database
    const { data: savedPost, error: saveError } = await supabase
      .from('blog_posts')
      .insert({
        title: pillarTitle,
        slug: metadata.slug,
        content,
        excerpt: excerpt || metadata.meta_description,
        category: 'learn-guide',
        guide_type: 'pillar',
        guide_category: category,
        parent_cluster_slug: parentClusterSlug || null,
        meta_title: metadata.meta_title,
        meta_description: metadata.meta_description,
        featured_image_url: featuredImageUrl,
        is_published: false,
      })
      .select()
      .single();

    if (saveError) {
      console.error('[Pillar] Save error:', saveError);
      throw new Error(`Failed to save pillar: ${saveError.message}`);
    }

    console.log('[Pillar] ✅ Saved successfully:', savedPost.slug);

    return NextResponse.json({
      success: true,
      data: {
        id: savedPost.id,
        title: savedPost.title,
        slug: savedPost.slug,
        featuredImageUrl: savedPost.featured_image_url
      }
    });

  } catch (error: any) {
    console.error('Pillar generation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate pillar' },
      { status: 500 }
    );
  }
}
