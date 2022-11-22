import { Handler } from "$fresh/server.ts";

import { getDriver } from "../../../utils/db/neo4j.ts";

import {
  BracketContentWithChapters,
  MediaTypes,
} from "@apps/table-of-brackets/models.ts";

const qMatch = `
MATCH (bc:BracketContent)-[:MENTIONED_IN]->(c)
`;

const qWhereWebNovelOrder = `
WHERE c.webNovelOrder > 0
  AND c.webNovelOrder <= $chapterIndex
`;

const qWhereWebNovelRewriteOrder = `
WHERE c.webNovelRewriteOrder > 0
  AND c.webNovelRewriteOrder <= $chapterIndex
`;

const qWhereAudioBookOrder = `
WHERE c.audioBookOrder > 0
  AND c.audioBookOrder <= $chapterIndex
`;

const qWhereElectronicBookOrder = `
WHERE c.eBookOrder > 0
  AND c.eBookOrder <= $chapterIndex
`;

const qWithAndReturn = `
WITH bc, c ORDER BY bc.content ASC, c.id ASC
RETURN bc.content AS content, collect(DISTINCT c.id) AS chapterIds
`;

export const handler: Handler = async (request): Promise<Response> => {
  const url = new URL(request.url);

  const qCollectionType = url.searchParams.get("collectionType") ||
    MediaTypes.WEBNOVEL;
  let collectionType: MediaTypes = MediaTypes.WEBNOVEL;
  if (qCollectionType === MediaTypes.WEBNOVEL) {
    collectionType = MediaTypes.WEBNOVEL;
  } else if (qCollectionType === MediaTypes.WEBNOVEL_REWRITE) {
    collectionType = MediaTypes.WEBNOVEL_REWRITE;
  } else if (qCollectionType === MediaTypes.AUDIOBOOK) {
    collectionType = MediaTypes.AUDIOBOOK;
  } else if (qCollectionType === MediaTypes.EBOOK) {
    collectionType = MediaTypes.EBOOK;
  }

  const qChapterIndex = url.searchParams.get("chapterIndex") || "1000";
  const chapterIndex = isNaN(Number(qChapterIndex))
    ? 1000
    : Number(qChapterIndex);

  const [driver, err] = getDriver();
  if (err !== null) return Response.error();

  const rows: BracketContentWithChapters[] = [];
  const session = driver.session();

  const whereClauses: string[] = [];
  if (collectionType === MediaTypes.WEBNOVEL) {
    whereClauses.push(qWhereWebNovelOrder);
  } else if (collectionType === MediaTypes.WEBNOVEL_REWRITE) {
    whereClauses.push(qWhereWebNovelRewriteOrder);
  } else if (collectionType === MediaTypes.AUDIOBOOK) {
    whereClauses.push(qWhereAudioBookOrder);
  } else if (collectionType === MediaTypes.EBOOK) {
    whereClauses.push(qWhereElectronicBookOrder);
  }

  const query = [qMatch, ...whereClauses, qWithAndReturn].join("\n");

  try {
    const result = await session.executeRead((tx) =>
      tx.run(query, { chapterIndex })
    );
    const records = result.records;
    for (let i = 0; i < records.length; i++) {
      const content: string = records[i].get("content");
      const chapterIds: string[] = records[i].get("chapterIds");
      rows.push({ content, chapterIds });
    }
  } catch {
    return Response.error();
  } finally {
    await session.close();
  }

  return Response.json(rows.sort((a, b) => {
    return a.content.localeCompare(b.content, undefined, {
      sensitivity: "base",
    });
  }));
};
