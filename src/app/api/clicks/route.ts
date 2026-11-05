import { getClicksCollection } from "@/lib/mongodb";
import { isKnownLinkId, links } from "@/data/profile";

// POST /api/clicks  body: { id: string }  → 해당 링크 클릭 수 +1
export async function POST(request: Request) {
  let id: unknown;
  try {
    ({ id } = await request.json());
  } catch {
    return Response.json({ error: "잘못된 요청 본문입니다." }, { status: 400 });
  }

  if (!isKnownLinkId(id)) {
    return Response.json({ error: "알 수 없는 링크입니다." }, { status: 400 });
  }

  try {
    const clicks = await getClicksCollection();
    await clicks.updateOne(
      { _id: id },
      { $inc: { count: 1 }, $set: { lastClickedAt: new Date() } },
      { upsert: true },
    );
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("[clicks] 기록 실패:", error);
    return Response.json({ error: "클릭 수를 기록하지 못했습니다." }, { status: 503 });
  }
}

// GET /api/clicks  → 링크별 클릭 수
export async function GET() {
  try {
    const clicks = await getClicksCollection();
    const docs = await clicks.find({}).toArray();
    const countById = new Map(docs.map((doc) => [doc._id, doc.count]));

    return Response.json(
      links.map((link) => ({
        id: link.id,
        title: link.title,
        count: countById.get(link.id) ?? 0,
      })),
    );
  } catch (error) {
    console.error("[clicks] 조회 실패:", error);
    return Response.json({ error: "클릭 수를 불러오지 못했습니다." }, { status: 503 });
  }
}
