-- Recipe 4: kashkaval-pane
WITH inserted AS (
  INSERT INTO recipes (slug, title, title_bg, description, description_bg, image, prep_time, cook_time, servings, difficulty, bacho_products, story, story_bg)
  VALUES (
    'kashkaval-pane',
    'Fried Kashkaval (Pane) - Bacho Ilia Style',
    'Паниран кашкавал по рецепта на „Бачо Илия"',
    'Crispy on the outside, melty on the inside - fried Bacho Ilia kashkaval that brings back childhood memories with every bite.',
    'Хрупкав отвън, топящ се отвътре – паниран кашкавал „Бачо Илия", който връща детските спомени с всяка хапка.',
    '/recipes/kashkaval-pane.webp',
    '15 минути',
    '10 минути',
    4,
    'Лесна',
    '["Кашкавал Бачо Илия"]'::jsonb,
    'Fried kashkaval is every Bulgarian child''s favorite treat. What makes this recipe special is using Bacho Ilia kashkaval - made traditionally for over 30 years without preservatives, just like our grandmothers made it. The authentic taste of Bacho Ilia yellow cheese, from happy cows, creates that unforgettable combination of crispy exterior and creamy, melty interior that takes you straight back to childhood.',
    'Панираният кашкавал е любимото изкушение на всяко българско дете. Това, което прави тази рецепта специална, е използването на кашкавал „Бачо Илия" – произведен традиционно повече от 30 години без консерванти, точно както са го правили нашите баби. Автентичният вкус на кашкавала „Бачо Илия", направен с мляко от щастливи крави, създава онази незабравима комбинация от хрупкава коричка и кремообразна, топяща се вътрешност, която ви връща направо в детството.'
  )
  RETURNING id
),
ings AS (
  INSERT INTO recipe_ingredients (recipe_id, item, item_bg, display_order)
  SELECT id, unnest(ARRAY['400g Bacho Ilia kashkaval (yellow cheese)', '2 eggs', '100g flour', '150g breadcrumbs', 'Oil for frying', 'Black pepper to taste', 'Lemon wedges for serving']), unnest(ARRAY['400г кашкавал „Бачо Илия"', '2 яйца', '100г брашно', '150г галета', 'Олио за пържене', 'Черен пипер на вкус', 'Резенчета лимон за сервиране']), generate_series(1, 7)
  FROM inserted
  RETURNING 1
),
insts AS (
  INSERT INTO recipe_instructions (recipe_id, step, step_bg, step_number)
  SELECT id, unnest(ARRAY['Cut Bacho Ilia kashkaval into thick slices (about 1.5cm).', 'Prepare three plates: one with flour, one with beaten eggs, one with breadcrumbs.', 'Coat each Bacho Ilia kashkaval slice first in flour, then egg, then breadcrumbs.', 'Heat oil in a deep pan. Fry kashkaval slices until golden brown on both sides (about 2-3 minutes per side).', 'Drain on paper towels. Serve hot with lemon wedges.']), unnest(ARRAY['Нарежете кашкавала „Бачо Илия" на дебели филийки (около 1,5 см).', 'Подгответе три чинии: една с брашно, една с разбити яйца и една с галета.', 'Оваляйте всяка филийка кашкавал „Бачо Илия" първо в брашно, после в яйце и накрая в галета.', 'Загрейте олио в дълбок тиган. Изпържете филийките кашкавал до златистокафяво от двете страни (за около 2-3 минути от всяка страна).', 'Отцедете върху кухненска хартия. Сервирайте горещ с резенчета лимон.']), generate_series(1, 5)
  FROM inserted
  RETURNING 1
)
INSERT INTO recipe_tips (recipe_id, tip, tip_bg, display_order)
SELECT id, unnest(ARRAY['Only Bacho Ilia kashkaval melts perfectly while keeping its shape - that''s the magic of authentic Bulgarian cheese', 'Don''t make slices too thin - Bacho Ilia kashkaval needs thickness to create that perfect melty center', 'Serve immediately while the Bacho Ilia kashkaval is still hot and melting']), unnest(ARRAY['Само кашкавалът „Бачо Илия" се топи перфектно, като запазва формата си – това е магията на автентичния български кашкавал.', 'Не правете филийките твърде тънки – кашкавалът „Бачо Илия" се нуждае от дебелина, за да се създаде перфектната топяща се среда.', 'Сервирайте веднага, докато кашкавалът „Бачо Илия" е още горещ и топящ се.']), generate_series(1, 3)
FROM inserted;

