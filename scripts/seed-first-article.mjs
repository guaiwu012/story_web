import postgres from "postgres";

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");

const sql = postgres(process.env.DATABASE_URL, { max: 1, prepare: false });
const title = "要抵御直立的冲动，不要走入草原上的清晨。";
const slug = "resist-the-urge-to-stand";
const summary = "从一张宜家床垫写到物欲、疼痛、迁徙与人类直立行走：轻巧、诚实，又带一点让人发笑的沉重。";
const authorName = "日光射线（小红书）";
const content = `当且仅当我在宜家的时候，我才会恍然大悟我的生活是需要钱的，我是有物欲的，我的来去是不彻底自由的。😭因为我想要一张一米五宽的独立弹簧装袋的、厚28cm60kg重的床垫。我的精神可以不需要承托，但是我的屁股，我的腰，我的髋，我突出的椎间盘，松弛的腰骶韧带，没有中立位的骨盆——需要一张这样的床垫。更可恶的是宜家允许我在样品上试躺，我的身体已经完全被俘获。

两个小时了，我就躺在这里思考。思考我的人生，钱，物欲，生存，还有宇宙的问题。多一块60公斤、一米五宽两米长的床垫继续漂流，给我的搬家规模没有造成实质上的影响（因为我东西已经很多了），但是我太眷恋这张垫子了，有朝一日如果需要丢掉它，我绝对会舍不得。

这份舍不得，重量只有60kg，占地面积仅有一米五宽两米长，但它忠实地包裹着我的屁股托着我的下背部。我已经有一个多月，每天都被疼痛、受限、不适、功能丧失折磨。类人猿从稀树草原的树杈子上爬下来，突然灵机一动决定成为两脚兽——这就是造成我痛苦的全部：一个过分重过分复杂的脑子，一个本不应该承担这么多力的腰椎设计。

我的灵魂本该像充了一半、半瘪不瘪的氢气球，才能随着风飘到更多更远的地方，舍不得一张床垫，听起来对我来说太沉重了。

好辛苦，如果有一天能让所有人类都挥别病痛就好了，如果每一个人都有自己的屋子安放一张宜家床垫就好了。

但现在我偶尔会想回到一切开始之前——文明开始之前，告诉那些猴子：不要站起来。

很明显，你的腰椎和你的肛门承受不了这些。`;

const [admin] = await sql`SELECT id FROM users WHERE role = 'admin' ORDER BY created_at ASC LIMIT 1`;
if (!admin) throw new Error("No admin user found. Promote an account before seeding the first article.");

const [category] = await sql`
  INSERT INTO categories(name, slug)
  VALUES ('生活随笔', 'life-essay')
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
  RETURNING id
`;

await sql`
  INSERT INTO stories(
    title, slug, summary, author_name, category_id,
    free_content, paid_content, price_cents, status,
    globally_withdrawn, published_at, created_by
  )
  VALUES(
    ${title}, ${slug}, ${summary}, ${authorName}, ${category.id},
    ${content}, ${""}, 0, 'published', false, now(), ${admin.id}
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    summary = EXCLUDED.summary,
    author_name = EXCLUDED.author_name,
    category_id = EXCLUDED.category_id,
    free_content = EXCLUDED.free_content,
    paid_content = EXCLUDED.paid_content,
    price_cents = 0,
    status = 'published',
    globally_withdrawn = false,
    published_at = COALESCE(stories.published_at, now()),
    updated_at = now()
`;

await sql.end();
console.log(`Published first article: ${title}`);
