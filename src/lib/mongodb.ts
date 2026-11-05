import { MongoClient, type Collection } from "mongodb";

export type ClickDoc = {
  _id: string; // 링크 ID
  count: number;
  lastClickedAt: Date;
};

const DB_NAME = process.env.MONGODB_DB ?? "linknamu";

// 개발 모드 HMR 시 연결이 계속 늘어나지 않도록 전역에 캐시합니다.
const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

function getClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI 환경 변수가 설정되지 않았습니다. .env.local을 확인하세요.");
  }
  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = new MongoClient(uri).connect();
  }
  return globalForMongo._mongoClientPromise;
}

export async function getClicksCollection(): Promise<Collection<ClickDoc>> {
  const client = await getClient();
  return client.db(DB_NAME).collection<ClickDoc>("clicks");
}