-- Recipe 5: mish-mash-traditional
WITH inserted AS (
  INSERT INTO recipes (slug, title, title_bg, description, description_bg, image, prep_time, cook_time, servings, difficulty, bacho_products, story, story_bg)
  VALUES (
    'mish-mash-traditional',
    'Traditional Mish-Mash with Bacho Ilia Cheese',
    'Традиционен миш-маш със сирене „Бачо Илия"',
    'The ultimate Bulgarian scrambled eggs with peppers, tomatoes, and generous chunks of melted Bacho Ilia white cheese - comfort food at its finest.',
    'Най-добрите български бъркани яйца с чушки, домати и щедри парчета разтопено бяло сирене „Бачо Илия" – храна за душата в най-добрия ѝ вид.',
    '/recipes/mish-mash.webp',
    '10 минути',
    '15 минути',
    2,
    'Лесна',
    '["Бяло сирене Бачо Илия"]'::jsonb,
    'Mish-Mash is the soul of Bulgarian home cooking - simple, hearty, and incredibly satisfying. The secret ingredient that elevates this dish from good to unforgettable is Bacho Ilia white cheese. Made without chemicals or preservatives, following recipes perfected over 30+ years, Bacho Ilia cheese brings the authentic taste that our grandmothers knew. Every chunk of melted Bacho Ilia white cheese in this mish-mash is a taste of Bulgarian tradition, made from happy cows and filled with childhood memories.',
    'Миш-машът е душата на българската домашна кухня – просто, засищащо и невероятно вкусно ястие. Тайната съставка, която го превръща от добро в незабравимо, е бялото сирене „Бачо Илия". Произведено без химикали и консерванти, по рецепти, усъвършенствани в продължение на повече от 30 години, сиренето „Бачо Илия" носи автентичния вкус, който нашите баби познаваха. Всяко парче разтопено бяло сирене „Бачо Илия" в този миш-маш е вкус на българска традиция, направен с мляко от щастливи крави и пълен с детски спомени.'
  )
  RETURNING id
),
ings AS (
  INSERT INTO recipe_ingredients (recipe_id, item, item_bg, display_order)
  SELECT id, unnest(ARRAY['4 eggs', '200g Bacho Ilia white cheese (cubed)', '2 large tomatoes (diced)', '2 bell peppers (diced)', '1 onion (chopped)', '3 tbsp sunflower oil', 'Fresh parsley', 'Salt and pepper to taste']), unnest(ARRAY['4 яйца', '200г бяло сирене „Бачо Илия" (на кубчета)', '2 големи домата (нарязани на кубчета)', '2 чушки (нарязани на кубчета)', '1 глава лук (нарязан)', '3 с.л. слънчогледово олио', 'Прясна магданоз', 'Сол и черен пипер на вкус']), generate_series(1, 8)
  FROM inserted
  RETURNING 1
),
insts AS (
  INSERT INTO recipe_instructions (recipe_id, step, step_bg, step_number)
  SELECT id, unnest(ARRAY['Heat oil in a large pan. Sauté chopped onion until soft.', 'Add diced bell peppers and cook for 5 minutes.', 'Add diced tomatoes, season with salt and pepper. Cook until tomatoes soften.', 'Add cubed Bacho Ilia white cheese, stir gently.', 'Beat eggs and pour over the vegetables and Bacho Ilia cheese. Stir until eggs are cooked but still creamy.', 'Garnish with fresh parsley and serve hot.']), unnest(ARRAY['Загрейте олио в голям тиган. Задушете нарязания лук, докато омекне.', 'Добавете нарязаните чушки и гответе 5 минути.', 'Добавете нарязаните домати, подправете със сол и пипер. Гответе, докато доматите омекнат.', 'Добавете нарязаното на кубчета бяло сирене „Бачо Илия" и разбъркайте внимателно.', 'Разбийте яйцата и ги изсипете върху зеленчуците и сиренето. Разбърквайте, докато яйцата се сготвят, но останат сочни.', 'Украсете с пресен магданоз и сервирайте ястието горещо.']), generate_series(1, 6)
  FROM inserted
  RETURNING 1
)
INSERT INTO recipe_tips (recipe_id, tip, tip_bg, display_order)
SELECT id, unnest(ARRAY['Bacho Ilia white cheese is essential - it melts perfectly into the eggs creating that authentic Bulgarian taste', 'Don''t overcook the eggs - keep them slightly creamy for the best texture with Bacho Ilia cheese', 'Use generous chunks of Bacho Ilia cheese - you want every bite to have that melted cheese goodness']), unnest(ARRAY['Бялото сирене „Бачо Илия" е задължително – то се топи перфектно в яйцата, създавайки онзи автентичен български вкус.', 'Не пресготвяйте яйцата – запазете ги леко кремообразни за най-добра текстура.', 'Използвайте големи парчета сирене „Бачо Илия" – така всяка хапка ще има от разтопеното сирене.']), generate_series(1, 3)
FROM inserted;

-- Recipe 6: palneni-chushki
WITH inserted AS (
  INSERT INTO recipes (slug, title, title_bg, description, description_bg, image, prep_time, cook_time, servings, difficulty, bacho_products, story, story_bg)
  VALUES (
    'palneni-chushki',
    'Traditional Bulgarian Stuffed Peppers',
    'Традиционни български пълнени чушки',
    'Tender bell peppers stuffed with seasoned meat and rice, slowly cooked in a rich tomato sauce. Served with a generous dollop of Bacho Ilia yogurt - pure comfort food from grandmother''s kitchen.',
    'Крехки чушки, пълнени с подправена кайма и ориз, бавно задушени в богат доматен сос. Сервират се с щедра лъжица кисело мляко „Бачо Илия" – уютна храна, досущ като от бабината кухня.',
    '/recipes/palneni_chushki_recepta.jpg',
    '30 минути',
    '40 минути',
    6,
    'Средна',
    '["Кисело мляко Бачо Илия"]'::jsonb,
    'Пълнените чушки са класика от бабината трапеза – ястие, което топли сърцето и душата. Всяка българска баба го прави по свой начин, но всички имат едно общо нещо – сервират го с автентично българско кисело мляко. Киселото мляко „Бачо Илия", направено с мляко от щастливи крави, без химикали и консерванти, е перфектното допълнение. Всяка лъжица студено кисело мляко върху горещите, задушени чушки създава онзи незабравим контраст, който ви връща направо в детството на бабината маса.',
    'Пълнените чушки са класика от бабината трапеза – ястие, което топли сърцето и душата. Всяка българска баба го прави по свой начин, но всички имат едно общо нещо – сервират го с автентично българско кисело мляко. Киселото мляко „Бачо Илия", направено с мляко от щастливи крави, без химикали и консерванти, е перфектното допълнение. Всяка лъжица студено кисело мляко върху горещите, задушени чушки създава онзи незабравим контраст, който ви връща направо в детството на бабината маса.'
  )
  RETURNING id
),
ings AS (
  INSERT INTO recipe_ingredients (recipe_id, item, item_bg, display_order)
  SELECT id, unnest(ARRAY['8-10 large bell peppers', '500g ground meat (pork and beef mix)', '1 cup rice', '1 large onion (finely chopped)', '2 carrots (grated)', '400g canned tomatoes or 4 fresh tomatoes (grated)', '2 tbsp tomato paste', '3 tbsp sunflower oil', 'Fresh parsley (chopped)', 'Paprika, salt, black pepper', '300g Bacho Ilia yogurt (for serving)']), unnest(ARRAY['8-10 големи чушки', '500г кайма (смес от свинско и телешко)', '1 чаша ориз', '1 голяма глава лук (нарязан на ситно)', '2 моркова (настъргани)', '400г домати от консерва или 4 пресни домата (настъргани)', '2 с.л. доматено пюре', '3 с.л. слънчогледово олио', 'Прясна магданоз (нарязан)', 'Червен пипер, сол, черен пипер', '300г кисело мляко „Бачо Илия" (за сервиране)']), generate_series(1, 11)
  FROM inserted
  RETURNING 1
),
insts AS (
  INSERT INTO recipe_instructions (recipe_id, step, step_bg, step_number)
  SELECT id, unnest(ARRAY['Cut the tops off the bell peppers and remove seeds and membranes. Set aside.', 'In a large bowl, mix ground meat, rice, finely chopped onion, grated carrots, chopped parsley, paprika, salt and pepper.', 'Stuff each pepper with the meat mixture, filling about 3/4 full (rice will expand).', 'Heat oil in a large pot. Arrange stuffed peppers standing upright in the pot.', 'Mix grated tomatoes, tomato paste, and 2 cups water. Pour over the peppers. Add salt and paprika to the sauce.', 'Cover and simmer on low heat for 40 minutes until peppers are tender and rice is fully cooked.', 'Serve hot with a generous dollop of Bacho Ilia yogurt on top.']), unnest(ARRAY['Отрежете капачетата на чушките и почистете семките и вътрешността. Оставете ги настрана.', 'В голяма купа смесете каймата, ориза, нарязания на ситно лук, настърганите моркови, нарязания магданоз, червения пипер, сол и черен пипер.', 'Напълнете всяка чушка със сместа, като я запълвате до около 3/4 (оризът ще набъбне).', 'Загрейте олио в голяма тенджера. Подредете пълнените чушки изправени в тенджерата.', 'Смесете настърганите домати, доматеното пюре и 2 чаши вода. Изсипете сместа върху чушките. Добавете сол и червен пипер към соса.', 'Покрийте и гответе на слаб огън за 40 минути, докато чушките омекнат и оризът се сготви напълно.', 'Сервирайте ястието горещо, с щедра лъжица кисело мляко „Бачо Илия" отгоре.']), generate_series(1, 7)
  FROM inserted
  RETURNING 1
)
INSERT INTO recipe_tips (recipe_id, tip, tip_bg, display_order)
SELECT id, unnest(ARRAY['The magic finish is Bacho Ilia yogurt - its authentic Bulgarian taste and creamy texture perfectly complement the rich tomato sauce', 'Don''t overfill the peppers - rice needs space to expand during cooking', 'Use a mix of red and yellow peppers for a more colorful dish']), unnest(ARRAY['Магическият завършек е киселото мляко „Бачо Илия" – неговият автентичен български вкус и кремообразна текстура перфектно допълват богатия доматен сос.', 'Не препълвайте чушките – оризът се нуждае от място, за да набъбне по време на готвене.', 'Използвайте смес от червени и жълти чушки за по-цветно ястие.']), generate_series(1, 3)
FROM inserted;

-- Recipe 7: tikvenik
WITH inserted AS (
  INSERT INTO recipes (slug, title, title_bg, description, description_bg, image, prep_time, cook_time, servings, difficulty, bacho_products, story, story_bg)
  VALUES (
    'tikvenik',
    'Traditional Pumpkin Banitsa - Tikvenik',
    'Традиционен тиквеник – баница с тиква',
    'Sweet autumn banitsa filled with grated pumpkin, walnuts, cinnamon and honey. A beloved Christmas Eve tradition that fills the home with warmth and nostalgia.',
    'Сладка есенна баница, пълнена с настъргана тиква, орехи, канела и мед. Любима традиция за Бъдни вечер, която изпълва дома с топлина и носталгия.',
    '/recipes/tikvenik.jpg',
    '25 минути',
    '50 минути',
    10,
    'Средна',
    '["Мляко Бачо Илия"]'::jsonb,
    'Тиквеникът е сладката емблема на българската Коледа – задължително ястие за Бъдни вечер според старите традиции. В книгата „Стари български рецепти" го наричат национално съкровище. Всяка баба има своя тайна – някои слагат повече мед, други – повече орехи, но всички използват най-доброто мляко. Прясното мляко „Бачо Илия", направено с мляко от щастливи крави, без химикали, е това, което прави коричката златиста и хрупкава, точно както си я спомняме от детството. Ароматът на тиквеник в къщата – това е ароматът на Коледа!',
    'Тиквеникът е сладката емблема на българската Коледа – задължително ястие за Бъдни вечер според старите традиции. В книгата „Стари български рецепти" го наричат национално съкровище. Всяка баба има своя тайна – някои слагат повече мед, други – повече орехи, но всички използват най-доброто мляко. Прясното мляко „Бачо Илия", направено с мляко от щастливи крави, без химикали, е това, което прави коричката златиста и хрупкава, точно както си я спомняме от детството. Ароматът на тиквеник в къщата – това е ароматът на Коледа!'
  )
  RETURNING id
),
ings AS (
  INSERT INTO recipe_ingredients (recipe_id, item, item_bg, display_order)
  SELECT id, unnest(ARRAY['1 package filo pastry (400g)', '800g pumpkin (grated)', '200g walnuts (chopped)', '150g sugar', '100ml Bacho Ilia milk', '100ml sunflower oil', '80g butter (melted)', '3 tbsp honey', '2 tsp cinnamon', 'Pinch of vanilla', 'Powdered sugar for dusting']), unnest(ARRAY['1 пакет точени кори (400г)', '800г тиква (настъргана)', '200г орехи (нарязани)', '150г захар', '100мл прясно мляко „Бачо Илия"', '100мл слънчогледово олио', '80г масло (разтопено)', '3 с.л. мед', '2 ч.л. канела', 'Щипка ванилия', 'Пудра захар за поръсване']), generate_series(1, 11)
  FROM inserted
  RETURNING 1
),
insts AS (
  INSERT INTO recipe_instructions (recipe_id, step, step_bg, step_number)
  SELECT id, unnest(ARRAY['Grate the pumpkin and mix with sugar. Let sit for 30 minutes to release moisture, then squeeze out excess liquid.', 'Add chopped walnuts, cinnamon, and vanilla to the pumpkin mixture.', 'Preheat oven to 180°C. Grease a round baking pan with butter.', 'Mix Bacho Ilia milk, oil, and melted butter in a bowl.', 'Brush one filo sheet with the milk-butter mixture, add 2-3 tbsp pumpkin filling, roll loosely and coil into the pan like a snail shell. Repeat with remaining sheets, arranging them in a spiral.', 'Brush top with remaining milk-butter mixture. Bake for 50 minutes until golden brown.', 'While hot, drizzle with honey. Let cool slightly, dust with powdered sugar and serve.']), unnest(ARRAY['Настържете тиквата и я смесете със захарта. Оставете я за 30 минути, за да си пусне сока, след което изстискайте излишната течност.', 'Добавете нарязаните орехи, канелата и ванилията към сместа с тиквата.', 'Загрейте фурната на 180°C. Намажете с масло кръгла тава.', 'В купа смесете прясното мляко „Бачо Илия", олиото и разтопеното масло.', 'Намажете една кора със сместа, добавете 2-3 с.л. от плънката с тиква, навийте свободно и поставете в тавата като охлюв. Повторете с останалите кори, като ги подреждате в спирала.', 'Намажете отгоре с останалата смес. Печете 50 минути до придобиване на златист цвят.', 'Докато е още горещ, полейте тиквеника с мед. Оставете го да се охлади леко, поръсете с пудра захар и сервирайте.']), generate_series(1, 7)
  FROM inserted
  RETURNING 1
)
INSERT INTO recipe_tips (recipe_id, tip, tip_bg, display_order)
SELECT id, unnest(ARRAY['Bacho Ilia milk adds authentic Bulgarian flavor and helps create the perfect golden crust', 'Don''t skip squeezing the pumpkin - excess moisture will make the banitsa soggy', 'Roll the filo loosely to keep the tikvenik fluffy and layered']), unnest(ARRAY['Прясното мляко „Бачо Илия" добавя автентичен български вкус и помага за създаването на перфектната златиста коричка.', 'Не пропускайте да изстискате тиквата – излишната влага ще направи баницата глетава.', 'Навивайте корите свободно, за да остане тиквеникът пухкав и на пластове.']), generate_series(1, 3)
FROM inserted;

-- Recipe 8: musaka-classic
WITH inserted AS (
  INSERT INTO recipes (slug, title, title_bg, description, description_bg, image, prep_time, cook_time, servings, difficulty, bacho_products, story, story_bg)
  VALUES (
    'musaka-classic',
    'Classic Bulgarian Moussaka',
    'Класическа българска мусака',
    'Layers of seasoned ground meat, tender potatoes, and a fluffy Bacho Ilia yogurt topping - the most beloved Sunday dish in every Bulgarian home. Pure comfort that smells like grandma''s kitchen.',
    'Пластове от подправена кайма, нежни картофи и пухкава заливка с кисело мляко „Бачо Илия" – най-обичаното неделно ястие във всеки български дом. Уют, който ухае на бабината кухня.',
    '/recipes/musaka.jpg',
    '30 минути',
    '50 минути',
    8,
    'Средна',
    '["Кисело мляко Бачо Илия"]'::jsonb,
    'Мусаката е най-обичаното ястие в България – това не е просто храна, а неделно следобедно щастие! Всяка баба я прави малко по-различно, но всички имат едно общо нещо – използват най-доброто кисело мляко. Киселото мляко „Бачо Илия", направено с мляко от щастливи крави, без химикали и консерванти, е това, което прави заливката пухкава, златиста и с неповторим вкус. Когато отворите фурната и ви завладее ароматът на мусака с кисело мляко „Бачо Илия" – това е ароматът на българската неделя, на семейната трапеза, на детството. Ухае на баба до печката!',
    'Мусаката е най-обичаното ястие в България – това не е просто храна, а неделно следобедно щастие! Всяка баба я прави малко по-различно, но всички имат едно общо нещо – използват най-доброто кисело мляко. Киселото мляко „Бачо Илия", направено с мляко от щастливи крави, без химикали и консерванти, е това, което прави заливката пухкава, златиста и с неповторим вкус. Когато отворите фурната и ви завладее ароматът на мусака с кисело мляко „Бачо Илия" – това е ароматът на българската неделя, на семейната трапеза, на детството. Ухае на баба до печката!'
  )
  RETURNING id
),
ings AS (
  INSERT INTO recipe_ingredients (recipe_id, item, item_bg, display_order)
  SELECT id, unnest(ARRAY['700g ground meat (pork and beef mix)', '1kg potatoes (peeled and sliced)', '2 large onions (chopped)', '2 carrots (grated)', '4 eggs', '400g Bacho Ilia yogurt', '100ml sunflower oil', '1 tsp paprika', 'Fresh parsley (chopped)', 'Salt, black pepper, savory', '1 tbsp flour']), unnest(ARRAY['700г кайма (смес от свинско и телешко)', '1кг картофи (обелени и нарязани)', '2 големи глави лук (нарязани)', '2 моркова (настъргани)', '4 яйца', '400г кисело мляко „Бачо Илия"', '100мл слънчогледово олио', '1 ч.л. червен пипер', 'Прясна магданоз (нарязан)', 'Сол, черен пипер, чубрица', '1 с.л. брашно']), generate_series(1, 11)
  FROM inserted
  RETURNING 1
),
insts AS (
  INSERT INTO recipe_instructions (recipe_id, step, step_bg, step_number)
  SELECT id, unnest(ARRAY['Heat 3 tbsp oil in a large pan. Sauté chopped onions until golden, add grated carrots and cook for 5 minutes.', 'Add ground meat, breaking it up. Season with paprika, salt, pepper, and savory. Cook until meat is browned. Add chopped parsley.', 'Preheat oven to 180°C. Grease a large baking dish with oil.', 'Layer half the sliced potatoes in the dish, season with salt. Add all the meat mixture, spreading evenly. Top with remaining potatoes.', 'In a bowl, whisk together eggs, Bacho Ilia yogurt, flour, and a pinch of salt until smooth.', 'Pour the Bacho Ilia yogurt mixture evenly over the potatoes, ensuring complete coverage.', 'Bake for 50 minutes until the top is golden brown and puffy. Let rest for 10 minutes before serving.']), unnest(ARRAY['Загрейте 3 с.л. олио в голям тиган. Задушете нарязания лук до златисто, добавете настърганите моркови и гответе 5 минути.', 'Добавете каймата, като я раздробявате. Подправете с червен пипер, сол, черен пипер и чубрица. Гответе, докато каймата покафенее. Добавете нарязания магданоз.', 'Загрейте фурната на 180°C. Намажете голяма тава с олио.', 'Поставете половината от нарязаните картофи в тавата, подправете със сол. Добавете цялата смес с каймата, като я разпределите равномерно. Покрийте с останалите картофи.', 'В купа разбийте яйцата, киселото мляко „Бачо Илия", брашното и щипка сол до получаване на гладка смес.', 'Изсипете сместа с киселото мляко равномерно върху картофите, като се уверите, че ги покрива напълно.', 'Печете 50 минути, докато заливката стане златиста и пухкава. Оставете да почине 10 минути преди сервиране.']), generate_series(1, 7)
  FROM inserted
  RETURNING 1
)
INSERT INTO recipe_tips (recipe_id, tip, tip_bg, display_order)
SELECT id, unnest(ARRAY['The secret to perfect moussaka is Bacho Ilia yogurt - it creates that signature fluffy, golden topping that''s authentically Bulgarian', 'Slice potatoes thinly and evenly for consistent cooking', 'Don''t skip the resting time - it helps the moussaka set perfectly']), unnest(ARRAY['Тайната на перфектната мусака е в киселото мляко „Бачо Илия" – то създава характерната пухкава, златиста заливка, която е автентично българска.', 'Нарежете картофите на тънки и равномерни парчета за равномерно готвене.', 'Не пропускайте времето за почивка – то помага на мусаката да се стегне перфектно.']), generate_series(1, 3)
FROM inserted;

-- Recipe 9: bob-yahnia
WITH inserted AS (
  INSERT INTO recipes (slug, title, title_bg, description, description_bg, image, prep_time, cook_time, servings, difficulty, bacho_products, story, story_bg)
  VALUES (
    'bob-yahnia',
    'Traditional Bean Stew - Bob na Cherveno',
    'Традиционен боб по манастирски',
    'Hearty winter bean stew cooked with onions, peppers, and savory tomato sauce. Served with a generous spoonful of Bacho Ilia yogurt - warming comfort from the village.',
    'Засищаща зимна боб яхния, сготвена с лук, чушки и ароматен доматен сос. Сервира се с щедра лъжица кисело мляко „Бачо Илия" – топла и уютна храна, досущ като от село.',
    '/recipes/bob-qhniq.jpg',
    '15 минути',
    '90 минути',
    6,
    'Лесна',
    '["Кисело мляко Бачо Илия"]'::jsonb,
    'Боб яхнията е зимна топлина в чиния – селско ястие, което сгрява като камина в студените дни! Всяко българско семейство има своя версия, но всички са съгласни за едно – без щедра лъжица студено кисело мляко отгоре, боб яхнията не е същата! Киселото мляко „Бачо Илия", направено по стари рецепти с мляко от щастливи крави, е последният щрих, който превръща обикновения боб в кулинарно изживяване. Топлата яхния, студеното кисело мляко, пресният хляб – това е българската зима на масата! Плътно, засищащо, с вкус на село и традиция.',
    'Боб яхнията е зимна топлина в чиния – селско ястие, което сгрява като камина в студените дни! Всяко българско семейство има своя версия, но всички са съгласни за едно – без щедра лъжица студено кисело мляко отгоре, боб яхнията не е същата! Киселото мляко „Бачо Илия", направено по стари рецепти с мляко от щастливи крави, е последният щрих, който превръща обикновения боб в кулинарно изживяване. Топлата яхния, студеното кисело мляко, пресният хляб – това е българската зима на масата! Плътно, засищащо, с вкус на село и традиция.'
  )
  RETURNING id
),
ings AS (
  INSERT INTO recipe_ingredients (recipe_id, item, item_bg, display_order)
  SELECT id, unnest(ARRAY['500g dried white beans', '2 large onions (chopped)', '2 carrots (diced)', '2 red bell peppers (diced)', '400g canned tomatoes or 4 fresh tomatoes (grated)', '3 tbsp tomato paste', '4 tbsp sunflower oil', '2 bay leaves', '2 tsp paprika', '1 tsp dried mint', '1 tsp savory (chubritsa)', 'Salt, black pepper', '300g Bacho Ilia yogurt (for serving)', 'Fresh bread']), unnest(ARRAY['500г сух бял боб', '2 големи глави лук (нарязани)', '2 моркова (нарязани на кубчета)', '2 червени чушки (нарязани на кубчета)', '400г домати от консерва или 4 пресни домата (настъргани)', '3 с.л. доматено пюре', '4 с.л. слънчогледово олио', '2 дафинови листа', '2 ч.л. червен пипер', '1 ч.л. сушена мента', '1 ч.л. чубрица', 'Сол, черен пипер', '300г кисело мляко „Бачо Илия" (за сервиране)', 'Прясна хляб']), generate_series(1, 14)
  FROM inserted
  RETURNING 1
),
insts AS (
  INSERT INTO recipe_instructions (recipe_id, step, step_bg, step_number)
  SELECT id, unnest(ARRAY['Soak beans overnight in cold water. Drain and rinse before cooking.', 'Place beans in a large pot, cover with fresh water (about 5cm above beans). Bring to boil, then simmer for 60 minutes until tender.', 'In a separate pan, heat oil. Sauté chopped onions until soft, add diced carrots and peppers, cook for 10 minutes.', 'Add paprika, tomato paste, grated tomatoes, bay leaves, mint, savory, salt and pepper to the vegetable mixture. Cook for 5 minutes.', 'Add the vegetable-tomato mixture to the cooked beans. Mix well and simmer together for 30 minutes, stirring occasionally.', 'Adjust seasoning. Serve hot in bowls with a generous dollop of Bacho Ilia yogurt on top and fresh bread on the side.']), unnest(ARRAY['Накиснете боба за една нощ в студена вода. Отцедете и изплакнете преди готвене.', 'Сложете боба в голяма тенджера, покрийте с чиста вода (около 5 см над боба). Оставете да заври, след което намалете огъня и варете 60 минути, докато омекне.', 'В отделен тиган загрейте олио. Задушете нарязания лук до омекване, добавете нарязаните моркови и чушки и гответе 10 минути.', 'Добавете червения пипер, доматеното пюре, настърганите домати, дафиновите листа, ментата, чубрицата, сол и черен пипер към зеленчуковата смес. Гответе 5 минути.', 'Добавете зеленчуково-доматената смес към сварения боб. Разбъркайте добре и оставете да къкри заедно за 30 минути, като разбърквате от време на време.', 'Овкусете допълнително, ако е необходимо. Сервирайте ястието горещо в купички с щедра лъжица кисело мляко „Бачо Илия" отгоре и прясна хляб отстрани.']), generate_series(1, 6)
  FROM inserted
  RETURNING 1
)
INSERT INTO recipe_tips (recipe_id, tip, tip_bg, display_order)
SELECT id, unnest(ARRAY['The authentic Bulgarian touch is Bacho Ilia yogurt on top - it cools and balances the hearty stew perfectly', 'For a spicier version, add hot peppers or red pepper flakes', 'This stew tastes even better the next day - the flavors develop overnight']), unnest(ARRAY['Автентичният български завършек е киселото мляко „Бачо Илия" отгоре – то охлажда и балансира перфектно засищащата яхния.', 'За по-пикантен вариант добавете люти чушки или люспи от червен пипер.', 'Тази яхния е още по-вкусна на следващия ден – ароматите се развиват през нощта.']), generate_series(1, 3)
FROM inserted;

-- Recipe 10: mlechna-banica
WITH inserted AS (
  INSERT INTO recipes (slug, title, title_bg, description, description_bg, image, prep_time, cook_time, servings, difficulty, bacho_products, story, story_bg)
  VALUES (
    'mlechna-banica',
    'Traditional Milk Banitsa',
    'Традиционна млечна баница',
    'Simple yet perfect - layers of filo dough soaked in Bacho Ilia milk, eggs and butter. The leading recipe in every Bulgarian cookbook - versatile, satisfying, and always delicious.',
    'Проста, но перфектна – пластове от точени кори, напоени с прясно мляко „Бачо Илия", яйца и масло. Водеща рецепта във всяка българска готварска книга – универсална, засищаща и винаги вкусна.',
    '/recipes/mlechna-banitsa.jpg',
    '15 минути',
    '45 минути',
    8,
    'Лесна',
    '["Мляко Бачо Илия"]'::jsonb,
    'Млечната баница е водеща рецепта във всяка българска готварска книга – и има защо! Тя е универсалната баница – лесна за правене, винаги се получава, всеки я обича. Сутрин със захар и кафе – закуска. На обяд без захар, с кисело мляко – обяд. Това е баницата, която никога не отсъства от българската трапеза! Тайната? Прясното мляко „Бачо Илия", направено по традиционни рецепти с мляко от щастливи крави. То е това, което прави тази проста баница незабравима – чиста, истинска, с вкус на българско село и семейна маса. Проста, но перфектна!',
    'Млечната баница е водеща рецепта във всяка българска готварска книга – и има защо! Тя е универсалната баница – лесна за правене, винаги се получава, всеки я обича. Сутрин със захар и кафе – закуска. На обяд без захар, с кисело мляко – обяд. Това е баницата, която никога не отсъства от българската трапеза! Тайната? Прясното мляко „Бачо Илия", направено по традиционни рецепти с мляко от щастливи крави. То е това, което прави тази проста баница незабравима – чиста, истинска, с вкус на българско село и семейна маса. Проста, но перфектна!'
  )
  RETURNING id
),
ings AS (
  INSERT INTO recipe_ingredients (recipe_id, item, item_bg, display_order)
  SELECT id, unnest(ARRAY['1 package filo pastry (400g)', '500ml Bacho Ilia milk', '4 eggs', '100g butter (melted)', '100ml sunflower oil', '1 tsp salt', '1 tsp baking soda (optional)', 'Optional: 50g sugar for sweet version']), unnest(ARRAY['1 пакет точени кори (400г)', '500мл прясно мляко „Бачо Илия"', '4 яйца', '100г масло (разтопено)', '100мл слънчогледово олио', '1 ч.л. сол', '1 ч.л. сода бикарбонат (по желание)', 'По избор: 50г захар за сладък вариант']), generate_series(1, 8)
  FROM inserted
  RETURNING 1
),
insts AS (
  INSERT INTO recipe_instructions (recipe_id, step, step_bg, step_number)
  SELECT id, unnest(ARRAY['Preheat oven to 180°C. Grease a large rectangular baking pan with butter.', 'In a large bowl, whisk together eggs, Bacho Ilia milk, melted butter, oil, and salt (add sugar if making sweet version). Mix until smooth.', 'If using baking soda, add it to the milk mixture and stir quickly.', 'Layer 2-3 filo sheets in the bottom of the pan, crumpling them slightly. Pour some of the Bacho Ilia milk mixture over them. Repeat layers until all sheets are used, ending with milk mixture on top.', 'Make sure all filo sheets are well soaked with the Bacho Ilia milk mixture. Let stand for 10 minutes before baking.', 'Bake for 45 minutes until golden brown and puffy on top.', 'Let cool for 10 minutes before cutting. Serve warm or cold - delicious either way!']), unnest(ARRAY['Загрейте фурната на 180°C. Намажете голяма правоъгълна тава с масло.', 'В голяма купа разбийте яйцата, прясното мляко „Бачо Илия", разтопеното масло, олиото и солта (добавете захар, ако правите сладък вариант). Разбъркайте до гладкост.', 'Ако използвате сода, добавете я към млечната смес и разбъркайте бързо.', 'Поставете 2-3 кори на дъното на тавата, като ги намачкате леко. Изсипете част от млечната смес върху тях. Повторете пластовете, докато се изчерпят всички кори, като завършите с млечна смес отгоре.', 'Уверете се, че всички кори са добре напоени с млечната смес. Оставете да престои 10 минути преди печене.', 'Печете 45 минути, докато баницата стане златиста и пухкава отгоре.', 'Оставете да се охлади 10 минути преди нарязване. Сервирайте топла или студена – вкусна е и в двата случая!']), generate_series(1, 7)
  FROM inserted
  RETURNING 1
)
INSERT INTO recipe_tips (recipe_id, tip, tip_bg, display_order)
SELECT id, unnest(ARRAY['Bacho Ilia milk is the soul of this banitsa - its authentic taste and quality make all the difference', 'For a savory version, omit sugar and serve with yogurt. For sweet version, add sugar and dust with powdered sugar', 'The key is ensuring every layer is well soaked with Bacho Ilia milk']), unnest(ARRAY['Прясното мляко „Бачо Илия" е душата на тази баница – неговият автентичен вкус и качество правят цялата разлика.', 'За солен вариант пропуснете захарта и сервирайте с кисело мляко. За сладък вариант добавете захар и поръсете с пудра захар.', 'Ключът е да се уверите, че всеки пласт е добре напоен с прясното мляко „Бачо Илия".']), generate_series(1, 3)
FROM inserted;

-- Recipe 11: kufteta-parzeni
WITH inserted AS (
  INSERT INTO recipes (slug, title, title_bg, description, description_bg, image, prep_time, cook_time, servings, difficulty, bacho_products, story, story_bg)
  VALUES (
    'kufteta-parzeni',
    'Classic Bulgarian Meatballs - Kufteta',
    'Класически български кюфтета',
    'THE most popular Bulgarian dish - juicy fried meatballs seasoned with cumin, garlic, and savory. Served with Bacho Ilia yogurt, fresh salad, and lyutenitsa. Pure heaven!',
    'НАЙ-популярното българско ястие – сочни пържени кюфтета, подправени с кимион, чесън и чубрица. Сервират се с кисело мляко „Бачо Илия", свежа салата и лютеница. Истински рай!',
    '/recipes/kufteta.webp',
    '15 минути',
    '15 минути',
    4,
    'Лесна',
    '["Кисело мляко Бачо Илия"]'::jsonb,
    'Кюфтетата са най-любимото, най-готвеното и най-популярното ястие в България! Няма обяд без кюфтета някъде в България – така е! Всяка българска домакиня ги прави, всяко българско дете ги обожава, всеки български гост ги иска. Тайната? Кимионът, чубрицата, содата... и задължително студеното кисело мляко „Бачо Илия" отстрани! Без него кюфтетата не са същите. Топли, сочни, златисти кюфтета, студено кисело мляко „Бачо Илия", хрупкава зелена салата, пикантна лютеница – това е България в чиния! Просто, честно, вкусно. Кюфтета със зелена салата и лютеница – това е истинска българска закуска, обяд и вечеря!',
    'Кюфтетата са най-любимото, най-готвеното и най-популярното ястие в България! Няма обяд без кюфтета някъде в България – така е! Всяка българска домакиня ги прави, всяко българско дете ги обожава, всеки български гост ги иска. Тайната? Кимионът, чубрицата, содата... и задължително студеното кисело мляко „Бачо Илия" отстрани! Без него кюфтетата не са същите. Топли, сочни, златисти кюфтета, студено кисело мляко „Бачо Илия", хрупкава зелена салата, пикантната лютеница – това е България в чиния! Просто, честно, вкусно. Кюфтета със зелена салата и лютеница – това е истинска българска закуска, обяд и вечеря!'
  )
  RETURNING id
),
ings AS (
  INSERT INTO recipe_ingredients (recipe_id, item, item_bg, display_order)
  SELECT id, unnest(ARRAY['500g ground meat (pork and beef mix)', '1 large onion (finely chopped)', '2 garlic cloves (minced)', '1 slice bread (soaked in water)', '1 egg', '2 tsp ground cumin', '1 tsp dried savory (chubritsa)', '1 tsp paprika', '1/2 tsp baking soda', 'Salt, black pepper', 'Oil for frying', '300g Bacho Ilia yogurt (for serving)', 'Fresh green salad, lyutenitsa']), unnest(ARRAY['500г кайма (смес от свинско и телешко)', '1 голяма глава лук (нарязан на ситно)', '2 скилидки чесън (нарязани на ситно)', '1 филия хляб (накиснат във вода)', '1 яйце', '2 ч.л. кимион на прах', '1 ч.л. сушена чубрица', '1 ч.л. червен пипер', '1/2 ч.л. сода бикарбонат', 'Сол, черен пипер', 'Олио за пържене', '300г кисело мляко „Бачо Илия" (за сервиране)', 'Свежа зелена салата, лютеница']), generate_series(1, 13)
  FROM inserted
  RETURNING 1
),
insts AS (
  INSERT INTO recipe_instructions (recipe_id, step, step_bg, step_number)
  SELECT id, unnest(ARRAY['Squeeze excess water from soaked bread. In a large bowl, combine ground meat, bread, egg, chopped onion, minced garlic, cumin, savory, paprika, baking soda, salt and pepper.', 'Knead the mixture well for 5 minutes until it becomes sticky and well combined.', 'Let the mixture rest for 15 minutes in the refrigerator.', 'With wet hands, shape the mixture into oval meatballs (about 2 tbsp each).', 'Heat oil in a deep pan (about 2cm deep). Fry meatballs in batches, turning to brown evenly on all sides, about 4-5 minutes per batch.', 'Drain on paper towels. Serve hot with generous dollops of Bacho Ilia yogurt, fresh green salad, and lyutenitsa.']), unnest(ARRAY['Изстискайте излишната вода от накиснатия хляб. В голяма купа смесете каймата, хляба, яйцето, нарязания лук, нарязания чесън, кимиона, чубрицата, червения пипер, содата, солта и черния пипер.', 'Омесете сместа добре за 5 минути, докато стане лепкава и хомогенна.', 'Оставете сместа да почине 15 минути в хладилника.', 'С мокри ръце оформете сместа на овални кюфтета (около 2 с.л. всяко).', 'Загрейте олио в дълбок тиган (около 2 см дълбочина). Изпържете кюфтетата на партиди, като ги обръщате, за да покафенеят равномерно от всички страни, за около 4-5 минути на партида.', 'Отцедете върху кухненска хартия. Сервирайте горещи с щедри лъжици кисело мляко „Бачо Илия", свежа зелена салата и лютеница.']), generate_series(1, 6)
  FROM inserted
  RETURNING 1
)
INSERT INTO recipe_tips (recipe_id, tip, tip_bg, display_order)
SELECT id, unnest(ARRAY['The authentic Bulgarian way is with Bacho Ilia yogurt - its cool, tangy taste perfectly balances the hot, spicy meatballs', 'Baking soda makes the meatballs fluffy and tender - don''t skip it!', 'Wet hands prevent the meat mixture from sticking when shaping']), unnest(ARRAY['Автентичният български начин е с кисело мляко „Бачо Илия" – неговият хладен, кисел вкус перфектно балансира горещите, пикантни кюфтета.', 'Содата прави кюфтетата пухкави и нежни – не я пропускайте!', 'Мокрите ръце предотвратяват залепването на сместа при оформянето на кюфтетата.']), generate_series(1, 3)
FROM inserted;
